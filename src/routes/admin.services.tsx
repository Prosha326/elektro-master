import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/admin/services")({
  component: () => (
    <CrudManager
      table="services"
      title="Услуги"
      fields={[
        { key: "title", label: "Название" },
        { key: "description", label: "Описание", type: "textarea" },
        { key: "image_url", label: "Картинка (URL)", type: "image" },
      ]}
    />
  ),
});
