import React from 'react';

export interface IATextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    isInvalid?: boolean;
    preserveErrorSpace?: boolean;
    errorMessage?: string;
    inputRef?: React.RefObject<HTMLInputElement>;
    labelClassName?: string;
}
const ATextInputComponent = ({ label = '', isInvalid = false, errorMessage = '', preserveErrorSpace = true, labelClassName = '', ...props }: IATextInputProps) => {
    const status = isInvalid ? 'error' : undefined;

    return (
        <div className="textfield h-20">
            {label && <label className={`text-sm mb-1 font-medium text-gray-700 ${labelClassName}`}>{label}</label>}
            <input ref={props?.inputRef} className={`block text-sm w-full px-3 py-2 border rounded-full ${status} outline-none`} {...props} style={{
                border: `1.5px solid ${isInvalid ? 'red' : '#E4D7F4'}`,
            }} />
            {(preserveErrorSpace || isInvalid) && (
                <p className={`text-xs mt-1 mb-1`} style={{ color: 'red' }}>
                    {isInvalid ? errorMessage : ''}
                </p>
            )}
        </div>
    );
};

export const ATextInput = React.memo(ATextInputComponent);
