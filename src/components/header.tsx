import * as React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: space-between;
  line-height: 2rem;
  padding: 0.5rem 1rem;
`;

const HeaderTitle = styled.div`
  font-size: 1.5rem;
`;

const HeaderControl = styled.div`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: center;

  & > * {
    margin-left: 0.5rem;
  }
`;

interface Props {
  title: string;
  children: React.ReactNode;
}
// Headerタグの中にタイトルや、Reactのコンポーネント、要素を配置してchildrenとして受け取ります。

export const Header: React.FC<Props> = (props) => (
  <HeaderWrapper>
    <HeaderTitle>{props.title}</HeaderTitle>
    <HeaderControl>{props.children}</HeaderControl>
  </HeaderWrapper>
);
// タイトル文字列は左に配置し、右側にリンク系のコンポーネントや保存するボタンを受け取ります。
// Vue.jsとは違い各ページに適用させています。
