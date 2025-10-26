
import React, { useEffect, useRef, useState } from 'react'
import { useLazySearchUserQuery } from './searchApi.js';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar.jsx';
import { Input } from '../../components/ui/input.jsx';

export default function SearchInput({ onSelectUser }) {
  const [term, setTerm] = useState('');
  const [trigger, { data, isFetching }] = useLazySearchUserQuery();
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  // Debounce search input
  useEffect(() => {
    if (term.trim()) {
      const handler = setTimeout(() => {
        trigger(term)
        setOpen(true)
      }, 400)
      return () => clearTimeout(handler)
    } else {
      setOpen(false)
    }
  }, [term, trigger]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const users = data || [];
  return (
    <div className="relative max-w-sm" ref={containerRef}>
      <Input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search users..."
        className="flex-1 rounded-full bg-gray-50 border-gray-200"
        // className="border border-gray-500 h-8 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
      />

      {/* Dropdown search results */}
      {open && (
        <div className="absolute top-12 left-0 w-full bg-white border rounded-md shadow-lg max-h-80 overflow-y-auto">
          {isFetching && (
            <p className="p-3 text-gray-500 text-sm">Searching...</p>
          )}

          {!isFetching && users.length === 0 && term && (
            <p className="p-3 text-gray-500 text-sm">No users found</p>
          )}

          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center border-b-1 p-2 gap-2 hover:bg-gray-200 transition cursor-pointer z-40"
              onClick={() => {
                onSelectUser(user._id)
                setOpen(false)
                setTerm('')
              }}
            >
              <Avatar className="h-9 w-9 ">
                <AvatarImage src={user.profilePicture.url} alt={user.username} />
                <AvatarFallback>{user.username ? user.username[0].toUpperCase() : "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-gray-500 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
