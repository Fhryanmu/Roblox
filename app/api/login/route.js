import { getSupabase } from "@/lib/supabase";

export async function POST(req) {
  const supabase = getSupabase();
  const { username, password } = await req.json();

  const { data, error } = await supabase
    .from("admins")
    .select("id, username, password")
    .eq("username", username)
    .single();

  if (error || !data) {
    return Response.json(
      { message: "Username tidak ditemukan" },
      { status: 401 }
    );
  }

  if (data.password !== password) {
    return Response.json(
      { message: "Password salah" },
      { status: 401 }
    );
  }

  return Response.json({
    message: "Login berhasil",
    admin: { id: data.id, username: data.username },
  });
}