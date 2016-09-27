---
categories: 'sdk'
date: 2016-06-29T23:50:00+09:00
description: 'Growthbeat Android の導入方法について説明します'
draft: false
title: Growthbeat Android Gudeliene
---

Version 2.0.4  
# Growthbeat利用ガイド  
# 1. Growth Pushを利用  
Growth Pushのみを利用する[導入方法](/sdk/android/guide)をご覧ください。
# 2. Growth Messageを利用  
## 実装コード  
アプリに、Growth Pushの任意のイベントを送信します。アプリが任意のアクティビティが、呼び出されたときに、ポップアップメッセージを表示する実装を、例として紹介します。  

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
任意のイベントが呼び出されたときに表示するポップアップメッセージは、管理画面上で設定できます。  管理画面の設定については、次に説明します。  

## AndroidManifest設定  
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
メッセージの作成方法は[こちら](/manual/growthmessage/#配信作成)を参考にしてください。  
アプリ起動以外にも、カスタムイベントをメッセージ配信のトリガーにすることにより、アプリの任意の場所でメッセージを配信することができます。詳しくは、[こちら](/sdk/android/reference/#カスタムイベント送信)をご参照ください。  
# 3. GrowthLinkを利用  
## 実装コード  
**初期化**  
Growth Linkの初期化処理を追加してください。

```java
GrowthLink.getInstance().initialize(getApplicationContext(), "YOUR_APPLICATION_ID", "YOUR_CREDENTIAL_ID");
```  
IntentFilterを設定したActivityのonCreateで、handleOpenUrlメソッドを呼び出してください。

```java
GrowthLink.getInstance().handleOpenUrl(getIntent().getData());
```  
**ディープリンクアクションの実装**  
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
## AndroidManifest設定  
AndroidManifest.xmlにGrowth Message表示用のActivityを追加します。

```xml
<application>
    <!-- ... -->
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
# 備考  
## 最新版のSDKへの乗り換え方法  
[SDKの乗り換え方法](/sdk/android/migrate)をご参照ください。  
## サンプルについて  
実装サンプルは、[GitHubレポジトリ](https://github.com/growthbeat/growthbeat-android)を参考にしてください。  
# お問い合わせ  
ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/)を閲覧してください。  
