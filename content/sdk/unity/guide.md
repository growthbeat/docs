---
categories: 'sdk'
date: 2015-06-07T00:00:00+09:00
description: 'Growthbeat Unity の導入方法について説明します'
draft: false
title: Growthbeat Unity Guideliene
---

# 共通初期設定

## SDK導入

Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。

### 手動でgrowthbeat.unitypackageのインポート

[最新版Unity SDK ダウンロードページ](http://support.growthbeat.com/sdk/)

Unity 導入したいプロジェクトに、growthbeat.unitypackageをインポートします。

メニューから

`Assets -> Import Package -> Custom Packge...`

を選択し、でダウンロードしたUnityPackgeをインポートしてください。

## 初期設定

### iOS

ビルド後に、Xcodeプロジェクトに、Growthbeat.frameworkをインポートをする必要があります。もしくは、ビルドスクリプトにて、Xcodeに自動的に組み込まれるようにしてください。

Growthbeat.frameworkは、下記Frameworkが必須となります。

1. Foundation.framework
1. UIKit.framework
1. CoreGraphics.framework
1. SystemConfiguration.framework
1. AdSupport.framework

Xcodeプロジェクトに、依存するFrameworkを追加してください。

### Android

growthbeat.jarは、下記設定が必須となります。

1. ライブラリプロジェクトとして、google_play_service_libをビルドパスに設定
1. AndroidManifest.xmlの`<application>`内に以下を追加

```
<meta-data
    android:name="com.google.android.gms.version"
    android:value="@integer/google_play_services_version" />
```

必要なパーミンションは下記になります。

```xml
<uses-permission android:name="android.permission.INTERNET" />

<!--Growth Pushの機能として利用します。 -->
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />

<!--Growth Messageのバナー型の配信をする場合に必要となります。。 -->
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />

<!-- Android 4.0.4以上で動作する場合は必要ありません。 -->
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
```

`<application>`タグ内に下記を追加してください。

```xml

<!--Growth Push通知を受け取るために必要となります。。 -->
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

<!--Growth Messageの表示をするために必要となります。。 -->
<activity
    android:name="com.growthbeat.message.view.MessageActivity"
    android:theme="@android:style/Theme.Translucent" />

```
* YOUR_PACKAGE_NAMEは、実装するアプリのパッケージ名に変更してください。


## Growthbeatの初期化

```
Growthbeat.GetInstance().Initialize("YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID");
```

## アプリの起動・終了イベントの送信

アプリ初期化時に一度だけ送信してください。

```
Growthbeat.GetInstance().Start();
```

終了イベントは、アプリが閉じるときにを実装してください。

```
Growthbeat.GetInstance().Stop();
```

# プッシュ通知

Growth Push管理画面、証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[iOSプッシュ通知証明書作成方法](http://growthhack.sirok.co.jp/growthpush/ios-p12/)

また、iOSの場合、Provisioning Profileの設定をする必要があります。

XcodeプロジェクトのBuild Setting > Provisioning Profileの設定をしてください。誤った設定方法となりますと、デバイストークンの取得ができません。

[Android SenderId, APIキー取得方法](http://growthhack.sirok.co.jp/growthpush/gcm-api/)

## DeviceToken/RegistrationIdの取得・送信

デバイストークンを取得するタイミングで下記を実装してください。

```
GrowthPush.GetInstance().RequestDeviceToken("YOUR_SENDER_ID", Debug.isDebugBuild ? GrowthPush.Environment.Development : GrowthPush.Environment.Production);
```

Environmentは、開発環境の場合、Environment.Developmentを指定、本番環境の場合は、Environment.Productionを指定してください。

iOSの場合、デバイストークンがNotificationServicesから戻ってきますので、UpdateにてSetDeviceTokenを実装し、登録処理を流します。

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

# アプリ内メッセージ

## メッセージを作成する

ここではアプリの起動時にメッセージを出す方法を説明します（共通初期設定でアプリの起動イベントを送信している必要があります）。

まず、管理画面にてアプリ起動時に配信されるメッセージを作成します。メッセージの作成方法は[こちら](/manual/growthmessage/#配信作成)を参考にしてください。

アプリ起動以外にも、カスタムイベントをメッセージ配信のトリガーにすることにより、アプリの任意の場所でメッセージを配信することができます。詳しくは、[こちら](/sdk/android/reference/#カスタムイベント送信)をご参照ください。

# ディープリンク

申し訳ございません、ディープリンク機能は現在ご利用いただけません。

SDKのアップデートをお待ちくださいませ。

# 備考

ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/)を閲覧してください。
