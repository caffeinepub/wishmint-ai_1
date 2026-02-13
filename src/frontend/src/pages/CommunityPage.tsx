import { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetAllPosts, useGetFollowingPosts } from '../hooks/useCommunityPosts';
import CommunityPostCard from '../components/community/CommunityPostCard';
import CreatePostDialog from '../components/community/CreatePostDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'following'>('all');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const {
    data: allPosts = [],
    isLoading: allLoading,
    error: allError,
    refetch: refetchAll,
  } = useGetAllPosts();

  const {
    data: followingPosts = [],
    isLoading: followingLoading,
    error: followingError,
    refetch: refetchFollowing,
  } = useGetFollowingPosts();

  const posts = activeTab === 'all' ? allPosts : followingPosts;
  const isLoading = activeTab === 'all' ? allLoading : followingLoading;
  const error = activeTab === 'all' ? allError : followingError;
  const refetch = activeTab === 'all' ? refetchAll : refetchFollowing;

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      // User will be prompted to login in the dialog
    }
    setCreateDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Community</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Community Creations
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your templates and stickers with the community
          </p>
        </div>

        {/* Tabs and Create Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'all' | 'following')} className="w-full sm:w-auto">
            <TabsList className="grid w-full sm:w-auto grid-cols-2 bg-muted/50">
              <TabsTrigger value="all" className="px-6">
                All Posts
              </TabsTrigger>
              <TabsTrigger value="following" className="px-6">
                Following
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            onClick={handleCreatePost}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Post
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {isLoading ? (
            // Loading state
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            // Error state
            <Alert variant="destructive">
              <AlertDescription className="flex items-center justify-between">
                <span>Failed to load posts. Please try again.</span>
                <Button variant="outline" size="sm" onClick={() => refetch()}>
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          ) : posts.length === 0 ? (
            // Empty state
            <Card className="border-dashed border-2 bg-muted/20">
              <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <Users className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  {activeTab === 'all'
                    ? 'Be the first to share something!'
                    : 'Follow creators to see their posts here'}
                </p>
                {activeTab === 'all' && (
                  <Button onClick={handleCreatePost} className="bg-gradient-to-r from-primary to-accent">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Post
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            // Posts list
            <div className="space-y-4">
              {posts.map((post) => (
                <CommunityPostCard key={post.postId.toString()} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Post Dialog */}
      <CreatePostDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
}
