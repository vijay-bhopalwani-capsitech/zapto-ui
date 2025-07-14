import { callApi } from '@/utils/apiUtils/callApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Axios } from 'axios';
import { API_BASE_URL } from '..';

const BOOKING_BASE_URL = `${API_BASE_URL}/booking`;

export const getBookingList = (payload: any) => (axiosInstance: Axios) => axiosInstance.post(`${BOOKING_BASE_URL}/list`, payload);

export const useGetBookingList = (payload: any) => {
    return useQuery({
        queryKey: ['booking', payload],
        queryFn: async () => {
            const data = await callApi({
                requestFunction: getBookingList(payload),
                showToastOnSuccess: false,
            });
            return data;
        },
    });
}

export const createBooking = (payload: any) => (axiosInstance: Axios) => axiosInstance.post(BOOKING_BASE_URL, payload);
export const useCreateBooking = () => {
    return useMutation({
        mutationFn: async (payload: any) => {
            const data = await callApi({
                requestFunction: createBooking(payload),
                showToastOnSuccess: true,
            });
            return data;
        },
    });
}