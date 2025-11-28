import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full space-y-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-4xl">🤔</span>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-[#1C3656]">Page introuvable</h1>
                    <p className="text-gray-500">
                        Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
                    </p>
                </div>

                <Button asChild className="w-full bg-[#43B2B3] hover:bg-[#3AA2A3] h-12 text-lg">
                    <Link href="/admin/dashboard">
                        <Home className="mr-2 h-5 w-5" />
                        Retour au tableau de bord
                    </Link>
                </Button>
            </div>

            <div className="mt-8 text-gray-400 text-sm">
                iDklic - Crystal Pioneer
            </div>
        </div>
    )
}
