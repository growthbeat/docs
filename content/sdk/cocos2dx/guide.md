---
categories: 'sdk'
date: 2015-09-28T14:32:58+09:00
description: 'Growthbeat Cocos2dx の導入方法について説明します'
draft: false
title: Growthbeat Cocos2dx Gudeliene
---

# 共通初期設定

## SDK導入

Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。

[最新版Cocos 2d-x SDK ダウンロードページ](https://github.com/SIROK/growthbeat-cocos2dx/archive/latest.zip)

1. Classesディレクトリの中身を、コピーしてください。
1. proj.androidの中身は、srcディレクトリ以下にコピーしてください。
1. ヘッダーファイルのインポート設定

AppDelegate.cppに、ヘッダーのインクルードとnamespaceを、下記の実装してください。

```cpp
#include "Growthbeat.h"
#include "GrowthPush.h"
#include "GrowthbeatCore.h"
#include "GrowthAnalytics.h"
#include "GrowthLink.h"

USING_NS_GROWTHBEAT;
USING_NS_GROWTHPUSH;
USING_NS_GROWTHBEATCORE;
USING_NS_GROWTHLINK;
USING_NS_GROWTHANALYTICS;
```

### Androidでのビルド

proj.android/jniディレクトリにある、 `Android.mk` に C++のファイルを参照します。

- `LOCAL_SRC_FILES` に、下記を追加してください。

```
../../Classes/Growthbeat/GrowthbeatInstance.cpp \
../../Classes/Growthbeat/android/Growthbeat.cpp \
../../Classes/GrowthbeatCore/GrowthbeatCoreInstance.cpp \
../../Classes/GrowthbeatCore/android/GrowthbeatCore.cpp \
../../Classes/GrowthPush/GrowthPushInstance.cpp \
../../Classes/GrowthPush/android/GrowthPush.cpp \
../../Classes/GrowthAnalytics/GrowthAnalyticsInstance.cpp \
../../Classes/GrowthAnalytics/android/GrowthAnalytics.cpp \
../../Classes/GrowthLink/GrowthLinkInstance.cpp \
../../Classes/GrowthLink/android/GrowthLink.cpp
```

- `LOCAL_C_INCLUDES` に、下記を追加してください。

```
$(LOCAL_PATH)/../../Classes/Growthbeat/ \
$(LOCAL_PATH)/../../Classes/Growthbeat/android \
$(LOCAL_PATH)/../../Classes/GrowthPush/ \
$(LOCAL_PATH)/../../Classes/GrowthPush/android \
$(LOCAL_PATH)/../../Classes/GrowthAnalytics/ \
$(LOCAL_PATH)/../../Classes/GrowthAnalytics/android \
$(LOCAL_PATH)/../../Classes/GrowthbeatCore/ \
$(LOCAL_PATH)/../../Classes/GrowthbeatCore/android \
$(LOCAL_PATH)/../../Classes/GrowthLink/ \
$(LOCAL_PATH)/../../Classes/GrowthLink/android
```


### 依存について

**iOS**

[growthbeat-iosをダウンロード](https://github.com/SIROK/growthbeat-ios/archive/latest.zip)

[1] Growthbeat.framework

	growthbeat-iosのディレクトリからコピーしてください。

[2] GrowthLink.framework

	ディープリンク機能を利用する場合は、growthbeat-ios/source/GrowthLink/ディレクトリからコピーしてください。

[3] iOS Framework

	Xcodeプロジェクトから、TargetsのBuild Phases -> Link Binary With Librarysにて、下記Frameworkを追加してください。

- Foundation.framework
- UIKit.framework
- CoreGraphics.framework
- Security.framework
- SystemConfiguration.framework
- AdSupport.framework
- CFNetwork.framework

**Android**

[growthbeat-androidをダウンロード](https://github.com/SIROK/growthbeat-android/archive/latest.zip)

- growthbeat.jar

	growthbeat-androidのディレクトリからコピーしてください。

- growthlink.jar

	ディープリンク機能を利用する場合は、growthbeat-android/source/library/ディレクトリからコピーしてください。

- google_play_service_lib

 1. ライブラリプロジェクトとして、google_play_service_libをビルドパスに設定
1. AndroidManifest.xmlの`<application>`内に以下を追加

```xml
<meta-data
    android:name="com.google.android.gms.version"
    android:value="@integer/google_play_services_version" />
```

## Growthbeatの初期化

```cpp
Growthbeat::getInstance()->initialize("YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID");
```

Androidの場合は、初期起動時のActivityに下記を実装してください。

```java
GrowthbeatJNI.setContext(this);
```

Growth Push SDKからの乗り換え方法はAPIリファレンスを参照

[APIリファレンス]()


# プッシュ通知（Grwoth Push）

Growth Push管理画面、証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[iOSプッシュ通知証明書作成方法](http://growthhack.sirok.co.jp/growthpush/ios-p12/)
[Android SenderId, APIキー取得方法](http://growthhack.sirok.co.jp/growthpush/gcm-api/)


## デバイストークンを取得・送信をする

### Cocos

プッシュ通知の許可を取りたいタイミングの場所に、下記を実装してください。

```cpp
GrowthPush::getInstance()->requestDeviceToken("YOUR_SENDER_ID", environment);
```

iOSのみ送信する場合は、下記実装も可能です。

```cpp
GrowthPush::getInstance()->requestDeviceToken(environment);
```

`GPEnvironment` は、デバッグビルド・リリースビルドで変更するようにしてください。

- デバッグビルド時 => GPEnvironmentDevelopment

- リリースビルド時 => GPEnvironmentProduction

### android

**AndroidManifest.xmlの設定（Push）**

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

**RegistrationIdの取得・送信**

Growthbeat#initialize()の後に下記を呼び出します。

```
GrowthPush.getInstance().requestRegistrationId("YOUR_SENDER_ID", BuildConfig.DEBUG ? Environment.development : Environment.production);
```

* YOUR_SENDER_IDは、AndroidのSenderId


# 分析（Growth Anlytics）

あらかじめ特定のタグやイベントを送信するためのメソッドを用意しております。
[Growthbeatの初期化](#growthbeatの初期化) の時点で下記データがGrowth Anlyticsに送信されます。

* デバイスモデル

* OS

* 言語

* タイムゾーン

* UTCとタイムゾーンの差分

その他、デフォルトで用意のあるタグ・イベント一覧はAPIリファレンスを参照してください。

[APIリファレンス]()

## タグ（ユーザー属性）の送信

**タグとは**

ユーザーの属性を示す情報の送信をします。一般的には ユーザーID/性別/年齢 等の情報を送信します。

```java
void tag(const std::string& tagId);
void tag(const std::string& tagId, const std::string& value);
```

詳しくは、APIリファレンスを参照してください。

[APIリファレンス]()

## イベント（行動ログ）の送信

**イベントとは？**

ユーザーの行動ログを示す情報の送信をします。一般的には 起動/ログイン/課金 等の情報を送信します。


```java
void track(const std::string& eventId);
void track(const std::string& eventId, const std::map<std::string, std::string>& properties);
void track(const std::string& eventId, GATrackOption option);
void track(const std::string& eventId, const std::map<std::string, std::string>& properties, GATrackOption option);
```

詳しくは、APIリファレンスを参照してください。

[APIリファレンス]()

# アプリ内メッセージ（Growth Message）

## メッセージを表示する

## AndroidManifest.xmlの設定（Message）

`<application>` タグ内に下記を追加してください。

```xml
<activity
	android:name="com.growthbeat.message.view.MessageActivity"
	android:theme="@android:style/Theme.Translucent" />
```

## メッセージを表示する

# ディープリンク（Growth Link）

## 初期設定

**Cocos**

```cpp
GrowthLink::getInstance()->initialize("APPLICATION_ID", "CREDENTIAL_ID");
```

**Android**

Growthbeat.frameworkを導入した上で、Growthbeat SDK内の `source/GrowthLink` に含まれる **GrowthLink.framework** を導入します。任意のXcodeプロジェクトを開き、Growthbeat.frameworkをインポートしてください。

Growthbeat.frameworkのインポートの方法は2つあります。

```
1. Xcodeプロジェクトに、GrowthLink.frameworkをドラッグアンドドロップする。
2. Bulid Phases -> Link Binary With Librariesの+ボタンを押し、Add Other...からGrowthLink.frameworkを選択。
```

GrowthLinkのimport文を記述します。

```objc
#import <GrowthLink/GrowthLink.h>
```

## ディープリンク用初期化処理

Growthbeatの初期化処理の後に、Growth Linkの初期化処理を呼び出す

```java
GrowthbeatCore::getInstance()->initializeIntentHandlers();
GrowthbeatCore::getInstance()->addNoopIntentHandler();
GrowthbeatCore::getInstance()->addUrlIntentHandler();
GrowthbeatCore::getInstance()->addCustomIntentHandler([](std::map<std::string,std::string> extra)->bool{
    log("cutomintenthandler called.");
    return true;
});
```
