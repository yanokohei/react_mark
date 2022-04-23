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

const NUM_PER_PAGE: number = 10;
// 総ページ数(Promiseの数値)を返す関数
export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count();
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE); // レコード数をページ数10で割ってceilで小数点を切り上げます。
  return pageCount > 0 ? pageCount : 1;
};

// 保存したテキストの履歴リストを取得するメソッド
export const getMemos = (): Promise<MemoRecord[]> => {
  return memos.orderBy("datetime").reverse().toArray();
};
// MemoRecord(日時、タイトルとテキスト)の配列を返すメソッドです。
// Table.orderBy(主キーorインデックス)でdatetime（保存した日時）の昇順（古い順）で取得しコレクションを返します。
// reverse()で並び順を逆にし、新しい順に並べ替えた上で、toArrayで配列に変換して返します。
