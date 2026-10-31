import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// 1. Initialize Upstash Redis if credentials are provided in env
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

// Production rate-limiter: 3 requests per 60 seconds per IP
export const rateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "60 s"),
      analytics: true,
      prefix: "portfolio_ratelimit",
    })
  : null;

// In-memory fallback rate-limiter if Upstash is not yet connected
const inMemoryHits = new Map<string, { count: number; resetTime: number }>();

export async function checkRateLimit(identifier: string): Promise<{ success: boolean; remaining: number }> {
  if (rateLimiter) {
    try {
      const res = await rateLimiter.limit(identifier);
      return { success: res.success, remaining: res.remaining };
    } catch (err) {
      console.warn("[RateLimit Error] Upstash check failed, falling back to in-memory:", err);
    }
  }

  // In-Memory Fallback Shield (prevents spam even without Redis setup)
  const now = Date.now();
  const entry = inMemoryHits.get(identifier);

  if (!entry || now > entry.resetTime) {
    inMemoryHits.set(identifier, { count: 1, resetTime: now + 60000 });
    return { success: true, remaining: 2 };
  }

  if (entry.count >= 3) {
    return { success: false, remaining: 0 };
  }

  entry.count += 1;
  return { success: true, remaining: 3 - entry.count };
}

