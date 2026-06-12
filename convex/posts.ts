import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { authComponent } from './auth';

export const createPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    imgStorageId: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError('Not authenticated.');
    }

    const post = await ctx.db.insert('posts', {
      ...args,
      authorId: user._id,
    });

    return post;
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query('posts').collect();

    return await Promise.all(
      posts.map(async ({ imgStorageId, ...post }) => ({
        ...post,
        imgUrl: imgStorageId
          ? await ctx.storage.getUrl(imgStorageId)
          : undefined,
      }))
    );
  },
});

export const generateImgUploadURL = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError('Not authenticated.');
    }
    const url = await ctx.storage.generateUploadUrl();
    return url;
  },
});

export const deleteImgByStorageId = mutation({
  args: {
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError('Not authenticated.');
    }

    await ctx.storage.delete(args.storageId);
  },
});
