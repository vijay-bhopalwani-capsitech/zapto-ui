import React, { memo, useMemo } from 'react';
import { Col, Row, Select, theme, Typography } from 'antd';
import { SelectProps } from 'antd/es/select';
import { useUiSettingsContext } from '../../settings';
import styled from 'styled-components';

export interface IASelectAccessLevelInputProps extends SelectProps {
    label?: string;
    isInvalid?: boolean;
    errorMessage?: string;
    preserveErrorSpace?: boolean;
}
const StyledSelect = styled(Select)`
    && {
        .ant-select-selector {
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            // background: ${({ theme }: { theme: any }) => (theme.colorBgBase === '#fff' ? '#f8f8f8' : '')} !important;
            background: transparent !important;
        }
        &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector,
        &:hover .ant-select-selector,
        &.ant-select-open .ant-select-selector {
            border-color: transparent !important;
            box-shadow: none !important;
        }
        .ant-select-selection-search-input {
            border: none !important;
            box-shadow: none !important;
        }
        .ant-select-arrow {
            color: inherit;
        }
        &:focus,
        &:hover,
        &:active {
            outline: none !important;
        }
        /* For the dropdown menu */
        .ant-select-dropdown {
            border: none !important;
            box-shadow: none !important;
        }
        /* For dropdown items */
        .ant-select-item {
            background: transparent !important;
            &:hover,
            &-option-active,
            &-option-selected {
                background: transparent !important;
            }
        }
    }
`;

/**
 * Renders a select input component with optional label, error message, and custom styling.
 *
 * @param label - The label to be displayed above the select input.
 * @param isInvalid - Indicates whether the select input is in an invalid state.
 * @param errorMessage - The error message to be displayed when the select input is invalid.
 * @param preserveErrorSpace - Indicates whether to preserve space for the error message when the select input is valid.
 * @param props - Additional props to be passed to the select input component.
 * @returns The rendered select input component.
 */
const ASelectAccessLevelInputComponent = ({ label = '', isInvalid = false, errorMessage = '', preserveErrorSpace = true, ...props }: IASelectAccessLevelInputProps) => {
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

    const handleChange = (value: any, option: any) => {
        // Need this condition because when we use labelInValue then ant-design select provide only {label, value} in selected option value
        if (props.labelInValue) {
            return props?.onChange?.(option, option);
        }
        props?.onChange?.(value, option);
    };

    return (
        <Row>
            {/* {label && (
                <Col span={24}>
                    <Typography.Text>{label}</Typography.Text>
                </Col>
            )} */}
            <Col span={24}>
                <StyledSelect size={size} {...props} onChange={handleChange} />
            </Col>
            {/* {preserveErrorSpace || isInvalid ? (
                <Col span={24} className="text-end">
                    <Typography.Text style={{ color: themeToken.colorError }}>{isInvalid ? (typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)) : ' '}</Typography.Text>
                </Col>
            ) : (
                <></>
            )} */}
        </Row>
    );
};

/**
 * Renders a select input component with optional label, error message, and custom styling.
 *
 * @param label - The label to be displayed above the select input.
 * @param isInvalid - Indicates whether the select input is in an invalid state.
 * @param errorMessage - The error message to be displayed when the select input is invalid.
 * @param preserveErrorSpace - Indicates whether to preserve space for the error message when the select input is valid.
 * @param props - Additional props to be passed to the select input component.
 * @returns The rendered select input component.
 */
export const ASelectAccessLevelFieldInput = memo(ASelectAccessLevelInputComponent);
