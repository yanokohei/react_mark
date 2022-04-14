import * as React from "react";
import { render } from "react-dom";
import styled from "styled-components"; // JavaScript の中でスタイリングを管理でき、比較的導入が容易で名前の衝突がしにくい
import { createGlobalStyle } from "styled-components";
import {
  HashRouter as Router, // react-routerのルーティング範囲を定義するタグです。
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Editor } from "./pages/editor";

const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }
`; // styled-componentでインポートしたcreateGlobalStyleでページ全体に適用するCSSを定義

const Main = (
  <>
    <GlobalStyle />
    <Router>
      <Route exact path="/editor">
        <Editor />
      </Route>
      <Route exact path="/history">
        <h1>History</h1>
      </Route>
      <Redirect to="/editor" path="*" />
    </Router>
  </>
);

render(Main, document.getElementById("app"));

// import ・・・React はソースコード内で使用していないがJSXを使う場合、インポートが必須。
// reactモジュールの全てのエクスポートをReactという名前を付けてインポート
// react-domのモジュールのrenderをインポート

// Main という変数に React のビューを書く。これがJSX。
// 最後の行は React と HTML ファイルをつなぐ処理
// app という ID を持つ HTML 内の要素に対して Main という変数の内容を紐付ける処理
