import Dexie from 'dexie' // ライブラリを名前付きインポート

export interface MemoRecord { // オブジェクトの型定義と名前付きエクスポート
  datetime: string
  title: string
  text: string
}

const database = new Dexie('markdown-editor') // データベースの名前を指定してインスタンス化
database.version(1).stores({ memos: '&datetime' }) // 使用するテーブルとインデックスとなるデータ名を指定
const memos: Dexie.Table<MemoRecord, string> = database.table('memos') // memosという名前のテーブルクラスを定義
