import { memo, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import _cloneDeep from 'lodash/cloneDeep';
import { useDropArea } from 'react-use';
import { HiPlus } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa';
import { TbFileUnknown } from 'react-icons/tb';
import { SiMicrosoftexcel } from 'react-icons/si';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { BsFileEarmarkMusic, BsFileEarmarkPdf, BsFileEarmarkWord, BsImage } from 'react-icons/bs';
import { UploadOutlined } from '@ant-design/icons';
import { IUploadFileResult } from '../../../../packages/ui-helpers';
import { Spin, Image, Typography,theme, Upload, Button } from 'antd';
import styled from 'styled-components';
import { AButton } from '../../buttons';


export interface IDropzoneFile {
    id: string;
    mimetype: string;
    mimeType?: string;
    url: string;
    blobName: string;
    originalName: string;
    isLoading: boolean;
    isUploaded: boolean;
    fileObj?: File;
}

export interface IFileUploadDropzoneInputProps {
    disabled?: boolean;
    value: Array<IDropzoneFile>;
    onChange: (files: Array<IDropzoneFile>) => void;
    allowedFileTypes: string[];
    typeErrorMessage: string;
    maxFileSize?: number;
    maxFiles:number,
    handleFileUpload?: (file: File) => Promise<IUploadFileResult>;
    label?:string
    isInvalid?:boolean;
    errorMessage?:string;
    preserveErrorSpace?:boolean;
}

const FilePreview = ({ file }: { file: IDropzoneFile }) => {
    const mimeType = file?.mimeType ?? file?.mimetype;

    // console.log('-> file', file);
    if (mimeType && mimeType === 'image/svg+xml' && file?.url) {
        return (
            <div className="flex justify-content-center align-items-center">
                <BsImage size={50} />
            </div>
        );
    } else if (mimeType && mimeType.includes('image') && file?.url) {
        return (
            <Image
                width={'100%'}
                // height={200}
                src={file?.url}
                fallback="data:image/png;base64,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"
            />
        );
        return <img style={{ objectFit: 'cover' }} src={file?.url} alt={file.originalName} />;
    } else if (mimeType && mimeType.includes('audio')) {
        return (
            <div className="flex justify-content-center align-items-center">
                <BsFileEarmarkMusic size={50} />
            </div>
        );
    } else if (mimeType && mimeType.includes('video')) {
        return (
            <div className="flex justify-content-center align-items-center">
                <MdOutlineOndemandVideo size={50} />
            </div>
        );
    } else if (mimeType && mimeType === 'application/pdf') {
        return (
            <div className="flex justify-content-center align-items-center">
                <BsFileEarmarkPdf size={50} />
            </div>
        );
    } else if (mimeType && mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return (
            <div className="flex justify-content-center align-items-center">
                <BsFileEarmarkWord size={50} />
            </div>
        );
    } else if (mimeType && mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return (
            <div className="flex justify-content-center align-items-center">
                <SiMicrosoftexcel size={50} />
            </div>
        );
    } else {
        return (
            <div className="flex justify-content-center align-items-center">
                <TbFileUnknown size={50} />
            </div>
        );
    }
};

const DropzoneContainer = styled.div`
    .dropzone {
        border: 1px solid ${({ theme }) => theme?.colorPrimary ?? '#D9D9D9'};
        border-radius: ${({ theme }) => theme?.borderRadius ?? '10px'};
        width: 100%;
        height: 220px;
        padding: 20px;
        background: ${({ theme }) => theme?.colorFillQuaternary ?? 'white'};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 10px;
        max-height: 300px;
    }

    .dropzone .dropzone-plus-box {
        height: 170px;
        width: 150px;
        min-width: 150px;
        max-width: 150px;
        border: 1px solid ${({ theme }) => theme?.colorBorderSecondary ?? '#eaeaea'};
        background: ${({ theme }) => theme?.colorFillTertiary ?? 'white'};
        border-radius: ${({ theme }) => theme?.borderRadius ?? '10px'};
        position: relative;
        margin-right: 10px;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-bottom: 10px;
    }

    .dropzone .plus-input-area {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        opacity: 0;
        cursor: pointer;
    }

    .dropzone .dropzone-box {
        height: 170px;
        width: 150px;
        border: 1px solid ${({ theme }) => theme?.colorBorderSecondary ?? '#eaeaea'};
        background: ${({ theme }) => theme?.colorFillTertiary ?? 'white'};
        border-radius: ${({ theme }) => theme?.borderRadius ?? '10px'};
        position: relative;
        margin-right: 10px;
        padding: 15px;
    }

    .dropzone .delete-icon {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        z-index: 2;
        padding: 5px;
    }

    .dropzone .dropzone-area {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 55%;
        opacity: 0;
        cursor: pointer;
        transform: translate(0%, -55%);
    }
`;

/**
 * File upload dropzone input component
 * @param value
 * @param onChange
 * @param allowedFileTypes
 * @param typeErrorMessage
 * @param maxFileSize
 * @param handleFileUpload
 */
const FileUploadDropzoneInputComponent = ({ disabled = false,isInvalid=false,errorMessage="", value,preserveErrorSpace=true, onChange, allowedFileTypes, typeErrorMessage, maxFileSize = 5242880,maxFiles,label, handleFileUpload }: IFileUploadDropzoneInputProps) => {
    
    const {token:themeToken}=theme.useToken();
    const [maxInputFiles,setMaxInputFiles]=useState(1)
    const [filesArr, setFilesArr] = useState<Array<IDropzoneFile>>(value ?? []);

    useEffect(() => {
        onChange(filesArr);
    }, [filesArr]);

    const accepts = useMemo(() => {
        if (allowedFileTypes && Array.isArray(allowedFileTypes) && allowedFileTypes.length > 0) {
            return allowedFileTypes.toString();
        }
        return '*/*';
    }, [allowedFileTypes]);

    const deleteFile = (blobName: string) => {
        setFilesArr((prev) => prev.filter((item) => item.blobName !== blobName));
        setMaxInputFiles((prev)=>prev-1)
    };

    const uploadFiles = async (files: Array<File>) => {
       if(maxInputFiles>maxFiles){
        return toast.error(`Only ${maxFiles} can be uploaded`)
       }

       if(files.length>maxFiles){
           return toast.error(`${maxFiles} file only uploaded`)
       }
        files.map(async (file) => {
            const fileId = uuidv4();
            const fileObj: IDropzoneFile = {
                id: fileId,
                mimetype: file.type,
                originalName: file.name,
                blobName: '',
                isLoading: true,
                isUploaded: false,
                fileObj: file,
                url: '',
            };
            if (allowedFileTypes && Array.isArray(allowedFileTypes) && allowedFileTypes.length > 0) {
                if (!allowedFileTypes.includes(file.type)) {
                    return toast.error(typeErrorMessage);
                }
            }
            if (file.type === 'application/x-msdownload') {
                return toast.error('.exe files are not allowed');
            }
            if (filesArr.find((itm) => itm.originalName === file.name)) {
                return toast.error('file is already selected');
            }
            if (file.size >= maxFileSize) {
                return toast.error(`file size should be less than ${maxFileSize / 1048576}MB`);
            }
            setFilesArr((prev) => [...prev, fileObj]);
            if (handleFileUpload) {
                const uploadFile = await handleFileUpload(file);

                // const uploadFile = await callApi<IUploadFileResult>({
                //     requestFunction: uploadFileRequest(file),
                //     showToastOnSuccess: false,
                // });
                if (!uploadFile.error && 'file' in uploadFile && uploadFile.file) {
                    setFilesArr((prev) => {
                        let files = _cloneDeep(prev);
                        files = files.map((item: IDropzoneFile) => {
                            if (item.id === fileId) {
                                return {
                                    ...item,
                                    url: uploadFile.file?.url ?? '',
                                    blobName: uploadFile.file?.blobName ?? '',
                                    isLoading: false,
                                    isUploaded: true,
                                };
                            }
                            return item;
                        });
                        return files;
                    });
                }
            }
        });

        setMaxInputFiles((prev)=>prev+1)
    };

    const [bond, state] = useDropArea({
        onFiles: uploadFiles,
        // onUri: (uri) => console.log('uri', uri),
        // onText: (text) => console.log('text', text),
    });

    // console.log('-> state', state);
    console.log("hello");

    return (
        <div >
             <div style={{paddingLeft:"2px",paddingRight:"2px",fontSize:"14px",fontWeight:"300"}}>
                    <p>{label}</p>
            </div>
        <DropzoneContainer>
            <div {...bond} className="dropzone">
                
                {Array.isArray(value) && value.length > 0 ? (
                    <div
                        className={'w-100 flex'}
                        style={{
                            display: 'flex',
                            overflowX: 'auto',
                            overflowY: 'hidden',
                        }}
                    >
                   
                        <div className="dropzone-plus-box">
                            <input disabled={disabled} accept={accepts} multiple={true} className="plus-input-area" type="file" onChange={(e) => uploadFiles(Array.from(e.target.files ?? []))} />
                            <HiPlus size={50} />
                        </div>

                        {value.map((file: IDropzoneFile) => (
                            <div key={file.id}>
                                <Spin tip={'Uploading...'} spinning={!!file.isLoading}>
                                    <div className="dropzone-box flex flex-col">
                                        <span title="Delete file" className="delete-icon" onClick={() => deleteFile(file.blobName)}>
                                            <AButton disabled={disabled} danger type="text" icon={<FaTrash className="" />} />
                                        </span>
                                        {!file.isLoading && (
                                            <div
                                                style={{
                                                    marginTop: 'auto',
                                                    marginBottom: 'auto',
                                                }}
                                            >
                                                <FilePreview file={file} />
                                            </div>
                                        )}
                                        <Typography.Text
                                            title={file?.originalName}
                                            style={{
                                                marginTop: 'auto',
                                                display: 'inline-block',
                                            }}
                                            ellipsis
                                        >
                                            {file?.originalName}
                                        </Typography.Text>
                                    </div>
                                </Spin>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                        <img src="/Vector.png"/>
                        <AButton disabled={disabled} style={{border:"none",fontSize:"18px",fontWeight:"300"}}>
                           <HiPlus />
                            Upload
                        </AButton>
                        <input disabled={disabled} accept={accepts} multiple={true} className="dropzone-area" type="file" onChange={(e) => uploadFiles(Array.from(e.target.files ?? []))} />
                    </div>
                )}
            </div>
        </DropzoneContainer>
        {preserveErrorSpace || isInvalid ? (
                <div className="text-end">
                    <Typography.Text style={{ color: themeToken?.colorError,fontSize:"13px"}}>{isInvalid ? errorMessage : ' '}</Typography.Text>
                </div>
               ) : (
                   <></>
            )}
        </div>
    );
};

/**
 * File upload dropzone input
 * @param value
 * @param onChange
 * @param allowedFileTypes
 * @param typeErrorMessage
 * @param maxFileSize
 * @param handleFileUpload - Use handleFileUpload prop for calling api - pass handleFileUpload function in it which is created in utils folder
 */
export const FileUploadDropzoneInput = memo(FileUploadDropzoneInputComponent);
