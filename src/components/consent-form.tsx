'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { submitConsent } from "@/app/actions/consent"
import { CheckCircle2, XCircle } from "lucide-react"

interface ConsentFormProps {
    token: string
    initialStatus: string
    initialComment: string | null
}

export default function ConsentForm({ token, initialStatus, initialComment }: ConsentFormProps) {

    const [status, setStatus] = useState<string>(initialStatus)
    const [comment, setComment] = useState(initialComment || "")
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(newStatus: 'ACCEPTED' | 'DECLINED') {
        setIsSubmitting(true)
        try {
            await submitConsent(token, newStatus, comment)
            setStatus(newStatus)
        } catch (error) {
            console.error(error)
            alert("Une erreur est survenue")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (status !== 'PENDING') {
        return (
            <div className="text-center space-y-4 animate-in fade-in duration-500">
                {status === 'ACCEPTED' ? (
                    <div className="flex flex-col items-center text-green-600">
                        <CheckCircle2 className="h-16 w-16 mb-2" />
                        <h3 className="text-xl font-bold">Merci de votre réponse !</h3>
                        <p>Vous avez déjà répondu à cette demande.</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-red-600">
                        <XCircle className="h-16 w-16 mb-2" />
                        <h3 className="text-xl font-bold">Merci de votre réponse !</h3>
                        <p>Vous avez déjà répondu à cette demande.</p>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Textarea
                placeholder="Commentaire optionnel..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
            />

            <div className="grid grid-cols-2 gap-4">
                <Button
                    onClick={() => handleSubmit('ACCEPTED')}
                    disabled={isSubmitting}
                    className="bg-[#43B2B3] hover:bg-[#3AA2A3] h-12 text-lg"
                >
                    {isSubmitting ? 'Chargement...' : "J'accepte"}
                </Button>

                <Button
                    onClick={() => handleSubmit('DECLINED')}
                    disabled={isSubmitting}
                    variant="outline"
                    className="h-12 text-lg border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                    {isSubmitting ? 'Chargement...' : 'Je refuse'}
                </Button>
            </div>
        </div>
    )
}
