<!-- pre-align:aligned sig=d58a9ac7e400 -->

<a id="rds-for-postgresql-api"></a>
## RDS for PostgreSQL API Guide { #rds-for-postgresql-api }

**Database > RDS for PostgreSQL > API v1.0 Guide**

<a id="common-information"></a>
## Common Information on RDS for PostgreSQL API { #common-information }

<a id="api-endpoint"></a>
### API Endpoint { #api-endpoint }

| Region | Endpoint |
|------|----------|
| Korea (Pangyo) region | https://kr1-rds-postgres.api.nhncloudservice.com |
| Korea (Pyeongchon) region | https://kr2-rds-postgres.api.nhncloudservice.com |


<a id="common-authorization"></a>
### Authentication and Authorization { #common-authorization }

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

<a id="common-response"></a>
### Common Response Information { #common-response }

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

<a id="db-versions"></a>
## DB Version { #db-versions }

<a id="supported-db-engine-versions"></a>
### Supported DB Engine Versions { #supported-db-engine-versions }

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

<a id="get-db-versions"></a>
### View DB Engine Version List { #get-db-versions }

<a id="get-db-versions-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbVersion.List | View DB engine version list |

<a id="get-db-versions-request"></a>
#### Request

```http
GET /v1.0/db-versions
```

<a id="get-db-versions-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-db-versions-response"></a>
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

<a id="db-flavors"></a>
## Specifications of DB Instance { #db-flavors }

<a id="get-db-flavors"></a>
### List DB Instance Specifications { #get-db-flavors }

<a id="get-db-flavors-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbFlavor.List | List DB Instance Specifications |

<a id="get-db-flavors-request"></a>
#### Request

```http
GET /v1.0/db-flavors
```

<a id="get-db-flavors-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-db-flavors-response"></a>
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

<a id="project"></a>
## Project Information { #project }

<a id="get-project-members"></a>
### List Project Members { #get-project-members }

<a id="get-project-members-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Project.Get | List Project Members |

<a id="get-project-members-request"></a>
#### Request

```http
GET /v1.0/project/members
```

<a id="get-project-members-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-project-members-response"></a>
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

<a id="get-project-regions"></a>
### List Regions { #get-project-regions }

<a id="get-project-regions-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Project.Get | List Regions |

<a id="get-project-regions-request"></a>
#### Request

```http
GET /v1.0/project/regions
```

<a id="get-project-regions-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-project-regions-response"></a>
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

<a id="network"></a>
## Network { #network }

<a id="get-subnets"></a>
### List Subnets { #get-subnets }

<a id="get-subnets-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Network.List | List Subnets |

<a id="get-subnets-request"></a>
#### Request

```http
GET /v1.0/network/subnets
```

<a id="get-subnets-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-subnets-response"></a>
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

<a id="storage-types"></a>
## Storage { #storage-types }

<a id="get-storage-types"></a>
### View the List of Storage Types { #get-storage-types }

<a id="get-storage-types-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Storage.List | View the List of Storage Types |

<a id="get-storage-types-request"></a>
#### Request

```http
GET /v1.0/storage-types
```

<a id="get-storage-types-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-storage-types-response"></a>
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

<a id="jobs"></a>
## Task Information { #jobs }

<a id="job-status"></a>
### Task Status { #job-status }

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

<a id="get-job-detail"></a>
### View Task Details { #get-job-detail }

<a id="get-job-detail-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Job.Get | View Task Details |

<a id="get-job-detail-request"></a>
#### Request

```http
GET /v1.0/jobs/{jobId}
```

<a id="get-job-detail-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| jobId | URL | UUID | Y |  |

<a id="get-job-detail-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-job-detail-response"></a>
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

<a id="db-instance-groups"></a>
## DB Instance Group { #db-instance-groups }

<a id="get-db-instance-groups"></a>
### List DB Instance Groups { #get-db-instance-groups }

<a id="get-db-instance-groups-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroup.List | List DB Instance Groups |

<a id="get-db-instance-groups-request"></a>
#### Request

```http
GET /v1.0/db-instance-groups
```

<a id="get-db-instance-groups-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-db-instance-groups-response"></a>
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

<a id="get-db-instance-group"></a>
### List DB Instance Group Details { #get-db-instance-group }

<a id="get-db-instance-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroup.Get | List DB Instance Group Details |

<a id="get-db-instance-group-request"></a>
#### Request

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}
```

<a id="get-db-instance-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y |  |

<a id="get-db-instance-group-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-db-instance-group-response"></a>
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

<a id="get-extensions"></a>
### View Extension List { #get-extensions }

<a id="get-extensions-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.List | View Extension List |

<a id="get-extensions-request"></a>
#### Request

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions
```

<a id="get-extensions-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB instance group identifier |

<a id="get-extensions-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-extensions-response"></a>
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

<a id="apply-extensions"></a>
### Apply Extension Changes { #apply-extensions }

<a id="apply-extensions-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Apply | Apply Extension Changes |

<a id="apply-extensions-request"></a>
#### Request

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/apply
```

<a id="apply-extensions-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB instance group identifier |

<a id="apply-extensions-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="apply-extensions-response"></a>
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

<a id="sync-extensions"></a>
### Synchronize Extensions { #sync-extensions }

<a id="sync-extensions-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Sync | Synchronize Extensions |

<a id="sync-extensions-request"></a>
#### Request

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/sync
```

<a id="sync-extensions-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB instance group identifier |

<a id="sync-extensions-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="sync-extensions-response"></a>
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

<a id="delete-extension"></a>
### Delete Extension (Cancel) { #delete-extension }

<a id="delete-extension-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Delete | Delete Extension (Cancel) |

<a id="delete-extension-request"></a>
#### Request

```http
DELETE /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{dbInstanceGroupExtensionId}
```

<a id="delete-extension-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB instance group identifier |
| dbInstanceGroupExtensionId | URL | UUID | Y | Identifier of the extension within the DB instance group |
| withCascade | Query | Boolean | Y | Whether to force to delete dependency information |

<a id="delete-extension-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="delete-extension-response"></a>
#### Response

This API does not return a response body.

---

<a id="create-extension"></a>
### Install Extension { #create-extension }

<a id="create-extension-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Install | Install Extension |

<a id="create-extension-request"></a>
#### Request

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{extensionId}
```

<a id="create-extension-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB instance group identifier |
| extensionId | URL | UUID | Y | Extension identifier |

<a id="create-extension-request-body"></a>
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

<a id="create-extension-response"></a>
#### Response

This API does not return a response body.

---

<a id="db-instances"></a>
## DB Instance { #db-instances }

<a id="db-instance-status"></a>
### DB Instance Status { #db-instance-status }

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

<a id="db-instance-progress-status"></a>
### DB Instance Progress Status { #db-instance-progress-status }

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

<a id="get-db-instances"></a>
### List DB Instances { #get-db-instances }

<a id="get-db-instances-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.List | List DB instances |

<a id="get-db-instances-request"></a>
#### Request

```http
GET /v1.0/db-instances
```

<a id="get-db-instances-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-db-instances-response"></a>
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

<a id="create-db-instance"></a>
### Create DB Instance { #create-db-instance }

<a id="create-db-instance-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Create | Create DB Instance |

<a id="create-db-instance-request"></a>
#### Request

```http
POST /v1.0/db-instances
```

<a id="create-db-instance-request-body"></a>
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

<a id="create-db-instance-response"></a>
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

<a id="restore-from-object-storage"></a>
### Restore DB Instance from Backup in Object Storage { #restore-from-object-storage }

<a id="restore-from-object-storage-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.RestoreFromObs | Restore DB Instance from Backup in Object Storage |

<a id="restore-from-object-storage-request"></a>
#### Request

```http
POST /v1.0/db-instances/restore-from-obs
```

<a id="restore-from-object-storage-request-body"></a>
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

<a id="restore-from-object-storage-response"></a>
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

<a id="delete-db-instance"></a>
### Delete DB Instance { #delete-db-instance }

<a id="delete-db-instance-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Delete | Delete DB Instance |

<a id="delete-db-instance-request"></a>
#### Request

```http
DELETE /v1.0/db-instances/{dbInstanceId}
```

<a id="delete-db-instance-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="delete-db-instance-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="delete-db-instance-response"></a>
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

<a id="get-db-instance"></a>
### List DB Instance Details { #get-db-instance }

<a id="get-db-instance-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | List DB Instance Details |

<a id="get-db-instance-request"></a>
#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}
```

<a id="get-db-instance-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="get-db-instance-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-db-instance-response"></a>
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

<a id="modify-db-instance"></a>
### Modify DB Instance { #modify-db-instance }

<a id="modify-db-instance-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance |

<a id="modify-db-instance-request"></a>
#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}
```

<a id="modify-db-instance-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="modify-db-instance-request-body"></a>
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

<a id="modify-db-instance-response"></a>
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

<a id="apply-recent-parameter-group"></a>
### Apply Latest Parameter Group to DB Instance { #apply-recent-parameter-group }

<a id="apply-recent-parameter-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Apply Latest Parameter Group to DB Instance |

<a id="apply-recent-parameter-group-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/apply-recent-parameter-group
```

<a id="apply-recent-parameter-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="apply-recent-parameter-group-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="apply-recent-parameter-group-response"></a>
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

<a id="get-available-db-versions-for-current-db-instance"></a>
### Get selectable DB engine versions in the current DB instance { #get-available-db-versions-for-current-db-instance }

<a id="get-available-db-versions-for-current-db-instance-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get selectable DB engine versions in the current DB instance |

<a id="get-available-db-versions-for-current-db-instance-request"></a>
#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/available-db-versions
```

<a id="get-available-db-versions-for-current-db-instance-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="get-available-db-versions-for-current-db-instance-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-available-db-versions-for-current-db-instance-response"></a>
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

<a id="backup-db-instance"></a>
### Backup DB Instance { #backup-db-instance }

<a id="backup-db-instance-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Backup | Backup DB Instance |

<a id="backup-db-instance-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/backup
```

<a id="backup-db-instance-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="backup-db-instance-request-body"></a>
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

<a id="backup-db-instance-response"></a>
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

<a id="get-backup-info"></a>
### Get DB Instance Backup Information { #get-backup-info }

<a id="get-backup-info-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB Instance Backup Information |

<a id="get-backup-info-request"></a>
#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/backup-info
```

<a id="get-backup-info-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="get-backup-info-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-backup-info-response"></a>
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

<a id="modify-backup-info"></a>
### Modify DB Instance Backup Information { #modify-backup-info }

<a id="modify-backup-info-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance Backup Information |

<a id="modify-backup-info-request"></a>
#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/backup-info
```

<a id="modify-backup-info-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="modify-backup-info-request-body"></a>
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

<a id="modify-backup-info-response"></a>
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

<a id="backup-to-object-storage"></a>
### Export after Backing up DB Instance to Object Storage { #backup-to-object-storage }

<a id="backup-to-object-storage-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.BackupToObjectStorage | Export after Backing up DB Instance to Object Storage |

<a id="backup-to-object-storage-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/backup-to-object-storage
```

<a id="backup-to-object-storage-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="backup-to-object-storage-request-body"></a>
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

<a id="backup-to-object-storage-response"></a>
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

<a id="get-databases"></a>
### View the list of databases { #get-databases }

<a id="get-databases-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.List | View the list of databases |

<a id="get-databases-request"></a>
#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/databases
```

<a id="get-databases-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="get-databases-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-databases-response"></a>
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

<a id="create-database"></a>
### Create a database { #create-database }

<a id="create-database-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Create | Create a database |

<a id="create-database-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/databases
```

<a id="create-database-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="create-database-request-body"></a>
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

<a id="create-database-response"></a>
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

<a id="delete-database"></a>
### Delete a database { #delete-database }

<a id="delete-database-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Delete | Delete a database |

<a id="delete-database-request"></a>
#### Request

```http
DELETE /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

<a id="delete-database-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| databaseId | URL | UUID | Y | Database identifier |

<a id="delete-database-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="delete-database-response"></a>
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

<a id="modify-database"></a>
### Modify a database { #modify-database }

<a id="modify-database-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Modify | Modify a database |

<a id="modify-database-request"></a>
#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

<a id="modify-database-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| databaseId | URL | UUID | Y | Database identifier |

<a id="modify-database-request-body"></a>
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

<a id="modify-database-response"></a>
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

<a id="get-users"></a>
### View the list of users { #get-users }

<a id="get-users-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.List | View the list of users |

<a id="get-users-request"></a>
#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/db-users
```

<a id="get-users-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="get-users-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-users-response"></a>
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

<a id="create-db-user"></a>
### Create a user { #create-db-user }

<a id="create-db-user-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Create | Create a user |

<a id="create-db-user-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/db-users
```

<a id="create-db-user-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="create-db-user-request-body"></a>
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

<a id="create-db-user-response"></a>
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

<a id="delete-db-user"></a>
### Delete a user { #delete-db-user }

<a id="delete-db-user-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Delete | Delete a user |

<a id="delete-db-user-request"></a>
#### Request

```http
DELETE /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

<a id="delete-db-user-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| dbUserId | URL | UUID | Y | DB user identifier |

<a id="delete-db-user-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="delete-db-user-response"></a>
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

<a id="modify-db-user"></a>
### Edit a user { #modify-db-user }

<a id="modify-db-user-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Modify | Edit a user |

<a id="modify-db-user-request"></a>
#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

<a id="modify-db-user-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| dbUserId | URL | UUID | Y | DB user identifier |

<a id="modify-db-user-request-body"></a>
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

<a id="modify-db-user-response"></a>
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

<a id="change-deletion-protection"></a>
### Change DB Instance Deletion Protection Settings { #change-deletion-protection }

<a id="change-deletion-protection-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Change DB instance deletion protection settings |

<a id="change-deletion-protection-request"></a>
#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/deletion-protection
```

<a id="change-deletion-protection-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="change-deletion-protection-request-body"></a>
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

<a id="change-deletion-protection-response"></a>
#### Response

This API does not return a response body.

---

<a id="force-restart-db-instance"></a>
### Force Restart DB Instance { #force-restart-db-instance }

<a id="force-restart-db-instance-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.ForceRestart | Force Restart DB Instance |

<a id="force-restart-db-instance-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/force-restart
```

<a id="force-restart-db-instance-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="force-restart-db-instance-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="force-restart-db-instance-response"></a>
#### Response

This API does not return a response body.

---

<a id="get-hba-rules"></a>
### View a list of access control rules { #get-hba-rules }

<a id="get-hba-rules-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.List | View a list of access control rules |

<a id="get-hba-rules-request"></a>
#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/hba-rules
```

<a id="get-hba-rules-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="get-hba-rules-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-hba-rules-response"></a>
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

<a id="create-hba-rule"></a>
### Add Access Control Rules { #create-hba-rule }

<a id="create-hba-rule-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Create | Add access control rules |

<a id="create-hba-rule-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules
```

<a id="create-hba-rule-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="create-hba-rule-request-body"></a>
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

<a id="create-hba-rule-response"></a>
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

<a id="apply-hba-rules"></a>
### Apply Access Control Rules { #apply-hba-rules }

<a id="apply-hba-rules-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Apply access control rules |

<a id="apply-hba-rules-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules/apply
```

<a id="apply-hba-rules-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="apply-hba-rules-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="apply-hba-rules-response"></a>
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

<a id="modify-hba-rule-orders"></a>
### Reorder Access Control Rules { #modify-hba-rule-orders }

<a id="modify-hba-rule-orders-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Modify | Reorder access control rules |

<a id="modify-hba-rule-orders-request"></a>
#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/orders
```

<a id="modify-hba-rule-orders-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="modify-hba-rule-orders-request-body"></a>
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

<a id="modify-hba-rule-orders-response"></a>
#### Response

This API does not return a response body.

---

<a id="delete-hba-configuration"></a>
### Delete Access Control Rules { #delete-hba-configuration }

<a id="delete-hba-configuration-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Delete | Delete access control rules |

<a id="delete-hba-configuration-request"></a>
#### Request

```http
DELETE /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

<a id="delete-hba-configuration-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| hbaRuleId | URL | UUID | Y | Identifier of the access control rule |

<a id="delete-hba-configuration-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="delete-hba-configuration-response"></a>
#### Response

This API does not return a response body.

---

<a id="modify-hba-rule"></a>
### Modify Access Control Rules { #modify-hba-rule }

<a id="modify-hba-rule-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Modify | Modify access control rules |

<a id="modify-hba-rule-request"></a>
#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

<a id="modify-hba-rule-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| hbaRuleId | URL | UUID | Y | Identifier of the access control rule |

<a id="modify-hba-rule-request-body"></a>
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

<a id="modify-hba-rule-response"></a>
#### Response

This API does not return a response body.

---

<a id="get-high-availability"></a>
### Get high availability information { #get-high-availability }

<a id="get-high-availability-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Get | Get high availability information |

<a id="get-high-availability-request"></a>
#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/high-availability
```

<a id="get-high-availability-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="get-high-availability-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-high-availability-response"></a>
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

<a id="modify-high-availability"></a>
### Modify High Availability { #modify-high-availability }

<a id="modify-high-availability-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Modify | Modify High Availability |

<a id="modify-high-availability-request"></a>
#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/high-availability
```

<a id="modify-high-availability-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="modify-high-availability-request-body"></a>
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

<a id="modify-high-availability-response"></a>
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

<a id="pause-high-availability"></a>
### Pause High Availability { #pause-high-availability }

<a id="pause-high-availability-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Pause | Pause High Availability |

<a id="pause-high-availability-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/pause
```

<a id="pause-high-availability-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="pause-high-availability-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="pause-high-availability-response"></a>
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

<a id="repair-high-availability"></a>
### Recover High Availability { #repair-high-availability }

<a id="repair-high-availability-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Repair | Recover High Availability |

<a id="repair-high-availability-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/repair
```

<a id="repair-high-availability-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="repair-high-availability-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="repair-high-availability-response"></a>
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

<a id="resume-high-availability"></a>
### Restart High Availability { #resume-high-availability }

<a id="resume-high-availability-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Resume | Restart High Availability |

<a id="resume-high-availability-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/resume
```

<a id="resume-high-availability-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="resume-high-availability-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="resume-high-availability-response"></a>
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

<a id="split-high-availability"></a>
### Separate High Availability { #split-high-availability }

<a id="split-high-availability-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Split | Separate High Availability |

<a id="split-high-availability-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/split
```

<a id="split-high-availability-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="split-high-availability-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="split-high-availability-response"></a>
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

<a id="get-maintenance-info"></a>
### Get DB instance maintenance information { #get-maintenance-info }

<a id="get-maintenance-info-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB instance maintenance information |

<a id="get-maintenance-info-request"></a>
#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

<a id="get-maintenance-info-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="get-maintenance-info-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-maintenance-info-response"></a>
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

<a id="modify-maintenance-info"></a>
### Modify DB instance maintenance information { #modify-maintenance-info }

<a id="modify-maintenance-info-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB instance maintenance information |

<a id="modify-maintenance-info-request"></a>
#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

<a id="modify-maintenance-info-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="modify-maintenance-info-request-body"></a>
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

<a id="modify-maintenance-info-response"></a>
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

<a id="get-network-info"></a>
### Get DB instance network information { #get-network-info }

<a id="get-network-info-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB instance network information |

<a id="get-network-info-request"></a>
#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/network-info
```

<a id="get-network-info-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="get-network-info-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-network-info-response"></a>
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

<a id="modify-network-info"></a>
### Modify DB instance network information { #modify-network-info }

<a id="modify-network-info-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB instance network information |

<a id="modify-network-info-request"></a>
#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/network-info
```

<a id="modify-network-info-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="modify-network-info-request-body"></a>
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

<a id="modify-network-info-response"></a>
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

<a id="promote-db-instance"></a>
### Promote DB Instance { #promote-db-instance }

<a id="promote-db-instance-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Promote | Promote DB Instance |

<a id="promote-db-instance-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/promote
```

<a id="promote-db-instance-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="promote-db-instance-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="promote-db-instance-response"></a>
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

<a id="replicate-db-instance"></a>
### Create Read Replica { #replicate-db-instance }

<a id="replicate-db-instance-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Replicate | Create read replica |

<a id="replicate-db-instance-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/replicate
```

<a id="replicate-db-instance-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="replicate-db-instance-request-body"></a>
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

<a id="replicate-db-instance-response"></a>
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

<a id="restart-db-instance"></a>
### Restart DB Instance { #restart-db-instance }

<a id="restart-db-instance-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Restart | Restart DB Instance |

<a id="restart-db-instance-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/restart
```

<a id="restart-db-instance-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="restart-db-instance-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="restart-db-instance-response"></a>
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

<a id="get-restoration-info"></a>
### Get DB Instance Restore Information { #get-restoration-info }

<a id="get-restoration-info-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB instance restore information |

<a id="get-restoration-info-request"></a>
#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/restoration-info
```

<a id="get-restoration-info-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="get-restoration-info-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-restoration-info-response"></a>
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

<a id="restore-db-instance"></a>
### Restore DB Instance { #restore-db-instance }

<a id="restore-db-instance-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Restore | Restore DB Instance |

<a id="restore-db-instance-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/restore
```

<a id="restore-db-instance-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="restore-db-instance-request-body"></a>
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

<a id="restore-db-instance-timestamprestore-typetimestamp"></a>
#### Request for point-in-time restore using a timestamp (when restoreType is `TIMESTAMP`)
| Name | Type | Required | Description |
|-----|-----|-----|-----|
| restore.restoreYmdt | DateTime | Y | DB instance restore time (YYYY-MM-DDThh:mm:ss.SSSTZD)<br/>- Restoration is only possible to a time before the most recent restorable time retrieved from the restore information query. |
<a id="restore-db-instance-restore-typebackup"></a>
#### Request for restore using a backup (when restoreType is `BACKUP`)
| Name | Type | Required | Description |
|-----|-----|-----|-----|
| restore.backupId | UUID | Y | Identifier of the backup to use for the restore |

<a id="restore-db-instance-response"></a>
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

<a id="start-db-instance"></a>
### Start DB Instance { #start-db-instance }

<a id="start-db-instance-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Start | Start DB Instance |

<a id="start-db-instance-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/start
```

<a id="start-db-instance-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="start-db-instance-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="start-db-instance-response"></a>
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

<a id="stop-db-instance"></a>
### Stop DB Instance { #stop-db-instance }

<a id="stop-db-instance-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Stop | Stop DB Instance |

<a id="stop-db-instance-request"></a>
#### Request

```http
POST /v1.0/db-instances/{dbInstanceId}/stop
```

<a id="stop-db-instance-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="stop-db-instance-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="stop-db-instance-response"></a>
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

<a id="get-storage-info"></a>
### Get DB Instance Storage Information { #get-storage-info }

<a id="get-storage-info-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | Get DB Instance Storage Information |

<a id="get-storage-info-request"></a>
#### Request

```http
GET /v1.0/db-instances/{dbInstanceId}/storage-info
```

<a id="get-storage-info-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="get-storage-info-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-storage-info-response"></a>
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

<a id="modify-storage-info"></a>
### Modify DB Instance Storage Information { #modify-storage-info }

<a id="modify-storage-info-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance Storage Information |

<a id="modify-storage-info-request"></a>
#### Request

```http
PUT /v1.0/db-instances/{dbInstanceId}/storage-info
```

<a id="modify-storage-info-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

<a id="modify-storage-info-request-body"></a>
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

<a id="modify-storage-info-response"></a>
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

<a id="backups"></a>
## Backup { #backups }

<a id="backup-status"></a>
### Backup Status { #backup-status }

| Status | Description |
|--------------|--------------|
| `BACKING_UP` | Backup in progress |
| `COMPLETED` | Backup completed |
| `DELETING` | Backup being deleted |
| `DELETED` | Backup deleted |
| `ERROR` | Error occurred |

<a id="get-backups"></a>
### Retrieve Backup List { #get-backups }

<a id="get-backups-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Backup.List | Retrieve Backup List |

<a id="get-backups-request"></a>
#### Request

```http
GET /v1.0/backups
```

<a id="get-backups-request-parameters"></a>
#### Request Parameters
| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| page | Query | Number | Y | Page of the list to retrieve<br/>- Minimum value: `1` |
| size | Query | Number | Y | Page size of the list to retrieve<br/>- Minimum value: `1`<br/>- Maximum value: `100` |
| backupType | Query | Enum | N | Backup type<br/>- `AUTO`: Automatic backup<br/>- `MANUAL`: Manual backup |
| dbInstanceId | Query | String | N | Identifier of the source DB instance |
| dbVersion | Query | Enum | N | DB engine version |

<a id="get-backups-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-backups-response"></a>
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

<a id="delete-backup"></a>
### Delete Backup { #delete-backup }

<a id="delete-backup-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Backup.Delete | Delete Backup |

<a id="delete-backup-request"></a>
#### Request

```http
DELETE /v1.0/backups/{backupId}
```

<a id="delete-backup-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y | Backup identifier |

<a id="delete-backup-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="delete-backup-response"></a>
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

<a id="export-backup"></a>
### Export Backup to Object Storage { #export-backup }

<a id="export-backup-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Backup.Export | Export Backup to Object Storage |

<a id="export-backup-request"></a>
#### Request

```http
POST /v1.0/backups/{backupId}/export
```

<a id="export-backup-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y | Backup identifier |

<a id="export-backup-request-body"></a>
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

<a id="export-backup-response"></a>
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

<a id="restore-backup"></a>
### Restore Backup { #restore-backup }

<a id="restore-backup-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Backup.Restore | Restore Backup |

<a id="restore-backup-request"></a>
#### Request

```http
POST /v1.0/backups/{backupId}/restore
```

<a id="restore-backup-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y | Backup identifier |

<a id="restore-backup-request-body"></a>
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

<a id="restore-backup-response"></a>
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

<a id="db-security-groups"></a>
## DB Security Group { #db-security-groups }

<a id="db-security-group-progress-status"></a>
### DB Security Group Progress Status { #db-security-group-progress-status }

| Status | Description |
|-----------------|--------------|
| `NONE` | No work in progress |
| `CREATING_RULE` | Creating rule policy |
| `UPDATING_RULE` | Modifying rule policy |
| `DELETING_RULE` | Deleting rule policy |

<a id="get-db-security-groups"></a>
### List DB Security Groups { #get-db-security-groups }

<a id="get-db-security-groups-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.List | List DB Security Groups |

<a id="get-db-security-groups-request"></a>
#### Request

```http
GET /v1.0/db-security-groups
```

<a id="get-db-security-groups-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-db-security-groups-response"></a>
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

<a id="create-db-security-group"></a>
### Create DB Security Group { #create-db-security-group }

<a id="create-db-security-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Create | Create DB Security Group |

<a id="create-db-security-group-request"></a>
#### Request

```http
POST /v1.0/db-security-groups
```

<a id="create-db-security-group-request-body"></a>
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

<a id="create-db-security-group-response"></a>
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

<a id="delete-db-security-group"></a>
### Delete DB Security Group { #delete-db-security-group }

<a id="delete-db-security-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Delete | Delete DB Security Group |

<a id="delete-db-security-group-request"></a>
#### Request

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}
```

<a id="delete-db-security-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

<a id="delete-db-security-group-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="delete-db-security-group-response"></a>
#### Response

This API does not return a response body.

---

<a id="get-db-security-group"></a>
### List DB Security Group Details { #get-db-security-group }

<a id="get-db-security-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Get | List DB Security Group Details |

<a id="get-db-security-group-request"></a>
#### Request

```http
GET /v1.0/db-security-groups/{dbSecurityGroupId}
```

<a id="get-db-security-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

<a id="get-db-security-group-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-db-security-group-response"></a>
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

<a id="modify-db-security-group"></a>
### Modify DB Security Group { #modify-db-security-group }

<a id="modify-db-security-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Modify | Modify DB Security Group |

<a id="modify-db-security-group-request"></a>
#### Request

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}
```

<a id="modify-db-security-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

<a id="modify-db-security-group-request-body"></a>
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

<a id="modify-db-security-group-response"></a>
#### Response

This API does not return a response body.

---

<a id="delete-db-security-group-rule"></a>
### Delete DB Security Group Rule { #delete-db-security-group-rule }

<a id="delete-db-security-group-rule-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroupRule.Delete | Delete DB Security Group Rule |

<a id="delete-db-security-group-rule-request"></a>
#### Request

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

<a id="delete-db-security-group-rule-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |
| ruleIds | Query | String | Y | DB security group rule ID list |

<a id="delete-db-security-group-rule-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="delete-db-security-group-rule-response"></a>
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

<a id="create-db-security-group-rule"></a>
### Create DB Security Group Rule { #create-db-security-group-rule }

<a id="create-db-security-group-rule-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroupRule.Create | Create DB Security Group Rule |

<a id="create-db-security-group-rule-request"></a>
#### Request

```http
POST /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

<a id="create-db-security-group-rule-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

<a id="create-db-security-group-rule-request-body"></a>
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

<a id="create-db-security-group-rule-response"></a>
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

<a id="modify-db-security-group-rule"></a>
### Modify DB Security Group Rule { #modify-db-security-group-rule }

<a id="modify-db-security-group-rule-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroupRule.Modify | Modify DB Security Group Rule |

<a id="modify-db-security-group-rule-request"></a>
#### Request

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

<a id="modify-db-security-group-rule-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |
| ruleId | URL | UUID | Y |  |

<a id="modify-db-security-group-rule-request-body"></a>
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

<a id="modify-db-security-group-rule-response"></a>
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

<a id="parameter-groups"></a>
## Parameter group { #parameter-groups }

<a id="get-parameter-groups"></a>
### List Parameter Groups { #get-parameter-groups }

<a id="get-parameter-groups-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.List | List Parameter Groups |

<a id="get-parameter-groups-request"></a>
#### Request

```http
GET /v1.0/parameter-groups
```

<a id="get-parameter-groups-request-parameters"></a>
#### Request Parameter

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbVersion | Query | Enum | N | DB engine version |

<a id="get-parameter-groups-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-parameter-groups-response"></a>
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

<a id="create-parameter-group"></a>
### Create Parameter Group { #create-parameter-group }

<a id="create-parameter-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Create | Create Parameter Group |

<a id="create-parameter-group-request"></a>
#### Request

```http
POST /v1.0/parameter-groups
```

<a id="create-parameter-group-request-body"></a>
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

<a id="create-parameter-group-response"></a>
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

<a id="delete-parameter-group"></a>
### Delete Parameter Group { #delete-parameter-group }

<a id="delete-parameter-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Delete | Delete Parameter Group |

<a id="delete-parameter-group-request"></a>
#### Request

```http
DELETE /v1.0/parameter-groups/{parameterGroupId}
```

<a id="delete-parameter-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | Parameter group identifier |

<a id="delete-parameter-group-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="delete-parameter-group-response"></a>
#### Response

This API does not return a response body.

---

<a id="get-parameter-group"></a>
### List Parameter Group Details { #get-parameter-group }

<a id="get-parameter-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Get | List Parameter Group Details |

<a id="get-parameter-group-request"></a>
#### Request

```http
GET /v1.0/parameter-groups/{parameterGroupId}
```

<a id="get-parameter-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | Parameter group identifier |

<a id="get-parameter-group-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-parameter-group-response"></a>
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

<a id="modify-parameter-group"></a>
### Modify Parameter Group { #modify-parameter-group }

<a id="modify-parameter-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Modify | Modify Parameter Group |

<a id="modify-parameter-group-request"></a>
#### Request

```http
}
```

<a id="modify-parameter-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | Parameter group identifier |

<a id="modify-parameter-group-request-body"></a>
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

<a id="modify-parameter-group-response"></a>
#### Response

This API does not return a response body.

---

<a id="copy-parameter-group"></a>
### Copy Parameter Group { #copy-parameter-group }

<a id="copy-parameter-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Copy | Copy Parameter Group |

<a id="copy-parameter-group-request"></a>
#### Request

```http
}
```

<a id="copy-parameter-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | Parameter group identifier |

<a id="copy-parameter-group-request-body"></a>
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

<a id="copy-parameter-group-response"></a>
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

<a id="modify-parameter-group-parameters"></a>
### Modify Parameter { #modify-parameter-group-parameters }

<a id="modify-parameter-group-parameters-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Modify | Modify Parameter Group |

<a id="modify-parameter-group-parameters-request"></a>
#### Request

```http
"parameterName": "parameterName-example",
```

<a id="modify-parameter-group-parameters-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | Parameter group identifier |

<a id="modify-parameter-group-parameters-request-body"></a>
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

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| modifiedParameters | Array | Y | Parameters to change |
| modifiedParameters.parameterName | String | Y | Parameter name |
| modifiedParameters.value | String | Y | Parameter value to change |

<a id="modify-parameter-group-parameters-response"></a>
#### Response

This API does not return a response body.

---

<a id="reset-parameter-group"></a>
### Reset Parameter Group { #reset-parameter-group }

<a id="reset-parameter-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Reset | Reset Parameter Group |

<a id="reset-parameter-group-request"></a>
#### Request

```http
This API does not require a request body.
```

<a id="reset-parameter-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | Parameter group identifier |

<a id="reset-parameter-group-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="reset-parameter-group-response"></a>
#### Response

This API does not return a response body.

---

<a id="user-groups"></a>
## User Group { #user-groups }

<a id="get-user-groups"></a>
### List User Groups { #get-user-groups }

<a id="get-user-groups-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.List | List User Groups |

<a id="get-user-groups-request"></a>
#### Request

```http
"resultCode": 0,
```

<a id="get-user-groups-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-user-groups-response"></a>
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

<a id="create-user-group"></a>
### Create User Group { #create-user-group }

<a id="create-user-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Create | Create User Group |

<a id="create-user-group-request"></a>
#### Request

```http
"selectAllYN": false
```

<a id="create-user-group-request-body"></a>
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

<a id="create-user-group-response"></a>
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

<a id="delete-user-group"></a>
### Delete User Group { #delete-user-group }

<a id="delete-user-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Delete | Delete User Group |

<a id="delete-user-group-request"></a>
#### Request

```http
This API does not require a request body.
```

<a id="delete-user-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y | User group identifier |

<a id="delete-user-group-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="delete-user-group-response"></a>
#### Response

This API does not return a response body.

---

<a id="get-user-group"></a>
### List User Group Details { #get-user-group }

<a id="get-user-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Get | List User Group Details |

<a id="get-user-group-request"></a>
#### Request

```http
"resultCode": 0,
```

<a id="get-user-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y | User group identifier |

<a id="get-user-group-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-user-group-response"></a>
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

<a id="modify-user-group"></a>
### Modify User Group { #modify-user-group }

<a id="modify-user-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Modify | Modify User Group |

<a id="modify-user-group-request"></a>
#### Request

```http
"selectAllYN": false
```

<a id="modify-user-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y | User group identifier |

<a id="modify-user-group-request-body"></a>
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

<a id="modify-user-group-response"></a>
#### Response

This API does not return a response body.

---

<a id="notification-groups"></a>
## Notification Groups { #notification-groups }

<a id="get-notification-groups"></a>
### List Notification Groups { #get-notification-groups }

<a id="get-notification-groups-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.List | List Notification Groups |

<a id="get-notification-groups-request"></a>
#### Request

```http
"resultCode": 0,
```

<a id="get-notification-groups-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-notification-groups-response"></a>
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

<a id="create-notification-group"></a>
### Create Notification Group { #create-notification-group }

<a id="create-notification-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Create | Create Notification Group |

<a id="create-notification-group-request"></a>
#### Request

```http
"notifySms": true,
```

<a id="create-notification-group-request-body"></a>
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

<a id="create-notification-group-response"></a>
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

<a id="delete-notification-group"></a>
### Delete Notification Group { #delete-notification-group }

<!-- TODO: translate body -->

<a id="delete-notification-group-permission"></a>
#### Required Permission

<!-- TODO: translate body -->

<a id="delete-notification-group-request"></a>
#### Request

<!-- TODO: translate body -->

<a id="delete-notification-group-request-parameters"></a>
#### Request Parameter

<!-- TODO: translate body -->

<a id="delete-notification-group-request-body"></a>
#### Request Body

<!-- TODO: translate body -->

<a id="delete-notification-group-response"></a>
#### Response

<!-- TODO: translate body -->

<a id="get-notification-group"></a>
### View Notification Group Details { #get-notification-group }

<a id="get-notification-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Get | View Notification Group Details |

<a id="get-notification-group-request"></a>
#### Request

```http
"resultCode": 0,
```

<a id="get-notification-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | Notification group identifier |

<a id="get-notification-group-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-notification-group-response"></a>
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

<a id="modify-notification-group"></a>
### Modify Notification Group { #modify-notification-group }

<a id="modify-notification-group-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Modify | Modify Notification Group |

<a id="modify-notification-group-request"></a>
#### Request

```http
"notifySms": false,
```

<a id="modify-notification-group-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | Notification group identifier |

<a id="modify-notification-group-request-body"></a>
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

<a id="modify-notification-group-response"></a>
#### Response

This API does not return a response body.

---

<a id="get-notification-watchdogs"></a>
### List Watch Settings { #get-notification-watchdogs }

<a id="get-notification-watchdogs-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.List | List Watch Settings |

<a id="get-notification-watchdogs-request"></a>
#### Request

```http
"resultCode": 0,
```

<a id="get-notification-watchdogs-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | Notification group identifier |

<a id="get-notification-watchdogs-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-notification-watchdogs-response"></a>
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

<a id="create-notification-watchdog"></a>
### Create Watch Setting { #create-notification-watchdog }

<a id="create-notification-watchdog-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Create | Create Watch Setting |

<a id="create-notification-watchdog-request"></a>
#### Request

```http
"threshold": 0,
```

<a id="create-notification-watchdog-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | Notification group identifier |

<a id="create-notification-watchdog-request-body"></a>
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

<a id="create-notification-watchdog-response"></a>
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

<a id="delete-notification-watchdog"></a>
### Delete Watch Setting { #delete-notification-watchdog }

<a id="delete-notification-watchdog-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Delete | Delete Watch Setting |

<a id="delete-notification-watchdog-request"></a>
#### Request

```http
<p>
```

<a id="delete-notification-watchdog-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | Notification group identifier |
| watchdogId | URL | UUID | Y | Watch setting identifier |

<a id="delete-notification-watchdog-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="delete-notification-watchdog-response"></a>
#### Response

This API does not return a response body.

---

<a id="modify-notification-watchdog"></a>
### Modify Watch Setting { #modify-notification-watchdog }

<a id="modify-notification-watchdog-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Modify | Modify Watch Setting |

<a id="modify-notification-watchdog-request"></a>
#### Request

```http
"threshold": 0,
```

<a id="modify-notification-watchdog-request-parameters"></a>
#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | Notification group identifier |
| watchdogId | URL | UUID | Y | Watch setting identifier |

<a id="modify-notification-watchdog-request-body"></a>
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

<a id="modify-notification-watchdog-response"></a>
#### Response

This API does not return a response body.

---

<a id="metric-statistics"></a>
## Monitoring { #metric-statistics }

<a id="get-metric-statistics"></a>
### View stats { #get-metric-statistics }

<a id="get-metric-statistics-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Metric.List | View stats |

<a id="get-metric-statistics-request"></a>
#### Request

```http
This API does not require a request body.
```

<a id="get-metric-statistics-request-parameters"></a>
#### Request Parameters
| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | Query | UUID | Y | Identifier of the DB instance |
| metricNames | Query | Array | Y | List of performance metrics to retrieve |
| from | Query | DateTime | Y | Start date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| to | Query | DateTime | Y | End date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| interval | Query | Number | N | Query interval<br/>- Unit: `Minute`<br/>- Default value: An appropriate value is automatically selected based on the start/end date and time |

<a id="get-metric-statistics-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-metric-statistics-response"></a>
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

<a id="get-metrics"></a>
### View a list of performance metrics { #get-metrics }

<a id="get-metrics-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Metric.List | View a list of performance metrics |

<a id="get-metrics-request"></a>
#### Request

```http
"resultCode": 0,
```

<a id="get-metrics-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-metrics-response"></a>
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

<a id="event-codes"></a>
## Event { #event-codes }

<a id="event-category"></a>
### Event category { #event-category }

"header": {

| Event category | Description |
|-------------|---------|
| ALL | All |
| BACKUP | Backup |
| DB_INSTANCE | DB instance |
| JOB | Job |
| TENANT | Tenant |
| MONITORING | Monitoring |

<a id="get-event-codes"></a>
### List subscribable event codes { #get-event-codes }

<a id="get-event-codes-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Event.List | List subscribable event codes |

<a id="get-event-codes-request"></a>
#### Request

```http
"resultCode": 0,
```

<a id="get-event-codes-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-event-codes-response"></a>
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

<a id="get-events"></a>
### View the list of events { #get-events }

<a id="get-events-permission"></a>
#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforPostgreSQL:Event.List | View the list of events |

<a id="get-events-request"></a>
#### Request

```http
"resultCode": 0,
```

<a id="get-events-request-parameters"></a>
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

<a id="get-events-request-body"></a>
#### Request Body

This API does not require a request body.

<a id="get-events-response"></a>
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
