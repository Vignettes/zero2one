import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-blue-500 to-emerald-400 flex items-center justify-center">
      <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-glitch-overlay opacity-5 pointer-events-none"></div>
      <div className="w-full max-w-md p-6 bg-dark-blue/80 backdrop-blur-md rounded-xl border border-teal-400/30 shadow-neon">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-glow">
            zero<span className="text-neon-green">2</span>one
          </h1>
          <p className="mt-2 text-white/80">Create your account</p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
