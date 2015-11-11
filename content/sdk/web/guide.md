---
categories: 'sdk'
date: 2015-07-15T14:32:58+09:00
description: 'Growthbeat Web の導入方法について説明します'
draft: false
title: Growthbeat Web Gudeliene
---

# Push通知（Grwoth Push）

導入の前に下記をご覧ください。

- Google Developers Consoleでの設定
- Growth Push for Chromeの動作環境

## SDK導入

下記リンクからダウンロードできます。

[growthpush-javascript 最新版](https://github.com/growthbeat/growthpush-javascript/archive/latest.zip)

### manifest.jsonの設置

**manifest.jsonの例**

```json
{
  "name": "YOUR_APP_NAME",
  "short_name": "YOUR_APP_SHORT_NAME",
  "icons": [{
    "src": "YOUR_IMAGE_PATH",
    "sizes": "256x256",
    "type": "image/png"
  }],
  "start_url": "/",
  "display": "standalone",
  "gcm_sender_id": "YOUR_GCM_SENDER_ID",
  "gcm_user_visible_only": true
}
```

gcm_sender_idには、Google Developers Consoleで取得したSenderIdを指定します。

### ServiceWorkerの設置

`growthpush-sw.min.js`（本番用）または`growthpush-sw.js`（開発用）をサービスのドメイン直下に設置してください。

### 初期化コードの組み込み

以下のhtmlスニペットを、bodyタグの最後に組み込んでください。

```html
<script>
  (function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '/path/to/growthpush.min.js';
    document.getElementsByTagName('script')[0].parentNode.appendChild(script);
  })();

  document.addEventListener('growthpushReady', function () {
    GrowthPush.init({
      applicationId: YOUR_APPLICATION_ID,
      credentialId: 'YOUR_SECRET_KEY',
      environment: 'development',
      receiver: '/growthpush-sw.min.js',
      appName: 'YOUR_APPLICATION_NAME',
      icon: 'YOUR_ICON_IMAGE',
      clickEventName: 'NOTIFICATION_CLICK_EVENT_NAME'
    });
  });
</script>
```

※ applicationId, credentialIdは、Growth Push管理画面、シークレットキーを参考にしてください。


## RegistrationIdの取得・送信

下記コードでRegistrationIdをGrowth Pushサーバーに送信します。送信に成功すると、ユーザーにPush通知の許可をリクエストします。既に許可または拒否済みの場合はリクエストされません。

```javascript
GrowthPush.register()
```
