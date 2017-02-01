---
categories: 'sdk'
date: 2016-09-28T12:00:00+09:00
description: 'Growthbeat SDK for Android 新バージョンアップデート方法についてご紹介します'
draft: false
title: Growthbeat SDK | 新バージョンアップデート方法
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

- GrowthPush SDK  

```java
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);

	GrowthPush.getInstance().initialize(getApplicationContext(), YOUR_APPLICATION_ID, "APPLICATION_SECRET", BuildConfig.DEBUG ? Environment.development : Environment.production, true).register("YOUR_SENDER_ID");
	GrowthPush.getInstance().trackEvent("Launch");
	GrowthPush.getInstance().setDeviceTags();
}
```

- Growthbeat SDK 2.x

```java
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);
	// GrowthPushの初期化
	GrowthPush.getInstance().initialize(getApplicationContext(), "YOUR_APPLICATION_ID", "CREDENTIAL_ID", BuildConfig.DEBUG ? Environment.development : Environment.production);
	
	// 以下は、必ずinitialize後に呼び出してください
	// Registration IDを明示的に要求
	GrowthPush.getInstance().requestRegistrationId("YOUR_SENDER_ID");
	// Launchイベントの取得
	GrowthPush.getInstance().trackEvent("Launch");
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

```java
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);

    //...

    Growthbeat.getInstance().initialize(getApplicationContext(), "YOUR_APPLICATION_ID", "CREDENTIAL_ID");
    GrowthPush.getInstance().requestRegistrationId("YOUR_SENDER_ID", BuildConfig.DEBUG ? Environment.development : Environment.production);
    Growthbeat.getInstance().getClient(new Growthbeat.ClientCallback() {
            @Override
            public void callback(Client client) {
                Log.d("GrowthbeatSample", String.format("clientId is %s", client.getId()));
            }
        });
    Growthbeat.getInstance().start();

}

protected void onStop() {
    super.onStop();
    Growthbeat.getInstance().stop();
}
```  

- Growthbeat 2.x  

```java
protected void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);

    //...
    GrowthPush.getInstance().initialize(getApplicationContext(), "YOUR_APPLICATION_ID", "CREDENTIAL_ID", BuildConfig.DEBUG ? Environment.development : Environment.production);
    
    // 以下は、必ずinitialize後に呼び出してください
    GrowthPush.getInstance().requestRegistrationId("YOUR_SENDER_ID");
    new Thread(new Runnable() {
        @Override
        public void run() {
            Client client = Growthbeat.getInstance().waitClient();
            Log.d("GrowthbeatSample", String.format("clientId is %s", client.getId()));
        }
    }).start();

}

protected void onStop() {
    super.onStop();
}
```  

# 移行確認方法
Growth Push の管理画面で、該当デバイスのプッシュ通知ステータスが `Active` になっていれば、正しくプッシュ通知が行えます。  
移行対応は、以上となります。  
