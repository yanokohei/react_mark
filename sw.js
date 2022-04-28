const CacheName = "Cache:v1"; // 任意のキャッシュ名を定義

self.addEventListener("install", (event) => {
  console.log("ServiceWorker install:", event);
});

self.addEventListener("activate", (event) => {
  console.log("ServiceWorker activate:", event);
});

const networkFallingBackToCache = async (request) => {
  const cache = await caches.open(CacheName);
  try {
    const response = await fetch(request); // fetch リクエストを実行してレスポンスを定義
    await cache.put(request, response.clone()); // レスポンスの内容をコピーしてからキャッシュにレスポンスを保存
    return response; // レスポンスを呼び出し元に返す
  } catch (err) {
    // リクエスト時にエラーが発生した場合に、コンソールにエラーを表示して、キャッシュの内容を返却する処理
    console.error(err);
    return cache.match(request);
  }
};
// self はサービスワーカー自身を指します。
// addEventListener で各イベントにコールバックを登録しています。
// install activate は前パートで説明したライフサイクルの各イベントを指します。

// ネットワークリクエストに介入
self.addEventListener("fetch", (event) => {
  // ネットワークリクエストの処理に実行するコールバック処理
  event.respondWith(networkFallingBackToCache(event.request));
});
// addEventListener でfetchイベント時に実行するコールバックを登録しています。
// fetchイベント時のリクエストURLを出力
// event.respondWith は簡潔に言うと、非同期処理（Promise）の実行終了まで待機してくれるメソッド
// 通常通りネットワークにアクセスし、エラーが発生したらキャッシュから返します。(networkFallingBackToCache)
// 通常は最新のリソースを取得し、エラー時のみキャッシュを使用するシンプルな実装です。
// event.requestにメインスレッドからのリクエスト内容が格納されています。
