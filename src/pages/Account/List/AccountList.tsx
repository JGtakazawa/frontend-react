import React from 'react';
import { Link } from 'react-router-dom';

type AccountListItem = {
    id: string;
    role: string;
}

type AccountListProps = {
    items: AccountListItem[];
}

const AccountList: React.FC<AccountListProps> = ({ items }) => {
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
                            <td><Link to={'/account/'}</td>
                            <td><button>編集</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AccountList;
