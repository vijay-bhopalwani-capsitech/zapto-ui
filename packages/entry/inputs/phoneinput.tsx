import React from 'react';

export interface IPhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    isInvalid?: boolean;
    preserveErrorSpace?: boolean;
    errorMessage?: string;
    inputRef?: React.RefObject<HTMLInputElement>;
}

const PhoneInputComponent = ({ label = '', isInvalid = false, errorMessage = '', preserveErrorSpace = true, ...props }: IPhoneInputProps) => {
    const status = isInvalid ? 'error' : undefined;

    return (
        <div className="textfield">
            {label && <label className="block text-sm my-2 font-medium text-gray-700">{label}</label>}
            <input {...props} className={`block w-full px-3 text-sm py-2 border-[1.5px] border-[#E4D7F4] rounded-full ${status} outline-none `} type="tel" />
            {(preserveErrorSpace || isInvalid) && (
                <p className={`text-sm !text-red-950`} style={{ color: 'red' }}>
                    {isInvalid ? errorMessage : ''}
                </p>
            )}
        </div>
    );
};

export const PhoneInput = React.memo(PhoneInputComponent);
