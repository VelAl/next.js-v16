import { buttonVariants } from '@/components/ui/button';
import { CommentSection } from '@/components/comment-section';
import { PostPresence } from '@/components/post-presence';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { fetchAuthQuery, preloadAuthQuery } from '@/lib/auth-server';
import { formatDateTime } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type BlogPostPageProps = {
  params: Promise<{
    postId: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { postId } = await params;

  const post = await fetchAuthQuery(api.posts.getPostById, {
    postId: postId as Id<'posts'>,
  }).catch(() => null);

  if (!post) {
    return { title: 'Blog Post' };
  }

  const description =
    post.body.length > 160 ? `${post.body.slice(0, 157)}...` : post.body;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      ...(post.imgUrl && { images: [{ url: post.imgUrl, alt: post.title }] }),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { postId } = await params;
  const typedPostId = postId as Id<'posts'>;

  const [post, preloadedComments, userId] = await Promise.all([
    fetchAuthQuery(api.posts.getPostById, {
      postId: typedPostId,
    }),
    preloadAuthQuery(api.comments.getCommentsByPostId, {
      postId: typedPostId,
    }),
    fetchAuthQuery(api.presence.getUserId, {}).catch(() => null),
  ]);

  if (!post) {
    notFound();
  }

  const createdAt = formatDateTime(post._creationTime);

  return (
    <div className='mx-auto max-w-4xl py-12'>
      <article>
        <div className='mb-8'>
          <Link
            href='/blog'
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
          >
            <ArrowLeft />
            Back to all posts
          </Link>
        </div>

        <header className='mb-8 space-y-4'>
          <p className='text-sm font-medium uppercase tracking-wide text-muted-foreground'>
            Post details
          </p>
          <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl'>
            {post.title}
          </h1>
        </header>

        {post.imgUrl ? (
          <div className='relative mb-4 h-72 w-full overflow-hidden rounded-xl sm:h-96'>
            <Image
              src={post.imgUrl}
              alt={post.title}
              fill
              priority
              sizes='(min-width: 1024px) 896px, 100vw'
              className='object-cover'
            />
          </div>
        ) : (
          <div className='mb-4 h-72 w-full rounded-xl bg-[radial-gradient(circle_at_top_left,var(--chart-1),transparent_35%),linear-gradient(135deg,var(--primary),var(--chart-3),var(--accent))] sm:h-96' />
        )}

        <div className={userId ? 'mb-4 flex flex-col gap-4' : 'mb-8'}>
          <div className='flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4'>
            <p>
              Post ID:{' '}
              <code className='rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground'>
                {post._id}
              </code>
            </p>
            <p>
              Created:{' '}
              <time dateTime={new Date(post._creationTime).toISOString()}>
                {createdAt}
              </time>
            </p>
          </div>

          {userId && <PostPresence roomId={post._id} userId={userId} />}
        </div>

        <div className='border-t pt-8'>
          <p className='whitespace-pre-wrap text-base leading-8 text-muted-foreground sm:text-lg'>
            {post.body}
          </p>
        </div>
      </article>

      <section className='mt-12'>
        <CommentSection
          postId={post._id}
          preloadedComments={preloadedComments}
        />
      </section>
    </div>
  );
}
