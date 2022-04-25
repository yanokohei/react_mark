import * as marked from "marked";
import * as sanitizeHtml from "sanitize-html";

const worker: Worker = self as any; // selfというグローバル変数を代入します。any型で全ての型を許容しています。

worker.addEventListener("message", (event) => {
  const text = event.data;
  const html = sanitizeHtml(marked(text), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "h1", "h2"],
  });
  worker.postMessage({ html }); // なぜオブジェクトリテラルで囲む必要があるか
  // メインスレッドから受け取ったのテキストデータ（MD）を marked で HTML に変換し、メインスレッドに結果の HTML を返却しています。
  // postMessageでメインスレッドに結果のHTMLを返却しています。
});
