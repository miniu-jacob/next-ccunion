// app/[locale]/(home)/layout.tsx

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
