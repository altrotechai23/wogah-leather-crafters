import { supabase } from "./supabase";

export async function uploadProductImage(file: File) {
  const ext = file.name.split(".").pop();

  const filename = `${crypto.randomUUID()}.${ext}`;

  const path = `products/${filename}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(path, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(path);

  return data.publicUrl;
}