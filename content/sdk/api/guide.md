---
categories: 'sdk'
date: 2015-05-19T23:50:00+09:00
description: 'Growthbeat API ついて説明します'
draft: false
title: Growthbeat API Gudeliene
---

# 概要

Growthbeat ではサーバー API を用意しております。Growthbeat プラットフォームに蓄積されたデータを管理画面外からも取得することが可能となっております。

## APIを使用する前に

API を利用するには Growthbeat への会員登録が必要となります。

各種 API は以下のようにサービスごとに分かれています：

1. Growthbeat のデータを取得 *https://api.growthbeat.com/~*
1. Growth Analytics のデータを取得 *https://api.analytics.growthbeat.com/~*
1. Growth Message のデータを取得 *https://api.message.growthbeat.com/~*
1. Growth Push のデータ取得 *https://api.growthpush.com/~*

API を使用するにはアカウントに紐付いている API キーの使用が必須となります。API を使用する際には API キーをお控えください。

APIはには以下の条件があります；

1. リクエストヘッダーは `application/x-www-form-urlencoded` で送信してください
1. レスポンスは、基本JSON形式となります。 `Accept: application/json` を指定してください

また API を使用すると API ごとにリクエスト数が加算されます。ご契約のリクエスト数、現在のリクエスト数に応じて使用する API を考慮してください。月のAPIの上限を超えますと APIに てデータが取得できなくなりますのでご了承ください。
