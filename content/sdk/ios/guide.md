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

[最新版iOS SDK ダウンロードページ ](https://github.com/SIROK/growthbeat-ios/archive/latest.zip)

ダウンロードしたファイルを解凍し、そのフォルダの中の **Growthbeat.framework** をプロジェクトへ組み込みます。
任意のXcodeプロジェクトを開き、Growthbeat.frameworkをインポートしてください。

Growthbeat.frameworkのインポートの方法は2つあります。
```
1. Xcodeプロジェクトに、Growthbeat.frameworkをドラッグアンドドロップする
2. Bulid Phases -> Link Binary With Librariesの+ボタンを押し、Add Other...からGrowthbeat.frameworkを選択する
```

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

## Growthbeatの初期化

Growthbeatへデバイス登録・認証を行います。初期化の中に、端末の基本情報の送信、広告IDの取得が行われます。

```objc
[[Growthbeat sharedInstance] initializeWithApplicationId:@"YOUR_APLICATION_ID" credentialId:@"YOUR_CREDENTIAL_ID"];
```

Growth Push SDKからの乗り換え方法はAPIリファレンスを参照

<a href="/sdk/ios/reference/">APIリファレンス</a>


# プッシュ通知（Grwoth Push）

Growth Push管理画面、証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[iOSプッシュ通知証明書作成方法](http://growthhack.sirok.co.jp/growthpush/ios-p12/)


## デバイストークンを取得・送信をする

1. Growthhbeat#initializeWithApplicationIdの後に下記を呼び出す

```objc
[[GrowthPush sharedInstance] requestDeviceTokenWithEnvironment:kGrowthPushEnvironment];
```

2. ApplicationDelegateにて下記を追加

```objc
- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [[GrowthPush sharedInstance] setDeviceToken:deviceToken];
}
```

# 分析（Growth Anlytics）

あらかじめ特定のタグやイベントを送信するためのメソッドを用意しております。
[Growthbeatの初期化](#growthbeatの初期化) の時点で下記データがGrowth Anlyticsに送信されます。
デフォルトで用意のあるタグ・イベント一覧は <a href="/sdk/ios/reference/">APIリファレンス</a> を参照してください。

* デバイスモデル
* OS
* 言語
* タイムゾーン
* UTCとタイムゾーンの差分

## タグ（ユーザー属性）の送信

**タグとは**

ユーザーの属性を示す情報の送信をします。一般的には ユーザーID/性別/年齢 等の情報を送信します。

```objc
- (void)track:(NSString *)name;
- (void)track:(NSString *)name properties:(NSDictionary *)properties;
- (void)track:(NSString *)name option:(GATrackOption)option;
- (void)track:(NSString *)name properties:(NSDictionary *)properties option:(GATrackOption)option;
```

詳しくは、APIリファレンスを参照してください。

<a href="/sdk/ios/reference/">APIリファレンス</a>

## イベント（行動ログ）の送信

**イベントとは？**

ユーザーの行動ログを示す情報の送信をします。一般的には 起動/ログイン/課金 等の情報を送信します。

```objc
- (void)tag:(NSString *)name;
- (void)tag:(NSString *)name value:(NSString *)value;
```

詳しくは、APIリファレンスを参照してください。

<a href="/sdk/ios/reference/">APIリファレンス</a>

# アプリ内メッセージ（Growth Message）

## メッセージを表示する

メッセージを表示したい場所にGrowth Analyticsのタグを設定してください。

```objc
- (void)track:(NSString *)name;
- (void)track:(NSString *)name properties:(NSDictionary *)properties;
- (void)track:(NSString *)name option:(GATrackOption)option;
- (void)track:(NSString *)name properties:(NSDictionary *)properties option:(GATrackOption)option;
```

詳しくは、APIリファレンスを参照してください。

[Growth Analytics APIリファレンス]()

# ディープリンク（Growth Link）

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

## ディープリンク用初期化処理

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
