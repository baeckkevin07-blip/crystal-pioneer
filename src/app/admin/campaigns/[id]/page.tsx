import prisma from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sendConsentRequests } from "@/app/actions/campaigns"
import Link from "next/link"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

async function getCampaign(id: string) {
    return await prisma.campaign.findUnique({
        where: { id },
        include: {
            consents: {
                include: { pharmacy: true }
            }
        }
    })
}

import AddPharmacyForm from "@/components/add-pharmacy-form"
import DeleteCampaignButton from "@/components/delete-campaign-button"

async function getAvailablePharmacies(campaignId: string) {
    const pharmacies = await prisma.pharmacy.findMany({
        where: {
            status: 'ACTIVE',
            consents: {
                none: {
                    campaignId: campaignId
                }
            }
        },
        orderBy: { name: 'asc' }
    })
    return pharmacies
}

export default async function CampaignDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const campaign = await getCampaign(id)
    const availablePharmacies = await getAvailablePharmacies(id)

    if (!campaign) return <div>Campagne non trouvée</div>

    const acceptedCount = campaign.consents.filter(c => c.status === 'ACCEPTED').length
    const declinedCount = campaign.consents.filter(c => c.status === 'DECLINED').length
    const pendingCount = campaign.consents.filter(c => c.status === 'PENDING').length

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{campaign.name}</h2>
                    <p className="text-gray-500">{campaign.month} - {campaign.description}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <DeleteCampaignButton campaignId={campaign.id} campaignName={campaign.name} />

                    <Link href={`/api/campaigns/${campaign.id}/export`}>
                        <Button variant="outline" size="sm">
                            📊 Exporter CSV
                        </Button>
                    </Link>

                    <AddPharmacyForm campaignId={campaign.id} pharmacies={availablePharmacies} />

                    <form action={async () => {
                        'use server'
                        await sendConsentRequests(campaign.id)
                    }}>
                        <Button disabled={campaign.status === 'COMPLETED'} className="bg-[#43B2B3] hover:bg-[#3AA2A3]">
                            {campaign.status === 'DRAFT' ? 'Lancer pour TOUS' : 'Renvoyer manquants'}
                        </Button>
                    </form>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm">Acceptés</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold text-green-600">{acceptedCount}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm">Refusés</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold text-red-600">{declinedCount}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm">En attente</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold text-yellow-600">{pendingCount}</div></CardContent>
                </Card>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pharmacie</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Répondu le</TableHead>
                            <TableHead>Commentaire</TableHead>
                            <TableHead>Lien (Simulation)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaign.consents.map((consent) => (
                            <TableRow key={consent.id}>
                                <TableCell className="font-medium">{consent.pharmacy.name}</TableCell>
                                <TableCell className="text-sm text-gray-600">{consent.pharmacy.email}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        consent.status === 'ACCEPTED' ? 'default' :
                                            consent.status === 'DECLINED' ? 'destructive' : 'secondary'
                                    }>
                                        {consent.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-gray-600">
                                    {consent.respondedAt ? new Date(consent.respondedAt).toLocaleDateString('fr-FR') : '-'}
                                </TableCell>
                                <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                                    {consent.comment || '-'}
                                </TableCell>
                                <TableCell className="font-mono text-xs text-gray-400">
                                    /consent/{consent.token}
                                </TableCell>
                            </TableRow>
                        ))}
                        {campaign.consents.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                    Aucune demande envoyée pour le moment. Cliquez sur &quot;Lancer pour TOUS&quot; ou ajoutez une pharmacie pour test.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
