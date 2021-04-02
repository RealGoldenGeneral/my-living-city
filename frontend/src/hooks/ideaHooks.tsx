import { useQuery } from 'react-query';
import { IIdea } from '../lib/types/data/idea.type';
import { FetchError } from '../lib/types/types';
import { getAllIdeas, getSingleIdea, postAllIdeasWithAggregates } from '../lib/api/ideaRoutes';
import { defaultOrderByAggregate, GetAllIdeasWithAggregate, getAllIdeasWithAggregateDefault, IdeaOrderByAggregate } from '../lib/types/args/getAllIdeas.args';

export const useIdeas = (
) => {
  return useQuery<IIdea[], FetchError>(
    'ideas', 
    () => getAllIdeas(),
  );
}

export const useIdeasWithAggregate = (
  aggregateOptions: GetAllIdeasWithAggregate = getAllIdeasWithAggregateDefault
) => {
  return useQuery<IIdea[], FetchError>(
    ['ideas', aggregateOptions], 
    () => postAllIdeasWithAggregates(aggregateOptions),
  );
}

export const useSingleIdea = (ideaId: string) => {
  return useQuery<IIdea, FetchError>(
    ['idea', ideaId], 
    () => getSingleIdea(ideaId),
  );
}