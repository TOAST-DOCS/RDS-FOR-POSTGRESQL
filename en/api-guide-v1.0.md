## RDS for PostgreSQL API Guide

**Database > RDS for PostgreSQL > API v1.0 Guide**

## Common Information on RDS for PostgreSQL API

### API Endpoint

| Region | Endpoint |
|------|----------|
| Korea (Pangyo) region | https://kr1-rds-postgres.api.nhncloudservice.com |
| Korea (Pyeongchon) region | https://kr2-rds-postgres.api.nhncloudservice.com |


### Authentication and Authorization

RDS for PostgreSQL uses User Access Key tokens for authentication and authorization when making API calls. The User Access Key token is a temporary, Bearer-type access token issued from a User Access Key. For more information on issuing and using User Access Key tokens, please refer to the [User Access Key Token](/nhncloud/en/public-api/user-access-key-token).
The issued token must be included in the request header along with the Appkey.

| Name | Category | Type | Required | Description |
|-----|-----|-----|------|-----|
| X-TC-APP-KEY | Header | String | Y    | Appkey or project integration appkey for RDS for PostgreSQL service |
| X-NHN-AUTHORIZATION | Header | String | Y    | Bearer type token issued with the Public API |

Project permissions also limit the APIs that can be called. The `RDS for` `PostgreSQL` `ADMIN` and `RDS for PostgreSQL VIEWER` roles are granted default permissions, as shown below, and you can grant only the permissions you need from the Manage Role Groups menu within the project.

* The `RDS for PostgreSQL ADMIN` role is granted all the permissions required to run the API.
* The `RDS for PostgreSQL VIEWER` role is granted with the permission to view information only.
* Cannot use any features aimed at DB instances or create, modify, or delete any DB instance.
* However, you can use features related to notification groups and user groups.

If an API request fails to authenticate or is not authorized, the following error occurs:

| resultCode | resultMessage | Description |
|------------|---------------|-----|
| 80401 | Unauthorized | Failed to authenticate |
| 80403 | Forbidden | Unauthorized. |

### Common Response Information

The API responds with "200 OK" to all API requests. For more information on the response results, see Response Body Header.

<details>
  <summary><strong>Successful Response</strong></summary>

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
  <summary><strong>Failure Response</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| resultCode | Number | Result code (Success: 0, Other: Failure) |
| resultMessage | String | Result message |
| isSuccessful | Boolean | Successful or not |

## DB Version

### Supported DB Engine Versions

| DB Engine Version | Available for Creation | Restorable from Object Storage |
|------------|----------|------------------|
| POSTGRESQL_V14_6 | N | Y |
| POSTGRESQL_V14_15 | N | Y |
| POSTGRESQL_V14_17 | Y | Y |
| POSTGRESQL_V14_19 | Y | Y |
| POSTGRESQL_V14_23 | Y | Y |
| POSTGRESQL_V17_2 | N | Y |
| POSTGRESQL_V17_4 | Y | Y |
| POSTGRESQL_V17_6 | Y | Y |
| POSTGRESQL_V17_10 | Y | Y |

* You can use the above values for the `dbVersion` field, which is of the Enum type.
* Depending on the version, creation or restoration may not be available.

### View DB Engine Version List

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbVersion.List | View DB engine version list |

#### Request

```http
GET /v1.0/db-versions
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbVersions": [
        {
            "dbVersion": "POSTGRESQL_V17_10",
            "dbVersionName": "PostgreSQL V17.10",
            "restorableFromObs": true
        }
    ]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| dbVersions | Array | DB version information |
| dbVersions.dbVersion | Enum | DB engine version |
| dbVersions.dbVersionName | String | DB engine version name |
| dbVersions.restorableFromObs | Boolean | Whether restoration from Object Storage is available |

---

## Specifications of DB Instance

### List DB Instance Specifications

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbFlavor.List | List DB Instance Specifications |

#### Request

```http
GET /v1.0/db-flavors
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| dbFlavors | Array | List of DB instance specifications |
| dbFlavors.dbFlavorId | UUID | Identifier of DB instance specifications |
| dbFlavors.dbFlavorName | String | Name of DB instance specifications |
| dbFlavors.ram | Number | Memory size (MB) |
| dbFlavors.vcpus | Number | CPU cores |

---

## Project Information

### List Project Members

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Project.Get | List Project Members |

#### Request

```http
GET /v1.0/project/members
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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
"memberName": "홍길동",
"emailAddress": "user@example.com",
"phoneNumber": "010-1234-5678"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| projectMembers | Array | Project member information |
| projectMembers.memberId | UUID | Project member identifier |
| projectMembers.memberName | String | Project member name |
| projectMembers.emailAddress | String | Project member email address |
| projectMembers.phoneNumber | String | Project member phone number |

---

### List Regions

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Project.Get | List Regions |

#### Request

```http
GET /v1.0/project/regions
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| regions | Array | Region information |
| regions.regionCode | Enum | Region code<br/>- `KR1`: Korea (Pangyo)<br/>- `KR2`: Korea (Pyeongchon) |
| regions.isEnabled | Boolean | Whether the region is enabled |

---

## Network

### List Subnets

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Network.List | List Subnets |

#### Request

```http
GET /v1.0/network/subnets
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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
            "subnetName": "Default Network",
            "subnetCidr": "192.168.0.0/24",
            "usingGateway": false,
            "availableIpCount": 240
        }
    ]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| subnets | Array | Subnet object |
| subnets.subnetId | UUID | Subnet identifier |
| subnets.subnetName | String | Name to identify subnets |
| subnets.subnetCidr | String | CIDR of subnet |
| subnets.usingGateway | Boolean | Whether to use gateway |
| subnets.availableIpCount | Number | Number of available IPs |

---

## Storage

### View the List of Storage Types

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Storage.List | View the List of Storage Types |

#### Request

```http
GET /v1.0/storage-types
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| storageTypes | Array | List of storage types |

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

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Job.Get | View Task Details |

#### Request

```http
GET /v1.0/jobs/{jobId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| jobId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000",
    "jobStatus": "COMPLETED",
    "resourceRelations": [
        {
            "resourceType": "DB_INSTANCE",
            "resourceId": "550e8400-e29b-41d4-a716-446655440000"
        }
    ],
    "createdYmdt": "2023-12-31T15:00:00+09:00",
    "updatedYmdt": "2023-12-31T15:00:00+09:00"
}              
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Task identifier |
| jobStatus | Enum | Current status of the job<br/>- `PREPARING`: When the job is being prepared<br/>- `READY`: When the job is ready<br/>- `RUNNING`: When the job is running<br/>- `COMPLETED`: When the job is complete<br/>- `REGISTERED`: When the job is registered<br/>- `WAIT_TO_REGISTER`: When the job is waiting to be registered<br/>- `INTERRUPTED`: When an interrupt occurs while the job is in progress<br/>- `CANCELED`: When the job is canceled<br/>- `FAILED`: When the job fails<br/>- `ERROR`: When an error occurs while the job is in progress<br/>- `DELETED`: When the job is deleted<br/>- `FAIL_TO_READY`: When job preparation fails |
| resourceRelations | Array | Related resource list |
| resourceRelations.resourceType | Enum | Related resource type<br/>- `DB_INSTANCE`: DB instance<br/>- `DB_INSTANCE_GROUP`: DB instance group<br/>- `DB_SECURITY_GROUP`: DB security group<br/>- `PARAMETER_GROUP`: Parameter group<br/>- `BACKUP`: Backup<br/>- `TENANT`: Tenant |
| resourceRelations.resourceId | UUID | Identifier of the related resource |
| createdYmdt | DateTime | Creation date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

## DB Instance Group

### List DB Instance Groups

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroup.List | List DB Instance Groups |

#### Request

```http
GET /v1.0/db-instance-groups
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| dbInstanceGroups | Array | DB instance group information |
| dbInstanceGroups.dbInstanceGroupId | UUID | DB instance group identifier |
| dbInstanceGroups.dbInstanceGroupStatus | Enum | Current status of the DB instance group<br/>- `CREATED`: Created<br/>- `DELETED`: Deleted |
| dbInstanceGroups.replicationType | Enum | DB instance group replication type<br/>- `STANDALONE`: High availability not used<br/>- `HIGH_AVAILABILITY`: High availability used |
| dbInstanceGroups.createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbInstanceGroups.updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### List DB Instance Group Details

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroup.Get | List DB Instance Group Details |

#### Request

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| dbInstanceGroupId | UUID | DB instance group identifier |
| dbInstanceGroupStatus | Enum | Current status of the DB instance group<br/>- `CREATED`: Created<br/>- `DELETED`: Deleted |
| replicationType | Enum | DB instance group replication type<br/>- `STANDALONE`: High availability not used<br/>- `HIGH_AVAILABILITY`: High availability used |
| dbInstances | Array | List of DB instances belonging to the DB instance group |
| dbInstances.dbInstanceId | UUID | DB instance identifier |
| dbInstances.dbInstanceType | Enum | DB instance role type<br/>- `MASTER`: Master<br/>- `FAILED_MASTER`: Failed master<br/>- `CANDIDATE_MASTER`: Candidate master<br/>- `READ_ONLY_SLAVE`: Read replica |
| dbInstances.dbInstanceStatus | Enum | DB instance current status |
| createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### View Extension List

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.List | View Extension List |

#### Request

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB instance group identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| extensions | Array | Extension list |
| extensions.extensionId | UUID | Extension identifier |
| extensions.extensionName | String | Extension name |
| extensions.extensionStatus | Enum | Extension status<br/>- `AVAILABLE`: Available<br/>- `NEED_TO_APPLY`: Need to apply<br/>- `APPLYING`: Applying |
| extensions.databases | Array | Database information with the extention installed |
| extensions.databases.dbInstanceGroupExtensionId | UUID | Identifier of the extension within the DB instance group |
| extensions.databases.databaseId | UUID | Database identifier |
| extensions.databases.databaseName | String | Database name |
| extensions.databases.dbInstanceGroupExtensionStatus | Enum | Extension status within the DB instance group<br/>- `CREATED`: Created<br/>- `INSTALLED`: Installed<br/>- `INSTALLING`: Installing<br/>- `INSTALL_ERROR`: Installation error<br/>- `DELETED`: Deleted<br/>- `DELETING`: Deleting<br/>- `DELETE_ERROR`: Deletion error |
| extensions.databases.reservedAction | Enum | Scheduled task<br/>- `NONE`: None<br/>- `INSTALL`: `Scheduled installation` (need to apply)<br/>- `INSTALL_WITH_CASCADE`: Scheduled forced installation (need to apply)<br/>- `DELETE`: Scheduled deletion (need to apply)<br/>- `DELETE_WITH_CASCADE`: Scheduled forced deletion (need to apply) |
| extensions.databases.errorReason | String | Reason for error |
| isNeedToApply | Boolean | Whether changes need to be applied |

---

### Apply Extension Changes

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Apply | Apply Extension Changes |

#### Request

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/apply
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB instance group identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Synchronize Extensions

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Sync | Synchronize Extensions |

#### Request

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/sync
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB instance group identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Delete Extension (Cancel)

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Delete | Delete Extension (Cancel) |

#### Request

```http
DELETE /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{dbInstanceGroupExtensionId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB instance group identifier |
| dbInstanceGroupExtensionId | URL | UUID | Y | Identifier of the extension within the DB instance group |
| withCascade | Query | Boolean | Y | Whether to force to delete dependency information |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### Install Extension

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Install | Install Extension |

#### Request

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{extensionId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB instance group identifier |
| extensionId | URL | UUID | Y | Extension identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"databaseId": "550e8400-e29b-41d4-a716-446655440000",
"schemaName": "rds",
"withCascade": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| databaseId | UUID | Y | Database identifier for installation target |
| schemaName | String | Y | Schema name for installation target |
| withCascade | Boolean | N | Whether to install dependency information<br/>- Default: `false` |

#### Response

This API does not return a response body.

---

## DB Instance

### DB Instance Status

| Status | Description |
|---------------------|------------------------------|
| `AVAILABLE` | DB instance is available |
| `BEFORE_CREATE` | Before creating a DB instance |
| `STORAGE_FULL` | Insufficient DB instance storage |
| `FAIL_TO_CREATE` | Failed to create DB instance |
| `FAIL_TO_CONNECT` | Failed to connect DB instance |
| `REPLICATION_STOP` | Replication of DB instance is stopped |
| `REPLICATION_DELAY` | Replication of DB instance is delayed           |
| `FAILOVER` | When failover of a highly available DB instance is complete |
| `SHUTDOWN` | DB instance is stopped |
| `DELETED` | DB instance is deleted |

### DB Instance Progress Status

| Status | Description |
|----------------------------|--------------|
|-----------------------------------|------------------------|
|-----------------------------------|------------------------|
| `APPLYING_DB_INSTANCE_HBA_RULE`   | Applying access control rule |
| `APPLYING_EXTENSION`              | Applying extension     |
| `APPLYING_PARAMETER_GROUP`        | Applying parameter group |
| `BACKING_UP`                      | Backing up              |
| `CANCELING`                       | Canceling               |
| `CREATING`                        | Creating                |
| `CREATING_DATABASE`               | Creating database       |
| `CREATING_USER`                   | Creating user           |
| `DELETING`                        | Deleting                |
| `DELETING_DATABASE`               | Deleting database       |
| `DELETING_USER`                   | Deleting user           |
| `EXPORTING_BACKUP`                | Exporting backup        |
| `FAILING_OVER`                    | Failing over            |
| `MIGRATING`                       | Migrating               |
| `MODIFYING`                       | Modifying               |
| `OCCUPIED`                        | Occupied                |
| `PREPARING`                       | Preparing               |
| `PROMOTING`                       | Promoting               |
| `PROMOTING_FORCIBLY`              | Forcibly promoting      |
| `REBUILDING`                      | Rebuilding               |
| `REPAIRING`                       | Repairing                |
| `REPLICATING`                     | Replicating              |
| `RESTARTING`                      | Restarting               |
| `RESTARTING_FORCIBLY`             | Forcibly restarting      |
| `RESTORING`                       | Restoring                |
| `STARTING`                        | Starting                 |
| `STOPPING`                        | Stopping                 |
| `SYNCING_DATABASE`                | Syncing database         |
| `SYNCING_EXTENSION`               | Syncing extension        |
| `SYNCING_USER`                    | Syncing user             |
| `UPDATING_DATABASE`               | Updating database        |
| `UPDATING_SCHEMA`                 | Updating schema          |
| `UPDATING_USER`                   | Updating user            |
| `WAIT_MANUAL_CONTROL`             | Waiting for manual failover |

### List DB Instances

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.List | List DB instances |

#### Request

```http
GET /v1.0/db-instances
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| dbInstances | Array | DB instances |
| dbInstances.dbInstanceId | UUID | DB instance identifier |
| dbInstances.dbInstanceGroupId | UUID | DB instance group identifier |
| dbInstances.dbInstanceName | String | Name to identify DB instances |
| dbInstances.description | String | Additional information on DB instances |
| dbInstances.dbVersion | Enum | DB engine version |
| dbInstances.dbPort | Number | DB port |
| dbInstances.dbInstanceType | Enum | DB instance role type<br/>- `MASTER`: Master<br/>- `FAILED_MASTER`: Failed master<br/>- `CANDIDATE_MASTER`: Candidate master<br/>- `READ_ONLY_SLAVE`: Read replica |
| dbInstances.dbInstanceStatus | Enum | DB instance current status |
| dbInstances.progressStatus | Enum | Current task status of DB instance |
| dbInstances.createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbInstances.updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### Create DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Create | Create DB Instance |

#### Request

```http
POST /v1.0/db-instances
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName-example",
"dbInstanceCandidateName": "dbInstanceCandidateName-example",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbVersion": "POSTGRESQL_V17_10",
"dbPort": 15432,
"databaseName": "database-1",
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
"periodicAutoBackupStrategyTypeCode": "DAILY_FULL",
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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | Name to identify DB instances |
| dbInstanceCandidateName | String | N | Candidate master name to identify the DB instance |
| description | String | N | Additional information on DB instances |
| dbFlavorId | UUID | Y | Identifier of DB instance specifications |
| dbVersion | Enum | Y | DB engine version |
| dbPort | Number | Y | DB port<br/>- Minimum value: 5432, Maximum value: 45432 |
| databaseName | String | Y | Database name |
| dbUserName | String | Y | DB user account name |
| dbPassword | String | Y | DB user account password |
| parameterGroupId | UUID | Y | Parameter group identifier |
| dbSecurityGroupIds | Array | N | List of DB security group identifiers |
| userGroupIds | Array | N | List of user group identifiers |
| useHighAvailability | Boolean | N | Whether to use high availability<br/>- Default: `false` |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Boolean | N | Whether to use deletion protection<br/>- Default: `false` |
| pingInterval | Number | N | Ping interval (seconds)<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| failoverReplWaitingTime | Number | N | Failover wait time when high availability is used<br/>- If set to `-1`, waits continuously until the replication lag is resolved.<br/>- Minimum value: `-1` |
| network | Object | Y | Network information objects |
| network.subnetId | UUID | Y | Subnet identifier |
| network.usePublicAccess | Boolean | N | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Enum | N | Availability zone where DB instance will be created |
| storage | Object | Y | Storage information objects |
| storage.storageType | Enum | Y | Storage type |
| storage.storageSize | Number | Y | Data storage size (GB)<br/>- Minimum value: `20` |
| backup | Object | Y | Backup information objects |
| backup.backupPeriod | Number | Y | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.periodicAutoBackupStrategyTypeCode | Enum | N | Periodic automatic backup strategy code (DAILY_FULL/SNAPSHOT)<br/>- Default value: `DAILY_FULL`<br/>- `SNAPSHOT`: Daily snapshot backup<br/>- `DAILY_FULL`: Daily full backup |
| backup.backupSchedules | Array | Y | Backup schedule information |
| backup.backupSchedules.backupWndBgnTime | Time | Y | Backup start time |
| backup.backupSchedules.backupWndDuration | Enum | Y | Backup window<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1 hour 30 minutes<br/>- `TWO_HOURS`: 2 hours<br/>- `TWO_HOURS_AND_HALF`: 2 hours 30 minutes<br/>- `THREE_HOURS`: 3 hours |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Restore DB Instance from Backup in Object Storage

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.RestoreFromObs | Restore DB Instance from Backup in Object Storage |

#### Request

```http
POST /v1.0/db-instances/restore-from-obs
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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
"backupRetryCount": 0,
"periodicAutoBackupStrategyTypeCode": "DAILY_FULL",
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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceName | String | N | Name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| dbInstanceCandidateName | String | N | Candidate master name to identify the DB instance |
| description | String | N | Additional information on the DB instance<br/>- Maximum length: `100` |
| dbFlavorId | UUID | Y | Identifier of DB instance specifications |
| dbPort | Number | N | DB port<br/>- Minimum value: 5432, Maximum value: 45432 |
| dbVersion | Enum | Y | DB engine version |
| useHighAvailability | Boolean | N | Whether to use high availability<br/>- Default: `false` |
| imageId | UUID | N | Image identifier |
| pingInterval | Number | N | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| failoverReplWaitingTime | Number | N | Failover wait time when high availability is used<br/>- If set to `-1`, waits continuously until the replication lag is resolved.<br/>- Minimum value: `-1` |
| storage | Object | Y | Storage information objects |
| storage.storageType | Enum | Y | Storage type |
| storage.storageSize | Number | Y | Data storage size (GB)<br/>- Minimum value: `20` |
| network | Object | Y | Network information objects |
| network.subnetId | UUID | Y | Subnet identifier |
| network.usePublicAccess | Boolean | N | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Enum | N | Availability zone where DB instance will be created |
| backup | Object | Y | Backup information objects |
| backup.backupPeriod | Number | Y | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.periodicAutoBackupStrategyTypeCode | Enum | N | Periodic automatic backup strategy code (DAILY_FULL/SNAPSHOT)<br/>- Default value: `DAILY_FULL`<br/>- `SNAPSHOT`: Daily snapshot backup<br/>- `DAILY_FULL`: Daily full backup |
| backup.backupRetryCount | Number | N | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.periodicAutoBackupStrategyTypeCode | Enum | N | Periodic automatic backup strategy code (DAILY_FULL/SNAPSHOT)<br/>- Default value: `DAILY_FULL`<br/>- `SNAPSHOT`: Daily snapshot backup<br/>- `DAILY_FULL`: Daily full backup |
| backup.backupSchedules | Array | Y | Backup schedule information |
| backup.backupSchedules.backupWndBgnTime | Time | Y | Backup start time |
| backup.backupSchedules.backupWndDuration | Enum | Y | Backup window<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1 hour 30 minutes<br/>- `TWO_HOURS`: 2 hours<br/>- `TWO_HOURS_AND_HALF`: 2 hours 30 minutes<br/>- `THREE_HOURS`: 3 hours |
| restore | Object | Y | Restoration information object |
| restore.tenantId | String | Y | Tenant ID of the object storage where the backup is stored |
| restore.username | String | Y | NHN Cloud account or IAM account ID |
| restore.password | String | Y | API password for the object storage where the backup is stored |
| restore.targetContainer | String | Y | Container of the object storage where the backup is stored |
| restore.objectPath | String | Y | Path of the backup stored in the container |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| parameterGroupId | UUID | Y | Parameter group identifier |
| dbSecurityGroupIds | Array | N | List of DB security group identifiers |
| userGroupIds | Array | N | List of user group identifiers |
| useDeletionProtection | Boolean | N | Whether to use deletion protection<br/>- Default: `false` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Delete DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Delete | Delete DB Instance |

#### Request

```http
DELETE /v1.0/db-instances/{dbInstanceId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### List DB Instance Details

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | List DB Instance Details |

#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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
"osVersion": "Ubuntu Server 24.04 LTS",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| dbInstanceId | UUID | DB instance identifier |
| dbInstanceGroupId | UUID | DB instance group identifier |
| dbInstanceName | String | Name to identify DB instances |
| description | String | Additional information on DB instances |
| dbVersion | Enum | DB engine version |
| dbPort | Number | DB port |
| dbInstanceType | Enum | DB instance role type<br/>- `MASTER`: Master<br/>- `FAILED_MASTER`: Failed master<br/>- `CANDIDATE_MASTER`: Candidate master<br/>- `READ_ONLY_SLAVE`: Read replica |
| dbInstanceStatus | Enum | DB instance current status |
| progressStatus | Enum | Current task status of DB instance |
| dbFlavorId | UUID | Identifier of DB instance specifications |
| parameterGroupId | UUID | Identifier of the parameter group applied to the DB instance |
| dbSecurityGroupIds | Array | List of DB security group identifiers applied to the DB instance |
| notificationGroupIds | Array | List of identifiers of notification groups applied to the DB instance |
| useDeletionProtection | Boolean | Whether deletion protection is enabled for the DB instance |
| needToApplyParameterGroup | Boolean | Whether the latest parameter group needs to be applied |
| needMigration | Boolean | Whether migration is required |
| osVersion | String | OS version |
| createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### Modify DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance |

#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceName | String | N | Name to identify DB instances |
| dbInstanceCandidateName | String | N | Candidate master name to identify the DB instance |
| description | String | N | Additional information on the DB instance<br/>- Maximum length: `100` |
| dbPort | Number | N | DB port<br/>- Minimum value: 5432, Maximum value: 45432 |
| dbFlavorId | UUID | N | Identifier of DB instance specifications |
| parameterGroupId | UUID | N | Parameter group identifier |
| dbVersion | Enum | N | DB engine version |
| dbSecurityGroupIds | Array | N | List of DB security group identifiers |
| executeBackup | Boolean | N | Whether to perform backup at this time<br/>- Default: `false` |
| useOnlineFailover | Boolean | N | Whether to restart using failover<br/>- Default: `false` |
| waitReplicationDelay | Boolean | N | Whether to wait for replication delay to resolve<br/>- Default: `false` |
| useReadOnly | Boolean | N | Whether to block write workloads<br/>- Default: `false` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Apply Latest Parameter Group to DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Apply Latest Parameter Group to DB Instance |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/apply-recent-parameter-group
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Get selectable DB engine versions in the current DB instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get selectable DB engine versions in the current DB instance |

#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/available-db-versions
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| availableDbVersions | Array | DB version information |
| availableDbVersions.dbVersionCode | String | DB version code |
| availableDbVersions.dbVersion | Enum | DB engine version |
| availableDbVersions.dbVersionName | String | DB engine version name |
| availableDbVersions.restorableFromObs | Boolean | Whether restoration from Object Storage is available |

---

### Backup DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Backup | Backup DB Instance |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/backup
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"backupName": "backupName-example",
"backupMethodType": "FULL"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| backupName | String | Y | Name to identify backups |
| backupMethodType | Enum | N | Backup method<br/>- `FULL`<br/>- `SNAPSHOT` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Get DB Instance Backup Information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB Instance Backup Information |

#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/backup-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| allowAutoBackup | Boolean | Whether automatic backup is allowed |
| usePeriodicAutoBackup | Boolean | Whether scheduled automatic backup is used |
| backupPeriod | Number | Backup retention period (days) |
| backupRetryCount | Number | Number of backup retries |
| backupSchedules | Array | Backup schedules |
| backup.backupSchedules.backupWndBgnTime | Time | Y | Backup start time |
| backup.backupSchedules.backupWndDuration | Enum | Y | Backup window<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1 hour 30 minutes<br/>- `TWO_HOURS`: 2 hours<br/>- `TWO_HOURS_AND_HALF`: 2 hours 30 minutes<br/>- `THREE_HOURS`: 3 hours |

---

### Modify DB Instance Backup Information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance Backup Information |

#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/backup-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| allowAutoBackup | Boolean | N | Whether automatic backup is allowed |
| usePeriodicAutoBackup | Boolean | N | Whether scheduled automatic backup is used |
| backup.periodicAutoBackupStrategyTypeCode | Enum | N | Periodic automatic backup strategy code (DAILY_FULL/SNAPSHOT)<br/>- Default value: `DAILY_FULL`<br/>- `SNAPSHOT`: Daily snapshot backup<br/>- `DAILY_FULL`: Daily full backup |
| backupPeriod | Number | N | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backupRetryCount | Number | N | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backupSchedules | Array | N | Backup schedules |
| backup.backupSchedules.backupWndBgnTime | Time | Y | Backup start time |
| backup.backupSchedules.backupWndDuration | Enum | Y | Backup window<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1 hour 30 minutes<br/>- `TWO_HOURS`: 2 hours<br/>- `TWO_HOURS_AND_HALF`: 2 hours 30 minutes<br/>- `THREE_HOURS`: 3 hours |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Export after Backing up DB Instance to Object Storage

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.BackupToObjectStorage | Export after Backing up DB Instance to Object Storage |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/backup-to-object-storage
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| tenantId | String | Y | Tenant ID of object storage where backup will be stored<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | String | Y | NHN Cloud account or IAM account ID |
| password | String | Y | API password for object storage where backup will be stored |
| targetContainer | String | Y | Object storage container where backup will be stored |
| objectPath | String | Y | Path of the backup to be stored in the container |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### View the list of databases

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.List | View the list of databases |

#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/databases
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00",
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

| Name | Type | Description |
|-----|-----|-----|
| databases | Array | Database information |
| databases.databaseId | UUID | Database identifier |
| databases.databaseName | String | Database name |
| databases.databaseStatus | Enum | Current state of the database<br/>- `STABLE`: Available<br/>- `CREATING`: Creating<br/>- `MODIFYING`: Modifying<br/>- `DELETING`: Deleting<br/>- `DELETED`: Deleted<br/>- `SYNCING`: Synchronizing<br/>- `DELETE_ERROR`: Deletion failed |
| databases.createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| databases.updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| databases.schemas | Array | Schema information |
| databases.schemas.schemaName | String | Schema name |

---

### Create a database

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Create | Create a database |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/databases
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"databaseName": "database-1"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| databaseName | String | Y | Database name |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Delete a database

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Delete | Delete a database |

#### Request

```http
DELETE /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| databaseId | URL | UUID | Y | Database identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Modify a database

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Modify | Modify a database |

#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| databaseId | URL | UUID | Y | Database identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"applyHbaRulesImmediately": false,
"databaseName": "database-1"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| applyHbaRulesImmediately | Boolean | N | Whether to apply associated access control rules immediately<br/>- Default: `false` |
| databaseName | String | Y | Database name |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### View the list of users

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.List | View the list of users |

#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/db-users
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| dbUsers | Array | DB user list |
| dbUsers.dbUserId | UUID | DB user identifier |
| dbUsers.dbUserName | String | DB user account name |
| dbUsers.authorityType | Enum | DB user permission types<br/>- `CUSTOM`: Custom permission<br/>- `READ`: READ permission (read-only permission)<br/>- `CRUD`: CRUD permission (includes read permission)<br/>- `DDL`: DDL permission (includes CRUD permission) |
| dbUsers.dbUserStatus | Enum | DB user current status<br/>- `STABLE`: Available<br/>- `CREATING`: Creating<br/>- `MODIFYING`: Modifying<br/>- `DELETING`: Deleting<br/>- `DELETED`: Deleted<br/>- `SYNCING`: Synchronizing<br/>- `DELETE_ERROR`: Deletion failed |
| dbUsers.createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbUsers.updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### Create a user

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Create | Create a user |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/db-users
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbUserName | String | Y | DB user account name |
| dbPassword | String | Y | DB user account password |
| authorityType | Enum | Y | DB user permission types<br/>- `CUSTOM`: Custom permission<br/>- `READ`: Read permission<br/>- `CRUD`: CRUD permission<br/>- `DDL`: DDL permission |
| createDefaultHbaRules | Boolean | N | Whether to create default access control rules<br/>- Default: `false` |
| address | String | N | Connection address |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Delete a user

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Delete | Delete a user |

#### Request

```http
DELETE /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| dbUserId | URL | UUID | Y | DB user identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Edit a user

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Modify | Edit a user |

#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| dbUserId | URL | UUID | Y | DB user identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbUserName": "dbUserName-example",
"dbPassword": "dbPassword-example",
"authorityType": "CUSTOM",
"applyHbaRulesImmediately": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbUserName | String | N | DB user account name |
| dbPassword | String | N | DB user account password |
| authorityType | Enum | N | DB user permission<br/>- `CUSTOM`: Custom permission<br/>- `READ`: Read permission<br/>- `CRUD`: CRUD permission<br/>- `DDL`: DDL permission |
| applyHbaRulesImmediately | Boolean | N | Whether to apply access control changes immediately<br/>- Default: `false` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Change DB Instance Deletion Protection Settings

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Change DB instance deletion protection settings |

#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/deletion-protection
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"useDeletionProtection": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| useDeletionProtection | Boolean | Y | Whether to enable deletion protection |

#### Response

This API does not return a response body.

---

### Force Restart DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.ForceRestart | Force Restart DB Instance |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/force-restart
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### View a list of access control rules

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.List | View a list of access control rules |

#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/hba-rules
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| hbaRules | Array | List of access control rules |
| hbaRules.hbaRuleId | UUID | Identifier of the access control rule |
| hbaRules.hbaRuleStatus | Enum | Current status of the access control rule<br/>- `CREATED`: Created<br/>- `APPLIED`: Applied<br/>- `CREATING`: Creating<br/>- `MODIFYING`: Modifying<br/>- `DELETING`: Deleting<br/>- `DELETED`: Deleted |
| hbaRules.databaseApplyType | Enum | Database rule application method<br/>- `ENTIRE`: All<br/>- `USER_CUSTOM`: Custom |
| hbaRules.dbUserApplyTypeCode | Enum | DB user rule application method<br/>- `ENTIRE`: All<br/>- `USER_CUSTOM`: Custom |
| hbaRules.databases | Array | List of custom databases |
| hbaRules.databases.databaseId | UUID | Identifier of the custom database |
| hbaRules.databases.databaseName | String | Name of the custom database |
| hbaRules.dbUsers | Array | List of custom DB users |
| hbaRules.dbUsers.dbUserId | UUID | Identifier of the custom DB user |
| hbaRules.dbUsers.dbUserName | String | Account name of the custom DB user |
| hbaRules.address | String | Connection address<br/>- Enter in CIDR, hostname, or domain format |
| hbaRules.authMethod | Enum | Authentication method<br/>- `TRUST`: Trust (no password required)<br/>- `REJECT`: Block connection<br/>- `SCRAM_SHA_256`: Password (SCRAM-SHA-256) |
| hbaRules.reservedAction | Enum | Reserved action<br/>- `NONE`: None<br/>- `CREATE`: Creation reserved (application required)<br/>- `MODIFY`: Modification reserved (application required)<br/>- `DELETE`: Deletion reserved (application required) |
| hbaRules.order | Number | Application order |
| hbaRules.applicable | Boolean | Whether the rule is applicable<br/>- Rules that cannot be applied are ignored |
| needToApply | Boolean | Whether changes need to be applied |

---

### Add Access Control Rules

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Create | Add access control rules |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| connectionTypeCode | Enum | N | Access control record type<br/>- `HOST`: Valid for connections over TCP/IP<br/>- `HOST_NO_SSL`: Valid only for connections that do not use SSL encryption |
| databaseApplyType | Enum | Y | Database rule application method<br/>- `ENTIRE`: All<br/>- `USER_CUSTOM`: Custom |
| dbUserApplyType | Enum | Y | DB user rule application method<br/>- `ENTIRE`: All<br/>- `USER_CUSTOM`: Custom |
| databaseIds | Array | N | List of identifiers of the custom databases |
| dbUserIds | Array | N | List of identifiers of the custom DB users |
| address | String | Y | Connection address<br/>- Enter in CIDR, hostname, or domain format |
| authMethod | Enum | Y | Authentication method<br/>- `TRUST`: Trust (no password required)<br/>- `REJECT`: Block connection<br/>- `SCRAM_SHA_256`: Password (SCRAM-SHA-256) |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| hbaRuleId | UUID | Identifier of the access control rule |

---

### Apply Access Control Rules

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Apply access control rules |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules/apply
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Reorder Access Control Rules

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Modify | Reorder access control rules |

#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/orders
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"hbaRuleIds": []
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| hbaRuleIds | Array | Y | Sorted list of access control rule identifiers (saved in the order requested) |

#### Response

This API does not return a response body.

---

### Delete Access Control Rules

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Delete | Delete access control rules |

#### Request

```http
DELETE /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| hbaRuleId | URL | UUID | Y | Identifier of the access control rule |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### Modify Access Control Rules

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Modify | Modify access control rules |

#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| hbaRuleId | URL | UUID | Y | Identifier of the access control rule |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| connectionTypeCode | Enum | N | Access control record type<br/>- `HOST`: Valid for connections over TCP/IP<br/>- `HOST_NO_SSL`: Valid only for connections that do not use SSL encryption |
| databaseApplyType | Enum | Y | Database rule application method<br/>- `ENTIRE`: All<br/>- `USER_CUSTOM`: Custom |
| dbUserApplyType | Enum | Y | DB user rule application method<br/>- `ENTIRE`: All<br/>- `USER_CUSTOM`: Custom |
| databaseIds | Array | N | List of identifiers of the custom databases |
| dbUserIds | Array | N | List of identifiers of the custom DB users |
| address | String | Y | Connection address<br/>- Enter in CIDR, hostname, or domain format |
| authMethod | Enum | Y | Authentication method<br/>- `TRUST`: Trust (no password required)<br/>- `REJECT`: Block connection<br/>- `SCRAM_SHA_256`: Password (SCRAM-SHA-256) |

#### Response

This API does not return a response body.

---

### Get high availability information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Get | Get high availability information |

#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/high-availability
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| haStatus | Enum | High availability status<br/>- `CREATED`: Created<br/>- `STABLE`: Stable<br/>- `PAUSING`: Pausing<br/>- `PAUSED`: Paused<br/>- `PAUSED_DUE_TO_TASK`: Paused due to task<br/>- `DISABLE_REPLICATION_DELAY`: Failover disabled due to replication lag<br/>- `FAILOVER_STARTED`: Failover started<br/>- `FAILOVER_FAILED`: Failover failed<br/>- `FAILOVER_COMPLETED`: Failover completed<br/>- `DELETED`: Deleted |
| pingInterval | Number | Ping interval (seconds)<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| failoverReplWaitingTime | Number | Failover wait time when high availability is used<br/>- If set to `-1`, waits continuously until the replication lag is resolved.<br/>- Minimum value: `-1` |

---

### Modify High Availability

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Modify | Modify High Availability |

#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/high-availability
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"useHighAvailability": false,
"pingInterval": 1,
"failoverReplWaitingTime": 1
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| useHighAvailability | Boolean | Y | Whether to use high availability |
| pingInterval | Number | N | Ping interval (seconds)<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| failoverReplWaitingTime | Number | N | Failover wait time when high availability is used<br/>- If set to `-1`, waits continuously until the replication lag is resolved.<br/>- Minimum value: `-1` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Pause High Availability

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Pause | Pause High Availability |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Recover High Availability

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Repair | Recover High Availability |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Restart High Availability

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Resume | Restart High Availability |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Separate High Availability

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Split | Separate High Availability |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/split
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Get DB instance maintenance information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB instance maintenance information |

#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| allowAutoMaintenance | Boolean | Whether to allow automatic maintenance |
| useAutoStorageCleanup | Boolean | Whether to enable automatic storage cleanup |
| maintWndBgnTime | Time | Automatic maintenance start time |
| maintWndDuration | Enum | Maintenance window<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1 hour 30 minutes<br/>- `TWO_HOURS`: 2 hours<br/>- `TWO_HOURS_AND_HALF`: 2 hours 30 minutes<br/>- `THREE_HOURS`: 3 hours |
| logRetentionPeriod | Number | Log retention period (days) |

---

### Modify DB instance maintenance information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB instance maintenance information |

#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| allowAutoMaintenance | Boolean | N | Whether to allow automatic maintenance |
| useAutoStorageCleanup | Boolean | N | Whether to enable automatic storage cleanup |
| maintWndBgnTime | Time | N | Automatic maintenance start time |
| maintWndDuration | Enum | N | Maintenance window<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1 hour 30 minutes<br/>- `TWO_HOURS`: 2 hours<br/>- `TWO_HOURS_AND_HALF`: 2 hours 30 minutes<br/>- `THREE_HOURS`: 3 hours |
| logRetentionPeriod | Number | N | Log retention period (days)<br/>- Minimum: `1`<br/>- Maximum: `30` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Get DB instance network information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB instance network information |

#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/network-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| availabilityZone | Enum | Availability zone where DB instance will be created |
| subnet | Object | Subnet object |
| subnet.subnetId | UUID | Subnet identifier |
| subnet.subnetName | String | Name to identify subnets |
| subnet.subnetCidr | String | CIDR of subnet |
| subnet.publicAccessible | Boolean | External access is available or not |
| endPoints | Array | List of access information |
| endPoints.domain | String | Domain |
| endPoints.ipAddress | String | IP address |
| endPoints.endPointType | Enum | Connection information type<br/>- `EXTERNAL`: External connection domain<br/>- `INTERNAL`: Internal connection domain<br/>- `PUBLIC`: (Deprecated) External connection domain<br/>- `PRIVATE`: (Deprecated) Internal connection domain |

---

### Modify DB instance network information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB instance network information |

#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/network-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"usePublicAccess": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| usePublicAccess | Boolean | Y | External access is available or not |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Promote DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Promote | Promote DB Instance |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/promote
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Create Read Replica

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Replicate | Create read replica |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/replicate
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | Name to identify DB instances |
| description | String | N | Additional information on DB instances |
| dbFlavorId | UUID | N | Identifier of DB instance specifications |
| dbPort | Number | N | DB port<br/>- Minimum value: 5432, Maximum value: 45432 |
| parameterGroupId | UUID | N | Parameter group identifier |
| dbSecurityGroupIds | Array | N | List of DB security group identifiers |
| userGroupIds | Array | N | List of user group identifiers |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Boolean | N | Whether to use deletion protection<br/>- Default: `false` |
| network | Object | N | Network information objects |
| network.usePublicAccess | Boolean | N | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Enum | N | Availability zone where DB instance will be created |
| storage | Object | N | Storage information objects |
| storage.storageType | Enum | N | Data storage types |
| storage.storageSize | Number | N | Data storage size (GB)<br/>- Minimum value: `20`<br/>- Maximum value: `2048` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Restart DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Restart | Restart DB Instance |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/restart
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Get DB Instance Restore Information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB instance restore information |

#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/restoration-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| oldestRestorableYmdt | DateTime | Oldest restorable time |
| latestRestorableYmdt | DateTime | Most recent restorable time |
| restorableBackups | Array | List of restorable backups |
| restorableBackups.backupId | UUID | Backup identifier |
| restorableBackups.backupName | String | Backup name |
| restorableBackups.backupStatus | Enum | Backup status<br/>- `BACKING_UP`: When the backup is in progress<br/>- `COMPLETED`: When the backup is complete<br/>- `DELETING`: When the backup is being deleted<br/>- `DELETED`: When the backup has been deleted<br/>- `ERROR`: When an error occurs |
| restorableBackups.dbInstanceId | UUID | Original DB instance identifier |
| restorableBackups.dbInstanceName | String | Original DB instance name |
| restorableBackups.dbVersion | Enum | DB engine version |
| restorableBackups.backupType | Enum | Backup type<br/>- `AUTO`: Auto Backup<br/>- `MANUAL`: Manual Backup |
| restorableBackups.backupSize | Number | Backup size<br/>- Unit: `BYTE` |
| restorableBackups.failoverCount | Number | Number of failovers |
| restorableBackups.walFileName | String | WAL file name |
| restorableBackups.createdYmdt | DateTime | Backup creation date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| restorableBackups.updatedYmdt | DateTime | Backup update date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| restorableBackups.startYmdt | DateTime | Backup start date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| restorableBackups.completedYmdt | DateTime | Backup completion date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### Restore DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Restore | Restore DB Instance |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/restore
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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
"restoreType": "BACKUP"
},
"useDefaultNotification": false,
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useDeletionProtection": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceName | String | N | Name to identify DB instances |
| dbInstanceCandidateName | String | N | Candidate master name to identify the DB instance |
| description | String | N | Additional information on the DB instance<br/>- Maximum length: `100` |
| dbFlavorId | UUID | Y | Identifier of DB instance specifications |
| dbPort | Number | N | DB port<br/>- Minimum value: 5432, Maximum value: 45432 |
| useHighAvailability | Boolean | N | Whether to use high availability<br/>- Default: `false` |
| imageId | UUID | N | Image identifier |
| pingInterval | Number | N | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| failoverReplWaitingTime | Number | N | Failover wait time when high availability is used<br/>- If set to `-1`, waits continuously until the replication lag is resolved.<br/>- Minimum value: `-1` |
| storage | Object | Y | Storage information objects |
| storage.storageType | Enum | Y | Storage type |
| storage.storageSize | Number | Y | Data storage size (GB)<br/>- Minimum value: `20` |
| network | Object | Y | Network information objects |
| network.subnetId | UUID | Y | Subnet identifier |
| network.usePublicAccess | Boolean | N | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Enum | N | Availability zone where DB instance will be created |
| backup | Object | Y | Backup information objects |
| backup.backupPeriod | Number | Y | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.periodicAutoBackupStrategyTypeCode | Enum | N | Periodic automatic backup strategy code (DAILY_FULL/SNAPSHOT)<br/>- Default value: `DAILY_FULL`<br/>- `SNAPSHOT`: Daily snapshot backup<br/>- `DAILY_FULL`: Daily full backup |
| backup.backupRetryCount | Number | N | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.replicationRegion | Enum | N | Backup replication region<br/>- `KR1`: Korea (Pangyo)<br/>- `KR2`: Korea (Pyeongchon) |
| backup.backupSchedules | Array | Y | Backup schedules |
| backup.backupSchedules.backupWndBgnTime | Time | Y | Backup start time |
| backup.backupSchedules.backupWndDuration | Enum | Y | Backup duration<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1.5 hours<br/>- `TWO_HOURS`: 2 hours<br/>- `TWO_HOURS_AND_HALF`: 2.5 hours<br/>- `THREE_HOURS`: 3 hours |
| restore | Object | Y | Restoration information object |
| restore.restoreType | Enum | Y | Restore type<br/>- `BACKUP`: Restore using a previously created backup<br/>- `TIMESTAMP`: Point-in-time restore using a time within the restorable time range |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| parameterGroupId | UUID | Y | Parameter group identifier |
| dbSecurityGroupIds | Array | N | List of DB security group identifiers |
| userGroupIds | Array | N | List of user group identifiers |
| useDeletionProtection | Boolean | N | Whether to use deletion protection<br/>- Default: `false` |

#### Request for point-in-time restore using a timestamp (when restoreType is `TIMESTAMP`)
| Name | Type | Required | Description |
|-----|-----|-----|-----|
| restore.restoreYmdt | DateTime | Y | DB instance restore time (YYYY-MM-DDThh:mm:ss.SSSTZD)<br/>- Restoration is only possible to a time before the most recent restorable time retrieved from the restore information query. |
#### Request for restore using a backup (when restoreType is `BACKUP`)
| Name | Type | Required | Description |
|-----|-----|-----|-----|
| restore.backupId | UUID | Y | Identifier of the backup to use for the restore |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Start DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Start | Start DB Instance |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/start
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Stop DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Stop | Stop DB Instance |

#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/stop
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Get DB Instance Storage Information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB Instance Storage Information |

#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/storage-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| storageType | Enum | Data storage types |
| storageSize | Number | Data storage size (GB) |
| storageStatus | Enum | Data storage current status<br/>- `DELETED`: Deleted<br/>- `PENDING_DELETION`: Deletion deferred<br/>- `DELETION_RESERVED`: Deletion reserved (pending snapshot cleanup)<br/>- `DETACHED`: Detached<br/>- `ATTACHED`: Attached |

---

### Modify DB Instance Storage Information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance Storage Information |

#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/storage-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"storageSize": 1
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| storageSize | Number | Y | Data storage size (GB)<br/>- Maximum value: `2048` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

## Backup

### Backup Status

| Status | Description |
|--------------|--------------|
| `BACKING_UP` | Backup in progress |
| `COMPLETED` | Backup completed |
| `DELETING` | Backup being deleted |
| `DELETED` | Backup deleted |
| `ERROR` | Error occurred |

### Retrieve Backup List

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Backup.List | Retrieve Backup List |

#### Request

```http
GET /v1.0/backups
```

#### Request Parameters
| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| page | Query | Number | Y | Page of the list to retrieve<br/>- Minimum value: `1` |
| size | Query | Number | Y | Page size of the list to retrieve<br/>- Minimum value: `1`<br/>- Maximum value: `100` |
| backupType | Query | Enum | N | Backup type<br/>- `AUTO`: Automatic backup<br/>- `MANUAL`: Manual backup |
| dbInstanceId | Query | String | N | Identifier of the source DB instance |
| dbVersion | Query | Enum | N | DB engine version |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| totalCounts | Number | Number of all backup lists |
| backups | Array | Backup list |
| backups.backupId | UUID | Backup identifier |
| backups.backupName | String | Name to identify backups |
| backups.backupStatus | Enum | Backup current status<br/>- `BACKING_UP`: Backup in progress<br/>- `COMPLETED`: Backup is completed<br/>- `DELETING`: Deleting<br/>- `DELETED`: Deleted<br/>- `ERROR`: Error occurred |
| backups.dbInstanceId | UUID | Original DB instance identifier |
| backups.dbVersion | Enum | DB engine version |
| backups.backupType | Enum | Backup type<br/>- `AUTO`: Auto Backup<br/>- `MANUAL`: Manual Backup |
| backups.backupSize | Number | Size of the backup<br/>- Unit: `BYTE` |
| backups.startYmdt | DateTime | Start date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| backups.createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| backups.updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| backups.completedYmdt | DateTime | End date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### Delete Backup

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Backup.Delete | Delete Backup |

#### Request

```http
DELETE /v1.0/backups/{backupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y | Backup identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Export Backup to Object Storage

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Backup.Export | Export Backup to Object Storage |

#### Request

```http
POST /v1.0/backups/{backupId}/export
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y | Backup identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| tenantId | String | Y | Tenant ID of object storage where backup will be stored<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | String | Y | NHN Cloud account or IAM account ID |
| password | String | Y | API password for object storage where backup will be stored |
| targetContainer | String | Y | Object storage container where backup will be stored |
| objectPath | String | Y | Path of the backup to be stored in the container |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Restore Backup

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Backup.Restore | Restore Backup |

#### Request

```http
POST /v1.0/backups/{backupId}/restore
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y | Backup identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | Name to identify DB instances |
| dbInstanceCandidateName | String | N | Candidate master name to identify the DB instance |
| description | String | N | Additional information on DB instances |
| dbFlavorId | UUID | Y | Identifier of DB instance specifications |
| dbPort | Number | Y | DB port<br/>- Minimum value: 5432, Maximum value: 45432 |
| parameterGroupId | UUID | Y | Parameter group identifier |
| dbSecurityGroupIds | Array | N | List of DB security group identifiers |
| userGroupIds | Array | N | List of user group identifiers |
| useHighAvailability | Boolean | N | Whether to use high availability<br/>- Default: `false` |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Boolean | N | Whether to use deletion protection<br/>- Default: `false` |
| pingInterval | Number | N | Ping interval (seconds)<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| failoverReplWaitingTime | Number | N | Failover wait time when high availability is used<br/>- If set to `-1`, waits continuously until the replication lag is resolved.<br/>- Minimum value: `-1` |
| network | Object | Y | Network information objects |
| network.subnetId | UUID | Y | Subnet identifier |
| network.usePublicAccess | Boolean | N | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Enum | N | Availability zone where DB instance will be created |
| storage | Object | Y | Storage information objects |
| storage.storageType | Enum | Y | Storage type |
| storage.storageSize | Number | Y | Data storage size (GB)<br/>- Minimum value: `20` |
| backup | Object | Y | Backup information objects |
| backup.backupPeriod | Number | Y | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.periodicAutoBackupStrategyTypeCode | Enum | N | Periodic automatic backup strategy code (DAILY_FULL/SNAPSHOT)<br/>- Default value: `DAILY_FULL`<br/>- `SNAPSHOT`: Daily snapshot backup<br/>- `DAILY_FULL`: Daily full backup |
| backup.backupRetryCount | Number | N | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.backupSchedules | Array | Y | Backup schedules |
| backup.backupSchedules.backupWndBgnTime | Time | Y | Backup start time |
| backup.backupSchedules.backupWndDuration | Enum | Y | Backup window<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1.5 hours<br/>- `TWO_HOURS`: 2 hours<br/>- `TWO_HOURS_AND_HALF`: 2.5 hours<br/>- `THREE_HOURS`: 3 hours |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

## DB Security Group

### DB Security Group Progress Status

| Status | Description |
|-----------------|--------------|
| `NONE` | No work in progress |
| `CREATING_RULE` | Creating rule policy |
| `UPDATING_RULE` | Modifying rule policy |
| `DELETING_RULE` | Deleting rule policy |

### List DB Security Groups

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.List | List DB Security Groups |

#### Request

```http
GET /v1.0/db-security-groups
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| dbSecurityGroups | Array | DB security groups |
| dbSecurityGroups.dbSecurityGroupId | UUID | DB security group identifier |
| dbSecurityGroups.dbSecurityGroupName | String | Name to identify the DB security group |
| dbSecurityGroups.dbSecurityGroupStatus | Enum | Current status of the DB security group<br/>- `CREATED`: Created<br/>- `DELETED`: Deleted |
| dbSecurityGroups.description | String | Additional information on the DB security group |
| dbSecurityGroups.progressStatus | Enum | Current progress status of the DB security group<br/>- `NONE`: No work in progress<br/>- `CREATING_RULE`: Creating rule policy<br/>- `UPDATING_RULE`: Modifying rule policy<br/>- `DELETING_RULE`: Deleting rule policy<br/>- `APPLYING_DEFAULT_RULE`: Applying default rule |
| dbSecurityGroups.createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbSecurityGroups.updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### Create DB Security Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Create | Create DB Security Group |

#### Request

```http
POST /v1.0/db-security-groups
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbSecurityGroupName | String | Y | Name to identify the DB security group |
| description | String | N | Additional information on the DB security group |
| rules | Array | Y | DB security group rule information |
| rules.direction | Enum | Y | Communication direction<br/>- `INGRESS`: Inbound<br/>- `EGRESS`: Outbound |
| rules.etherType | Enum | Y | Ether type<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6 |
| rules.port | Object | Y | Port object |
| rules.port.portType | Enum | Y | Port type<br/>- `ALL`: All port ranges (not used in the user console)<br/>- `PORT`: Specific port<br/>- `DB_PORT`: DB listening port<br/>- `PORT_RANGE`: Port range |
| rules.port.minPort | Number | N | Minimum port range<br/>- Minimum value: `1` |
| rules.port.maxPort | Number | N | Maximum port range<br/>- Maximum value: `65535` |
| rules.cidr | String | Y | CIDR |
| rules.description | String | N | Additional information on the DB security group rule |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| dbSecurityGroupId | UUID | DB security group identifier |

---

### Delete DB Security Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Delete | Delete DB Security Group |

#### Request

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### List DB Security Group Details

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Get | List DB Security Group Details |

#### Request

```http
GET /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| dbSecurityGroup | Object | DB security group |
| dbSecurityGroup.dbSecurityGroupId | UUID | DB security group identifier |
| dbSecurityGroup.dbSecurityGroupName | String | Name to identify the DB security group |
| dbSecurityGroup.dbSecurityGroupStatus | Enum | Current status of the DB security group<br/>- `CREATED`: Created<br/>- `DELETED`: Deleted |
| dbSecurityGroup.description | String | Additional information on the DB security group |
| dbSecurityGroup.progressStatus | Enum | Current progress status of the DB security group<br/>- `NONE`: No work in progress<br/>- `CREATING_RULE`: Creating rule policy<br/>- `UPDATING_RULE`: Modifying rule policy<br/>- `DELETING_RULE`: Deleting rule policy<br/>- `APPLYING_DEFAULT_RULE`: Applying default rule |
| dbSecurityGroup.rules | Array | DB security group rule list |
| dbSecurityGroup.rules.ruleId | UUID | DB security group rule identifier |
| dbSecurityGroup.rules.description | String | Additional information on the DB security group rule |
| dbSecurityGroup.rules.direction | Enum | Communication direction<br/>- `INGRESS`: Inbound<br/>- `EGRESS`: Outbound |
| dbSecurityGroup.rules.etherType | Enum | Ether type<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6 |
| dbSecurityGroup.rules.port | Object | Port object |
| dbSecurityGroup.rules.port.portType | Enum | Port type<br/>- `ALL`: All port ranges (not used in the user console)<br/>- `PORT`: Specific port<br/>- `DB_PORT`: DB listening port<br/>- `PORT_RANGE`: Port range |
| dbSecurityGroup.rules.port.minPort | Number | Minimum port range |
| dbSecurityGroup.rules.port.maxPort | Number | Maximum port range |
| dbSecurityGroup.rules.cidr | String | CIDR |
| dbSecurityGroup.rules.createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbSecurityGroup.rules.updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbSecurityGroup.createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbSecurityGroup.updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### Modify DB Security Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Modify | Modify DB Security Group |

#### Request

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbSecurityGroupName": "dbSecurityGroupName-example",
"description": "description-example"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbSecurityGroupName | String | Y | Name to identify the DB security group |
| description | String | N | Additional information on the DB security group |

#### Response

This API does not return a response body.

---

### Delete DB Security Group Rule

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroupRule.Delete | Delete DB Security Group Rule |

#### Request

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |
| ruleIds | Query | String | Y | DB security group rule ID list |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Create DB Security Group Rule

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroupRule.Create | Create DB Security Group Rule |

#### Request

```http
POST /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| direction | Enum | Y | Communication direction<br/>- `INGRESS`: Inbound<br/>- `EGRESS`: Outbound |
| etherType | Enum | Y | Ether type<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6 |
| port | Object | Y | Port information |
| port.portType | Enum | Y | Port type<br/>- `ALL`: All port ranges (not used in the user console)<br/>- `PORT`: Specific port<br/>- `DB_PORT`: DB listening port<br/>- `PORT_RANGE`: Port range |
| port.minPort | Number | N | Minimum port range<br/>- Minimum value: `1` |
| port.maxPort | Number | N | Maximum port range<br/>- Maximum value: `65535` |
| cidr | String | Y | CIDR |
| description | String | N | Additional information on the DB security group rule |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Modify DB Security Group Rule

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroupRule.Modify | Modify DB Security Group Rule |

#### Request

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |
| ruleId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| direction | Enum | Y | Communication direction<br/>- `INGRESS`: Inbound<br/>- `EGRESS`: Outbound |
| etherType | Enum | Y | Ether type<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6 |
| port | Object | Y | Port information |
| port.portType | Enum | Y | Port type<br/>- `ALL`: All port ranges (not used in the user console)<br/>- `PORT`: Specific port<br/>- `DB_PORT`: DB listening port<br/>- `PORT_RANGE`: Port range |
| port.minPort | Number | N | Minimum port range<br/>- Minimum value: `1` |
| port.maxPort | Number | N | Maximum port range<br/>- Maximum value: `65535` |
| cidr | String | Y | CIDR |
| description | String | N | Additional information on the DB security group rule |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

## Parameter group

### List Parameter Groups

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.List | List Parameter Groups |

#### Request

```http
GET /v1.0/parameter-groups
```

#### Request Parameter

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbVersion | Query | Enum | N | DB engine version |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| parameterGroups | Array | Parameter groups |
| parameterGroups.parameterGroupId | UUID | Parameter group identifier |
| parameterGroups.parameterGroupName | String | Name to identify parameter groups |
| parameterGroups.description | String | Additional information on parameter group |
| parameterGroups.dbVersion | String | DB version information |
| parameterGroups.parameterGroupStatus | Enum | Parameter group current status<br/>- `STABLE`: Applied<br/>- `NEED_TO_APPLY`: Need to apply<br/>- `DELETED`: Deleted |
| parameterGroups.createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| parameterGroups.updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### Create Parameter Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Create | Create Parameter Group |

#### Request

```http
POST /v1.0/parameter-groups
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"parameterGroupName": "parameterGroupName-example",
"description": "description-example",
"dbVersion": "POSTGRESQL_V14_17"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | Name to identify parameter groups |
| description | String | N | Additional information on parameter group |
| dbVersion | Enum | Y | DB engine version |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| parameterGroupId | UUID | Parameter group identifier |

---

### Delete Parameter Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Delete | Delete Parameter Group |

#### Request

```http
DELETE /v1.0/parameter-groups/{parameterGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | Parameter group identifier |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### List Parameter Group Details

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Get | List Parameter Group Details |

#### Request

```http
GET /v1.0/parameter-groups/{parameterGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | Parameter group identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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
"dbVersion": "POSTGRESQL_V17_10",
"parameterGroupStatus": "STABLE",
"parameters": [
{
"parameterCategory": "Write-Ahead Log / Checkpoints",
"parameterName": "checkpoint_timeout",
"value": "300s",
"valueUnit": "s",
"defaultValue": "300s",
"allowedValue": "30~86400s",
"valueType": "NUMERIC_WITH_TIME_UNIT",
"updateType": "VARIABLE",
"applyType": "BOTH",
"expressionAvailable": true
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

| Name | Type | Description |
|-----|-----|-----|
| parameterGroupId | UUID | Parameter group identifier |
| parameterGroupName | String | Name to identify parameter groups |
| description | String | Additional information on parameter group |
| dbVersion | String | DB version information |
| parameterGroupStatus | Enum | Parameter group current status<br/>- `STABLE`: Applied<br/>- `NEED_TO_APPLY`: Need to apply<br/>- `DELETED`: Deleted |
| parameters | Array | Parameter list |
| parameters.parameterCategory | String | Parameter category |
| parameters.parameterName | String | Parameter name |
| parameters.value | String | Current value |
| parameters.valueUnit | Enum | Unit of the currently configured value<br/>- `B`: Byte<br/>- `kB`: Kilobyte<br/>- `MB`: Megabyte<br/>- `GB`: Gigabyte<br/>- `TB`: Terabyte<br/>- `us`: Microsecond<br/>- `ms`: Millisecond<br/>- `s`: Second<br/>- `min`: Minute<br/>- `h`: Hour<br/>- `d`: Day |
| parameters.defaultValue | String | Default value |
| parameters.allowedValue | String | Permitted values |
| parameters.valueType | Enum | Value type<br/>- `BOOLEAN`: Boolean type (e.g., on, off, true, false, yes, no, 1, 0)<br/>- `STRING`: String type<br/>- `NUMERIC`: Integer and floating-point type<br/>- `NUMERIC_WITH_BYTE_UNIT`: Numeric type in byte units (e.g., 120kB, 100MB)<br/>- `NUMERIC_WITH_TIME_UNIT`: Numeric type in time units (e.g., 120ms, 100s, 1d)<br/>- `ENUMERATED`: Enter one of the values declared in the allowed values<br/>- `MULTI_ENUMERATED`: Enter multiple values declared in the allowed values (separated by commas (,)) |
| parameters.updateType | Enum | Update type<br/>- `VARIABLE`: Dynamic, can be modified at any time<br/>- `CONSTANT`: Cannot be modified |
| parameters.applyType | Enum | Application type<br/>- `BOTH`: Applies to both session and file<br/>- `SESSION`: Applies only to session<br/>- `FILE`: Applies only to file |
| parameters.expressionAvailable | Boolean | Allow formulas or not |
| createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### Modify Parameter Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Modify | Modify Parameter Group |

#### Request

```http
}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | Parameter group identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"parameterGroupName": "parameterGroupName-example",
"description": "description-example"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| parameterGroupName | String | N | Name to identify parameter groups |
| description | String | N | Additional information on parameter group |

#### Response

This API does not return a response body.

---

### Copy Parameter Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Copy | Copy Parameter Group |

#### Request

```http
}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | Parameter group identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"parameterGroupName": "parameterGroupName-example",
"description": "description-example"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | Name to identify parameter groups |
| description | String | N | Additional information on parameter group |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| parameterGroupId | UUID | Parameter group identifier |

---

### Modify Parameter

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Modify | Modify Parameter Group |

#### Request

```http
"parameterName": "parameterName-example",
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | Parameter group identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| modifiedParameters | Array | Y | Parameters to change |
| modifiedParameters.parameterName | String | Y | Parameter name |
| modifiedParameters.value | String | Y | Parameter value to change |

#### Response

This API does not return a response body.

---

### Reset Parameter Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Reset | Reset Parameter Group |

#### Request

```http
This API does not require a request body.
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | Parameter group identifier |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

## User Group

### List User Groups

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.List | List User Groups |

#### Request

```http
"resultCode": 0,
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| userGroups | Array | User Groups |
| userGroups.userGroupId | UUID | User group identifier |
| userGroups.userGroupName | String | Name to identify user groups |
| userGroups.userGroupStatus | Enum | Current status of user groups<br/>- `CREATED`<br/>- `DELETED` |
| userGroups.createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| userGroups.updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### Create User Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Create | Create User Group |

#### Request

```http
"selectAllYN": false
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
]
{
"header": {
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| userGroupName | String | Y | Name to identify user groups |
| memberIds | Array | Y | List of project member identifiers |
| selectAllYN | Boolean | Y | All project members or not<br/>- Default: `false` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
This API does not require a request body.
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| userGroupId | UUID | User group identifier |

---

### Delete User Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Delete | Delete User Group |

#### Request

```http
This API does not require a request body.
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y | User group identifier |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### List User Group Details

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Get | List User Group Details |

#### Request

```http
"resultCode": 0,
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y | User group identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| userGroupId | UUID | User group identifier |
| userGroupName | String | Name to identify user groups |
| userGroupTypeCode | Enum | User group type<br/>- `ENTIRE`: All project members<br/>- `INDIVIDUAL_MEMBER`: Custom |
| userGroupStatus | Enum | Current status of user groups<br/>- `CREATED`<br/>- `DELETED` |
| members | Array | Project member list |
| members.memberId | UUID | Project member identifier |
| createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### Modify User Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Modify | Modify User Group |

#### Request

```http
"selectAllYN": false
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y | User group identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
]
{
"header": {
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| userGroupName | String | N | Name to identify user groups |
| memberIds | Array | N | List of project member identifiers |
| selectAllYN | Boolean | Y | All project members or not<br/>- Default: `false` |

#### Response

This API does not return a response body.

---

## Notification Groups

### List Notification Groups

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.List | List Notification Groups |

#### Request

```http
"resultCode": 0,
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| notificationGroups | Array |  |
| notificationGroups.notificationGroupId | UUID | Notification group identifier |
| notificationGroups.notificationGroupName | String | Name to identify notification groups |
| notificationGroups.notificationGroupStatus | Enum | Current status of notification groups<br/>- `CREATED`: Created<br/>- `DELETED`: Deleted |
| notificationGroups.notifyEmail | Boolean | Whether to be notified by email |
| notificationGroups.notifySms | Boolean | Whether to be notified by SMS |
| notificationGroups.isEnabled | Boolean | Whether it is enabled |
| notificationGroups.createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| notificationGroups.updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### Create Notification Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Create | Create Notification Group |

#### Request

```http
"notifySms": true,
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| notificationGroupName | String | Y | Name to identify notification groups |
| notifyEmail | Boolean | N | Whether to be notified by email<br/>- Default: `true` |
| notifySms | Boolean | N | Whether to be notified by SMS<br/>- Default: `true` |
| isEnabled | Boolean | N | Whether it is enabled<br/>- Default: `true` |
| dbInstanceIds | Array | Y | List of identifiers of DB instances to monitor |
| userGroupIds | Array | Y | List of user group identifiers |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
This API does not require a request body.
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| notificationGroupId | UUID | Notification group identifier |

---

### Delete Watch Setting

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Delete | Delete Watch Setting |

#### Request

```http
This API does not require a request body.
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | Notification group identifier |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### View Notification Group Details

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Get | View Notification Group Details |

#### Request

```http
"resultCode": 0,
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | Notification group identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| notificationGroupId | UUID | Notification group identifier |
| notificationGroupName | String | Name to identify notification groups |
| notificationGroupStatus | Enum | Current status of notification groups<br/>- `CREATED`: Created<br/>- `DELETED`: Deleted |
| notifyEmail | Boolean | Whether to be notified by email |
| notifySms | Boolean | Whether to be notified by SMS |
| isEnabled | Boolean | Whether it is enabled |
| dbInstances | Array | List of DB instances to monitor |
| dbInstances.dbInstanceId | UUID | DB instance identifier |
| dbInstances.dbInstanceName | String | Name to identify DB instances |
| userGroups | Array | List of user groups |
| userGroups.userGroupId | UUID | User group identifier |
| userGroups.userGroupName | String | Name to identify user groups |
| createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### Modify Notification Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Modify | Modify Notification Group |

#### Request

```http
"notifySms": false,
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | Notification group identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| notificationGroupName | String | N | Name to identify notification groups |
| notifyEmail | Boolean | N | Whether to be notified by email<br/>- Default: `false` |
| notifySms | Boolean | N | Whether to be notified by SMS<br/>- Default: `false` |
| isEnabled | Boolean | N | Whether it is enabled<br/>- Default: `false` |
| dbInstanceIds | Array | Y | List of identifiers of DB instances to monitor |
| userGroupIds | Array | Y | List of user group identifiers |

#### Response

This API does not return a response body.

---

### List Watch Settings

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.List | List Watch Settings |

#### Request

```http
"resultCode": 0,
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | Notification group identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| notificationWatchdogs | Array | Watch setting information |
| notificationWatchdogs.watchdogId | UUID | Watch setting identifier |
| notificationWatchdogs.metricName | Enum | Performance metrics to watch |
| notificationWatchdogs.comparisonOperator | Enum | Comparison method for watch target<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: > |
| notificationWatchdogs.threshold | Number | Threshold for watch target |
| notificationWatchdogs.duration | Number | Duration for watch target (min) |
| notificationWatchdogs.createdYmdt | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

### Create Watch Setting

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Create | Create Watch Setting |

#### Request

```http
"threshold": 0,
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | Notification group identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
    "metricName": "CPU_USAGE",
    "comparisonOperator": "LE",
    "threshold": 0,
    "duration": 0
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| metricName | Enum | Y | Performance metrics to watch |
| comparisonOperator | Enum | Y | Comparison method for watch target<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: > |
| threshold | Number | Y | Threshold for watch target<br/>- Minimum value: `0` |
| duration | Number | Y | Duration for watch target (minutes)<br/>- Minimum value: `0` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
This API does not require a request body.
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| watchdogId | UUID | Watch setting identifier |

---

### Delete Watch Setting

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Delete | Delete Watch Setting |

#### Request

```http
<p>
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | Notification group identifier |
| watchdogId | URL | UUID | Y | Watch setting identifier |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### Modify Watch Setting

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Modify | Modify Watch Setting |

#### Request

```http
"threshold": 0,
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | Notification group identifier |
| watchdogId | URL | UUID | Y | Watch setting identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
    "metricName": "CPU_USAGE",
    "comparisonOperator": "LE",
    "threshold": 0,
    "duration": 0
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| metricName | Enum | Y | Performance metrics to watch |
| comparisonOperator | Enum | Y | Comparison method for watch target<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: > |
| threshold | Number | Y | Threshold for watch target<br/>- Minimum value: `0` |
| duration | Number | Y | Duration for watch target (minutes)<br/>- Minimum value: `0` |

#### Response

This API does not return a response body.

---

## Monitoring

### View stats

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Metric.List | View stats |

#### Request

```http
This API does not require a request body.
```

#### Request Parameters
| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | Query | UUID | Y | Identifier of the DB instance |
| metricNames | Query | Array | Y | List of performance metrics to retrieve |
| from | Query | DateTime | Y | Start date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| to | Query | DateTime | Y | End date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| interval | Query | Number | N | Query interval<br/>- Unit: `Minute`<br/>- Default value: An appropriate value is automatically selected based on the start/end date and time |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>
```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "metricStatistics": [
        {
            "metricName": "CPU_USAGE",
            "unit": "%",
            "values": [
                {
                    "timestamp": 1679298540,
                    "value": "7.5%"
                }
            ]
        }
    ]
}
```
</details>
| Name | Type | Description |
|-----|-----|-----|
| metricStatistics | Array | List of statistics |
| metricStatistics.metricName | Enum | Performance metric type |
| metricStatistics.unit | String | Unit of the measured value |
| metricStatistics.values | Array | List of measured values |
| metricStatistics.values.timestamp | Timestamp | Time of measurement |
| metricStatistics.values.value | String | Measured value |

---

### View a list of performance metrics

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Metric.List | View a list of performance metrics |

#### Request

```http
"resultCode": 0,
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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
            "metricName": "CPU_USAGE",
            "unit": "%"
        }
    ]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| metrics | Array | List of performance metrics |
| metrics.metricName | Enum | Performance metric types |
| metrics.unit | String | Measure unit |

---

## Event

### Event category

"header": {

| Event category | Description |
|-------------|---------|
| ALL | All |
| BACKUP | Backup |
| DB_INSTANCE | DB instance |
| JOB | Job |
| TENANT | Tenant |
| MONITORING | Monitoring |

### List subscribable event codes

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Event.List | List subscribable event codes |

#### Request

```http
"resultCode": 0,
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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

| Name | Type | Description |
|-----|-----|-----|
| eventCodes | Array | Event codes |
| eventCodes.eventCode | Enum | Event code |
| eventCodes.eventCategoryType | Enum | Event category type<br/>- `ALL`: All<br/>- `DB_INSTANCE`: Events generated from DB instance<br/>- `DB_SECURITY_GROUP`: Events generated from DB security group<br/>- `MONITORING`: Events generated from monitoring<br/>- `JOB`: Events generated from JOB<br/>- `BACKUP`: Events generated from backup<br/>- `TENANT`: Events generated from tenant |

---

### View the list of events

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Event.List | View the list of events |

#### Request

```http
"resultCode": 0,
```

#### Request Parameters
| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| page | Query | Number | Y | Page of the list to retrieve<br/>- Minimum value: `1` |
| size | Query | Number | Y | Page size of the list to retrieve<br/>- Minimum value: `1`<br/>- Maximum value: `100` |
| from | Query | DateTime | Y | Start date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| to | Query | DateTime | Y | End date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| eventCategoryType | Query | Enum | Y | Event category type to retrieve<br/>- `ALL`: All<br/>- `DB_INSTANCE`: Events that occurred on the DB instance<br/>- `DB_SECURITY_GROUP`: Events that occurred on the DB security group<br/>- `MONITORING`: Events that occurred from monitoring<br/>- `JOB`: Events that occurred from a job<br/>- `BACKUP`: Events that occurred from a backup<br/>- `TENANT`: Events that occurred on the tenant |
| sourceId | Query | UUID | N | Identifier of the target resource where the event occurred |
| keyword | Query | String | N | Search string included in the event message |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

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
                    "message": "DB 인스턴스 시작"
                }
            ],
            "eventYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| totalCounts | Number | Total number of events |
| events | Array | Events |
| events.eventCategoryType | Enum | Event category type<br/>- `ALL`: All<br/>- `DB_INSTANCE`: Events generated from DB instance<br/>- `DB_SECURITY_GROUP`: Events generated from DB security group<br/>- `MONITORING`: Events generated from monitoring<br/>- `JOB`: Events generated from JOB<br/>- `BACKUP`: Events generated from backup<br/>- `TENANT`: Events generated from tenant |
| events.eventCode | Enum | Occurred event type |
| events.sourceId | UUID | Event source identifier |
| events.sourceName | String | Name to identify event sources |
| events.messages | Array | Event messages |
| events.messages.langCode | Enum | Language code<br/>- `KO`<br/>- `EN`<br/>- `JA`<br/>- `ZH` |
| events.messages.message | String | Event message |
| events.eventYmdt | DateTime | Event occurred date and time |

---
