import { MessageSquareIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const CommentSection = () => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center gap-2 border-b pb-4'>
        <MessageSquareIcon className='size-5' />
        <CardTitle>Comments</CardTitle>
      </CardHeader>

      <CardContent>
        <form></form>
        
      </CardContent>
    </Card>
  );
};
