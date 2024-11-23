import React from "react";

interface IFAQItemProps {
    question: string;
    answer: string;
}

const FAQItem = (props: IFAQItemProps) => {
    return (
        <div className="flex flex-col border-b-[1px] border-zinc-300 w-full mb-10 pb-10">
            <h5 className="text-slate-500 my-6 text-xl font-bold">{props.question}</h5>
            <p className="text-sm text-slate-500">{props.answer}</p>
        </div>
    );
};

export default FAQItem;
