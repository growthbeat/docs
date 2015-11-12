---
categories: 'sdk'
date: 2015-06-07T00:00:00+09:00
description: 'Growthbeat Unity の導入方法について説明します'
draft: false
title: Growthbeat Unity Gudeliene
---

# 共通初期設定

## SDK導入

Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。

### growthbeat.unitypackageのインポート

Unity 導入したいプロジェクトに、growthbeat.unitypackageをインポートします。

## 依存について

### iOS

Growthbeat.frameworkは、下記Frameworkが必須となります。

1. Foundation.framework
1. UIKit.framework
1. CoreGraphics.framework
1. SystemConfiguration.framework
1. AdSupport.framework

### Android

growthbeat.jarは、下記設定が必須となります。

1. ライブラリプロジェクトとして、google_play_service_libをビルドパスに設定
1. AndroidManifest.xmlの`<application>`内に以下を追加

```
<meta-data
    android:name="com.google.android.gms.version"
    android:value="@integer/google_play_services_version" />
```


## Growthbeatの初期化

```
Growthbeat.GetInstance().Initialize("YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID", true);
```

# Push通知（Grwoth Push）

Growth Push管理画面、証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[iOSプッシュ通知証明書作成方法](http://growthhack.sirok.co.jp/growthpush/ios-p12/)

[Android SenderId, APIキー取得方法](http://growthhack.sirok.co.jp/growthpush/gcm-api/)

## iOS
### Provisioning Profileの設定
XCodeプロジェクトのBuild Setting > Provisioning Profileの設定をしてください。誤った設定方法となりますと、デバイストークンの取得ができません。

## Android

### AndroidManifest.xmlの設定（Push）

`<manifest>`タグ内に下記パーミッションを追加してください。

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />

<permission
    android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE"
    android:protectionLevel="signature" />

<uses-permission android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE" />
```

`<application>`タグ内に下記を追加してください。

```xml
<activity
    android:name="com.growthpush.view.AlertActivity"
    android:configChanges="orientation|keyboardHidden"
    android:launchMode="singleInstance"
    android:theme="@android:style/Theme.Translucent" />

<receiver
    android:name="com.growthpush.BroadcastReceiver"
    android:permission="com.google.android.c2dm.permission.SEND" >
    <intent-filter>
        <action android:name="com.google.android.c2dm.intent.RECEIVE" />
        <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
        <category android:name="YOUR_PACKAGE_NAME" />
    </intent-filter>
</receiver>
```

* YOUR_PACKAGE_NAMEは、実装するアプリのパッケージ名に変更してください。

## DeviceToken/RegistrationIdの取得・送信

### iOS(APNS)

- Growthhbeat#Initializeの後に下記を呼び出す

- 開発環境向け
```
GrowthPush.GetInstance().RequestDeviceToken(GrowthPush.Environment.Development);
```

- 本番環境向け
```
GrowthPush.GetInstance().RequestDeviceToken(GrowthPush.Environment.Production);
```

- UpdateにてSetDeviceTokenを実装

```
bool tokenSent = false;

void Update () {
    #if UNITY_IPHONE
	    if (!tokenSent) {
		    byte[] token = NotificationServices.deviceToken;
		    if (token != null) {
			    GrowthPush.GetInstance().SetDeviceToken(System.BitConverter.ToString(token));
			    tokenSent = true;
		    }
	    }
    #endif
}
```

### Android(GCM)

- Growthhbeat#initializeWithApplicationIdの後に下記を呼び出す

```
// YOUR_SENDER_IDは、AndroidのSenderId
GrowthPush.GetInstance().RequestRegistrationId ("YOUR_SENDER_ID");
```

* YOUR_SENDER_IDは、AndroidのSenderId

# 分析（Growth Anlytics）

あらかじめ特定のタグやイベントを送信するためのメソッドを用意しております。
[Growthbeatの初期化](#growthbeatの初期化) の時点で下記データがGrowth Anlyticsに送信されます。

* デバイスモデル

* OS

* 言語

* タイムゾーン

* UTCとタイムゾーンの差分

その他、デフォルトで用意のあるタグ・イベント一覧はAPIリファレンスを参照してください。

[APIリファレンス]()

## タグ（ユーザー属性）の送信

**タグとは**

ユーザーの属性を示す情報の送信をします。一般的には ユーザーID/性別/年齢 等の情報を送信します。

```
- `public void Tag (string name)`
- `public void Tag (string name, string value)`
```

詳しくは、APIリファレンスを参照してください。

[APIリファレンス]()

## イベント（行動ログ）の送信

**イベントとは？**

ユーザーの行動ログを示す情報の送信をします。一般的には 起動/ログイン/課金 等の情報を送信します。

```
- `public void Track (string name)`
- `public void Track (string name, Dictionary<string, string> properties)`
- `public void Track (string name, TrackOption option)`
- `public void Track (string name, Dictionary<string, string> properties, TrackOption option)`
```

詳しくは、APIリファレンスを参照してください。

[APIリファレンス]()

# アプリ内メッセージ（Growth Message）

## Android

`<application>` タグ内に下記を追加してください。

```xml
<activity
	android:name="com.growthbeat.message.view.MessageActivity"
	android:theme="@android:style/Theme.Translucent" />
```

## メッセージを表示する

メッセージを表示したい場所にGrowth Analyticsのタグを設定してください。

```objc
GrowthAnalytics.GetInstance().Track("EVENT_ID");
```

詳しくは、APIリファレンスを参照してください。

[Growth Analytics APIリファレンス]()
