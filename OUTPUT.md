## React の特徴

公式: https://ja.reactjs.org/

## 手続き型の View(React ではない)

宣言的な View が出てくる以前からあった手続き型が View が主でした。
代表例としては DOM (Document Object Model) を直接いじるタイプの動的なページを指します。
（バニラ JS や Jquery など）

###### DOM とは

HTML の文書構造（ツリー）を表現するプログラミングインターフェースを指し、プログラミング言語から参照・操作できます。
JavaScript から画面の参照・操作ができるようにするためのものです。
MDN 参照: https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model/Introduction

DOM を使った直接操作する手続き型の View の例
<img src="https://i.gyazo.com/9284dbac092ceed522d6344724361cc2.png">
見た目（HTML）と操作（JavaScript）が分離していて、何をやったら何がどう変更されるかを想像しなければなりません。手続き型はあちこちから画面が参照・更新され、画面が複雑になるにつれて可読性が落ちます。

## React の特徴 1.宣言的な view

```jsx
const View = () => {
  const getNow = () => new Date().toISOString();
  const [now, setNow] = useState(getNow());

  return (
    <div>
      <p>{now}</p>
      <button onClick={() => setNow(getNow())}>更新</button>
    </div>
  );
};
```

- now という変数が p タグ内で展開される
- button タグでは onClick で() => setNow(getNow()) という現在日時を更新する関数が実行される

HTML の中に JavaScript が書かれていて、見た目と動作が同じ場所に書かれています。
宣言的な View は「何が起きたら何をする」と記述するのではなく「この状態ならこのような画面を作る」と記述します。

宣言的な記述例は、手続き型でも更新の度にページ全体を読み込むようにすることでも実現可能です。
ただし、DOM を全て作り直すことになるので、パフォーマンスに影響が出ます。

## React の特徴 2.コンポーネントベース

React は 「仮想 DOM」という DOM の状態を擬似的に表現したデータを持っています。
画面の変更が発生するたびに「仮想 DOM」を作って差分を検知し、その差分だけを実 DOM に反映しています。

コンポーネントとはビューと JavaScript をひとまとめにした部品で、それらを組み合わせることで UI を構築します。再利用も可能です。

```jsx
const KoyanoView = () => {
  return (
    <div>
      <p>子コンポーネントです。</p>
    </div>
  );
};
```

```jsx
const OyanoView = () => {
  return (
    <div>
      <h1>親コンポーネントです。</h1>
      <Koyano />
    </div>
  );
};
```

上記は Oyano で Koyano を呼び出しています。
Action：入力内容を元にデータを作成
Dispatcher：データを送る（EventEmitter）
Store：データを貯める
View：データを表示する

## React の特徴 3.状態管理

React は「状態」によって画面が決まります。
<src="https://user-images.githubusercontent.com/78721963/160485321-291927be-0039-4a57-9c13-4c292b3001fe.png">

１.状態に応じた画面が作られる
２.ボタンのクリックなどによってイベントが発生する(Action でデータを作成、Dispatcher でデータを送る)
３.イベントに応じて状態が更新される(Store で管理される)
４.更新されたデータをもとに画面が表示される

参考:https://qiita.com/syossan27/items/7e1b2e07ac68b96bdaa7

#### 状態管理の方法 1.Redux

- 全体で大きな１つの状態を持ち、その状態に応じて画面全体を描画する仕組み
- Action や Reducer といった概念が出てきたりするので、学習コストも高め
- 全体で１つの状態なので画面の要素が増えるにつれて状態も巨大になり、どこで使われている値なのかがわかりにくくなるといったデメリットもある

#### 状態管理の方法 1.React Hooks

- React v16.8 から組み込みで導入されるようになった比較的新しい状態管理の方法
- 一般論として、小〜中規模のプロジェクトであれば React Hooks が推奨されている

## React を使う場合の注意点

React は状態が更新されると再描画して仮想 DOM を作り、前回との差分が DOM に反映されるという流れで実行されていますが
以下の注意点に気をつける必要があるそうです。

- 状態を専用の関数以外で更新するのは NG
- React の管理しているビューを別の手段で変更するのは NG

## TypeScript

#### 特徴

- 型を宣言出来る JavaScript（JavaScript とは異なる静的型付け言語）
- プログラム実行時にコンパイルされて JavaScript に変換される

#### 動的型付け言語

- 変数などのデータ型の宣言がいらない[プログラミング言語](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0%B8%C0%B8%EC)
- 実際にデータが入るタイミング(変数への代入時など)で方が自動的に決まるものです。
- 値やオブジェクトの型安全性を、実行時に検証する

#### 静的型付け言語

- 変数などのデータ型の宣言が必要な[プログラミング言語](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0%B8%C0%B8%EC)
- 値やオブジェクトの型安全性を、[コンパイル](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB)時に検証する

##### React と相性が良い

- コンポーネントのデータの受け渡しの際に**型を宣言**しておくと、**どんなデータが受け渡しされるのかわかりやすい**

# ライブラリ周り

## ts-loader

webpack でビルドする際に TypeScript のビルドも同時に行うためのものです。

コンパイルとは・・・"ソースコードをコンピュータが認識できるオブジェクトコードに変換すること"です。
ビルドとは・・・"コンパイルしたファイルを一つにまとめ、実際に実行まですること"です。

## webpack.config.js

webpack.config.js は webpack の設定ファイルです。
mode や Loader など、webpack の様々な設定を行うことが可能です。

```typescript
module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        // .ts で終わるファイルに対して、ts-loader を実行する
        test: /\.tsx?$/, // x? =「x の有無は任意」という正規表現。つまり .ts .tsx のどちらも適用される
        use: "ts-loader",
        exclude: /node_modules/, // exclude（含まない）は除外するファイルを正規表現で指定
      },
    ],
  },
  resolve: {
    //外部ファイルやライブラリ（node_modules 以下のファイル）を使うファイルの拡張子なので .tsx と .js の両方を指定します。
    extensions: [".js", ".ts", ".tsx"], // resolve セクションは、モジュールとして解決するファイルの拡張子を指定します。
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "dist/",
  },
  devServer: {
    publicPath: "/dist/", // ビルドしたファイルにアクセスするためのパス
    hot: true, // ファイルを変更すると自動的にブラウザに反映させるフラグ
    open: true, // 起動時にブラウザで開くフラグ (Google Chrome以外の場合は不要)
  },
};
```

#### Entry

webpack がビルドを始める際の開始点となるエントリーポイントの設定です。
この設定のエントリーポイントがどのモジュールやライブラリに依存しているのかを判断し、処理して bundle と呼ばれるファイルに出力します。

#### output

bundle ファイルを webpack がどこにどのような名前で出力すればいいのかを指定できます。
dist ディレクトリに index.js という名前で出力する場合は以下のようにします。

````typescript
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    ```
````

#### Loaders

webpack 自身は JavaScript しか理解できませんが、Loader を使うことによって JavaScript 以外のものも処理できるようになります。
どのような種類のファイルであっても webpack が処理できるモジュールに Loader が変換してくれることで、webpack が bundle ファイルを作れるようになります。(モジュール化が webpack の根本的な仕組みです)

```typescript
  module: {
    rules: [
      {
        // .ts で終わるファイルに対して、ts-loader を実行する
        test: /\.tsx?$/, // x? =「x の有無は任意」という正規表現。つまり .ts .tsx のどちらも適用される
        use: "ts-loader",
        exclude: /node_modules/, // exclude（含まない）は除外するファイルを正規表現で指定
      },
    ],
  },
```

## useEffect

useEffect を利用することでコンポーネントの内容を表示する際に外部のサーバから API を経由してデータを取得することやコンポーネントが更新する度に別の処理を実行するということが可能になります。
useEffect は画面が描写された後に実行されるということが重要です。

useEffect はブラウザでコンポーネントが初めて表示される時に必ず一度実行されます。
第二引数に設定を書かない場合は state が更新される度に useEffect は実行されます。
第二引数には配列に state 変数を入れておき、状態の変化を検知して第一引数のコールバックを実行する使い方があります。

## Web Worker

メインスレッドは、ブラウザーがユーザーのイベントや描画を処理するスレッドです。
シングルスレッドとは、全ての処理を一箇所で順番に処理をする方式です。
JavaScript はメインスレッドでシングルスレッド方式で処理を行う言語です。
意識的に Service worker などの Web worker を使用しない限り、 JavaScript はメインスレッド上で実行されるので、イベント処理や描画の中で簡単にスクリプトが遅延を発生させます。

#### Web Worker のメリット

Web Worker は、メインスレッドとは別のスレッドで動作します。
つまり重たい処理を実行しても、UI とは切り離された環境なので影響が出ません。

#### Web Worker の注意点

- １、変数を共有できない
  - メインスレッドと Web Worker の間で、変数を共有することはできません。
  - メインスレッドと Web Worker との通信は、値をコピーしてやり取りされます。

※これによってマルチスレッド特有の問題などは起こりにくくなっています。

- ２、一部の API が使用できない
  - メインスレッドから使用できる API の一部は、Web Worker から実行できません。
    ※例えば DOM の操作を Web Worker から行うことはできません。
  - 結果を DOM に反映したい場合は、Web Worker から受け取った結果をもとにメインスレッドから操作する必要があります。

## Dedicated Worker

呼び出しごとに独立して動作する Worker です。
シンプルに呼び出したものからメッセージをやり取りできます。
以降 Web Worker を表記した場合は、原則として Dedicated Worker を指します。

#### Web Worker の使い方(Dedicated Worker)

1. メインスレッドから Web Worker を読み込む(Worker クラスのインスタンス化。読み込む URL を渡す)
2. メインスレッド内で Web Worker の結果を受け取るコールバック関数を Worker クラスの onmessage プロパティ にセットする
3. メインスレッドから Web Worker に postMessage でデータを送信する(コールバック関数内の処理)
4. Web Worker は onmessage の関数でメインスレッドの postMessage でデータを受け取って処理を行う
5. Web Worker は postMessage でメインスレッドに処理結果を返却する
6. メインスレッドは onmessage に登録した関数から処理結果を受け取る
7. 3〜6 を必要に応じて繰り返す
