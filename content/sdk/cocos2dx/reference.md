---
categories: 'sdk'
date: 2015-11-16T14:32:58+09:00
description: 'Growthbeat Cocos2dx の API について説明します'
draft: false
title: Growthbeat Cocos2dx API
---

Version 1.2.6

# Growthbeat API

## Growthbeat インスタンスの取得

Growthbeat インスタンスを取得します。

```cpp
static Growthbeat* getInstance();
```

## 初期化

Growthbeat の初期化を行います。初期化では、デバイス登録、認証、および端末の基本情報の送信が行われます。

```cpp
void initialize(const std::string &applicationId, const std::string &credentialId);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| applicationId | アプリケーションID |
| credentialId | クレデンシャルキー |

## 起動イベントの送信

アプリケーションの起動イベントを送信します。

```cpp
void start();
```

## 終了イベントの送信

アプリケーションの起動イベントを送信します。

```cpp
void stop();
```

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

# Growth Analytics API

## Growth Analytics インスタンスの取得

Growth Analytics インスタンスを取得します。

```cpp
static GrowthAnalytics* getInstance();
```

## 基本タグの送信

端末の基本情報を送信します。基本情報には以下が含まれます。

- デバイスモデル
- OS
- 言語
- タイムゾーン
- タイムゾーンオフセット
- アプリバージョン
- 広告ID（ Android:AdvertisingId, iOS:IDFA ）
- 広告利用可否

```cpp
void setBasicTags(void);
```

## 特定のイベントを送信

### 起動イベント

ユーザーの起動イベントを送信します。セッション時間の計測を開始するために必要なメソッドです。

```cpp
void open(void)
```

### 終了イベント

アプリの終了イベントを送信します。セッション時間の計測を停止します。

```cpp
void close(void);
```

### 購入イベント

課金時にメソッドを呼び、課金額、アイテムのカテゴリなどを送信することができます。

```cpp
void purchase(int price, const std::string& category, const std::string& product);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| price | 価格 |
| category | 任意のカテゴリ |
| product | 任意のアイテム名|

## 特定のタグを送信

### ユーザーIDタグ

アプリのユニークなユーザーIDを送信します。

```cpp
void setUserId(const std::string& userId);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| userId | 任意のユニークなユーザー名|

### 名前タグ

アプリのユーザー名を送信します。

```cpp
void setName(const std::string& name);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| name | 任意のユーザー名 |

### 年齢タグ

アプリのユーザーの年齢を送信します。

```cpp
void setAge(int age);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| age | ユーザーの年齢 |

### 性別タグ

変数は、 GAGender を用いてどちらか性別を送信してください。

```cpp
void setGender(GAGender gender);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|gender| 男性: `GAGender::GAGenderMale` 女性: `GAGender::GAGenderFemale` |

### レベルタグ

アプリのユーザーのレベルを送信します。

```cpp
void setLevel(int level);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|level| ユーザーのレベル |

### 開発用タグ

開発用のフラグををつけます。

```cpp
void setDevelopment(bool development);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| development | 開発用の場合は `true` |

### 乱数タグ

乱数を端末の情報として紐付けます。

```cs
void setRandom(void);
```

## カスタムイベント送信

### イベントの送信

```cpp
void track(const std::string& name);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| name | フォーマット: `Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` <br/> `YOUR_APPLICATION_ID` : ApplicationID <br/> `CUSTOM_EVENT_ID` : 英数字[a-zA-Z0-9]で任意の識別子を指定してください|


### イベント名と任意のMapの送信


```cpp
void track(const std::string& name, const std::map<std::string, std::string>& properties);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| name | フォーマット: `Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` <br/> `YOUR_APPLICATION_ID` : ApplicationID <br/> `CUSTOM_EVENT_ID` : 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
| properties |カスタムイベントに持たせる任意のMap|


### イベント名とイベント取得回数オプションの送信

```cpp
void track(const std::string& name, GATrackOption option);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| name | フォーマット: `Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` <br/> `YOUR_APPLICATION_ID` : ApplicationID <br/> `CUSTOM_EVENT_ID` : 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
| option |TrackOptionDefault, TrackOptionOnce, TrackOptionCounterのいずれかを指定します。|

**option**

|項目名|詳細|
|:--|:--|
| TrackOptionDefault |デフォルト値。特に何もしません。|
| TrackOptionOnce |このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
| TrackOptionCounter |このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|


### イベント名と任意のMapの送信とイベント取得回数オプションの送信

```cs
void track(const std::string& name, const std::map<std::string, std::string>& properties, GATrackOption option);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| name | フォーマット: `Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` <br/> `YOUR_APPLICATION_ID` : ApplicationID <br/> `CUSTOM_EVENT_ID` : 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
| properties |カスタムイベントに持たせる任意のMap|
| option |TrackOptionDefault, TrackOptionOnce, TrackOptionCounterのいずれかを指定します。|

**option**

|項目名|詳細|
|:--|:--|
| TrackOptionDefault |デフォルト値。特に何もしません。|
| TrackOptionOnce |このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
| TrackOptionCounter |このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|

## カスタムタグ送信

### タグの送信

```cpp
void tag(const std::string& name);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| name |フォーマット: `Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID` : ApplicationID<br/>  `LAST_ID` : 英数字[a-zA-Z0-9]で任意の識別子を指定してください|

### タグと任意の値を送信

```cpp
void tag(const std::string& name, const std::string& value);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| name |フォーマット: `Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID` : ApplicationID<br/>  `LAST_ID` : 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
| value |カスタムタグに持たせる任意の Value |


## フルカスタマイズなイベントの送信
特定のネームスペース、イベントIDを設定していただくことが可能です。

```
void track(const std::string& _namespace, const std::string& name, const std::map<std::string, std::string>& properties, GATrackOption option);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
| _namespace |ネームスペース|
| name |フォーマット: `Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID` : ApplicationID<br/>  `LAST_ID` : 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
| properties |イベントに持たせる任意のMap|
| option | TrackOptionDefault, TrackOptionOnce, TrackOptionCounter のいずれかを指定します。|
| completion |イベント作成後のコールバック|

**option**

|項目名|詳細|
|:--|:--|
| TrackOptionDefault |デフォルト値。特に何もしません。|
| TrackOptionOnce |このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
| TrackOptionCounter |このオプションを指定した場合、自動で counter といプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|


## フルカスタマイズなタグの送信

特定のネームスペース、タグIDを設定していただくことが可能です。

```
void tag(const std::string& _namespace,const std::string& name, const std::string& value);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|_namespace|ネームスペース|
|name|フォーマット:`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID<br/>  `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|value|タグに持たせる任意のValue|
|completion|タグ作成後のコールバック|


# Growth Push API

## Growth Push インスタンスの取得

Growth Push インスタンスを取得します。

```cpp
static GrowthPush* getInstance();
```

## デバイストークンの取得・送信

### iOS

```cpp
void requestDeviceToken(GPEnvironment environment);
```

|項目名|詳細|
|:--|:--|
| environment |開発用: `Environment.development` 本番用: `Environment.production`|

### Android & iOS

```cpp
void requestDeviceToken(const std::string &senderId, GPEnvironment environment);
```

|項目名|詳細|
|:--|:--|
| senderId | Android の SenderId |
| environment |開発用: `Environment.development` 本番用: `Environment.production`|

## 基本タグの送信

Device, OS, Language, Time Zone, Version, Buildが含まれます。

```cs
void setDeviceTags();
```

## イベントの送信（Push専用）

### イベントの送信（Push専用）

```cpp
void trackEvent(const std::string &name);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|

### イベントと任意の値の送信（Push専用）

```cpp
void trackEvent(const std::string &name, const std::string &value);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|

## タグの送信（Push専用）

### タグの送信（Push専用）

```cpp
void setTag(const std::string &name);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|

### タグと任意の値の送信（Push専用）

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
