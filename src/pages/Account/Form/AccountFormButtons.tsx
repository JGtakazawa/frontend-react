import React from 'react';

interface AccountFormButtonsProps {
    onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onReset: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AccountFormButtons: React.FC<AccountFormButtonsProps> = ({ onSubmit, onDelete, onReset }) => (
    <div className="space-x-2">
        <button
            type="submit"
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
            作成
        </button>
        <button
            type="submit"
            onClick={onSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
            更新
        </button>
        <button
            type="button"
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
            削除
        </button>
        <button
            type="reset"
            onClick={onReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
            リセット
        </button>
    </div>
);

export default AccountFormButtons;
