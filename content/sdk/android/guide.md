---
categories: 'sdk'
date: 2016-06-29T23:50:00+09:00
description: 'Growthbeat Android の導入方法について説明します'
draft: false
title: Growthbeat Android Gudeliene
---

Version 2.0.4

# SDK概要

Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。

本ガイドでは、Push通知機能のみを利用する場合の導入方法についてご紹介します。

※ [全機能を利用する場合はこちら](/sdk/android/all-in-one)

# SDK初期設定

## SDK導入

### Gradleを使用して導入する場合

build.gradleに下記を追加してください。

```
repositories {
    jcenter()
}

dependencies {
    compile 'com.growthbeat:growthbeat-android:2.0.4@aar'
}
```

### 手動でSDKを配置して導入する場合

[最新版Android SDK ダウンロードページ](http://support.growthbeat.com/sdk/)

上記リンクからダウンロードしたjarファイルをプロジェクトへ組み込みます。任意のアプリのプロジェクトに, Androidが他ライブラリを自動で参照する**libs**ディレクトリの中に、jarファイルを移動もしくはコピーしてください。

## Google Play Servicesの導入

* [Google公式ドキュメント](https://developers.google.com/android/guides/setup?hl=ja#add_google_play_services_to_your_project)

### 動作バージョン

Google Play Services v8.3以上が必要となります。

Growthbeat SDKでは、Google Play Services v8.3以上でないと、正しく動作いたしません。

#### Gradle、Android StudioでSDKを導入した場合

build.gradleに下記を追加してください。バージョンはAndroidのデベロッパーサイトで確認するようにしてください。

```
dependencies {
    compile 'com.google.android.gms:play-services:9.2.1'
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
        <intent-filter>
            <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
            <category android:name="YOUR_PACKAGE_NAME" />
        </intent-filter>
    </receiver>

</application>
```

* YOUR_PACKAGE_NAMEは、実装するアプリのパッケージ名に変更してください。

AndroidManifest.xmlのサンプルは、[サンプルコード](https://github.com/growthbeat/growthbeat-android/blob/master/sample/src/main/AndroidManifest.xml)を参考にしてください。


## 実装コード

### 初期化

GrowthbeatおよびGrowthPushの初期化を行います。初期化の中に、端末の基本情報の送信、広告IDの取得が行われます。

```java
GrowthPush.getInstance().initialize(context, "YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID", BuildConfig.DEBUG ? Environment.development : Environment.production);
```

### デバイストークンを取得・送信をする

Growthbeatの初期化後に下記を呼び出して、デバイストークンの取得を行います。

```java
GrowthPush.getInstance().requestRegistrationId("YOUR_SENDER_ID");
```

登録されたデバイスは管理画面のデバイスページにて確認することができます。下記のように、デバイスのステータスがアクティブ（Active）で登録されていれば正常です。

<img src="/img/push/push_device_list.png" alt="push_device_list" title="push-device-list" width="100%"/>

* YOUR_SENDER_IDは、AndroidのSenderId

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

# 管理画面設定

## プッシュ通知

Growth Push管理画面の証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[Android SenderId, APIキー取得方法](http://growthbeat.helpscoutdocs.com/article/23-gcm-api)

## セグメントについて

セグメント配信を利用する際に、実装が必要となります。

[配信したいセグメント](/manual/growthpush/#セグメントの作成)に沿って、タグやイベントの紐付けを行ってください。

# 最新版のSDKへの乗り換え方法

[SDKの乗り換え方法](/sdk/android/migrate)をご参照ください。

# 備考

実装サンプルは、[GitHubレポジトリ](https://github.com/growthbeat/growthbeat-android)を参考にしてください。

ご不明な点などございます場合は、[ヘルプページ](http://growthbeat.helpscoutdocs.com/)を閲覧してください。
