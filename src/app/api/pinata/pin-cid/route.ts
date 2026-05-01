import { NextResponse } from 'next/server'

import { pinCidToIPFS } from '@/services/pinataService'
import { withErrorHandling } from '@/utils/api/error'

export const POST = withErrorHandling(async (req: Request) => {
  const body = await req.json()
  const { cid, name, group_id } = body
  const result = await pinCidToIPFS({ cid, name, group_id })
  return NextResponse.json({ text: result.status })
})
