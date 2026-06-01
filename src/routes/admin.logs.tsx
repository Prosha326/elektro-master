import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/logs")({
  head: () => ({ meta: [{ title: "Журнал — Админ" }, { name: "robots", content: "noindex" }] }),
  component: LogsPage,
});

const ACTION_LABEL: Record<string, string> = {
  create: "Создание", update: "Изменение", delete: "Удаление",
  toggle_active: "Видимость", reorder: "Сортировка",
  role_grant: "Выдача роли", role_revoke: "Отзыв роли",
};

function LogsPage() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["audit_logs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("audit_logs")
        .select("*").order("created_at", { ascending: false }).limit(200);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Журнал действий</h1>
      {isLoading ? <p className="text-muted-foreground">Загрузка...</p> : (
        <div className="grid gap-2">
          {data.map((l: any) => (
            <div key={l.id} className="bg-card border border-border rounded-xl p-3 sm:p-4 text-sm">
              <div className="flex flex-wrap gap-2 items-baseline justify-between">
                <div>
                  <span className="font-semibold">{ACTION_LABEL[l.action] ?? l.action}</span>
                  <span className="text-muted-foreground"> · {l.entity}</span>
                </div>
                <div className="text-xs text-muted-foreground">{new Date(l.created_at).toLocaleString("ru")}</div>
              </div>
              <div className="text-muted-foreground mt-1">{l.user_email ?? l.user_id}</div>
              {l.details && Object.keys(l.details).length > 0 && (
                <pre className="mt-2 text-xs bg-muted/50 rounded p-2 overflow-x-auto">{JSON.stringify(l.details, null, 2)}</pre>
              )}
            </div>
          ))}
          {!data.length && <p className="text-muted-foreground">Записей пока нет.</p>}
        </div>
      )}
    </div>
  );
}
