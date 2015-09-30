---
categories: 'sdk'
date: 2015-09-14T14:32:58+09:00
description: 'Growthbeat Unity の API について説明します'
draft: false
title: Growthbeat Unity API
---

# Growthbeat Unity API

# 初期化 デバイス登録・認証

Growthbeatへデバイス登録・認証を行います。

## 開発環境

```
Growthbeat.GetInstance().Initialize("YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID", true);
```

## ユーザー属性、行動ログの付与 (Growth Analyticsの利用)

Growth Analyticsの初期化をします。初期化の中に、端末の基本情報の送信、広告IDの取得が行われます。

送信されたデータは、Growth Analytics管理画面をご覧ください。

### 端末・ユーザー情報を送信

端末やユーザーの情報をGrowth Analyticsへ送信します。送信することでGrowth Analytics上で解析・分析を行うことができます。取得したい情報を、任意の場所に実装してください。

あらかじめ特定のタグやイベントを送信するためのメソッドを用意しております。

- *SetBasicTags* 基本情報となるタグのセットです。
- *Open* 起動イベントを送信します。
- *Close* 終了イベントを送信します。
- *Purchase* 課金イベントを送信します。
- *SetUserId* アプリのユニークなUserIdを送信します。
- *SetName* アプリのユーザー名を送信します。
- *SetAge* アプリのユーザーの年齢を送信します。
- *SetGender* アプリのユーザーの性別を送信します。
- *SetLevel* アプリのユーザーのレベルを送信します。
- *SetDevelopment* 開発用のフラグを送信します。
- *SetDeviceModel* 端末のモデルを送信します。
- *SetOS* 端末のOS
- *SetLanguage* 端末の言語設定
- *SetTimeZone* 端末のタイムゾーン
- *SetTimeZoneOffset* 端末の標準時刻からの差
- *SetAppVersion* アプリの設定されているバージョン
- *SetRandom* 乱数を送信します。
- *SetAdvertisingId* 広告IDを送信します。

また、上記で予め用意されているタグ、イベント以外でも下記メソッドを使用することで、カスタムタグ、カスタムイベントが送信できます。

- *Track* カスタムイベントを送信します。
- *Tag* カスタムタグを送信します。

### 端末のデータを送信

SetBasicTagsメソッドは端末のデータを送信します。

このメソッドには、下記が含まれます。

1. SetDeviceModel
2. SetOs
3. SetLanguage
4. SetTimeZone
5. SetTimeZoneOffset
6. SetAppVersion
7. SetAdvertisingId
8. SetTrackingEnabled

*Unity*

```
GrowthAnalytics.GetInstance().SetBasicTags();
```

### 起動/終了イベントを送信する

#### 起動 (open)

ユーザーの起動イベントを送信します。セッション時間の計測を開始するために必要なメソッドです。

*Unity*

起動後に開かれるSceneのGameObjectのAwakeに以下を実装してください。

```
void Awake ()
{
    Growthbeat.GetInstance().Start();
}
```


#### 終了 (close)

*Unity*

アプリケーションが終了するタイミングで以下を実装してください。

```
void OnApplicationQuit()
{
	Growthbeat.GetInstance().Stop();
}
```

##### 課金情報を送信

課金時にメソッドを呼び、課金額、アイテムのカテゴリなどを送信することができます。

*Unity*

```
GrowthAnalytics.GetInstance().Purchase(price, "ITEM_CATEGORY", "ITEM_NAME");
```

##### ユニークなユーザーIDを送信

アプリのユニークなユーザーIDを送信します。

*Unity*

```
GrowthAnalytics.GetInstance().SetUserId("YOUR_USER_ID");
```

*ユーザー名を送信*

アプリのユーザー名を送信します。

*Unity*

```
GrowthAnalytics.GetInstance().SetName("YOUR_NAME");
```

##### 年齢を送信

アプリのユーザーの年齢を送信します。

*Unity*

```
GrowthAnalytics.GetInstance().SetAge(age);
```

##### 性別を送信

*Unity*

変数は、Genderのenumを用いてどちらか性別を送信してください

```
// 男性
GrowthAnalytics.GetInstance().SetGender(Gender.GenderMale);

// 女性
GrowthAnalytics.GetInstance().SetGender(Gender.GenderFemale);
```

##### レベルを送信

アプリのユーザーのレベルを送信します。

*Unity*

```
GrowthAnalytics.GetInstance().SetLevel(level);
```

##### 開発用の紐付け

開発用のフラグをつける

*Unity*

```
GrowthAnalytics.GetInstnace().SetDevelopment(true);
```

##### 端末モデル名を送信

端末のモデル名を送信します。

例.) SO-03C, iPhone, iPad, SC-03D

*Unity*

```
GrowthAnalytics.GetInstance().SetDeviceModel();
```

##### 端末OSを送信

端末のOSを送信します。

例.) iOS 8.0, Android 4.4

*Unity*

```
GrowthAnalytics.GetInstance().SetOS();
```

##### 端末の言語設定を送信

端末の設定言語を送信します。

例.) ja, en

*Unity*

```
GrowthAnalytics.GetInstance().SetLanguage();
```

##### タイムゾーンを送信する

端末で設定されたタイムゾーンを送信する。

例.) Asia/Tokyo, America/Los_Angeles

*Unity*

```
GrowthAnalytics.GetInstance().SetTimeZone();
```

##### タイムゾーンオフセットを送信

端末の設定された時刻から、標準時刻の差分時間を送信します。

例.) 9, -11

*Unity*

```
GrowthAnalytics.GetInstance().SetTimeZoneOffset();
```

##### アプリバージョンを送信

アプリに設定されたアプリバージョンを送信します。

*iOS*

Xcodeの場合、Info.plistのCFBundleVersionに設定している値が入ります。

*Android*

Androidの場合, AndroidManifest.xmlの`<manifest>` android:versionNameに設定される値が入ります。

*Unity*

```
GrowthAnalytics.GetInstance().SetAppVersion();

```

##### 乱数を送信

乱数を端末の情報として紐付けます。

*Unity*
```
GrowthAnalytics.GetInstance().SetRandom();
```

##### 広告IDを送信

広告IDを送信します。

_注意: iOSの場合、広告の表示欄がないアプリで利用すると申請時にリジェクトをされる可能性が高いので設定される場合は、十分にご注意ください。_

*Unity*

```
GrowthAnalytics.GetInstance().SetAdvertisingId();
```

##### 広告オプトアウトの送信

ユーザーが広告IDを利用するのを拒否しているかを送信します。

*Unity*

```
GrowthAnalytics.GetInstance().SetTrackingEnabled();
```

## カスタムイベントを送信

### カスタムイベントとは？
任意のイベントを取得することが出来ます。カスタムイベントには、それぞれ一意のEventIDを割り当てる必要があります。

- EventID   
`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>`  
上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。

    - YOUR_APPLICATION_ID  
        ApplicationIDを指定されます。

    - CUSTOM_EVENT_ID  
        英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

#### カスタムイベントの送信

*Unity*

- `public void Track (string name)`
- `public void Track (string name, Dictionary<string, string> properties)`
- `public void Track (string name, TrackOption option)`
- `public void Track (string name, Dictionary<string, string> properties, TrackOption option)`

#### パラメータ

|項目名|詳細|
|:--|:--|
|name|カスタムイベントID|
|properties|カスタムイベントに持たせる任意のMap|
|option|任意のパラメータ。ONCE, COUNTERのいずれかを指定します。|

#### option

|項目名|詳細|
|:--|:--|
|TrackOptionDefault|デフォルト値。特に何もしません。|
|TrackOptionOnce|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|TrackOptionCounter|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|

```
GrowthAnalytics.getInstance().Track("CUSTOM_EVENT_ID");
GrowthAnalytics.getInstance().Track("CUSTOM_EVENT_ID", properties);
GrowthAnalytics.getInstance().Track("CUSTOM_EVENT_ID", GrowthAnalytics.TrackOption.ONCE);
GrowthAnalytics.getInstance().Track("CUSTOM_EVENT_ID", properties, GrowthAnalytics.TrackOption.ONCE);
```

### カスタムタグを送信する

#### カスタムタグとは？
任意のタグを取得することが出来ます。カスタムタグには、それぞれ一意のTagIDを割り当てる必要があります。

- TagID   
`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>`  
上記全文で一意なTagIDと認識されます。大文字小文字は区別されません。

    - YOUR_APPLICATION_ID  
        ApplicationIDを指定されます。

    - LAST_ID  
        英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

#### カスタムタグの送信

*Unity*

- `public void Tag (string name)`
- `public void Tag (string name, string value)`

#### パラメータ

|項目名|詳細|
|:--|:--|
|tagId|カスタムタグID|
|value|カスタムタグに持たせる任意のValue|

```
GrowthAnalytics.GetInstance().Tag("CUSTOM_TAG_ID");
GrowthAnalytics.GetInstance().Tag("CUSTOM_TAG_ID", "value");
```

### フルカスタマイズなイベント送信

特定のネームスペース、イベントIDを設定していただくことが可能です。下記、イベントID発行例となります。

- EventID   
`Event:<YOUR_APPLICATION_ID>:<NAMESPACE>:<EVENT_ID>`  
上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。

    - YOUR_APPLICATION_ID  
        ApplicationIDを指定されます。

    - NAMESPACE
        英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

    - EVENT_ID  
        英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

*Unity*

- `public void Track (string _namespace, string name, Dictionary<string, string> properties, TrackOption option)`

#### パラメータ

|項目名|詳細|
|:--|:--|
|namespace|ネームスペース|
|name|イベントID|
|properties|イベントに持たせる任意のMap|
|option|任意のパラメータ。ONCE, COUNTERのいずれかを指定します。|

#### option

|項目名|詳細|
|:--|:--|
|ONCE|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|COUNTER|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|

```
GrowthAnalytics.GetInstance().Track("NAMESPACE", "CUSTOM_EVENT_ID", properties, GrowthAnalytics.TrackOption.ONCE);
```

### フルカスタマイズなカスタムタグを送信する

#### カスタムタグとは？

特定のネームスペース、タグIDを設定していただくことが可能です。下記、タグID発行例となります。

- TagID   
`Tag:<YOUR_APPLICATION_ID>:<NAMESPACE>:<TAG_ID>`  
上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。

    - YOUR_APPLICATION_ID  
        ApplicationIDを指定されます。

    - NAMESPACE
        英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

    - TAG_ID  
        英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

#### カスタムタグの送信

*Unity*

- `public void Tag (string _namespace, string name, string value)`

#### パラメータ

|項目名|詳細|
|:--|:--|
|namespace|ネームスペース|
|name|タグID|
|value|タグに持たせる任意のValue|

```
GrowthAnalytics.GetInstance().Tag("NAMESPACE", "TAG_ID", "value");
```

# プッシュ通知の実装 (Growth Pushの利用)

# 初期設定

Growth Push管理画面、証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[iOSプッシュ通知証明書作成方法](http://growthhack.sirok.co.jp/growthpush/ios-p12/)

[Android SenderId, APIキー取得方法](http://growthhack.sirok.co.jp/growthpush/gcm-api/)

*iOS*

XCodeプロジェクトのBuild Setting > Provisioning Profileの設定をしてください。誤った設定方法となりますと、デバイストークンの取得ができません。

*Android*

AndroidManifest.xmlの設定を行う必要がございます。

パーミッションは下記が必須となります。

```
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />

<permission
    android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE"
    android:protectionLevel="signature" />

<uses-permission android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE" />
```

オプションで、下記パーミッションを設定してください。

・ 通知音を鳴らす場合

```
<uses-permission android:name="android.permission.VIBRATE" />
```

・ アラートダイアログのプッシュ通知を表示する場合

```xml
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

また、プッシュ通知を受け取るために必要な設定を、`<application>`タグ内に実装してください。

```
<activity
    android:name="com.growthpush.view.AlertActivity"
    android:configChanges="orientation|keyboardHidden"
    android:launchMode="singleInstance"
    android:theme="@android:style/Theme.Translucent" />

<receiver
    android:name="com.growthpush.BroadcastReceiver"
    android:permission="com.google.android.c2dm.permission.SEND" >
    <intent-filter>
        <action android:name="com.google.android.c2dm.intent.RECEIVE" />
        <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
        <category android:name="YOUR_PACKAGE_NAME" />
    </intent-filter>
</receiver>
```

* YOUR_PACKAGE_NAMEは、実装するアプリのパッケージ名に変更してください。

## 実装方法

### DeviceTokenの取得

#### iOS(APNS)

- Growthhbeat#Initializeの後に下記を呼び出す

    - 開発環境向け
```
GrowthPush.GetInstance().RequestDeviceToken(GrowthPush.Environment.Development);
```

    - 本番環境向け
```
GrowthPush.GetInstance().RequestDeviceToken(GrowthPush.Environment.Production);
```


- UpdateにてSetDeviceTokenを実装

```
bool tokenSent = false;

void Update () {
    #if UNITY_IPHONE
	    if (!tokenSent) {
		    byte[] token = NotificationServices.deviceToken;
		    if (token != null) {
			    GrowthPush.GetInstance().SetDeviceToken(System.BitConverter.ToString(token));
			    tokenSent = true;
		    }
	    }
    #endif
}
```

#### Android(GCM)

- Growthhbeat#initializeWithApplicationIdの後に下記を呼び出す

```
// YOUR_SENDER_IDは、AndroidのSenderId
GrowthPush.GetInstance().RequestRegistrationId ("YOUR_SENDER_ID");
```

### タグ・イベントの取得

- `public void SetTag (string name)`
- `public void SetTag (string name, string value)`

#### パラメータ

|項目名|詳細|
|:--|:--|
|name|タグ名|
|value|タグに持たせる値|

```
GrowthPush.getInstance().SetTag("TAG_NAME");
GrowthPush.getInstance().SetTag("TAG_NAME", "TAG_VALUE");
```

- `public void TrackEvent(string name)`
- `public void TrackEvent(string name, string value)`

#### パラメータ

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|


```
GrowthPush.getInstance().TrackEvent("EVENT_NAME");
GrowthPush.getInstance().TrackEvent("EVENT_NAME", "EVENT_VALUE");
```

# アプリ内ポップアップメッセージの実装 (Growth Messageの利用)

## 初期設定

Androidはメッセージを表示するためのActivityを追記します。

AndroidManifest.xmlの `<application>` 要素内に下記を記述します。

```
<activity
	android:name="com.growthbeat.message.view.AlertActivity"
	android:theme="@android:style/Theme.Translucent" />
```

## メッセージを表示するViewを指定

任意の箇所で、Growth Analyticsのtrackメソッドを呼び出します。この呼び出し箇所が、メッセージの表示箇所になります。

*Unity*

```
GrowthAnalytics.GetInstance().Track("EVENT_ID");
```

## 備考

SDK導入について、ご不明な点などございます場合は、Growthbeat[お問い合わせフォーム](https://growthbeat.com/inquiry)からお問い合わせください。
