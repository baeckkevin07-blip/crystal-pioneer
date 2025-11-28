import Link from "next/link"
import Image from "next/image"
import LogoutButton from "@/components/logout-button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1C3656] text-white flex flex-col">
        <div className="p-6 flex flex-col items-center justify-center border-b border-gray-700">
          {/* Logo iDklic */}
          <div className="bg-white p-2 rounded-lg w-full flex justify-center">
            <Image
              src="/idklic-logo.png"
              alt="iDklic Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-[#2C4666] transition-colors">
            📊 Tableau de bord
          </Link>
          <Link href="/admin/pharmacies" className="block px-4 py-2 rounded hover:bg-[#2C4666] transition-colors">
            💊 Pharmacies
          </Link>
          <Link href="/admin/campaigns" className="block px-4 py-2 rounded hover:bg-[#2C4666] transition-colors">
            📧 Campagnes
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <LogoutButton label="Se déconnecter" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}
