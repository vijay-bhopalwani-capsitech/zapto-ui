import { useMemo } from 'react';
import { Col, Row, TimePicker, Typography } from 'antd';
import styled from 'styled-components';
import { useUiSettingsContext } from '../../settings';
import { Dayjs } from "dayjs";

export interface IATimePickerInputProps {
    label?: string;
    tip?: string;
    isInvalid?: boolean;
    preserveErrorSpace?: boolean;
    errorMessage?: string;

    [key: string]: any;
}

const StyledATimePicker: typeof TimePicker = styled(TimePicker)`
    width: 100%;
` as unknown as typeof TimePicker;

export function ATimePickerInput({ label = '', tip = '', pill = false, isInvalid = false, errorMessage = '', preserveErrorSpace = true, sm = false, showTime = false, ...props }: IATimePickerInputProps) {
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

    const handleChange = (val: Dayjs | null) => {
        if (val && val.toISOString) {
            const dateString = val.toISOString();
            console.log('-> dateString', dateString);
            return props.onChange(dateString);
        }
        props.onChange(val);
    };

    const status = isInvalid ? "error" : undefined;

    return (
        <Row>
            {label && (
                <Col span={24}>
                    <Typography.Text>{label}</Typography.Text>
                </Col>
            )}
            <Col span={24}>
                <StyledATimePicker  {...(showTime ? { showTime: { format: 'hh:mm A' } } : {})} format={showTime ? [' hh:mm A'] : ['']} size={size} {...props} value={props.value} onChange={handleChange} status={status} />
            </Col>
            {preserveErrorSpace || isInvalid ? (
                <Col span={24}>
                    <Typography.Text type={'danger'}>{isInvalid ? errorMessage : ' '}</Typography.Text>
                </Col>
            ) : (
                <></>
            )}
        </Row>
    );
}

export default ATimePickerInput;
