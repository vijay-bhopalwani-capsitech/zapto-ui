import React, { useMemo } from 'react';
import { Col, Row, Typography } from 'antd';
import { useUiSettingsContext } from '../../settings';
import { ASelectInput } from './SelectInput';
import styled from 'styled-components';

export interface IPriceRangeValue {
    start: number;
    end: number;
}

export interface IPriceRangePickerInputProps {
    label?: string;
    value: IPriceRangeValue | null;
    onChange: (value: IPriceRangeValue | null) => void;
    isInvalid?: boolean;
    preserveErrorSpace?: boolean;
    errorMessage?: string;
    placeholder?: string;
    type: 'price' | 'stock';
}

const StyledInputNumber = styled.div`
    width: 100%;
`;

export const PriceRangePickerInput = ({ label = '', value, onChange, isInvalid = false, errorMessage = '', preserveErrorSpace = true, placeholder = '', type = 'price' }: IPriceRangePickerInputProps) => {
    const { size: configSize } = useUiSettingsContext();
    const size = useMemo(() => (configSize === 'medium' ? 'middle' : configSize), [configSize]);
    const getRangeOptions = (type: 'price' | 'stock') => {
        if (type === 'price') {
            return [
                {value:'0 - ',label: 'All'},
                { value: '100 - 999', label: '100 - 999' },
                { value: '1000 - 1999', label: '1000 - 1999' },
                { value: '2000 - 2999', label: '2000 - 2999' },
                { value: '3000 - 3999', label: '3000 - 3999' },
                { value: '4000 - 4999', label: '4000 - 4999' },
                { value: '5000 - 5999', label: '5000 - 5999' },
                { value: '6000 - ', label: 'greater than 6000' },
            ];
        }
        return [
            { value: '0 - ', label: 'All' },
            { value: '0 - 10', label: '0 - 10' },
            { value: '11 - 50', label: '11 - 50' },
            { value: '51 - 100', label: '51 - 100' },
            { value: '101 - 200', label: '101 - 200' },
            { value: '201 - 300', label: '201 - 300' },
            { value: '301 - ', label: 'greater than 300' },
        ];
    };

    const priceLabelOptions = useMemo(() => getRangeOptions(type), [type]);
    const formattedValue = value ? `${value.start} - ${value.end}` : undefined;
    const handleChange = (value: string) => {
        const [start, end] = value.split(' - ').map((price) => {
            return price === '' ? Infinity : parseInt(price, 10);
        });
        const priceRange: IPriceRangeValue = {
            start,
            end: end || start,
        };
        onChange(priceRange);
    };

    return (
        <Row>
            <Col span={24}>
                <ASelectInput  preserveErrorSpace={false} value={formattedValue} onSelect={handleChange} placeholder={placeholder} size={size} options={priceLabelOptions} />
            </Col>
        </Row>
    );
};
