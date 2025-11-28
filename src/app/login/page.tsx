'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { authenticate } from '@/app/lib/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined)

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="flex flex-col items-center space-y-2">
                    {/* Logo placeholder - replace with actual logo path if available */}
                    <div className="h-12 w-12 bg-[#1C3656] rounded-full flex items-center justify-center text-white font-bold">iD</div>
                    <CardTitle className="text-2xl font-bold text-[#1C3656]">Connexion Admin</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={dispatch} className="space-y-4">
                        <div>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                required
                            />
                        </div>
                        <LoginButton />
                        <div
                            className="flex h-8 items-end space-x-1"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {errorMessage && (
                                <p className="text-sm text-red-500">{errorMessage}</p>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="w-full bg-[#43B2B3] hover:bg-[#3AA2A3]" disabled={pending}>
            {pending ? 'Connexion...' : 'Se connecter'}
        </Button>
    )
}
