import React, { useState } from 'react'
import SearchInput from './SearchInput.jsx'
import UserDetail from './UserDetail.jsx'

export default function SearchPage() {
  const [selectedUserId, setSelectedUserId] = useState(null)
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Search Users</h1>

      {/* Search input */}
      <SearchInput onSelectUser={setSelectedUserId} />

      {/* User detail fetched by ID */}
      <UserDetail userId={selectedUserId} />
    </div>
  )
}
