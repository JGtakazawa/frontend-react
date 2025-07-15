import React from 'react';

interface AccountFormFieldPasswordProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccountFormFieldPassword: React.FC<AccountFormFieldPasswordProps> = ({ onChange }) => (
    <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</label>
        <input
            type="password"
            name="password"
            id="password"
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
);

export default AccountFormFieldPassword;
