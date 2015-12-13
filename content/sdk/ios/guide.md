---
categories: 'sdk'
date: 2015-09-27T23:47:00+09:00
description: 'Growthbeat iOS の導入方法について説明します'
draft: false
title: Growthbeat iOS Gudeliene
---

# 共通初期設定

## SDK導入

Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。

### CocoaPodsを使用して導入する場合

Podfileに下記を記述し、pod installを実行してください。

```
pod 'Growthbeat'
```

### 手動でSDKを配置して導入する場合

<a href="/sdk">最新版iOS SDK ダウンロードページ</a>

ダウンロードしたファイルを解凍し、そのフォルダの中の **Growthbeat.framework** をプロジェクトへ組み込みます。
任意のXcodeプロジェクトを開き、Growthbeat.frameworkをインポートしてください。

Growthbeat.frameworkのインポートの方法は2つあります。

```
1. Xcodeプロジェクトに、Growthbeat.frameworkをドラッグアンドドロップする
2. Bulid Phases -> Link Binary With Librariesの+ボタンを押し、Add Other...からGrowthbeat.frameworkを選択する
```

### import

Growthbeatのimport文を記述します。

```
#import <Growthbeat/Growthbeat.h>
```

### 依存について

Growthbeat.frameworkは、下記Frameworkが必須となります。

- Foundation.framework
- UIKit.framework
- CoreGraphics.framework
- SystemConfiguration.framework
- AdSupport.framework
- CFNetwork.framework
- SafariServices.framework

## Growthbeatの初期化

Growthbeatの初期化を行います。初期化では、デバイス登録、認証、および端末の基本情報の送信が行われます。

```objc
[[Growthbeat sharedInstance] initializeWithApplicationId:@"YOUR_APLICATION_ID" credentialId:@"YOUR_CREDENTIAL_ID"];
```

Growth Push SDKからの乗り換えの場合は、[こちら](#growth-push-sdkからの乗り換え方法について)も参照してください。

## アプリの起動・終了イベントの送信

起動イベントは、`- (void)applicationDidBecomeActive:(UIApplication *)application` にて下記のように実装してください。

```objc
- (void)applicationDidBecomeActive:(UIApplication *)application {
    [[Growthbeat sharedInstance] start];
}
```

終了イベントは、`- (void)applicationWillResignActive:(UIApplication *)application` にて下記のように実装してください。

```objc
- (void)applicationWillResignActive:(UIApplication *)application {
    [[Growthbeat sharedInstance] stop];
}
```

アプリの起動・終了以外のイベント（行動情報）やタグ（属性情報）も送信することができます。詳しくは[APIリファレンス](/sdk/ios/reference/#基本タグの送信)をご参照ください。

# プッシュ通知

## プッシュ通知用の証明書の作成

Growth Push管理画面のにて、各OSごとに証明書の設定を行ってください。詳しくは、[iOSプッシュ通知証明書作成方法](http://growthhack.sirok.co.jp/growthpush/ios-p12/)をご参照ください。

## デバイストークンを取得・送信をする

Growthbeatの初期化後に下記を呼び出して、デバイストークンの取得を行います。

```objc
[[GrowthPush sharedInstance] requestDeviceTokenWithEnvironment:kGrowthPushEnvironment];
```

`- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken` にて下記のように実装して、デバイストークンを送信します。

```objc
- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [[GrowthPush sharedInstance] setDeviceToken:deviceToken];
}
```

登録されたデバイスは管理画面のデバイスページにて確認することができます。下記のように、デバイスのステータスがアクティブ（Active）で登録されていれば正常です。

<img src="/img/push/push-device-list.png" alt="push-device-list" title="push-device-list" width="100%"/>

# アプリ内メッセージ

## メッセージを作成する。

ここではアプリの起動時にメッセージを出す方法を説明します（共通初期設定でアプリの起動イベントを送信している必要があります）。

まず、管理画面にてアプリ起動時に配信されるメッセージを作成します。メッセージの作成方法は[こちら](/manual/growthmessage/#配信作成)を参考にしてください。

アプリ起動以外にも、カスタムイベントをメッセージ配信のトリガーにすることにより、アプリの任意の場所でメッセージを配信することができます。詳しくは、[こちら](/sdk/ios/reference/#カスタムイベント送信)をご参照ください。

# ディープリンク

## 初期設定

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

## 初期化処理

Growthbeatの初期化処理の後に、Growth Linkの初期化処理を呼び出す

```objc
[[GrowthLink sharedInstance] initializeWithApplicationId:@"APPLICATION_ID" credentialId:@"CREDENTIAL_ID"];
```

カスタムURLスキームでアプリを起動できるように、Info.plistを設定する。

URL起動の処理で、handleOpenUrl:urlメソッドを呼び出す

```objc
- (BOOL) application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    [[GrowthLink sharedInstance] handleOpenUrl:url];
    return YES;
}
```

## ディープリンクアクションの実装

SDKには、GBIntentHandlerというプロトコルが定義されており、この実装でディープリンク時のアクションを実装することができます。

たとえば下記のような形で実装できます。

```objc
 [[GrowthbeatCore sharedInstance] addIntentHandler:[[GBCustomIntentHandler alloc] initWithBlock:^BOOL(GBCustomIntent *customIntent) {
        NSDictionary *extra = customIntent.extra;
        NSLog(@"extra: %@", extra);
        return YES;
}]];
```

# Growth Push SDKからの乗り換え方法について

## 前準備

GrowthPushのApplicationIdから、GrowthbeatのApplicationIdに移行されるた
め、[Growthbeat](https://growthbeat.com/)にアクセスして、ApplicationId、SDKキー（CredentialID）を確認します。

## 実装方法

### SDKの初期化

- GrowthPush SDK

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // EasyGrowthPushクラス利用時
    [EasyGrowthPush setApplicationId:kYourApplicationId secret:@"YOU_APP_SECRET" environment:kGrowthPushEnvironment debug:YES];

    // GrowthPushクラス利用時
    [GrowthPush setApplicationId:kYourApplicationId secret:@"YOU_APP_SECRET" environment:kGrowthPushEnvironment debug:YES];
    [GrowthPush requestDeviceToken];
    [GrowthPush setDeviceTags];
}
```

- Growthbeat SDK

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	// Growthbeat SDKの初期化
	[[Growthbeat sharedInstance] initializeWithApplicationId:@"YOUR_APPLICATION_ID" credentialId:@"YOUR_CREDENTIAL_ID"];
	// デバイストークンを明示的に要求
	[[GrowthPush sharedInstance] requestDeviceTokenWithEnvironment:kGrowthPushEnvironment];

	// deviceTagの取得
	[[GrowthPush sharedInstance] setDeviceTags];
}
```

### アプリ起動時

- Growthbeat SDK

```objc
- (void)applicationDidBecomeActive:(UIApplication *)application {
	// Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.

	// バッチの削除
	[[GrowthPush sharedInstance] clearBadge];

	// Launchイベントの取得
	[[GrowthPush sharedInstance] trackEvent:@"Launch"];
}
```

### デバイストークンの取得

- Growthbeat SDK

```objc
- (void) application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
	// デバイストークンをGrowhPushに送信
	[[GrowthPush sharedInstance] setDeviceToken:deviceToken];
}
```

### タグ・イベントの取得

- GrowthPush SDK

```objc
// タグの取得
[GrowthPush setTag:@"TAG_NAME"];
[GrowthPush setTag:@"TAG_NAME" value:@"TAG_VALUE"];
// イベントの取得
[GrowthPush trackEvent:@"EVENT_NAME"];
[GrowthPush trackEvent:@"EVENT_NAME" value:@"EVENT_VALUE"];
```

- Growthbeat SDK

```objc
// タグの取得
[[GrowthPush sharedInstance] setTag:@"TAG_NAME"];
[[GrowthPush sharedInstance] setTag:@"TAG_NAME" value:@"TAG_VALUE"];
// イベントの取得
[[GrowthPush sharedInstance] trackEvent:@"EVENT_NAME"];
[[GrowthPush sharedInstance] trackEvent:@"EVENT_NAME" value:@"EVENT_VALUE"];
```

# 備考

ご不明な点などございます場合は、[ヘルプページ](http://growthbeat.helpscoutdocs.com/)を閲覧してください。
