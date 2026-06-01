import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Briefcase, Building2, Tag } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function AdminHome() {
  const { user } = useAuth();
  const cards = [
    { to: "/admin/services", label: "Услуги", icon: Briefcase, desc: "Редактирование блока «Основные работы»" },
    { to: "/admin/cases", label: "Объекты", icon: Building2, desc: "Управление портфолио" },
    { to: "/admin/prices", label: "Цены", icon: Tag, desc: "Прайс-лист" },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold">Добро пожаловать{user?.email ? `, ${user.email}` : ""}</h1>
      <p className="text-muted-foreground mt-2">Выберите раздел для управления</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {cards.map(c => (
          <Link key={c.to} to={c.to} className="block bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-border">
            <c.icon className="w-8 h-8 text-primary" />
            <h2 className="font-bold text-lg mt-3">{c.label}</h2>
            <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
