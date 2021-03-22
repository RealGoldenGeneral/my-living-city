import axios from 'axios';
import { useQuery } from 'react-query';
import { API_BASE_URL } from '../lib/constants';
import { IIdea } from '../lib/types/data/idea.type';
import { FetchError } from '../lib/types/types';

export const getAllIdeas = async () => {
  const res = await axios.get<IIdea[]>(`${API_BASE_URL}/idea/getall`);
  return res.data;
}

const useIdeas = () => {
  return useQuery<IIdea[], FetchError>(
    'ideas', 
    getAllIdeas,
  );
}

export default useIdeas;