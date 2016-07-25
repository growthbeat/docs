---
categories: 'sdk'
date: 2016-06-29T23:50:00+09:00
description: 'Growthbeat Android の導入方法について説明します'
draft: false
title: Growthbeat Android Gudeliene
---

Version 2.0.2

# 共通初期設定

## SDK導入

Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。

### Gradleを使用して導入する場合

build.gradleに下記を追加してください。

```
repositories {
    jcenter()
}

dependencies {
    compile 'com.growthbeat:growthbeat-android:2.0.2@aar'
}
```

### 手動でSDKを配置して導入する場合

[最新版Android SDK ダウンロードページ](http://support.growthbeat.com/sdk/)

上記リンクからダウンロードしたjarファイルをプロジェクトへ組み込みます。任意のアプリのプロジェクトに, Androidが他ライブラリを自動で参照する**libs**ディレクトリの中に、jarファイルを移動もしくはコピーしてください。

## Google Play Servicesの導入

* [Google公式ドキュメント](https://developers.google.com/android/guides/setup?hl=ja#add_google_play_services_to_your_project)

### 動作バージョン

Google Play Servicesのバージョン23以上が必要となります。

Growthbeat SDKでは、Google Play Servicesのバージョン23以上でないと、正しく動作いたしません。

### 導入設定

AndroidManifest.xmlの`<application>`内に以下を追加

```xml
<meta-data
    android:name="com.google.android.gms.version"
    android:value="@integer/google_play_services_version" />
```

#### Gradle、Android StudioでSDKを導入した場合

build.gradleに下記を追加してください。バージョンはAndroidのデベロッパーサイトで確認するようにしてください。

```
dependencies {
    compile 'com.google.android.gms:play-services:8.3.0'
}
```

#### EclipseでSDKを導入した場合

ライブラリプロジェクトとして、google_play_service_libをビルドパスに設定してください。

ライブラリプロジェクトの設定方法は、Google公式ドキュメントの「Eclipse With ADT」のメニューを参考にしてください。

## AndroidManifest.xmlの設定

### パーミッションの設定

* Google play Servicesの設定項目

```xml
<meta-data
    android:name="com.google.android.gms.version"
    android:value="@integer/google_play_services_version" />
```

必要なパーミンションは下記になります。

```xml
<uses-permission android:name="android.permission.INTERNET" />

<!-- for Growth Push -->
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE" />
<permission
    android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE"
    android:protectionLevel="signature" />

```

### Growthbeatの設定

`<application>`タグ内に下記を追加してください。

```xml

<!-- for Growth Push -->
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

AndroidManifest.xmlのサンプルは、[サンプルコード](https://github.com/growthbeat/growthbeat-android/blob/master/sample/src/main/AndroidManifest.xml)を参考にしてください。


## 初期化

GrowthbeatおよびGrowthPushの初期化を行います。初期化の中に、端末の基本情報の送信、広告IDの取得が行われます。

```java
GrowthPush.getInstance().initialize(context, "YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID", BuildConfig.DEBUG ? Environment.development : Environment.production);
```
# プッシュ通知

Growth Push管理画面の証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[Android SenderId, APIキー取得方法](http://growthbeat.helpscoutdocs.com/article/23-gcm-api)

## デバイストークンを取得・送信をする

Growthbeatの初期化後に下記を呼び出して、デバイストークンの取得を行います。

```java
GrowthPush.getInstance().requestRegistrationId("YOUR_SENDER_ID");
```

登録されたデバイスは管理画面のデバイスページにて確認することができます。下記のように、デバイスのステータスがアクティブ（Active）で登録されていれば正常です。

<img src="/img/push/push_device_list.png" alt="push_device_list" title="push-device-list" width="100%"/>

* YOUR_SENDER_IDは、AndroidのSenderId

## タグ・イベントを送信する。

セグメント配信を利用する際に、実装が必要となります。

[配信したいセグメント](/manual/growthpush/#セグメントの作成)に沿って、タグやイベントの紐付けを行ってください。

### タグ送信

```java
GrowthPush.getInstance().setTag("TagName", "TagValue");
```

[setTagメソッドについて](/sdk/android/reference/#タグの送信)

### イベント送信

```java
GrowthPush.getInstance().trackEvent("EventName");
```

[trackEventメソッドについて](/sdk/android/reference/#イベントの送信)


# アプリ内メッセージ

## メッセージを作成する

ここではアプリの起動時にメッセージを出す方法を説明します（共通初期設定でアプリの起動イベントを送信している必要があります）。

まず、管理画面にてアプリ起動時に配信されるメッセージを作成します。メッセージの作成方法は[こちら](/manual/growthmessage/#配信作成)を参考にしてください。

アプリ起動以外にも、カスタムイベントをメッセージ配信のトリガーにすることにより、アプリの任意の場所でメッセージを配信することができます。詳しくは、[こちら](/sdk/android/reference/#カスタムイベント送信)をご参照ください。

## メッセージを表示する

Growth Pushのイベント送信と連動して、メッセージを受信します。

イベント名に紐付いたメッセージを作成するだけで、メッセージ表示することはできます。デフォルトでは、メッセージ受信時に即時に表示します。

`ShowMessageHandler` を利用することで、表示準備が完了したときに、メッセージ表示をすることができます。

例.) 起動時に、メッセージを表示する場合

```java
GrowthPush.getInstance().trackEvent("Launch", null, new ShowMessageHandler() {

	@Override
	public void complete(MessageRenderHandler renderHandler) {
        // 画面の表示
		renderHandler.render();
	}

	@Override
	public void error(String error) {
        // errorはエラーメッセージが返ります。
	}
});
```

# ディープリンク

## GrowthLink用設定

Growthbeatの初期化処理の後に、Growth Linkの初期化処理を追加してください。

```java
GrowthLink.getInstance().initialize(getApplicationContext(), "YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID");
```

IntentFilterを設定したActivityのonCreateで、handleOpenUrlメソッドを呼び出してください。

```java
GrowthLink.getInstance().handleOpenUrl(getIntent().getData());
```

**カスタムスキームの設定**

AndroidManifestのアクティビティーに `<intent-filter>` を追加します。

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


## ディープリンクアクションの実装

SDKには、IntentHandler (iOSでは、GBIntentHandler)というインタフェースが定義されており、この実装でディープリンク時のアクションを実装することができます。

たとえば下記のような形で実装できます。

```java
List<IntentHandler> intentHandlers = new ArrayList<IntentHandler>();
intentHandlers.add(new UrlIntentHandler(Growthbeat.getInstance().getContext()));
intentHandlers.add(new NoopIntentHandler());
intentHandlers.add(new IntentHandler() {
    public boolean handle(com.growthbeat.model.Intent intent) {
        if (intent.getType() != com.growthbeat.model.Intent.Type.custom)
            return false;
        Map<String, String> extra = ((CustomIntent) intent).getExtra();
        // TODO ここにアプリ内の画面を開く処理を実装します。
        Log.d("Growth Link", "extra: " + extra);
        return true;
    }
});
Growthbeat.getInstance().setIntentHandlers(intentHandlers);
```

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

# 備考

実装サンプルは、[GitHubレポジトリ](https://github.com/growthbeat/growthbeat-android)を参考にしてください。

ご不明な点などございます場合は、[ヘルプページ](http://growthbeat.helpscoutdocs.com/)を閲覧してください。
