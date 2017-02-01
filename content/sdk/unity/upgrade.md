---
categories: 'sdk'
date: 2017-01-06T12:00:00+09:00
description: 'Growthbeat SDK for Unity 新バージョンアップデート方法についてご紹介します'
draft: false
title: Growthbeat Unity SDK | 新バージョンアップデート方法
---

**Growth Push SDK及びGrowthbeat SDK 1.xのサポートは、2016年12月21日までとなっております。**  
# SDKアップグレードガイド  
最新のSDKにお乗り換えする方法についてご紹介いたします。  

- Growth Push SDKから最新のGrowthbeat SDKへのアップグレード
- Growthbeat 1.x SDKから最新のGrowthbeat SDKへのアップグレード

についてご紹介いたします。  
# Growth Push SDKからのアップグレードについて
## 概要
Growth Push の認証から、Growthbeat の認証に移行されるため、新しい ApplicationId と SDKキー（クレデンシャルID）を取得する必要がございます。 

ApplicationId は、Growth Push管理画面左メニュー「アプリ詳細」の 「Growthbeat アプリケーションID」 にて確認ができます。

SDKキーは、Growthbeat管理画面左メニュー「[アカウント](https://growthbeat.com/mypage/account)」の「クレデンシャルID > SDK」にて確認ができます。 
### 注意点  
これまでGrowth Pushでご利用いただいた、ApplicationIdは数値型、シークレットキーは文字列型になっています。  

|項目|型|
|---|---|
|applicationId|数値型|
|secret|文字列型/32文字|
Growthbeat SDKで利用するものは、applicationId、credentialIdともに文字列型になっています。  

|項目|型|
|---|---|
|applicationId|文字列型/16文字|
|credentailId|文字列型/32文字|
Growthbeat SDK 乗り換え時に、これまで Growth Push で利用していたシークレットキーを設定しても、正しく動作しませんのでご注意くださいませ。 必ず、SDKキーをご利用ください。 

## 導入コード
Growthbeat SDKでは、iOSのデバイストークン取得部分をUnity上に記述する必要があります。
Growtbeat SDKでは、シングルトンインスタンスの設計に変更したため、これまでの実装部分を変更していただく必要がございます。

- GrowthPush SDK  

```c#
void Awake () {
  GrowthPush.Initialize(YOUR_APPLICATION_ID, "APPLICATION_SECRET", GrowthPush.Environment.Development, true, "YOUR_SENDER_ID");
  GrowthPush.TrackEvent("Launch");
  GrowthPush.SetDeviceTags();
  GrowthPush.ClearBadge();
}
```

- Growthbeat SDK 2.x

```c#
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

## AndroidManifest.xml
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

- Growthbeat SDK 2.x  

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

# Growthbeat SDK 1.xからのアップグレード
## 機能削除  

- インターフェスの変更があります。
  - 次の実装変更点でご確認ください。
- Growth Analytics クラスがなくなりました。
  - Growth Analytics に関する記述は全て削除してください。
  - 2.x以降は、GrowthPush#setTag, trackEventをご利用ください。
- GrowthbeatCoreクラスが、Growthbeatクラスに統合されました。
  - start, stop, initializeは削除されました。

## 導入コード

- Growthbeat 1.x 

```c#
void Awake () {
    Growthbeat.GetInstance ().Initialize ("YOUR_APPLICATION_ID", "CREDENTIAL_ID");
    GrowthPush.GetInstance ().RequestDeviceToken ("YOUR_SENDER_ID", Debug.isDebugBuild ? GrowthPush.Environment.Development : GrowthPush.Environment.Production);
    Growthbeat.GetInstance ().Start ();
}

void OnDisable ()
{
    Growthbeat.GetInstance ().Stop ();
}
```

- Growthbeat 2.x 

```c#
void Awake () {
    GrowthPush.GetInstance ().Initialize ("YOUR_APPLICATION_ID", "CREDENTIAL_ID", Debug.isDebugBuild ? GrowthPush.Environment.Development : GrowthPush.Environment.Production);
    GrowthPush.GetInstance ().RequestDeviceToken ("YOUR_SENDER_ID");
}

void OnDisable ()
{

}
```

# 移行確認方法
Growth Push の管理画面で、該当デバイスのプッシュ通知ステータスが `Active` になっていれば、正しくプッシュ通知が行えます。  
移行対応は、以上となります。 