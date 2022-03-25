const path = require('path')

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {// .ts で終わるファイルに対して、ts-loader を実行する
        test: /\.tsx?$/, // x? =「x の有無は任意」という正規表現。つまり .ts .tsx のどちらも適用される
        use: 'ts-loader',
        exclude: /node_modules/, // exclude（含まない）は除外するファイルを正規表現で指定
      },
    ],
  },
  resolve: { //外部ファイルやライブラリ（node_modules 以下のファイル）を使うファイルの拡張子なので .tsx と .js の両方を指定します。
    extensions: ['.js', '.ts', '.tsx'], // resolve セクションは、モジュールとして解決するファイルの拡張子を指定します。
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: 'dist/',
  },
  devServer: {
    publicPath: '/dist/', // ビルドしたファイルにアクセスするためのパス
    hot: true, // ファイルを変更すると自動的にブラウザに反映させるフラグ
    open: true, // 起動時にブラウザで開くフラグ (Google Chrome以外の場合は不要)
  }
}

// entry セクションは、最初に読み込むファイルを指定します。
// ここで指定されたファイルから別のファイルを読み込む処理が書かれていると
// webpack はそれらのファイルも自動的に読み込んで、最終的に1つのファイルとして出力してくれます。

// output セクションは、出力するファイルの設定をします。
// 以下の設定は、webpack.config.js の置いてあるディレクトリにある dist というディレクトリに対して、
// ファイル名 index.js で出力します。
// また、変換する際は JavaScript 内に書かれている相対パスのリソースへ自動的に dist / を追加してくれます。
// （publicPath はちょっとややこしいので、ここは一旦そういうものなのだ、というぐらいの認識で大丈夫です）

// React は JSX という独自の構文を使いビューを定義します。※tsx というファイル拡張子を使います。
