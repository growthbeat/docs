---
categories: 'sdk'
date: 2015-02-17T14:32:58+09:00
description: 'Growthbeat Web の API について説明します'
draft: true
title: Growthbeat Web API
---

Version 1.1.4

# Growth Push API

## 初期化

Growth Pushの初期化を行います。

```javascript
init(params:Params):void
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|params|Paramsオブジェクト|

Paramsオブジェクト

```javascript
interface Params {
  applicationId:number;
  credentialId:string;
  environment?:string;
  receiver:string;
  appName:string;
  icon:string;
  clickEventName:string;
}
```

|項目名|詳細|
|:--|:--|
|applicationId| Growth Push管理画面のアプリID |
|credentialId| Growth Push管理画面のシークレットキー |
|environment| 本番環境: `production` 開発環境: `development` |
|receiver| 本番環境: `/growthpush-sw.min.js` 開発環境: `/growthpush-sw.js` |
|appName| アプリ名。通知のタイトルで表示されます。 |
|icon| アイコン画像。通知のアイコンで表示されます。 |
|clickEventName| 通知クリックのイベント。例: NotificationClick |

## RegistrationIdの取得・送信

```javascript
register():void
```

## イベントインターフェイス

### イベント購読

イベントを購読します。

```javascript
on(event:string, fn:Function)
```

|項目名|詳細|
|:--|:--|
|event|イベント名|
|fn|コールバック関数|

イベントを一度だけ購読します。

```javascript
once(event:string, fn:Function)
```

|項目名|詳細|
|:--|:--|
|event|イベント名|
|fn|コールバック関数|

### イベント購読をやめる

イベント購読をやめます。

```javascript
off(event:string, fn?:Function)
```

|項目名|詳細|
|:--|:--|
|event|イベント名|
|fn|コールバック関数|

## Push許可状態の取得

許可済みの場合は`true`、非対応または未許可の場合は`false`が返ります。

```javascript
permitted():boolean
```

## イベントの送信（Push専用）

```javascript
track(name:string)
```
**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|

## タグの送信（Push専用）

```javascript
tag(name:string, value?:string)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|
|value|タグに持たせる値|
