'use client'

import { signOut } from "next-auth/react"

export default function LogoutButton({ label }: { label: string }) {
    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' })
    }

    return (
        <button
            onClick={handleLogout}
            type="button"
            className="flex w-full items-center gap-2 rounded-md bg-red-500/10 px-4 py-2 text-sm font-medium text-red-200 hover:bg-red-500/20 hover:text-red-100"
        >
            🚪 {label}
        </button>
    )
}
