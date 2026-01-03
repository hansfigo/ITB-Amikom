import { AlertCircle, CheckCircle2, Lock, Mail } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MainLayout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../context/AuthContext";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [email, setEmail] = useState("user@mahasiswa.xyz.ac.id");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      setStatus({ type: "success", message: "Login berhasil. Selamat datang, Ismail." });
      setTimeout(() => navigate("/"), 900);
    } else {
      setStatus({ type: "error", message: result.message });
    }

    setIsSubmitting(false);
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-[#e9f3fb] via-white to-[#f5fbff] py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center px-6">
          <div className="hidden lg:block">
            <div className="relative w-full overflow-hidden rounded-[32px] shadow-[0_24px_80px_rgba(6,96,166,0.25)]">
              <img src="/img-login.png" alt="Login illustration" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
             
              
            </div>
          </div>

          <div className="bg-white/90 rounded-[24px] shadow-[0_20px_60px_rgba(6,96,166,0.15)] border border-slate-100 p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0660a6] flex items-center justify-center text-white font-semibold">
                AK
              </div>
              <div className="text-sm text-gray-700">
                Akademik dan Kemahasiswaan
                <div className="font-semibold text-[#0f172a]">Kampus XYZ</div>
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-[#0f172a]">Welcome Back!</h1>
            <p className="text-sm text-gray-600 mb-6">Masuk untuk melanjutkan ke halaman Ismail.</p>

            {status && (
              <div
                className={`mb-5 flex items-start gap-3 rounded-xl border px-3 py-3 text-sm ${
                  status.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
                role="status"
                aria-live="polite"
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 shrink-0" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="space-y-2 block">
                <span className="text-sm font-medium text-[#0f172a]">Email</span>
                <div className="relative">
                  <Mail className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 pl-10 rounded-lg border-gray-200 focus-visible:ring-[#069dd8]"
                    placeholder="user@mahasiswa.xyz.ac.id"
                  />
                </div>
              </label>

              <label className="space-y-2 block">
                <span className="text-sm font-medium text-[#0f172a]">Password</span>
                <div className="relative">
                  <Lock className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pl-10 rounded-lg border-gray-200 focus-visible:ring-[#069dd8]"
                    placeholder="password123"
                  />
                </div>
              </label>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Gunakan email & password yang sudah terdaftar.</span>
                <button type="button" className="text-[#069dd8] font-medium hover:underline">
                  Lupa password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-full bg-[#069dd8] text-white font-semibold hover:bg-[#0660a6] disabled:opacity-70"
              >
                {isSubmitting ? "Memproses..." : "Masuk"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Belum punya akun?{" "}
              <button type="button" className="text-[#069dd8] font-semibold hover:underline">
                Daftar
              </button>
            </div>

            <div className="mt-4 rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 text-xs text-gray-600">
              Demo akun: <span className="font-semibold">user@mahasiswa.xyz.ac.id</span> /{" "}
              <span className="font-semibold">password123</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
