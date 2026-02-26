import { supabase } from "./supabaseClient";

export const getListById = (listId) =>
  supabase.from("lists").select("*").eq("id", listId).single();

export const getListItems = (listId) =>
  supabase
    .from("list_items")
    .select("*")
    .eq("list_id", listId)
    .order("created_at", { ascending: true });

export const addItem = ({ listId, name, price }) =>
  supabase
    .from("list_items")
    .insert({ list_id: listId, name, price: price || null, status: "to_buy" });

export const updateItem = ({ id, status }) =>
  supabase.from("list_items").update({ status }).eq("id", id);

export const deleteItem = (id) =>
  supabase.from("list_items").delete().eq("id", id);
