'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { sendBulkConsentRequests } from '@/app/actions/campaigns'
import { useRouter } from 'next/navigation'

interface Pharmacy {
    id: string
    name: string
    email: string
    address: string | null
}

export default function BulkPharmacySelector({
    campaignId,
    availablePharmacies
}: {
    campaignId: string
    availablePharmacies: Pharmacy[]
}) {
    const [open, setOpen] = useState(false)
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const filtered = availablePharmacies.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        (p.address && p.address.toLowerCase().includes(search.toLowerCase()))
    )

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(filtered.map(p => p.id))
        } else {
            setSelectedIds([])
        }
    }

    const handleToggle = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        )
    }

    const handleSend = async () => {
        if (selectedIds.length === 0) return

        setLoading(true)
        try {
            await sendBulkConsentRequests(campaignId, selectedIds)
            setOpen(false)
            setSelectedIds([])
            router.refresh()
        } catch (error) {
            console.error('Error sending bulk consents:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-white">
                    📋 Sélectionner les pharmacies
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle>Sélectionner les pharmacies</DialogTitle>
                    <DialogDescription>
                        Choisissez les pharmacies qui recevront cette campagne ({availablePharmacies.length} disponibles)
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
                    {/* Search */}
                    <Input
                        placeholder="Rechercher par nom, email ou ville..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* Select All */}
                    <div className="flex items-center space-x-2 border-b pb-2">
                        <Checkbox
                            id="select-all"
                            checked={filtered.length > 0 && selectedIds.length === filtered.length}
                            onCheckedChange={handleSelectAll}
                        />
                        <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                            Tout sélectionner ({filtered.length})
                        </label>
                        {selectedIds.length > 0 && (
                            <span className="text-sm text-gray-500 ml-auto">
                                {selectedIds.length} sélectionnée(s)
                            </span>
                        )}
                    </div>

                    {/* Pharmacy List */}
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                        {filtered.map((pharmacy) => (
                            <div
                                key={pharmacy.id}
                                className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleToggle(pharmacy.id)}
                            >
                                <Checkbox
                                    checked={selectedIds.includes(pharmacy.id)}
                                    onCheckedChange={() => handleToggle(pharmacy.id)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{pharmacy.name}</p>
                                    <p className="text-xs text-gray-500">{pharmacy.email}</p>
                                    {pharmacy.address && (
                                        <p className="text-xs text-gray-400">{pharmacy.address}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <p className="text-center text-gray-500 py-8">
                                Aucune pharmacie trouvée
                            </p>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Annuler
                    </Button>
                    <Button
                        onClick={handleSend}
                        disabled={selectedIds.length === 0 || loading}
                        className="bg-[#43B2B3] hover:bg-[#3AA2A3]"
                    >
                        {loading ? 'Envoi...' : `Envoyer à ${selectedIds.length} pharmacie${selectedIds.length > 1 ? 's' : ''}`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
