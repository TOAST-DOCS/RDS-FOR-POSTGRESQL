## RDS for PostgreSQL API ガイド

**Database > RDS for PostgreSQL > API v1.0 ガイド**

## RDS for PostgreSQL API 共通情報

### APIエンドポイント

| リージョン | エンドポイント |
|------|----------|
| 韓国(パンギョ)リージョン | https://kr1-rds-postgres.api.nhncloudservice.com |
| 韓国(ピョンチョン)リージョン | https://kr2-rds-postgres.api.nhncloudservice.com |


### 認証および権限

RDS for PostgreSQLは、API呼び出し時の認証/認可のためにUser Access Keyトークンを使用します。User Access Keyトークンは、User Access Keyに基づいて発行されるBearerタイプの一時的なアクセストークンです。User Access Keyトークンの発行及び使用に関する詳細は、[User Access Keyトークン](/nhncloud/ja/public-api/user-access-key-token)を参照してください。
発行されたトークンはAppkeyと共にリクエストHeaderに含める必要があります。

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| X-TC-APP-KEY | Header | String | Y | RDS for PostgreSQLサービスのAppkeyまたはプロジェクト統合Appkey |
| X-NHN-AUTHORIZATION | Header | String | Y | Public APIで発行されたBearerタイプトークン |

また、プロジェクト権限によって呼び出せるAPIが制限されます。`RDS for PostgreSQL ADMIN`、`RDS for PostgreSQL VIEWER`のロールには、次のような基本権限が付与されており、プロジェクト内のロールグループ管理メニューで必要な権限のみを付与できます。

* `RDS for PostgreSQL ADMIN`のロールには、API実行に必要なすべての権限が付与されます。
* `RDS for PostgreSQL VIEWER`のロールには、情報を照会する権限のみ付与されます。
* DBインスタンスを作成、修正、削除およびDBインスタンスを対象とするいかなる機能も使用できません。
* ただし、通知グループとユーザーグループに関連する機能は使用できます。

APIリクエスト時、認証に失敗または権限がない場合、次のようなエラーが発生します。

| resultCode | resultMessage | 説明 |
|------------|---------------|-----|
| 80401 | Unauthorized | 認証に失敗しました。 |
| 80403 | Forbidden | 権限がありません。 |

### レスポンス共通情報

すべてのAPIリクエストに`200 OK`でレスポンスします。詳しいレスポンス結果はレスポンス本文のヘッダを参照してください。

<details>
  <summary><strong>成功レスポンス</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
}
}
```

</details>

<details>
  <summary><strong>失敗レスポンス</strong></summary>

```json
{
"header": {
        "resultCode": -1,
        "resultMessage": "FAIL",
        "isSuccessful": false
}
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| resultCode | Number | 結果コード(成功:0、その他:失敗) |
| resultMessage | String | 結果メッセージ |
| isSuccessful | Boolean | 成否 |
## DBバージョン

### DBバージョンリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbVersion.List | DBバージョンリストを表示 |

#### リクエスト

```http
GET /v1.0/db-versions
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbVersions": [
{
            "dbVersionCode": "dbVersionCode-example",
            "dbMajorVersionCode": "dbMajorVersionCode-example",
"name": "PostgreSQL V14.6",
"canCreate": false
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbVersions | Array | DBバージョン情報 |
| dbVersions.dbVersionCode | String | DBバージョンコード |
| dbVersions.dbMajorVersionCode | String | DBメジャーバージョンコード |
| dbVersions.name | String | DBバージョン名 |
| dbVersions.canCreate | Boolean | 新規作成可能かどうか |

---

## DBインスタンス仕様

### DBインスタンス仕様リストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbFlavor.List | DBインスタンス仕様リストを表示 |

#### リクエスト

```http
GET /v1.0/db-flavors
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbFlavors": [
{
"dbFlavorId": "289e34e9-cd8a-4baf-82e3-a3d013c5186b",
"dbFlavorName": "r2.c2m4",
"ram": 4096,
"vcpus": 2
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbFlavors | Array | DBインスタンス仕様情報 |
| dbFlavors.dbFlavorId | UUID | DBインスタンス仕様の識別子 |
| dbFlavors.dbFlavorName | String | DBインスタンス仕様名 |
| dbFlavors.ram | Number | メモリ容量(MB) |
| dbFlavors.vcpus | Number | CPUコア数 |

---

## プロジェクト情報

### プロジェクトメンバーリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Project.Get | プロジェクトメンバーリストを表示 |

#### リクエスト

```http
GET /v1.0/project/members
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"projectMembers": [
{
"memberId": "550e8400-e29b-41d4-a716-446655440000",
"memberName": "memberName-example",
"emailAddress": "user@example.com",
"phoneNumber": "010-1234-5678"
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| projectMembers | Array | プロジェクトメンバー情報 |
| projectMembers.memberId | UUID | プロジェクトメンバーの識別子 |
| projectMembers.memberName | String | プロジェクトメンバーの名前 |
| projectMembers.emailAddress | String | プロジェクトメンバーのメールアドレス |
| projectMembers.phoneNumber | String | プロジェクトメンバーの電話番号 |

---

### リージョンリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Project.Get | リージョンリストを表示 |

#### リクエスト

```http
GET /v1.0/project/regions
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"regions": [
{
"regionCode": "KR1",
"isEnabled": false
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| regions | Array | リージョン情報 |
| regions.regionCode | Enum | リージョンコード<br/>- KR1: `韓国(パンギョ)`<br/>- KR2: `韓国(ピョンチョン)` |
| regions.isEnabled | Boolean | リージョンが有効かどうか |

---

## ネットワーク

### サブネットリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Network.List | サブネットリストを表示 |

#### リクエスト

```http
GET /v1.0/network/subnets
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"subnets": [
{
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"subnetName": "subnetName-example",
"subnetCidr": "192.168.0.0/24",
"usingGateway": false,
"availableIpCount": 1
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| subnets | Array | サブネットオブジェクト |
| subnets.subnetId | UUID | サブネットの識別子 |
| subnets.subnetName | String | サブネットを識別できる名前 |
| subnets.subnetCidr | String | サブネットのCIDR |
| subnets.usingGateway | Boolean | ゲートウェイ使用有無 |
| subnets.availableIpCount | Number | 使用可能なIP数 |

---

## ストレージ

### ストレージタイプリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Storage.List | ストレージタイプリストを表示 |

#### リクエスト

```http
GET /v1.0/storage-types
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"storageTypes": [
"General SSD",
"General HDD"
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| storageTypes | Array | ストレージタイプリスト |

---

## 作業情報

### 作業状態

| 状態名 | 説明 |
|--------------------|----------------------|
| `PREPARING` | 作業が準備中の場合 |
| `READY` | 作業が準備完了した場合 |
| `RUNNING` | 作業が進行中の場合 |
| `COMPLETED` | 作業が完了した場合 |
| `REGISTERED` | 作業が登録された場合 |
| `WAIT_TO_REGISTER` | 作業が登録待機中の場合 |
| `INTERRUPTED` | 作業進行中に割り込みが発生した場合 |
| `CANCELED` | 作業がキャンセルされた場合 |
| `FAILED` | 作業が失敗した場合 |
| `ERROR` | 作業進行中にエラーが発生した場合 |
| `DELETED` | 作業が削除された場合 |
| `FAIL_TO_READY` | 作業準備に失敗した場合 |

### 作業情報の詳細を表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Job.Get | 作業情報の詳細を表示 |

#### リクエスト

```http
GET /v1.0/jobs/{jobId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| jobId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000",
"jobStatus": "DELETED",
"resourceRelations": [
{
"resourceType": "resourceType-example",
"resourceId": "resourceId-example"
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |
| jobStatus | Enum | 作業の現在状態<br/>- DELETED<br/>- CANNOT_PROGRESS<br/>- FAILED<br/>- ERROR<br/>- CANCELED<br/>- INTERRUPTED<br/>- COMPLETED<br/>- COMPLETED_WITH_ERROR<br/>- RUNNING<br/>- PREPARING<br/>- READY<br/>- CREATED<br/>- FAIL_TO_READY<br/>- REGISTERED<br/>- FAIL_TO_REGISTER<br/>- WAIT_TO_REGISTER |
| resourceRelations | Array | 関連リソースリスト |
| resourceRelations.resourceType | String | 関連リソースタイプ |
| resourceRelations.resourceId | String | 関連リソースの識別子 |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

## DBインスタンスグループ

### DBインスタンスグループリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroup.List | DBインスタンスグループリストを表示 |

#### リクエスト

```http
GET /v1.0/db-instance-groups
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbInstanceGroups": [
{
"dbInstanceGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceGroupStatus": "CREATED",
"replicationType": "STANDALONE",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbInstanceGroups | Array | DBインスタンスグループ情報 |
| dbInstanceGroups.dbInstanceGroupId | UUID | DBインスタンスグループの識別子 |
| dbInstanceGroups.dbInstanceGroupStatus | Enum | DBインスタンスグループの現在状態<br/>- CREATED: `作成済み`<br/>- DELETED: `削除済み` |
| dbInstanceGroups.replicationType | Enum | DBインスタンスグループのレプリケーションタイプ<br/>- STANDALONE: `高可用性を使用しない`<br/>- HIGH_AVAILABILITY: `高可用性を使用する` |
| dbInstanceGroups.createdYmdt | DateTime | 作成日時 |
| dbInstanceGroups.updatedYmdt | DateTime | 修正日時 |

---

### DBインスタンスグループ詳細を表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroup.Get | DBインスタンスグループ詳細を表示 |

#### リクエスト

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbInstanceGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceGroupStatus": "CREATED",
"replicationType": "STANDALONE",
"dbInstances": [
{
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceType": "MASTER",
"dbInstanceStatus": "BEFORE_CREATE"
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbInstanceGroupId | UUID | DBインスタンスグループの識別子 |
| dbInstanceGroupStatus | Enum | DBインスタンスグループの現在状態<br/>- CREATED: `作成済み`<br/>- DELETED: `削除済み` |
| replicationType | Enum | DBインスタンスグループのレプリケーションタイプ<br/>- STANDALONE: `高可用性を使用しない`<br/>- HIGH_AVAILABILITY: `高可用性を使用する` |
| dbInstances | Array | DBインスタンスグループに属するDBインスタンスリスト |
| dbInstances.dbInstanceId | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceType | Enum | DBインスタンスのロールタイプ<br/>- MASTER: `マスター`<br/>- FAILED_MASTER: `障害マスター`<br/>- CANDIDATE_MASTER: `予備マスター`<br/>- READ_ONLY_SLAVE: `リードレプリカ` |
| dbInstances.dbInstanceStatus | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成以前(グレー)`<br/>- AVAILABLE: `使用可能(緑)`<br/>- STORAGE_FULL: `容量不足(赤)`<br/>- FAIL_TO_CREATE: `作成失敗(赤)`<br/>- FAIL_TO_CONNECT: `接続失敗(赤)`<br/>- REPLICATION_STOP: `複製中断(赤)`<br/>- REPLICATION_DELAY: `複製遅延(黄色)`<br/>- FAILOVER: `フェイルオーバー完了(赤)`<br/>- SHUTDOWN: `停止済み(グレー)`<br/>- DELETED: `削除済み(グレー)` |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

### 拡張機能リスト照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.List | 拡張機能リスト照会 |

#### リクエスト

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DBインスタンスグループID |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"extensions": [
{
"extensionId": "550e8400-e29b-41d4-a716-446655440000",
"extensionName": "extensionName-example",
"extensionStatus": "AVAILABLE",
"databases": [
{
"dbInstanceGroupExtensionId": "550e8400-e29b-41d4-a716-446655440000",
"databaseId": "550e8400-e29b-41d4-a716-446655440000",
"databaseName": "databaseName-example",
"dbInstanceGroupExtensionStatus": "CREATED",
"reservedAction": "NONE",
"errorReason": "errorReason-example"
}
]
}
],
"isNeedToApply": false
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| extensions | Array | 拡張機能情報 |
| extensions.extensionId | UUID | 拡張機能の識別子 |
| extensions.extensionName | String | 拡張機能名 |
| extensions.extensionStatus | Enum | 拡張機能の状態<br/>- AVAILABLE: `使用可能`<br/>- NEED_TO_APPLY: `適用必要`<br/>- APPLYING: `適用中` |
| extensions.databases | Array | データベース情報 |
| extensions.databases.dbInstanceGroupExtensionId | UUID | DBインスタンスグループ内の拡張機能の識別子 |
| extensions.databases.databaseId | UUID | データベースID |
| extensions.databases.databaseName | String | データベース名 |
| extensions.databases.dbInstanceGroupExtensionStatus | Enum | データベースへの拡張機能インストール状態<br/>- CREATED: `作成済み`<br/>- INSTALLED: `インストール済み`<br/>- INSTALLING: `インストール中`<br/>- INSTALL_ERROR: `インストールエラー`<br/>- DELETED: `削除済み`<br/>- DELETING: `削除中`<br/>- DELETE_ERROR: `削除エラー` |
| extensions.databases.reservedAction | Enum | 予約タスク<br/>- NONE: `なし`<br/>- INSTALL: `インストール予約(適用必要)`<br/>- INSTALL_WITH_CASCADE: `強制インストール予約(適用必要)`<br/>- DELETE: `削除予約(適用必要)`<br/>- DELETE_WITH_CASCADE: `強制削除予約(適用必要)` |
| extensions.databases.errorReason | String | エラー原因 |
| isNeedToApply | Boolean | 変更事項の適用が必要かどうか |

---

### 拡張機能変更事項適用

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Apply | 拡張機能変更事項適用 |

#### リクエスト

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/apply
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DBインスタンスグループID |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### 拡張機能の同期

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Sync | 拡張機能の同期 |

#### リクエスト

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/sync
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DBインスタンスグループID |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### 拡張機能の削除(キャンセル)

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Delete | 拡張機能の削除(キャンセル) |

#### リクエスト

```http
DELETE /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{dbInstanceGroupExtensionId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DBインスタンスグループID |
| dbInstanceGroupExtensionId | URL | UUID | Y | DBインスタンスグループ内の拡張機能の識別子 |
| withCascade | Query | Boolean | Y | 強制削除するかどうか |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 拡張機能のインストール

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Install | 拡張機能のインストール |

#### リクエスト

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{extensionId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DBインスタンスグループID |
| extensionId | URL | UUID | Y | 拡張機能の識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"databaseId": "550e8400-e29b-41d4-a716-446655440000",
"schemaName": "schemaName-example",
"withCascade": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| databaseId | UUID | Y | データベースID |
| schemaName | String | Y | スキーマ名 |
| withCascade | Boolean | N | 関連情報を自動的にインストールするかどうか<br/>- デフォルト値: `false` |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

## DBインスタンス

### DBインスタンスの状態

| 状態 | 説明 |
|---------------------|------------------------------|
| `AVAILABLE` | DBインスタンスが使用可能な場合 |
| `BEFORE_CREATE` | DBインスタンス作成前の場合 |
| `STORAGE_FULL` | DBインスタンスの容量が不足している場合 |
| `FAIL_TO_CREATE` | DBインスタンス作成に失敗した場合 |
| `FAIL_TO_CONNECT` | DBインスタンス接続に失敗した場合 |
| `REPLICATION_STOP` | DBインスタンスの複製が中断された場合 |
| `FAILOVER` | 高可用性DBインスタンスのフェイルオーバーが完了した場合 |
| `SHUTDOWN` | DBインスタンスが中止された場合 |
| `DELETED` | DBインスタンスが削除された場合 |

### DBインスタンスの進行状態

| 状態 | 説明 |
|----------------------------|--------------|
| `APPLYING_PARAMETER_GROUP` | パラメータグループ適用中 |
| `BACKING_UP` | バックアップ中 |
| `CANCELING` | キャンセル中 |
| `CREATING` | 作成中 |
| `CREATING_SCHEMA` | スキーマ作成中 |
| `CREATING_USER` | ユーザー作成中 |
| `DELETING` | 削除中 |
| `DELETING_SCHEMA` | スキーマ削除中 |
| `DELETING_USER` | ユーザー削除中 |
| `EXPORTING_BACKUP` | バックアップをエクスポート中 |
| `FAILING_OVER` | フェイルオーバー中 |
| `MIGRATING` | マイグレーション中 |
| `MODIFYING` | 修正中 |
| `PREPARING` | 準備中 |
| `PROMOTING` | 昇格中 |
| `REBUILDING` | 再構築中 |
| `REPAIRING` | 復旧中 |
| `REPLICATING` | 複製中 |
| `RESTARTING` | 再起動中 |
| `RESTARTING_FORCIBLY` | 強制再起動中 |
| `RESTORING` | 復元中 |
| `STARTING` | 起動中 |
| `STOPPING` | 停止中 |
| `SYNCING_SCHEMA` | スキーマ同期中 |
| `SYNCING_USER` | ユーザー同期中 |
| `UPDATING_USER` | ユーザー修正中 |

### DBインスタンスリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.List | DBインスタンスリストを表示 |

#### リクエスト

```http
GET /v1.0/db-instances
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbInstances": [
{
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceName": "dbInstanceName-example",
"description": "description-example",
"dbVersion": "POSTGRESQL_V14_17",
"dbPort": 1,
"dbInstanceType": "MASTER",
"dbInstanceStatus": "BEFORE_CREATE",
"progressStatus": "progressStatus-example",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbInstances | Array | DBインスタンスリスト |
| dbInstances.dbInstanceId | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceGroupId | UUID | DBインスタンスグループの識別子 |
| dbInstances.dbInstanceName | String | DBインスタンスを識別できる名前 |
| dbInstances.description | String | DBインスタンスの追加情報 |
| dbInstances.dbVersion | String | DBエンジンタイプ |
| dbInstances.dbPort | Number | DBポート |
| dbInstances.dbInstanceType | Enum | DBインスタンスのロールタイプ<br/>- MASTER: `マスター`<br/>- FAILED_MASTER: `障害マスター`<br/>- CANDIDATE_MASTER: `予備マスター`<br/>- READ_ONLY_SLAVE: `リードレプリカ` |
| dbInstances.dbInstanceStatus | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成以前(グレー)`<br/>- AVAILABLE: `使用可能(緑)`<br/>- STORAGE_FULL: `容量不足(赤)`<br/>- FAIL_TO_CREATE: `作成失敗(赤)`<br/>- FAIL_TO_CONNECT: `接続失敗(赤)`<br/>- REPLICATION_STOP: `複製中断(赤)`<br/>- REPLICATION_DELAY: `複製遅延(黄色)`<br/>- FAILOVER: `フェイルオーバー完了(赤)`<br/>- SHUTDOWN: `停止済み(グレー)`<br/>- DELETED: `削除済み(グレー)` |
| dbInstances.progressStatus | String | DBインスタンスの現在の作業進行状態 |
| dbInstances.createdYmdt | DateTime | 作成日時 |
| dbInstances.updatedYmdt | DateTime | 修正日時 |

---

### DBインスタンスを作成する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Create | DBインスタンスを作成する |

#### リクエスト

```http
POST /v1.0/db-instances
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName-example",
"dbInstanceCandidateName": "dbInstanceCandidateName-example",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbVersion": "POSTGRESQL_V14_17",
"dbPort": 1,
"databaseName": "databaseName-example",
"dbUserName": "dbUserName-example",
"dbPassword": "dbPassword-example",
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useHighAvailability": false,
"useDefaultNotification": false,
"useDeletionProtection": false,
"pingInterval": 1,
"failoverReplWaitingTime": 1,
"network": {
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"usePublicAccess": false,
"availabilityZone": "kr-pub-a"
},
"storage": {
"storageType": "General SSD",
"storageSize": 20
},
"backup": {
"backupPeriod": 0,
"backupRetryCount": 0,
"backupSchedules": [
{
"backupWndBgnTime": "00:00:00",
"backupWndDuration": "HALF_AN_HOUR"
}
]
}
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DBインスタンスを識別できる名前 |
| dbInstanceCandidateName | String | N | DBインスタンスを識別できる予備マスター名 |
| description | String | N | DBインスタンスの追加情報 |
| dbFlavorId | UUID | Y | DBインスタンス仕様の識別子 |
| dbVersion | String | Y | DBエンジンタイプ |
| dbPort | Number | Y | DBポート<br/>- 最小値: 5432、最大値: 45432 |
| databaseName | String | Y | データベース名 |
| dbUserName | String | Y | DBユーザーアカウント名 |
| dbPassword | String | Y | DBユーザーアカウントパスワード |
| parameterGroupId | UUID | Y | パラメータグループの識別子 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useHighAvailability | Boolean | N | 高可用性の使用有無<br/>- デフォルト値: `false` |
| useDefaultNotification | Boolean | N | 基本通知の使用有無<br/>- デフォルト値: `false` |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |
| pingInterval | Number | N | Ping間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| failoverReplWaitingTime | Number | N | フェイルオーバー複製遅延待機時間(秒)<br/>- 最小値: `-1` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.subnetId | UUID | Y | サブネットの識別子 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | N | DBインスタンスを作成するアベイラビリティゾーン |
| storage | Object | Y | ストレージ情報オブジェクト |
| storage.storageType | Enum | Y | ストレージタイプ |
| storage.storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最小値: `20` |
| backup | Object | Y | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | Y | バックアップの保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Number | N | バックアップの再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.backupSchedules | Array | Y | バックアップスケジュール情報 |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### オブジェクトストレージにあるバックアップからDBインスタンスを復元する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.RestoreFromObs | オブジェクトストレージにあるバックアップからDBインスタンスを復元 |

#### リクエスト

```http
POST /v1.0/db-instances/restore-from-obs
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName",
"dbInstanceCandidateName": "dbInstanceCandidateName-example",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbPort": 1,
"dbVersion": "POSTGRESQL_V14_17",
"useHighAvailability": false,
"imageId": "550e8400-e29b-41d4-a716-446655440000",
"pingInterval": 3,
"failoverReplWaitingTime": 60,
"storage": {
"storageType": "General SSD",
"storageSize": 20
},
"network": {
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"usePublicAccess": false,
"availabilityZone": "kr-pub-a"
},
"backup": {
"backupPeriod": 0,
"backupRetryCount": 0,
"replicationRegion": "KR1",
"backupSchedules": [
{
"backupWndBgnTime": "00:00:00",
"backupWndDuration": "HALF_AN_HOUR"
}
]
},
"restore": {
"tenantId": "0123456789abcdef0123456789abcdef",
"username": "username-example",
"password": "password-example",
"targetContainer": "targetContainer-example",
"objectPath": "objectPath-example"
},
"useDefaultNotification": false,
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useDeletionProtection": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | N | DBインスタンスを識別できる名前<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| dbInstanceCandidateName | String | N | DBインスタンスを識別できる予備マスター名 |
| description | String | N | DBインスタンスの追加情報<br/>- 最大長: `100` |
| dbFlavorId | UUID | Y | DBインスタンス仕様の識別子 |
| dbPort | Number | N | DBポート<br/>- 最小値: 5432、最大値: 45432 |
| dbVersion | String | Y | DBエンジンタイプ |
| useHighAvailability | Boolean | N | 高可用性の使用有無<br/>- デフォルト値: `false` |
| imageId | UUID | N | イメージの識別子 |
| pingInterval | Number | N | 高可用性使用時のPing間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| failoverReplWaitingTime | Number | N | フェイルオーバー複製遅延待機時間(秒)<br/>- 最小値: `-1` |
| storage | Object | Y | ストレージ情報オブジェクト |
| storage.storageType | Enum | Y | ストレージタイプ |
| storage.storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最小値: `20` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.subnetId | UUID | Y | サブネットの識別子 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | N | DBインスタンスを作成するアベイラビリティゾーン |
| backup | Object | Y | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | Y | バックアップの保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Number | N | バックアップの再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.replicationRegion | Enum | N | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)`<br/>- KR2: `韓国(ピョンチョン)` |
| backup.backupSchedules | Array | Y | バックアップスケジュールリスト |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |
| restore | Object | Y | 復元情報オブジェクト |
| restore.tenantId | String | Y | バックアップが保存されているオブジェクトストレージのテナントID |
| restore.username | String | Y | NHN CloudアカウントまたはIAMアカウントID |
| restore.password | String | Y | バックアップが保存されているオブジェクトストレージのAPIパスワード |
| restore.targetContainer | String | Y | バックアップが保存されているオブジェクトストレージのコンテナ |
| restore.objectPath | String | Y | コンテナに保存されているバックアップのパス |
| useDefaultNotification | Boolean | N | 基本通知の使用有無<br/>- デフォルト値: `false` |
| parameterGroupId | UUID | Y | パラメータグループの識別子 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスの削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Delete | DBインスタンスの削除 |

#### リクエスト

```http
DELETE /v1.0/db-instances/{dbInstanceId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンス詳細を表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンス詳細を表示 |

#### リクエスト

```http
GET /v1.0/db-instances/{dbInstanceId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceName": "dbInstanceName-example",
"description": "description-example",
"dbVersion": "POSTGRESQL_V14_17",
"dbPort": 1,
"dbInstanceType": "MASTER",
"dbInstanceStatus": "BEFORE_CREATE",
"progressStatus": "progressStatus-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [
"550e8400-e29b-41d4-a716-446655440000"
],
"notificationGroupIds": [
"550e8400-e29b-41d4-a716-446655440000"
],
"useDeletionProtection": false,
"needToApplyParameterGroup": false,
"needMigration": false,
"osVersion": "osVersion-example",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbInstanceId | UUID | DBインスタンスの識別子 |
| dbInstanceGroupId | UUID | DBインスタンスグループの識別子 |
| dbInstanceName | String | DBインスタンスを識別できる名前 |
| description | String | DBインスタンスの追加情報 |
| dbVersion | String | DBエンジンタイプ |
| dbPort | Number | DBポート |
| dbInstanceType | Enum | DBインスタンスのロールタイプ<br/>- MASTER: `マスター`<br/>- FAILED_MASTER: `障害マスター`<br/>- CANDIDATE_MASTER: `予備マスター`<br/>- READ_ONLY_SLAVE: `リードレプリカ` |
| dbInstanceStatus | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成以前(グレー)`<br/>- AVAILABLE: `使用可能(緑)`<br/>- STORAGE_FULL: `容量不足(赤)`<br/>- FAIL_TO_CREATE: `作成失敗(赤)`<br/>- FAIL_TO_CONNECT: `接続失敗(赤)`<br/>- REPLICATION_STOP: `複製中断(赤)`<br/>- REPLICATION_DELAY: `複製遅延(黄色)`<br/>- FAILOVER: `フェイルオーバー完了(赤)`<br/>- SHUTDOWN: `停止済み(グレー)`<br/>- DELETED: `削除済み(グレー)` |
| progressStatus | String | DBインスタンスの現在の作業進行状態 |
| dbFlavorId | UUID | DBインスタンス仕様の識別子 |
| parameterGroupId | UUID | DBインスタンスに適用されたパラメータグループの識別子 |
| dbSecurityGroupIds | Array | DBインスタンスに適用されたDBセキュリティグループの識別子リスト |
| notificationGroupIds | Array | DBインスタンスに適用された通知グループの識別子リスト |
| useDeletionProtection | Boolean | DBインスタンスの削除保護の有無 |
| needToApplyParameterGroup | Boolean | 最新パラメータグループの適用可否 |
| needMigration | Boolean | マイグレーションの要否 |
| osVersion | String | OSバージョン |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

### DBインスタンスを修正する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスを修正する |

#### リクエスト

```http
PUT /v1.0/db-instances/{dbInstanceId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName-example",
"dbInstanceCandidateName": "dbInstanceCandidateName-example",
"description": "description-example",
"dbPort": 1,
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbVersion": "POSTGRESQL_V14_17",
"dbSecurityGroupIds": [],
"executeBackup": false,
"useOnlineFailover": false,
"waitReplicationDelay": false,
"useReadOnly": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | N | DBインスタンスを識別できる名前 |
| dbInstanceCandidateName | String | N | DBインスタンスを識別できる予備マスター名 |
| description | String | N | DBインスタンスの追加情報<br/>- 最大長: `100` |
| dbPort | Number | N | DBポート<br/>- 最小値: 5432、最大値: 45432 |
| dbFlavorId | UUID | N | DBインスタンス仕様の識別子 |
| parameterGroupId | UUID | N | パラメータグループの識別子 |
| dbVersion | String | N | DBエンジンバージョンコード |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| executeBackup | Boolean | N | 現時点バックアップを実行するかどうか<br/>- デフォルト値: `false` |
| useOnlineFailover | Boolean | N | フェイルオーバーを利用した再起動の有無<br/>- デフォルト値: `false` |
| waitReplicationDelay | Boolean | N | 複製遅延の解消を待機するかどうか<br/>- デフォルト値: `false` |
| useReadOnly | Boolean | N | 書き込み負荷のブロック<br/>- デフォルト値: `false` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスの最新パラメータグループを適用する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスの最新パラメータグループを適用する |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/apply-recent-parameter-group
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### 現在のDBインスタンスで選択可能なDBバージョンの照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | 現在のDBインスタンスで選択可能なDBバージョンの照会 |

#### リクエスト

```http
GET /v1.0/db-instances/{dbInstanceId}/available-db-versions
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"availableDbVersions": [
{
            "dbVersionCode": "dbVersionCode-example",
            "dbMajorVersionCode": "dbMajorVersionCode-example",
"name": "PostgreSQL V14.6",
"canCreate": false
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| availableDbVersions | Array | DBバージョン情報 |
| availableDbVersions.dbVersionCode | String | DBバージョンコード |
| availableDbVersions.dbMajorVersionCode | String | DBメジャーバージョンコード |
| availableDbVersions.name | String | DBバージョン名 |
| availableDbVersions.canCreate | Boolean | 新規作成可能かどうか |

---

### DBインスタンスのバックアップ

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Backup | DBインスタンスのバックアップ |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/backup
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"backupName": "backupName-example",
"backupMethodType": "FULL"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| backupName | String | Y | バックアップを識別できる名前 |
| backupMethodType | Enum | N | バックアップ方式<br/>- FULL<br/>- SNAPSHOT |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスバックアップ情報の照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンスバックアップ情報の照会 |

#### リクエスト

```http
GET /v1.0/db-instances/{dbInstanceId}/backup-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"allowAutoBackup": false,
"usePeriodicAutoBackup": false,
"backupPeriod": 1,
"backupRetryCount": 1,
"backupSchedules": [
{
"backupWndBgnTime": "00:00:00",
"backupWndDuration": "HALF_AN_HOUR"
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| allowAutoBackup | Boolean | 自動バックアップを許可するかどうか |
| usePeriodicAutoBackup | Boolean | 予定された自動バックアップを使用するかどうか |
| backupPeriod | Number | バックアップの保管期間(日) |
| backupRetryCount | Number | バックアップの再試行回数 |
| backupSchedules | Array | バックアップスケジュールリスト |
| backupSchedules.backupWndBgnTime | Time | バックアップ開始時刻 |
| backupSchedules.backupWndDuration | Enum | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

---

### DBインスタンスバックアップ情報の修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスバックアップ情報の修正 |

#### リクエスト

```http
PUT /v1.0/db-instances/{dbInstanceId}/backup-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"allowAutoBackup": false,
"usePeriodicAutoBackup": false,
"backupPeriod": 0,
"backupRetryCount": 0,
"backupSchedules": [
{
"backupWndBgnTime": "00:00:00",
"backupWndDuration": "HALF_AN_HOUR"
}
]
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| allowAutoBackup | Boolean | N | 自動バックアップを許可するかどうか |
| usePeriodicAutoBackup | Boolean | N | 予定された自動バックアップを使用するかどうか |
| backupPeriod | Number | N | バックアップの保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backupRetryCount | Number | N | バックアップの再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backupSchedules | Array | N | バックアップスケジュールリスト |
| backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時刻 |
| backupSchedules.backupWndDuration | Enum | Y | バックアップWindows<br/>バックアップ開始時間から設定された期間内に自動バックアップが実行されます。<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスバックアップ後にオブジェクトストレージへエクスポート

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.BackupToObjectStorage | DBインスタンスバックアップ後にオブジェクトストレージへエクスポート |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/backup-to-object-storage
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"tenantId": "0123456789abcdef0123456789abcdef",
"username": "username-example",
"password": "password-example",
"targetContainer": "targetContainer-example",
"objectPath": "objectPath-example"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| tenantId | String | Y | バックアップが保存されるオブジェクトストレージのテナントID<br/>- 最小長: `32`<br/>- 最大長: `32` |
| username | String | Y | NHN CloudアカウントまたはIAMアカウントID |
| password | String | Y | バックアップが保存されるオブジェクトストレージのAPIパスワード |
| targetContainer | String | Y | バックアップが保存されるオブジェクトストレージのコンテナ |
| objectPath | String | Y | コンテナに保存されるバックアップのパス |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### データベースリスト表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.List | データベースリスト表示 |

#### リクエスト

```http
GET /v1.0/db-instances/{dbInstanceId}/databases
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"databases": [
{
"databaseId": "550e8400-e29b-41d4-a716-446655440000",
"databaseName": "databaseName-example",
"databaseStatus": "STABLE",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00",
"schemas": [
{
"schemaName": "schemaName-example"
}
],
"errorReason": "errorReason-example"
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| databases | Array | データベース情報 |
| databases.databaseId | UUID | データベースの識別子 |
| databases.databaseName | String | データベース名 |
| databases.databaseStatus | Enum | データベースの現在状態<br/>- STABLE: `使用可能`<br/>- CREATING: `作成中`<br/>- MODIFYING: `修正中`<br/>- DELETING: `削除中`<br/>- DELETED: `削除済み`<br/>- SYNCING: `同期中`<br/>- DELETE_ERROR: `削除失敗` |
| databases.createdYmdt | DateTime | 作成日時 |
| databases.updatedYmdt | DateTime | 修正日時 |
| databases.schemas | Array | スキーマ情報 |
| databases.schemas.schemaName | String | スキーマ名 |
| databases.errorReason | String | 削除失敗の原因 |

---

### データベース作成

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Create | データベース作成 |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/databases
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"databaseName": "databaseName-example"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| databaseName | String | Y | データベース名 |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### データベース削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Delete | データベース削除 |

#### リクエスト

```http
DELETE /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |
| databaseId | URL | UUID | Y | データベースの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### データベースの修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Modify | データベースの修正 |

#### リクエスト

```http
PUT /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |
| databaseId | URL | UUID | Y | データベースの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"applyHbaRulesImmediately": false,
"databaseName": "databaseName-example"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| applyHbaRulesImmediately | Boolean | N | 関連するアクセス制御ルールを即時適用するかどうか<br/>- デフォルト値: `false` |
| databaseName | String | Y | データベース名 |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### ユーザーリスト表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.List | ユーザーリスト表示 |

#### リクエスト

```http
GET /v1.0/db-instances/{dbInstanceId}/db-users
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbUsers": [
{
"dbUserId": "550e8400-e29b-41d4-a716-446655440000",
"dbUserName": "dbUserName-example",
"authorityType": "CUSTOM",
"dbUserStatus": "STABLE",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbUsers | Array | DBユーザーリスト |
| dbUsers.dbUserId | UUID | DBユーザーの識別子 |
| dbUsers.dbUserName | String | DBユーザーアカウント名 |
| dbUsers.authorityType | Enum | DBユーザー権限タイプ<br/>- CUSTOM: `カスタム権限`<br/>- READ: `READ権限(読み取り専用権限)`<br/>- CRUD: `CRUD権限(読み取り権限を含む)`<br/>- DDL: `DDL権限(CRUD権限を含む)` |
| dbUsers.dbUserStatus | Enum | DBユーザーの現在状態<br/>- STABLE: `使用可能`<br/>- CREATING: `作成中`<br/>- MODIFYING: `修正中`<br/>- DELETING: `削除中`<br/>- DELETED: `削除済み`<br/>- SYNCING: `同期中`<br/>- DELETE_ERROR: `削除失敗` |
| dbUsers.createdYmdt | DateTime | 作成日時 |
| dbUsers.updatedYmdt | DateTime | 修正日時 |

---

### ユーザー作成

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Create | ユーザー作成 |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/db-users
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"dbUserName": "dbUserName-example",
"dbPassword": "dbPassword-example",
"authorityType": "CUSTOM",
"createDefaultHbaRules": false,
"address": "address-example"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbUserName | String | Y | DBユーザーアカウント名 |
| dbPassword | String | Y | DBユーザーアカウントパスワード |
| authorityType | Enum | Y | DBユーザー権限タイプ<br/>- CUSTOM: `カスタム権限`<br/>- READ: `読み取り権限`<br/>- CRUD: `CRUD権限`<br/>- DDL: `DDL権限` |
| createDefaultHbaRules | Boolean | N | 基本アクセス制御ルールの作成可否<br/>- デフォルト値: `false` |
| address | String | N | 接続アドレス |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### ユーザー削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Delete | ユーザー削除 |

#### リクエスト

```http
DELETE /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |
| dbUserId | URL | UUID | Y | ユーザーの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### ユーザー修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Modify | ユーザー修正 |

#### リクエスト

```http
PUT /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |
| dbUserId | URL | UUID | Y | ユーザーの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"dbUserName": "dbUserName-example",
"dbPassword": "dbPassword-example",
"authorityType": "CUSTOM",
"applyHbaRulesImmediately": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbUserName | String | N | DBユーザーアカウント名 |
| dbPassword | String | N | DBユーザーアカウントパスワード |
| authorityType | Enum | N | DBユーザー権限<br/>- CUSTOM: `カスタム権限`<br/>- READ: `読み取り権限`<br/>- CRUD: `CRUD権限`<br/>- DDL: `DDL権限` |
| applyHbaRulesImmediately | Boolean | N | アクセス制御変更事項の即時適用可否<br/>- デフォルト値: `false` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンス削除保護設定の変更

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンス削除保護設定の変更 |

#### リクエスト

```http
PUT /v1.0/db-instances/{dbInstanceId}/deletion-protection
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"useDeletionProtection": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| useDeletionProtection | Boolean | Y | 削除保護の有無 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBインスタンスの強制再起動

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.ForceRestart | DBインスタンスの強制再起動 |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/force-restart
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### アクセス制御ルールリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.List | アクセス制御ルールリストを表示 |

#### リクエスト

```http
GET /v1.0/db-instances/{dbInstanceId}/hba-rules
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"hbaRules": [
{
"hbaRuleId": "550e8400-e29b-41d4-a716-446655440000",
"hbaRuleStatus": "CREATED",
"databaseApplyType": "ENTIRE",
"dbUserApplyTypeCode": "ENTIRE",
"databases": [
{
"databaseId": "550e8400-e29b-41d4-a716-446655440000",
"databaseName": "databaseName-example"
}
],
"dbUsers": [
{
"dbUserId": "550e8400-e29b-41d4-a716-446655440000",
"dbUserName": "dbUserName-example"
}
],
"address": "address-example",
"authMethod": "TRUST",
"reservedAction": "NONE",
"order": 1,
"applicable": false
}
],
"needToApply": false
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| hbaRules | Array | アクセス制御ルールリスト |
| hbaRules.hbaRuleId | UUID | アクセス制御ルールの識別子 |
| hbaRules.hbaRuleStatus | Enum | アクセス制御ルールの現在状態<br/>- CREATED: `作成済み`<br/>- APPLIED: `適用済み`<br/>- CREATING: `作成中`<br/>- MODIFYING: `修正中`<br/>- DELETING: `削除中`<br/>- DELETED: `削除済み` |
| hbaRules.databaseApplyType | Enum | データベース適用タイプ<br/>- ENTIRE: `全体`<br/>- USER_CUSTOM: `ユーザー指定` |
| hbaRules.dbUserApplyTypeCode | Enum | DBユーザー適用タイプ<br/>- ENTIRE: `全体`<br/>- USER_CUSTOM: `ユーザー指定` |
| hbaRules.databases | Array | ユーザー指定のデータベースリスト |
| hbaRules.databases.databaseId | UUID | データベースID |
| hbaRules.databases.databaseName | String | データベース名 |
| hbaRules.dbUsers | Array | ユーザー指定のDBユーザーリスト |
| hbaRules.dbUsers.dbUserId | UUID | DBユーザーID |
| hbaRules.dbUsers.dbUserName | String | DBユーザー名 |
| hbaRules.address | String | 接続アドレス |
| hbaRules.authMethod | Enum | 認証方式<br/>- TRUST: `トラスト(パスワード不要)`<br/>- REJECT: `接続ブロック`<br/>- SCRAM_SHA_256: `パスワード(SCRAM-SHA-256)` |
| hbaRules.reservedAction | Enum | 予約作業<br/>- NONE: `なし`<br/>- CREATE: `作成予約(適用必要)`<br/>- MODIFY: `修正予約(適用必要)`<br/>- DELETE: `削除予約(適用必要)` |
| hbaRules.order | Number | 適用順序 |
| hbaRules.applicable | Boolean | 適用可否 |
| needToApply | Boolean | 変更の適用要否 |

---

### アクセス制御ルールの追加

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Create | DBインスタンス内のアクセス制御ルール追加 |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"connectionTypeCode": "HOST",
"databaseApplyType": "ENTIRE",
"dbUserApplyType": "ENTIRE",
"databaseIds": [],
"dbUserIds": [],
"address": "address-example",
"authMethod": "TRUST"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| connectionTypeCode | Enum | N | アクセス制御レコードタイプ<br/>- HOST: `TCP/IP接続時に有効`<br/>- HOST_NO_SSL: `SSL暗号化を使用しない接続時のみ有効` |
| databaseApplyType | Enum | Y | データベース適用タイプ<br/>- ENTIRE: `全体`<br/>- USER_CUSTOM: `ユーザー指定` |
| dbUserApplyType | Enum | Y | DBユーザー適用タイプ<br/>- ENTIRE: `全体`<br/>- USER_CUSTOM: `ユーザー指定` |
| databaseIds | Array | N | データベースの識別子リスト |
| dbUserIds | Array | N | DBユーザーの識別子リスト |
| address | String | Y | 接続アドレス |
| authMethod | Enum | Y | 認証方式<br/>- TRUST: `トラスト(パスワード不要)`<br/>- REJECT: `接続ブロック`<br/>- SCRAM_SHA_256: `パスワード(SCRAM-SHA-256)` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"hbaRuleId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| hbaRuleId | UUID | アクセス制御ルールの識別子 |

---

### アクセス制御ルールを適用

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスの修正 |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules/apply
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### アクセス制御ルールの順序調整

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Modify | DBインスタンス内のアクセス制御ルール修正 |

#### リクエスト

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/orders
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"hbaRuleIds": []
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| hbaRuleIds | Array | Y | 整列されたアクセス制御ルールIDリスト(リクエストした順序どおりに保存) |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### アクセス制御ルールの削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Delete | DBインスタンス内のアクセス制御ルール削除 |

#### リクエスト

```http
DELETE /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |
| hbaRuleId | URL | UUID | Y | アクセス制御ルールの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### アクセス制御ルールの修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Modify | DBインスタンス内のアクセス制御ルール修正 |

#### リクエスト

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |
| hbaRuleId | URL | UUID | Y | アクセス制御ルールの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"connectionTypeCode": "HOST",
"databaseApplyType": "ENTIRE",
"dbUserApplyType": "ENTIRE",
"databaseIds": [],
"dbUserIds": [],
"address": "address-example",
"authMethod": "TRUST"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| connectionTypeCode | Enum | N | アクセス制御レコードタイプ<br/>- HOST: `TCP/IP接続時に有効`<br/>- HOST_NO_SSL: `SSL暗号化を使用しない接続時のみ有効` |
| databaseApplyType | Enum | Y | データベース適用タイプ<br/>- ENTIRE: `全体`<br/>- USER_CUSTOM: `ユーザー指定` |
| dbUserApplyType | Enum | Y | DBユーザー適用タイプ<br/>- ENTIRE: `全体`<br/>- USER_CUSTOM: `ユーザー指定` |
| databaseIds | Array | N | データベースの識別子リスト |
| dbUserIds | Array | N | DBユーザーの識別子リスト |
| address | String | Y | 接続アドレス |
| authMethod | Enum | Y | 認証方式<br/>- TRUST: `トラスト(パスワード不要)`<br/>- REJECT: `接続ブロック`<br/>- SCRAM_SHA_256: `パスワード(SCRAM-SHA-256)` |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 高可用性情報の照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Get | 高可用性情報照会 |

#### リクエスト

```http
GET /v1.0/db-instances/{dbInstanceId}/high-availability
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"haStatus": "CREATED",
"pingInterval": 1,
"failoverReplWaitingTime": 1
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| haStatus | Enum | 高可用性状態<br/>- CREATED: `作成済み`<br/>- STABLE: `正常`<br/>- PAUSING: `一時停止中`<br/>- DISABLE: `停止`<br/>- DISABLE_MASTER_IN_REPLICATION: `マスター異常複製検知による高可用性停止`<br/>- DISABLE_MHA_PROCESS: `高可用性プロセス停止`<br/>- DISABLE_REPLICATION_STOP: `複製停止による高可用性停止`<br/>- DISABLE_REPLICATION_DELAY: `複製遅延による高可用性停止`<br/>- FAILOVER_STARTED: `フェイルオーバー開始`<br/>- FAILOVER_FAILED: `フェイルオーバー失敗`<br/>- FAILOVER_COMPLETED: `フェイルオーバー完了`<br/>- DELETED: `削除済み`<br/>- PAUSED: `一時停止`<br/>- PAUSED_DUE_TO_TASK: `作業による一時停止`<br/>- MASTER_FAILURE_DETECTION: `マスター障害検知` |
| pingInterval | Number | Ping間隔(秒) |
| failoverReplWaitingTime | Number | フェイルオーバー複製遅延待機時間(秒) |

---

### 高可用性を修正する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Modify | 高可用性を修正する |

#### リクエスト

```http
PUT /v1.0/db-instances/{dbInstanceId}/high-availability
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"useHighAvailability": false,
"pingInterval": 1,
"failoverReplWaitingTime": 1
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| useHighAvailability | Boolean | Y | 高可用性の使用有無 |
| pingInterval | Number | N | Ping間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| failoverReplWaitingTime | Number | N | フェイルオーバー複製遅延待機時間(秒)<br/>- 最小値: `-1` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### 高可用性の一時停止

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Pause | 高可用性の一時停止 |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### 高可用性の復旧

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Repair | 高可用性の復旧 |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### 高可用性の再起動

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Resume | 高可用性の再起動 |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### 高可用性の分離

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Split | 高可用性の分離 |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/split
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスメンテナンス情報照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンスメンテナンス情報照会 |

#### リクエスト

```http
GET /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"allowAutoMaintenance": false,
"useAutoStorageCleanup": false,
"maintWndBgnTime": "00:00:00",
"maintWndDuration": "HALF_AN_HOUR",
"logRetentionPeriod": 1
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| allowAutoMaintenance | Boolean | 自動メンテナンスを許可するかどうか |
| useAutoStorageCleanup | Boolean | 自動ストレージクリーンアップを使用するかどうか |
| maintWndBgnTime | Time | 自動メンテナンス開始時間 |
| maintWndDuration | Enum | メンテナンス期間<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |
| logRetentionPeriod | Number | ログ保管期間(日) |

---

### DBインスタンスメンテナンス情報修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスメンテナンス情報修正 |

#### リクエスト

```http
PUT /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"allowAutoMaintenance": false,
"useAutoStorageCleanup": false,
"maintWndBgnTime": "00:00:00",
"maintWndDuration": "HALF_AN_HOUR",
"logRetentionPeriod": 1
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| allowAutoMaintenance | Boolean | N | 自動メンテナンスを許可するかどうか |
| useAutoStorageCleanup | Boolean | N | 自動ストレージクリーンアップを使用するかどうか |
| maintWndBgnTime | Time | N | 自動メンテナンス開始時間 |
| maintWndDuration | Enum | N | メンテナンス期間<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |
| logRetentionPeriod | Number | N | ログ保管期間(日)<br/>- 最小値: `1`<br/>- 最大値: `30` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスネットワーク情報の照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンスネットワーク情報の照会 |

#### リクエスト

```http
GET /v1.0/db-instances/{dbInstanceId}/network-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"availabilityZone": "kr-pub-a",
"subnet": {
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"subnetName": "subnetName-example",
"subnetCidr": "192.168.0.0/24",
"publicAccessible": false
},
"endPoints": [
{
"domain": "domain-example",
"ipAddress": "192.168.0.1",
"endPointType": "https://example.com"
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| availabilityZone | Enum | DBインスタンスを作成するアベイラビリティゾーン |
| subnet | Object | サブネットオブジェクト |
| subnet.subnetId | UUID | サブネットの識別子 |
| subnet.subnetName | String | サブネットを識別できる名前 |
| subnet.subnetCidr | String | サブネットのCIDR |
| subnet.publicAccessible | Boolean | 外部接続可否 |
| endPoints | Array | 接続情報リスト |
| endPoints.domain | String | ドメイン |
| endPoints.ipAddress | String | IPアドレス |
| endPoints.endPointType | String | 接続情報タイプ |

---

### DBインスタンスネットワーク情報の修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスネットワーク情報の修正 |

#### リクエスト

```http
PUT /v1.0/db-instances/{dbInstanceId}/network-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"usePublicAccess": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| usePublicAccess | Boolean | Y | 外部接続可否 |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスの昇格

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Promote | DBインスタンスの昇格 |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/promote
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### リードレプリカの作成

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Replicate | リードレプリカの作成 |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/replicate
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName-example",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbPort": 1,
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useDefaultNotification": false,
"useDeletionProtection": false,
"network": {
"usePublicAccess": false,
"availabilityZone": "kr-pub-a"
},
"storage": {
"storageType": "General SSD",
"storageSize": 20
}
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DBインスタンスを識別できる名前 |
| description | String | N | DBインスタンスの追加情報 |
| dbFlavorId | UUID | N | DBインスタンス仕様の識別子 |
| dbPort | Number | N | DBポート<br/>- 最小値: 5432、最大値: 45432 |
| parameterGroupId | UUID | N | パラメータグループの識別子 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useDefaultNotification | Boolean | N | 基本通知の使用有無<br/>- デフォルト値: `false` |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |
| network | Object | N | ネットワーク情報オブジェクト |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | N | DBインスタンスを作成するアベイラビリティゾーン |
| storage | Object | N | ストレージ情報オブジェクト |
| storage.storageType | Enum | N | データストレージタイプ |
| storage.storageSize | Number | N | データストレージサイズ(GB)<br/>- 最小値: `20`<br/>- 最大値: `2048` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスの再起動

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Restart | DBインスタンスの再起動 |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/restart
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンス復元情報の照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンス復元情報の照会 |

#### リクエスト

```http
GET /v1.0/db-instances/{dbInstanceId}/restoration-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"oldestRestorableYmdt": "2023-12-31T15:00:00+09:00",
"latestRestorableYmdt": "2023-12-31T15:00:00+09:00",
"restorableBackups": [
{
"backupId": "550e8400-e29b-41d4-a716-446655440000",
"backupName": "backupName-example",
"backupStatus": "BACKING_UP",
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceName": "dbInstanceName-example",
"dbVersion": "POSTGRESQL_V14_17",
"backupType": "AUTO",
"backupSize": 1,
"failoverCount": 1,
"walFileName": "walFileName-example",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00",
"startYmdt": "2023-12-31T15:00:00+09:00",
"completedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| oldestRestorableYmdt | DateTime | 最も古い復元可能時間 |
| latestRestorableYmdt | DateTime | 最も最新の復元可能時間 |
| restorableBackups | Array | 復元可能なバックアップリスト |
| restorableBackups.backupId | UUID | バックアップの識別子 |
| restorableBackups.backupName | String | バックアップ名 |
| restorableBackups.backupStatus | Enum | バックアップ状態<br/>- BACKING_UP: `バックアップ中(スピナー)`<br/>- VERIFYING: `検証中(スピナー)`<br/>- COMPLETED: `使用可能(緑色アイコン)`<br/>- DELETING: `削除中(スピナー)`<br/>- DELETED: `削除済み(グレーアイコン)`<br/>- ERROR: `エラー(赤色アイコン)` |
| restorableBackups.dbInstanceId | UUID | 原本DBインスタンスの識別子 |
| restorableBackups.dbInstanceName | String | 原本DBインスタンス名 |
| restorableBackups.dbVersion | String | DBエンジンタイプ |
| restorableBackups.backupType | Enum | バックアップタイプ<br/>- AUTO: `自動バックアップ`<br/>- MANUAL: `手動バックアップ` |
| restorableBackups.backupSize | Number | バックアップサイズ |
| restorableBackups.failoverCount | Number | フェイルオーバー回数 |
| restorableBackups.walFileName | String | WALファイル名 |
| restorableBackups.createdYmdt | DateTime | バックアップ作成日時 |
| restorableBackups.updatedYmdt | DateTime | バックアップ更新日時 |
| restorableBackups.startYmdt | DateTime | バックアップ開始日時 |
| restorableBackups.completedYmdt | DateTime | バックアップ完了日時 |

---

### DBインスタンスの復元

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Restore | DBインスタンスの復元 |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/restore
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName-example",
"dbInstanceCandidateName": "dbInstanceCandidateName-example",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbPort": 1,
"useHighAvailability": false,
"imageId": "550e8400-e29b-41d4-a716-446655440000",
"pingInterval": 3,
"failoverReplWaitingTime": 60,
"storage": {
"storageType": "General SSD",
"storageSize": 20
},
"network": {
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"usePublicAccess": false,
"availabilityZone": "kr-pub-a"
},
"backup": {
"backupPeriod": 0,
"backupRetryCount": 0,
"replicationRegion": "KR1",
"backupSchedules": [
{
"backupWndBgnTime": "00:00:00",
"backupWndDuration": "HALF_AN_HOUR"
}
]
},
"restore": {
"restoreType": "BACKUP",
"restoreYmdt": "2023-12-31T15:00:00+09:00",
"backupId": "550e8400-e29b-41d4-a716-446655440000"
},
"useDefaultNotification": false,
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useDeletionProtection": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | N | DBインスタンスを識別できる名前 |
| dbInstanceCandidateName | String | N | DBインスタンスを識別できる予備マスター名 |
| description | String | N | DBインスタンスの追加情報<br/>- 最大長: `100` |
| dbFlavorId | UUID | Y | DBインスタンス仕様の識別子 |
| dbPort | Number | N | DBポート<br/>- 最小値: 5432、最大値: 45432 |
| useHighAvailability | Boolean | N | 高可用性の使用有無<br/>- デフォルト値: `false` |
| imageId | UUID | N | イメージの識別子 |
| pingInterval | Number | N | 高可用性使用時のPing間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| failoverReplWaitingTime | Number | N | フェイルオーバー複製遅延待機時間(秒)<br/>- 最小値: `-1` |
| storage | Object | Y | ストレージ情報オブジェクト |
| storage.storageType | Enum | Y | ストレージタイプ |
| storage.storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最小値: `20` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.subnetId | UUID | Y | サブネットの識別子 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | N | DBインスタンスを作成するアベイラビリティゾーン |
| backup | Object | Y | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | Y | バックアップの保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Number | N | バックアップの再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.replicationRegion | Enum | N | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)`<br/>- KR2: `韓国(ピョンチョン)` |
| backup.backupSchedules | Array | Y | バックアップスケジュールリスト |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |
| restore | Object | Y | 復元情報オブジェクト |
| restore.restoreType | Enum | Y | 復元タイプ<br/>- BACKUP: `既存のバックアップを利用した復元`<br/>- TIMESTAMP: `復元可能時間内の時間を利用した時点復元` |
| restore.restoreYmdt | DateTime | N | DBインスタンス復元日時 |
| restore.backupId | UUID | N | 復元に使用するバックアップの識別子 |
| useDefaultNotification | Boolean | N | 基本通知の使用有無<br/>- デフォルト値: `false` |
| parameterGroupId | UUID | Y | パラメータグループの識別子 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンス開始

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Start | DBインスタンス開始 |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/start
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンス停止

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Stop | DBインスタンスを停止する |

#### リクエスト

```http
POST /v1.0/db-instances/{dbInstanceId}/stop
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスストレージ情報の照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンスストレージ情報の照会 |

#### リクエスト

```http
GET /v1.0/db-instances/{dbInstanceId}/storage-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"storageType": "General SSD",
"storageSize": 1,
"storageStatus": "DELETED"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| storageType | Enum | データストレージタイプ |
| storageSize | Number | データストレージサイズ(GB) |
| storageStatus | Enum | データストレージの現在状態<br/>- DELETED: `削除済み`<br/>- PENDING_DELETION: `削除猶予中`<br/>- DELETION_RESERVED: `削除予約済み（スナップショット整理待ち）`<br/>- DETACHED: `デタッチ`<br/>- ATTACHED: `アタッチ` |

---

### DBインスタンスストレージ情報の修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスストレージ情報の修正 |

#### リクエスト

```http
PUT /v1.0/db-instances/{dbInstanceId}/storage-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"storageSize": 1
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最大値:`2048` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

## バックアップ

### バックアップ状態

| 状態 | 説明 |
|--------------|--------------|
| `BACKING_UP` | バックアップ中の場合 |
| `COMPLETED` | バックアップが完了した場合 |
| `DELETING` | バックアップが削除中の場合 |
| `DELETED` | バックアップが削除された場合 |
| `ERROR` | エラーが発生した場合 |

### バックアップリスト照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Backup.List | バックアップリスト照会 |

#### リクエスト

```http
GET /v1.0/backups
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"totalCounts": 1,
"backups": [
{
"backupId": "550e8400-e29b-41d4-a716-446655440000",
"backupName": "backupName-example",
"backupStatus": "BACKING_UP",
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbVersion": "POSTGRESQL_V14_17",
"backupType": "AUTO",
"backupSize": 1,
"startYmdt": "2023-12-31T15:00:00+09:00",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00",
"completedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| totalCounts | Number | 全体バックアップリスト数 |
| backups | Array | バックアップリスト |
| backups.backupId | UUID | バックアップの識別子 |
| backups.backupName | String | バックアップを識別できる名前 |
| backups.backupStatus | Enum | バックアップの現在状態<br/>- BACKING_UP: `バックアップ中(スピナー)`<br/>- VERIFYING: `検証中(スピナー)`<br/>- COMPLETED: `使用可能(緑アイコン)`<br/>- DELETING: `削除中(スピナー)`<br/>- DELETED: `削除済み(グレーアイコン)`<br/>- ERROR: `エラー(赤アイコン)` |
| backups.dbInstanceId | UUID | 原本DBインスタンスの識別子 |
| backups.dbVersion | String | DBバージョン情報 |
| backups.backupType | Enum | バックアップタイプ<br/>- AUTO: `自動バックアップ`<br/>- MANUAL: `手動バックアップ` |
| backups.backupSize | Number | バックアップのサイズ(バイト) |
| backups.startYmdt | DateTime | 開始日時 |
| backups.createdYmdt | DateTime | 作成日時 |
| backups.updatedYmdt | DateTime | 修正日時 |
| backups.completedYmdt | DateTime | 完了日時 |

---

### バックアップ削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Backup.Delete | バックアップ削除 |

#### リクエスト

```http
DELETE /v1.0/backups/{backupId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y | バックアップの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### バックアップをエクスポート

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Backup.Export | バックアップをエクスポート |

#### リクエスト

```http
POST /v1.0/backups/{backupId}/export
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y | バックアップの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"tenantId": "0123456789abcdef0123456789abcdef",
"username": "username-example",
"password": "password-example",
"targetContainer": "targetContainer-example",
"objectPath": "objectPath-example"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| tenantId | String | Y | バックアップが保存されるオブジェクトストレージのテナントID<br/>- 最小長: `32`<br/>- 最大長: `32` |
| username | String | Y | NHN CloudアカウントまたはIAMアカウントID |
| password | String | Y | バックアップが保存されるオブジェクトストレージのAPIパスワード |
| targetContainer | String | Y | バックアップが保存されるオブジェクトストレージのコンテナ |
| objectPath | String | Y | コンテナに保存されるバックアップのパス |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### バックアップの復元

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Backup.Restore | バックアップの復元 |

#### リクエスト

```http
POST /v1.0/backups/{backupId}/restore
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y | バックアップの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName-example",
"dbInstanceCandidateName": "dbInstanceCandidateName-example",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbPort": 1,
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useHighAvailability": false,
"useDefaultNotification": false,
"useDeletionProtection": false,
"pingInterval": 1,
"failoverReplWaitingTime": 1,
"network": {
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"usePublicAccess": false,
"availabilityZone": "kr-pub-a"
},
"storage": {
"storageType": "General SSD",
"storageSize": 20
},
"backup": {
"backupPeriod": 0,
"backupRetryCount": 0,
"backupSchedules": [
{
"backupWndBgnTime": "00:00:00",
"backupWndDuration": "HALF_AN_HOUR"
}
]
}
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DBインスタンスを識別できる名前 |
| dbInstanceCandidateName | String | N | DBインスタンスを識別できる予備マスター名 |
| description | String | N | DBインスタンスの追加情報 |
| dbFlavorId | UUID | Y | DBインスタンス仕様の識別子 |
| dbPort | Number | Y | DBポート<br/>- 最小値: 5432、最大値: 45432 |
| parameterGroupId | UUID | Y | パラメータグループの識別子 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useHighAvailability | Boolean | N | 高可用性の使用有無<br/>- デフォルト値: `false` |
| useDefaultNotification | Boolean | N | 基本通知の使用有無<br/>- デフォルト値: `false` |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |
| pingInterval | Number | N | Ping間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| failoverReplWaitingTime | Number | N | フェイルオーバー複製遅延待機時間(秒)<br/>- 最小値: `-1` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.subnetId | UUID | Y | サブネットの識別子 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | N | DBインスタンスを作成するアベイラビリティゾーン |
| storage | Object | Y | ストレージ情報オブジェクト |
| storage.storageType | Enum | Y | ストレージタイプ |
| storage.storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最小値: `20` |
| backup | Object | Y | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | Y | バックアップの保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Number | N | バックアップの再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.backupSchedules | Array | Y | バックアップスケジュールリスト |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時間 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

## DBセキュリティグループ

### DBセキュリティグループの進行状態

| 状態 | 説明 |
|-----------------|--------------|
| `NONE` | 進行中の作業なし |
| `CREATING_RULE` | ルールポリシー作成中 |
| `UPDATING_RULE` | ルールポリシー修正中 |
| `DELETING_RULE` | ルールポリシー削除中 |

### DBセキュリティグループリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.List | DBセキュリティグループリストを表示 |

#### リクエスト

```http
GET /v1.0/db-security-groups
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbSecurityGroups": [
{
"dbSecurityGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupName": "dbSecurityGroupName-example",
"dbSecurityGroupStatus": "CREATED",
"description": "description-example",
"progressStatus": "NONE",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbSecurityGroups | Array | DBセキュリティグループリスト |
| dbSecurityGroups.dbSecurityGroupId | UUID | DBセキュリティグループの識別子 |
| dbSecurityGroups.dbSecurityGroupName | String | DBセキュリティグループを識別できる名前 |
| dbSecurityGroups.dbSecurityGroupStatus | Enum | DBセキュリティグループの現在状態<br/>- CREATED: `作成済み`<br/>- DELETED: `削除済み` |
| dbSecurityGroups.description | String | DBセキュリティグループの追加情報 |
| dbSecurityGroups.progressStatus | Enum | DBセキュリティグループの現在の進行状態<br/>- NONE: `進行中の作業なし`<br/>- CREATING_RULE: `ルールポリシー作成中`<br/>- UPDATING_RULE: `ルールポリシー修正中`<br/>- DELETING_RULE: `ルールポリシー削除中`<br/>- APPLYING_DEFAULT_RULE: `基本ルール適用中` |
| dbSecurityGroups.createdYmdt | DateTime | 作成日時 |
| dbSecurityGroups.updatedYmdt | DateTime | 修正日時 |

---

### DBセキュリティグループの作成

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Create | DBセキュリティグループ作成 |

#### リクエスト

```http
POST /v1.0/db-security-groups
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"dbSecurityGroupName": "dbSecurityGroupName-example",
"description": "description-example",
"rules": [
{
"direction": "INGRESS",
"etherType": "IPV4",
"port": {
"portType": "ALL",
"minPort": 1,
"maxPort": 1
},
"cidr": "192.168.0.0/24",
"description": "description-example"
}
]
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbSecurityGroupName | String | Y | DBセキュリティグループを識別できる名前 |
| description | String | N | DBセキュリティグループの追加情報 |
| rules | Array | Y | DBセキュリティグループルール情報 |
| rules.direction | Enum | Y | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信` |
| rules.etherType | Enum | Y | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式` |
| rules.port | Object | Y | ポートオブジェクト |
| rules.port.portType | Enum | Y | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲` |
| rules.port.minPort | Number | N | 最小ポート範囲<br/>- 最小値: `1` |
| rules.port.maxPort | Number | N | 最大ポート範囲<br/>- 最大値: `65535` |
| rules.cidr | String | Y | CIDR |
| rules.description | String | N | DBセキュリティグループルールの追加情報 |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbSecurityGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbSecurityGroupId | UUID | DBセキュリティグループの識別子 |

---

### DBセキュリティグループの削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Delete | DBセキュリティグループの削除 |

#### リクエスト

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBセキュリティグループ詳細を表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Get | DBセキュリティグループ詳細を表示 |

#### リクエスト

```http
GET /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbSecurityGroup": {
"dbSecurityGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupName": "dbSecurityGroupName-example",
"dbSecurityGroupStatus": "CREATED",
"description": "description-example",
"progressStatus": "NONE",
"rules": [
{
"ruleId": "550e8400-e29b-41d4-a716-446655440000",
"description": "description-example",
"direction": "INGRESS",
"etherType": "IPV4",
"port": {
"portType": "ALL",
"minPort": 1,
"maxPort": 1
},
"cidr": "192.168.0.0/24",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbSecurityGroup | Object | DBセキュリティグループ |
| dbSecurityGroup.dbSecurityGroupId | UUID | DBセキュリティグループの識別子 |
| dbSecurityGroup.dbSecurityGroupName | String | DBセキュリティグループを識別できる名前 |
| dbSecurityGroup.dbSecurityGroupStatus | Enum | DBセキュリティグループの現在状態<br/>- CREATED: `作成済み`<br/>- DELETED: `削除済み` |
| dbSecurityGroup.description | String | DBセキュリティグループの追加情報 |
| dbSecurityGroup.progressStatus | Enum | DBセキュリティグループの現在の進行状態<br/>- NONE: `進行中の作業なし`<br/>- CREATING_RULE: `ルールポリシー作成中`<br/>- UPDATING_RULE: `ルールポリシー修正中`<br/>- DELETING_RULE: `ルールポリシー削除中`<br/>- APPLYING_DEFAULT_RULE: `基本ルール適用中` |
| dbSecurityGroup.rules | Array | DBセキュリティグループルールリスト |
| dbSecurityGroup.rules.ruleId | UUID | DBセキュリティグループルールの識別子 |
| dbSecurityGroup.rules.description | String | DBセキュリティグループルールの追加情報 |
| dbSecurityGroup.rules.direction | Enum | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信` |
| dbSecurityGroup.rules.etherType | Enum | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式` |
| dbSecurityGroup.rules.port | Object | ポートオブジェクト |
| dbSecurityGroup.rules.port.portType | Enum | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲` |
| dbSecurityGroup.rules.port.minPort | Number | 最小ポート範囲 |
| dbSecurityGroup.rules.port.maxPort | Number | 最大ポート範囲 |
| dbSecurityGroup.rules.cidr | String | CIDR |
| dbSecurityGroup.rules.createdYmdt | DateTime | 作成日時 |
| dbSecurityGroup.rules.updatedYmdt | DateTime | 修正日時 |
| dbSecurityGroup.createdYmdt | DateTime | 作成日時 |
| dbSecurityGroup.updatedYmdt | DateTime | 修正日時 |

---

### DBセキュリティグループの修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Modify | DBセキュリティグループの修正 |

#### リクエスト

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"dbSecurityGroupName": "dbSecurityGroupName-example",
"description": "description-example"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbSecurityGroupName | String | Y | DBセキュリティグループを識別できる名前 |
| description | String | N | DBセキュリティグループの追加情報 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBセキュリティグループルールの削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroupRule.Delete | DBセキュリティグループルールの削除 |

#### リクエスト

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |
| ruleIds | Query | String | Y | DBセキュリティグループルールIDリスト |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBセキュリティグループルールの作成

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroupRule.Create | DBセキュリティグループルールの作成 |

#### リクエスト

```http
POST /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"direction": "INGRESS",
"etherType": "IPV4",
"port": {
"portType": "ALL",
"minPort": 1,
"maxPort": 1
},
"cidr": "192.168.0.0/24",
"description": "description-example"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| direction | Enum | Y | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信` |
| etherType | Enum | Y | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式` |
| port | Object | Y | ポート情報 |
| port.portType | Enum | Y | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲` |
| port.minPort | Number | N | 最小ポート範囲<br/>- 最小値: `1` |
| port.maxPort | Number | N | 最大ポート範囲<br/>- 最大値: `65535` |
| cidr | String | Y | CIDR |
| description | String | N | DBセキュリティグループルールの追加情報 |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

### DBセキュリティグループルールの修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroupRule.Modify | DBセキュリティグループルールの修正 |

#### リクエスト

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |
| ruleId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"direction": "INGRESS",
"etherType": "IPV4",
"port": {
"portType": "ALL",
"minPort": 1,
"maxPort": 1
},
"cidr": "192.168.0.0/24",
"description": "description-example"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| direction | Enum | Y | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信` |
| etherType | Enum | Y | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式` |
| port | Object | Y | ポート情報 |
| port.portType | Enum | Y | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲` |
| port.minPort | Number | N | 最小ポート範囲<br/>- 最小値: `1` |
| port.maxPort | Number | N | 最大ポート範囲<br/>- 最大値: `65535` |
| cidr | String | Y | CIDR |
| description | String | N | DBセキュリティグループルールの追加情報 |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | リクエストした作業の識別子 |

---

## パラメータグループ

### パラメータグループリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.List | パラメータグループリストを表示 |

#### リクエスト

```http
GET /v1.0/parameter-groups
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"parameterGroups": [
{
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"parameterGroupName": "parameterGroupName-example",
"description": "description-example",
"dbVersion": "POSTGRESQL_V14_17",
"parameterGroupStatus": "STABLE",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| parameterGroups | Array | パラメータグループリスト |
| parameterGroups.parameterGroupId | UUID | パラメータグループの識別子 |
| parameterGroups.parameterGroupName | String | パラメータグループを識別できる名前 |
| parameterGroups.description | String | パラメータグループの追加情報 |
| parameterGroups.dbVersion | String | DBバージョン情報 |
| parameterGroups.parameterGroupStatus | Enum | パラメータグループの現在状態<br/>- STABLE: `適用完了`<br/>- NEED_TO_APPLY: `適用必要`<br/>- DELETED: `削除済み` |
| parameterGroups.createdYmdt | DateTime | 作成日時 |
| parameterGroups.updatedYmdt | DateTime | 修正日時 |

---

### パラメータグループの作成

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Create | パラメータグループの作成 |

#### リクエスト

```http
POST /v1.0/parameter-groups
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"parameterGroupName": "parameterGroupName-example",
"description": "description-example",
"dbVersion": "POSTGRESQL_V14_17"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | パラメータグループを識別できる名前 |
| description | String | N | パラメータグループの追加情報 |
| dbVersion | String | Y | DBバージョン情報 |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| parameterGroupId | UUID | パラメータグループの識別子 |

---

### パラメータグループの削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Delete | パラメータグループの削除 |

#### リクエスト

```http
DELETE /v1.0/parameter-groups/{parameterGroupId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | パラメータグループの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### パラメータグループ詳細を表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Get | パラメータグループ詳細を表示 |

#### リクエスト

```http
GET /v1.0/parameter-groups/{parameterGroupId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | パラメータグループの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"parameterGroupName": "parameterGroupName-example",
"description": "description-example",
"dbVersion": "POSTGRESQL_V14_17",
"parameterGroupStatus": "STABLE",
"valueUnit": "valueUnit-example",
{
"allowedValue": "allowedValue-example",
"valueType": "BOOLEAN",
"updateType": "VARIABLE",
"applyType": "BOTH",
"expressionAvailable": false
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| parameterGroupId | UUID | パラメータグループの識別子 |
| parameterGroupName | String | パラメータグループを識別できる名前 |
| description | String | パラメータグループの追加情報 |
| dbVersion | String | DBバージョン情報 |
| parameterGroupStatus | Enum | パラメータグループの現在状態<br/>- STABLE: `適用完了`<br/>- NEED_TO_APPLY: `適用必要`<br/>- DELETED: `削除済み` |
| parameters | Array | パラメータリスト |
| parameters.parameterCategory | String | パラメータカテゴリー |
| parameters.parameterName | String | パラメータ名 |
| parameters.value | String | 現在設定されている値 |
| parameters.valueUnit | String | 値の単位(バイト: B,kB,MB,GB,TB、時間: us,ms,s,min,h,d) |
| parameters.defaultValue | String | デフォルト値 |
| parameters.allowedValue | String | 許可された値 |
| parameters.valueType | Enum | 値タイプ<br/>- BOOLEAN: `ブーリアンタイプ`<br/> `* ex) on, off, true, false, yes, no, 1, 0`<br/>- STRING: `文字列タイプ`<br/>- NUMERIC: `整数および浮動小数点タイプ`<br/>- NUMERIC_WITH_BYTE_UNIT: `バイト単位の数字タイプ`<br/> `* ex) 120kB, 100MB`<br/> `* 許可されたバイト単位: B (bytes), kB (kilobytes), MB (megabytes), GB (gigabytes), and TB (terabytes)`<br/>- NUMERIC_WITH_TIME_UNIT: `時間単位の数字タイプ`<br/> `* ex) 120ms, 100s, 1d`<br/> `* 許可された時間単位: us (microseconds), ms (milliseconds), s (seconds), min (minutes), h (hours), and d (days)`<br/>- ENUMERATED: `許可された値に宣言された値の中から1つを選択(コンマ(,)で区分される)`<br/>- MULTI_ENUMERATED: `許可された値に宣言された値の中から複数個を選択(コンマ(,)で区分される)` |
<p>
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
| parameters.updateType | Enum | 修正タイプ<br/>- VARIABLE: `常に修正可能`<br/>- CONSTANT: `修正不可能` |
| parameters.applyType | Enum | 適用タイプ<br/>- BOTH: `セッション、設定ファイルの両方に適用`<br/>- SESSION: `セッションにのみ適用`<br/>- FILE: `設定ファイルにのみ適用` |
| parameters.expressionAvailable | Boolean | 数式の使用可否 |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

### パラメータグループの修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Modify | パラメータグループの修正 |

#### リクエスト

```http
}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | パラメータグループの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"parameterGroupName": "parameterGroupName-example",
"description": "description-example"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| parameterGroupName | String | N | パラメータグループを識別できる名前 |
| description | String | N | パラメータグループの追加情報 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### パラメータグループのコピー

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Copy | パラメータグループのコピー |

#### リクエスト

```http
}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | パラメータグループの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"parameterGroupName": "parameterGroupName-example",
"description": "description-example"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | パラメータグループを識別できる名前 |
| description | String | N | パラメータグループの追加情報 |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| parameterGroupId | UUID | パラメータグループの識別子 |

---

### パラメータ修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Modify | パラメータグループの修正 |

#### リクエスト

```http
"parameterName": "parameterName-example",
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | パラメータグループの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
]
{
"valueType": "BOOLEAN",
このAPIはレスポンス本文を返しません。
}
]
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| modifiedParameters | Array | Y | 変更するパラメータリスト |
| modifiedParameters.parameterName | String | Y | パラメータ名 |
| modifiedParameters.value | String | Y | 変更するパラメータ値 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### パラメータグループの再設定

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Reset | パラメータグループの再設定 |

#### リクエスト

```http
このAPIはリクエスト本文を要求しません。
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | パラメータグループの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

## ユーザーグループ

### ユーザーグループリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.List | ユーザーグループリストを表示 |

#### リクエスト

```http
"resultCode": 0,
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"createdYmdt": "2023-12-31T15:00:00+09:00",
{
}
]
}
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| userGroups | Array | ユーザーグループリスト |
| userGroups.userGroupId | UUID | ユーザーグループの識別子 |
| userGroups.userGroupName | String | ユーザーグループを識別できる名前 |
| userGroups.userGroupStatus | Enum | ユーザーグループの現在状態<br/>- CREATED<br/>- DELETED |
| userGroups.createdYmdt | DateTime | 作成日時 |
| userGroups.updatedYmdt | DateTime | 修正日時 |

---

### ユーザーグループの作成

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Create | ユーザーグループの作成 |

#### リクエスト

```http
"selectAllYN": false
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
]
{
"header": {
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| userGroupName | String | Y | ユーザーグループを識別できる名前 |
| memberIds | Array | Y | プロジェクトメンバーの識別子リスト |
| selectAllYN | Boolean | Y | プロジェクトメンバー全体の有無<br/>- デフォルト値: `false` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
このAPIはリクエスト本文を要求しません。
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| userGroupId | UUID | ユーザーグループの識別子 |

---

### ユーザーグループの削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Delete | ユーザーグループの削除 |

#### リクエスト

```http
このAPIはリクエスト本文を要求しません。
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y | ユーザーグループの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### ユーザーグループ詳細を表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Get | ユーザーグループ詳細を表示 |

#### リクエスト

```http
"resultCode": 0,
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y | ユーザーグループの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
}
]
}
}
"createdYmdt": "2023-12-31T15:00:00+09:00",
{
}
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| userGroupId | UUID | ユーザーグループの識別子 |
| userGroupName | String | ユーザーグループを識別できる名前 |
| userGroupTypeCode | Enum | ユーザーグループ種類<br/>- ENTIRE: `プロジェクトメンバー全体`<br/>- INDIVIDUAL_MEMBER: `ユーザー指定` |
| userGroupStatus | Enum | ユーザーグループの現在状態<br/>- CREATED<br/>- DELETED |
| members | Array | プロジェクトメンバーリスト |
| members.memberId | UUID | プロジェクトメンバーの識別子 |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

### ユーザーグループの修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Modify | ユーザーグループの修正 |

#### リクエスト

```http
"selectAllYN": false
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y | ユーザーグループの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
]
{
"header": {
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| userGroupName | String | N | ユーザーグループを識別できる名前 |
| memberIds | Array | N | プロジェクトメンバーの識別子リスト |
| selectAllYN | Boolean | Y | プロジェクトメンバー全体の有無<br/>- デフォルト値: `false` |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

## 通知グループ

### 通知グループリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.List | 通知グループリストを表示 |

#### リクエスト

```http
"resultCode": 0,
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"notifyEmail": false,
{
"isEnabled": false,
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| notificationGroups | Array |  |
| notificationGroups.notificationGroupId | UUID | 通知グループの識別子 |
| notificationGroups.notificationGroupName | String | 通知グループを識別できる名前 |
| notificationGroups.notificationGroupStatus | Enum | 通知グループの現在状態<br/>- CREATED: `作成済み`<br/>- DELETED: `削除済み` |
| notificationGroups.notifyEmail | Boolean | メール通知の有無 |
| notificationGroups.notifySms | Boolean | SMS通知の有無 |
| notificationGroups.isEnabled | Boolean | 有効かどうか |
| notificationGroups.createdYmdt | DateTime | 作成日時 |
| notificationGroups.updatedYmdt | DateTime | 修正日時 |

---

### 通知グループの作成

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Create | 通知グループの作成 |

#### リクエスト

```http
"notifySms": true,
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"createdYmdt": "2023-12-31T15:00:00+09:00",
}
</p>
<p>
{
"header": {
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| notificationGroupName | String | Y | 通知グループを識別できる名前 |
| notifyEmail | Boolean | N | メール通知の有無<br/>- デフォルト値: `true` |
| notifySms | Boolean | N | SMS通知の有無<br/>- デフォルト値: `true` |
| isEnabled | Boolean | N | 有効かどうか<br/>- デフォルト値: `true` |
| dbInstanceIds | Array | Y | 監視対象のDBインスタンスの識別子リスト |
| userGroupIds | Array | Y | ユーザーグループの識別子リスト |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
このAPIはリクエスト本文を要求しません。
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| notificationGroupId | UUID | 通知グループの識別子 |

---

### 監視設定の削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Delete | 監視設定の削除 |

#### リクエスト

```http
このAPIはリクエスト本文を要求しません。
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | 通知グループの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 通知グループ詳細を表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Get | 通知グループ詳細を表示 |

#### リクエスト

```http
"resultCode": 0,
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | 通知グループの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"isEnabled": false,
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
"dbInstances": [
{
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"userGroupId": "550e8400-e29b-41d4-a716-446655440000",
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
{
}
}
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| notificationGroupId | UUID | 通知グループの識別子 |
| notificationGroupName | String | 通知グループを識別できる名前 |
| notificationGroupStatus | Enum | 通知グループの現在状態<br/>- CREATED: `作成済み`<br/>- DELETED: `削除済み` |
| notifyEmail | Boolean | メール通知の有無 |
| notifySms | Boolean | SMS通知の有無 |
| isEnabled | Boolean | 有効かどうか |
| dbInstances | Array | 監視対象のDBインスタンスリスト |
| dbInstances.dbInstanceId | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceName | String | DBインスタンスを識別できる名前 |
| userGroups | Array | ユーザーグループリスト |
| userGroups.userGroupId | UUID | ユーザーグループの識別子 |
| userGroups.userGroupName | String | ユーザーグループを識別できる名前 |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

### 通知グループの修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Modify | 通知グループの修正 |

#### リクエスト

```http
"notifySms": false,
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | 通知グループの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"createdYmdt": "2023-12-31T15:00:00+09:00",
}
]
}
{
"header": {
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| notificationGroupName | String | N | 通知グループを識別できる名前 |
| notifyEmail | Boolean | N | メール通知の有無<br/>- デフォルト値: `false` |
| notifySms | Boolean | N | SMS通知の有無<br/>- デフォルト値: `false` |
| isEnabled | Boolean | N | 有効かどうか<br/>- デフォルト値: `false` |
| dbInstanceIds | Array | Y | 監視対象のDBインスタンスの識別子リスト |
| userGroupIds | Array | Y | ユーザーグループの識別子リスト |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 監視設定リストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.List | 監視設定リストを表示 |

#### リクエスト

```http
"resultCode": 0,
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | 通知グループの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"threshold": 1,
{
"createdYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
</p>
---
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| notificationWatchdogs | Array | 監視設定情報 |
| notificationWatchdogs.watchdogId | UUID | 監視設定の識別子 |
| notificationWatchdogs.metricName | String | 監視対象の性能指標 |
| notificationWatchdogs.comparisonOperator | Enum | 監視対象の比較方法<br/>- LE: `<=`<br/>- LT: `<`<br/>- GE: `>=`<br/>- GT: `>` |
| notificationWatchdogs.threshold | Number | 監視対象のしきい値 |
| notificationWatchdogs.duration | Number | 監視対象の持続時間 |
| notificationWatchdogs.createdYmdt | DateTime | 作成日時 |

---

### 監視設定の作成

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Create | 監視設定の作成 |

#### リクエスト

```http
"threshold": 0,
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | 通知グループの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
}
]
{
"header": {
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| metricName | String | Y | 監視対象の性能指標 |
| comparisonOperator | Enum | Y | 監視対象の比較方法<br/>- LE: `<=`<br/>- LT: `<`<br/>- GE: `>=`<br/>- GT: `>` |
| threshold | Number | Y | 監視対象のしきい値<br/>- 最小値: `0` |
| duration | Number | Y | 監視対象の持続時間（分）<br/>- 最小値: `0` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
このAPIはリクエスト本文を要求しません。
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| watchdogId | UUID | 監視設定の識別子 |

---

### 監視設定の削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Delete | 監視設定の削除 |

#### リクエスト

```http
<p>
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | 通知グループの識別子 |
| watchdogId | URL | UUID | Y | 監視設定の識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 監視設定の修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Modify | 監視設定の修正 |

#### リクエスト

```http
"threshold": 0,
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | 通知グループの識別子 |
| watchdogId | URL | UUID | Y | 監視設定の識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
}
]
{
"header": {
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| metricName | String | Y | 監視対象の性能指標 |
| comparisonOperator | Enum | Y | 監視対象の比較方法<br/>- LE: `<=`<br/>- LT: `<`<br/>- GE: `>=`<br/>- GT: `>` |
| threshold | Number | Y | 監視対象のしきい値<br/>- 最小値: `0` |
| duration | Number | Y | 監視対象の持続時間（分）<br/>- 最小値: `0` |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

## モニタリング

### 統計情報照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Metric.List | 統計情報照会 |

#### リクエスト

```http
このAPIはリクエスト本文を要求しません。
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 性能指標リストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Metric.List | 性能指標リストを表示 |

#### リクエスト

```http
"resultCode": 0,
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
]
{
}
---
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| metrics | Array | 性能指標リスト |
| metrics.metricName | String | 性能指標タイプ |
| metrics.unit | String | 測定値単位 |

---

## イベント

### イベントカテゴリー

"header": {

| イベントカテゴリー | 説明 |
|-------------|---------|
| ALL | 全体 |
| BACKUP | バックアップ |
| DB_INSTANCE | DBインスタンス |
| JOB | 作業 |
| TENANT | テナント |
| MONITORING | モニタリング |

### 購読可能なイベントコードリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Event.List | 購読可能なイベントコードリストを表示 |

#### リクエスト

```http
"resultCode": 0,
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
]
{
</p>
---
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| eventCodes | Array | イベントコードリスト |
| eventCodes.eventCode | Enum | イベントコード |
| eventCodes.eventCategoryType | Enum | イベントカテゴリータイプ<br/>- ALL: `全体`<br/>- DB_INSTANCE: `DBインスタンスで発生したイベント`<br/>- DB_SECURITY_GROUP: `DBセキュリティグループで発生したイベント`<br/>- MONITORING: `モニタリングで発生したイベント`<br/>- JOB: `JOBで発生したイベント`<br/>- BACKUP: `バックアップで発生したイベント`<br/>- TENANT: `テナントで発生したイベント` |

---

### イベントリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Event.List | イベントリストを表示 |

#### リクエスト

```http
"resultCode": 0,
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"totalCounts": 1,
"sourceName": "sourceName-example",
{
{
</p>
"message": "message-example"
}
],
{
}
]
}
],
---
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| totalCounts | Number | 全体のイベントリスト数 |
| events | Array | イベントリスト |
| events.eventCategoryType | Enum | イベントカテゴリータイプ<br/>- ALL: `全体`<br/>- DB_INSTANCE: `DBインスタンスで発生したイベント`<br/>- DB_SECURITY_GROUP: `DBセキュリティグループで発生したイベント`<br/>- MONITORING: `モニタリングで発生したイベント`<br/>- JOB: `JOBで発生したイベント`<br/>- BACKUP: `バックアップで発生したイベント`<br/>- TENANT: `テナントで発生したイベント` |
| events.eventCode | Enum | 発生したイベントのタイプ |
| events.sourceId | UUID | イベントソースの識別子 |
| events.sourceName | String | イベントソースを識別できる名前 |
| events.messages | Array | イベントメッセージリスト |
| events.messages.langCode | Enum | 言語コード<br/>- KO<br/>- EN<br/>- JA<br/>- ZH |
| events.messages.message | String | イベントメッセージ |
| events.eventYmdt | DateTime | イベント発生日時 |

---
