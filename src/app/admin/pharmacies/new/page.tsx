import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { createPharmacy } from "@/app/actions/pharmacies"

export default function NewPharmacyPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/pharmacies" className="text-blue-600 hover:underline">
                    &larr; Retour à la liste
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Ajouter une pharmacie</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={createPharmacy} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom de la pharmacie *</Label>
                            <Input id="name" name="name" placeholder="Ex: Pharmacie du Centre" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input id="email" name="email" type="email" placeholder="contact@pharmacie.com" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input id="phone" name="phone" placeholder="01 23 45 67 89" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Adresse / Ville</Label>
                            <Input id="address" name="address" placeholder="12 Rue de la Paix, 75000 Paris" />
                        </div>

                        <Button type="submit" className="w-full">Enregistrer</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
