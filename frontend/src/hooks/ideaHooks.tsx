import { useQuery } from 'react-query';
import { IIdea } from '../lib/types/data/idea.type';
import { FetchError } from '../lib/types/types';
import { getAllIdeas, getSingleIdea } from '../lib/api/ideaRoutes';

export const useIdeas = () => {
  return useQuery<IIdea[], FetchError>(
    'ideas', 
    getAllIdeas,
  );
}

export const useSingleIdea = (ideaId: string) => {
  return useQuery<IIdea, FetchError>(
    ['idea', ideaId], 
    () => getSingleIdea(ideaId),
  );
}