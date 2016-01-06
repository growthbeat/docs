---
categories: 'sdk'
date: 2015-11-18T14:32:58+09:00
description: 'Growthbeat Web の導入方法について説明します'
draft: false
title: Growthbeat Web Gudeliene
---

Version 1.1.3

Web SDKはPush通知機能（Growth Push）のみ対応しております。

# Push通知（Grwoth Push）

Growth Push管理画面の証明書設定ページにて、Androidの証明書の設定を行ってください。

- [Android SenderId、 APIキー取得方法](http://growthbeat.helpscoutdocs.com/article/23-gcm-api)

また、導入の前に下記もご覧ください。

- [Growth Push for Android Chromeの動作環境](http://faq.growthbeat.com/article/46-growth-push-for-android-chrome)

## SDK導入

下記リンクからダウンロードできます。

[最新版Web SDK ダウンロードページ](http://support.growthbeat.com/sdk)

### manifest.jsonの設置

manifest.jsonを公開ディレクトリに設置してください。

**manifest.jsonの例**

```json
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

gcm_sender_idには、Google Developers Consoleで取得したSenderIdを指定します。

### ServiceWorkerの設置

`growthpush-sw.min.js`（本番用）または`growthpush-sw.js`（開発用）をサービスのドメイン直下に設置してください。

### linkタグの組み込み

以下のlinkタグをheadタグ内に組み込んでください。

```html
<link rel="manifest" href="./manifest.json">
```

### 初期化コードの組み込み

以下のhtmlスニペットを、bodyタグの最後に組み込んでください。

```html
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


## RegistrationIdの取得・送信

下記コードでRegistrationIdをGrowth Pushサーバーに送信します。送信に成功すると、ユーザーにPush通知の許可をリクエストします。既に許可または拒否済みの場合はリクエストされません。

```javascript
GrowthPush.register()
```

Push通知の許可が得られると、registeredイベントが発火します。

```javascript
GrowthPush.on('registered', function() {
  // 許可が得られたときの処理
});

GrowthPush.on('error', function() {
  // エラーが起きたときの処理
});
```
