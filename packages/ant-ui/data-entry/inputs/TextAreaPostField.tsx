import { Col, Row, Typography } from "antd";
import { useMemo } from "react";
import { useUiSettingsContext } from "../../settings";
import styled from "styled-components";


export interface IATextAreaPostField {
    label?: string;
    tip?: string;
    rows?: number;
    isInvalid?: boolean;
    preserveErrorSpace?: boolean;
    errorMessage?: string;
    sm?: boolean;
    [key: string]: any;
    isCharacterLimitation?: boolean;
    characterLimit?: number;
}



const StyledTextArea = styled.textarea`
  
border: none !important;
  overflow-y: visible ; 
  overflow-x: hidden; 
  outline: none !important;
  resize: none !important;
  width: 100%;
  background-color:transparent;

`;



export function ATextAreaPostField({ label = '', tip = '', characterLimit = 0, isCharacterLimitation = false, isInvalid = false, rows = 4, preserveErrorSpace = true, errorMessage = '', sm = false, ...props }: IATextAreaPostField) {

    const remainingCharacters = (characterLimit ?? 0) - (props?.value?.length ?? 0);

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

    return (
        <>
            <Row>
                {label && (
                    <Col span={24}>
                        <Typography.Text>{label}</Typography.Text>
                    </Col>
                )}
                <Col span={24}>
                    <StyledTextArea style={{ border: `1px solid ${isInvalid ? 'red' : 'none'}` }}
                        rows={rows} className="outline-none"  {...props} />
                </Col>

                {isCharacterLimitation ? (
                    <div className="row">
                        <div className="col-8 text-end">
                            <Typography.Text id="helpBlock" style={{ color: '#dc3545' }}>
                                {isInvalid ? errorMessage : ' '}
                            </Typography.Text>
                        </div>
                        <div className="col-4 text-end">
                            {!!characterLimit && (
                                <div className={'d-flex justify-content-end'}>
                                    {remainingCharacters >= 0 ? (
                                        <Typography.Text id="helpBlock">
                                            {remainingCharacters} characters remaining
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text id="helpBlock" className={'text-danger'}>
                                            {Math.abs(remainingCharacters)} extra characters
                                        </Typography.Text>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <Col span={24} className="text-end">
                        <Typography.Text id="helpBlock" style={{ color: '#dc3545' }}>
                            {isInvalid ? errorMessage : ' '}
                        </Typography.Text>
                    </Col>
                )}
            </Row>

        </>
    )
}