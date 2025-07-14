'use client';

import { useField } from 'formik';
import { IPhoneInputProps, PhoneInput } from '../inputs/phoneinput';

export interface IPhoneFieldProps extends Omit<IPhoneInputProps, 'onChange' | 'value' | 'isInvalid' | 'errorMessage'> {
    name: string;
}

export const PhoneField = ({ name, ...props }: IPhoneFieldProps) => {
    const [field, meta] = useField(name);
    const isInvalid = meta.touched && !!meta.error;

    return <PhoneInput {...field} {...props} isInvalid={isInvalid} errorMessage={meta.error} />;
};
