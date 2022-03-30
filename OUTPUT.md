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

コンポーネントとはビューとJavaScriptをひとまとめにした部品で、それらを組み合わせることでUIを構築します。再利用も可能です。

```jsx
 const KoyanoView = () => {
   return (
     <div>
       <p>子コンポーネントです。</p>
     </div>
   )
 }
```
```jsx
 const OyanoView = () => {
   return (
     <div>
       <h1>親コンポーネントです。</h1>
       <Koyano />
     </div>
   )
 }
```
上記はOyanoでKoyanoを呼び出しています。
Action：入力内容を元にデータを作成
Dispatcher：データを送る（EventEmitter）
Store：データを貯める
View：データを表示する

## Reactの特徴3.状態管理
React は「状態」によって画面が決まります。
<src="https://user-images.githubusercontent.com/78721963/160485321-291927be-0039-4a57-9c13-4c292b3001fe.png">

１.状態に応じた画面が作られる
２.ボタンのクリックなどによってイベントが発生する(Actionでデータを作成、Dispatcherでデータを送る)
３.イベントに応じて状態が更新される(Storeで管理される)
４.更新されたデータをもとに画面が表示される

参考:https://qiita.com/syossan27/items/7e1b2e07ac68b96bdaa7

#### 状態管理の方法1.Redux
- 全体で大きな１つの状態を持ち、その状態に応じて画面全体を描画する仕組み
- Action や Reducer といった概念が出てきたりするので、学習コストも高め
- 全体で１つの状態なので画面の要素が増えるにつれて状態も巨大になり、どこで使われている値なのかがわかりにくくなるといったデメリットもある

#### 状態管理の方法1.React Hooks
- React v16.8 から組み込みで導入されるようになった比較的新しい状態管理の方法
- 一般論として、小〜中規模のプロジェクトであれば React Hooks が推奨されている

## React を使う場合の注意点
React は状態が更新されると再描画して仮想DOMを作り、前回との差分がDOMに反映されるという流れで実行されていますが
以下の注意点に気をつける必要があるそうです。
- 状態を専用の関数以外で更新するのはNG
- Reactの管理しているビューを別の手段で変更するのはNG
