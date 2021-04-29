import { useQuery, useQueryClient } from 'react-query';
import { IIdeaWithAggregations, IIdeaWithRelationship } from '../lib/types/data/idea.type';
import { IFetchError } from '../lib/types/types';
import { getSingleIdea, postAllIdeasWithBreakdown } from '../lib/api/ideaRoutes';
import { IUser } from 'src/lib/types/data/user.type';

// export const useIdeas = (
// ) => {
//   return useQuery<IIdeaBad[], FetchError>(
//     'ideas', 
//     () => getAllIdeas(),
//   );
// }

// export const useIdeasWithSort = (
//   sortingOptions: GetAllIdeasWithSort = getAllIdeasWithSortDefault
// ) => {
//   return useQuery<IIdeaBad[], FetchError>(
//     ['ideas', sortingOptions], 
//     () => postAllIdeasWithSort(sortingOptions),
//   );
// }

export const useIdeasWithBreakdown = (
  take?: number
) => {
  return useQuery<IIdeaWithAggregations[], IFetchError>(
    ['ideas-breakdown', take],
    () => postAllIdeasWithBreakdown(take),
  );
}

export const useIdeasHomepage = () => {
  return useQuery<IIdeaWithAggregations[], IFetchError>(
    'ideas-homepage',
    () => postAllIdeasWithBreakdown(3),
  );
}

export const useSingleIdea = (ideaId: string) => {
  return useQuery<IIdeaWithRelationship, IFetchError>(
    ['idea', ideaId], 
    () => getSingleIdea(ideaId),
    // https://react-query.tanstack.com/guides/initial-query-data#staletime-and-initialdataupdatedat
    {
      staleTime: 45 * 60 * 1000 // 30 minutes
    }
  );
}

export const useSubmitChampionRequestMutation = (
  ideaId: number,
  token: string | null,
  user: IUser | null,
) => {
  const previousIdeaKey = ['idea', String(ideaId)];
  const queryClient = useQueryClient();

  const submitChampionRequestMutation = () => {
    // Mutate champion
  }

  return {
    submitChampionRequestMutation,
  }
}