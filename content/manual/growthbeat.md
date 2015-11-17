---
categories: 'manual'
date: 2015-11-16T12:05:16+09:00
description: 'Growtbeat'
draft: false
title: Growthbeat
---

# はじめに

## 新規登録/ログイン

https://growthbeat.com/ より、会員登録を行うことができます。右上の【会員登録(無料)】をクリックしていただきますと、以下の画像に示されている画面に遷移してアカウント作成が行えます。メールアドレス・バスワード・お客様の属性を選択された後に、利用規約をご覧ください。利用規約とお知らせメールの受信に同意していただける場合にはチェックをしていただきまして、【無料登録】をクリックしていただけますと新規登録は完了です。

<img src="/img/beat/beat-create-account.png" alt="beat-create-account" title="beat-create-account" width="100%"/>

アカウントを既にお持ちの場合には、【会員登録(無料)】の隣にあります、【ログイン】をクリックして頂けますと、以下のような画面に遷移しログインすることができます。アカウントのメールアドレスとバスワードをご入力ください。万が一バスワードを忘れてしま った場合は、【ログイン】の下にございます、【バスワード再発行】より、バスワードの再 発行を行ってください。

**ログイン画面**
<img src="/img/beat/beat-login.png" alt="beat-login" title="beat-login" width="100%"/>

# マイページ

Growthbeat のトップ画面から Mypage を選択してください。 Mypage では下記項目の確認ができます。

* アカウント情報
* スタッフ一覧（子アカウントの確認）
* 現在のリクエスト数
* クレデンシャルキー等の高度な設定
* 現在のプランの確認

**マイページ**
<img src="/img/beat/beat-select-mypage.png" alt="beat-select-mypage" title="beat-select-mypage" width="100%"/>

# アカウント情報の確認

## アカウントIDの確認

マイページのアカウントIDが確認できます。アカウントIDはAPIを使用する際に必要になります。

<img src="/img/beat/beat-account-id.png" alt="beat-account-id" title="beat-account-id" width="100%"/>

## パスワードの変更

パスワードを変更する場合は、自分のアカウントを選択し、詳細タブを選択します。
下部にあるパスワードの変更ボタンをクリックします。

<img src="/img/beat/beat-change-password.png" alt="beat-change-password" title="beat-change-password" width="100%"/>

現在のパスワード・新しいパスワード・新しいパスワードの再入力をして、パスワードの変更が完了になります。	

<img src="/img/beat/beat-change-password-modal.png" alt="beat-change-password-modal" title="beat-change-password-modal" width="100%"/>

## APIキーの確認

Mypage の下部に APIキー があります。APIリクエストを送る際に必要な key になります。

<img src="/img/beat/beat-api-key.png" alt="beat-api-key" title="beat-api-key" width="100%"/>

## SDKキーの確認

Mypage の下部に SDKキー があります。SDKリクエストを送る際に必要な key になります。

<img src="/img/beat/beat-sdk-key.png" alt="beat-sdk-key" title="beat-sdk-key" width="100%"/>

# アプリ情報の確認

## アプリの登録

上部セレクトボックスを `アカウント名 > Growthbeat > 全てのアプリケーション` にします。
一番右のセレクトボックスの最下部からアプリケーションを選択できます。

<img src="/img/beat/beat-add-application.png" alt="beat-add-application" title="beat-add-application" width="100%"/>

アプリケーション名を登録すると、アプリの登録完了となります。複数登録する場合は、アプリ名の区別がつきやすい名前入にすることをおすすめします。

<img src="/img/beat/beat-add-application-modal.png" alt="beat-add-application-modal" title="beat-add-application-modal" width="100%"/>

## アプリストアURLの登録

アプリケーションストアのURLの保存ができます。

<img src="/img/beat/beat-application-status.png" alt="beat-application-status" title="beat-application-status" width="100%"/>

## アプリの削除

上部セレクトボックスを `アカウント名 > Growthbeat > 対象アプリ` にします。
最下部にアプリの削除ボタンがあり、対象アプリの削除が可能です。

<img src="/img/beat/beat-application-status.png" alt="beat-application-status" title="beat-application-status" width="100%"/>

# スタッフ一覧

自身のアカウントに紐づく子アカウントが表示されます。子アカウントの招待も行えます。

<img src="/img/beat/beat-stuff-list.png" alt="beat-stuff-list" title="beat-stuff-list" width="100%"/>

## スタッフ招待

権限を与えたいアカウントの権限を選択します。

|項目|内容|
|:---|:---|
|アプリケーション選択|権限を付与したいアプリ名|
|権限選択| 管理者：閲覧かつ編集権限 <br /><br /> 閲覧者：閲覧のみの権限|
|メールアドレス|招待を送りたいメールアドレス|
|招待文|メールに含まれる文章|

**注意**：子アカウントのリクエスト数は、招待元のアカウントのものとして扱われます。子アカウントに引き継がれるのは、**アプリの権限のみとなり、サービスの権限は引き継がれません**。

<img src="/img/beat/beat-stuff-invitation.png" alt="beat-stuff-invitation" title="beat-stuff-invitation" width="100%"/>

# リクエスト数の確認

サービスのリクエスト数が確認できます。
上部のセレクトボックスにてサービスを選択すると、より詳細な、登録アプリごとのリクエスト数が確認できます。

<img src="/img/beat/beat-request-application.png" alt="beat-request-application" title="beat-request-application" width="100%"/>

# 高度な設定

クレデンシャルキーの管理、アカウントのIP制限、権限追加が行えます。

<img src="/img/beat/beat-advanced-setting.png" alt="beat-advanced-setting" title="beat-advanced-setting" width="100%"/>

## クレデンシャルキーの追加・削除

APIにアクセスするためのクレデンシャルキーの追加ができます。追加・削除が行えるので、**外部にクレデンシャルキーを提供する場合等にご使用ください**。

<img src="/img/beat/beat-add-cledential.png" alt="beat-add-cledential" title="beat-add-cledential" width="100%"/>

## IP制限

IP制限を追加すると、こちらで指定したIPからのみ Growthbeat の管理画面にログイン可能になります。

## 権限

アカウントに対して、より詳細な権限をもつアカウントを追加することができます。こちらは高度な設定になりますので、設定したい場合は [こちら](https://growthbeat.com/inquiry) よりお問い合わせください。

<img src="/img/beat/beat-add-authority.png" alt="beat-add-authority" title="beat-add-authority" width="100%"/>

# プラン設定

自身が登録しているプランの確認が行えます。

<img src="/img/beat/beat-plan-list.png" alt="beat-plan-list" title="beat-plan-list" width="100%"/>

## リクエスト上限数の確認

リクエスト上限数の確認ができます。Enterprise 契約のお客様はクレジットカードの登録は必要ない場合もございます。	

<img src="/img/beat/beat-check-plan.png" alt="beat-check-plan" title="beat-check-plan" width="100%"/>

## クレジットカードの登録

クレジットカード情報の登録になります。

**注意**：カード決済は**月の営業日初日**に請求させていただきます。カード情報に誤りがあった場合はメールにてご連絡させていただきます。

<img src="/img/beat/beat-add-credit.png" alt="beat-add-credit" title="beat-add-credit" width="100%"/>


<!--more-->
