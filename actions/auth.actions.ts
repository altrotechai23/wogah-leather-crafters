"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";

export async function login(formData: FormData): Promise<void> {
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    redirect("/admin/login?error=invalid");
  }

  const token = await createSession();

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}