import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all donations
export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("donations").collect();
  },
});

// Add a new donation
export const add = mutation({
  args: {
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
    donorRating: v.optional(v.number()),
    donorVerified: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const donationId = await ctx.db.insert("donations", {
      ...args,
      status: "available",
      postedAt: new Date().toISOString(),
    });
    return donationId;
  },
});

// Claim a donation
export const claim = mutation({
  args: {
    id: v.id("donations"),
    claimedBy: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "claimed",
      claimedBy: args.claimedBy,
      claimedAt: new Date().toISOString(),
    });
  },
});

// Update donor rating
export const updateRating = mutation({
  args: {
    id: v.id("donations"),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      donorRating: args.rating,
    });
  },
});
