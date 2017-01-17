---
categories: 'sdk'
date: 2017-01-06T23:47:00+09:00
description: 'Growthbeat iOS の導入方法について説明します'
draft: false
title: Growthbeat iOS SDK | 全機能利用ガイド
---

Version 2.0.4
# Growthbeat利用ガイド  
# 1. Growth Pushを利用  
Growth Pushのみを利用する[導入方法](/sdk/ios/guide)をご覧ください。
# 2. Growth Messageを利用  
Growth Message を用いてポップアップを任意のタイミングで表示させるには、「[配信トリガー](http://support.growthbeat.com/manual/growthmessage/#配信トリガー)」 を設定します。「[配信トリガー](http://support.growthbeat.com/manual/growthmessage/#配信トリガー)」 は作成したカスタムイベントの中から選ぶ必要がございます。

## 実装コード
配信トリガーとなるカスタムイベントを作成するには、ポップアップメッセージを表示させたい任意の場所に下記のようなイベントを送信するメソッドを記述してください。

```objc
// ViewController.m
#import <Growthbeat/Growthbeat.h>

@implementation ViewController

- (void) viewDidLoad:() {
    [[GrowthPush sharedInstance] trackEvent:@"OpenViewController"];
}

@end
```

## 管理画面設定方法 
「[配信トリガー](http://support.growthbeat.com/manual/growthmessage/#配信トリガー)」 で先程実装したイベント（今回の場合は OpenViewController）を選択すると、指定のイベントが発火したタイミングでメッセージが表示されます。

詳しいメッセージの作成方法は [配信作成](/manual/growthmessage/#配信作成) を参照してください。

<!--  
# 3. Growth Linkを利用  
## 実装コード  
### 初期化  
SafariServices.frameworkを追加します。  
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

## プロジェクトへディープリンクの設定  
iOS9以上の場合は、UniversalLinksの設定が必須となります。iOS9未満のみ対応させる場合は、スキーム設定を行うだけです。  
### プロジェクトのAssociated Domainsを有効にする  
Apple Developers Member Center にアクセスし “Certificate, Identifiers & Profiles” を選択します。その後"Identifers"をクリックします。  

<img src="/img/link/guide-universal-01.png" alt="guide-universal-01" title="guide-universal-01" width="100%"/>

<img src="/img/link/guide-universal-02.png" alt="guide-universal-02" title="guide-universal-02" width="30%"/>

Identiferを登録済みの時は"Edit"から編集を、未登録のときは"+"ボタンから新たに登録をします。
<img src="/img/link/guide-universal-03.png" alt="guide-universal-03" title="guide-universal-03" width="100%"/>

App Servicesの欄で、Associated Domainsにチェックをてください。  

<img src="/img/link/guide-universal-04.png" alt="guide-universal-04" title="guide-universal-04" width="100%"/>

Saveボタンを押し、保存してください。  
Apple Developers Member Center での設定は以上です。  
### Xcodeプロジェクト設定  

**動作の注意**  
`General -> Identity -> Version`　が空欄であると正常に動作しません。
正しいバージョンを指定してください。  

#### スキームの設定  
ディープリンクからアプリを起動できるように、info.plistの編集、もしくは Xcode上で Info -> URL Typesからディープリンクからアプリを開くスキームの設定をします。
URL Schemesにはスキームを、IdentifierにはBundle Identifierなどアプリごとに一意になる値を入力してください。
<img src="/img/link/link-guide-scheme.png" alt="link-guide-scheme" title="link-guide-scheme" width="100%"/>

#### Universal Links用の設定 (iOS9.x以上)  
先ほどONにしたAssociated Domainsを使ってGrowth Linkのドメインを登録します。  
登録の前に、先ほど登録したApp Identifierと同じTeamが選択されていることを確認してください。TeamはGeneralタブにあるIdentityセクションから選択できます。  
CapabilitiesタブのAssociated Domainsをクリックすると展開されドメインの編集ができます。  
ここで、Growth Linkのドメインとなるgbt.ioを登録します。＋ボタンをクリックし、"applinks:gbt.io"を追加してください。“applinks:”というのはprefixで登録ドメインの前につける必要があります。  

<img src="/img/link/guide-universal-05.png" alt="guide-universal-05" title="guide-universal-05" width="100%"/>

プロジェクトブラウザ上でentitlementsファイルが生成されていることを確認してください。  
**Xcode7上で、なんらかの原因でentitlementsファイルが生成されないことが報告されています。**

<img src="/img/link/guide-universal-06.png" alt="guide-universal-06" title="guide-universal-06" width="100%"/>

また、entitlementsファイルがビルドに含まれている必要があります。含まれない場合はentitlementsファイルをクリックし、Targetにチェックが入っているか確認してください。  
## Growth Link管理画面上での設定  
「基本設定」タブ -> リンク基本設定セクションから Universal Linksの設定ができます。  
「Universal Linkに対応させる」をチェックし、Bundle IdentifierとApple TeamIDを記入してください。  
フォーム入力後、「保存」ボタンを押して設定を保存します。  

<img src="/img/link/guide-universal-07.png" alt="guide-universal-07" title="guide-universal-07" width="70%"/>

## Growth Link設定備考  
### 検証の際の注意点  
* 検証の際はアプリを一度アンインストールし、インストールしなおしてください。この手順を踏まない場合古い設定のままになります。
* Growth Linkの仕様上、Universal  Links用の設定については10分ごとに反映されます。検証をする際は設定を保存後10分以上経過した後に行ってください。

### ランディングページを挟む場合の注意点  
[【UniversalLinks】ランディングページにリンクを埋め込む際の注意点](http://faq.growthbeat.com/article/114-universallink)の記事を参考にしてください。  
-->

# 備考  
## 最新版のSDKへの乗り換え方法  
Growth Push SDKからGrowthbeat 2.x SDK への乗り換えまたは、Growthbeat 1.x SDKからGrowthbeat 2.x SDKへの乗り換えをされる方は
[SDKの移行ガイド](/sdk/ios/upgrade)をご参照ください。    
## サンプルについて  
実装サンプルは、[Githubレポジトリ](https://github.com/growthbeat/growthbeat-ios)を参考にしてください。  
# お問い合わせ  
ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/)を閲覧してください。  
