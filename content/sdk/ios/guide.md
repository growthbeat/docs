---
categories: 'sdk'
date: 2016-10-13T19:41:00+09:00
description: 'Growthbeat iOS の導入方法について説明します'
draft: false
title: Growthbeat iOS SDK | 基本導入ガイド
---

Version 2.0.4  
# SDK概要  
Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。本ガイドでは、Push通知機能のみを利用する場合の導入方法についてご紹介します。Objective-Cでの導入方法について記載しております。  
## 環境  
最低動作保証環境: iOS 8.0以上  
動作推奨環境：iOS 8.0以上  
# 1. プロジェクト設定
## CocoaPodsの導入方法  
Podfile に下記を記述し `pod install` を実行してください。  
CocoaPodsで、導入する場合は、自動的に依存が解決されます。  
※ProjectNameは、アプリのプロジェクト名となります。  

```
target 'ProjectName' do
    pod 'Growthbeat'
end
```  
## Frameworkをプロジェクトに導入する場合  
<a href="/sdk">最新版iOS SDK ダウンロードページ</a>

ダウンロードしたファイルを解凍し、そのフォルダの中の **Growthbeat.framework** をプロジェクトへ組み込みます。
任意のXcodeプロジェクトを開き Growthbeat.framework をインポートしてください。  
Growthbeat.framework のインポートの方法は以下の２つです  

1. Xcodeプロジェクトに Growthbeat.framework をドラッグアンドドロップする
2. Bulid Phases -> Link Binary With Libraries の + ボタンを押し、Add Other...からGrowthbeat.frameworkを選択する

Growthbeat.framework は、下記 Framework が必須となります

- Foundation.framework
- UIKit.framework
- CoreGraphics.framework
- SystemConfiguration.framework
- AdSupport.framework
- CFNetwork.framework

# 2. プロジェクトのPush Notificationを有効にする  
Capabilities にて、Push Notifications を ON にします。  
この設定を行っていないと、iOS10, iOS8にて、デバイストークンの取得ができない可能性があります。(Xcode8.0にて確認)  

<img src="/img/sdk/iOS/capabilities-push-notification.png" width="90%" />

# 3. 実装コード  
## 初期化  
Growth Push の初期化を行います。初期化では、デバイス登録、認証、およびデバイスの基本情報の送信が行われます。  

```objc
// AppDelegate.m
#import <Growthbeat/Growthbeat.h>

@implementation AppDelegate

- (BOOL) application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary* )launchOptions {
    [[GrowthPush sharedInstance] initializeWithApplicationId:@"YOUR_APLICATION_ID" credentialId:@"YOUR_CREDENTIAL_ID" environment:kGrowthPushEnvironment];
    
    // 以下は、必ずinitializeWithApplicationId後に呼び出してください
    [[GrowthPush sharedInstance] requestDeviceToken];
}

- (void) application:(UIApplication* )application didRegisterForRemoteNotificationsWithDeviceToken:(NSData* )deviceToken {
    [[GrowthPush sharedInstance] setDeviceToken:deviceToken];
}

- (void) application:(UIApplication* )application didFailToRegisterForRemoteNotificationsWithError:(NSError* )error {
    // エラーがあったかどうかを確認するため
    NSLog(@"didFailToRegisterForRemoteNotification : %@", error);
}

@end
```

## タグ送信  
セグメントを設定するために、任意のタグを埋め込んでください。  

```objc
// ViewController.m
#import <Growthbeat/Growthbeat.h>

@implementation ViewController

- (void) viewDidLoad:() {
    [[GrowthPush sharedInstance] setTag:@"Development" value:@"true"];
}

@end
```

## イベント送信  
セグメントを設定するために、任意のイベントを埋め込んでください。  

```objc
// ViewController.m
#import <Growthbeat/Growthbeat.h>

@implementation ViewController

- (void) viewDidLoad:() {
    [[GrowthPush sharedInstance] trackEvent:@"Launch"];
}

@end
```

# その他設定について  
## プッシュ通知証明書の作成  
開発ビルドと、リリースビルドの証明書を作成する必要があります。[iOS プッシュ通知証明書作成方法](http://faq.growthbeat.com/article/178-ios-p12)の参考に、証明書の作成を行ってください。作成した証明書を、Growth Push管理画面に登録します。
## 管理画面設定  
### プッシュ通知証明書の設定  
Growth Push管理画面の証明書設定ページにて、証明書の設定を行ってください。  
[プッシュ通知証明書の設定方法](/manual/growthpush/#プッシュ通知証明書の登録-更新)  
### プッシュ通知の作成  
[配信作成](/manual/growthpush/#配信作成)を参考に、プッシュ通知が届くかを確認します。  
### セグメントについて  
セグメント配信を利用する際に、実装が必要となります。  
[配信したいセグメント](/manual/growthpush/#セグメントの作成)に沿って、タグやイベントの紐付けを行ってください。  
# 備考  
## 全機能を利用する方法  
Growthbeatは、プッシュ通知以外に、ポップアップメッセージ機能を用意しております。追加の実装を行うことで機能を利用することができます。  
詳しくは、[全機能導入ガイド](/sdk/ios/all-in-one)をご覧ください。  
## 最新版のSDKへのアップグレード方法  
Growth Push SDKからGrowthbeat 2.x SDK へまたは、Growthbeat 1.x SDKからGrowthbeat 2.x SDKへのアップグレードをされる方は
[SDKのアップグレードガイド](/sdk/ios/upgrade)をご参照ください。  
## サンプルコード  
実装サンプルは、[Githubレポジトリ](https://github.com/growthbeat/growthbeat-ios)を参考にしてください。  
# お問い合わせ  
ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/)を閲覧してください。  
