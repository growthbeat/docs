---
categories: 'sdk'
date: 2016-10-13T19:41:00+09:00
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
GrowthPushのApplicationIdから、GrowthbeatのApplicationIdに移行されるため、[Growthbeat](https://growthbeat.com/)にアクセスして、ApplicationId、SDKキー（CredentialID）を確認します。   ApplicationIdについては、Growth　Pushの左メニュー、シークレットキーのgrowthbeatApplicationIdという項目の左の文字列をご利用ください。  
SDKキーに関しては、Growthbeatマイページにてご確認ください。  
### 注意点  
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
Growthbeat SDK乗り換え時に、これまでGrowth Pushで利用していたシークレットキーを設定しても、正しく動作しませんのでご注意くださいませ。  必ず、SDKキーをご利用ください。  
## 導入コード  
### 初期化
Growth Push SDKに存在したEasyGrowthPushクラスは、Growthbeat SDKでは廃止となっており、 `didRegisterForRemoteNotificationsWithDeviceToken` のデリゲートで、デバイストークンをGrowth Pushへ送信する実装を行う必要がございます。  

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

Growth Push SDKからGrowthbeat SDK 2.xへの乗り換え実装は以上となります。  
# Growthbeat SDK 1.xからのアップグレード  
## 機能削除  

- インターフェスの変更があります。
 - 次の実装変更点でご確認ください。
- GrowthAnalyticsクラスがなくなりました。  
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
Growth Pushへの管理画面で、該当デバイスのプッシュ通知ステータスが `Active` になっていれば、正しくプッシュ通知が行えます。  
移行対応は、以上となります。  
