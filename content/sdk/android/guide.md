---
categories: 'sdk'
date: 2017-01-06T12:00:00+09:00
description: 'Growthbeat Android の導入方法について説明します'
draft: false
title: Growthbeat Android SDK | 基本導入ガイド
---
Version 2.0.4  
# SDK概要  
Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。本ガイドでは、Push通知機能のみを利用する場合の導入方法についてご紹介します。  
(※ Eclipseの導入は非推奨となっております。導入については、[Eclipse環境での導入手順について](http://faq.growthbeat.com/article/211-eclipse) をご参照ください。)  
## 動作環境  
最低動作保証環境: Android 4.0.4以上  
動作推奨環境: Android 4.4以上  
# 1. Gradleの設定  

build.gradle(Module:app)に下記を追加してください。  

```sh
dependencies {
    compile 'com.growthbeat:growthbeat-android:2.0.4@aar'
    compile 'com.android.support:appcompat-v7:23.+'
    compile 'com.google.android.gms:play-services-gcm:9.2.1'
    compile 'com.google.android.gms:play-services-ads:9.2.1'
}
```  
Growthbeat SDKを利用するには、依存ライブラリが必要となります。  

- appcompat-v7もしくはandroid-support-v4
- google-play-services-gcm
- google-play-services-ads   

依存ライブラリの対応バージョンは [Androidビルドに必要なライブラリ](http://faq.growthbeat.com/article/201-android) をご参照ください

# 2. 実装コード
## Javaの実装  
### 初期化  
GrowthPushの初期化を行います。初期化の中で、端末の基本情報の送信、広告IDの取得が行われます。
requestRegistrationId で、デバイストークンの取得を行います。必ずinitialize後に呼び出してください。

YOUR_APPLICATION_ID, YOUR_CREDENTIAL_IDは、Growth Push管理画面から確認することができます。
YOUR_SENDER_IDは、Firebase Consoleから取得する必要があります。

各種IDの取得方法は [Growthbeatで使用するID、キーまとめ](http://faq.growthbeat.com/article/130-growthbeat-id) をご参照ください。

Growth Pushの管理画面の操作、Google API Consoleの操作については、後述します。

```java
class MyActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        GrowthPush.getInstance().initialize(getApplicationContext(), "YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID", BuildConfig.DEBUG ? Environment.development : Environment.production);
        
        // 以下は、必ずinitialize後に呼び出してください
        GrowthPush.getInstance().requestRegistrationId("YOUR_SENDER_ID");
    }
}
```  
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
レジストレーションIDを取得するため、またプッシュ通知を受信するためにAndroidManifest.xmlに必要なクラスを記述します。  
YOUR_PACKAGE_NAMEは、実装するアプリのパッケージ名に変更してください。  

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

# その他設定について  
## SenderId、AP Keyの取得について  
SenderIdは、requestRegistrationIdを実行するために必要となります。APIキーは、管理画面にて、プッシュ通知を送信するための証明書として必要になります。  
[Android SenderId, APIキー取得方法](http://growthbeat.helpscoutdocs.com/article/23-gcm-api)  
## 管理画面設定  
### APIキーの登録  
Growth Push管理画面の証明書設定ページにて、APIキーの登録を行ってください。  
### プッシュ通知の作成  
[配信作成](/manual/growthpush/#配信作成)を参考に、プッシュ通知が届くかを確認します。  
### セグメントについて  
セグメント配信を利用する際に、実装が必要となります。  
[配信したいセグメント](/manual/growthpush/#セグメントの作成)に沿って、タグやイベントの紐付けを行ってください。  
# 備考  
## 全機能を利用する方法  
Growthbeatは、プッシュ通知以外に、ポップアップメッセージ機能を用意しております。追加の実装を行うことで機能を利用することができます。  
詳しくは、[全機能導入ガイド](/sdk/android/all-in-one)をご覧ください。  
## 最新版のSDKへのアップグレード方法  
Growth Push SDKからGrowthbeat 2.x SDK へまたは、Growthbeat 1.x SDKからGrowthbeat 2.x SDKへのアップグレードをされる方は
[SDKのアップグレードガイド](/sdk/android/upgrade)をご参照ください。  
## サンプルコード  
実装サンプルは、[Githubレポジトリ](https://github.com/growthbeat/growthbeat-android)を参考にしてください。  
# お問い合わせ  
ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/)を閲覧してください。  
