import React from "react";
import { Link } from "react-router-dom";
import { InfoListTablePropsType } from "../../../../../../share/types/info/info.props";

const InfoListTable: React.FC<InfoListTablePropsType> = ({ infos }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">タイトル</th>
                        <th className="border border-gray-300 px-4 py-2">詳細</th>
                        <th className="border border-gray-300 px-4 py-2">編集</th>
                    </tr>
                </thead>
                <tbody>
                    {infos.map((info) => (
                        <tr key={info.id} className="hover:bg-gray-100 transition duration-200">
                            <td className="border border-gray-300 px-4 py-2">{info.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{info.title}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link
                                    to={`/info/${info.id}/detail`}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300 whitespace-nowrap"
                                >
                                    詳細
                                </Link>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link
                                    to={`/info/${info.id}/edit`}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300 whitespace-nowrap"
                                >
                                    編集
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InfoListTable;
