---
categories: 'sdk'
date: 2015-11-16T14:32:58+09:00
description: 'Growthbeat Cocos2dx の API について説明します'
draft: false
title: Growthbeat Cocos2dx API
---

Version 2.0.4

# Growthbeat API

## Growthbeat インスタンスの取得

Growthbeat インスタンスを取得します。

```cpp
static Growthbeat* getInstance();
```

## ハンドラ

### ハンドラ初期化

```cpp
void initializeIntentHandlers();
```

### 処理をしないハンドラ

```cpp
void addNoopIntentHandler();
```

### ブラウザを開くハンドラ

```cpp
void addUrlIntentHandler();
```

### カスタムハンドラ

```cpp
void addCustomIntentHandler(const std::function<bool(std::map<std::string,std::string>)>& handle);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|map| key/valueのマップ値 |


## ログの停止

Growthbeat SDKからのログ出力を全て停止します。
デフォルトでは、ログ出力がおこなわれます。

```cpp
void setLoggerSilent(bool silent);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|silent| ログ出力を行うか。`YES`: ログ出力しない `NO`:ログ出力をする |

# Growth Push API

## Growth Push インスタンスの取得

Growth Push インスタンスを取得します。

```cpp
static GrowthPush* getInstance();
```

## 初期化

Growth Push の初期化を行います。初期化では、デバイス登録、認証、および端末の基本情報の送信が行われます。

```cpp
void initialize(const std::string &applicationId, const std::string &credentialId, GPEnvironment environment);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| applicationId | アプリケーションID |
| credentialId | クレデンシャルキー |
| environment |開発用: `Environment.development` 本番用: `Environment.production`|

## デバイストークンの取得・送信

### iOS

```cpp
void requestDeviceToken();
```

### Android & iOS

```cpp
void requestDeviceToken(const std::string &senderId);
```
**パラメータ**

|項目名|詳細|
|:--|:--|
| senderId | Android の SenderId |

## イベントの送信

### イベントの送信

```cpp
void trackEvent(const std::string &name);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|

### イベントと任意の値の送信

```cpp
void trackEvent(const std::string &name, const std::string &value);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|

### イベントと任意の値の送信

設定したポップアップメッセージの表示準備が完了したときに、コールバックされます。

```cpp
void trackEvent(const std::string &name, const std::string &value, const std::function<void(std::string)> &showMessageHandler);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|
|showMessageHandler| メッセージコールバック |

### メッセージ表示

```cpp
void renderMessage(const std::string &uuid);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|uuid|メッセージ表示するためのキー|

## タグの送信

### タグの送信

```cpp
void setTag(const std::string &name);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|

### タグと任意の値の送信

```cpp
void setTag(const std::string &name, const std::string &value);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|
|value|タグに持たせる値|

## バッチクリア

配信時に、バッチにチェックマークを付けた場合、バッチをクリアするためのメソッドです。
iOSのみ利用できます。

```cpp
void clearBadge();
```

# Growth Link API

## Growth Linkの初期化

Growthbeatへデバイス登録・認証を行います。

```cpp
void initialize(const std::string& applicationId, const std::string& credentialId);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| applicationId | アプリケーションID |
| credentialId | クレデンシャルキー |

```cpp
void handleOpenUrl(const std::string& url);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| url | 表示するURL |
