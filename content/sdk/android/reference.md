---
categories: 'sdk'
date: 2017-05-31T18:00:00+09:00
description: 'Growthbeat Android の API について説明します'
draft: false
title: Growthbeat Android API
---
Version 2.0.11 
[Android SDK 1.2.7以下](/sdk/android/reference-1.2.7)のリファレンスはこちら  
# Growthbeat API  
## Growthbeatインスタンスの取得  
Growthbeatインスタンスを取得します。  

```java
public static Growthbeat getInstance()
```
## ログの停止
Growthbeat SDKからのログ出力を全て停止します。デフォルトでは、ログ出力がおこなわれます。  
```java
public void setLoggerSilent(boolean silent)
```
**パラメータ**

|項目名|詳細|
|:--|:--|
|silent| ログ出力を行うか。`YES`: ログ出力しない `NO`:ログ出力をする |
## GrowthbeatユニークIDを取得する
GrowthbeatのユニークIDを取得できます。
取得時に、ロックされるので必ずメインスレッド以外で呼び出してください。

```java
public Client waitClient();
```
# Growth Push API  
## GrowthPushインスタンスを取得  
GrowthPushインスタンスを取得します。  

```java
public static GrowthPush getInstance()
```
## 初期化

```java
public void initialize(Context context, String applicationId, String credentialId, Environment environment)
```

広告情報を保持の可否  

```java
public void initialize(Context context, String applicationId, String credentialId, Environment environment, boolean adInfoEnabled)
```
**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |
|environment| 開発用: `Environment.development` 本番用: `Environment.production`　|
|adInfoEnabled| 広告情報の送信設定。`true`: 送信する `false`:送信しない |

広告情報を保持の可否 / チャンネルIDの設定  

```java
public void initialize(Context context, String applicationId, String credentialId, Environment environment, boolean adInfoEnabled, String channelId)
```
**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |
|environment| 開発用: `Environment.development` 本番用: `Environment.production`　|
|adInfoEnabled| 広告情報の送信設定。`true`: 送信する `false`:送信しない |
|channelId| 任意のチャンネルID |

## RegistrationIdの取得・送信  
### デバイストークン送信   

```java
public void requestRegistrationId()
```

### デバイストークン取得  
必ず初期化のあとに実行してください。  
タイミングによっては、取得できない可能性もありますので、 `Thread` を利用して処理を遅らせて利用するのを推奨いたします。  

```java
public string registerFCM()
```

## イベントの送信  
### イベントの送信  

```java
public void trackEvent(String name);
```
**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|

### イベントと任意の値の送信  

```java
public void trackEvent(String name, String value);
```
**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|

### イベントと任意の値送信、メッセージ表示制御  

```java
public void trackEvent(String name, String value, ShowMessageHandler showMessageHandler);
```
**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|
|showMessageHandler|メッセージ表示準備が完了したときのコールバック変数|

### ShowMessageHandler  
設定したポップアップメッセージの表示準備が完了したときに、コールバックされます。  

```java
new ShowMessageHandler() {
	@Override
	public void complete(MessageRenderHandler renderHandler) {
        // 画面の表示
		renderHandler.render();
	}

	@Override
	public void error(String error) {
        // errorはエラーメッセージが返ります。
	}
}
```
## タグの送信  
### タグの送信  

```java
public void setTag(String name);
```
**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|

### タグと任意の値の送信  

```java
public void setTag(String name, String value);
```
**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|
|value|タグに持たせる値|

### チャンネルIDをセット  

Android 8.0以上のみ。
任意の通知チャンネルで、通知を受け取れるように変更します。

```java
public void setChannelId(String channelId);
```

**パラメーター**
|項目名|詳細|
|:--|:--|
|channelId|チャンネルID|

### デフォルト通知チャンネルの削除  

Android 8.0以上のみ。  
SDKのデフォルトの通知チャンネルを削除します。  
※ Growth Push初期化時に、channel_idがセットされていない場合、再度作成されます。  

```java
public void deleteDefaultNotificationChannel();
```

<!--
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
-->

# AndroidManifest.xml  
## パーミッション設定  
インターネット設定。通信をするために必要となります。  

```xml
<uses-permission android:name="android.permission.INTERNET" />
```  

プッシュ通知受け取り時に、バイブレーションを鳴らすときに設定します。  

```xml
<uses-permission android:name="android.permission.VIBRATE" />
```
Growth Pushダイアログプッシュ通知を表示するときに必要となります。

```xml
<uses-permission android:name="android.permission.WAKE_LOCK" />
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

<service android:name="com.growthpush.TokenRefreshService">
    <intent-filter>
        <action android:name="com.google.firebase.INSTANCE_ID_EVENT" />
    </intent-filter>
</service>
<service android:name="com.growthpush.ReceiverService">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```
(`*`オプション) アイコンや背景色をカスタムすることができます。リソースIDを指定してください。

```xml
<!-- 通知バーのアイコンをカスタマイズすることができます。 -->
<meta-data android:name="com.growthpush.notification.icon" android:resource="@drawable/sample_notification_icon" />

<!-- 通知バーのラージアイコンを設定することができます。 -->
<!-- こちらは、Android SDK 2.0.7以上で利用可能です。 -->
<meta-data android:name="com.growthpush.notification.icon.large" android:resource="@drawable/sample_notification_icon_large" />

<!-- 通知バーのアイコンの背景色をカスタマイズすることができます。 -->
<meta-data android:name="com.growthpush.notification.icon.background.color" android:resource="@android:color/white" />

<!-- ダイアログプッシュ通知のアイコンを変更できます。 -->
<meta-data android:name="com.growthpush.dialog.icon" android:resource="@drawable/sample_notification_icon" />

<!-- Growth Pushが作成するデフォルト通知チャンネル名を変更できます。 -->
<meta-data android:name="com.growthpush.notification.channel_name" android:resource="@drawable/sample_notification_icon" />

```
## Growth Message設定  
ポップアップメッセージを表示するために必要となります。  

```xml
<activity
    android:name="com.growthbeat.message.view.MessageActivity"
    android:theme="@android:style/Theme.Translucent" />
```

<!--
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
-->

AndroidManifest.xmlのサンプルは、[こちら](https://github.com/growthbeat/growthbeat-android/blob/master/sample/src/main/AndroidManifest.xml)
