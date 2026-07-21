<!-- pre-align:aligned sig=6103ac3fb6eb -->

<a id="database-rds-for-postgresql-api-guide-api-v10-guide"></a>
## Database > RDS for PostgreSQL > APIガイド > API v1.0ガイド { #database-rds-for-postgresql-api-guide-api-v10-guide }

<a id="common-information-on-rds-for-postgresql-api"></a>
## RDS for PostgreSQL API 共通情報 { #common-information-on-rds-for-postgresql-api }

<a id="api-endpoint"></a>
### API エンドポイント { #api-endpoint }

| リージョン         | エンドポイント                                          |
|---------------|--------------------------------------------------|
| 韓国(パンギョ)リージョン | https://kr1-rds-postgres.api.nhncloudservice.com |

<a id="authentication-and-authorization"></a>
### 認証および権限 { #authentication-and-authorization }

RDS for PostgreSQLは、API呼び出し時の認証/認可のためにUser Access Keyトークンを使用します。User Access Keyトークンは、User Access Keyに基づいて発行されるBearerタイプの一時的なアクセストークンです。User Access Keyトークンの発行及び使用に関する詳細は、[User Access Keyトークン](/nhncloud/ja/public-api/user-access-key-token)を参照してください。
発行されたトークンはAppkeyと共にリクエストHeaderに含める必要があります。

| 名前                  | 種類     | 形式     | 必須 | 説明                                             |
|---------------------|--------|--------|----|------------------------------------------------|
| X-TC-APP-KEY        | Header | String | O  | RDS for PostgreSQLサービスのAppkeyまたはプロジェクト統合Appkey |
| X-NHN-AUTHORIZATION | Header | String | O  | Public APIで発行されたBearerタイプトークン                  |

また、プロジェクト権限によって呼び出せるAPIが制限されます。`RDS for PostgreSQL ADMIN`、`RDS for PostgreSQL VIEWER`のロールには、次のような基本権限が付与されており、プロジェクト内のロールグループ管理メニューで必要な権限のみを付与できます。

* `RDS for PostgreSQL ADMIN`のロールには、API実行に必要なすべての権限が付与されます。
* `RDS for PostgreSQL VIEWER`のロールには、情報を照会する権限のみ付与されます。
    * DBインスタンスを作成、修正、削除およびDBインスタンスを対象とするいかなる機能も使用できません。
    * ただし、通知グループとユーザーグループに関連する機能は使用できます。

APIリクエスト時、認証に失敗または権限がない場合、次のようなエラーが発生します。

| resultCode | resultMessage | 説明         |
|------------|---------------|------------|
| 80401      | Unauthorized  | 認証に失敗しました。 |
| 80403      | Forbidden     | 権限がありません。  |

<a id="response-common-information"></a>
### レスポンス共通情報 { #response-common-information }

すべてのAPIリクエストに`200 OK`でレスポンスします。詳しいレスポンス結果はレスポンス本文のヘッダを参照してください。

<a id="response-common-information-response-body"></a>
#### レスポンス本文

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
}
```

<a id="response-common-information-field"></a>
#### フィールド

| 名前            | データ型    | 説明                 |
|---------------|---------|--------------------|
| resultCode    | Number  | 結果コード(成功:0、その他:失敗) |
| resultMessage | String  | 結果メッセージ            |
| successful    | Boolean | 成否                 |

<a id="db-version"></a>
## DBバージョン { #db-version }

| DBバージョン            | 作成可否 |
|-------------------|----------|
| POSTGRESQL_V14_6  |          |
| POSTGRESQL_V14_15 |          |
| POSTGRESQL_V14_17 | O        |
| POSTGRESQL_V14_19 | O        |
| POSTGRESQL_V17_2  |          |
| POSTGRESQL_V17_4  | O        |
| POSTGRESQL_V17_6  | O        |

* ENUMタイプのdbVersionフィールドに対して該当値を使用できます。
* バージョンによっては、作成不可能な場合や復元不可能な場合があります。

<a id="view-db-version-list"></a>
### DBバージョンリストを表示 { #view-db-version-list }

```http
GET /v1.0/db-versions
```

<a id="view-db-version-list-required-permissions"></a>
#### 必要権限

| 権限名                            | 説明         |
|---------------------------------|-------------|
| RDSforPostgreSQL:DbVersion.List | DBバージョンリストを表示 |

<a id="view-db-version-list-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

<a id="view-db-version-list-response"></a>
#### レスポンス

| 名前                          | 種類  | 形式     | 説明                   |
|------------------------------|------|---------|-----------------------|
| dbVersions                   | Body | Array   | DBバージョンリスト             |
| dbVersions.dbVersion         | Body | String  | DBバージョン                |
| dbVersions.dbVersionName     | Body | String  | DBバージョン名               |
| dbVersions.restorableFromObs | Body | Boolean | オブジェクトストレージから復元可能かどうか |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbVersions": [
        {
            "dbVersion": "POSTGRESQL_V17_6",
            "dbVersionName": "PostgreSQL V17.6",
            "restorableFromObs": true
        }
    ]
}
```
</details>

<a id="specifications-of-db-instance"></a>
## DBインスタンス仕様 { #specifications-of-db-instance }

<a id="list-db-instance-specifications"></a>
### DBインスタンス仕様リストを表示 { #list-db-instance-specifications }

```http
GET /v1.0/db-flavors
```

<a id="list-db-instance-specifications-required-permissions"></a>
#### 必要権限

| 権限名                           | 説明              |
|--------------------------------|------------------|
| RDSforPostgreSQL:DbFlavor.List | DBインスタンス仕様リスト表示 |

<a id="list-db-instance-specifications-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

<a id="list-db-instance-specifications-response"></a>
#### レスポンス

| 名前                    | 種類  | 形式    | 説明             |
|------------------------|------|--------|-----------------|
| dbFlavors              | Body | Array  | DBインスタンス仕様リスト  |
| dbFlavors.dbFlavorId   | Body | UUID   | DBインスタンス仕様の識別子 |
| dbFlavors.dbFlavorName | Body | String | DBインスタンス仕様名  |
| dbFlavors.ram          | Body | Number | メモリ容量(MB)      |
| dbFlavors.vcpus        | Body | Number | CPUコア数       |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbFlavors": [
        {
            "dbFlavorId": "50be6d9c-02d6-4594-a2d4-12010eb65ec0",
            "dbFlavorName": "m2.c1m2",
            "ram": 2048,
            "vcpus": 1
        }
    ]
}
```
</details>

<a id="project-information"></a>
## プロジェクト情報 { #project-information }

<a id="list-regions"></a>
### リージョンリストを表示 { #list-regions }

```http
GET /v1.0/project/regions
```

<a id="list-regions-required-permissions"></a>
#### 必要権限

| 権限名                         | 説明        |
|------------------------------|------------|
| RDSforPostgreSQL:Project.Get | プロジェクト情報を照会 |

<a id="list-regions-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

<a id="list-regions-response"></a>
#### レスポンス

| 名前                | 種類  | 形式     | 説明                          |
|--------------------|------|---------|------------------------------|
| regions            | Body | Array   | リージョンリスト                       |
| regions.regionCode | Body | Enum    | リージョンコード<br/>- `KR1`:韓国(パンギョ)リージョン |
| regions.isEnabled  | Body | Boolean | リージョンが有効かどうか                   |

<details><summary>例</summary>

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
            "isEnabled": true
        }
    ]
}
```
</details>

<a id="list-project-members"></a>
### プロジェクトメンバーリストを表示 { #list-project-members }

```http
GET /v1.0/project/members
```

<a id="list-project-members-required-permissions"></a>
#### 必要権限

| 権限名                         | 説明        |
|------------------------------|------------|
| RDSforPostgreSQL:Project.Get | プロジェクト情報照会 |

<a id="list-project-members-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

<a id="list-project-members-response"></a>
#### レスポンス

| 名前                  | 種類  | 形式    | 説明             |
|----------------------|------|--------|-----------------|
| members              | Body | Array  | プロジェクトメンバーリスト     |
| members.memberId     | Body | UUID   | プロジェクトメンバーの識別子   |
| members.memberName   | Body | String | プロジェクトメンバーの名前    |
| members.emailAddress | Body | String | プロジェクトメンバーのメールアドレス |
| members.phoneNumber  | Body | String | プロジェクトメンバーの電話番号  |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "members": [
        {
            "memberId": "1b1d3627-507a-49ea-8cb7-c86dfa9caa58",
            "memberName": "ホン・ギルドン",
            "emailAddress": "gildong.hong@nhn.com",
            "phoneNumber": "+821012345678"
        }
    ]
}
```
</details>

<a id="network"></a>
## ネットワーク { #network }

<a id="list-subnets"></a>
### サブネットリストを表示 { #list-subnets }

```http
GET /v1.0/network/subnets
```

<a id="list-subnets-required-permissions"></a>
#### 必要権限

| 権限名                          | 説明       |
|-------------------------------|-----------|
| RDSforPostgreSQL:Network.List | サブネットリストを表示 |

<a id="list-subnets-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

<a id="list-subnets-response"></a>
#### レスポンス

| 名前                      | 種類  | 形式     | 説明              |
|--------------------------|------|---------|------------------|
| subnets                  | Body | Array   | サブネットリスト          |
| subnets.subnetId         | Body | UUID    | サブネットの識別子        |
| subnets.subnetName       | Body | String  | サブネットを識別できる名前 |
| subnets.subnetCidr       | Body | String  | サブネットのCIDR        |
| subnets.usingGateway     | Body | Boolean | ゲートウェイ使用有無      |
| subnets.availableIpCount | Body | Number  | 使用可能なIP数      |

<details>
<summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "subnets": [
        {
            "subnetId": "1b2a9b23-0725-4b92-8c78-35db66b8ad9f",
            "subnetName": "Default Network",
            "subnetCidr": "192.168.0.0/24",
            "usingGateway": true,
            "availableIpCount": 240
        }
    ]
}
```
</details>

<a id="storage"></a>
## ストレージ { #storage }

<a id="view-the-list-of-storage-types"></a>
### ストレージタイプリストを表示 { #view-the-list-of-storage-types }

```http
GET /v1.0/storage-types
```

<a id="view-the-list-of-storage-types-required-permissions"></a>
#### 必要権限

| 権限名                          | 説明           |
|-------------------------------|---------------|
| RDSforPostgreSQL:Storage.List | ストレージタイプリストを表示 |

<a id="view-the-list-of-storage-types-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

<a id="view-the-list-of-storage-types-response"></a>
#### レスポンス

| 名前          | 種類  | 形式   | 説明        |
|--------------|------|-------|------------|
| storageTypes | Body | Array | ストレージタイプリスト |

<details><summary>例</summary>

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

<a id="task-information"></a>
## 作業情報 { #task-information }

<a id="list-task-details"></a>
### 作業情報の詳細を表示 { #list-task-details }

```http
GET /v1.0/jobs/{jobId}
```

<a id="list-task-details-required-permissions"></a>
#### 必要権限

| 権限名                     | 説明         |
|--------------------------|-------------|
| RDSforPostgreSQL:Job.Get | 作業情報の詳細を表示 |

<a id="list-task-details-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前   | 種類 | 形式  | 必須 | 説明     |
|-------|-----|------|----|---------|
| jobId | URL | UUID | O  | 作業の識別子 |

<a id="list-task-details-response"></a>
#### レスポンス

| 名前                            | 種類  | 形式      | 説明                                                                                                                                                                                                                                                                                                                                                                                                             |
|--------------------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| jobId                          | Body | UUID     | 作業の識別子                                                                                                                                                                                                                                                                                                                                                                                                        |
| jobStatus                      | Body | Enum     | 作業の現在状態<br/>- `PREPARING`:作業が準備中の場合<br/>- `READY`:作業が準備完了した場合<br/>- `RUNNING`:作業が進行中の場合<br/>- `COMPLETED`:作業が完了した場合<br/>- `REGISTERED`:作業が登録された場合<br/>- `WAIT_TO_REGISTER`:作業が登録待機中の場合<br/>- `INTERRUPTED`:作業進行中に割り込みが発生した場合<br/>- `CANCELED`:作業がキャンセルされた場合<br/>- `FAILED`:作業が失敗した場合<br/>- `ERROR`:作業進行中にエラーが発生した場合<br/>- `DELETED`:作業が削除された場合<br/>- `FAIL_TO_READY`:作業準備に失敗した場合 |
| resourceRelations              | Body | Array    | 関連リソースリスト                                                                                                                                                                                                                                                                                                                                                                                                      |
| resourceRelations.resourceType | Body | Enum     | 関連リソースタイプ<br/>- `DB_INSTANCE`: DBインスタンス<br/>- `DB_INSTANCE_GROUP`: DBインスタンスグループ<br/>- `DB_SECURITY_GROUP`: DBセキュリティグループ<br/>- `PARAMETER_GROUP`:パラメータグループ<br/>- `BACKUP`:バックアップ<br/>- `TENANT`:テナント                                                                                                                                                                                                                       |
| resourceRelations.resourceId   | Body | UUID     | 関連リソースの識別子                                                                                                                                                                                                                                                                                                                                                                                                    |
| createdYmdt                    | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                                                                                                                                                                                                                                               |
| updatedYmdt                    | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                                                                                                                                                                                                                                               |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c",
    "jobStatus": "RUNNING",
    "resourceRelations": [
        {
            "resourceType": "DB_INSTANCE",
            "resourceId": "56b39dcf-65eb-47ec-9d4f-09f160ba2266"
        }
    ],
    "createdYmdt": "2023-02-22T20:47:12+09:00",
    "updatedYmdt": "2023-02-22T20:49:46+09:00"
}
```
</details>

<a id="db-instance-group"></a>
## DBインスタンスグループ { #db-instance-group }

<a id="list-db-instances"></a>
### DBインスタンスグループリストを表示 { #list-db-instances }

```http
GET /v1.0/db-instance-groups
```

<a id="list-db-instances-required-permissions"></a>
#### 必要権限

| 権限名                                  | 説明              |
|---------------------------------------|------------------|
| RDSforPostgreSQL:DbInstanceGroup.List | DBインスタンスグループリストを表示 |

<a id="list-db-instances-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

<a id="list-db-instances-response"></a>
#### レスポンス

| 名前                                    | 種類  | 形式      | 説明                                                         |
|----------------------------------------|------|----------|-------------------------------------------------------------|
| dbInstanceGroups                       | Body | Array    | DBインスタンスグループリスト                                              |
| dbInstanceGroups.dbInstanceGroupId     | Body | UUID     | DBインスタンスグループの識別子                                            |
| dbInstanceGroups.dbInstanceGroupStatus | Body | Enum     | DBインスタンスグループの現在状態<br/>- `CREATED`:作成済み<br/>- `DELETED`:削除済み |
| dbInstanceGroups.replicationType       | Body | Enum     | DBインスタンスグループのレプリケーションタイプ<br/>- `STANDALONE`:単一                    |
| dbInstanceGroups.createdYmdt           | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                           |
| dbInstanceGroups.updatedYmdt           | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                           |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstanceGroups": [
        {
            "dbInstanceGroupId": "05de0746-89fd-49c8-94f9-9c5b1df97009",
            "dbInstanceGroupStatus": "CREATED",
            "replicationType": "STANDALONE",
            "createdYmdt": "2023-02-13T17:35:20+09:00",
            "updatedYmdt": "2023-02-13T17:35:20+09:00"
        }
    ]
}
```
</details>


<a id="list-db-instance-group-details"></a>
### DBインスタンスグループ詳細を表示 { #list-db-instance-group-details }

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}
```

<a id="list-db-instance-group-details-required-permissions"></a>
#### 必要権限

| 権限名                                 | 説明              |
|--------------------------------------|------------------|
| RDSforPostgreSQL:DbInstanceGroup.Get | DBインスタンスグループ詳細を表示 |

<a id="list-db-instance-group-details-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前               | 種類 | 形式  | 必須 | 説明             |
|-------------------|-----|------|----|-----------------|
| dbInstanceGroupId | URL | UUID | O  | DBインスタンスグループの識別子 |

<a id="list-db-instance-group-details-response"></a>
#### レスポンス

| 名前                          | 種類  | 形式      | 説明                                                                                                                                   |
|------------------------------|------|----------|---------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceGroupId            | Body | UUID     | DBインスタンスグループの識別子                                                                                                                      |
| dbInstanceGroupStatus        | Body | Enum     | DBインスタンスグループの現在状態<br/>- `CREATED`:作成済み<br/>- `DELETED`:削除済み                                                                          |
| replicationType              | Body | Enum     | DBインスタンスグループのレプリケーションタイプ<br/>- `STANDALONE`:単一<br/>- `HIGH_AVAILABILITY`:高可用性                                                             |
| dbInstances                  | Body | Array    | DBインスタンスグループに属するDBインスタンスリスト                                                                                                            |
| dbInstances.dbInstanceId     | Body | UUID     | DBインスタンスの識別子                                                                                                                         |
| dbInstances.dbInstanceType   | Body | Enum     | DBインスタンスのロールタイプ<br/>- `MASTER`:マスター<br/>- `FAILED_MASTER`:フェイルオーバーされたマスター<br/>- `CANDIDATE_MASTER`:予備マスター<br/>- `READ_ONLY_SLAVE`:リードレプリカ |
| dbInstances.dbInstanceStatus | Body | Enum     | DBインスタンスの現在状態                                                                                                                       |
| createdYmdt                  | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |
| updatedYmdt                  | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstanceGroupId": "36617a8e-0df8-4b16-b6ea-6306019e95da",
    "dbInstanceGroupStatus": "CREATED",
    "replicationType": "STANDALONE",
    "dbInstances": [
        {
            "dbInstanceId": "6d2db0ef-fe9b-4ed4-97b1-d97fcb4cf1b8",
            "dbInstanceType": "MASTER",
            "dbInstanceStatus": "AVAILABLE"
        }
    ],
    "createdYmdt": "2023-03-03T17:38:14+09:00",
    "updatedYmdt": "2023-03-03T17:38:14+09:00"
}
```
</details>

<a id="db-instance-group-manage-extensions"></a>
## DBインスタンスグループ > 拡張機能管理 { #db-instance-group-manage-extensions }

<a id="view-extension-list"></a>
### 拡張機能リスト表示 { #view-extension-list }

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions
```

<a id="view-extension-list-required-permission"></a>
#### 必要権限

| 権限名                                          | 説明     |
|------------------------------------------------|----------|
| RDSforPostgreSQL:DbInstanceGroupExtension.List | 拡張機能リスト照会 |

<a id="view-extension-list-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前              | 種類 | 形式 | 必須 | 説明            |
|-------------------|-----|------|----|-----------------|
| dbInstanceGroupId | URL | UUID | O  | DBインスタンスグループの識別子 |

<a id="view-extension-list-response"></a>
#### レスポンス

| 名前                                                | 種類 | 形式    | 説明                                                                                                                                                                                            |
|-----------------------------------------------------|------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| extensions                                          | Body | Array   | 拡張機能リスト                                                                                                                                                                                         |
| extensions.extensionId                              | Body | UUID    | 拡張機能の識別子                                                                                                                                                                                       |
| extensions.extensionName                            | Body | String  | 拡張機能名                                                                                                                                                                                         |
| extensions.extensionStatus                          | Body | ENUM    | 拡張機能の状態<br/>- `AVAILABLE`:使用可能<br/>- `NEED_TO_APPLY`:適用必要<br/>- `APPLYING`:適用中                                                                                                             |
| extensions.databases                                | Body | Array   | 拡張機能がインストールされたデータベース情報                                                                                                                                                                             |
| extensions.databases.dbInstanceGroupExtensionId     | Body | UUID    | DBインスタンスグループ内の拡張機能の識別子                                                                                                                                                                          |
| extensions.databases.dbInstanceGroupExtensionStatus | Body | ENUM    | DBインスタンスグループ内の拡張機能の状態<br/>- `CREATED`:作成済み<br/>- `INSTALLED`:インストール済み<br/>- `INSTALLING`:インストール中<br/>- `INSTALL_ERROR`:インストールエラー<br/>- `DELETED`:削除済み<br/>- `DELETING`:削除中<br/>- `DELETE_ERROR`:削除エラー |
| extensions.databases.databaseId                     | Body | UUID    | データベースの識別子                                                                                                                                                                                   |
| extensions.databases.databaseName                   | Body | String  | データベース名                                                                                                                                                                                     |
| extensions.databases.reservedAction                 | Body | ENUM    | 予約タスク<br/>- `NONE`:なし<br/>- `INSTALL`:インストール予約(適用必要)<br/>- `INSTALL_WITH_CASCADE`:強制インストール予約(適用必要)<br/>- `DELETE`:削除予約(適用必要)<br/>- `DELETE_WITH_CASCADE`:強制削除予約(適用必要)                |
| extensions.databases.errorReason                    | Body | String  | エラー原因                                                                                                                                                                                         |
| isNeedToApply                                       | Body | Boolean | 変更事項の適用が必要かどうか                                                                                                                                                                                |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "extensions": [
        {
            "extensionId": "7c9a94b8-86c1-435d-8af2-82a5e9d53fd4",
            "extensionName": "address_standardizer",
            "extensionStatus": "AVAILABLE",
            "databases": [
                {
                    "dbInstanceGroupExtensionId": "7c9a94b8-86c1-435d-8af2-82a5e9d53fd4",
                    "databaseId": "7c9a94b8-86c1-435d-8af2-82a5e9d53fd4",
                    "databaseName": "database-1",
                    "dbInstanceGroupExtensionStatus": "INSTALLED",
                    "reservedAction": "NONE",
                    "errorReason": null
                }
            ]
        }
    ],
    "isNeedToApply": true
}
```
</details>


<a id="install-extensions"></a>
### 拡張機能のインストール { #install-extensions }

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{extensionId}
```

<a id="install-extensions-required-permission"></a>
#### 必要権限

| 権限名                                             | 説明  |
|---------------------------------------------------|-------|
| RDSforPostgreSQL:DbInstanceGroupExtension.Install | 拡張機能のインストール |

<a id="install-extensions-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前              | 種類 | 形式    | 必須 | 説明              |
|-------------------|------|---------|----|-------------------|
| dbInstanceGroupId | URL  | UUID    | O  | DBインスタンスグループの識別子 |
| extensionId       | URL  | UUID    | O  | 拡張機能の識別子         |
| databaseId        | Body | UUID    | O  | インストール対象データベースの識別子 |
| schemaName        | Body | String  | O  | インストール対象スキーマ名    |
| withCascade       | Body | Boolean | X  | 依存情報を強制的にインストールするかどうか   |

<a id="install-extensions-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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


<a id="delete-extensions-cancel"></a>
### 拡張機能の削除(キャンセル) { #delete-extensions-cancel }

```http
DELETE /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{dbInstanceGroupExtensionId}
```

<a id="delete-extensions-cancel-required-permission"></a>
#### 必要権限

| 権限名                                            | 説明      |
|--------------------------------------------------|-----------|
| RDSforPostgreSQL:DbInstanceGroupExtension.Delete | 拡張機能の削除(キャンセル) |

<a id="delete-extensions-cancel-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前                       | 種類  | 形式    | 必須 | 説明                 |
|----------------------------|-------|---------|----|----------------------|
| dbInstanceGroupId          | URL   | UUID    | O  | DBインスタンスグループの識別子    |
| dbInstanceGroupExtensionId | URL   | UUID    | O  | DBインスタンスグループ内の拡張機能の識別子 |
| withCascade                | Query | Boolean | O  | 依存情報を強制的に削除するかどうか      |

<a id="delete-extensions-cancel-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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


<a id="apply-extension-changes"></a>
### 拡張機能変更事項適用 { #apply-extension-changes }

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/apply
```

<a id="apply-extension-changes-required-permission"></a>
#### 必要権限

| 権限名                                           | 説明       |
|-------------------------------------------------|------------|
| RDSforPostgreSQL:DbInstanceGroupExtension.Apply | 拡張機能変更事項適用 |

<a id="apply-extension-changes-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前                       | 種類  | 形式    | 必須 | 説明                 |
|----------------------------|-------|---------|----|----------------------|
| dbInstanceGroupId          | URL   | UUID    | O  | DBインスタンスグループの識別子    |

<a id="apply-extension-changes-response"></a>
#### レスポンス

| 名前  | 種類 | 形式 | 説明        |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
  "header": {
    "resultCode": 0,
    "resultMessage": "SUCCESS",
    "isSuccessful": true
  },
  "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>


<a id="synchronize-extensions"></a>
### 拡張機能の同期 { #synchronize-extensions }

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/sync
```

<a id="synchronize-extensions-required-permission"></a>
#### 必要権限

| 権限名                                          | 説明   |
|------------------------------------------------|--------|
| RDSforPostgreSQL:DbInstanceGroupExtension.Sync | 拡張機能の同期 |

<a id="synchronize-extensions-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前                       | 種類  | 形式    | 必須 | 説明                 |
|----------------------------|-------|---------|----|----------------------|
| dbInstanceGroupId          | URL   | UUID    | O  | DBインスタンスグループの識別子    |

<a id="synchronize-extensions-response"></a>
#### レスポンス

| 名前  | 種類 | 形式 | 説明        |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
  "header": {
    "resultCode": 0,
    "resultMessage": "SUCCESS",
    "isSuccessful": true
  },
  "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>


<a id="db-instance"></a>
## DBインスタンス { #db-instance }

<a id="db-instance-status"></a>
### DBインスタンスの状態 { #db-instance-status }

| 状態                 | 説明                         |
|---------------------|-----------------------------|
| `AVAILABLE`         | DBインスタンスが使用可能な場合         |
| `BEFORE_CREATE`     | DBインスタンス作成前の場合           |
| `STORAGE_FULL`      | DBインスタンスの容量が不足している場合        |
| `FAIL_TO_CREATE`    | DBインスタンス作成に失敗した場合         |
| `FAIL_TO_CONNECT`   | DBインスタンス接続に失敗した場合         |
| `REPLICATION_STOP`  | DBインスタンスの複製が中断された場合        |
| `REPLICATION_DELAY` | DBインスタンスの複製が遅延している場合      |
| `FAILOVER`          | 高可用性DBインスタンスのフェイルオーバーが完了した場合 |
| `SHUTDOWN`          | DBインスタンスが中止された場合            |
| `DELETED`           | DBインスタンスが削除された場合            |

<a id="db-instance-progress-status"></a>
### DBインスタンスの進行状態 { #db-instance-progress-status }

| 状態                             | 説明            |
|---------------------------------|----------------|
| `APPLYING_DB_INSTANCE_HBA_RULE` | アクセス制御ルール適用中 |
| `APPLYING_PARAMETER_GROUP`      | パラメータグループ適用中  |
| `APPLYING_EXTENSION`            | 拡張機能の適用中      |
| `BACKING_UP`                    | バックアップ中          |
| `CANCELING`                     | キャンセル中          |
| `CREATING`                      | 作成中          |
| `CREATING_DATABASE`             | データベース作成中	   |
| `CREATING_USER`                 | ユーザー作成中	      |
| `DELETING`                      | 削除中          |
| `DELETING_DATABASE`             | データベース削除中   |
| `DELETING_USER`                 | ユーザー削除中      |
| `EXPORTING_BACKUP`              | バックアップをエクスポート中    |
| `FAILING_OVER`                  | フェイルオーバー中       |
| `MIGRATING`                     | マイグレーション中      |
| `MODIFYING`                     | 修正中          |
| `OCCUPIED`                      | 占有中           |
| `PREPARING`                     | 準備中          |
| `PROMOTING`                     | 昇格中          |
| `PROMOTING_FORCIBLY`            | 強制昇格中       |
| `REBUILDING`                    | 再構築中         |
| `REPAIRING`                     | 復旧中          |
| `REPLICATING`                   | 複製中          |
| `RESTARTING`                    | 再起動中         |
| `RESTARTING_FORCIBLY`           | 強制再起動中      |
| `RESTORING`                     | 復元中          |
| `STARTING`                      | 起動中          |
| `STOPPING`                      | 停止中          |
| `SYNCING_DATABASE`              | データベース同期中  |
| `SYNCING_USER`                  | ユーザー同期中	     |
| `SYNCING_EXTENSION`             | 拡張機能の同期中	      |
| `UPDATING_USER`                 | ユーザー修正中	      |
| `UPDATING_DATABASE`             | データベース修正中	   |
| `WAIT_MANUAL_CONTROL`           | 手動フェイルオーバー待機中	 |

<a id="db-instance-list-db-instances"></a>
### DBインスタンスリストを表示 { #db-instance-list-db-instances }

```http
GET /v1.0/db-instances
```

<a id="db-instance-list-db-instances-required-permissions"></a>
#### 必要権限

| 権限名                             | 説明           |
|----------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.List | DBインスタンスリストを表示 |

<a id="db-instance-list-db-instances-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

<a id="db-instance-list-db-instances-response"></a>
#### レスポンス

| 名前                           | 種類  | 形式      | 説明                                                                                                                                   |
|-------------------------------|------|----------|---------------------------------------------------------------------------------------------------------------------------------------|
| dbInstances                   | Body | Array    | DBインスタンスリスト                                                                                                                           |
| dbInstances.dbInstanceId      | Body | UUID     | DBインスタンスの識別子                                                                                                                         |
| dbInstances.dbInstanceGroupId | Body | UUID     | DBインスタンスグループの識別子                                                                                                                      |
| dbInstances.dbInstanceName    | Body | String   | DBインスタンスを識別できる名前                                                                                                                 |
| dbInstances.description       | Body | String   | DBインスタンスの追加情報                                                                                                                    |
| dbInstances.dbVersion         | Body | Enum     | DBバージョン情報                                                                                                                             |
| dbInstances.dbPort            | Body | Number   | DBポート                                                                                                                                |
| dbInstances.dbInstanceType    | Body | Enum     | DBインスタンスのロールタイプ<br/>- `MASTER`:マスター<br/>- `FAILED_MASTER`:フェイルオーバーされたマスター<br/>- `CANDIDATE_MASTER`:予備マスター<br/>- `READ_ONLY_SLAVE`:リードレプリカ |
| dbInstances.dbInstanceStatus  | Body | Enum     | DBインスタンスの現在状態                                                                                                                       |
| dbInstances.progressStatus    | Body | Enum     | DBインスタンスの現在進行状態                                                                                                                    |
| dbInstances.createdYmdt       | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |
| dbInstances.updatedYmdt       | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstances": [
        {
            "dbInstanceId": "d067593b-1acc-4ccc-9e8a-cc72d6d79ec3",
            "dbInstanceGroupId": "51c7d080-ff36-4025-84b1-9d9d0b4fe9e0",
            "dbInstanceName": "db-instance",
            "description": null,
            "dbVersion": "POSTGRESQL_V17_6",
            "dbPort": 15432,
            "dbInstanceType": "MASTER",
            "dbInstanceStatus": "AVAILABLE",
            "progressStatus": "NONE",
            "createdYmdt": "2023-01-23T12:03:13+09:00",
            "updatedYmdt": "2023-02-02T17:20:17+09:00"
        }
    ]
}
```
</details>


<a id="list-db-instance-details"></a>
### DBインスタンス詳細を表示 { #list-db-instance-details }

```http
GET /v1.0/db-instances/{dbInstanceId}
```

<a id="list-db-instance-details-required-permissions"></a>
#### 必要権限

| 権限名                            | 説明           |
|---------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンス詳細を表示 |

<a id="list-db-instance-details-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="list-db-instance-details-response"></a>
#### レスポンス

| 名前                       | 種類  | 形式      | 説明                                                                                                                                   |
|---------------------------|------|----------|---------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId              | Body | UUID     | DBインスタンスの識別子                                                                                                                         |
| dbInstanceGroupId         | Body | UUID     | DBインスタンスグループの識別子                                                                                                                      |
| dbInstanceName            | Body | String   | DBインスタンスを識別できる名前                                                                                                                 |
| description               | Body | String   | DBインスタンスの追加情報                                                                                                                    |
| dbVersion                 | Body | Enum     | DBバージョン情報                                                                                                                             |
| dbPort                    | Body | Number   | DBポート                                                                                                                                |
| dbInstanceType            | Body | Enum     | DBインスタンスのロールタイプ<br/>- `MASTER`:マスター<br/>- `FAILED_MASTER`:フェイルオーバーされたマスター<br/>- `CANDIDATE_MASTER`:予備マスター<br/>- `READ_ONLY_SLAVE`:リードレプリカ |
| dbInstanceStatus          | Body | Enum     | DBインスタンスの現在状態                                                                                                                       |
| progressStatus            | Body | Enum     | DBインスタンスの現在の作業進行状態                                                                                                                 |
| dbFlavorId                | Body | UUID     | DBインスタンス仕様の識別子                                                                                                                      |
| parameterGroupId          | Body | UUID     | DBインスタンスに適用されたパラメータグループの識別子                                                                                                            |
| dbSecurityGroupIds        | Body | Array    | DBインスタンスに適用されたDBセキュリティグループの識別子リスト                                                                                                        |
| notificationGroupIds      | Body | Array    | DBインスタンスに適用された通知グループの識別子リスト                                                                                                           |
| useDeletionProtection     | Body | Boolean  | DBインスタンス削除保護の有無                                                                                                                      |
| needToApplyParameterGroup | Body | Boolean  | 最新パラメータグループの適用可否                                                                                                                   |
| needMigration             | Body | Boolean  | マイグレーションの要否                                                                                                                          |
| osVersion                 | Body | String   | OSバージョン                                                                                                                              |
| createdYmdt               | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |
| updatedYmdt               | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstanceId": "d067593b-1acc-4ccc-9e8a-cc72d6d79ec3",
    "dbInstanceGroupId": "51c7d080-ff36-4025-84b1-9d9d0b4fe9e0",
    "dbInstanceName": "db-instance",
    "description": null,
    "dbVersion": "POSTGRESQL_V17_6",
    "dbPort": 15432,
    "dbInstanceType": "MASTER",
    "dbInstanceStatus": "AVAILABLE",
    "progressStatus": "NONE",
    "dbFlavorId": "e9ed4ef6-78d7-46fa-ace9-32481e97f3b7",
    "parameterGroupId": "b03e8b13-de27-4d04-a488-ff5689589372",
    "dbSecurityGroupIds": ["01908c35-d2c9-4852-baf0-17f06ec42c03"],
    "notificationGroupIds": ["83a62a33-ddbf-4a04-8653-e54463d5b1ac"],
    "useDeletionProtection": false,
    "needToApplyParameterGroup": false,
    "needMigration": false,
    "createdYmdt": "2022-11-23T12:03:13+09:00",
    "updatedYmdt": "2022-12-02T17:20:17+09:00"
}
```
</details>

<a id="create-db-instance"></a>
### DBインスタンスを作成する { #create-db-instance }

```http
POST /v1.0/db-instances
```

<a id="create-db-instance-required-permissions"></a>
#### 必要権限

| 権限名                               | 説明          |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Create | DBインスタンスを作成する |

<a id="create-db-instance-request"></a>
#### リクエスト

| 名前                                      | 種類  | 形式     | 必須 | 説明                                                                                                                                                                                                                  |
|------------------------------------------|------|---------|----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceName                           | Body | String  | O  | DBインスタンスを識別できる名前                                                                                                                                                                                                |
| description                              | Body | String  | X  | DBインスタンスの追加情報                                                                                                                                                                                                   |
| dbFlavorId                               | Body | UUID    | O  | DBインスタンス仕様の識別子                                                                                                                                                                                                     |
| dbVersion                                | Body | Enum    | O  | DBバージョン情報                                                                                                                                                                                                            |
| dbPort                                   | Body | Number  | O  | DBポート<br/>- 最小値:`5432`<br/>- 最大値:`45432`                                                                                                                                                                           |
| databaseName                             | Body | String  | O  | DBエンジン内で新規作成するデータベース名                                                                                                                                                                                              |
| dbUserName                               | Body | String  | O  | DBエンジン内で新規作成するユーザーアカウント名                                                                                                                                                                                              |
| dbPassword                               | Body | String  | O  | DBエンジン内で新規作成するユーザーアカウントのパスワード<br/>- 最小文字数:`4`<br/>- 最大文字数:`16`                                                                                                                                                          |
| parameterGroupId                         | Body | UUID    | O  | パラメータグループの識別子                                                                                                                                                                                                        |
| dbSecurityGroupIds                       | Body | Array   | X  | DBセキュリティグループの識別子リスト                                                                                                                                                                                                    |
| useDeletionProtection                    | Body | Boolean | X  | 削除保護の有無<br/>- デフォルト値:`false`                                                                                                                                                                                          |
| useDefaultNotification                   | Body | Boolean | X  | 基本通知の使用有無<br/>- デフォルト値:`false`                                                                                                                                                                                       |
| useHighAvailability                      | Body | Boolean | X  | 高可用性の使用有無                                                                                                                                                                                                           |
| pingInterval                             | Body | Number  | X  | 高可用性使用時のPing間隔(秒)<br/>- 最小値:`1`<br/>- 最大値:`600`                                                                                                                                                                 |
| failoverReplWaitingTime                  | Body | Number  | X  | 高可用性使用時のフェイルオーバー待機時間<br/>- 最小値:`-1`<br/>- -1に設定時、複製遅延が解消されるまで待機し続けます。                                                                                                                                         |                                                                                                                                                                                                                      | userGroupIds                             | Body | Array   | X  | 基本通知受信用のユーザーグループの識別子リスト                                                                                                                                                                                            |
| network                                  | Body | Object  | O  | ネットワーク情報オブジェクト                                                                                                                                                                                                          |
| network.subnetId                         | Body | UUID    | O  | サブネットの識別子                                                                                                                                                                                                            |
| network.usePublicAccess                  | Body | Boolean | X  | 外部接続可否<br/>- デフォルト値:`false`                                                                                                                                                                                      |
| network.availabilityZone                 | Body | Enum    | X  | DBインスタンスを作成するアベイラビリティゾーン<br/>- 例:`kr-pub-a`<br/>- デフォルト値:`任意のアベイラビリティゾーン`                                                                                                                                                     |
| storage                                  | Body | Object  | O  | ストレージ情報オブジェクト                                                                                                                                                                                                          |    
| storage.storageType                      | Body | Enum    | O  | データストレージタイプ<br/>- 例:`General SSD`                                                                                                                                                                                  |
| storage.storageSize                      | Body | Number  | O  | データストレージサイズ(GB)<br/>- 最小値:`20`<br/>- 最大値:`2048`                                                                                                                                                                    |
| backup                                   | Body | Object  | O  | バックアップ情報オブジェクト                                                                                                                                                                                                            |
| backup.backupPeriod                      | Body | Number  | O  | バックアップ保管期間(日)<br/>- 最小値:`0`<br/>- 最大値:`730`                                                                                                                                                                          |
| backup.backupRetryCount                  | Body | Number  | X  | バックアップ再試行回数<br/>- デフォルト値:`0`<br/>- 最小値:`0`<br/>- 最大値:`10`                                                                                                                                                              |
| backup.backupSchedules                   | Body | Array   | X  | バックアップスケジュールリスト                                                                                                                                                                                                           |
| backup.backupSchedules.backupWndBgnTime  | Body | String  | O  | バックアップ開始時間<br/>- 例:`00:00:00`                                                                                                                                                                                        |
| backup.backupSchedules.backupWndDuration | Body | Enum    | O  | バックアップWindows<br/>バックアップ開始時間から設定された期間内に自動バックアップが実行されます。<br/>- `HALF_AN_HOUR`:30分<br/>- `ONE_HOUR`:1時間<br/>- `ONE_HOUR_AND_HALF`:1時間30分<br/>- `TWO_HOURS`:2時間<br/>- `TWO_HOURS_AND_HALF`:2時間30分<br/>- `THREE_HOURS`:3時間 |

<details><summary>例</summary>

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

<a id="create-db-instance-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="modify-db-instance"></a>
### DBインスタンスを修正する { #modify-db-instance }

```http
PUT /v1.0/db-instances/{dbInstanceId}
```

<a id="modify-db-instance-required-permissions"></a>
#### 必要権限

| 権限名                               | 説明          |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスを修正する |

<a id="modify-db-instance-request"></a>
#### リクエスト

| 名前                | 種類  | 形式     | 必須 | 説明                                                                       |
|--------------------|------|---------|----|---------------------------------------------------------------------------|
| dbInstanceId       | URL  | UUID    | O  | DBインスタンスの識別子                                                             |
| dbInstanceName     | Body | String  | X  | DBインスタンスを識別できる名前                                                     |
| description        | Body | String  | X  | DBインスタンスの追加情報                                                        |
| dbPort             | Body | Number  | X  | DBポート<br/>- 最小値:`5432`<br/>- 最大値:`45432`                                |
| dbFlavorId         | Body | UUID    | X  | DBインスタンス仕様の識別子                                                          |
| parameterGroupId   | Body | UUID    | X  | パラメータグループの識別子                                                             |
| dbSecurityGroupIds | Body | Array   | X  | DBセキュリティグループの識別子リスト                                                         |
| executeBackup      | Body | Boolean | X  | 現時点バックアップを実行するかどうか<br/>- デフォルト値:`false`                                         |

<details><summary>例</summary>

```json
{
    "dbInstanceName": "db-instance2",
    "description": "description2",
    "dbPort": 25432,
    "dbSecurityGroupIds": [],
    "executeBackup": true
}
```
</details>

<a id="modify-db-instance-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>


<a id="get-high-availability-information"></a>
### 高可用性情報の照会 { #get-high-availability-information }

```http
GET /v1.0/db-instances/{dbInstanceId}/high-availability
```

<a id="get-high-availability-information-required-permissions"></a>
#### 必要権限

| 権限名                                  | 説明        |
|---------------------------------------|------------|
| RDSforPostgreSQL:HighAvailability.Get | 高可用性情報照会 |

<a id="get-high-availability-information-request"></a>
#### リクエスト

| 名前                 | 種類  | 形式     | 必須 | 説明                                                  |
|---------------------|------|---------|----|------------------------------------------------------|
| dbInstanceId        | URL  | UUID    | O  | DBインスタンスの識別子                                        |

<a id="get-high-availability-information-response"></a>
#### レスポンス

| 名前                     | 種類  | 形式     | 説明                                                                                                                                                                                                                                                                                                                            |
|-------------------------|------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| haStatus                | Body | Boolean | 高可用性状態<br/>- `CREATED`:作成済み<br/>- `STABLE`:正常<br/>- `DISABLE_REPLICATION_DELAY`:複製遅延によるフェイルオーバー停止<br/>- `PAUSING`:一時停止中<br/>- `PAUSED`:一時停止<br/>- `PAUSED_DUE_TO_TASK`:作業による一時停止<br/>- `FAILOVER_STARTED`:フェイルオーバー開始<br/>- `FAILOVER_FAILED`:フェイルオーバー失敗<br/>- `FAILOVER_COMPLETED`:フェイルオーバー完了<br/>- `DELETED`:削除済み |
| pingInterval            | Body | Number  | 高可用性使用時のPing間隔(秒)<br/>- 最小値:`1`<br/>- 最大値:`600`                                                                                                                                                                                                                                                                           |
| failoverReplWaitingTime | Body | Number  | 高可用性使用時のフェイルオーバー待機時間<br/>- 最小値:`-1`<br/>- -1に設定時、複製遅延が解消されるまで待機し続けます。                                                                                                                                                                                                                                                   |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "useHighAvailability": true,
    "haStatus": "STABLE",
    "pingInterval": 3,
    "failoverReplWaitingTime": 60
}
```
</details>


<a id="modify-high-availability"></a>
### 高可用性を修正する { #modify-high-availability }

```http
PUT /v1.0/db-instances/{dbInstanceId}/high-availability
```

<a id="modify-high-availability-required-permissions"></a>
#### 必要権限

| 権限名                                     | 説明       |
|------------------------------------------|-----------|
| RDSforPostgreSQL:HighAvailability.Modify | 高可用性を修正する |

<a id="modify-high-availability-request"></a>
#### リクエスト

| 名前                     | 種類  | 形式     | 必須 | 説明                                                                          |
|-------------------------|------|---------|----|------------------------------------------------------------------------------|
| dbInstanceId            | URL  | UUID    | O  | DBインスタンスの識別子                                                                |
| useHighAvailability     | Body | Boolean | O  | 高可用性の使用有無                                                                   |
| pingInterval            | Body | Number  | X  | 高可用性使用時のPing間隔(秒)<br/>- 最小値:`1`<br/>- 最大値:`600`                         |
| failoverReplWaitingTime | Body | Number  | X  | 高可用性使用時フェイルオーバー待機時間<br/>- 最小値:`-1`<br/>- -1に設定時、複製遅延が解消されるまで待機し続けます。 |

<a id="modify-high-availability-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="restart-high-availability"></a>
### 高可用性の再起動 { #restart-high-availability }

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/resume
```

<a id="restart-high-availability-required-permissions"></a>
#### 必要権限

| 権限名                                     | 説明          |
|------------------------------------------|--------------|
| RDSforPostgreSQL:HighAvailability.Resume | 高可用性の再起動 |

<a id="restart-high-availability-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="restart-high-availability-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>


<a id="pause-high-availability"></a>
### 高可用性の一時停止 { #pause-high-availability }

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/pause
```

<a id="pause-high-availability-required-permissions"></a>
#### 必要権限

| 権限名                                    | 説明          |
|-----------------------------------------|--------------|
| RDSforPostgreSQL:HighAvailability.Pause | 高可用性の一時停止 |

<a id="pause-high-availability-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="pause-high-availability-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>


<a id="recover-high-availability"></a>
### 高可用性の復旧 { #recover-high-availability }

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/repair
```

<a id="recover-high-availability-required-permissions"></a>
#### 必要権限

| 権限名                                     | 説明       |
|------------------------------------------|-----------|
| RDSforPostgreSQL:HighAvailability.Repair | 高可用性の復旧 |

<a id="recover-high-availability-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="recover-high-availability-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>


<a id="separate-high-availability"></a>
### 高可用性の分離 { #separate-high-availability }

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/split
```

<a id="separate-high-availability-required-permissions"></a>
#### 必要権限

| 権限名                                    | 説明       |
|-----------------------------------------|-----------|
| RDSforPostgreSQL:HighAvailability.Split | 高可用性の分離 |

<a id="separate-high-availability-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="separate-high-availability-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>


<a id="get-db-instance-storage-information"></a>
### DBインスタンスストレージ情報の照会 { #get-db-instance-storage-information }

```http
GET /v1.0/db-instances/{dbInstanceId}/storage-info
```

<a id="get-db-instance-storage-information-required-permissions"></a>
#### 必要権限

| 権限名                            | 説明           |
|---------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンス詳細を表示 |

<a id="get-db-instance-storage-information-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="get-db-instance-storage-information-response"></a>
#### レスポンス

| 名前              | 種類  | 形式     | 説明                                                                                  |
|------------------|------|---------|--------------------------------------------------------------------------------------|
| storageType      | Body | Enum    | データストレージタイプ                                                                         |
| storageSize      | Body | Number  | データストレージサイズ(GB)                                                                      |
| storageStatus    | Body | Enum    | データストレージの現在状態<br/>- `DETACHED`:デタッチ<br/>- `ATTACHED`:アタッチ<br/>- `DELETED`:削除済み |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "storageType": "General SSD",
    "storageSize": 20,
    "storageStatus": "ATTACHED"
}
```
</details>


<a id="modifying-db-instance-storage-information"></a>
### DBインスタンスストレージ情報の修正 { #modifying-db-instance-storage-information }

```http
PUT /v1.0/db-instances/{dbInstanceId}/storage-info
```

<a id="modifying-db-instance-storage-information-required-permissions"></a>
#### 必要権限

| 権限名                               | 説明          |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスの修正 |

<a id="modifying-db-instance-storage-information-request"></a>
#### リクエスト

| 名前               | 種類  | 形式     | 必須 | 説明                                                                       |
|-------------------|------|---------|----|---------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID    | O  | DBインスタンスの識別子                                                             |
| storageSize       | Body | Number  | O  | データストレージサイズ(GB)<br/>- 最小値:現在値<br/>- 最大値:`2048`                          |

<a id="modifying-db-instance-storage-information-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="get-db-instance-network-information"></a>
### DBインスタンスネットワーク情報の照会 { #get-db-instance-network-information }

```http
GET /v1.0/db-instances/{dbInstanceId}/network-info
```

<a id="get-db-instance-network-information-required-permissions"></a>
#### 必要権限

| 権限名                            | 説明           |
|---------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンス詳細を表示 |

<a id="get-db-instance-network-information-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="get-db-instance-network-information-response"></a>
#### レスポンス

| 名前                     | 種類  | 形式     | 説明                                                                                                                                     |
|-------------------------|------|---------|-----------------------------------------------------------------------------------------------------------------------------------------|
| availabilityZone        | Body | Enum    | DBインスタンスを作成するアベイラビリティゾーン                                                                                                                    |
| subnet                  | Body | Object  | サブネットオブジェクト                                                                                                                                 |
| subnet.subnetId         | Body | UUID    | サブネットの識別子                                                                                                                               |
| subnet.subnetName       | Body | UUID    | サブネットを識別できる名前                                                                                                                       |
| subnet.subnetCidr       | Body | UUID    | サブネットのCIDR                                                                                                                               |
| subnet.publicAccessible | Body | Boolean | 外部接続可否                                                                                                                            |
| endPoints               | Body | Array   | 接続情報リスト                                                                                                                               |
| endPoints.domain        | Body | String  | ドメイン                                                                                                                                    |
| endPoints.ipAddress     | Body | String  | IPアドレス                                                                                                                                  |
| endPoints.endPointType  | Body | Enum    | 接続情報タイプ<br>-`EXTERNAL`:外部接続ドメイン<br>-`INTERNAL`:内部接続ドメイン<br>-`PUBLIC`:(Deprecated)外部接続ドメイン<br>-`PRIVATE`:(Deprecated)内部接続ドメイン |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "availabilityZone": "kr-pub-a",
    "subnet": {
        "subnetId": "bd453789-34ae-416c-9f78-05b9e43a46be",
        "subnetName": "Default Network",
        "subnetCidr": "192.168.0.0/16",
        "publicAccessible": true
    },
    "endPoints": [
        {
            "domain": "ea548a78-d85f-43b4-8ddf-c88d999b9905.internal.kr1.postgres.rds.nhncloudservice.com",
            "ipAddress": "192.168.0.2",
            "endPointType": "INTERNAL"
        }
    ]
}
```
</details>

<a id="modifying-db-instance-network-information"></a>
### DBインスタンスネットワーク情報の修正 { #modifying-db-instance-network-information }

```http
PUT /v1.0/db-instances/{dbInstanceId}/network-info
```

<a id="modifying-db-instance-network-information-required-permissions"></a>
#### 必要権限

| 権限名                               | 説明          |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスの修正 |

<a id="modifying-db-instance-network-information-request"></a>
#### リクエスト

| 名前             | 種類  | 形式     | 必須 | 説明          |
|-----------------|------|---------|----|--------------|
| dbInstanceId    | URL  | UUID    | O  | DBインスタンスの識別子 |
| usePublicAccess | Body | Boolean | O  | 外部接続可否 |

<a id="modifying-db-instance-network-information-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="get-db-instance-backup-information"></a>
### DBインスタンスバックアップ情報の照会 { #get-db-instance-backup-information }

```http
GET /v1.0/db-instances/{dbInstanceId}/backup-info
```

<a id="get-db-instance-backup-information-required-permissions"></a>
#### 必要権限

| 権限名                            | 説明           |
|---------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンス詳細を表示 |

<a id="get-db-instance-backup-information-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="get-db-instance-backup-information-response"></a>
#### レスポンス

| 名前                                   | 種類  | 形式    | 説明                                                                                                                                                                                                                  |
|---------------------------------------|------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| backupPeriod                          | Body | Number | バックアップの保管期間(日)                                                                                                                                                                                                          |
| backupRetryCount                      | Body | Number | バックアップの再試行回数                                                                                                                                                                                                           |
| backupSchedules                       | Body | Array  | バックアップスケジュールリスト                                                                                                                                                                                                           |
| backupSchedules.backupWndBgnTime      | Body | String | バックアップ開始時間                                                                                                                                                                                                            |
| backupSchedules.backupWndDuration     | Body | Enum   | バックアップWindows<br/>バックアップ開始時間から設定された期間内に自動バックアップが実行されます。<br/>- `HALF_AN_HOUR`:30分<br/>- `ONE_HOUR`:1時間<br/>- `ONE_HOUR_AND_HALF`:1時間30分<br/>- `TWO_HOURS`:2時間<br/>- `TWO_HOURS_AND_HALF`:2時間30分<br/>- `THREE_HOURS`:3時間 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "backupPeriod": 1,
    "backupRetryCount": 0,
    "backupSchedules": [
        {
            "backupWndBgnTime": "00:00:00",
            "backupWndDuration": "ONE_HOUR_AND_HALF",
            "backupRetryExpireTime": "01:30:00"
        }
    ]
}
```
</details>

<a id="modifying-db-instance-backup-information"></a>
### DBインスタンスバックアップ情報の修正 { #modifying-db-instance-backup-information }

```http
PUT /v1.0/db-instances/{dbInstanceId}/backup-info
```

<a id="modifying-db-instance-backup-information-required-permissions"></a>
#### 必要権限

| 権限名                               | 説明          |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスの修正 |

<a id="modifying-db-instance-backup-information-request"></a>
#### リクエスト

| 名前                                   | 種類  | 形式    | 必須 | 説明                                                                                                                                                                                                                  |
|---------------------------------------|------|--------|----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId                          | URL  | UUID   | O  | DBインスタンスの識別子                                                                                                                                                                                                        |
| backupPeriod                          | Body | Number | X  | バックアップの保管期間(日)<br/>- 最小値:`0`<br/>- 最大値:`730`                                                                                                                                                                          |
| backupRetryCount                      | Body | Number | X  | バックアップの再試行回数<br/>- 最小値:`0`<br/>- 最大値:`10`                                                                                                                                                                             |
| backupSchedules                       | Body | Array  | X  | バックアップスケジュールリスト                                                                                                                                                                                                           |
| backupSchedules.backupWndBgnTime      | Body | String | O  | バックアップ開始時間<br/>- 例:`00:00:00`                                                                                                                                                                                        |
| backupSchedules.backupWndDuration     | Body | Enum   | O  | バックアップWindows<br/>バックアップ開始時間から設定された期間内に自動バックアップが実行されます。<br/>- `HALF_AN_HOUR`:30分<br/>- `ONE_HOUR`:1時間<br/>- `ONE_HOUR_AND_HALF`:1時間30分<br/>- `TWO_HOURS`:2時間<br/>- `TWO_HOURS_AND_HALF`:2時間30分<br/>- `THREE_HOURS`:3時間 |

<details><summary>例</summary>

```json
{
    "backupPeriod": 5,
    "backupSchedules": [
        {
            "backupWndBgnTime": "01:00:00",
            "backupWndDuration": "TWO_HOURS",
            "backupRetryExpireTime": "03:00:00"
        }
    ]
}
```
</details>

<a id="modifying-db-instance-backup-information-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="get-db-instance-restore-information"></a>
### DBインスタンス復元情報の照会 { #get-db-instance-restore-information }

```http
GET /v1.0/db-instances/{dbInstanceId}/restoration-info
```

<a id="get-db-instance-restore-information-required-permissions"></a>
#### 必要権限

| 権限名                            | 説明           |
|---------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンス詳細を表示 |

<a id="get-db-instance-restore-information-request"></a>
#### リクエスト

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="get-db-instance-restore-information-response"></a>
#### レスポンス

| 名前                                     | 種類  | 形式      | 説明                                                                                                                                                   |
|-----------------------------------------|------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| oldestRestorableYmdt                    | Body | DateTime | 最も古い復元可能時間                                                                                                                                     |
| latestRestorableYmdt                    | Body | DateTime | 最も最新の復元可能時間                                                                                                                                     |
| restorableBackups                       | Body | Array    | 復元可能なバックアップリスト                                                                                                                                         |
| restorableBackups.backup                | Body | Object   | バックアップの情報オブジェクト                                                                                                                                             |
| restorableBackups.backup.backupId       | Body | UUID     | バックアップの識別子                                                                                                                                              |
| restorableBackups.backup.backupName     | Body | String   | バックアップ名                                                                                                                                                |
| restorableBackups.backup.backupSize     | Body | Number   | バックアップサイズ                                                                                                                                                |
| restorableBackups.backup.backupType     | Body | Enum     | バックアップタイプ<br/>- `AUTO`:自動<br/>- `MANUAL`:手動                                                                                                            |
| restorableBackups.backup.backupStatus   | Body | Enum     | バックアップ状態<br/>- `BACKING_UP`:バックアップ中の場合<br/>- `COMPLETED`:バックアップが完了した場合<br/>- `DELETING`:バックアップが削除中の場合<br/>- `DELETED`:バックアップが削除された場合<br/>- `ERROR`:エラーが発生した場合 |
| restorableBackups.backup.dbInstanceId   | Body | UUID     | 原本DBインスタンスの識別子                                                                                                                                      |
| restorableBackups.backup.dbInstanceName | Body | String   | 原本DBインスタンス名                                                                                                                                       |
| restorableBackups.backup.dbVersion      | Body | String   | DBバージョン情報                                                                                                                                             |
| restorableBackups.backup.failoverCount  | Body | Number   | フェイルオーバー回数                                                                                                                                             |
| restorableBackups.backup.walFileName    | Body | String   | WALログファイル名                                                                                                                                         |
| restorableBackups.backup.createdYmdt    | Body | DateTime | バックアップ作成日時                                                                                                                                             |
| restorableBackups.backup.updatedYmdt    | Body | DateTime | バックアップ更新日時                                                                                                                                             |
| restorableBackups.backup.startYmdt      | Body | DateTime | バックアップ開始日時                                                                                                                                             |
| restorableBackups.backup.completedYmdt  | Body | DateTime | バックアップ完了日時                                                                                                                                             |

<details><summary>例</summary>

```json
{
	"header": {
		"resultCode": 0,
		"resultMessage": "SUCCESS",
		"isSuccessful": true
	},
    "oldestRestorableYmdt": "2023-07-09T16:33:33+09:00",
	"latestRestorableYmdt": "2023-07-10T15:44:44+09:00",
	"restorableBackups": [
		{
			"backup": {
				"backupId": "145d889a-fe08-474f-8f58-bde576ff96a9",
				"backupName": "example-backup-name",
				"backupStatus": "COMPLETED",
				"dbInstanceId": "dba1be25-9429-4589-9716-7fb6daad7cb9",
				"dbInstanceName": "original-db-instance-name",
				"dbVersion": "POSTGRESQL_V17_6",
				"backupType": "MANUAL",
				"backupSize": 8299904,
				"walFileName": "000000010000000000000005",
				"createdYmdt": "2023-07-10T15:44:44+09:00",
				"updatedYmdt": "2023-07-10T15:46:07+09:00"
			}
		}
	]
}
```
</details>

<a id="restore-db-instance"></a>
### DBインスタンスの復元 { #restore-db-instance }

```http
POST /v1.0/db-instances/{dbInstanceId}/restore
```

<a id="restore-db-instance-required-permissions"></a>
#### 必要権限

| 権限名                                | 説明          |
|-------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Restore | DBインスタンスの復元 |

<a id="restore-db-instance-common-request"></a>
#### 共通リクエスト

| 名前                                      | 種類  | 形式     | 必須 | 説明                                                                                                                                                                                                                                                 |
|------------------------------------------|------|---------|----|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId                             | URL  | UUID    | O  | DBインスタンスの識別子                                                                                                                                                                                                                                       |
| restore                                  | Body | Object  | O  | 復元情報オブジェクト                                                                                                                                                                                                                                           |
| restore.restoreType                      | Body | Enum    | O  | 復元タイプ種類<br/>- `TIMESTAMP`:復元可能時間内の時間を利用した時点復元タイプ<br/>- `BACKUP`:既存のバックアップを利用した復元タイプ                                                                                                                                                   |
| dbInstanceName                           | Body | String  | O  | DBインスタンスを識別できる名前                                                                                                                                                                                                                               |
| description                              | Body | String  | X  | DBインスタンスの追加情報                                                                                                                                                                                                                                  |
| dbFlavorId                               | Body | UUID    | O  | DBインスタンス仕様の識別子                                                                                                                                                                                                                                    |
| dbPort                                   | Body | Number  | O  | DBポート<br/>- 最小値:`3306`<br/>- 最大値:`43306`                                                                                                                                                                                                          |
| parameterGroupId                         | Body | UUID    | O  | パラメータグループの識別子                                                                                                                                                                                                                                       |
| dbSecurityGroupIds                       | Body | Array   | X  | DBセキュリティグループの識別子リスト                                                                                                                                                                                                                                   |
| userGroupIds                             | Body | Array   | X  | ユーザーグループの識別子リスト                                                                                                                                                                                                                                     |
| useDefaultNotification                   | Body | Boolean | X  | 基本通知の使用有無<br/>- デフォルト値:`false`                                                                                                                                                                                                                      |
| useDeletionProtection                    | Body | Boolean | X  | 削除保護の有無<br>デフォルト値:`false`                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| useHighAvailability                      | Body | Boolean | X  | 高可用性の使用有無<br/>- デフォルト値:`false`                                                                                                                                                                                                                       |
| pingInterval                             | Body | Number  | X  | 高可用性使用時Ping間隔(秒)<br/>- デフォルト値: `3`最小値: `1`<br/>- 最大値: `600`                                                                                                                                                                                        |
| failoverReplWaitingTime                  | Body | Number  | X  | 高可用性使用時のフェイルオーバー待機時間<br/>- 最小値:`-1`<br/>- -1に設定時、複製遅延が解消されるまで待機し続けます。                                                                                                                                                                        |                                                                                                                                                                                                                      | userGroupIds                             | Body | Array   | X  | 基本通知受信用のユーザーグループの識別子リスト                                                                                                                                                                                            |
| network                                  | Body | Object  | O  | ネットワーク情報オブジェクト                                                                                                                                                                                                                                         |
| network.subnetId                         | Body | UUID    | O  | サブネットの識別子                                                                                                                                                                                                                                           |
| network.usePublicAccess                  | Body | Boolean | X  | 外部接続可否<br/>- デフォルト値:`false`</li></ul>                                                                                                                                                                                                            |
| network.availabilityZone                 | Body | Enum    | X  | DBインスタンスを作成するアベイラビリティゾーン<br/>- 例:`kr-pub-a`<br/>- デフォルト値:`任意のアベイラビリティゾーン`                                                                                                                                                                                    |
| storage                                  | Body | Object  | O  | ストレージ情報オブジェクト                                                                                                                                                                                                                                         |
| storage.storageType                      | Body | Enum    | O  | データストレージタイプ<br/>- 例:`General SSD`                                                                                                                                                                                                                 |
| storage.storageSize                      | Body | Number  | O  | データストレージサイズ(GB)<br/>- 最小値:`20`<br/>- 最大値:`2048`                                                                                                                                                                                                   |
| backup                                   | Body | Object  | O  | バックアップの情報オブジェクト                                                                                                                                                                                                                                           |
| backup.backupPeriod                      | Body | Number  | O  | バックアップの保管期間(日)<br/>- 最小値:`0`<br/>- 最大値:`730`                                                                                                                                                                                                         |
| backup.backupRetryCount                  | Body | Number  | X  | バックアップの再試行回数<br/>- デフォルト値:`0`<br/>- 最小値:`0`<br/>- 最大値:`10`                                                                                                                                                                                             |
| backup.backupSchedules                   | Body | Array   | O  | バックアップスケジュールリスト                                                                                                                                                                                                                                          |
| backup.backupSchedules.backupWndBgnTime  | Body | String  | X  | バックアップ開始時刻<br/>- 例:`00:00:00`<br/>- デフォルト値:原本DBインスタンス値                                                                                                                                                                                              |
| backup.backupSchedules.backupWndDuration | Body | Enum    | X  | バックアップDuration<br/>バックアップ開始時刻からDuration内に自動バックアップが実行されます。<br/>- `HALF_AN_HOUR`:30分<br/>- `ONE_HOUR`:1時間<br/>- `ONE_HOUR_AND_HALF`:1時間30分<br/>- `TWO_HOURS`:2時間<br/>- `TWO_HOURS_AND_HALF`:2時間30分<br/>- `THREE_HOURS`:3時間<br/>- デフォルト値:原本DBインスタンス値 |

<a id="restore-db-instance-request-when-restoring-a-point-in-time-restoration-using-timestamp-if-restoretype-is-timestamp"></a>
#### Timestampを利用した時点復元時のリクエスト(restoreTypeが`TIMESTAMP`の場合)

| 名前                 | 種類  | 形式      | 必須 | 説明                                                                                             |
|---------------------|------|----------|----|-------------------------------------------------------------------------------------------------|
| restore.restoreYmdt | Body | DateTime | O  | DBインスタンス復元時間。(YYYY-MM-DDThh:mm:ss.SSSTZD)<br>復元情報照会で照会した最も最新の復元可能な時間以前のデータのみ復元が可能 |

<details><summary>例</summary>

```json
{
  "dbInstanceName": "db-instance",
  "description": "description",
  "dbFlavorId": "71f69bf9-3c01-4c1a-b135-bb75e93f6268",
  "dbPort": 10000,
  "dbUserName": "db-user",
  "dbPassword": "password",
  "parameterGroupId": "488bf4f5-d8f7-459b-ace6-529b606c8570",
  "dbSecurityGroupIds": [
    "b0483a3d-e8e2-46f6-9e84-d5e31b0d44f4"
  ],
  "userGroupIds": [],
  "network": {
    "subnetId": "3ae7914f-9b42-4729-b125-87417b72cf36"
  },
  "storage": {
    "storageType": "General SSD",
    "storageSize": 20
  },
  "restore": {
    "restoreType": "TIMESTAMP",
    "restoreYmdt": "2023-07-10T15:44:44+09:00"
  },
  "backup": {
    "backupPeriod": 1,
    "backupSchedules": [
      {
        "backupWndBgnTime": "00:00:00",
        "backupWndDuration": "ONE_HOUR_AND_HALF"
      }
    ]
  }
}
```
</details>

<a id="restore-db-instance-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>


<a id="change-db-instance-deletion-protection-settings"></a>
### DBインスタンス削除保護設定の変更 { #change-db-instance-deletion-protection-settings }

```http
PUT /v1.0/db-instances/{dbInstanceId}/deletion-protection
```

<a id="change-db-instance-deletion-protection-settings-required-permissions"></a>
#### 必要権限

| 権限名                               | 説明          |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスの修正 |

<a id="change-db-instance-deletion-protection-settings-request"></a>
#### リクエスト

| 名前                   | 種類  | 形式     | 必須 | 説明          |
|-----------------------|------|---------|----|--------------|
| dbInstanceId          | URL  | UUID    | O  | DBインスタンスの識別子 |
| useDeletionProtection | Body | Boolean | O  | 削除保護の有無     |

<a id="change-db-instance-deletion-protection-settings-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="get-db-instance-maintenance-information"></a>
### DBインスタンス保守情報照会 { #get-db-instance-maintenance-information }

```http
GET /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

<a id="get-db-instance-maintenance-information-required-permissions"></a>
#### 必要権限

| 権限名                           | 説明          |
|---------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンス詳細表示 |

<a id="get-db-instance-maintenance-information-request"></a>
#### リクエスト

| 名前                  | 種類 | 形式    | 必須 | 説明         |
|-----------------------|------|---------|----|--------------|
| dbInstanceId          | URL  | UUID    | O  | DBインスタンスの識別子 |

<a id="get-db-instance-maintenance-information-response"></a>
#### レスポンス

| 名前                  | 種類 | 形式    | 説明                                                                                                                 |
|-----------------------|------|---------|----------------------------------------------------------------------------------------------------------------------|
| allowAutoMaintenance  | Body | Boolean | 自動保守を許可するかどうか                                                                                                       |
| useAutoStorageCleanup | Body | Boolean | 自動ストレージクリーンアップを使用するかどうか                                                                                                    |
| maintWndBgnTime       | Body | String  | 自動保守開始時間 <br/>- 例: `00:00:00`                                                                                  |
| maintWndDuration      | Body | ENUM    | 保守Windows <br/> 例: `HALF_AN_HOUR`, `ONE_HOUR`, `ONE_HOUR_AND_HALF`, `TWO_HOURS`, `TWO_HOURS_AND_HALF`, `THREE_HOURS` |
| logRetentionPeriod    | Body | Number  | ログ保管期間(日)                                                                                                         |


<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "allowAutoMaintenance": true,
    "useAutoStorageCleanup": true,
    "maintWndBgnTime": "00:00:00",
    "maintWndDuration": "HALF_AN_HOUR",
    "logRetentionPeriod": 7
}
```
</details>


<a id="modify-db-instance-maintenance-information"></a>
### DBインスタンス保守情報修正 { #modify-db-instance-maintenance-information }

```http
PUT /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

<a id="modify-db-instance-maintenance-information-required-permissions"></a>
#### 必要権限

| 権限名                              | 説明         |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスを修正する |

<a id="modify-db-instance-maintenance-information-request"></a>
#### リクエスト

| 名前                  | 種類 | 形式    | 必須 | 説明                                                                                                                 |
|-----------------------|------|---------|----|----------------------------------------------------------------------------------------------------------------------|
| dbInstanceId          | URL  | UUID    | O  | DBインスタンスの識別子                                                                                                       |
| allowAutoMaintenance  | Body | Boolean | X  | 自動保守を許可するかどうか                                                                                                       |
| useAutoStorageCleanup | Body | Boolean | X  | 自動ストレージクリーンアップを使用するかどうか                                                                                                    |
| maintWndBgnTime       | Body | String  | X  | 自動保守開始時間 <br/>- 例: `00:00:00`                                                                                  |
| maintWndDuration      | Body | ENUM    | X  | 保守Windows <br/> 例: `HALF_AN_HOUR`, `ONE_HOUR`, `ONE_HOUR_AND_HALF`, `TWO_HOURS`, `TWO_HOURS_AND_HALF`, `THREE_HOURS` |
| logRetentionPeriod    | Body | Number  | X  | ログ保管期間(日)                                                                                                         |

<details><summary>例</summary>

```json
{
  "allowAutoMaintenance": true,
  "useAutoStorageCleanup": true,
  "logRetentionPeriod": 7
}
```
</details>

<a id="modify-db-instance-maintenance-information-response"></a>
#### レスポンス

| 名前  | 種類 | 形式 | 説明        |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
  "header": {
    "resultCode": 0,
    "resultMessage": "SUCCESS",
    "isSuccessful": true
  },
  "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>


<a id="get-selectable-db-versions-in-the-current-db-instance"></a>
### 現在のDBインスタンスで選択可能なDBバージョンの照会 { #get-selectable-db-versions-in-the-current-db-instance }

```http
GET /v1.0/db-instances/{dbInstanceId}/available-db-versions
```

<a id="get-selectable-db-versions-in-the-current-db-instance-required-permissions"></a>
#### 必要権限

| 権限名                              | 説明         |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンス詳細表示 |

<a id="get-selectable-db-versions-in-the-current-db-instance-request"></a>
#### リクエスト

| 名前                  | 種類 | 形式    | 必須 | 説明         |
|-----------------------|------|---------|----|--------------|
| dbInstanceId          | URL  | UUID    | O  | DBインスタンスの識別子 |

<a id="get-selectable-db-versions-in-the-current-db-instance-response"></a>
#### レスポンス

| 名前                         | 種類 | 形式    | 説明                  |
|------------------------------|------|---------|-----------------------|
| dbVersions                   | Body | Array   | DBバージョンリスト            |
| dbVersions.dbVersion         | Body | String  | DBバージョン               |
| dbVersions.dbVersionName     | Body | String  | DBバージョン名              |
| dbVersions.restorableFromObs | Body | Boolean | オブジェクトストレージから復元の可否 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbVersions": [
        {
            "dbVersion": "POSTGRESQL_V17_6",
            "dbVersionName": "PostgreSQL V17.6",
            "restorableFromObs": true
        }
    ]
}
```
</details>

<a id="delete-db-instance"></a>
### DBインスタンスの削除 { #delete-db-instance }

```http
DELETE /v1.0/db-instances/{dbInstanceId}
```

<a id="delete-db-instance-required-permissions"></a>
#### 必要権限

| 権限名                               | 説明          |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Delete | DBインスタンスの削除 |

<a id="delete-db-instance-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="delete-db-instance-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="restart-db-instance"></a>
### DBインスタンスの再起動 { #restart-db-instance }

```http
POST /v1.0/db-instances/{dbInstanceId}/restart
```

<a id="restart-db-instance-required-permissions"></a>
#### 必要権限

| 権限名                                | 説明           |
|-------------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.Restart | DBインスタンスの再起動 |

<a id="restart-db-instance-request"></a>
#### リクエスト

| 名前               | 種類  | 形式     | 必須 | 説明                                                                       |
|-------------------|------|---------|----|---------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID    | O  | DBインスタンスの識別子                                                             |
| useOnlineFailover | Body | Boolean | X  | フェイルオーバーを利用した再起動の有無<br/>高可用性を使用中のDBインスタンスでのみ使用可能です。<br/>- デフォルト値:`false` |
| executeBackup     | Body | Boolean | X  | 現時点バックアップを実行するかどうか<br/>- デフォルト値: `false`                                         |

<details><summary>例</summary>

```json
{
    "executeBackup": true
}
```
</details>

<a id="restart-db-instance-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="force-restart-db-instance"></a>
### DBインスタンスの強制再起動 { #force-restart-db-instance }

```http
POST /v1.0/db-instances/{dbInstanceId}/force-restart
```

<a id="force-restart-db-instance-required-permissions"></a>
#### 必要権限

| 権限名                                     | 説明              |
|------------------------------------------|------------------|
| RDSforPostgreSQL:DbInstance.ForceRestart | DBインスタンスの強制再起動 |

<a id="force-restart-db-instance-request"></a>
#### リクエスト

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="force-restart-db-instance-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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


<a id="start-db-instance"></a>
### DBインスタンス開始 { #start-db-instance }

```http
POST /v1.0/db-instances/{dbInstanceId}/start
```

<a id="start-db-instance-required-permissions"></a>
#### 必要権限

| 権限名                              | 説明          |
|-----------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Start | DBインスタンス開始 |

<a id="start-db-instance-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="start-db-instance-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="stop-db-instance"></a>
### DBインスタンス停止 { #stop-db-instance }

```http
POST /v1.0/db-instances/{dbInstanceId}/stop
```

<a id="stop-db-instance-required-permissions"></a>
#### 必要権限

| 権限名                            | 説明         |
|----------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Stop | DBインスタンスを停止する |

<a id="stop-db-instance-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="stop-db-instance-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="backup-db-instance"></a>
### DBインスタンスのバックアップ { #backup-db-instance }

```http
POST /v1.0/db-instances/{dbInstanceId}/backup
```

<a id="backup-db-instance-required-permissions"></a>
#### 必要権限

| 権限名                               | 説明          |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Backup | DBインスタンスのバックアップ |

<a id="backup-db-instance-request"></a>
#### リクエスト

| 名前          | 種類  | 形式    | 必須 | 説明             |
|--------------|------|--------|----|-----------------|
| dbInstanceId | URL  | UUID   | O  | DBインスタンスの識別子   |
| backupName   | Body | String | O  | バックアップを識別できる名前 |

<details><summary>例</summary>

```json
{
    "backupName": "backup"
}
```
</details>

<a id="backup-db-instance-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="export-after-backing-up-db-instance"></a>
### DBインスタンスバックアップ後にエクスポート { #export-after-backing-up-db-instance }

```http
POST /v1.0/db-instances/{dbInstanceId}/backup-to-object-storage
```

<a id="export-after-backing-up-db-instance-required-permissions"></a>
#### 必要権限

| 権限名                                              | 説明                        |
|---------------------------------------------------|----------------------------|
| RDSforPostgreSQL:DbInstance.BackupToObjectStorage | バックアップ後にバックアップファイルをオブジェクトストレージにエクスポート |

<a id="export-after-backing-up-db-instance-request"></a>
#### リクエスト

| 名前             | 種類  | 形式    | 必須 | 説明                         |
|-----------------|------|--------|----|-----------------------------|
| dbInstanceId    | URL  | UUID   | O  | DBインスタンスの識別子               |
| tenantId        | Body | String | O  | バックアップが保存されるオブジェクトストレージのテナントID   |
| username        | Body | String | O  | NHN CloudアカウントまたはIAMアカウントID   |
| password        | Body | String | O  | バックアップが保存されるオブジェクトストレージのAPIパスワード |
| targetContainer | Body | String | O  | バックアップが保存されるオブジェクトストレージのコンテナ    |
| objectPath      | Body | String | O  | コンテナに保存されるバックアップのパス           |

<details><summary>例</summary>

```json
{
    "tenantId": "399631c404744dbbb18ce4fa2dc71a5a",
    "username": "gildong.hong@nhn.com",
    "password": "password",
    "targetContainer": "/container",
    "objectPath": "/backups/backup_file"
}
```
</details>

<a id="export-after-backing-up-db-instance-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="applying-db-instance-latest-parameter-groups"></a>
### DBインスタンスの最新パラメータグループを適用する { #applying-db-instance-latest-parameter-groups }

```http
POST /v1.0/db-instances/{dbInstanceId}/apply-recent-parameter-group
```

<a id="applying-db-instance-latest-parameter-groups-required-permissions"></a>
#### 必要権限

| 権限名                               | 説明          |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスの修正 |

<a id="applying-db-instance-latest-parameter-groups-request"></a>
#### リクエスト

| 名前               | 種類  | 形式     | 必須 | 説明                                                                       |
|-------------------|------|---------|----|---------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID    | O  | DBインスタンスの識別子                                                             |
| executeBackup     | Body | Boolean | X  | 現時点バックアップを実行するかどうか<br/>- デフォルト値:`false`                                         |

<details><summary>例</summary>

```json
{
  "executeBackup": true
}
```
</details>

<a id="applying-db-instance-latest-parameter-groups-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="replicate-db-instance"></a>
### DBインスタンスの複製 { #replicate-db-instance }

```http
POST /v1.0/db-instances/{dbInstanceId}/replicate
```

<a id="replicate-db-instance-required-permissions"></a>
#### 必要権限

| 権限名                                  | 説明          |
|---------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Replicate | DBインスタンスの複製 |

<a id="replicate-db-instance-request"></a>
#### リクエスト

| 名前                                          | 種類  | 形式     | 必須 | 説明                                                                                                                                                                                                                                                 |
|----------------------------------------------|------|---------|----|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId                                 | URL  | UUID    | O  | DBインスタンスの識別子                                                                                                                                                                                                                                       |
| dbInstanceName                               | Body | String  | O  | DBインスタンスを識別できる名前                                                                                                                                                                                                                               |
| description                                  | Body | String  | X  | DBインスタンスの追加情報                                                                                                                                                                                                                                  |
| dbFlavorId                                   | Body | UUID    | X  | DBインスタンス仕様の識別子<br/>- デフォルト値:原本DBインスタンス値                                                                                                                                                                                                            |
| dbPort                                       | Body | Number  | X  | DBポート<br/>- デフォルト値:原本DBインスタンス値<br/>- 最小値:`5432`<br/>- 最大値:`45432`                                                                                                                                                                                  |
| parameterGroupId                             | Body | UUID    | X  | パラメータグループの識別子<br/>- デフォルト値:原本DBインスタンス値                                                                                                                                                                                                               |
| dbSecurityGroupIds                           | Body | Array   | X  | DBセキュリティグループの識別子リスト<br/>- デフォルト値:原本DBインスタンス値                                                                                                                                                                                                           |
| userGroupIds                                 | Body | Array   | X  | ユーザーグループの識別子リスト                                                                                                                                                                                                                                     |
| useDefaultNotification                       | Body | Boolean | X  | 基本通知の使用有無<br/>- デフォルト値:`false`                                                                                                                                                                                                                      |
| useDeletionProtection                        | Body | Boolean | X  | 削除保護の有無<br/>- デフォルト値: `false`                                                                                                                                                                                                                         |
| network                                      | Body | Object  | X  | ネットワーク情報オブジェクト                                                                                                                                                                                                                                         |
| network.usePublicAccess                      | Body | Boolean | X  | 外部接続可否<br/>- デフォルト値:`false`                                                                                                                                                                                                                      |
| network.availabilityZone                     | Body | Enum    | X  | DBインスタンスを作成するアベイラビリティゾーン<br/>- 例:`kr-pub-a`<br/>- デフォルト値:`任意のアベイラビリティゾーン`                                                                                                                                                                                    |  
| storage                                      | Body | Object  | X  | ストレージ情報オブジェクト                                                                                                                                                                                                                                         |    
| storage.storageType                          | Body | Enum    | X  | データストレージタイプ<br>- 例:`General SSD`                                                                                                                                                                                                                  |
| storage.storageSize                          | Body | Number  | X  | データストレージサイズ(GB)<br/>- デフォルト値:原本DBインスタンス値<br/>- 最小値:`20`<br/>- 最大値:`2048`                                                                                                                                                                           |
| backup                                       | Body | Object  | X  | バックアップ情報オブジェクト                                                                                                                                                                                                                                           |
| backup.backupPeriod                          | Body | Number  | X  | バックアップの保管期間(日)<br/>- デフォルト値:原本DBインスタンス値<br/>- 最小値:`0`<br/>- 最大値:`730`                                                                                                                                                                                 |
| backup.backupRetryCount                      | Body | Number  | X  | バックアップの再試行回数<br/>- デフォルト値:原本DBインスタンス値<br/>- 最小値:`0`<br/>- 最大値:`10`                                                                                                                                                                                    |

<details><summary>例</summary>

```json
{
    "dbInstanceName": "db-instance-replicate",
    "description": "description",
    "dbPort": 15432,
    "storage": {
        "storageSize": 100
    }
}
```
</details>

<a id="replicate-db-instance-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="promote-db-instance"></a>
### DBインスタンスの昇格 { #promote-db-instance }

```http
POST /v1.0/db-instances/{dbInstanceId}/promote
```

<a id="promote-db-instance-required-permissions"></a>
#### 必要権限

| 権限名                                | 説明          |
|-------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Promote | DBインスタンスの昇格 |

<a id="promote-db-instance-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="promote-db-instance-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>


<a id="db-instances-databases"></a>
## DBインスタンス > データベース { #db-instances-databases }

<a id="view-the-list-of-databases"></a>
### データベースリスト表示 { #view-the-list-of-databases }

```http
GET /v1.0/db-instances/{dbInstanceId}/databases
```

<a id="view-the-list-of-databases-required-permissions"></a>
#### 必要権限

| 権限名                                     | 説明                    |
|------------------------------------------|------------------------|
| RDSforPostgreSQL:DbInstanceDatabase.List | DBインスタンス内のデータベースリスト表示 |

<a id="view-the-list-of-databases-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="view-the-list-of-databases-response"></a>
#### レスポンス

| 名前                          | 種類  | 形式      | 説明                                                                                                                                                 |
|------------------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| databases                    | Body | Array    | データベースリスト                                                                                                                                          |
| databases.databaseId         | Body | UUID     | データベースの識別子                                                                                                                                        |
| databases.databaseName       | Body | String   | データベース名                                                                                                                                          |
| databases.databaseStatus     | Body | Enum     | データベースの現在状態<br/>- `STABLE`:作成済み<br/>- `CREATING`:作成中<br/>- `MODIFYING`:修正中<br/>- `SYNCING`:同期中<br/>- `DELETING`:削除中<br/>- `DELETED`:削除済み |
| databases.createdYmdt        | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                   |
| databases.updatedYmdt        | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                   |
| databases.schemas            | Body | Array    | データベース内のスキーマリスト                                                                                                                                    |
| databases.schemas.schemaName | Body | String   | スキーマ名                                                                                                                                             |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "databases": [
        {
            "databaseId": "7c9a94b8-86c1-435d-8af2-82a5e9d53fd4",
            "databaseName": "database",
            "databaseStatus": "STABLE",
            "createdYmdt": "2023-03-20T13:37:45+09:00",
            "updatedYmdt": "2023-03-20T13:37:45+09:00",
            "schemas": [
                {
                    "schemaName": "rds"
                }
            ]
        }
    ]
}
```
</details>

<a id="create-a-database"></a>
### データベース作成 { #create-a-database }

```http
POST /v1.0/db-instances/{dbInstanceId}/databases
```

<a id="create-a-database-required-permissions"></a>
#### 必要権限

| 権限名                                       | 説明                   |
|--------------------------------------------|-----------------------|
| RDSforPostgreSQL:DbInstanceDatabase.Create | DBインスタンス内のデータベース作成 |

<a id="create-a-database-request"></a>
#### リクエスト

| 名前          | 種類  | 形式    | 必須 | 説明          |
|--------------|------|--------|----|--------------|
| dbInstanceId | URL  | UUID   | O  | DBインスタンスの識別子 |
| databaseName | Body | String | O  | データベース名   |

<details><summary>例</summary>

```json
{
    "databaseName": "database"
}
```
</details>

<a id="create-a-database-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="modifying-the-database"></a>
### データベースの修正 { #modifying-the-database }

```http
PUT /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

<a id="modifying-the-database-required-permissions"></a>
#### 必要権限

| 権限名                                       | 説明                   |
|--------------------------------------------|-----------------------|
| RDSforPostgreSQL:DbInstanceDatabase.Modify | DBインスタンス内のデータベース修正 |

<a id="modifying-the-database-request"></a>
#### リクエスト

| 名前                      | 種類  | 形式     | 必須 | 説明                                                                                         |
|--------------------------|------|---------|----|---------------------------------------------------------------------------------------------|
| dbInstanceId             | URL  | UUID    | O  | DBインスタンスの識別子                                                                               |
| databaseId               | URL  | UUID    | O  | データベースの識別子                                                                                |
| databaseName             | Body | String  | O  | データベース名                                                                                  |
| applyHbaRulesImmediately | Body | Boolean | X  | 関連するアクセス制御ルールを即時適用するかどうか<br/>- データベース名変更時、以前のデータベース名で設定されたアクセス制御ルールが存在する場合、変更された名前で反映します。 |

<details><summary>例</summary>

```json
{
    "databaseName": "database-1"
}
```
</details>

<a id="modifying-the-database-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="deleting-a-database"></a>
### データベース削除 { #deleting-a-database }

```http
DELETE /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

<a id="deleting-a-database-required-permissions"></a>
#### 必要権限

| 権限名                                       | 説明                   |
|--------------------------------------------|-----------------------|
| RDSforPostgreSQL:DbInstanceDatabase.Delete | DBインスタンス内のデータベースを削除 |

<a id="deleting-a-database-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |
| databaseId   | URL | UUID | O  | データベースの識別子 |

<a id="deleting-a-database-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="db-instances-users"></a>
## DBインスタンス > ユーザー { #db-instances-users }

<a id="view-the-list-of-users"></a>
### ユーザーリスト表示 { #view-the-list-of-users }

```http
GET /v1.0/db-instances/{dbInstanceId}/db-users
```

<a id="view-the-list-of-users-required-permissions"></a>
#### 必要権限

| 権限名                                 | 説明                 |
|--------------------------------------|---------------------|
| RDSforPostgreSQL:DbInstanceUser.List | DBインスタンス内のユーザーリストを表示 |

<a id="view-the-list-of-users-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="view-the-list-of-users-response"></a>
#### レスポンス

| 名前                   | 種類  | 形式      | 説明                                                                                                                                                 |
|-----------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| dbUsers               | Body | Array    | DBユーザーリスト                                                                                                                                          |
| dbUsers.dbUserId      | Body | UUID     | DBユーザーの識別子                                                                                                                                        |
| dbUsers.dbUserName    | Body | String   | DBユーザーアカウント名                                                                                                                                       |
| dbUsers.authorityType | Body | Enum     | DBユーザー権限タイプ<br/>- `CRUD`:DMLクエリ実行可能な権限<br/>- `DDL`:DDLクエリ実行可能な権限                                                                          |
| dbUsers.dbUserStatus  | Body | Enum     | DBユーザーの現在状態<br/>- `STABLE`:作成済み<br/>- `CREATING`:作成中<br/>- `MODIFYING`:修正中<br/>- `SYNCING`:同期中<br/>- `DELETING`:削除中<br/>- `DELETED`:削除済み |
| dbUsers.createdYmdt   | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                   |
| dbUsers.updatedYmdt   | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                   |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "databases": [
        {
            "databaseId": "7c9a94b8-86c1-435d-8af2-82a5e9d53fd4",
            "databaseName": "database",
            "databaseStatus": "STABLE",
            "createdYmdt": "2023-03-20T13:37:45+09:00"
        }
    ]
}
```
</details>

<a id="create-a-user"></a>
### ユーザー作成 { #create-a-user }

```http
POST /v1.0/db-instances/{dbInstanceId}/db-users
```

<a id="create-a-user-required-permissions"></a>
#### 必要権限

| 権限名                                   | 説明                |
|----------------------------------------|--------------------|
| RDSforPostgreSQL:DbInstanceUser.Create | DBインスタンス内のユーザー作成 |

<a id="create-a-user-request"></a>
#### リクエスト

| 名前                   | 種類  | 形式     | 必須 | 説明                                                                       |
|-----------------------|------|---------|----|---------------------------------------------------------------------------|
| dbInstanceId          | URL  | UUID    | O  | DBインスタンスの識別子                                                             |
| dbUserName            | Body | String  | O  | DBユーザーアカウント名<br/>- 最小文字数:`1`<br/>- 最大文字数:`20`                           |
| dbPassword            | Body | String  | O  | DBユーザーアカウントパスワード<br/>- 最小文字数:`1`<br/>- 最大文字数:`100`                          |
| authorityType         | Body | Enum    | O  | DBユーザー権限タイプ<br/>- `CRUD`:DMLクエリ実行可能な権限<br/>- `DDL`:DDLクエリ実行可能な権限 |
| createDefaultHbaRules | Body | Boolean | X  | 基本アクセス制御ルールの作成可否                                                          |
| address               | Body | String  | X  | 基本アクセス制御ルール作成時に使用する接続アドレス                                               |

<details><summary>例</summary>

```json
{
    "dbUserName": "db-user",
    "dbPassword": "password",
    "authorityType": "CRUD"
}
```
</details>

<a id="create-a-user-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="edit-a-user"></a>
### ユーザー修正 { #edit-a-user }

```http
PUT /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

<a id="edit-a-user-required-permissions"></a>
#### 必要権限

| 権限名                                   | 説明                |
|----------------------------------------|--------------------|
| RDSforPostgreSQL:DbInstanceUser.Modify | DBインスタンス内のユーザー修正 |

<a id="edit-a-user-request"></a>
#### リクエスト

| 名前                      | 種類  | 形式     | 必須 | 説明                                                                                         |
|--------------------------|------|---------|----|---------------------------------------------------------------------------------------------|
| dbInstanceId             | URL  | UUID    | O  | DBインスタンスの識別子                                                                               |
| dbUserId                 | URL  | UUID    | O  | DBユーザーの識別子                                                                                |
| dbUserName               | Body | String  | X  | DBユーザーアカウント名<br/>- 最小文字数:`1`<br/>- 最大文字数:`20`                                             |
| dbPassword               | Body | String  | X  | DBユーザーアカウントパスワード<br/>- 最小文字数:`1`<br/>- 最大文字数:`100`                                            |
| authorityType            | Body | Enum    | X  | DBユーザー権限タイプ<br/>- `CRUD`:DMLクエリ実行可能な権限<br/>- `DDL`:DDLクエリ実行可能な権限                  |
| applyHbaRulesImmediately | Body | Boolean | X  | 関連するアクセス制御ルールを即時適用するかどうか<br/>- ユーザーアカウント名変更時に以前のユーザーアカウント名で設定されたアクセス制御ルールが存在する場合、変更された名前で反映します。 |

<details><summary>例</summary>

```json
{
    "dbUserName": "db-user-1",
    "dbPassword": "new-password"
}
```
</details>

<a id="edit-a-user-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="deleting-a-user"></a>
### ユーザー削除 { #deleting-a-user }

```http
DELETE /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

<a id="deleting-a-user-required-permissions"></a>
#### 必要権限

| 権限名                                   | 説明                |
|----------------------------------------|--------------------|
| RDSforPostgreSQL:DbInstanceUser.Delete | DBインスタンス内のユーザー削除 |

<a id="deleting-a-user-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |
| dbUserId     | URL | UUID | O  | DBユーザーの識別子 |

<a id="deleting-a-user-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="db-instances-access-control"></a>
## DBインスタンス > アクセス制御 { #db-instances-access-control }

<a id="view-a-list-of-access-control-rules"></a>
### アクセス制御ルールリストを表示 { #view-a-list-of-access-control-rules }

```http
GET /v1.0/db-instances/{dbInstanceId}/hba-rules
```

<a id="view-a-list-of-access-control-rules-required-permissions"></a>
#### 必要権限

| 権限名                                | 説明                      |
|-------------------------------------|--------------------------|
| RDSforPostgreSQL:DbInstanceHba.List | DBインスタンス内のアクセス制御ルールリストを表示 |

<a id="view-a-list-of-access-control-rules-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="view-a-list-of-access-control-rules-response"></a>
#### レスポンス

| 名前                             | 種類  | 形式     | 説明                                                                                                                                                  |
|---------------------------------|------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| hbaRules                        | Body | Array   | アクセス制御ルールリスト                                                                                                                                         |
| hbaRules.hbaRuleId              | Body | UUID    | アクセス制御ルールの識別子                                                                                                                                       |
| hbaRules.hbaRuleStatus          | Body | Enum    | アクセス制御ルールの現在状態<br/>- `CREATED`:作成済み<br/>- `APPLIED`:適用済み<br/>- `CREATING`:作成中<br/>- `MODIFYING`:修正中<br/>- `DELETING`:削除中<br/>- `DELETED`:削除済み |
| hbaRules.databaseApplyType      | Body | String  | データベースルールの適用方式<br/>- `ENTIRE`:全体<br/>- `USER_CUSTOM`:ユーザー指定                                                                                      |
| hbaRules.dbUserApplyType        | Body | Enum    | DBユーザールールの適用方式<br/>- `ENTIRE`:全体<br/>- `USER_CUSTOM`:ユーザー指定                                                                                      |
| hbaRules.databases              | Body | Array   | ユーザー指定のデータベースリスト                                                                                                                                    |
| hbaRules.databases.databaseId   | Body | UUID    | ユーザー指定のデータベースの識別子                                                                                                                                  |
| hbaRules.databases.databaseName | Body | String  | ユーザー指定のデータベース名                                                                                                                                    |
| hbaRules.dbUsers                | Body | Array   | ユーザー指定のDBユーザーリスト                                                                                                                                    |
| hbaRules.dbUsers.dbUserId       | Body | UUID    | ユーザー指定のDBユーザーの識別子                                                                                                                                  |
| hbaRules.dbUsers.dbUserName     | Body | String  | ユーザー指定のDBユーザーアカウント名                                                                                                                                 |
| hbaRules.address                | Body | String  | 接続アドレス                                                                                                                                               |
| hbaRules.authMethod             | Body | Enum    | 認証方式<br/>- `TRUST`:トラスト(パスワード不要)<br/>- `REJECT`:接続ブロック<br/>- `SCRAM_SHA_256`:パスワード(SCRAM-SHA-256)                                                 |
| hbaRules.reservedAction         | Body | Enum    | 予約作業<br/>- `NONE`:なし<br/>- `CREATE`:作成予約(適用必要)<br/>- `MODIFY`:修正予約(適用必要)<br/>- `DELETE`:削除予約(適用必要)                                        |
| hbaRules.order                  | Body | Number  | 適用順序                                                                                                                                               |
| hbaRules.applicable             | Body | Boolean | 適用可否<br/>- 適用不可状態のルールは無視される                                                                                                                     |
| needToApply                     | Body | Boolean | 変更内容の適用が必要かどうか                                                                                                                                       |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "hbaRules": [
        {
            "hbaRuleId": "7c9a94b8-86c1-435d-8af2-82a5e9d53fd4",
            "hbaRuleStatus": "APPLIED",
            "databaseApplyType": "USER_CUSTOM",
            "dbUserApplyType": "ENTIRE",
            "databases": [
                {
                    "databaseId": "7c9a94b8-86c1-435d-8af2-82a5e9d53fd4",
                    "databaseName": "database"
                }
            ],
            "dbUsers": [],
            "address": "0.0.0.0/0",
            "authMethod": "TRUST",
            "reservedAction": "NONE",
            "order": 0,
            "applicable": true
        }
    ]
}
```
</details>

<a id="add-an-access-control-rule"></a>
### アクセス制御ルールの追加 { #add-an-access-control-rule }

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules
```

<a id="add-an-access-control-rule-required-permissions"></a>
#### 必要権限

| 権限名                                  | 説明                     |
|---------------------------------------|-------------------------|
| RDSforPostgreSQL:DbInstanceHba.Create | DBインスタンス内のアクセス制御ルール追加 |

<a id="add-an-access-control-rule-request"></a>
#### リクエスト

| 名前               | 種類  | 形式    | 必須 | 説明                                                                                                  |
|-------------------|------|--------|----|------------------------------------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID   | O  | DBインスタンスの識別子                                                                                        |
| databaseApplyType | Body | String | O  | データベースルール適用方式<br/>- `ENTIRE`:全体<br/>- `USER_CUSTOM`:ユーザー指定                                      |
| dbUserApplyType   | Body | Enum   | O  | DBユーザールール適用方式<br/>- `ENTIRE`:全体<br/>- `USER_CUSTOM`:ユーザー指定                                      |
| databaseIds       | Body | Array  | X  | ユーザー指定のデータベースの識別子リスト                                                                               |
| dbUserIds         | Body | Array  | X  | ユーザー指定のDBユーザーの識別子リスト                                                                               |
| address           | Body | String | O  | 接続アドレス<br/>- CIDR形式、ホスト名またはドメイン形式で入力                                                            |
| authMethod        | Body | Enum   | O  | 認証方式<br/>- `TRUST`:トラスト(パスワード不要)<br/>- `REJECT`:接続ブロック<br/>- `SCRAM_SHA_256`:パスワード(SCRAM-SHA-256) |

<details><summary>例</summary>

```json
{
    "databaseApplyType": "ENTIRE",
    "dbUserApplyType": "USER_CUSTOM",
    "databaseIds": [], 
    "dbUserIds": [
        "7c9a94b8-86c1-435d-8af2-82a5e9d53fd4"
    ],
    "address": "0.0.0.0/0",
    "authMethod": "TRUST"
}
```
</details>

<a id="add-an-access-control-rule-response"></a>
#### レスポンス

| 名前       | 種類  | 形式  | 説明           |
|-----------|------|------|---------------|
| hbaRuleId | Body | UUID | アクセス制御ルールの識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "hbaRuleId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="modify-an-access-control-rule"></a>
### アクセス制御ルールの修正 { #modify-an-access-control-rule }

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

<a id="modify-an-access-control-rule-required-permissions"></a>
#### 必要権限

| 権限名                                  | 説明                     |
|---------------------------------------|-------------------------|
| RDSforPostgreSQL:DbInstanceHba.Modify | DBインスタンス内のアクセス制御ルール修正 |

<a id="modify-an-access-control-rule-request"></a>
#### リクエスト

| 名前               | 種類  | 形式    | 必須 | 説明                                                                                                  |
|-------------------|------|--------|----|------------------------------------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID   | O  | DBインスタンスの識別子                                                                                        |
| hbaRuleId         | URL  | UUID   | O  | アクセス制御ルールの識別子                                                                                       |
| databaseApplyType | Body | String | O  | データベースルールの適用方式<br/>- `ENTIRE`:全体<br/>- `USER_CUSTOM`:ユーザー指定                                      |
| dbUserApplyType   | Body | Enum   | O  | DBユーザールールの適用方式<br/>- `ENTIRE`:全体<br/>- `USER_CUSTOM`:ユーザー指定                                      |
| databaseIds       | Body | Array  | X  | ユーザー指定のデータベースの識別子リスト                                                                               |
| dbUserIds         | Body | Array  | X  | ユーザー指定のDBユーザーの識別子リスト                                                                               |
| address           | Body | String | O  | 接続アドレス<br/>- CIDR形式、ホスト名またはドメイン形式で入力                                                            |
| authMethod        | Body | Enum   | O  | 認証方式<br/>- `TRUST`:トラスト(パスワード不要)<br/>- `REJECT`:接続ブロック<br/>- `SCRAM_SHA_256`:パスワード(SCRAM-SHA-256) |

<details><summary>例</summary>

```json
{
    "databaseApplyType": "ENTIRE",
    "dbUserApplyType": "ENTIRE",
    "databaseIds": [], 
    "dbUserIds": [],
    "address": "0.0.0.0/0",
    "authMethod": "REJECT"
}
```
</details>

<a id="modify-an-access-control-rule-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="deleting-an-access-control-rule"></a>
### アクセス制御ルールの削除 { #deleting-an-access-control-rule }

```http
DELETE /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

<a id="deleting-an-access-control-rule-required-permissions"></a>
#### 必要権限

| 権限名                                  | 説明                     |
|---------------------------------------|-------------------------|
| RDSforPostgreSQL:DbInstanceHba.Delete | DBインスタンス内のアクセス制御ルール削除 |

<a id="deleting-an-access-control-rule-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明           |
|--------------|-----|------|----|---------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |
| hbaRuleId    | URL | UUID | O  | アクセス制御ルールの識別子 |

<a id="deleting-an-access-control-rule-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="reorder-access-control-rules"></a>
### アクセス制御ルールの順序調整 { #reorder-access-control-rules }

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/orders
```

<a id="reorder-access-control-rules-required-permissions"></a>
#### 必要権限

| 権限名                                  | 説明                     |
|---------------------------------------|-------------------------|
| RDSforPostgreSQL:DbInstanceHba.Modify | DBインスタンス内のアクセス制御ルール修正 |

<a id="reorder-access-control-rules-request"></a>
#### リクエスト

| 名前          | 種類 | 形式  | 必須 | 説明                                 |
|--------------|-----|------|----|-------------------------------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子                       |
| hbaRuleIds   | URL | Body | O  | アクセス制御ルールの識別子リスト<br/>- リクエストした順序どおりに調整 |

<details><summary>例</summary>

```json
{
    "hbaRuleIds": [
        "7c9a94b8-86c1-435d-8af2-82a5e9d53fd4"
    ]
}
```
</details>

<a id="reorder-access-control-rules-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="applying-access-control-rules"></a>
### アクセス制御ルールを適用 { #applying-access-control-rules }

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules/apply
```

<a id="applying-access-control-rules-required-permissions"></a>
#### 必要権限

| 権限名                                  | 説明          |
|---------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify    | DBインスタンスの修正 |

<a id="applying-access-control-rules-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類 | 形式  | 必須 | 説明          |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

<a id="applying-access-control-rules-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="backup"></a>
## バックアップ { #backup }

<a id="retrieve-backup-list"></a>
### バックアップリスト照会 { #retrieve-backup-list }

```http
GET /v1.0/backups
```

<a id="retrieve-backup-list-required-permissions"></a>
#### 必要権限

| 権限名                         | 説明      |
|------------------------------|----------|
| RDSforPostgreSQL:Backup.List | バックアップリスト照会 |

<a id="retrieve-backup-list-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類   | 形式    | 必須 | 説明                                                        |
|--------------|-------|--------|----|------------------------------------------------------------|
| page         | Query | Number | O  | 照会するリストのページ<br/>- 最小値:`1`                                 |
| size         | Query | Number | O  | 照会するリストのページサイズ<br/>- 最小値:`1`<br/>- 最大値:`100`             |
| backupType   | Query | Enum   | X  | バックアップタイプ<br/>- `AUTO`:自動<br/>- `MANUAL`: 手動<br/>- デフォルト値:`全体` |
| dbInstanceId | Query | UUID   | X  | 原本DBインスタンスの識別子                                           |
| dbVersion    | Query | Enum   | X  | DBバージョン情報                                                  |

<a id="retrieve-backup-list-response"></a>
#### レスポンス

| 名前                  | 種類  | 形式      | 説明                                                                                                                                                       |
|----------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| totalCounts          | Body | Number   | 全体バックアップリスト数                                                                                                                                                |
| backups              | Body | Array    | バックアップリスト                                                                                                                                                    |
| backups.backupId     | Body | UUID     | バックアップの識別子                                                                                                                                                  |
| backups.backupName   | Body | String   | バックアップを識別できる名前                                                                                                                                          |
| backups.backupStatus | Body | Enum     | バックアップの現在状態<br/>- `BACKING_UP`:バックアップ中の場合<br/>- `COMPLETED`:バックアップが完了した場合<br/>- `DELETING`:バックアップが削除中の場合<br/>- `DELETED`:バックアップが削除された場合<br/>- `ERROR`:エラーが発生した場合 |
| backups.dbInstanceId | Body | UUID     | 原本DBインスタンスの識別子                                                                                                                                          |
| backups.dbVersion    | Body | Enum     | DBバージョン情報                                                                                                                                                 |
| backups.backupType   | Body | Enum     | バックアップタイプ<br/>- `AUTO`:自動<br/>- `MANUAL`: 手動                                                                                                               |
| backups.backupSize   | Body | Number   | バックアップのサイズ<br/>- 単位:`バイト`                                                                                                                                    |
| createdYmdt          | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                         |
| updatedYmdt          | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                         |
| completedYmdt        | Body | DateTime | 完了日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                         |

<details><summary>例</summary>

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
            "backupId": "0017f136-3e01-4530-94aa-20661afe6632",
            "backupName": "backup",
            "backupStatus": "COMPLETED",
            "dbInstanceId": "142e6ccc-3bfb-4e1e-84f7-38861284fafd",
            "dbVersion": "POSTGRESQL_V17_6",
            "backupType": "AUTO",
            "backupSize": 4996786,
            "createdYmdt": "2023-02-21T00:35:00+09:00",
            "updatedYmdt": "2023-02-22T00:35:32+09:00",
            "completedYmdt": "2023-02-22T00:35:32+09:00"
        }
    ]
}
```
</details>

<a id="export-backup-to-object-storage"></a>
### オブジェクトストレージにバックアップをエクスポート { #export-backup-to-object-storage }

```http
POST /v1.0/backups/{backupId}/export
```

<a id="export-backup-to-object-storage-required-permissions"></a>
#### 必要権限

| 権限名                           | 説明                |
|--------------------------------|--------------------|
| RDSforPostgreSQL:Backup.Export | オブジェクトストレージにバックアップをエクスポート |

<a id="export-backup-to-object-storage-request"></a>
#### リクエスト

| 名前             | 種類  | 形式    | 必須 | 説明                         |
|-----------------|------|--------|----|-----------------------------|
| backupId        | URL  | UUID   | O  | バックアップの識別子                    |
| tenantId        | Body | String | O  | バックアップが保存されるオブジェクトストレージのテナントID   |
| username        | Body | String | O  | NHN CloudアカウントまたはIAMアカウントID   |
| password        | Body | String | O  | バックアップが保存されるオブジェクトストレージのAPIパスワード |
| targetContainer | Body | String | O  | バックアップが保存されるオブジェクトストレージのコンテナ    |
| objectPath      | Body | String | O  | コンテナに保存されるバックアップのパス           |

<details><summary>例</summary>

```json
{
    "tenantId": "399631c404744dbbb18ce4fa2dc71a5a",
    "username": "gildong.hong@nhn.com",
    "password": "password",
    "targetContainer": "/container",
    "objectPath": "/backups/backup_file"
}
```
</details>

<a id="export-backup-to-object-storage-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="restore-backup"></a>
### バックアップの復元 { #restore-backup }

```http
POST /v1.0/backups/{backupId}/restore
```

<a id="restore-backup-required-permissions"></a>
#### 必要権限

| 権限名                            | 説明     |
|---------------------------------|---------|
| RDSforPostgreSQL:Backup.Restore | バックアップの復元 |

<a id="restore-backup-request"></a>
#### リクエスト

| 名前                                      | 種類  | 形式     | 必須 | 説明                                                                                                                                                                                                                       |
|------------------------------------------|------|---------|----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| backupId                                 | URL  | UUID    | O  | バックアップの識別子                                                                                                                                                                                                                  |
| dbInstanceName                           | Body | String  | O  | DBインスタンスを識別できる名前                                                                                                                                                                                                     |
| description                              | Body | String  | X  | DBインスタンスの追加情報                                                                                                                                                                                                        |
| dbFlavorId                               | Body | UUID    | O  | DBインスタンス仕様の識別子                                                                                                                                                                                                          |
| dbPort                                   | Body | Number  | O  | DBポート<br/>- 最小値:`5432`<br/>- 最大値:`45432`                                                                                                                                                                                |
| parameterGroupId                         | Body | UUID    | O  | パラメータグループの識別子                                                                                                                                                                                                             |
| dbSecurityGroupIds                       | Body | Array   | X  | DBセキュリティグループの識別子リスト                                                                                                                                                                                                         ||network|Body|Object|O|ネットワーク情報オブジェクト|
| userGroupIds                             | Body | Array   | X  | ユーザーグループの識別子リスト                                                                                                                                                                                                           |
| useDefaultNotification                   | Body | Boolean | X  | 基本通知の使用有無<br/>- デフォルト値:`false`                                                                                                                                                                                            |
| useDeletionProtection                    | Body | Boolean | X  | 削除保護の有無<br/>- デフォルト値:`false`                                                                                                                                                                                               | 
| useHighAvailability                      | Body | Boolean | X  | 高可用性の使用有無                                                                                                                                                                                                                |
| pingInterval                             | Body | Number  | X  | 高可用性使用時のPing間隔(秒)<br/>- 最小値:`1`<br/>- 最大値:`600`                                                                                                                                                                      |
| failoverReplWaitingTime                  | Body | Number  | X  | 高可用性使用時のフェイルオーバー待機時間<br/>- 最小値:`-1`<br/>- -1に設定時、複製遅延が解消されるまで待機し続けます。                                                                                                                                              |                                                                                                                                                                                                                      | userGroupIds                             | Body | Array   | X  | 基本通知受信用のユーザーグループの識別子リスト                                                                                                                                                                                            |
| network                                  | Body | Object  | O  | ネットワーク情報オブジェクト                                                                                                                                                                                                               |
| network.subnetId                         | Body | UUID    | O  | サブネットの識別子                                                                                                                                                                                                                 |
| network.usePublicAccess                  | Body | Boolean | X  | 外部接続可否<br/>- デフォルト値:`false`                                                                                                                                                                                            |
| network.availabilityZone                 | Body | Enum    | X  | DBインスタンスを作成するアベイラビリティゾーン<br/>- 例:`kr-pub-a`<br/>- デフォルト値:`任意のアベイラビリティゾーン`                                                                                                                                                          |
| storage                                  | Body | Object  | O  | ストレージ情報オブジェクト                                                                                                                                                                                                               |    
| storage.storageType                      | Body | Enum    | O  | データストレージタイプ<br/>- 例:`General SSD`                                                                                                                                                                                       |
| storage.storageSize                      | Body | Number  | O  | データストレージサイズ<br/>- 単位: `ギガバイト`<br/>- 最小値:`20`<br/>- 最大値:`2048`                                                                                                                                                           |
| backup                                   | Body | Object  | O  | バックアップ情報オブジェクト                                                                                                                                                                                                                 |
| backup.backupPeriod                      | Body | Number  | O  | バックアップの保管期間(日)<br/>- 最小値:`0`<br/>- 最大値:`730`                                                                                                                                                                               |
| backup.backupRetryCount                  | Body | Number  | X  | バックアップの再試行回数<br/>- デフォルト値:`0`<br/>- 最小値:`0`<br/>- 最大値:`10`                                                                                                                                                                   |
| backup.backupSchedules                   | Body | Array   | X  | バックアップスケジュールリスト                                                                                                                                                                                                                |
| backup.backupSchedules.backupWndBgnTime  | Body | String  | O  | バックアップ開始時間<br/>- 例:`00:00:00`                                                                                                                                                                                             |
| backup.backupSchedules.backupWndDuration | Body | Enum    | O  | バックアップDuration<br/>バックアップ開始時間から設定された期間内に自動バックアップが実行されます。<br/>- `HALF_AN_HOUR`:30分<br/>- `ONE_HOUR`:1時間<br/>- `ONE_HOUR_AND_HALF`:1時間30分<br/>- `TWO_HOURS`:2時間<br/>- `TWO_HOURS_AND_HALF`:2時間30分<br/>- `THREE_HOURS`:3時間 |

<details><summary>例</summary>

```json

{
  "dbInstanceName": "db-instance-restore",
  "dbFlavorId": "50be6d9c-02d6-4594-a2d4-12010eb65ec0",
  "dbPort": 15432,
  "parameterGroupId": "132d383c-38e3-468a-a826-5e9a8fff15d0",
  "network": {
    "subnetId": "e721a9dd-dad0-4cf0-a53b-dd654ebfc683"
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
        "backupWndDuration": "HALF_AN_HOUR",
        "backupRetryExpireTime": "00:30:00"
      }
    ]
  }
}
```
</details>

<a id="restore-backup-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="delete-backup"></a>
### バックアップ削除 { #delete-backup }

```http
DELETE /v1.0/backups/{backupId}
```

<a id="delete-backup-required-permissions"></a>
#### 必要権限

| 権限名                           | 説明     |
|--------------------------------|---------|
| RDSforPostgreSQL:Backup.Delete | バックアップ削除 |

<a id="delete-backup-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前      | 種類 | 形式  | 必須 | 説明     |
|----------|-----|------|----|---------|
| backupId | URL | UUID | O  | バックアップの識別子 |

<a id="delete-backup-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="db-security-group"></a>
## DBセキュリティグループ { #db-security-group }

<a id="list-db-security-groups"></a>
### DBセキュリティグループリストを表示 { #list-db-security-groups }

```http
GET /v1.0/db-security-groups
```

<a id="list-db-security-groups-required-permissions"></a>
#### 必要権限

| 権限名                                  | 説明            |
|---------------------------------------|----------------|
| RDSforPostgreSQL:DbSecurityGroup.List | DBセキュリティグループリストを表示 |

<a id="list-db-security-groups-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

<a id="list-db-security-groups-response"></a>
#### レスポンス

| 名前                                    | 種類  | 形式      | 説明                                                                                                                                                                                            |
|----------------------------------------|------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroups                       | Body | Array    | DBセキュリティグループリスト                                                                                                                                                                                   |
| dbSecurityGroups.dbSecurityGroupId     | Body | UUID     | DBセキュリティグループの識別子                                                                                                                                                                                 |
| dbSecurityGroups.dbSecurityGroupName   | Body | String   | DBセキュリティグループを識別できる名前                                                                                                                                                                         |
| dbSecurityGroups.dbSecurityGroupStatus | Body | Enum     | DBセキュリティグループの現在状態<br/>- `CREATED`:作成済み<br/>- `DELETED`:削除済み                                                                                                                                     |
| dbSecurityGroups.description           | Body | String   | DBセキュリティグループの追加情報                                                                                                                                                                            |
| dbSecurityGroups.progressStatus        | Body | Enum     | DBセキュリティグループの現在の進行状態<br/>- `NONE`:進行中の作業なし<br/>- `CREATING_RULE`:ルールポリシー作成中<br/>- `UPDATING_RULE`:ルールポリシー修正中<br/>- `DELETING_RULE`:ルールポリシー削除中<br/>- `APPLYING_DEFAULT_RULE`:基本ルール適用中 |
| dbSecurityGroups.createdYmdt           | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                              |
| dbSecurityGroups.updatedYmdt           | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                              |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbSecurityGroups": [
        {
            "dbSecurityGroupId": "fe4f2aee-afbb-4c19-a5e9-eb2eab394708",
            "dbSecurityGroupName": "dbSecurityGroup",
            "dbSecurityGroupStatus": "CREATED",
            "description": "description",
            "progressStatus": "NONE",
            "createdYmdt": "2023-02-19T19:18:13+09:00",
            "updatedYmdt": "2022-02-19T19:18:13+09:00"
        }
    ]
}
```
</details>

<a id="list-db-security-group-details"></a>
### DBセキュリティグループ詳細を表示 { #list-db-security-group-details }

```http
GET /v1.0/db-security-groups/{dbSecurityGroupId}
```

<a id="list-db-security-group-details-required-permissions"></a>
#### 必要権限

| 権限名                                 | 説明            |
|--------------------------------------|----------------|
| RDSforPostgreSQL:DbSecurityGroup.Get | DBセキュリティグループ詳細を表示 |

<a id="list-db-security-group-details-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前               | 種類 | 形式  | 必須 | 説明           |
|-------------------|-----|------|----|---------------|
| dbSecurityGroupId | URL | UUID | O  | DBセキュリティグループの識別子 |

<a id="list-db-security-group-details-response"></a>
#### レスポンス

| 名前                   | 種類  | 形式      | 説明                                                                                                                                                                                           |
|-----------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId     | Body | UUID     | DBセキュリティグループの識別子                                                                                                                                                                                |
| dbSecurityGroupName   | Body | String   | DBセキュリティグループを識別できる名前                                                                                                                                                                        |
| dbSecurityGroupStatus | Body | Enum     | DBセキュリティグループの現在状態<br/>- `CREATED`:作成済み<br/>- `DELETED`:削除済み                                                                                                                                    |
| description           | Body | String   | DBセキュリティグループの追加情報                                                                                                                                                                           |
| progressStatus        | Body | Enum     | DBセキュリティグループの現在の進行状態<br/>- `NONE`:進行中の作業なし<br/>- `CREATING_RULE`:ルールポリシー作成中<br/>- `UPDATING_RULE`:ルールポリシー修正中<br/>- `DELETING_RULE`:ルールポリシー削除中<br/>- `APPLYING_DEFAULT_RULE`:基本ルール適用中 |
| rules                 | Body | Array    | DBセキュリティグループルールリスト                                                                                                                                                                               |
| rules.ruleId          | Body | UUID     | DBセキュリティグループルールの識別子                                                                                                                                                                             |
| rules.description     | Body | String   | DBセキュリティグループルールの追加情報                                                                                                                                                                        |
| rules.direction       | Body | Enum     | 通信方向<br/>- `INGRESS`:受信<br/>- `EGRESS`:送信                                                                                                                                                 |
| rules.etherType       | Body | Enum     | Etherタイプ<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                                |
| rules.port            | Body | Object   | ポートオブジェクト                                                                                                                                                                                        |
| rules.port.portType   | Body | Enum     | ポートタイプ<br/>- `DB_PORT`:各DBインスタンスポート値で設定されます。<br/>- `PORT`:指定されたポート値で設定されます。<br/>- `PORT_RANGE`:指定されたポート範囲で設定されます。                                                                            |
| rules.port.minPort    | Body | Number   | 最小ポート範囲                                                                                                                                                                                     |
| rules.port.maxPort    | Body | Number   | 最大ポート範囲                                                                                                                                                                                     |
| rules.cidr            | Body | String   | 許可するトラフィックの遠隔ソース                                                                                                                                                                               |
| rules.createdYmdt     | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                             |
| rules.updatedYmdt     | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                             |
| createdYmdt           | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                             |
| updatedYmdt           | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                             |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbSecurityGroup": {
        "dbSecurityGroupId": "fe4f2aee-afbb-4c19-a5e9-eb2eab394708",
        "dbSecurityGroupName": "dbSecurityGroup",
        "dbSecurityGroupStatus": "CREATED",
        "description": "description",
        "progressStatus": "NONE",
        "rules": [
            {
                "ruleId": "17c88ef6-95f1-4678-84f9-fee1b22e250d",
                "description": "description",
                "direction": "INGRESS",
                "etherType": "IPV4",
                "port": {
                    "portType": "PORT_RANGE",
                    "minPort": 10000,
                    "maxPort": 10005
                },
                "cidr": "0.0.0.0/0",
                "createdYmdt": "2023-02-19T19:18:13+09:00",
                "updatedYmdt": "2023-02-19T19:18:13+09:00"
            }
        ],
        "createdYmdt": "2023-02-19T19:18:13+09:00",
        "updatedYmdt": "2023-02-19T19:18:13+09:00"
    }
}
```
</details>

<a id="create-db-security-group"></a>
### DBセキュリティグループの作成 { #create-db-security-group }

```http
POST /v1.0/db-security-groups
```

<a id="create-db-security-group-required-permissions"></a>
#### 必要権限

| 権限名                                    | 説明           |
|-----------------------------------------|---------------|
| RDSforPostgreSQL:DbSecurityGroup.Create | DBセキュリティグループ作成 |

<a id="create-db-security-group-request"></a>
#### リクエスト

| 名前                 | 種類  | 形式    | 必須 | 説明                                                                                                                                                                                      |
|---------------------|------|--------|----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupName | Body | String | O  | DBセキュリティグループを識別できる名前                                                                                                                                                                   |
| description         | Body | String | X  | DBセキュリティグループの追加情報                                                                                                                                                                      |
| rules               | Body | Array  | O  | DBセキュリティグループルールリスト                                                                                                                                                                          |
| rules.description   | Body | String | X  | DBセキュリティグループルールの追加情報                                                                                                                                                                   |
| rules.direction     | Body | Enum   | O  | 通信方向<br/>- `INGRESS`:受信<br/>- `EGRESS`:送信                                                                                                                                            |
| rules.etherType     | Body | Enum   | O  | Etherタイプ<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                           |
| rules.cidr          | Body | String | O  | 許可するトラフィックの遠隔ソース<br/>- 例:`1.1.1.1/32`                                                                                                                                                    |
| rules.port          | Body | Object | O  | ポートオブジェクト                                                                                                                                                                                   |
| rules.port.portType | Body | Enum   | O  | ポートタイプ<br/>- `DB_PORT`:各DBインスタンスポート値で設定されます。`minPort`値と`maxPort`値を必要としません。<br/>- `PORT`:指定されたポート値で設定されます。`minPort`値と`maxPort`値が同じである必要があります。<br/>- `PORT_RANGE`:指定されたポート範囲で設定されます。 |
| rules.port.minPort  | Body | Number | X  | 最小ポート範囲<br/>- 受信最小値:5432<br/>- 送信最小値:1                                                                                                                                              |
| rules.port.maxPort  | Body | Number | X  | 最大ポート範囲<br/>- 受信最大値:45432<br/>- 送信最大値:65535                                                                                                                                         |

<details><summary>例</summary>

```json
{
    "dbSecurityGroupName": "dbSecurityGroup",
    "description": "description",
    "rules": [
        {
            "direction": "INGRESS",
            "etherType": "IPV4",
            "port": {
                "portType": "PORT_RANGE",
                "minPort": 10000,
                "maxPort": 10005
            },
            "cidr": "0.0.0.0/0"
        }
    ]
}
```
</details>

<a id="create-db-security-group-response"></a>
#### レスポンス

| 名前               | 種類  | 形式  | 説明           |
|-------------------|------|------|---------------|
| dbSecurityGroupId | Body | UUID | DBセキュリティグループの識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbSecurityGroupId": "fe4f2aee-afbb-4c19-a5e9-eb2eab394708"
}
```
</details>

<a id="modify-db-security-group"></a>
### DBセキュリティグループの修正 { #modify-db-security-group }

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}
```

<a id="modify-db-security-group-required-permissions"></a>
#### 必要権限

| 権限名                                    | 説明           |
|-----------------------------------------|---------------|
| RDSforPostgreSQL:DbSecurityGroup.Modify | DBセキュリティグループの修正 |

<a id="modify-db-security-group-request"></a>
#### リクエスト

| 名前                 | 種類  | 形式    | 必須 | 説明                   |
|---------------------|------|--------|----|-----------------------|
| dbSecurityGroupId   | URL  | UUID   | O  | DBセキュリティグループの識別子        |
| dbSecurityGroupName | Body | String | X  | DBセキュリティグループを識別できる名前 |
| description         | Body | String | X  | DBセキュリティグループの追加情報   |

<details><summary>例</summary>

```json
{
    "dbSecurityGroupName": "dbSecurityGroup",
    "description": "description"
}
```
</details>

<a id="modify-db-security-group-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="delete-db-security-group"></a>
### DBセキュリティグループの削除 { #delete-db-security-group }

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}
```

<a id="delete-db-security-group-required-permissions"></a>
#### 必要権限

| 権限名                                    | 説明           |
|-----------------------------------------|---------------|
| RDSforPostgreSQL:DbSecurityGroup.Delete | DBセキュリティグループの削除 |

<a id="delete-db-security-group-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前               | 種類 | 形式  | 必須 | 説明           |
|-------------------|-----|------|----|---------------|
| dbSecurityGroupId | URL | UUID | O  | DBセキュリティグループの識別子 |

<a id="delete-db-security-group-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="db-security-group-create-db-security-group"></a>
### DBセキュリティグループルールの作成 { #db-security-group-create-db-security-group }

```http
POST /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

<a id="db-security-group-create-db-security-group-required-permissions"></a>
#### 必要権限

| 権限名                                        | 説明              |
|---------------------------------------------|------------------|
| RDSforPostgreSQL:DbSecurityGroupRule.Create | DBセキュリティグループルールの作成 |

<a id="db-security-group-create-db-security-group-request"></a>
#### リクエスト

| 名前               | 種類  | 形式    | 必須 | 説明                                                                                                                                                                                      |
|-------------------|------|--------|----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId | URL  | UUID   | O  | DBセキュリティグループの識別子                                                                                                                                                                           |
| description       | Body | String | X  | DBセキュリティグループルールの追加情報                                                                                                                                                                   |
| direction         | Body | Enum   | O  | 通信方向<br/>- `INGRESS`:受信<br/>- `EGRESS`:送信                                                                                                                                            |
| etherType         | Body | Enum   | O  | Etherタイプ<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                           |
| port              | Body | Object | O  | ポートオブジェクト                                                                                                                                                                                   |
| port.portType     | Body | Enum   | O  | ポートタイプ<br/>- `DB_PORT`:各DBインスタンスポート値で設定されます。`minPort`値と`maxPort`値を必要としません。<br/>- `PORT`:指定されたポート値で設定されます。`minPort`値と`maxPort`値が同じである必要があります。<br/>- `PORT_RANGE`:指定されたポート範囲で設定されます。 |
| port.minPort      | Body | Number | X  | 最小ポート範囲<br/>- 受信最小値:5432<br/>- 送信最小値:1                                                                                                                                              |
| port.maxPort      | Body | Number | X  | 最大ポート範囲<br/>- 受信最大値:45432<br/>- 送信最大値:65535                                                                                                                                         |
| cidr              | Body | String | O  | 許可するトラフィックの遠隔ソース<br/>- 例:`1.1.1.1/32`                                                                                                                                                    |

<details><summary>例</summary>

```json
{
    "direction": "INGRESS",
    "etherType": "IPV4",
    "port": {
        "portType": "PORT",
        "minPort": 10000,
        "maxPort": 10000
    },
    "cidr": "0.0.0.0/0"
}
```
</details>

<a id="db-security-group-create-db-security-group-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="modify-db-security-group-rule"></a>
### DBセキュリティグループルールの修正 { #modify-db-security-group-rule }

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

<a id="modify-db-security-group-rule-required-permissions"></a>
#### 必要権限

| 権限名                                        | 説明              |
|---------------------------------------------|------------------|
| RDSforPostgreSQL:DbSecurityGroupRule.Modify | DBセキュリティグループルールの修正 |

<a id="modify-db-security-group-rule-request"></a>
#### リクエスト

| 名前               | 種類  | 形式    | 必須 | 説明                                                                                                                                                                                      |
|-------------------|------|--------|----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId | URL  | UUID   | O  | DBセキュリティグループの識別子                                                                                                                                                                           |
| ruleId            | URL  | UUID   | O  | DBセキュリティグループルールの識別子                                                                                                                                                                        |
| description       | Body | String | X  | DBセキュリティグループルールの追加情報                                                                                                                                                                   |
| direction         | Body | Enum   | O  | 通信方向<br/>- `INGRESS`:受信<br/>- `EGRESS`:送信                                                                                                                                            |
| etherType         | Body | Enum   | O  | Etherタイプ<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                           |
| port              | Body | Object | O  | ポートオブジェクト                                                                                                                                                                                   |
| port.portType     | Body | Enum   | O  | ポートタイプ<br/>- `DB_PORT`:各DBインスタンスポート値で設定されます。`minPort`値と`maxPort`値を必要としません。<br/>- `PORT`:指定されたポート値で設定されます。`minPort`値と`maxPort`値が同じである必要があります。<br/>- `PORT_RANGE`:指定されたポート範囲で設定されます。 |
| port.minPort      | Body | Number | X  | 最小ポート範囲<br/>- 受信最小値:5432<br/>- 送信最小値:1                                                                                                                                              |
| port.maxPort      | Body | Number | X  | 最大ポート範囲<br/>- 受信最大値:45432<br/>- 送信最大値:65535                                                                                                                                         |
| cidr              | Body | String | O  | 許可するトラフィックの遠隔ソース<br/>- 例:`1.1.1.1/32`                                                                                                                                                    |

<details><summary>例</summary>

```json
{
    "direction": "INGRESS",
    "etherType": "IPV4",
    "port": {
        "portType": "DB_PORT"
    },
    "cidr": "0.0.0.0/0"
}
```
</details>

<a id="modify-db-security-group-rule-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="delete-db-security-group-rule"></a>
### DBセキュリティグループルールの削除 { #delete-db-security-group-rule }

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

<a id="delete-db-security-group-rule-required-permissions"></a>
#### 必要権限

| 権限名                                        | 説明              |
|---------------------------------------------|------------------|
| RDSforPostgreSQL:DbSecurityGroupRule.Create | DBセキュリティグループルールの削除 |

<a id="delete-db-security-group-rule-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前               | 種類   | 形式   | 必須 | 説明                 |
|-------------------|-------|-------|----|---------------------|
| dbSecurityGroupId | URL   | UUID  | O  | DBセキュリティグループの識別子      |
| ruleIds           | Query | Array | O  | DBセキュリティグループルールの識別子リスト |

<a id="delete-db-security-group-rule-response"></a>
#### レスポンス

| 名前   | 種類  | 形式  | 説明         |
|-------|------|------|-------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c"
}
```
</details>

<a id="parameter-group"></a>
## パラメータグループ { #parameter-group }

<a id="list-parameter-groups"></a>
### パラメータグループリストを表示 { #list-parameter-groups }

```http
GET /v1.0/parameter-groups
```

<a id="list-parameter-groups-required-permissions"></a>
#### 必要権限

| 権限名                                 | 説明           |
|--------------------------------------|---------------|
| RDSforPostgreSQL:ParameterGroup.List | パラメータグループリストを表示 |

<a id="list-parameter-groups-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前       | 種類   | 形式  | 必須 | 説明      |
|-----------|-------|------|----|----------|
| dbVersion | Query | Enum | X  | DBバージョン情報 |

<a id="list-parameter-groups-response"></a>
#### レスポンス

| 名前                                  | 種類  | 形式      | 説明                                                               |
|--------------------------------------|------|----------|-------------------------------------------------------------------|
| parameterGroups                      | Body | Array    | パラメータグループリスト                                                       |
| parameterGroups.parameterGroupId     | Body | UUID     | パラメータグループの識別子                                                     |
| parameterGroups.parameterGroupName   | Body | String   | パラメータグループを識別できる名前                                             |
| parameterGroups.parameterGroupStatus | Body | Enum     | パラメータグループの現在状態<br/>- `STABLE`:適用完了<br/>- `NEED_TO_APPLY`:適用必要 |
| parameterGroups.description          | Body | String   | パラメータグループの追加情報                                                |
| parameterGroups.dbVersion            | Body | Enum     | DBバージョン情報                                                         |
| parameterGroups.createdYmdt          | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                 |
| parameterGroups.updatedYmdt          | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroups": [
        {
            "parameterGroupId": "404e8a89-ca4d-4fca-96c2-1518754d50b7",
            "parameterGroupName": "parameter-group",
            "parameterGroupStatus": "STABLE",
            "description": null,
            "dbVersion": "POSTGRESQL_V17_6",
            "createdYmdt": "2023-02-31T15:28:17+09:00",
            "updatedYmdt": "2023-02-31T15:28:17+09:00"
        }
    ]
}
```
</details>


<a id="list-parameter-group-details"></a>
### パラメータグループ詳細を表示 { #list-parameter-group-details }

```http
GET /v1.0/parameter-groups/{parameterGroupId}
```

<a id="list-parameter-group-details-required-permissions"></a>
#### 必要権限

| 権限名                                | 説明           |
|-------------------------------------|---------------|
| RDSforPostgreSQL:ParameterGroup.Get | パラメータグループ詳細を表示 |

<a id="list-parameter-group-details-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前              | 種類 | 形式  | 必須 | 説明          |
|------------------|-----|------|----|--------------|
| parameterGroupId | URL | UUID | O  | パラメータグループの識別子 |

<a id="list-parameter-group-details-response"></a>
#### レスポンス

| 名前                          | 種類  | 形式      | 説明                                                                                                                                                                                                                                                                                                                                                |
|------------------------------|------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| parameterGroupId             | Body | UUID     | パラメータグループの識別子                                                                                                                                                                                                                                                                                                                                      |
| parameterGroupName           | Body | String   | パラメータグループを識別できる名前                                                                                                                                                                                                                                                                                                                              |
| description                  | Body | String   | パラメータグループの追加情報                                                                                                                                                                                                                                                                                                                                 |
| dbVersion                    | Body | Enum     | DBバージョン情報                                                                                                                                                                                                                                                                                                                                          |
| parameterGroupStatus         | Body | Enum     | パラメータグループの現在状態<br/>- `STABLE`:適用完了<br/>- `NEED_TO_APPLY`:適用必要<br/>- `DELETED`:削除済み                                                                                                                                                                                                                                                            |
| parameters                   | Body | Array    | パラメータリスト                                                                                                                                                                                                                                                                                                                                           |
| parameters.parameterCategory | Body | String   | パラメータカテゴリー                                                                                                                                                                                                                                                                                                                                         |
| parameters.parameterName     | Body | String   | パラメータ名                                                                                                                                                                                                                                                                                                                                           |
| parameters.value             | Body | String   | 現在設定されている値                                                                                                                                                                                                                                                                                                                                          |
| parameters.valueUnit         | Body | Enum     | 現在設定されている値の単位<br/>- `B`:バイト<br/>- `kB`:キロバイト<br/>- `MB`:メガバイト<br/>- `GB`:ギガバイト<br/>- `TB`:テラバイト<br/>- `us`:マイクロ秒<br/>- `ms`:ミリ秒<br/>- `s`:秒<br/>- `min`:分<br/>- `h`:時間<br/>- `d`:日                                                                                                                                                        |
| parameters.defaultValue      | Body | String   | デフォルト値                                                                                                                                                                                                                                                                                                                                               |
| parameters.allowedValue      | Body | String   | 許可された値                                                                                                                                                                                                                                                                                                                                             |
| parameters.valueType         | Body | Enum     | 値タイプ<br/>- `BOOLEAN`:ブーリアンタイプ<br/>- `STRING`:文字列タイプ<br/>- `NUMERIC`:整数および浮動小数点タイプ<br/>- `NUMERIC_WITH_BYTE_UNIT`:バイト単位の数字タイプ(例：120KB、100MB)<br/>- `NUMERIC_WITH_TIME_UNIT`:時間単位の数字タイプ(例：120ms、100s、1d)<br/>- `ENUMERATED`:許可された値に宣言された値の中から1つを入力<br/>- `MULTI_ENUMERATED`:許可された値に宣言された値の中から複数個を入力(コンマ(,)で区分される)<br/>- `TIMEZONE`:タイムゾーンタイプ |
| parameters.updateType        | Body | Enum     | 修正タイプ<br/>- `VARIABLE`:常に修正可能<br/>- `CONSTANT`:修正 不可能                                                                                                                                                                                                                                                                                        |
| parameters.applyType         | Body | Enum     | 適用タイプ<br/>- `SESSION`:セッション適用<br/>- `FILE`:設定ファイル適用(再起動必要)<br/>- `BOTH`:全体                                                                                                                                                                                                                                                                      | 
| createdYmdt                  | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                                                                                                                                                                                  |
| updatedYmdt                  | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                                                                                                                                                                                  |
| expressionAvailable          | Body | Boolean  | 数式の使用可否                                                                                                                                                                                                                                                                                                                                           |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroupId": "404e8a89-ca4d-4fca-96c2-1518754d50b7",
    "parameterGroupName": "parameter-group",
    "description": null,
    "dbVersion": "POSTGRESQL_V17_6",
    "parameterGroupStatus": "STABLE",
    "parameters": [
        {
            "parameterCategory": "Write-Ahead Log / Checkpoints",
            "parameterName": "checkpoint_timeout",
            "value": "300s",
            "defaultValue": "300s",
            "allowedValue": "30~86400s",
            "valueType": "NUMERIC_WITH_TIME_UNIT",
            "updateType": "VARIABLE",
            "applyType": "BOTH",
            "expressionAvailable": true
        }
    ],
    "createdYmdt": "2023-03-13T11:02:28+09:00",
    "updatedYmdt": "2023-03-13T11:02:28+09:00"
}
```
</details>


<a id="create-parameter-group"></a>
### パラメータグループの作成 { #create-parameter-group }

```http
POST /v1.0/parameter-groups
```

<a id="create-parameter-group-required-permissions"></a>
#### 必要権限

| 権限名                                   | 説明          |
|----------------------------------------|--------------|
| RDSforPostgreSQL:ParameterGroup.Create | パラメータグループの作成 |

<a id="create-parameter-group-request"></a>
#### リクエスト

| 名前                | 種類  | 形式    | 必須 | 説明                  |
|--------------------|------|--------|----|----------------------|
| parameterGroupName | Body | String | O  | パラメータグループを識別できる名前 |
| description        | Body | String | X  | パラメータグループの追加情報   |
| dbVersion          | Body | Enum   | O  | DBバージョン情報            |

<details><summary>例</summary>

```json
{
    "parameterGroupName": "parameter-group",
    "description": "description",
    "dbVersion": "POSTGRESQL_V17_6"
}
```
</details>

<a id="create-parameter-group-response"></a>
#### レスポンス

| 名前              | 種類  | 形式  | 説明          |
|------------------|------|------|--------------|
| parameterGroupId | Body | UUID | パラメータグループの識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroupId": "404e8a89-ca4d-4fca-96c2-1518754d50b7"
}
```
</details>

<a id="copy-parameter-group"></a>
### パラメータグループのコピー { #copy-parameter-group }

```http
POST /v1.0/parameter-groups/{parameterGroupId}/copy
```

<a id="copy-parameter-group-required-permissions"></a>
#### 必要権限

| 権限名                                 | 説明          |
|--------------------------------------|--------------|
| RDSforPostgreSQL:ParameterGroup.Copy | パラメータグループのコピー |

<a id="copy-parameter-group-request"></a>
#### リクエスト

| 名前                | 種類  | 形式    | 必須 | 説明                  |
|--------------------|------|--------|----|----------------------|
| parameterGroupId   | URL  | UUID   | O  | パラメータグループの識別子        |
| parameterGroupName | Body | String | O  | パラメータグループを識別できる名前 |
| description        | Body | String | X  | パラメータグループの追加情報   |

<details><summary>例</summary>

```json
{
    "parameterGroupName": "parameter-group-copy",
    "description": "copy"
}
```
</details>

<a id="copy-parameter-group-response"></a>
#### レスポンス

| 名前              | 種類  | 形式  | 説明          |
|------------------|------|------|--------------|
| parameterGroupId | Body | UUID | パラメータグループの識別子 |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroupId": "404e8a89-ca4d-4fca-96c2-1518754d50b7"
}
```
</details>

<a id="modify-parameter-group"></a>
### パラメータグループの修正 { #modify-parameter-group }

```http
PUT /v1.0/parameter-groups/{parameterGroupId}
```

<a id="modify-parameter-group-required-permissions"></a>
#### 必要権限

| 権限名                                   | 説明          |
|----------------------------------------|--------------|
| RDSforPostgreSQL:ParameterGroup.Modify | パラメータグループの修正 |

<a id="modify-parameter-group-request"></a>
#### リクエスト

| 名前                | 種類  | 形式    | 必須 | 説明                  |
|--------------------|------|--------|----|----------------------|
| parameterGroupId   | URL  | UUID   | O  | パラメータグループの識別子        |
| parameterGroupName | Body | String | X  | パラメータグループを識別できる名前 |
| description        | Body | String | X  | パラメータグループの追加情報   |

<details><summary>例</summary>

```json
{
    "parameterGroupName": "parameter-group",
    "description": "description"
}
```
</details>

<a id="modify-parameter-group-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="modify-parameter"></a>
### パラメータ修正 { #modify-parameter }

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/parameters
```

<a id="modify-parameter-required-permissions"></a>
#### 必要権限

| 権限名                                   | 説明          |
|----------------------------------------|--------------|
| RDSforPostgreSQL:ParameterGroup.Modify | パラメータグループの修正 |

<a id="modify-parameter-request"></a>
#### リクエスト

| 名前                              | 種類  | 形式    | 必須 | 説明          |
|----------------------------------|------|--------|----|--------------|
| parameterGroupId                 | URL  | UUID   | O  | パラメータグループの識別子 |
| modifiedParameters               | Body | Array  | O  | 変更するパラメータリスト |
| modifiedParameters.parameterName | Body | UUID   | O  | パラメータ名     |
| modifiedParameters.value         | Body | String | O  | 変更するパラメータ値  |

<details><summary>例</summary>

```json
{
   "modifiedParameters": [
       {
           "parameterName": "checkpoint_timeout",
           "value": "100s"
       }
   ]
}
```
</details>

<a id="modify-parameter-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="reset-parameter-group"></a>
### パラメータグループの再設定 { #reset-parameter-group }

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/reset
```

<a id="reset-parameter-group-required-permissions"></a>
#### 必要権限

| 権限名                                  | 説明           |
|---------------------------------------|---------------|
| RDSforPostgreSQL:ParameterGroup.Reset | パラメータグループの再設定 |

<a id="reset-parameter-group-request"></a>
#### リクエスト

| 名前              | 種類 | 形式  | 必須 | 説明          |
|------------------|-----|------|----|--------------|
| parameterGroupId | URL | UUID | O  | パラメータグループの識別子 |

<a id="reset-parameter-group-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="delete-parameter-group"></a>
### パラメータグループの削除 { #delete-parameter-group }

```http
DELETE /v1.0/parameter-groups/{parameterGroupId}
```

<a id="delete-parameter-group-required-permissions"></a>
#### 必要権限

| 権限名                                   | 説明          |
|----------------------------------------|--------------|
| RDSforPostgreSQL:ParameterGroup.Delete | パラメータグループの削除 |

<a id="delete-parameter-group-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前              | 種類 | 形式  | 必須 | 説明          |
|------------------|-----|------|----|--------------|
| parameterGroupId | URL | UUID | O  | パラメータグループの識別子 |

<a id="delete-parameter-group-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="user-group"></a>
## ユーザーグループ { #user-group }

<a id="list-user-groups"></a>
### ユーザーグループリストを表示 { #list-user-groups }

```http
GET /v1.0/user-groups
```

<a id="list-user-groups-required-permissions"></a>
#### 必要権限

| 権限名                            | 説明          |
|---------------------------------|--------------|
| RDSforPostgreSQL:UserGroup.List | ユーザーグループリストを表示 |

<a id="list-user-groups-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

<a id="list-user-groups-response"></a>
#### レスポンス

| 名前                      | 種類  | 形式      | 説明                                                     |
|--------------------------|------|----------|---------------------------------------------------------|
| userGroups               | Body | Array    | ユーザーグループリスト                                              |
| userGroups.userGroupId   | Body | UUID     | ユーザーグループの識別子                                            |
| userGroups.userGroupName | Body | String   | ユーザーグループを識別できる名前                                    |
| userGroupStatus          | Body | Enum     | ユーザーグループの現在状態<br/>- `CREATED`:作成済み<br/>- `DELETED`:削除済み |
| userGroups.createdYmdt   | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                       |
| userGroups.updatedYmdt   | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                       |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "userGroups": [
        {
            "userGroupId": "1aac0437-f32d-4923-ad3c-ac61c1cfdfe0",
            "userGroupName": "dev-team",
            "userGroupStatus": "CREATED",
            "createdYmdt": "2023-02-23T10:07:54+09:00",
            "updatedYmdt": "2023-02-26T01:15:50+09:00"
        }
    ]
}
```
</details>


<a id="list-user-group-details"></a>
### ユーザーグループ詳細を表示 { #list-user-group-details }

```http
GET /v1.0/user-groups/{userGroupId}
```

<a id="list-user-group-details-required-permissions"></a>
#### 必要権限

| 権限名                           | 説明          |
|--------------------------------|--------------|
| RDSforPostgreSQL:UserGroup.Get | ユーザーグループ詳細を表示 |

<a id="list-user-group-details-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前         | 種類 | 形式  | 必須 | 説明         |
|-------------|-----|------|----|-------------|
| userGroupId | URL | UUID | O  | ユーザーグループの識別子 |

<a id="list-user-group-details-response"></a>
#### レスポンス

| 名前               | 種類  | 形式      | 説明                                                                                                       |
|-------------------|------|----------|-----------------------------------------------------------------------------------------------------------|
| userGroupId       | Body | UUID     | ユーザーグループの識別子                                                                                              |
| userGroupName     | Body | String   | ユーザーグループを識別できる名前                                                                                      |
| userGroupTypeCode | Body | Enum     | ユーザーグループ種類<br />`ENTIRE`:プロジェクトメンバー全体を含むユーザーグループ<br />`INDIVIDUAL_MEMBER`:特定プロジェクトメンバーを含むユーザーグループ |
| userGroupStatus   | Body | Enum     | ユーザーグループの現在状態<br/>- `CREATED`:作成済み<br/>- `DELETED`:削除済み                                                  |
| members           | Body | Array    | プロジェクトメンバーリスト                                                                                               |
| members.memberId  | Body | UUID     | プロジェクトメンバーの識別子                                                                                             |
| createdYmdt       | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                         |
| updatedYmdt       | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                         |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "userGroupId": "1aac0437-f32d-4923-ad3c-ac61c1cfdfe0",
    "userGroupName": "dev-team",
    "userGroupStatus": "CREATED",
	"userGroupTypeCode": "INDIVIDUAL_MEMBER",
    "members": [
        {
            "memberId": "1321e759-2ef3-4b85-9921-b13e918b24b5"
        }
    ],
    "createdYmdt": "2023-02-23T10:07:54+09:00",
    "updatedYmdt": "2023-02-26T01:15:50+09:00"
}
```
</details>


<a id="create-user-group"></a>
### ユーザーグループの作成 { #create-user-group }

```http
POST /v1.0/user-groups
```

<a id="create-user-group-required-permissions"></a>
#### 必要権限

| 権限名                              | 説明         |
|-----------------------------------|-------------|
| RDSforPostgreSQL:UserGroup.Create | ユーザーグループの作成 |

<a id="create-user-group-request"></a>
#### リクエスト

| 名前           | 種類  | 形式     | 必須 | 説明                                                             |
|---------------|------|---------|----|-----------------------------------------------------------------|
| userGroupName | Body | String  | O  | ユーザーグループを識別できる名前                                            |
| memberIds     | Body | Array   | O  | プロジェクトメンバーの識別子リスト<br />`selectAllYN`がtrueの場合、該当フィールド値は無視される |
| selectAllYN   | Body | Boolean | X  | プロジェクトメンバー全体の有無<br />trueの場合、該当グループは全メンバーに対して設定される              |

<details><summary>例</summary>

```json
{
    "userGroupName": "dev-team",
    "memberIds": ["1321e759-2ef3-4b85-9921-b13e918b24b5"]
}
```

```json
{
    "userGroupName": "dev-team",
    "selectAllYN":true
}
```
</details>

<a id="create-user-group-response"></a>
#### レスポンス

| 名前         | 種類  | 形式  | 説明         |
|-------------|------|------|-------------|
| userGroupId | Body | UUID | ユーザーグループの識別子 |


<a id="modify-user-group"></a>
### ユーザーグループの修正 { #modify-user-group }

```http
PUT /v1.0/user-groups/{userGroupId}
```

<a id="modify-user-group-required-permissions"></a>
#### 必要権限

| 権限名                              | 説明         |
|-----------------------------------|-------------|
| RDSforPostgreSQL:UserGroup.Modify | ユーザーグループの修正 |

<a id="modify-user-group-request"></a>
#### リクエスト

| 名前           | 種類  | 形式     | 必須 | 説明                                                |
|---------------|------|---------|----|----------------------------------------------------|
| userGroupId   | URL  | UUID    | O  | ユーザーグループの識別子                                       |
| userGroupName | Body | String  | X  | ユーザーグループを識別できる名前                               |
| memberIds     | Body | Array   | X  | プロジェクトメンバーの識別子リスト                                   |
| selectAllYN   | Body | Boolean | X  | プロジェクトメンバー全体の有無<br />trueの 場合、該当グループは全メンバーに対して設定される |

<details><summary>例</summary>

```json
{
    "userGroupName": "dev-team",
    "memberIds": ["1321e759-2ef3-4b85-9921-b13e918b24b5","f9064b09-2b15-442e-a4b0-3a5a2754555e"]
}
```
</details>

<a id="modify-user-group-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="delete-user-group"></a>
### ユーザーグループの削除 { #delete-user-group }

```http
DELETE /v1.0/user-groups/{userGroupId}
```

<a id="delete-user-group-required-permissions"></a>
#### 必要権限

| 権限名                              | 説明         |
|-----------------------------------|-------------|
| RDSforPostgreSQL:UserGroup.Delete | ユーザーグループの削除 |

<a id="delete-user-group-request"></a>
#### リクエスト

| 名前         | 種類 | 形式  | 必須 | 説明         |
|-------------|-----|------|----|-------------|
| userGroupId | URL | UUID | O  | ユーザーグループの識別子 |

<a id="delete-user-group-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="notification-group"></a>
## 通知グループ { #notification-group }

<a id="list-notification-groups"></a>
### 通知グループリストを表示 { #list-notification-groups }

```http
GET /v1.0/notification-groups
```

<a id="list-notification-groups-required-permissions"></a>
#### 必要権限

| 権限名                                    | 説明         |
|-----------------------------------------|-------------|
| RDSforPostgreSQL:NotificationGroup.List | 通知グループリストを表示 |

<a id="list-notification-groups-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

<a id="list-notification-groups-response"></a>
#### レスポンス

| 名前                                        | 種類  | 形式      | 説明                                                    |
|--------------------------------------------|------|----------|--------------------------------------------------------|
| notificationGroups                         | Body | Array    | 通知グループリスト                                              |
| notificationGroups.notificationGroupId     | Body | UUID     | 通知グループの識別子                                            |
| notificationGroups.notificationGroupName   | Body | String   | 通知グループを識別できる名前                                    |
| notificationGroups.notificationGroupStatus | Body | Enum     | 通知グループの現在状態<br/>- `CREATED`:作成済み<br/>- `DELETED`:削除済み |
| notificationGroups.notifyEmail             | Body | Boolean  | メール通知の有無                                              |
| notificationGroups.notifySms               | Body | Boolean  | SMS通知の有無                                              |
| notificationGroups.isEnabled               | Body | Boolean  | 有効かどうか                                                 |
| notificationGroups.createdYmdt             | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                      |
| notificationGroups.updatedYmdt             | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                      |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "notificationGroups": [
        {
            "notificationGroupId": "b3901f17-9971-4d1e-8a81-8448cf533dc7",
            "notificationGroupName": "dev-team-noti",
            "notifyEmail": true,
            "notifySms": false,
            "isEnabled": true,
            "createdYmdt": "2023-02-20T13:34:13+09:00",
            "updatedYmdt": "2023-02-20T13:34:13+09:00"
        }
    ]
}
```
</details>


<a id="notification-group-list-notification-groups"></a>
### 通知グループ詳細を表示 { #notification-group-list-notification-groups }

```http
GET /v1.0/notification-groups/{notificationGroupId}
```

<a id="notification-group-list-notification-groups-required-permissions"></a>
#### 必要権限

| 権限名                                   | 説明         |
|----------------------------------------|-------------|
| RDSforPostgreSQL:NotificationGroup.Get | 通知グループ詳細を表示 |

<a id="notification-group-list-notification-groups-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前                 | 種類 | 形式  | 必須 | 説明        |
|---------------------|-----|------|----|------------|
| notificationGroupId | URL | UUID | O  | 通知グループの識別子 |

<a id="notification-group-list-notification-groups-response"></a>
#### レスポンス

| 名前                        | 種類  | 形式      | 説明                                                    |
|----------------------------|------|----------|--------------------------------------------------------|
| notificationGroupId        | Body | UUID     | 通知グループの識別子                                            |
| notificationGroupName      | Body | String   | 通知グループを識別できる名前                                    |
| notificationGroupStatus    | Body | Enum     | 通知グループの現在状態<br/>- `CREATED`:作成済み<br/>- `DELETED`:削除済み |
| notifyEmail                | Body | Boolean  | メール通知の有無                                              |
| notifySms                  | Body | Boolean  | SMS通知の有無                                              |
| isEnabled                  | Body | Boolean  | 有効かどうか                                                 |
| dbInstances                | Body | Array    | 監視対象のDBインスタンスリスト                                      |
| dbInstances.dbInstanceId   | Body | UUID     | DBインスタンスの識別子                                          |
| dbInstances.dbInstanceName | Body | String   | DBインスタンスを識別できる名前                                  |
| userGroups                 | Body | Array    | ユーザーグループリスト                                             |
| userGroups.userGroupId     | Body | UUID     | ユーザーグループの識別子                                           |
| userGroups.userGroupName   | Body | String   | ユーザーグループを識別できる名前                                   |
| createdYmdt                | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                      |
| updatedYmdt                | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                      |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "notificationGroupId": "b3901f17-9971-4d1e-8a81-8448cf533dc7",
    "notificationGroupName": "dev-team-noti",
    "notifyEmail": true,
    "notifySms": false,
    "isEnabled": true,
    "dbInstances": [
        {
            "dbInstanceId": "ed5cb985-526f-4c54-9ae0-40288593de65",
            "dbInstanceName": "database"
        }
    ],
    "userGroups": [
        {
            "userGroupId": "1aac0437-f32d-4923-ad3c-ac61c1cfdfe0",
            "userGroupName": "dev-team"
        }
    ],
    "createdYmdt": "2023-02-20T13:34:13+09:00",
    "updatedYmdt": "2023-02-20T13:34:13+09:00"
}
```
</details>


<a id="create-notification-group"></a>
### 通知グループの作成 { #create-notification-group }

```http
POST /v1.0/notification-groups
```

<a id="create-notification-group-required-permissions"></a>
#### 必要権限

| 権限名                                      | 説明        |
|-------------------------------------------|------------|
| RDSforPostgreSQL:NotificationGroup.Create | 通知グループの作成 |

<a id="create-notification-group-request"></a>
#### リクエスト

| 名前                   | 種類  | 形式     | 必須 | 説明                         |
|-----------------------|------|---------|----|-----------------------------|
| notificationGroupName | Body | String  | O  | 通知グループを識別できる名前         |
| notifyEmail           | Body | Boolean | X  | メール通知の有無<br/>- デフォルト値:`true` |
| notifySms             | Body | Boolean | X  | SMS通知の有無<br/>- デフォルト値:`true` |
| isEnabled             | Body | Boolean | X  | 有効かどうか<br/>- デフォルト値:`true`    |
| dbInstanceIds         | Body | Array   | X  | 監視対象のDBインスタンスの識別子リスト      |
| userGroupIds          | Body | Array   | X  | ユーザーグループの識別子リスト             |

<details><summary>例</summary>

```json
{
    "notificationGroupName": "dev-team-noti",
    "notifyEmail": false,
    "isEnable": true,
    "dbInstanceIds": ["ed5cb985-526f-4c54-9ae0-40288593de65"],
    "userGroupIds": ["1aac0437-f32d-4923-ad3c-ac61c1cfdfe0"]
}
```
</details>

<a id="create-notification-group-response"></a>
#### レスポンス

| 名前                 | 種類  | 形式  | 説明        |
|---------------------|------|------|------------|
| notificationGroupId | Body | UUID | 通知グループの識別子 |


<a id="modify-notification-group"></a>
### 通知グループの修正 { #modify-notification-group }

```http
PUT /v1.0/notification-groups/{notificationGroupId}
```

<a id="modify-notification-group-required-permissions"></a>
#### 必要権限

| 権限名                                      | 説明        |
|-------------------------------------------|------------|
| RDSforPostgreSQL:NotificationGroup.Modify | 通知グループの修正 |

<a id="modify-notification-group-request"></a>
#### リクエスト

| 名前                   | 種類  | 形式     | 必須 | 説明                   |
|-----------------------|------|---------|----|-----------------------|
| notificationGroupId   | URL  | UUID    | O  | 通知グループの識別子           |
| notificationGroupName | Body | String  | X  | 通知グループを識別できる名前   |
| notifyEmail           | Body | Boolean | X  | メール通知の有無             |
| notifySms             | Body | Boolean | X  | SMS通知の有無             |
| isEnabled             | Body | Boolean | X  | 有効かどうか                |
| dbInstanceIds         | Body | Array   | X  | 監視対象のDBインスタンスの識別子リスト |
| userGroupIds          | Body | Array   | X  | ユーザーグループの識別子リスト       |

<details><summary>例</summary>

```json
{
    "notifyEmail": true,
    "dbInstanceIds": ["ed5cb985-526f-4c54-9ae0-40288593de65", "d51b7da0-682f-47ff-b588-b739f6adc740"]
}
```
</details>

<a id="modify-notification-group-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="delete-notification-group"></a>
### 通知グループの削除 { #delete-notification-group }

```http
DELETE /v1.0/notification-groups/{notificationGroupId}
```

<a id="delete-notification-group-required-permissions"></a>
#### 必要権限

| 権限名                                      | 説明        |
|-------------------------------------------|------------|
| RDSforPostgreSQL:NotificationGroup.Delete | 通知グループの削除 |

<a id="delete-notification-group-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前                 | 種類 | 形式  | 必須 | 説明        |
|---------------------|-----|------|----|------------|
| notificationGroupId | URL | UUID | O  | 通知グループの識別子 |

<a id="delete-notification-group-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="view-the-list-of-watch-settings"></a>
### 監視設定リストを表示 { #view-the-list-of-watch-settings }

```http
GET /v1.0/notification-groups/{notificationGroupId}/watchdogs
```

<a id="view-the-list-of-watch-settings-required-permissions"></a>
#### 必要権限

| 権限名                                       | 説明         |
|--------------------------------------------|-------------|
| RDSforPostgreSQL:NotificationWatchdog.List | 監視設定リストを表示 |

<a id="view-the-list-of-watch-settings-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

<a id="view-the-list-of-watch-settings-response"></a>
#### レスポンス

| 名前                          | 種類  | 形式      | 説明                                                                    |
|------------------------------|------|----------|------------------------------------------------------------------------|
| notificationGroupId          | URL  | UUID     | 通知グループの識別子                                                            | 通知グループの識別子                                                           |
| watchdogs                    | Body | Array    | 監視設定リスト                                                              |
| watchdogs.watchdogId         | Body | UUID     | 監視設定の識別子                                                            |
| watchdogs.metricName         | Body | Enum     | 監視対象の性能指標<br/>- 設定可能な性能指標は[性能指標リスト表示](#性能-指標-リスト-表示)項目を参照してください。 |
| watchdogs.comparisonOperator | Body | Enum     | 監視対象の比較方法<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: >  |
| watchdogs.threshold          | Body | Long     | 監視対象のしきい値                                                             |
| watchdogs.duration           | Body | Long     | 監視対象の持続時間<br/>- 単位:`分`                                              |
| watchdogs.createdYmdt        | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                      |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "watchdogs": [
        {
            "watchdogId": "b3901f17-9971-4d1e-8a81-8448cf533dc7",
            "metricName": "DATABASE_STATUS",
            "comparisonOperator": "LE",
            "threshold": 0,
            "duration": 5,
            "createdYmdt": "2023-02-20T13:34:13+09:00",
            "updatedYmdt": "2023-02-20T13:34:13+09:00"
        }
    ]
}
```
</details>

<a id="create-a-watch-setting"></a>
### 監視設定の作成 { #create-a-watch-setting }

```http
POST /v1.0/notification-groups/{notificationGroupId}/watchdogs
```

<a id="create-a-watch-setting-required-permissions"></a>
#### 必要権限

| 権限名                                         | 説明        |
|----------------------------------------------|------------|
| RDSforPostgreSQL:NotificationWatchdog.Create | 監視設定の作成 |

<a id="create-a-watch-setting-request"></a>
#### リクエスト

| 名前                 | 種類  | 形式  | 必須 | 説明                                                                    |
|---------------------|------|------|----|------------------------------------------------------------------------|
| notificationGroupId | URL  | UUID | O  | 通知グループの識別子                                                            |
| metricName          | Body | Enum | O  | 監視対象の性能指標<br/>- 設定可能な性能指標は[性能指標リスト表示](#性能-指標-リスト-表示)項目を参照してください。 |
| comparisonOperator  | Body | Enum | O  | 監視対象の比較方法<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: >  |
| threshold           | Body | Long | O  | 監視対象しきい値                                                             |
| duration            | Body | Long | O  | 監視対象持続時間<br/>- 単位:`分`                                              |

<details><summary>例</summary>

```json
{
    "metricName": "DATABASE_STATUS",
    "comparisonOperator": "LE",
    "threshold": 0,
    "duration": 5
}
```
</details>

<a id="create-a-watch-setting-response"></a>
#### レスポンス

| 名前        | 種類  | 形式  | 説明        |
|------------|------|------|------------|
| watchdogId | Body | UUID | 監視設定の識別子 |


<a id="modify-watch-settings"></a>
### 監視設定の修正 { #modify-watch-settings }

```http
PUT /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
```

<a id="modify-watch-settings-required-permissions"></a>
#### 必要権限

| 権限名                                         | 説明        |
|----------------------------------------------|------------|
| RDSforPostgreSQL:NotificationWatchdog.Modify | 監視設定の修正 |

<a id="modify-watch-settings-request"></a>
#### リクエスト

| 名前                 | 種類  | 形式  | 必須 | 説明                                                                    |
|---------------------|------|------|----|------------------------------------------------------------------------|
| notificationGroupId | URL  | UUID | O  | 通知グループの識別子                                                            |
| watchdogId          | URL  | UUID | O  | 監視設定の識別子                                                            |
| metricName          | Body | Enum | O  | 監視対象の性能指標<br/>- 設定可能な性能指標は[性能指標リスト表示](#性能-指標-リスト-表示)項目を参照してください。 |
| comparisonOperator  | Body | Enum | O  | 監視対象の比較方法<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: >  |
| threshold           | Body | Long | O  | 監視対象のしきい値                                                             |
| duration            | Body | Long | O  | 監視対象の持続時間<br/>- 単位:`分`                                              |

<details><summary>例</summary>

```json
{
    "metricName": "DATABASE_STATUS",
    "comparisonOperator": "LE",
    "threshold": 0,
    "duration": 10
}
```
</details>

<a id="modify-watch-settings-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="deleting-a-watch-setting"></a>
### 監視設定の削除 { #deleting-a-watch-setting }

```http
DELETE /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
```

<a id="deleting-a-watch-setting-required-permissions"></a>
#### 必要権限

| 権限名                                         | 説明        |
|----------------------------------------------|------------|
| RDSforPostgreSQL:NotificationWatchdog.Delete | 監視設定の削除 |

<a id="deleting-a-watch-setting-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前                 | 種類 | 形式  | 必須 | 説明        |
|---------------------|-----|------|----|------------|
| notificationGroupId | URL | UUID | O  | 通知グループの識別子 |
| watchdogId          | URL | UUID | O  | 監視設定の識別子 |

<a id="deleting-a-watch-setting-response"></a>
#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>

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

<a id="monitoring"></a>
## モニタリング { #monitoring }

<a id="view-a-list-of-performance-metrics"></a>
### 性能指標リストを表示 { #view-a-list-of-performance-metrics }

```http
GET /v1.0/metrics
```

<a id="view-a-list-of-performance-metrics-required-permissions"></a>
#### 必要権限

| 権限名                         | 説明      |
|------------------------------|----------|
| RDSforPostgreSQL:Metric.List | 統計情報照会 |

<a id="view-a-list-of-performance-metrics-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

<a id="view-a-list-of-performance-metrics-response"></a>
#### レスポンス

| 名前                | 種類  | 形式    | 説明      |
|--------------------|------|--------|----------|
| metrics            | Body | Array  | 性能指標リスト |
| metrics.metricName | Body | Enum   | 性能指標タイプ |
| metrics.unit       | Body | String | 測定値単位  |

<details><summary>例</summary>

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

<a id="view-stats"></a>
### 統計情報照会 { #view-stats }

```http
GET /v1.0/metric-statistics
```

<a id="view-stats-required-permissions"></a>
#### 必要権限

| 権限名                         | 説明      |
|------------------------------|----------|
| RDSforPostgreSQL:Metric.List | 統計情報照会 |

<a id="view-stats-request"></a>
#### リクエスト

| 名前          | 種類   | 形式      | 必須 | 説明                                                       |
|--------------|-------|----------|----|-----------------------------------------------------------|
| dbInstanceId | Query | UUID     | O  | DBインスタンスの識別子                                             |
| metricNames  | Query | Array    | O  | 照会する性能指標リスト<br/>- 最小サイズ:`1`                             |
| from         | Query | Datetime | O  | 開始日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                         |
| to           | Query | Datetime | O  | 終了日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                         |
| interval     | Query | Number   | X  | 照会間隔<br/>- 単位:`分`<br/>- デフォルト値:開始/終了日時に応じて適切な値を自動選択する |

<a id="view-stats-response"></a>
#### レスポンス

| 名前                               | 種類  | 形式       | 説明      |
|-----------------------------------|------|-----------|----------|
| metricStatistics                  | Body | Array     | 統計情報リスト |
| metricStatistics.metricName       | Body | Enum      | 性能指標タイプ |
| metricStatistics.unit             | Body | String    | 測定値単位  |
| metricStatistics.values           | Body | Array     | 測定値リスト  |
| metricStatistics.values.timestamp | Body | Timestamp | 測定時間   |
| metricStatistics.values.value     | Body | Object    | 測定値     |

<details><summary>例</summary>

```json
{
    "metricStatistics": [
        {
            "metricName": "DATABASE_STATUS",
            "unit": "",
            "values": [
                [
                    1679298540,
                    "1"
                ],
                [
                    1679298600,
                    "1"
                ],
                [
                    1679298660,
                    "1"
                ]
            ]
        }
    ]
}
```
</details>

<a id="event"></a>
## イベント { #event }

<a id="view-the-list-of-events"></a>
### イベントリストを表示 { #view-the-list-of-events }

```
GET /v1.0/events
```

<a id="view-the-list-of-events-required-permissions"></a>
#### 必要権限

| 権限名                        | 説明       |
|-----------------------------|-----------|
| RDSforPostgreSQL:Event.List | イベントリスト表示 |

<a id="view-the-list-of-events-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前               | 種類   | 形式      | 必須 | 説明                                                                                                                                                                              |
|-------------------|-------|----------|----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| page              | Query | Number   | O  | 照会するリストのページ<br/>- 最小値:`1`                                                                                                                                                       |
| size              | Query | Number   | O  | 照会するリストのページサイズ<br/>- 最小値:`1`<br/>- 最大値:`100`                                                                                                                                   |
| from              | Query | Datetime | O  | 開始日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                |
| to                | Query | Datetime | O  | 終了日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                |
| eventCategoryType | Query | Enum     | O  | 照会するイベントカテゴリータイプ<br/>- `ALL`:全体<br/>- `BACKUP`:バックアップ<br/>- `DB_INSTANCE`:DBインスタンス<br/>- `DB_SECURITY_GROUP`:DBセキュリティグループ<br/>- `JOB`:作業<br/>- `TENANT`:テナント<br/>- `MONITORING`:モニタリング |
| sourceId          | Query | String   | X  | イベントが発生した対象リソースの識別子                                                                                                                                                            |
| keyword           | Query | String   | X  | イベントメッセージに含まれた文字列検索ワード                                                                                                                                                            |

<a id="view-the-list-of-events-response"></a>
#### レスポンス

| 名前                      | 種類  | 形式      | 説明                                                |
|--------------------------|------|----------|----------------------------------------------------|
| totalCounts              | Body | Number   | 全体のイベントリスト数                                        |
| events                   | Body | Array    | イベントリスト                                            |
| events.eventCategoryType | Body | Enum     | イベントカテゴリータイプ                                       |
| events.eventCode         | Body | Enum     | 発生したイベントのタイプ<br/>- 詳細は[イベント](event/)項目を参照してください。 |
| events.sourceId          | Body | String   | イベントソースの識別子                                       |
| events.sourceName        | Body | String   | イベントソースを識別できる名前                               |
| events.messages          | Body | Array    | イベントメッセージリスト                                        |
| events.messages.langCode | Body | String   | 言語コード                                             |
| events.messages.message  | Body | String   | イベントメッセージ                                           |
| events.eventYmdt         | Body | DateTime | イベント発生日時(YYYY-MM-DDThh:mm:ss.SSSTZD)              |

<details><summary>例</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "totalCounts": 28,
    "events": [
        {
            "eventCategoryType": "DB_INSTANCE",
            "eventCode": "DB_INSTANCE_02_01",
            "sourceId": "76f00947-356e-4a20-8922-428368cc45ed",
            "sourceName": "db-instance",
            "messages": [
                {
                    "langCode": "EN",
                    "message": "DB instance started"
                },
                {
                    "langCode": "JA",
                    "message": "DBインスタンスの起動"
                },
                {
                    "langCode": "KO",
                    "message": "DBインスタンス開始"
                },
                {
                    "langCode": "ZH",
                    "message": "DB instance started"
                }
            ],
            "eventYmdt": "2023-03-20T16:31:59+09:00"
        }
    ]
}
```
</details>


<a id="list-subscribable-event-codes"></a>
### 購読可能なイベントコードリストを表示 { #list-subscribable-event-codes }

```http
GET /v1.0/event-codes
```

<a id="list-subscribable-event-codes-required-permissions"></a>
#### 必要権限

| 権限名                        | 説明       |
|-----------------------------|-----------|
| RDSforPostgreSQL:Event.List | イベントリストを表示 |

<a id="list-subscribable-event-codes-request"></a>
#### リクエスト

このAPIはリクエスト本文を要求しません。

<a id="list-subscribable-event-codes-response"></a>
#### レスポンス

| 名前                          | 種類  | 形式   | 説明         |
|------------------------------|------|-------|-------------|
| eventCodes                   | Body | Array | イベントコードリスト  |
| eventCodes.eventCode         | Body | Enum  | イベントコード     |
| eventCodes.eventCategoryType | Body | Enum  | イベントカテゴリータイプ |

<details><summary>例</summary>

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
            "eventCategoryType": "DB_INSTANCE"
        }
    ]
}
```
</details>
