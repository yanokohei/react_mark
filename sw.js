self.addEventListener("install", (event) => {
  console.log("ServiceWorker install:", event);
});

self.addEventListener("activate", (event) => {
  console.log("ServiceWorker activate:", event);
});

// self はサービスワーカー自身を指します。
// addEventListener で各イベントにコールバックを登録しています。
// install activate は前パートで説明したライフサイクルの各イベントを指します。

// ネットワークリクエストに介入
self.addEventListener("fetch", (event) => {
  console.log("Fetch to:", event.request.url);
  event.respondWith(fetch(event.request));
});
// addEventListener でfetchイベント時に実行するコールバックを登録しています。
// fetchイベント時のリクエストURLを出力
// fetch()の引数には取得したいリソースのパスを渡すことで成功か失敗かに関わらず、リクエストに対する Response に解決する Promise を返します
// event.respondWith は簡潔に言うと、非同期処理（Promise）の実行終了まで待機してくれるメソッド
