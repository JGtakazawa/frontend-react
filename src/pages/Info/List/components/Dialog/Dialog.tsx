import React from "react";
import { DialogType } from "./DialogType";

// 今後はDialogInputTypeの型ごとにテキストフィールドのプレースホルダーの表示内用を変更する（そのそものテキストフィールドの型も変化させるようにしたい）
const Dialog: React.FC<DialogType> = ({
  inputValue,
  dialogProps,
  onClose,
  isOpen,
  openDialog,
  nextDialogProps,
}) => {
  if (dialogProps === null) return;
  if (isOpen === false) return;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">{dialogProps.title}</h2>
        <div className="flex flex-row items-center">
          {/* 条件付きレンダリング */}
          {dialogProps.label && (
            <p className="mb-0 mr-2">{dialogProps.label}</p>
          )}
          {dialogProps.required === "required" && (
            <span className="text-white bg-red-600 px-4 ">必須</span>
          )}
          {dialogProps.required === "option" && (
            <span className="text-white bg-red-600 px-4 ">任意</span>
          )}
        </div>
        {dialogProps.type === "flat" ? (
          <p className="text-red-600 mb-7">{dialogProps.content}</p> // 段落として表示
        ) : (
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
            type={dialogProps.type}
            value={inputValue}
            onChange={(e) => dialogProps.onChange(e.target.value)}
            placeholder={dialogProps.placeholder}
          />
        )}
        {/* ダイアログのパターン毎に条件付きレンダリングをここで行う↓ */}
        {dialogProps.buttonPattern === "create" && (
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
        {dialogProps.buttonPattern === "edit" && (
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
        {dialogProps.buttonPattern === "confirm" && nextDialogProps && (
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-300 border border-blue-600 font-bold transition duration-300"
            >
              いいえ
            </button>
            <button
              onClick={() => openDialog(nextDialogProps)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              はい
            </button>
          </div>
        )}
        {dialogProps.buttonPattern === "result" && (
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialog;
