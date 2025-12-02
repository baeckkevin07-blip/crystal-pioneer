'use server'

import { signIn } from '@/auth'

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirectTo: '/admin/dashboard',
        })
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('CredentialsSignin')) {
                return 'Identifiants invalides.'
            }
        }

        // AuthJS throws a redirect error when successful - this is expected behavior
        throw error
    }

    return 'Identifiants invalides.'
}
