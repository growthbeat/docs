---
categories: 'sdk'
date: 2015-09-14T14:32:58+09:00
description: 'Growthbeat iOS の API について説明します'
draft: false
title: Growthbeat iOS API
---

# Growthbeat API

## Growthbeatインスタンスを取得

```objc
+ (instancetype)sharedInstance;
```

## 初期化

Growthbeatへデバイス登録・認証を行います。初期化の中に、端末の基本情報の送信、広告IDの取得が行われます。

```objc
- (void)initializeWithApplicationId:(NSString *)initialApplicationId credentialId:(NSString *)initialCredentialId;
```

# Growth Analytics API

取得したい情報を、任意の場所に実装してください。送信されたデータは、Growth Analytics管理画面をご覧ください。

## 基本情報の送信

端末の基本情報を送信します。基本情報には以下が含まれます。

- setDeviceModel
- setOs
- setLanguage
- setTimeZone
- setTimeZoneOffset
- setAppVersion
- setAdvertisingId
- setTrackingEnabled

```objc
- (void)setBasicTags;
```

## 特定のイベント・タグを送信

### open

ユーザーの起動イベントを送信します。セッション時間の計測を開始するために必要なメソッドです。

```objc
- (void)applicationDidBecomeActive:(UIApplication *)application {
    [[GrowthAnalytics sharedInstance] open];
    [[GrowthAnalytics sharedInstance] setBasicTags];
}
```

### close

アプリの終了イベントを送信します。セッション時間の計測を停止します。

```objc
- (void)applicationWillResignActive:(UIApplication *)application {
    [[GrowthAnalytics sharedInstance] close];
}
```

### purchase

課金時にメソッドを呼び、課金額、アイテムのカテゴリなどを送信することができます。

```objc
- (IBAction) tapPurchaseEventButton:(id)sender {
    [[GrowthAnalytics sharedInstance] purchase:[priceTextField.text intValue] setCategory:@"item" setProduct:itemTextField.text];
}
[[GrowthAnalytics sharedInstance] purchase:price setCategory:@"ITEM_CATEGORY" setProduct:@"ITEM_NAME"];
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|purchase| 任意の課金のプロパティ名 |
|setCategory| 任意のカテゴリ |
|setProduct| 任意のアイテム名|

### setUserId

アプリのユニークなユーザーIDを送信します。

```objc
- (void)setUserId:(NSString *)userId;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|userId| 任意のユニークなユーザー名|

### setName

アプリのユーザー名を送信します。

```objc
- (void)setName:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|userId| 任意のユーザー名 |

### setAge

アプリのユーザーの年齢を送信します。

```objc
- (void)setAge:(int)age;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|age| ユーザーの年齢 |

### setGender

変数は、GAGenderを用いてどちらか性別を送信してください。

```objc
- (void)setGender:(GAGender)gender;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|gender| 男性: `GAGenderMale` 女性: `GAGenderFemale` |

### setLevel

アプリのユーザーのレベルを送信します。

```objc
- (void)setLevel:(int)level;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|level| ユーザーのレベル |

### setDevelopment

開発用のフラグををつけます。

```objc
- (void)setDevelopment:(BOOL)development;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|development| 開発用の場合は `YES` |

### setRandom

乱数を端末の情報として紐付けます。

```objc
- (void)setRandom;
```

### setAdvertisingId

広告IDを送信します。

```objc
- (void)setAdvertisingId;
```

注意：_広告の表示欄がないアプリで利用すると申請時にリジェクトをされる可能性が高いので設定される場合は、十分にご注意ください。_

### setTrackingEnabled

ユーザーが広告IDを利用するのを拒否しているかを送信します。

```objc
- (void)setTrackingEnabled;
```

## カスタムイベント・タグを送信

### イベントの送信

```objc
- (void)track:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。`YUR_APPLICATION_ID`: ApplicationIDを指定されます。`CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|


### イベント名と任意のMapの送信


```objc
- (void)track:(NSString *)name properties:(NSDictionary *)properties;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。`YUR_APPLICATION_ID`: ApplicationIDを指定されます。`CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
|properties|カスタムイベントに持たせる任意のMap|


### イベント名とイベント取得回数オプションの送信

```objc
- (void)track:(NSString *)name option:(GATrackOption)option;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。`YUR_APPLICATION_ID`: ApplicationIDを指定されます。`CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
|option|GATrackOptionDefault,GATrackOptionOnce,GATrackOptionCounterのいずれかを指定します。|

**option**

|項目名|詳細|
|:--|:--|
|GATrackOptionDefault|デフォルト値。特に何もしません。|
|GATrackOptionOnce|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|GATrackOptionCounter|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|


**イベント名と任意のMapの送信とイベント取得回数オプションの送信**

```objc
- (void)track:(NSString *)name properties:(NSDictionary *)properties option:(GATrackOption)option;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。`YUR_APPLICATION_ID`: ApplicationIDを指定されます。`CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
|properties|カスタムイベントに持たせる任意のMap|
|option|GATrackOptionDefault,GATrackOptionOnce,GATrackOptionCounterのいずれかを指定します。|

**option**

|項目名|詳細|
|:--|:--|
|GATrackOptionDefault|デフォルト値。特に何もしません。|
|GATrackOptionOnce|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|GATrackOptionCounter|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|


### タグ名の送信

```objc
- (void)tag:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` 上記全文で一意なTagIDと認識されます。大文字小文字は区別されません。`YOUR_APPLICATION_ID`: ApplicationIDを指定されます。 `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|

### タグ名と任意のvalueを送信

```objc
- (void)tag:(NSString *)name value:(NSString *)value;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` 上記全文で一意なTagIDと認識されます。大文字小文字は区別されません。`YOUR_APPLICATION_ID`: ApplicationIDを指定されます。 `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
|value|カスタムタグに持たせる任意のValue|


## フルカスタマイズなイベントの送信
特定のネームスペース、イベントIDを設定していただくことが可能です。

```objc
- (void)track:(NSString *)_namespace name:(NSString *)name properties:(NSDictionary *)properties option:(GATrackOption)option completion:(void(^)(GAClientEvent * clientEvent))completion;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|_namespace|ネームスペース|
|name|`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。`YUR_APPLICATION_ID`: ApplicationIDを指定されます。`CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
|properties|イベントに持たせる任意のMap|
|option|GATrackOptionDefault,GATrackOptionOnce,GATrackOptionCounterのいずれかを指定します。|
|completion|イベント作成後のコールバック|


**option**

|項目名|詳細|
|:--|:--|
|GATrackOptionDefault|デフォルト値。特に何もしません。|
|GATrackOptionOnce|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|GATrackOptionCounter|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|


## フルカスタマイズなタグの送信


特定のネームスペース、タグIDを設定していただくことが可能です。


```objc
- (void)tag:(NSString *)_namespace name:(NSString *)name value:(NSString *)value completion:(void(^)(GAClientTag * clientTag))completion;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|_namespace|ネームスペース|
|name|`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` 上記全文で一意なTagIDと認識されます。大文字小文字は区別されません。`YOUR_APPLICATION_ID`: ApplicationIDを指定されます。 `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
|value|タグに持たせる任意のValue|
|completion|タグ作成後のコールバック|


# Growth Push API

## 初期設定

Growth Push管理画面、証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[iOSプッシュ通知証明書作成方法](http://growthhack.sirok.co.jp/growthpush/ios-p12/)

XCodeプロジェクトのBuild Setting > Provisioning Profileの設定をしてください。誤った設定方法となりますと、デバイストークンの取得ができません。

## デバイストークンの送信

**initialize**

```objc
- (void)requestDeviceTokenWithEnvironment:(GPEnvironment)newEnvironment;
```

**デバイストークンの送信**

```objc
- (void) application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
}
```

## イベント・タグの取得

***こちらのメソッドは、Growth Pushが、Growth Analyticsに統合されました段階で削除予定となっております。これまでGrowth Push SDKをご利用しておりました方は、Growth Analyticsのイベント・タグの送信にお乗り換えくださいませ。***


### イベント名の送信

```objc
- (void)trackEvent:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|

### イベント名と任意の値の送信

```objc
- (void)trackEvent:(NSString *)name value:(NSString *)value;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|


### タグ名の送信

```objc
- (void)setTag:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|

### タグと任意のタグ名の送信

```objc
- (void)setTag:(NSString *)name value:(NSString *)value;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|
|value|タグに持たせる値|


# Growth Message API

## メッセージを表示するViewを指定

メッセージ配信設定で、設定したイベントを、任意の箇所で、Growth Analyticsのtrackメソッドを呼び出し、イベントを送信します。この呼び出し箇所が、メッセージの表示箇所になります。

Growth Analyticsの実装方法を参照してください。

# Growth Link API

## SDKの導入

Growthbeat.frameworkを導入した上で、Growthbeat SDK内の `source/GrowthLink` に含まれる**GrowthLink.framework**を導入します。任意のXcodeプロジェクトを開き、Growthbeat.frameworkをインポートしてください。

1. Growthbeat.frameworkのインポートの方法は2つあります。

- Xcodeプロジェクトに、GrowthLink.frameworkをドラッグアンドドロップする。
- Bulid Phases -> Link Binary With Librariesの+ボタンを押し、Add Other...からGrowthLink.frameworkを選択。

2. GrowthLinkのimport文を記述します。

```objc
#import <GrowthLink/GrowthLink.h>
```

## 初期設定

**Growthbeatへデバイス登録・認証を行います。**

1. Growthbeatの初期化処理の後に、Growth Linkの初期化処理を呼び出す

```objc
- (void)initializeWithApplicationId:(NSString *)initialApplicationId APPLICATION_ID:(NSString *)CREDENTIAL_ID;
```

1. カスタムURLスキームでアプリを起動できるように、Info.plistを設定する。

1. URL起動の処理で、handleOpenUrl:urlメソッドを呼び出す

```objc
- (BOOL) application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    [[GrowthLink sharedInstance] handleOpenUrl:url];
    return YES;
}
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

SDK導入について、ご不明な点などございます場合は、Growthbeat[お問い合わせフォーム](https://growthbeat.com/inquiry)からお問い合わせください。また [リリースノート](http://support.growthbeat.com/sdk/ios/release/)もご参照ください。
