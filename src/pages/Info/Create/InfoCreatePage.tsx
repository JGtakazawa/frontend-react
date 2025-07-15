import React from "react";
import Sidebar from "../../../components/elements/Sidebar/Sidebar";
import { Sidebar_ItemsType } from "../../../components/elements/Sidebar/Sidebar";
import InfoForm from "../components/InfoForm";

const InfoCreatePage: React.FC = () => {

    // サイドバーに表示する項目
    const sideBarItems: Sidebar_ItemsType = [
        { label: 'インフォメーション一覧', path: '/info' },
    ];

    return (
        <div className="flex min-h-screen">
            {/* サイドバー */}
            <Sidebar items={sideBarItems} />

            {/* コンテンツ */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">インフォメーション登録</h1>
                <InfoForm isEdit={false} />
            </div>
        </div>
    );
}

export default InfoCreatePage;
