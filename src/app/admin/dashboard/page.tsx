import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import DashboardCharts from "@/components/dashboard-charts"

// Désactiver le cache pour avoir des stats en temps réel
export const revalidate = 0

async function getAnalytics() {
  const pharmacyCount = await prisma.pharmacy.count()
  const activeCampaigns = await prisma.campaign.count({
    where: { status: 'ACTIVE' }
  })
  const totalCampaigns = await prisma.campaign.count()

  const consents = await prisma.consent.findMany()
  const acceptedConsents = consents.filter(c => c.status === 'ACCEPTED').length
  const declinedConsents = consents.filter(c => c.status === 'DECLINED').length
  const pendingConsents = consents.filter(c => c.status === 'PENDING').length

  const totalResponses = acceptedConsents + declinedConsents
  const acceptanceRate = totalResponses > 0 ? Math.round((acceptedConsents / totalResponses) * 100) : 0
  const responseRate = consents.length > 0 ? Math.round((totalResponses / consents.length) * 100) : 0

  // Get campaign performance stats
  const campaigns = await prisma.campaign.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { consents: true }
  })

  const campaignStats = campaigns.map(c => ({
    name: c.name,
    accepted: c.consents.filter(co => co.status === 'ACCEPTED').length,
    declined: c.consents.filter(co => co.status === 'DECLINED').length,
    pending: c.consents.filter(co => co.status === 'PENDING').length,
  }))

  // Get top pharmacies
  const pharmacies = await prisma.pharmacy.findMany({
    include: { consents: true }
  })

  const topPharmacies = pharmacies
    .map(p => ({
      name: p.name,
      accepted: p.consents.filter(c => c.status === 'ACCEPTED').length,
      total: p.consents.length
    }))
    .sort((a, b) => b.accepted - a.accepted)
    .slice(0, 5)

  return {
    pharmacyCount,
    activeCampaigns,
    totalCampaigns,
    acceptedConsents,
    declinedConsents,
    pendingConsents,
    acceptanceRate,
    responseRate,
    campaignStats,
    topPharmacies
  }
}

export default async function DashboardPage() {
  const stats = await getAnalytics()

  const statusData = [
    { name: 'Acceptés', value: stats.acceptedConsents },
    { name: 'Refusés', value: stats.declinedConsents },
    { name: 'En attente', value: stats.pendingConsents }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        <p className="text-gray-500">Vue d&apos;overview de vos campagnes pharmaceutiques</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pharmacies</CardTitle>
            <span className="text-2xl">💊</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1C3656]">{stats.pharmacyCount}</div>
            <p className="text-xs text-muted-foreground">Partenaires actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campagnes Actives</CardTitle>
            <span className="text-2xl">📧</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#43B2B3]">{stats.activeCampaigns}</div>
            <p className="text-xs text-muted-foreground">Sur {stats.totalCampaigns} au total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d&apos;Acceptation</CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.acceptanceRate}%</div>
            <p className="text-xs text-muted-foreground">{stats.acceptedConsents} acceptés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Réponse</CardTitle>
            <span className="text-2xl">📊</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.responseRate}%</div>
            <p className="text-xs text-muted-foreground">{stats.pendingConsents} en attente</p>
          </CardContent>
        </Card>
      </div>

      <DashboardCharts
        statusData={statusData}
        campaignStats={stats.campaignStats}
        topPharmacies={stats.topPharmacies}
      />
    </div>
  )
}
