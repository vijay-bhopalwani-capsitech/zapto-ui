import { useField } from 'formik';
import { IARateInputProps, ARateInput } from '../inputs';

export interface IRateFieldProps extends Omit<IARateInputProps, 'onChange' | 'value' | 'isInvalid' | 'errorMessage'> {
    name: string;
}

export const ARateField = ({ name, ...props }: IRateFieldProps) => {
    const [{ onBlur, onChange, ...field }, meta, helpers] = useField(name);
    const isInvalid = meta.touched && !!meta.error;

    const handleChange = (value: number) => {
        helpers.setValue(value);
    };

    return <ARateInput errorMessage={meta.error} isInvalid={isInvalid} {...field} onChange={handleChange} {...props} />;
};
