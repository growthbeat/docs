---
categories: 'sdk'
date: 2015-05-19T14:32:58+09:00
description: 'Growthbeat Web の API について説明します'
draft: true
title: Growthbeat Web API
---

# Growth Push API

## 初期化

Growth Pushの初期化を行います。

```javascript
init(params:Params):void
```

## RegistrationIdの取得・送信

```javascript
register():void
```

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

