import React from "react";
import { Link } from "react-router-dom";
import { InfoListTablePropsType } from "../../../../../../../share/types/info/info.props";
import CheckBox from "../../../components/CheckBox/CheckBox";

const InfoListTable: React.FC<InfoListTablePropsType> = ({
  infos,
  isChecked,
  checkBoxChange,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="border border-gray-300 bg-gray-100 text-gray-700 px-1 py-2 w-14 ">
              <input type="checkbox" />
            </th>
            <th className="border border-gray-300 bg-gray-100 text-gray-700 px-1 py-2 w-14 ">
              添
            </th>
            <th className="border border-gray-300 bg-gray-100 text-gray-700 px-4 py-2 text-left">
              タイトル
            </th>
            <th className="border border-gray-300 bg-gray-100 text-gray-700 px-4 py-2 text-left">
              作成者
            </th>
            <th className="border border-gray-300 bg-gray-100 text-gray-700 px-4 py-2 text-left">
              掲載期間
            </th>
          </tr>
        </thead>
        <tbody>
          {infos.map((info) => (
            <tr
              key={info.id}
              className="hover:bg-gray-100 transition duration-200"
            >
              <td className="border bg-white border-gray-300 px-4 py-2 text-center">
                <CheckBox
                  checked={isChecked}
                  disabled={false}
                  onChange={checkBoxChange}
                  id={info.id}
                />
              </td>
              <td className="border bg-white border-gray-300 px-4 py-2 text-center text-purple-400 font-bold">
                ◇
              </td>
              <td className="border bg-white border-gray-300 px-4 py-2">
                <Link
                  to={`/info/${info.title}/`}
                  className="text-blue-600 hover:underline"
                >
                  {info.title}
                </Link>
              </td>
              <td className="border bg-white border-gray-300 px-4 py-2">
                山田 太郎
              </td>
              <td className="border bg-white border-gray-300 px-4 py-2">
                {/*本来はこうしたい→ {info.startDate} 〜 {info.endDate} 現在は型情報が今のDBように修正できていない為、暫定の処理をしている*/}
                20XX年◇月☆日 〜 20XX年◇月△日
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoListTable;
