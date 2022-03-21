const path = require('path')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {// .ts で終わるファイルに対して、ts-loader を実行する
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/, // exclude（含まない）は除外するファイルを正規表現で指定
      },
    ],
  },
  resolve: {
    extensions: ['.ts'], // resolve セクションは、モジュールとして解決するファイルの拡張子を指定します。
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: 'dist/',
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
