## Reactの特徴
公式: https://ja.reactjs.org/

## 手続き型のView(Reactではない)
宣言的なViewが出てくる以前からあった手続き型がViewが主でした。
代表例としてはDOM (Document Object Model) を直接いじるタイプの動的なページを指します。
（バニラJSやJqueryなど）

###### DOMとは
HTMLの文書構造（ツリー）を表現するプログラミングインターフェースを指し、プログラミング言語から参照・操作できます。
JavaScriptから画面の参照・操作ができるようにするためのものです。
MDN参照: https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model/Introduction

DOMを使った直接操作する手続き型のViewの例
<img src="https://i.gyazo.com/9284dbac092ceed522d6344724361cc2.png">
見た目（HTML）と操作（JavaScript）が分離していて、何をやったら何がどう変更されるかを想像しなければなりません。手続き型はあちこちから画面が参照・更新され、画面が複雑になるにつれて可読性が落ちます。

## Reactの特徴1.宣言的なview
```jsx
const View = () => {
  const getNow = () => (new Date()).toISOString()
  const [now, setNow] = useState(getNow())

  return (
    <div>
      <p>{now}</p>
      <button onClick={() => setNow(getNow())}>
        更新
      </button>
    </div>
  )
}
```
- nowという変数がpタグ内で展開される
- buttonタグではonClickで() => setNow(getNow()) という現在日時を更新する関数が実行される

HTML の中に JavaScript が書かれていて、見た目と動作が同じ場所に書かれています。
宣言的な View は「何が起きたら何をする」と記述するのではなく「この状態ならこのような画面を作る」と記述します。

宣言的な記述例は、手続き型でも更新の度にページ全体を読み込むようにすることでも実現可能です。
ただし、DOMを全て作り直すことになるので、パフォーマンスに影響が出ます。

## Reactの特徴2.コンポーネントベース
React は 「仮想DOM」というDOMの状態を擬似的に表現したデータを持っています。
画面の変更が発生するたびに「仮想DOM」を作って差分を検知し、その差分だけを実DOMに反映しています。
