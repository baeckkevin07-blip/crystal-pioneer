'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import Link from "next/link"

interface Tag {
    id: string
    name: string
    color: string
}

interface Pharmacy {
    id: string
    name: string
    email: string
    address: string | null
    status: string
    tags: Tag[]
}

export default function PharmacyTable({ pharmacies, allTags }: { pharmacies: Pharmacy[], allTags: Tag[] }) {
    const [search, setSearch] = useState("")
    const [selectedTag, setSelectedTag] = useState<string>("all")

    const filtered = pharmacies.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.email.toLowerCase().includes(search.toLowerCase()) ||
            (p.address && p.address.toLowerCase().includes(search.toLowerCase()))

        const matchesTag = selectedTag === "all" || p.tags.some(t => t.id === selectedTag)

        return matchesSearch && matchesTag
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Input
                    placeholder="Rechercher par nom, email ou ville..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-md"
                />

                <Select value={selectedTag} onValueChange={setSelectedTag}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filtrer par tag" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous les tags</SelectItem>
                        {allTags.map(tag => (
                            <SelectItem key={tag.id} value={tag.id}>
                                🏷️ {tag.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <span className="text-sm text-gray-500">
                    {filtered.length} / {pharmacies.length} pharmacies
                </span>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Ville</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((pharmacy) => (
                            <TableRow key={pharmacy.id}>
                                <TableCell className="font-medium">{pharmacy.name}</TableCell>
                                <TableCell>{pharmacy.email}</TableCell>
                                <TableCell>{pharmacy.address}</TableCell>
                                <TableCell>
                                    <div className="flex gap-1 flex-wrap">
                                        {pharmacy.tags.map(tag => (
                                            <Badge key={tag.id} style={{ backgroundColor: tag.color }} className="text-white text-xs">
                                                {tag.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={pharmacy.status === 'ACTIVE' ? 'default' : 'secondary'}>
                                        {pharmacy.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/admin/pharmacies/${pharmacy.id}`}>
                                        <Button variant="outline" size="sm">
                                            Modifier
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                    Aucune pharmacie trouvée
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
