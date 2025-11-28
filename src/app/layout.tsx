import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ecoathome - Gestion des Campagnes",
  description: "Plateforme de gestion des campagnes de sensibilisation pour pharmacies",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
