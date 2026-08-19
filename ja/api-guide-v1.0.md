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
## DBエンジンバージョン

### サポートするDBエンジンバージョン

| DBエンジンバージョン | 作成可否 | オブジェクトストレージからの復元可否 |
|------------|----------|------------------|
| POSTGRESQL_V14_6 | X | O |
| POSTGRESQL_V14_15 | X | O |
| POSTGRESQL_V14_17 | O | O |
| POSTGRESQL_V14_19 | O | O |
| POSTGRESQL_V14_23 | O | O |
| POSTGRESQL_V17_2 | X | O |
| POSTGRESQL_V17_4 | O | O |
| POSTGRESQL_V17_6 | O | O |
| POSTGRESQL_V17_10 | O | O |

* EnumタイプであるdbVersionフィールドに上記の値を使用できます。
* バージョンによっては、作成または復元できない場合があります。

### DBエンジンバージョンリストの照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbVersion.List | DBエンジンバージョンリストの照会 |

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

### DBインスタンスタイプリストの照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbFlavor.List | DBインスタンスタイプリストの照会 |

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
| regions.regionCode | Enum | リージョンコード<br/>- `KR`1: `韓国(パンギョ)`<br/>- `KR2`: `韓国(ピョンチョン)` |
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
"availableIpCount": 240
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
| createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
| dbInstanceGroups.dbInstanceGroupStatus | Enum | DBインスタンスグループの現在の状態<br/>- `CREATED`: 作成済み<br/>- `DELETED`: 削除済み |
| dbInstanceGroups.replicationType | Enum | DBインスタンスグループのレプリケーション形態<br/>- `STANDALONE`: 高可用性を使用しない<br/>- `HIGH_AVAILABILITY`: 高可用性を使用する |
| dbInstanceGroups.createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbInstanceGroups.updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
"dbInstanceStatus": "AVAILABLE"
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
| dbInstanceGroupStatus | Enum | DBインスタンスグループの現在の状態<br/>- `CREATED`: 作成済み<br/>- `DELETED`: 削除済み |
| replicationType | Enum | DBインスタンスグループのレプリケーション形態<br/>- `STANDALONE`: 高可用性を使用しない<br/>- `HIGH_AVAILABILITY`: 高可用性を使用する |
| replicationType | Enum | DBインスタンスグループのレプリケーションタイプ<br/>- STANDALONE: `高可用性を使用しない`<br/>- HIGH_AVAILABILITY: `高可用性を使用する` |
| dbInstances | Array | DBインスタンスグループに属するDBインスタンスリスト |
| dbInstances.dbInstanceId | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceType | Enum | DBインスタンスのロールタイプ<br/>- `MASTER`: マスター<br/>- `FAILED_MASTER`: フェイルオーバーされたマスター<br/>- `CANDIDATE_MASTER`: スタンバイマスター<br/>- `READ_ONLY_SLAVE`: リードレプリカ |
| dbInstances.dbInstanceStatus | Enum | DBインスタンスの現在の状態 |
| createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
| dbInstanceGroupId | URL | UUID | Y | DBインスタンスグループの識別子 |

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
"extensionName": "address_standardizer",
"extensionStatus": "AVAILABLE",
"databases": [
{
"dbInstanceGroupExtensionId": "550e8400-e29b-41d4-a716-446655440000",
"databaseId": "550e8400-e29b-41d4-a716-446655440000",
"databaseName": "database-1",
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
| extensions | Array | 拡張リスト |
| extensions.extensionId | UUID | 拡張の識別子 |
| extensions.extensionName | String | 拡張機能名 |
| extensions.extensionStatus | Enum | 拡張状態<br/>- `AVAILABLE`: 使用可能<br/>- `NEED_TO_APPLY`: 適用が必要<br/>- `APPLYING`: 適用中 |
| extensions.databases | Array | 拡張がインストールされたデータベース情報 |
| extensions.databases.dbInstanceGroupExtensionId | UUID | DBインスタンスグループ内の拡張の識別子 |
| extensions.databases.databaseId | UUID | データベースの識別子 |
| extensions.databases.databaseName | String | データベース名 |
| extensions.databases.dbInstanceGroupExtensionStatus | Enum | DBインスタンスグループ内の拡張状態<br/>- `CREATED`: 作成済み<br/>- `INSTALLED`: インストール済み<br/>- `INSTALLING`: インストール中<br/>- `INSTALL_ERROR`: インストールエラー<br/>- `DELETED`: 削除済み<br/>- `DELETING`: 削除中<br/>- `DELETE_ERROR`: 削除エラー |
| extensions.databases.reservedAction | Enum | 予約ジョブ<br/>- `NONE`: なし<br/>- `INSTALL`: インストール予約(適用が必要)<br/>- `INSTALL_WITH_CASCADE`: 強制インストール予約(適用が必要)<br/>- `DELETE`: 削除予約(適用が必要)<br/>- `DELETE_WITH_CASCADE`: 強制削除予約(適用が必要) |
| extensions.databases.errorReason | String | エラー原因 |
| isNeedToApply | Boolean | 変更事項の適用の要否 |

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
| dbInstanceGroupId | URL | UUID | Y | DBインスタンスグループの識別子 |

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
| dbInstanceGroupId | URL | UUID | Y | DBインスタンスグループの識別子 |

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
| dbInstanceGroupId | URL | UUID | Y | DBインスタンスグループの識別子 |
| dbInstanceGroupExtensionId | URL | UUID | Y | DBインスタンスグループ内の拡張の識別子 |
| withCascade | Query | Boolean | Y | 依存情報の強制削除の有無 |

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
| dbInstanceGroupId | URL | UUID | Y | DBインスタンスグループの識別子 |
| extensionId | URL | UUID | Y | 拡張の識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"databaseId": "550e8400-e29b-41d4-a716-446655440000",
"schemaName": "rds",
"withCascade": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| databaseId | UUID | Y | インストール対象データベースの識別子 |
| schemaName | String | Y | インストール対象スキーマ名 |
| withCascade | Boolean | N | 依存情報の強制インストールの有無<br/>- デフォルト値: `false` |

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
            "dbVersion": "POSTGRESQL_V17_10",
            "dbPort": 15432,
            "dbInstanceType": "MASTER",
            "dbInstanceStatus": "AVAILABLE",
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
| dbInstances | Array | DBインスタンスリスト |
| dbInstances.dbInstanceId | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceGroupId | UUID | DBインスタンスグループの識別子 |
| dbInstances.dbInstanceName | String | DBインスタンスを識別できる名前 |
| dbInstances.description | String | DBインスタンスの追加情報 |
| dbInstances.dbVersion | String | DBエンジンタイプ |
| dbInstances.dbVersion | Enum | DBエンジンバージョン |
| dbInstances.dbPort | Number | DBポート |
| dbInstances.dbInstanceType | Enum | DBインスタンスのロールタイプ<br/>- `MASTER`: マスター<br/>- `FAILED_MASTER`: フェイルオーバーされたマスター<br/>- `CANDIDATE_MASTER`: スタンバイマスター<br/>- `READ_ONLY_SLAVE`: リードレプリカ |
| dbInstances.dbInstanceStatus | Enum | DBインスタンスの現在の状態 |
| dbInstances.progressStatus | Enum | DBインスタンスの現在の進行状態 |
| dbInstances.createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbInstances.updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
    "dbInstanceName": "db-instance",
    "description": "description",
    "dbFlavorId": "71f69bf9-3c01-4c1a-b135-bb75e93f6268",
    "dbVersion": "POSTGRESQL_V17_6",
    "dbPort": 15432,
    "databaseName": "database",
    "dbUserName": "db-user",
    "dbPassword": "password",
    "parameterGroupId": "488bf4f5-d8f7-459b-ace6-529b606c8570",
    "dbSecurityGroupIds": [
        "b0483a3d-e8e2-46f6-9e84-d5e31b0d44f4"
    ],
    "userGroupIds": [],
    "network": {
        "subnetId": "e721a9dd-dad0-4cf0-a53b-dd654ebfc683",
        "availabilityZone": "kr-pub-a"
    },
    "storage": {
        "storageType": "General SSD",
        "storageSize": 20
    },
    "backup": {
        "backupPeriod": 1,
        "backupSchedules": [
            {
                "backupWndBgnTime": "00:00:00",
                "backupWndDuration": "ONE_HOUR_AND_HALF",
                "backupRetryExpireTime": "01:30:00"
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
| dbVersion | Enum | Y | DBエンジンバージョン |
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
| failoverReplWaitingTime | Number | N | 高可用性使用時のフェイルオーバー待機時間<br/>- `-1`に設定時、レプリケーション遅延が解消されるまで待機し続けます。<br/>- 最小値: `-1` |
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
| backup.periodicAutoBackupStrategyTypeCode | Enum | N | 定期自動バックアップ戦略コード(DAILY_FULL/SNAPSHOT)<br/>- デフォルト値: `DAILY_FULL`<br/>- `SNAPSHOT`: 毎日スナップショットバックアップ<br/>- `DAILY_FULL`: 毎日フルバックアップ |
| backup.backupSchedules | Array | Y | バックアップスケジュール情報 |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時間 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップウィンドウ<br/>- `HALF_AN_HOUR`: 30分<br/>- `ONE_HOUR`: 1時間<br/>- `ONE_HOUR_AND_HALF`: 1時間30分<br/>- `TWO_HOURS`: 2時間<br/>- `TWO_HOURS_AND_HALF`: 2時間30分<br/>- `THREE_HOURS`: 3時間 |

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
"dbPort": 15432,
"dbVersion": "POSTGRESQL_V17_10",
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
"periodicAutoBackupStrategyTypeCode": "DAILY_FULL",
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
| dbVersion | Enum | Y | DBエンジンバージョン |
| useHighAvailability | Boolean | N | 高可用性の使用有無<br/>- デフォルト値: `false` |
| imageId | UUID | N | イメージの識別子 |
| pingInterval | Number | N | 高可用性使用時のPing間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| failoverReplWaitingTime | Number | N | 高可用性使用時のフェイルオーバー待機時間<br/>- `-1`に設定時、レプリケーション遅延が解消されるまで待機し続けます。<br/>- 最小値: `-1` |
| storage | Object | Y | ストレージ情報オブジェクト |
| storage.storageType | Enum | Y | ストレージタイプ |
| storage.storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最小値: `20` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.subnetId | UUID | Y | サブネットの識別子 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | N | DBインスタンスを作成するアベイラビリティゾーン |
| backup | Object | Y | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | Y | バックアップの保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.periodicAutoBackupStrategyTypeCode | Enum | N | 定期自動バックアップ戦略コード(DAILY_FULL/SNAPSHOT)<br/>- デフォルト値: `DAILY_FULL`<br/>- `SNAPSHOT`: 毎日スナップショットバックアップ<br/>- `DAILY_FULL`: 毎日フルバックアップ |
| backup.backupRetryCount | Number | N | バックアップの再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.replicationRegion | Enum | N | バックアップのレプリケーションリージョン<br/>- `KR1`: 韓国(パンギョ)<br/>- `KR2`: 韓国(ピョンチョン) |
| backup.backupSchedules | Array | Y | バックアップスケジュールリスト |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時間 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップウィンドウ<br/>- `HALF_AN_HOUR`: 30分<br/>- `ONE_HOUR`: 1時間<br/>- `ONE_HOUR_AND_HALF`: 1時間30分<br/>- `TWO_HOURS`: 2時間<br/>- `TWO_HOURS_AND_HALF`: 2時間30分<br/>- `THREE_HOURS`: 3時間 |
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
"dbVersion": "POSTGRESQL_V17_10",
"dbPort": 15432,
"dbInstanceType": "MASTER",
"dbInstanceStatus": "AVAILABLE",
"progressStatus": "NONE",
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
    "osVersion": "Ubuntu Server 24.04 LTS",
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
| dbVersion | Enum | DBエンジンバージョン |
| dbPort | Number | DBポート |
| dbInstanceType | Enum | DBインスタンスのロールタイプ<br/>- `MASTER`: マスター<br/>- `FAILED_MASTER`: フェイルオーバーされたマスター<br/>- `CANDIDATE_MASTER`: スタンバイマスター<br/>- `READ_ONLY_SLAVE`: リードレプリカ |
| dbInstanceStatus | Enum | DBインスタンスの現在の状態 |
| progressStatus | Enum | DBインスタンスの現在の進行状態 |
| dbFlavorId | UUID | DBインスタンス仕様の識別子 |
| parameterGroupId | UUID | DBインスタンスに適用されたパラメータグループの識別子 |
| dbSecurityGroupIds | Array | DBインスタンスに適用されたDBセキュリティグループの識別子リスト |
| notificationGroupIds | Array | DBインスタンスに適用された通知グループの識別子リスト |
| useDeletionProtection | Boolean | DBインスタンスの削除保護の有無 |
| needToApplyParameterGroup | Boolean | 最新パラメータグループの適用可否 |
| needMigration | Boolean | マイグレーションの要否 |
| osVersion | String | OSバージョン |
| createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
"dbPort": 15432,
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbVersion": "POSTGRESQL_V17_10",
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
| dbVersion | Enum  | N | DBエンジンバージョン |
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

### 現在のDBインスタンスで選択可能なDBエンジンバージョンの照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | 現在のDBインスタンスで選択可能なDBエンジンバージョンの照会 |

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
            "dbVersion": "POSTGRESQL_V17_10",
            "dbVersionName": "PostgreSQL V17.10",
            "restorableFromObs": true
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| availableDbVersions | Array | DBバージョン情報 |
| availableDbVersions.dbVersion | Enum | DBエンジンバージョン |
| availableDbVersions.dbVersionName | String | DBエンジンバージョン名 |
| availableDbVersions.restorableFromObs | Boolean | オブジェクトストレージからの復元可否 |

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
| backupMethodType | Enum | N | バックアップ方式<br/>- `FULL`<br/>- `SNAPSHOT` |

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
"periodicAutoBackupStrategyTypeCode": "SNAPSHOT",
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
| periodicAutoBackupStrategyTypeCode | Enum | 定期自動バックアップ戦略コード(DAILY_FULL/SNAPSHOT)<br/>- `SNAPSHOT`: 毎日スナップショットバックアップ<br/>- `DAILY_FULL`: 毎日フルバックアップ |
| backupPeriod | Number | バックアップの保管期間(日) |
| backupRetryCount | Number | バックアップの再試行回数 |
| backupSchedules | Array | バックアップスケジュールリスト |
| backupSchedules.backupWndBgnTime | Time | バックアップ開始時間 |
| backupSchedules.backupWndDuration | Enum | バックアップウィンドウ<br/>- `HALF_AN_HOUR`: 30分<br/>- `ONE_HOUR`: 1時間<br/>- `ONE_HOUR_AND_HALF`: 1時間30分<br/>- `TWO_HOURS`: 2時間<br/>- `TWO_HOURS_AND_HALF`: 2時間30分<br/>- `THREE_HOURS`: 3時間 |

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
"periodicAutoBackupStrategyTypeCode": "SNAPSHOT",
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
| periodicAutoBackupStrategyTypeCode | Enum | N | 定期自動バックアップ戦略コード(DAILY_FULL/SNAPSHOT)<br/>- `SNAPSHOT`: 毎日スナップショットバックアップ<br/>- `DAILY_FULL`: 毎日フルバックアップ |
| backupPeriod | Number | N | バックアップの保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backupRetryCount | Number | N | バックアップの再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backupSchedules | Array | N | バックアップスケジュールリスト |
| backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時間 |
| backupSchedules.backupWndDuration | Enum | Y | バックアップウィンドウ<br/>- `HALF_AN_HOUR`: 30分<br/>- `ONE_HOUR`: 1時間<br/>- `ONE_HOUR_AND_HALF`: 1時間30分<br/>- `TWO_HOURS`: 2時間<br/>- `TWO_HOURS_AND_HALF`: 2時間30分<br/>- `THREE_HOURS`: 3時間 |

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
"username": "example@nhncloud.com or example",
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
"databaseName": "database-1",
"databaseStatus": "STABLE",
"errorReason": "errorReason-example",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00",
"schemas": [
{
"schemaName": "rds"
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
| databases.databaseStatus | Enum | データベースの現在の状態<br/>- `STABLE`: 使用可能<br/>- `CREATING`: 作成中<br/>- `MODIFYING`: 修正中<br/>- `DELETING`: 削除中<br/>- `DELETED`: 削除済み<br/>- `SYNCING`: 同期中<br/>- `DELETE_ERROR`: 削除失敗 |
| databases.errorReason | String | 削除失敗の原因 |
| databases.createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| databases.updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| databases.schemas | Array | スキーマ情報 |
| databases.schemas.schemaName | String | スキーマ名 |

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
"databaseName": "database-1"
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
"databaseName": "database-1"
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
| dbUsers.authorityType | Enum | DBユーザー権限のタイプ<br/>- `CUSTOM`: ユーザー定義権限<br/>- `READ`: READ権限(読み取り専用権限)<br/>- `CRUD`: CRUD権限(読み取り権限を含む)<br/>- `DDL`: DDL権限(CRUD権限を含む) |
| dbUsers.dbUserStatus | Enum | DBユーザーの現在の状態<br/>- `STABLE`: 使用可能<br/>- `CREATING`: 作成中<br/>- `MODIFYING`: 修正中<br/>- `DELETING`: 削除中<br/>- `DELETED`: 削除済み<br/>- `SYNCING`: 同期中<br/>- `DELETE_ERROR`: 削除失敗 |
| dbUsers.createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbUsers.updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
"address": "192.168.0.10/32"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbUserName | String | Y | DBユーザーアカウント名 |
| dbPassword | String | Y | DBユーザーアカウントパスワード |
| authorityType | Enum | Y | DBユーザー権限のタイプ<br/>- `CUSTOM`: ユーザー定義権限<br/>- `READ`: 読み取り権限<br/>- `CRUD`: CRUD権限<br/>- `DDL`: DDL権限 |
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
| authorityType | Enum | N | DBユーザー権限<br/>- `CUSTOM`: ユーザー定義権限<br/>- `READ`: 読み取り権限<br/>- `CRUD`: CRUD権限<br/>- `DDL`: DDL権限 |
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
"address": "192.168.0.10/32",
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
| hbaRules.hbaRuleStatus | Enum | アクセス制御ルールの現在の状態<br/>- `CREATED`: 作成済み<br/>- `APPLIED`: 適用済み<br/>- `CREATING`: 作成中<br/>- `MODIFYING`: 修正中<br/>- `DELETING`: 削除中<br/>- `DELETED`: 削除済み |
| hbaRules.databaseApplyType | Enum | データベースルールの適用方式<br/>- `ENTIRE`: 全て<br/>- `USER_CUSTOM`: ユーザー指定 |
| hbaRules.dbUserApplyTypeCode | Enum | DBユーザールールの適用方式<br/>- `ENTIRE`: 全て<br/>- `USER_CUSTOM`: ユーザー指定 |
| hbaRules.databases | Array | ユーザー指定データベースのリスト |
| hbaRules.databases.databaseId | UUID | ユーザー指定データベースの識別子 |
| hbaRules.databases.databaseName | String | ユーザー指定データベース名 |
| hbaRules.dbUsers | Array | ユーザー指定DBユーザーのリスト |
| hbaRules.dbUsers.dbUserId | UUID | ユーザー指定DBユーザーの識別子 |
| hbaRules.dbUsers.dbUserName | String | ユーザー指定DBユーザーアカウント名 |
| hbaRules.address | String | 接続アドレス<br/>- CIDR形式、ホスト名、またはドメイン形式で入力 |
| hbaRules.authMethod | Enum | 認証方式<br/>- `TRUST`: トラスト(パスワード不要)<br/>- `REJECT`: 接続ブロック<br/>- `SCRAM_SHA_256`: パスワード(SCRAM-SHA-256) |
| hbaRules.reservedAction | Enum | 予約ジョブ<br/>- `NONE`: なし<br/>- `CREATE`: 作成予約(適用が必要)<br/>- `MODIFY`: 修正予約(適用が必要)<br/>- `DELETE`: 削除予約(適用が必要) |
| hbaRules.order | Number | 適用順序 |
| hbaRules.applicable | Boolean | 適用可否<br/>- 適用不可状態のルールは無視されます |
| needToApply | Boolean | 変更事項の適用の要否 |

---

### アクセス制御ルールの追加

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Create | アクセス制御ルールの追加 |

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
"address": "192.168.0.10/32",
"authMethod": "TRUST"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| connectionTypeCode | Enum | N | アクセス制御レコードのタイプ<br/>- `HOST`: TCP/IPでの接続時に有効<br/>- `HOST_NO_SSL`: SSL暗号化を使用しない接続時のみ有効 |
| databaseApplyType | Enum | Y | データベースルールの適用方式<br/>- `ENTIRE`: 全て<br/>- `USER_CUSTOM`: ユーザー指定 |
| dbUserApplyType | Enum | Y | DBユーザールールの適用方式<br/>- `ENTIRE`: 全て<br/>- `USER_CUSTOM`: ユーザー指定 |
| databaseIds | Array | N | ユーザー指定データベースの識別子リスト |
| dbUserIds | Array | N | ユーザー指定DBユーザーの識別子リスト |
| address | String | Y | 接続アドレス<br/>- CIDR形式、ホスト名またはドメイン形式で入力 |
| authMethod | Enum | Y | 認証方式<br/>- `TRUST`: トラスト(パスワード不要)<br/>- `REJECT`: 接続ブロック<br/>- `SCRAM_SHA_256`: パスワード(SCRAM-SHA-256) |

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
| RDSforPostgreSQL:DbInstance.Modify | アクセス制御ルールの適用 |

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
| RDSforPostgreSQL:DbInstanceHba.Modify | アクセス制御ルールの順序調整 |

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

### アクセス制御設定の削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Delete | アクセス制御設定の削除 |

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
| RDSforPostgreSQL:DbInstanceHba.Modify | アクセス制御ルールの修正 |

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
"address": "192.168.0.10/32",
"authMethod": "TRUST"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| connectionTypeCode | Enum | N | アクセス制御レコードのタイプ<br/>- `HOST`: TCP/IPでの接続時に有効<br/>- `HOST_NO_SSL`: SSL暗号化を使用しない接続時のみ有効 |
| databaseApplyType | Enum | Y | データベースルールの適用方式<br/>- `ENTIRE`: 全て<br/>- `USER_CUSTOM`: ユーザー指定 |
| dbUserApplyType | Enum | Y | DBユーザールールの適用方式<br/>- `ENTIRE`: 全て<br/>- `USER_CUSTOM`: ユーザー指定 |
| databaseIds | Array | N | ユーザー指定データベースの識別子リスト |
| dbUserIds | Array | N | ユーザー指定DBユーザーの識別子リスト |
| address | String | Y | 接続アドレス<br/>- CIDR形式、ホスト名またはドメイン形式で入力 |
| authMethod | Enum | Y | 認証方式<br/>- `TRUST`: トラスト(パスワード不要)<br/>- `REJECT`: 接続ブロック<br/>- `SCRAM_SHA_256`: パスワード(SCRAM-SHA-256) |

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
| haStatus | Enum | 高可用性の状態<br/>- `CREATED`: 作成済み<br/>- `STABLE`: 正常<br/>- `PAUSING`: 一時停止中<br/>- `PAUSED`: 一時停止<br/>- `PAUSED_DUE_TO_TASK`: ジョブによる一時停止<br/>- `DISABLE_REPLICATION_DELAY`: レプリケーション遅延によるフェイルオーバーの停止<br/>- `FAILOVER_STARTED`: フェイルオーバー開始<br/>- `FAILOVER_FAILED`: フェイルオーバー失敗<br/>- `FAILOVER_COMPLETED`: フェイルオーバー完了<br/>- `DELETED`: 削除済み |
| pingInterval | Number | Ping間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| failoverReplWaitingTime | Number | 高可用性使用時のフェイルオーバー待機時間<br/>- `-1`に設定時、レプリケーション遅延が解消されるまで待機し続けます。<br/>- 最小値: `-1` |

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
| failoverReplWaitingTime | Number | N | 高可用性使用時のフェイルオーバー待機時間<br/>- `-1`に設定時、レプリケーション遅延が解消されるまで待機し続けます。<br/>- 最小値: `-1` |

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
| maintWndDuration | Enum | メンテナンスウィンドウ<br/>- `HALF_AN_HOUR`: 30分<br/>- `ONE_HOUR`: 1時間<br/>- `ONE_HOUR_AND_HALF`: 1時間30分<br/>- `TWO_HOURS`: 2時間<br/>- `TWO_HOURS_AND_HALF`: 2時間30分<br/>- `THREE_HOURS`: 3時間 |
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
| maintWndDuration | Enum | N | メンテナンスウィンドウ<br/>- `HALF_AN_HOUR`: 30分<br/>- `ONE_HOUR`: 1時間<br/>- `ONE_HOUR_AND_HALF`: 1時間30分<br/>- `TWO_HOURS`: 2時間<br/>- `TWO_HOURS_AND_HALF`: 2時間30分<br/>- `THREE_HOURS`: 3時間 |
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
"subnetName": "Default Network",
"subnetCidr": "192.168.0.0/24",
"publicAccessible": false
},
"endPoints": [
{
"domain": "ea548a78-d85f-43b4-8ddf-c88d999b9905.internal.kr1.postgres.rds.nhncloudservice.com",
"ipAddress": "192.168.0.1",
"endPointType": "INTERNAL"
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
| endPoints.endPointType | Enum | 接続情報のタイプ<br/>- `EXTERNAL`: 外部接続ドメイン<br/>- `INTERNAL`: 内部接続ドメイン<br/>- `PUBLIC`: (Deprecated) 外部接続ドメイン<br/>- `PRIVATE`: (Deprecated) 内部接続ドメイン |

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
"dbPort": 15432,
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
"dbVersion": "POSTGRESQL_V17_10",
"backupType": "AUTO",
"backupSize": 1,
"failoverCount": 1,
"walFileName": "000000010000000000000005",
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
| oldestRestorableYmdt | DateTime | 復元可能な最も早い時間 |
| latestRestorableYmdt | DateTime | 復元可能な最も最近の時間 |
| restorableBackups | Array | 復元可能なバックアップリスト |
| restorableBackups.backupId | UUID | バックアップの識別子 |
| restorableBackups.backupName | String | バックアップ名 |
| restorableBackups.backupStatus | Enum | バックアップ状態<br/>- `BACKING_UP`: バックアップ中の場合<br/>- `COMPLETED`: バックアップが完了した場合<br/>- `DELETING`: バックアップが削除中の場合<br/>- `DELETED`: バックアップが削除された場合<br/>- `ERROR`: エラーが発生した場合 |
| restorableBackups.dbInstanceId | UUID | 原本DBインスタンスの識別子 |
| restorableBackups.dbInstanceName | String | 原本DBインスタンス名 |
| restorableBackups.dbVersion | Enum | DBエンジンバージョン |
| restorableBackups.backupType | Enum | バックアップのタイプ<br/>- `AUTO`: 自動バックアップ<br/>- `MANUAL`: 手動バックアップ |
| restorableBackups.backupSize | Number | バックアップサイズ<br/>- 単位： `バイト` |
| restorableBackups.backupSize | Number | バックアップサイズ |
| restorableBackups.failoverCount | Number | フェイルオーバー回数 |
| restorableBackups.walFileName | String | WALファイル名 |
| restorableBackups.createdYmdt | DateTime | バックアップ作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| restorableBackups.updatedYmdt | DateTime | バックアップ更新日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| restorableBackups.startYmdt | DateTime | バックアップ開始日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| restorableBackups.completedYmdt | DateTime | バックアップ完了日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
"dbPort": 15432,
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
"periodicAutoBackupStrategyTypeCode": "DAILY_FULL",
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
| failoverReplWaitingTime | Number | N | 高可用性使用時のフェイルオーバー待機時間<br/>- `-1`に設定時、レプリケーション遅延が解消されるまで待機し続けます。<br/>- 最小値: `-1` |
| storage | Object | Y | ストレージ情報オブジェクト |
| storage.storageType | Enum | Y | ストレージタイプ |
| storage.storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最小値: `20` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.subnetId | UUID | Y | サブネットの識別子 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | N | DBインスタンスを作成するアベイラビリティゾーン |
| backup | Object | Y | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | Y | バックアップの保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.periodicAutoBackupStrategyTypeCode | Enum | N | 定期自動バックアップ戦略コード(DAILY_FULL/SNAPSHOT)<br/>- デフォルト値: `DAILY_FULL`<br/>- `SNAPSHOT`: 毎日スナップショットバックアップ<br/>- `DAILY_FULL`: 毎日フルバックアップ |
| backup.backupRetryCount | Number | N | バックアップの再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.replicationRegion | Enum | N | バックアップのレプリケーションリージョン<br/>- `KR1`: 韓国(パンギョ)<br/>- `KR2`: 韓国(ピョンチョン) |
| backup.backupSchedules | Array | Y | バックアップスケジュールリスト |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時間 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップウィンドウ<br/>- `HALF_AN_HOUR`: 30分<br/>- `ONE_HOUR`: 1時間<br/>- `ONE_HOUR_AND_HALF`: 1時間30分<br/>- `TWO_HOURS`: 2時間<br/>- `TWO_HOURS_AND_HALF`: 2時間30分<br/>- `THREE_HOURS`: 3時間 |
| restore | Object | Y | 復元情報オブジェクト |
| restore.restoreType | Enum | Y | 復元タイプ<br/>- BACKUP: `既存のバックアップを利用した復元`<br/>- TIMESTAMP: `復元可能時間内の時間を利用した時点復元` |
| restore.restoreYmdt | DateTime | N | DBインスタンス復元日時 |
| restore.backupId | UUID | N | 復元に使用するバックアップの識別子 |
| useDefaultNotification | Boolean | N | 基本通知の使用有無<br/>- デフォルト値: `false` |
| parameterGroupId | UUID | Y | パラメータグループの識別子 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |

#### Timestampを使用した時点復元時のリクエスト(restoreTypeが `TIMESTAMP`の場合)

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| restore.restoreYmdt | DateTime | Y | DBインスタンスの復元時間(YYYY-MM-DDThh:mm:ss.SSSTZD)<br/>- 復元情報の照会で照会した最も最新の復元可能な時間以前に対してのみ復元が可能です。 |

#### バックアップを使用した復元時のリクエスト(restoreTypeが `BACKUP`の場合)

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| restore.backupId | UUID | Y | 復元に使用するバックアップの識別子 |

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
| storageStatus | Enum | データストレージの現在状態<br/>- `DELETED`: 削除済み<br/>- `PENDING_DELETION`: 削除猶予中<br/>- `DELETION_RESERVED`: 削除予約済み（スナップショット整理待ち）<br/>- `DETACHED`: デタッチ<br/>- `ATTACHED`: アタッチ |

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

### バックアップリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Backup.List | バックアップリストを表示 |

#### リクエスト

```http
GET /v1.0/backups
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| page | Query | Number | Y | 照会するリストのページ<br/>- 最小値: `1` |
| size | Query | Number | Y | 照会するリストのページサイズ<br/>- 最小値: `1`<br/>- 最大値: `100` |
| backupType | Query | Enum | N | バックアップのタイプ<br/>- `AUTO`: 自動バックアップ<br/>- `MANUAL`: 手動バックアップ |
| dbInstanceId | Query | String | N | ソースDBインスタンスの識別子 |
| dbVersion | Query | Enum | N | DBエンジンバージョン |

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
"dbVersion": "POSTGRESQL_V17_10",
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
| backups.backupStatus | Enum | バックアップの現在の状態<br/>- `BACKING_UP`: バックアップ中の場合<br/>- `COMPLETED`: バックアップが完了した場合<br/>- `DELETING`: バックアップが削除中の場合<br/>- `DELETED`: バックアップが削除された場合(※コンソールでは削除済みアイコンが表示されます)<br/>- `ERROR`: エラーが発生した場合(※コンソールではエラーアイコンが表示されます) |
| backups.dbInstanceId | UUID | 原本DBインスタンスの識別子 |
| backups.dbVersion | Enum | DBエンジンバージョン |
| backups.backupType | Enum | バックアップのタイプ<br/>- `AUTO`: 自動バックアップ<br/>- `MANUAL`: 手動バックアップ |
| backups.backupSize | Number | バックアップサイズ<br/>- 単位： `バイト` |
| backups.startYmdt | DateTime | 開始日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| backups.createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| backups.updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| backups.completedYmdt | DateTime | 完了日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
"username": "example@nhncloud.com or example",
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
"dbPort": 15432,
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
"periodicAutoBackupStrategyTypeCode": "DAILY_FULL",
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
| failoverReplWaitingTime | Number | N | 高可用性使用時のフェイルオーバー待機時間<br/>- `-1`に設定時、レプリケーション遅延が解消されるまで待機し続けます。<br/>- 最小値: `-1` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.subnetId | UUID | Y | サブネットの識別子 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | N | DBインスタンスを作成するアベイラビリティゾーン |
| storage | Object | Y | ストレージ情報オブジェクト |
| storage.storageType | Enum | Y | ストレージタイプ |
| storage.storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最小値: `20` |
| backup | Object | Y | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | Y | バックアップの保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.periodicAutoBackupStrategyTypeCode | Enum | N | 定期自動バックアップ戦略コード(DAILY_FULL/SNAPSHOT)<br/>- デフォルト値: `DAILY_FULL`<br/>- `SNAPSHOT`: 毎日スナップショットバックアップ<br/>- `DAILY_FULL`: 毎日フルバックアップ |
| backup.backupRetryCount | Number | N | バックアップの再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.backupSchedules | Array | Y | バックアップスケジュールリスト |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時間 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップウィンドウ<br/>- `HALF_AN_HOUR`: 30分<br/>- `ONE_HOUR`: 1時間<br/>- `ONE_HOUR_AND_HALF`: 1時間30分<br/>- `TWO_HOURS`: 2時間<br/>- `TWO_HOURS_AND_HALF`: 2時間30分<br/>- `THREE_HOURS`: 3時間 |

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
| dbSecurityGroups.dbSecurityGroupStatus | Enum | DBセキュリティグループの現在状態<br/>- `CREATED`: 作成済み<br/>- `DELETED`: 削除済み |
| dbSecurityGroups.description | String | DBセキュリティグループの追加情報 |
| dbSecurityGroups.progressStatus | Enum | DBセキュリティグループの現在の進行状態<br/>- `NONE`: なし<br/>- `CREATING_RULE`: ルール作成中<br/>- `UPDATING_RULE`: ルール修正中<br/>- `DELETING_RULE`: ルール削除中<br/>- `APPLYING_DEFAULT_RULE`: デフォルトルール適用中 |
| dbSecurityGroups.createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbSecurityGroups.updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
| rules.direction | Enum | Y | 通信の方向<br/>- `INGRESS`: 受信<br/>- `EGRESS`: 送信 |
| rules.etherType | Enum | Y | Etherタイプ<br/>- `IPV4`: IPv4形式<br/>- `IPV6`: IPv6形式 |
| rules.port | Object | Y | ポートオブジェクト |
| rules.port.portType | Enum | Y | ポートタイプ<br/>- `ALL`: ポート範囲全体(ユーザーコンソールでは使用しない)<br/>- `PORT`: 特定のポート<br/>- `DB_PORT`: DB受信ポート<br/>- `PORT_RANGE`: ポート範囲 |
| rules.port.minPort | Number | N | ポート範囲の最小値<br/>- 最小値: `1` |
| rules.port.maxPort | Number | N | ポート範囲の最大値<br/>- 最大値: `65535` |

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
| dbSecurityGroup.dbSecurityGroupStatus | Enum | DBセキュリティグループの現在の状態<br/>- `CREATED`: 作成済み<br/>- `DELETED`: 削除済み |
| dbSecurityGroup.description | String | DBセキュリティグループの追加情報 |
| dbSecurityGroup.progressStatus | Enum | DBセキュリティグループの現在の進行状態<br/>- `NONE`: なし<br/>- `CREATING_RULE`: ルール作成中<br/>- `UPDATING_RULE`: ルール修正中<br/>- `DELETING_RULE`: ルール削除中<br/>- `APPLYING_DEFAULT_RULE`: デフォルトルール適用中 |
| dbSecurityGroup.rules | Array | DBセキュリティグループルールリスト |
| dbSecurityGroup.rules.ruleId | UUID | DBセキュリティグループルールの識別子 |
| dbSecurityGroup.rules.description | String | DBセキュリティグループルールの追加情報 |
| dbSecurityGroup.rules.direction | Enum | 通信の方向<br/>- `INGRESS`: 受信<br/>- `EGRESS`: 送信 |
| dbSecurityGroup.rules.etherType | Enum | Etherタイプ<br/>- `IPV4`: IPv4形式<br/>- `IPV6`: IPv6形式 |
| dbSecurityGroup.rules.port | Object | ポートオブジェクト |
| dbSecurityGroup.rules.port.portType | Enum | ポートタイプ<br/>- `ALL`: ポート範囲全体(ユーザーコンソールでは使用しない)<br/>- `PORT`: 特定のポート<br/>- `DB_PORT`: DB受信ポート<br/>- `PORT_RANGE`: ポート範囲 |
| dbSecurityGroup.rules.port.minPort | Number | ポート範囲の最小値 |
| dbSecurityGroup.rules.port.maxPort | Number | ポート範囲の最大値 |
| dbSecurityGroup.rules.cidr | String | CIDR |
| dbSecurityGroup.rules.createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbSecurityGroup.rules.updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbSecurityGroup.createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbSecurityGroup.updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
| direction | Enum | Y | 通信の方向<br/>- `INGRESS`: 受信<br/>- `EGRESS`: 送信 |
| etherType | Enum | Y | Etherタイプ<br/>- `IPV4`: IPv4形式<br/>- `IPV6`: IPv6形式 |
| port | Object | Y | ポート情報 |
| port.portType | Enum | Y | ポートタイプ<br/>- `ALL`: ポート範囲全体(ユーザーコンソールでは使用しない)<br/>- `PORT`: 特定のポート<br/>- `DB_PORT`: DB受信ポート<br/>- `PORT_RANGE`: ポート範囲 |
| port.minPort | Number | N | ポート範囲の最小値<br/>- 最小値: `1` |
| port.maxPort | Number | N | ポート範囲の最大値<br/>- 最大値: `65535` |

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
| direction | Enum | Y | 通信の方向<br/>- `INGRESS`: 受信<br/>- `EGRESS`: 送信 |
| etherType | Enum | Y | Etherタイプ<br/>- `IPV4`: IPv4形式<br/>- `IPV6`: IPv6形式 |
| port | Object | Y | ポート情報 |
| port.portType | Enum | Y | ポートタイプ<br/>- `ALL`: ポート範囲全体(ユーザーコンソールでは使用しない)<br/>- `PORT`: 特定のポート<br/>- `DB_PORT`: DB受信ポート<br/>- `PORT_RANGE`: ポート範囲 |
| port.minPort | Number | N | ポート範囲の最小値<br/>- 最小値: `1` |
| port.maxPort | Number | N | ポート範囲の最大値<br/>- 最大値: `65535` |

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

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbVersion | Query | Enum | N | DBエンジンバージョン |

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
"dbVersion": "POSTGRESQL_V17_10",
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
| parameterGroups.dbVersion | Enum | DBエンジンバージョン |
| parameterGroups.parameterGroupStatus | Enum | パラメータグループの現在の状態<br/>- `STABLE`: 適用完了<br/>- `NEED_TO_APPLY`: 適用が必要<br/>- `DELETED`: 削除済み |
| parameterGroups.createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| parameterGroups.updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
"dbVersion": "POSTGRESQL_V17_10"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | パラメータグループを識別できる名前 |
| description | String | N | パラメータグループの追加情報 |
| dbVersion | Enum | Y | DBエンジンバージョン |

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

### パラメータグループ詳細照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Get | パラメータグループ詳細照会 |

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
    "parameters": [
        {
            "parameterCategory": "parameterCategory-example",
            "parameterName": "parameterName-example",
            "value": "value-example",
            "valueUnit": "valueUnit-example",
            "defaultValue": "defaultValue-example",
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
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| parameterGroupId | UUID | パラメータグループの識別子 |
| parameterGroupName | String | パラメータグループを識別できる名前 |
| description | String | パラメータグループの追加情報 |
| dbVersion | Enum | DBエンジンバージョン |
| parameterGroupStatus | Enum | パラメータグループの現在の状態<br/>- `STABLE`: 適用完了<br/>- `NEED_TO_APPLY`: 適用が必要<br/>- `DELETED`: 削除済み |
| parameters | Array | パラメータ情報 |
| parameters.parameterCategory | String | パラメータカテゴリー |
| parameters.parameterName | String | パラメータ名 |
| parameters.value | String | 現在設定されている値 |
| parameters.valueUnit | Enum | 現在設定されている値の単位<br/>- `B`: バイト<br/>- `kB`: キロバイト<br/>- `MB`: メガバイト<br/>- `GB`: ギガバイト<br/>- `TB`: テラバイト<br/>- `us`: マイクロ秒<br/>- `ms`: ミリ秒<br/>- `s`: 秒<br/>- `min`: 分<br/>- `h`: 時<br/>- `d`: 日 |
| parameters.defaultValue | String | デフォルト値 |
| parameters.allowedValue | String | 許可された値 |
| parameters.valueType | Enum | 値のタイプ<br/>- `BOOLEAN`: Booleanタイプ(例: on、off、true、false、yes、no、1、0)<br/>- `STRING`: 文字列タイプ<br/>- `NUMERIC`: 整数及び浮動小数点タイプ<br/>- `NUMERIC_WITH_BYTE_UNIT`: バイト単位の数値タイプ(例: 120kB、100MB)<br/>- `NUMERIC_WITH_TIME_UNIT`: 時間単位の数値タイプ(例: 120ms、100s、1d)<br/>- `ENUMERATED`: 許可された値に宣言された値のいずれか1つを入力<br/>- `MULTI_ENUMERATED`: 許可された値に宣言された値の中から複数入力(カンマ(,)で区切る) |
| parameters.updateType | Enum | 修正タイプ<br/>- `VARIABLE`: 動的、いつでも修正可能<br/>- `CONSTANT`: 修正不可 |
| parameters.applyType | Enum | 適用タイプ<br/>- `BOTH`: セッション、ファイル両方に適用<br/>- `SESSION`: セッションにのみ適用<br/>- `FILE`: ファイルにのみ適用 |
| parameters.expressionAvailable | Boolean | 数式の使用可否 |
| createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### パラメータグループの修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Modify | パラメータグループの修正 |

#### リクエスト

```http
PUT /v1.0/parameter-groups/{parameterGroupId}
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
POST /v1.0/parameter-groups/{parameterGroupId}/copy
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

### パラメータグループ内のパラメータ修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Modify | パラメータグループ内のパラメータ修正 |

#### リクエスト

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/parameters
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
    "modifiedParameters": [
        {
            "parameterName": "parameterName-example",
            "value": "value-example"
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
PUT /v1.0/parameter-groups/{parameterGroupId}/reset
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
GET /v1.0/user-groups
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
    "userGroups": [
        {
            "userGroupId": "550e8400-e29b-41d4-a716-446655440000",
            "userGroupName": "userGroupName-example",
            "userGroupStatus": "CREATED",
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| userGroups | Array | ユーザーグループ情報 |
| userGroups.userGroupId | UUID | ユーザーグループの識別子 |
| userGroups.userGroupName | String | ユーザーグループを識別できる名前 |
| userGroups.userGroupStatus | Enum | ユーザーグループの現在状態<br/>- `CREATED`<br/>- `DELETED` |
| userGroups.createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| userGroups.updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### ユーザーグループの作成

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Create | ユーザーグループの作成 |

#### リクエスト

```http
POST /v1.0/user-groups
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
    "userGroupName": "userGroupName-example",
    "memberIds": [],
    "selectAllYN": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| userGroupName | String | Y | ユーザーグループを識別できる名前 |
| memberIds | Array | Y | プロジェクトメンバーの識別子リスト |
| selectAllYN | Boolean | Y | プロジェクトメンバー全体選択有無<br/>- デフォルト値: `false` |

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
    "userGroupId": "550e8400-e29b-41d4-a716-446655440000"
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
DELETE /v1.0/user-groups/{userGroupId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y | ユーザーグループID |

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
GET /v1.0/user-groups/{userGroupId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y | ユーザーグループID |

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
    "userGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "userGroupName": "userGroupName-example",
    "userGroupTypeCode": "ENTIRE",
    "userGroupStatus": "CREATED",
    "members": [
        {
            "memberId": "550e8400-e29b-41d4-a716-446655440000"
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
PUT /v1.0/user-groups/{userGroupId}
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
    "userGroupName": "userGroupName-example",
    "memberIds": [],
    "selectAllYN": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| userGroupName | String | N | ユーザーグループを識別できる名前 |
| memberIds | Array | N | プロジェクトメンバーの識別子リスト |
| selectAllYN | Boolean | Y | プロジェクトメンバー全体選択有無<br/>- デフォルト値: `false` |

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
GET /v1.0/notification-groups
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
    "notificationGroups": [
        {
            "notificationGroupId": "550e8400-e29b-41d4-a716-446655440000",
            "notificationGroupName": "notificationGroupName-example",
            "notificationGroupStatus": "CREATED",
            "notifyEmail": false,
            "notifySms": false,
            "isEnabled": false,
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
| notificationGroups.notificationGroupStatus | Enum | 通知グループの現在の状態<br/>- `CREATED`: 作成済み<br/>- `DELETED`: 削除済み |
| notificationGroups.notifyEmail | Boolean | メール通知の有無 |
| notificationGroups.notifySms | Boolean | SMS通知の有無 |
| notificationGroups.isEnabled | Boolean | 有効かどうか |
| notificationGroups.createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| notificationGroups.updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### 通知グループの作成

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Create | 通知グループの作成 |

#### リクエスト

```http
POST /v1.0/notification-groups
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
    "notificationGroupName": "notificationGroupName-example",
    "notifyEmail": true,
    "notifySms": true,
    "isEnabled": true,
    "dbInstanceIds": [],
    "userGroupIds": []
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
    "notificationGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| notificationGroupId | UUID | 通知グループの識別子 |

---

### 通知グループの削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Delete | 通知グループの削除 |

#### リクエスト

```http
DELETE /v1.0/notification-groups/{notificationGroupId}
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
GET /v1.0/notification-groups/{notificationGroupId}
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
    "notificationGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "notificationGroupName": "notificationGroupName-example",
    "notificationGroupStatus": "CREATED",
    "notifyEmail": false,
    "notifySms": false,
    "isEnabled": false,
    "dbInstances": [
        {
            "dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
            "dbInstanceName": "dbInstanceName-example"
        }
    ],
    "userGroups": [
        {
            "userGroupId": "550e8400-e29b-41d4-a716-446655440000",
            "userGroupName": "userGroupName-example"
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
| notificationGroupStatus | Enum | 通知グループの現在の状態<br/>- `CREATED`: 作成済み<br/>- `DELETED`: 削除済み |
| notifyEmail | Boolean | メール通知の有無 |
| notifySms | Boolean | SMS通知の有無 |
| isEnabled | Boolean | 有効かどうか |
| dbInstances | Array | 監視対象のDBインスタンスリスト |
| dbInstances.dbInstanceId | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceName | String | DBインスタンスを識別できる名前 |
| userGroups | Array | ユーザーグループリスト |
| userGroups.userGroupId | UUID | ユーザーグループの識別子 |
| userGroups.userGroupName | String | ユーザーグループを識別できる名前 |
| createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### 通知グループの修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Modify | 通知グループの修正 |

#### リクエスト

```http
PUT /v1.0/notification-groups/{notificationGroupId}
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
    "notificationGroupName": "notificationGroupName-example",
    "notifyEmail": false,
    "notifySms": false,
    "isEnabled": false,
    "dbInstanceIds": [],
    "userGroupIds": []
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
GET /v1.0/notification-groups/{notificationGroupId}/watchdogs
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
    "notificationWatchdogs": [
        {
            "watchdogId": "550e8400-e29b-41d4-a716-446655440000",
            "metricName": "CPU_USAGE",
            "comparisonOperator": "LE",
            "threshold": 1,
            "duration": 1,
            "createdYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| notificationWatchdogs | Array | 監視設定情報 |
| notificationWatchdogs.watchdogId | UUID | 監視設定の識別子 |
| notificationWatchdogs.metricName | Enum | 監視対象の性能指標 |
| notificationWatchdogs.comparisonOperator | Enum | 監視対象の比較方法<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: > |
| notificationWatchdogs.threshold | Number | 監視対象のしきい値 |
| notificationWatchdogs.duration | Number | 監視対象の持続時間(分) |
| notificationWatchdogs.createdYmdt | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### 監視設定の作成

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Create | 監視設定の作成 |

#### リクエスト

```http
POST /v1.0/notification-groups/{notificationGroupId}/watchdogs
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
    "metricName": "CPU_USAGE",
    "comparisonOperator": "LE",
    "threshold": 0,
    "duration": 0
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| metricName | Enum | Y | 監視対象の性能指標 |
| comparisonOperator | Enum | Y | 監視対象の比較方法<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: > |
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
    "watchdogId": "550e8400-e29b-41d4-a716-446655440000"
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
DELETE /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
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
PUT /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
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
    "metricName": "CPU_USAGE",
    "comparisonOperator": "LE",
    "threshold": 0,
    "duration": 0
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| metricName | Enum | Y | 監視対象の性能指標 |
| comparisonOperator | Enum | Y | 監視対象の比較方法<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: > |
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
GET /v1.0/metric-statistics
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | Query | UUID | Y | DBインスタンスの識別子 |
| metricNames | Query | Array | Y | 照会指標リスト |
| from | Query | DateTime | Y | 開始日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| to | Query | DateTime | Y | 終了日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| interval | Query | Number | N | 照会間隔<br/>- 単位： `分`<br/>- デフォルト値: 開始/終了日時に応じて適切な値を自動選択します |

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
    "metricStatistics": [
        {
            "metricName": "metricName-example",
            "unit": "unit-example",
            "values": [
                {
                    "timestamp": 1,
                    "value": "value-example"
                }
            ]
        }
    ]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| metricStatistics | Array | 統計情報リスト |
| metricStatistics.metricName | String | 測定項目タイプ |
| metricStatistics.unit | String | 測定値単位 |
| metricStatistics.values | Array | 測定値リスト |
| metricStatistics.values.timestamp | Number | 測定時間 |
| metricStatistics.values.value | String | 測定値 |

---

### 性能指標リストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Metric.List | 性能指標リストを表示 |

#### リクエスト

```http
GET /v1.0/metrics
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
    "metrics": [
        {
            "metricName": "CPU_USAGE",
            "unit": "%"
        }
    ]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| metrics | Array | Metricリスト |
| metrics.metricName | Enum | 照会指標タイプ |
| metrics.unit | String | 測定値単位 |

---

## イベント

### イベントカテゴリー

イベントはカテゴリーに分類でき、次のとおりです。

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
GET /v1.0/event-codes
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
    "eventCodes": [
        {
            "eventCode": "DB_INSTANCE_02_01",
            "eventCategoryType": "ALL"
        }
    ]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| eventCodes | Array | イベントコードリスト |
| eventCodes.eventCode | Enum | イベントコード |
| eventCodes.eventCategoryType | Enum | イベントカテゴリータイプ<br/>- `ALL`: 全て<br/>- `DB_INSTANCE`: DBインスタンスで発生したイベント<br/>- `DB_SECURITY_GROUP`: DBセキュリティグループで発生したイベント<br/>- `MONITORING`: モニタリングで発生したイベント<br/>- `JOB`: JOBで発生したイベント<br/>- `BACKUP`: バックアップで発生したイベント<br/>- `TENANT`: テナントで発生したイベント |

---

### イベントリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Event.List | イベントリストを表示 |

#### リクエスト

```http
GET /v1.0/events
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| page | Query | Number | Y | 照会するリストのページ<br/>- 最小値: `1` |
| size | Query | Number | Y | 照会するリストのページサイズ<br/>- 最小値: `1`<br/>- 最大値: `100` |
| from | Query | DateTime | Y | 開始日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| to | Query | DateTime | Y | 終了日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| eventCategoryType | Query | Enum | Y | 照会するイベントカテゴリーのタイプ<br/>- `ALL`: 全て<br/>- `DB_INSTANCE`: DBインスタンスで発生したイベント<br/>- `DB_SECURITY_GROUP`: DBセキュリティグループで発生したイベント<br/>- `MONITORING`: モニタリングで発生したイベント<br/>- `JOB`: JOBで発生したイベント<br/>- `BACKUP`: バックアップで発生したイベント<br/>- `TENANT`: テナントで発生したイベント |
| sourceId | Query | UUID | N | イベントが発生した対象リソースの識別子 |
| keyword | Query | String | N | イベントメッセージに含まれる文字列の検索キーワード |

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
    "events": [
        {
            "eventCategoryType": "ALL",
            "eventCode": "DB_INSTANCE_02_01",
            "sourceId": "550e8400-e29b-41d4-a716-446655440000",
            "sourceName": "sourceName-example",
            "messages": [
                {
                    "langCode": "KO",
                    "message": "DBインスタンスの開始"
                }
            ],
            "eventYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| totalCounts | Number | 全体のイベントリスト数 |
| events | Array | イベントリスト |
| events.eventCategoryType | Enum | イベントカテゴリータイプ<br/>- `ALL`: 全て<br/>- `DB_INSTANCE`: DBインスタンスで発生したイベント<br/>- `DB_SECURITY_GROUP`: DBセキュリティグループで発生したイベント<br/>- `MONITORING`: モニタリングで発生したイベント<br/>- `JOB`: JOBで発生したイベント<br/>- `BACKUP`: バックアップで発生したイベント<br/>- `TENANT`: テナントで発生したイベント |
| events.eventCode | Enum | 発生したイベントのタイプ |
| events.sourceId | UUID | イベントソースの識別子 |
| events.sourceName | String | イベントソースを識別できる名前 |
| events.messages | Array | イベントメッセージのリスト |
| events.messages.langCode | Enum | 言語コード<br/>- `KO`<br/>- `EN`<br/>- `JA`<br/>- `ZH` |
| events.messages.message | String | イベントメッセージ |
| events.eventYmdt | DateTime | イベント発生日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---
