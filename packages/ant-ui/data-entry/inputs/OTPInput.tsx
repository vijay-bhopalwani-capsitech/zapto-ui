import React, { RefObject, useMemo, useState } from 'react';

import { Col, Input, InputProps, InputRef, Row, Space, theme, Typography } from 'antd';
import styled from 'styled-components';
import { useUiSettingsContext } from '../../settings';

export interface IAOTPInputProps extends Omit<InputProps, 'size' | 'onChange' | 'value'> {
    label?: string;
    isInvalid?: boolean;
    preserveErrorSpace?: boolean;
    errorMessage?: string;
    inputRef?: RefObject<InputRef>;
    value: string;
    onChange: (value: string) => void;
    length?: number;
}

const StyledInput = styled(Input)`
    height: 40px;
    width: 40px;
`;

const AOTPInputComponent = ({ label = '', isInvalid = false, errorMessage = '', preserveErrorSpace = true, length = 4, ...props }: IAOTPInputProps) => {
    const { token: themeToken } = theme.useToken();
    const { size: configSize } = useUiSettingsContext();
    const size = useMemo(() => {
        switch (configSize) {
            case 'medium': {
                return 'middle';
            }
            default: {
                return configSize;
            }
        }
    }, [configSize]);

    const status = isInvalid ? 'error' : undefined;
    const handleChange = (value: string, index: number) => {
        const otpArray = props.value.split('');
        otpArray[index] = value;

        // Update the OTP state with the new value
        props.onChange(otpArray.join(''));

        // Automatically focus on the next input field
        if (value && index < length - 1) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) {
                (nextInput as HTMLInputElement).focus();
            }
        }

        // If input is cleared, focus on the previous input field
        if (!value && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) {
                (prevInput as HTMLInputElement).focus();
            }
        }
    };

    return (
        <Row>
            {label && (
                <Col span={24}>
                    <Typography.Text>{label}</Typography.Text>
                </Col>
            )}
            <Col span={24}>
                <Space>
                    {Array(length)
                        .fill('')
                        .map((value, index) => (
                            <StyledInput
                                key={index}
                                id={`otp-${index}`}
                                maxLength={1}
                                style={{ width: '40px', textAlign: 'center' }}
                                value={props.value.split('')[index]}
                                onChange={(e) => handleChange(e.target.value, index)}
                            />
                        ))}
                </Space>
            </Col>
            {preserveErrorSpace || isInvalid ? (
                <Col span={24} className="text-end">
                    <Typography.Text style={{ color: themeToken?.colorError }}>{isInvalid ? errorMessage : ' '}</Typography.Text>
                </Col>
            ) : (
                <></>
            )}
        </Row>
    );
};

export const AOTPInput = React.memo(AOTPInputComponent);
