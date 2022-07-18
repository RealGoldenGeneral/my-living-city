import { useQuery } from 'react-query';
import { IFetchError } from '../lib/types/types';
import { getAllFlags } from '../lib/api/flagRoutes';
import { AxiosError } from 'axios';
import { IFlag } from '../lib/types/data/flag.type';

export const useAllFlags = (token: string | null) => {
    return useQuery<IFlag[], IFetchError>(`flags`, () => getAllFlags(token));
}