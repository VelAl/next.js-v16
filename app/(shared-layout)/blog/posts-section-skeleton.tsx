import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PostsSectionSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className='h-72'>
          <CardContent className='flex min-h-0 flex-1 flex-col'>
            <CardHeader>
              <Skeleton className='h-7 w-3/4 mb-8' />
            </CardHeader>

            <div className='space-y-3'>
              <Skeleton className='h-4' />
              <Skeleton className='h-4' />
              <Skeleton className='h-4 w-5/6' />
              <Skeleton className='h-4 w-2/3' />
            </div>

            <CardFooter className='mt-auto'>
              <Skeleton className='h-10 w-full' />
            </CardFooter>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
