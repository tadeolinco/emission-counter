import { api } from 'api/api';
import { GraphTab } from 'components/GraphsTabs';
import qs from 'qs';
import { useQuery } from 'react-query';

interface UseEmissionGraphParams {
  type: GraphTab;
}

export const useEmissionGraph = (queryParams: UseEmissionGraphParams) => {
  const query = useQuery(['emissions', queryParams], () => {
    return api.get(`/emissions?${qs.stringify(queryParams)}`);
  });

  return query;
};
