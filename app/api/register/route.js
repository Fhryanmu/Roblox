import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req) {
  const supabase = getSupabase();
  const { username, password, birthday, gender } = await req.json();

  const { error } = await supabase
    .from("admins")
    .insert([{ username, password, birthday, gender }]);

  if (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Register gagal: " + error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Register berhasil" });
}
