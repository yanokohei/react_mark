import * as React from 'react'
import styled from 'styled-components'

const { useState } = React   // ReactからuseStateを取り出す (オブジェクトの分割代入は任意のプロパティを変数に代入する)

const Header = styled.header`
  font-size: 1.5rem;
  height: 2rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
`

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`
// Editorコンポーネントを以下のように定義するとJSXで<Editor> という形式で呼び出すことができる。
export const Editor: React.FC = () => { // React.FC は 関数コンポーネント（Function Component）の略
                  // Reactのコンポーネントを返すという型アノテーション
  const [text, setText] = useState<string>("") // 関数コンポーネント内で状態を定義

  return (
    <>
      <Header>
        Markdown Editor
      </Header>
      <Wrapper>
        <TextArea
          onChange={(event) => {       // onChange属性には、テキストの内容が変更された時に実行される関数を渡します。
            setText(event.target.value) //event.target.valueにテキストの内容が格納されています。
          }}                            //setTextにテキストを渡すことで状態を更新します。
          value = {text}                // useStateで管理している変数を渡します。
        />
        <Preview>プレビューエリア</Preview>
      </Wrapper>
    </>
  )
}
// pageであるEditorを定義します。関数コンポーネントの型アノテーションをつけます。
// 関数のブロック内にreturnと()、その中に<>という描画されない空タグを書きます。<React.Fragment>の短縮記法です。
// <>を使うとDOMに余分なノードを追加することなく子要素をまとめることができるようになります。
