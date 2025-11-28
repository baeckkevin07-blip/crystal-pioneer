'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { assignTagToPharmacy, removeTagFromPharmacy, createTag } from "@/app/actions/tags"

interface Tag {
    id: string
    name: string
    color: string
}

interface TagManagerProps {
    pharmacyId: string
    assignedTags: Tag[]
    allTags: Tag[]
}

export default function TagManager({ pharmacyId, assignedTags, allTags }: TagManagerProps) {
    const [newTagName, setNewTagName] = useState("")
    const [isPending, setIsPending] = useState(false)

    const unassignedTags = allTags.filter(
        t => !assignedTags.some(at => at.id === t.id)
    )

    async function handleCreateTag() {
        if (!newTagName.trim()) return
        setIsPending(true)
        await createTag(newTagName)
        setNewTagName("")
        setIsPending(false)
    }

    async function handleAssign(tagId: string) {
        await assignTagToPharmacy(pharmacyId, tagId)
    }

    async function handleRemove(tagId: string) {
        await removeTagFromPharmacy(pharmacyId, tagId)
    }

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
                {assignedTags.map(tag => (
                    <Badge
                        key={tag.id}
                        style={{ backgroundColor: tag.color }}
                        className="text-white px-2 py-1 flex items-center gap-1 hover:opacity-90"
                    >
                        {tag.name}
                        <button
                            onClick={() => handleRemove(tag.id)}
                            className="ml-1 hover:bg-black/20 rounded-full p-0.5"
                        >
                            <X size={12} />
                        </button>
                    </Badge>
                ))}

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-7 text-xs border-dashed">
                            <Plus size={14} className="mr-1" /> Ajouter un tag
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-3" align="start">
                        <div className="space-y-3">
                            <h4 className="font-medium text-sm text-gray-900">Tags disponibles</h4>

                            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                                {unassignedTags.length === 0 && (
                                    <p className="text-xs text-gray-500 italic">Aucun autre tag disponible</p>
                                )}
                                {unassignedTags.map(tag => (
                                    <Badge
                                        key={tag.id}
                                        variant="outline"
                                        className="cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleAssign(tag.id)}
                                    >
                                        {tag.name}
                                    </Badge>
                                ))}
                            </div>

                            <div className="border-t pt-3">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Nouveau tag..."
                                        className="h-8 text-xs"
                                        value={newTagName}
                                        onChange={(e) => setNewTagName(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleCreateTag()}
                                    />
                                    <Button
                                        size="sm"
                                        className="h-8 bg-[#43B2B3] hover:bg-[#3AA2A3]"
                                        onClick={handleCreateTag}
                                        disabled={isPending || !newTagName.trim()}
                                    >
                                        <Plus size={14} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
