import { useField } from 'formik';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface IOtpFieldProps {
    name: string;
    placeholder?: string;
    autoComplete?: string;
}

const StyledInput = styled.input<{ isInvalid: boolean; isFilled: boolean }>`
    width: 4rem;
    border-bottom-width: 6px;
    border-color: ${({ isInvalid, isFilled }) => (isInvalid ? 'red' : isFilled ? '#60429A' : '#D9D9D9')};
    transition: border-color 0.1s ease-in-out;
`;

export const OtpField: React.FC<IOtpFieldProps> = ({ name, placeholder }) => {
    const [field, meta, helpers] = useField(name);
    const isInvalid = meta.touched && !!meta.error;

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/\D/g, '');

        if (value.length <= 1) {
            const newValue = [...field.value.split('')];
            newValue[index] = value;
            helpers.setValue(newValue.join(''));

            if (value && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !field.value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    return (
        <>
            <div className="flex justify-center gap-4 mb-3">
                {[0, 1, 2, 3].map((index) => (
                    <StyledInput
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        type="text"
                        maxLength={1}
                        value={field.value[index] || ''}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        isInvalid={isInvalid}
                        isFilled={!!field.value[index]}
                        placeholder={placeholder}
                        autoComplete="off"
                        className="outline-none text-center text-3xl font-semibold text-black"
                    />
                ))}
            </div>
            <div>{isInvalid && <div className="text-red-500 text-sm text-center">{meta.error}</div>}</div>
        </>
    );
};
