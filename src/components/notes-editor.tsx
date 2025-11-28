'use client'

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { updatePharmacyNotes } from "@/app/actions/tags"

export default function NotesEditor({ pharmacyId, initialNotes }: { pharmacyId: string, initialNotes: string }) {
    const [notes, setNotes] = useState(initialNotes || "")
    const [isSaving, setIsSaving] = useState(false)

    async function handleSave() {
        setIsSaving(true)
        await updatePharmacyNotes(pharmacyId, notes)
        setIsSaving(false)
    }

    return (
        <div className="space-y-2">
            <Textarea
                placeholder="Notes internes sur cette pharmacie (ex: Préférences de contact, historique...)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[150px] resize-none"
            />
            <div className="flex justify-end">
                <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-[#1C3656] hover:bg-[#2C4666]"
                >
                    {isSaving ? 'Enregistrement...' : 'Enregistrer les notes'}
                </Button>
            </div>
        </div>
    )
}
