
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { updatePharmacy } from "@/app/actions/pharmacies"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import DeletePharmacyButton from "@/components/delete-pharmacy-button"
import TagManager from "@/components/tag-manager"
import NotesEditor from "@/components/notes-editor"
import { Badge } from "@/components/ui/badge"

async function getPharmacy(id: string) {
  return await prisma.pharmacy.findUnique({
    where: { id },
    include: {
      tags: true,
      consents: {
        include: {
          campaign: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })
}

async function getAllTags() {
  return await prisma.tag.findMany({ orderBy: { name: 'asc' } })
}

export default async function EditPharmacyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pharmacy = await getPharmacy(id)
  const allTags = await getAllTags()

  if (!pharmacy) {
    redirect('/admin/pharmacies')
  }

  // Calculate stats
  const totalCampaigns = pharmacy.consents.length
  const accepted = pharmacy.consents.filter(c => c.status === 'ACCEPTED').length
  const participationRate = totalCampaigns > 0 ? Math.round((accepted / totalCampaigns) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/pharmacies" className="text-blue-600 hover:underline">
            &larr; Retour
          </Link>
          <h1 className="text-2xl font-bold text-[#1C3656]">{pharmacy.name}</h1>
          <Badge variant={pharmacy.status === 'ACTIVE' ? 'default' : 'secondary'}>
            {pharmacy.status}
          </Badge>
        </div>
        <DeletePharmacyButton pharmacyId={id} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Taux de participation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#43B2B3]">{participationRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Campagnes acceptées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accepted} / {totalCampaigns}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Dernière activité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">
              {pharmacy.consents[0]?.updatedAt.toLocaleDateString('fr-FR') || '-'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">📝 Détails & Tags</TabsTrigger>
          <TabsTrigger value="history">📅 Historique Campagnes</TabsTrigger>
          <TabsTrigger value="notes">📒 Notes Internes</TabsTrigger>
        </TabsList>

        {/* DETAILS TAB */}
        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tags & Segmentation</CardTitle>
            </CardHeader>
            <CardContent>
              <TagManager
                pharmacyId={pharmacy.id}
                assignedTags={pharmacy.tags}
                allTags={allTags}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations Générales</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={updatePharmacy.bind(null, id)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de la pharmacie</Label>
                    <Input id="name" name="name" defaultValue={pharmacy.name} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" defaultValue={pharmacy.email} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" name="phone" defaultValue={pharmacy.phone || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse / Ville</Label>
                    <Input id="address" name="address" defaultValue={pharmacy.address || ''} />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-[#1C3656]">Enregistrer les modifications</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HISTORY TAB */}
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Campagnes</CardTitle>
            </CardHeader>
            <CardContent>
              {pharmacy.consents.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Aucune campagne pour le moment.</p>
              ) : (
                <div className="space-y-4">
                  {pharmacy.consents.map((consent) => (
                    <div key={consent.id} className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
                      <div>
                        <h4 className="font-semibold text-[#1C3656]">{consent.campaign.name}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(consent.campaign.month).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        {consent.respondedAt && (
                          <span className="text-xs text-gray-400">
                            Répondu le {consent.respondedAt.toLocaleDateString('fr-FR')}
                          </span>
                        )}
                        <Badge variant={
                          consent.status === 'ACCEPTED' ? 'default' :
                            consent.status === 'DECLINED' ? 'destructive' : 'secondary'
                        }>
                          {consent.status === 'ACCEPTED' ? '✅ Accepté' :
                            consent.status === 'DECLINED' ? '❌ Refusé' : '⏳ En attente'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* NOTES TAB */}
        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notes Internes</CardTitle>
            </CardHeader>
            <CardContent>
              <NotesEditor pharmacyId={pharmacy.id} initialNotes={pharmacy.notes || ''} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

