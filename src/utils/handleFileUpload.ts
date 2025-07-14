import { callApi } from '@/utils/apiUtils/callApi';
// import { IUploadFileResult } from 'ui-helpers';
import { uploadFileRequest } from '@/services/fileUploadService';
import { IUploadFileResult } from '../../packages/ui-helpers';

/**
 * api call for upload File
 * pass this function as prop in all file upload field
 * @param file
 */
export const handleFileUpload = (file: File) => {
    return callApi<IUploadFileResult>({
        requestFunction: uploadFileRequest(file),
        showToastOnSuccess: false,
    });
};
