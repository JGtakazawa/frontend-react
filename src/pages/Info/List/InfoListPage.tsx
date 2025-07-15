import { InfoListResDataType } from "../../../../../share/types/info/info.res.data";
import InfoListTable from "./components/InfoListTable";
import { Sidebar_ItemsType } from "../../../components/elements/Sidebar/Sidebar";
import Sidebar from "../../../components/elements/Sidebar/Sidebar";
import useFetchData from "../../../hooks/useFetchData";
import Spinner from "../../../components/elements/Spinner/Spinner";
import NoDataMessage from "../../../components/elements/NoDataMessage/NoDataMessage";

const InfoListPage: React.FC = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    // データを取得
    const { data, error, isLoading } = useFetchData<InfoListResDataType>({
        url: `${API_URL}/api/info/`
    });

    // 読み込み中
    if (isLoading) {
        return <Spinner />;
    }

    // エラーの場合
    if (error) {
        return (
            <p className="text-red-600 font-semibold">Server Error: {error}</p>
        );
    }

    // サイドバーに渡す項目を定義
    const sideBarItems: Sidebar_ItemsType = [
        { label: 'インフォメーション登録', path: '/info/create' }
    ];

    console.log(data);
    return (
        <div className="flex min-h-screen">
            {/* サイドバー */}
            <Sidebar items={sideBarItems} />
            {/* メインコンテンツ */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">インフォメーション一覧</h1>
                {data === null ? (
                    <NoDataMessage message="インフォメーションが登録されていません" />
                ) : (
                    <InfoListTable infos={data.infos} />
                )}
            </div>
        </div>
    );
};

export default InfoListPage;
