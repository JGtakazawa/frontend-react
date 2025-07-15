import { useState, useEffect } from "react";
import { SuccessResponseType } from "../../../share/types/response/success.response";
import { useCookies } from "react-cookie";

type UseFetchDataParamsType = {
    url: string;
};

type UseFetchDataReturnType<T> = {
    data: T | null;
    isLoading: boolean;
    error: string | null;
};

const useFetchData = <T, >({ url }: UseFetchDataParamsType): UseFetchDataReturnType<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsloading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cookies] = useCookies(['accessToken', 'refreshToken']);
    

    useEffect(() => {
        const fetchData = async () => {
            setIsloading(true);
            setError(null);

            try {
                console.log(url);
                console.log(cookies.accessToken);
                const res = await fetch(url, {
                    method: 'GET', // 必要に応じてPOSTなどに変更
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookies.accessToken}`, // Bearerトークンをヘッダーに追加
                    },
                });

                if (res.status === 200) {
                    const result: SuccessResponseType<T> = await res.json();
                    setData(result.data ?? null);
                } else if (res.status !== 404) {
                    throw new Error(`Failed to fetch data: ${res.status}`);
                } 
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsloading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, isLoading, error }
};

export default useFetchData;