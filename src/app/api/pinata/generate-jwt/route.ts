import { NextResponse } from 'next/server'

import { generateUploadJWT } from '@/services/pinataService'
import { withErrorHandling } from '@/utils/api/error'

export const POST = withErrorHandling(async () => {
  const result = await generateUploadJWT()
  return NextResponse.json(result, {
    headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
  })
})
