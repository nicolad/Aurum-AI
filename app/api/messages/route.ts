import { NextResponse } from 'next/server'

import OpenAI from 'openai'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function GET(req: Request) {
  const url = new URL(req.url)

  // Get the threadID from the URL search parameters
  const threadID = url.searchParams.get('threadID')

  if (!threadID) {
    // If threadID is not provided, return an error response
    return new NextResponse('Query parameter "threadID" is required', {
      status: 400
    })
  }

  const messages = await openai.beta.threads.messages.list(threadID)
  console.log(messages)

  return NextResponse.json({
    messages
  })
}
