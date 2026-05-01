import { NextResponse } from 'next/server'

import { getRedisConnection } from '@/services/redisConnection'

interface RateLimitOptions {
  /** Maximum requests within the time window. Default 30. */
  maxRequests?: number
  /** Window in seconds. Default 300 (5 minutes). */
  windowSeconds?: number
  /** Key prefix for this endpoint. Default "api". */
  keyPrefix?: string
}

type Handler = (req: Request) => Promise<Response> | Response

export const withRateLimit = ({
  maxRequests = 30,
  windowSeconds = 300,
  keyPrefix = 'api',
}: RateLimitOptions = {}) => {
  return (handler: Handler): Handler => {
    return async (req) => {
      try {
        const redis = getRedisConnection()
        if (!redis) {
          console.warn('Rate limiting skipped: Redis connection not available')
          return handler(req)
        }

        const xff =
          req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? ''
        const clientIp = xff.split(',')[0]?.trim() || 'unknown'
        const route = new URL(req.url).pathname
        const key = `${keyPrefix}:ratelimit:${route}:${clientIp}`

        const requests = await redis.incr(key)
        if (requests === 1) {
          await redis.expire(key, windowSeconds)
        } else {
          const ttl = await redis.ttl(key)
          if (ttl === -1) await redis.expire(key, windowSeconds)
        }

        if (requests > maxRequests) {
          return NextResponse.json(
            {
              error: 'Rate limit exceeded',
              retryAfter: windowSeconds,
              limit: maxRequests,
              windowSeconds,
            },
            {
              status: 429,
              headers: { 'Retry-After': String(windowSeconds) },
            }
          )
        }

        const res = await handler(req)
        const headers = new Headers(res.headers)
        headers.set('X-RateLimit-Limit', String(maxRequests))
        headers.set(
          'X-RateLimit-Remaining',
          String(Math.max(0, maxRequests - requests))
        )
        headers.set(
          'X-RateLimit-Reset',
          String(Math.floor(Date.now() / 1000) + windowSeconds)
        )
        return new Response(res.body, {
          status: res.status,
          statusText: res.statusText,
          headers,
        })
      } catch (error) {
        console.error('Rate limiting error:', error)
        return handler(req)
      }
    }
  }
}
