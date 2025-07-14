import { useField } from 'formik';
import { PriceRangePickerInput, IPriceRangePickerInputProps, IPriceRangeValue } from '../inputs';

export interface IAPriceRangePickerFieldProps extends Omit<IPriceRangePickerInputProps, 'onChange' | 'value' | 'isInvalid' | 'errorMessage'> {
    name: string;
}

export const APriceRangePickerField = ({ name, ...props }: IAPriceRangePickerFieldProps) => {
    const [field, meta, helpers] = useField<IPriceRangeValue | null>(name);
    const isInvalid = meta.touched && !!meta.error;

    const handleChange = (value: IPriceRangeValue | null) => {
        helpers.setValue(value);
    };

    return <PriceRangePickerInput {...field} value={field.value} onChange={handleChange} isInvalid={isInvalid} errorMessage={meta.error} {...props} />;
};
