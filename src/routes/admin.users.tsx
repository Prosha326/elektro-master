import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { logAudit } from "@/lib/audit";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Пользователи — Админ" }, { name: "robots", content: "noindex" }] }),
  component: UsersPage,
});

type U = { user_id: string; email: string; created_at: string; is_admin: boolean };

function UsersPage() {
  const qc = useQueryClient();
  const { user } = useAuth();

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin_users"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("admin_list_users");
      if (error) throw error;
      return data as U[];
    },
  });

  const setRole = useMutation({
    mutationFn: async ({ target, grant, email }: { target: string; grant: boolean; email: string }) => {
      const { error } = await supabase.rpc("admin_set_admin_role", { _target: target, _grant: grant });
      if (error) throw error;
      await logAudit(grant ? "role_grant" : "role_revoke", "user", target, { email, role: "admin" });
    },
    onSuccess: () => { toast.success("Сохранено"); qc.invalidateQueries({ queryKey: ["admin_users"] }); },
    onError: e => toast.error(e instanceof Error ? e.message : "Ошибка"),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Пользователи и роли</h1>
      {isLoading ? <p className="text-muted-foreground">Загрузка...</p> : (
        <div className="grid gap-2">
          {data.map(u => {
            const isSelf = u.user_id === user?.id;
            return (
              <div key={u.user_id} className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{u.email}{isSelf && <span className="ml-2 text-xs text-muted-foreground">(вы)</span>}</div>
                  <div className="text-xs text-muted-foreground">Зарегистрирован: {new Date(u.created_at).toLocaleString("ru")}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">admin</span>
                  <Switch checked={u.is_admin} disabled={isSelf && u.is_admin}
                          onCheckedChange={v => setRole.mutate({ target: u.user_id, grant: v, email: u.email })} />
                </div>
              </div>
            );
          })}
          {!data.length && <p className="text-muted-foreground">Пользователей нет.</p>}
        </div>
      )}
    </div>
  );
}
