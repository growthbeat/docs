---
categories: 'manual'
date: 2015-11-04T12:05:16+09:00
description: 'GrowthMessage'
draft: false
title: GrowthMessage
---

# はじめに

## 新規登録 / ログイン / 連携

Growth Message の管理画面へログインするためには、会員登録(無料)をする必要があります。GrowthMessageのアカウントはSirokが提供すグロースハックツールのプラットフォームであるGrowthbeat( https://growthbeat.com/ )で管理されます。

https://growthbeat.com/ より、会員登録を行うことができます。右上の【会員登録(無 料)】をクリックしていただきますと、以下の画像に示されている画面に遷移してアカウント作成が行えます。メールアドレス・パスワード・お客様の属性を選択された後に、利用規約をご覧ください。利用規約とお知らせメールの受信に同意していただける場合にはチェックをしていただきまして、【無料登録】をクリックしていただけますと新規登録は完了です。

<img src="/img/message/message-register.png" alt="message-register" title="message-register" width="100%" data-action="zoom" />

アカウントを既にお持ちの場合には、【会員登録(無料)】の隣にあります、【ログイン】をクリックして頂けますと、以下のような画面に遷移しログインすることができます。アカウントのメールアドレスとパスワードをご入力ください。万が一パスワードを忘れてしま った場合は、【ログイン】の下にございます、【パスワード再発行】より、パスワードの再 発行を行ってください。

ログイン画面
<img src="/img/message/message-login.png" alt="message-login" title="message-login" width="100%"/>

ログインされますと、Growthbeat のトップ画面にたどり着きます。そこでGrowthMessage を選択してください。

トップ画面
<img src="/img/message/message-top.png" alt="message-top" title="message-top" width="100%"/>

サービス連携
Growth Message の管理画面を初めて表示する際には、以下のようにサービス連携の許可を得るための画面が表示されます。ガイドラインから Growthbeatの規約を確認してください。規約に同意する場合にはチェックをし、【連携する】をクリックされると、管理画面が表示されます。

<img src="/img/message/message-cooperation.png" alt="message-cooperation" title="message-cooperation" width="100%"/>

## アプリの追加

上記の操作を完了すると、管理画面が表示されます。この時アプリは Default App が選択 された状態になっています。

<img src="/img/message/message-add-application.png" alt="message-add-application" title="message-add-application" width="100%"/>

Growth Message を適用したいアプリを追加するには、メインメニューの【アプリ】のプルダウンメニューから、【アプリ追加】を選択し、アプリケーション作成画面へ遷移します。適用したいアプリの名前を入力し、作成ボタンをクリックして完了となります。

<img src="/img/message/message-create-application.png" alt="message-create-application" title="message-create-application" width="100%"/>

作成が完了すると、アプリを管理している Growthbeat画面へ遷移します。アプリ名以外の情報をここで入力し、管理してください。Growth Message の管理画面へは、ヘッダーから遷移することができます。

<img src="/img/message/message-setting-application.png" alt="message-setting-application" title="message-setting-application" width="100%"/>

メッセージを送信するためには、メインメニューから対象のアプリを選択し、諸設定を行 う必要があります。

# 基本設定
## イベント設定

GrowthMessageに登録されているイベントを一覧で表示する画面です。一覧項目は以下 の3つになっており、詳細ボタンをクリックするとそれぞれのイベントを起こしたユーザーのログを確認することができます。
1.ID
2.表示名

3.作成日時

<img src="/img/message/message-event-list.png" alt="message-event-list" title="message-event-list" width="100%"/>

## タグ設定
GrowthMessage に登録されているタグを一覧で表示する画面です。一覧項目は以下の3つです。

1.ID2.表示名

3.作成日時

<img src="/img/message/message-tag-list.png" alt="message-tag-list" title="message-tag-list" width="100%"/>

## セグメント設定Growth Message でこれまで作成したセグメントが一覧で閲覧できます。一覧項目は以下 の3つです。セグメントはいつでも編集することができます。1.ID
2.表示名

3.作成日時

<img src="/img/message/message-segment-list.png" alt="message-segment-list" title="message-segment-list" width="100%"/>

# 配信作成
## 配信名 / 説明
配信作成をするために、まずは対象となるアプリをメインメニューの【アプリ】から選択 してください。その後、メインメニューから【配信作成】を選択します。 配信名には、送信したいメッセージのタイトルを入力してください(例: 課金訴求ポッ プアップ)。 配信名の最大文字数は 32 文字です。 タスク説明には、送信したいメッセージについての補足説明を入力してください。

<img src="/img/message/message-create.png" alt="message-create" title="message-create" width="100%"/>

## 配信メッセージ

配信するメッセージのタイプを指定することができます。配信のタイプは1テキスト型 2カード型 の2種が用意されています。パターンは任意で4種まで追加していくことが 可能です。追加するには【+パターンを追加】ボタンをクリックしてください。

**1.テキスト型**

テキストを使ったダイアログの表示方法です。入力項目はタイトル・本文・ボタンのテ キスト及びクリック時のアクションとなります。アクションはデフォルトでは登録されていないため、登録する必要があります。

<img src="/img/message/message-create-text.png" alt="message-create-text" title="message-create-text" width="100%"/>

アクションを追加するためには、【アクション追加】ボタンをクリックします。

<img src="/img/message/message-add-action.png" alt="message-add-action" title="message-add-action" width="100%"/>

【アクション追加】をクリックすると、以下のようなポップアップが表示されます。※が ついた項目は必須項目となります。アクションのタイプは (1)URL オープン (2)なし (3) カスタムがあります。登録したアクションは、全てのボタンで選択できるアクションとして共有されます。

<img src="/img/message/message-create-action.png" alt="message-create-action" title="message-create-action" width="100%"/>

(1) オープンURL
ボタンをクリックしたあと、ユーザーが指定した URL に遷移するように設定できます。(2) なし

ボタンをクリックした後、ユーザーにさせたいアクションがない場合に選択します。(3) カスタムJSON を使って自由にユーザーにさせたいアクションを設定できます。

**2.カード型**

画像を用いたダイアログ通知のタイプです。全画面をボタンにし、ユーザーがタップした後に任意のアクションをさせることが可能です。また、ボタンを設置して、ボタンを 押した後のアクションを任意で指定すること可能です。 ダイアログの右上に、閉じるための✖ボタンを設置することができます。設置するには 【✖ボタンをつける】のチェックボックスをクリックしてください。

<img src="/img/message/message-create-card.png" alt="message-create-card" title="message-create-card" width="100%"/>

画像の右上につく【閉じるボタン】は、任意の画像を採用することができます。チェック ボックスをクリックすると、以下のようなポップアップが表示されます。右上の【画像アップロード】をクリックすると、画像のアップロードをすることができます。

<img src="/img/message/message-upload-image.png" alt="message-upload-image" title="message-upload-image" width="100%"/>

* 背景画像```推奨サイズ:横 600~800(px)、縦 700~940(px)
バリデーション:w1200px```* ボタン画像```推奨サイズ:横 600~800(px)、縦 60px 以上
バリデーション:w1200px
```

**3.バナー型**

画像と文言を用いたプッシュ通知風のタイプです。画像のみを選択した場合は、バナータイプの画像が上部に表示されます。

<img src="/img/message/message-create-banner.png" alt="message-create-banner.png" title="message-create-banner.png" width="100%"/>

**4.ウォークスルー型**

2枚以上の画像をスライド形式で表示させます。ボタンの設定をすると、タップ後のアクションを指定することができます。

<img src="/img/message/message-create-walkthrough.png" alt="message-create-walkthrough" title="message-create-walkthrough" width="100%"/>


## プレビュー / 実機プレビュー
ユーザーがメッセージを開いた際に、どのように見えるのかをプレビューで確認することができます。また、複数のパターンを作成している場合、そのパターンの合計や内訳を閲覧できます。

<img src="/img/message/message-preview.png" alt="message-preview" title="message-preview" width="100%"/>

【実機プレビュー】をクリックすると、以下のようなポップアップが表示され、iOS・Androidそれぞれでの見え方を確認することができます。機種によっては、実際の見え方が少々異 なる場合もございます。

<img src="/img/message/message-device-preview.png" alt="message-device-preview" title="message-device-preview" width="100%"/>

## サンプル画像のダウンロード
サンプル画像のテンプレートを、簡単にダウンロードして使用することができます。使用するために必要な申請などは一切ありません。

<img src="/img/message/message-sample-image.png" alt="message-sample-image" title="message-sample-image" width="100%"/>

## 配信セグメント
メッセージを送りたい配信対象者のセグメントを設定することができます。デフォルトでは【全ユーザー】が選択されています。セグメントのパターンは任意で4種まで追加する ことができます。追加するには【パターンを追加】をクリックしてください。

<img src="/img/message/message-create-segment.png" alt="message-create-segment" title="message-create-segment" width="100%"/>

デフォルトで以下のセグメントが登録されています。プルダウン最下部の【セグメント追 加】で、選択肢以外のセグメントを自由に作成することができます。

* 1日間連続でログインしているユーザー

メッセージが配信される当日にログインしたユーザーを指します。

* 2日間連続でログインしているユーザー

メッセージが配信される当日が、連続ログイン2日目にあたるユーザーを指します。

* 3日間連続でログインしているユーザー

メッセージが配信される当日が、連続ログイン3日目にあたるユーザーを指します。* 4日間連続でログインしているユーザー

メッセージが配信される当日が、連続ログイン4日目にあたるユーザーを指します。* 5日間連続でログインしているユーザー

メッセージが配信される当日が、連続ログイン5日目にあたるユーザーを指します。* 6日間連続でログインしているユーザー

メッセージが配信される当日が、連続ログイン6日目にあたるユーザーを指します。* 7日間連続でログインしているユーザー

メッセージが配信される当日が、連続ログイン7日目にあたるユーザーを指します。* 休眠ユーザー

メッセージが配信される当日が、連続非ログイン3日目以上にあたるユーザーを指します。

* 登録経過日数※
アプリに新規登録をしてからの日数でユーザーを切り分けることができます。※設定は姉妹サービスの Growth Analytics から可能です。

* 本日インストールしたユーザーメッセージが配信される当日に、アプリをインストールしたユーザーを指します。

* 1日前にインストールしたユーザーメッセージが配信される前日に、アプリをインストールしたユーザーを指します。

* 2日前にインストールしたユーザー
メッセージが配信される2日前に、アプリをインストールしたユーザーを指します。

* 3日前にインストールしたユーザーメッセージが配信される3日前に、アプリをインストールしたユーザーを指します。

* 4日前にインストールしたユーザーメッセージが配信される4日前に、アプリをインストールしたユーザーを指します。

* 5日前にインストールしたユーザー
メッセージが配信される5日前に、アプリをインストールしたユーザーを指します。

* 6日前にインストールしたユーザーメッセージが配信される6日前に、アプリをインストールしたユーザーを指します。

* 7日前にインストールしたユーザーメッセージが配信される7日前に、アプリをインストールしたユーザーを指します。

* レベル※

ユーザーをアプリ内のレベルで切り分けることができます。 ※設定は姉妹サービスの Growth Analytics から可能です。* 課金※ユーザーを課金状況で切り分けることができます。 ※設定は姉妹サービスの Growth Analytics から可能です。

## 配信イベント

メッセージを出すタイミングを指定することができる項目です。ユーザーの行動(イベント)に沿って、出すタイミングを調節できます。以下のように入力した場合、ユーザーがアプリ起動を5回すると、そのうち1回はメッセージが表示されるようになります。※(5回目に起動をした時に表示される仕様ではありません。) タイミングのパターンは任意で4つまで追加していくことが可能です。追加するには【+パターンを追加】ボタンをクリックしてください。

<img src="/img/message/message-event-timing.png" alt="message-event-timing" title="message-event-timing" width="100%"/>

## 有効期間 / 配信回数上限
* 有効期間

有効期間の設定で、メッセージが表示される期間を指定することができます。期間中であっても配信を一時停止することは可能です。停止の仕方については、次項の【配信設定】をご参照ください。

* 配信回数上限

配信回数上限は、指定下期間内に1人のユーザーに対して何度まで設定したポップアップ を表示させるかを指定することができます。例えば4パターンの配信を設定した時に配信 回数上限を1に設定すると、1人のユーザーが受け取る配信は特定の1パターンのメッセージを1回受け取ることになります。

<img src="/img/message/message-limit.png" alt="message-limit" title="message-limit" width="100%"/>

## 配信設定
* 配信 / 停止

作成したメッセージの配信を、設定した通りに配信するか、それとも有効期間中であっても一時的に無効化して停止にするのかを設定することができるスイッチがあります。 スイッチは随時、メインメニューの【メッセージ一覧】から切り替えることが可能です。

* テストユーザーにのみ配信

【テストユーザーにのみ配信】というチェックボックスをクリックすると、テストユーザーにのみ設定したメッセージを配信することができます。

<img src="/img/message/message-test.png" alt="message-test" title="message-test" width="100%"/>

## 配信パターン / 保存

設定したメッセージは、どれだけのパターンが作られて配信されることになっているのかを確認することができます。 全てのパターンはほぼ同数に送られるよう、自動で振り分けがされています。

【保存】ボタンをクリックすると、設定したメッセージを保存することができます。保存したメッセージはメインメニューにある、【メッセージ一覧】で確認することができます。

<img src="/img/message/message-pattern.png" alt="message-pattern" title="message-pattern" width="100%"/>

# 配信一覧

## 一覧項目作成したメッセージは、メッセージ一覧にストックされていきます。一覧では以下の7項目が確認できます。

* 各メッセージに付与されるメッセージ ID(メッセージ ID) ・配信名* フォーマット* 配信設定(配信中か、停止中か。 テストユーザー向けか否か。) ・配信開始日時* 配信終了日時* 配信イベント(配信されるタイミング)* 配信セグメント(配信を受け取る対象ユーザー)

<img src="/img/message/message-list.png" alt="message-list" title="message-list" width="100%"/>

## 分析 / 編集一覧の最右にある分析ボタンを押すと、配信したメッセージを目にしたユーザー数を調べることができます。

<img src="/img/message/message-analytics.png" alt="message-analytics.png" title="message-analytics.png" width="100%"/>

ユーザーがメッセージを✖ボタンで消した場合、それはアクションとしてはカウントされません。 また、右上のプルダウンを利用して、メッセージを見たあとのユーザーのアクションを絞ることで、グラフや一覧表に反映させる数値を絞り込むことができます。

<img src="/img/message/message-analytics-detail.png" alt="message-analytics-detail" title="message-analytics-detail" width="100%"/>

編集ボタンを押すと、選択したメッセージの作成ページへ遷移します。ここで作成した内容を修正することが可能ですが、パターンの追加を行うことはできません。テキスト及び画像のみが編集の対象となります。

<img src="/img/message/message-edit.png" alt="message-edit" title="message-edit" width="100%"/>

# アクション一覧
## 一覧項目
作成した、メッセージのボタンを押した後のユーザーアクションを一覧でみることができ ます。確認できる項目は以下の4つです。* 各アクションに付与される ID(ID)

* 各アクション作成時につけた名前(アクション名)

* 各アクション作成時に入力した説明(説明)

* 各アクション作成日時(作成日時)

<img src="/img/message/message-action-list.png" alt="message-action-list" title="message-action-list" width="100%"/>

## 編集
作成したアクションを編集することができます。

<img src="/img/message/message-action-edit.png" alt="message-action-edit" title="message-action-edit" width="100%"/>

## アクションの追加新しいアクションを追加することができます。ここで作成したアクションは、ユーザーがメッセージ上のボタンをクリックした後に起こるアクションとして利用します。

<img src="/img/message/message-add-action.png" alt="message-add-action" title="message-add-action" width="100%"/>

# テストユーザー一覧
## 一覧項目作成した、テストデバイスとして登録したテストユーザーを一覧でみることができます。 確認できる項目は以下の4つです。* デバイス名(判別するために自由に入力することができます。)

* ユーザー名(アプリのユーザーID を入力します。)

* 更新日(更新た期日が記載されています。)

* 作成日(作成された日時が記載されています。)

<img src="/img/message/message-test-user-list.png" alt="message-test-user-list" title="message-test-user-list" width="100%"/>

## テストユーザー追加
【テストユーザー追加】をクリックし、必要な項目を入力して登録すると、テストユーザーを追加することができます。クリックすると、次のようなポップアップが表示されます。

<img src="/img/message/message-add-test-user.png" alt="message-add-test-user" title="message-add-test-user" width="100%"/>

デバイス名は、テストデバイスを判別するための説明を自由に入力することができます。

また、ユーザー名にはアプリのユーザーID を入力する必要があります。

テストユーザーは、タグID: Tag:${ApplicationId}:Default:UserId、タグ名: ユーザーID の登録ユーザーを判別して、配信されます。Growthbeat SDK から、setUserId の値を入力したものが、テストユーザーのユーザー名となります。
SDKの導入方法については、SDK ドキュメントをご参照ください。設定値は、メインメニューの【基本設定】にある、【タグ設定】を開いていただきまして、該当タグの詳細からご確認いただけます。

<!--more-->
