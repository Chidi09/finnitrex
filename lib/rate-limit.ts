
import { createClient } from 'redis';

// Use a global variable to preserve the client across hot reloads in development
const globalForRedis = global as unknown as { redis: ReturnType<typeof createClient> };

export const redis =
    globalForRedis.redis ||
    createClient({
        url: process.env.REDIS_URL,
    });

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

// Ensure connection is open
if (!redis.isOpen) {
    redis.connect().catch((err) => console.error('Redis Connection Error:', err));
}

type RateLimitContext = {
    ip: string;
    action: string;
    limit: number;
    windowMs: number;
};

type RateLimitResult = {
    success: boolean;
    remaining: number;
    reset: number;
};

// Fallback in-memory store
const memoryStore = new Map<string, { count: number; expiresAt: number }>();

export async function rateLimit({
    ip,
    action,
    limit,
    windowMs,
}: RateLimitContext): Promise<RateLimitResult> {
    const key = `rate_limit:${action}:${ip}`;

    // Check if Redis is configured and connected
    if (process.env.REDIS_URL && redis.isOpen) {
        try {
            const count = await redis.incr(key);

            // If first request, set expiry
            if (count === 1) {
                await redis.expire(key, Math.floor(windowMs / 1000));
            }

            const remaining = Math.max(0, limit - count);
            const reset = Date.now() + windowMs;

            return {
                success: count <= limit,
                remaining,
                reset,
            };
        } catch (error) {
            console.warn("Redis rate limit failed, falling back to memory:", error);
        }
    }

    // In-memory fallback
    const now = Date.now();
    const record = memoryStore.get(key);

    if (!record || now > record.expiresAt) {
        memoryStore.set(key, { count: 1, expiresAt: now + windowMs });
        return { success: true, remaining: limit - 1, reset: now + windowMs };
    }

    record.count += 1;
    const remaining = Math.max(0, limit - record.count);

    return {
        success: record.count <= limit,
        remaining,
        reset: record.expiresAt,
    };
}
