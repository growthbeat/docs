---
categories: 'sdk'
date: 2015-09-28T14:32:58+09:00
description: 'Growthbeat Cocos2dx の導入方法について説明します'
draft: false
title: Growthbeat Cocos2dx Gudeliene
---

# 概要

グロースハックツールプラットホーム [Growthbeat](https://growthbeat.com/) の SDK 導入マニュアルです。Growthbeat の各サービスをアプリ内で利用するための技術仕様や導入の仕方について解説いたします。

現在、下記サービスを提供しています：

|サービス名|機能|
|---------|---|
|Growthbeat|ユーザー総合管理|
|Growth Push|プッシュ通知|
|Growth Analytics|総合分析・解析|
|Growth Message|ポップアップ通知|
|Growth Link|ディープリンクツール|

Growthbeat を利用するにはウェブページから新規登録をしていただくか、担当者より発行された情報からログインをしてご利用いただけます。

## SDKについて

各種 SDK は [GitHub](https://github.com/SIROK) 上で開発され、オープンソースとして公開されております。そのままアプリへ導入することも可能です。SDK を変更しご使用いただくことは可能となっております。しかし公開されている SDK のソース以外の変更を行われた場合の、アプリの不具合や動作については保証し兼ねますのでご了承ください。

Growthbeat は現在 iOS, Android, Unity に対応しております。Cocos-2D-X も対応予定はしておりますので別途ご相談ください。

* [Growthbeat iOS SDK](https://github.com/SIROK/growthbeat-ios)
* [Growthbeat Android SDK](https://github.com/SIROK/growthbeat-android)
* [Growthbeat Unity SDK](https://github.com/SIROK/growthbeat-unity)
* [Growthbeat Growthbeat Cocos2D-X SDK SDK](https://github.com/SIROK/growthbeat-cocos2dx)

### SDK機能

1つの SDK で Growthbeat 全てのサービスの機能が利用できます。(Growth Link のご利用には別途 SDK の導入が必要です)

## SDK導入について

### 導入方法

[最新版Cocos 2d-x SDK ダウンロードページ](https://github.com/SIROK/growthbeat-cocos2dx/archive/latest.zip)

**ファイルのコピーについて**

1. Classes ディレクトリの中身をコピーしてください
1. proj.android の中身は src ディレクトリ以下にコピーしてください

**プロジェクトの導入について**

1. ヘッダーファイルのインポート設定

AppDelegate.cpp にヘッダーのインクルードと namespace を下記の実装してください：

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

**Android でもビルドする場合**

proj.android/jni ディレクトリにある `Android.mk` に C++ のファイルを参照します。

*  `LOCAL_SRC_FILES` に下記を追加してください：

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

* `LOCAL_C_INCLUDES` に下記を追加してください：

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

1. Growthbeat.framework

	growthbeat-ios のディレクトリからコピーしてください。

1. GrowthLink.framework

	ディープリンク機能を利用する場合は growthbeat-ios/source/GrowthLink/ ディレクトリからコピーしてください。

1. iOS Framework

	Xcode プロジェクトから Targets の Build Phases → Link Binary With Librarys にて下記 Framework を追加してください：


  * Foundation.framework
  * UIKit.framework
  * CoreGraphics.framework
  * Security.framework
  * SystemConfiguration.framework
  * AdSupport.framework
  * CFNetwork.framework

**Android**

[growthbeat-androidをダウンロード](https://github.com/SIROK/growthbeat-android/archive/latest.zip)

- growthbeat.jar

	growthbeat-android のディレクトリからコピーしてください。

- growthlink.jar

	ディープリンク機能を利用する場合は growthbeat-android/source/library/ ディレクトリからコピーしてください。

- google_play_service_lib

  1. ライブラリプロジェクトとして google_play_service_lib をビルドパスに設定
  1. AndroidManifest.xml の `<application>` 内に以下を追加

```xml
<meta-data
    android:name="com.google.android.gms.version"
    android:value="@integer/google_play_services_version" />
```


### 実装方法

SDK利用時にアプリケーション ID と SDKキー を使用して認証をします。

Growthbeat 管理画面からアプリケーション ID と SDK キーを取得します。アカウント作成時に API キー（REST API を使用時の認証に必須となるキー）と SDK キー（SDK の認証のために必須となるキー）が用意されています。

* API キー（REST API を使用時の認証に必須となるキー）
* SDK キー（SDK の認証のために必須となるキー）

各サービスのヘッダーのアカウント名をクリックしします。そして、表示されるメニューから **マイページ** をお選びください。Growthbeat マイページから API キー と SDKキーを見ることができます

また、アプリケーション ID は Growthbeat のマイページから任意のアプリケーションを選択し、アプリケーション ID を控えてください。

## Growth Push SDKからの乗り換えについて

Growthbeat SDKには、従来のGrowth Push SDKの実装も含まれておりますが、Growth Push SDKをこれまでお使いいただいた方は、一部実装の差し替えが必要となります。

#### 前準備

GrowthPushのApplicationIdから、GrowthbeatのApplicationIdに移行されるた
め、[Growthbeat](https://growthbeat.com/)にアクセスして、ApplicationId、SDKキー（CredentialID）を確認します。

#### 実装方法

**[1] SDKの初期化**

SDKを利用するための初期化方法の乗り換えについてです。

- Growth Push SDK

Cocos(C++)

```
GrowthPush::initialize(YOUR_APP_ID, "YOUR_APP_SECRET", GPEnvironmentDevelopment, true);
GrowthPush::registerDeviceToken("YOUR_SENDER_ID");
GrowthPush::setDeviceTags();
```

Android (Java)

```
public class AppActivity extends Cocos2dxActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    GrowthPushJNI.setContext(getApplicationContext());
  }
}
```

- Growthbeat SDK

Cocos (C++)

```
// Growthbeatの初期化 (Growth Pushの初期化も含まれます。)
Growthbeat::getInstance()->initialize("YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID");

// デバイストークンの取得
GrowthPush::getInstance()->requestDeviceToken("YOUR_SENDER_ID", environment);

GrowthPush::getInstance()->setDeviceTags();
```

Android (Java)

```
public class AppActivity extends Cocos2dxActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    GrowthbeatJNI.setContext(this);
  }
}
```

**[2] タグ・イベントの取得について**

- Growth Push SDK

```
GrowthPush::trackEvent("EventName");
GrowthPush::tag("TagName");
```

- Growthbeat SDK

```
GrowthPush::getInstance()->trackEvent("EventName");
GrowthPush::getInstance()->tag("TagName");
```
