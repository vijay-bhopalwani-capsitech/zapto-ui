import { Radio, Typography } from "antd"
import { useField } from "formik";
import { useUiSettingsContext } from "../../settings";
import { useMemo } from "react";

export const AToggleButtons = ({ label = "", disabled = false, trueLabel = "Yes", isInline = false, falseLabel = "No", name = '', ...props }) => {
    const [field, meta, helpers] = useField(name);

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
            {label && (
                <div>
                    <Typography.Text>{label}</Typography.Text>
                </div>
            )}
            {/* {JSON.stringify(field.value)} */}
            <Radio.Group value={field.value} buttonStyle="solid" size={size} {...props}>
                <Radio.Button disabled={disabled} value={true} onClick={() => helpers.setValue(true)} >{trueLabel}</Radio.Button>
                <Radio.Button disabled={disabled} value={false} onClick={() => helpers.setValue(false)}>{falseLabel}</Radio.Button>
            </Radio.Group>
            <div>
                <Typography.Text type="danger">
                    {meta.touched && meta.error ? meta.error : null}
                </Typography.Text>
            </div>
        </>
    )
}