// import React from "react";
// import Select, { GroupBase, OptionsOrGroups } from "react-select";
// import { OrderOption } from "../lib/GlobalOptions";

// interface IOrderItemProps {
//     input?: JSX.Element;
//     select?: JSX.Element;
//     placeHolder?: string;
//     options?: OptionsOrGroups<string, GroupBase<string>>;
//     text: string;
//     boldText: string;
//     value: string | OrderOption;
//     onChange: () => void;
//     span: JSX.Element;
// }

// const OrderItem = (props: IOrderItemProps) => {
//     const inputElement = (
//         <input
//             value={props.value}
//             onChange={props.onChange}
//             type="text"
//             placeholder={props.placeHolder}
//             className="form-input"
//             style={{ minHeight: "38px" }}
//         />
//     );
//     const selectElement = (
//         <Select value={props.value} onChange={props.onChange} className="form-input" name="order-options" options={props.options} />
//     );
//     const spanElement = (
//         <span>
//             {props.text}
//             <strong>{props.boldText}</strong>
//         </span>
//     );
//     return (
//         <div className="form-item">
//             {spanElement}
//             {selectElement}
//             {inputElement}
//         </div>
//     );
// };

// export default OrderItem;
