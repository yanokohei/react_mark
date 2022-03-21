const log = (message: string): void => {
  console.log(message)
}

log('Hello, Webpack + TypeScript!')

// 仮に引数の型をnumberにして渡すと以下のエラーが発生する
// TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

// TypeScript はビルド時に型検査を行い、
// 型定義と異なる値のやり取りを検出してエラーにしてくれます。
// 意図しない値が入ってくることをある程度ビルド時に検出できるので、
// うっかりミスを防止し、開発効率を上げることができます。
