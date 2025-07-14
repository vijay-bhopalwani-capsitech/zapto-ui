// import { FieldArray, useFormikContext } from 'formik';
// import { Col, Row, Typography } from 'antd';
// import { Gutter } from 'antd/es/grid/row';
// import { BsPlus } from 'react-icons/bs';
// import { MdDeleteOutline } from 'react-icons/md';
// import { getValueAtPathInObj } from 'ui-helpers';
// import { APhoneField, IAPhoneFieldProps } from './PhoneField';

// interface IAPhoneArrayFieldProps extends IAPhoneFieldProps {
//     rowGutter?: Gutter | [Gutter, Gutter];
// }

// const initialPhoneValues = {
//     number: '',
//     countryCode: 44,
//     type: 'WORK',
//     remarks: '',
// };

// /**
//  * Generates a phone array field component.
//  *
//  * @typeParam Values - The generic object type.
//  * @param name - The name of the field.
//  * @param rowGutter - The gutter spacing between rows.
//  * @param label - The label for the field.
//  * @param props - Additional props for the field.
//  * @return The rendered phone array field component.
//  * @Note - Add object in array value because of length of array
//  */
// export const APhoneArrayField = <Values extends object>({ name, rowGutter = [10, 10], label = '', ...props }: IAPhoneArrayFieldProps) => {
//     const { values } = useFormikContext<Values | any>();
//     return (
//         <>
//             {label && <Typography.Text>{label}</Typography.Text>}
//             <FieldArray
//                 name={name}
//                 render={(arrayHelpers) => {
//                     return (
//                         <>
//                             {Array.isArray(getValueAtPathInObj({ obj: values, path: name })) &&
//                                 getValueAtPathInObj({ obj: values, path: name })?.length > 0 &&
//                                 getValueAtPathInObj({ obj: values, path: name })?.map((item: Values | any, index: number) => (
//                                     <Row key={index} gutter={rowGutter}>
//                                         <Col span={22}>
//                                             <APhoneField name={`${name}[${index}]`} {...props} />
//                                         </Col>
//                                         <Col span={2}>
//                                             <span
//                                                 title={index === 0 ? 'Add' : 'Remove'}
//                                                 style={{
//                                                     cursor: 'pointer',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     height: 'calc(100% - 20px)',
//                                                 }}
//                                                 onClick={() => {
//                                                     if (index === 0) {
//                                                         arrayHelpers?.push(initialPhoneValues);
//                                                     } else {
//                                                         arrayHelpers?.remove(index);
//                                                     }
//                                                 }}
//                                             >
//                                                 {index === 0 ? <BsPlus size={22} /> : <MdDeleteOutline size={18} />}
//                                             </span>
//                                         </Col>
//                                     </Row>
//                                 ))}
//                         </>
//                     );
//                 }}
//             />
//         </>
//     );
// };
