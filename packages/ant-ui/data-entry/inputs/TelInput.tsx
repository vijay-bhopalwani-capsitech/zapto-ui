import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Col, InputRef, Row, theme, Typography } from 'antd';
import { usePhoneInput, defaultCountries, FlagEmoji } from 'react-international-phone';
import styled from 'styled-components';
import { ATextInput, IATextInputProps } from './TextInput';
import { ASelectInput } from './SelectInput';

export interface IATelInputProps extends Omit<IATextInputProps, 'value' | 'onChange'> {
    name: string;
    value: string;
    onChange: (value: string) => void;
    label?: string;
    isInvalid?: boolean;
    preserveErrorSpace?: boolean;
    errorMessage?: string;
}

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
 * A telephone input component (for string value) using ant design.
 * @param name - name of the input
 * @param label - label of the input
 * @param isInvalid - specifies whether is in error state or not
 * @param errorMessage - error message
 * @param preserveErrorSpace - should the input always take the error space even if there is no error. If we disable this then height will increase in case of error.
 * @param value - value of the telephone input
 * @param onChange - function which will be called when the value of the telephone input changes
 * @param other props - supports all other props of Ant Design Input
 */
const ATelInputComponent = ({ name, value, onChange, label = '', preserveErrorSpace = true, isInvalid = false, errorMessage = '', ...props }: IATelInputProps) => {
    const { token: themeToken } = theme.useToken();
    const valueString = useMemo(() => {
        if (!value) {
            return '';
        }
        if (value?.includes('+')) {
            return value;
        }

        return `+${value}`;
    }, [value]);
    // const [formattedValue, setFormattedValue] = React.useState(valueString);

    // useEffect(() => {
    //     if (!value) {
    //         setFormattedValue('');
    //     }
    //     setFormattedValue(value);
    // }, [value]);

    // useEffect(() => {
    //     onChange(formattedValue?.replace('+', '')?.replaceAll(' ', '')?.replaceAll('-', '')?.replaceAll('(', '')?.replaceAll(')', ''));
    // }, [formattedValue]);

    const {
        phone,
        inputRef: phoneInputRef,
        country,
        setCountry,
        handlePhoneValueChange,
    } = usePhoneInput({
        defaultCountry: 'gb',
        value: valueString,
        onChange: (data) => {
            onChange(data?.phone);
            // setFormattedValue(data?.phone);
        },
        // historySaveDebounceMS: 500,
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
    useEffect(() => {
        if (phoneInputRef && inputRef.current?.input) {
            phoneInputRef.current = inputRef.current.input;
        }
    }, [inputRef, phoneInputRef]);

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
                    onChange={(event: any) => {
                        handlePhoneValueChange(event);
                    }}
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
 * A telephone input component (for string value) using ant design.
 * @param name - name of the input
 * @param label - label of the input
 * @param isInvalid - specifies whether is in error state or not
 * @param errorMessage - error message
 * @param preserveErrorSpace - should the input always take the error space even if there is no error. If we disable this then height will increase in case of error.
 * @param value - value of the telephone input
 * @param onChange - function which will be called when the value of the telephone input changes
 * @param other props - supports all other props of Ant Design Input
 */
export const ATelInput = memo(ATelInputComponent);
