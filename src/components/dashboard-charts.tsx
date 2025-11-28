'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#43B2B3', '#1C3656', '#FF8042']

interface DashboardChartsProps {
    statusData: { name: string; value: number }[]
    campaignStats: {
        name: string;
        accepted: number;
        declined: number;
        pending: number;
    }[]
    topPharmacies: {
        name: string;
        accepted: number;
        total: number;
    }[]
}

export default function DashboardCharts({ statusData, campaignStats, topPharmacies }: DashboardChartsProps) {
    return (
        <>
            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Répartition des Réponses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top 5 Pharmacies Participatives</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {topPharmacies.map((pharmacy, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-[#43B2B3]">#{index + 1}</span>
                                        <span className="text-sm font-medium">{pharmacy.name}</span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-bold text-[#1C3656]">{pharmacy.accepted}</span>
                                        <span className="text-gray-500"> / {pharmacy.total}</span>
                                    </div>
                                </div>
                            ))}
                            {topPharmacies.length === 0 && (
                                <p className="text-center text-gray-500 py-8">Aucune donnée disponible</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Campaign Performance */}
            <Card>
                <CardHeader>
                    <CardTitle>Performance des Dernières Campagnes</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={campaignStats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="accepted" stackId="a" fill="#43B2B3" name="Acceptés" />
                            <Bar dataKey="declined" stackId="a" fill="#FF8042" name="Refusés" />
                            <Bar dataKey="pending" stackId="a" fill="#1C3656" name="En attente" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </>
    )
}
