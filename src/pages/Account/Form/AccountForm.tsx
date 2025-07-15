import React, { FormEventHandler } from "react";

const AccountForm: React.FC = () => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">ログインID</label>
                    <input type="text" name="id" id="id" />
                </div>
                <div>
                    <label htmlFor="password">パスワード</label>
                    <input type="password" name="password" id="password" />
                </div>
            </form>
            <div>
                <button type="submit">作成</button>
                <button type="submit">更新</button>
                <button type="button">削除</button>
                <button type="reset">リセット</button>
            </div>
        </div>
    );
}

export default AccountForm;
