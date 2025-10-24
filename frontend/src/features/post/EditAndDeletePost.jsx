import React from 'react'
import { Button } from '../../components/ui/button.jsx'
import { Ellipsis } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu.jsx'

export default function EditAndDeletePost() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
      >
        <Ellipsis className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-400 focus:text-red-600">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    
    </div>
  )
}
