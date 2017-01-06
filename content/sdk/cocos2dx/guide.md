---
categories: 'sdk'
date: 2017-01-06T14:32:58+09:00
description: 'Growthbeat Cocos2dx の導入方法について説明します'
draft: false
title: Growthbeat Cocos2dx Gudeliene
---

Version 2.0.4

# 動作環境

Cocos2d-x v3.12

※ 一部実装にて、バージョンごとに、Cocos2d-xのヘッダーファイルが読み込めない可能性がございます。

# 共通初期設定

## SDK導入

Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。

### Cocos2d-x SDK をインポートする

GitHubからSDKをclone し、submoduleをupdate してください。

```
git clone https://github.com/SIROK/growthbeat-cocos2dx.git
cd ./growthbeat-cocos2dx
git submodule update --init --recursive
```

## ソースコードをインポート

`source/Classes` ディレクトリの中身、Grothbeat, GrowthPush, GrowthLink 3つのフォルダーを `/path/to/your_project/Classes/` 配下にコピーしてください。

## iOSの初期設定

Xcodeにて、Classesにコピーしたフォルダを、インポートしてください。選択肢にて、 `Create groups` にチェックし、ターゲットを任意のビルドスキームにチェックしてください。`growthbeat-ios/Growthbeat.framework` をコピーして、`/path/to/your_project/proj.ios/Frameworks/` 配下にコピーしてください。

Growthbeat.frameworkは、下記Frameworkが必須となります。Xcodeプロジェクトに、依存するFrameworkを追加してください。

1. Foundation.framework
1. UIKit.framework
1. CoreGraphics.framework
1. Security.framework
1. SystemConfiguration.framework
1. AdSupport.framework
1. CFNetwork.framework
1. SafariServices.framework

## Androidの初期設定

`source/proj.android/src` の中身を、プロジェクトの `/path/to/your_project/proj.android/src` 配下にコピーしてください。

**Android Studioで開発する場合（推奨）**

build.gradleに下記の設定をしてください。

```
dependencies {
    // Androidのライブラリです。growthbeatのライブラリの機能に依存します。
    compile "com.android.support:appcompat-v7:23.3.0"
    compile 'com.google.android.gms:play-services-gcm:9.2.1'
    compile 'com.google.android.gms:play-services-ads:9.2.1'

    // Growthbeat SDK Android
    compile 'com.growthbeat:growthbeat-android:2.0.4@aar'
}
```

```
<meta-data
    android:name="com.google.android.gms.version"
    android:value="@integer/google_play_services_version" />
```

**Eclipseで開発する場合（非推奨）**

`growthbeat-android/release/growthbeat-x.x.x.jar` を、プロジェクトの `/path/to/your_project/proj.android/libs/` 配下にコピーしてください。

growthbeat-x.x.x.jarに依存しているGoogle/Androidライブラリは下記になります。ライブラリは、android-sdk配下のextrasフォルダの任意の場所にございます。

|ライブラリ|場所|備考|
|---|---|---|
|support-v4-x.x.x.aar|`extras/android/m2repository/com/android/support/support-v4/x.x.x/`|23.0.0以降をお使いください|
|play-services-ads-x.x.x.aar|`extras/google/m2repository/com/google/android/gms/play-services-ads/x.x.x`|8.3.0以降をお使いください|
|play-services-gcm-x.x.x.aar|`extras/google/m2repository/com/google/android/gms/play-services-gcm/x.x.x`|8.3.0以降をお使いください|

aarは解凍して、ライブラリプロジェクトとして設定してください。ライブラリプロジェクトの作成方法は下記リンクを参照してください。

http://qiita.com/chibatching/items/931286124d3d25227410

#### ソースビルド設定

Android.mk に下記を追加してください。

```java
LOCAL_SRC_FILES := hellocpp/main.cpp \
                   ../../Classes/AppDelegate.cpp \
                   ../../Classes/HelloWorldScene.cpp \
                   ../../Classes/Growthbeat/GrowthbeatInstance.cpp \
                   ../../Classes/Growthbeat/android/Growthbeat.cpp \
                   ../../Classes/GrowthPush/GrowthPushInstance.cpp \
                   ../../Classes/GrowthPush/android/GrowthPush.cpp \
                   ../../Classes/GrowthLink/GrowthLinkInstance.cpp \
                   ../../Classes/GrowthLink/android/GrowthLink.cpp \

LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../Classes \
                    $(LOCAL_PATH)/../../Classes/Growthbeat/ \
                    $(LOCAL_PATH)/../../Classes/Growthbeat/android \
                    $(LOCAL_PATH)/../../Classes/GrowthPush/ \
                    $(LOCAL_PATH)/../../Classes/GrowthPush/android \
                    $(LOCAL_PATH)/../../Classes/GrowthLink/ \
                    $(LOCAL_PATH)/../../Classes/GrowthLink/android \
```


#### AndroidManifest.xmlの設定

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
    android:name="com.growthpush.Cocos2dxReceiverService"
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
※ `YOUR_PACKAGE_NAME`は、実装するアプリのパッケージ名に変更してください。


## Growthbeatの初期化

AppDelegate.cpp　に以下のコードを追加してください。

```cpp
#include "Growthbeat.h"
#include "GrowthPush.h"
#include "GrowthLink.h"
```

続いて、`#USING_NS_CC;`の下に以下のコードを追加してください。

```cpp
USING_NS_GROWTHBEAT;
USING_NS_GROWTHPUSH;
USING_NS_GROWTHLINK;

#ifdef COCOS2D_DEBUG
GPEnvironment kGPEnvironment = GPEnvironmentDevelopment;
#else
GPEnvironment kGPEnvironment = GPEnvironmentProduction;
#endif
```
# プッシュ通知

Growth Push管理画面、証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[iOSプッシュ通知証明書作成方法](http://growthhack.sirok.co.jp/growthpush/ios-p12/)

また、iOSの場合、Provisioning Profileの設定をする必要があります。

XcodeプロジェクトのBuild Setting > Provisioning Profileの設定をしてください。誤った設定方法となりますと、デバイストークンの取得ができません。

[Android SenderId, APIキー取得方法](http://growthhack.sirok.co.jp/growthpush/gcm-api/)

## 初期化設定

Growth Push へデバイス登録・認証を行います。初期化の中に、端末の基本情報の送信、広告IDの取得が行われます。
Environmentは、開発環境の場合、`GPEnvironmentDevelopment` を、本番環境の場合は、`GPEnvironmentProduction` を指定してください。

```cpp
GrowthPush::getInstance()->initialize("YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID", kGPEnvironment);
```

### Android
AppActivity 内で、GrowthbeatJNI に context を設定してください。

```java
GrowthPushtJNI.setContext(getApplicationContext());
```

## DeviceToken/RegistrationIdの取得・送信

デバイストークンを取得するタイミングで下記を実装してください。

```cpp
GrowthPush::getInstance()->requestDeviceToken("YOUR_SENDER_ID");
```

## タグ・イベントを送信する。

セグメント配信を利用する際に、実装が必要となります。

[配信したいセグメント](/manual/growthpush/#セグメントの作成)に沿って、タグやイベントの紐付けを行ってください。

### タグ送信

```cpp
GrowthPush::getInstance()->setTag("TagName", "TagValue");
```

[setTagメソッドについて](/sdk/cocos2dx/reference/#タグの送信)

### イベント送信

```cpp
GrowthPush::getInstance()->trackEvent("EventName");
```

[trackEventメソッドについて](/sdk/cocos2dx/reference/#イベントの送信)

### プッシュ通知ペイロードの受け取り

```cpp
GrowthPush::getInstance()->setOpenNotificationCallback([](cocos2d::Value extra)->void{
    CCLOG("%s", extra.getDescription().c_str());
});
```

# アプリ内メッセージ

## メッセージを作成する

ここではアプリの起動時にメッセージを出す方法を説明します（共通初期設定でアプリの起動イベントを送信している必要があります）。

まず、管理画面にてアプリ起動時に配信されるメッセージを作成します。メッセージの作成方法は[こちら](/manual/growthmessage/#配信作成)を参考にしてください。

## メッセージを表示する

Growth Pushのイベント送信と連動して、メッセージを受信します。

イベント名に紐付いたメッセージを作成するだけで、メッセージ表示することはできます。デフォルトでは、メッセージ受信時に即時に表示します。

```cpp
GrowthPush::getInstance()->trackEvent("Launch");
```

TrackEventに引数を追加することで、ゲームオブジェクト上に、コールバックすることができます。

```cpp
GrowthPush::getInstance()->trackEvent("Launch", null, [](std::string uuid)->void{

    // ...
    // フレームを待つなど、表示するのを待つ

    GrowthPush::getInstance()->renderMessage(uuid);

});
```

# ディープリンク

## 初期設定

Growthbeatの初期化処理の後に、Growth Linkの初期化処理を呼び出します。

```cpp
GrowthLink::getInstance()->initialize("APPLICATION_ID", "CREDENTIAL_ID");
```

## ディープリンクアクションの実装

SDKには、`IntentHandler` というインタフェースが定義されており、この実装でディープリンク時のアクションを実装することができます。

たとえば下記のような形で実装できます。

```cpp
Growthbeat::getInstance()->initializeIntentHandlers();
Growthbeat::getInstance()->addNoopIntentHandler();
Growthbeat::getInstance()->addUrlIntentHandler();
Growthbeat::getInstance()->addCustomIntentHandler([](std::map<std::string,std::string> extra)->bool{
    log("cutomintenthandler called.");
    return true;
});
```
## OS別設定

### iOS

#### Xcodeプロジェクトの設定

共通初期設定に追加で、

* SafariServices.frameworkのインポート

が必要です。

[Growth Link iOSの設定方法について](http://support.growthbeat.com/sdk/ios/guide/#プロジェクト設定)

#### 実装について

### Android
AppActivity 内で、GrowthLinkJNI に context を設定してください。

```java
GrowthLinkJNI.setContext(getApplicationContext());
GrowthLinkJNI.handleOpenUrl(getIntent().getData());
```

# Growthbeat SDK 1.xからの変更点

## 機能削除

- インターフェスの変更があります。
 - 次の実装変更点でご確認ください。

- GrowthAnalyticsクラスがなくなりました。
 - Growth Analyticsに関する記述は全て削除してください。
 - 2.x以降は、GrowthPush#setTag, trackEventをご利用ください。

- GrowthbeatCoreクラスが、Growthbeatクラスに統合されました。
 - start, stop, initializeは削除されました。

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

### Growth Push SDKの内容を削除

- growthpush.jar, growthpush.frameworkの削除
- Classes/GrowthPush 以下を削除
- com.growthpush 以下を削除

上記を削除したあと、本ガイドのSDK導入部分にてプロジェクト設定を行ってください。

### 初期化

Growth Push SDK

### AppDelegate.cpp

```cpp
bool AppDelegate::applicationDidFinishLaunching() {
    // ...
    GrowthPush::initialize(YOUR_APP_ID, "YOUR_APP_SECRET", GPEnvironmentDevelopment, true);
    GrowthPush::registerDeviceToken("YOUR_SENDER_ID");
    GrowthPush::trackEvent("Launch");
    GrowthPush::setDeviceTags();
    GrowthPush::clearBadge();
    // ...
    return YES;
}
```

Growthbeat SDK

```cpp
bool AppDelegate::applicationDidFinishLaunching() {
    // ...
    GrowthPush::getInstance()->initialize("YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID", kGPEnvironment);
    GrowthPush::getInstance()->requestDeviceToken("YOUR_SENDER_ID");
    GrowthPush::getInstance()->trackEvent("Launch");
    GrowthPush::getInstance()->setDeviceTags();
    GrowthPush::getInstance()->clearBadge();
    // ...
    return YES;
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
    android:name="com.growthpush.Cocos2dxReceiverService"
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

ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/)を閲覧してください。
