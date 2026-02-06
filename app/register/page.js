"use client";
import { useState, useEffect } from "react";

const GAME_POSTERS = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1614027164847-1b2809eb189d?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1627373119858-c7fa120f242e?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1552824734-d621644788c0?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1605898399789-19cca3670845?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1551103782-8902bebc662b?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=400",
];

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState({ month: "", day: "", year: "" });
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  async function handleRegister(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!username || !password || !birthday.month || !birthday.day || !birthday.year) {
      setError("Please fill in all fields");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        birthday: `${birthday.year}-${birthday.month}-${birthday.day}`,
        gender
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
    } else {
      setMessage("Sign Up Success! Redirecting to login...");
      setUsername("");
      setPassword("");
      setBirthday({ month: "", day: "", year: "" });
      setGender("");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#000000] text-white font-sans">
      {/* Background Poster Grid */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute top-[-25%] left-[-10%] w-[120%] h-[150%] rotate-[-15deg] grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 px-10">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl transition hover:scale-105 duration-500">
              <img
                src={GAME_POSTERS[i % GAME_POSTERS.length]}
                alt="Game Poster"
                className="w-full h-full object-cover filter brightness-50"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 flex justify-between items-center px-6 py-4">
        <div></div>
        <a href="/" className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded text-sm font-semibold transition">
          Log In
        </a>
      </header>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 pb-12">
        {/* Roblox Logo Text Style */}
        <div className="mb-10 flex justify-center scale-[1.3] md:scale-[1.5]">
          <div className="flex items-center text-white select-none font-black uppercase">
            <span className="text-[32px] tracking-[-0.05em] mr-[1.5px]">R</span>
            <div className="w-[26px] h-[26px] flex items-center justify-center transform -translate-y-[0.5px]">
              <img src="/roblox-icon.svg" alt="" className="w-full h-full brightness-0 invert" />
            </div>
            <span className="text-[32px] tracking-[-0.05em] ml-[1.5px]">blox</span>
          </div>
        </div>

        {/* Register Card */}
        <div className="w-full max-w-[440px] bg-[#191B1D]/90 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-white/5">
          <h2 className="text-center text-xl font-bold mb-6 tracking-wide">
            SIGN UP AND START HAVING FUN!
          </h2>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Birthday */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-400">Birthday</label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  className="bg-[#242629] border border-white/10 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-white/50 appearance-none text-gray-200 cursor-pointer"
                  value={birthday.month}
                  onChange={(e) => setBirthday({ ...birthday, month: e.target.value })}
                >
                  <option value="">Month</option>
                  {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                </select>
                <select
                  className="bg-[#242629] border border-white/10 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-white/50 appearance-none text-gray-200 cursor-pointer"
                  value={birthday.day}
                  onChange={(e) => setBirthday({ ...birthday, day: e.target.value })}
                >
                  <option value="">Day</option>
                  {days.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <select
                  className="bg-[#242629] border border-white/10 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-white/50 appearance-none text-gray-200 cursor-pointer"
                  value={birthday.year}
                  onChange={(e) => setBirthday({ ...birthday, year: e.target.value })}
                >
                  <option value="">Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-400">Username</label>
              <input
                className="w-full bg-[#242629] border border-white/10 rounded-md py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/50 placeholder:text-gray-600"
                placeholder="Don't use your real name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-400">Password</label>
              <input
                type="password"
                className="w-full bg-[#242629] border border-white/10 rounded-md py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/50 placeholder:text-gray-600"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-400">Gender (optional)</label>
              <div className="grid grid-cols-2 gap-0 border border-white/10 rounded-md overflow-hidden bg-[#242629]">
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`py-2 flex justify-center items-center transition ${gender === 'female' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                >
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C9.243 2 7 4.243 7 7c0 2.341 1.621 4.296 3.8 4.84V14H9v2h1.8v2.24l-3 3 1.414 1.414L12 19.828l2.786 2.826 1.414-1.414-3-3V16H15v-2h-1.8v-2.16c2.179-.544 3.8-2.499 3.8-4.84 0-2.757-2.243-5-5-5zm-3 5c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3z" />
                  </svg>
                </button>
                <div className="w-[1px] h-full bg-white/10"></div>
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`py-2 flex justify-center items-center transition ${gender === 'male' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                >
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 2v2h3.586l-3.972 3.972c-1.54-1.231-3.489-1.972-5.614-1.972-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9c0-2.125-.741-4.074-1.972-5.614L20 4.414V8h2V2h-6zM10 20c-3.859 0-7-3.141-7-7s3.141-7 7-7 7 3.141 7 7-3.141 7-7 7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[12px] text-gray-500 text-center leading-relaxed">
              By clicking Sign Up, you are agreeing to our <a href="#" className="underline text-gray-400 hover:text-white">Terms of Use</a> (including arbitration) and acknowledge our <a href="#" className="underline text-gray-400 hover:text-white">Privacy Policy</a>. If you are under 18, you agree that your parent/guardian permits you to create this account and agrees to our Terms of Use.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#BABBBD] text-[#191B1D] py-2.5 rounded-md font-bold text-sm hover:bg-white transition uppercase tracking-wider"
            >
              Sign Up
            </button>
          </form>

          {message && (
            <p className="text-green-500 text-xs text-center mt-4 font-medium">{message}</p>
          )}
          {error && (
            <p className="text-red-500 text-xs text-center mt-4 font-medium">{error}</p>
          )}
        </div>

        {/* Footer Text */}
        <div className="mt-8 text-center">
          <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
            ROBLOX ON YOUR DEVICE
          </h3>
        </div>
      </div>
    </div>
  );
}
