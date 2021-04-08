import { useQuery } from 'react-query';
import { IdeaBreakdown, IIdea } from '../lib/types/data/idea.type';
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

export const useSingleIdea = (ideaId: string) => {
  return useQuery<IIdea, FetchError>(
    ['idea', ideaId], 
    () => getSingleIdea(ideaId),
  );
}