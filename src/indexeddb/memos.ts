import Dexie from "dexie"; // ライブラリを名前付きインポート

export interface MemoRecord {
  // オブジェクトの型定義と名前付きエクスポート
  datetime: string;
  title: string;
  text: string;
}

const database = new Dexie("markdown-editor"); // データベースの名前を指定してインスタンス化
database.version(1).stores({ memos: "&datetime" }); // 使用するテーブルとインデックスとなるデータ名を指定
const memos: Dexie.Table<MemoRecord, string> = database.table("memos"); // memosという名前のテーブルクラスを定義

// テーブルの保存処理
export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString();
  await memos.put({ datetime, title, text }); // タイトルとテキスト引数に受け取って、テーブルにオブジェクトを追加する
}; // Table.putは、オブジェクトストア内の新しいオブジェクトを追加するか、既存のオブジェクトを置き換えます。
// https://dexie.org/docs 公式みたらよき
