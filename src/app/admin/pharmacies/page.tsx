import prisma from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

async function getPharmacies() {
    return await prisma.pharmacy.findMany({
        orderBy: { name: 'asc' },
        include: {
            tags: true
        }
    })
}

async function getAllTags() {
    return await prisma.tag.findMany({ orderBy: { name: 'asc' } })
}

import PharmacyTable from "@/components/pharmacy-table"

export default async function PharmaciesPage() {
    const pharmacies = await getPharmacies()
    const allTags = await getAllTags()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-[#1C3656]">Pharmacies</h2>
                <Link href="/admin/pharmacies/new">
                    <Button className="bg-[#43B2B3] hover:bg-[#3AA2A3]">
                        Ajouter une pharmacie
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Liste des pharmacies ({pharmacies.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <PharmacyTable pharmacies={pharmacies} allTags={allTags} />
                </CardContent>
            </Card>
        </div>
    )
}
