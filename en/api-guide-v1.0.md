## Database > RDS for PostgreSQL > API Guide > API v1.0 Guide

## Common Information on RDS for PostgreSQL API

### API Endpoint

| Region                | Endpoint                                         |
|-----------------------|--------------------------------------------------|
| Korea (Pangyo) region | https://kr1-rds-postgres.api.nhncloudservice.com |

### Authentication and Authorization

RDS for PostgreSQL uses User Access Key tokens for authentication and authorization when making API calls. The User Access Key token is a temporary, Bearer-type access token issued from a User Access Key. For more information on issuing and using User Access Key tokens, please refer to the [User Access Key Token](/nhncloud/en/public-api/user-access-key-token).
The issued token must be included in the request header along with the Appkey.

| Name                | Type   | Format | Required | Description                                                         |
|---------------------|--------|--------|----------|---------------------------------------------------------------------|
| X-TC-APP-KEY        | Header | String | O        | Appkey or project integration appkey for RDS for PostgreSQL service |
| X-NHN-AUTHORIZATION | Header | String | O        | Bearer type token issued with the Public API                        |

Project permissions also limit the APIs that can be called. The `RDS for` `PostgreSQL` `ADMIN` and `RDS for PostgreSQL VIEWER` roles are granted default permissions, as shown below, and you can grant only the permissions you need from the Manage Role Groups menu within the project.

* The `RDS for PostgreSQL ADMIN` role is granted all the permissions required to run the API.
* The `RDS for PostgreSQL VIEWER` role is granted with the permission to view information only.
    * Cannot use any features aimed at DB instances or create, modify, or delete any DB instance.
    * However, you can use features related to notification groups and user groups.

If an API request fails to authenticate or is not authorized, the following error occurs.

| resultCode | resultMessage | Description            |
|------------|---------------|------------------------|
| 80401      | Unauthorized  | Failed to authenticate |
| 80403      | Forbidden     | Unauthorized.          |

### Response Common Information

The API responds with "200 OK" to all API requests. For more information on the response results, see Response Body Header.

#### Response Body

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
}
```

#### Field

| Name          | Data type | Description                              |
|---------------|-----------|------------------------------------------|
| resultCode    | Number    | Result code (Success: 0, Other: Failure) |
| resultMessage | String    | Result message                           |
| successful    | Boolean   | Successful or not                        |

## DB Version

### View DB Version List

```http
GET /v1.0/db-versions
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbVersion.List | View DB Version List |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbVersions | Body | Array | DB version information |
| dbVersions.dbVersionCode | Body | Enum | DB version code<br/>- MYSQL_V5633<br/>- MYSQL_V5715<br/>- MYSQL_V5719<br/>- MYSQL_V5726<br/>- MYSQL_V5731<br/>- MYSQL_V5733<br/>- MYSQL_V5737<br/>- MYSQL_V8018<br/>- MYSQL_V8023<br/>- MYSQL_V8028<br/>- MYSQL_V8032<br/>- MYSQL_V8033<br/>- MYSQL_V8034<br/>- MYSQL_V8035<br/>- MYSQL_V8036<br/>- MYSQL_V8040<br/>- MYSQL_V8041<br/>- MYSQL_V8042<br/>- MYSQL_V8043<br/>- MYSQL_V8044<br/>- MYSQL_V8045<br/>- MYSQL_V8405<br/>- MYSQL_V8406<br/>- MYSQL_V8407<br/>- MYSQL_V8408<br/>- MYSQL_V8409<br/>- MARIADB_V10330<br/>- MARIADB_V10611<br/>- MARIADB_V10612<br/>- MARIADB_V10616<br/>- MARIADB_V10622<br/>- MARIADB_V10625<br/>- MARIADB_V101107<br/>- MARIADB_V101108<br/>- MARIADB_V101113<br/>- MARIADB_V101116<br/>- MARIADB_V11407<br/>- MARIADB_V11410<br/>- MARIADB_V11806<br/>- POSTGRESQL_V14_6<br/>- POSTGRESQL_V14_15<br/>- POSTGRESQL_V14_17<br/>- POSTGRESQL_V14_19<br/>- POSTGRESQL_V17_2<br/>- POSTGRESQL_V17_4<br/>- POSTGRESQL_V17_6 |
| dbVersions.dbMajorVersionCode | Body | Enum | DB major version code<br/>- MYSQL_V56<br/>- MYSQL_V57<br/>- MYSQL_V80<br/>- MYSQL_V84<br/>- MARIADB_V103<br/>- MARIADB_V106<br/>- MARIADB_V1011<br/>- MARIADB_V114<br/>- MARIADB_V118<br/>- POSTGRES_V14<br/>- POSTGRES_V17 |
| dbVersions.name | Body | String | DB version name |
| dbVersions.canCreate | Body | Boolean | Whether new creation is available |

<details><summary>Example</summary>
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

## Specifications of DB Instance

### List DB Instance Specifications

```http
GET /v1.0/db-flavors
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbFlavor.List | List DB Instance Specifications |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbFlavors | Body | Array | List of DB instance specifications |
| dbFlavors.dbFlavorId | Body | UUID | Identifier of DB instance specifications |
| dbFlavors.dbFlavorName | Body | String | Name of DB instance specifications |
| dbFlavors.ram | Body | Number | Memory size (MB) |
| dbFlavors.vcpus | Body | Number | CPU cores |

<details><summary>Example</summary>
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

## Project Information

### List Project Members

```http
GET /v1.0/project/members
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Project.Get | List Project Members |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| projectMembers | Body | Array | Project member information |
| projectMembers.memberId | Body | UUID | Project member identifier |
| projectMembers.memberName | Body | String | Project member name |
| projectMembers.emailAddress | Body | String | Project member email address |
| projectMembers.phoneNumber | Body | String | Project member phone number |

<details><summary>Example</summary>
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

### List Regions

```http
GET /v1.0/project/regions
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Project.Get | List Regions |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| regions | Body | Array | Region information |
| regions.regionCode | Body | Enum | Region code<br/>- KR1: `Korea (Pangyo)`<br/>- KR2: `Korea (Pyeongchon)` |
| regions.isEnabled | Body | Boolean | Whether the region is enabled |

<details><summary>Example</summary>
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

## Network

### List Subnets

```http
GET /v1.0/network/subnets
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Network.List | List Subnets |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| subnets | Body | Array | Subnet information |
| subnets.subnetId | Body | UUID | Subnet identifier |
| subnets.subnetName | Body | String | Name to identify subnets |
| subnets.subnetCidr | Body | String | Subnet CIDR |
| subnets.usingGateway | Body | Boolean | Whether to use gateway |
| subnets.availableIpCount | Body | Number | Number of available IPs |

<details><summary>Example</summary>
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

## Storage

### View the List of Storage Types

```http
GET /v1.0/storage-types
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Storage.List | View the List of Storage Types |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| storageTypes | Body | Array | List of storage types |

<details><summary>Example</summary>
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

## Task Information

### Task Status

| Status | Description |
|--------------------|----------------------|
| `PREPARING` | When the task is being prepared |
| `READY` | When the task is ready |
| `RUNNING` | When the task is in progress |
| `COMPLETED` | When the task is complete |
| `REGISTERED` | When the task is registered |
| `WAIT_TO_REGISTER` | When the task is waiting to be registered |
| `INTERRUPTED` | When an interrupt occurred while the task was in progress |
| `CANCELED` | When the task is canceled |
| `FAILED` | When the task has failed |
| `ERROR` | When an error occurred while the task was in progress |
| `DELETED` | When the task has been deleted |
| `FAIL_TO_READY` | When the task failed to be ready |

### View Task Details

```http
GET /v1.0/jobs/{jobId}
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Job.Get | View Task Details |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| jobId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Task identifier |
| jobStatus | Body | Enum | Current task status<br/>- DELETED<br/>- CANNOT_PROGRESS<br/>- FAILED<br/>- ERROR<br/>- CANCELED<br/>- INTERRUPTED<br/>- COMPLETED<br/>- COMPLETED_WITH_ERROR<br/>- RUNNING<br/>- PREPARING<br/>- READY<br/>- CREATED<br/>- FAIL_TO_READY<br/>- REGISTERED<br/>- FAIL_TO_REGISTER<br/>- WAIT_TO_REGISTER |
| resourceRelations | Body | Array | Related resource list |
| resourceRelations.resourceType | Body | String | Related resource type |
| resourceRelations.resourceId | Body | String | Related resource identifier |
| createdYmdt | Body | DateTime | Created date and time |
| updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
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
## DB Instance Group

### List DB Instance Groups

```http
GET /v1.0/db-instance-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroup.List | List DB Instance Groups |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbInstanceGroups | Body | Array | DB instance group information |
| dbInstanceGroups.dbInstanceGroupId | Body | UUID | DB instance group identifier |
| dbInstanceGroups.dbInstanceGroupStatus | Body | Enum | Current status of the DB instance group<br/>- CREATED: `Created`<br/>- DELETED: `Deleted` |
| dbInstanceGroups.replicationType | Body | Enum | DB instance group replication type<br/>- STANDALONE: `High availability not used`<br/>- HIGH_AVAILABILITY: `High availability used` |
| dbInstanceGroups.createdYmdt | Body | DateTime | Created date and time |
| dbInstanceGroups.updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
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

### List DB Instance Group Details

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroup.Get | List DB Instance Group Details |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbInstanceGroupId | Body | UUID | DB instance group identifier |
| dbInstanceGroupStatus | Body | Enum | Current status of the DB instance group<br/>- CREATED: `Created`<br/>- DELETED: `Deleted` |
| replicationType | Body | Enum | DB instance group replication type<br/>- STANDALONE: `High availability not used`<br/>- HIGH_AVAILABILITY: `High availability used` |
| dbInstances | Body | Array | List of DB instances belonging to the DB instance group |
| dbInstances.dbInstanceId | Body | UUID | DB instance identifier |
| dbInstances.dbInstanceType | Body | Enum | DB instance role type<br/>- MASTER: `Master`<br/>- FAILED_MASTER: `Failed master`<br/>- CANDIDATE_MASTER: `Candidate master`<br/>- READ_ONLY_SLAVE: `Read replica` |
| dbInstances.dbInstanceStatus | Body | Enum | Current status of the DB instance<br/>- BEFORE_CREATE: `Before creation (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Insufficient storage (red)`<br/>- FAIL_TO_CREATE: `Failed to create (red)`<br/>- FAIL_TO_CONNECT: `Failed to connect (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delayed (yellow)`<br/>- FAILOVER: `Failover complete (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
| createdYmdt | Body | DateTime | Created date and time |
| updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
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

### View Extension List

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.List | View Extension List |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DB instance group ID |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| extensions | Body | Array | Extension information |
| extensions.extensionId | Body | UUID | Extension identifier |
| extensions.extensionName | Body | String | Extension name |
| extensions.extensionStatus | Body | Enum | Extension status<br/>- AVAILABLE: `Available`<br/>- NEED_TO_APPLY: `Need to apply`<br/>- APPLYING: `Applying` |
| extensions.databases | Body | Array | Database information |
| extensions.databases.dbInstanceGroupExtensionId | Body | UUID | Identifier of an extension within a DB instance group |
| extensions.databases.databaseId | Body | UUID | Database identifier |
| extensions.databases.databaseName | Body | String | Database name |
| extensions.databases.dbInstanceGroupExtensionStatus | Body | Enum | Extension installation status within the database<br/>- CREATED: `Created`<br/>- INSTALLED: `Installed`<br/>- INSTALLING: `Installing`<br/>- INSTALL_ERROR: `Installation error`<br/>- DELETED: `Deleted`<br/>- DELETING: `Deleting`<br/>- DELETE_ERROR: `Deletion error` |
| extensions.databases.reservedAction | Body | Enum | Scheduled task<br/>- NONE: `None`<br/>- INSTALL: `Scheduled installation (need to apply)`<br/>- INSTALL_WITH_CASCADE: `Scheduled forced installation (need to apply)`<br/>- DELETE: `Scheduled deletion (need to apply)`<br/>- DELETE_WITH_CASCADE: `Scheduled forced deletion (need to apply)` |
| extensions.databases.errorReason | Body | String | Reason for error |
| isNeedToApply | Body | Boolean | Whether changes need to be applied |

<details><summary>Example</summary>
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

### Apply Extension Changes

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/apply
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Apply | Apply Extension Changes |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DB instance group ID |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of the requested task |

<details><summary>Example</summary>
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

### Synchronize Extensions

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/sync
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Sync | Synchronize Extensions |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DB instance group ID |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of the requested task |

<details><summary>Example</summary>
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

### Delete Extension (Cancel)

```http
DELETE /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{dbInstanceGroupExtensionId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Delete | Delete Extension (Cancel) |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DB instance group ID |
| dbInstanceGroupExtensionId | URL | UUID | O | Identifier of the extension within the DB instance group |
| withCascade | Query | Boolean | O | Whether to force deletion |

#### Response

This API does not return a response body.

---

### Install Extension

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{extensionId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Install | Install Extension |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DB instance group ID |
| extensionId | URL | UUID | O | Extension identifier |
| databaseId | Body | UUID | O | Database identifier |
| schemaName | Body | String | O | Schema name |
| withCascade | Body | Boolean | X | Whether to automatically install dependencies<br/>- Default: `false` |

<details><summary>Example</summary>
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

#### Response

This API does not return a response body.

---
## DB Instance

### DB Instance Status

| Status                  | Description                           |
|---------------------|-------------------------------|
| `AVAILABLE`         | DB instance is available           |
| `BEFORE_CREATE`     | Before creating a DB instance            |
| `STORAGE_FULL`      | Insufficient DB instance storage          |
| `FAIL_TO_CREATE`    | Failed to create DB instance           |
| `FAIL_TO_CONNECT`   | Failed to connect DB instance           |
| `REPLICATION_STOP`  | Replication of DB instance is stopped          |
| `FAILOVER`          | When failover of a highly available DB instance is complete       |
| `SHUTDOWN`          | DB instance is stopped               |
| `DELETED`           | DB instance is deleted               |

### DB Instance Progress Status

| Status                       | Description            |
|----------------------------|--------------|
| `APPLYING_PARAMETER_GROUP` | Parameter group is being applied |
| `BACKING_UP`               | Backing up          |
| `CANCELING`                | Canceling          |
| `CREATING`                 | Creating          |
| `CREATING_SCHEMA`          | Creating a schema  |
| `CREATING_USER`            | Creating user      |
| `DELETING`                 | Deleting          |
| `DELETING_SCHEMA`          | Deleting a schema  |
| `DELETING_USER`            | Deleting user      |
| `EXPORTING_BACKUP`         | Exporting a backup   |
| `FAILING_OVER`             | Under failover      |
| `MIGRATING`                | Under migration       |
| `MODIFYING`                | Under modification           |
| `PREPARING`                | In preparation           |
| `PROMOTING`                | Promoting           |
| `REBUILDING`               | Rebuilding          |
| `REPAIRING`                | Recovering           |
| `REPLICATING`              | Replicating           |
| `RESTARTING`               | Restarting          |
| `RESTARTING_FORCIBLY`      | Force restarting       |
| `RESTORING`                | Restoring           |
| `STARTING`                 | Starting           |
| `STOPPING`                 | Stopping           |
| `SYNCING_SCHEMA`           | Synchronizing the schema   |
| `SYNCING_USER`             | Synchronizing user     |
| `UPDATING_USER`            | Modifying user      |

### List DB Instances

```http
GET /v1.0/db-instances
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.List | List DB instances |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbInstances | Body | Array | DB instances |
| dbInstances.dbInstanceId | Body | UUID | DB instance identifier |
| dbInstances.dbInstanceGroupId | Body | UUID | DB instance group identifier |
| dbInstances.dbInstanceName | Body | String | Name to identify DB instances |
| dbInstances.description | Body | String | Additional information on DB instances |
| dbInstances.dbVersion | Body | Enum | DB version information |
| dbInstances.dbPort | Body | Number | DB port |
| dbInstances.dbInstanceType | Body | Enum | DB instance role type<br/>- MASTER: `Master`<br/>- FAILED_MASTER: `Failed master`<br/>- CANDIDATE_MASTER: `Candidate master`<br/>- READ_ONLY_SLAVE: `Read replica` |
| dbInstances.dbInstanceStatus | Body | Enum | DB instance current status<br/>- BEFORE_CREATE: `Before creating (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Insufficient storage (red)`<br/>- FAIL_TO_CREATE: `Failed to create (red)`<br/>- FAIL_TO_CONNECT: `Failed to connect (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delayed (yellow)`<br/>- FAILOVER: `Failover complete (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
| dbInstances.progressStatus | Body | String | DB instance current progress status |
| dbInstances.createdYmdt | Body | DateTime | Created date and time |
| dbInstances.updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
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

### Create DB Instance

```http
POST /v1.0/db-instances
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Create | Create DB Instance |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceName | Body | String | O | Name to identify DB instances |
| dbInstanceCandidateName | Body | String | X | Name to identify the candidate master of the DB instance |
| description | Body | String | X | Additional information on DB instances |
| dbFlavorId | Body | UUID | O | Identifier of DB instance specifications |
| dbVersion | Body | Enum | O | DB version information |
| dbPort | Body | Number | O | DB port<br/>- Minimum value: 5432, Maximum value: 45432 |
| databaseName | Body | String | O | Database name |
| dbUserName | Body | String | O | DB user account name |
| dbPassword | Body | String | O | DB user account password |
| parameterGroupId | Body | UUID | O | Parameter group identifier |
| dbSecurityGroupIds | Body | Array | X | List of DB security group identifiers |
| userGroupIds | Body | Array | X | List of user group identifiers |
| useHighAvailability | Body | Boolean | X | Whether to use high availability<br/>- Default: `false` |
| useDefaultNotification | Body | Boolean | X | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Body | Boolean | X | Whether to enable deletion protection<br/>- Default: `false` |
| pingInterval | Body | Number | X | Ping interval (sec)<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| failoverReplWaitingTime | Body | Number | X | Failover replication delay waiting time (sec)<br/>- Minimum value: `-1` |
| network | Body | Object | O | Network information objects |
| network.subnetId | Body | UUID | O | Subnet identifier |
| network.usePublicAccess | Body | Boolean | X | External access is available or not<br/>- Default: `false` |
| network.availabilityZone | Body | Enum | X | Availability zone where DB instance will be created |
| storage | Body | Object | O | Storage information objects |
| storage.storageType | Body | Enum | O | Data storage type |
| storage.storageSize | Body | Number | O | Block storage size (GB)<br/>- Minimum value: `20` |
| backup | Body | Object | O | Backup information objects |
| backup.backupPeriod | Body | Number | O | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.backupSchedules | Body | Array | O | Backup schedule information |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | Backup start time |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | Backup window<br/>Auto backup is executed within the set duration from the backup start time.<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hours`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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
### Restore DB Instance from Backup in Object Storage

```http
POST /v1.0/db-instances/restore-from-obs
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.RestoreFromObs | Restore DB Instance from Backup in Object Storage |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceName | Body | String | X | Name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| dbInstanceCandidateName | Body | String | X | Candidate master name to identify the DB instance |
| description | Body | String | X | Additional information on DB instances<br/>- Maximum length: `100` |
| dbFlavorId | Body | UUID | O | Identifier of DB instance specifications |
| dbPort | Body | Number | X | DB port<br/>- Minimum value: 5432, Maximum value: 45432 |
| dbVersion | Body | Enum | O | DB engine type |
| useHighAvailability | Body | Boolean | X | Whether to use high availability<br/>- Default: `false` |
| imageId | Body | UUID | X | Image identifier |
| pingInterval | Body | Number | X | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| failoverReplWaitingTime | Body | Number | X | Failover replication delay waiting time (sec)<br/>- Minimum value: `-1` |
| storage | Body | Object | O | Storage information object |
| storage.storageType | Body | Enum | O | Storage type |
| storage.storageSize | Body | Number | O | Data storage size (GB)<br/>- Minimum value: `20` |
| network | Body | Object | O | Network information object |
| network.subnetId | Body | UUID | O | Subnet identifier |
| network.usePublicAccess | Body | Boolean | X | External access availability<br/>- Default: `false` |
| network.availabilityZone | Body | Enum | X | Availability zone where DB instance will be created |
| backup | Body | Object | O | Backup information object |
| backup.backupPeriod | Body | Number | O | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.replicationRegion | Body | Enum | X | Backup replication region<br/>- KR1: `Korea (Pangyo)`<br/>- KR2: `Korea (Pyeongchon)` |
| backup.backupSchedules | Body | Array | O | Backup schedule list |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | Backup start time |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |
| restore | Body | Object | O | Restoration information object |
| restore.tenantId | Body | String | O | Tenant ID of the object storage where the backup is stored |
| restore.username | Body | String | O | NHN Cloud account or IAM member ID |
| restore.password | Body | String | O | API password for the object storage where the backup is stored |
| restore.targetContainer | Body | String | O | Container of the object storage where the backup is stored |
| restore.objectPath | Body | String | O | Path of the backup stored in the container |
| useDefaultNotification | Body | Boolean | X | Whether to use default notifications<br/>- Default: `false` |
| parameterGroupId | Body | UUID | O | Parameter group identifier |
| dbSecurityGroupIds | Body | Array | X | List of DB security group identifiers |
| userGroupIds | Body | Array | X | List of user group identifiers |
| useDeletionProtection | Body | Boolean | X | Whether deletion protection is enabled<br/>- Default: `false` |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Delete DB Instance

```http
DELETE /v1.0/db-instances/{dbInstanceId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Delete | Delete DB Instance |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### List DB Instance Details

```http
GET /v1.0/db-instances/{dbInstanceId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | List DB Instance Details |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbInstanceId | Body | UUID | DB instance identifier |
| dbInstanceGroupId | Body | UUID | DB instance group identifier |
| dbInstanceName | Body | String | Name to identify DB instances |
| description | Body | String | Additional information on DB instances |
| dbVersion | Body | Enum | DB engine type |
| dbPort | Body | Number | DB port |
| dbInstanceType | Body | Enum | DB instance role type<br/>- MASTER: `Master`<br/>- FAILED_MASTER: `Failed master`<br/>- CANDIDATE_MASTER: `Candidate master`<br/>- READ_ONLY_SLAVE: `Read replica` |
| dbInstanceStatus | Body | Enum | DB instance current status<br/>- BEFORE_CREATE: `Before creation (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Storage full (red)`<br/>- FAIL_TO_CREATE: `Failed to create (red)`<br/>- FAIL_TO_CONNECT: `Failed to connect (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delayed (yellow)`<br/>- FAILOVER: `Failover completed (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
| progressStatus | Body | String | Current task status of DB instance |
| dbFlavorId | Body | UUID | Identifier of DB instance specifications |
| parameterGroupId | Body | UUID | Identifier of the parameter group applied to the DB instance |
| dbSecurityGroupIds | Body | Array | List of DB security group identifiers applied to the DB instance |
| notificationGroupIds | Body | Array | List of identifiers of notification groups applied to the DB instance |
| useDeletionProtection | Body | Boolean | Whether deletion protection is enabled for the DB instance |
| needToApplyParameterGroup | Body | Boolean | Whether the latest parameter group needs to be applied |
| needMigration | Body | Boolean | Whether migration is required |
| osVersion | Body | String | OS version |
| createdYmdt | Body | DateTime | Created date and time |
| updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
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

### Modify DB Instance

```http
PUT /v1.0/db-instances/{dbInstanceId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| dbInstanceName | Body | String | X | Name to identify DB instances |
| dbInstanceCandidateName | Body | String | X | Candidate master name to identify the DB instance |
| description | Body | String | X | Additional information on DB instances<br/>- Maximum length: `100` |
| dbPort | Body | Number | X | DB port<br/>- Minimum value: 5432, Maximum value: 45432 |
| dbFlavorId | Body | UUID | X | Identifier of DB instance specifications |
| parameterGroupId | Body | UUID | X | Parameter group identifier |
| dbVersion | Body | Enum | X | DB engine version code |
| dbSecurityGroupIds | Body | Array | X | List of DB security group identifiers |
| executeBackup | Body | Boolean | X | Whether to execute backup at this time<br/>- Default: `false` |
| useOnlineFailover | Body | Boolean | X | Whether to restart using failover<br/>- Default: `false` |
| waitReplicationDelay | Body | Boolean | X | Whether to wait for replication delay to resolve<br/>- Default: `false` |
| useReadOnly | Body | Boolean | X | Whether to block write workloads<br/>- Default: `false` |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Apply Latest Parameter Group to DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/apply-recent-parameter-group
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Apply Latest Parameter Group to DB Instance |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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
### Get selectable DB versions in the current DB instance

```http
GET /v1.0/db-instances/{dbInstanceId}/available-db-versions
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get selectable DB versions in the current DB instance |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| availableDbVersions | Body | Array | DB version information |
| availableDbVersions.dbVersionCode | Body | Enum | DB version code<br/>- MYSQL_V5633<br/>- MYSQL_V5715<br/>- MYSQL_V5719<br/>- MYSQL_V5726<br/>- MYSQL_V5731<br/>- MYSQL_V5733<br/>- MYSQL_V5737<br/>- MYSQL_V8018<br/>- MYSQL_V8023<br/>- MYSQL_V8028<br/>- MYSQL_V8032<br/>- MYSQL_V8033<br/>- MYSQL_V8034<br/>- MYSQL_V8035<br/>- MYSQL_V8036<br/>- MYSQL_V8040<br/>- MYSQL_V8041<br/>- MYSQL_V8042<br/>- MYSQL_V8043<br/>- MYSQL_V8044<br/>- MYSQL_V8045<br/>- MYSQL_V8405<br/>- MYSQL_V8406<br/>- MYSQL_V8407<br/>- MYSQL_V8408<br/>- MYSQL_V8409<br/>- MARIADB_V10330<br/>- MARIADB_V10611<br/>- MARIADB_V10612<br/>- MARIADB_V10616<br/>- MARIADB_V10622<br/>- MARIADB_V10625<br/>- MARIADB_V101107<br/>- MARIADB_V101108<br/>- MARIADB_V101113<br/>- MARIADB_V101116<br/>- MARIADB_V11407<br/>- MARIADB_V11410<br/>- MARIADB_V11806<br/>- POSTGRESQL_V14_6<br/>- POSTGRESQL_V14_15<br/>- POSTGRESQL_V14_17<br/>- POSTGRESQL_V14_19<br/>- POSTGRESQL_V17_2<br/>- POSTGRESQL_V17_4<br/>- POSTGRESQL_V17_6 |
| availableDbVersions.dbMajorVersionCode | Body | Enum | DB major version code<br/>- MYSQL_V56<br/>- MYSQL_V57<br/>- MYSQL_V80<br/>- MYSQL_V84<br/>- MARIADB_V103<br/>- MARIADB_V106<br/>- MARIADB_V1011<br/>- MARIADB_V114<br/>- MARIADB_V118<br/>- POSTGRES_V14<br/>- POSTGRES_V17 |
| availableDbVersions.name | Body | String | DB version name |
| availableDbVersions.canCreate | Body | Boolean | Whether creation is available |

<details><summary>Example</summary>
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

### Backup DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/backup
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Backup | Backup DB Instance |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| backupName | Body | String | O | Name to identify backups |

<details><summary>Example</summary>
<p>

```json
{
    "backupName": "backupName-example"
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Get DB Instance Backup Information

```http
GET /v1.0/db-instances/{dbInstanceId}/backup-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB Instance Backup Information |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| allowAutoBackup | Body | Boolean | Whether automatic backup is allowed |
| usePeriodicAutoBackup | Body | Boolean | Whether scheduled automatic backup is used |
| backupPeriod | Body | Number | Backup retention period (days) |
| backupRetryCount | Body | Number | Number of backup retries |
| backupSchedules | Body | Array | Backup schedules |
| backupSchedules.backupWndBgnTime | Body | Time | Backup start time |
| backupSchedules.backupWndDuration | Body | Enum | Backup Window<br/>Auto backup is executed within the set duration from the backup start time.<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hour`<br/>- TWO_HOURS: `2 hour`<br/>- TWO_HOURS_AND_HALF: `2.5 hour`<br/>- THREE_HOURS: `3 hour` |

<details><summary>Example</summary>
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

### Modify DB Instance Backup Information

```http
PUT /v1.0/db-instances/{dbInstanceId}/backup-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance Backup Information |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| allowAutoBackup | Body | Boolean | X | Whether automatic backup is allowed |
| usePeriodicAutoBackup | Body | Boolean | X | Whether scheduled automatic backup is used |
| backupPeriod | Body | Number | X | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backupSchedules | Body | Array | X | Backup schedules |
| backupSchedules.backupWndBgnTime | Body | Time | O | Backup start time |
| backupSchedules.backupWndDuration | Body | Enum | O | Backup Window<br/>Auto backup is executed within the set duration from the backup start time.<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hour`<br/>- TWO_HOURS: `2 hour`<br/>- TWO_HOURS_AND_HALF: `2.5 hour`<br/>- THREE_HOURS: `3 hour` |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Export after Backing up DB Instance to Object Storage

```http
POST /v1.0/db-instances/{dbInstanceId}/backup-to-object-storage
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.BackupToObjectStorage | Export after Backing up DB Instance to Object Storage |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| tenantId | Body | String | O | Tenant ID of object storage to store backup<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | Body | String | O | ID of NHN Cloud Account or IAM Account |
| password | Body | String | O | API password for object storage where backup is stored |
| targetContainer | Body | String | O | Object storage container where backup is stored |
| objectPath | Body | String | O | Backup path to be stored in container |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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
### View the list of databases

```http
GET /v1.0/db-instances/{dbInstanceId}/databases
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.List | View the list of databases |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| databases | Body | Array | Database information |
| databases.databaseId | Body | UUID | Database identifier |
| databases.databaseName | Body | String | Database name |
| databases.databaseStatus | Body | Enum | Current state of the database<br/>- STABLE: `Available`<br/>- CREATING: `Creating`<br/>- MODIFYING: `Modifying`<br/>- DELETING: `Deleting`<br/>- DELETED: `Deleted`<br/>- SYNCING: `Synchronizing`<br/>- DELETE_ERROR: `Deletion failed` |
| databases.createdYmdt | Body | DateTime | Created date and time |
| databases.updatedYmdt | Body | DateTime | Modified date and time |
| databases.schemas | Body | Array | Schema information |
| databases.schemas.schemaName | Body | String | Schema name |
| databases.errorReason | Body | String | Reason for deletion failure |

<details><summary>Example</summary>
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

### Create a database

```http
POST /v1.0/db-instances/{dbInstanceId}/databases
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Create | Create a database |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| databaseName | Body | String | O | Database name |

<details><summary>Example</summary>
<p>

```json
{
    "databaseName": "databaseName-example"
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of the requested task |

<details><summary>Example</summary>
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

### Delete a database

```http
DELETE /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Delete | Delete a database |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| databaseId | URL | UUID | O | Database identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of the requested task |

<details><summary>Example</summary>
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

### Modify a database

```http
PUT /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Modify | Modify a database |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| databaseId | URL | UUID | O | Database identifier |
| applyHbaRulesImmediately | Body | Boolean | X | Whether to apply associated access control rules immediately<br/>- Default: `false` |
| databaseName | Body | String | O | Database name |

<details><summary>Example</summary>
<p>

```json
{
    "applyHbaRulesImmediately": false,
    "databaseName": "databaseName-example"
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of the requested task |

<details><summary>Example</summary>
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
### View the list of users

```http
GET /v1.0/db-instances/{dbInstanceId}/db-users
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.List | View the list of users |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbUsers | Body | Array | DB user list |
| dbUsers.dbUserId | Body | UUID | DB user identifier |
| dbUsers.dbUserName | Body | String | DB user account name |
| dbUsers.authorityType | Body | Enum | DB user permission types<br/>- CUSTOM: `Custom permission`<br/>- READ: `READ permission (read-only permission)`<br/>- CRUD: `CRUD permission (includes read permission)`<br/>- DDL: `DDL permission (includes CRUD permission)` |
| dbUsers.dbUserStatus | Body | Enum | DB user current status<br/>- STABLE: `Available`<br/>- CREATING: `Creating`<br/>- MODIFYING: `Modifying`<br/>- DELETING: `Deleting`<br/>- DELETED: `Deleted`<br/>- SYNCING: `Synchronizing`<br/>- DELETE_ERROR: `Deletion failed` |
| dbUsers.createdYmdt | Body | DateTime | Created date and time |
| dbUsers.updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
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

### Create a user

```http
POST /v1.0/db-instances/{dbInstanceId}/db-users
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Create | Create a user |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| dbUserName | Body | String | O | DB user account name |
| dbPassword | Body | String | O | DB user account password |
| authorityType | Body | Enum | O | DB user permission types<br/>- CUSTOM: `Custom permission`<br/>- READ: `Read permission`<br/>- CRUD: `CRUD permission`<br/>- DDL: `DDL permission` |
| createDefaultHbaRules | Body | Boolean | X | Whether to create default access control rules<br/>- Default: `false` |
| address | Body | String | X | Connection address |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Delete a user

```http
DELETE /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Delete | Delete a user |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| dbUserId | URL | UUID | O | DB user identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Edit a user

```http
PUT /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Modify | Edit a user |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| dbUserId | URL | UUID | O | DB user identifier |
| dbUserName | Body | String | X | DB user account name |
| dbPassword | Body | String | X | DB user account password |
| authorityType | Body | Enum | X | DB user permission<br/>- CUSTOM: `Custom permission`<br/>- READ: `Read permission`<br/>- CRUD: `CRUD permission`<br/>- DDL: `DDL permission` |
| applyHbaRulesImmediately | Body | Boolean | X | Whether to apply access control changes immediately<br/>- Default: `false` |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Change DB Instance Deletion Protection Settings

```http
PUT /v1.0/db-instances/{dbInstanceId}/deletion-protection
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Change DB instance deletion protection settings |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| useDeletionProtection | Body | Boolean | O | Whether to enable deletion protection |

<details><summary>Example</summary>
<p>

```json
{
    "useDeletionProtection": false
}
```

</p>
</details>

#### Response

This API does not return a response body.

---

### Force Restart DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/force-restart
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.ForceRestart | Force Restart DB Instance |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

This API does not return a response body.

---
### View a list of access control rules

```http
GET /v1.0/db-instances/{dbInstanceId}/hba-rules
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.List | View a list of access control rules |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| hbaRules | Body | Array | List of access control rules |
| hbaRules.hbaRuleId | Body | UUID | Identifier of the access control rule |
| hbaRules.hbaRuleStatus | Body | Enum | Current status of the access control rule<br/>- CREATED: `Created`<br/>- APPLIED: `Applied`<br/>- CREATING: `Creating`<br/>- MODIFYING: `Modifying`<br/>- DELETING: `Deleting`<br/>- DELETED: `Deleted` |
| hbaRules.databaseApplyType | Body | Enum | Database apply type<br/>- ENTIRE: `All`<br/>- USER_CUSTOM: `Customize` |
| hbaRules.dbUserApplyTypeCode | Body | Enum | DB user apply type<br/>- ENTIRE: `All`<br/>- USER_CUSTOM: `Customize` |
| hbaRules.databases | Body | Array | List of custom databases |
| hbaRules.databases.databaseId | Body | UUID | Database identifier |
| hbaRules.databases.databaseName | Body | String | Database name |
| hbaRules.dbUsers | Body | Array | Custom DB user list |
| hbaRules.dbUsers.dbUserId | Body | UUID | DB user identifier |
| hbaRules.dbUsers.dbUserName | Body | String | DB user account name |
| hbaRules.address | Body | String | Connection address |
| hbaRules.authMethod | Body | Enum | Authentication method<br/>- TRUST: `Trust (no password required)`<br/>- REJECT: `Block access`<br/>- SCRAM_SHA_256: `Password (SCRAM-SHA-256)` |
| hbaRules.reservedAction | Body | Enum | Scheduled task<br/>- NONE: `None`<br/>- CREATE: `Schedule a creation (requires application)`<br/>- MODIFY: `Schedule a modification (requires application)`<br/>- DELETE: `Schedule a deletion (requires application)` |
| hbaRules.order | Body | Number | Application order |
| hbaRules.applicable | Body | Boolean | Whether the rule is applicable |
| needToApply | Body | Boolean | Whether changes need to be applied |

<details><summary>Example</summary>
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

### Add an access control rule

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Create | Add an access control rule to a DB instance |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| connectionTypeCode | Body | Enum | X | Access control record type<br/>- HOST: `Valid for TCP/IP connections`<br/>- HOST_NO_SSL: `Valid only for connections without SSL encryption` |
| databaseApplyType | Body | Enum | O | Database apply type<br/>- ENTIRE: `All`<br/>- USER_CUSTOM: `Customize` |
| dbUserApplyType | Body | Enum | O | DB user apply type<br/>- ENTIRE: `All`<br/>- USER_CUSTOM: `Customize` |
| databaseIds | Body | Array | X | List of database identifiers |
| dbUserIds | Body | Array | X | List of DB user identifiers |
| address | Body | String | O | Connection address |
| authMethod | Body | Enum | O | Authentication method<br/>- TRUST: `Trust (no password required)`<br/>- REJECT: `Block access`<br/>- SCRAM_SHA_256: `Password (SCRAM-SHA-256)` |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| hbaRuleId | Body | UUID | Identifier of the access control rule |

<details><summary>Example</summary>
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

### Apply access control rules

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules/apply
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of the requested task |

<details><summary>Example</summary>
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

### Reorder access control rules

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/orders
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Modify | Modify access control rules in a DB instance |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| hbaRuleIds | Body | Array | O | Sorted list of access control rule identifiers (saved in the order requested) |

<details><summary>Example</summary>
<p>

```json
{
    "hbaRuleIds": []
}
```

</p>
</details>

#### Response

This API does not return a response body.

---

### Delete an access control rule

```http
DELETE /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Delete | Delete an access control rule from a DB instance |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| hbaRuleId | URL | UUID | O | Identifier of the access control rule |

#### Response

This API does not return a response body.

---

### Modify an access control rule

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Modify | Modify access control rules in a DB instance |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| hbaRuleId | URL | UUID | O | Identifier of the access control rule |
| connectionTypeCode | Body | Enum | X | Access control record type<br/>- HOST: `Valid for TCP/IP connections`<br/>- HOST_NO_SSL: `Valid only for connections without SSL encryption` |
| databaseApplyType | Body | Enum | O | Database apply type<br/>- ENTIRE: `All`<br/>- USER_CUSTOM: `Customize` |
| dbUserApplyType | Body | Enum | O | DB user apply type<br/>- ENTIRE: `All`<br/>- USER_CUSTOM: `Customize` |
| databaseIds | Body | Array | X | List of database identifiers |
| dbUserIds | Body | Array | X | List of DB user identifiers |
| address | Body | String | O | Connection address |
| authMethod | Body | Enum | O | Authentication method<br/>- TRUST: `Trust (no password required)`<br/>- REJECT: `Block access`<br/>- SCRAM_SHA_256: `Password (SCRAM-SHA-256)` |

<details><summary>Example</summary>
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

#### Response

This API does not return a response body.

---
### Get high availability information

```http
GET /v1.0/db-instances/{dbInstanceId}/high-availability
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Get | Get high availability information |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| haStatus | Body | Enum | High availability status<br/>- CREATED: `Created`<br/>- STABLE: `Normal`<br/>- PAUSING: `Pausing`<br/>- DISABLE: `Stopped`<br/>- DISABLE_MASTER_IN_REPLICATION: `High availability stopped due to abnormal master replication detected`<br/>- DISABLE_MHA_PROCESS: `High availability process stopped`<br/>- DISABLE_REPLICATION_STOP: `High availability stopped due to replication stop`<br/>- DISABLE_REPLICATION_DELAY: `High availability stopped due to replication delay`<br/>- FAILOVER_STARTED: `Failover started`<br/>- FAILOVER_FAILED: `Failover failed`<br/>- FAILOVER_COMPLETED: `Failover completed`<br/>- DELETED: `Deleted`<br/>- PAUSED: `Paused`<br/>- PAUSED_DUE_TO_TASK: `Paused due to task`<br/>- MASTER_FAILURE_DETECTION: `Master failure detected` |
| pingInterval | Body | Number | Ping interval (sec) when using high availability |
| failoverReplWaitingTime | Body | Number | Failover replication delay waiting time (sec) when using high availability |

<details><summary>Example</summary>
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

### Modify High Availability

```http
PUT /v1.0/db-instances/{dbInstanceId}/high-availability
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Modify | Modify High Availability |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| useHighAvailability | Body | Boolean | O | Whether to use high availability |
| pingInterval | Body | Number | X | Ping interval (sec)<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| failoverReplWaitingTime | Body | Number | X | Failover replication delay waiting time (sec)<br/>- Minimum value: `-1` |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Pause High Availability

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Pause | Pause High Availability |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Recover High Availability

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Repair | Recover High Availability |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Restart High Availability

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Resume | Restart High Availability |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Separate High Availability

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/split
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Split | Separate High Availability |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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
### Get DB instance maintenance information

```http
GET /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB instance maintenance information |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| allowAutoMaintenance | Body | Boolean | Whether to allow automatic maintenance |
| useAutoStorageCleanup | Body | Boolean | Whether to enable automatic storage cleanup |
| maintWndBgnTime | Body | Time | Automatic maintenance start time |
| maintWndDuration | Body | Enum | Maintenance window<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |
| logRetentionPeriod | Body | Number | Log retention period (days) |

<details><summary>Example</summary>
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

### Modify DB instance maintenance information

```http
PUT /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB instance maintenance information |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| allowAutoMaintenance | Body | Boolean | X | Whether to allow automatic maintenance |
| useAutoStorageCleanup | Body | Boolean | X | Whether to enable automatic storage cleanup |
| maintWndBgnTime | Body | Time | X | Automatic maintenance start time |
| maintWndDuration | Body | Enum | X | Maintenance window<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |
| logRetentionPeriod | Body | Number | X | Log retention period (days)<br/>- Minimum: `1`<br/>- Maximum: `30` |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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
### Get DB instance network information

```http
GET /v1.0/db-instances/{dbInstanceId}/network-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB instance network information |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| availabilityZone | Body | Enum | Availability zone where DB instance will be created |
| subnet | Body | Object | Subnet object |
| subnet.subnetId | Body | UUID | Subnet identifier |
| subnet.subnetName | Body | String | Name to identify subnets |
| subnet.subnetCidr | Body | String | CIDR of subnet |
| subnet.publicAccessible | Body | Boolean | External access is available or not |
| endPoints | Body | Array | List of access information |
| endPoints.domain | Body | String | Domain |
| endPoints.ipAddress | Body | String | IP address |
| endPoints.endPointType | Body | String | Types of access information |

<details><summary>Example</summary>
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

### Modify DB instance network information

```http
PUT /v1.0/db-instances/{dbInstanceId}/network-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB instance network information |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| usePublicAccess | Body | Boolean | O | External access is available or not |

<details><summary>Example</summary>
<p>

```json
{
    "usePublicAccess": false
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Promote DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/promote
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Promote | Promote DB Instance |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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
### Create Read Replica

```http
POST /v1.0/db-instances/{dbInstanceId}/replicate
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Replicate | Create read replica |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| dbInstanceName | Body | String | O | Name to identify the DB instance |
| description | Body | String | X | Additional information on the DB instance |
| dbFlavorId | Body | UUID | X | Identifier of DB instance specifications |
| dbPort | Body | Number | X | DB port<br/>- Minimum value: 5432, Maximum value: 45432 |
| parameterGroupId | Body | UUID | X | Parameter group identifier |
| dbSecurityGroupIds | Body | Array | X | List of DB security group identifiers |
| userGroupIds | Body | Array | X | List of user group identifiers |
| useDefaultNotification | Body | Boolean | X | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Body | Boolean | X | Whether deletion protection is enabled<br/>- Default: `false` |
| network | Body | Object | X | Network information object |
| network.usePublicAccess | Body | Boolean | X | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Body | Enum | X | Availability zone where the DB instance will be created |
| storage | Body | Object | X | Storage information object |
| storage.storageType | Body | Enum | X | Data storage type |
| storage.storageSize | Body | Number | X | Data storage size (GB)<br/>- Minimum value: `20`<br/>- Maximum value: `2048` |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of the requested task |

<details><summary>Example</summary>
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

### Restart DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/restart
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Restart | Restart DB Instance |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of the requested task |

<details><summary>Example</summary>
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

### Get DB Instance Restore Information

```http
GET /v1.0/db-instances/{dbInstanceId}/restoration-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB instance restore information |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| oldestRestorableYmdt | Body | DateTime | Oldest restorable time |
| latestRestorableYmdt | Body | DateTime | Most recent restorable time |
| restorableBackups | Body | Array | List of restorable backups |
| restorableBackups.backupId | Body | UUID | Backup identifier |
| restorableBackups.backupName | Body | String | Backup name |
| restorableBackups.backupStatus | Body | Enum | Backup status<br/>- BACKING_UP: `Backing up (spinner)`<br/>- VERIFYING: `Verifying (spinner)`<br/>- COMPLETED: `Available (green icon)`<br/>- DELETING: `Deleting (spinner)`<br/>- DELETED: `Deleted (gray icon)`<br/>- ERROR: `Error (red icon)` |
| restorableBackups.dbInstanceId | Body | UUID | Original DB instance identifier |
| restorableBackups.dbInstanceName | Body | String | Original DB instance name |
| restorableBackups.dbVersion | Body | Enum | DB engine type |
| restorableBackups.backupType | Body | Enum | Backup type<br/>- AUTO<br/>- MANUAL |
| restorableBackups.backupSize | Body | Number | Backup size |
| restorableBackups.failoverCount | Body | Number | Number of failovers |
| restorableBackups.walFileName | Body | String | WAL file name |
| restorableBackups.createdYmdt | Body | DateTime | Backup creation date and time |
| restorableBackups.updatedYmdt | Body | DateTime | Backup update date and time |
| restorableBackups.startYmdt | Body | DateTime | Backup start date and time |
| restorableBackups.completedYmdt | Body | DateTime | Backup completion date and time |

<details><summary>Example</summary>
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

### Restore DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/restore
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Restore | Restore DB Instance |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| dbInstanceName | Body | String | X | Name to identify the DB instance |
| dbInstanceCandidateName | Body | String | X | Candidate master name to identify the DB instance |
| description | Body | String | X | Additional information on the DB instance<br/>- Maximum length: `100` |
| dbFlavorId | Body | UUID | O | Identifier of DB instance specifications |
| dbPort | Body | Number | X | DB port<br/>- Minimum value: 5432, Maximum value: 45432 |
| useHighAvailability | Body | Boolean | X | Whether to use high availability<br/>- Default: `false` |
| imageId | Body | UUID | X | Image identifier |
| pingInterval | Body | Number | X | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| failoverReplWaitingTime | Body | Number | X | Failover replication delay wait time (sec)<br/>- Minimum value: `-1` |
| storage | Body | Object | O | Storage information object |
| storage.storageType | Body | Enum | O | Storage type |
| storage.storageSize | Body | Number | O | Data storage size (GB)<br/>- Minimum value: `20` |
| network | Body | Object | O | Network information object |
| network.subnetId | Body | UUID | O | Subnet identifier |
| network.usePublicAccess | Body | Boolean | X | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Body | Enum | X | Availability zone where the DB instance will be created |
| backup | Body | Object | O | Backup information object |
| backup.backupPeriod | Body | Number | O | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.replicationRegion | Body | Enum | X | Backup replication region<br/>- KR1: `Korea (Pangyo)`<br/>- KR2: `Korea (Pyeongchon)` |
| backup.backupSchedules | Body | Array | O | Backup schedule list |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | Backup start time |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |
| restore | Body | Object | O | Restoration information object |
| restore.restoreType | Body | Enum | O | Restoration type<br/>- BACKUP: `Restoration using a previously created backup`<br/>- TIMESTAMP: `Point-in-time recovery using a time within the restorable period` |
| restore.restoreYmdt | Body | DateTime | X | DB instance restore date and time |
| restore.backupId | Body | UUID | X | Identifier of the backup to use for restoration |
| useDefaultNotification | Body | Boolean | X | Whether to use default notification<br/>- Default: `false` |
| parameterGroupId | Body | UUID | O | Parameter group identifier |
| dbSecurityGroupIds | Body | Array | X | List of DB security group identifiers |
| userGroupIds | Body | Array | X | List of user group identifiers |
| useDeletionProtection | Body | Boolean | X | Whether deletion protection is enabled<br/>- Default: `false` |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of the requested task |

<details><summary>Example</summary>
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
### Start DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/start
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Start | Start DB Instance |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Stop DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/stop
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Stop | Stop DB Instance |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Get DB Instance Storage Information

```http
GET /v1.0/db-instances/{dbInstanceId}/storage-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB Instance Storage Information |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| storageType | Body | Enum | Data storage types |
| storageSize | Body | Number | Data storage size (GB) |
| storageStatus | Body | Enum | Data storage current status<br/>- DELETED: `Deleted`<br/>- PENDING_DELETION: `Deletion deferred`<br/>- DELETION_RESERVED: `Deletion reserved (pending snapshot cleanup)`<br/>- DETACHED: `Detached`<br/>- ATTACHED: `Attached` |

<details><summary>Example</summary>
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

### Modify DB Instance Storage Information

```http
PUT /v1.0/db-instances/{dbInstanceId}/storage-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance Storage Information |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| storageSize | Body | Number | O | Data storage size (GB)<br/>- Maximum value: `2048` |

<details><summary>Example</summary>
<p>

```json
{
    "storageSize": 1
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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
## Backup

### Backup Status

| Status         | Description                  |
|--------------|------------------------------|
| `BACKING_UP` | Backup in progress           |
| `COMPLETED`  | Backup completed             |
| `DELETING`   | Backup being deleted         |
| `DELETED`    | Backup deleted               |
| `ERROR`      | Error occurred               |

### Retrieve Backup List

```http
GET /v1.0/backups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Backup.List | Retrieve Backup List |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| totalCounts | Body | Number | Number of all backup lists |
| backups | Body | Array | Backup list |
| backups.backupId | Body | UUID | Backup identifier |
| backups.backupName | Body | String | Name to identify backups |
| backups.backupStatus | Body | Enum | Backup current status<br/>- BACKING_UP: `Backup in progress (spinner)`<br/>- VERIFYING: `Verifying (spinner)`<br/>- COMPLETED: `Available (green icon)`<br/>- DELETING: `Deleting (spinner)`<br/>- DELETED: `Deleted (gray icon)`<br/>- ERROR: `Error (red icon)` |
| backups.dbInstanceId | Body | UUID | Original DB instance identifier |
| backups.dbVersion | Body | Enum | DB engine version |
| backups.backupType | Body | Enum | Backup type<br/>- AUTO<br/>- MANUAL |
| backups.backupSize | Body | Number | Size of the backup (Bytes) |
| backups.startYmdt | Body | DateTime | Start date and time |
| backups.createdYmdt | Body | DateTime | Created date and time |
| backups.updatedYmdt | Body | DateTime | Modified date and time |
| backups.completedYmdt | Body | DateTime | End date and time |

<details><summary>Example</summary>
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

### Delete Backup

```http
DELETE /v1.0/backups/{backupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Backup.Delete | Delete Backup |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O | Backup identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Export Backup to Object Storage

```http
POST /v1.0/backups/{backupId}/export
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Backup.Export | Export Backup to Object Storage |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O | Backup identifier |
| tenantId | Body | String | O | Tenant ID of object storage where backup will be stored<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | Body | String | O | NHN Cloud account or IAM member ID |
| password | Body | String | O | API password for object storage where backup will be stored |
| targetContainer | Body | String | O | Object storage container where backup will be stored |
| objectPath | Body | String | O | Path of the backup to be stored in the container |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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

### Restore Backup

```http
POST /v1.0/backups/{backupId}/restore
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Backup.Restore | Restore Backup |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O | Backup identifier |
| dbInstanceName | Body | String | O | Name to identify DB instances |
| dbInstanceCandidateName | Body | String | X | Candidate master name to identify the DB instance |
| description | Body | String | X | Additional information on DB instances |
| dbFlavorId | Body | UUID | O | Identifier of DB instance specifications |
| dbPort | Body | Number | O | DB port<br/>- Minimum value: 5432, Maximum value: 45432 |
| parameterGroupId | Body | UUID | O | Parameter group identifier |
| dbSecurityGroupIds | Body | Array | X | List of DB security group identifiers |
| userGroupIds | Body | Array | X | List of user group identifiers |
| useHighAvailability | Body | Boolean | X | Whether to use high availability<br/>- Default: `false` |
| useDefaultNotification | Body | Boolean | X | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Body | Boolean | X | Whether to use deletion protection<br/>- Default: `false` |
| pingInterval | Body | Number | X | Ping interval (seconds)<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| failoverReplWaitingTime | Body | Number | X | Failover replication delay waiting time (seconds)<br/>- Minimum value: `-1` |
| network | Body | Object | O | Network information objects |
| network.subnetId | Body | UUID | O | Subnet identifier |
| network.usePublicAccess | Body | Boolean | X | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Body | Enum | X | Availability zone where DB instance will be created |
| storage | Body | Object | O | Storage information objects |
| storage.storageType | Body | Enum | O | Storage type |
| storage.storageSize | Body | Number | O | Data storage size (GB)<br/>- Minimum value: `20` |
| backup | Body | Object | O | Backup information objects |
| backup.backupPeriod | Body | Number | O | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.backupSchedules | Body | Array | O | Backup schedules |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | Backup start time |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hours`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
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
## DB Security Group

### DB Security Group Progress Status

| Status          | Description                  |
|-----------------|------------------------------|
| `NONE`          | No work in progress          |
| `CREATING_RULE` | Creating rule policy         |
| `UPDATING_RULE` | Modifying rule policy        |
| `DELETING_RULE` | Deleting rule policy         |

### List DB Security Groups

```http
GET /v1.0/db-security-groups
```

#### Required permissions

| Permission Name                       | Description             |
|---------------------------------------|-------------------------|
| RDSforPostgreSQL:DbSecurityGroup.List | List DB Security Groups |

#### Request

This API does not require a request body.

#### Response

| Name                                   | Type | Format   | Description                                                                                                                                                                                                                                                         |
|----------------------------------------|------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroups                       | Body | Array    | DB security groups                                                                                                                                                                                                                                                  |
| dbSecurityGroups.dbSecurityGroupId     | Body | UUID     | DB security group identifier                                                                                                                                                                                                                                        |
| dbSecurityGroups.dbSecurityGroupName   | Body | String   | Name to identify the DB security group                                                                                                                                                                                                                              |
| dbSecurityGroups.dbSecurityGroupStatus | Body | Enum     | Current status of the DB security group<br/>- CREATED: `Created`<br/>- DELETED: `Deleted`                                                                                                                                                                          |
| dbSecurityGroups.description           | Body | String   | Additional information on the DB security group                                                                                                                                                                                                                     |
| dbSecurityGroups.progressStatus        | Body | Enum     | Current progress status of the DB security group<br/>- NONE: `No work in progress`<br/>- CREATING_RULE: `Creating rule policy`<br/>- UPDATING_RULE: `Modifying rule policy`<br/>- DELETING_RULE: `Deleting rule policy`<br/>- APPLYING_DEFAULT_RULE: `Applying default rule` |
| dbSecurityGroups.createdYmdt           | Body | DateTime | Created date and time                                                                                                                                                                                                                                               |
| dbSecurityGroups.updatedYmdt           | Body | DateTime | Modified date and time                                                                                                                                                                                                                                              |

<details><summary>Example</summary>
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

### Create DB Security Group

```http
POST /v1.0/db-security-groups
```

#### Required permissions

| Permission Name                         | Description              |
|-----------------------------------------|--------------------------|
| RDSforPostgreSQL:DbSecurityGroup.Create | Create DB Security Group |

#### Request

| Name                | Type | Format | Required | Description                                                                                                                                                                                                                                                                                                                              |
|---------------------|------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupName | Body | String | O        | Name to identify the DB security group                                                                                                                                                                                                                                                                                                   |
| description         | Body | String | X        | Additional information on the DB security group                                                                                                                                                                                                                                                                                          |
| rules               | Body | Array  | O        | DB security group rule information                                                                                                                                                                                                                                                                                                       |
| rules.direction     | Body | Enum   | O        | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound`                                                                                                                                                                                                                                                               |
| rules.etherType     | Body | Enum   | O        | Ether type<br/>- IPV4: `IPv4`<br/>- IPV6: `IPv6`                                                                                                                                                                                                                                                                                        |
| rules.port          | Body | Object | O        | Port object                                                                                                                                                                                                                                                                                                                              |
| rules.port.portType | Body | Enum   | O        | Port type<br/>- ALL: `All port ranges (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB listening port`<br/>- PORT_RANGE: `Port range`                                                                                                                                                                      |
| rules.port.minPort  | Body | Number | X        | Minimum port range<br/>- Minimum value: `1`                                                                                                                                                                                                                                                                                              |
| rules.port.maxPort  | Body | Number | X        | Maximum port range<br/>- Maximum value: `65535`                                                                                                                                                                                                                                                                                          |
| rules.cidr          | Body | String | O        | CIDR                                                                                                                                                                                                                                                                                                                                     |
| rules.description   | Body | String | X        | Additional information on the DB security group rule                                                                                                                                                                                                                                                                                     |

<details><summary>Example</summary>
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

#### Response

| Name              | Type | Format | Description                  |
|-------------------|------|--------|------------------------------|
| dbSecurityGroupId | Body | UUID   | DB security group identifier |

<details><summary>Example</summary>
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

### Delete DB Security Group

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### Required permissions

| Permission Name                         | Description              |
|-----------------------------------------|--------------------------|
| RDSforPostgreSQL:DbSecurityGroup.Delete | Delete DB Security Group |

#### Request

This API does not require a request body.

| Name              | Type | Format | Required | Description |
|-------------------|------|--------|----------|-------------|
| dbSecurityGroupId | URL  | UUID   | O        |             |

#### Response

This API does not return a response body.

---

### List DB Security Group Details

```http
GET /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### Required permissions

| Permission Name                      | Description                    |
|--------------------------------------|--------------------------------|
| RDSforPostgreSQL:DbSecurityGroup.Get | List DB Security Group Details |

#### Request

This API does not require a request body.

| Name              | Type | Format | Required | Description                  |
|-------------------|------|--------|----------|------------------------------|
| dbSecurityGroupId | URL  | UUID   | O        |                              |

#### Response

| Name                          | Type | Format   | Description                                                                                                                                                                                                                                                              |
|-------------------------------|------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroup               | Body | Object   | DB security group                                                                                                                                                                                                                                                        |
| dbSecurityGroup.dbSecurityGroupId     | Body | UUID     | DB security group identifier                                                                                                                                                                                                                                             |
| dbSecurityGroup.dbSecurityGroupName   | Body | String   | Name to identify the DB security group                                                                                                                                                                                                                                   |
| dbSecurityGroup.dbSecurityGroupStatus | Body | Enum     | Current status of the DB security group<br/>- CREATED: `Created`<br/>- DELETED: `Deleted`                                                                                                                                                                               |
| dbSecurityGroup.description           | Body | String   | Additional information on the DB security group                                                                                                                                                                                                                          |
| dbSecurityGroup.progressStatus        | Body | Enum     | Current progress status of the DB security group<br/>- NONE: `No work in progress`<br/>- CREATING_RULE: `Creating rule policy`<br/>- UPDATING_RULE: `Modifying rule policy`<br/>- DELETING_RULE: `Deleting rule policy`<br/>- APPLYING_DEFAULT_RULE: `Applying default rule` |
| dbSecurityGroup.rules                 | Body | Array    | DB security group rule list                                                                                                                                                                                                                                              |
| dbSecurityGroup.rules.ruleId          | Body | UUID     | DB security group rule identifier                                                                                                                                                                                                                                        |
| dbSecurityGroup.rules.description     | Body | String   | Additional information on the DB security group rule                                                                                                                                                                                                                     |
| dbSecurityGroup.rules.direction       | Body | Enum     | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound`                                                                                                                                                                                               |
| dbSecurityGroup.rules.etherType       | Body | Enum     | Ether type<br/>- IPV4: `IPv4`<br/>- IPV6: `IPv6`                                                                                                                                                                                                                        |
| dbSecurityGroup.rules.port            | Body | Object   | Port object                                                                                                                                                                                                                                                              |
| dbSecurityGroup.rules.port.portType   | Body | Enum     | Port type<br/>- ALL: `All port ranges (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB listening port`<br/>- PORT_RANGE: `Port range`                                                                                                      |
| dbSecurityGroup.rules.port.minPort    | Body | Number   | Minimum port range                                                                                                                                                                                                                                                       |
| dbSecurityGroup.rules.port.maxPort    | Body | Number   | Maximum port range                                                                                                                                                                                                                                                       |
| dbSecurityGroup.rules.cidr            | Body | String   | CIDR                                                                                                                                                                                                                                                                     |
| dbSecurityGroup.rules.createdYmdt     | Body | DateTime | Created date and time                                                                                                                                                                                                                                                    |
| dbSecurityGroup.rules.updatedYmdt     | Body | DateTime | Modified date and time                                                                                                                                                                                                                                                   |
| dbSecurityGroup.createdYmdt           | Body | DateTime | Created date and time                                                                                                                                                                                                                                                    |
| dbSecurityGroup.updatedYmdt           | Body | DateTime | Modified date and time                                                                                                                                                                                                                                                   |

<details><summary>Example</summary>
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

### Modify DB Security Group

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### Required permissions

| Permission Name                         | Description              |
|-----------------------------------------|--------------------------|
| RDSforPostgreSQL:DbSecurityGroup.Modify | Modify DB Security Group |

#### Request

| Name                | Type | Format | Required | Description                                     |
|---------------------|------|--------|----------|-------------------------------------------------|
| dbSecurityGroupId   | URL  | UUID   | O        |                                                 |
| dbSecurityGroupName | Body | String | O        | Name to identify the DB security group          |
| description         | Body | String | X        | Additional information on the DB security group |

<details><summary>Example</summary>
<p>

```json
{
    "dbSecurityGroupName": "dbSecurityGroupName-example",
    "description": "description-example"
}
```

</p>
</details>

#### Response

This API does not return a response body.

---

### Delete DB Security Group Rule

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### Required permissions

| Permission Name                             | Description                  |
|---------------------------------------------|------------------------------|
| RDSforPostgreSQL:DbSecurityGroupRule.Delete | Delete DB Security Group Rule |

#### Request

This API does not require a request body.

| Name              | Type  | Format | Required | Description                        |
|-------------------|-------|--------|----------|------------------------------------|
| dbSecurityGroupId | URL   | UUID   | O        |                                    |
| ruleIds           | Query | String | O        | DB security group rule ID list     |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

<details><summary>Example</summary>
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

### Create DB Security Group Rule

```http
POST /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### Required permissions

| Permission Name                             | Description                  |
|---------------------------------------------|------------------------------|
| RDSforPostgreSQL:DbSecurityGroupRule.Create | Create DB Security Group Rule |

#### Request

| Name              | Type | Format | Required | Description                                                                                                                                                                                                          |
|-------------------|------|--------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId | URL  | UUID   | O        |                                                                                                                                                                                                                      |
| direction         | Body | Enum   | O        | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound`                                                                                                                                            |
| etherType         | Body | Enum   | O        | Ether type<br/>- IPV4: `IPv4`<br/>- IPV6: `IPv6`                                                                                                                                                                     |
| port              | Body | Object | O        | Port information                                                                                                                                                                                                     |
| port.portType     | Body | Enum   | O        | Port type<br/>- ALL: `All port ranges (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB listening port`<br/>- PORT_RANGE: `Port range`                                                   |
| port.minPort      | Body | Number | X        | Minimum port range<br/>- Minimum value: `1`                                                                                                                                                                          |
| port.maxPort      | Body | Number | X        | Maximum port range<br/>- Maximum value: `65535`                                                                                                                                                                      |
| cidr              | Body | String | O        | CIDR                                                                                                                                                                                                                 |
| description       | Body | String | X        | Additional information on the DB security group rule                                                                                                                                                                 |

<details><summary>Example</summary>
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

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

<details><summary>Example</summary>
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

### Modify DB Security Group Rule

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### Required permissions

| Permission Name                             | Description                  |
|---------------------------------------------|------------------------------|
| RDSforPostgreSQL:DbSecurityGroupRule.Modify | Modify DB Security Group Rule |

#### Request

| Name              | Type | Format | Required | Description                                                                                                                                                                                                          |
|-------------------|------|--------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId | URL  | UUID   | O        |                                                                                                                                                                                                                      |
| ruleId            | URL  | UUID   | O        |                                                                                                                                                                                                                      |
| direction         | Body | Enum   | O        | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound`                                                                                                                                            |
| etherType         | Body | Enum   | O        | Ether type<br/>- IPV4: `IPv4`<br/>- IPV6: `IPv6`                                                                                                                                                                     |
| port              | Body | Object | O        | Port information                                                                                                                                                                                                     |
| port.portType     | Body | Enum   | O        | Port type<br/>- ALL: `All port ranges (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB listening port`<br/>- PORT_RANGE: `Port range`                                                   |
| port.minPort      | Body | Number | X        | Minimum port range<br/>- Minimum value: `1`                                                                                                                                                                          |
| port.maxPort      | Body | Number | X        | Maximum port range<br/>- Maximum value: `65535`                                                                                                                                                                      |
| cidr              | Body | String | O        | CIDR                                                                                                                                                                                                                 |
| description       | Body | String | X        | Additional information on the DB security group rule                                                                                                                                                                 |

<details><summary>Example</summary>
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

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

<details><summary>Example</summary>
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
## Parameter group

### List Parameter Groups

```http
GET /v1.0/parameter-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.List | List Parameter Groups |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| parameterGroups | Body | Array | Parameter groups |
| parameterGroups.parameterGroupId | Body | UUID | Parameter group identifier |
| parameterGroups.parameterGroupName | Body | String | Name to identify parameter groups |
| parameterGroups.description | Body | String | Additional information on parameter group |
| parameterGroups.dbVersion | Body | Enum | DB version information |
| parameterGroups.parameterGroupStatus | Body | Enum | Parameter group current status<br/>- STABLE: `Applied`<br/>- NEED_TO_APPLY: `Need to apply`<br/>- DELETED: `Deleted` |
| parameterGroups.createdYmdt | Body | DateTime | Created date and time |
| parameterGroups.updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
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

### Create Parameter Group

```http
POST /v1.0/parameter-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Create | Create Parameter Group |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupName | Body | String | O | Name to identify parameter groups |
| description | Body | String | X | Additional information on parameter group |
| dbVersion | Body | Enum | O | DB version information |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| parameterGroupId | Body | UUID | Parameter group identifier |

<details><summary>Example</summary>
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

### Delete Parameter Group

```http
DELETE /v1.0/parameter-groups/{parameterGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Delete | Delete Parameter Group |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | Parameter group identifier |

#### Response

This API does not return a response body.

---

### List Parameter Group Details

```http
GET /v1.0/parameter-groups/{parameterGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Get | List Parameter Group Details |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | Parameter group identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| parameterGroupId | Body | UUID | Parameter group identifier |
| parameterGroupName | Body | String | Name to identify parameter groups |
| description | Body | String | Additional information on parameter group |
| dbVersion | Body | Enum | DB version information |
| parameterGroupStatus | Body | Enum | Parameter group current status<br/>- STABLE: `Applied`<br/>- NEED_TO_APPLY: `Need to apply`<br/>- DELETED: `Deleted` |
| parameters | Body | Array | Parameter list |
| parameters.parameterCategory | Body | String | Parameter category |
| parameters.parameterName | Body | String | Parameter name |
| parameters.value | Body | String | Current value |
| parameters.valueUnit | Body | String | Unit of the current value (byte: B,kB,MB,GB,TB, time: us,ms,s,min,h,d) |
| parameters.defaultValue | Body | String | Default value |
| parameters.allowedValue | Body | String | Permitted values |
| parameters.valueType | Body | Enum | Value type<br/>- BOOLEAN: `Boolean type`<br/> `* ex) on, off, true, false, yes, no, 1, 0`<br/>- STRING: `String type`<br/>- NUMERIC: `Integer and floating-point types`<br/>- NUMERIC_WITH_BYTE_UNIT: `Numeric type with byte unit`<br/> `* ex) 120kB, 100MB`<br/> `* Allowed byte units: B (bytes), kB (kilobytes), MB (megabytes), GB (gigabytes), and TB (terabytes)`<br/>- NUMERIC_WITH_TIME_UNIT: `Numeric type with time unit`<br/> `* ex) 120ms, 100s, 1d`<br/> `* Allowed time units: us (microseconds), ms (milliseconds), s (seconds), min (minutes), h (hours), and d (days)`<br/>- ENUMERATED: `Enter one of the values declared in Allowed Values (separated by commas (,))`<br/>- MULTI_ENUMERATED: `Enter multiple of the values declared in Allowed Values (separated by commas (,))` |
| parameters.updateType | Body | Enum | Modification type<br/>- VARIABLE: `Modifiable any time`<br/>- CONSTANT: `Not modifiable` |
| parameters.applyType | Body | Enum | Applied type<br/>- BOTH: `Apply session and setting file`<br/>- SESSION: `Apply session only`<br/>- FILE: `Apply setting file only` |
| parameters.expressionAvailable | Body | Boolean | Allow formulas or not |
| createdYmdt | Body | DateTime | Created date and time |
| updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
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

### Modify Parameter Group

```http
PUT /v1.0/parameter-groups/{parameterGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Modify | Modify Parameter Group |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | Parameter group identifier |
| parameterGroupName | Body | String | X | Name to identify parameter groups |
| description | Body | String | X | Additional information on parameter group |

<details><summary>Example</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName-example",
    "description": "description-example"
}
```

</p>
</details>

#### Response

This API does not return a response body.

---

### Copy Parameter Group

```http
POST /v1.0/parameter-groups/{parameterGroupId}/copy
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Copy | Copy Parameter Group |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | Parameter group identifier |
| parameterGroupName | Body | String | O | Name to identify parameter groups |
| description | Body | String | X | Additional information on parameter group |

<details><summary>Example</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName-example",
    "description": "description-example"
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| parameterGroupId | Body | UUID | Parameter group identifier |

<details><summary>Example</summary>
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

### Modify Parameter

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/parameters
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Modify | Modify Parameter Group |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | Parameter group identifier |
| modifiedParameters | Body | Array | O | Parameters to change |
| modifiedParameters.parameterName | Body | String | O | Parameter name |
| modifiedParameters.value | Body | String | O | Parameter value to change |

<details><summary>Example</summary>
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

#### Response

This API does not return a response body.

---

### Reset Parameter Group

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/reset
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Reset | Reset Parameter Group |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | Parameter group identifier |

#### Response

This API does not return a response body.

---
## User Group

### List User Groups

```http
GET /v1.0/user-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.List | List User Groups |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| userGroups | Body | Array | User Groups |
| userGroups.userGroupId | Body | UUID | User group identifier |
| userGroups.userGroupName | Body | String | Name to identify user groups |
| userGroupStatus | Body | Enum | Current status of user groups<br/>- CREATED<br/>- DELETED |
| userGroups.createdYmdt | Body | DateTime | Created date and time |
| userGroups.updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
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

### Create User Group

```http
POST /v1.0/user-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Create | Create User Group |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupName | Body | String | O | Name to identify user groups |
| memberIds | Body | Array | O | List of project member identifiers |
| selectAllYN | Body | Boolean | O | All project members or not<br/>- Default: `false` |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| userGroupId | Body | UUID | User group identifier |

<details><summary>Example</summary>
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

### Delete User Group

```http
DELETE /v1.0/user-groups/{userGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Delete | Delete User Group |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O | User group identifier |

#### Response

This API does not return a response body.

---

### List User Group Details

```http
GET /v1.0/user-groups/{userGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Get | List User Group Details |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O | User group identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| userGroupId | Body | UUID | User group identifier |
| userGroupName | Body | String | Name to identify user groups |
| userGroupTypeCode | Body | Enum | User group type<br/>- ENTIRE: `All project members`<br/>- INDIVIDUAL_MEMBER: `Custom` |
| userGroupStatus | Body | Enum | Current status of user groups<br/>- CREATED<br/>- DELETED |
| members | Body | Array | Project member list |
| members.memberId | Body | UUID | Project member identifier |
| createdYmdt | Body | DateTime | Created date and time |
| updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
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

### Modify User Group

```http
PUT /v1.0/user-groups/{userGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Modify | Modify User Group |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O | User group identifier |
| userGroupName | Body | String | X | Name to identify user groups |
| memberIds | Body | Array | X | List of project member identifiers |
| selectAllYN | Body | Boolean | O | All project members or not<br/>- Default: `false` |

<details><summary>Example</summary>
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

#### Response

This API does not return a response body.

---
## Notification Groups

### List Notification Groups

```http
GET /v1.0/notification-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.List | List Notification Groups |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| notificationGroups | Body | Array |  |
| notificationGroups.notificationGroupId | Body | UUID | Notification group identifier |
| notificationGroups.notificationGroupName | Body | String | Name to identify notification groups |
| notificationGroups.notificationGroupStatus | Body | Enum | Current status of notification groups<br/>- CREATED: `Created`<br/>- DELETED: `Deleted` |
| notificationGroups.notifyEmail | Body | Boolean | Whether to be notified by email |
| notificationGroups.notifySms | Body | Boolean | Whether to be notified by SMS |
| notificationGroups.isEnabled | Body | Boolean | Whether it is enabled |
| notificationGroups.createdYmdt | Body | DateTime | Created date and time |
| notificationGroups.updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
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

### Create Notification Group

```http
POST /v1.0/notification-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Create | Create Notification Group |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupName | Body | String | O | Name to identify notification groups |
| notifyEmail | Body | Boolean | X | Whether to be notified by email<br/>- Default: `true` |
| notifySms | Body | Boolean | X | Whether to be notified by SMS<br/>- Default: `true` |
| isEnabled | Body | Boolean | X | Whether it is enabled<br/>- Default: `true` |
| dbInstanceIds | Body | Array | O | List of identifiers of DB instances to monitor |
| userGroupIds | Body | Array | O | List of user group identifiers |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| notificationGroupId | Body | UUID | Notification group identifier |

<details><summary>Example</summary>
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

### Delete Notification Group

```http
DELETE /v1.0/notification-groups/{notificationGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Delete | Delete Notification Group |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | Notification group identifier |

#### Response

This API does not return a response body.

---

### View Notification Group Details

```http
GET /v1.0/notification-groups/{notificationGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Get | View Notification Group Details |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | Notification group identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| notificationGroupId | Body | UUID | Notification group identifier |
| notificationGroupName | Body | String | Name to identify notification groups |
| notificationGroupStatus | Body | Enum | Current status of notification groups<br/>- CREATED: `Created`<br/>- DELETED: `Deleted` |
| notifyEmail | Body | Boolean | Whether to be notified by email |
| notifySms | Body | Boolean | Whether to be notified by SMS |
| isEnabled | Body | Boolean | Whether it is enabled |
| dbInstances | Body | Array | List of DB instances to monitor |
| dbInstances.dbInstanceId | Body | UUID | DB instance identifier |
| dbInstances.dbInstanceName | Body | String | Name to identify DB instances |
| userGroups | Body | Array | List of user groups |
| userGroups.userGroupId | Body | UUID | User group identifier |
| userGroups.userGroupName | Body | String | Name to identify user groups |
| createdYmdt | Body | DateTime | Created date and time |
| updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
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

### Modify Notification Group

```http
PUT /v1.0/notification-groups/{notificationGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Modify | Modify Notification Group |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | Notification group identifier |
| notificationGroupName | Body | String | X | Name to identify notification groups |
| notifyEmail | Body | Boolean | X | Whether to be notified by email<br/>- Default: `false` |
| notifySms | Body | Boolean | X | Whether to be notified by SMS<br/>- Default: `false` |
| isEnabled | Body | Boolean | X | Whether it is enabled<br/>- Default: `false` |
| dbInstanceIds | Body | Array | O | List of identifiers of DB instances to monitor |
| userGroupIds | Body | Array | O | List of user group identifiers |

<details><summary>Example</summary>
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

#### Response

This API does not return a response body.

---

### List Watch Settings

```http
GET /v1.0/notification-groups/{notificationGroupId}/watchdogs
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.List | List Watch Settings |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | Notification group identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| notificationWatchdogs | Body | Array | Watch setting information |
| notificationWatchdogs.watchdogId | Body | UUID | Watch setting identifier |
| notificationWatchdogs.metricName | Body | String | Performance metrics to watch |
| notificationWatchdogs.comparisonOperator | Body | Enum | Comparison method for watch target<br/>- LE: `<=`<br/>- LT: `<`<br/>- GE: `>=`<br/>- GT: `>` |
| notificationWatchdogs.threshold | Body | Number | Threshold for watch target |
| notificationWatchdogs.duration | Body | Number | Duration for watch target |
| notificationWatchdogs.createdYmdt | Body | DateTime | Created date and time |

<details><summary>Example</summary>
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

### Create Watch Setting

```http
POST /v1.0/notification-groups/{notificationGroupId}/watchdogs
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Create | Create Watch Setting |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | Notification group identifier |
| metricName | Body | String | O | Performance metrics to watch |
| comparisonOperator | Body | Enum | O | Comparison method for watch target<br/>- LE: `<=`<br/>- LT: `<`<br/>- GE: `>=`<br/>- GT: `>` |
| threshold | Body | Number | O | Threshold for watch target<br/>- Minimum value: `0` |
| duration | Body | Number | O | Duration for watch target (minutes)<br/>- Minimum value: `0` |

<details><summary>Example</summary>
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

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| watchdogId | Body | UUID | Watch setting identifier |

<details><summary>Example</summary>
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

### Delete Watch Setting

```http
DELETE /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Delete | Delete Watch Setting |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | Notification group identifier |
| watchdogId | URL | UUID | O | Watch setting identifier |

#### Response

This API does not return a response body.

---

### Modify Watch Setting

```http
PUT /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Modify | Modify Watch Setting |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | Notification group identifier |
| watchdogId | URL | UUID | O | Watch setting identifier |
| metricName | Body | String | O | Performance metrics to watch |
| comparisonOperator | Body | Enum | O | Comparison method for watch target<br/>- LE: `<=`<br/>- LT: `<`<br/>- GE: `>=`<br/>- GT: `>` |
| threshold | Body | Number | O | Threshold for watch target<br/>- Minimum value: `0` |
| duration | Body | Number | O | Duration for watch target (minutes)<br/>- Minimum value: `0` |

<details><summary>Example</summary>
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

#### Response

This API does not return a response body.

---
## Monitoring

### View stats

```http
GET /v1.0/metric-statistics
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Metric.List | View stats |

#### Request

This API does not require a request body.

#### Response

This API does not return a response body.

---

### View a list of performance metrics

```http
GET /v1.0/metrics
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Metric.List | View a list of performance metrics |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| metrics | Body | Array | List of performance metrics |
| metrics.metricName | Body | String | Performance metric types |
| metrics.unit | Body | String | Measure unit |

<details><summary>Example</summary>
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

## Event

### Event categories

Events can be classified by category as follows.

| Event category | Description |
|-------------|---------|
| ALL         | All |
| BACKUP      | Backup |
| DB_INSTANCE | DB instance |
| JOB         | Job |
| TENANT      | Tenant |
| MONITORING  | Monitoring |

### List subscribable event codes

```http
GET /v1.0/event-codes
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Event.List | List subscribable event codes |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| eventCodes | Body | Array | Event codes |
| eventCodes.eventCode | Body | Enum | Event code |
| eventCodes.eventCategoryType | Body | Enum | Event category type<br/>- ALL: `All`<br/>- DB_INSTANCE: `Events generated from DB instance`<br/>- DB_SECURITY_GROUP: `Events generated from DB security group`<br/>- MONITORING: `Events generated from monitoring`<br/>- JOB: `Events generated from JOB`<br/>- BACKUP: `Events generated from backup`<br/>- TENANT: `Events generated from tenant` |

<details><summary>Example</summary>
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

### View the list of events

```http
GET /v1.0/events
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Event.List | View the list of events |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| totalCounts | Body | Number | Total number of events |
| events | Body | Array | Events |
| events.eventCategoryType | Body | Enum | Event category type<br/>- ALL: `All`<br/>- DB_INSTANCE: `Events generated from DB instance`<br/>- DB_SECURITY_GROUP: `Events generated from DB security group`<br/>- MONITORING: `Events generated from monitoring`<br/>- JOB: `Events generated from JOB`<br/>- BACKUP: `Events generated from backup`<br/>- TENANT: `Events generated from tenant` |
| events.eventCode | Body | Enum | Occurred event type |
| events.sourceId | Body | UUID | Event source identifier |
| events.sourceName | Body | String | Name to identify event sources |
| events.messages | Body | Array | Event messages |
| events.messages.langCode | Body | Enum | Language code<br/>- KO<br/>- EN<br/>- JA<br/>- ZH |
| events.messages.message | Body | String | Event message |
| events.eventYmdt | Body | DateTime | Event occurred date and time |

<details><summary>Example</summary>
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
