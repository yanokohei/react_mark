import * as React from "react";
import { Link, useHistory } from "react-router-dom";
// useHistoryはReactのカスタムフックでhistoryオブジェクト(ブラウザの履歴を扱うAPI)を返します。
import styled from "styled-components";
import { Header } from "../components/header";

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

export const History: React.FC = () => {
  // レンダリング関数内で呼び出して戻り値であるhistoryオブジェクトを処理内で使用します。
  return (
    <>
      <HeaderArea>
        <Header title="履歴">
          <Link to="/editor">エディタに戻る</Link>
        </Header>
      </HeaderArea>
      <Wrapper>TODO: 履歴表示</Wrapper>
    </>
  );
};
