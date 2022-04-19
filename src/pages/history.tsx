import * as React from "react";
import { Link, useHistory } from "react-router-dom";
// useHistoryはReactのカスタムフックでhistoryオブジェクト(ブラウザの履歴を扱うAPI)を返します。
import styled from "styled-components";
import { Header } from "../components/header";
import { getMemos, MemoRecord } from "../indexeddb/memos";
// 履歴リストを返すメソッドと型をインポート

const { useState, useEffect } = React;
// JSXを返す関数内に記述すると、処理のたびに処理が実行されてしまうため、useEffectで初期化処理を行う必要があります。

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`;

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
`;

const Memo = styled.button`
  display: block;
  background-color: white;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
`;

const MemoTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const MemoText = styled.div`
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface Props {
  setText: (text: string) => void;
}
// テキストの状態を更新する関数を、パラメーターとして受け取るようにします。

export const History: React.FC<Props> = (props) => {
  const { setText } = props;
  const [memos, setMemos] = useState<MemoRecord[]>([]);
  // console.log(memos);
  const history = useHistory();

  useEffect(() => {
    getMemos().then(setMemos);
  }, []);
  // useEffectは「副作用(effect)フック」と呼ばれ、レンダリングの後に実行されます。
  // 第一引数にコールバック関数、履歴リストの取得(非同期処理)したらthenメソッドでuseStateのsetMemosを実行して更新します。
  // 第二引数に状態が変化するデータを渡します(ここでは空配列)。データに変更があった際に第一引数の関数が発火します。

  return (
    <>
      <HeaderArea>
        <Header title="履歴">
          <Link to="/editor">エディタに戻る</Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        {memos.map((memo) => (
          <Memo
            key={memo.datetime}
            onClick={() => {
              setText(memo.text);
              history.push("/editor");
            }}
          >
            <MemoTitle>{memo.title}</MemoTitle>
            <MemoText>{memo.text}</MemoText>
          </Memo>
        ))}
      </Wrapper>
    </>
  );
};
// Memoコンポーネントのkey属性は、配列要素を再描画する際に、変更された要素を特定するための使用するキーで、配列の変更箇所を効率よく判定出来ます。
