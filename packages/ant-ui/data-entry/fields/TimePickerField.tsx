import { useField } from 'formik';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { IADatePickerInputProps } from '../inputs/DatePickerInput';
import ATimePickerInput from '../inputs/TimePickerInput';

export interface IATimePickerFieldProps extends IADatePickerInputProps {
    name: string;
}   

export const ATimePickerField = (props: IATimePickerFieldProps) => {
    const [field, meta, helpers] = useField(props.name);
    const isInvalid = meta.touched && !!meta.error;
    const dayJsValue = useMemo(() => (field.value ? dayjs(field.value) : null), [field.value]);
    const handleChange = (value: string) => {
        helpers.setValue(value);
    };
    return <ATimePickerInput errorMessage={meta.error} isInvalid={isInvalid} {...field} onChange={handleChange} value={dayJsValue} {...props} />;
};
export default ATimePickerField;
