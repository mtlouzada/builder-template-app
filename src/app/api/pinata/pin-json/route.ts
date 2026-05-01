import { NextResponse } from 'next/server'

import { pinJsonToIPFS } from '@/services/pinataService'
import { withErrorHandling } from '@/utils/api/error'

export const POST = withErrorHandling(async (req: Request) => {
  const body = await req.json()
  const result = await pinJsonToIPFS(body)
  return NextResponse.json(result)
})
