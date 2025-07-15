import { InfoDetailListPropsType } from "../../../../../../share/types/info/info.props";

const InfoDetailList: React.FC<InfoDetailListPropsType> = ({ info, files, urls }) => {
    const API_URL = import.meta.env.VITE_API_URL;

    return (
        <div className="border bg-gray-50 p-4 rounded-lg shadow-md">
            {/* タイトル表示 */}
            <div className="mb-4">
                <h6 className="text-lg font-semibold text-gray-700">タイトル</h6>
                <p className="border p-3 rounded-md bg-white text-gray-800">{info.title}</p>
            </div>

            {/* 本文表示 */}
            <div className="mb-4">
                <h6 className="text-lg font-semibold text-gray-700">本文</h6>
                <p className="border p-3 rounded-md bg-white text-gray-800">{info.content}</p>
            </div>
            
            {/* 関連ファイル表示 */}
            <div className="mb-4">
                <h6 className="text-lg font-semibold text-gray-700">関連ファイル</h6>
                {files && files.length === 0 ? (
                    <div className="bg-blue-50 text-blue-600 p-3 rounded-md">
                        関連ファイルはありません。
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {files.map((file, index) => (
                            <li key={index} className="border p-3 rounded-md bg-white">
                                <a
                                    href={`${API_URL}/api/download/${file.name}/${file.originalName}`}
                                    target="blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="text-blue-500 hover:underline"
                                >
                                    {file.originalName}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
            {/* 関連URL表示 */}
            <div>
                <h6 className="text-lg font-semibold text-gray-700">関連URL</h6>
                {urls && urls.length === 0 ? (
                    <div className="bg-blue-50 text-blue-600 p-3 rounded-md">
                        関連URLはありません。
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {urls.map((url, index) => (
                            <li key={index} className="border p-3 rounded-md bg-white">
                                <a
                                    href={url.url}
                                    target="blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {url.url}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default InfoDetailList;
