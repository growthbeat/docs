---
categories: 'manual'
publishdate: 2015-06-01T00:00:00+09:00
date: 2016-01-15T12:56:00+09:00
description: 'Growth Link'
draft: false
title: 'Growth Link'
---

# ディープリンクについて

Growth Linkの設定にかならずしもdeep linkの知識は必須ではありませんが、
ディープリンクの知識や他関連技術とGrowth Link関係性についての理解を深めておくと設定がやりやすくなります。
理解の助けになる記事を下記に記載いたしました。


[ディープリンクとGrowth Linkの関係](http://faq.growthbeat.com/article/141-growthlink)

[UniversalLinksの説明とGrowth Linkの対応状況](http://faq.growthbeat.com/article/139-universallinks)

[OGP(Open Graph protocol)について](http://faq.growthbeat.com/article/143-open-graph-protocol)

[Twitterカードの説明とGrowth Linkとの対応状況](http://faq.growthbeat.com/article/138-twitter)

[AppLinksの説明とGrowth Linkの対応状況](http://faq.growthbeat.com/article/140-applinks)


# リンク

## 一覧画面

作成したリンクを確認することができます。
確認できるのは、以下の6つです。

1. リンク名
2. URL
3. メディア、タグ
4. クリック数
5. インストール数
6. オープン数

<img src="/img/link/manual-linklist.png" alt="manual-linklist" title="manual-linklist" width="100%"/>

## 編集画面

<img src="/img/link/manual-linkedit-name.png" alt="manual-linkedit-name" title="manual-linkedit-name" width="100%"/>

**リンク名**
リンクを管理するための名前です。

**リンクURL**
DeepLinkのURLを決めることができます。
入力されていない場合はランダムな文字列が与えられます。

### ディープリンク設定

<img src="/img/link/manual-linkedit-action.png" alt="manual-linkedit-action" title="manual-linkedit-action" width="100%"/>

**ランディングページのURL**

ストアやアプリに遷移する前にランディングページを見せたい場合は、URLを入力してください。
空欄の場合はランディングページを挟みません。

**アクション**

ピンクの枠で囲われた部分はではリンクに関連づけるアクションを設定できます。。
アクションについてはメニューにあるアクションを参照してください。

**アプリ未インストール時の遷移先**

<img src="/img/link/manual-linkedit-fallback.png" alt="manual-linkedit-fallback" title="manual-linkedit-fallback" width="100%"/>

アプリがインストールさせていない時の遷移先URLを設定できます。
クリックした時にストア以外に飛ばしたい場合はここを設定してください。
設定しない場合は基本設定で設定しているURLに遷移します。

**ソーシャルメディア設定**

TwitterカードやFacebookのOGPに対応させる場合に設定してください。

### メディア、タグ

<img src="/img/link/manual-linkedit-tag.png" alt="manual-linkedit-tag" title="manual-linkedit-tag" width="100%"/>

このリンクに関連づけるメディアとタグを設定できます。
ポストバックと関連づける際は該当するメディアを選んでください。


# メディア


## 一覧画面

<img src="/img/link/manual-medialist.png" alt="manual-medialist" title="manual-medialist" width="100%"/>

メディアごとのクリック数、インストール数、オープン数を確認できます。

## 編集画面

<img src="/img/link/manual-mediaedit.png" alt="manual-mediaedit" title="manual-mediaedit" width="80%"/>

**メディア名**

メディアの名前を入力してください。
この名前はポストバックやリンク管理でも使われます。


# タグ

## 一覧画面

<img src="/img/link/manual-taglist.png" alt="manual-taglist" title="manual-taglist" width="100%"/>

タグごとのクリック数、インストール数、オープン数を確認できます。

# アクション

## アクションとは
アクションとは、ディープリンク経由でアプリをインストール or 開いた場合の挙動のことです。

## 一覧画面

<img src="/img/link/manual-actionlist.png" alt="manual-actionlist" title="manual-actionlist" width="100%"/>

アクションの一覧を確認できます。

## 編集画面

<img src="/img/link/manual-actionedit.png" alt="manual-actionedit" title="manual-actionedit" width="100%"/>

**名前**

アクションを管理するための名前を入力してください。

**タイプ**

・ URLオープン: 指定したURLをブラウザで開きます。

・ カスタム: 設定したkeyとvalueをアプリ側で取得できます。valueを動的に変えたい場合は[カスタムパラメータ機能](http://growthhack.sirok.co.jp/growthlink/growth-link-3/)を利用してください。


**説明**

アクションのメモを入力できます。

# 基本設定

## 計測方法

<img src="/img/link/manual-setting-method.png" alt="manual-setting-method" title="manual-setting-method" width="100%"/>

Cookie, Device Fingerprint, Install Referrerから計測方法を選択できます。

## リンク基本設定

### iOS用の設定

<img src="/img/link/manual-setting-ios.png" alt="manual-setting-ios" title="manual-setting-ios" width="50%"/>

**App Store URL**

ストアのURLを入力してください。

**URLスキーム**

アプリに設定したURLスキームを入力してください。
例： custom_shceme:// の場合は custom_scheme と入力してください。

#### Universal Links設定

iOS9.x系に対応させるためにはUniversal Links設定が必要になります。
詳しくは導入方法ドキュメントを参照してください。

### Android用の設定

<img src="/img/link/manual-setting-android.png" alt="manual-setting-android" title="manual-setting-android" width="50%"/>

**Google Play URL**

Google PlayストアのURLを入力してください。

**URLスキーム**

アプリに設定したURLスキームを入力してください。
例： custom_shceme:// の場合は custom_scheme と入力してください。

**Androidパッケージ名**
アプリのパッケージ名を入力してください。


### PC用の設定
<img src="/img/link/manual-setting-pc.png" alt="manual-setting-pc" title="manual-setting-pc" width="50%"/>

PCでディープリンクをクリックした場合の遷移先となるURLを入力してください。
