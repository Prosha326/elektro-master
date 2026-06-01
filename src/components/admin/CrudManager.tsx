import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";

export type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "image";
};

type Row = Record<string, any> & { id: string; sort_order: number; is_active: boolean };

interface Props {
  table: "services" | "cases" | "prices";
  title: string;
  fields: FieldDef[];
}

export function CrudManager({ table, title, fields }: Props) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);

  const { data: rows = [], isLoading } = useQuery({
    queryKey: [table, "admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select("*").order("sort_order");
      if (error) throw error;
      return data as Row[];
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: [table] });
  };

  const saveMut = useMutation({
    mutationFn: async (row: Partial<Row>) => {
      if (row.id) {
        const { id, created_at, updated_at, ...rest } = row;
        const { error } = await (supabase.from(table) as any).update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const maxOrder = Math.max(0, ...rows.map(r => r.sort_order ?? 0));
        const { error } = await (supabase.from(table) as any).insert({ ...row, sort_order: maxOrder + 1 });
        if (error) throw error;
      }
    },
    onSuccess: () => { toast.success("Сохранено"); setOpen(false); invalidate(); },
    onError: e => toast.error(e instanceof Error ? e.message : "Ошибка"),
  });


  const delMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Удалено"); invalidate(); },
    onError: e => toast.error(e instanceof Error ? e.message : "Ошибка"),
  });

  const moveMut = useMutation({
    mutationFn: async ({ id, dir }: { id: string; dir: -1 | 1 }) => {
      const idx = rows.findIndex(r => r.id === id);
      const swap = rows[idx + dir];
      if (!swap) return;
      const a = rows[idx];
      await (supabase.from(table) as any).update({ sort_order: swap.sort_order }).eq("id", a.id);
      await (supabase.from(table) as any).update({ sort_order: a.sort_order }).eq("id", swap.id);
    },
    onSuccess: invalidate,
  });

  const toggleActive = useMutation({
    mutationFn: async (r: Row) => {
      const { error } = await (supabase.from(table) as any).update({ is_active: !r.is_active }).eq("id", r.id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });


  const openNew = () => {
    const init: any = { is_active: true };
    fields.forEach(f => init[f.key] = "");
    setEditing(init);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-1" /> Добавить</Button>
      </div>

      {isLoading ? <p className="text-muted-foreground">Загрузка...</p> : (
        <div className="grid gap-3">
          {rows.map((r, i) => (
            <div key={r.id} className="bg-card rounded-xl border border-border p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              {fields.some(f => f.type === "image") && r[fields.find(f => f.type === "image")!.key] && (
                <img src={r[fields.find(f => f.type === "image")!.key]} alt="" className="w-20 h-20 rounded-lg object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{r[fields[0].key]}</div>
                {fields[1] && r[fields[1].key] && (
                  <div className="text-sm text-muted-foreground line-clamp-2">{r[fields[1].key]}</div>
                )}
                {!r.is_active && <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">скрыто</span>}
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <Switch checked={r.is_active} onCheckedChange={() => toggleActive.mutate(r)} />
                <Button size="icon" variant="ghost" disabled={i === 0} onClick={() => moveMut.mutate({ id: r.id, dir: -1 })}><ArrowUp className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" disabled={i === rows.length - 1} onClick={() => moveMut.mutate({ id: r.id, dir: 1 })}><ArrowDown className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => { setEditing(r); setOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => { if (confirm("Удалить?")) delMut.mutate(r.id); }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
          {!rows.length && <p className="text-muted-foreground text-center py-8">Пока пусто. Нажмите «Добавить».</p>}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Редактировать" : "Добавить"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {fields.map(f => (
              <div key={f.key}>
                <Label>{f.label}</Label>
                {f.type === "textarea" ? (
                  <Textarea value={editing?.[f.key] ?? ""} onChange={e => setEditing({ ...editing!, [f.key]: e.target.value })} rows={3} />
                ) : (
                  <Input value={editing?.[f.key] ?? ""} onChange={e => setEditing({ ...editing!, [f.key]: e.target.value })}
                         placeholder={f.type === "image" ? "/images/file.jpg или https://..." : undefined} />
                )}
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Switch checked={editing?.is_active ?? true} onCheckedChange={v => setEditing({ ...editing!, is_active: v })} />
              <Label>Показывать на сайте</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
            <Button onClick={() => editing && saveMut.mutate(editing)} disabled={saveMut.isPending}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
