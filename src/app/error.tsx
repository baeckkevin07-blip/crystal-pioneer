'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full space-y-6">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                    <AlertTriangle className="h-10 w-10 text-red-500" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-[#1C3656]">Une erreur est survenue</h1>
                    <p className="text-gray-500">
                        Nos équipes ont été notifiées. Veuillez réessayer dans quelques instants.
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-left text-xs font-mono text-gray-500 overflow-auto max-h-32">
                    {error.message || "Erreur inconnue"}
                </div>

                <Button
                    onClick={reset}
                    className="w-full bg-[#43B2B3] hover:bg-[#3AA2A3] h-12 text-lg"
                >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Réessayer
                </Button>
            </div>
        </div>
    )
}
