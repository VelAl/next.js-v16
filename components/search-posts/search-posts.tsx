'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'convex/react';
import { Loader2, Search } from 'lucide-react';

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@/components/ui/popover';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';

const SEARCH_LIMIT = 10;

type SearchPost = Pick<Doc<'posts'>, '_id' | 'title' | 'body'>;

type SearchPostsProps = {
  className?: string;
};

export function SearchPosts({ className }: SearchPostsProps) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const trimmedQuery = inputValue.trim();
  const shouldSearch = trimmedQuery.length > 1;
  const showPanel = isFocused && shouldSearch;

  const posts = useQuery(
    api.posts.searchPosts,
    shouldSearch ? { query: trimmedQuery, limit: SEARCH_LIMIT } : 'skip'
  );

  const isLoading = shouldSearch && posts === undefined;
  const showNoResults =
    shouldSearch && posts !== undefined && posts.length === 0;

  return (
    <Popover
      open={showPanel}
      onOpenChange={(open) => {
        if (!open) setIsFocused(false);
      }}
    >
      <PopoverAnchor asChild>
        <InputGroup className={cn('w-64', className)}>
          <InputGroupAddon align='inline-start'>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder='Search Posts...'
            aria-label='Search posts'
            aria-expanded={showPanel}
            aria-haspopup='dialog'
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {isLoading ? (
            <InputGroupAddon align='inline-end'>
              <Loader2 className='animate-spin' />
            </InputGroupAddon>
          ) : null}
        </InputGroup>
      </PopoverAnchor>

      <PopoverContent
        align='start'
        sideOffset={6}
        className='w-(--radix-popover-trigger-width) gap-0 p-1'
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => event.preventDefault()}
        onMouseDown={(event) => event.preventDefault()}
      >
        {isLoading ? (
          <div className='flex items-center justify-center py-6'>
            <Loader2 className='size-5 animate-spin text-muted-foreground' />
          </div>
        ) : showNoResults ? (
          <p className='py-2 text-center text-sm text-muted-foreground'>
            No results found.
          </p>
        ) : (
          <ul className='max-h-72 overflow-y-auto'>
            {posts?.map((post: SearchPost) => (
              <li key={post._id}>
                <Link
                  href={`/blog/${post._id}`}
                  className='block truncate rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground'
                  onClick={() => setIsFocused(false)}
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}
