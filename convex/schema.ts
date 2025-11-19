import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  donations: defineTable({
    foodType: v.string(),
    quantity: v.string(),
    location: v.string(),
    coordinates: v.optional(
      v.object({
        lat: v.number(),
        lng: v.number(),
      })
    ),
    pickupBy: v.string(),
    contact: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    status: v.union(v.literal("available"), v.literal("claimed")),
    postedAt: v.string(),
    claimedBy: v.optional(v.string()),
    claimedAt: v.optional(v.string()),
    donorRating: v.optional(v.number()),
    donorVerified: v.optional(v.boolean()),
  }).index("by_status", ["status"]),
});
