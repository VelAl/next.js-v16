'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import usePresence from '@convex-dev/presence/react';
import '@convex-dev/presence/facepile.css';
import FacePile from '@convex-dev/presence/facepile';
import './facepile-dark.css';

type PostPresenceProps = {
  roomId: Id<'posts'>;
  userId: string;
};

const PostPresence = ({ roomId, userId }: PostPresenceProps) => {
  const presenceState = usePresence(api.presence, roomId, userId);

  if (!presenceState || !presenceState.length) {
    return null;
  }

  return (
    <div className='flex items-center gap-2'>
      <p className='text-xs uppercase text-muted-foreground'>
        Viewers: {presenceState.length}
      </p>

      <div className='post-presence-facepile'>
        <FacePile presenceState={presenceState ?? []} />
      </div>
    </div>
  );
};

export { PostPresence };
