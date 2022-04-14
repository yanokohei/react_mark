import * as React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/button";
// useHistoryはReactのカスタムフックでhistoryオブジェクト(ブラウザの履歴を扱うAPI)を返します。

export const History: React.FC = () => {
  const history = useHistory();
  // レンダリング関数内で呼び出して戻り値であるhistoryオブジェクトを処理内で使用します。
  return (
    <>
      <h1>History</h1>
      <Button onClick={() => history.push("/editor")}>エディタへ戻る</Button>
    </>
  );
};
