import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { LogOut, Briefcase, Building2, Tag, Home } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Админ-панель" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: s => s.location.pathname });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate({ to: "/login" });
  }, [user, isAdmin, loading, navigate]);

  if (loading || !user || !isAdmin) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Загрузка...</div>;
  }

  const links = [
    { to: "/admin", label: "Главная", icon: Home, exact: true },
    { to: "/admin/services", label: "Услуги", icon: Briefcase },
    { to: "/admin/cases", label: "Объекты", icon: Building2 },
    { to: "/admin/prices", label: "Цены", icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-center" />
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="font-bold">Админ-панель</div>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground hidden sm:inline">На сайт</Link>
            <Button size="sm" variant="ghost" onClick={async () => { await signOut(); navigate({ to: "/login" }); }}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto px-4 pb-3 flex gap-1 overflow-x-auto">
          {links.map(l => {
            const active = l.exact ? path === l.to : path.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition ${active ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                <l.icon className="w-4 h-4" /> {l.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
