---
categories: 'sdk'
date: 2015-07-15T14:32:58+09:00
description: 'Growthbeat Web の導入方法について説明します'
draft: false
title: Growthbeat Web Gudeliene
---

# 概要

グロースハックツールプラットホーム [Growthbeat](https://growthbeat.com/) の SDK 導入マニュアルです。Growthbeat の各サービスをアプリ内で利用するための技術仕様や導入の仕方について解説いたします。

現在、下記サービスを提供しています：

|サービス名|機能|
|---------|---|
|Growthbeat|ユーザー総合管理|
|Growth Push|プッシュ通知|
|Growth Analytics|総合分析・解析|
|Growth Message|ポップアップ通知|
|Growth Link|ディープリンクツール|

Growthbeat を利用するにはウェブページから新規登録をしていただくか、担当者より発行された情報からログインをしてご利用いただけます。

## SDKについて

各種 SDK は [GitHub](https://github.com/SIROK) 上で開発され、オープンソースとして公開されております。そのままアプリへ導入することも可能です。SDK を変更しご使用いただくことは可能となっております。しかし公開されている SDK のソース以外の変更を行われた場合の、アプリの不具合や動作については保証し兼ねますのでご了承ください。

Growthbeat は現在 iOS, Android, Unity に対応しております。Cocos-2D-X も対応予定はしておりますので別途ご相談ください。

* [Growthbeat iOS SDK](https://github.com/SIROK/growthbeat-ios)
* [Growthbeat Android SDK](https://github.com/SIROK/growthbeat-android)
* [Growthbeat Unity SDK](https://github.com/SIROK/growthbeat-unity)
* [Growthbeat Growthbeat Cocos2D-X SDK SDK](https://github.com/SIROK/growthbeat-cocos2dx)

### SDK機能

1つの SDK で Growthbeat 全てのサービスの機能が利用できます。_Note Growth Message, Growth Pushは、現在開発中です。_

## SDK導入について

### 導入方法

[最新版Web SDK ダウンロードページ ](https://github.com/SIROK/growthbeat-javascript/releases/tag/latest)

HTML のscript タグで SDK を読み込みます：

```html
 <script src="path/to/growthbeat.min.js"></script>
```


### 実装方法

SDK利用時にアプリケーション ID と SDKキー を使用して認証をします。

Growthbeat 管理画面からアプリケーション ID と SDK キーを取得します。アカウント作成時に API キー（REST API を使用時の認証に必須となるキー）と SDK キー（SDK の認証のために必須となるキー）が用意されています。

* API キー（REST API を使用時の認証に必須となるキー）
* SDK キー（SDK の認証のために必須となるキー）

各サービスのヘッダーのアカウント名をクリックしします。そして、表示されるメニューから **マイページ** をお選びください。Growthbeat マイページから API キー と SDKキーを見ることができます

また、アプリケーション ID は Growthbeat のマイページから任意のアプリケーションを選択し、アプリケーション ID を控えてください。
