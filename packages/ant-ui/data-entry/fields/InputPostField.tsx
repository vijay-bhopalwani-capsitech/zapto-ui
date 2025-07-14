import { useField } from "formik";
import { ATextAreaInput, ATextAreaPostField, IATextAreaInput } from "../inputs";
import styled from "styled-components";

interface IAInputPostFieldProps extends IATextAreaInput {
    name: string;
}



export const AInputPostField = ({ name, ...props }: IAInputPostFieldProps) => {
    const [field, meta] = useField(name);
    const isInvalid = meta.touched && !!meta.error;
    return (
        <>
            <ATextAreaPostField errorMessage={meta.error} isInvalid={isInvalid} {...field} {...props} />
        </>
    );
};