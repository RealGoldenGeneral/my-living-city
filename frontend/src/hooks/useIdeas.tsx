import axios from 'axios';
import { useQuery } from 'react-query';
import { API_BASE_URL } from '../lib/constants';
import { IdeaInterface } from '../lib/types/data.types';
import { FetchError } from '../lib/types/types';

export const getAllIdeas = async () => {
  const res = await axios.get<IdeaInterface[]>(`${API_BASE_URL}/idea/getall`);
  return res.data;
}

const useIdeas = () => {
  return useQuery<IdeaInterface[], FetchError>('ideas', getAllIdeas);
}

export default useIdeas;