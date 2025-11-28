'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { deleteCampaign } from "@/app/actions/delete-campaign"
import { useRouter } from "next/navigation"

export default function DeleteCampaignButton({ campaignId, campaignName }: { campaignId: string, campaignName: string }) {
    const [open, setOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    async function handleDelete() {
        setIsPending(true)
        const result = await deleteCampaign(campaignId)

        if (result.error) {
            alert(result.error)
            setIsPending(false)
            setOpen(false)
        } else {
            router.push('/admin/campaigns')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    🗑️ Supprimer la campagne
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                    <DialogDescription>
                        Êtes-vous sûr de vouloir supprimer la campagne <strong>&quot;{campaignName}&quot;</strong> ?
                        <br /><br />
                        Tous les consentements associés seront également supprimés. Cette action est irréversible.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
                        Annuler
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
                        {isPending ? 'Suppression...' : 'Supprimer définitivement'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
