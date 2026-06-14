import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';

type CommentProps = {
  authorName: string;
  body: string;
  createdAt: number;
};

export const Comment = ({ authorName, body, createdAt }: CommentProps) => {
  const fallback = authorName.slice(0, 1).toUpperCase();

  return (
    <article className='flex gap-3'>
      <div className='relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium'>
        <span>{fallback}</span>
        <Image
          src='https://avatar.vercel.sh/rauchg'
          alt={authorName}
          fill
          sizes='40px'
          className='absolute inset-0 size-full object-cover'
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className='min-w-0 flex-1 space-y-1'>
        <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2'>
          <p className='font-medium'>{authorName}</p>
          <time
            className='text-xs text-muted-foreground'
            dateTime={new Date(createdAt).toISOString()}
          >
            {formatDateTime(createdAt)}
          </time>
        </div>
        <p className='whitespace-pre-wrap text-sm leading-6 text-muted-foreground'>
          {body}
        </p>
      </div>
    </article>
  );
};
