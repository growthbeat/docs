---
categories: 'sdk'
date: 2017-01-06T14:32:58+09:00
description: 'Growthbeat Cocos2dx の導入方法について説明します'
draft: false
title: Growthbeat Cocos2dx Gudeliene
---

Version 2.0.6  

# 動作環境  
Cocos2d-x v3.12  
※ 一部実装にて、バージョンごとに、Cocos2d-xのヘッダーファイルが読み込めない可能性がございます。  

# 1. SDK導入  
Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。  
## Cocos2d-x SDK をインポートする  
GitHubからSDKをcloneし、submoduleをupdateしてください。  

``` sh
git clone https://github.com/SIROK/growthbeat-cocos2dx.git
cd ./growthbeat-cocos2dx
git submodule update --init --recursive
```

`source/Classes` ディレクトリの中身、Grothbeat, GrowthPush, GrowthLink 3つのフォルダーを `/path/to/your_project/Classes/` 配下にコピーしてください。  

### iOSの初期設定  
Xcodeにて、Classesにコピーしたフォルダを、インポートしてください。選択肢にて、 `Create groups` にチェックし、ターゲットを任意のビルドスキームにチェックしてください。`growthbeat-ios/Growthbeat.xcframework` をコピーして、`/path/to/your_project/proj.ios/Frameworks/` 配下にコピーしてください。  
Growthbeat.xcframeworkは、下記Frameworkが必須となります。Xcodeプロジェクトに、依存するFrameworkを追加してください。  

- Foundation.framework
- UIKit.framework
- SystemConfiguration.framework

### Androidの初期設定  
`source/proj.android/src` の中身を、プロジェクトの `/path/to/your_project/proj.android/src` 配下にコピーしてください。  

**Android Studio導入方法**  
build.gradleに下記の設定をしてください。  

```sh
dependencies {
    // Androidのライブラリです。growthbeatのライブラリの機能に依存します。
    compile "com.android.support:appcompat-v7:23.3.0"
    compile 'com.google.android.gms:play-services-gcm:9.2.1'
    compile 'com.google.android.gms:play-services-ads:9.2.1'

    // Growthbeat SDK Android
    compile 'com.growthbeat:growthbeat-android:2.0.5@aar'
}
```

Growthbeat SDKを利用するには、依存ライブラリが必要となります。  

- appcompat-v7もしくはandroid-support-v4
- google-play-services-gcm
- google-play-services-ads   

依存ライブラリの対応バージョンは [Androidビルドに必要なライブラリ](http://faq.growthbeat.com/article/201-android) をご参照ください  

**Eclipse導入方法**
Eclipseの導入は非推奨となっております。導入については、[Eclipse環境での導入手順について](http://faq.growthbeat.com/article/211-eclipse) をご参照ください。  

### ソースビルド設定  
Android.mk に下記を追加してください。  

```sh
LOCAL_SRC_FILES := hellocpp/main.cpp \
                   ../../Classes/AppDelegate.cpp \
                   ../../Classes/HelloWorldScene.cpp \
                   ../../Classes/Growthbeat/GrowthbeatInstance.cpp \
                   ../../Classes/Growthbeat/android/Growthbeat.cpp \
                   ../../Classes/GrowthPush/GrowthPushInstance.cpp \
                   ../../Classes/GrowthPush/android/GrowthPush.cpp \
                   ../../Classes/GrowthLink/GrowthLinkInstance.cpp \
                   ../../Classes/GrowthLink/android/GrowthLink.cpp \

LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../Classes \
                    $(LOCAL_PATH)/../../Classes/Growthbeat/ \
                    $(LOCAL_PATH)/../../Classes/Growthbeat/android \
                    $(LOCAL_PATH)/../../Classes/GrowthPush/ \
                    $(LOCAL_PATH)/../../Classes/GrowthPush/android \
                    $(LOCAL_PATH)/../../Classes/GrowthLink/ \
                    $(LOCAL_PATH)/../../Classes/GrowthLink/android \
```

### AndroidManifest.xmlの設定  
レジストレーションIDを取得するため、またプッシュ通知を受信するためにAndroidManifest.xmlに必要なクラスを記述します。  
YOUR_PACKAGE_NAMEは、実装するアプリのパッケージ名に変更してください。  

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE" />
<permission
    android:name="YOUR_PACKAGE_NAME.permission.C2D_MESSAGE"
    android:protectionLevel="signature" />

<application>
    <!-- ... -->

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
    </receiver>

</application>
```

# 2. 導入コード  
GrowthPushの初期化を行います。初期化の中で、端末の基本情報の送信、広告IDの取得が行われます。
requestRegistrationId で、デバイストークンの取得を行います。必ずinitialize後に呼び出してください。

YOUR_APPLICATION_ID, YOUR_CREDENTIAL_IDは、Growth Push管理画面から確認することができます。
YOUR_SENDER_IDは、Firebase Consoleから取得する必要があります。

各種IDの取得方法は [Growthbeatで使用するID、キーまとめ](http://faq.growthbeat.com/article/130-growthbeat-id) をご参照ください。

Growth Pushの管理画面の操作、Google API Consoleの操作については、後述します。  
## Growthbeatの初期化  
### c++ファイルの実装  
AppDelegate.cpp　に以下のコードを追加してください。  

```cpp
#include "Growthbeat.h"
#include "GrowthPush.h"

USING_NS_GROWTHBEAT;
USING_NS_GROWTHPUSH;

#ifdef COCOS2D_DEBUG
GPEnvironment kGPEnvironment = GPEnvironmentDevelopment;
#else
GPEnvironment kGPEnvironment = GPEnvironmentProduction;
#endif

AppDelegate::AppDelegate() {    
}

AppDelegate::~AppDelegate(){
}

bool AppDelegate::applicationDidFinishLaunching() {
    GrowthPush::getInstance()->initialize("YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID", kGPEnvironment);
    GrowthPush::getInstance()->requestDeviceToken("YOUR_SENDER_ID");
}
```

### Android Javaファイルの実装
AppActivity 内で、GrowthbeatJNI に context を設定してください。  

```java
public class AppActivity extends Cocos2dxActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
        GrowthbeatJNI.setContext(getApplicationContext());
    }
}
```

### タグ送信  
セグメントを設定するために、任意のタグを埋め込んでください。  
```cpp
bool AppDelegate::applicationDidFinishLaunching() {
    GrowthPush::getInstance()->setTag("Development", "true");
}
```  
### イベント送信  
セグメントを設定するために、任意のイベントを埋め込んでください。  
```cpp
bool AppDelegate::applicationDidFinishLaunching() {
    GrowthPush::getInstance()->trackEvent("Launch");
}
```  

### プッシュ通知ペイロードの受け取り  
プッシュ通知送信時に、カスタムフィールドのjson値を受け取ることができます。
```cpp
GrowthPush::getInstance()->setOpenNotificationCallback([](cocos2d::Value extra)->void{
    CCLOG("%s", extra.getDescription().c_str());
});
```

# 3. SDKアップデート方法
最新のSDKへアップデートする際の方法や注意点についてをご説明します。
# Growth Pussh SDKからGrowthbeat SDK 2.0.5へアップデート  
## 前準備  
GrowthPushのApplicationIdから、GrowthbeatのApplicationIdに移行されるため、[Growthbeat](https://growthbeat.com/)にアクセスして、ApplicationId、SDKキー（CredentialID）を確認します。  
ApplicationIdについては、Growth　Pushの左メニュー、シークレットキーのgrowthbeatApplicationIdという項目の左の文字列をご利用ください。  
SDKキーに関しては、Growthbeatマイページにてご確認ください。  
## 注意点  
これまでGrowth Pushでご利用いただいた、ApplicationIdは数値型、シークレットキーは文字列になっています。  

|項目|型|
|---|---|
|applicationId|数値型|
|secret|文字列型/32文字|

Growthbeat SDKで利用するものは、applicationId、credentialIdともに文字列型になっています。  

|項目|型|
|---|---|
|applicationId|文字列型/16文字|
|credentailId|文字列型/32文字|

Growthbeat SDK乗り換え時に、これまでGrowth Pushで利用していたシークレットキーを設定しても、正しく動作しませんのでご注意くださいませ。  
必ず、SDKキーをご利用ください。  
## 実装方法  
### Growth Push SDKの内容を削除  

- growthpush.jar, growthpush.frameworkの削除
- Classes/GrowthPush 以下を削除
- com.growthpush 以下を削除

上記を削除した後、本ガイドのSDK導入部分にてプロジェクト設定を行ってください。  
### 初期化  
Growth Push SDK　　
### AppDelegate.cpp　　

```cpp
bool AppDelegate::applicationDidFinishLaunching() {
    // ...
    GrowthPush::initialize(YOUR_APP_ID, "YOUR_APP_SECRET", GPEnvironmentDevelopment, true);
    GrowthPush::registerDeviceToken("YOUR_SENDER_ID");
    GrowthPush::trackEvent("Launch");
    GrowthPush::setDeviceTags();
    GrowthPush::clearBadge();
    // ...
    return YES;
}
```

Growthbeat SDK 2.0.5

```cpp
bool AppDelegate::applicationDidFinishLaunching() {
    // ...
    GrowthPush::getInstance()->initialize("YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID", kGPEnvironment);
    GrowthPush::getInstance()->requestDeviceToken("YOUR_SENDER_ID");
    GrowthPush::getInstance()->trackEvent("Launch");
    GrowthPush::getInstance()->clearBadge();
    // ...
    return YES;
}
```
### AndroidManifest.xml　　
Growthbeat SDKでは、 `com.growthpush.BroadcastReceiver`が廃止になりましたので、変更が必要となります。この変更を行わないと、正しくプッシュ通知が送信できなくなりますので、ご注意ください。　　

- GrowthPush SDK

```xml
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

- Growthbeat SDK

```xml
<service
    android:name="com.growthpush.TokenRefreshService"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.android.gms.iid.InstanceID"/>
    </intent-filter>
</service>
<service android:name="com.growthpush.RegistrationIntentService"/>
<service
    android:name="com.growthpush.Cocos2dxReceiverService"
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

# Growthbeat SDK 1.xからGrowthbeat SDK 2.0.5へアップデート
## 機能削除  

- インターフェスの変更があります。
  - 次の実装変更点でご確認ください。
- Growth Analytics クラスがなくなりました。
  - Growth Analytics に関する記述は全て削除してください。
  - 2.x以降は、GrowthPush#setTag, trackEventをご利用ください。
- GrowthbeatCoreクラスが、Growthbeatクラスに統合されました。
  - start, stop, initializeは削除されました。

## 導入コード

- Growthbeat 1.x  

```cpp
bool AppDelegate::applicationDidFinishLaunching() {

    //...

    Growthbeat::getInstance()->initialize(getApplicationContext(), "YOUR_APPLICATION_ID", "CREDENTIAL_ID");
    GrowthPush::getInstance()->requestDeviceToken("YOUR_SENDER_ID", BuildConfig.DEBUG ? Environment.development : Environment.production);
    Growthbeat::getInstance()-start();

    // ...
    return YES;
}
```  

Growthbeat SDK 2.0.5

```cpp
bool AppDelegate::applicationDidFinishLaunching() {
    // ...
    GrowthPush::getInstance()->initialize("YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID", kGPEnvironment);
    GrowthPush::getInstance()->requestDeviceToken("YOUR_SENDER_ID");
    GrowthPush::getInstance()->trackEvent("Launch");

    // ...
    return YES;
}
```

# その他設定について  
## SenderId、AP Keyの取得について  
SenderIdは、requestRegistrationIdを実行するために必要となります。APIキーは、管理画面にて、プッシュ通知を送信するための証明書として必要になります。  
[Android SenderId, APIキー取得方法](http://growthbeat.helpscoutdocs.com/article/23-gcm-api)  
## 管理画面設定  
### APIキーの登録  
Growth Push管理画面の証明書設定ページにて、APIキーの登録を行ってください。  
### プッシュ通知の作成  
[配信作成](/manual/growthpush/#配信作成)を参考に、プッシュ通知が届くかを確認します。  
### セグメントについて  
セグメント配信を利用する際に、実装が必要となります。  
[配信したいセグメント](/manual/growthpush/#セグメントの作成)に沿って、タグやイベントの紐付けを行ってください。  

ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/)を閲覧してください。
