import React, { RefObject, useMemo } from 'react';

import { Col, Input, InputRef, Rate, RateProps, Row, theme, Typography } from 'antd';
import styled from 'styled-components';
import { useUiSettingsContext } from '../../settings';

export interface IARateInputProps extends Omit<RateProps, 'size'> {
    label?: string;
    isInvalid?: boolean;
    preserveErrorSpace?: boolean;
    errorMessage?: string;
    inputRef?: RefObject<InputRef>;
}

const StyledInput = styled(Input)`
    width: 100%;
`;

const ARateInputComponent = ({ label = '', isInvalid = false, errorMessage = '', preserveErrorSpace = true, ...props }: IARateInputProps) => {
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


    return (
        <Row>
            {label && (
                <Col span={24}>
                    <Typography.Text>{label}</Typography.Text>
                </Col>
            )}
            <Col span={24}>
                <Rate allowHalf ref={props?.inputRef} onChange={props?.onChange} {...props} />
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

export const ARateInput = React.memo(ARateInputComponent);
