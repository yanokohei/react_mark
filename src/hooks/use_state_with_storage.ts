import { useState } from 'react' // ReactからuseStateを取り出す (オブジェクトの分割代入は任意のプロパティを変数に代入する)

// カスタムフックの関数を定義(export) // カスタムフックはuseから始める慣例がある
export const useStateWithStorage = (init: string, key: string): [string, (s: string) => void] => {
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init)

  const setValueWithStorage = (nextValue: string): void => {
    setValue(nextValue)
    localStorage.setItem(key, nextValue)
  }

  return [value, setValueWithStorage]
}

// localStorage に保存するような処理ができた場合、同じような処理を何度も書くことになります。
// こういった場合はカスタムフック（独自フック）を作ると、見通しよく再利用可能になります。

// カスタムフックは初期値とkeyをstringで受け取ってstorageの値とstorageの更新を行うsetValueWithStorageを返します。

// マークダウンのテキストエリアをリロードしても文字がクリアされないようにストレージに文字を保存しておく機能の実装

// editor.tsxの関数コンポーネント内で使うカスタムフック
// useStateWithStorage('', StorageKey)で実行して、setTextを更新する。
// 第二引数のStringKeyは'pages/editor:text'という名前で予め定義されている。
// 初期値とストレージのキーが渡ることでuseStateWithStorageが発火。
// useStateで状態の定義。テキストエリア内の文字はStorageKeyがあることでストレージ内の値を現在値として扱っている
// 関数内にあるsetValueWithStorage関数は入力されるテキストをストレージに直接保存して状態を更新する関数
// 文字が入力される度にstateが更新されてカスタムフックが実行される。
// setValueWithStorageの引数には入力した文字が引数nextValueとして入るが、setValueWithStorage呼び出し時に引数が明示されていない点は謎
// setValueは入力された文字を引数にuseStateの値(状態)を更新する
// localStorage.setItem(key, nextValue)は第一引数に最初に設定して渡したキー、第二引数にuseStateの更新後の値をセットする
// この一連の流れによってリロードしてもブラウザ上の文字とストレージの文字が共有されているため、テキストが保持される
