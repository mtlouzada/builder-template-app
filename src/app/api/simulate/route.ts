import { NextResponse } from 'next/server'

import { InvalidRequestError } from '@/services/errors'
import { simulate } from '@/services/simulationService'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = await simulate(body)
    return NextResponse.json(result)
  } catch (error) {
    console.error(error)

    if (error instanceof InvalidRequestError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    if ((error as Error).message?.includes('insufficient funds for')) {
      return NextResponse.json(
        {
          error:
            'Insufficient treasury funds to carry out some or all of these transactions',
        },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Unexpected Error: Unable to simulate these transactions' },
      { status: 500 }
    )
  }
}
