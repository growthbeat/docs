---
categories: 'sdk'
date: 2015-05-19T14:32:58+09:00
description: 'Growthbeat Web の API について説明します'
draft: true
title: Growthbeat Web API
---

# Growthbeat Web API

## 初期化 デバイス登録・認証

Growthbeatへデバイス登録・認証を行います。

```
 <script>
    Growthbeat.init({
        applicationId: 'YOUR_APPLICATION_ID',
        credentialId: 'YOUR_CREDENTIAL_ID'
    }, function() {
        // 認証完了後の処理
    });
 </script>
```

## ユーザー属性、行動ログの付与 (Growth Analyticsの利用)

Growth Analyticsの初期化をします。初期化の中に、端末の基本情報の送信、広告IDの取得が行われます。

送信されたデータは、Growth Analytics管理画面をご覧ください。

##### 端末・ユーザー情報を送信する

端末やユーザーの情報をGrowth Analyticsへ送信します。送信することでGrowth Analytics上で解析・分析を行うことができます。取得したい情報を、任意の場所に実装してください。

あらかじめ特定のタグやイベントを送信するためのメソッドを用意しております。

- *setBasicTags* 基本情報となるタグのセットです。
- *open* 起動イベントを送信します。
- *close* 終了イベントを送信します。
- *purchase* 課金イベントを送信します。
- *setUserId* アプリのユニークなUserIdを送信します。
- *setName* アプリのユーザー名を送信します。
- *setAge* アプリのユーザーの年齢を送信します。
- *setGender* アプリのユーザーの性別を送信します。
- *setLevel* アプリのユーザーのレベルを送信します。
- *setDevelopment* 開発用のフラグを送信します。
- *setUserAgent* ユーザーエージェントを送信します。
- *setLanguage* 端末の言語設定
- *setRandom* 乱数を送信します。
- *setAdvertisingId* 広告IDを送信します。

また、上記で予め用意されているタグ、イベント以外でも下記メソッドを使用することで、カスタムタグ、カスタムイベントが送信できます。

- *track* カスタムイベントを送信します。
- *tag* カスタムタグを送信します。

**端末のデータを送信**

SetBasicTagsメソッドは端末のデータを送信します。

このメソッドには、下記が含まれます。

1. setLanguage
1. setUserAgent

```
GrowthAnalytics.setBasicTags();
```


**起動/終了イベントを送信する**

##### 起動 (open)

ユーザーの起動イベントを送信します。セッション時間の計測を開始するために必要なメソッドです。

```
GrowthAnalytics.open();
```

##### 終了 (close)

アプリの終了イベントを送信します。セッション時間の計測を停止します。

```
GrowthAnalytics.close();
```

**課金情報を送信する**

課金時にメソッドを呼び、課金額、アイテムのカテゴリなどを送信することができます。

```
GrowthAnalytics.purchase(price, 'ITEM_CATEGORY', 'ITEM_NAME');
```

**ユニークなユーザーIDを送信**

アプリのユニークなユーザーIDを送信します。

```
GrowthAnalytics.setUserId('YOUR_USER_ID');
```

**ユーザー名を送信**

アプリのユーザー名を送信します。

```
GrowthAnalytics.setName('YOUR_NAME');
```

**年齢を送信**

アプリのユーザーの年齢を送信します。

```
GrowthAnalytics.setAge(age);
```

**性別を送信**

```
GrowthAnalytics.SetGender(gender);
```

**レベルを送信**

アプリのユーザーのレベルを送信します。

```
GrowthAnalytics.setLevel(level);
```

**開発用の紐付け**

開発用のフラグをつける

```
GrowthAnalytics.setDevelopment(true);
```

**ユーザーエージェントを送信**

ユーザーエージェントを送信します。

例.) Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) ...

```
GrowthAnalytics.setUserAgent();
```

**端末の言語設定を送信**

端末の設定言語を送信します。

例.) ja, en

```
GrowthAnalytics.setLanguage();
```

**乱数を送信**

乱数を端末の情報として紐付けます。

```
GrowthAnalytics.setRandom();
```

**広告IDを送信**

広告IDを送信します。

```
GrowthAnalytics.setAdvertisingId(advertisingId);
```

**広告オプトアウトの送信**

ユーザーが広告IDを利用するのを拒否しているかを送信します。

```
GrowthAnalytics.setTrackingEnabled(true);
```

**カスタムイベントを送信する**

##### カスタムイベントとは？
任意のイベントを取得することが出来ます。カスタムイベントには、それぞれ一意のEventIDを割り当てる必要があります。

- EventID  
`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_NAME>`  
上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。

    - YOUR_APPLICATION_ID  
        ApplicationIDを指定します。

    - CUSTOM_EVENT_NAME  
        英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

###### カスタムイベントの送信

###### パラメータ

|項目名|詳細|
|:--|:--|
|name|カスタムイベント名|
|properties|カスタムイベントに持たせる任意のObject|
|option|任意のパラメータ。ONCE, COUNTERのいずれかを指定します。|

###### option

|項目名|詳細|
|:--|:--|
|GrowthAnalytics.TrackOptionDefault|デフォルト値。特に何もしません。|
|GrowthAnalytics.TrackOptionOnce|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|GrowthAnalytics.TrackOptionCounter|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|

```
GrowthAnalytics.track({
    name: 'CUSTOM_EVENT_NAME',
    properties: {
        param1: 'test',
        param2: 'hoge'
    }
    option: GrowthAnalytics.TrackOptionOnce
});
```

**カスタムタグを送信する**

##### カスタムタグとは？
任意のタグを取得することが出来ます。カスタムタグには、それぞれ一意のTagIDを割り当てる必要があります。

- TagID  
`Tag:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_TAG_NAME>`  
上記全文で一意なTagIDと認識されます。大文字小文字は区別されません。

    - YOUR_APPLICATION_ID  
        ApplicationIDを指定されます。

    - CUSTOM_TAG_NAME  
        英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

##### カスタムタグの送信

###### パラメータ

|項目名|詳細|
|:--|:--|
|name|カスタムタグ名|
|value|カスタムタグに持たせる任意のValue|

```
GrowthAnalytics.tag({
    name: 'CUSTOM_TAG_NAME',
    value: 'test'
});
```

## 備考

SDK導入について、ご不明な点などございます場合は、Growthbeat[お問い合わせフォーム](https://growthbeat.com/inquiry)からお問い合わせください。
