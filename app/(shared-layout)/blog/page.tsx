import { Suspense } from 'react';
import { PostsSectionSkeleton } from './posts-section-skeleton';
import { PostsSection } from './posts-section';

export default function BlogPage() {
  return (
    <div className='py-12'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl'>
          Blog
        </h1>
        <p className='text-xl text-muted-foreground pt-4 max-w-2xl mx-auto'>
          Read our latest blog posts...
        </p>
      </div>

      <Suspense fallback={<PostsSectionSkeleton />}>
        <PostsSection />
      </Suspense>
    </div>
  );
}
