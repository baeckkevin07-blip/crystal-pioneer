'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { sendBulkConsentRequests } from '@/app/actions/campaigns'
import { useRouter } from 'next/navigation'

interface Pharmacy {
    id: string
    name: string
    email: string
    address: string | null
}

export default function SimpleBulkSelector({
    campaignId,
    availablePharmacies
}: {
    campaignId: string
    availablePharmacies: Pharmacy[]
}) {
    const [showModal, setShowModal] = useState(false)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const filtered = availablePharmacies.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase())
    )

    const toggleSelect = (id: string) => {
        const newSet = new Set(selectedIds)
        if (newSet.has(id)) {
            newSet.delete(id)
        } else {
            newSet.add(id)
        }
        setSelectedIds(newSet)
    }

    const selectAll = () => {
        setSelectedIds(new Set(filtered.map(p => p.id)))
    }

    const deselectAll = () => {
        setSelectedIds(new Set())
    }

    const handleSend = async () => {
        if (selectedIds.size === 0) return

        setLoading(true)
        try {
            await sendBulkConsentRequests(campaignId, Array.from(selectedIds))
            setShowModal(false)
            setSelectedIds(new Set())
            router.refresh()
        } catch (error) {
            console.error('Error:', error)
            alert('Erreur lors de l\'envoi')
        } finally {
            setLoading(false)
        }
    }

    if (!showModal) {
        return (
            <Button
                variant="outline"
                className="bg-white"
                onClick={() => setShowModal(true)}
            >
                📋 Sélectionner les pharmacies ({availablePharmacies.length})
            </Button>
        )
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold">Sélectionner les pharmacies</h2>
                    <p className="text-gray-500 mt-1">
                        Choisissez les pharmacies ({availablePharmacies.length} disponibles)
                    </p>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    />

                    {/* Select All */}
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={selectAll}>
                            Tout sélectionner
                        </Button>
                        <Button size="sm" variant="outline" onClick={deselectAll}>
                            Tout désélectionner
                        </Button>
                        {selectedIds.size > 0 && (
                            <span className="ml-auto text-sm text-gray-500 self-center">
                                {selectedIds.size} sélectionnée(s)
                            </span>
                        )}
                    </div>

                    {/* List */}
                    <div className="space-y-2">
                        {filtered.map((pharmacy) => (
                            <div
                                key={pharmacy.id}
                                onClick={() => toggleSelect(pharmacy.id)}
                                className={`p-4 border rounded-lg cursor-pointer transition ${selectedIds.has(pharmacy.id)
                                        ? 'bg-blue-50 border-blue-300'
                                        : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.has(pharmacy.id)}
                                        onChange={() => toggleSelect(pharmacy.id)}
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium">{pharmacy.name}</p>
                                        <p className="text-sm text-gray-500">{pharmacy.email}</p>
                                        {pharmacy.address && (
                                            <p className="text-xs text-gray-400">{pharmacy.address}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t flex gap-3 justify-end">
                    <Button variant="outline" onClick={() => setShowModal(false)}>
                        Annuler
                    </Button>
                    <Button
                        onClick={handleSend}
                        disabled={selectedIds.size === 0 || loading}
                        className="bg-[#43B2B3] hover:bg-[#3AA2A3]"
                    >
                        {loading ? 'Envoi...' : `Envoyer à ${selectedIds.size} pharmacie${selectedIds.size > 1 ? 's' : ''}`}
                    </Button>
                </div>
            </div>
        </div>
    )
}
