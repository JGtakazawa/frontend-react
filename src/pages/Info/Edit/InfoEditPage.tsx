import { useParams } from "react-router-dom";
import { InfoEditResDataType } from "../../../../../share/types/info/info.res.data";
import InfoForm from "../components/InfoForm";
import { Sidebar_ItemsType } from "../../../components/elements/Sidebar/Sidebar";
import Sidebar from "../../../components/elements/Sidebar/Sidebar";
import useFetchData from "../../../hooks/useFetchData";
import Spinner from "../../../components/elements/Spinner/Spinner";
import NoDataMessage from "../../../components/elements/NoDataMessage/NoDataMessage";

const InfoEditPage: React.FC = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { id } = useParams<{ id: string }>();

    // IDが存在するかチェック
    if (!id) {
        return (
            <div className="text-red-600 font-bold">Error: No ID found in the URL!</div>
        );
    }

    // データを取得
    const { data, error, isLoading } = useFetchData<InfoEditResDataType>({
        url: `${API_URL}/api/info/${id}/edit`
    });

    // 読み込み中
    if (isLoading) {
        return (
            <Spinner />
        );
    }

    // エラーの場合
    if (error) {
        return (
            <p className="text-red-600 font-semibold">Server Error: {error}</p>
        );
    }

    // サイドバーに渡す項目を定義
    const sideBarItems: Sidebar_ItemsType = [
        { label: 'インフォメーション登録', path: '/info/create' },
        { label: 'インフォメーション一覧', path: '/info' },
        { label: 'インフォメーション詳細', path: `/info/${id}/detail` }
    ];

    return (
        <div className="flex min-h-screen">
            {/* サイドバー */}
            <Sidebar items={sideBarItems} />

            {/* コンテンツ */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">インフォメーション編集</h1>
                {data === null ? (
                    <NoDataMessage message="インフォメーション編集情報が見つかりませんでした" />
                ) : (
                    <InfoForm isEdit={true} info={data?.info} files={data?.infoFiles} urls={data.infoUrls} />
                )}
            </div>
        </div>
    );
}

export default InfoEditPage;
