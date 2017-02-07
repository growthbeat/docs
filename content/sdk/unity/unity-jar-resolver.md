---
categories: 'sdk'
date: 2017-02-07T00:00:00+09:00
description: 'unity-jar-resolverを使用した依存ライブラリの解決方法について説明します'
draft: false
title: Growthbeat Unity SDK | unity-jar-resolverを使用した依存ライブラリの解決方法
---

Version 2.0.4

# unity-jar-resolverを使用した依存ライブラリの解決方法

## unity-jar-resolverのインポート

[unity-jar-resolver](https://github.com/googlesamples/unity-jar-resolver)からリポジトリを取得して、  
`play-services-resolver-x.x.x.x.unitypackage`（x.x.x.xはバージョン番号）をインポートします。

メニューから`Assets -> Import Package -> Custom Package...`を選択し、  
UnityPackgeをインポートしてください。

※下記ライブラリを使用している場合は、ライブラリにunity-jar-resolverが内包されているため、  
本手順はスキップしてください。

- play-games-plugin-for-unity
- googleads-mobile-unity

## AssetPostprocessorの作成

必要な依存ライブラリの設定を定義していきます。  
`Assets/PlayServicesResolver/Editor`に任意の名前でC# Scriptを作成し、  
サンプルのように実装してください。

使用するバージョンは各プロジェクトで使用するバージョンを指定してください。  
但し、組み合わせによっては実行時エラーが出る可能性があります。  
詳しくは下記をご覧ください。  
[Androidビルドに必要なライブラリ](http://faq.growthbeat.com/article/201-android)

### 依存ライブラリの設定のサンプル
```csharp
using System;
using System.Collections.Generic;
using UnityEditor;

[InitializeOnLoad]
public class GrowthbeatSampleDependencies : AssetPostprocessor {

	#if UNITY_ANDROID
	public static object svcSupport;
	#endif

	static GrowthbeatSampleDependencies() {
		RegisterDependencies();
	}

	public static void RegisterDependencies() {
		#if UNITY_ANDROID
		RegisterAndroidDependencies();
		#elif UNITY_IOS
		RegisterIOSDependencies();
		#endif
	}
		
	public static void RegisterAndroidDependencies() {
		#if UNITY_ANDROID
		Type playServicesSupport = Google.VersionHandler.FindClass(
			"Google.JarResolver", "Google.JarResolver.PlayServicesSupport");
		if (playServicesSupport == null) {
			return;
		}
		
		svcSupport = svcSupport ?? Google.VersionHandler.InvokeStaticMethod(
			playServicesSupport, "CreateInstance",
			new object[] {
				"GrowthbeatSampleDependencies",
				EditorPrefs.GetString("AndroidSdkRoot"),
				"ProjectSettings"
			});

		// play-services-gcmの依存解決
		// object[]の3番目は使用したいバージョンを指定してください
		Google.VersionHandler.InvokeInstanceMethod(
			svcSupport, "DependOn",
			new object[] {
				"com.google.android.gms",
				"play-services-gcm",
				"8.3.+" },
			namedArgs: new Dictionary<string, object>() {
				{"packageIds", new string[] { "extra-google-m2repository" } }
			});

		// play-services-adsの依存解決
		// object[]の3番目は使用したいバージョンを指定してください
		Google.VersionHandler.InvokeInstanceMethod(
			svcSupport, "DependOn",
			new object[] {
				"com.google.android.gms",
				"play-services-ads",
				"8.3.+" },
			namedArgs: new Dictionary<string, object>() {
				{"packageIds", new string[] { "extra-google-m2repository" } }
			});

		// supportライブラリの依存解決
		// object[]の3番目は使用したいバージョンを指定してください
		Google.VersionHandler.InvokeInstanceMethod(
			svcSupport, "DependOn",
			new object[] { "com.android.support", "support-v4", "23.0.+" },
			namedArgs: new Dictionary<string, object>() {
				{"packageIds", new string[] { "extra-android-m2repository" } }
			});
		#endif
	}

	public static void RegisterIOSDependencies() {
		#if UNITY_IOS
		Type iosResolver = Google.VersionHandler.FindClass(
			"Google.IOSResolver", "Google.IOSResolver");
		if (iosResolver == null) {
			return;
		}

		// 今回はiOSの依存解決は使用しない

		#endif
	}
		
	// Handle delayed loading of the dependency resolvers.
	private static void OnPostprocessAllAssets(
		string[] importedAssets, string[] deletedAssets,
		string[] movedAssets, string[] movedFromPath) {
		foreach (string asset in importedAssets) {
			if (asset.Contains("IOSResolver") ||
				asset.Contains("JarResolver")) {
				RegisterDependencies();
				break;
			}
		}
	}

}

```

## 依存ライブラリの解決
unity-jar-resolverをimportすると、  
メニューの`Assets`に`Play Services Resolver`という項目が追加されているので、  
`Assets  -> Play Services Resolver -> Android Resolver -> Resolver Client Jar`を選択します。

成功すると、`Assets/Plugins/Android/`配下にC# Scriptで定義した依存ライブラリのaarと、  
必要なライブラリが展開されます。