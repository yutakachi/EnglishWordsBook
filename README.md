# PWA のひな形を作成する

## PWAアプリケーションをインストールする要件

https://web.dev/install-criteria/

- Webアプリがインストールされていない。
- ユーザーエンゲージメントヒューリスティックに対応
- HTTPS経由（ただし開発を考慮？して http://localhost は許容される）
- Webマニュフェストに以下が含まれていること
  - short_name or name 
  - アイコン192px と 512px
  - start_url
  - display: fullscreen or standalone or minimal-ui
  - prefer_related_applications が存在していないか、false であること
- fetch ハンドラーに Service Worker を登録していること

「ユーザーエンゲージメントヒューリスティックに対応する」とはどういう意味か疑問に思われるかもしれません。実際には、Webサイトを一定時間使用する必要があることを意味し、その後、インストールプロンプトが表示されます。通常、数秒かかります。
ユーザーエンゲージメントヒューリスティックに適合します（以前は、ユーザーは少なくとも30秒間ドメインと対話する必要がありましたが、これはもはや要件ではありません）。


beforeinstallpromptはWeb標準ではありません
Service WorkerやWebマニフェストファイルとは異なり、ホーム画面への追加プロンプトはWeb標準ではありません。これは、ユーザーがプログレッシブWebアプリをホーム画面に追加するように求められる方法とかどうかを、ブラウザーが常に指示できることを意味します。

