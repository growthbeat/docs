---
categories: 'sdk'
date: 2020-04-07T17:00:00+09:00
description: 'Growthbeat Android の導入方法について説明します'
draft: false
title: Growthbeat Android SDK | 基本導入ガイド
---
Version 3.0.1
# SDK概要  
Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。本ガイドでは、Push通知機能のみを利用する場合の導入方法についてご紹介します。  
(※ Eclipseの導入は非推奨となっております。導入については、[Eclipse環境での導入手順について](http://faq.growthbeat.com/article/211-eclipse) をご参照ください。)  
## 動作環境  
最低動作保証環境: Android 4.1以上
動作推奨環境: Android 4.4以上  
# 1. プロジェクトの設定  
Growthbeat 2.0.8以下からアップデートする方は、[FCM移行ガイド](https://faq.growthbeat.com/article/226-gcmtofcm)を参照ください  
アプリ側でSupport Library（appcompat-v7など）をご利用の場合は、Growthbeat SDK v2.0.12をご利用ください。

## google-services.jsonのインポート  
Firebaseのコンソールから、ダウンロードした、google-services.jsonをプロジェクトルートにインポートしてください。  
インポートができていないと、デバイストークンの取得に失敗いたします。  

## Gradleの設定  
build.gradle(Module:app)に下記を追加してください。  

```sh
dependencies {
    implementation 'com.growthbeat:growthbeat-android:3.0.1@aar'
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'com.google.firebase:firebase-messaging:18.0.0'
}
apply plugin: 'com.google.gms.google-services'
```

アプリがAndroidXに対応していない場合は、Growthbeat Android SDK v2.0.12、dependencies は以下をご利用ください。
```
dependencies {
    implementation 'com.growthbeat:growthbeat-android:2.0.11@aar'
    implementation 'com.android.support:appcompat-v7:28.0.+'
    implementation 'com.google.firebase:firebase-messaging:18.0.+'
}
apply plugin: 'com.google.gms.google-services'
```
Growthbeat SDKを利用するには、依存ライブラリが必要となります。  

- AndroidX
- firebase-messagaging
- アプリがAndroidXに対応していない場合は appcompat-v7もしくはandroid-support-v4

依存ライブラリの対応バージョンは [Androidビルドに必要なライブラリ](http://faq.growthbeat.com/article/201-android) をご参照ください  

# 2. 実装コード  
## Javaの実装  
### 初期化  
GrowthPushの初期化を行います。初期化の中で、端末の基本情報の送信、広告IDの取得が行われます。  
requestRegistrationId で、デバイストークンの取得を行います。必ずinitialize後に呼び出してください。  

YOUR_APPLICATION_ID, YOUR_CREDENTIAL_IDは、Growth Push管理画面から確認することができます。  

各種IDの取得方法は [Growthbeatで使用するID、キーまとめ](http://faq.growthbeat.com/article/130-growthbeat-id) をご参照ください。  

Growth Pushの管理画面の操作、Google API Consoleの操作については、後述します。  

```java
class MyActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        GrowthPush.getInstance().initialize(getApplicationContext(), "YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID", BuildConfig.DEBUG ? Environment.development : Environment.production);

        // 以下は、必ずinitialize後に呼び出してください
        GrowthPush.getInstance().requestRegistrationId();
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

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.VIBRATE" />

<application>
    <!-- ... -->

    <activity
        android:name="com.growthpush.view.AlertActivity"
        android:configChanges="orientation|keyboardHidden"
        android:launchMode="singleInstance"
        android:theme="@android:style/Theme.Translucent" />

    <service android:name="com.growthpush.ReceiverService">
        <intent-filter>
            <action android:name="com.google.firebase.MESSAGING_EVENT" />
        </intent-filter>
    </service>

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
