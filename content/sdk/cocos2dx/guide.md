---
categories: 'sdk'
date: 2015-11-19T14:32:58+09:00
description: 'Growthbeat Cocos2dx の導入方法について説明します'
draft: false
title: Growthbeat Cocos2dx Gudeliene
---

# 共通初期設定

## SDK導入

Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。

### 手動で Cocos2d-x SDK をインポートする

GitHub から SDK を clone し、submodule を update してください。

```
git clone https://github.com/SIROK/growthbeat-cocos2dx.git
cd ./growthbeat-cocos2dx
git submodule update --init --recursive
```

**参照しているSDKのバージョン**

|OS|バージョン|
|:---:|:---:|
|Android|[1.2.3](https://github.com/growthbeat/growthbeat-android/tree/b0fa9e9b9c18b59bf2a5c248e79b66b100dd74af)|
|iOS|[1.2.3](https://github.com/growthbeat/growthbeat-ios/tree/0339ce8eb9c5aafd8e9e5442075c2aae4acdcb6a)|

#### iOS

ビルドに必要な下記2つの手順を実施してください。

1. `source/Classes` ディレクトリの中身を、 `/path/to/your_project/Classes/` 配下にコピーしてください。
1. `growthbeat-ios/Growthbeat.framework` をコピーして、`/path/to/your_project/proj.ios/Frameworks/` 配下にコピーしてください。

#### Android

`growthbeat-android/growthbeat.jar` の中身を、プロジェクトの `/path/to/your_project/proj.android/libs/` 配下にコピーしてください。

## 初期設定

### iOS

Growthbeat.frameworkは、下記Frameworkが必須となります。Xcodeプロジェクトに、依存するFrameworkを追加してください。

1. Foundation.framework
1. UIKit.framework
1. CoreGraphics.framework
1. Security.framework
1. SystemConfiguration.framework
1. AdSupport.framework
1. CFNetwork.framework

### Android

growthbeat.jarは、下記設定が必須となります。

1. ライブラリプロジェクトとして、google_play_service_libをビルドパスに設定
1. AndroidManifest.xmlの`<application>`内に以下を追加

```
<meta-data
    android:name="com.google.android.gms.version"
    android:value="@integer/google_play_services_version" />
```

必要なパーミンションは下記になります。

```xml
<uses-permission android:name="android.permission.INTERNET" />

<!--Growth Pushの機能として利用します。 -->
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE" />
<permission
    android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE"
    android:protectionLevel="signature" />

<!--Growth Messageのバナー型の配信をする場合に必要となります。。 -->
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />

<!-- Android 4.0.4以上で動作する場合は必要ありません。 -->
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
```

`<application>`タグ内に下記を追加してください。

```xml

<!--Growth Push通知を受け取るために必要となります。 -->
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

<!--Growth Messageの表示をするために必要となります。 -->
<activity
    android:name="com.growthbeat.message.view.MessageActivity"
    android:theme="@android:style/Theme.Translucent" />

<!--Growth Linkを使用するために必要となります。 -->
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

## Growthbeatの初期化
Growthbeat へデバイス登録・認証を行います。初期化の中に、端末の基本情報の送信、広告IDの取得が行われます。

```cpp
Growthbeat::getInstance()->initialize("YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID");
```

### Android
AppActivity 内で、GrowthbeatJNI に context を設定してください。

```java
GrowthbeatJNI.setContext(getApplicationContext());
```

Android.mk に下記を追加してください。

```java
LOCAL_SRC_FILES := hellocpp/main.cpp \
                   ../../Classes/AppDelegate.cpp \
                   ../../Classes/HelloWorldScene.cpp \
                   ../../Classes/Growthbeat/GrowthbeatInstance.cpp \
                   ../../Classes/Growthbeat/android/Growthbeat.cpp \
                   ../../Classes/GrowthPush/GrowthPushInstance.cpp \
                   ../../Classes/GrowthPush/android/GrowthPush.cpp \
                   ../../Classes/GrowthAnalytics/GrowthAnalyticsInstance.cpp \
                   ../../Classes/GrowthAnalytics/android/GrowthAnalytics.cpp \
                   ../../Classes/GrowthLink/GrowthLinkInstance.cpp \
                   ../../Classes/GrowthLink/android/GrowthLink.cpp \
                   ../../Classes/GrowthbeatCore/GrowthbeatCoreInstance.cpp \
                   ../../Classes/GrowthbeatCore/android/GrowthbeatCore.cpp \

LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../Classes \
                    $(LOCAL_PATH)/../../Classes/Growthbeat/ \
                    $(LOCAL_PATH)/../../Classes/Growthbeat/android \
                    $(LOCAL_PATH)/../../Classes/GrowthPush/ \
                    $(LOCAL_PATH)/../../Classes/GrowthPush/android \
                    $(LOCAL_PATH)/../../Classes/GrowthAnalytics/ \
                    $(LOCAL_PATH)/../../Classes/GrowthAnalytics/android \
                    $(LOCAL_PATH)/../../Classes/GrowthLink/ \
                    $(LOCAL_PATH)/../../Classes/GrowthLink/android \
                    $(LOCAL_PATH)/../../Classes/GrowthbeatCore/ \
                    $(LOCAL_PATH)/../../Classes/GrowthbeatCore/android \
```

## アプリの起動・終了イベントの送信

アプリ初期化時に一度だけ送信してください。

```cpp
Growthbeat::getInstance()->start();
```

終了イベントは、アプリが閉じるときに実装してください。

```cpp
Growthbeat::getInstance()->stop();
```

アプリの起動・終了以外のイベント（行動情報）やタグ（属性情報）も送信することができます。詳しくは[APIリファレンス](/sdk/cocos2dx/reference/)をご参照ください。

# プッシュ通知

Growth Push管理画面、証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[iOSプッシュ通知証明書作成方法](http://growthhack.sirok.co.jp/growthpush/ios-p12/)

また、iOSの場合、Provisioning Profileの設定をする必要があります。

XcodeプロジェクトのBuild Setting > Provisioning Profileの設定をしてください。誤った設定方法となりますと、デバイストークンの取得ができません。

[Android SenderId, APIキー取得方法](http://growthhack.sirok.co.jp/growthpush/gcm-api/)

## DeviceToken/RegistrationIdの取得・送信

デバイストークンを取得するタイミングで下記を実装してください。

```cpp
GrowthPush::getInstance()->requestDeviceToken("YOUR_SENDER_ID", environment);
```

Environmentは、開発環境の場合、`GPEnvironmentDevelopment` を、本番環境の場合は、`GPEnvironmentProduction` を指定してください。

# アプリ内メッセージ

## メッセージを作成する

ここではアプリの起動時にメッセージを出す方法を説明します（共通初期設定でアプリの起動イベントを送信している必要があります）。

まず、管理画面にてアプリ起動時に配信されるメッセージを作成します。メッセージの作成方法は[こちら](/manual/growthmessage/#配信作成)を参考にしてください。

アプリ起動以外にも、カスタムイベントをメッセージ配信のトリガーにすることにより、アプリの任意の場所でメッセージを配信することができます。Androidは[こちら](/sdk/android/reference/#カスタムイベント送信)、iOSは[こちら](/sdk/ios/reference/#カスタムイベント送信)をご参照ください。

# ディープリンク

## 初期設定

Growthbeatの初期化処理の後に、Growth Linkの初期化処理を呼び出します。

```cpp
GrowthLink::getInstance()->initialize("APPLICATION_ID", "CREDENTIAL_ID");
```

### Android
AppActivity 内で、GrowthLinkJNI に context を設定してください。

```java
GrowthLinkJNI.setContext(getApplicationContext());
GrowthLinkJNI.handleOpenUrl(getIntent().getData());
```

## ディープリンクアクションの実装

SDKには、`IntentHandler` というインタフェースが定義されており、この実装でディープリンク時のアクションを実装することができます。

たとえば下記のような形で実装できます。

```java
GrowthbeatCore::getInstance()->initializeIntentHandlers();
GrowthbeatCore::getInstance()->addNoopIntentHandler();
GrowthbeatCore::getInstance()->addUrlIntentHandler();
GrowthbeatCore::getInstance()->addCustomIntentHandler([](std::map<std::string,std::string> extra)->bool{
    log("cutomintenthandler called.");
    return true;
});
```

# 備考

ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/)を閲覧してください。
