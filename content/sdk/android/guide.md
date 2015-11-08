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

[最新版Android SDK ダウンロードリンク](https://bintray.com/artifact/download/growthbeat/maven/com/growthbeat/growthbeat-android/1.2.4/growthbeat-android-1.2.4.jar)

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

Growth Push SDKからの乗り換え案内も出す。

```java
Growthbeat.getInstance().initialize(context, "YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID");
```

# Push通知（Grwoth Push）

Growth Push管理画面の証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[Android SenderId, APIキー取得方法](http://growthhack.sirok.co.jp/growthpush/gcm-api/)

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

- デフォルトで用意しているメソッドの説明（APIリファレンスへのリンク）
- タグとイベントの簡単な説明

## タグ（ユーザー属性）の送信

```java
GrowthAnalytics.getInstance().tag("CUSTOM_TAG_ID");
```

詳しくは、APIリファレンス

## イベント（行動ログ）の送信

```java
GrowthAnalytics.getInstance().track("CUSTOM_EVENT_ID");
```

詳しくは、APIリファレンス

# アプリ内メッセージ（Growth Message）

## AndroidManifest.xmlの設定（Message）

`<application>` タグ内に下記を追加してください。

```xml
<activity
	android:name="com.growthbeat.message.view.MessageActivity"
	android:theme="@android:style/Theme.Translucent" />
```

## メッセージを表示する

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
