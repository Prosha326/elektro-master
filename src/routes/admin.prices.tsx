import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/admin/prices")({
  component: () => (
    <CrudManager table="prices" title="Цены" fields={[
      { key: "title", label: "Услуга" },
      { key: "price", label: "Цена (например: от 3 000 ₽)" },
    ]} />
  ),
});
