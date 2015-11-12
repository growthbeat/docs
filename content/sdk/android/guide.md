---
categories: 'sdk'
date: 2015-09-27T23:50:00+09:00
description: 'Growthbeat Android の導入方法について説明します'
draft: false
title: Growthbeat Android Gudeliene
---

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
    compile 'com.growthbeat:growthbeat-android:1.2.4@aar'
}
```

### 手動でSDKを配置して導入する場合

[最新版Android SDK ダウンロードリンク](http://support.growthbeat.com/sdk/)

上記リンクからダウンロードしたjarファイルをプロジェクトへ組み込みます。任意のアプリのプロジェクトに, Androidが他ライブラリを自動で参照する**libs**ディレクトリの中に、jarファイルを移動もしくはコピーしてください。

## Google Play Servicesの導入

AndroidManifest.xmlの`<application>`内に以下を追加

```xml
<meta-data
    android:name="com.google.android.gms.version"
    android:value="@integer/google_play_services_version" />
```

### GradleでSDKを導入した場合

build.gradleに下記を追加してください。バージョンはAndroidのデベロッパーサイトで確認するようにしてください。

```
dependencies {
    compile 'com.google.android.gms:play-services:8.1.0'
}
```

### 手動でSDKを導入した場合

ライブラリプロジェクトとして、google_play_service_libをビルドパスに設定してください。

## Growthbeatの初期化

Growthbeatへデバイス登録・認証を行います。初期化の中に、端末の基本情報の送信、広告IDの取得が行われます。

```java
Growthbeat.getInstance().initialize(context, "YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID");
```

# Push通知（Grwoth Push）

Growth Push管理画面の証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[Android SenderId, APIキー取得方法](http://growthbeat.helpscoutdocs.com/article/23-gcm-api)

## AndroidManifest.xmlの設定（Push）

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

## RegistrationIdの取得・送信

Growthbeat#initialize()の後に下記を呼び出します。

```
GrowthPush.getInstance().requestRegistrationId("YOUR_SENDER_ID", BuildConfig.DEBUG ? Environment.development : Environment.production);
```

* YOUR_SENDER_IDは、AndroidのSenderId

# 分析（Growth Anlytics）

あらかじめ特定のタグやイベントを送信するためのメソッドを用意しております。
[Growthbeatの初期化](#growthbeatの初期化) の時点で下記データがGrowth Anlyticsに送信されます。
デフォルトで用意のあるタグ・イベント一覧は <a href="/sdk/ios/reference/">APIリファレンス</a> を参照してください。

* デバイスモデル
* OS
* 言語
* タイムゾーン
* UTCとタイムゾーンの差分

## タグ（ユーザー属性）の送信

**タグとは**

ユーザーの属性を示す情報の送信をします。一般的には ユーザーID/性別/年齢 等の情報を送信します。

```java
GrowthAnalytics.getInstance().tag("CUSTOM_TAG_ID");
```

詳しくは、<a href="/sdk/android/reference/">APIリファレンス</a>を参照してください。

## イベント（行動ログ）の送信

**イベントとは？**

ユーザーの行動ログを示す情報の送信をします。一般的には 起動/ログイン/課金 等の情報を送信します。

```java
GrowthAnalytics.getInstance().track("CUSTOM_EVENT_ID");
```

詳しくは、<a href="/sdk/android/reference/">APIリファレンス</a>を参照してください。

# アプリ内メッセージ（Growth Message）

## AndroidManifest.xmlの設定（Message）

`<application>` タグ内に下記を追加してください。

```xml
<activity
	android:name="com.growthbeat.message.view.MessageActivity"
	android:theme="@android:style/Theme.Translucent" />
```

## メッセージを表示する

メッセージを表示したい場所にGrowth Analyticsのイベントを設定してください。

```java
GrowthAnalytics.getInstance().track("CUSTOM_EVENT_ID");
```

詳しくは、<a href="/sdk/android/reference/">APIリファレンス</a>を参照してください。

# ディープリンク（Growth Link）

## AndroidManifest.xmlの設定（Link）

`<application>` タグ内に下記を追加してください。

```xml
<receiver
	    android:name="com.growthbeat.link.InstallReferrerReceiver"
	    android:enabled="true"
	    android:exported="true">
	    <intent-filter>
	        <action android:name="com.android.vending.INSTALL_REFERRER" />
	    </intent-filter>
</receiver>
```

また、カスタムURLスキームでアプリを起動できるように、AndroidManifest.xmlを設定してください。

## ディープリンク用初期化処理

Growthbeatの初期化処理の後に、Growth Linkの初期化処理を呼び出す

```java
GrowthLink.getInstance().initialize(getApplicationContext(), "YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID");
```

IntentFilterを設定したActivityのonCreateで、handleOpenUrlメソッドを呼び出す

```java
GrowthLink.getInstance().handleOpenUrl(getIntent().getData());
```

## ディープリンクアクションの実装

SDKには、IntentHandler (iOSでは、GBIntentHandler)というインタフェースが定義されており、この実装でディープリンク時のアクションを実装することができます。

たとえば下記のような形で実装できます。

```java
List<IntentHandler> intentHandlers = new ArrayList<IntentHandler>();
intentHandlers.add(new UrlIntentHandler(GrowthbeatCore.getInstance().getContext()));
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
GrowthbeatCore.getInstance().setIntentHandlers(intentHandlers);
```

# 備考

ご不明な点などございます場合は、[ヘルプページ](http://growthbeat.helpscoutdocs.com/)を閲覧してください。
