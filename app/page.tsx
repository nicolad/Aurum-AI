'use client'
import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { useState } from 'react'
import axios from 'axios'

export const runtime = 'edge'

export default function IndexPage() {
  const id = nanoid()
  const [threadID, setThreadID] = useState('')
  const [messages, setMessages] = useState([])

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/messages?threadID=${threadID}`)
      setMessages(response.data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <input
          type="text"
          value={threadID}
          onChange={e => setThreadID(e.target.value)}
          placeholder="Enter thread ID"
          className="border p-2 rounded"
        />
        <button
          onClick={fetchMessages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
        >
          Get Messages
        </button>
      </div>
      <Chat id={id} />
    </>
  )
}
