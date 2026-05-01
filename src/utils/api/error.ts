import { NextResponse } from 'next/server'

import {
  BackendFailedError,
  InvalidRequestError,
  NotFoundError,
} from '@/services/errors'

type Handler = (req: Request) => Promise<Response> | Response

export function handleApiError(error: unknown): Response {
  if (error instanceof InvalidRequestError) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  if (error instanceof NotFoundError) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }
  if (error instanceof BackendFailedError) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  console.error('Unexpected API error:', error)
  return NextResponse.json(
    {
      error: 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && {
        details: error instanceof Error ? error.message : String(error),
      }),
    },
    { status: 500 }
  )
}

export function withErrorHandling(handler: Handler): Handler {
  return async (req) => {
    try {
      return await handler(req)
    } catch (error) {
      return handleApiError(error)
    }
  }
}
