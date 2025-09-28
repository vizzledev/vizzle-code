// app/(auth)/layout.tsx
// NOTE: Do NOT include <html> or <body> here
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white">{children}</div>;
}
