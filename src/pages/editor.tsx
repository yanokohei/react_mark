import * as React from "react";
import styled from "styled-components";
import { putMemo } from "../indexeddb/memos";
import { Button } from "../components/button";
import { SaveModal } from "../components/save_modal";
import { Link } from "react-router-dom"; // aタグと似た要素です。
import { Header } from "../components/header";
import ConvertMarkdownWorker from "worker-loader!../worker/convert_markdown_worker";

const { useState, useEffect } = React;
const convertMarkdownWorker = new ConvertMarkdownWorker();
const StorageKey = "pages/editor:text"; // データの参照・保存に使うキー名を任意の名前で定義しています。
// https://i.gyazo.com/a854a783ca0198fbf0c8744e115a6dec.png
interface Props {
  text: string;
  setText: (text: string) => void;
}

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
export const Editor: React.FC<Props> = (props) => {
  // const [text, setText] = useStateWithStorage("", StorageKey);
  const { text, setText } = props;
  // モーダルを表示するかどうかのフラグを管理で、初期値はfalseとします。
  const [showModal, setShowModal] = useState(false);
  const [html, setHtml] = useState("");

  useEffect(() => {
    convertMarkdownWorker.onmessage = (event) => {
      // Workerからデータを受け取った際のonmessage処理
      // console.log(event); // messageEventオブジェクトのdataプロパティにhtmlデータがあることを確認
      setHtml(event.data.html); // 受け取ったHTMLをuseStateで更新します。
    };
  }, []);

  useEffect(() => {
    // テキストの変更時にのみ Worker へテキストデータを送信します。
    convertMarkdownWorker.postMessage(text);
  }, [text]);

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
          <div dangerouslySetInnerHTML={{ __html: html }} />
          {/* HTML をそのまま表示するのは、 XSS などの攻撃にさらされてしまうため危険です。__ 通常は使わないようにという意味合い */}
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
