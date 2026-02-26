import { supabase } from "./supabaseClient";

export const getLists = (userId) =>
  supabase
    .from("lists")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

export const createList = ({ title, date }) =>
  supabase.from("lists").insert({ title, date }).select().single();

export const updateListMeta = ({ id, title, date }) =>
  supabase.from("lists").update({ title, date }).eq("id", id);

export const deleteList = (id) => supabase.from("lists").delete().eq("id", id);
