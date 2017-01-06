---
categories: 'manual'
publishdate: 2015-05-01T00:00:00+09:00
date: 2016-07-06T12:05:16+09:00
description: 'Growth Message'
draft: false
title: 'Growth Message'
---

# はじめに

## 新規登録 / ログイン / 連携

Growth Messageの管理画面へログインするためには、会員登録(無料)をする必要があります。Growth Messageのアカウントはシロクが提供するグロースハックツールのプラットフォームであるGrowthbeat( https://growthbeat.com/ )で管理されます。

https://growthbeat.com/ より、会員登録を行うことができます。右上の【会員登録(無料)】をクリックしていただきますと、以下の画像に示されている画面に遷移してアカウント作成が行えます。メールアドレス・パスワード・お客様の属性を選択された後に、利用規約をご覧ください。利用規約とお知らせメールの受信に同意していただける場合にはチェックをしていただきまして、【無料登録】をクリックしていただけますと新規登録は完了です。

<img src="/img/message/register.png" alt="register" title="register" width="100%"/>

アカウントを既にお持ちの場合には、【会員登録(無料)】の隣にあります、【ログイン】をクリックして頂けますと、以下のような画面に遷移しログインすることができます。アカウントのメールアドレスとパスワードをご入力ください。万が一パスワードを忘れてしまった場合は、【ログイン】の下にございます、【パスワード再発行】より、パスワードの再発行を行ってください。

ログイン画面
<img src="/img/message/login.png" alt="login" title="login" width="100%"/>

# 配信作成
配信作成をするために、まずは対象となるアプリをメインメニューの【アプリ】から選択 してください。その後、サイドメニューから【配信作成】を選択します。
<img src="/img/message/create.png" alt="create" title="create" width="100%"/>

## 配信対象
メッセージを送りたい配信対象者のセグメントを設定することができます。デフォルトでは【全ユーザー】が選択されています。

<img src="/img/message/segment.png" alt="segment" title="segment" width="100%"/>

## 配信トリガー

メッセージを出すタイミングを指定することができる項目です。ユーザーの行動(イベント)に沿って、出すタイミングを調節できます。

<img src="/img/message/event.png" alt="event" title="event" width="100%"/>

## テキスト型

テキストを使ったダイアログの表示方法です。入力項目はタイトル・本文・ボタンのテキスト及びクリック時のアクションとなります。ボタン選択時のアクション追加は【[アクション追加](#アクション追加)】をご参照ください。

<img src="/img/message/text.png" alt="text" title="message-create-text" width="100%"/>

## カード型

画像を用いたダイアログ通知のタイプです。全画面をボタンにし、ユーザーがタップした後に任意のアクションをさせることが可能です。また、ボタンを設置して、ボタンを押した後のアクションを任意で指定すること可能です。ダイアログの右上に、閉じるための✖ボタンを設置することができます。

<img src="/img/message/card.png" alt="card" title="card" width="100%"/>

背景画像と閉じるボタンは任意の画像を採用することができます。【画像を選択】をクリックすると、以下のようなポップアップが表示されます。右上の【アップロード】をクリックすると、画像のアップロードをすることができます。

<img src="/img/message/picture_upload.png" alt="picture_upload" title="picture_upload" width="100%"/>

## ウォークスルー型

2枚以上の画像をスライド形式で表示させます。ボタンの設定をすると、タップ後のアクションを指定することができます。

<img src="/img/message/walkthrough.png" alt="walkthrough" title="walkthrough" width="100%"/>


## 配信オプション / 配信回数上限

配信回数上限は、指定期間内に1人のユーザーに対して何度まで設定したポップアップ を表示させるかを指定することができます。

<img src="/img/message/limit.png" alt="limit" title="limit" width="100%"/>

## 配信期間

有効期間の設定で、メッセージが表示される期間を指定することができます。配信終了が指定されていない場合は、配信が停止されるまで有効となります。期間中であっても配信を一時停止することは可能です。停止の仕方については、【[配信設定](#配信設定)】をご参照ください。

<img src="/img/message/duration.png" alt="duration" title="duration"/>

## プレビュー / 実機プレビュー
ユーザーがメッセージを開いた際に、どのように見えるのかをプレビューで確認することができます。

<img src="/img/message/preview.png" alt="preview" title="preview" width="100%"/>

# 配信一覧

## 一覧項目
作成したメッセージは、メッセージ一覧にストックされていきます。

<img src="/img/message/message_list.png" alt="message_list" title="message_list" width="100%"/>

## 配信設定
* 配信 / 停止

作成したメッセージの配信を、設定した通りに配信するか、それとも有効期間中であっても一時的に無効化して停止にするのかを設定することができるスイッチがあります。

<img src="/img/message/message_on.png" alt="message_on" title="message_on" width="100%"/>

# アクション一覧

## 一覧項目
作成した、メッセージのボタンを押した後のユーザーアクションを一覧でみることができます。

<img src="/img/message/action_list.png" alt="action_list" title="action_list" width="100%"/>

## アクション追加

アクションを追加するためには、サイドメニューのアクション一覧から、【アクション追加】ボタンをクリックします。

<img src="/img/message/action_add_button.png" alt="action_add_button" title="action_add_button" width="100%"/>

【アクション追加】をクリックすると、以下のようなポップアップが表示されます。「*」がついた項目は必須項目となります。アクションのタイプは (1)なし (2)URLオープン (3) カスタム があります。登録したアクションは、全てのボタンで選択できるアクションとして共有されます。

<img src="/img/message/action_add.png" alt="action_add" title="action_add" width="100%"/>

1. なし
    * ボタンをクリックした後、ユーザーにさせたいアクションがない場合に選択します。
2. オープンURL
    * ボタンをクリックしたあと、ユーザーが指定した URL に遷移するように設定できます。
3. カスタム
    * JSON を使って自由にユーザーにさせたいアクションを設定できます。


<!--more-->
