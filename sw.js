// Files to cache
const cacheName = 'englishiWordsBook-v1';
const cacheFiles = [
	'/',
	// '/index.html',
	// '/app.js',
	// '/style.css',
	// '/favicon.ico',
	// '/icons/EWB-Ravie-144.png',
	// '/icons/EWB-Ravie-192.png',
	// '/icons/EWB-Ravie-512.png',
];

// Installing Service Worker
// サービスワーカーインストール後にファイルキャッシュ
// これでオフラインでの表示が可能になる
self.addEventListener('install', (e) => {
	console.log('sw install');
	// cache
	e.waitUntil((async () => {
		const cache = await caches.open(cacheName);
		console.log('sw caching all');
		await cache.addAll(cacheFiles);
	})());
});

// Fetching content using Service Worker
// キャッシュを優先し表示。キャッシュになければサーバへ取得しに行く
self.addEventListener('fetch', (e) => {
	e.respondWith((async () => {
		const r = await caches.match(e.request);
		console.log(`sw Fetching resource: ${e.request.url}`);
		// リクエストとキャッシュが同じならキャッシュをリターン
		if (r) return r;
		// リクエストとキャッシュが異なる場合は
		// レスポンをスクーロン後キャッシュして、レスポンスを返却
		// リクエスト及びレスポンスストリームは一度しか読み出せないので、レスポンスの複製を作る必要があります。
		const response = await fetch(e.request);
		const cache = await caches.open(cacheName);
		console.log(`sw caching new resource: ${e.request.url}`);
		cache.put(e.request, response.clone());
		return response;

		// オブライン状態でキャッシュもされていない場合
		// が考慮されていない。そんなことある？
		// https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API/Using_Service_Workers#recovering_failed_requests

	})());
});

// Activating Service Worker
// 古いキャッシュを削除する。バージョンアップやファイルの更新
// https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API/Using_Service_Workers#deleting_old_caches
self.addEventListener('activate', (e) => {
	console.log('sw Activate');
	// 古いキャッシュを削除する
	// 古いキャッシュが削除されるタイミングは、
	// service worker 更新されたことで cacheName が更新され
	// 一時的に古いキャッシュと新しいキャッシュが共存する
	// 一時的に共存するのは、このタイミングでは、古いキャッシュが
	// ページに使用されているため古いキャッシュを削除できない。
	// ブラウザのタブを閉じるなどしてページが使用されなくなると
	// 次回のページ表示のタイミングで古いキャッシュが削除される。

	const cachesToKeep = [cacheName];

	e.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(keyList.map((key) => {
				if(cachesToKeep.indexOf(key) === -1){
					return caches.delete(key);
				}
			}))
		})
	);

});

