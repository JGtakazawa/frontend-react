import React from 'react';

interface AccountFormFieldIdProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccountFormFieldId: React.FC<AccountFormFieldIdProps> = ({ onChange }) => (
    <div className="mb-4">
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">ログインID</label>
        <input
            type="text"
            name="id"
            id="id"
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
);

export default AccountFormFieldId;
