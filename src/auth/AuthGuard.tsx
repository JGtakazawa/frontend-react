import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// AuthGuardコンポーネント
const AuthGuard: React.FC = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;

    useEffect(() => {
        // accessTokenをリフレッシュする関数
        const fetchRefreshToken = async () => {
            if (refreshToken) {
                try {
                    const response = await fetch(`${API_URL}/api/auth/refresh/`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token: refreshToken })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setCookie('accessToken', data.accessToken, { path: '/' });
                    } else {
                        console.error('Failed to refresh access token');
                    }
                } catch (error) {
                    console.error('Failed to refresh access token:', error);
                }
            }
        };

        // accessTokenがない場合にリフレッシュする
        if (!accessToken && refreshToken) {
            fetchRefreshToken();
        }
    }, [accessToken, refreshToken, setCookie]);

    // accessTokenがない場合はログインページにリダイレクト
    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    // 認証が成功した場合は子コンポーネントを表示
    return <Outlet />;
};

export default AuthGuard;
