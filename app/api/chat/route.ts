import { NextResponse } from 'next/server'

import OpenAI from 'openai'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  const math_tutor_assistant = await openai.beta.assistants.create({
    instructions:
      'You are a personal math tutor. When asked a question, write and run Python code to answer the question.',
    name: 'Math Tutor',
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-4'
  })

  const thread = await openai.beta.threads.create({})

  await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: 'I need to solve the equation `3x + 11 = 14`. Can you help me?'
  })

  await openai.beta.threads.runs.create(thread.id, {
    assistant_id: math_tutor_assistant.id,
    instructions:
      'Please address the user as Jane Doe. The user has a premium account. Return also the Python code that you used to solve the equation.'
  })

  return NextResponse.json({
    id: thread.id
  })
}
