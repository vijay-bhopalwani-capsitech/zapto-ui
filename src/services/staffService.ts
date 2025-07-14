import { callApi } from '@/utils/apiUtils/callApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Axios } from 'axios';
import { API_BASE_URL } from '.';
import { queryClient } from '@/app/(admin_app)/layout';

const STAFF_BASE_URL = `${API_BASE_URL}/organisation/staff`;

/**
 * Query to get enquiry list
 * @param payload
 * @returns
 */
export const getStaffList = (payload: any) => (axiosInstance: Axios) => axiosInstance.post(`${STAFF_BASE_URL}/list`, { ...payload, sortKey: 'itemId.number', sortOrder: -1 });

export const useGetStaffList = (payload: any) => {
    return useQuery({
        queryKey: ['staff', payload],
        queryFn: async () => {
            const data = await callApi({
                requestFunction: getStaffList(payload),
                showToastOnSuccess: false,
            });
            return data;
        },
    });
};

/**
 * Mutation to create staff doc
 * @param payload
 * @returns
 */
export const createStaff = (payload: any) => (axiosInstance: Axios) => axiosInstance.post(`${STAFF_BASE_URL}/`, payload);

export const useCreateStaff = () =>
    useMutation({
        mutationFn: async (payload: any) => {
            return callApi({
                requestFunction: createStaff(payload),
            });
        },
        onSuccess: (data) => {
            if (!data.error) {
                queryClient.invalidateQueries({ queryKey: ['staff'] });
            }
        },
    });

/**
 * Mutation to update staff doc
 */
export const updateStaff = (payload: any) => (axiosInstance: Axios) => axiosInstance.put(`${STAFF_BASE_URL}/`, payload);

export const useUpdateStaff = () =>
    useMutation({
        mutationFn: async (payload) => {
            return callApi({
                requestFunction: updateStaff(payload),
            });
        },
        onSuccess: (data) => {
            if (!data.error) {
                queryClient.invalidateQueries({ queryKey: ['staff'] });
            }
        },
    });

/**
 * Mutation to update staff status doc
 */
export const updateStaffStatus = (payload: any) => (axiosInstance: Axios) => axiosInstance.patch(`${STAFF_BASE_URL}/status`, payload);

export const useUpdateStaffStatus = () =>
    useMutation({
        mutationFn: async (payload) => {
            return callApi({
                requestFunction: updateStaffStatus(payload),
            });
        },
        onSuccess: (data) => {
            if (!data.error) {
                queryClient.invalidateQueries({ queryKey: ['staff'] });
            }
        },
    });

/**
 * Mutation to delete staff status doc
 */
export const deleteStaff = (payload: any) => (axiosInstance: Axios) => axiosInstance.post(`${STAFF_BASE_URL}/delete`, payload);

export const useDeleteStaff = () =>
    useMutation({
        mutationFn: async (payload) => {
            return callApi({
                requestFunction: deleteStaff(payload),
            });
        },
        onSuccess: (data) => {
            if (!data.error) {
                queryClient.invalidateQueries({ queryKey: ['staff'] });
            }
        },
    });
