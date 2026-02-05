"use client";
import { useState, useMemo } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const backgroundTiles = [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1538356111083-d218e14191d8?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552824236-0776484ff217?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop",
  ];

  const borderColors = ["border-[#00a2ff]", "border-[#ff9d00]", "border-[#ff00ff]", "border-[#00ffcc]", "border-white/10"];

  const tiles = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => ({
      img: backgroundTiles[i % backgroundTiles.length],
      borderColor: borderColors[i % borderColors.length]
    }));
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
      } else {
        setMessage("Login berhasil 🎉");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0d0d0d] overflow-hidden font-sans">
      {/* Top Navbar */}
      <nav className="relative z-50 h-[60px] bg-black flex items-center px-4 justify-between border-b border-white/5">
        <div className="flex items-center gap-6">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/roblox-icon.svg" alt="Roblox" className="h-[22px] w-[22px] brightness-0 invert" />
          </div>
          <div className="hidden md:flex items-center gap-6 text-[14px] font-bold text-white/90">
            <a href="#" className="hover:text-white transition-colors">Charts</a>
            <a href="#" className="hover:text-white transition-colors">Marketplace</a>
            <a href="#" className="hover:text-white transition-colors">Create</a>
            <a href="#" className="hover:text-white transition-colors">Robux</a>
          </div>
        </div>

        <div className="flex-1 max-w-[600px] mx-4 relative hidden sm:block">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#393b3d] text-white rounded-[4px] px-10 py-1.5 focus:outline-none focus:ring-1 focus:ring-white/40 text-[14px]"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="bg-[#0074db] text-white px-4 py-1 rounded-[4px] text-[13px] font-bold hover:bg-[#0082f3] transition-colors">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="relative flex-1 flex items-center justify-center">
        {/* Perspective Background Tiles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Decorative Diamonds */}
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-20">
            <div className="w-[150vw] h-[150vw] flex flex-wrap gap-40 transform rotate-[15deg]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-[450px] h-[450px] border-[1px] ${i % 2 === 0 ? 'border-[#00a2ff]' : 'border-[#ff9d00]'} skew-x-[15deg] opacity-50`}
                />
              ))}
            </div>
          </div>

          <div
            className="absolute -top-[40%] -left-[40%] w-[180%] h-[180%] grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 gap-5 opacity-60 transform -rotate-[22deg] skew-x-[12deg] scale-110"
          >
            {tiles.map((tile, i) => (
              <div
                key={i}
                className={`aspect-square bg-[#1a1a1a] rounded-lg overflow-hidden shadow-2xl border ${tile.borderColor}`}
              >
                <img
                  src={tile.img}
                  alt="Game Tile"
                  className="w-full h-full object-cover brightness-90"
                />
              </div>
            ))}
          </div>

          {/* Overlays for deeper blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_black_90%)] z-20" />
        </div>

        {/* Login Card */}
        <div className="relative z-30 w-full max-w-[420px] px-6">
          <div className="bg-[#242527]/95 backdrop-blur-sm rounded-lg shadow-[0_20px_60px_rgba(0,0,0,1)] p-8 sm:p-10">
            <div className="flex justify-center mb-10">
              <div className="flex items-center text-white scale-[1.4] select-none font-[family-name:var(--font-montserrat)] font-black uppercase">
                <span className="text-[32px] tracking-[-0.05em] mr-[1.5px]">R</span>
                <div className="w-[26px] h-[26px] flex items-center justify-center transform -translate-y-[0.5px]">
                  <img src="/roblox-icon.svg" alt="" className="w-full h-full brightness-0 invert" />
                </div>
                <span className="text-[32px] tracking-[-0.05em] ml-[1.5px]">blox</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Username/Email/Phone"
                className="w-full bg-[#393b3d] text-white rounded-[4px] px-4 py-3.5 placeholder-[#a1a1a1] focus:outline-none focus:ring-1 focus:ring-white/40 text-[15px]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full bg-[#393b3d] text-white rounded-[4px] px-4 py-3.5 placeholder-[#a1a1a1] focus:outline-none focus:ring-1 focus:ring-white/40 text-[15px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="w-full bg-transparent border border-white/60 text-white py-2.5 rounded-[4px] font-bold hover:bg-white/5 active:scale-[0.98] transition-all text-[16px] mt-2">
                Log In
              </button>
            </form>

            <div className="mt-4 text-center">
              <a href="#" className="text-white hover:underline text-[13px] font-medium opacity-90">
                Forgot Password or Username?
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
              <button className="w-full bg-[#393b3d] text-white py-3 rounded-[4px] font-bold hover:bg-[#4a4c4e] active:scale-[0.98] transition-all text-[14px]">
                Email Me a One-Time Code
              </button>
              <button className="w-full bg-[#393b3d] text-white py-3 rounded-[4px] font-bold hover:bg-[#4a4c4e] active:scale-[0.98] transition-all text-[14px]">
                Quick Sign-in
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-white text-[13px] opacity-90">
                Don't have an account?{" "}
                <a href="/register" className="font-bold hover:underline">
                  Sign Up
                </a>
              </p>
            </div>

            {message && (
              <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded p-4 text-center">
                <p className="text-green-400 text-[14px] font-medium">{message}</p>
              </div>
            )}
            {error && (
              <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded p-4 text-center">
                <p className="text-red-400 text-[14px] font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
