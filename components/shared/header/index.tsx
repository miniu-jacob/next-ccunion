// components/shared/header/index.tsx

import Navbar from "./navbar";

export default function Header(){
  return (
    <header className="h-16 bg-background/40 sticky top-0 border-b px-8 backdrop-blur flex items-center justify-between">
      <Navbar />

    </header>
  )
}