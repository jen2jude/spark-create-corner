import { supabase } from "@/integrations/supabase/client";

export type CampaignRecord = {
  id: string;
  user_id: string;
  name: string;
  status: string;
  plan: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

const campaigns = () => supabase.from("campaigns" as never);

export async function listCampaigns(): Promise<CampaignRecord[]> {
  const { data, error } = await campaigns().select("*").order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as CampaignRecord[];
}

export async function getCampaign(id: string): Promise<CampaignRecord | null> {
  const { data, error } = await campaigns().select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data ?? null) as unknown as CampaignRecord | null;
}

export async function createCampaign(name: string, plan: Record<string, unknown>) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!userData.user) throw new Error("You must be signed in to create a campaign.");

  const { data, error } = await campaigns()
    .insert({ user_id: userData.user.id, name, plan, status: "draft" } as never)
    .select("*")
    .single();

  if (error) throw error;
  return data as unknown as CampaignRecord;
}

export async function updateCampaign(id: string, values: { name?: string; status?: string; plan?: Record<string, unknown> }) {
  const { data, error } = await campaigns().update(values as never).eq("id", id).select("*").single();
  if (error) throw error;
  return data as unknown as CampaignRecord;
}

export async function deleteCampaign(id: string) {
  const { error } = await campaigns().delete().eq("id", id);
  if (error) throw error;
}
