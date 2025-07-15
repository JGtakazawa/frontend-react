import { z } from "zod";

// 共通のスキーマを定義

/**
 * タイトルのバリデーションスキーマ。
 * タイトルは必須で、1文字以上、255文字以内である必要があります。
 */
const TitleSchema = z.string().min(1, 'タイトルは必須です').max(255, 'タイトルは255文字以内で入力してください');

/**
 * コンテンツのバリデーションスキーマ。
 * 本文は必須で、1文字以上である必要があります。
 */
const ContentSchema = z.string().min(1, "本文は必須です");

/**
 * ファイルIDのバリデーションスキーマ。
 * 単一の文字列または文字列の配列を許可します。
 */
const FileIdSchema = z.union([
    z.string(),
    z.array(z.string()),
]);

/**
 * 情報作成用のバリデーションスキーマ。
 * @property title - 情報のタイトル。
 * @property content - 情報の内容。
 */
export const CreateInfoSchema = z.object({
    title: TitleSchema,
    content: ContentSchema,
});

/**
 * 情報更新用のバリデーションスキーマ。
 * @property title - 情報のタイトル。
 * @property content - 情報の内容。
 * @property fileIdList - オプションで、ファイルIDのリスト。
 */
export const UpdateInfoSchema = z.object({
    title: TitleSchema,
    content: ContentSchema,
    fileIdList: FileIdSchema.optional(),
});
