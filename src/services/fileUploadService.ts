// third party imports
import { Axios } from "axios";

// app modules
import { API_BASE_URL } from "@/services/index";
import { prepareFileFormData } from "@/utils/formHelpers";

/**
 * Upload a file to azure temp folder
 * @param payload - Html File object
 */
export const uploadFileRequest = (payload: any) => (axiosInstance: Axios) => {
  const formData = prepareFileFormData({file: payload})
  return axiosInstance.post(`${API_BASE_URL}/files/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};