import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export async function PostsSection() {
  const posts = await fetchQuery(api.posts.getPosts);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {posts?.map((post) => (
        <Card key={post._id} className='gap-0 py-0'>
          {post.imgUrl ? (
            <div className='relative h-36 w-full'>
              <Image
                src={post.imgUrl}
                alt={post.title}
                fill
                sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                className='object-cover'
              />
            </div>
          ) : (
            <div className='h-36 w-full bg-[radial-gradient(circle_at_top_left,var(--chart-1),transparent_35%),linear-gradient(135deg,var(--primary),var(--chart-3),var(--accent))]' />
          )}

          <CardContent className='flex flex-col py-4'>
            <Link href={`/blog/${post._id}`}>
              <CardTitle className='line-clamp-2 text-xl font-bold hover:text-primary'>
                {post.title}
              </CardTitle>
            </Link>

            <CardDescription className='mt-2 line-clamp-3 text-sm'>
              {post.body}
            </CardDescription>

            <CardFooter className='mt-4 px-0'>
              <Link
                href={`/blog/${post._id}`}
                className={buttonVariants({
                  className: 'w-full text-base',
                })}
              >
                Read More
              </Link>
            </CardFooter>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
