import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CommunityPost, CreatePostRequest } from '../backend';

export function useGetAllPosts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<CommunityPost[]>({
    queryKey: ['communityPosts', 'all'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const posts = await actor.getAllPosts();
      // Sort by timestamp descending (newest first)
      return posts.sort((a, b) => Number(b.timestamp - a.timestamp));
    },
    enabled: !!actor && !actorFetching,
    retry: 1,
  });
}

export function useGetFollowingPosts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<CommunityPost[]>({
    queryKey: ['communityPosts', 'following'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const posts = await actor.getFollowingPosts();
      // Sort by timestamp descending (newest first)
      return posts.sort((a, b) => Number(b.timestamp - a.timestamp));
    },
    enabled: !!actor && !actorFetching,
    retry: 1,
  });
}

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreatePostRequest) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createPost(request);
    },
    onSuccess: () => {
      // Invalidate both all posts and following posts
      queryClient.invalidateQueries({ queryKey: ['communityPosts', 'all'] });
      queryClient.invalidateQueries({ queryKey: ['communityPosts', 'following'] });
    },
  });
}
