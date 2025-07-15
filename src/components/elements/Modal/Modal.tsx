import React from "react";

type TModalProps = {
    message: string;  // モーダルで表示するメッセージ
    onConfirm: () => void;  // ユーザーが「はい」をクリックした時のアクション
    onClose: () => void;  // ユーザーが「いいえ」をクリックした時のアクション
    isPending: boolean;  // 送信中の処理
};

const Modal: React.FC<TModalProps> = ({ message, onConfirm, onClose, isPending }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                {/* ヘッダー */}
                <div className="text-xl font-semibold text-center border-b pb-4 mb-4">
                    確認
                </div>

                {/* コンテンツエリア */}
                <div className="mb-4 text-center">
                    <p>{`本当に${message}してもよろしいでしょうか？`}</p>
                </div>

                {/* フッダーにボタンのグループ */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className={`bg-blue-500 text-white py-2 px-4 rounded-md font-medium transition-all duration-200 
                            ${isPending ? 'cursor-not-allowed bg-blue-300' : 'hover:bg-blue-600'}`}
                        disabled={isPending}
                    >
                        {isPending ? `${message}中...` : "はい"}
                    </button>
                    <button
                        onClick={onClose}
                        className={`bg-gray-500 text-white py-2 px-4 rounded-md font-medium transition-all duration-200 
                            ${isPending ? 'cursor-not-allowed bg-gray-300' : 'hover:bg-gray-600'}`}
                        disabled={isPending}
                    >
                        いいえ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
