import { memo, ReactNode } from 'react';
import styled from 'styled-components';
import { AFileUploadInput, IACommonFileUploadProps } from './FileUploadInput';
import { AButton } from '../../buttons';
import { Col, theme, Typography } from 'antd';

const UploadInput = styled.div`
    .uploadInput input {
        cursor: pointer !important;
    }
`;

export interface IAFileUploadButtonInputProps extends IACommonFileUploadProps {
    children?: ReactNode | string;
    className?: string;
    type?: 'text' | 'primary' | 'link' | 'default' | 'dashed';
    icon?: ReactNode;
}

/**
 * File upload button input
 * @param children
 * @param value
 * @param onChange
 * @param type
 * @param className
 * @param icon
 * @param props
 */
const AFileUploadButtonInputComponent = ({
    isInvalid = false,
    errorMessage = '',
    preserveErrorSpace = true,
    children,
    value,
    onChange,
    type = 'primary',
    className = '',
    icon = '',
    ...props
}: IAFileUploadButtonInputProps) => {
    // const size = useSelector(selectConfigSize)
    // console.log("-> size", size);
    const { token: themeToken } = theme.useToken();

    return (
        <>
            <UploadInput>
                <div className="uploadInput">
                    <AFileUploadInput value={value} onChange={onChange} {...props}>
                        {({ isLoading }: { isLoading: boolean }) => (
                            <>
                                <div>
                                    <AButton className={className} type={type} icon={icon} loading={isLoading} disabled={isLoading} style={{ cursor: 'pointer' }}>
                                        {children}
                                    </AButton>
                                </div>
                            </>
                        )}
                    </AFileUploadInput>
                    {preserveErrorSpace || isInvalid ? (
                        <Col span={24} className="text-end">
                            <Typography.Text style={{ color: themeToken?.colorError }}>{isInvalid ? errorMessage : ' '}</Typography.Text>
                        </Col>
                    ) : (
                        <></>
                    )}
                </div>
            </UploadInput>
        </>
    );
};

/**
 * Renamed FileUploadButton to FileUploadButtonInput
 */
export const AFileUploadButtonInput = memo(AFileUploadButtonInputComponent);
