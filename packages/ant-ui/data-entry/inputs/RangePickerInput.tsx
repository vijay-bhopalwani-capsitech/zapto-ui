import { useMemo } from 'react';
import { Col, DatePicker, Row, Typography } from 'antd';
import styled from 'styled-components';
import { useUiSettingsContext } from '../../settings';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

const { RangePicker } = DatePicker;

type TRangePicker = typeof RangePicker

dayjs.extend(utc);

export interface IRangeValue {
    start: string;
    end: string;
}

export interface IARangePickerInputProps
    extends TRangePicker {
    label?: string;
    value: [Dayjs | null, Dayjs | null] | null;
    onChange: (value: IRangeValue | null) => void;
    isInvalid?: boolean;
    preserveErrorSpace?: boolean;
    errorMessage?: string;
    placeholder?: [string, string];
    showTime?: boolean;
}

const StyledARangePicker: typeof RangePicker = styled(RangePicker)`
    width: 100%;
` as unknown as typeof RangePicker;

export const ARangePickerInput = ({ label = '', value, onChange, isInvalid = false, errorMessage = '', preserveErrorSpace = true, showTime = false, ...props }: IARangePickerInputProps) => {
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

    const handleChange = (values: [Dayjs | null, Dayjs | null] | null) => {
        if (values && values?.map((value) => value && value?.toISOString)) {
            const startDate = values?.[0]?.utc(true)?.startOf('day')?.toISOString();
            const endDate = values?.[1]?.utc(true)?.endOf('day')?.toISOString();
            return onChange({ start: startDate ?? '', end: endDate ?? '' });
        }
        onChange(null);
    };

    return (
        <Row>
            {label && (
                <Col span={24}>
                    <Typography.Text>{label}</Typography.Text>
                </Col>
            )}
            <Col span={24}>
                <StyledARangePicker {...(showTime ? { showTime: { format: 'hh:mm A' } } : {})} format={showTime ? ['DD/MM/YYYY hh:mm A'] : ['DD/MM/YYYY']} size={size} value={value} onChange={handleChange} {...props} />
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
};
