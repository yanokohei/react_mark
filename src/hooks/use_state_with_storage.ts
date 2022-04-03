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
// ここではlocalStorageへの保存をセットにしたカスタムフックを作成しています。

// カスタムフックは初期値とkeyをstringで受け取ってstorageの値とstorageの更新を行うsetValueWithStorageを返します。
