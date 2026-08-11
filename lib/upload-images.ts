import { supabase } from "./supabase";

const BUCKET = "wogah-leather-crafters-storage";

export async function uploadImages(files: File[]) {
  const urls: string[] = [];
  for (const file of files) {
    const extension = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${extension}`;
    const filePath = `products/${fileName}`;
    const { error } = await supabase.storage.from(BUCKET).upload(filePath, file);

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(filePath);

    urls.push(data.publicUrl);
  }

  return urls;
}