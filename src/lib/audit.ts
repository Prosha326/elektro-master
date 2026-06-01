import { supabase } from "@/integrations/supabase/client";

export async function logAudit(action: string, entity: string, entity_id?: string, details: Record<string, unknown> = {}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("audit_logs").insert({
      user_id: user.id,
      user_email: user.email ?? null,
      action, entity, entity_id: entity_id ?? null, details,
    });
  } catch (e) {
    console.warn("audit log failed", e);
  }
}
