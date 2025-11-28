'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addPharmacyToCampaign } from "@/app/actions/add-pharmacy-to-campaign"

export default function AddPharmacyForm({
    campaignId,
    pharmacies
}: {
    campaignId: string
    pharmacies: { id: string, name: string }[]
}) {
    const [selectedId, setSelectedId] = useState<string>("")
    const [isPending, setIsPending] = useState(false)

    async function handleAdd() {
        if (!selectedId) return
        setIsPending(true)
        await addPharmacyToCampaign(campaignId, selectedId)
        setIsPending(false)
        setSelectedId("")
    }

    return (
        <div className="flex items-center gap-2">
            <Select value={selectedId} onValueChange={setSelectedId}>
                <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Ajouter une pharmacie..." />
                </SelectTrigger>
                <SelectContent>
                    {pharmacies.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                            {p.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button onClick={handleAdd} disabled={!selectedId || isPending} variant="secondary">
                Ajouter pour test
            </Button>
        </div>
    )
}
