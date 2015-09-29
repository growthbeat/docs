---
categories: 'sdk'
date: 2015-09-14T14:32:58+09:00
description: 'Growthbeat iOS の導入方法について説明します'
draft: true
title: Growthbeat iOS Gudeliene
---

# 概要

グロースハックツールプラットホーム、[Growthbeat](https://growthbeat.com/)のSDK導入マニュアルです。Growthbeatの各サービスをアプリ内で利用するための技術仕様や導入の仕方について解説いたします。

現在、下記サービスを用意しております。

|サービス名|機能|
|---------|---|
|Growthbeat|ユーザー総合管理|
|Growth Push|プッシュ通知|
|Growth Analytics|総合分析・解析|
|Growth Message|ポップアップ通知|
|Growth Link|ディープリンクツール|

Growthbeatを利用するには、webから新規登録をしていただく、または担当者より発行された情報からログインをしてご利用いただけます。

## SDKについて

各種SDKは、[github](https://github.com/SIROK)へ掲載しており、オープンソースとなっております。そのままアプリへ導入することも可能です。SDKを変更しご使用いただくことは可能となっておりますが、公開されているSDKのソース以外の変更を行われた場合の、アプリの不具合や動作については保証し兼ねますのでご了承ください。

Growthbeatは、現在iOS, Android, Unityに対応しております。Cocos-2D-Xへの対応予定はしておりますので、別途ご相談くださいませ。

- [Growthbeat iOS SDK](https://github.com/SIROK/growthbeat-ios)
- [Growthbeat Android SDK](https://github.com/SIROK/growthbeat-android)
- [Growthbeat Unity SDK](https://github.com/SIROK/growthbeat-unity)
- [Growthbeat Growthbeat Cocos2D-X SDK SDK](https://github.com/SIROK/growthbeat-cocos2dx)

### SDK機能

1SDKで、Growthbeat全てのサービスの機能が利用できます。(Growth Linkのご利用には、別SDKの導入が必要です)

## SDK導入について

### 導入方法

[最新版iOS SDK ダウンロードページ ](https://github.com/SIROK/growthbeat-ios/archive/latest.zip)

ダウンロードしたファイルを解凍し、そのフォルダの中の**Growthbeat.framework**をプロジェクトへ組み込みます。任意のXcodeプロジェクトを開き、Growthbeat.frameworkをインポートしてください。

1. Growthbeat.frameworkのインポートの方法は2つあります。

- Xcodeプロジェクトに、Growthbeat.frameworkをドラッグアンドドロップする。
- Bulid Phases -> Link Binary With Librariesの+ボタンを押し、Add Other...からGrowthbeat.frameworkを選択。

2. Growthbeatのimport文を記述します。

```obj
#import <Growthbeat/Growthbeat.h>
```

CocoaPodsにも対応いたしました。

Podfileに下記を記述し、`pod install`を実行してください。

```bash
pod 'Growthbeat'
```

### 依存について

Growthbeat.frameworkは、下記Frameworkが必須となります。

- Foundation.framework
- UIKit.framework
- CoreGraphics.framework
- SystemConfiguration.framework
- AdSupport.framework
- CFNetwork.framework

### 実装方法

#### はじめる前に

SDK利用時に、アプリケーションIDとSDKキーを使用して認証します。

Growthbeat管理画面からアプリケーションID、SDKキーを取得します。アカウント作成時に、APIキー(REST APIを使用時の認証に必須となるキー)とSDKキー(SDKの認証のために必須となるキー)が用意されます。

- APIキー(REST APIを使用時の認証に必須となるキー)
- SDKキー(SDKの認証のために必須となるキー)

各サービスのヘッダーのアカウント名をクリックし、表示されるメニューから"マイページ"をお選びください。Growthbeatマイページに、APIキー、SDKキーを掲載しております。

またアプリケーションIDは、Growthbeatのマイページから任意のアプリケーションを選択し、アプリケーションIDを控えてください。
