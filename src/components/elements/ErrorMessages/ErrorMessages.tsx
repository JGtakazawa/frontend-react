import React from 'react';

type ErrorMessagesProps = {
    errors: string[];
};

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors }) => {
    if (errors.length === 0) return null;

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-md mb-4">
            <ul className="list-disc pl-5">
                {errors.map((error, index) => (
                    <li key={index} className="text-sm">{error}</li>
                ))}
            </ul>
        </div>
    );
};

export default ErrorMessages;
