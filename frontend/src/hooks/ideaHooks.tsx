import { useQuery } from 'react-query';
import { IdeaBreakdown, IIdea, IIdeaWithBasicUser } from '../lib/types/data/idea.type';
import { FetchError } from '../lib/types/types';
import { getAllIdeas, getSingleIdea, postAllIdeasWithBreakdown, postAllIdeasWithSort } from '../lib/api/ideaRoutes';
import { GetAllIdeasWithSort, getAllIdeasWithSortDefault, IdeaOrderByAggregate } from '../lib/types/args/getAllIdeas.args';

export const useIdeas = (
) => {
  return useQuery<IIdea[], FetchError>(
    'ideas', 
    () => getAllIdeas(),
  );
}

export const useIdeasWithSort = (
  sortingOptions: GetAllIdeasWithSort = getAllIdeasWithSortDefault
) => {
  return useQuery<IIdea[], FetchError>(
    ['ideas', sortingOptions], 
    () => postAllIdeasWithSort(sortingOptions),
  );
}

export const useIdeasWithBreakdown = (
  take?: number
) => {
  return useQuery<IdeaBreakdown[], FetchError>(
    ['ideas-breakdown', take],
    () => postAllIdeasWithBreakdown(take),
  );
}

export const useIdeasHomepage = () => {
  return useQuery<IdeaBreakdown[], FetchError>(
    'ideas-homepage',
    () => postAllIdeasWithBreakdown(3),
  );
}

export const useSingleIdea = (ideaId: string) => {
  return useQuery<IIdeaWithBasicUser, FetchError>(
    ['idea', ideaId], 
    () => getSingleIdea(ideaId),
    // https://react-query.tanstack.com/guides/initial-query-data#staletime-and-initialdataupdatedat
    {
      staleTime: 45 * 60 * 1000 // 30 minutes
    }
  );
}