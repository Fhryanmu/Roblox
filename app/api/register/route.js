import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req) {
  const supabase = getSupabase();
  const { username, password } = await req.json();

  const { error } = await supabase
    .from("admins")
    .insert([{ username, password }]);

  if (error) {
    return NextResponse.json(
      { message: "Register gagal" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Register berhasil" });
}
