"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (city: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-6 py-3 pl-12 rounded-full bg-white/30 backdrop-blur-md text-white placeholder-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
      </div>
    </form>
  )
}
