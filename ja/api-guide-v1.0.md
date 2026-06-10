## Database > RDS for PostgreSQL > APIガイド > API v1.0ガイド

## RDS for PostgreSQL API 共通情報

### API エンドポイント

| リージョン         | エンドポイント                                          |
|---------------|--------------------------------------------------|
| 韓国(パンギョ)リージョン | https://kr1-rds-postgres.api.nhncloudservice.com |

### 認証および権限

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

### レスポンス共通情報

すべてのAPIリクエストに`200 OK`でレスポンスします。詳しいレスポンス結果はレスポンス本文のヘッダを参照してください。

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

#### フィールド

| 名前            | データ型    | 説明                 |
|---------------|---------|--------------------|
| resultCode    | Number  | 結果コード(成功:0、その他:失敗) |
| resultMessage | String  | 結果メッセージ            |
| successful    | Boolean | 成否                 |

## DBバージョン

### DBバージョンリストを表示

```http
GET /v1.0/db-versions
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbVersion.List | DBバージョンリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbVersions | Body | Array | DBバージョン情報 |
| dbVersions.dbVersionCode | Body | Enum | DBバージョンコード<br/>- MYSQL_V5633<br/>- MYSQL_V5715<br/>- MYSQL_V5719<br/>- MYSQL_V5726<br/>- MYSQL_V5731<br/>- MYSQL_V5733<br/>- MYSQL_V5737<br/>- MYSQL_V8018<br/>- MYSQL_V8023<br/>- MYSQL_V8028<br/>- MYSQL_V8032<br/>- MYSQL_V8033<br/>- MYSQL_V8034<br/>- MYSQL_V8035<br/>- MYSQL_V8036<br/>- MYSQL_V8040<br/>- MYSQL_V8041<br/>- MYSQL_V8042<br/>- MYSQL_V8043<br/>- MYSQL_V8044<br/>- MYSQL_V8045<br/>- MYSQL_V8405<br/>- MYSQL_V8406<br/>- MYSQL_V8407<br/>- MYSQL_V8408<br/>- MYSQL_V8409<br/>- MARIADB_V10330<br/>- MARIADB_V10611<br/>- MARIADB_V10612<br/>- MARIADB_V10616<br/>- MARIADB_V10622<br/>- MARIADB_V10625<br/>- MARIADB_V101107<br/>- MARIADB_V101108<br/>- MARIADB_V101113<br/>- MARIADB_V101116<br/>- MARIADB_V11407<br/>- MARIADB_V11410<br/>- MARIADB_V11806<br/>- POSTGRESQL_V14_6<br/>- POSTGRESQL_V14_15<br/>- POSTGRESQL_V14_17<br/>- POSTGRESQL_V14_19<br/>- POSTGRESQL_V17_2<br/>- POSTGRESQL_V17_4<br/>- POSTGRESQL_V17_6 |
| dbVersions.dbMajorVersionCode | Body | Enum | DBメジャーバージョンコード<br/>- MYSQL_V56<br/>- MYSQL_V57<br/>- MYSQL_V80<br/>- MYSQL_V84<br/>- MARIADB_V103<br/>- MARIADB_V106<br/>- MARIADB_V1011<br/>- MARIADB_V114<br/>- MARIADB_V118<br/>- POSTGRES_V14<br/>- POSTGRES_V17 |
| dbVersions.name | Body | String | DBバージョン名 |
| dbVersions.canCreate | Body | Boolean | 新規作成可能かどうか |

<details><summary>例</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbVersions": [
        {
            "dbVersionCode": "MYSQL_V5633",
            "dbMajorVersionCode": "MYSQL_V56",
            "name": "PostgreSQL V14.6",
            "canCreate": false
        }
    ]
}
```

</p>
</details>

---

## DBインスタンス仕様

### DBインスタンス仕様リストを表示

```http
GET /v1.0/db-flavors
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbFlavor.List | DBインスタンス仕様リストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbFlavors | Body | Array | DBインスタンス仕様情報 |
| dbFlavors.dbFlavorId | Body | UUID | DBインスタンス仕様の識別子 |
| dbFlavors.dbFlavorName | Body | String | DBインスタンス仕様名 |
| dbFlavors.ram | Body | Number | メモリ容量(MB) |
| dbFlavors.vcpus | Body | Number | CPUコア数 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

## プロジェクト情報

### プロジェクトメンバーリストを表示

```http
GET /v1.0/project/members
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Project.Get | プロジェクトメンバーリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| projectMembers | Body | Array | プロジェクトメンバー情報 |
| projectMembers.memberId | Body | UUID | プロジェクトメンバーの識別子 |
| projectMembers.memberName | Body | String | プロジェクトメンバーの名前 |
| projectMembers.emailAddress | Body | String | プロジェクトメンバーのメールアドレス |
| projectMembers.phoneNumber | Body | String | プロジェクトメンバーの電話番号 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### リージョンリストを表示

```http
GET /v1.0/project/regions
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Project.Get | リージョンリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| regions | Body | Array | リージョン情報 |
| regions.regionCode | Body | Enum | リージョンコード<br/>- KR1: `韓国(パンギョ)`<br/>- KR2: `韓国(ピョンチョン)` |
| regions.isEnabled | Body | Boolean | リージョンが有効かどうか |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

## ネットワーク

### サブネットリストを表示

```http
GET /v1.0/network/subnets
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Network.List | サブネットリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| subnets | Body | Array | サブネット情報 |
| subnets.subnetId | Body | UUID | サブネットの識別子 |
| subnets.subnetName | Body | String | サブネットを識別できる名前 |
| subnets.subnetCidr | Body | String | サブネットのCIDR |
| subnets.usingGateway | Body | Boolean | ゲートウェイ使用有無 |
| subnets.availableIpCount | Body | Number | 使用可能なIP数 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

## ストレージ

### ストレージタイプリストを表示

```http
GET /v1.0/storage-types
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Storage.List | ストレージタイプリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| storageTypes | Body | Array | ストレージタイプリスト |

<details><summary>例</summary>
<p>

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

</p>
</details>

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

```http
GET /v1.0/jobs/{jobId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Job.Get | 作業情報の詳細を表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| jobId | URL | UUID | O |  |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 作業の識別子 |
| jobStatus | Body | Enum | 作業の現在状態<br/>- DELETED<br/>- CANNOT_PROGRESS<br/>- FAILED<br/>- ERROR<br/>- CANCELED<br/>- INTERRUPTED<br/>- COMPLETED<br/>- COMPLETED_WITH_ERROR<br/>- RUNNING<br/>- PREPARING<br/>- READY<br/>- CREATED<br/>- FAIL_TO_READY<br/>- REGISTERED<br/>- FAIL_TO_REGISTER<br/>- WAIT_TO_REGISTER |
| resourceRelations | Body | Array | 関連リソースリスト |
| resourceRelations.resourceType | Body | String | 関連リソースタイプ |
| resourceRelations.resourceId | Body | String | 関連リソースの識別子 |
| createdYmdt | Body | DateTime | 作成日時 |
| updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---
## DBインスタンスグループ

### DBインスタンスグループリストを表示

```http
GET /v1.0/db-instance-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroup.List | DBインスタンスグループリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbInstanceGroups | Body | Array | DBインスタンスグループ情報 |
| dbInstanceGroups.dbInstanceGroupId | Body | UUID | DBインスタンスグループの識別子 |
| dbInstanceGroups.dbInstanceGroupStatus | Body | Enum | DBインスタンスグループの現在状態<br/>- CREATED: `作成済み`<br/>- DELETED: `削除済み` |
| dbInstanceGroups.replicationType | Body | Enum | DBインスタンスグループのレプリケーションタイプ<br/>- STANDALONE: `高可用性を使用しない`<br/>- HIGH_AVAILABILITY: `高可用性を使用する` |
| dbInstanceGroups.createdYmdt | Body | DateTime | 作成日時 |
| dbInstanceGroups.updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスグループ詳細を表示

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroup.Get | DBインスタンスグループ詳細を表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O |  |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbInstanceGroupId | Body | UUID | DBインスタンスグループの識別子 |
| dbInstanceGroupStatus | Body | Enum | DBインスタンスグループの現在状態<br/>- CREATED: `作成済み`<br/>- DELETED: `削除済み` |
| replicationType | Body | Enum | DBインスタンスグループのレプリケーションタイプ<br/>- STANDALONE: `高可用性を使用しない`<br/>- HIGH_AVAILABILITY: `高可用性を使用する` |
| dbInstances | Body | Array | DBインスタンスグループに属するDBインスタンスリスト |
| dbInstances.dbInstanceId | Body | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceType | Body | Enum | DBインスタンスのロールタイプ<br/>- MASTER: `マスター`<br/>- FAILED_MASTER: `フェイルオーバーされたマスター`<br/>- CANDIDATE_MASTER: `予備マスター`<br/>- READ_ONLY_SLAVE: `リードレプリカ` |
| dbInstances.dbInstanceStatus | Body | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成前(グレー)`<br/>- AVAILABLE: `使用可能(緑)`<br/>- STORAGE_FULL: `容量不足(赤)`<br/>- FAIL_TO_CREATE: `作成失敗(赤)`<br/>- FAIL_TO_CONNECT: `接続失敗(赤)`<br/>- REPLICATION_STOP: `複製中断(赤)`<br/>- REPLICATION_DELAY: `複製遅延(黄)`<br/>- FAILOVER: `フェイルオーバー完了(赤)`<br/>- SHUTDOWN: `停止済み(グレー)`<br/>- DELETED: `削除済み(グレー)` |
| createdYmdt | Body | DateTime | 作成日時 |
| updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### 拡張機能リスト照会

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.List | 拡張機能リスト照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DBインスタンスグループID |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| extensions | Body | Array | 拡張機能情報 |
| extensions.extensionId | Body | UUID | 拡張機能の識別子 |
| extensions.extensionName | Body | String | 拡張機能名 |
| extensions.extensionStatus | Body | Enum | 拡張機能の状態<br/>- AVAILABLE: `使用可能`<br/>- NEED_TO_APPLY: `適用必要`<br/>- APPLYING: `適用中` |
| extensions.databases | Body | Array | データベース情報 |
| extensions.databases.dbInstanceGroupExtensionId | Body | UUID | DBインスタンスグループ内の拡張機能の識別子 |
| extensions.databases.databaseId | Body | UUID | データベースの識別子 |
| extensions.databases.databaseName | Body | String | データベース名 |
| extensions.databases.dbInstanceGroupExtensionStatus | Body | Enum | データベースへの拡張機能インストール状態<br/>- CREATED: `作成済み`<br/>- INSTALLED: `インストール済み`<br/>- INSTALLING: `インストール中`<br/>- INSTALL_ERROR: `インストールエラー`<br/>- DELETED: `削除済み`<br/>- DELETING: `削除中`<br/>- DELETE_ERROR: `削除エラー` |
| extensions.databases.reservedAction | Body | Enum | 予約タスク<br/>- NONE: `なし`<br/>- INSTALL: `インストール予約(適用必要)`<br/>- INSTALL_WITH_CASCADE: `強制インストール予約(適用必要)`<br/>- DELETE: `削除予約(適用必要)`<br/>- DELETE_WITH_CASCADE: `強制削除予約(適用必要)` |
| extensions.databases.errorReason | Body | String | エラー原因 |
| isNeedToApply | Body | Boolean | 変更事項の適用が必要かどうか |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### 拡張機能変更事項適用

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/apply
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Apply | 拡張機能変更事項適用 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DBインスタンスグループID |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### 拡張機能の同期

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/sync
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Sync | 拡張機能の同期 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DBインスタンスグループID |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### 拡張機能の削除(キャンセル)

```http
DELETE /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{dbInstanceGroupExtensionId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Delete | 拡張機能の削除(キャンセル) |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DBインスタンスグループID |
| dbInstanceGroupExtensionId | URL | UUID | O | DBインスタンスグループ内の拡張機能の識別子 |
| withCascade | Query | Boolean | O | 強制削除するかどうか |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 拡張機能のインストール

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{extensionId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Install | 拡張機能のインストール |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DBインスタンスグループID |
| extensionId | URL | UUID | O | 拡張機能の識別子 |
| databaseId | Body | UUID | O | データベースの識別子 |
| schemaName | Body | String | O | スキーマ名 |
| withCascade | Body | Boolean | X | 関連情報を自動的にインストールするかどうか<br/>- デフォルト値: `false` |

<details><summary>例</summary>
<p>

```json
{
    "databaseId": "550e8400-e29b-41d4-a716-446655440000",
    "schemaName": "schemaName-example",
    "withCascade": false
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。

---
## DBインスタンス

### DBインスタンスの状態

| 状態                  | 説明                           |
|---------------------|------------------------------|
| `AVAILABLE`         | DBインスタンスが使用可能な場合           |
| `BEFORE_CREATE`     | DBインスタンス作成前の場合            |
| `STORAGE_FULL`      | DBインスタンスの容量が不足している場合          |
| `FAIL_TO_CREATE`    | DBインスタンス作成に失敗した場合           |
| `FAIL_TO_CONNECT`   | DBインスタンス接続に失敗した場合           |
| `REPLICATION_STOP`  | DBインスタンスの複製が中断された場合          |
| `FAILOVER`          | 高可用性DBインスタンスのフェイルオーバーが完了した場合      |
| `SHUTDOWN`          | DBインスタンスが中止された場合              |
| `DELETED`           | DBインスタンスが削除された場合              |

### DBインスタンスの進行状態

| 状態                         | 説明           |
|----------------------------|--------------|
| `APPLYING_PARAMETER_GROUP` | パラメータグループ適用中 |
| `BACKING_UP`               | バックアップ中         |
| `CANCELING`                | キャンセル中         |
| `CREATING`                 | 作成中         |
| `CREATING_SCHEMA`          | スキーマ作成中  |
| `CREATING_USER`            | ユーザー作成中     |
| `DELETING`                 | 削除中         |
| `DELETING_SCHEMA`          | スキーマ削除中  |
| `DELETING_USER`            | ユーザー削除中     |
| `EXPORTING_BACKUP`         | バックアップをエクスポート中   |
| `FAILING_OVER`             | フェイルオーバー中      |
| `MIGRATING`                | マイグレーション中         |
| `MODIFYING`                | 修正中         |
| `PREPARING`                | 準備中         |
| `PROMOTING`                | 昇格中         |
| `REBUILDING`               | 再構築中        |
| `REPAIRING`                | 復旧中         |
| `REPLICATING`              | 複製中         |
| `RESTARTING`               | 再起動中         |
| `RESTARTING_FORCIBLY`      | 強制再起動中     |
| `RESTORING`                | 復元中         |
| `STARTING`                 | 起動中         |
| `STOPPING`                 | 停止中         |
| `SYNCING_SCHEMA`           | スキーマ同期中 |
| `SYNCING_USER`             | ユーザー同期中    |
| `UPDATING_USER`            | ユーザー修正中     |

### DBインスタンスリストを表示

```http
GET /v1.0/db-instances
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.List | DBインスタンスリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbInstances | Body | Array | DBインスタンスリスト |
| dbInstances.dbInstanceId | Body | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceGroupId | Body | UUID | DBインスタンスグループの識別子 |
| dbInstances.dbInstanceName | Body | String | DBインスタンスを識別できる名前 |
| dbInstances.description | Body | String | DBインスタンスの追加情報 |
| dbInstances.dbVersion | Body | Enum | DBバージョン情報 |
| dbInstances.dbPort | Body | Number | DBポート |
| dbInstances.dbInstanceType | Body | Enum | DBインスタンスのロールタイプ<br/>- MASTER: `マスター`<br/>- FAILED_MASTER: `フェイルオーバーされたマスター`<br/>- CANDIDATE_MASTER: `予備マスター`<br/>- READ_ONLY_SLAVE: `リードレプリカ` |
| dbInstances.dbInstanceStatus | Body | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成前(グレー)`<br/>- AVAILABLE: `使用可能(グリーン)`<br/>- STORAGE_FULL: `容量不足(レッド)`<br/>- FAIL_TO_CREATE: `作成失敗(レッド)`<br/>- FAIL_TO_CONNECT: `接続失敗(レッド)`<br/>- REPLICATION_STOP: `複製中断(レッド)`<br/>- REPLICATION_DELAY: `複製遅延(イエロー)`<br/>- FAILOVER: `フェイルオーバー完了(レッド)`<br/>- SHUTDOWN: `停止済み(グレー)`<br/>- DELETED: `削除済み(グレー)` |
| dbInstances.progressStatus | Body | String | DBインスタンスの現在進行状態 |
| dbInstances.createdYmdt | Body | DateTime | 作成日時 |
| dbInstances.updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスを作成する

```http
POST /v1.0/db-instances
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Create | DBインスタンスを作成する |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceName | Body | String | O | DBインスタンスを識別できる名前 |
| dbInstanceCandidateName | Body | String | X | DBインスタンスを識別できる予備マスター名 |
| description | Body | String | X | DBインスタンスの追加情報 |
| dbFlavorId | Body | UUID | O | DBインスタンス仕様の識別子 |
| dbVersion | Body | Enum | O | DBバージョン情報 |
| dbPort | Body | Number | O | DBポート<br/>- 最小値: 5432、最大値: 45432 |
| databaseName | Body | String | O | データベース名 |
| dbUserName | Body | String | O | DBユーザーアカウント名 |
| dbPassword | Body | String | O | DBユーザーアカウントのパスワード |
| parameterGroupId | Body | UUID | O | パラメータグループの識別子 |
| dbSecurityGroupIds | Body | Array | X | DBセキュリティグループの識別子リスト |
| userGroupIds | Body | Array | X | ユーザーグループの識別子リスト |
| useHighAvailability | Body | Boolean | X | 高可用性の使用有無<br/>- デフォルト値: `false` |
| useDefaultNotification | Body | Boolean | X | 基本通知の使用有無<br/>- デフォルト値: `false` |
| useDeletionProtection | Body | Boolean | X | 削除保護の有無<br/>- デフォルト値: `false` |
| pingInterval | Body | Number | X | Ping間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| failoverReplWaitingTime | Body | Number | X | フェイルオーバー複製遅延待機時間(秒)<br/>- 最小値: `-1` |
| network | Body | Object | O | ネットワーク情報オブジェクト |
| network.subnetId | Body | UUID | O | サブネットの識別子 |
| network.usePublicAccess | Body | Boolean | X | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Body | Enum | X | DBインスタンスを作成するアベイラビリティゾーン |
| storage | Body | Object | O | ストレージ情報オブジェクト |
| storage.storageType | Body | Enum | O | データストレージタイプ |
| storage.storageSize | Body | Number | O | データストレージサイズ(GB)<br/>- 最小値: `20` |
| backup | Body | Object | O | バックアップ情報オブジェクト |
| backup.backupPeriod | Body | Number | O | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Body | Number | X | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.backupSchedules | Body | Array | O | バックアップスケジュール情報 |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | バックアップ開始時間 |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | バックアップWindow<br/>バックアップ開始時間から設定された期間内に自動バックアップが実行されます。<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---
### オブジェクトストレージにあるバックアップからDBインスタンスを復元する

```http
POST /v1.0/db-instances/restore-from-obs
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.RestoreFromObs | オブジェクトストレージにあるバックアップからDBインスタンスを復元 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceName | Body | String | X | DBインスタンスを識別できる名前<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| dbInstanceCandidateName | Body | String | X | DBインスタンスを識別できる予備マスターの名前 |
| description | Body | String | X | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbFlavorId | Body | UUID | O | DBインスタンス仕様の識別子 |
| dbPort | Body | Number | X | DBポート<br/>- 最小値: 5432、最大値: 45432 |
| dbVersion | Body | Enum | O | DBエンジンタイプ |
| useHighAvailability | Body | Boolean | X | 高可用性の使用有無<br/>- デフォルト値: `false` |
| imageId | Body | UUID | X | イメージの識別子 |
| pingInterval | Body | Number | X | 高可用性使用時のPing間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| failoverReplWaitingTime | Body | Number | X | フェイルオーバー複製遅延待機時間(秒)<br/>- 最小値: `-1` |
| storage | Body | Object | O | ストレージ情報オブジェクト |
| storage.storageType | Body | Enum | O | ストレージタイプ |
| storage.storageSize | Body | Number | O | データストレージサイズ(GB)<br/>- 最小値: `20` |
| network | Body | Object | O | ネットワーク情報オブジェクト |
| network.subnetId | Body | UUID | O | サブネットの識別子 |
| network.usePublicAccess | Body | Boolean | X | 外部接続の可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Body | Enum | X | DBインスタンスを作成するアベイラビリティゾーン |
| backup | Body | Object | O | バックアップ情報オブジェクト |
| backup.backupPeriod | Body | Number | O | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Body | Number | X | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.replicationRegion | Body | Enum | X | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)`<br/>- KR2: `韓国(ピョンチョン)` |
| backup.backupSchedules | Body | Array | O | バックアップスケジュールリスト |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | バックアップ期間<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |
| restore | Body | Object | O | 復元情報オブジェクト |
| restore.tenantId | Body | String | O | バックアップが保存されているオブジェクトストレージのテナントID |
| restore.username | Body | String | O | NHN CloudアカウントまたはIAMメンバーID |
| restore.password | Body | String | O | バックアップが保存されているオブジェクトストレージのAPIパスワード |
| restore.targetContainer | Body | String | O | バックアップが保存されているオブジェクトストレージのコンテナ |
| restore.objectPath | Body | String | O | コンテナに保存されているバックアップのパス |
| useDefaultNotification | Body | Boolean | X | デフォルト通知の使用有無<br/>- デフォルト値: `false` |
| parameterGroupId | Body | UUID | O | パラメータグループの識別子 |
| dbSecurityGroupIds | Body | Array | X | DBセキュリティグループの識別子リスト |
| userGroupIds | Body | Array | X | ユーザーグループの識別子リスト |
| useDeletionProtection | Body | Boolean | X | 削除保護の有無<br/>- デフォルト値: `false` |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスの削除

```http
DELETE /v1.0/db-instances/{dbInstanceId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Delete | DBインスタンスの削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンス詳細を表示

```http
GET /v1.0/db-instances/{dbInstanceId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンス詳細を表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbInstanceId | Body | UUID | DBインスタンスの識別子 |
| dbInstanceGroupId | Body | UUID | DBインスタンスグループの識別子 |
| dbInstanceName | Body | String | DBインスタンスを識別できる名前 |
| description | Body | String | DBインスタンスの追加情報 |
| dbVersion | Body | Enum | DBエンジンタイプ |
| dbPort | Body | Number | DBポート |
| dbInstanceType | Body | Enum | DBインスタンスのロールタイプ<br/>- MASTER: `マスター`<br/>- FAILED_MASTER: `フェイルオーバーされたマスター`<br/>- CANDIDATE_MASTER: `予備マスター`<br/>- READ_ONLY_SLAVE: `リードレプリカ` |
| dbInstanceStatus | Body | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成以前(グレー)`<br/>- AVAILABLE: `使用可能(緑)`<br/>- STORAGE_FULL: `容量不足(赤)`<br/>- FAIL_TO_CREATE: `作成失敗(赤)`<br/>- FAIL_TO_CONNECT: `接続失敗(赤)`<br/>- REPLICATION_STOP: `複製中断(赤)`<br/>- REPLICATION_DELAY: `複製遅延(黄色)`<br/>- FAILOVER: `フェイルオーバー完了(赤)`<br/>- SHUTDOWN: `停止済み(グレー)`<br/>- DELETED: `削除済み(グレー)` |
| progressStatus | Body | String | DBインスタンスの現在の作業進行状態 |
| dbFlavorId | Body | UUID | DBインスタンス仕様の識別子 |
| parameterGroupId | Body | UUID | DBインスタンスに適用されたパラメータグループの識別子 |
| dbSecurityGroupIds | Body | Array | DBインスタンスに適用されたDBセキュリティグループの識別子リスト |
| notificationGroupIds | Body | Array | DBインスタンスに適用された通知グループの識別子リスト |
| useDeletionProtection | Body | Boolean | DBインスタンスの削除保護の有無 |
| needToApplyParameterGroup | Body | Boolean | 最新パラメータグループの適用可否 |
| needMigration | Body | Boolean | マイグレーションの要否 |
| osVersion | Body | String | OSバージョン |
| createdYmdt | Body | DateTime | 作成日時 |
| updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスを修正する

```http
PUT /v1.0/db-instances/{dbInstanceId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスを修正する |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| dbInstanceName | Body | String | X | DBインスタンスを識別できる名前 |
| dbInstanceCandidateName | Body | String | X | DBインスタンスを識別できる予備マスターの名前 |
| description | Body | String | X | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbPort | Body | Number | X | DBポート<br/>- 最小値: 5432、最大値: 45432 |
| dbFlavorId | Body | UUID | X | DBインスタンス仕様の識別子 |
| parameterGroupId | Body | UUID | X | パラメータグループの識別子 |
| dbVersion | Body | Enum | X | DBエンジンバージョンコード |
| dbSecurityGroupIds | Body | Array | X | DBセキュリティグループの識別子リスト |
| executeBackup | Body | Boolean | X | 現時点バックアップを実行するかどうか<br/>- デフォルト値: `false` |
| useOnlineFailover | Body | Boolean | X | フェイルオーバーを利用した再起動の有無<br/>- デフォルト値: `false` |
| waitReplicationDelay | Body | Boolean | X | 複製遅延の解消を待機するかどうか<br/>- デフォルト値: `false` |
| useReadOnly | Body | Boolean | X | 書き込み負荷のブロック<br/>- デフォルト値: `false` |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスの最新パラメータグループを適用する

```http
POST /v1.0/db-instances/{dbInstanceId}/apply-recent-parameter-group
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスの最新パラメータグループを適用する |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---
### 現在のDBインスタンスで選択可能なDBバージョンの照会

```http
GET /v1.0/db-instances/{dbInstanceId}/available-db-versions
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | 現在のDBインスタンスで選択可能なDBバージョンの照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| availableDbVersions | Body | Array | DBバージョン情報 |
| availableDbVersions.dbVersionCode | Body | Enum | DBバージョンコード<br/>- MYSQL_V5633<br/>- MYSQL_V5715<br/>- MYSQL_V5719<br/>- MYSQL_V5726<br/>- MYSQL_V5731<br/>- MYSQL_V5733<br/>- MYSQL_V5737<br/>- MYSQL_V8018<br/>- MYSQL_V8023<br/>- MYSQL_V8028<br/>- MYSQL_V8032<br/>- MYSQL_V8033<br/>- MYSQL_V8034<br/>- MYSQL_V8035<br/>- MYSQL_V8036<br/>- MYSQL_V8040<br/>- MYSQL_V8041<br/>- MYSQL_V8042<br/>- MYSQL_V8043<br/>- MYSQL_V8044<br/>- MYSQL_V8045<br/>- MYSQL_V8405<br/>- MYSQL_V8406<br/>- MYSQL_V8407<br/>- MYSQL_V8408<br/>- MYSQL_V8409<br/>- MARIADB_V10330<br/>- MARIADB_V10611<br/>- MARIADB_V10612<br/>- MARIADB_V10616<br/>- MARIADB_V10622<br/>- MARIADB_V10625<br/>- MARIADB_V101107<br/>- MARIADB_V101108<br/>- MARIADB_V101113<br/>- MARIADB_V101116<br/>- MARIADB_V11407<br/>- MARIADB_V11410<br/>- MARIADB_V11806<br/>- POSTGRESQL_V14_6<br/>- POSTGRESQL_V14_15<br/>- POSTGRESQL_V14_17<br/>- POSTGRESQL_V14_19<br/>- POSTGRESQL_V17_2<br/>- POSTGRESQL_V17_4<br/>- POSTGRESQL_V17_6 |
| availableDbVersions.dbMajorVersionCode | Body | Enum | DBメジャーバージョンコード<br/>- MYSQL_V56<br/>- MYSQL_V57<br/>- MYSQL_V80<br/>- MYSQL_V84<br/>- MARIADB_V103<br/>- MARIADB_V106<br/>- MARIADB_V1011<br/>- MARIADB_V114<br/>- MARIADB_V118<br/>- POSTGRES_V14<br/>- POSTGRES_V17 |
| availableDbVersions.name | Body | String | DBバージョン名 |
| availableDbVersions.canCreate | Body | Boolean | 新規作成可能かどうか |

<details><summary>例</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "availableDbVersions": [
        {
            "dbVersionCode": "MYSQL_V5633",
            "dbMajorVersionCode": "MYSQL_V56",
            "name": "PostgreSQL V14.6",
            "canCreate": false
        }
    ]
}
```

</p>
</details>

---

### DBインスタンスのバックアップ

```http
POST /v1.0/db-instances/{dbInstanceId}/backup
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Backup | DBインスタンスのバックアップ |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| backupName | Body | String | O | バックアップを識別できる名前 |

<details><summary>例</summary>
<p>

```json
{
    "backupName": "backupName-example"
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスバックアップ情報の照会

```http
GET /v1.0/db-instances/{dbInstanceId}/backup-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンスバックアップ情報の照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| allowAutoBackup | Body | Boolean | 自動バックアップを許可するかどうか |
| usePeriodicAutoBackup | Body | Boolean | 予定された自動バックアップを使用するかどうか |
| backupPeriod | Body | Number | バックアップの保管期間(日) |
| backupRetryCount | Body | Number | バックアップの再試行回数 |
| backupSchedules | Body | Array | バックアップスケジュールリスト |
| backupSchedules.backupWndBgnTime | Body | Time | バックアップ開始時間 |
| backupSchedules.backupWndDuration | Body | Enum | バックアップWindows<br/>バックアップ開始時間から設定された期間内に自動バックアップが実行されます。<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスバックアップ情報の修正

```http
PUT /v1.0/db-instances/{dbInstanceId}/backup-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスバックアップ情報の修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| allowAutoBackup | Body | Boolean | X | 自動バックアップを許可するかどうか |
| usePeriodicAutoBackup | Body | Boolean | X | 予定された自動バックアップを使用するかどうか |
| backupPeriod | Body | Number | X | バックアップの保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backupRetryCount | Body | Number | X | バックアップの再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backupSchedules | Body | Array | X | バックアップスケジュールリスト |
| backupSchedules.backupWndBgnTime | Body | Time | O | バックアップ開始時間 |
| backupSchedules.backupWndDuration | Body | Enum | O | バックアップWindows<br/>バックアップ開始時間から設定された期間内に自動バックアップが実行されます。<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスバックアップ後にオブジェクトストレージへエクスポート

```http
POST /v1.0/db-instances/{dbInstanceId}/backup-to-object-storage
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.BackupToObjectStorage | DBインスタンスバックアップ後にオブジェクトストレージへエクスポート |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| tenantId | Body | String | O | バックアップが保存されるオブジェクトストレージのテナントID<br/>- 最小長さ: `32`<br/>- 最大長さ: `32` |
| username | Body | String | O | NHN CloudアカウントまたはIAMメンバーID |
| password | Body | String | O | バックアップが保存されるオブジェクトストレージのAPIパスワード |
| targetContainer | Body | String | O | バックアップが保存されるオブジェクトストレージのコンテナ |
| objectPath | Body | String | O | コンテナに保存されるバックアップのパス |

<details><summary>例</summary>
<p>

```json
{
    "tenantId": "0123456789abcdef0123456789abcdef",
    "username": "username-example",
    "password": "password-example",
    "targetContainer": "targetContainer-example",
    "objectPath": "objectPath-example"
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---
### データベースリスト表示

```http
GET /v1.0/db-instances/{dbInstanceId}/databases
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.List | データベースリスト表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| databases | Body | Array | データベース情報 |
| databases.databaseId | Body | UUID | データベースの識別子 |
| databases.databaseName | Body | String | データベース名 |
| databases.databaseStatus | Body | Enum | データベースの現在状態<br/>- STABLE: `使用可能`<br/>- CREATING: `作成中`<br/>- MODIFYING: `修正中`<br/>- DELETING: `削除中`<br/>- DELETED: `削除済み`<br/>- SYNCING: `同期中`<br/>- DELETE_ERROR: `削除失敗` |
| databases.createdYmdt | Body | DateTime | 作成日時 |
| databases.updatedYmdt | Body | DateTime | 修正日時 |
| databases.schemas | Body | Array | スキーマ情報 |
| databases.schemas.schemaName | Body | String | スキーマ名 |
| databases.errorReason | Body | String | 削除失敗の原因 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### データベース作成

```http
POST /v1.0/db-instances/{dbInstanceId}/databases
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Create | データベース作成 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| databaseName | Body | String | O | データベース名 |

<details><summary>例</summary>
<p>

```json
{
    "databaseName": "databaseName-example"
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### データベース削除

```http
DELETE /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Delete | データベース削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| databaseId | URL | UUID | O | データベースの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### データベースの修正

```http
PUT /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Modify | データベースの修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| databaseId | URL | UUID | O | データベースの識別子 |
| applyHbaRulesImmediately | Body | Boolean | X | 関連するアクセス制御ルールを即時適用するかどうか<br/>- デフォルト値: `false` |
| databaseName | Body | String | O | データベース名 |

<details><summary>例</summary>
<p>

```json
{
    "applyHbaRulesImmediately": false,
    "databaseName": "databaseName-example"
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---
### ユーザーリスト表示

```http
GET /v1.0/db-instances/{dbInstanceId}/db-users
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.List | ユーザーリスト表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbUsers | Body | Array | DBユーザーリスト |
| dbUsers.dbUserId | Body | UUID | DBユーザーの識別子 |
| dbUsers.dbUserName | Body | String | DBユーザーアカウント名 |
| dbUsers.authorityType | Body | Enum | DBユーザー権限タイプ<br/>- CUSTOM: `カスタム権限`<br/>- READ: `READ権限(読み取り専用権限)`<br/>- CRUD: `CRUD権限(読み取り権限を含む)`<br/>- DDL: `DDL権限(CRUD権限を含む)` |
| dbUsers.dbUserStatus | Body | Enum | DBユーザーの現在状態<br/>- STABLE: `使用可能`<br/>- CREATING: `作成中`<br/>- MODIFYING: `修正中`<br/>- DELETING: `削除中`<br/>- DELETED: `削除済み`<br/>- SYNCING: `同期中`<br/>- DELETE_ERROR: `削除失敗` |
| dbUsers.createdYmdt | Body | DateTime | 作成日時 |
| dbUsers.updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### ユーザー作成

```http
POST /v1.0/db-instances/{dbInstanceId}/db-users
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Create | ユーザー作成 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| dbUserName | Body | String | O | DBユーザーアカウント名 |
| dbPassword | Body | String | O | DBユーザーアカウントパスワード |
| authorityType | Body | Enum | O | DBユーザー権限タイプ<br/>- CUSTOM: `カスタム権限`<br/>- READ: `読み取り権限`<br/>- CRUD: `CRUD権限`<br/>- DDL: `DDL権限` |
| createDefaultHbaRules | Body | Boolean | X | 基本アクセス制御ルールの作成可否<br/>- デフォルト値: `false` |
| address | Body | String | X | 接続アドレス |

<details><summary>例</summary>
<p>

```json
{
    "dbUserName": "dbUserName-example",
    "dbPassword": "dbPassword-example",
    "authorityType": "CUSTOM",
    "createDefaultHbaRules": false,
    "address": "address-example"
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### ユーザー削除

```http
DELETE /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Delete | ユーザー削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| dbUserId | URL | UUID | O | ユーザーの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### ユーザー修正

```http
PUT /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Modify | ユーザー修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| dbUserId | URL | UUID | O | ユーザーの識別子 |
| dbUserName | Body | String | X | DBユーザーアカウント名 |
| dbPassword | Body | String | X | DBユーザーアカウントパスワード |
| authorityType | Body | Enum | X | DBユーザー権限<br/>- CUSTOM: `カスタム権限`<br/>- READ: `読み取り権限`<br/>- CRUD: `CRUD権限`<br/>- DDL: `DDL権限` |
| applyHbaRulesImmediately | Body | Boolean | X | アクセス制御変更事項の即時適用可否<br/>- デフォルト値: `false` |

<details><summary>例</summary>
<p>

```json
{
    "dbUserName": "dbUserName-example",
    "dbPassword": "dbPassword-example",
    "authorityType": "CUSTOM",
    "applyHbaRulesImmediately": false
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンス削除保護設定の変更

```http
PUT /v1.0/db-instances/{dbInstanceId}/deletion-protection
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンス削除保護設定の変更 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| useDeletionProtection | Body | Boolean | O | 削除保護の有無 |

<details><summary>例</summary>
<p>

```json
{
    "useDeletionProtection": false
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBインスタンスの強制再起動

```http
POST /v1.0/db-instances/{dbInstanceId}/force-restart
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.ForceRestart | DBインスタンスの強制再起動 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---
### アクセス制御ルールリストを表示

```http
GET /v1.0/db-instances/{dbInstanceId}/hba-rules
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.List | アクセス制御ルールリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| hbaRules | Body | Array | アクセス制御ルールリスト |
| hbaRules.hbaRuleId | Body | UUID | アクセス制御ルールの識別子 |
| hbaRules.hbaRuleStatus | Body | Enum | アクセス制御ルールの現在状態<br/>- CREATED: `作成済み`<br/>- APPLIED: `適用済み`<br/>- CREATING: `作成中`<br/>- MODIFYING: `修正中`<br/>- DELETING: `削除中`<br/>- DELETED: `削除済み` |
| hbaRules.databaseApplyType | Body | Enum | データベース適用タイプ<br/>- ENTIRE: `全体`<br/>- USER_CUSTOM: `ユーザー指定` |
| hbaRules.dbUserApplyTypeCode | Body | Enum | DBユーザー適用タイプ<br/>- ENTIRE: `全体`<br/>- USER_CUSTOM: `ユーザー指定` |
| hbaRules.databases | Body | Array | ユーザー指定のデータベースリスト |
| hbaRules.databases.databaseId | Body | UUID | データベースID |
| hbaRules.databases.databaseName | Body | String | データベース名 |
| hbaRules.dbUsers | Body | Array | ユーザー指定のDBユーザーリスト |
| hbaRules.dbUsers.dbUserId | Body | UUID | DBユーザーID |
| hbaRules.dbUsers.dbUserName | Body | String | DBユーザー名 |
| hbaRules.address | Body | String | 接続アドレス |
| hbaRules.authMethod | Body | Enum | 認証方式<br/>- TRUST: `トラスト(パスワード不要)`<br/>- REJECT: `接続ブロック`<br/>- SCRAM_SHA_256: `パスワード(SCRAM-SHA-256)` |
| hbaRules.reservedAction | Body | Enum | 予約作業<br/>- NONE: `なし`<br/>- CREATE: `作成予約(適用必要)`<br/>- MODIFY: `修正予約(適用必要)`<br/>- DELETE: `削除予約(適用必要)` |
| hbaRules.order | Body | Number | 適用順序 |
| hbaRules.applicable | Body | Boolean | 適用可否 |
| needToApply | Body | Boolean | 変更の適用要否 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### アクセス制御ルールの追加

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Create | DBインスタンス内のアクセス制御ルール追加 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| connectionTypeCode | Body | Enum | X | アクセス制御レコードタイプ<br/>- HOST: `TCP/IP接続時に有効`<br/>- HOST_NO_SSL: `SSL暗号化を使用しない接続時のみ有効` |
| databaseApplyType | Body | Enum | O | データベース適用タイプ<br/>- ENTIRE: `全体`<br/>- USER_CUSTOM: `ユーザー指定` |
| dbUserApplyType | Body | Enum | O | DBユーザー適用タイプ<br/>- ENTIRE: `全体`<br/>- USER_CUSTOM: `ユーザー指定` |
| databaseIds | Body | Array | X | データベースの識別子リスト |
| dbUserIds | Body | Array | X | DBユーザーの識別子リスト |
| address | Body | String | O | 接続アドレス |
| authMethod | Body | Enum | O | 認証方式<br/>- TRUST: `トラスト(パスワード不要)`<br/>- REJECT: `接続ブロック`<br/>- SCRAM_SHA_256: `パスワード(SCRAM-SHA-256)` |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| hbaRuleId | Body | UUID | アクセス制御ルールの識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### アクセス制御ルールを適用

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules/apply
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスの修正 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### アクセス制御ルールの順序調整

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/orders
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Modify | DBインスタンス内のアクセス制御ルール修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| hbaRuleIds | Body | Array | O | 整列されたアクセス制御ルールIDリスト(リクエストした順序どおりに保存) |

<details><summary>例</summary>
<p>

```json
{
    "hbaRuleIds": []
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### アクセス制御ルールの削除

```http
DELETE /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Delete | DBインスタンス内のアクセス制御ルール削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| hbaRuleId | URL | UUID | O | アクセス制御ルールの識別子 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### アクセス制御ルールの修正

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Modify | DBインスタンス内のアクセス制御ルール修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| hbaRuleId | URL | UUID | O | アクセス制御ルールの識別子 |
| connectionTypeCode | Body | Enum | X | アクセス制御レコードタイプ<br/>- HOST: `TCP/IP接続時に有効`<br/>- HOST_NO_SSL: `SSL暗号化を使用しない接続時のみ有効` |
| databaseApplyType | Body | Enum | O | データベース適用タイプ<br/>- ENTIRE: `全体`<br/>- USER_CUSTOM: `ユーザー指定` |
| dbUserApplyType | Body | Enum | O | DBユーザー適用タイプ<br/>- ENTIRE: `全体`<br/>- USER_CUSTOM: `ユーザー指定` |
| databaseIds | Body | Array | X | データベースの識別子リスト |
| dbUserIds | Body | Array | X | DBユーザーの識別子リスト |
| address | Body | String | O | 接続アドレス |
| authMethod | Body | Enum | O | 認証方式<br/>- TRUST: `トラスト(パスワード不要)`<br/>- REJECT: `接続ブロック`<br/>- SCRAM_SHA_256: `パスワード(SCRAM-SHA-256)` |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。

---
### 高可用性情報の照会

```http
GET /v1.0/db-instances/{dbInstanceId}/high-availability
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Get | 高可用性情報照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| haStatus | Body | Enum | 高可用性状態<br/>- CREATED: `作成済み`<br/>- STABLE: `正常`<br/>- PAUSING: `一時停止中`<br/>- DISABLE: `停止`<br/>- DISABLE_MASTER_IN_REPLICATION: `マスター異常複製検知による高可用性停止`<br/>- DISABLE_MHA_PROCESS: `高可用性プロセス停止`<br/>- DISABLE_REPLICATION_STOP: `複製停止による高可用性停止`<br/>- DISABLE_REPLICATION_DELAY: `複製遅延による高可用性停止`<br/>- FAILOVER_STARTED: `フェイルオーバー開始`<br/>- FAILOVER_FAILED: `フェイルオーバー失敗`<br/>- FAILOVER_COMPLETED: `フェイルオーバー完了`<br/>- DELETED: `削除済み`<br/>- PAUSED: `一時停止`<br/>- PAUSED_DUE_TO_TASK: `作業による一時停止`<br/>- MASTER_FAILURE_DETECTION: `マスター障害検知` |
| pingInterval | Body | Number | Ping間隔(秒) |
| failoverReplWaitingTime | Body | Number | フェイルオーバー複製遅延待機時間(秒) |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### 高可用性を修正する

```http
PUT /v1.0/db-instances/{dbInstanceId}/high-availability
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Modify | 高可用性を修正する |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| useHighAvailability | Body | Boolean | O | 高可用性の使用有無 |
| pingInterval | Body | Number | X | Ping間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| failoverReplWaitingTime | Body | Number | X | フェイルオーバー複製遅延待機時間(秒)<br/>- 最小値: `-1` |

<details><summary>例</summary>
<p>

```json
{
    "useHighAvailability": false,
    "pingInterval": 1,
    "failoverReplWaitingTime": 1
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### 高可用性の一時停止

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Pause | 高可用性の一時停止 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### 高可用性の復旧

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Repair | 高可用性の復旧 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### 高可用性の再起動

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Resume | 高可用性の再起動 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### 高可用性の分離

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/split
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Split | 高可用性の分離 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---
### DBインスタンスメンテナンス情報照会

```http
GET /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンスメンテナンス情報照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| allowAutoMaintenance | Body | Boolean | 自動メンテナンスを許可するかどうか |
| useAutoStorageCleanup | Body | Boolean | 自動ストレージクリーンアップを使用するかどうか |
| maintWndBgnTime | Body | Time | 自動メンテナンス開始時間 |
| maintWndDuration | Body | Enum | メンテナンス期間<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |
| logRetentionPeriod | Body | Number | ログ保管期間(日) |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスメンテナンス情報修正

```http
PUT /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスメンテナンス情報修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| allowAutoMaintenance | Body | Boolean | X | 自動メンテナンスを許可するかどうか |
| useAutoStorageCleanup | Body | Boolean | X | 自動ストレージクリーンアップを使用するかどうか |
| maintWndBgnTime | Body | Time | X | 自動メンテナンス開始時間 |
| maintWndDuration | Body | Enum | X | メンテナンス期間<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |
| logRetentionPeriod | Body | Number | X | ログ保管期間(日)<br/>- 最小値: `1`<br/>- 最大値: `30` |

<details><summary>例</summary>
<p>

```json
{
    "allowAutoMaintenance": false,
    "useAutoStorageCleanup": false,
    "maintWndBgnTime": "00:00:00",
    "maintWndDuration": "HALF_AN_HOUR",
    "logRetentionPeriod": 1
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---
### DBインスタンスネットワーク情報の照会

```http
GET /v1.0/db-instances/{dbInstanceId}/network-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンスネットワーク情報の照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| availabilityZone | Body | Enum | DBインスタンスを作成するアベイラビリティゾーン |
| subnet | Body | Object | サブネットオブジェクト |
| subnet.subnetId | Body | UUID | サブネットの識別子 |
| subnet.subnetName | Body | String | サブネットを識別できる名前 |
| subnet.subnetCidr | Body | String | サブネットのCIDR |
| subnet.publicAccessible | Body | Boolean | 外部接続可否 |
| endPoints | Body | Array | 接続情報リスト |
| endPoints.domain | Body | String | ドメイン |
| endPoints.ipAddress | Body | String | IPアドレス |
| endPoints.endPointType | Body | String | 接続情報タイプ |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスネットワーク情報の修正

```http
PUT /v1.0/db-instances/{dbInstanceId}/network-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスネットワーク情報の修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| usePublicAccess | Body | Boolean | O | 外部接続可否 |

<details><summary>例</summary>
<p>

```json
{
    "usePublicAccess": false
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスの昇格

```http
POST /v1.0/db-instances/{dbInstanceId}/promote
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Promote | DBインスタンスの昇格 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---
### リードレプリカの作成

```http
POST /v1.0/db-instances/{dbInstanceId}/replicate
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Replicate | リードレプリカの作成 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| dbInstanceName | Body | String | O | DBインスタンスを識別できる名前 |
| description | Body | String | X | DBインスタンスの追加情報 |
| dbFlavorId | Body | UUID | X | DBインスタンス仕様の識別子 |
| dbPort | Body | Number | X | DBポート<br/>- 最小値: 5432、最大値: 45432 |
| parameterGroupId | Body | UUID | X | パラメータグループの識別子 |
| dbSecurityGroupIds | Body | Array | X | DBセキュリティグループの識別子リスト |
| userGroupIds | Body | Array | X | ユーザーグループの識別子リスト |
| useDefaultNotification | Body | Boolean | X | 基本通知の使用有無<br/>- デフォルト値: `false` |
| useDeletionProtection | Body | Boolean | X | 削除保護の有無<br/>- デフォルト値: `false` |
| network | Body | Object | X | ネットワーク情報オブジェクト |
| network.usePublicAccess | Body | Boolean | X | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Body | Enum | X | DBインスタンスを作成するアベイラビリティゾーン |
| storage | Body | Object | X | ストレージ情報オブジェクト |
| storage.storageType | Body | Enum | X | データストレージタイプ |
| storage.storageSize | Body | Number | X | データストレージサイズ(GB)<br/>- 最小値: `20`<br/>- 最大値: `2048` |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスの再起動

```http
POST /v1.0/db-instances/{dbInstanceId}/restart
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Restart | DBインスタンスの再起動 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンス復元情報の照会

```http
GET /v1.0/db-instances/{dbInstanceId}/restoration-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンス復元情報の照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| oldestRestorableYmdt | Body | DateTime | 最も古い復元可能時間 |
| latestRestorableYmdt | Body | DateTime | 最も最新の復元可能時間 |
| restorableBackups | Body | Array | 復元可能なバックアップリスト |
| restorableBackups.backupId | Body | UUID | バックアップの識別子 |
| restorableBackups.backupName | Body | String | バックアップ名 |
| restorableBackups.backupStatus | Body | Enum | バックアップ状態<br/>- BACKING_UP: `バックアップ中(スピナー)`<br/>- VERIFYING: `検証中(スピナー)`<br/>- COMPLETED: `使用可能(緑色アイコン)`<br/>- DELETING: `削除中(スピナー)`<br/>- DELETED: `削除済み(グレーアイコン)`<br/>- ERROR: `エラー(赤色アイコン)` |
| restorableBackups.dbInstanceId | Body | UUID | 原本DBインスタンスの識別子 |
| restorableBackups.dbInstanceName | Body | String | 原本DBインスタンス名 |
| restorableBackups.dbVersion | Body | Enum | DBエンジンタイプ |
| restorableBackups.backupType | Body | Enum | バックアップタイプ<br/>- AUTO<br/>- MANUAL |
| restorableBackups.backupSize | Body | Number | バックアップサイズ |
| restorableBackups.failoverCount | Body | Number | フェイルオーバー回数 |
| restorableBackups.walFileName | Body | String | WALファイル名 |
| restorableBackups.createdYmdt | Body | DateTime | バックアップ作成日時 |
| restorableBackups.updatedYmdt | Body | DateTime | バックアップ更新日時 |
| restorableBackups.startYmdt | Body | DateTime | バックアップ開始日時 |
| restorableBackups.completedYmdt | Body | DateTime | バックアップ完了日時 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスの復元

```http
POST /v1.0/db-instances/{dbInstanceId}/restore
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Restore | DBインスタンスの復元 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| dbInstanceName | Body | String | X | DBインスタンスを識別できる名前 |
| dbInstanceCandidateName | Body | String | X | DBインスタンスを識別できる予備マスター名 |
| description | Body | String | X | DBインスタンスの追加情報<br/>- 最大長: `100` |
| dbFlavorId | Body | UUID | O | DBインスタンス仕様の識別子 |
| dbPort | Body | Number | X | DBポート<br/>- 最小値: 5432、最大値: 45432 |
| useHighAvailability | Body | Boolean | X | 高可用性の使用有無<br/>- デフォルト値: `false` |
| imageId | Body | UUID | X | イメージの識別子 |
| pingInterval | Body | Number | X | 高可用性使用時のPing間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| failoverReplWaitingTime | Body | Number | X | フェイルオーバー複製遅延待機時間(秒)<br/>- 最小値: `-1` |
| storage | Body | Object | O | ストレージ情報オブジェクト |
| storage.storageType | Body | Enum | O | ストレージタイプ |
| storage.storageSize | Body | Number | O | データストレージサイズ(GB)<br/>- 最小値: `20` |
| network | Body | Object | O | ネットワーク情報オブジェクト |
| network.subnetId | Body | UUID | O | サブネットの識別子 |
| network.usePublicAccess | Body | Boolean | X | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Body | Enum | X | DBインスタンスを作成するアベイラビリティゾーン |
| backup | Body | Object | O | バックアップ情報オブジェクト |
| backup.backupPeriod | Body | Number | O | バックアップの保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Body | Number | X | バックアップの再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.replicationRegion | Body | Enum | X | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)`<br/>- KR2: `韓国(ピョンチョン)` |
| backup.backupSchedules | Body | Array | O | バックアップスケジュールリスト |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |
| restore | Body | Object | O | 復元情報オブジェクト |
| restore.restoreType | Body | Enum | O | 復元タイプ<br/>- BACKUP: `既存のバックアップを利用した復元`<br/>- TIMESTAMP: `復元可能時間内の時間を利用した時点復元` |
| restore.restoreYmdt | Body | DateTime | X | DBインスタンス復元日時 |
| restore.backupId | Body | UUID | X | 復元に使用するバックアップの識別子 |
| useDefaultNotification | Body | Boolean | X | 基本通知の使用有無<br/>- デフォルト値: `false` |
| parameterGroupId | Body | UUID | O | パラメータグループの識別子 |
| dbSecurityGroupIds | Body | Array | X | DBセキュリティグループの識別子リスト |
| userGroupIds | Body | Array | X | ユーザーグループの識別子リスト |
| useDeletionProtection | Body | Boolean | X | 削除保護の有無<br/>- デフォルト値: `false` |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---
### DBインスタンス開始

```http
POST /v1.0/db-instances/{dbInstanceId}/start
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Start | DBインスタンス開始 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンス停止

```http
POST /v1.0/db-instances/{dbInstanceId}/stop
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Stop | DBインスタンスを停止する |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスストレージ情報の照会

```http
GET /v1.0/db-instances/{dbInstanceId}/storage-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DBインスタンスストレージ情報の照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| storageType | Body | Enum | データストレージタイプ |
| storageSize | Body | Number | データストレージサイズ(GB) |
| storageStatus | Body | Enum | データストレージの現在状態<br/>- DELETED: `削除済み`<br/>- PENDING_DELETION: `削除猶予中`<br/>- DELETION_RESERVED: `削除予約済み（スナップショット整理待ち）`<br/>- DETACHED: `デタッチ`<br/>- ATTACHED: `アタッチ` |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBインスタンスストレージ情報の修正

```http
PUT /v1.0/db-instances/{dbInstanceId}/storage-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DBインスタンスストレージ情報の修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| storageSize | Body | Number | O | データストレージサイズ(GB)<br/>- 最大値:`2048` |

<details><summary>例</summary>
<p>

```json
{
    "storageSize": 1
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---
## バックアップ

### バックアップ状態

| 状態           | 説明                   |
|--------------|----------------------|
| `BACKING_UP` | バックアップ中の場合            |
| `COMPLETED`  | バックアップが完了した場合         |
| `DELETING`   | バックアップが削除中の場合         |
| `DELETED`    | バックアップが削除された場合        |
| `ERROR`      | エラーが発生した場合            |

### バックアップリスト照会

```http
GET /v1.0/backups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Backup.List | バックアップリスト照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | 全体バックアップリスト数 |
| backups | Body | Array | バックアップリスト |
| backups.backupId | Body | UUID | バックアップの識別子 |
| backups.backupName | Body | String | バックアップを識別できる名前 |
| backups.backupStatus | Body | Enum | バックアップの現在状態<br/>- BACKING_UP: `バックアップ中(スピナー)`<br/>- VERIFYING: `検証中(スピナー)`<br/>- COMPLETED: `使用可能(緑アイコン)`<br/>- DELETING: `削除中(スピナー)`<br/>- DELETED: `削除済み(グレーアイコン)`<br/>- ERROR: `エラー(赤アイコン)` |
| backups.dbInstanceId | Body | UUID | 原本DBインスタンスの識別子 |
| backups.dbVersion | Body | Enum | DBエンジンバージョン |
| backups.backupType | Body | Enum | バックアップタイプ<br/>- AUTO<br/>- MANUAL |
| backups.backupSize | Body | Number | バックアップのサイズ(バイト) |
| backups.startYmdt | Body | DateTime | 開始日時 |
| backups.createdYmdt | Body | DateTime | 作成日時 |
| backups.updatedYmdt | Body | DateTime | 修正日時 |
| backups.completedYmdt | Body | DateTime | 完了日時 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### バックアップ削除

```http
DELETE /v1.0/backups/{backupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Backup.Delete | バックアップ削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O | バックアップの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### バックアップをエクスポート

```http
POST /v1.0/backups/{backupId}/export
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Backup.Export | バックアップをエクスポート |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O | バックアップの識別子 |
| tenantId | Body | String | O | バックアップが保存されるオブジェクトストレージのテナントID<br/>- 最小長: `32`<br/>- 最大長: `32` |
| username | Body | String | O | NHN CloudアカウントまたはIAMメンバーID |
| password | Body | String | O | バックアップが保存されるオブジェクトストレージのAPIパスワード |
| targetContainer | Body | String | O | バックアップが保存されるオブジェクトストレージのコンテナ |
| objectPath | Body | String | O | コンテナに保存されるバックアップのパス |

<details><summary>例</summary>
<p>

```json
{
    "tenantId": "0123456789abcdef0123456789abcdef",
    "username": "username-example",
    "password": "password-example",
    "targetContainer": "targetContainer-example",
    "objectPath": "objectPath-example"
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### バックアップの復元

```http
POST /v1.0/backups/{backupId}/restore
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Backup.Restore | バックアップの復元 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O | バックアップの識別子 |
| dbInstanceName | Body | String | O | DBインスタンスを識別できる名前 |
| dbInstanceCandidateName | Body | String | X | DBインスタンスを識別できる予備マスター名 |
| description | Body | String | X | DBインスタンスの追加情報 |
| dbFlavorId | Body | UUID | O | DBインスタンス仕様の識別子 |
| dbPort | Body | Number | O | DBポート<br/>- 最小値: 5432、最大値: 45432 |
| parameterGroupId | Body | UUID | O | パラメータグループの識別子 |
| dbSecurityGroupIds | Body | Array | X | DBセキュリティグループの識別子リスト |
| userGroupIds | Body | Array | X | ユーザーグループの識別子リスト |
| useHighAvailability | Body | Boolean | X | 高可用性の使用有無<br/>- デフォルト値: `false` |
| useDefaultNotification | Body | Boolean | X | 基本通知の使用有無<br/>- デフォルト値: `false` |
| useDeletionProtection | Body | Boolean | X | 削除保護の有無<br/>- デフォルト値: `false` |
| pingInterval | Body | Number | X | Ping間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| failoverReplWaitingTime | Body | Number | X | フェイルオーバー複製遅延待機時間(秒)<br/>- 最小値: `-1` |
| network | Body | Object | O | ネットワーク情報オブジェクト |
| network.subnetId | Body | UUID | O | サブネットの識別子 |
| network.usePublicAccess | Body | Boolean | X | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Body | Enum | X | DBインスタンスを作成するアベイラビリティゾーン |
| storage | Body | Object | O | ストレージ情報オブジェクト |
| storage.storageType | Body | Enum | O | ストレージタイプ |
| storage.storageSize | Body | Number | O | データストレージサイズ(GB)<br/>- 最小値: `20` |
| backup | Body | Object | O | バックアップ情報オブジェクト |
| backup.backupPeriod | Body | Number | O | バックアップの保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Body | Number | X | バックアップの再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.backupSchedules | Body | Array | O | バックアップスケジュールリスト |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | バックアップ開始時間 |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---
## DBセキュリティグループ

### DBセキュリティグループの進行状態

| 状態              | 説明                     |
|-----------------|--------------------------|
| `NONE`          | 進行中の作業なし           |
| `CREATING_RULE` | ルールポリシー作成中       |
| `UPDATING_RULE` | ルールポリシー修正中       |
| `DELETING_RULE` | ルールポリシー削除中       |

### DBセキュリティグループリストを表示

```http
GET /v1.0/db-security-groups
```

#### 必要権限

| 権限名                                  | 説明                       |
|---------------------------------------|--------------------------|
| RDSforPostgreSQL:DbSecurityGroup.List | DBセキュリティグループリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前                                    | 種類  | 形式      | 説明                                                                                                                                                                                                                                                              |
|----------------------------------------|------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroups                       | Body | Array    | DBセキュリティグループリスト                                                                                                                                                                                                                                              |
| dbSecurityGroups.dbSecurityGroupId     | Body | UUID     | DBセキュリティグループの識別子                                                                                                                                                                                                                                            |
| dbSecurityGroups.dbSecurityGroupName   | Body | String   | DBセキュリティグループを識別できる名前                                                                                                                                                                                                                                    |
| dbSecurityGroups.dbSecurityGroupStatus | Body | Enum     | DBセキュリティグループの現在状態<br/>- CREATED: `作成済み`<br/>- DELETED: `削除済み`                                                                                                                                                                                       |
| dbSecurityGroups.description           | Body | String   | DBセキュリティグループの追加情報                                                                                                                                                                                                                                         |
| dbSecurityGroups.progressStatus        | Body | Enum     | DBセキュリティグループの現在の進行状態<br/>- NONE: `進行中の作業なし`<br/>- CREATING_RULE: `ルールポリシー作成中`<br/>- UPDATING_RULE: `ルールポリシー修正中`<br/>- DELETING_RULE: `ルールポリシー削除中`<br/>- APPLYING_DEFAULT_RULE: `基本ルール適用中` |
| dbSecurityGroups.createdYmdt           | Body | DateTime | 作成日時                                                                                                                                                                                                                                                          |
| dbSecurityGroups.updatedYmdt           | Body | DateTime | 修正日時                                                                                                                                                                                                                                                          |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBセキュリティグループの作成

```http
POST /v1.0/db-security-groups
```

#### 必要権限

| 権限名                                    | 説明                    |
|-----------------------------------------|------------------------|
| RDSforPostgreSQL:DbSecurityGroup.Create | DBセキュリティグループ作成 |

#### リクエスト

| 名前                 | 種類  | 形式    | 必須 | 説明                                                                                                                                                                                                                                                              |
|---------------------|------|--------|-----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupName | Body | String | O   | DBセキュリティグループを識別できる名前                                                                                                                                                                                                                                |
| description         | Body | String | X   | DBセキュリティグループの追加情報                                                                                                                                                                                                                                     |
| rules               | Body | Array  | O   | DBセキュリティグループルール情報                                                                                                                                                                                                                                     |
| rules.direction     | Body | Enum   | O   | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信`                                                                                                                                                                                                               |
| rules.etherType     | Body | Enum   | O   | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式`                                                                                                                                                                                                        |
| rules.port          | Body | Object | O   | ポートオブジェクト                                                                                                                                                                                                                                                  |
| rules.port.portType | Body | Enum   | O   | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲`                                                                                                           |
| rules.port.minPort  | Body | Number | X   | 最小ポート範囲<br/>- 最小値: `1`                                                                                                                                                                                                                                    |
| rules.port.maxPort  | Body | Number | X   | 最大ポート範囲<br/>- 最大値: `65535`                                                                                                                                                                                                                               |
| rules.cidr          | Body | String | O   | CIDR                                                                                                                                                                                                                                                             |
| rules.description   | Body | String | X   | DBセキュリティグループルールの追加情報                                                                                                                                                                                                                               |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

| 名前               | 種類  | 形式  | 説明                      |
|-------------------|------|------|--------------------------|
| dbSecurityGroupId | Body | UUID | DBセキュリティグループの識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBセキュリティグループの削除

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### 必要権限

| 権限名                                    | 説明                    |
|-----------------------------------------|------------------------|
| RDSforPostgreSQL:DbSecurityGroup.Delete | DBセキュリティグループの削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前               | 種類 | 形式  | 必須 | 説明 |
|-------------------|-----|------|----|-----|
| dbSecurityGroupId | URL | UUID | O  |     |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBセキュリティグループ詳細を表示

```http
GET /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### 必要権限

| 権限名                                 | 説明                         |
|--------------------------------------|------------------------------|
| RDSforPostgreSQL:DbSecurityGroup.Get | DBセキュリティグループ詳細を表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前               | 種類 | 形式  | 必須 | 説明                      |
|-------------------|-----|------|----|--------------------------|
| dbSecurityGroupId | URL | UUID | O  |                          |

#### レスポンス

| 名前                                    | 種類  | 形式      | 説明                                                                                                                                                                                                                                                                 |
|-----------------------------------------|------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroup                         | Body | Object   | DBセキュリティグループ                                                                                                                                                                                                                                                  |
| dbSecurityGroup.dbSecurityGroupId       | Body | UUID     | DBセキュリティグループの識別子                                                                                                                                                                                                                                           |
| dbSecurityGroup.dbSecurityGroupName     | Body | String   | DBセキュリティグループを識別できる名前                                                                                                                                                                                                                                   |
| dbSecurityGroup.dbSecurityGroupStatus   | Body | Enum     | DBセキュリティグループの現在状態<br/>- CREATED: `作成済み`<br/>- DELETED: `削除済み`                                                                                                                                                                                      |
| dbSecurityGroup.description             | Body | String   | DBセキュリティグループの追加情報                                                                                                                                                                                                                                        |
| dbSecurityGroup.progressStatus          | Body | Enum     | DBセキュリティグループの現在の進行状態<br/>- NONE: `進行中の作業なし`<br/>- CREATING_RULE: `ルールポリシー作成中`<br/>- UPDATING_RULE: `ルールポリシー修正中`<br/>- DELETING_RULE: `ルールポリシー削除中`<br/>- APPLYING_DEFAULT_RULE: `基本ルール適用中` |
| dbSecurityGroup.rules                   | Body | Array    | DBセキュリティグループルールリスト                                                                                                                                                                                                                                      |
| dbSecurityGroup.rules.ruleId            | Body | UUID     | DBセキュリティグループルールの識別子                                                                                                                                                                                                                                    |
| dbSecurityGroup.rules.description       | Body | String   | DBセキュリティグループルールの追加情報                                                                                                                                                                                                                                  |
| dbSecurityGroup.rules.direction         | Body | Enum     | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信`                                                                                                                                                                                                                  |
| dbSecurityGroup.rules.etherType         | Body | Enum     | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式`                                                                                                                                                                                                           |
| dbSecurityGroup.rules.port              | Body | Object   | ポートオブジェクト                                                                                                                                                                                                                                                      |
| dbSecurityGroup.rules.port.portType     | Body | Enum     | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲`                                                                                                            |
| dbSecurityGroup.rules.port.minPort      | Body | Number   | 最小ポート範囲                                                                                                                                                                                                                                                        |
| dbSecurityGroup.rules.port.maxPort      | Body | Number   | 最大ポート範囲                                                                                                                                                                                                                                                        |
| dbSecurityGroup.rules.cidr              | Body | String   | CIDR                                                                                                                                                                                                                                                                |
| dbSecurityGroup.rules.createdYmdt       | Body | DateTime | 作成日時                                                                                                                                                                                                                                                            |
| dbSecurityGroup.rules.updatedYmdt       | Body | DateTime | 修正日時                                                                                                                                                                                                                                                            |
| dbSecurityGroup.createdYmdt             | Body | DateTime | 作成日時                                                                                                                                                                                                                                                            |
| dbSecurityGroup.updatedYmdt             | Body | DateTime | 修正日時                                                                                                                                                                                                                                                            |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBセキュリティグループの修正

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### 必要権限

| 権限名                                    | 説明                    |
|-----------------------------------------|------------------------|
| RDSforPostgreSQL:DbSecurityGroup.Modify | DBセキュリティグループの修正 |

#### リクエスト

| 名前                 | 種類  | 形式    | 必須 | 説明                                    |
|---------------------|------|--------|-----|----------------------------------------|
| dbSecurityGroupId   | URL  | UUID   | O   |                                        |
| dbSecurityGroupName | Body | String | O   | DBセキュリティグループを識別できる名前       |
| description         | Body | String | X   | DBセキュリティグループの追加情報            |

<details><summary>例</summary>
<p>

```json
{
    "dbSecurityGroupName": "dbSecurityGroupName-example",
    "description": "description-example"
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBセキュリティグループルールの削除

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### 必要権限

| 権限名                                        | 説明                         |
|---------------------------------------------|------------------------------|
| RDSforPostgreSQL:DbSecurityGroupRule.Delete | DBセキュリティグループルールの削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前               | 種類   | 形式    | 必須 | 説明                             |
|-------------------|-------|--------|-----|----------------------------------|
| dbSecurityGroupId | URL   | UUID   | O   |                                  |
| ruleIds           | Query | String | O   | DBセキュリティグループルールIDリスト |

#### レスポンス

| 名前   | 種類  | 形式  | 説明                    |
|-------|------|------|------------------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBセキュリティグループルールの作成

```http
POST /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### 必要権限

| 権限名                                        | 説明                         |
|---------------------------------------------|------------------------------|
| RDSforPostgreSQL:DbSecurityGroupRule.Create | DBセキュリティグループルールの作成 |

#### リクエスト

| 名前               | 種類  | 形式    | 必須 | 説明                                                                                                                                                                                                               |
|-------------------|------|--------|-----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId | URL  | UUID   | O   |                                                                                                                                                                                                                    |
| direction         | Body | Enum   | O   | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信`                                                                                                                                                               |
| etherType         | Body | Enum   | O   | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式`                                                                                                                                                        |
| port              | Body | Object | O   | ポート情報                                                                                                                                                                                                         |
| port.portType     | Body | Enum   | O   | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲`                                                       |
| port.minPort      | Body | Number | X   | 最小ポート範囲<br/>- 最小値: `1`                                                                                                                                                                                   |
| port.maxPort      | Body | Number | X   | 最大ポート範囲<br/>- 最大値: `65535`                                                                                                                                                                              |
| cidr              | Body | String | O   | CIDR                                                                                                                                                                                                              |
| description       | Body | String | X   | DBセキュリティグループルールの追加情報                                                                                                                                                                               |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

| 名前   | 種類  | 形式  | 説明                    |
|-------|------|------|------------------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### DBセキュリティグループルールの修正

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### 必要権限

| 権限名                                        | 説明                         |
|---------------------------------------------|------------------------------|
| RDSforPostgreSQL:DbSecurityGroupRule.Modify | DBセキュリティグループルールの修正 |

#### リクエスト

| 名前               | 種類  | 形式    | 必須 | 説明                                                                                                                                                                                                               |
|-------------------|------|--------|-----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId | URL  | UUID   | O   |                                                                                                                                                                                                                    |
| ruleId            | URL  | UUID   | O   |                                                                                                                                                                                                                    |
| direction         | Body | Enum   | O   | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信`                                                                                                                                                               |
| etherType         | Body | Enum   | O   | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式`                                                                                                                                                        |
| port              | Body | Object | O   | ポート情報                                                                                                                                                                                                         |
| port.portType     | Body | Enum   | O   | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲`                                                       |
| port.minPort      | Body | Number | X   | 最小ポート範囲<br/>- 最小値: `1`                                                                                                                                                                                   |
| port.maxPort      | Body | Number | X   | 最大ポート範囲<br/>- 最大値: `65535`                                                                                                                                                                              |
| cidr              | Body | String | O   | CIDR                                                                                                                                                                                                              |
| description       | Body | String | X   | DBセキュリティグループルールの追加情報                                                                                                                                                                               |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

| 名前   | 種類  | 形式  | 説明                    |
|-------|------|------|------------------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---
## パラメータグループ

### パラメータグループリストを表示

```http
GET /v1.0/parameter-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.List | パラメータグループリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| parameterGroups | Body | Array | パラメータグループリスト |
| parameterGroups.parameterGroupId | Body | UUID | パラメータグループの識別子 |
| parameterGroups.parameterGroupName | Body | String | パラメータグループを識別できる名前 |
| parameterGroups.description | Body | String | パラメータグループの追加情報 |
| parameterGroups.dbVersion | Body | Enum | DBバージョン情報 |
| parameterGroups.parameterGroupStatus | Body | Enum | パラメータグループの現在状態<br/>- STABLE: `適用完了`<br/>- NEED_TO_APPLY: `適用必要`<br/>- DELETED: `削除済み` |
| parameterGroups.createdYmdt | Body | DateTime | 作成日時 |
| parameterGroups.updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### パラメータグループの作成

```http
POST /v1.0/parameter-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Create | パラメータグループの作成 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupName | Body | String | O | パラメータグループを識別できる名前 |
| description | Body | String | X | パラメータグループの追加情報 |
| dbVersion | Body | Enum | O | DBバージョン情報 |

<details><summary>例</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName-example",
    "description": "description-example",
    "dbVersion": "POSTGRESQL_V14_17"
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| parameterGroupId | Body | UUID | パラメータグループの識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### パラメータグループの削除

```http
DELETE /v1.0/parameter-groups/{parameterGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Delete | パラメータグループの削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | パラメータグループの識別子 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### パラメータグループ詳細を表示

```http
GET /v1.0/parameter-groups/{parameterGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Get | パラメータグループ詳細を表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | パラメータグループの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| parameterGroupId | Body | UUID | パラメータグループの識別子 |
| parameterGroupName | Body | String | パラメータグループを識別できる名前 |
| description | Body | String | パラメータグループの追加情報 |
| dbVersion | Body | Enum | DBバージョン情報 |
| parameterGroupStatus | Body | Enum | パラメータグループの現在状態<br/>- STABLE: `適用完了`<br/>- NEED_TO_APPLY: `適用必要`<br/>- DELETED: `削除済み` |
| parameters | Body | Array | パラメータリスト |
| parameters.parameterCategory | Body | String | パラメータカテゴリー |
| parameters.parameterName | Body | String | パラメータ名 |
| parameters.value | Body | String | 現在設定されている値 |
| parameters.valueUnit | Body | String | 値の単位(バイト: B,kB,MB,GB,TB、時間: us,ms,s,min,h,d) |
| parameters.defaultValue | Body | String | デフォルト値 |
| parameters.allowedValue | Body | String | 許可された値 |
| parameters.valueType | Body | Enum | 値タイプ<br/>- BOOLEAN: `ブーリアンタイプ`<br/> `* ex) on, off, true, false, yes, no, 1, 0`<br/>- STRING: `文字列タイプ`<br/>- NUMERIC: `整数および浮動小数点タイプ`<br/>- NUMERIC_WITH_BYTE_UNIT: `バイト単位の数字タイプ`<br/> `* ex) 120kB, 100MB`<br/> `* 許可されたバイト単位: B (bytes), kB (kilobytes), MB (megabytes), GB (gigabytes), and TB (terabytes)`<br/>- NUMERIC_WITH_TIME_UNIT: `時間単位の数字タイプ`<br/> `* ex) 120ms, 100s, 1d`<br/> `* 許可された時間単位: us (microseconds), ms (milliseconds), s (seconds), min (minutes), h (hours), and d (days)`<br/>- ENUMERATED: `許可された値に宣言された値の中から1つを選択(コンマ(,)で区分される)`<br/>- MULTI_ENUMERATED: `許可された値に宣言された値の中から複数個を選択(コンマ(,)で区分される)` |
| parameters.updateType | Body | Enum | 修正タイプ<br/>- VARIABLE: `常に修正可能`<br/>- CONSTANT: `修正不可能` |
| parameters.applyType | Body | Enum | 適用タイプ<br/>- BOTH: `セッション、設定ファイルの両方に適用`<br/>- SESSION: `セッションにのみ適用`<br/>- FILE: `設定ファイルにのみ適用` |
| parameters.expressionAvailable | Body | Boolean | 数式の使用可否 |
| createdYmdt | Body | DateTime | 作成日時 |
| updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### パラメータグループの修正

```http
PUT /v1.0/parameter-groups/{parameterGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Modify | パラメータグループの修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | パラメータグループの識別子 |
| parameterGroupName | Body | String | X | パラメータグループを識別できる名前 |
| description | Body | String | X | パラメータグループの追加情報 |

<details><summary>例</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName-example",
    "description": "description-example"
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### パラメータグループのコピー

```http
POST /v1.0/parameter-groups/{parameterGroupId}/copy
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Copy | パラメータグループのコピー |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | パラメータグループの識別子 |
| parameterGroupName | Body | String | O | パラメータグループを識別できる名前 |
| description | Body | String | X | パラメータグループの追加情報 |

<details><summary>例</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName-example",
    "description": "description-example"
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| parameterGroupId | Body | UUID | パラメータグループの識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### パラメータ修正

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/parameters
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Modify | パラメータグループの修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | パラメータグループの識別子 |
| modifiedParameters | Body | Array | O | 変更するパラメータリスト |
| modifiedParameters.parameterName | Body | String | O | パラメータ名 |
| modifiedParameters.value | Body | String | O | 変更するパラメータ値 |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### パラメータグループの再設定

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/reset
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Reset | パラメータグループの再設定 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | パラメータグループの識別子 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---
## ユーザーグループ

### ユーザーグループリストを表示

```http
GET /v1.0/user-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.List | ユーザーグループリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| userGroups | Body | Array | ユーザーグループリスト |
| userGroups.userGroupId | Body | UUID | ユーザーグループの識別子 |
| userGroups.userGroupName | Body | String | ユーザーグループを識別できる名前 |
| userGroupStatus | Body | Enum | ユーザーグループの現在状態<br/>- CREATED<br/>- DELETED |
| userGroups.createdYmdt | Body | DateTime | 作成日時 |
| userGroups.updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### ユーザーグループの作成

```http
POST /v1.0/user-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Create | ユーザーグループの作成 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupName | Body | String | O | ユーザーグループを識別できる名前 |
| memberIds | Body | Array | O | プロジェクトメンバーの識別子リスト |
| selectAllYN | Body | Boolean | O | プロジェクトメンバー全体の有無<br/>- デフォルト値: `false` |

<details><summary>例</summary>
<p>

```json
{
    "userGroupName": "userGroupName-example",
    "memberIds": [],
    "selectAllYN": false
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| userGroupId | Body | UUID | ユーザーグループの識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### ユーザーグループの削除

```http
DELETE /v1.0/user-groups/{userGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Delete | ユーザーグループの削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O | ユーザーグループの識別子 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### ユーザーグループ詳細を表示

```http
GET /v1.0/user-groups/{userGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Get | ユーザーグループ詳細を表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O | ユーザーグループの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| userGroupId | Body | UUID | ユーザーグループの識別子 |
| userGroupName | Body | String | ユーザーグループを識別できる名前 |
| userGroupTypeCode | Body | Enum | ユーザーグループ種類<br/>- ENTIRE: `プロジェクトメンバー全体`<br/>- INDIVIDUAL_MEMBER: `ユーザー指定` |
| userGroupStatus | Body | Enum | ユーザーグループの現在状態<br/>- CREATED<br/>- DELETED |
| members | Body | Array | プロジェクトメンバーリスト |
| members.memberId | Body | UUID | プロジェクトメンバーの識別子 |
| createdYmdt | Body | DateTime | 作成日時 |
| updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### ユーザーグループの修正

```http
PUT /v1.0/user-groups/{userGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Modify | ユーザーグループの修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O | ユーザーグループの識別子 |
| userGroupName | Body | String | X | ユーザーグループを識別できる名前 |
| memberIds | Body | Array | X | プロジェクトメンバーの識別子リスト |
| selectAllYN | Body | Boolean | O | プロジェクトメンバー全体の有無<br/>- デフォルト値: `false` |

<details><summary>例</summary>
<p>

```json
{
    "userGroupName": "userGroupName-example",
    "memberIds": [],
    "selectAllYN": false
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。

---
## 通知グループ

### 通知グループリストを表示

```http
GET /v1.0/notification-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.List | 通知グループリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| notificationGroups | Body | Array |  |
| notificationGroups.notificationGroupId | Body | UUID | 通知グループの識別子 |
| notificationGroups.notificationGroupName | Body | String | 通知グループを識別できる名前 |
| notificationGroups.notificationGroupStatus | Body | Enum | 通知グループの現在状態<br/>- CREATED: `作成済み`<br/>- DELETED: `削除済み` |
| notificationGroups.notifyEmail | Body | Boolean | メール通知の有無 |
| notificationGroups.notifySms | Body | Boolean | SMS通知の有無 |
| notificationGroups.isEnabled | Body | Boolean | 有効かどうか |
| notificationGroups.createdYmdt | Body | DateTime | 作成日時 |
| notificationGroups.updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### 通知グループの作成

```http
POST /v1.0/notification-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Create | 通知グループの作成 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupName | Body | String | O | 通知グループを識別できる名前 |
| notifyEmail | Body | Boolean | X | メール通知の有無<br/>- デフォルト値: `true` |
| notifySms | Body | Boolean | X | SMS通知の有無<br/>- デフォルト値: `true` |
| isEnabled | Body | Boolean | X | 有効かどうか<br/>- デフォルト値: `true` |
| dbInstanceIds | Body | Array | O | 監視対象のDBインスタンスの識別子リスト |
| userGroupIds | Body | Array | O | ユーザーグループの識別子リスト |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| notificationGroupId | Body | UUID | 通知グループの識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### 通知グループの削除

```http
DELETE /v1.0/notification-groups/{notificationGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Delete | 通知グループの削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | 通知グループの識別子 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 通知グループ詳細を表示

```http
GET /v1.0/notification-groups/{notificationGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Get | 通知グループ詳細を表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | 通知グループの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| notificationGroupId | Body | UUID | 通知グループの識別子 |
| notificationGroupName | Body | String | 通知グループを識別できる名前 |
| notificationGroupStatus | Body | Enum | 通知グループの現在状態<br/>- CREATED: `作成済み`<br/>- DELETED: `削除済み` |
| notifyEmail | Body | Boolean | メール通知の有無 |
| notifySms | Body | Boolean | SMS通知の有無 |
| isEnabled | Body | Boolean | 有効かどうか |
| dbInstances | Body | Array | 監視対象のDBインスタンスリスト |
| dbInstances.dbInstanceId | Body | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceName | Body | String | DBインスタンスを識別できる名前 |
| userGroups | Body | Array | ユーザーグループリスト |
| userGroups.userGroupId | Body | UUID | ユーザーグループの識別子 |
| userGroups.userGroupName | Body | String | ユーザーグループを識別できる名前 |
| createdYmdt | Body | DateTime | 作成日時 |
| updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### 通知グループの修正

```http
PUT /v1.0/notification-groups/{notificationGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Modify | 通知グループの修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | 通知グループの識別子 |
| notificationGroupName | Body | String | X | 通知グループを識別できる名前 |
| notifyEmail | Body | Boolean | X | メール通知の有無<br/>- デフォルト値: `false` |
| notifySms | Body | Boolean | X | SMS通知の有無<br/>- デフォルト値: `false` |
| isEnabled | Body | Boolean | X | 有効かどうか<br/>- デフォルト値: `false` |
| dbInstanceIds | Body | Array | O | 監視対象のDBインスタンスの識別子リスト |
| userGroupIds | Body | Array | O | ユーザーグループの識別子リスト |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 監視設定リストを表示

```http
GET /v1.0/notification-groups/{notificationGroupId}/watchdogs
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.List | 監視設定リストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | 通知グループの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| notificationWatchdogs | Body | Array | 監視設定情報 |
| notificationWatchdogs.watchdogId | Body | UUID | 監視設定の識別子 |
| notificationWatchdogs.metricName | Body | String | 監視対象の性能指標 |
| notificationWatchdogs.comparisonOperator | Body | Enum | 監視対象の比較方法<br/>- LE: `<=`<br/>- LT: `<`<br/>- GE: `>=`<br/>- GT: `>` |
| notificationWatchdogs.threshold | Body | Number | 監視対象のしきい値 |
| notificationWatchdogs.duration | Body | Number | 監視対象の持続時間 |
| notificationWatchdogs.createdYmdt | Body | DateTime | 作成日時 |

<details><summary>例</summary>
<p>

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
            "metricName": "metricName-example",
            "comparisonOperator": "LE",
            "threshold": 1,
            "duration": 1,
            "createdYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### 監視設定の作成

```http
POST /v1.0/notification-groups/{notificationGroupId}/watchdogs
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Create | 監視設定の作成 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | 通知グループの識別子 |
| metricName | Body | String | O | 監視対象の性能指標 |
| comparisonOperator | Body | Enum | O | 監視対象の比較方法<br/>- LE: `<=`<br/>- LT: `<`<br/>- GE: `>=`<br/>- GT: `>` |
| threshold | Body | Number | O | 監視対象のしきい値<br/>- 最小値: `0` |
| duration | Body | Number | O | 監視対象の持続時間（分）<br/>- 最小値: `0` |

<details><summary>例</summary>
<p>

```json
{
    "metricName": "metricName-example",
    "comparisonOperator": "LE",
    "threshold": 0,
    "duration": 0
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| watchdogId | Body | UUID | 監視設定の識別子 |

<details><summary>例</summary>
<p>

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

</p>
</details>

---

### 通知グループの削除

```http
DELETE /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Delete | 通知グループの削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | 通知グループの識別子 |
| watchdogId | URL | UUID | O | 監視設定の識別子 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 監視設定の修正

```http
PUT /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Modify | 監視設定の修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | 通知グループの識別子 |
| watchdogId | URL | UUID | O | 監視設定の識別子 |
| metricName | Body | String | O | 監視対象の性能指標 |
| comparisonOperator | Body | Enum | O | 監視対象の比較方法<br/>- LE: `<=`<br/>- LT: `<`<br/>- GE: `>=`<br/>- GT: `>` |
| threshold | Body | Number | O | 監視対象のしきい値<br/>- 最小値: `0` |
| duration | Body | Number | O | 監視対象の持続時間（分）<br/>- 最小値: `0` |

<details><summary>例</summary>
<p>

```json
{
    "metricName": "metricName-example",
    "comparisonOperator": "LE",
    "threshold": 0,
    "duration": 0
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。

---
## モニタリング

### 統計情報照会

```http
GET /v1.0/metric-statistics
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Metric.List | 統計情報照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 性能指標リストを表示

```http
GET /v1.0/metrics
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Metric.List | 性能指標リストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| metrics | Body | Array | 性能指標リスト |
| metrics.metricName | Body | String | 性能指標タイプ |
| metrics.unit | Body | String | 測定値単位 |

<details><summary>例</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "metrics": [
        {
            "metricName": "metricName-example",
            "unit": "unit-example"
        }
    ]
}
```

</p>
</details>

---

## イベント

### イベントカテゴリー

イベントはカテゴリーで分類でき、以下のとおりです。

| イベントカテゴリー | 説明 |
|-------------|---------|
| ALL         | 全体 |
| BACKUP      | バックアップ |
| DB_INSTANCE | DBインスタンス |
| JOB         | 作業 |
| TENANT      | テナント |
| MONITORING  | モニタリング |

### 購読可能なイベントコードリストを表示

```http
GET /v1.0/event-codes
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Event.List | 購読可能なイベントコードリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| eventCodes | Body | Array | イベントコードリスト |
| eventCodes.eventCode | Body | Enum | イベントコード |
| eventCodes.eventCategoryType | Body | Enum | イベントカテゴリータイプ<br/>- ALL: `全体`<br/>- DB_INSTANCE: `DBインスタンスで発生したイベント`<br/>- DB_SECURITY_GROUP: `DBセキュリティグループで発生したイベント`<br/>- MONITORING: `モニタリングで発生したイベント`<br/>- JOB: `JOBで発生したイベント`<br/>- BACKUP: `バックアップで発生したイベント`<br/>- TENANT: `テナントで発生したイベント` |

<details><summary>例</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "eventCodes": [
        {
            "eventCode": "ENUM_VALUE",
            "eventCategoryType": "ALL"
        }
    ]
}
```

</p>
</details>

---

### イベントリストを表示

```http
GET /v1.0/events
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforPostgreSQL:Event.List | イベントリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | 全体のイベントリスト数 |
| events | Body | Array | イベントリスト |
| events.eventCategoryType | Body | Enum | イベントカテゴリータイプ<br/>- ALL: `全体`<br/>- DB_INSTANCE: `DBインスタンスで発生したイベント`<br/>- DB_SECURITY_GROUP: `DBセキュリティグループで発生したイベント`<br/>- MONITORING: `モニタリングで発生したイベント`<br/>- JOB: `JOBで発生したイベント`<br/>- BACKUP: `バックアップで発生したイベント`<br/>- TENANT: `テナントで発生したイベント` |
| events.eventCode | Body | Enum | 発生したイベントのタイプ |
| events.sourceId | Body | UUID | イベントソースの識別子 |
| events.sourceName | Body | String | イベントソースを識別できる名前 |
| events.messages | Body | Array | イベントメッセージリスト |
| events.messages.langCode | Body | Enum | 言語コード<br/>- KO<br/>- EN<br/>- JA<br/>- ZH |
| events.messages.message | Body | String | イベントメッセージ |
| events.eventYmdt | Body | DateTime | イベント発生日時 |

<details><summary>例</summary>
<p>

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
            "eventCode": "ENUM_VALUE",
            "sourceId": "550e8400-e29b-41d4-a716-446655440000",
            "sourceName": "sourceName-example",
            "messages": [
                {
                    "langCode": "KO",
                    "message": "message-example"
                }
            ],
            "eventYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---
