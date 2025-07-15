import { useState } from "react";

// モーダルの種類に応じたアクションを実行するための関数型定義
type ModalActionType = () => void;

// モーダルの状態を管理する型
type ModalStateType = {
    isModalOpen: boolean;
    message: string;
    isPending: boolean;
    onConfirm: ModalActionType | null;
};

// モーダルを開くための引数の型
type OpenModalParamsType = {
    message: string;
    onConfirm: () => Promise<void>;
};

// useModal カスタムフック
export const useModal = () => {
    const [modalState, setModalState] = useState<ModalStateType>({
        isModalOpen: false,
        message: '',
        isPending: false,
        onConfirm: null
    });

    // モーダルを開くための関数
    const openModal = ({ message, onConfirm }: OpenModalParamsType) => {
        setModalState({
            isModalOpen: true,
            message: message,
            isPending: false,  // モーダルを開くときには、初期状態でisPendingはfalse
            onConfirm: onConfirm
        });
    };

    // モーダルを閉じるための関数
    const closeModal = () => {
        setModalState(prevState => ({
            ...prevState,
            isModalOpen: false,
            message: '',
            onConfirm: null
        }));
    };

    // 送信中状態を切り替える関数
    const togglePending = (state: boolean) => {
        setModalState(prevState => ({
            ...prevState,
            isPending: state
        }));
    };

    return { 
        isPending: modalState.isPending, 
        isModalOpen: modalState.isModalOpen, 
        message: modalState.message, 
        openModal, 
        closeModal, 
        onConfirm: modalState.onConfirm, 
        togglePending 
    };
};