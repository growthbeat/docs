---
categories: 'sdk'
date: 2015-11-26T14:32:58+09:00
description: 'Growthbeat Android のリリースノート'
draft: false
title: リリースノート
---

# バージョン 2.0.3

## 変更点
- LruCacheをサポートライブラリの使用に変更いたしました。

# バージョン 2.0.2

## 変更点
- Client APIの変更がありました。

## バグ
- Growthbeat 1.xから乗り換え時に、特定の条件で情報が引き継げない不具合を修正しました。

# バージョン 2.0.1

## 変更点
- Handlerを使ったメッセージ表示方法を変更しました。

## バグ
- Tagの値がnullの場合に、データが送られない不具合を修正しました。

# バージョン 2.0.0

## 変更点

- Growthbeatのインターフェースを変更しました。
- Growth Analyticsの機能が無くなりました。
- Growth Messageの表示機能が改善いたしました。

# バージョン 1.2.7

## 変更点

- Growth LinkのFingerprint計測処理を最適化しました。

## バグ

- Growth LinkのSynchronize処理が複数回実行される可能性がある部分を修正しました。

# バージョン 1.2.6

## 変更点

- Registration tokenをInstanceIDクラスで取得するように変更しました。
- Registration tokenの更新通知を受け取るクラスを追加しました。
- Push通知受信クラスをBroadcastReceiverからGcmListenerServiceに変更しました。
- Growth Pushのdeprecatedコメントを削除しました。

## ドキュメント

- Growth Pushの導入方法を変更しました。

## バグ

- スレッドがデッドロックする不具合を修正しました。
- プッシュ通知の通知エリアのアイコン背景色が変更できない不具合を修正しました。

# バージョン 1.2.5

## 新機能

- Growthbeatのクライアントを取得するAPIを追加しました。
- 広告情報の送信をオプション化しました。

## 変更点

- スレッド管理を一元化するようにしました。
- Installイベントを起動時からGrowthbeatの初期化内に移動しました。

## バグ

- Android Mにて、Growth Messageのバナータイプがクラッシュする現象を修正しました。

# バージョン 1.2.4

## 新機能

- Gradleプロジェクトに対応しました。

## 変更点

- HttpClientを廃止して、HttpURLConnectionに移行しました。
- growthlink.jarを廃止して、growthbeat.jarに統合しました。

## ドキュメント

- Gradleプロジェクトへの導入方法を追加しました。

# バージョン 1.2.3

## 新機能

- Growth Link デバイスフィンガープリントに対応いたしました。

## ドキュメント

- Growth Push SDKからの乗り換え方法を追加しました。

## バグ対応

- Growth Messageで、ポップアップのActivityが消えない問題を修正しました。

# バージョン 1.2.2

## 新機能

- Growth Pushでカスタムアイコンを設定できるようにしました。
- Growth Pushのダイアログ表示を管理画面から変更できるように変更しました。

## ドキュメント

- カスタムアイコン表示の実装方法を記載しました。

# バージョン 1.2.1

## 新機能

- Growth Messageの配信パターン、ウォークスルーをサポートしました。

## ドキュメント

- iOSのみの実装方法の記載となります。

# バージョン 1.2.0

## 新機能

- Growth Link追加いたしました。

## ドキュメント

- Growth Link導入方法を追加

# バージョン 1.1.2

## バグフィックス

- Growth Pushデバイストークン送信方法を変更いたしました。

# バージョン 1.1.1

## 変更点

- Growth Push一部メソッドを変更

## ドキュメント

# バージョン 1.1.0

## 新機能

- Growth Push導入方法追加いたしました。

## 変更点

- Growthbeat, Growth Analytics一部メソッド変更を修正

## ドキュメント

- Growth Push導入方法を追加いたしました。
- Growthbeat, Growth Analyticsのメソッド変更点**を修正いたしました。


# バージョン 1.0.1

## 新機能

- Growth Analyticsカスタムタグ・イベントについて追加いたしました。

# バージョン 1.0

Growthbeat メジャーバージョンSDKリリースいたしました。

## ドキュメント

- Growthbeat, Growth Analytics, Growth Messageの導入方法を記載
