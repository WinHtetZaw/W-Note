type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <main className="min-h-screenrelative flex items-center justify-center px-6 py-10 bg-zinc-950 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-150 w-150 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[160px]" />
      </div>
      {children}
    </main>
  );
}
