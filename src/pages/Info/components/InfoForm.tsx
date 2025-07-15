import React, { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoFormPropsType } from "../../../../../share/types/info/info.props";
import Modal from "../../../components/elements/Modal/Modal";
import { useModal } from "../../../hooks/useModal";
import ErrorMessages from "../../../components/elements/ErrorMessages/ErrorMessages";
import { ErrorResponseType } from "../../../../../share/types/response/error.response";
import { useCookies } from "react-cookie";

type FieldErrorsType = {
    title?: string;
    content?: string;
};

// メインのフォームコンポーネント
const InfoForm: React.FC<InfoFormPropsType> = ({
    isEdit,
    info,
    files,
    urls
}) => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const [serverErrors, setServerErrors] = useState<string[]>([]);
    const [fieldErrors, setFieldErrors] = useState<FieldErrorsType>({});
    const [urlsToUpdate, setUrlsToUpdate] = useState(urls);
    const [urlIdsToDelete, setUrlIdsToDelete] = useState<number[]>([]);
    const [cookies] = useCookies(['accessToken']);

    // モーダルの状態管理
    const {
        isPending,
        isModalOpen,
        message,
        openModal,
        closeModal,
        onConfirm,
        togglePending
    } = useModal();

    // キーの名前を変更する関数
    const renameKeyInFormData = (
        formData: FormData,
        oldKey: string,
        newKey: string
    ) => {
        if (formData.has(oldKey)) {
            const value = formData.get(oldKey);
            if (value !== null) {
                formData.append(newKey, value);
                formData.delete(oldKey);
            }
        }
    };
    
    // フォームデータを送信する処理
    const handleSubmit = async (formData: FormData) => {        
        // フォームデータを取得
        // title. edit: titleToUpdate
        // content. content: contentToUpdate
        // fileIdsToDelete
        // files
        // urlIdsToUpdate
        // urlsToUpdate
        // urlIdsToDelete
        // urls
        
        // title
        if (isEdit) {
            renameKeyInFormData(
                formData,
                'title',
                'titleToUpdate'
            )
        }
        // content
        if (isEdit) {
            renameKeyInFormData(
                formData,
                'content',
                'contentToUpdate'
            )
        }
        // fileIdsToDeleteは何もしない
        // files
        const files = formData.getAll('files') as File[];
        formData.delete('files');
        files.forEach((file) => {
            if (file.size > 0) {
                formData.append('files', file, encodeURIComponent(file.name));
            }
        });
        // urlIdsToUpdate
        urlsToUpdate?.forEach((urlToUpdate) => {
            formData.append('urlIdsToUpdate', urlToUpdate.id.toString());
        })
        // urlsToUpdateは何もしない
        // urlIdsToDelete
        urlIdsToDelete.forEach((id) => {
            formData.append('urlIdsToDelete', id.toString());
        })
        // url
        const urls = formData.get('urls') as string;
        formData.delete('urls');
        const newUrls = (urls as string)
            .split('\n') // 改行で区切る
            .map((url) => url.trim()) // 各URLをトリム
            .filter((url) => url.length > 0); // 空行を除外
        newUrls.forEach((newUrl) => {
            formData.append('urls', newUrl);
        });

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        togglePending(true);

        // 送信先を設定
        const url = isEdit ? `${API_URL}/api/info/${info?.id}` : `${API_URL}/api/info/`;
        const method = isEdit ? 'PUT' : 'POST';

        // データ送信
        try {
            const res = await fetch(url, {
                method,
                body: formData,
                headers: {
                    'Authorization': `Bearer ${cookies.accessToken}`, // Bearerトークンをヘッダーに追加
                },

            });
            
            if (res.ok) {
                navigate('/info');
            } else {
                const result: ErrorResponseType = await res.json();                
                if (res.status === 400) {
                    setServerErrors(result.errors || []);
                } else {
                    throw new Error(result.message || "サーバーエラーが発生しました");
                }
            }
        } catch (error) {
             // エラーが発生した場合、エラーメッセージを状態にセット
            setServerErrors([error instanceof Error ? error.message : "予期しないエラーが発生しました"]);
        } finally {
            // エラーが発生しても成功してもモーダルを閉じる
            closeModal();
            togglePending(false);
        }
    };

    // 削除処理本体
    const handleDelete = async () => {
        try {
            togglePending(true);

            const res = await fetch(`${API_URL}/api/info/${info?.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${cookies.accessToken}`, // Bearerトークンをヘッダーに追加
                },

            });
            if (res.ok) {
                navigate('/info');
            } else {
                const result: ErrorResponseType = await res.json();
                setServerErrors([result.message || '予期しないエラーが発生しました。']);  // サーバーエラーメッセージを表示
            }
        } catch (error) {
            setServerErrors([error instanceof Error ? error.message : "予期しないエラーが発生しました"]);
        } finally {
            togglePending(false);
            closeModal();
        }
    };

    // フォームのバリデーション
    const validateForm = (formData: FormData): boolean => {
        return true;
        const errors: FieldErrorsType = {};

        if (!formData.get('title')?.toString().trim()) {
            errors.title = "タイトルは必須です。";
        }
        if (!formData.get('content')?.toString().trim()) {
            errors.content = "コンテンツは必須です。";
        }

        setFieldErrors(errors);

        return Object.keys(errors).length === 0;
    };

    // フォームの送信イベント
    const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (validateForm(formData)) {
            console.log("フォーム送信処理");
            openModal({
                message: isEdit ? "更新" : "登録",
                onConfirm: () => handleSubmit(formData)
            });
        }
    };

    // 削除ボタンクリックイベント
    const onDelete = () => openModal({
        message: "削除",
        onConfirm: handleDelete
    });

    // リセットボタンのイベント
    const onReset = () => {
        setUrlsToUpdate(urls);
        setUrlIdsToDelete([]);
        setFieldErrors({});
    };

    // onBlurイベント
    const handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        return;
        const { name, value } = event.target;
        let errorMes = "";

        // タイトルのバリデーション
        if (name === 'title') {
            const trimmedTitle = value.trim();
            if (trimmedTitle === "") {
                errorMes = "タイトルは必須です。";
            } else if (trimmedTitle.length > 255) {
                errorMes = "タイトルは255文字以内です"
            }
        }

        // 内容のバリデーション
        if (name === 'content') {
            const trimmedContent = value.trim();
            if (trimmedContent === "") {
                errorMes = "内容は必須です。";
            }
        }

        // エラーのセット
        setFieldErrors((prevFiledErrors) => ({
            ...prevFiledErrors,
            [name]: errorMes
        }));
    };

    // URL編集フィールドの削除イベント
    const onDeleteUrlField = (urlIdToDelete: number) => {
        setUrlIdsToDelete([...urlIdsToDelete, urlIdToDelete]);
        const newUrlsToUpdate = urlsToUpdate?.filter((url) => url.id !== urlIdToDelete);
        setUrlsToUpdate(newUrlsToUpdate);
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            {serverErrors && <ErrorMessages errors={serverErrors} />}
            {isModalOpen && (
                <Modal
                    message={message}
                    onConfirm={() => onConfirm && onConfirm()}
                    onClose={closeModal}
                    isPending={isPending}
                />
            )}
    
            <form onSubmit={onSubmit} className="space-y-6" noValidate>
                {/* タイトル */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        タイトル（必須）
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        defaultValue={info?.title}
                        className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            fieldErrors.title ? "border-red-500" : ""
                        }`}
                        placeholder="タイトルを入力してください"
                        onBlur={handleBlur}
                    />
                    {fieldErrors.title && <p className="mt-2 text-sm text-red-600">{fieldErrors.title}</p>}
                </div>
    
                {/* 内容 */}
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        内容（必須）
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        defaultValue={info?.content}
                        rows={4}  // 行数の設定（適宜調整）
                        className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            fieldErrors.content ? "border-red-500" : ""
                        }`}
                        placeholder="内容をここに入力してください..."
                        onBlur={handleBlur}
                    />
                    {fieldErrors.content && <p className="mt-2 text-sm text-red-600">{fieldErrors.content}</p>}
                </div>

                {/* 複数のURL編集 */}
                {urlsToUpdate && urlsToUpdate.length > 0 && (
                    <div>
                        <label className="text-sm font-medium text-gray-700">URLの更新</label>
                        {urlsToUpdate.map((url) => (
                            <div key={url.id} className="flex gap-2 shadow-sm mt-2">
                                <input
                                    type="url"
                                    name="urlsToUpdate"
                                    defaultValue={url.url}
                                    className="mt-1 flex-1 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    className="px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                                    onClick={() => onDeleteUrlField(url.id)}
                                >
                                    削除
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* URL登録 */}
                <div>
                    <label htmlFor="urls" className="block text-sm font-medium text-gray-700">
                        URLの追加
                    </label>
                    <textarea
                        name="urls"
                        id="urls"
                        placeholder="1行につき1つのURLを入力してください"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        rows={4} // 行数の調整
                    ></textarea>
                </div>
                
                {/* ファイル削除 */}
                {files && files.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ファイルの削除</label>
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="fileIdsToDelete"
                                    id={`file-${file.id}`}
                                    value={file.id}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor={`file-${file.id}`} className="text-sm text-gray-600">
                                    {file.originalName}
                                </label>
                            </div>
                        ))}
                    </div>
                )}

                {/* ファイルアップロード */}
                <div>
                    <label 
                        htmlFor="files"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        ファイルの追加
                    </label>
                    <input
                        type="file"
                        name="files"
                        id="files"
                        multiple
                        accept=".doc, .docx, .pdf, .xls, .xlsx, .txt"
                        className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                    />
                </div>
        
        
                {/* ボタン群 */}
                <div className="flex space-x-4">
                    {isEdit ? (
                        <>
                            <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600">
                                変更
                            </button>
                            <button type="button" onClick={onDelete} className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600">
                                削除
                            </button>
                        </>
                    ) : (
                        <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600">
                            登録
                        </button>
                    )}
                    <button type="reset" onClick={onReset} className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600">
                        リセット
                    </button>
                </div>

            </form>
        </div>
    );
};

export default InfoForm;