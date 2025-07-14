// import { useField } from 'formik';
// import { APhoneInput, IAPhoneInputProps, IPhoneValues } from '../inputs';
// import { getValueAtPathInObj, setValueAtPathInObj } from "ui-helpers";

// export interface IAPhoneFieldProps extends Omit<IAPhoneInputProps, 'value' | 'onChange' | 'isInvalid' | 'errorMessage'> {
//     name: string;
// }

// /**
//  * Renders a phone field component.
//  *
//  * @param name - The name of the field.
//  * @param other props - Additional props for the component.
//  * @returns The rendered phone field component.
//  */
// export const APhoneField = ({ name, ...props }: IAPhoneFieldProps) => {
//     const [{ onChange, ...field }, meta, helpers] = useField(name);

//     const isInvalid = meta.touched && !!meta.error;

//     const handleChange = (value: IPhoneValues) => {
//         helpers.setValue(value);
//         // if(value && value?.format) {
//         //     const validPhoneLength = value?.format.length;
//         //     const phoneWithoutCountryCode = value?.phone?.replace('+', '')?.replace(String(value?.countryCode), '')?.trim();
//         //     if(validPhoneLength !== phoneWithoutCountryCode?.length) {
//         //         helpers.setError('Invalid phone number');
//         //     }
//         // }
//         // if(meta.error && typeof meta.error === 'object') {
//         //     helpers.setError('Invalid phone number');
//         // }
//     };

//     return (
//         <>
//             <APhoneInput onChange={handleChange} isInvalid={isInvalid} errorMessage={meta?.error} {...field} {...props} />
//         </>
//     );
// };
