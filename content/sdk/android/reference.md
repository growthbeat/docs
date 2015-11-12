---
categories: 'sdk'
date: 2015-09-14T14:32:58+09:00
description: 'Growthbeat Android の API について説明します'
draft: false
title: Growthbeat Android API
---

# Growthbeat API

## Growthbeatインスタンスを取得

```java
public void initialize(Context context, String applicationId, String credentialId)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |

# Growth Analytics API

取得したい情報を、任意の場所に実装してください。

## Growth Analyticsインスタンスを取得

```java
public void initialize(Context context, String applicationId, String credentialId)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |

## 基本情報の送信

端末の基本情報を送信します。基本情報には以下が含まれます。

- デバイスモデル
- OS
- 言語
- タイムゾーン
- タイムゾーンオフセット
- アプリバージョン
- 広告ID（Android:AdvertisingId, iOS:IDFA）
- 広告利用可否

```java
public void setBasicTags()
```

## 特定のイベントを送信

### 起動イベント

ユーザーの起動イベントを送信します。セッション時間の計測を開始するために必要なメソッドです。起動後に開かれるActivityのonStartに以下を実装してください。

```java
public void open()
```

### 終了イベント

アプリの終了イベントを送信します。セッション時間の計測を停止します。Activityが閉じプロセスが終了する場所に実装してください。

```java
public void close()
```

### 購入イベント

課金時にメソッドを呼び、課金額、アイテムのカテゴリなどを送信することができます。

```java
public void purchase(int price, String category, String product)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|price| 価格 |
|category| 任意のカテゴリ |
|product| 任意のアイテム名|

## 特定のタグを送信

### ユーザーIDタグ

アプリのユニークなユーザーIDを送信します。

```java
public void setUserId(String userId)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|userId| 任意のユニークなユーザー名|

### 名前タグ

アプリのユーザー名を送信します。

```java
public void setName(String name)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name| 任意のユーザー名 |

### 年齢タグ

```java
public void setAge(int age)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|age| ユーザーの年齢 |

### 性別タグ

変数は、Genderのenumを用いてどちらか性別を送信してください

```java
public void setGender(Gender gender)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|gender| 男性: `Gender.MALE` 女性: `Gender.FEMALE` |

### レベルタグ

アプリのユーザーのレベルを送信します。

```java
public void setLevel(int level)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|level| ユーザーのレベル |

### 開発用タグ

開発用のフラグをつける

```java
public void setDevelopment(boolean development)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|development| 開発用の場合は `true` |

### 乱数タグ

乱数を端末の情報として紐付けます。

```java
public void setRandom()
```

## カスタムイベント送信

### イベントの送信

```java
public void track(final String name);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|フォーマット:`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID <br/> `CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|

### イベント名と任意のMapの送信

```java
public void track(final String name, final Map<String, String> properties);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|フォーマット:`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID <br/> `CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|properties|カスタムイベントに持たせる任意のMap|

### イベント名とイベント取得回数オプションの送信

```java
public void track(final String name, final TrackOption option);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|フォーマット:`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID <br/> `CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|properties|カスタムイベントに持たせる任意のMap|
|option|任意のパラメータ。ONCE, COUNTERのいずれかを指定します。|

**option**

|項目名|詳細|
|:--|:--|
|ONCE|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|COUNTER|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|

## イベント名と任意のMapの送信とイベント取得回数オプションの送信

```java
public void track(final String name, final Map<String, String> properties, final TrackOption option);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|カスタムイベントID|
|properties|カスタムイベントに持たせる任意のMap|
|option|任意のパラメータ。ONCE, COUNTERのいずれかを指定します。|

**option**

|項目名|詳細|
|:--|:--|
|ONCE|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|COUNTER|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|

## カスタムタグ送信

### タグ名の送信

```java
public void tag(final String name);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|フォーマット:`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID<br/>  `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|

### タグ名と任意のvalueを送信

```java
public void tag(final String name, final String value);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|フォーマット:`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID<br/>  `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|value|カスタムタグに持たせる任意のValue|

## フルカスタマイズなイベントの送信

特定のネームスペース、イベントIDを設定していただくことが可能です。

```java
public void track(final String namespace, final String name, final Map<String, String> properties, final TrackOption option);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|namespace|ネームスペース|
|name|フォーマット:`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID<br/>  `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|properties|イベントに持たせる任意のMap|
|option|任意のパラメータ。ONCE, COUNTERのいずれかを指定します。|

**option**

|項目名|詳細|
|:--|:--|
|ONCE|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|COUNTER|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|

## フルカスタマイズなタグの送信

特定のネームスペース、タグIDを設定していただくことが可能です。

```java
public void tag(final String namespace, final String name, final String value)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|namespace|ネームスペース|
|name|フォーマット:`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID<br/>  `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|value|タグに持たせる任意のValue|

# Growth Push API

## Growth Pushインスタンスを取得

```java
public void initialize(Context context, String applicationId, String credentialId)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |

## 初期設定

Growth Push管理画面、証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[Android SenderId, APIキー取得方法](http://growthhack.sirok.co.jp/growthpush/gcm-api/)

AndroidManifest.xmlの設定を行う必要がございます。

**パーミッション**

```xml
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

```xml
<uses-permission android:name="android.permission.VIBRATE" />
```

・ アラートダイアログのプッシュ通知を表示する場合

```xml
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

プッシュ通知を受け取るために必要な設定を、`<application>`タグ内に実装

```xml
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

※ YOUR_PACKAGE_NAMEは、実装するアプリのパッケージ名に変更してください。

## RegistrationIdの取得・送信

Growthhbeat#initializeWithApplicationIdの後に下記を呼び出す

```java
public void requestRegistrationId(final String senderId, final Environment environment)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|senderId|AndroidのSenderId|
|environment| 開発用: `Environment.development` 本番用: `Environment.production`　|

## カスタムアイコンの設定

Googleのポリシーに合わせ、アイコンを変更できるようにしました。

AndroidManifest.xml `<application>` 内に、下記項目を加えてください。

```xml
<!-- 通知バーのアイコンを変更する場合 (例.) @drawable/sample_notification_icon -->
<meta-data android:name="com.growthpush.notification.icon" android:resource="表示したいアイコンのパス" />

<!-- 通知バーのアイコンのバックグラウンドカラーを変更する場合 (例.) @color/black -->
<meta-data android:name="com.growthpush.notification.icon.background.color" android:resource="表示したい色のID" />

<!-- ダイアログ通知のアイコンを変更したい場合 (例.) @drawable/sample_dialog_icon -->
<meta-data android:name="com.growthpush.dialog.icon" android:resource="表示したいアイコンのパス" />
```

## イベントの取得

_こちらのメソッドは、Growth Pushが、Growth Analyticsに統合されました段階で削除予定となっております。これまでGrowth Push SDKをご利用しておりました方は、Growth Analyticsのイベント・タグの送信にお乗り換えくださいませ。_

### イベント名の送信

```java
public void trackEvent(final String name);
```
**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|

### イベント名と任意の値の送信

```java
public void trackEvent(final String name, final String value);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|


## タグの取得

_こちらのメソッドは、Growth Pushが、Growth Analyticsに統合されました段階で削除予定となっております。これまでGrowth Push SDKをご利用しておりました方は、Growth Analyticsのイベント・タグの送信にお乗り換えくださいませ。_

### タグ名の送信

```java
public void setTag(final String name);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|

### タグと任意のタグ名の送信

```java
public void setTag(final String name, final String value);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|
|value|タグに持たせる値|


# Growth Message API

## Growth Messageインスタンスを取得

```java
public void initialize(Context context, String applicationId, String credentialId)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |

## 初期設定

Androidはメッセージを表示するためのActivityを追記します。

AndroidManifest.xmlの `<application>` 要素内に下記を記述します。

```xml
<activity
	android:name="com.growthbeat.message.view.MessageActivity"
	android:theme="@android:style/Theme.Translucent" />
```

## メッセージを表示するViewを指定

メッセージ配信設定で、設定したイベントを、任意の箇所で、Growth Analyticsのtrackメソッドを呼び出し、イベントを送信します。この呼び出し箇所が、メッセージの表示箇所になります。

<a href="#growth-analytics-api">Growth Analyticsの実装方法</a> を参照してください。

# Growth Link API

## Growth Linkインスタンスを取得

```java
public void initialize(Context context, String applicationId, String credentialId)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |

## SDKの導入

growthbeat.jarを導入した上で、Growthbeat SDK内の `source/library` に含まれる**growthlink.jar**を導入します。任意のアプリのプロジェクトに、Androidが他ライブラリを自動で参照する**libs**ディレクトリの中に、growthbeat.jarを移動もしくはコピーしてください。

### 初期設定

Install Referrerの取得のための設定を、AndoridManifest.xmlの `<application/>` 内の記述する。

```xml
<receiver
    android:name="com.growthbeat.link.InstallReferrerReceiver"
    android:enabled="true"
    android:exported="true">
    <intent-filter>
        <action android:name="com.android.vending.INSTALL_REFERRER" />
    </intent-filter>
</receiver>
```
