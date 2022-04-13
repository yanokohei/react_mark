import * as React from "react";
import styled from "styled-components";
import { Button } from "./button";

const { useState } = React;

// editorコンポーネントにこのモーダルコンポーネントを配置します。
// コンポーネント化は、Reactとstyledのインポートは固定という認識です。stateを使用する場合は分割代入しておきます。
// タグとして扱うスタイルコンポーネントを定義していきます。

const Wrapper = styled.div`
  align-items: center;
  background-color: #0002;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const Modal = styled.div`
  background: #fff;
  padding: 1rem;
  width: 32rem;
`;

const TitleInput = styled.input`
  width: 29rem;
  padding: 0.5rem;
`;

const Control = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
`;

// 保存時の処理関数と、キャンセル時の処理関数をモーダルのパラメーターに指定するための型定義です。
// タイトルを任意で変更出来るようにする実装のため、onSaveでタイトルのテキストを引数に取ります。
interface Props {
  onSave: (title: string) => void;
  onCancel: () => void;
}

export const SaveModal: React.FC<Props> = (props) => {
  const { onCancel, onSave } = props;
  const [title, setTitle] = useState(new Date().toISOString());
  // propsのオブジェクトのプロパティを分割代入します。タイトルの初期値は日時を文字列化したものです。

  return (
    <Wrapper>
      <Modal>
        <p>テキストの内容を保存します。</p>
        <p>保存内容のタイトルを入力して「保存」ボタンを押してください。</p>
        <p>
          <TitleInput
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </p>
        <Control>
          <Button onClick={onCancel} cancel>
            キャンセル
          </Button>
          <Button onClick={() => onSave(title)}>保存</Button>
        </Control>
      </Modal>
    </Wrapper>
  );
};
