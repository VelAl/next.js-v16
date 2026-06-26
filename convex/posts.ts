import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { authComponent } from './auth';
import { Doc } from './_generated/dataModel';

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
      posts.map(async ({ imgStorageId, ...post }) => {
        const imgUrl = imgStorageId && (await ctx.storage.getUrl(imgStorageId));

        return {
          ...post,
          ...(imgUrl && { imgUrl }),
        };
      })
    );
  },
});

export const getPostById = query({
  args: {
    postId: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError('Not authenticated.');
    }

    const post = await ctx.db.get(args.postId);
    if (!post) {
      return null;
    }

    const imgUrl =
      post.imgStorageId && (await ctx.storage.getUrl(post.imgStorageId));

    return {
      ...post,
      ...(imgUrl && { imgUrl }),
    };
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

type SearchPostResult = Pick<Doc<'posts'>, '_id' | 'title' | 'body'>[];
export const searchPosts = query({
  args: {
    query: v.string(),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const { query, limit } = args;

    const res: SearchPostResult = [];

    const seen = new Set<string>();

    const pushDocs = (docs: Doc<'posts'>[]) => {
      for (const doc of docs) {
        if (seen.has(doc._id)) continue;

        seen.add(doc._id);
        res.push({
          _id: doc._id,
          title: doc.title,
          body: doc.body,
        });

        if (res.length >= limit) break;
      }
    };

    const titleMatches = await ctx.db
      .query('posts')
      .withSearchIndex('search_title', (q) => q.search('title', query))
      .take(limit);

    pushDocs(titleMatches);

    if (res.length < limit) {
      const bodyMatches = await ctx.db
        .query('posts')
        .withSearchIndex('search_body', (q) => q.search('body', query))
        .take(limit - res.length);

      pushDocs(bodyMatches);
    }

    return res;
  },
});
