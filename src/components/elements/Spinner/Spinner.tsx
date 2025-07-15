import React from "react";

const Spinner: React.FC = () => {
    return (
        <div
            className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center"
            id="spinner"
        >
            <div
                className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"
                role="status"
            >
                <span className="sr-only">読み込み中...</span>
            </div>
        </div>
    );
};

export default Spinner;
