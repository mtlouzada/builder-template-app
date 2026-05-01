import { NextResponse } from 'next/server'

import { createSignedUploadUrl } from '@/services/pinataService'
import { withErrorHandling } from '@/utils/api/error'

export const POST = withErrorHandling(async (req: Request) => {
  const { type } = await req.json()
  const result = await createSignedUploadUrl(type)
  return NextResponse.json(result)
})
