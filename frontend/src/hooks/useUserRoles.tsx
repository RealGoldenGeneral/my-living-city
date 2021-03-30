import axios from 'axios';
import { useQuery } from 'react-query';
import { API_BASE_URL } from '../lib/constants';
import { UserRole } from '../lib/types/data/userRole.type';
import { FetchError } from '../lib/types/types';

export const getAllUserRoles = async () => {
  const res = await axios.get<UserRole[]>(`${API_BASE_URL}/role/getall`);
  return res.data;
}

const useUserRoles = () => {
  return useQuery<UserRole[], FetchError>(
    'userRoles', 
    getAllUserRoles,
  );
}

export default useUserRoles;