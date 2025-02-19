// app/[locale]/(root)/layout.tsx

import Header from "@/components/shared/header";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
