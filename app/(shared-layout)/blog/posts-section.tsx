import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';
import Link from 'next/link';

export async function PostsSection() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const posts = await fetchQuery(api.posts.getPosts);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {posts?.map((post) => (
        <Card key={post._id} className='h-72'>
          <CardContent className='flex min-h-0 flex-1 flex-col'>
            <CardHeader>
              <Link href={`/blog/${post._id}`}>
                <CardTitle className='line-clamp-2 hover:text-primary'>
                  {post.title}
                </CardTitle>
              </Link>
            </CardHeader>

            <CardDescription className='line-clamp-5'>{post.body}</CardDescription>

            <CardFooter className='mt-auto'>
              <Link
                href={`/blog/${post._id}`}
                className={buttonVariants({
                  className: 'w-full',
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
