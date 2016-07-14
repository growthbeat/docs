---
categories: 'sdk'
date: 2015-11-16T14:32:58+09:00
description: 'Growthbeat iOS のリリースノート'
draft: false
title: リリースノート
---

# バージョン 2.0.1

## 変更点
- Handlerを使ったメッセージ表示方法を変更しました。

## バグ
- ウォークスルー表示で、回転を行ったときに1ページ目に戻ってしまうバグを修正しました。

# バージョン 2.0.0

## 変更点

- Growthbeatのインターフェースを変更しました。
- Growth Analyticsの機能が無くなりました。
- Growth Messageの表示機能が改善いたしました。

## バグ
- バージョン1.2.7で対応を行った、Growth Pushのbundleとversionタグの登録情報に誤りがあったため修正いたしました。

# バージョン 1.2.7

## 変更点

- bitcodeに対応いたしました。
- Growth LinkのUniversal Links経由のアプリ遷移を最適化いたしました。
- 導入時にdSYM 関連のwarningが出る問題を修正いたしました。

## ドキュメント

- Growth Push導入に関する実装方法に詳細説明を加えました。

## バグ
- Growth Pushのbundleとversionタグの登録情報に誤りがあったため修正いたしました。

# バージョン 1.2.6

## 変更点

- Growth Pushデバイストークンのパース方法が32bitに依存していたため、パース方法を修正いたしました。

## ドキュメント

- Growth Push導入に関する実装方法に詳細説明を加えました。

## バグ

- ネットワーク通信が走らないときに、Growth Push初期化で処理が止まってしまう不具合を修正しました。

# バージョン 1.2.5

## 新機能

- Growthbeatのクライアントを取得するAPIを追加しました。
- 広告情報の送信をオプション化しました。

## 変更点

- Installイベントを起動時からGrowthbeatの初期化内に移動しました。

# バージョン 1.2.4

## 新機能

- Growth LinkのSFSafariViewController対応をしました。

# バージョン 1.2.3

## 新機能

* Growth Link デバイスフィンガープリントに対応いたしました。

## ドキュメント

* Growth Push SDKからの乗り換え方法を追加しました。

# バージョン 1.2.2

## 新機能

- Growth Messageの配信パターン、バナーをサポートしました。

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

# バージョン 1.1.0

## 新機能

- Growth Push導入方法追加いたしました。

## 変更点

- Growthbeat, Growth Analytics一部メソッド変更を修正

## ドキュメント

- Growth Push導入方法を追加いたしました。
- Growthbeat, Growth Analyticsのメソッド変更点を修正いたしました。


# バージョン 1.0.1

## 新機能

- Growth Analyticsカスタムタグ・イベントについて追加いたしました。

# バージョン 1.0

Growthbeat メジャーバージョンSDKリリースいたしました。

## ドキュメント

- Growthbeat, Growth Analytics, Growth Messageの導入方法を記載
