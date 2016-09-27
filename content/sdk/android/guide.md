---
categories: 'sdk'
date: 2016-06-29T23:50:00+09:00
description: 'Growthbeat Android の導入方法について説明します'
draft: false
title: Growthbeat Android Gudeliene
---
Version 2.0.4  
# SDK概要  
Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。本ガイドでは、Push通知機能のみを利用する場合の導入方法についてご紹介します。  
(※ Eclipseの導入は非推奨となっております。導入については、サポートまでご連絡ください。)  
# 1. Gradleの設定  
## aarを利用する場合  

build.gradle(Module:app)に下記を追加してください。  

```sh
repositories {
    jcenter()
}

dependencies {
    compile 'com.growthbeat:growthbeat-android:2.0.4@aar'
    compile 'com.android.support:appcompat-v7:23.+'
    compile 'com.google.android.gms:play-services:9.2.1'
}
```  
Growthbeat SDKを利用するには、依存ライブラリが必要となります。  

- appcompat-v7もしくはandroid-support-v4
- google-play-services  

**依存ライブラリの対応バージョン**  

|ライブラリ名|バージョン|
|---------|---------|
|appcompat-v7 or android-support-v4|23.0.0以上|
|google-play-services|8.3.0以上|

## jarを利用する場合  
ダウンロードしたzipファイルの、 `release` フォルダに、growthbeat-x.x.x.jarが格納されています。  
appディレクトリ配下の、 `libs`フォルダに、growthbeat-x.x.x.jarをコピーしてください。  
# 2. 実装コード
## Javaの実装  
### 初期化  
GrowthPushの初期化を行います。初期化の中に、端末の基本情報の送信、広告IDの取得が行われます。  
2行目は、デバイストークンの取得を行います。  

```java
class MyActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        GrowthPush.getInstance().initialize(context, "YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID", BuildConfig.DEBUG ? Environment.development : Environment.production);
        GrowthPush.getInstance().requestRegistrationId("YOUR_SENDER_ID");
    }
}
```  
登録されたデバイスは管理画面のデバイスページにて確認することができます。下記のように、デバイスのステータスがアクティブ（Active）で登録されていれば正常です。  
<img src="/img/push/push_device_list.png" alt="push_device_list" title="push-device-list" width="100%"/>  
**YOUR_SENDER_IDは、AndroidのSenderId**  
### タグ送信  
セグメントを設定するために、任意のタグを埋め込んでください。  
```java
class MyActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //...

        //開発者のタグ付け
        GrowthPush.getInstance().setTag("Development", "true");
    }
}
```  
### イベント送信  
セグメントを設定するために、任意のイベントを埋め込んでください。  
```java
class MyActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //...

        //アプリ起動イベントとする
        GrowthPush.getInstance().trackEvent("Launch");
    }
}
```  

# 3.AndroidManifest.xmlの設定  
## 必要な記述  

```xml
<meta-data
    android:name="com.google.android.gms.version"
    android:value="@integer/google_play_services_version" />

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

# 4.備考  
## 管理画面設定  
### プッシュ通知  
Growth Push管理画面の証明書設定ページにて、各OSごとに証明書の設定を行ってください。  
[Android SenderId, APIキー取得方法](http://growthbeat.helpscoutdocs.com/article/23-gcm-api)  
### セグメントについて  
セグメント配信を利用する際に、実装が必要となります。  
[配信したいセグメント](/manual/growthpush/#セグメントの作成)に沿って、タグやイベントの紐付けを行ってください。  
## 全機能を利用する方法  
※ [全機能を利用する場合はこちら](/sdk/android/all-in-one)  
## 最新版のSDKへの乗り換え方法  
[SDKの乗り換え方法](/sdk/android/migrate)をご参照ください。  
## サンプルコード  
実装サンプルは、[GitHubレポジトリ](https://github.com/growthbeat/growthbeat-android)を参考にしてください。  
# お問い合わせ  
ご不明な点などございます場合は、[ヘルプページ](http://growthbeat.helpscoutdocs.com/)を閲覧してください。  
