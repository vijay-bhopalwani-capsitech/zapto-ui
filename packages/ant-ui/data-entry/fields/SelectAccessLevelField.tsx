import { useField } from 'formik';
import { ASelectAccessLevelFieldInput, IASelectAccessLevelInputProps,  } from '../inputs';

interface IASelectAccessLevelFieldProps extends Omit<IASelectAccessLevelInputProps, 'onChange' | 'value' | 'isInvalid' | 'errorMessage'> {
    name: string;
}

/**
 * Renders a custom select field component.
 *
 * @param name - The name of the field.
 * @param props - Additional props to pass to the select field component.
 * @return The rendered select field component.
 */
export const ASelectAccessLevelField = ({ name, ...props }: IASelectAccessLevelFieldProps) => {
    const [{ value, onChange, ...field }, meta, helpers] = useField(name);

    const isInvalid = meta.touched && !!meta.error;

    const handleChange = (value: any) => {
        helpers.setValue(value);
    };

    return (
        <>
            <ASelectAccessLevelFieldInput value={value} onChange={handleChange} isInvalid={isInvalid} errorMessage={meta.error} {...field} {...props} />
        </>
    );
};
