import _update from 'lodash/update';
import { ValidationError } from 'yup';

interface IValidateYupSchemaProps {
    schema: any;
    data: any;
}
export const isArray = (arg: any) => arg && Array.isArray(arg);
export const setValueAtPathInObj = ({ obj, path, value }: { obj: any; path: string; value: any }) => {
    return _update(obj, path, (oldval) => value);
};
export const ValidateYupSchema = async ({ schema, data }: IValidateYupSchemaProps) => {
    try {
        const result = await schema.validate(data, {
            abortEarly: false,
        });
        return {};
    } catch (error) {
        let errors = {};
        const errorObj: ValidationError = error as ValidationError;
        if (isArray(errorObj.inner)) {
            errorObj.inner.forEach((errorItem) => {
                if (errorItem.path && errorItem.message) {
                    errors = setValueAtPathInObj({
                        obj: errors,
                        path: errorItem.path,
                        value: errorItem.message,
                    });
                }
            });
        }
        return errors;
    }
};

export const prepareFileFormData = ({ file, fileKey = 'file' }: { file: File; fileKey?: string }): FormData => {
    console.log('-> prepareFileFormData file', file);
    const formData = new FormData();
    const oldName = file.name;
    console.log('-> oldName', oldName);
    const splitedName = oldName.split('.');
    const extension = splitedName[splitedName.length - 1];
    const name = splitedName.slice(0, -1).toString('');
    const newFileName = name.replace(/[\W_]+/g, '');
    const newFileNameWithExtension = `${newFileName}.${extension}`;
    console.log('newFileName', newFileNameWithExtension);
    formData.append(fileKey, file, newFileNameWithExtension);
    return formData;
};
