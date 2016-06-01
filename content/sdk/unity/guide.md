---
categories: 'sdk'
date: 2015-06-07T00:00:00+09:00
description: 'Growthbeat Unity の導入方法について説明します'
draft: false
title: Growthbeat Unity Guideliene
---

Version 1.2.7

# 共通初期設定

## SDK導入

Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。

Unity 5以上の動作推奨をしています。

Unityプラットフォームがサポートしていないバージョンについては、本SDKもサポート対象外となります。

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

#### Google Play Serviceの設定方法

* [Google公式ドキュメント](https://developers.google.com/android/guides/setup?hl=ja#add_google_play_services_to_your_project)

##### 動作バージョン

Google Play Servicesのバージョン23以上が必要となります。

Growthbeat SDKでは、Google Play Servicesのバージョン23以上でないと、正しく動作いたしません。

#### ライブラリの設定

##### Android Studioをお使いの場合

Android Studioで開発する場合は、build.gradleに設定してください。

```
dependencies {
    compile 'com.growthbeat:growthbeat-android:1.2.7@aar'

    // Androidのライブラリです。growthbeatのライブラリの機能に依存します。
    compile "com.android.support:appcompat-v7:23.3.0"
    compile 'com.google.android.gms:play-services-gcm:8.3.0'
    compile 'com.google.android.gms:play-services-ads:8.3.0'

    // 以下は、デフォルトで設定されます。
    compile files('libs/growthbeat-unity-wrapper.jar')
    compile files('libs/unity-classes.jar')

}
```

- [Android Studioに、プロジェクトを書き出す場合](http://docs.unity3d.com/ja/current/Manual/android-BuildProcess.html)

##### Eclipseで開発の場合

[growthbeat-android](https://github.com/growthbeat/growthbeat-android/releases/tag/latest)をダウンロードし、 `release` フォルダ内の
`growthbeat-x.x.x.jar` (x.x.xはバージョン番号) を、 `Assets/Plugins/Android/` にコピーしてください。

#### パーミッションの設定

※ AndroidManifestの設定は、Unityプロジェクト内で設定するか、Androidプロジェクトの吐き出し後に設定してください。

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

#### Growthbeatの設定

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

**iOSデバイストークン取得**

iOSの場合、デバイストークンがNotificationServicesから戻ってきますので、UpdateにてSetDeviceTokenを実装し、登録処理を流します。

```cs
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

**Androidデバイストークン取得**

初期化の処理の後に、必ず実行してください。

```cs
string devicetoken = GrowthPush.GetInstance ().GetDeviceToken ();
Log.Debug(devicetoken);
```

## タグ・イベントを送信する。

セグメント配信を利用する際に、実装が必要となります。

[配信したいセグメント](/manual/growthpush/#セグメントの作成)に沿って、タグやイベントの紐付けを行ってください。

### タグ送信

```cs
GrowthPush.GetInstance().SetTag("TagName", "TagValue");
```

[setTagメソッドについて](/sdk/unity/reference/#タグの送信-push専用)

### イベント送信

```cs
GrowthPush.GetInstance().TrackEvent("EventName");
```

[trackEventメソッドについて](/sdk/unity/reference/#イベントの送信-push専用)


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
IntentHandler.GetInstance ().AddCustomIntentHandler ("GrowthbeatComponent", "HandleCustomIntent");
GrowthLink.GetInstance().Initialize (applicationId, credentialId);
```

## ディープリンクアクションの設定
クリックしたリンクに付与されたデータがGrowthbeatComponentのHandleCustomIntentに渡ってきます。
ここにページ遷移やAPI利用などの処理を実装してください。

```
void HandleCustomIntent(string extra) {
		Debug.Log("Enter HandleCustomIntent");
		Debug.Log(extra);
}
```
## OS別設定

### iOS設定

共通初期設定に追加で、

* GrowthLink.frameworkのインポート
* SafariServices.frameworkのインポート

が必要です。

**URLスキームの設定**

Xcodeプロジェクトを開き、 `Info -> URL Types -> URL Schemes` の中に、アプリのカスタムURLスキームを記述します。

<img src="/img/sdk/iOS/url-scheme.png" alt="url-scheme" title="url-scheme" width="100%"/>

**バージョンの設定**

`General -> Identity -> Version`　が空欄であると正常に動作しません。
正しいバージョンを指定してください。

**iOS9.x系対応**

iOS9.x系に対応するには、Universal Linksに対応させる必要があります。
設定方法については以下のリンクを参考にしてください。
なお、Appdelegate.m に書いていただくコードは、UnityAppController.mm 内に書くようにしてください。

[iOS9.x系対応](/sdk/ios/guide/#universal-links用の設定-ios9-x系)


### Android設定

**カスタムスキームの設定**

AndroidManifestのアクティビティーに `<intent-filter>` を追加します。

外部からの遷移時、開くActivityにカスタムURLスキームを記述します。


```xml
<activity
    android:name=".UnityPlayerActivity"
    android:label="@string/app_name" >

    <!-- 略 -->

    <intent-filter>
    	<data android:scheme="CUSTOM_URL_SCHEME" />
    	<category android:name="android.intent.category.DEFAULT" />
    	<category android:name="android.intent.category.BROWSABLE" />
        <action android:name="android.intent.action.VIEW" />
    </intent-filter>

    <!-- 略 -->

</activity>
```

**InstallReferrerReceiverの追加**

AndroidManifestの`<application/>`内に以下のコードを追加してください

```xml
<receiver
    android:name="com.growthbeat.link.InstallReferrerReceiver"
    android:enabled="true"
    android:exported="true" >
    <intent-filter>
        <action android:name="com.android.vending.INSTALL_REFERRER" />
    </intent-filter>
</receiver>
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

## 注意点

これまでGrowth Pushでご利用いただいた、ApplicationIdは数値型、シークレットキーは文字列になっています。

|項目|型|
|---|--|
|applicationId|数値型|
|secret|文字列型/32文字|

Growthbeat SDKで利用するものは、applicationId、credentialIdともに文字列型になっています。

|項目|型|
|---|--|
|applicationId|文字列型/16文字|
|credentailId|文字列型/32文字|

Growthbeat SDK乗り換え時に、これまでGrowth Pushで利用していたシークレットキーを設定しても、正しく動作しませんのでご注意くださいませ。

必ず、SDKキーをご利用ください。

## 実装方法

### SDKの初期化

Growthbeat SDKでは、iOSのデバイストークン取得部分をUnity上に記述する必要があります。

Growtbeat SDKでは、シングルトンインスタンスの設計に変更したため、これまでの実装部分を変更していただく必要がございます。

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

#if UNITY_IPHONE
using NotificationServices = UnityEngine.iOS.NotificationServices;
#endif

public class YourGameObjectComponent : MonoBehaviour
{

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

### AndroidManifest.xml

Growthbeat SDKでは、 `com.growthpush.BroadcastReceiver`が廃止になりましたので、変更が必要となります。

この変更を行わないと、正しくプッシュ通知が送信できなくなりますので、ご注意ください。

- GrowthPush SDK

```xml
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

- Growthbeat SDK

```xml
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
```


# 備考

実装サンプルは、[GitHubレポジトリ](https://github.com/growthbeat/growthbeat-unity)を参考にしてください。

ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/)を閲覧してください。
