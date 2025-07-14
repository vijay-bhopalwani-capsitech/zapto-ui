import React, { useMemo } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import Group from 'antd/es/button/button-group';
import { useUiSettingsContext } from '../settings';
import styled from 'styled-components';

export type IButtonProps = React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> & {
    Group: typeof Group;
    isFormButton: boolean;
};

interface IAButtonProps extends ButtonProps {
    isFormButton?: boolean;
}

const StyledButton: typeof Button = styled(Button)`
    display: flex;
    align-items: center;
    box-shadow: none;
    .ant-btn-icon {
        margin-left: auto;
        margin-right: auto;
    }
`;
const StyledFormButton: typeof Button = styled(Button)`
    display: flex;
    align-items: center;
    padding: 3.5px 25px !important;
    .ant-btn-icon {
        margin-left: auto;
        margin-right: auto;
    }
`;

export function AButton({ isFormButton = false, ...props }: IAButtonProps) {
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

    if (isFormButton) {
        return <StyledFormButton size={size} {...props} />;
    } else {
        return <StyledButton size={size} {...props} />;
    }
}
