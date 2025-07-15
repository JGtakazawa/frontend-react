import React from "react";

type TNoDataMessageProps = {
    message: string;
};

const NoDataMessage: React.FC<TNoDataMessageProps> = ({ message }) => {
    return (
        <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md"
            role="alert"
        >
            {message}
        </div>
    );
};

export default NoDataMessage;
