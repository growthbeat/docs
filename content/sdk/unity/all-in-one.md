---
categories: 'sdk'
date: 2017-01-06T12:00:00+09:00
description: 'Growthbeat SDK for Unity の導入方法について説明します'
draft: false
title: Growthbeat Unity SDK | 全機能利用ガイド
---

# Growthbeat利用ガイド  

# 1. Growth Pushを利用  
Growth Pushのみを利用する[導入方法](/sdk/unity/guide)をご覧ください。

# 2. Growth Messageを利用 
Growth Message を用いてポップアップを任意のタイミングで表示させるには、「[配信トリガー](http://support.growthbeat.com/manual/growthmessage/#配信トリガー)」 を設定します。「[配信トリガー](http://support.growthbeat.com/manual/growthmessage/#配信トリガー)」 は作成したカスタムイベントの中から選ぶ必要がございます。

## 実装コード  
配信トリガーとなるカスタムイベントを作成するには、ポップアップメッセージを表示させたい任意の場所に下記のようなイベントを送信するメソッドを記述してください。

```c#
public class GrowthbeatComponent : MonoBehaviour {
    void Awake () {
        GrowthPush.getInstance().TrackEvent("Launch","","GrowthbeatComponent","ShowMessage");
    }
    void ShowMessage (string uuid) {
        // wait frame
        GrowthPush.GetInstance ().RenderMessage (uuid);
    }
}
```

## AndroidManifest.xml の設定  
AndroidManifest.xml にGrowth Message表示用のActivityを追加します。

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

# 備考  
## 最新版のSDKへの乗り換え方法  
Growth Push SDKからGrowthbeat 2.x SDK への乗り換えまたは、Growthbeat 1.x SDKからGrowthbeat 2.x SDKへの乗り換えをされる方は
[SDKの移行ガイド](/sdk/unity/upgrade)をご参照ください。    
## サンプルについて  
実装サンプルは、[Githubレポジトリ](https://github.com/growthbeat/growthbeat-unity)を参考にしてください。  
# お問い合わせ  
ご不明な点などございます場合は、[ヘルプページ](http://faq.growthbeat.com/)を閲覧してください。  
