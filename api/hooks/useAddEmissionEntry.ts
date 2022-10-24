import { EmissionEntry } from '@prisma/client';
import { api } from 'api/api';
import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

export interface AddEmissionDto {
  name: string;
  scope: number;
  emission: number;
  date: Date;
}

export const useAddEmissionEntry = () => {
  const mutation = useMutation<
    AxiosResponse<EmissionEntry>,
    unknown,
    AddEmissionDto
  >((values) => {
    return api.post(`/emissions`, values);
  });

  return mutation;
};
