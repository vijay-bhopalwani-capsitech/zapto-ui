import { callApi } from "@/utils/apiUtils/callApi";
import { uploadFileRequest } from "@/services/fileUploadService";
import { IUploadFileResult } from "ui-helpers";
import { UploadBeforeHandler } from "suneditor-react/dist/types/upload";

/**
 * image uploading
 * @param files
 * @param info
 * @param uploadHandler
 */
export const handleUploadImage = (files: File[], info: object, uploadHandler: UploadBeforeHandler) => {
  const file = files[0];
  if (!file) {
    return uploadHandler({
      result: [],
    });
  }
  const uploadFile = callApi<IUploadFileResult>({
    requestFunction: uploadFileRequest(file),
  }).then((uploadFile) => {
    if (!uploadFile.error && 'file' in uploadFile && uploadFile.file) {
      const response = {
        // The response must have a "result" array.
        result: [
          {
            url: uploadFile?.file?.url,
            name: files[0].name,
            size: files[0].size,
          },
        ],
      };
      uploadHandler(response);
    }
  });
};
