import { useField } from 'formik';
import { ACheckboxInput } from '../inputs';
import { useCallback } from 'react';

// @ts-ignore
export const ACheckboxField = (props) => {
    // @ts-ignore
    const [field, meta, helpers] = useField(props);
    const isInvalid = meta.touched && !!meta.error;
    const handleChange = useCallback((value: boolean) => {
        helpers?.setValue(value);
    }, []);
    return (
        <>
            <ACheckboxInput errorMessage={meta.error} isInvalid={isInvalid} {...field} {...props} onChange={handleChange} />
        </>
    );
};
