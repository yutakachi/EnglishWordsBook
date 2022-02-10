// Registering Service Worker
// ブラウザでサービスワーカーが使用出来る場合はサービスワーカーを登録する
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then( (reg) => {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch( (err) => {
      // registration failed
      console.log('Registration failed with ' + err);
    });
}

// インストールバナーを表示するイベント
// インストールバーナーを表示するイベントをフックして手動でインストールするボタンなと作成する
// このイベントは、Webアプリインストール要件を満たした場合に発火されるので
// このイベントが発火していない場合は、Webアプリとしてインストールするいことが出来ない。
window.addEventListener('beforeinstallprompt', function(event){
  console.log("beforeinstallprompt: ", event);
  // event.preventDefault(); // event をキャンセルすることで、インストールバナー表示をキャンセルできる

});
