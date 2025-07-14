import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Col, InputRef, Popover, Row, theme, Typography } from 'antd';
import { usePhoneInput, defaultCountries, FlagEmoji } from 'react-international-phone';
import styled from 'styled-components';
import { parsePhoneNumber } from 'awesome-phonenumber';
import { BiCommentEdit } from 'react-icons/bi';
import { ATextInput, IATextInputProps } from './TextInput';
import { ASelectField, ATextField } from '../fields';
import { ASelectInput } from './SelectInput';

export interface IPhone {
    number: string;
    countryCode: number;
    remarks: string;
    type: string;
};

export interface IPhoneValues extends IPhone {
    phone: string;
    format?: string;
}

export interface IAPhoneInputProps extends Omit<IATextInputProps, 'value' | 'onChange'> {
    name: string;
    value: IPhoneValues;
    onChange: (value: IPhoneValues) => void;
    label?: string;
    isInvalid?: boolean;
    preserveErrorSpace?: boolean;
    errorMessage?: string;
}

const phoneTypeOptions = [
    {
        label: 'Home',
        value: 'HOME',
    },
    {
        label: 'Work',
        value: 'WORK',
    },
    {
        label: 'Mobile',
        value: 'MOBILE',
    },
    {
        label: 'Other',
        value: 'OTHER',
    },
];

const StyledATextInput = styled(ATextInput)`
    .ant-select-selector:first-child {
        padding: 0 !important;
    }
`;

const StyledSelectInput = styled(ASelectInput)`
    position: relative;

    .ant-select-selection-item .option-label {
        display: none;
    }

    .ant-select-selection-item .selected-label {
        display: block !important;
        height: 20px;
    }

    .ant-select-item-option-content .selected-label {
        display: none;
    }
`;

const StyledSelectLabel = styled.div`
    .selected-label {
        display: none;
    }

    .react-international-phone-flag-emoji {
        max-height: 20px;
    }

    .selected-label .react-international-phone-flag-emoji {
        max-height: 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

/**
 * A phone input component using ant design.
 * @param name - name of the input
 * @param label - label of the input
 * @param isInvalid - specifies whether is in error state or not
 * @param errorMessage - error message
 * @param preserveErrorSpace - should the input always take the error space even if there is no error. If we disable this then height will increase in case of error.
 * @param value - value of the phone input
 * @param onChange - function which will be called when the value of the phone input changes
 * @param other props - supports all other props of Ant Design Input
 * @Note - Phone type value (eg - Home, Work etc.) changed object to string and restore it in phone input, So that it can be parsed.
 * So that We don't need to worry about the typeScript error in Select field (type of phone) because When Select input (label, value) changes, then it will be call onChange function thus formik will always store the string value of type
 */
const APhoneInputComponent = ({ name, value, onChange, label = '', preserveErrorSpace = true, isInvalid = false, errorMessage = '', ...props }: IAPhoneInputProps) => {
    const { token: themeToken } = theme.useToken();
    const valueString = useMemo(() => {
        if (!value) {
            return '';
        }
        if (value?.phone) {
            return value.phone;
        }

        return `+${value.countryCode} ${value.number}`;
    }, [value]);

    const {
        phone,
        inputRef: phoneInputRef,
        country,
        setCountry,
        handlePhoneValueChange,
    } = usePhoneInput({
        defaultCountry: 'in',
        value: valueString,
        onChange: (data) => {
            const parsedPhone = parsePhoneNumber(data?.phone);
            const validPhoneFormat = countriesOptions.find((country) => country?.regionCode === data?.country)?.format;
            // TODO: bug - all +1 country codes have same region code. Need to figure out how to handle this because now if we select the canada and save the phone number it will be saved as +1 us, all the confusion is about country flags
            onChange({
                ...value,
                number: parsedPhone?.number?.significant ?? '',
                countryCode: parsedPhone?.countryCode as number,
                format: validPhoneFormat,
                // regionCode: parsedPhone?.regionCode,
                // @ts-ignore
                // type: value?.type && typeof value?.type === 'object' ? value?.type?.value : value?.type ?? 'Work',
                phone: data?.phone,
            });
        },
        // disableDialCodeAndPrefix: true,
    });

    const countriesOptions = useMemo(() => {
        const formattedCountries = defaultCountries.map((country) => {
            return {
                name: country[0], // Country name
                label: (
                    <StyledSelectLabel>
                        <span className={'option-label'}>
                            <FlagEmoji iso2={country[1]} style={{ marginRight: themeToken.marginXS }} /> <span>{`${country[0]} (+${country[2]})`}</span>
                        </span>
                        <span className={'selected-label'}>
                            <FlagEmoji iso2={country[1]} />
                        </span>
                    </StyledSelectLabel>
                ), // label
                regionCode: country[1], // region code
                value: country[1], // Country code
                countryCode: country[2], // Country code
                format: country[3], // Country number format
                priority: country[4], // Country priority
                areaCodes: country[5], // Country areaCodes
            };
        });
        return formattedCountries?.sort((a, b) => Number(a?.countryCode) - Number(b?.countryCode));
    }, []);

    const inputRef = useRef<InputRef>(null);

    // Need to reassign inputRef because antd provides not default ref
    // TODO: commented code for inputRef of usePhoneInput because it causing cursor jump issue but need to solve this issue because phoneInputRef.current is always null.
    // useEffect(() => {
    //     if (phoneInputRef && inputRef.current?.input) {
    //         phoneInputRef.current = inputRef.current.input;
    //     }
    // }, [inputRef, phoneInputRef]);

    useEffect(() => {
        onChange({
            ...value,
            // @ts-ignore
            // type: value?.type && typeof value?.type === 'object' ? value?.type?.value : value?.type ?? 'Work',
        });
    }, [value?.type]);

    return (
        <Row>
            {label && (
                <Col span={24}>
                    <Typography.Text>{label}</Typography.Text>
                </Col>
            )}
            <Col span={24}>
                <StyledATextInput
                    style={{ border: 'none' }}
                    inputRef={inputRef}
                    preserveErrorSpace={false}
                    value={phone}
                    onChange={handlePhoneValueChange}
                    addonBefore={
                        <StyledSelectInput
                            virtual={false}
                            preserveErrorSpace={false}
                            suffixIcon={null}
                            labelInValue
                            style={{ width: 50 }}
                            popupMatchSelectWidth={false}
                            dropdownStyle={{ maxWidth: 200, minWidth: 100 }}
                            value={country}
                            onChange={(country: any) => {
                                if (country?.value) {
                                    setCountry(country?.value);
                                }
                            }}
                            options={countriesOptions}
                        />
                    }
                    // suffix={
                    //     <Popover content={<ATextField name={`${name}.remarks`} placeholder="Remarks" />} title="Remarks" trigger="click">
                    //         <span title="Remarks" style={{ cursor: 'pointer' }}>
                    //             <BiCommentEdit size={18} />
                    //         </span>
                    //     </Popover>
                    // }
                    // addonAfter={
                    //     <ASelectField
                    //         name={`${name}.type`}
                    //         preserveErrorSpace={false}
                    //         suffixIcon={null}
                    //         labelInValue
                    //         style={{ width: 60 }}
                    //         popupMatchSelectWidth={false}
                    //         dropdownStyle={{ maxWidth: 200, minWidth: 100 }}
                    //         options={phoneTypeOptions}
                    //     />
                    // }
                    {...props}
                />
            </Col>
            {preserveErrorSpace || isInvalid ? (
                <Col span={24} className="text-end">
                    <Typography.Text style={{ color: themeToken.colorError }}>{isInvalid ? (typeof errorMessage === 'object' ? Object.values(errorMessage)?.join(', ') : errorMessage) : ' '}</Typography.Text>
                </Col>
            ) : (
                <></>
            )}
        </Row>
    );
};

/**
 * A phone input component using ant design.
 * @param name - name of the input
 * @param label - label of the input
 * @param isInvalid - specifies whether is in error state or not
 * @param errorMessage - error message
 * @param preserveErrorSpace - should the input always take the error space even if there is no error. If we disable this then height will increase in case of error.
 * @param value - value of the phone input
 * @param onChange - function which will be called when the value of the phone input changes
 * @param other props - supports all other props of Ant Design Input
 * @Note - Phone type value (eg - Home, Work etc.) changed object to string and restore it in phone input, So that it can be parsed.
 * So that We don't need to worry about the typeScript error in Select field (type of phone) because When Select input (label, value) changes, then it will be call onChange function thus formik will always store the string value of type
 */
export const APhoneInput = memo(APhoneInputComponent);
