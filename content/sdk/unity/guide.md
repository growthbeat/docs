---
categories: 'sdk'
date: 2017-01-06T12:00:00+09:00
description: 'Growthbeat Unity の導入方法について説明します'
draft: false
title: Growthbeat Unity SDK | 基本導入ガイド
---
Version 2.0.4  

# SDK概要  
Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。本ガイドでは、Push通知機能のみを利用する場合の導入方法についてご紹介します。  
## 動作環境  
動作推奨環境: Unity 5以上  
※ Unityプラットフォームがサポートしていないバージョンについては、本SDKもサポート対象外となります。  
# 1. プロジェクト設定  
<a href="/sdk">最新版Unity SDK ダウンロードページ</a>  
ダウンロードしたファイルを解凍し、そのフォルダの中の **growthbeat.unitypackage** をプロジェクトへ組み込みます。  
メニューから、`Assets -> Import Package -> Custom Package...` を選択し、でダウンロードした UnityPackge をインポートしてください。  
# 2. iOS の初期設定  
Growthbeat.framework は、下記 Framework が必須となります。  

- Foundation.framework
- UIKit.framework
- CoreGraphics.framework
- SystemConfiguration.framework
- AdSupport.framework
- CFNetwork.framework

# 3. Android の初期設定  
Growthbeat SDKを利用するには、依存ライブラリが必要となります。  

- appcompat-v7もしくはandroid-support-v4
- google-play-services-gcm
- google-play-services-ads   


## SDKおよびライブラリの導入
growthbeat-x.x.x.jar をインポートする必要がございます。  
[最新版Android SDK ダウンロードページ](../../sdk)  
上記ページより最新版SDKをダウンロードし、`release`フォルダ内の`growthbeat-x.x.x.jar`(x.x.xはバージョン番号) を、 `Assets/Plugins/Android/` にコピーしてください。  

Growthbeat Android SDKをインポート後、依存ライブラリをGoogle社の提供する  
[unity-jar-resolver](https://github.com/googlesamples/unity-jar-resolver)  
を使用して解決します。  
詳しくは、[unity-jar-resolverを使用した依存ライブラリの解決](http://faq.growthbeat.com/article/216-unity-jar-resolver)をご覧ください。  
## AndroidManifest.xml の設定  
Unityプロジェクト内で設定するか、Androidプロジェクトの吐き出し後に設定してください。  

```xml
<meta-data
    android:name="com.google.android.gms.version"
    android:value="@integer/google_play_services_version" />
```

### 必要な記述  
レジストレーションIDを取得するため、またプッシュ通知を受信するために AndroidManifest.xml に必要なクラスを記述します。  
YOUR_PACKAGE_NAME は、実装するアプリのパッケージ名に変更してください。  

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE" />
<permission
    android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE"
    android:protectionLevel="signature" />

<application>
    <!-- ... -->

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
    </receiver>

</application>
```

# 4. 実装コード
## 初期化
YOUR_APPLICATION_ID, YOUR_CREDENTIAL_IDは、Growth Push管理画面から確認することができます。YOUR_SENDER_IDは、Firebase Consoleから取得する必要があります。  
各種IDの取得方法は [Growthbeatで使用するID、キーまとめ](http://faq.growthbeat.com/article/130-growthbeat-id) をご参照ください。  
Androidは、RequestDeviceTokenを行うことで、自動的にGrowth Pushへデバイストークンが登録されます。  
iOSは、OSからの取得後、SetDeviceTokenを行うことで、Growth Pushへデバイストークンの登録をすることができます。iOSのみを利用する場合は、RequestDeviceTokenに渡す文字列は、NULLにしてください。  

```csharp
using UnityEngine;
public class GrowthbeatSampleComponent : MonoBehaviour
{
    void Awake ()
    {
      GrowthPush.GetInstance().Initialize("YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID", Debug.isDebugBuild ? GrowthPush.Environment.Development : GrowthPush.Environment.Production);
      // Android のデバイストークン取得（必ず initialize 後に呼び出してください）
      GrowthPush.GetInstance ().RequestDeviceToken ("YOUR_SENDER_ID");
    }

    // iOS のデバイストークン取得
    // デバイストークンが NotificationServices から戻ってくるため Update にて SetDeviceToken を実装
    bool tokenSent = false;

    void Update ()
    {
    #if UNITY_IPHONE
      if (!tokenSent) {
        byte[] token = UnityEngine.iOS.NotificationServices.deviceToken;
        if (token != null) {
          GrowthPush.GetInstance ().SetDeviceToken(System.BitConverter.ToString(token).Replace("-", "").ToLower());
          tokenSent = true;
        }
      }
    #endif
    }
}
```

## タグ送信  
セグメントを設定するために、任意のタグを埋め込んでください。  

```csharp
using UnityEngine;
public class GrowthbeatSampleComponent : MonoBehaviour
{
    void Awake() {
        GrowthPush.GetInstance().SetTag("Development", "true");
    }
}
```

## イベント送信  
セグメントを設定するために、任意のイベントを埋め込んでください。

```csharp
using UnityEngine;
public class GrowthbeatSampleComponent : MonoBehaviour
{
    void Awake() {
        GrowthPush.GetInstance().TrackEvent("Launch");
    }
}
```

# その他設定について  
## iOS  
### 証明書について  
開発ビルドと、リリースビルドの証明書を作成する必要があります。[iOS プッシュ通知証明書作成方法](http://faq.growthbeat.com/article/178-ios-p12)を参考に、証明書の作成を行ってください。  
## Android  
### 証明書について  
SenderIdは、RequestDeviceToken を実行するために必要となります。APIキーは、管理画面にて、プッシュ通知を送信するための証明書として必要になります。[Android SenderId, APIキー取得方法](http://growthbeat.helpscoutdocs.com/article/23-gcm-api)  を参考に、証明書の作成を行ってください。  
### デバイストークンの確認  
下記コードでデバイストークンが正常に取得できているか確認することができます。  

```csharp
using UnityEngine;
public class GrowthbeatSampleComponent : MonoBehaviour
{
    void Awake() {
        GrowthPush.GetInstance().Initialize("YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID", Debug.isDebugBuild ? GrowthPush.Environment.Development : GrowthPush.Environment.Production);
        GrowthPush.GetInstance ().RequestDeviceToken ("YOUR_SENDER_ID");

        // 必ず RequestDeviceToken 後に呼び出してください
        string devicetoken = GrowthPush.GetInstance().GetDeviceToken();
        Debug.Log(devicetoken);
    }
}
```

## 管理画面設定  
### プッシュ通知証明書の設定  
Growth Push管理画面の証明書設定ページにて、証明書の設定を行ってください。  
[プッシュ通知証明書の設定方法](/manual/growthpush/#プッシュ通知証明書の登録-更新)  
### プッシュ通知の作成  
[配信作成](/manual/growthpush/#配信作成)を参考に、プッシュ通知が届くかを確認します。  
### セグメントについて  
セグメント配信を利用する際に、実装が必要となります。  
[配信したいセグメント](/manual/growthpush/#セグメントの作成)に沿って、タグやイベントの紐付けを行ってください。  
# 備考  
## 全機能を利用する方法  
Growthbeatは、プッシュ通知以外に、ポップアップメッセージ機能を用意しております。追加の実装を行うことで機能を利用することができます。  
詳しくは、[全機能導入ガイド](/sdk/unity/all-in-one)をご覧ください。  
## 最新版のSDKへのアップグレード方法  
Growth Push SDKからGrowthbeat 2.x SDK へまたは、Growthbeat 1.x SDKからGrowthbeat 2.x SDKへのアップグレードをされる方は
[SDKのアップグレードガイド](/sdk/unity/upgrade)をご参照ください。  
## サンプルコード  
実装サンプルは、[Githubレポジトリ](https://github.com/growthbeat/growthbeat-unity)を参考にしてください。  
# お問い合わせ  
ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/)を閲覧してください。  
