import AIChat from "@/components/AIChat";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">AI-Powered Management System</h1>
      <AIChat />
    </main>
  );
}
