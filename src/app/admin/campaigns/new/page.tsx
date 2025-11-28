'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { createCampaign } from "@/app/actions/campaigns"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { campaignTemplates } from "@/lib/campaign-templates"

export default function NewCampaignPage() {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState('custom')

    async function handleSubmit(formData: FormData) {
        setIsPending(true)
        const result = await createCampaign(formData)
        if (result.success && result.id) {
            router.push(`/admin/campaigns/${result.id}`)
        }
        setIsPending(false)
    }

    const template = campaignTemplates.find(t => t.id === selectedTemplate) || campaignTemplates[campaignTemplates.length - 1]

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/campaigns" className="text-blue-600 hover:underline">
                    &larr; Retour aux campagnes
                </Link>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Choisir un modèle de campagne</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {campaignTemplates.map((tmpl) => (
                            <button
                                key={tmpl.id}
                                type="button"
                                onClick={() => setSelectedTemplate(tmpl.id)}
                                className={`p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${selectedTemplate === tmpl.id
                                    ? 'border-blue-600 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-300'
                                    }`}
                            >
                                <div className="text-3xl mb-2">{tmpl.icon}</div>
                                <div className="font-semibold text-sm">{tmpl.name}</div>
                                {tmpl.description && (
                                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">{tmpl.description}</div>
                                )}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Détails de la campagne</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom de la campagne *</Label>
                            <Input
                                id="name"
                                name="name"
                                key={selectedTemplate}
                                placeholder="Ex: Campagne Diabète - Novembre 2025"
                                defaultValue={template.name !== 'Campagne Personnalisée' ? template.name : ''}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                key={selectedTemplate + '-desc'}
                                placeholder="Sensibilisation et dépistage..."
                                defaultValue={template.description}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="month">Mois (AAAA-MM) *</Label>
                            <Input
                                id="month"
                                name="month"
                                type="month"
                                key={selectedTemplate + '-month'}
                                defaultValue={template.defaultMonth()}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? 'Création...' : 'Créer la campagne'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
