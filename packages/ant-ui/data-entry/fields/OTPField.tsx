import { useField } from 'formik';
import { AOTPInput, IAOTPInputProps } from '../inputs';

export interface IOTPFieldProps extends Omit<IAOTPInputProps, 'onChange' | 'value' | 'isInvalid' | 'errorMessage'> {
    name: string;
}

export const AOTPField = ({ name, ...props }: IOTPFieldProps) => {
    const [field, meta, helpers] = useField(name);
    const isInvalid = meta.touched && !!meta.error;
    const handleChange = (value: string) => {
        helpers?.setValue(value);
    };

    return <AOTPInput errorMessage={meta.error} isInvalid={isInvalid} {...field} onChange={handleChange} {...props} />;
};
