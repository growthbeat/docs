---
categories: 'sdk'
date: 2015-11-12T14:32:58+09:00
description: 'Growthbeat Android の API について説明します'
draft: false
title: Growthbeat Android API
---

Version 1.2.7

# Growthbeat API

## Growthbeatインスタンスの取得

Growthbeatインスタンスを取得します。

```java
public static Growthbeat getInstance()
```

## 初期化

Growthbeatの初期化を行います。初期化では以下の処理が行われます。

- デバイス登録、認証
- Growth Push、Growth Analytics、Growth Messageの初期化（Growth Linkは別途初期化が必要）
- 基本情報の送信


```java
public void initialize(Context context, String applicationId, String credentialId)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |


```java
public void initialize(Context context, String applicationId, String credentialId, boolean adInfoEnabled)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |
|adInfoEnabled| 広告情報の送信設定。`true`: 送信する `false`:送信しない |

## 起動イベントの送信

アプリケーションの起動イベントを送信します。

```java
public void start()
```

## 終了イベントの送信

アプリケーションの終了イベントを送信します。

```java
public void stop()
```

## ログの停止

Growthbeat SDKからのログ出力を全て停止します。
デフォルトでは、ログ出力がおこなわれます。

```java
public void setLoggerSilent(boolean silent)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|silent| ログ出力を行うか。`YES`: ログ出力しない `NO`:ログ出力をする |

## GrowthbeatユニークIDを取得する

SDK初期化時に作成される、GrowthbeatのユニークIDを取得できます。

```java
public void getClient(final ClientCallback clientCallback)
```

# Growth Analytics API

## Growth Analyticsインスタンスの取得

GrowthAnalyticsインスタンスを取得します。

```java
public static GrowthAnalytics getInstance()
```

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

### タグの送信

```java
public void tag(final String name);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|フォーマット:`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID<br/>  `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|

### タグと任意の値を送信

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

## GrowthPushインスタンスを取得

GrowthPushインスタンスを取得します。

```java
public static GrowthPush getInstance()
```

## RegistrationIdの取得・送信

### デバイストークンの取得・送信

```java
public void requestRegistrationId(final String senderId, final Environment environment)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|senderId|AndroidのSenderId|
|environment| 開発用: `Environment.development` 本番用: `Environment.production`　|

デバイストークンを返します。

```java
public string registerGCM(Context context)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|context|applicationContext|

## 基本タグの送信

Device, OS, Language, Time Zone, Version, Buildが含まれます。

```java
public void setDeviceTags();
```

## イベントの送信（Push専用）

### イベントの送信（Push専用）

```java
public void trackEvent(final String name);
```
**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|

### イベントと任意の値の送信（Push専用）

```java
public void trackEvent(final String name, final String value);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|


## タグの送信（Push専用）

### タグの送信（Push専用）

```java
public void setTag(final String name);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|

### タグと任意の値の送信（Push専用）

```java
public void setTag(final String name, final String value);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|
|value|タグに持たせる値|


# Growth Message API

## GrowthMessageインスタンスの取得

GrowthMessageインスタンスを取得します。

```java
public static GrowthMessage getInstance()
```

# Growth Link API

## GrowthLinkインスタンスを取得

GrowthLinkインスタンスを取得します。

```java
public static GrowthLink getInstance()
```
## Growth Linkの初期化

```java
public void initialize(Context context, String applicationId, String credentialId)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |

## リンクデータを引き渡し

カスタムURLスキームを受け取るActivityで下記を実装します。

```java
GrowthLink.getInstance().handleOpenUrl(getIntent().getData());
```

# AndroidManifest.xml

## パーミッション設定

インターネット設定。通信をするために必要となります。

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

プッシュ通知を受け取るために必要となります。YOUR_PACKAGE_NAMEは、アプリのPackageIDに変更してください。

```xml
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
<uses-permission android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE" />
<permission
    android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE"
    android:protectionLevel="signature" />
```

プッシュ通知受け取り時に、バイブレーションを鳴らすときに設定します。

```xml
<uses-permission android:name="android.permission.VIBRATE" />
```

Growth Pushダイアログプッシュ通知を表示するときに必要となります。

```xml
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

GrowthMessageバナー型表示に必要となります。

```xml
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
```

(`*`オプション) Googleアカウントを設定します。APIレベル15以下の場合は設定します。

```xml
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
```

## Growth Push設定

デバイストークン取得・更新やプッシュ通知を受け取る実装となります。YOUR_PACKAGE_NAMEは、アプリのPackageIDに変更してください。

```xml

<activity
    android:name="com.growthpush.view.AlertActivity"
    android:configChanges="orientation|keyboardHidden"
    android:launchMode="singleInstance"
    android:theme="@android:style/Theme.Translucent" />

<service
    android:name="com.growthpush.TokenRefreshService"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.android.gms.iid.InstanceID"/>
    </intent-filter>
</service>
<service android:name="com.growthpush.RegistrationIntentService"/>
<service
    android:name="com.growthpush.ReceiverService"
    android:exported="false" >
    <intent-filter>
        <action android:name="com.google.android.c2dm.intent.RECEIVE" />
    </intent-filter>
</service>
<receiver
    android:name="com.google.android.gms.gcm.GcmReceiver"
    android:exported="true"
    android:permission="com.google.android.c2dm.permission.SEND" >
    <intent-filter>
        <action android:name="com.google.android.c2dm.intent.RECEIVE" />
        <category android:name="YOUR_PACKAGE_NAME" />
    </intent-filter>
    <intent-filter>
        <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
        <category android:name="YOUR_PACKAGE_NAME" />
    </intent-filter>
</receiver>
```

(`*`オプション) アイコンや背景色をカスタムすることができます。リソースIDを指定してください。

```xml
<!-- 通知バーのアイコンをカスタマイズすることができます。 -->
<meta-data android:name="com.growthpush.notification.icon" android:resource="@drawable/sample_notification_icon" />

<!-- 通知バーのアイコンの背景色をカスタマイズすることができます。 -->
<meta-data android:name="com.growthpush.notification.icon.background.color" android:resource="@android:color/white" />

<!-- ダイアログプッシュ通知のアイコンを変更できます。 -->
<meta-data android:name="com.growthpush.dialog.icon" android:resource="@drawable/sample_notification_icon" />
```

## Growth Message設定

ポップアップメッセージを表示するために必要となります。

```xml
<activity
    android:name="com.growthbeat.message.view.MessageActivity"
    android:theme="@android:style/Theme.Translucent" />
```

## Growth Link設定

インストール・起動時にデータを受け取るために必要になります。

```xml
<receiver
    android:name="com.growthbeat.link.InstallReferrerReceiver"
    android:enabled="true"
    android:exported="true" >
    <intent-filter>
        <action android:name="com.android.vending.INSTALL_REFERRER" />
    </intent-filter>
</receiver>
```

AndroidManifest.xmlのサンプルは、[こちら](https://github.com/growthbeat/growthbeat-android/blob/master/sample/src/main/AndroidManifest.xml)
