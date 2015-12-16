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

`Assets -> Import Package -> Custom Package...`

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
1. SafariServices.framework

Xcodeプロジェクトに、依存するFrameworkを追加してください。

### Android

### パーミッションの設定

```xml
<meta-data
    android:name="com.google.android.gms.version"
    android:value="@integer/google_play_services_version" />
```

必要なパーミッションは下記になります。

```xml
<uses-permission android:name="android.permission.INTERNET" />

<!-- under API 15 -->
<uses-permission android:name="android.permission.GET_ACCOUNTS" />

<!-- for Growth Push -->
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE" />
<permission
    android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE"
    android:protectionLevel="signature" />

<!-- for Growth Message -->
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />

```

### Growthbeatの設定

`<application>`タグ内に下記を追加してください。

```xml

<!-- for Growth Push -->
<meta-data android:name="com.growthpush.notification.icon" android:resource="@drawable/sample_notification_icon" />
<meta-data android:name="com.growthpush.notification.icon.background.color" android:resource="@android:color/white" />
<meta-data android:name="com.growthpush.dialog.icon" android:resource="@drawable/sample_notification_icon" />
<activity
    android:name="com.growthpush.view.AlertActivity"
    android:configChanges="orientation|keyboardHidden"
    android:launchMode="singleInstance"
    android:theme="@android:style/Theme.Translucent" />
<service
    android:name="com.growthpush.TokenRefreshService"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.android.gms.iid.InstanceID"/>
    </intent-filter>
</service>
<service android:name="com.growthpush.RegistrationIntentService"/>
<service
    android:name="com.growthpush.ReceiverService"
    android:exported="false" >
    <intent-filter>
        <action android:name="com.google.android.c2dm.intent.RECEIVE" />
    </intent-filter>
</service>
<receiver
    android:name="com.google.android.gms.gcm.GcmReceiver"
    android:exported="true"
    android:permission="com.google.android.c2dm.permission.SEND" >
    <intent-filter>
        <action android:name="com.google.android.c2dm.intent.RECEIVE" />
        <category android:name="YOUR_PACKAGE_NAME" />
    </intent-filter>
    <intent-filter>
        <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
        <category android:name="YOUR_PACKAGE_NAME" />
    </intent-filter>
</receiver>

<!-- for Growth Message -->
<activity
    android:name="com.growthbeat.message.view.MessageActivity"
    android:theme="@android:style/Theme.Translucent" />

<!-- for Growth Link -->
<receiver
    android:name="com.growthbeat.link.InstallReferrerReceiver"
    android:enabled="true"
    android:exported="true" >
    <intent-filter>
        <action android:name="com.android.vending.INSTALL_REFERRER" />
    </intent-filter>
</receiver>

```

* YOUR_PACKAGE_NAMEは、実装するアプリのパッケージ名に変更してください。

AndroidManifest.xmlのサンプルは、[こちら](https://github.com/growthbeat/growthbeat-android/blob/master/sample/src/main/AndroidManifest.xml)


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
#if UNITY_IPHONE
using NotificationServices = UnityEngine.iOS.NotificationServices;
#endif

bool tokenSent = false;

void Update () {
    #if UNITY_IPHONE
        if (!tokenSent) {
            byte[] token = NotificationServices.deviceToken;
            if (token != null) {
                GrowthPush.GetInstance ().SetDeviceToken(System.BitConverter.ToString(token).Replace("-", "").ToLower());
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

## 初期化

Growth Linkの初期化実装は下記になります。

```
IntentHandler.GetInstance ().AddNoopIntentHandler ();
IntentHandler.GetInstance ().AddUrlIntentHandler ();
GrowthLink.GetInstance().Initialize (applicationId, credentialId);
```

**iOS設定**

Xcodeプロジェクトを開き、 `Info -> URL Types -> URL Schemes` の中に、アプリのカスタムURLスキームを記述します。

<img src="/img/sdk/iOS/url-scheme.png" alt="url-scheme" title="url-scheme" width="100%"/>

**Android設定**

AndroidManifest.xmlのアクティビティーに `<intent-filter>` を追加します。

外部からの遷移時、開くActivityにカスタムURLスキームを記述します。

```xml
<activity
    android:name=".MainActivity"
    android:label="@string/app_name" >
    <intent-filter>
    	<data android:scheme="CUSTOM_URL_SCHEME" />
    	<category android:name="android.intent.category.DEFAULT" />
    	<category android:name="android.intent.category.BROWSABLE" />
        <action android:name="android.intent.action.VIEW" />                
    </intent-filter>
</activity>
```

リンクから開かれるActivityに下記を実装します。

```java
GrowthLink.getInstance().handleOpenUrl(getIntent().getData());
```

## カスタムハンドラ

Growth Link, Growth Messageでカスタムの処理をする場合は、下記を実装します。

```
IntentHandler.GetInstance ().AddCustomIntentHandler ("GameObject", "CallbackMethod");
```

処理を戻す、ゲームオブジェクト、コールバックする処理を指定してください。

```

public class GrowthbeatComponent : MonoBehaviour
{

    void Awake ()
    {
        IntentHandler.GetInstance ().AddCustomIntentHandler ("GrowthbeatComponent", "HandleCustomIntent");
    }

    void HandleCustomIntent(string extra) {
        Debug.Log("Enter HandleCustomIntent");
        Debug.Log(extra);
    }

}
```

# Growth Push SDKからの乗り換え方法について

## 前準備
GrowthPushのApplicationIdから、GrowthbeatのApplicationIdに移行されるため、[Growthbeat](https://growthbeat.com/)にアクセスして、ApplicationId、SDKキー（CredentialID）を確認します。

## 実装方法

### SDKの初期化

- GrowthPush SDK

```csharp
void Awake () {
	GrowthPush.Initialize(YOUR_APPLICATION_ID, "APPLICATION_SECRET", GrowthPush.Environment.Development, true, "YOUR_SENDER_ID");
	GrowthPush.TrackEvent("Launch");
	GrowthPush.SetDeviceTags();
	GrowthPush.ClearBadge();
}
```

- Growthbeat SDK

```csharp
void Awake () {
	// Growthbeat SDKの初期化
	Growthbeat.GetInstance ().Initialize ("YOUR_APPLICATION_ID", "CREDENTIAL_ID");

	// デバイストークンを明示的に要求
	GrowthPush.GetInstance ().RequestDeviceToken ("YOUR_SENDER_ID", Debug.isDebugBuild ? GrowthPush.Environment.Development : GrowthPush.Environment.Production);

	// バッチの削除
	GrowthPush.GetInstance ().ClearBadge ();

	// Launchイベントの取得
	GrowthPush.GetInstance ().TrackEvent ("Launch");

	// DeviceTagの取得
	GrowthPush.GetInstance ().SetDeviceTags ();
}
```

### デバイストークンの取得

- Growthbeat SDK

```csharp
#if UNITY_IPHONE
using NotificationServices = UnityEngine.iOS.NotificationServices;
#endif

public class YourGameObjectComponent : MonoBehaviour
{
	bool tokenSent = false;
	void Update ()
	{
	#if UNITY_IPHONE
		if (!tokenSent) {
			byte[] token = NotificationServices.deviceToken;
			if (token != null) {
				GrowthPush.GetInstance ().SetDeviceToken(System.BitConverter.ToString(token).Replace("-", "").ToLower());
				tokenSent = true;
			}
		}
	#endif
	}
}
```

# 備考

実装サンプルは、[GitHubレポジトリ](https://github.com/growthbeat/growthbeat-unity)を参考にしてください。

ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/)を閲覧してください。
