import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DialogInputType } from "../../../pages/Info/Dialog/DialogType";
import useDialog from "../../../pages/Info/Dialog/UseDialog";
import Dialog from "../../../pages/Info/Dialog/Dialog";

// SidebarProps
export type Sidebar_ItemsType = {
  label: string;
  path: string;
}[];

export type SidebarPropsType = {
  items: Sidebar_ItemsType;
};

const Sidebar: React.FC<SidebarPropsType> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  // ToDo: この辺のデータは親からpropsで受け取れるようにいずれする（実際のデータを扱うときは）
  // カテゴリのデータに関しては配列とかで受け取れる必要性があるが、ダイアログ系に関しては何行も作成とかするわけではないから、そこはまた別の受け皿を設けて、そこで受け取るようにする
  const categories = [
    "すべて",
    "会社からのお知らせ",
    "役員コラム",
    "日経新聞 Share",
    "イベント写真",
    "クラブ活動",
    "文書管理リンク",
    "カオナビ・ガイド",
  ];

  const { dialogProps, openDialog, closeDialog } = useDialog(); // 修正されたuseDialogフック

  // ToDo: propsのitems配列から受け取ったデータをmap関数で回すような形式にいずれは変更する
  return (
    <>
      <button
        className="p-3 min-h-screen bg-blue-600 text-white md:hidden w-auto text-base"
        onClick={() => setIsOpen(!isOpen)}
      >
        メニュー
      </button>

      {/* カテゴリ表示用？ */}
      <div
        className={`w-96 p-4 bg-white min-h-screen md:block ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col space-y-3">
          <div className="flex flex-row">
            <div className="flex items-center ml-48 space-x-2">
              <h1 className="absolute left-4 text-3xl font-normal text-gray-900 bg-white">
                カテゴリー
              </h1>
            </div>

            <div className="ml-5 flex space-x-2">
              <button
                className="bg-white text-blue-600 font-bold px-4 py-2 rounded hover:bg-blue-500 border border-blue-600"
                onClick={() => openDialog("create")}
              >
                新規
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded"
                onClick={() => openDialog("edit")}
              >
                編集
              </button>
            </div>
            {dialogProps && (
              <Dialog
                title={dialogProps.title}
                input={dialogProps.input}
                onClose={dialogProps.onClose}
              />
            )}
            {dialogProps && (
              <Dialog
                title={dialogProps.title}
                input={dialogProps.input}
                onClose={dialogProps.onClose}
              />
            )}
          </div>

          <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-bold text-gray-700">
                  カテゴリ名
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                    {category}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <Link
                to={item.path}
                className="block px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-500 transition duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))} */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
