---
categories: 'sdk'
date: 2015-09-27T23:47:00+09:00
description: 'Growthbeat iOS の導入方法について説明します'
draft: false
title: Growthbeat iOS SDK | 全機能利用ガイド
---

Version 2.0.4
# Growthbeat利用ガイド  
# 1. Growth Pushを利用  
Growth Pushのみを利用する[導入方法](/sdk/android/guide)をご覧ください。
# 2. Growth Messageを利用  
## 実装コード  
アプリに、Growth Pushの任意のイベントを送信します。アプリが任意のアクティビティが、呼び出されたときに、ポップアップメッセージを表示する実装を、例として紹介します。  

```objc
[[GrowthPush sharedInstance] trackEvent:@"Launch" value:nil showMessage:^(void(^renderMessage)()){
    renderMessage();
} failure:^(NSString * detail) {

}];
```
任意のイベントが呼び出されたときに表示するポップアップメッセージは、管理画面上で設定できます。管理画面の設定については、次に説明します。  

## 管理画面設定方法  

ここではアプリの起動時にメッセージを出す方法を説明します（共通初期設定でアプリの起動イベントを送信している必要があります）。

まず、管理画面にてアプリ起動時に配信されるメッセージを作成します。メッセージの作成方法は[こちら](/manual/growthmessage/#配信作成)を参考にしてください。

アプリ起動以外にも、カスタムイベントをメッセージ配信のトリガーにすることにより、アプリの任意の場所でメッセージを配信することができます。詳しくは、[こちら](/sdk/ios/reference/#カスタムイベント送信)をご参照ください。

# 3. GrowthLinkを利用  
## 実装コード  
### 初期化  
GrowthLinkのimport文を記述します。  
Growth Linkの初期化処理を呼び出してください。 **APPLICATION_ID** と **CREDENTIAL_ID** は
Growthbeatの初期化時と同じものです。  
URL起動の処理で、handleOpenUrl:urlメソッドを呼び出します。  

```objc
// AppDelegate.m
#import <Growthbeat/Growthbeat.h>

@implementation AppDelegate

- (BOOL) application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary* )launchOptions {
    // ...
    [[GrowthLink sharedInstance] initializeWithApplicationId:@"APPLICATION_ID" credentialId:@"CREDENTIAL_ID"];
}

- (BOOL) application:(UIApplication*) application openURL:(NSURL* )url sourceApplication:(NSString* )sourceApplication annotation:(id) annotation {
    [[GrowthLink sharedInstance] handleOpenUrl:url];
    return YES;
}

- (BOOL) application:(UIApplication* )application continueUserActivity:(NSUserActivity* )userActivity restorationHandler:(void (^)(NSArray* \_Nullable)) restorationHandler {
    if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
        NSURL * webpageURL = userActivity.webpageURL;
        [[GrowthLink sharedInstance] handleUniversalLinks:webpageURL];
    }
    return true;
}


@end
```

### ディープリンクアクションの実装  
SDKには、GBIntentHandlerが定義されており、この実装でディープリンク時のアクションを実装することができます。  
たとえば下記のような形で実装できます。  

```objc
// AppDelegate.m
#import <Growthbeat/Growthbeat.h>

@implementation AppDelegate

- (BOOL) application:(UIApplication* )application didFinishLaunchingWithOptions:(NSDictionary* )launchOptions {
    //...

    [[Growthbeat sharedInstance] addIntentHandler:[[GBCustomIntentHandler alloc] initWithBlock:^BOOL(GBCustomIntent* customIntent) {
           NSDictionary* extra = customIntent.extra;
           NSLog(@"extra: %@", extra);
           return YES;
   }]];

}

@end
```

## プロジェクト設定

### アプリを開くスキームの設定
ディープリンクからアプリを起動できるように、info.plistの編集、もしくは Xcode上で Info -> URL Typesからディープリンクからアプリを開くスキームの設定をします。
URL Schemesにはスキームを、IdentifierにはBundle Identifierなどアプリごとに一意になる値を入力してください。
<img src="/img/link/link-guide-scheme.png" alt="link-guide-scheme" title="link-guide-scheme" width="100%"/>

### バージョンの設定

`General -> Identity -> Version`　が空欄であると正常に動作しません。
正しいバージョンを指定してください。

### Universal Links用の設定 (iOS9.x系)

iOS9 からカスタムスキームでの遷移に関する仕様が大幅に変更されました。なので iOS9.x 系に対応するには Universal Links の設定が必要になります。

#### apple.developer.com での設定

apple.developer.com にアクセスし “Certificate, Identifiers & Profiles” を選択。
その後"Identifers"をクリック。

<img src="/img/link/guide-universal-01.png" alt="guide-universal-01" title="guide-universal-01" width="70%"/>

<img src="/img/link/guide-universal-02.png" alt="guide-universal-02" title="guide-universal-02" width="30%"/>

Identiferを登録済みの時は"Edit"から編集を、未登録のときは"+"ボタンから新たに登録をしていきます。

NameやBundle IDは通常と同じ要領で記入してください。
<img src="/img/link/guide-universal-03.png" alt="guide-universal-03" title="guide-universal-03" width="70%"/>

Bundle ID は Xcode 上のGeneralのタブを選択することで確認できます。

<img src="/img/link/guide-xcode-bundle.png" alt="guide-xcode-bundle" title="gguide-xcode-bundle" width="70%"/>

App Servicesの欄で、Associated Domainsにチェックをてください。これを忘れるとこのあとのXcode上の操作でエラーがでてしまいます。

<img src="/img/link/guide-universal-04.png" alt="guide-universal-04" title="guide-universal-04" width="70%"/>

apple.developer.com での設定は以上です。Saveボタンをおして保存してください。

#### Xcode上 での設定

先ほどONにしたAssociated Domainsを使ってGrowthLinkのドメインを登録していきます。
登録の前に、先ほど登録したApp Identifierと同じTeamが選択されていることを確認してください。TeamはGeneralタブにあるIdentityセクションから選択できます。

CapabilitiesタブのAssociated Domainsをクリックすると展開されドメインの編集ができます。
ここで、GrowthLinkのドメインとなるgbt.ioを登録します。
＋ボタンをクリックし、"applinks:gbt.io"を追加してください。“applinks:”というのはprefixで登録ドメインの前につける必要があります。

<img src="/img/link/guide-universal-05.png" alt="guide-universal-05" title="guide-universal-05" width="70%"/>

現在、なんらかの原因でentitlementsファイルが生成されないことがあるようです。
プロジェクトブラウザ上でentitlementsファイルが生成されていることを確認してください。
<img src="/img/link/guide-universal-06.png" alt="guide-universal-06" title="guide-universal-06" width="70%"/>

また、entitlementsファイルがビルドに含まれている必要があります。含まれない場合はentitlementsファイルをクリックし、Targetにチェックが入っているか確認してください。

### GrowthLink管理画面上 での設定

「基本設定」タブ -> リンク基本設定セクションから Universal Linksの設定ができます。
「Universal Linkに対応させる」をチェックし、
apple.developer.comに登録してあるBundle IdentifierとApple TeamIDを記入してください。どちらもapple.developer.comApp Identifiersから確認できます。
記入後「保存」ボタンを押して設定を保存してください。

<img src="/img/link/guide-universal-07.png" alt="guide-universal-07" title="guide-universal-07" width="70%"/>

### 検証の際の注意点
* 検証の際はアプリを一度アンインストールし、インストールしなおしてください。この手順を踏まない場合古い設定のままになります。
* GrowthLinkの仕様上、Universal  Links用の設定については10分ごとに反映されます。検証をする際は設定を保存後10分以上経過した後に行ってください。

### ランディングページを挟む場合の注意点

以下の記事を参考にしてください。

[【UniversalLinks】ランディングページにリンクを埋め込む際の注意点](http://faq.growthbeat.com/article/114-universallink)

# 備考  
## 最新版のSDKへの乗り換え方法  
Growth Push SDKからGrowthbeat 2.x SDK への乗り換えまたは、Growthbeat 1.x SDKからGrowthbeat 2.x SDKへの乗り換えをされる方は
[SDKの移行ガイド](/sdk/ios/migrate)をご参照ください。    
## サンプルについて  
実装サンプルは、[Githubレポジトリ](https://github.com/growthbeat/growthbeat-ios)を参考にしてください。  
# お問い合わせ  
ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/)を閲覧してください。  
