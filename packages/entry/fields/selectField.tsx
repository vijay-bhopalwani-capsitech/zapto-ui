import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { useField } from 'formik';
import React, { ReactElement } from 'react'

export interface IASelectInputProps {
    name: string;
    placeholder?: string;
    label?: string | ReactElement;
    errorMessage?: string;
    preserveErrorSpace?: boolean;
    options: { value: string, label: string }[]
}

export const SelectField = ({ label = '', errorMessage = '', preserveErrorSpace = true, options, placeholder, name }: IASelectInputProps) => {
    const [{ value }, meta, helpers] = useField(name);

    const isInvalid = meta.touched && meta.error;

    const handleChange = (value: string) => {
        helpers.setValue(value);
    }
    return (
        <div>
            <Select onValueChange={handleChange}>
                {label}
                <SelectTrigger className="rounded-full">
                    <SelectValue defaultValue={value} className='placeholder-[#92959A]' placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {
                        options.map((option, index) => (
                            <SelectItem key={index} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            {isInvalid && <div className="text-red-500 text-xs text-center">{errorMessage}</div>}
        </div>
    )
}