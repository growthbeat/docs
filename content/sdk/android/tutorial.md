---
categories: 'sdk'
date: 2015-09-14T14:32:58+09:00
description: 'Growthbeat Android の API について説明します'
draft: false
title: Growthbeat Android API
---

# Growthbeat Android API

### 初期化 デバイス登録・認証

Growthbeatへデバイス登録・認証を行います。

```java
Growthbeat.getInstance().initialize(context, "YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID");
```

### ユーザー属性、行動ログの付与 (Growth Analyticsの利用)

Growth Analyticsの初期化をします。初期化の中に、端末の基本情報の送信、広告IDの取得が行われます。

送信されたデータは、Growth Analytics管理画面をご覧ください。

#### 端末・ユーザー情報を送信方法と、実装の説明

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
- *setDeviceModel* 端末のモデルを送信します。
- *setOS* 端末のOS
- *setLanguage* 端末の言語設定
- *setTimeZone* 端末のタイムゾーン
- *setTimeZoneOffset* 端末の標準時刻からの差
- *setAppVersion* アプリの設定されているバージョン
- *setRandom* 乱数を送信します。
- *setAdvertisingId* 広告IDを送信します。

また、上記で予め用意されているタグ、イベント以外でも下記メソッドを使用することで、カスタムタグ、カスタムイベントが送信できます。

- *track* カスタムイベントを送信します。
- *tag* カスタムタグを送信します。

#### 端末のデータを送信

setBasicTagsメソッドは端末のデータを送信します。

このメソッドには、下記が含まれます。

- setDeviceModel
- setOs
- setLanguage
- setTimeZone
- setTimeZoneOffset
- setAppVersion
- setAdvertisingId
- setTrackingEnabled

```java
GrowthAnalytics.getInstance().setBasicTags();
```

#### 起動/終了イベントを送信する

**起動 (open)**

ユーザーの起動イベントを送信します。セッション時間の計測を開始するために必要なメソッドです。

起動後に開かれるActivityのonStartに以下を実装してください。

```java
public void onStart() {
	super.onStart();
	GrowthAnalytics.getInstance().open();
}
```

**終了 (close)**

アプリの終了イベントを送信します。セッション時間の計測を停止します。

Activityが閉じプロセスが終了する場所に実装してください。

```java
public void onStop() {
	super.onStop();
	GrowthAnalytics.getInstance().close();
}
```

**課金情報を送信する**

課金時にメソッドを呼び、課金額、アイテムのカテゴリなどを送信することができます。

```java
GrowthAnalytics.getInstance().purchase(price, "ITEM_CATEGORY", "ITEM_NAME");
```

**ユニークなユーザーIDを送信**

アプリのユニークなユーザーIDを送信します。

```java
GrowthAnalytics.getInstance().setUserId("YOUR_USER_ID");
```

**ユーザー名を送信**

アプリのユーザー名を送信します。

```java
GrowthAnalytics.getInstance().setName("YOUR_NAME");
```

**年齢を送信**

```java
GrowthAnalytics.getInstance().setAge(age);
```

**性別を送信**

変数は、Genderのenumを用いてどちらか性別を送信してください

```java
// 男性
GrowthAnalytics.getInstance().setGender(Gender.MALE);

// 女性
GrowthAnalytics.getInstance().setGender(Gender.FEMALE);
```

**レベルを送信**

アプリのユーザーのレベルを送信します。

```java
GrowthAnalytics.getInstance().setLevel(level);
```

**開発用の紐付け**

開発用のフラグをつける

```java
GrowthAnalytics.getInstnace().setDevelopment(true);
```

**端末モデル名を送信**

端末のモデル名を送信します。

例.) SO-03C, SC-03D

```java
GrowthAnalytics.getInstance().setDeviceModel();
```

**端末OSを送信**

端末のOSを送信します。

例.) Android 4.4, Android 5.0.1

```java
GrowthAnalytics.getInstance().setOS();
```

**端末の言語設定を送信**

端末の設定言語を送信します。

例.) ja, en

```java
GrowthAnalytics.getInstance().setLanguage();
```

**タイムゾーンを送信する**

端末で設定されたタイムゾーンを送信する。

例.) Asia/Tokyo, America/Los_Angeles

```java
GrowthAnalytics.getInstance().setTimeZone();
```

**タイムゾーンオフセットを送信**

端末の設定された時刻から、標準時刻の差分時間を送信します。

例.) 9, -11

```java
GrowthAnalytics.getInstance().setTimeZoneOffset();
```

**アプリバージョンを送信**

アプリに設定されたアプリバージョンを送信します。

AndroidManifest.xmlの`<manifest>` android:versionNameに設定される値が入ります。

```java
GrowthAnalytics.getInstance().setAppVersion();
```

**乱数を送信**

乱数を端末の情報として紐付けます。

```java
GrowthAnalytics.getInstance().setRandom();
```

**広告IDを送信**

広告IDを送信します。

```java
GrowthAnalytics.getInstance().setAdvertisingId();
```

**広告オプトアウトの送信**

ユーザーが広告IDを利用するのを拒否しているかを送信します。

```java
GrowthAnalytics.getInstance().setTrackingEnabled();
```

#### カスタムイベント・タグを送信する

***カスタムイベントとは？***

任意のイベントを取得することが出来ます。カスタムイベントには、それぞれ一意のEventIDを割り当てる必要があります。

- EventID: `Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>`  
	- 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。
	- `YOUR_APPLICATION_ID`: ApplicationIDを指定されます。
	- `CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

**カスタムイベントの送信**

```java
public void track(final String name);
public void track(final String name, final Map<String, String> properties);
public void track(final String name, final TrackOption option);
public void track(final String name, final Map<String, String> properties, final TrackOption option);
```

##### パラメータ

|項目名|詳細|
|:--|:--|
|name|カスタムイベントID|
|properties|カスタムイベントに持たせる任意のMap|
|option|任意のパラメータ。ONCE, COUNTERのいずれかを指定します。|

##### TrackOption

|項目名|詳細|
|:--|:--|
|ONCE|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|COUNTER|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|

```java
GrowthAnalytics.getInstance().track("CUSTOM_EVENT_ID");
GrowthAnalytics.getInstance().track("CUSTOM_EVENT_ID", properties);
GrowthAnalytics.getInstance().track("CUSTOM_EVENT_ID", GrowthAnalytics.TrackOption.ONCE);
GrowthAnalytics.getInstance().track("CUSTOM_EVENT_ID", properties, GrowthAnalytics.TrackOption.ONCE);
```

***カスタムタグとは？***

任意のタグを取得することが出来ます。カスタムタグには、それぞれ一意のTagIDを割り当てる必要があります。

- TagID: `Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>`  
	- 上記全文で一意なTagIDと認識されます。大文字小文字は区別されません。
	- `YOUR_APPLICATION_ID`: ApplicationIDを指定されます。
	- `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

**カスタムタグの送信**

```java
public void tag(final String name);
public void tag(final String name, final String value);
```

##### パラメータ

|項目名|詳細|
|:--|:--|
|name|カスタムタグID|
|value|カスタムタグに持たせる任意のValue|

```java
GrowthAnalytics.getInstance().tag("CUSTOM_TAG_ID");
GrowthAnalytics.getInstance().tag("CUSTOM_TAG_ID", "value");
```

#### フルカスタマイズなイベント・タグの送信

**フルカスタマイズイベントを送信する**

特定のネームスペース、イベントIDを設定していただくことが可能です。下記、イベントID発行例となります。

- EventID: `Event:<YOUR_APPLICATION_ID>:<NAMESPACE>:<EVENT_ID>`
	- 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。
	- `YOUR_APPLICATION_ID`: ApplicationIDを指定されます。
	- `NAMESPACE`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）
	- `EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）


```java
public void track(final String namespace, final String name, final Map<String, String> properties, final TrackOption option);
```

##### パラメータ

|項目名|詳細|
|:--|:--|
|namespace|ネームスペース|
|name|イベントID|
|properties|イベントに持たせる任意のMap|
|option|任意のパラメータ。ONCE, COUNTERのいずれかを指定します。|

##### TrackOption

|項目名|詳細|
|:--|:--|
|ONCE|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|COUNTER|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|

```java
GrowthAnalytics.getInstance().track("NAMESPACE", "CUSTOM_EVENT_ID", properties, GrowthAnalytics.TrackOption.ONCE);
```

**フルカスタマイズタグを送信する**

特定のネームスペース、タグIDを設定していただくことが可能です。下記、タグID発行例となります。

- TagID: `Tag:<YOUR_APPLICATION_ID>:<NAMESPACE>:<TAG_ID>`  
	- 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。
	- `YOUR_APPLICATION_ID`: ApplicationIDを指定されます。
	- `NAMESPACE`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）
	- `TAG_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。（大文字小文字は区別されません。）

```java
public void tag(final String namespace, final String name, final String value)
```

##### パラメータ

|項目名|詳細|
|:--|:--|
|namespace|ネームスペース|
|name|タグID|
|value|タグに持たせる任意のValue|

```java
GrowthAnalytics.getInstance().tag("NAMESPACE", "TAG_ID", "value");
```

### プッシュ通知の実装 (Growth Pushの利用)

#### 初期設定

Growth Push管理画面、証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[Android SenderId, APIキー取得方法](http://growthhack.sirok.co.jp/growthpush/gcm-api/)

AndroidManifest.xmlの設定を行う必要がございます。

パーミッションは下記が必須となります。

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

また、プッシュ通知を受け取るために必要な設定を、`<application>`タグ内に実装してください。

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

* YOUR_PACKAGE_NAMEは、実装するアプリのパッケージ名に変更してください。

#### RegistrationIdの取得・送信

1. Growthhbeat#initializeWithApplicationIdの後に下記を呼び出す

	```
	// YOUR_SENDER_IDは、AndroidのSenderId
	GrowthPush.getInstance().requestRegistrationId("YOUR_SENDER_ID");
	```

#### カスタムアイコンの設定

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

#### イベント・タグの取得

***こちらのメソッドは、Growth Pushが、Growth Analyticsに統合されました段階で削除予定となっております。これまでGrowth Push SDKをご利用しておりました方は、Growth Analyticsのイベント・タグの送信にお乗り換えくださいませ。***

**イベントを送信する**

```java
public void trackEvent(final String name);
public void trackEvent(final String name, final String value);
```

##### パラメータ

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|


```java
GrowthPush.getInstance().trackEvent("EVENT_NAME");
GrowthPush.getInstance().trackEvent("EVENT_NAME", "EVENT_VALUE");
```

**タグを送信する**

```java
public void setTag(final String name);
public void setTag(final String name, final String value);
```

##### パラメータ

|項目名|詳細|
|:--|:--|
|name|タグ名|
|value|タグに持たせる値|

```java
GrowthPush.getInstance().setTag("TAG_NAME");
GrowthPush.getInstance().setTag("TAG_NAME", "TAG_VALUE");
```

## アプリ内ポップアップメッセージの実装 (Growth Messageの利用)

### 初期設定

Androidはメッセージを表示するためのActivityを追記します。

AndroidManifest.xmlの `<application>` 要素内に下記を記述します。

```xml
<activity
	android:name="com.growthbeat.message.view.MessageActivity"
	android:theme="@android:style/Theme.Translucent" />
```

### メッセージを表示するViewを指定

***デフォルトで用意しているイベントの送信***

- *open* 起動イベントを送信します。
- *close* 終了イベントを送信します。
- *purchase* 課金イベントを送信します。

***カスタムイベントの送信***

```java
GrowthAnalytics.getInstance().track("CUSTOM_EVENT_ID");
GrowthAnalytics.getInstance().track("CUSTOM_EVENT_ID", properties);
GrowthAnalytics.getInstance().track("CUSTOM_EVENT_ID", GrowthAnalytics.TrackOption.ONCE);
GrowthAnalytics.getInstance().track("CUSTOM_EVENT_ID", properties, GrowthAnalytics.TrackOption.ONCE);
```

Growth Analyticsの実装を参照してください。


### ディープリンクの実装 (Growth Linkの利用)

#### SDKの導入

growthbeat.jarを導入した上で、Growthbeat SDK内の `source/library` に含まれる**growthlink.jar**を導入します。任意のアプリのプロジェクトに、Androidが他ライブラリを自動で参照する**libs**ディレクトリの中に、growthbeat.jarを移動もしくはコピーしてください。

#### 初期設定

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

#### ディープリンクアクションの実装

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
### Growth Push SDKからの乗り換え方法

#### 前準備
GrowthPushのApplicationIdから、GrowthbeatのApplicationIdに移行されるた
め、[Growthbeat](https://growthbeat.com/)にアクセスして、ApplicationId、SDKキー（CredentialID）を確認します。

#### 実装方法

- GrowthPush SDK

```
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);

	GrowthPush.getInstance().initialize(getApplicationContext(), YOUR_APPLICATION_ID, "APPLICATION_SECRET", BuildConfig.DEBUG ? Environment.development : Environment.production, true).register("YOUR_SENDER_ID");
	GrowthPush.getInstance().trackEvent("Launch");
	GrowthPush.getInstance().setDeviceTags();
}
```

- Growthbeat SDK

```
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);
	// Growthbeat SDKの初期化
	Growthbeat.getInstance().initialize(this, "YOUR_APPLICATION_ID", "CREDENTIAL_ID");
	// Registration IDを明示的に要求
	GrowthPush.getInstance().requestRegistrationId("YOUR_SENDER_ID", BuildConfig.DEBUG ? Environment.development : Environment.production);
	// Launchイベントの取得
	GrowthPush.getInstance().trackEvent("Launch");
	// DeviceTagの取得
	GrowthPush.getInstance().setDeviceTags();
}
```

## 備考

SDK導入について、ご不明な点などございます場合は、Growthbeat[お問い合わせフォーム](https://growthbeat.com/inquiry)からお問い合わせください。
