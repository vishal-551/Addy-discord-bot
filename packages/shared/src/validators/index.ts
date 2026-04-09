import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20)
});

export const guildSettingsSchema = z.object({
  guildId: z.string().min(8),
  botKey: z.string().min(3),
  config: z.record(z.any())
});

export const paymentCreateSchema = z.object({
  guildId: z.string(),
  botKey: z.string(),
  planCode: z.string(),
  provider: z.enum(["STRIPE", "RAZORPAY", "PAYPAL", "MANUAL", "UPI"]),
  amount: z.number().positive(),
  coupon: z.string().optional()
});
