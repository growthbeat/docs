---
categories: 'sdk'
date: 2017-01-17T14:32:58+09:00
description: 'Growthbeat Web の導入方法について説明します'
draft: false
title: Growthbeat Web Gudeliene
---

# SDK概要

Web SDK は Push通知機能のみの対応となっております。

Growth Push管理画面の証明書設定ページにて、Androidの証明書の設定を行ってください。

- [Android SenderId、 APIキー取得方法](http://growthbeat.helpscoutdocs.com/article/23-gcm-api)

また、導入の前に下記もご覧ください。

- [Growth Push for Android Chromeの動作環境](http://faq.growthbeat.com/article/46-growth-push-for-android-chrome)

# 1. manifest.json の設置

manifest.json を公開ディレクトリに設置してください。

## manifest.json の例

YOUR_SENDER_ID には、Firebas Cloud Messaging で取得した SenderId を指定します。SenderId の取得方法は [Android SDKで使うCloud Messaging サーバーキーの設定方法](http://faq.growthbeat.com/article/23-gcm-api) を参照してください。

```
{
  "name": "APP_NAME",
  "short_name": "SHORT_APP_NAME",
  "icons": [{
    "src": "HOME_SCREEN_ICON",
    "sizes": "144x444",
    "type": "image/png"
  }],
  "start_url": "/",
  "display": "standalone",
  "gcm_sender_id": "GCM_SENDER_ID",
  "gcm_user_visible_only": true
}
```

# 2. ServiceWorker の設置

下記のファイルをサービスのドメイン直下に設置してください。

* growthpush.min.js（本番用）または growthpush.js（開発用）
* growthpush-sw.min.js（本番用）または growthpush-sw.js（開発用）

# 3. linkタグの組み込み

以下のlinkタグを `<head>` タグ内に組み込んでください。

```
<link rel="manifest" href="./manifest.json">
```

# 4. 初期化

以下のhtmlスニペットを、`<body>` タグの内に組み込んでください。

YOUR_APPLICATION_ID と YOUR_SECRET_KEY は Growth Push 管理画面左メニュー「アプリ詳細」内の「Growth Push SDKをお使いの方」 にて確認していただけます。

```
<script>
  (function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '/path/to/growthpush.js';
    document.getElementsByTagName('script')[0].parentNode.appendChild(script);
  })();

  document.addEventListener('growthpushReady', function () {
    GrowthPush.init({
      applicationId: YOUR_APPLICATION_ID,
      credentialId: 'YOUR_SECRET_KEY',
      environment: 'development',
      receiver: '/growthpush-sw.js',
      appName: 'YOUR_APPLICATION_NAME',
      icon: 'YOUR_NOTIFICATION_ICON',
      clickEventName: 'NOTIFICATION_CLICK_EVENT_NAME'
    });
  });
</script>
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| Growth Push管理画面のアプリID |
|credentialId| Growth Push管理画面のシークレットキー |
|environment| 本番環境: `production` 開発環境: `development` |
|receiver| 本番環境: `/growthpush-sw.min.js` 開発環境: `/growthpush-sw.js` |
|appName| アプリ名。通知のタイトルで表示されます。 |
|icon| アイコン画像。通知のアイコンで表示されます。 |
|clickEventName| 通知クリックのイベント。例: NotificationClick |

# 5. RegistrationId の取得・送信

下記コードで RegistrationId を Growth Push サーバーに送信します。送信に成功すると、ユーザーにPush通知の許可をリクエストします。既に許可または拒否済みの場合はリクエストされません。

```
GrowthPush.register();
```

Push通知の許可が得られると、registeredイベントが発火します。

```
GrowthPush.on('registered', function() {
  // 許可が得られたときの処理
});

GrowthPush.on('error', function() {
  // エラーが起きたときの処理
});
```

# その他設定について

## SenderId、AP Keyの取得について
SenderId は、RequestRegistrationId を実行するために必要となります。APIキーは、管理画面にて、プッシュ通知を送信するための証明書として必要になります。
[Android SenderId, APIキー取得方法](http://growthbeat.helpscoutdocs.com/article/23-gcm-api)

## 管理画面設定

### APIキーの登録
Growth Push管理画面の証明書設定ページにて、APIキーの登録を行ってください。  

### プッシュ通知の作成
[配信作成](http://support.growthbeat.com/manual/growthpush/#配信作成) を参考に、プッシュ通知が届くかを確認します。

### セグメントについて

セグメント配信を利用する際に、実装が必要となります。
[配信したいセグメント](http://support.growthbeat.com/manual/growthpush/#セグメントの作成)に沿って、タグやイベントの紐付けを行ってください。

# お問い合わせ
ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/) を閲覧してください。
