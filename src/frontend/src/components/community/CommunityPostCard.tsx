import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CommunityPost } from '../../backend';
import { formatDistanceToNow } from 'date-fns';

interface CommunityPostCardProps {
  post: CommunityPost;
}

export default function CommunityPostCard({ post }: CommunityPostCardProps) {
  const { authorProfile, title, content, tags, timestamp, professional } = post;

  const formattedTime = formatDistanceToNow(new Date(Number(timestamp) / 1000000), {
    addSuffix: true,
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src="" alt={authorProfile.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-semibold">
              {getInitials(authorProfile.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-sm truncate">{authorProfile.name}</h3>
              {authorProfile.username && (
                <span className="text-xs text-muted-foreground">@{authorProfile.username}</span>
              )}
              {professional && (
                <Badge variant="secondary" className="text-xs">
                  Pro
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{formattedTime}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {title && <h4 className="font-semibold text-lg">{title}</h4>}

        <p className="text-sm text-foreground/90 whitespace-pre-wrap break-words">{content}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
