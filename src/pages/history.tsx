import * as React from "react";
import { Link, useHistory } from "react-router-dom";
// useHistoryはReactのカスタムフックでhistoryオブジェクト(ブラウザの履歴を扱うAPI)を返します。
import styled from "styled-components";
import { Header } from "../components/header";
import { getMemoPageCount, getMemos, MemoRecord } from "../indexeddb/memos";
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
  bottom: 3rem;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
  overflow-y: scroll;
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

const Paging = styled.div`
  bottom: 0;
  height: 3rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem;
  position: fixed;
  right: 0;
  text-align: center;
`;

const PagingButton = styled.button`
  background: none;
  border: none;
  display: inline-block;
  height: 2rem;
  padding: 0.5rem 1rem;

  &:disabled {
    color: silver;
  }
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
  const [page, setPage] = useState(1); // 現在のページの状態を保持します。
  const [maxPage, setMaxPage] = useState(1); // 最大ページの状態を保持します。履歴の件数によって可変な値になります。
  // console.log(memos);
  const history = useHistory();

  useEffect(() => {
    getMemos(1).then(setMemos);
    getMemoPageCount().then(setMaxPage);
  }, []);
  // useEffectは「副作用(effect)フック」と呼ばれ、レンダリングの後に実行されます。
  // 第一引数にコールバック関数、履歴リストの取得(非同期処理)したらthenメソッドでuseStateのsetMemosを実行して更新します。
  // 第二引数に状態が変化するデータを渡します(ここでは空配列)。データに変更があった際に第一引数の関数が発火します。

  const canNextPage: boolean = page < maxPage; // 次のページに遷移出来るかの真偽値を返します。
  const canPrevPage: boolean = page > 1;
  const movePage = (targetPage: number) => {
    // ボタンを押した際にonClickイベントで数値が渡って発火します。
    if (targetPage < 1 || maxPage < targetPage) {
      // ページ遷移出来る状態かをページ数で判定しています。
      return;
    }
    setPage(targetPage); // 現在のページ数の状態を更新するためのメソッドです。
    getMemos(targetPage).then(setMemos); // ページ数値に該当する履歴のレコード10件を取得した後に、状態を更新します。
  };
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
      <Paging>
        <PagingButton
          onClick={() => movePage(page - 1)}
          disabled={!canPrevPage}
        >
          ＜
        </PagingButton>
        {page} / {maxPage}
        <PagingButton
          onClick={() => movePage(page + 1)}
          disabled={!canNextPage}
        >
          ＞
        </PagingButton>
      </Paging>
    </>
  );
};
// Memoコンポーネントのkey属性は、配列要素を再描画する際に、変更された要素を特定するための使用するキーで、配列の変更箇所を効率よく判定出来ます。
