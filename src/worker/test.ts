const worker: Worker = self as any; // selfというグローバル変数を代入します。any型で全ての型を許容しています。

worker.addEventListener("message", (event) => {
  console.log("Worker Received:", event.data); // メインスレッドから渡されたデータをコンソールに出力しています。
  worker.postMessage({ result: event.data }); // postMessageでメインスレッドにデータを今回はそのまま返却します。
});
