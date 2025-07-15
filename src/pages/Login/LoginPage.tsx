import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

const LoginPage: React.FC = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);
    const navigate = useNavigate();

    console.log(API_URL);

    useEffect(() => {
        // すでにログインしている場合はホームページにリダイレクト
        if (cookies.accessToken) {
            navigate('/');
        }
    }, [cookies.accessToken, navigate]);

    const handleSubmit: React.FormEventHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const formValues = Object.fromEntries(formData);
        console.log(formValues);

        try {
            const url = `${API_URL}/api/auth/login/`;
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("ログインに失敗しました");
            }

            const data = await response.json();
            console.log(data);
            setCookie('accessToken', data.access_token, {
                path: '/',
                sameSite: import.meta.env.VITE_NODE_ENV === 'production' ? 'none' : 'lax',
                secure: import.meta.env.VITE_NODE_ENV === 'production'
            });
            setCookie('refreshToken', data.refresh_token, {
                path: '/',
                sameSite: import.meta.env.VITE_NODE_ENV === 'production' ? 'none' : 'lax',
                secure: import.meta.env.VITE_NODE_ENV === 'production'
            });
            navigate("/");
        } catch (error) {
            console.error("ログインエラー:", error);
            // エラーメッセージをユーザーに表示する処理をここに追加
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <div className="mb-4">
                    <label htmlFor="id" className="block text-gray-700 font-bold mb-2">ユーザーID</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        name="id"
                        id="id"
                        placeholder="ユーザーID"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">パスワード</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        name="password"
                        id="password"
                        placeholder="パスワード"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">ログイン</button>
                <div className="text-center mt-4">
                    <a href="/forgot-password" className="text-blue-500 hover:text-blue-700">パスワードを忘れたかたはこちらへ</a>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
