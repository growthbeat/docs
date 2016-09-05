---
categories: 'sdk'
date: 2016-06-29T23:50:00+09:00
description: 'Growthbeat Android の導入方法について説明します'
draft: false
title: Growthbeat Android Gudeliene
---

# SDKの乗り換えについて

Growth Push SDK及びGrowthbeat SDK 1.xのサポートは、2016年12月21日までとなっております。

最新のSDKにお乗り換えする方法についてご紹介いたします。

# Growthbeat SDK 1.xからの変更点

## 機能削除

- インターフェスの変更があります。
 - 次の実装変更点でご確認ください。

- GrowthAnalyticsクラスがなくなりました。
 - 2.x以降は、GrowthPush#setTag, trackEventをご利用ください。

- GrowthbeatCoreクラスが、Growthbeatクラスに統合されました。
 - start, stop, initializeは削除されました。

## 実装変更点

### 初期化

- Growthbeat 1.x

```java
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);

    //...

    Growthbeat.getInstance().initialize(this, "YOUR_APPLICATION_ID", "CREDENTIAL_ID");
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
    Growthbeat.getInstance().initialize(this, "YOUR_APPLICATION_ID", "CREDENTIAL_ID", BuildConfig.DEBUG ? Environment.development : Environment.production);
	GrowthPush.getInstance().requestRegistrationId("YOUR_SENDER_ID");
    new Thread(new Runnable() {
        @Override
        public void run() {
            Client client = Growthbeat.getInstance().waitClient();
            Log.d("GrowthbeatSample", String.format("clientId is %s", client.getId()));
        }
    }).start();

}

protected void onDestroy() {
    super.onDestroy();
}
```

# Growth Push SDKからの乗り換え方法について

## 前準備
GrowthPushのApplicationIdから、GrowthbeatのApplicationIdに移行されるた
め、[Growthbeat](https://growthbeat.com/)にアクセスして、ApplicationId、SDKキー（CredentialID）を確認します。

ApplicationIdについては、Growth　Pushの左メニュー、シークレットキーのgrowthbeatApplicationIdという項目の左の文字列をご利用ください。

SDKキーに関しては、Growthbeatマイページにてご確認ください。

## 注意点

これまでGrowth Pushでご利用いただいた、ApplicationIdは数値型、シークレットキーは文字列になっています。

|項目|型|
|---|---|
|applicationId|数値型|
|secret|文字列型/32文字|

Growthbeat SDKで利用するものは、applicationId、credentialIdともに文字列型になっています。

|項目|型|
|---|---|
|applicationId|文字列型/16文字|
|credentailId|文字列型/32文字|

Growthbeat SDK乗り換え時に、これまでGrowth Pushで利用していたシークレットキーを設定しても、正しく動作しませんのでご注意くださいませ。

必ず、SDKキーをご利用ください。

## 実装方法

### SDKの初期化

- GrowthPush SDK

```java
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);

	GrowthPush.getInstance().initialize(this, YOUR_APPLICATION_ID, "APPLICATION_SECRET", BuildConfig.DEBUG ? Environment.development : Environment.production, true).register("YOUR_SENDER_ID");
	GrowthPush.getInstance().trackEvent("Launch");
	GrowthPush.getInstance().setDeviceTags();
}
```

- Growthbeat SDK

```java
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);
	// Growthbeat SDKの初期化
	Growthbeat.getInstance().initialize(this, "YOUR_APPLICATION_ID", "CREDENTIAL_ID", BuildConfig.DEBUG ? Environment.development : Environment.production);
	// Registration IDを明示的に要求
	GrowthPush.getInstance().requestRegistrationId("YOUR_SENDER_ID");
	// Launchイベントの取得
	GrowthPush.getInstance().trackEvent("Launch");
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
