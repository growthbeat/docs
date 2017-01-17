---
categories: 'sdk'
date: 2017-01-06T12:00:00+09:00
description: 'Growthbeat SDK for Android の導入方法について説明します'
draft: false
title: Growthbeat Android SDK | 全機能利用ガイド
---

Version 2.0.4  
# Growthbeat利用ガイド  
# 1. Growth Pushを利用  
Growth Pushのみを利用する[導入方法](/sdk/android/guide)をご覧ください。
# 2. Growth Messageを利用 
Growth Message を用いてポップアップを任意のタイミングで表示させるには、「[配信トリガー](http://support.growthbeat.com/manual/growthmessage/#配信トリガー)」 を設定します。「[配信トリガー](http://support.growthbeat.com/manual/growthmessage/#配信トリガー)」 は作成したカスタムイベントの中から選ぶ必要がございます。

## 実装コード  
配信トリガーとなるカスタムイベントを作成するには、ポップアップメッセージを表示させたい任意の場所に下記のようなイベントを送信するメソッドを記述してください。

```java
class MainActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreated(savedInstanceState);

        //...
        GrowthPush.getInstance().trackEvent("OpenActivity");
    }
}
```

## AndroidManifest.xml設定  
AndroidManifest.xmlにGrowth Message表示用のActivityを追加します。

```xml
<application>
    <!-- ... -->
    <activity
        android:name="com.growthbeat.message.view.MessageActivity"
        android:theme="@android:style/Theme.Translucent" />
</application>
```  
## 管理画面設定方法

「[配信トリガー](http://support.growthbeat.com/manual/growthmessage/#配信トリガー)」 で先程実装したイベント（今回の場合は OpenActivity）を選択すると、指定のイベントが発火したタイミングでメッセージが表示されます。

詳しいメッセージの作成方法は [配信作成](http://support.growthbeat.com/manual/growthmessage/#配信作成) を参照してください。

<!--
# 3. GrowthLinkを利用  
## 実装コード  
### 初期化  
Growth Linkの初期化処理を追加してください。  
IntentFilterを設定したActivityのonCreateで、handleOpenUrlメソッドを呼び出してください。

```java
class MainActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreated(savedInstanceState);

        //...
        GrowthLink.getInstance().initialize(getApplicationContext(), "YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID");
        GrowthLink.getInstance().handleOpenUrl(getIntent().getData());
    }
}
```  
### ディープリンクアクションの実装  
SDKには、IntentHandlerが定義されており、この実装でディープリンク時のアクションを実装することができます。  
たとえば下記のような形で実装できます。  

```java
class MyApplication extends Application {

    @Override
    public void onCreate() {
        List<IntentHandler> intentHandlers = new ArrayList<IntentHandler>();
        intentHandlers.add(new UrlIntentHandler(Growthbeat.getInstance().getContext()));
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
        Growthbeat.getInstance().setIntentHandlers(intentHandlers);
    }
}
```   
## AndroidManifest.xml設定  
AndroidManifest.xmlにGrowth Link用のActivityを追加します。

```xml
<application>
    ~~ 略 ~~
    <receiver
        android:name="com.growthbeat.link.InstallReferrerReceiver"
        android:enabled="true"
        android:exported="true" >
        <intent-filter>
            <action android:name="com.android.vending.INSTALL_REFERRER" />
        </intent-filter>
    </receiver>
</application>
```
-->

# 備考  
## 最新版のSDKへの乗り換え方法  
Growth Push SDKからGrowthbeat 2.x SDK への乗り換えまたは、Growthbeat 1.x SDKからGrowthbeat 2.x SDKへの乗り換えをされる方は
[SDKの移行ガイド](/sdk/android/upgrade)をご参照ください。    
## サンプルについて  
実装サンプルは、[Githubレポジトリ](https://github.com/growthbeat/growthbeat-android)を参考にしてください。  
# お問い合わせ  
ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/)を閲覧してください。  
