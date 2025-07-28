import { useState, useCallback } from "react";
import { InfoType } from "../../../../../../../backend-express/src/types/info";

type UseInfoListResult = {
  infos: InfoType[];
  selectedInfoIds: number[];
  handleCheckboxChange: (infoId: number, isChecked: boolean) => void;
  handleSelectAllChange: (isChecked: boolean) => void;
  handleDelete: () => void;
  isDeleteButtonEnabled: boolean;
  setInfos: React.Dispatch<React.SetStateAction<InfoType[]>>; // 外部からinfosを更新する必要がある場合
};

const useInfoList = (initialInfos: InfoType[]): UseInfoListResult => {
  const [infos, setInfos] = useState<InfoType[]>(initialInfos);
  const [selectedInfoIds, setSelectedInfoIds] = useState<number[]>([]);

  const handleCheckboxChange = useCallback(
    (infoId: number, isChecked: boolean) => {
      setSelectedInfoIds((prevSelectedIds) =>
        isChecked
          ? [...prevSelectedIds, infoId]
          : prevSelectedIds.filter((id) => id !== infoId)
      );
    },
    []
  );

  const handleSelectAllChange = useCallback(
    (isChecked: boolean) => {
      if (isChecked) {
        setSelectedInfoIds(infos.map((info) => info.id));
      } else {
        setSelectedInfoIds([]);
      }
    },
    [infos]
  );

  const handleDelete = useCallback(() => {
    if (selectedInfoIds.length === 0) {
      alert("削除する項目を選択してください。");
      return;
    }

    const confirmed = window.confirm(
      `${selectedInfoIds.length}件の項目を削除しますか？`
    );

    if (confirmed) {
      setInfos((prevInfos) =>
        prevInfos.filter((info) => !selectedInfoIds.includes(info.id))
      );
      setSelectedInfoIds([]);
      alert("選択された項目が削除されました。");
    }
  }, [selectedInfoIds]);

  const isDeleteButtonEnabled = selectedInfoIds.length > 0;

  return {
    infos,
    selectedInfoIds,
    handleCheckboxChange,
    handleSelectAllChange,
    handleDelete,
    isDeleteButtonEnabled,
    setInfos,
  };
};

export default useInfoList;
