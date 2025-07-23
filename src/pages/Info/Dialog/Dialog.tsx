import React from "react";
import { DialogType } from "./DialogType";
import { DialogInputType } from "./DialogType";

// 今後はDialogInputTypeの型ごとにテキストフィールドのプレースホルダーの表示内用を変更する（そのそものテキストフィールドの型も変化させるようにしたい）
const Dialog: React.FC<DialogType> = ({ title, input, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="flex flex-row items-center">
          <p className="mb-0 mr-2">{input.label}</p>
          {input.required === "required" && (
            <span className="text-white bg-red-600 px-4 ">必須</span>
          )}
        </div>
        <input
          type={input.type}
          value={input.value}
          onChange={(e) => input.onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
          required={input.required === "required"}
          placeholder={input.placeholder}
        />
        {/* 条件付きレンダリングをここで行う（ダイアログのボタンパターンをすべて網羅する） */}
        {input.buttonPattern === "create" && (
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-white text-blue-600 px-4 py-2 rounded  hover:bg-blue-300 border border-blue-600 font-bold transition duration-300"
            >
              キャンセル
            </button>
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              作成
            </button>
          </div>
        )}
        {input.buttonPattern === "edit" && (
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-300 border border-blue-600 font-bold transition duration-300"
            >
              キャンセル
            </button>
            <button
              onClick={onClose}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
            >
              削除
            </button>
            <button
              onClick={onClose}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
            >
              更新
            </button>
          </div>
        )}
        {input.buttonPattern === "delete" && (
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-300 border border-blue-600 font-bold transition duration-300"
            >
              キャンセル
            </button>
            <button
              onClick={onClose}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
            >
              削除
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialog;
