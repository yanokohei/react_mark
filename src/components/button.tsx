import * as React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;

  &.cancel {
    background: white;
    border: 1px solid gray;
    color: gray;
  }
`;

interface Props {
  cancel?: boolean;
  children: string;
  onClick: () => void;
}

export const Button: React.FC<Props> = (props) => (
  <StyledButton
    onClick={props.onClick}
    className={props.cancel ? "cancel" : ""}
  >
    {props.children}
  </StyledButton>
);
// 前提としてブラウザ上にレンダリングされる段階で関数コンポーネントにはデータが渡っています。
// 実際にボタンコンポーネントタグ内でonClickに代入した任意の関数がpropsのonClickに入っています。(saveMemo関数など)
// childrenはボタン内に表示するテキストで、"登録する"というテキストが渡ってきています。
// キャンセルボタンは任意でPropsで渡せるものとし、キャンセルボタンのスタイルはtrueが渡された場合は表示されます。
