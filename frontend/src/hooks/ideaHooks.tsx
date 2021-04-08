import { useQuery } from 'react-query';
import { IIdea } from '../lib/types/data/idea.type';
import { FetchError } from '../lib/types/types';
import { getAllIdeas, getSingleIdea, postAllIdeasWithSort } from '../lib/api/ideaRoutes';
import { defaultOrderByAggregate, GetAllIdeasWithAggregate, getAllIdeasWithAggregateDefault, IdeaOrderByAggregate } from '../lib/types/args/getAllIdeas.args';

export const useIdeas = (
) => {
  return useQuery<IIdea[], FetchError>(
    'ideas', 
    () => getAllIdeas(),
  );
}

export const useIdeasWithSort = (
  aggregateOptions: GetAllIdeasWithAggregate = getAllIdeasWithAggregateDefault
) => {
  return useQuery<IIdea[], FetchError>(
    ['ideas', aggregateOptions], 
    () => postAllIdeasWithSort(aggregateOptions),
  );
}

export const useSingleIdea = (ideaId: string) => {
  return useQuery<IIdea, FetchError>(
    ['idea', ideaId], 
    () => getSingleIdea(ideaId),
  );
}