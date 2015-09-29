---
categories: 'sdk'
date: 2015-09-14T14:32:58+09:00
description: 'Growthbeat iOS の API について説明します'
draft: true
title: Growthbeat iOS API
---

# メソッド一覧

端末やユーザーの情報を Growth Analytics へ送信します。送信することで Growth Analytics 上で解析・分析を行うことができます。取得したい情報を任意の場所に実装してください。

## setBasicTags

setBasicTagsメソッドは端末のデータを送信します。このメソッドには、下記が含まれます。

- setDeviceModel
- setOs
- setLanguage
- setTimeZone
- setTimeZoneOffset
- setAppVersion
- setAdvertisingId
- setTrackingEnabled

```objc
[[GrowthAnalytics sharedInstance] setBasicTags];
```


### open

ユーザーの起動イベントを送信します。セッション時間の計測を開始するために必要なメソッドです。`AppDelegate` のapplicationDidBecomeActive: に以下のコードを実装してください:

```objc
- (void)applicationDidBecomeActive:(UIApplication *)application {
    [[GrowthAnalytics sharedInstance] open];
    [[GrowthAnalytics sharedInstance] setBasicTags];
}
```


### close

アプリの終了イベントを送信します。セッション時間の計測を停止します。`AppDelegateのapplicationWillResignActive:` に以下のコードを実装してください。

```objc
- (void)applicationWillResignActive:(UIApplication *)application {
    [[GrowthAnalytics sharedInstance] close];
}
```


### purchase

課金情報を送信します。課金時にメソッドを呼び、課金額、アイテムのカテゴリなどを送信することができます。

```objc
[[GrowthAnalytics sharedInstance] purchase:price setCategory:@"ITEM_CATEGORY" setProduct:@"ITEM_NAME"];
```


### setUserId

ユニークなユーザーIDを送信。アプリのユニークなユーザーIDを送信します。

```objc
[[GrowthAnalytics sharedInstance] setUserId:@"YOUR_USER_ID"];
```


### setName

ユーザー名を送信。アプリのユーザー名を送信します。

```objc
[[GrowthAnalytics sharedInstance] setName:@"YOUR_NAME"];
```


### setAge

年齢を送信。アプリのユーザーの年齢を送信します。

```objc
[[GrowthAnalytics sharedInstance] setAge:age];
```


### setGender

性別を送信。変数は、`GAGender`を用いてどちらか性別を送信してください。

```objc
// 男性
[[GrowthAnalytics sharedInstance] setGender:GAGenderMale];

// 女性
[[GrowthAnalytics sharedInstance] setGender:GAGenderFemale];
```

### setLevel

レベルを送信。アプリのユーザーのレベルを送信します。

```objc
[[GrowthAnalytics sharedInstance] setLevel:level];
```


### setDevelopment

開発用の紐付け。開発用のフラグをつける

```objc
[[GrowthAnalytics sharedInstance] setDevelopment:YES]:
```


### setDeviceModel

端末モデル名を送信。端末のモデル名を送信します。

例: iPhone, iPad

```objc
[[GrowthAnalytics sharedInstance] setDeviceModel];
```


### setOS

端末OSを送信。端末のOSを送信します。

例: iOS 8.0, iOS 8.4

```objc
[[GrowthAnalytics sharedInsance] setOS];
```


### setLanguage

端末の言語設定を送信。端末の設定言語を送信します。

例: ja, en

```objc
[[GrowthAnalytics sharedInstance] setLanguage];
```


### setTimeZone

タイムゾーンを送信する。端末で設定されたタイムゾーンを送信する。

例: Asia/Tokyo, America/Los_Angeles

```objc
[[GrowthAnalytics sharedInstance] setTimeZone];
```


### setTimeZoneOffset

タイムゾーンオフセットを送信。端末の設定された時刻から、標準時刻の差分時間を送信します。

例: 9, -11

```objc
[[GrowthAnalytics sharedInstance] setTimeZoneOffset];
```


### setAppVersion

アプリバージョンを送信。アプリに設定されたアプリバージョンを送信します。
`Info.plist` の `CFBundleVersion に設定している値が入ります。

```objc
[[GrowthAnalytics sharedInstance] setAppVersion];
```


### setRandom

乱数を送信例。乱数を端末の情報として紐付けます。

```objc
[[GrowthAnalytics sharedInstance] setRandom];
```


### setAdvertisingId

広告IDを送信。広告IDを送信します。広告の表示欄がないアプリで利用すると申請時にリジェクトをされる可能性が高いので設定される場合は、十分にご注意ください。

```objc
[[Growthbeat sharedInstance] setAdvertisingId];
```

### setTrackingEnabled

広告オプトアウトの送信。ユーザーが広告IDを利用するのを拒否しているかを送信します。

```objc
[[Growthbeat sharedInstance] setTrackingEnabled];
```


##

#### カスタムイベント・タグを送信する

***カスタムイベントとは？***

任意のイベントを取得することが出来ます。カスタムイベントには、それぞれ一意のEventIDを割り当てる必要があります。

- EventID: `Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>`
    - 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。
    - `YOUR_APPLICATION_ID`: ApplicationIDを指定されます。
    - `CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

**カスタムイベントの送信**

```objc
- (void)track:(NSString *)name;
- (void)track:(NSString *)name properties:(NSDictionary *)properties;
- (void)track:(NSString *)name option:(GATrackOption)option;
- (void)track:(NSString *)name properties:(NSDictionary *)properties option:(GATrackOption)option;
```

##### パラメータ

|項目名|詳細|
|:--|:--|
|name|カスタムイベントID|
|properties|カスタムイベントに持たせる任意のMap|
|option|GATrackOptionDefault,GATrackOptionOnce,GATrackOptionCounterのいずれかを指定します。|

##### GATrackOption

|項目名|詳細|
|:--|:--|
|GATrackOptionDefault|デフォルト値。特に何もしません。|
|GATrackOptionOnce|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|GATrackOptionCounter|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|

```objc
[[GrowthAnalytics sharedInstance] track:@"CUSTOM_EVENT_ID"];
[[GrowthAnalytics sharedInstance] track:@"CUSTOM_EVENT_ID" properties:@{@"key":@"value"}];
[[GrowthAnalytics sharedInstance] track:@"CUSTOM_EVENT_ID" option:GATrackOptionCounter];
[[GrowthAnalytics sharedInstance] track:@"CUSTOM_EVENT_ID" properties:@{@"key":@"value"} option:GATrackOptionCounter];
```

***カスタムタグとは？***

任意のタグを取得することが出来ます。カスタムタグには、それぞれ一意のTagIDを割り当てる必要があります。

- TagID: `Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>`
    - 上記全文で一意なTagIDと認識されます。大文字小文字は区別されません。
    - `YOUR_APPLICATION_ID`: ApplicationIDを指定されます。
    - `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

**カスタムタグの送信**

```objc
- (void)tag:(NSString *)name;
- (void)tag:(NSString *)name value:(NSString *)value;
```

##### パラメータ

|項目名|詳細|
|:--|:--|
|name|カスタムタグID|
|value|カスタムタグに持たせる任意のValue|

```objc
[[GrowthAnalytics sharedInstance] tag:@"CUSTOM_TAG_ID"];
[[GrowthAnalytics sharedInstance] tag:@"CUSTOM_TAG_ID" value:@"value"];
```

##### フルカスタマイズなイベント・タグの送信

***フルカスタマイズなイベントの送信***

特定のネームスペース、イベントIDを設定していただくことが可能です。下記、イベントID発行例となります。

- EventID: `Event:<YOUR_APPLICATION_ID>:<NAMESPACE>:<EVENT_ID>`
    - 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。
    - `YOUR_APPLICATION_ID`: ApplicationIDを指定されます。
    - `NAMESPACE`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）
    - `EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

##### メソッド

```objc
- (void)track:(NSString *)_namespace name:(NSString *)name properties:(NSDictionary *)properties option:(GATrackOption)option completion:(void(^)(GAClientEvent * clientEvent))completion;
```

##### パラメータ

|項目名|詳細|
|:--|:--|
|_namespace|ネームスペース|
|name|イベントID|
|properties|イベントに持たせる任意のMap|
|option|GATrackOptionDefault,GATrackOptionOnce,GATrackOptionCounterのいずれかを指定します。|
|completion|イベント作成後のコールバック|

##### GATrackOption

|項目名|詳細|
|:--|:--|
|GATrackOptionDefault|デフォルト値。特に何もしません。|
|GATrackOptionOnce|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|GATrackOptionCounter|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|

```objc
[[GrowthAnalytics sharedInstance] track:@"NAMESPACE" name:@"EVENT_ID" properties:@{@"key":@"value"} option:GATrackOptionCounter completion:nil];
```

***フルカスタマイズなタグの送信***


特定のネームスペース、タグIDを設定していただくことが可能です。下記、タグID発行例となります。

- TagID: `Tag:<YOUR_APPLICATION_ID>:<NAMESPACE>:<TAG_ID>`
    - 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。
    - `YOUR_APPLICATION_ID`: ApplicationIDを指定されます。
    - `NAMESPACE`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）
    - `TAG_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

##### メソッド

```objc
- (void)tag:(NSString *)_namespace name:(NSString *)name value:(NSString *)value completion:(void(^)(GAClientTag * clientTag))completion;
```

##### パラメータ

|項目名|詳細|
|:--|:--|
|_namespace|ネームスペース|
|name|タグID|
|value|タグに持たせる任意のValue|
|completion|タグ作成後のコールバック|

```objc
[[GrowthAnalytics sharedInstance] tag:@"NAMESPACE" name:@"TAG_ID" value:@"value" completion:nil];
```

### プッシュ通知の実装 (Growth Pushの利用)

#### Growth Pushご利用の初期設定について

Growth Push管理画面、証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[iOSプッシュ通知証明書作成方法](http://growthhack.sirok.co.jp/growthpush/ios-p12/)

XCodeプロジェクトのBuild Setting > Provisioning Profileの設定をしてください。誤った設定方法となりますと、デバイストークンの取得ができません。

#### デバイストークンを取得・送信をする

1. Growthhbeat#initializeWithApplicationIdの後に下記を呼び出す

    ```
    [[GrowthPush sharedInstance] requestDeviceTokenWithEnvironment:kGrowthPushEnvironment];
    ```

1. ApplicationDelegateにて下記を追加

    ```
    - (void)application:(UIApplication *)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
        [[GrowthPush sharedInstance] setDeviceToken:deviceToken];
    }
    ```

#### イベント・タグの取得

***こちらのメソッドは、Growth Pushが、Growth Analyticsに統合されました段階で削除予定となっております。これまでGrowth Push SDKをご利用しておりました方は、Growth Analyticsのイベント・タグの送信にお乗り換えくださいませ。***

**イベントを送信する**

```objc
- (void)trackEvent:(NSString *)name;
- (void)trackEvent:(NSString *)name value:(NSString *)value;
```

##### パラメータ

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|


```objc
[[GrowthPush sharedInstance] trackEvent:@"EVENT_NAME"];
[[GrowthPush sharedInstance] trackEvent:@"EVENT_NAME" value:@"EVENT_VALUE"];
```

**タグを送信する**

```objc
- (void)setTag:(NSString *)name;
- (void)setTag:(NSString *)name value:(NSString *)value;
```

##### パラメータ

|項目名|詳細|
|:--|:--|
|name|タグ名|
|value|タグに持たせる値|

```objc
[[GrowthPush sharedInstance] setTag:@"TAG_NAME"];
[[GrowthPush sharedInstance] setTag:@"TAG_NAME" value:@"TAG_VALUE"];
```

### アプリ内ポップアップメッセージの実装 (Growth Messageの利用)

#### メッセージを表示するViewを指定

メッセージ配信設定で、設定したイベントを、任意の箇所で、Growth Analyticsのtrackメソッドを呼び出し、イベントを送信します。この呼び出し箇所が、メッセージの表示箇所になります。

***デフォルトで用意しているイベントの送信***

- *open* 起動イベントを送信します。
- *close* 終了イベントを送信します。
- *purchase* 課金イベントを送信します。

***カスタムイベントの送信***

```objc
- (void)track:(NSString *)name;
- (void)track:(NSString *)name properties:(NSDictionary *)properties;
- (void)track:(NSString *)name option:(GATrackOption)option;
- (void)track:(NSString *)name properties:(NSDictionary *)properties option:(GATrackOption)option;
```

Growth Analyticsの実装方法を参照してください。

### ディープリンクの実装 (Growth Linkの利用)

#### SDKの導入

Growthbeat.frameworkを導入した上で、Growthbeat SDK内の `source/GrowthLink` に含まれる**GrowthLink.framework**を導入します。任意のXcodeプロジェクトを開き、Growthbeat.frameworkをインポートしてください。

1. Growthbeat.frameworkのインポートの方法は2つあります。

- Xcodeプロジェクトに、GrowthLink.frameworkをドラッグアンドドロップする。
- Bulid Phases -> Link Binary With Librariesの+ボタンを押し、Add Other...からGrowthLink.frameworkを選択。

2. GrowthLinkのimport文を記述します。

```objc
#import <GrowthLink/GrowthLink.h>
```

#### 初期設定

**Growthbeatへデバイス登録・認証を行います。**

1. Growthbeatの初期化処理の後に、Growth Linkの初期化処理を呼び出す

```objc
[[GrowthLink sharedInstance] initializeWithApplicationId:@"APPLICATION_ID" credentialId:@"CREDENTIAL_ID"];
```

1. カスタムURLスキームでアプリを起動できるように、Info.plistを設定する。

1. URL起動の処理で、handleOpenUrl:urlメソッドを呼び出す

```objc
- (BOOL) application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    [[GrowthLink sharedInstance] handleOpenUrl:url];
    return YES;
}
```

#### ディープリンクアクションの実装

SDKには、GBIntentHandler (Androidでは、IntentHandler)というプロトコルが定義されており、この実装でディープリンク時のアクションを実装することができます。

たとえば下記のような形で実装できます。

```objc
@interface MyCustomIntentHandler : NSObject <GBIntentHandler>
@end

@implementation MyCustomIntentHandler

- (BOOL)handleIntent:(GBIntent *)intent {

    if (intent.type != GBIntentTypeCustom)
        return false;

    GBCustomIntent *customIntent = (GBCustomIntent *)intent;
    NSString *action = [customIntent.extra objectForKey:@"action"];
    if(![action isEqualToString:@"open_view"])
        return false;

    NSString *view = [customIntent.extra objectForKey:@"view"];

    // TODO viewに対応する画面を開く処理

    return true;

}

@end
```

こうして定義したクラスを GrowthbeatCore クラスの setIntentHandlers: に設定することで、利用可能となります。

```objc
NSMutableArray *intentHandlers = [NSMutableArray array];
[intentHandlers addObject:[[GBUrlIntentHandler alloc] init]];
[intentHandlers addObject:[[GBNoopIntentHandler alloc] init]];
[intentHandlers addObject:[[MyCustomIntentHandler alloc] init]];
[[GrowthbeatCore sharedInstance] setIntentHandlers:intentHandlers];
```

### Growth Push SDkからの乗り換え方法について

#### 前準備

GrowthPushのApplicationIdから、GrowthbeatのApplicationIdに移行されるた
め、[Growthbeat](https://growthbeat.com/)にアクセスして、ApplicationId、SDKキー（CredentialID）を確認します。

#### 実装方法

**SDKの初期化**

- GrowthPush SDK

```
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

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Growthbeat SDKの初期化
    [[Growthbeat sharedInstance] initializeWithApplicationId:@"YOUR_APPLICATION_ID" credentialId:@"YOUR_CREDENTIAL_ID"];
    // デバイストークンを明示的に要求
    [[GrowthPush sharedInstance] requestDeviceTokenWithEnvironment:kGrowthPushEnvironment];

    // deviceTagの取得
    [[GrowthPush sharedInstance] setDeviceTags];
}
```

**アプリ起動時**

- Growthbeat SDK

```
- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.

    // バッチの削除
    [[GrowthPush sharedInstance] clearBadge];

    // Launchイベントの取得
    [[GrowthPush sharedInstance] trackEvent:@"Launch"];
}
```

**デバイストークンの取得**

- Growthbeat SDK
```
- (void) application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    // デバイストークンをGrowhPushに送信
    [[GrowthPush sharedInstance] setDeviceToken:deviceToken];
}
```

**タグ・イベントの取得**

- GrowthPush SDK

```
// タグの取得
[GrowthPush setTag:@"TAG_NAME"];
[GrowthPush setTag:@"TAG_NAME" value:@"TAG_VALUE"];
// イベントの取得
[GrowthPush trackEvent:@"EVENT_NAME"];
[GrowthPush trackEvent:@"EVENT_NAME" value:@"EVENT_VALUE"];
```

- Growthbeat SDK

```
// タグの取得
[[GrowthPush sharedInstance] setTag:@"TAG_NAME"];
[[GrowthPush sharedInstance] setTag:@"TAG_NAME" value:@"TAG_VALUE"];
// イベントの取得
[[GrowthPush sharedInstance] trackEvent:@"EVENT_NAME"];
[[GrowthPush sharedInstance] trackEvent:@"EVENT_NAME" value:@"EVENT_VALUE"];
```

## 備考

SDK導入について、ご不明な点などございます場合は、Growthbeat[お問い合わせフォーム](https://growthbeat.com/inquiry)からお問い合わせください。
