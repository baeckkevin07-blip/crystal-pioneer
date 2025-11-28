import prisma from "@/lib/prisma"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

async function getCampaigns() {
    return await prisma.campaign.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            _count: {
                select: { consents: true }
            }
        }
    })
}

export default async function CampaignsPage() {
    const campaigns = await getCampaigns()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Campagnes</h2>
                <Link href="/admin/campaigns/new">
                    <Button>Nouvelle Campagne</Button>
                </Link>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Mois</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Pharmacies contactées</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaigns.map((campaign) => (
                            <TableRow key={campaign.id}>
                                <TableCell className="font-medium">{campaign.name}</TableCell>
                                <TableCell>{campaign.month}</TableCell>
                                <TableCell>
                                    <Badge variant={campaign.status === 'ACTIVE' ? 'default' : 'secondary'}>
                                        {campaign.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{campaign._count.consents}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/admin/campaigns/${campaign.id}`}>
                                        <Button variant="outline" size="sm">Gérer</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
