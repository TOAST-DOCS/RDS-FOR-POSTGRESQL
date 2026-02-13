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

## DB version

| DB version        | Available for creation |
|-------------------|------------------------|
| POSTGRESQL_V14_6  |                        |
| POSTGRESQL_V14_15 |                        |
| POSTGRESQL_V14_17 | O                      |
| POSTGRESQL_V14_19 | O                      |
| POSTGRESQL_V17_2  |                        |
| POSTGRESQL_V17_4  | O                      |
| POSTGRESQL_V17_6  | O                      |

* You can use that value for dbVersion fields of type ENUM.
* Depending on the version, there may be some cases where it is not possible to create or restore.

### View DB Version List

```http
GET /v1.0/db-versions
```

#### Required permissions

| Permission Name                 | Description          |
|---------------------------------|----------------------|
| RDSforPostgreSQL:DbVersion.List | View DB Version List |

#### Request

This API does not require a request body.

#### Response

| Name                         | Type | Format  | Description                                           |
|------------------------------|------|---------|-------------------------------------------------------|
| dbVersions                   | Body | Array   | DB version list                                       |
| dbVersions.dbVersion         | Body | String  | DB version                                            |
| dbVersions.dbVersionName     | Body | String  | DB version name                                       |
| dbVersions.restorableFromObs | Body | Boolean | Restoring backup from object storage available or not |

<details><summary>Example</summary>

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

## Specifications of DB Instance

### List DB Instance Specifications

```http
GET /v1.0/db-flavors
```

#### Required permissions

| Permission Name                            | Description               |
|--------------------------------|------------------|
| RDSforPostgreSQL:DbFlavor.List | List DB Instance Specifications |

#### Request

This API does not require a request body.

#### Response

| Name                     | Type   | Format     | Description              |
|------------------------|------|--------|-----------------|
| dbFlavors              | Body | Array  | List of DB instance specifications   |
| dbFlavors.dbFlavorId   | Body | UUID   | Identifier of DB instance specifications |
| dbFlavors.dbFlavorName | Body | String | Name of DB instance specifications   |
| dbFlavors.ram          | Body | Number | Memory size (MB)      |
| dbFlavors.vcpus        | Body | Number | CPU cores        |

<details><summary>Example</summary>

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

## Project Information

### List Regions

```http
GET /v1.0/project/regions
```

#### Required permissions

| Permission Name                          | Description         |
|------------------------------|------------|
| RDSforPostgreSQL:Project.Get | Get project information |

#### Request

This API does not require a request body.

#### Response

| Name                 | Type   | Format      | Description                           |
|--------------------|------|---------|------------------------------|
| regions            | Body | Array   | Region list                        |
| regions.regionCode | Body | Enum    | Region code<br/>`KR1`: Korea (Pangyo) Region |
| regions.isEnabled  | Body | Boolean | Whether to enable a region                   |

<details><summary>Example</summary>

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

### List Project Members

```http
GET /v1.0/project/members
```

#### Required permissions

| Permission Name                          | Description         |
|------------------------------|------------|
| RDSforPostgreSQL:Project.Get | Get project information |

#### Request

This API does not require a request body.

#### Response

| Name                   | Type   | Format     | Description              |
|----------------------|------|--------|-----------------|
| members              | Body | Array  | Project member list      |
| members.memberId     | Body | UUID   | Project member identifier    |
| members.memberName   | Body | String | Project member name     |
| members.emailAddress | Body | String | Project member email address |
| members.phoneNumber  | Body | String | Project member mobile   |

<details><summary>Example</summary>

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
            "memberName": "Hong Gildong",
            "emailAddress": "gildong.hong@nhn.com",
            "phoneNumber": "+821012345678"
        }
    ]
}
```
</details>

## Network

### List Subnets

```http
GET /v1.0/network/subnets
```

#### Required permissions

| Permission Name                           | Description        |
|-------------------------------|-----------|
| RDSforPostgreSQL:Network.List | List Subnets |

#### Request

This API does not require a request body.

#### Response

| Name                       | Type   | Format      | Description               |
|--------------------------|------|---------|------------------|
| subnets                  | Body | Array   | Subnet list           |
| subnets.subnetId         | Body | UUID    | Subnet identifier         |
| subnets.subnetName       | Body | String  | Name to identify subnets |
| subnets.subnetCidr       | Body | String  | CIDR of subnet        |
| subnets.usingGateway     | Body | Boolean | Whether to use gateway      |
| subnets.availableIpCount | Body | Number  | Number of available IPs      |

<details>
<summary>Example</summary>

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

## Storage

### View the list of storage types

```http
GET /v1.0/storage-types
```

#### Required permissions

| Permission Name                           | Description            |
|-------------------------------|---------------|
| RDSforPostgreSQL:Storage.List | View the list of storage types |

#### Request

This API does not require a request body.

#### Response

| Name           | Type   | Format    | Description         |
|--------------|------|-------|------------|
| storageTypes | Body | Array | List of storage types |

<details><summary>Example</summary>

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

## Task Information

### List Task Details

```http
GET /v3.0/jobs/{jobId}
```

#### Required permissions

| Permission Name                      | Description          |
|--------------------------|-------------|
| RDSforPostgreSQL:Job.Get | List Task Details |

#### Request

This API does not require a request body.

| Name    | Type  | Format   | Required | Description      |
|-------|-----|------|----|---------|
| jobId | URL | UUID | O  | Task identifier |

#### Response

| Name                             | Type   | Format       | Description                                                                                                                                                                                                                                                                                                                                                                                                              |
|--------------------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| jobId                          | Body | UUID     | Task identifier                                                                                                                                                                                                                                                                                                                                                                                                         |
| jobStatus                      | Body | Enum     | Current task status<br/>- `PREPARING`: If the task is being prepared<br/>- `READY`: When the task is ready<br/>- `RUNNING`: If the task is in progress<br/>- `COMPLETED`: When the task is complete<br/>- `REGISTERED`: If the task is registered<br/>- `WAIT_TO_REGISTER`: If the job is waiting to be registered<br/>- `INTERRUPTED`: If an interrupt occurred while the operation was in progress.<br/>- `CANCELED`: If the task is canceled<br/>- `FAILED`: If the operation failed<br/>- `ERROR`: If an error occurred while the operation was in progress<br/>- `DELETED`: If the task has been deleted<br/>- `FAIL_TO_READY`: The job failed to be ready. |
| resourceRelations              | Body | Array    | Relevant resource list                                                                                                                                                                                                                                                                                                                                                                                                       |
| resourceRelations.resourceType | Body | Enum     | Relevant resource type<br/>- `DB_INSTANCE`: DB instance<br/>- `DB_INSTANCE_GROUP`: DB instance group<br/>- `DB_SECURITY_GROUP`: DB security group<br/>- `PARAMETER_GROUP`: Parameter Group<br/>- `BACKUP`: Backup<br/>- `TENANT`: Tenant                                                                                                                                                                                                                        |
| resourceRelations.resourceId   | Body | UUID     | Relevant resource identifier                                                                                                                                                                                                                                                                                                                                                                                                     |
| createdYmdt                    | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                                                                                                                                                                                                                                               |
| updatedYmdt                    | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                                                                                                                                                                                                                                               |

<details><summary>Example</summary>

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

## DB Instance Group

### List DB Instances

```http
GET /v1.0/db-instance-groups
```

#### Required permissions

| Permission Name                                   | Description               |
|---------------------------------------|------------------|
| RDSforPostgreSQL:DbInstanceGroup.List | List DB Instances |

#### Request

This API does not require a request body.

#### Response

| Name                                     | Type   | Format       | Description                                                          |
|----------------------------------------|------|----------|-------------------------------------------------------------|
| dbInstanceGroups                       | Body | Array    | DB instance groups                                               |
| dbInstanceGroups.dbInstanceGroupId     | Body | UUID     | DB instance group identifier                                             |
| dbInstanceGroups.dbInstanceGroupStatus | Body | Enum     | Current status of DB instance groups<br/>- `CREATED: Created`<br/>- `DELETED`: Deleted |
| dbInstanceGroups.replicationType       | Body | Enum     | DB instance group replication type<br/>- `STANDALONE`: Standalone                    |
| dbInstanceGroups.createdYmdt           | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                           |
| dbInstanceGroups.updatedYmdt           | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                           |

<details><summary>Example</summary>

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


### List DB Instance Group Details

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}
```

#### Required permissions

| Permission Name                                  | Description               |
|--------------------------------------|------------------|
| RDSforPostgreSQL:DbInstanceGroup.Get | List DB Instance Group Details |

#### Request

This API does not require a request body.

| Name                | Type  | Format   | Required | Description              |
|-------------------|-----|------|----|-----------------|
| dbInstanceGroupId | URL | UUID | O  | DB instance group identifier |

#### Response

| Name                           | Type   | Format       | Description                                                                                                                                    |
|------------------------------|------|----------|---------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceGroupId            | Body | UUID     | DB instance group identifier                                                                                                                       |
| dbInstanceGroupStatus        | Body | Enum     | Current status of DB instance groups<br/>- `CREATED: Created`<br/>- `DELETED`: Deleted                                                                           |
| replicationType              | Body | Enum     | DB instance group replication type<br/>- `STANDALONE`: Standalone<br/>- `HIGH_AVAILABILITY`: High availability                                                              |
| dbInstances                  | Body | Array    | DB instances belong to DB instance group                                                                                                             |
| dbInstances.dbInstanceId     | Body | UUID     | DB instance identifier                                                                                                                          |
| dbInstances.dbInstanceType   | Body | Enum     | DB instance role type<br/>- `MASTER`: Master<br/>- `FAILED_MASTER`: Failed over master<br/>- `CANDIDATE_MASTER`: Candidate master<br/>- `READ_ONLY_SLAVE`: Read replica |
| dbInstances.dbInstanceStatus | Body | Enum     | DB instance current status                                                                                                                        |
| createdYmdt                  | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |
| updatedYmdt                  | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |

<details><summary>Example</summary>

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


## DB Instance Group > Manage Extensions

### View Extension List

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions
```

#### Required Permission

| Permission name                                            | Description       |
|------------------------------------------------|----------|
| RDSforPostgreSQL:DbInstanceGroupExtension.List | View extension lists |

#### Request

This API does not require a request body.

| Name                | Type  | Format   | Required | Description              |
|-------------------|-----|------|----|-----------------|
| dbInstanceGroupId | URL | UUID | O  | Identifier of DB instance group |

#### Response

| Name                                                  | Type   | Format      | Description                                                                                                                                                                                              |
|-----------------------------------------------------|------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| extensions                                          | Body | Array   | Extension list                                                                                                                                                                                           |
| extensions.extensionId                              | Body | UUID    | Identifier of the extension                                                                                                                                                                                         |
| extensions.extensionName                            | Body | String  | Extension name                                                                                                                                                                                           |
| extensions.extensionStatus                          | Body | ENUM    | Extension status<br/>- `AVAILABLE`: available<br/>- `NEED_TO_APPLY`: need to apply<br/>- `APPLYING`: applying                                                                                                               |
| extensions.databases                                | Body | Array   | Database information with installed extensions                                                                                                                                                                               |
| extensions.databases.dbInstanceGroupExtensionId     | Body | UUID    | Identifier of an extension within a DB instance group                                                                                                                                                                            |
| extensions.databases.dbInstanceGroupExtensionStatus | Body | ENUM    | Extension status within a DB instance group<br/>- `CREATED`: created<br/>- `INSTALLED`: installed<br/>- `INSTALLING`: installing<br/>- `INSTALL_ERROR`: installation error<br/>- `DELETED`: deleted<br/>- `DELETING`: deleting<br/>- `DELETE_ERROR`: deletion error |
| extensions.databases.databaseId                     | Body | UUID    | Identifier of the database                                                                                                                                                                                     |
| extensions.databases.databaseName                   | Body | String  | Database name                                                                                                                                                                                       |
| extensions.databases.reservedAction                 | Body | ENUM    | Scheduled Task<br/>- `NONE`: none<br/>- `INSTALL`: scheduled installation (need to apply)<br/>- `INSTALL_WITH_CASCADE`: scheduled forced installation (need to apply)<br/>- `DELETE`: scheduled deletion (need to apply)<br/>- `DELETE_WITH_CASCADE`: scheduled forced deletion (need to apply)                |
| extensions.databases.errorReason                    | Body | String  | Reason for Error                                                                                                                                                                                           |
| isNeedToApply                                       | Body | Boolean | Whether to apply changes                                                                                                                                                                                  |

<details><summary>Example</summary>

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


### Install Extensions

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{extensionId}
```

#### Required Permission

| Permission name                                               | Description    |
|---------------------------------------------------|-------|
| RDSforPostgreSQL:DbInstanceGroupExtension.Install | Install extensions |

#### Request

This API does not require a request body.

| Name                | Type   | Format      | Required | Description                |
|-------------------|------|---------|----|-------------------|
| dbInstanceGroupId | URL  | UUID    | O  | Identifier of DB instance group   |
| extensionId       | URL  | UUID    | O  | Identifier of the extension           |
| databaseId        | Body | UUID    | O  | Identifier of the database to be installed |
| schemaName        | Body | String  | O  | Name of the schema to be installed      |
| withCascade       | Body | Boolean | X  | Whether to force installation of dependency information    |

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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


### Delete Extensions (Cancel)

```http
DELETE /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{dbInstanceGroupExtensionId}
```

#### Required Permission

| Permission name                                              | Description        |
|--------------------------------------------------|-----------|
| RDSforPostgreSQL:DbInstanceGroupExtension.Delete | Delete extensions (cancel) |

#### Request

This API does not require a request body.

| Name                         | Type    | Format      | Required | Description                   |
|----------------------------|-------|---------|----|----------------------|
| dbInstanceGroupId          | URL   | UUID    | O  | Identifier of DB instance group      |
| dbInstanceGroupExtensionId | URL   | UUID    | O  | Identifier of the extension within the DB instance group |
| withCascade                | Query | Boolean | O  | Whether to force installation of dependency information       |

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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


### Apply Extension Changes

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/apply
```

#### Required Permission

| Permission name                                             | Description         |
|-------------------------------------------------|------------|
| RDSforPostgreSQL:DbInstanceGroupExtension.Apply | Apply extension changes |

#### Request

This API does not require a request body.

| Name                         | Type    | Format      | Required | Description                   |
|----------------------------|-------|---------|----|----------------------|
| dbInstanceGroupId          | URL   | UUID    | O  | Identifier of DB instance group      |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of the requested task |

<details><summary>Example</summary>

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


### Synchronize Extensions

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/sync
```

#### Required Permission

| Permission name                                            | Description     |
|------------------------------------------------|--------|
| RDSforPostgreSQL:DbInstanceGroupExtension.Sync | Synchronize Extensions |

#### Request

This API does not require a request body.

| Name                         | Type    | Format      | Required | Description                   |
|----------------------------|-------|---------|----|----------------------|
| dbInstanceGroupId          | URL   | UUID    | O  | Identifier of DB instance group      |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of the requested task |

<details><summary>Example</summary>

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


## DB Instance

### DB Instance Status

| Status                  | Description                          |
|---------------------|-----------------------------|
| `AVAILABLE`         | DB instance is available          |
| `BEFORE_CREATE`     | Before creating a DB instance           |
| `STORAGE_FULL`      | Insufficient DB instance storage         |
| `FAIL_TO_CREATE`    | Failed to create DB instance          |
| `FAIL_TO_CONNECT`   | Failed to connect DB instance          |
| `REPLICATION_STOP`  | Replication of DB instance is stopped         |
| `REPLICATION_DELAY` | When replication of a DB instance is delayed       |
| `FAILOVER`          | When failover of a highly available DB instance is complete |
| `SHUTDOWN`          | DB instance is stopped             |
| `DELETED`           | DB instance is deleted             |

### DB Instance Progress Status

| Status                              | Description             |
|---------------------------------|----------------|
| `APPLYING_DB_INSTANCE_HBA_RULE` | Applying an access control rule  |
| `APPLYING_PARAMETER_GROUP`      | Parameter group is being applied   |
| `APPLYING_EXTENSION`            | Applying an extension        |
| `BACKING_UP`                    | Backing up           |
| `CANCELING`                     | Canceling           |
| `CREATING`                      | Creating           |
| `CREATING_DATABASE`             | Creating a database	   |
| `CREATING_USER`                 | Creating user	      |
| `DELETING`                      | Deleting           |
| `DELETING_DATABASE`             | Deleting a database    |
| `DELETING_USER`                 | Deleting user       |
| `EXPORTING_BACKUP`              | Exporting a backup     |
| `FAILING_OVER`                  | Under failover        |
| `MIGRATING`                     | Under migration       |
| `MODIFYING`                     | Under modification           |
| `OCCUPIED`                      | Occupied           |
| `PREPARING`                     | In preparation           |
| `PROMOTING`                     | Promoting           |
| `PROMOTING_FORCIBLY`            | Force Promoting        |
| `REBUILDING`                    | Rebuilding          |
| `REPAIRING`                     | Recovering           |
| `REPLICATING`                   | Replicating           |
| `RESTARTING`                    | Restarting          |
| `RESTARTING_FORCIBLY`           | Force restarting       |
| `RESTORING`                     | Restoring           |
| `STARTING`                      | Starting           |
| `STOPPING`                      | Stopping           |
| `SYNCING_DATABASE`              | Synchronizing the database   |
| `SYNCING_USER`                  | Synchronizing user	     |
| `SYNCING_EXTENSION`             | Synchronizing extensions	      |
| `UPDATING_USER`                 | Modifying user	      |
| `UPDATING_DATABASE`             | Modifying the database	   |
| `WAIT_MANUAL_CONTROL`           | Waiting for manual failover	 |

### List DB instances

```http
GET /v1.0/db-instances
```

#### Required permissions

| Permission Name                              | Description            |
|----------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.List | List DB instances |

#### Request

This API does not require a request body.

#### Response

| Name                            | Type   | Format       | Description                                                                                                                                    |
|-------------------------------|------|----------|---------------------------------------------------------------------------------------------------------------------------------------|
| dbInstances                   | Body | Array    | DB instances                                                                                                                            |
| dbInstances.dbInstanceId      | Body | UUID     | DB instance identifier                                                                                                                          |
| dbInstances.dbInstanceGroupId | Body | UUID     | DB instance group identifier                                                                                                                       |
| dbInstances.dbInstanceName    | Body | String   | Name to identify DB instances                                                                                                                  |
| dbInstances.description       | Body | String   | Additional information on DB instances                                                                                                                     |
| dbInstances.dbVersion         | Body | Enum     | DB version information                                                                                                                              |
| dbInstances.dbPort            | Body | Number   | DB port                                                                                                                                 |
| dbInstances.dbInstanceType    | Body | Enum     | DB instance role type<br/>- `MASTER`: Master<br/>- `FAILED_MASTER`: Failed over master<br/>- `CANDIDATE_MASTER`: Candidate master<br/>- `READ_ONLY_SLAVE`: Read replica |
| dbInstances.dbInstanceStatus  | Body | Enum     | DB instance current status                                                                                                                        |
| dbInstances.progressStatus    | Body | Enum     | DB instance current status                                                                                                                     |
| dbInstances.createdYmdt       | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |
| dbInstances.updatedYmdt       | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |

<details><summary>Example</summary>

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


### List DB Instance Details

```http
GET /v1.0/db-instances/{dbInstanceId}
```

#### Required permissions

| Permission Name                             | Description            |
|---------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.Get | List DB Instance Details |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name                        | Type   | Format       | Description                                                                                                                                    |
|---------------------------|------|----------|---------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId              | Body | UUID     | DB instance identifier                                                                                                                          |
| dbInstanceGroupId         | Body | UUID     | DB instance group identifier                                                                                                                       |
| dbInstanceName            | Body | String   | Name to identify DB instances                                                                                                                  |
| description               | Body | String   | Additional information on DB instances                                                                                                                     |
| dbVersion                 | Body | Enum     | DB version information                                                                                                                              |
| dbPort                    | Body | Number   | DB port                                                                                                                                 |
| dbInstanceType            | Body | Enum     | DB instance role type<br/>- `MASTER`: Master<br/>- `FAILED_MASTER`: Failed over master<br/>- `CANDIDATE_MASTER`: Candidate master<br/>- `READ_ONLY_SLAVE`: Read replica |
| dbInstanceStatus          | Body | Enum     | DB instance current status                                                                                                                        |
| progressStatus            | Body | Enum     | Current task status of DB instance                                                                                                                  |
| dbFlavorId                | Body | UUID     | Identifier of DB instance specifications                                                                                                                       |
| parameterGroupId          | Body | UUID     | Parameter group identifier applied to DB instance                                                                                                             |
| dbSecurityGroupIds        | Body | Array    | DB security group identifiers applied to DB instance                                                                                                         |
| notificationGroupIds      | Body | Array    | List of identifiers of notification groups applied to the DB instance                                                                                                            |
| useDeletionProtection     | Body | Boolean  | Whether to protect DB instance against deletion                                                                                                                      |
| needToApplyParameterGroup | Body | Boolean  | Need to apply the latest parameter group                                                                                                                   |
| needMigration             | Body | Boolean  | Need to migrate                                                                                                                          |
| osVersion                 | Body | String   | OS Version                                                                                                                               |
| createdYmdt               | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |
| updatedYmdt               | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |

<details><summary>Example</summary>

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

### Create DB Instance

```http
POST /v1.0/db-instances
```

#### Required permissions

| Permission Name                                | Description           |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Create | Create DB Instance |

#### Request

| Name                                       | Type   | Format      | Required | Description                                                                                                                                                                                                                   |
|------------------------------------------|------|---------|----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceName                           | Body | String  | O  | Name to identify DB instances                                                                                                                                                                                                 |
| description                              | Body | String  | X  | Additional information on DB instances                                                                                                                                                                                                    |
| dbFlavorId                               | Body | UUID    | O  | Identifier of DB instance specifications                                                                                                                                                                                                      |
| dbVersion                                | Body | Enum    | O  | DB version information                                                                                                                                                                                                             |
| dbPort                                   | Body | Number  | O  | DB port<br/>- Minimum value: `0`<br/>- Maximum value: 65535                                                                                                                                                                           |
| databaseName                             | Body | String  | O  | Name of the new database to create in the DB Engine                                                                                                                                                                                               |
| dbUserName                               | Body | String  | O  | New user account name to create in DB Engine                                                                                                                                                                                               |
| dbPassword                               | Body | String  | O  | Password for the new user account to be created in the DB Engine<br/>- Minimum length: `4`<br/>- Maximum length: `16`                                                                                                                                                          |
| parameterGroupId                         | Body | UUID    | O  | Parameter group identifier                                                                                                                                                                                                         |
| dbSecurityGroupIds                       | Body | Array   | X  | DB security group identifiers                                                                                                                                                                                                     |
| useDeletionProtection                    | Body | Boolean | X  | Whether to protect against deletion<br/>Default: `false`                                                                                                                                                                                          |
| useDefaultNotification                   | Body | Boolean | X  | Whether to use default notification<br/>Default: `false`                                                                                                                                                                                       |
| useHighAvailability                      | Body | Boolean | X  | Whether to use high availability                                                                                                                                                                                                           |
| pingInterval                             | Body | Number  | X  | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600`                                                                                                                                                                 |
| failoverReplWaitingTime                  | Body | Number  | X  | Failover latency when using high availability<br/>- Minimum value: `0`<br/>- If set to -1, it will continue to wait for the replication delay to resolve.                                                                                                                                         |                                                                                                                                                                                                                      | userGroupIds                             | Body | Array   | X  | List of identifiers for user groups that receive default notifications                                                                                                                                                                                             |
| network                                  | Body | Object  | O  | Network information objects                                                                                                                                                                                                           |
| network.subnetId                         | Body | UUID    | O  | Subnet identifier                                                                                                                                                                                                             |
| network.usePublicAccess                  | Body | Boolean | X  | External access is available or not<br/>Default: `false`                                                                                                                                                                                      |
| network.availabilityZone                 | Body | Enum    | X  | Availability zone where DB instance will be created<br/>- Example: `kr-pub-a`<br/>- Default: `Any availability` zone                                                                                                                                                     |
| storage                                  | Body | Object  | O  | Storage information objects                                                                                                                                                                                                           |    
| storage.storageType                      | Body | Enum    | O  | Data storage types<br/>- Example: `General SSD`                                                                                                                                                                                  |
| storage.storageSize                      | Body | Number  | O  | Block Storage Size (GB)<br/>- Minimum value: `20`<br/>- Maximum value: `2048`                                                                                                                                                                    |
| backup                                   | Body | Object  | O  | Backup information objects                                                                                                                                                                                                             |
| backup.backupPeriod                      | Body | Number  | O  | Backup retention period<br/>- Minimum value: `0`<br/>- Maximum value: `730`                                                                                                                                                                          |
| backup.backupRetryCount                  | Body | Number  | X  | Number of backup retries<br/>Default: `6`<br/>- Minimum value: `0`<br/>- Maximum value: `10`                                                                                                                                                              |
| backup.backupSchedules                   | Body | Array   | X  | Backup schedules                                                                                                                                                                                                            |
| backup.backupSchedules.backupWndBgnTime  | Body | String  | O  | Backup Start Time<br/>- Example: `00:00:00`                                                                                                                                                                                        |
| backup.backupSchedules.backupWndDuration | Body | Enum    | O  | Backup Window<br/>Auto backup is executed within the set duration from the backup start time.<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1.5 hour<br/>- `TWO_HOURS`: 2 hour<br/>- `TWO_HOURS_AND_HALF`: 2.5 hour<br/>- `THREE_HOURS`: 3 hour |

<details><summary>Example</summary>

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

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Modify DB Instance

```http
PUT /v1.0/db-instances/{dbInstanceId}
```

#### Required permissions

| Permission Name                                | Description           |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance |

#### Request

| Name                 | Type   | Format      | Required | Description                                                                        |
|--------------------|------|---------|----|---------------------------------------------------------------------------|
| dbInstanceId       | URL  | UUID    | O  | DB instance identifier                                                              |
| dbInstanceName     | Body | String  | X  | Name to identify DB instances                                                      |
| description        | Body | String  | X  | Additional information on DB instances                                                         |
| dbPort             | Body | Number  | X  | DB port<br/>- Minimum value: `0`<br/>- Maximum value: 65535                                |
| dbFlavorId         | Body | UUID    | X  | Identifier of DB instance specifications                                                           |
| parameterGroupId   | Body | UUID    | X  | Parameter group identifier                                                              |
| dbSecurityGroupIds | Body | Array   | X  | DB security group identifiers                                                          |
| executeBackup      | Body | Boolean | X  | Whether to execute backup at this time<br/>Default: `false`                                         |

<details><summary>Example</summary>

```json
{
    "dbInstanceName": "db-instance2",
    "description": "description2",
    "dbPort": 10001,
    "dbSecurityGroupIds": [],
    "executeBackup": true
}
```
</details>

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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


### Get high availability information

```http
GET /v1.0/db-instances/{dbInstanceId}/high-availability
```

#### Required permissions

| Permission Name                                   | Description         |
|---------------------------------------|------------|
| RDSforPostgreSQL:HighAvailability.Get | Get high availability information |

#### Request

| Name                  | Type   | Format      | Required | Description                                                   |
|---------------------|------|---------|----|------------------------------------------------------|
| dbInstanceId        | URL  | UUID    | O  | DB instance identifier                                         |

#### Response

| Name                      | Type   | Format      | Description                                                                                                                                                                                                                                                                                                                             |
|-------------------------|------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| haStatus                | Body | Boolean | High Availability Status<br/>- `CREATED: Created`<br/>- `STABLE`: Normal<br/>- `DISABLE_REPLICATION_DELAY`: Failover stops due to replication delay<br/>- `PAUSING`: Pausing<br/>- `PAUSED`: Paused<br/>- `PAUSED_DUE_TO_TASK`: Paused `due to task`<br/>- `FAILOVER_STARTED`: Failover started<br/>- `FAILOVER_FAILED`: Failover failed<br/>- `FAILOVER_COMPLETED`: Failover complete<br/>- `DELETED`: Deleted |
| pingInterval            | Body | Number  | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600`                                                                                                                                                                                                                                                                           |
| failoverReplWaitingTime | Body | Number  | Failover latency when using high availability<br/>- Minimum value: `0`<br/>- If set to -1, it will continue to wait for the replication delay to resolve.                                                                                                                                                                                                                                                   |

<details><summary>Example</summary>

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


### Modify High Availability

```http
PUT /v1.0/db-instances/{dbInstanceId}/high-availability
```

#### Required permissions

| Permission Name                                      | Description        |
|------------------------------------------|-----------|
| RDSforPostgreSQL:HighAvailability.Modify | Modify High Availability |

#### Request

| Name                      | Type   | Format      | Required | Description                                                                           |
|-------------------------|------|---------|----|------------------------------------------------------------------------------|
| dbInstanceId            | URL  | UUID    | O  | DB instance identifier                                                                 |
| useHighAvailability     | Body | Boolean | O  | Whether to use high availability                                                                   |
| pingInterval            | Body | Number  | X  | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600`                         |
| failoverReplWaitingTime | Body | Number  | X  | Failover latency when using high availability<br/>- Minimum value: `0`<br/>- If set to -1, it will continue to wait for the replication delay to resolve. |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Restart High Availability

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### Required permissions

| Permission Name                                      | Description           |
|------------------------------------------|--------------|
| RDSforPostgreSQL:HighAvailability.Resume | Restart High Availability |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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


### Pause High Availability

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### Required permissions

| Permission Name                                     | Description           |
|-----------------------------------------|--------------|
| RDSforPostgreSQL:HighAvailability.Pause | Pause High Availability |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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


### Recover High Availability

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### Required permissions

| Permission Name                                      | Description        |
|------------------------------------------|-----------|
| RDSforPostgreSQL:HighAvailability.Repair | Recover High Availability |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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


### Separate High Availability

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/split
```

#### Required permissions

| Permission Name                                     | Description        |
|-----------------------------------------|-----------|
| RDSforPostgreSQL:HighAvailability.Split | Separate High Availability |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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


### Get DB instance storage information

```http
GET /v1.0/db-instances/{dbInstanceId}/storage-info
```

#### Required permissions

| Permission Name                             | Description            |
|---------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.Get | List DB Instance Details |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name               | Type   | Format      | Description                                                                                   |
|------------------|------|---------|--------------------------------------------------------------------------------------|
| storageType      | Body | Enum    | Data storage types                                                                          |
| storageSize      | Body | Number  | Block Storage Size (GB)                                                                      |
| storageStatus    | Body | Enum    | Data Storage Current Status<br/>- `DETACHED`: Detached<br/>- `ATTACHED`: Attached<br/>- `DELETED`: Deleted |

<details><summary>Example</summary>

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


### Modifying DB instance storage information

```http
PUT /v1.0/db-instances/{dbInstanceId}/storage-info
```

#### Required permissions

| Permission Name                                | Description           |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance |

#### Request

| Name                | Type   | Format      | Required | Description                                                                        |
|-------------------|------|---------|----|---------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID    | O  | DB instance identifier                                                              |
| storageSize       | Body | Number  | O  | Block Storage Size (GB)<br/>- Minimum value: Current value<br/>- Maximum value: `2048`                          |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Get DB instance network information

```http
GET /v1.0/db-instances/{dbInstanceId}/network-info
```

#### Required permissions

| Permission Name                             | Description            |
|---------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.Get | List DB Instance Details |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name                      | Type   | Format      | Description                                                                                                                                      |
|-------------------------|------|---------|-----------------------------------------------------------------------------------------------------------------------------------------|
| availabilityZone        | Body | Enum    | Availability zone where DB instance will be created                                                                                                                     |
| subnet                  | Body | Object  | Subnet object                                                                                                                                  |
| subnet.subnetId         | Body | UUID    | Subnet identifier                                                                                                                                |
| subnet.subnetName       | Body | UUID    | Name to identify subnets                                                                                                                        |
| subnet.subnetCidr       | Body | UUID    | CIDR of subnet                                                                                                                               |
| subnet.publicAccessible | Body | Boolean | External access is available or not                                                                                                                             |
| endPoints               | Body | Array   | List of access information                                                                                                                                |
| endPoints.domain        | Body | String  | Domain                                                                                                                                     |
| endPoints.ipAddress     | Body | String  | IP address                                                                                                                                   |
| endPoints.endPointType  | Body | Enum    | Types of access information<br>-`EXTERNAL`: External access domain<br>-`INTERNAL`: Internal access domain<br>-`PUBLIC`: (Deprecated) External access domain<br>-`PRIVATE`: (Deprecated) Internal access domain |

<details><summary>Example</summary>

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

### Modifying DB instance network information

```http
PUT /v1.0/db-instances/{dbInstanceId}/network-info
```

#### Required permissions

| Permission Name                                | Description           |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance |

#### Request

| Name              | Type   | Format      | Required | Description           |
|-----------------|------|---------|----|--------------|
| dbInstanceId    | URL  | UUID    | O  | DB instance identifier |
| usePublicAccess | Body | Boolean | O  | External access is available or not  |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Get DB instance backup information

```http
GET /v1.0/db-instances/{dbInstanceId}/backup-info
```

#### Required permissions

| Permission Name                             | Description            |
|---------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.Get | List DB Instance Details |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name                                    | Type   | Format     | Description                                                                                                                                                                                                                   |
|---------------------------------------|------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| backupPeriod                          | Body | Number | Backup retention period                                                                                                                                                                                                          |
| backupRetryCount                      | Body | Number | Number of backup retries                                                                                                                                                                                                            |
| backupSchedules                       | Body | Array  | Backup schedules                                                                                                                                                                                                            |
| backupSchedules.backupWndBgnTime      | Body | String | Backup Start Time                                                                                                                                                                                                             |
| backupSchedules.backupWndDuration     | Body | Enum   | Backup Window<br/>Auto backup is executed within the set duration from the backup start time.<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1.5 hour<br/>- `TWO_HOURS`: 2 hour<br/>- `TWO_HOURS_AND_HALF`: 2.5 hour<br/>- `THREE_HOURS`: 3 hour |

<details><summary>Example</summary>

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

### Modifying DB instance backup information

```http
PUT /v1.0/db-instances/{dbInstanceId}/backup-info
```

#### Required permissions

| Permission Name                                | Description           |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance |

#### Request

| Name                                    | Type   | Format     | Required | Description                                                                                                                                                                                                                   |
|---------------------------------------|------|--------|----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId                          | URL  | UUID   | O  | DB instance identifier                                                                                                                                                                                                         |
| backupPeriod                          | Body | Number | X  | Backup retention period<br/>- Minimum value: `0`<br/>- Maximum value: `730`                                                                                                                                                                          |
| backupRetryCount                      | Body | Number | X  | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10`                                                                                                                                                                             |
| backupSchedules                       | Body | Array  | X  | Backup schedules                                                                                                                                                                                                            |
| backupSchedules.backupWndBgnTime      | Body | String | O  | Backup Start Time<br/>- Example: `00:00:00`                                                                                                                                                                                        |
| backupSchedules.backupWndDuration     | Body | Enum   | O  | Backup Window<br/>Auto backup is executed within the set duration from the backup start time.<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1.5 hour<br/>- `TWO_HOURS`: 2 hour<br/>- `TWO_HOURS_AND_HALF`: 2.5 hour<br/>- `THREE_HOURS`: 3 hour |

<details><summary>Example</summary>

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

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Get DB instance restore information

```http
GET /v1.0/db-instances/{dbInstanceId}/restoration-info
```

#### Required permissions

| Permission Name                             | Description            |
|---------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.Get | List DB Instance Details |

#### Request

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name                                      | Type   | Format       | Description                                                                                                                                                    |
|-----------------------------------------|------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| oldestRestorableYmdt                    | Body | DateTime | Oldest restoreable time                                                                                                                                      |
| latestRestorableYmdt                    | Body | DateTime | Most recent restoreable time                                                                                                                                      |
| restorableBackups                       | Body | Array    | List of restoreable backups                                                                                                                                          |
| restorableBackups.backup                | Body | Object   | Backup information objects                                                                                                                                              |
| restorableBackups.backup.backupId       | Body | UUID     | Backup identifier                                                                                                                                               |
| restorableBackups.backup.backupName     | Body | String   | Backup name                                                                                                                                                 |
| restorableBackups.backup.backupSize     | Body | Number   | Backup size                                                                                                                                                 |
| restorableBackups.backup.backupType     | Body | Enum     | Backup type<br/>- `AUTO`: Automatic<br/>`MANUAL: Manual`                                                                                                             |
| restorableBackups.backup.backupStatus   | Body | Enum     | Backup Status<br/>`BACKING_UP`: Backup in progress<br/>`COMPLETED`: Backup completed<br/>`DELETING`: Backup being deleted<br/>`DELETED`: Backup deleted<br/>`ERROR`: Error occurred |
| restorableBackups.backup.dbInstanceId   | Body | UUID     | Original DB instance identifier                                                                                                                                       |
| restorableBackups.backup.dbInstanceName | Body | String   | Original DB instance name                                                                                                                                        |
| restorableBackups.backup.dbVersion      | Body | String   | DB version information                                                                                                                                              |
| restorableBackups.backup.failoverCount  | Body | Number   | Number of failovers                                                                                                                                              |
| restorableBackups.backup.walFileName    | Body | String   | WAL log file name                                                                                                                                          |
| restorableBackups.backup.createdYmdt    | Body | DateTime | Date and time of backup creation                                                                                                                                              |
| restorableBackups.backup.updatedYmdt    | Body | DateTime | Date and time of backup renewal                                                                                                                                              |
| restorableBackups.backup.startYmdt      | Body | DateTime | When backups start                                                                                                                                              |
| restorableBackups.backup.completedYmdt  | Body | DateTime | Backup completion date                                                                                                                                              |

<details><summary>Example</summary>

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

### Restore DB Instance

```http
GET /v1.0/db-instances/{dbInstanceId}/restore
```

#### Required permissions

| Permission Name                                 | Description           |
|-------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Restore | Restore DB Instance |

#### Common Request

| Name                                       | Type   | Format      | Required | Description                                                                                                                                                                                                                                                  |
|------------------------------------------|------|---------|----|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId                             | URL  | UUID    | O  | DB instance identifier                                                                                                                                                                                                                                        |
| restore                                  | Body | Object  | O  | Restoration information object                                                                                                                                                                                                                                            |
| restore.restoreType                      | Body | Enum    | O  | Restoration type<br/>`TIMESTAMP`: A point-in-time restoration type using the time within the restorable time<br/>- `BACKUP`: Restore type using a previously created backup                                                                                                                                                    |
| dbInstanceName                           | Body | String  | O  | Name to identify DB instances                                                                                                                                                                                                                                |
| description                              | Body | String  | X  | Additional information on DB instances                                                                                                                                                                                                                                   |
| dbFlavorId                               | Body | UUID    | O  | Identifier of DB instance specifications                                                                                                                                                                                                                                     |
| dbPort                                   | Body | Number  | O  | DB port<br/>- Minimum value: `3306`<br/>- Maximum value: `43306`                                                                                                                                                                                                          |
| parameterGroupId                         | Body | UUID    | O  | Parameter group identifier                                                                                                                                                                                                                                        |
| dbSecurityGroupIds                       | Body | Array   | X  | DB security group identifiers                                                                                                                                                                                                                                    |
| userGroupIds                             | Body | Array   | X  | User group identifiers                                                                                                                                                                                                                                      |
| useDefaultNotification                   | Body | Boolean | X  | Whether to use default notification<br/>Default: `false`                                                                                                                                                                                                                      |
| useDeletionProtection                    | Body | Boolean | X  | Whether to protect against deletion<br>Default: `false`                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| useHighAvailability                      | Body | Boolean | X  | Whether to use high availability<br/>Default: `false`                                                                                                                                                                                                                       |
| pingInterval                             | Body | Number  | X  | Ping interval (sec) when using high availability<br/>- Default: `3Minimum` `:` 1<br/>- Maximum value: `600`                                                                                                                                                                                        |
| failoverReplWaitingTime                  | Body | Number  | X  | Failover latency when using high availability<br/>- Minimum value: `0`<br/>- If set to -1, it will continue to wait for the replication delay to resolve.                                                                                                                                                                        |                                                                                                                                                                                                                      | userGroupIds                             | Body | Array   | X  | List of identifiers for user groups that receive default notifications                                                                                                                                                                                             |
| network                                  | Body | Object  | O  | Network information objects                                                                                                                                                                                                                                          |
| network.subnetId                         | Body | UUID    | O  | Subnet identifier                                                                                                                                                                                                                                            |
| network.usePublicAccess                  | Body | Boolean | X  | External access is available or not<br/>Default: `false`</li></ul>                                                                                                                                                                                                            |
| network.availabilityZone                 | Body | Enum    | X  | Availability zone where DB instance will be created<br/>- Example: `kr-pub-a`<br/>- Default: `Any availability` zone                                                                                                                                                                                    |
| storage                                  | Body | Object  | O  | Storage information objects                                                                                                                                                                                                                                          |
| storage.storageType                      | Body | Enum    | O  | Block Storage Type<br/>- Example: `General SSD`                                                                                                                                                                                                                 |
| storage.storageSize                      | Body | Number  | O  | Block Storage Size (GB)<br/>- Minimum value: `20`<br/>- Maximum value: `2048`                                                                                                                                                                                                   |
| backup                                   | Body | Object  | O  | Backup information objects                                                                                                                                                                                                                                            |
| backup.backupPeriod                      | Body | Number  | O  | Backup retention period<br/>- Minimum value: `0`<br/>- Maximum value: `730`                                                                                                                                                                                                         |
| backup.backupRetryCount                  | Body | Number  | X  | Number of backup retries<br/>Default: `6`<br/>- Minimum value: `0`<br/>- Maximum value: `10`                                                                                                                                                                                             |
| backup.backupSchedules                   | Body | Array   | O  | Backup schedules                                                                                                                                                                                                                                           |
| backup.backupSchedules.backupWndBgnTime  | Body | String  | X  | Backup started time<br/>- Example: `00:00:00`<br/>- Default: Original DB instance value                                                                                                                                                                                               |
| backup.backupSchedules.backupWndDuration | Body | Enum    | X  | Backup duration<br/>Auto backup proceeds within duration from backup start time.<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1.5 hour<br/>- `TWO_HOURS`: 2 hour<br/>- `TWO_HOURS_AND_HALF`: 2.5 hour<br/>- `THREE_HOURS`: 3 hour<br/>- Default: Original DB instance value |

#### Request when restoring a point in time restoration using Timestamp (if restoreType is `TIMESTAMP`)

| Name                  | Type   | Format       | Required | Description                                                                                              |
|---------------------|------|----------|----|-------------------------------------------------------------------------------------------------|
| restore.restoreYmdt | Body | DateTime | O  | DB instance restore time. (YYYY-MM-DDThh:mm:ss.SSSTZD)<br>Restoration is possible only before the most recent restorable time, which is queried through restoration information inquiry. |

<details><summary>Example</summary>

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

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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


### Change DB Instance Deletion Protection Settings

```http
PUT /v1.0/db-instances/{dbInstanceId}/deletion-protection
```

#### Required permissions

| Permission Name                                | Description           |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance |

#### Request

| Name                    | Type   | Format      | Required | Description           |
|-----------------------|------|---------|----|--------------|
| dbInstanceId          | URL  | UUID    | O  | DB instance identifier |
| useDeletionProtection | Body | Boolean | O  | Whether to protect against deletion     |

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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


### Get DB instance maintenance information

```http
GET /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

#### Required permissions

| Permission Name                                | Description           |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Get | List DB Instance Details |

#### Request

| Name                    | Type   | Format      | Required | Description           |
|-----------------------|------|---------|----|--------------|
| dbInstanceId          | URL  | UUID    | O  | DB instance identifier |

#### Response

| Name                  | Type | Format  | Description                                                                                                                          |
|-----------------------|------|---------|--------------------------------------------------------------------------------------------------------------------------------------|
| allowAutoMaintenance  | Body | Boolean | Whether to allow automatic maintenance                                                                                               |
| useAutoStorageCleanup | Body | Boolean | Whether to enable automatic storage cleanup                                                                                          |
| maintWndBgnTime       | Body | String  | Automatic maintenance start time <br/>- Example: `00:00:00`                                                                          |
| maintWndDuration      | Body | ENUM    | Maintenance window <br/> Examples: `half_an_hour`, `one_hour`, `one_hour_and_half`, `two_hours`, `two_hours_and_half`, `three_hours` |
| logRetentionPeriod    | Body | Number  | Log retention period (days)                                                                                                                          |

<details><summary>Example</summary>

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


### Modify DB instance maintenance information

```http
PUT /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

#### Required permissions

| Permission Name                                | Description           |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance |

#### Request

| Name                  | Type | Format  | Required | Description                                                                                                                          |
|-----------------------|------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId          | URL  | UUID    | O        | DB instance identifier                                                                                                               |
| allowAutoMaintenance  | Body | Boolean | O        | Whether to allow automatic maintenance                                                                                               |
| useAutoStorageCleanup | Body | Boolean | O        | Whether to enable automatic storage cleanup                                                                                          |
| maintWndBgnTime       | Body | String  | O        | Automatic maintenance start time <br/>- Example: `00:00:00`                                                                          |
| maintWndDuration      | Body | ENUM    | O        | Maintenance window <br/> Examples: `half_an_hour`, `one_hour`, `one_hour_and_half`, `two_hours`, `two_hours_and_half`, `three_hours` |
| logRetentionPeriod    | Body | Number  | X        | Log retention period (days)                                                                                                                          |

<details><summary>Example</summary>

```json
{
  "allowAutoMaintenance": true,
  "useAutoStorageCleanup": true,
  "logRetentionPeriod": 7
}
```
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

<details><summary>Example</summary>

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


### Get selectable DB versions in the current DB instance

```http
GET /v1.0/db-instances/{dbInstanceId}/available-db-versions
```

#### Required permissions

| Permission Name                                | Description           |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Get | List DB Instance Details |

#### Request

| Name                    | Type   | Format      | Required | Description           |
|-----------------------|------|---------|----|--------------|
| dbInstanceId          | URL  | UUID    | O  | DB instance identifier |

#### Response

| Name                           | Type   | Format      | Description                    |
|------------------------------|------|---------|-----------------------|
| dbVersions                   | Body | Array   | DB version list              |
| dbVersions.dbVersion         | Body | String  | DB version                 |
| dbVersions.dbVersionName     | Body | String  | DB version name                |
| dbVersions.restorableFromObs | Body | Boolean | Restoring backup from object storage available or not |

<details><summary>Example</summary>

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


### Delete DB instance

```http
DELETE /v1.0/db-instances/{dbInstanceId}
```

#### Required permissions

| Permission Name                                | Description           |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Delete | Delete DB instance |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Restart DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/restart
```

#### Required permissions

| Permission Name                                 | Description            |
|-------------------------------------|---------------|
| RDSforPostgreSQL:DbInstance.Restart | Restart DB Instance |

#### Request

| Name                | Type   | Format      | Required | Description                                                                        |
|-------------------|------|---------|----|---------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID    | O  | DB instance identifier                                                              |
| useOnlineFailover | Body | Boolean | X  | Whether to restart using failover<br/>Available only for DB instance using high availability<br/>Default: `false` |
| executeBackup     | Body | Boolean | X  | Whether to execute backup at this time<br/>Default: `false`                                         |

<details><summary>Example</summary>

```json
{
    "executeBackup": true
}
```
</details>

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Force Restart DB instance

```http
POST /v1.0/db-instances/{dbInstanceId}/force-restart
```

#### Required permissions

| Permission Name                                      | Description               |
|------------------------------------------|------------------|
| RDSforPostgreSQL:DbInstance.ForceRestart | Force Restart DB instance |

#### Request

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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


### Start DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/start
```

#### Required permissions

| Permission Name                               | Description           |
|-----------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Start | Start DB Instance |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Stop DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/stop
```

#### Required permissions

| Permission Name                               | Description           |
|-----------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Start | Start DB Instance |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Backup DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/backup
```

#### Required permissions

| Permission Name                                | Description           |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Backup | Backup DB Instance |

#### Request

| Name           | Type   | Format     | Required | Description              |
|--------------|------|--------|----|-----------------|
| dbInstanceId | URL  | UUID   | O  | DB instance identifier    |
| backupName   | Body | String | O  | Name to identify backups |

<details><summary>Example</summary>

```json
{
    "backupName": "backup"
}
```
</details>

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Export after Backing up DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/backup-to-object-storage
```

#### Required permissions

| Permission Name                                               | Description                         |
|---------------------------------------------------|----------------------------|
| RDSforPostgreSQL:DbInstance.BackupToObjectStorage | Export Backup Files to Object Storage After Backup |

#### Request

| Name              | Type   | Format     | Required | Description                          |
|-----------------|------|--------|----|-----------------------------|
| dbInstanceId    | URL  | UUID   | O  | DB instance identifier                |
| tenantId        | Body | String | O  | Tenant ID of object storage to store backup   |
| username        | Body | String | O  | ID of NHN Cloud Account or IAM Account   |
| password        | Body | String | O  | API password for object storage where backup is stored |
| targetContainer | Body | String | O  | Object storage container where backup is stored     |
| objectPath      | Body | String | O  | Backup path to be stored in container            |

<details><summary>Example</summary>

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

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Applying DB instance latest parameter groups

```http
POST /v1.0/db-instances/{dbInstanceId}/apply-recent-parameter-group
```

#### Required permissions

| Permission Name                                | Description           |
|------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify | Modify DB Instance |

#### Request

| Name                | Type   | Format      | Required | Description                                                                        |
|-------------------|------|---------|----|---------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID    | O  | DB instance identifier                                                              |
| executeBackup     | Body | Boolean | X  | Whether to execute backup at this time<br/>Default: `false`                                         |

<details><summary>Example</summary>

```json
{
  "executeBackup": true
}
```
</details>

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Replicate DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/replicate
```

#### Required permissions

| Permission Name                                   | Description           |
|---------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Replicate | Replicate DB Instance |

#### Request

| Name                                           | Type   | Format      | Required | Description                                                                                                                                                                                                                                                  |
|----------------------------------------------|------|---------|----|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId                                 | URL  | UUID    | O  | DB instance identifier                                                                                                                                                                                                                                        |
| dbInstanceName                               | Body | String  | O  | Name to identify DB instances                                                                                                                                                                                                                                |
| description                                  | Body | String  | X  | Additional information on DB instances                                                                                                                                                                                                                                   |
| dbFlavorId                                   | Body | UUID    | X  | Identifier of DB instance specifications<br/>- Default: Original DB instance value                                                                                                                                                                                                             |
| dbPort                                       | Body | Number  | X  | DB port<br/>- Default: Original DB instance value<br/>- Minimum value: `0`<br/>- Maximum value: 65535                                                                                                                                                                                  |
| parameterGroupId                             | Body | UUID    | X  | Parameter group identifier<br/>- Default: Original DB instance value                                                                                                                                                                                                                |
| dbSecurityGroupIds                           | Body | Array   | X  | DB security group identifiers<br/>- Default: Original DB instance value                                                                                                                                                                                                            |
| userGroupIds                                 | Body | Array   | X  | User group identifiers                                                                                                                                                                                                                                      |
| useDefaultNotification                       | Body | Boolean | X  | Whether to use default notification<br/>Default: `false`                                                                                                                                                                                                                      |
| useDeletionProtection                        | Body | Boolean | X  | Whether to protect against deletion<br/>Default: `false`                                                                                                                                                                                                                         |
| network                                      | Body | Object  | X  | Network information objects                                                                                                                                                                                                                                          |
| network.usePublicAccess                      | Body | Boolean | X  | External access is available or not<br/>Default: `false`                                                                                                                                                                                                                      |
| network.availabilityZone                     | Body | Enum    | X  | Availability zone where DB instance will be created<br/>- Example: `kr-pub-a`<br/>- Default: `Any availability` zone                                                                                                                                                                                    |  
| storage                                      | Body | Object  | X  | Storage information objects                                                                                                                                                                                                                                          |    
| storage.storageType                          | Body | Enum    | X  | Data storage types<br>- Example: `General SSD`                                                                                                                                                                                                                  |
| storage.storageSize                          | Body | Number  | X  | Block Storage Size (GB)<br/>- Default: Original DB instance value<br/>- Minimum value: `20`<br/>- Maximum value: `2048`                                                                                                                                                                           |
| backup                                       | Body | Object  | X  | Backup information objects                                                                                                                                                                                                                                            |
| backup.backupPeriod                          | Body | Number  | X  | Backup retention period<br/>- Default: Original DB instance value<br/>- Minimum value: `0`<br/>- Maximum value: `730`                                                                                                                                                                                 |
| backup.backupRetryCount                      | Body | Number  | X  | Number of backup retries<br/>- Default: Original DB instance value<br/>- Minimum value: `0`<br/>- Maximum value: `10`                                                                                                                                                                                    |

<details><summary>Example</summary>

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

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Promote DB Instance

```http
POST /v1.0/db-instances/{dbInstanceId}/promote
```

#### Required permissions

| Permission Name                                 | Description           |
|-------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Promote | Promote DB Instance |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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


## DB Instances > Databases

### View the list of databases

```http
GET /v1.0/db-instances/{dbInstanceId}/databases
```

#### Required permissions

| Permission Name                                      | Description                     |
|------------------------------------------|------------------------|
| RDSforPostgreSQL:DbInstanceDatabase.List | View a list of databases in a DB instance |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name                           | Type   | Format       | Description                                                                                                                                                  |
|------------------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| databases                    | Body | Array    | List of databases                                                                                                                                           |
| databases.databaseId         | Body | UUID     | Identifiers in the database                                                                                                                                         |
| databases.databaseName       | Body | String   | Database Name                                                                                                                                           |
| databases.databaseStatus     | Body | Enum     | Current state of the database<br/>- `STABLE`: Created<br/>(CREATING: Creating,<br/>- `MODIFYING`: Modifying<br/>- `SYNCING`: Synchronizing<br/>DELETING: Deleting,<br/>- `DELETED`: Deleted |
| databases.createdYmdt        | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                   |
| databases.updatedYmdt        | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                   |
| databases.schemas            | Body | Array    | List of schemas in the database                                                                                                                                     |
| databases.schemas.schemaName | Body | String   | Schema name                                                                                                                                              |

<details><summary>Example</summary>

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

### Create a database

```http
POST /v1.0/db-instances/{dbInstanceId}/databases
```

#### Required permissions

| Permission Name                                        | Description                    |
|--------------------------------------------|-----------------------|
| RDSforPostgreSQL:DbInstanceDatabase.Create | Creating a database within a DB instance |

#### Request

| Name           | Type   | Format     | Required | Description           |
|--------------|------|--------|----|--------------|
| dbInstanceId | URL  | UUID   | O  | DB instance identifier |
| databaseName | Body | String | O  | Database Name    |

<details><summary>Example</summary>

```json
{
    "databaseName": "database"
}
```
</details>

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Modifying the database

```http
PUT /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

#### Required permissions

| Permission Name                                        | Description                    |
|--------------------------------------------|-----------------------|
| RDSforPostgreSQL:DbInstanceDatabase.Modify | Modifying databases within a DB instance |

#### Request

| Name                       | Type   | Format      | Required | Description                                                                                          |
|--------------------------|------|---------|----|---------------------------------------------------------------------------------------------|
| dbInstanceId             | URL  | UUID    | O  | DB instance identifier                                                                                |
| databaseId               | URL  | UUID    | O  | Identifiers in the database                                                                                 |
| databaseName             | Body | String  | O  | Database Name                                                                                   |
| applyHbaRulesImmediately | Body | Boolean | X  | Whether to apply associated access control rules immediately<br/>- When you change the database name, any access control rules set under the old database name are reflected with the changed name. |

<details><summary>Example</summary>

```json
{
    "databaseName": "database-1"
}
```
</details>

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Deleting a database

```http
DELETE /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

#### Required permissions

| Permission Name                                        | Description                    |
|--------------------------------------------|-----------------------|
| RDSforPostgreSQL:DbInstanceDatabase.Delete | Deleting a database within a DB instance |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |
| databaseId   | URL | UUID | O  | Identifiers in the database  |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

## DB Instances > Users

### View the list of users

```http
GET /v1.0/db-instances/{dbInstanceId}/db-users
```

#### Required permissions

| Permission Name                                  | Description                  |
|--------------------------------------|---------------------|
| RDSforPostgreSQL:DbInstanceUser.List | Viewing a list of users in a DB instance |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name                    | Type   | Format       | Description                                                                                                                                                  |
|-----------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| dbUsers               | Body | Array    | DB users                                                                                                                                           |
| dbUsers.dbUserId      | Body | UUID     | DB user identifier                                                                                                                                         |
| dbUsers.dbUserName    | Body | String   | DB user account name                                                                                                                                        |
| dbUsers.authorityType | Body | Enum     | DB user permission types<br/>- `CRUD`: Permission to execute DML query<br/>- `DDL`: Permission to execute DDL query                                                                           |
| dbUsers.dbUserStatus  | Body | Enum     | DB user current status<br/>- `STABLE`: Created<br/>(CREATING: Creating,<br/>- `MODIFYING`: Modifying<br/>- `SYNCING`: Synchronizing<br/>DELETING: Deleting,<br/>- `DELETED`: Deleted |
| dbUsers.createdYmdt   | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                   |
| dbUsers.updatedYmdt   | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                   |

<details><summary>Example</summary>

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

### Create a user

```http
POST /v1.0/db-instances/{dbInstanceId}/db-users
```

#### Required permissions

| Permission Name                                    | Description                 |
|----------------------------------------|--------------------|
| RDSforPostgreSQL:DbInstanceUser.Create | Creating a user in a DB instance |

#### Request

| Name                    | Type   | Format      | Required | Description                                                                        |
|-----------------------|------|---------|----|---------------------------------------------------------------------------|
| dbInstanceId          | URL  | UUID    | O  | DB instance identifier                                                              |
| dbUserName            | Body | String  | O  | DB user account name<br/>- Minimum length: `1`<br/>- Maximum length: `32`                           |
| dbPassword            | Body | String  | O  | DB user account password<br/>- Minimum length: `1`<br/>- Maximum length: `32`                          |
| authorityType         | Body | Enum    | O  | DB user permission types<br/>- `CRUD`: Permission to execute DML query<br/>- `DDL`: Permission to execute DDL query |
| createDefaultHbaRules | Body | Boolean | X  | Whether to create default access control rules                                                         |
| address               | Body | String  | X  | Connection address to use when creating default access control rules                                                |

<details><summary>Example</summary>

```json
{
    "dbUserName": "db-user",
    "dbPassword": "password",
    "authorityType": "CRUD"
}
```
</details>

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Edit a user

```http
PUT /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### Required permissions

| Permission Name                                    | Description                 |
|----------------------------------------|--------------------|
| RDSforPostgreSQL:DbInstanceUser.Modify | Modifying users in a DB instance |

#### Request

| Name                       | Type   | Format      | Required | Description                                                                                          |
|--------------------------|------|---------|----|---------------------------------------------------------------------------------------------|
| dbInstanceId             | URL  | UUID    | O  | DB instance identifier                                                                                |
| dbUserId                 | URL  | UUID    | O  | DB user identifier                                                                                 |
| dbUserName               | Body | String  | X  | DB user account name<br/>- Minimum length: `1`<br/>- Maximum length: `32`                                             |
| dbPassword               | Body | String  | X  | DB user account password<br/>- Minimum length: `1`<br/>- Maximum length: `32`                                            |
| authorityType            | Body | Enum    | X  | DB user permission types<br/>- `CRUD`: Permission to execute DML query<br/>- `DDL`: Permission to execute DDL query                   |
| applyHbaRulesImmediately | Body | Boolean | X  | Whether to apply associated access control rules immediately<br/>- When you change a user account name, any access control rules set under the old user account name are reflected with the changed name. |

<details><summary>Example</summary>

```json
{
    "dbUserName": "db-user-1",
    "dbPassword": "new-password"
}
```
</details>

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Deleting a user

```http
DELETE /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### Required permissions

| Permission Name                                    | Description                 |
|----------------------------------------|--------------------|
| RDSforPostgreSQL:DbInstanceUser.Delete | Deleting a user in a DB instance |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |
| dbUserId     | URL | UUID | O  | DB user identifier  |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

## DB Instances > Access Control

### View a list of access control rules

```http
GET /v1.0/db-instances/{dbInstanceId}/hba-rules
```

#### Required permissions

| Permission Name                                 | Description                       |
|-------------------------------------|--------------------------|
| RDSforPostgreSQL:DbInstanceHba.List | View a list of access control rules in a DB instance |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name                              | Type   | Format      | Description                                                                                                                                                   |
|---------------------------------|------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| hbaRules                        | Body | Array   | List of access control rules                                                                                                                                          |
| hbaRules.hbaRuleId              | Body | UUID    | Identifiers for access control rules                                                                                                                                        |
| hbaRules.hbaRuleStatus          | Body | Enum    | Current status of access control rules<br/>- `CREATED: Created`<br/>- `APPLIED`: Applied<br/>(CREATING: Creating,<br/>- `MODIFYING`: Modifying<br/>DELETING: Deleting,<br/>- `DELETED`: Deleted |
| hbaRules.databaseApplyType      | Body | String  | How database rules are applied<br/>- `ENTIRE`: All<br/>- `USER_CUSTOM`: Customize                                                                                       |
| hbaRules.dbUserApplyType        | Body | Enum    | How DB user rules are applied<br/>- `ENTIRE`: All<br/>- `USER_CUSTOM`: Customize                                                                                       |
| hbaRules.databases              | Body | Array   | List of custom databases                                                                                                                                     |
| hbaRules.databases.databaseId   | Body | UUID    | Identifiers for custom databases                                                                                                                                   |
| hbaRules.databases.databaseName | Body | String  | Custom database name                                                                                                                                     |
| hbaRules.dbUsers                | Body | Array   | Custom DB user list                                                                                                                                     |
| hbaRules.dbUsers.dbUserId       | Body | UUID    | Identifier of the custom DB user                                                                                                                                   |
| hbaRules.dbUsers.dbUserName     | Body | String  | Custom DB user account name                                                                                                                                  |
| hbaRules.address                | Body | String  | Access Address                                                                                                                                                |
| hbaRules.authMethod             | Body | Enum    | Authentication Method<br/>- `TRUST`: Trust (no password required)<br/>- `REJECT`: Block access<br/>- `SCRAM_SHA_256`: Password (SCRAM-SHA-256)                                                 |
| hbaRules.reservedAction         | Body | Enum    | Preliminaries<br/>- `NONE`: None<br/>- `CREATE`: Schedule a creation (requires application)<br/>- `MODIFY`: Schedule a modification (requires application)<br/>- `DELETE`: Schedule a delete (requires enforcement)                                        |
| hbaRules.order                  | Body | Number  | Application order                                                                                                                                                |
| hbaRules.applicable             | Body | Boolean | Applicability<br/>- Rules with an inapplicable status are ignored                                                                                                                     |
| needToApply                     | Body | Boolean | Whether changes need to be made                                                                                                                                       |

<details><summary>Example</summary>

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

### Add an access control rule

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules
```

#### Required permissions

| Permission Name                                   | Description                      |
|---------------------------------------|-------------------------|
| RDSforPostgreSQL:DbInstanceHba.Create | Adding access control rules within a DB instance |

#### Request

| Name                | Type   | Format     | Required | Description                                                                                                   |
|-------------------|------|--------|----|------------------------------------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID   | O  | DB instance identifier                                                                                         |
| databaseApplyType | Body | String | O  | How database rules are applied<br/>- `ENTIRE`: All<br/>- `USER_CUSTOM`: Customize                                       |
| dbUserApplyType   | Body | Enum   | O  | How DB user rules are applied<br/>- `ENTIRE`: All<br/>- `USER_CUSTOM`: Customize                                       |
| databaseIds       | Body | Array  | X  | List of identifiers for a custom database                                                                                |
| dbUserIds         | Body | Array  | X  | List of identifiers for custom DB users                                                                                |
| address           | Body | String | O  | Access Address<br/>- Enter in CIDR format, hostname, or domain format                                                             |
| authMethod        | Body | Enum   | O  | Authentication Method<br/>- `TRUST`: Trust (no password required)<br/>- `REJECT`: Block access<br/>- `SCRAM_SHA_256`: Password (SCRAM-SHA-256) |

<details><summary>Example</summary>

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

#### Response

| Name        | Type   | Format   | Description            |
|-----------|------|------|---------------|
| hbaRuleId | Body | UUID | Identifiers for access control rules |

<details><summary>Example</summary>

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

### Modify an access control rule

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

#### Required permissions

| Permission Name                                   | Description                      |
|---------------------------------------|-------------------------|
| RDSforPostgreSQL:DbInstanceHba.Modify | Modifying access control rules within a DB instance |

#### Request

| Name                | Type   | Format     | Required | Description                                                                                                   |
|-------------------|------|--------|----|------------------------------------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID   | O  | DB instance identifier                                                                                         |
| hbaRuleId         | URL  | UUID   | O  | Identifiers for access control rules                                                                                        |
| databaseApplyType | Body | String | O  | How database rules are applied<br/>- `ENTIRE`: All<br/>- `USER_CUSTOM`: Customize                                       |
| dbUserApplyType   | Body | Enum   | O  | How DB user rules are applied<br/>- `ENTIRE`: All<br/>- `USER_CUSTOM`: Customize                                       |
| databaseIds       | Body | Array  | X  | List of identifiers for a custom database                                                                                |
| dbUserIds         | Body | Array  | X  | List of identifiers for custom DB users                                                                                |
| address           | Body | String | O  | Access Address<br/>- Enter in CIDR format, hostname, or domain format                                                             |
| authMethod        | Body | Enum   | O  | Authentication Method<br/>- `TRUST`: Trust (no password required)<br/>- `REJECT`: Block access<br/>- `SCRAM_SHA_256`: Password (SCRAM-SHA-256) |

<details><summary>Example</summary>

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

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

### Deleting an access control rule

```http
DELETE /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

#### Required permissions

| Permission Name                                   | Description                      |
|---------------------------------------|-------------------------|
| RDSforPostgreSQL:DbInstanceHba.Delete | Deleting an access control rule in a DB instance |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description            |
|--------------|-----|------|----|---------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier  |
| hbaRuleId    | URL | UUID | O  | Identifiers for access control rules |

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

### Reorder access control rules

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/orders
```

#### Required permissions

| Permission Name                                   | Description                      |
|---------------------------------------|-------------------------|
| RDSforPostgreSQL:DbInstanceHba.Modify | Modifying access control rules within a DB instance |

#### Request

| Name           | Type  | Format   | Required | Description                                  |
|--------------|-----|------|----|-------------------------------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier                        |
| hbaRuleIds   | URL | Body | O  | List of identifiers for access control rules<br/>- Adjusted in the order you requested |

<details><summary>Example</summary>

```json
{
    "hbaRuleIds": [
        "7c9a94b8-86c1-435d-8af2-82a5e9d53fd4"
    ]
}
```
</details>

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

### Applying access control rules

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules/apply
```

#### Required permissions

| Permission Name                                   | Description           |
|---------------------------------------|--------------|
| RDSforPostgreSQL:DbInstance.Modify    | Modify DB Instance |

#### Request

This API does not require a request body.

| Name           | Type  | Format   | Required | Description           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB instance identifier |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

## Backup

### Retrieve Backup List

```http
GET /v1.0/backups
```

#### Required permissions

| Permission Name                          | Description       |
|------------------------------|----------|
| RDSforPostgreSQL:Backup.List | Retrieve Backup List |

#### Request

This API does not require a request body.

| Name           | Type    | Format     | Required | Description                                                         |
|--------------|-------|--------|----|------------------------------------------------------------|
| page         | Query | Number | O  | Page to retrieve<br/>- Minimum value: `1`                                 |
| size         | Query | Number | O  | Page size to retrieve<br/>- Minimum value: `1`<br/>- Maximum value: `100`             |
| backupType   | Query | Enum   | X  | Backup type<br/>- `AUTO`: Automatic<br/>- `MANUAL`:  Manual<br/>- Default value: All |
| dbInstanceId | Query | UUID   | X  | Original DB instance identifier                                            |
| dbVersion    | Query | Enum   | X  | DB version information                                                   |

#### Response

| Name                   | Type   | Format       | Description                                                                                                                                                        |
|----------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| totalCounts          | Body | Number   | Number of all backup lists                                                                                                                                                |
| backups              | Body | Array    | Backup list                                                                                                                                                     |
| backups.backupId     | Body | UUID     | Backup identifier                                                                                                                                                   |
| backups.backupName   | Body | String   | Name to identify backups                                                                                                                                           |
| backups.backupStatus | Body | Enum     | Backup current status<br/>`BACKING_UP`: Backup in progress<br/>`COMPLETED`: Backup completed<br/>`DELETING`: Backup being deleted<br/>`DELETED`: Backup deleted<br/>`ERROR`: Error occurred |
| backups.dbInstanceId | Body | UUID     | Original DB instance identifier                                                                                                                                           |
| backups.dbVersion    | Body | Enum     | DB version information                                                                                                                                                  |
| backups.backupType   | Body | Enum     | Backup type<br/>- `AUTO`: Automatic<br/>- `MANUAL`:  Manual                                                                                                                |
| backups.backupSize   | Body | Number   | Size of the backup<br/>- Unit: `Bytes`                                                                                                                                    |
| createdYmdt          | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                         |
| updatedYmdt          | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                         |
| completedYmdt        | Body | DateTime | End date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                         |

<details><summary>Example</summary>

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

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Export backup to object storage

```http
POST /v1.0/backups/{backupId}/export
```

#### Required permissions

| Permission Name                            | Description                 |
|--------------------------------|--------------------|
| RDSforPostgreSQL:Backup.Export | Export backup to object storage |

#### Request

| Name              | Type   | Format     | Required | Description                          |
|-----------------|------|--------|----|-----------------------------|
| backupId        | URL  | UUID   | O  | Backup identifier                     |
| tenantId        | Body | String | O  | Tenant ID of object storage to store backup   |
| username        | Body | String | O  | ID of NHN Cloud Account or IAM Account   |
| password        | Body | String | O  | API password for object storage where backup is stored |
| targetContainer | Body | String | O  | Object storage container where backup is stored     |
| objectPath      | Body | String | O  | Backup path to be stored in container            |

<details><summary>Example</summary>

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

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Restore Backup

```http
POST /v1.0/backups/{backupId}/restore
```

#### Required permissions

| Permission Name                             | Description      |
|---------------------------------|---------|
| RDSforPostgreSQL:Backup.Restore | Restore Backup |

#### Request

| Name                                       | Type   | Format      | Required | Description                                                                                                                                                                                                                        |
|------------------------------------------|------|---------|----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| backupId                                 | URL  | UUID    | O  | Backup identifier                                                                                                                                                                                                                   |
| dbInstanceName                           | Body | String  | O  | Name to identify DB instances                                                                                                                                                                                                      |
| description                              | Body | String  | X  | Additional information on DB instances                                                                                                                                                                                                         |
| dbFlavorId                               | Body | UUID    | O  | Identifier of DB instance specifications                                                                                                                                                                                                           |
| dbPort                                   | Body | Number  | O  | DB port<br/>- Minimum value: `0`<br/>- Maximum value: 65535                                                                                                                                                                                |
| parameterGroupId                         | Body | UUID    | O  | Parameter group identifier                                                                                                                                                                                                              |
| dbSecurityGroupIds                       | Body | Array   | X  | DB security group identifiers                                                                                                                                                                                                          ||network|Body|Object|O|Network information objects|
| userGroupIds                             | Body | Array   | X  | User group identifiers                                                                                                                                                                                                            |
| useDefaultNotification                   | Body | Boolean | X  | Whether to use default notification<br/>Default: `false`                                                                                                                                                                                            |
| useDeletionProtection                    | Body | Boolean | X  | Whether to protect against deletion<br/>Default: `false`                                                                                                                                                                                               | 
| useHighAvailability                      | Body | Boolean | X  | Whether to use high availability                                                                                                                                                                                                                |
| pingInterval                             | Body | Number  | X  | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600`                                                                                                                                                                      |
| failoverReplWaitingTime                  | Body | Number  | X  | Failover latency when using high availability<br/>- Minimum value: `0`<br/>- If set to -1, it will continue to wait for the replication delay to resolve.                                                                                                                                              |                                                                                                                                                                                                                      | userGroupIds                             | Body | Array   | X  | List of identifiers for user groups that receive default notifications                                                                                                                                                                                             |
| network                                  | Body | Object  | O  | Network information objects                                                                                                                                                                                                                |
| network.subnetId                         | Body | UUID    | O  | Subnet identifier                                                                                                                                                                                                                  |
| network.usePublicAccess                  | Body | Boolean | X  | External access is available or not<br/>Default: `false`                                                                                                                                                                                            |
| network.availabilityZone                 | Body | Enum    | X  | Availability zone where DB instance will be created<br/>- Example: `kr-pub-a`<br/>- Default: `Any availability` zone                                                                                                                                                          |
| storage                                  | Body | Object  | O  | Storage information objects                                                                                                                                                                                                                |    
| storage.storageType                      | Body | Enum    | O  | Data storage types<br/>- Example: `General SSD`                                                                                                                                                                                       |
| storage.storageSize                      | Body | Number  | O  | Data storage size<br/>- Unit: `Gigabytes`<br/>- Minimum value: `20`<br/>- Maximum value: `2048`                                                                                                                                                           |
| backup                                   | Body | Object  | O  | Backup information objects                                                                                                                                                                                                                  |
| backup.backupPeriod                      | Body | Number  | O  | Backup retention period<br/>- Minimum value: `0`<br/>- Maximum value: `730`                                                                                                                                                                               |
| backup.backupRetryCount                  | Body | Number  | X  | Number of backup retries<br/>Default: `6`<br/>- Minimum value: `0`<br/>- Maximum value: `10`                                                                                                                                                                   |
| backup.backupSchedules                   | Body | Array   | X  | Backup schedules                                                                                                                                                                                                                 |
| backup.backupSchedules.backupWndBgnTime  | Body | String  | O  | Backup Start Time<br/>- Example: `00:00:00`                                                                                                                                                                                             |
| backup.backupSchedules.backupWndDuration | Body | Enum    | O  | Backup duration<br/>Auto backup is executed within the set duration from the backup start time.<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1.5 hour<br/>- `TWO_HOURS`: 2 hour<br/>- `TWO_HOURS_AND_HALF`: 2.5 hour<br/>- `THREE_HOURS`: 3 hour |

<details><summary>Example</summary>

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

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Delete Backup

```http
DELETE /v1.0/backups/{backupId}
```

#### Required permissions

| Permission Name                            | Description      |
|--------------------------------|---------|
| RDSforPostgreSQL:Backup.Delete | Delete Backup |

#### Request

This API does not require a request body.

| Name       | Type  | Format   | Required | Description      |
|----------|-----|------|----|---------|
| backupId | URL | UUID | O  | Backup identifier |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

## DB Security Group

### List DB Security Groups

```http
GET /v1.0/db-security-groups
```

#### Required permissions

| Permission Name                                   | Description             |
|---------------------------------------|----------------|
| RDSforPostgreSQL:DbSecurityGroup.List | List DB Security Groups |

#### Request

This API does not require a request body.

#### Response

| Name                                     | Type   | Format       | Description                                                                                                                                                                                             |
|----------------------------------------|------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroups                       | Body | Array    | DB security groups                                                                                                                                                                                    |
| dbSecurityGroups.dbSecurityGroupId     | Body | UUID     | DB security group identifier                                                                                                                                                                                  |
| dbSecurityGroups.dbSecurityGroupName   | Body | String   | Name to identify DB instances                                                                                                                                                                          |
| dbSecurityGroups.dbSecurityGroupStatus | Body | Enum     | Current status of DB security groups<br/>- `CREATED: Created`<br/>- `DELETED`: Deleted                                                                                                                                      |
| dbSecurityGroups.description           | Body | String   | Additional information on DB security group                                                                                                                                                                             |
| dbSecurityGroups.progressStatus        | Body | Enum     | Current status of DB security group<br/>- `NONE`: No work in progress<br/>- `CREATING_RULE`: Creating rule policy<br/>- `UPDATING_RULE`: Modifying rule policy<br/>- `DELETING_RULE`: Deleting rule policy<br/>- `APPLYING_DEFAULT_RULE`: Applying default rule  |
| dbSecurityGroups.createdYmdt           | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                              |
| dbSecurityGroups.updatedYmdt           | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                              |

<details><summary>Example</summary>

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

### List DB Security Group Details

```http
GET /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### Required permissions

| Permission Name                                  | Description             |
|--------------------------------------|----------------|
| RDSforPostgreSQL:DbSecurityGroup.Get | List DB Security Group Details |

#### Request

This API does not require a request body.

| Name                | Type  | Format   | Required | Description            |
|-------------------|-----|------|----|---------------|
| dbSecurityGroupId | URL | UUID | O  | DB security group identifier |

#### Response

| Name                    | Type   | Format       | Description                                                                                                                                                                                            |
|-----------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId     | Body | UUID     | DB security group identifier                                                                                                                                                                                 |
| dbSecurityGroupName   | Body | String   | Name to identify DB instances                                                                                                                                                                         |
| dbSecurityGroupStatus | Body | Enum     | Current status of DB security groups<br/>- `CREATED: Created`<br/>- `DELETED`: Deleted                                                                                                                                     |
| description           | Body | String   | Additional information on DB security group                                                                                                                                                                            |
| progressStatus        | Body | Enum     | Current status of DB security group<br/>- `NONE`: No work in progress<br/>- `CREATING_RULE`: Creating rule policy<br/>- `UPDATING_RULE`: Modifying rule policy<br/>- `DELETING_RULE`: Deleting rule policy<br/>- `APPLYING_DEFAULT_RULE`: Applying default rule |
| rules                 | Body | Array    | DB security group rules                                                                                                                                                                                |
| rules.ruleId          | Body | UUID     | DB security group rule identifier                                                                                                                                                                              |
| rules.description     | Body | String   | Additional information on DB security group rule                                                                                                                                                                         |
| rules.direction       | Body | Enum     | Communication direction<br/>- `INGRESS`: Inbound<br/>- `EGRESS`: Outbound                                                                                                                                                  |
| rules.etherType       | Body | Enum     | Ether type<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                                |
| rules.port            | Body | Object   | Port object                                                                                                                                                                                         |
| rules.port.portType   | Body | Enum     | Port type<br/>- `DB_PORT`: Sets to DB instance port value.<br/>- `PORT`: Sets to specified port value.<br/>- `PORT_RANGE`: Sets to specified port range.                                                                            |
| rules.port.minPort    | Body | Number   | Minimum port range                                                                                                                                                                                      |
| rules.port.maxPort    | Body | Number   | Maximum port range                                                                                                                                                                                      |
| rules.cidr            | Body | String   | Remote source for traffic to allow                                                                                                                                                                                |
| rules.createdYmdt     | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                             |
| rules.updatedYmdt     | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                             |
| createdYmdt           | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                             |
| updatedYmdt           | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                             |

<details><summary>Example</summary>

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

### Create DB Security Group

```http
POST /v1.0/db-security-groups
```

#### Required permissions

| Permission Name                                     | Description            |
|-----------------------------------------|---------------|
| RDSforPostgreSQL:DbSecurityGroup.Create | Create DB Security Group |

#### Request

| Name                  | Type   | Format     | Required | Description                                                                                                                                                                                       |
|---------------------|------|--------|----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupName | Body | String | O  | Name to identify DB instances                                                                                                                                                                    |
| description         | Body | String | X  | Additional information on DB security group                                                                                                                                                                       |
| rules               | Body | Array  | O  | DB security group rules                                                                                                                                                                           |
| rules.description   | Body | String | X  | Additional information on DB security group rule                                                                                                                                                                    |
| rules.direction     | Body | Enum   | O  | Communication direction<br/>- `INGRESS`: Inbound<br/>- `EGRESS`: Outbound                                                                                                                                             |
| rules.etherType     | Body | Enum   | O  | Ether type<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                           |
| rules.cidr          | Body | String | O  | Remote source for traffic to allow<br/>- Example: `1.1.1.1/32`                                                                                                                                                    |
| rules.port          | Body | Object | O  | Port object                                                                                                                                                                                    |
| rules.port.portType | Body | Enum   | O  | Port type<br/>- `DB_PORT`: Sets to DB instance port value. Values for `minPort` 값과 `maxPort` are not required.<br/>- `PORT`: 지정된 포트값으로 설정됩니다. `minPort`값과 `maxPort`값이 같아야 합니다.<br/>- `PORT_RANGE`: Sets to specified port range. |
| rules.port.minPort  | Body | Number | X  | Minimum port range<br/>- Minimum value received: 5432<br/>- Transmit minimum: 1                                                                                                                                              |
| rules.port.maxPort  | Body | Number | X  | Maximum port range<br/>- Maximum received: 45432<br/>- Send maximum: 65535                                                                                                                                         |

<details><summary>Example</summary>

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

#### Response

| Name                | Type   | Format   | Description            |
|-------------------|------|------|---------------|
| dbSecurityGroupId | Body | UUID | DB security group identifier |

<details><summary>Example</summary>

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

### Modify DB Security Group

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### Required permissions

| Permission Name                                     | Description            |
|-----------------------------------------|---------------|
| RDSforPostgreSQL:DbSecurityGroup.Modify | Modify DB Security Group |

#### Request

| Name                  | Type   | Format     | Required | Description                    |
|---------------------|------|--------|----|-----------------------|
| dbSecurityGroupId   | URL  | UUID   | O  | DB security group identifier         |
| dbSecurityGroupName | Body | String | X  | Name to identify DB instances |
| description         | Body | String | X  | Additional information on DB security group    |

<details><summary>Example</summary>

```json
{
    "dbSecurityGroupName": "dbSecurityGroup",
    "description": "description"
}
```
</details>

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

### Delete DB Security Group

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### Required permissions

| Permission Name                                     | Description            |
|-----------------------------------------|---------------|
| RDSforPostgreSQL:DbSecurityGroup.Delete | Delete DB Security Group |

#### Request

This API does not require a request body.

| Name                | Type  | Format   | Required | Description            |
|-------------------|-----|------|----|---------------|
| dbSecurityGroupId | URL | UUID | O  | DB security group identifier |

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

### Create DB Security Group

```http
POST /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### Required permissions

| Permission Name                                         | Description               |
|---------------------------------------------|------------------|
| RDSforPostgreSQL:DbSecurityGroupRule.Create | Create DB Security Group |

#### Request

| Name                | Type   | Format     | Required | Description                                                                                                                                                                                       |
|-------------------|------|--------|----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId | URL  | UUID   | O  | DB security group identifier                                                                                                                                                                            |
| description       | Body | String | X  | Additional information on DB security group rule                                                                                                                                                                    |
| direction         | Body | Enum   | O  | Communication direction<br/>- `INGRESS`: Inbound<br/>- `EGRESS`: Outbound                                                                                                                                             |
| etherType         | Body | Enum   | O  | Ether type<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                           |
| port              | Body | Object | O  | Port object                                                                                                                                                                                    |
| port.portType     | Body | Enum   | O  | Port type<br/>- `DB_PORT`: Sets to DB instance port value. Values for `minPort` 값과 `maxPort` are not required.<br/>- `PORT`: 지정된 포트값으로 설정됩니다. `minPort`값과 `maxPort`값이 같아야 합니다.<br/>- `PORT_RANGE`: Sets to specified port range. |
| port.minPort      | Body | Number | X  | Minimum port range<br/>- Minimum value received: 5432<br/>- Transmit minimum: 1                                                                                                                                              |
| port.maxPort      | Body | Number | X  | Maximum port range<br/>- Maximum received: 45432<br/>- Send maximum: 65535                                                                                                                                         |
| cidr              | Body | String | O  | Remote source for traffic to allow<br/>- Example: `1.1.1.1/32`                                                                                                                                                    |

<details><summary>Example</summary>

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

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Modify DB Security Group Rule

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### Required permissions

| Permission Name                                         | Description               |
|---------------------------------------------|------------------|
| RDSforPostgreSQL:DbSecurityGroupRule.Modify | Modify DB Security Group Rule |

#### Request

| Name                | Type   | Format     | Required | Description                                                                                                                                                                                       |
|-------------------|------|--------|----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId | URL  | UUID   | O  | DB security group identifier                                                                                                                                                                            |
| ruleId            | URL  | UUID   | O  | DB security group rule identifier                                                                                                                                                                         |
| description       | Body | String | X  | Additional information on DB security group rule                                                                                                                                                                    |
| direction         | Body | Enum   | O  | Communication direction<br/>- `INGRESS`: Inbound<br/>- `EGRESS`: Outbound                                                                                                                                             |
| etherType         | Body | Enum   | O  | Ether type<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                           |
| port              | Body | Object | O  | Port object                                                                                                                                                                                    |
| port.portType     | Body | Enum   | O  | Port type<br/>- `DB_PORT`: Sets to DB instance port value. Values for `minPort` 값과 `maxPort` are not required.<br/>- `PORT`: 지정된 포트값으로 설정됩니다. `minPort`값과 `maxPort`값이 같아야 합니다.<br/>- `PORT_RANGE`: Sets to specified port range. |
| port.minPort      | Body | Number | X  | Minimum port range<br/>- Minimum value received: 5432<br/>- Transmit minimum: 1                                                                                                                                              |
| port.maxPort      | Body | Number | X  | Maximum port range<br/>- Maximum received: 45432<br/>- Send maximum: 65535                                                                                                                                         |
| cidr              | Body | String | O  | Remote source for traffic to allow<br/>- Example: `1.1.1.1/32`                                                                                                                                                    |

<details><summary>Example</summary>

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

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

### Delete DB Security Group Rule

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### Required permissions

| Permission Name                                         | Description               |
|---------------------------------------------|------------------|
| RDSforPostgreSQL:DbSecurityGroupRule.Create | Delete DB Security Group Rule |

#### Request

This API does not require a request body.

| Name                | Type    | Format    | Required | Description                  |
|-------------------|-------|-------|----|---------------------|
| dbSecurityGroupId | URL   | UUID  | O  | DB security group identifier       |
| ruleIds           | Query | Array | O  | DB security group rule identifiers |

#### Response

| Name    | Type   | Format   | Description          |
|-------|------|------|-------------|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>

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

## Parameter group

### List Parameter Groups

```http
GET /v1.0/parameter-groups
```

#### Required permissions

| Permission Name                                  | Description            |
|--------------------------------------|---------------|
| RDSforPostgreSQL:ParameterGroup.List | List Parameter Groups |

#### Request

This API does not require a request body.

| Name        | Type    | Format   | Required | Description       |
|-----------|-------|------|----|----------|
| dbVersion | Query | Enum | X  | DB version information |

#### Response

| Name                                   | Type   | Format       | Description                                                                |
|--------------------------------------|------|----------|-------------------------------------------------------------------|
| parameterGroups                      | Body | Array    | Parameter groups                                                        |
| parameterGroups.parameterGroupId     | Body | UUID     | Parameter group identifier                                                      |
| parameterGroups.parameterGroupName   | Body | String   | Name to identify parameter groups                                              |
| parameterGroups.parameterGroupStatus | Body | Enum     | Parameter group current status<br/>- `STABLE`: Applied<br/>- `NEED_TO_APPLY`: Need to apply |
| parameterGroups.description          | Body | String   | Additional information on parameter group                                                 |
| parameterGroups.dbVersion            | Body | Enum     | DB version information                                                          |
| parameterGroups.createdYmdt          | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                 |
| parameterGroups.updatedYmdt          | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                 |

<details><summary>Example</summary>

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


### List Parameter Group Details

```http
GET /v1.0/parameter-groups/{parameterGroupId}
```

#### Required permissions

| Permission Name                                 | Description            |
|-------------------------------------|---------------|
| RDSforPostgreSQL:ParameterGroup.Get | List Parameter Group Details |

#### Request

This API does not require a request body.

| Name               | Type  | Format   | Required | Description           |
|------------------|-----|------|----|--------------|
| parameterGroupId | URL | UUID | O  | Parameter group identifier |

#### Response

| Name                           | Type   | Format       | Description                                                                                                                                                                                                                                                                                                                                                 |
|------------------------------|------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| parameterGroupId             | Body | UUID     | Parameter group identifier                                                                                                                                                                                                                                                                                                                                       |
| parameterGroupName           | Body | String   | Name to identify parameter groups                                                                                                                                                                                                                                                                                                                               |
| description                  | Body | String   | Additional information on parameter group                                                                                                                                                                                                                                                                                                                                  |
| dbVersion                    | Body | Enum     | DB version information                                                                                                                                                                                                                                                                                                                                           |
| parameterGroupStatus         | Body | Enum     | Parameter group current status<br/>- `STABLE`: Applied<br/>- `NEED_TO_APPLY`: Need to apply<br/>- `DELETED`: Deleted                                                                                                                                                                                                                                                             |
| parameters                   | Body | Array    | Parameter list                                                                                                                                                                                                                                                                                                                                            |
| parameters.parameterCategory | Body | String   | Parameter Categories                                                                                                                                                                                                                                                                                                                                          |
| parameters.parameterName     | Body | String   | Parameter name                                                                                                                                                                                                                                                                                                                                            |
| parameters.value             | Body | String   | Current value                                                                                                                                                                                                                                                                                                                                           |
| parameters.valueUnit         | Body | Enum     | The units of the currently set value<br/>- `B`: Bytes<br/>- `kB`: Kilobyte<br/>- `MB`: Megabytes<br/>- `GB`: Gigabyte<br/>- `TB`: Terabyte<br/>- `us`: Microseconds<br/>- `ms`: milliseconds<br/>- `s`: seconds<br/>- `min`: Minutes<br/>- `h`: hour<br/>- `d`: day                                                                                                                                                        |
| parameters.defaultValue      | Body | String   | Default value                                                                                                                                                                                                                                                                                                                                                |
| parameters.allowedValue      | Body | String   | Permitted values                                                                                                                                                                                                                                                                                                                                              |
| parameters.valueType         | Body | Enum     | Value type<br/>- `BOOLEAN: Boolean` type<br/>- `STRING`: String type<br/>- `NUMERIC`: Integer and floating-point types<br/>- `NUMERIC_WITH_BYTE_UNIT`: Numeric type with byte unit (e.g. 120 KB, 100 MB)<br/>- `NUMERIC_WITH_TIME_UNIT`: Numeric type with time unit (e.g. 120ms, 100s, 1d)<br/>- `ENUMERATED`: Enter one of the values declared in Allowed Values<br/>- `MULTI_ENUMERATED`: Enter multiple of the values declared in Allowed values (separated by commas (,))<br/>- `TIMEZONE`: Timezone type |
| parameters.updateType        | Body | Enum     | Modification type<br/>- `VARIABLE`: Modifiable any time<br/>- `CONSTANT`: Not modifiable                                                                                                                                                                                                                                                                                         |
| parameters.applyType         | Body | Enum     | Applied type<br/>- `SESSION`: Apply session<br/>- `FILE`: Apply setting file (restart required)<br/>- `BOTH`: All                                                                                                                                                                                                                                                                       | 
| createdYmdt                  | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                                                                                                                                                                                  |
| updatedYmdt                  | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                                                                                                                                                                                  |
| expressionAvailable          | Body | Boolean  | Allow formulas or not                                                                                                                                                                                                                                                                                                                                           |

<details><summary>Example</summary>

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


### Create Parameter Group

```http
POST /v1.0/parameter-groups
```

#### Required permissions

| Permission Name                                    | Description           |
|----------------------------------------|--------------|
| RDSforPostgreSQL:ParameterGroup.Create | Create Parameter Group |

#### Request

| Name                 | Type   | Format     | Required | Description                   |
|--------------------|------|--------|----|----------------------|
| parameterGroupName | Body | String | O  | Name to identify parameter groups |
| description        | Body | String | X  | Additional information on parameter group    |
| dbVersion          | Body | Enum   | O  | DB version information             |

<details><summary>Example</summary>

```json
{
    "parameterGroupName": "parameter-group",
    "description": "description",
    "dbVersion": "POSTGRESQL_V17_6"
}
```
</details>

#### Response

| Name               | Type   | Format   | Description           |
|------------------|------|------|--------------|
| parameterGroupId | Body | UUID | Parameter group identifier |

<details><summary>Example</summary>

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

### Copy Parameter Group

```http
POST /v1.0/parameter-groups/{parameterGroupId}/copy
```

#### Required permissions

| Permission Name                                  | Description           |
|--------------------------------------|--------------|
| RDSforPostgreSQL:ParameterGroup.Copy | Copy Parameter Group |

#### Request

| Name                 | Type   | Format     | Required | Description                   |
|--------------------|------|--------|----|----------------------|
| parameterGroupId   | URL  | UUID   | O  | Parameter group identifier         |
| parameterGroupName | Body | String | O  | Name to identify parameter groups |
| description        | Body | String | X  | Additional information on parameter group    |

<details><summary>Example</summary>

```json
{
    "parameterGroupName": "parameter-group-copy",
    "description": "copy"
}
```
</details>

#### Response

| Name               | Type   | Format   | Description           |
|------------------|------|------|--------------|
| parameterGroupId | Body | UUID | Parameter group identifier |

<details><summary>Example</summary>

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

### Modify Parameter Group

```http
PUT /v1.0/parameter-groups/{parameterGroupId}
```

#### Required permissions

| Permission Name                                    | Description           |
|----------------------------------------|--------------|
| RDSforPostgreSQL:ParameterGroup.Modify | Modify Parameter Group |

#### Request

| Name                 | Type   | Format     | Required | Description                   |
|--------------------|------|--------|----|----------------------|
| parameterGroupId   | URL  | UUID   | O  | Parameter group identifier         |
| parameterGroupName | Body | String | X  | Name to identify parameter groups |
| description        | Body | String | X  | Additional information on parameter group    |

<details><summary>Example</summary>

```json
{
    "parameterGroupName": "parameter-group",
    "description": "description"
}
```
</details>

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

### Modify Parameter

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/parameters
```

#### Required permissions

| Permission Name                                    | Description           |
|----------------------------------------|--------------|
| RDSforPostgreSQL:ParameterGroup.Modify | Modify Parameter Group |

#### Request

| Name                               | Type   | Format     | Required | Description           |
|----------------------------------|------|--------|----|--------------|
| parameterGroupId                 | URL  | UUID   | O  | Parameter group identifier |
| modifiedParameters               | Body | Array  | O  | Parameters to change  |
| modifiedParameters.parameterName | Body | UUID   | O  | Parameter name      |
| modifiedParameters.value         | Body | String | O  | Parameter value to change   |

<details><summary>Example</summary>

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

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

### Reset Parameter Group

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/reset
```

#### Required permissions

| Permission Name                                   | Description            |
|---------------------------------------|---------------|
| RDSforPostgreSQL:ParameterGroup.Reset | Reset Parameter Group |

#### Request

| Name               | Type  | Format   | Required | Description           |
|------------------|-----|------|----|--------------|
| parameterGroupId | URL | UUID | O  | Parameter group identifier |

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

### Delete Parameter Group

```http
DELETE /v1.0/parameter-groups/{parameterGroupId}
```

#### Required permissions

| Permission Name                                    | Description           |
|----------------------------------------|--------------|
| RDSforPostgreSQL:ParameterGroup.Delete | Delete Parameter Group |

#### Request

This API does not require a request body.

| Name               | Type  | Format   | Required | Description           |
|------------------|-----|------|----|--------------|
| parameterGroupId | URL | UUID | O  | Parameter group identifier |

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

## User Group

### List User Groups

```http
GET /v1.0/user-groups
```

#### Required permissions

| Permission Name                             | Description           |
|---------------------------------|--------------|
| RDSforPostgreSQL:UserGroup.List | List User Groups |

#### Request

This API does not require a request body.

#### Response

| Name                       | Type   | Format       | Description                                                      |
|--------------------------|------|----------|---------------------------------------------------------|
| userGroups               | Body | Array    | User Groups                                               |
| userGroups.userGroupId   | Body | UUID     | User group identifier                                             |
| userGroups.userGroupName | Body | String   | Name to identify user groups                                     |
| userGroupStatus          | Body | Enum     | Current status of user groups<br/>- `CREATED: Created`<br/>- `DELETED`: Deleted |
| userGroups.createdYmdt   | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                       |
| userGroups.updatedYmdt   | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                       |

<details><summary>Example</summary>

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


### List User Group Details

```http
GET /v1.0/user-groups/{userGroupId}
```

#### Required permissions

| Permission Name                            | Description           |
|--------------------------------|--------------|
| RDSforPostgreSQL:UserGroup.Get | List User Group Details |

#### Request

This API does not require a request body.

| Name          | Type  | Format   | Required | Description          |
|-------------|-----|------|----|-------------|
| userGroupId | URL | UUID | O  | User group identifier |

#### Response

| Name                | Type   | Format       | Description                                                                                                        |
|-------------------|------|----------|-----------------------------------------------------------------------------------------------------------|
| userGroupId       | Body | UUID     | User group identifier                                                                                               |
| userGroupName     | Body | String   | Name to identify user groups                                                                                       |
| userGroupTypeCode | Body | Enum     | User group type    <br /> `ENTIRE`: User group including all project members <br /> `INDIVIDUAL_MEMBER`: User group including specific project members |
| userGroupStatus   | Body | Enum     | Current status of user groups<br/>- `CREATED: Created`<br/>- `DELETED`: Deleted                                                   |
| members           | Body | Array    | Project member list                                                                                                |
| members.memberId  | Body | UUID     | Project member identifier                                                                                              |
| createdYmdt       | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                         |
| updatedYmdt       | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                         |

<details><summary>Example</summary>

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


### Create User Group

```http
POST /v1.0/user-groups
```

#### Required permissions

| Permission Name                               | Description          |
|-----------------------------------|-------------|
| RDSforPostgreSQL:UserGroup.Create | Create User Group |

#### Request

| Name            | Type   | Format      | Required | Description                                                              |
|---------------|------|---------|----|-----------------------------------------------------------------|
| userGroupName | Body | String  | O  | Name to identify user groups                                             |
| memberIds     | Body | Array   | O  | Project member identifiers     <br /> Ignored when `selectAllYN` is true |
| selectAllYN   | Body | Boolean | X  | All project members or not <br /> If true, the group is set for all members              |

<details><summary>Example</summary>

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

#### Response

| Name          | Type   | Format   | Description          |
|-------------|------|------|-------------|
| userGroupId | Body | UUID | User group identifier |


### Modify User Group

```http
PUT /v1.0/user-groups/{userGroupId}
```

#### Required permissions

| Permission Name                               | Description          |
|-----------------------------------|-------------|
| RDSforPostgreSQL:UserGroup.Modify | Modify User Group |

#### Request

| Name            | Type   | Format      | Required | Description                                                 |
|---------------|------|---------|----|----------------------------------------------------|
| userGroupId   | URL  | UUID    | O  | User group identifier                                        |
| userGroupName | Body | String  | X  | Name to identify user groups                                |
| memberIds     | Body | Array   | X  | Project member identifiers                                    |
| selectAllYN   | Body | Boolean | X  | All project members or not <br /> If true, the group is set for all members |

<details><summary>Example</summary>

```json
{
    "userGroupName": "dev-team",
    "memberIds": ["1321e759-2ef3-4b85-9921-b13e918b24b5","f9064b09-2b15-442e-a4b0-3a5a2754555e"]
}
```
</details>

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

### Delete User Group

```http
DELETE /v1.0/user-groups/{userGroupId}
```

#### Required permissions

| Permission Name                               | Description          |
|-----------------------------------|-------------|
| RDSforPostgreSQL:UserGroup.Delete | Delete User Group |

#### Request

| Name          | Type  | Format   | Required | Description          |
|-------------|-----|------|----|-------------|
| userGroupId | URL | UUID | O  | User group identifier |

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

## Notification Group

### List Notification Groups

```http
GET /v1.0/notification-groups
```

#### Required permissions

| Permission Name                                     | Description          |
|-----------------------------------------|-------------|
| RDSforPostgreSQL:NotificationGroup.List | List Notification Groups |

#### Request

This API does not require a request body.

#### Response

| Name                                         | Type   | Format       | Description                                                     |
|--------------------------------------------|------|----------|--------------------------------------------------------|
| notificationGroups                         | Body | Array    | Notification Groups                                               |
| notificationGroups.notificationGroupId     | Body | UUID     | Notification group identifier                                             |
| notificationGroups.notificationGroupName   | Body | String   | Name to identify notification groups                                     |
| notificationGroups.notificationGroupStatus | Body | Enum     | Current status of notification groups<br/>- `CREATED: Created`<br/>- `DELETED`: Deleted |
| notificationGroups.notifyEmail             | Body | Boolean  | Whether to be notified by email                                              |
| notificationGroups.notifySms               | Body | Boolean  | Whether to be notified by SMS                                              |
| notificationGroups.isEnabled               | Body | Boolean  | Indicates whether the flavor is enabled                                                 |
| notificationGroups.createdYmdt             | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                      |
| notificationGroups.updatedYmdt             | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                      |

<details><summary>Example</summary>

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


### List Notification Groups

```http
GET /v1.0/notification-groups/{notificationGroupId}
```

#### Required permissions

| Permission Name                                    | Description          |
|----------------------------------------|-------------|
| RDSforPostgreSQL:NotificationGroup.Get | List Notification Groups |

#### Request

This API does not require a request body.

| Name                  | Type  | Format   | Required | Description         |
|---------------------|-----|------|----|------------|
| notificationGroupId | URL | UUID | O  | Notification group identifier |

#### Response

| Name                         | Type   | Format       | Description                                                     |
|----------------------------|------|----------|--------------------------------------------------------|
| notificationGroupId        | Body | UUID     | Notification group identifier                                             |
| notificationGroupName      | Body | String   | Name to identify notification groups                                     |
| notificationGroupStatus    | Body | Enum     | Current status of notification groups<br/>- `CREATED: Created`<br/>- `DELETED`: Deleted |
| notifyEmail                | Body | Boolean  | Whether to be notified by email                                              |
| notifySms                  | Body | Boolean  | Whether to be notified by SMS                                              |
| isEnabled                  | Body | Boolean  | Indicates whether the flavor is enabled                                                 |
| dbInstances                | Body | Array    | DB Instances to monitor                                       |
| dbInstances.dbInstanceId   | Body | UUID     | DB instance identifier                                           |
| dbInstances.dbInstanceName | Body | String   | Name to identify DB instances                                   |
| userGroups                 | Body | Array    | User Groups                                              |
| userGroups.userGroupId     | Body | UUID     | User group identifier                                            |
| userGroups.userGroupName   | Body | String   | Name to identify user groups                                    |
| createdYmdt                | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                      |
| updatedYmdt                | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                      |

<details><summary>Example</summary>

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


### Create Notification Group

```http
POST /v1.0/notification-groups
```

#### Required permissions

| Permission Name                                       | Description         |
|-------------------------------------------|------------|
| RDSforPostgreSQL:NotificationGroup.Create | Create Notification Group |

#### Request

| Name                    | Type   | Format      | Required | Description                          |
|-----------------------|------|---------|----|-----------------------------|
| notificationGroupName | Body | String  | O  | Name to identify notification groups          |
| notifyEmail           | Body | Boolean | X  | Whether to be notified by email<br/>Default: `true` |
| notifySms             | Body | Boolean | X  | Whether to be notified by SMS<br/>Default: `true` |
| isEnabled             | Body | Boolean | X  | Indicates whether the flavor is enabled<br/>Default: `true`    |
| dbInstanceIds         | Body | Array   | X  | DB instance identifiers to monitor       |
| userGroupIds          | Body | Array   | X  | User group identifiers              |

<details><summary>Example</summary>

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

#### Response

| Name                  | Type   | Format   | Description         |
|---------------------|------|------|------------|
| notificationGroupId | Body | UUID | Notification group identifier |


### Modify Notification Group

```http
PUT /v1.0/notification-groups/{notificationGroupId}
```

#### Required permissions

| Permission Name                                       | Description         |
|-------------------------------------------|------------|
| RDSforPostgreSQL:NotificationGroup.Modify | Modify Notification Group |

#### Request

| Name                    | Type   | Format      | Required | Description                    |
|-----------------------|------|---------|----|-----------------------|
| notificationGroupId   | URL  | UUID    | O  | Notification group identifier            |
| notificationGroupName | Body | String  | X  | Name to identify notification groups    |
| notifyEmail           | Body | Boolean | X  | Whether to be notified by email             |
| notifySms             | Body | Boolean | X  | Whether to be notified by SMS             |
| isEnabled             | Body | Boolean | X  | Indicates whether the flavor is enabled                |
| dbInstanceIds         | Body | Array   | X  | DB instance identifiers to monitor |
| userGroupIds          | Body | Array   | X  | User group identifiers        |

<details><summary>Example</summary>

```json
{
    "notifyEmail": true,
    "dbInstanceIds": ["ed5cb985-526f-4c54-9ae0-40288593de65", "d51b7da0-682f-47ff-b588-b739f6adc740"]
}
```
</details>

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

### Delete Notification Group

```http
DELETE /v1.0/notification-groups/{notificationGroupId}
```

#### Required permissions

| Permission Name                                       | Description         |
|-------------------------------------------|------------|
| RDSforPostgreSQL:NotificationGroup.Delete | Delete Notification Group |

#### Request

This API does not require a request body.

| Name                  | Type  | Format   | Required | Description         |
|---------------------|-----|------|----|------------|
| notificationGroupId | URL | UUID | O  | Notification group identifier |

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

### View the list of watch settings

```http
GET /v1.0/notification-groups/{notificationGroupId}/watchdogs
```

#### Required permissions

| Permission Name                                        | Description          |
|--------------------------------------------|-------------|
| RDSforPostgreSQL:NotificationWatchdog.List | View the list of watch settings |

#### Request

This API does not require a request body.

#### Response

| Name                           | Type   | Format       | Description                                                                     |
|------------------------------|------|----------|------------------------------------------------------------------------|
| notificationGroupId          | URL  | UUID     | Notification group identifier                                                             | Notification group identifier                                                            |
| watchdogs                    | Body | Array    | List of watch settings                                                               |
| watchdogs.watchdogId         | Body | UUID     | Identifier of the watch setting                                                             |
| watchdogs.metricName         | Body | Enum     | Performance metrics to watch<br/>- For the performance metrics you can set, see [Viewing the performance metrics list](#성능-지표-목록-보기). |
| watchdogs.comparisonOperator | Body | Enum     | How to compare watchlists<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: >  |
| watchdogs.threshold          | Body | Long     | Thresholds to watch                                                              |
| watchdogs.duration           | Body | Long     | Watchlist duration<br/>- Unit: `minutes`                                              |
| watchdogs.createdYmdt        | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                      |

<details><summary>Example</summary>

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

### Create a watch setting

```http
POST /v1.0/notification-groups/{notificationGroupId}/watchdogs
```

#### Required permissions

| Permission Name                                          | Description         |
|----------------------------------------------|------------|
| RDSforPostgreSQL:NotificationWatchdog.Create | Create a watch setting |

#### Request

| Name                  | Type   | Format   | Required | Description                                                                     |
|---------------------|------|------|----|------------------------------------------------------------------------|
| notificationGroupId | URL  | UUID | O  | Notification group identifier                                                             |
| metricName          | Body | Enum | O  | Performance metrics to watch<br/>- For the performance metrics you can set, see [Viewing the performance metrics list](#성능-지표-목록-보기). |
| comparisonOperator  | Body | Enum | O  | How to compare watchlists<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: >  |
| threshold           | Body | Long | O  | Thresholds to watch                                                              |
| duration            | Body | Long | O  | Watchlist duration<br/>- Unit: `minutes`                                              |

<details><summary>Example</summary>

```json
{
    "metricName": "DATABASE_STATUS",
    "comparisonOperator": "LE",
    "threshold": 0,
    "duration": 5
}
```
</details>

#### Response

| Name         | Type   | Format   | Description         |
|------------|------|------|------------|
| watchdogId | Body | UUID | Identifier of the watch setting |


### Modify watch settings

```http
PUT /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
```

#### Required permissions

| Permission Name                                          | Description         |
|----------------------------------------------|------------|
| RDSforPostgreSQL:NotificationWatchdog.Modify | Modify watch settings |

#### Request

| Name                  | Type   | Format   | Required | Description                                                                     |
|---------------------|------|------|----|------------------------------------------------------------------------|
| notificationGroupId | URL  | UUID | O  | Notification group identifier                                                             |
| watchdogId          | URL  | UUID | O  | Identifier of the watch setting                                                             |
| metricName          | Body | Enum | O  | Performance metrics to watch<br/>- For the performance metrics you can set, see [Viewing the performance metrics list](#성능-지표-목록-보기). |
| comparisonOperator  | Body | Enum | O  | How to compare watchlists<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: >  |
| threshold           | Body | Long | O  | Thresholds to watch                                                              |
| duration            | Body | Long | O  | Watchlist duration<br/>- Unit: `minutes`                                              |

<details><summary>Example</summary>

```json
{
    "metricName": "DATABASE_STATUS",
    "comparisonOperator": "LE",
    "threshold": 0,
    "duration": 10
}
```
</details>

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

### Deleting a watch setting

```http
DELETE /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
```

#### Required permissions

| Permission Name                                          | Description         |
|----------------------------------------------|------------|
| RDSforPostgreSQL:NotificationWatchdog.Delete | Deleting a watch setting |

#### Request

This API does not require a request body.

| Name                  | Type  | Format   | Required | Description         |
|---------------------|-----|------|----|------------|
| notificationGroupId | URL | UUID | O  | Notification group identifier |
| watchdogId          | URL | UUID | O  | Identifier of the watch setting |

#### Response

This API does not return a response body.

<details><summary>Example</summary>

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

## Monitoring

### View a list of performance metrics

```http
GET /v1.0/metrics
```

#### Required permissions

| Permission Name                          | Description       |
|------------------------------|----------|
| RDSforPostgreSQL:Metric.List | View stats |

#### Request

This API does not require a request body.

#### Response

| Name                 | Type   | Format     | Description       |
|--------------------|------|--------|----------|
| metrics            | Body | Array  | List of performance metrics |
| metrics.metricName | Body | Enum   | Performance metric types |
| metrics.unit       | Body | String | Measure unit   |

<details><summary>Example</summary>

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

### View stats

```http
GET /v1.0/metric-statistics
```

#### Required permissions

| Permission Name                          | Description       |
|------------------------------|----------|
| RDSforPostgreSQL:Metric.List | View stats |

#### Request

| Name           | Type    | Format       | Required | Description                                                        |
|--------------|-------|----------|----|-----------------------------------------------------------|
| dbInstanceId | Query | UUID     | O  | DB instance identifier                                              |
| metricNames  | Query | Array    | O  | List of performance metrics to look up<br/>- Minimum length: `1`                             |
| from         | Query | Datetime | O  | Start date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                         |
| to           | Query | Datetime | O  | End date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                         |
| interval     | Query | Number   | X  | View interval<br/>- Unit: `minutes`<br/>- Default: Automatically selects the appropriate value based on start/end dates |

#### Response

| Name                                | Type   | Format        | Description       |
|-----------------------------------|------|-----------|----------|
| metricStatistics                  | Body | Array     | Statistics information list |
| metricStatistics.metricName       | Body | Enum      | Performance metric types |
| metricStatistics.unit             | Body | String    | Measure unit   |
| metricStatistics.values           | Body | Array     | Measure values   |
| metricStatistics.values.timestamp | Body | Timestamp | Measure time    |
| metricStatistics.values.value     | Body | Object    | Measure value      |

<details><summary>Example</summary>

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

## Event

### View the list of events

```
GET /v1.0/events
```

#### Required permissions

| Permission Name                         | Description        |
|-----------------------------|-----------|
| RDSforPostgreSQL:Event.List | View the list of events |

#### Request

This API does not require a request body.

| Name                | Type    | Format       | Required | Description                                                                                                                                                                               |
|-------------------|-------|----------|----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| page              | Query | Number   | O  | Page to retrieve<br/>- Minimum value: `1`                                                                                                                                                       |
| size              | Query | Number   | O  | Page size to retrieve<br/>- Minimum value: `1`<br/>- Maximum value: `100`                                                                                                                                   |
| from              | Query | Datetime | O  | Start date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                |
| to                | Query | Datetime | O  | End date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                |
| eventCategoryType | Query | Enum     | O  | Event category types to query<br/>ALL: All<br/>- `BACKUP`: Backup<br/>- `DB_INSTANCE`: DB instance<br/>- `DB_SECURITY_GROUP`: DB security group<br/>- `JOB: Job`<br/>- `TENANT`: Tenant<br/>- `MONITORING`: Monitoring |
| sourceId          | Query | String   | X  | Event target resource identifier                                                                                                                                                             |
| keyword           | Query | String   | X  | String keyword in event message                                                                                                                                                             |

#### Response

| Name                       | Type   | Format       | Description                                                 |
|--------------------------|------|----------|----------------------------------------------------|
| totalCounts              | Body | Number   | Total number of events                                        |
| events                   | Body | Array    | Events                                             |
| events.eventCategoryType | Body | Enum     | Event category type                                        |
| events.eventCode         | Body | Enum     | Occurred event type<br/>- See [Events](event/) for a detailed description. |
| events.sourceId          | Body | String   | Event source identifier                                        |
| events.sourceName        | Body | String   | Name to identify event sources                                |
| events.messages          | Body | Array    | Event messages                                         |
| events.messages.langCode | Body | String   | Language code                                              |
| events.messages.message  | Body | String   | Event Message                                            |
| events.eventYmdt         | Body | DateTime | Event occurred date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)              |

<details><summary>Example</summary>

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
            "eventCategoryType": "INSTANCE",
            "eventCode": "INSTC_02_01",
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
                    "message": "DB 인스턴스 시작"
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


### List Subscribable Event Codes

```http
GET /v1.0/event-codes
```

#### Required permissions

| Permission Name                         | Description        |
|-----------------------------|-----------|
| RDSforPostgreSQL:Event.List | View the list of events |

#### Request

This API does not require a request body.

#### Response

| Name                           | Type   | Format    | Description          |
|------------------------------|------|-------|-------------|
| eventCodes                   | Body | Array | Event Codes   |
| eventCodes.eventCode         | Body | Enum  | Event Code      |
| eventCodes.eventCategoryType | Body | Enum  | Event category type |

<details><summary>Example</summary>

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
