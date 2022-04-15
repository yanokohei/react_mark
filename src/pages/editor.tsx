import * as React from "react";
import styled from "styled-components";
import { useStateWithStorage } from "../hooks/use_state_with_storage";
import * as ReactMarkdown from "react-markdown";
import { putMemo } from "../indexeddb/memos";
import { Button } from "../components/button";
import { SaveModal } from "../components/save_modal";
import { Link } from "react-router-dom"; // aタグと似た要素です。
import { Header } from "../components/header";

const { useState } = React;
const StorageKey = "pages/editor:text"; // データの参照・保存に使うキー名を任意の名前で定義しています。
// https://i.gyazo.com/a854a783ca0198fbf0c8744e115a6dec.png

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`;

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`;

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
`;

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`;
// Editorコンポーネントを以下のように定義するとJSXで<Editor> という形式で呼び出すことができる。
export const Editor: React.FC = () => {
  // React.FC は 関数コンポーネント（Function Component）の略
  // Reactのコンポーネントを返すという型アノテーション

  // モーダルを表示するかどうかのフラグを管理で、初期値はfalseとします。
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useStateWithStorage("", StorageKey);

  return (
    <>
      <HeaderArea>
        <Header title="Markdown Editor">
          <Button onClick={() => setShowModal(true)}>保存する</Button>
          <Link to="/history">履歴を見る</Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        <TextArea
          onChange={(event) => {
            setText(event.target.value);
          }} // setTextにテキストを渡すことで状態を更新します。
          value={text} // useStateで管理している変数を渡します。これがないとリロードでブラウザ上の入力が消えてしまう
        />
        <Preview>
          <ReactMarkdown>{text}</ReactMarkdown>
        </Preview>
      </Wrapper>
      {showModal && (
        <SaveModal
          onSave={(title: string): void => {
            putMemo(title, text);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};
// pageであるEditorを定義します。関数コンポーネントの型アノテーションをつけます。
// 関数のブロック内にreturnと()、その中に<>という描画されない空タグを書きます。<React.Fragment>の短縮記法です。
// <>を使うとDOMに余分なノードを追加することなく子要素をまとめることができるようになります。

// 保存するボタンを押した際にsetShowModalで状態が更新され、setShowModalがtrueになることでSaveModalコンポーネントが発火します。
//
