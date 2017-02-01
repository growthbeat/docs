---
categories: 'sdk'
date: 2016-09-28T12:00:00+09:00
description: 'Growthbeat SDK for iOS 新バージョンアップデート方法についてご紹介します'
draft: false
title: Growthbeat iOS SDK | 新バージョン移行方法
---

**Growth Push SDK及びGrowthbeat SDK 1.xのサポートは、2016年12月21日までとなっております。**  
# SDKアップグレードガイド  
最新のSDKにお乗り換えする方法についてご紹介いたします。  

- Growth Push SDKから最新のGrowthbeat SDKへのアップグレード
- Growthbeat 1.x SDKから最新のGrowthbeat SDKへのアップグレード

についてご紹介いたします。  
# Growth Push SDKからのアップグレードについて  
## 概要  
Growth Push の認証から、Growthbeat の認証に移行されるため、新しい ApplicationId と SDKキー（クレデンシャルID）を取得する必要がございます。 

ApplicationId は、Growth Push管理画面左メニュー「アプリ詳細」の 「Growthbeat アプリケーションID」 にて確認ができます。

SDKキーは、Growthbeat管理画面左メニュー「 [アカウント](https://growthbeat.com/mypage/account)」の「クレデンシャルID > SDK」にて確認ができます。

### 注意点  
これまで Growth Push でご利用いただいていた ApplicationId は数値型、シークレットキーは文字列型になっています。  

|項目|型|
|---|---|
|applicationId|数値型|
|secret|文字列型/32文字|
Growthbeat SDK で利用するものは、 applicationId 、 credentialId ともに文字列型になっています。  

|項目|型|
|---|---|
|applicationId|文字列型/16文字|
|credentailId|文字列型/32文字|
Growthbeat SDK 乗り換え時に、これまで Growth Push で利用していたシークレットキーを設定しても、正しく動作しませんのでご注意くださいませ。  必ず、SDKキーをご利用ください。  
## 導入コード  
### 初期化
Growth Push SDK に存在した EasyGrowthPushクラス は、 Growthbeat SDK では廃止となっており、 `didRegisterForRemoteNotificationsWithDeviceToken` のデリゲートで、デバイストークンを Growth Push へ送信する実装を行う必要がございます。  

- GrowthPush SDK  

**EasyGrowthPushクラスをご利用の場合**

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary* )launchOptions {
  [EasyGrowthPush setApplicationId:kYourApplicationId secret:@"YOU_APP_SECRET" environment:kGrowthPushEnvironment debug:YES];
}
```

**GrowthPushクラスをご利用の場合**

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary* )launchOptions {
	[GrowthPush setApplicationId:kYourApplicationId secret:@"YOU_APP_SECRET" environment:kGrowthPushEnvironment debug:YES];
	[GrowthPush requestDeviceToken];
	[GrowthPush setDeviceTags];

	[GrowthPush setTag:@"development" value@"true"];
	[GrowthPush trackEvent:@"Launch"];

	// バッチの削除
	[GrowthPush clearBadge];
}
```  

- Growthbeat 2.x SDK

```objc
- (BOOL)application:(UIApplication* )application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	[[GrowthPush sharedInstance] initializeWithApplicationId:@"YOUR_APPLICATION_ID" credentialId:@"YOUR_CREDENTIAL_ID" environment:kGrowthPushEnvironment];
	
	// 以下は、必ずinitializeWithApplicationId後に呼び出してください
	// デバイストークンを明示的に要求
	[[GrowthPush sharedInstance] requestDeviceToken];

	[[GrowthPush sharedInstance] setTag:@"development" value@"true"];
	[[GrowthPush sharedInstance] trackEvent:@"Launch"];

	// バッチの削除
	[[GrowthPush sharedInstance] clearBadge];
}

- (void) application:(UIApplication* )application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
	// デバイストークンをGrowhPushに送信
	[[GrowthPush sharedInstance] setDeviceToken:deviceToken];
}
```  

Growth Push SDK か らGrowthbeat SDK 2.x への乗り換え実装は以上となります。  
# Growthbeat SDK 1.xからのアップグレード  
## 機能削除  

- インターフェスの変更があります。
 - 次の実装変更点でご確認ください。
- Growth Analytics クラスがなくなりました。  
 - Growth Analytics に関する記述は全て削除してください。
 - 2.x以降は、GrowthPush#setTag, trackEventをご利用ください。
- GrowthbeatCoreクラスが、Growthbeatクラスに統合されました。  
 - start, stop, initializeは削除されました。

## 導入コード  
### 初期化  

- Growthbeat 1.x

```objc
- (BOOL) application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    [[Growthbeat sharedInstance] initializeWithApplicationId:@"YOUR_APPLICATION_ID" credentialId:@"YOUR_CREDENTIAL_ID"];
    [[GrowthPush sharedInstance] requestDeviceTokenWithEnvironment:kGrowthPushEnvironment];
    [[Growthbeat sharedInstance] getClient:^(GBClient* client) {
        NSLog(@"clientId is %@",client.id);
    }];

}

- (void) applicationDidBecomeActive:(UIApplication *)application {
    [[Growthbeat sharedInstance] start];
}

- (void) applicationWillResignActive:(UIApplication *)application {
    [[Growthbeat sharedInstance] stop];
}
```

- Growthbeat 2.x

```objc
- (BOOL) application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    [[GrowthPush sharedInstance] initializeWithApplicationId:@"YOUR_APPLICATION_ID" credentialId:@"YOUR_CREDENTIAL_ID" environment:kGrowthPushEnvironment];
    
    // 以下は、必ずinitializeWithApplicationId後に呼び出してください
    [[GrowthPush sharedInstance] requestDeviceToken];
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        GBClient* client = [[Growthbeat sharedInstance] waitClient];
        NSLog(@"clientId is %@", client.id);
    });

}

- (void) applicationDidBecomeActive:(UIApplication *)application {
	// startは不要となります。
}

- (void) applicationWillResignActive:(UIApplication *)application {
	// stopは不要となります。
}
```  
# 移行確認方法
Growth Push の管理画面で、該当デバイスのプッシュ通知ステータスが `Active` になっていれば、正しくプッシュ通知が行えます。  
移行対応は、以上となります。  
