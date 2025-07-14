import { useMemo } from 'react';
import { useField } from 'formik';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ARangePickerInput, IARangePickerInputProps, IRangeValue } from '../inputs';

dayjs.extend(utc)
export interface IARangePickerFieldProps extends Omit<IARangePickerInputProps, 'onChange' | 'value' | 'isInvalid' | 'errorMessage'> {
    name: string;
}

export const ARangePickerField = ({ name, ...props }: IARangePickerFieldProps) => {
    const [field, meta, helpers] = useField<IRangeValue | null>(name);
    const isInvalid = meta.touched && !!meta.error;

    const dayJsValue: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null = useMemo(() => {
        return field?.value ? [dayjs(field?.value?.start ?? null).utc(), dayjs(field?.value?.end ?? null).utc()] : null;
    }, [field.value]);

    const handleChange = (value: IRangeValue | null) => {
        helpers.setValue(value);
    };
    // @ts-ignore
    return <ARangePickerInput errorMessage={meta.error} isInvalid={isInvalid} {...field} onChange={handleChange} value={dayJsValue} {...props} />;
};
