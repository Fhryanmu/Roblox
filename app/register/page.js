"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
    } else {
      setMessage("Register berhasil 🎉");
      setUsername("");
      setPassword("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-slate-800">
          Register Admin
        </h1>
        <p className="text-sm text-center text-slate-500 mb-6">
          Buat akun baru
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <input
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-slate-800"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-slate-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-700 transition">
            Register
          </button>
        </form>

        {message && (
          <p className="text-green-600 text-sm text-center mt-4">{message}</p>
        )}
        {error && (
          <p className="text-red-600 text-sm text-center mt-4">{error}</p>
        )}

        <p className="text-sm text-center text-slate-500 mt-4">
          Sudah punya akun?{" "}
          <a href="/" className="text-slate-900 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}