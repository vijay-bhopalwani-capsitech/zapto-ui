import React, { useMemo } from 'react';
import { Checkbox, CheckboxProps, Col, Row, Space, theme, Typography } from "antd";
import { CheckboxChangeEvent } from 'antd/es/checkbox';

export interface IACheckboxInputProps extends Omit<CheckboxProps, 'checked' | 'onChange'> {
    value: boolean;
    onChange: (value: boolean) => void;
    label: string;
    errorMessage: string;
    isInvalid: boolean;
}

function ACheckboxInputComponent({ value, onChange, label, isInvalid, errorMessage, ...props }: IACheckboxInputProps) {
    const {token: themeToken} = theme.useToken();
    const handleChange = (e: CheckboxChangeEvent) => {
        onChange(e.target.checked);
    };

    return (
        <>
            <Row>
                <Col xs={24}>
                    <Checkbox checked={value} onChange={handleChange}>
                        {label}
                    </Checkbox>
                </Col>
                <Col xs={24}>
                    <Typography.Text id="helpBlock" style={{ color: themeToken?.colorError }}>
                        {isInvalid ? errorMessage : ' '}
                    </Typography.Text>
                </Col>
            </Row>
        </>
    );
}

export const ACheckboxInput = React.memo(ACheckboxInputComponent);
