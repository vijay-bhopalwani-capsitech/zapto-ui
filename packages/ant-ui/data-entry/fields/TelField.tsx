import { useField } from 'formik';
import { ATelInput, IATelInputProps } from '../inputs';

export interface IATelFieldProps extends Omit<IATelInputProps, 'value' | 'onChange' | 'isInvalid' | 'errorMessage'> {
    name: string;
}

/**
 * Renders a telephone field component (for string value).
 *
 * @param name - The name of the field.
 * @param other props - Additional props for the component.
 * @note <h3>Please handle non-formatted phone number value (remove '+', ' ' (space), '-', '(', and ')') when submitting form for now.</h3>
 * @returns The rendered telephone field component.
 */
export const ATelField = ({ name, ...props }: IATelFieldProps) => {
    const [{ onChange, ...field }, meta, helpers] = useField(name);

    const isInvalid = meta.touched && !!meta.error;

    const handleChange = (value: string) => {
        helpers?.setValue(value);
    };

    return (
        <>
            <ATelInput onChange={handleChange} isInvalid={isInvalid} errorMessage={meta?.error} {...field} {...props} />
        </>
    );
};
