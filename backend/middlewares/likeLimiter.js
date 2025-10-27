import rateLimit from "express-rate-limit";

export const likeLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 3, // max 3 requests per 10 seconds per user
  // message: "Too many like/unlike actions. Please wait a few seconds.",
  keyGenerator: (req) => req.userId.toString(), // rate limit per user
  handler: (req, res /* , next, options */) => {
    res.status(429).json({
      success: false,
      message: "Too many like/unlike actions. Please wait a few seconds.",
    });
  },
});