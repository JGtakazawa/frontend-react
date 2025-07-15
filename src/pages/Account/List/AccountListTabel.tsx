import React from 'react';

export type AccountListTableItem = {
    id: string;
    role: 'user' | 'admin';
}

export type AccountListTableProps = {
    items: AccountListTableItem[];
}

const AccountListTable: React.FC<AccountListTableProps> = ({ items }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>権限</th>
                        <th scope='col'>詳細</th>
                        <th scope='col'>編集</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.role}</td>
                            <td><button>詳細</button></td>
                            <td><button>編集</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AccountListTable;
