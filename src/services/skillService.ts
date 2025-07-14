import { callApi } from '@/utils/apiUtils/callApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Axios } from 'axios';
import { API_BASE_URL } from '.';

import { IPaginatedListRequestResult } from '../../packages/ui-helpers';

const SKILL_BASE_URL = `${API_BASE_URL}/skill`;

export const getSkillList = (payload: any) => (axiosInstance: Axios) => axiosInstance.post(`${SKILL_BASE_URL}/list`, payload);

export const useGetSkillList = (payload: any) => {
    return useQuery({
        queryKey: ['skill', payload],
        queryFn: async () => {
            const data = await callApi({
                requestFunction: getSkillList(payload),
                showToastOnSuccess: false,
            });
            return data;
        },
    });
};

export const loadSkillOptions = async ({ page = 1, limit = 10, search = '', filter = { type: 'PROFESSIONAL', status: 'ACTIVE' } }) => {
    return callApi<IPaginatedListRequestResult<any>>({
        requestFunction: getSkillList({
            page,
            limit,
            search,
            filter,
        }),
        showToastOnSuccess: false,
    });
};
