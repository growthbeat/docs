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
Growthbeat.getInstance().initialize(context, "YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID");
```

# Growth Analytics API

取得したい情報を、任意の場所に実装してください。送信されたデータは、Growth Analytics管理画面をご覧ください。

## 基本情報の送信

端末の基本情報を送信します。基本情報には以下が含まれます。

- setDeviceModel
- setOs
- setLanguage
- setTimeZone
- setTimeZoneOffset
- setAppVersion
- setAdvertisingId
- setTrackingEnabled

```java
public void setBasicTags()
```

## 特定のイベント・タグを送信

### open

ユーザーの起動イベントを送信します。セッション時間の計測を開始するために必要なメソッドです。起動後に開かれるActivityのonStartに以下を実装してください。

```java
public void onStart() {
	super.onStart();
	GrowthAnalytics.getInstance().open();
}
```

### close

アプリの終了イベントを送信します。セッション時間の計測を停止します。Activityが閉じプロセスが終了する場所に実装してください。

```java
public void onStop() {
	super.onStop();
	GrowthAnalytics.getInstance().close();
}
```

### purchase

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

### setUserId

アプリのユニークなユーザーIDを送信します。

```java
public void setUserId(String userId)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|userId| 任意のユニークなユーザー名|

### setName

アプリのユーザー名を送信します。

```java
public void setName(String name)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name| 任意のユーザー名 |

### setAge

```java
public void setAge(int age)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|age| ユーザーの年齢 |

### setGender

変数は、Genderのenumを用いてどちらか性別を送信してください

```java
public void setGender(Gender gender)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|gender| 男性: `Gender.MALE` 女性: `Gender.FEMALE` |

### setLevel

アプリのユーザーのレベルを送信します。

```java
public void setLevel(int level)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|level| ユーザーのレベル |

### setDevelopment

開発用のフラグをつける

```java
public void setDevelopment(boolean development)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|development| 開発用の場合は `true` |

### setRandom

乱数を端末の情報として紐付けます。

```java
public void setRandom()
```

### setAdvertisingId

広告IDを送信します。

```java
public void setAdvertisingId()
```

### setTrackingEnabled

ユーザーが広告IDを利用するのを拒否しているかを送信します。

```java
public void setTrackingEnabled()
```

## カスタムイベント・タグを送信

### イベントの送信

```java
public void track(final String name);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。`YUR_APPLICATION_ID`: ApplicationIDを指定されます。`CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|

### イベント名と任意のMapの送信

```java
public void track(final String name, final Map<String, String> properties);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。`YUR_APPLICATION_ID`: ApplicationIDを指定されます。`CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
|properties|カスタムイベントに持たせる任意のMap|

### イベント名とイベント取得回数オプションの送信

```java
public void track(final String name, final TrackOption option);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。`YUR_APPLICATION_ID`: ApplicationIDを指定されます。`CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
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

### タグ名の送信

```java
public void tag(final String name);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` 上記全文で一意なTagIDと認識されます。大文字小文字は区別されません。`YOUR_APPLICATION_ID`: ApplicationIDを指定されます。 `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|

### タグ名と任意のvalueを送信

```java
public void tag(final String name, final String value);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` 上記全文で一意なTagIDと認識されます。大文字小文字は区別されません。`YOUR_APPLICATION_ID`: ApplicationIDを指定されます。 `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
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
|name|`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` 上記全文で一意なTagIDと認識されます。大文字小文字は区別されません。`YOUR_APPLICATION_ID`: ApplicationIDを指定されます。 `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
|properties|イベントに持たせる任意のMap|
|option|任意のパラメータ。ONCE, COUNTERのいずれかを指定します。|

**option**

|項目名|詳細|
|:--|:--|
|ONCE|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|COUNTER|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|

### フルカスタマイズタグを送信

特定のネームスペース、タグIDを設定していただくことが可能です。

```java
public void tag(final String namespace, final String name, final String value)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|namespace|ネームスペース|
|name|`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` 上記全文で一意なTagIDと認識されます。大文字小文字は区別されません。`YOUR_APPLICATION_ID`: ApplicationIDを指定されます。 `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
|value|タグに持たせる任意のValue|

# Growth Push API

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

```
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

```
<!-- 通知バーのアイコンを変更する場合 (例.) @drawable/sample_notification_icon -->
<meta-data android:name="com.growthpush.notification.icon" android:resource="表示したいアイコンのパス" />

<!-- 通知バーのアイコンのバックグラウンドカラーを変更する場合 (例.) @color/black -->
<meta-data android:name="com.growthpush.notification.icon.background.color" android:resource="表示したい色のID" />

<!-- ダイアログ通知のアイコンを変更したい場合 (例.) @drawable/sample_dialog_icon -->
<meta-data android:name="com.growthpush.dialog.icon" android:resource="表示したいアイコンのパス" />
```

## イベント・タグの取得

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

Growth Analyticsの実装方法を参照してください。

# Growth Link API

## SDKの導入

growthbeat.jarを導入した上で、Growthbeat SDK内の `source/library` に含まれる**growthlink.jar**を導入します。任意のアプリのプロジェクトに、Androidが他ライブラリを自動で参照する**libs**ディレクトリの中に、growthbeat.jarを移動もしくはコピーしてください。

### 初期設定

1. Install Referrerの取得のための設定を、AndoridManifest.xmlの `<application/>` 内の記述する。


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

1. Growthbeatの初期化処理の後に、Growth Linkの初期化処理を呼び出す

	```java
	GrowthLink.getInstance().initialize(getApplicationContext(), "APPLICATION_ID", "CREDENTIAL_ID");
	```

1. カスタムURLスキームでアプリを起動できるように、AndroidManifest.xmlを設定する

1. IntentFilterを設定したActivityのonCreateで、handleOpenUrlメソッドを呼び出す

	```java
	GrowthLink.getInstance().handleOpenUrl(getIntent().getData());
	```

## ディープリンクアクションの実装

SDKには、IntentHandler (iOSでは、GBIntentHandler)というインタフェースが定義されており、この実装でディープリンク時のアクションを実装することができます。

たとえば下記のような形で実装できます。

```java
List<IntentHandler> intentHandlers = new ArrayList<IntentHandler>();
intentHandlers.add(new UrlIntentHandler(GrowthbeatCore.getInstance().getContext()));
intentHandlers.add(new NoopIntentHandler());
intentHandlers.add(new IntentHandler() {
    public boolean handle(com.growthbeat.model.Intent intent) {
        if (intent.getType() != com.growthbeat.model.Intent.Type.custom)
            return false;
        Map<String, String> extra = ((CustomIntent) intent).getExtra();
        // TODO ここにアプリ内の画面を開く処理を実装します。
        Log.d("Growth Link", "extra: " + extra);
        return true;
    }
});
GrowthbeatCore.getInstance().setIntentHandlers(intentHandlers);
```

## 備考

SDK導入について、ご不明な点などございます場合は、[Growthbeatお問い合わせフォーム](https://growthbeat.com/inquiry)からお問い合わせください。また[リリースノート](http://support.growthbeat.com/sdk/android/release/)もご参照ください
