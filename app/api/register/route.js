import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "Username dan password wajib diisi" },
      { status: 400 }
    );
  }

  // cek username sudah ada
  const { data: existing } = await supabase
    .from("admins")
    .select("id")
    .eq("username", username)
    .single();

  if (existing) {
    return NextResponse.json(
      { message: "Username sudah digunakan" },
      { status: 409 }
    );
  }

  // insert admin baru
  const { error } = await supabase.from("admins").insert({
    username,
    password, // TANPA ENKRIPSI
  });

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Register berhasil" });
}