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

Growthbeatの初期化処理の後に、Growth Linkの初期化処理を呼び出してください。**APPLICATION_ID**と**CREDENTIAL_ID**は
Growthbeatの初期化時と同じものです。

```objc
[[GrowthLink sharedInstance] initializeWithApplicationId:@"APPLICATION_ID" credentialId:@"CREDENTIAL_ID"];
```

URL起動の処理で、handleOpenUrl:urlメソッドを呼び出す

```objc
- (BOOL) application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    [[GrowthLink sharedInstance] handleOpenUrl:url];
    return YES;
}
```

## アプリを開くスキームの設定
ディープリンクからアプリを起動できるように、info.plistの編集、もしくは Xcode上で Info -> URL Typesからディープリンクからアプリを開くスキームの設定をします。
URL Schemesにはスキームを、IdentifierにはBundle Identifierなどアプリごとに一意になる値を入力してください。
<img src="/img/link/link-guide-scheme.png" alt="link-guide-scheme" title="link-guide-scheme" width="100%"/>

## ディープリンクアクションの実装

SDKには、GBIntentHandlerというプロトコルが定義されており、この実装でディープリンク時のアクションを実装することができます。

たとえば下記のような形で実装できます。
```objc
#import <Growthbeat/GBCustomIntentHandler.h>  //インポート文に追記
```

```objc
 [[GrowthbeatCore sharedInstance] addIntentHandler:[[GBCustomIntentHandler alloc] initWithBlock:^BOOL(GBCustomIntent *customIntent) {
        NSDictionary *extra = customIntent.extra;
        NSLog(@"extra: %@", extra);
        return YES;
}]];
```

## UniversalLinkの設定 (iOS9.x系)
iOS9からカスタムスキームでの遷移に関する仕様が大幅に変更されたため、iOS9.x系に対応するにはUniversalLinkの設定が必要になります。

### apple.developer.com での設定

apple.developer.comにアクセスし、 “Certificate, Identifiers & Profiles”を選択。
その後"Identifers"をクリック。

<img src="/img/link/guide-universal-01.png" alt="guide-universal-01" title="guide-universal-01" width="70%"/>

<img src="/img/link/guide-universal-02.png" alt="guide-universal-02" title="guide-universal-02" width="30%"/>

Identiferを登録済みの時は"Edit"から編集を、未登録のときは"+"ボタンから新たに登録をしていきます。

NameやBundle IDは通常と同じ要領で記入してください。
<img src="/img/link/guide-universal-03.png" alt="guide-universal-03" title="guide-universal-03" width="70%"/>

Bundle IDはXcode上のGeneralのタブを選択することで確認できます。

<img src="/img/link/guide-xcode-bundle.png" alt="guide-xcode-bundle" title="gguide-xcode-bundle" width="70%"/>

App Servicesの欄で、Associated Domainsにチェックをてください。これを忘れるとこのあとのXcode上の操作でエラーがでてしまいます。

<img src="/img/link/guide-universal-04.png" alt="guide-universal-04" title="guide-universal-04" width="70%"/>

apple.developer.com での設定は以上です。Saveボタンをおして保存してください。

### Xcode上 での設定
先ほどONにしたAssociated Domainsを使ってGrowthLinkのドメインを登録していきます。
登録の前に、先ほど登録したApp Identifierと同じTeamが選択されていることを確認してください。TeamはGeneralタブにあるIdentityセクションから選択できます。

CapabilitiesタブのAssociated Domainsをクリックすると展開されドメインの編集ができます。
ここで、GrowthLinkのドメインとなるgbt.ioを登録します。
＋ボタンをクリックし、"applinks:gbt.io"を追加してください。“applinks:”というのはprefixで登録ドメインの前につける必要があります。

<img src="/img/link/guide-universal-05.png" alt="guide-universal-05" title="guide-universal-05" width="70%"/>

現在、なんらかの原因でentitlementsファイルが生成されないことがあるようです。
プロジェクトブラウザ上でentitlementsファイルが生成されていることを確認してください。
<img src="/img/link/guide-universal-06.png" alt="guide-universal-06" title="guide-universal-06" width="70%"/>

**ハンドリング処理の実装**

AppDelegate.mにUniversalLinkのハンドリング処理を実装します。
```obj-c
- (BOOL) application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler{
        if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
            NSURL *webpageURL = userActivity.webpageURL;
            if ( [self handleUniversalLink:webpageURL]){
                [[GrowthLink sharedInstance] handleOpenUrl:webpageURL];
            } else {
                 // 例：コンテンツをアプリで開けない時にSafariにリダイレクトする場合
                [[UIApplication sharedApplication] openURL:webpageURL];
                return false;
            }
    
        }
    return true;
}

- (BOOL) handleUniversalLink:(NSURL*) url{
    NSURLComponents *component = [[NSURLComponents alloc] initWithURL:url resolvingAgainstBaseURL:true];
    if (!component || !component.host) return false;
    if ([@"gbt.io" isEqualToString:component.host] ) {
        
        return true;
    }
    return false;
}

```
Xcode上での設定は以上になります。

### GrowthLink管理画面上 での設定

「基本設定」タブ -> リンク基本設定セクションから UniversalLinkの設定ができます。
「Universal Linkに対応させる」をチェックし、
apple.developer.comに登録してあるBundle IdentifierとApple TeamIDを記入してください。どちらもapple.developer.comApp Identifiersから確認できます。
記入後「保存」ボタンを押して設定を保存してください。

<img src="/img/link/guide-universal-07.png" alt="guide-universal-07" title="guide-universal-07" width="70%"/>

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
