import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Bale } from '../backend';

export function useGetAllBales() {
  const { actor, isFetching } = useActor();

  return useQuery<Bale[]>({
    queryKey: ['bales'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBales();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBale() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (description: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addBale(description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bales'] });
    },
  });
}
