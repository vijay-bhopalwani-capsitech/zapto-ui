import { callApi } from '@/utils/apiUtils/callApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Axios } from 'axios';
import { IPaginatedListRequestResult } from 'ui-helpers';
import { ISkillZod } from 'api-definitions';
import { API_BASE_URL } from '..';

const PROPERTY_BASE_URL = `${API_BASE_URL}/property`;

export const getPropertyList = (payload: any) => (axiosInstance: Axios) => axiosInstance.post(`${PROPERTY_BASE_URL}/list`, payload);

export const useGetPropertyList = (payload: any) => {
    return useQuery({
        queryKey: ['property', payload],
        queryFn: async () => {
            const data = await callApi({
                requestFunction: getPropertyList(payload),
                showToastOnSuccess: false,
            });
            return data;
        },
    });
}