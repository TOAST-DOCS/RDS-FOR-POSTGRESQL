## Database > RDS for PostgreSQL > API 가이드

| 리전        | 엔드포인트                                            |
|-----------|--------------------------------------------------|
| 한국(판교) 리전 | https://kr1-rds-postgres.api.nhncloudservice.com |

## 인증 및 권한

API를 사용하려면 인증에 필요한 `User Access Key ID`와 `Secret Access Key`가 필요합니다. 콘솔 우측 상단의 계정에 마우스 포인터를 올리면 표시되는 드롭다운 메뉴에서 <b>API 보안 설정</b>을 선택해 생성할 수 있습니다.
생성된 Key는 Appkey와 함께 요청 Header에 포함해야 합니다.

| 이름                         | 종류     | 형식     | 필수 | 설명                                               |
|----------------------------|--------|--------|----|--------------------------------------------------|
| X-TC-APP-KEY               | Header | String | O  | RDS for PostgreSQL 서비스의 Appkey 또는 프로젝트 통합 Appkey |
| X-TC-AUTHENTICATION-ID     | Header | String | O  | API 보안 설정 메뉴의 User Access Key ID                 |
| X-TC-AUTHENTICATION-SECRET | Header | String | O  | API 보안 설정 메뉴의 Secret Access Key                  |

또한 프로젝트 멤버 역할에 따라 호출할 수 있는 API가 제한됩니다. `RDS for PostgreSQL ADMIN`, `RDS for PostgreSQL VIEWER`로 구분하여 권한을 부여할 수 있습니다.

* `RDS for PostgreSQL ADMIN` 권한은 모든 기능을 사용 가능합니다.
* `RDS for PostgreSQL VIEWER` 권한은 정보를 조회하는 기능만 사용 가능합니다.
    * DB 인스턴스를 생성, 수정, 삭제하거나, DB 인스턴스를 대상으로 하는 어떠한 기능도 사용할 수 없습니다.
    * 단, 알림 그룹과 사용자 그룹 관련된 기능은 사용 가능합니다.

API 요청 시 인증에 실패하거나 권한이 없을 경우 다음과 같은 오류가 발생합니다.

| resultCode | resultMessage | 설명          |
|------------|---------------|-------------|
| 80401      | Unauthorized  | 인증에 실패했습니다. |
| 80403      | Forbidden     | 권한이 없습니다.   |

## 응답 공통 정보

모든 API 요청에 '200 OK'로 응답합니다. 자세한 응답 결과는 응답 본문의 헤더를 참고합니다.

#### 응답 본문

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
}
```

#### 필드

| 이름            | 자료형     | 설명                    |
|---------------|---------|-----------------------|
| resultCode    | Number  | 결과코드 (성공: 0, 그 외: 실패) |
| resultMessage | String  | 결과 메시지                |
| successful    | Boolean | 성공 여부                 |

## DB 엔진 버전

| DB 엔진 버전        | 생성 가능 여부 |
|-----------------|----------|
| POSTGRESQL_V146 | O        |

* ENUM 타입의 dbVersion 필드에 대해 해당 값을 사용할 수 있습니다.
* 버전에 따라 생성이 불가능하거나, 복원이 불가능한 경우가 있을 수 있습니다.

### DB 엔진 목록 보기

```http
GET /v1.0/db-versions
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름                           | 종류   | 형식      | 설명                    |
|------------------------------|------|---------|-----------------------|
| dbVersions                   | Body | Array   | DB 엔진 목록              |
| dbVersions.dbVersion         | Body | String  | DB 엔진 버전              |
| dbVersions.dbVersionName     | Body | String  | DB 엔진 버전명             |
| dbVersions.restorableFromObs | Body | Boolean | 오브젝트 스토리지로부터 복원 가능 여부 |

<details><summary>예시</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbVersions": [
        {
            "dbVersion": "POSTGRESQL_V146",
            "dbVersionName": "PostgreSQL V14.6",
            "restorableFromObs": true
        }
    ]
}
```
</details>

## DB 인스턴스 사양

### DB 인스턴스 사양 목록 보기

```http
GET /v1.0/db-flavors
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름                     | 종류   | 형식     | 설명              |
|------------------------|------|--------|-----------------|
| dbFlavors              | Body | Array  | DB 인스턴스 사양 목록   |
| dbFlavors.dbFlavorId   | Body | UUID   | DB 인스턴스 사양의 식별자 |
| dbFlavors.dbFlavorName | Body | String | DB 인스턴스 사양 이름   |
| dbFlavors.ram          | Body | Number | 메모리 용량(MB)      |
| dbFlavors.vcpus        | Body | Number | CPU 코어 수        |

<details><summary>예시</summary>

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

## 프로젝트 정보

### 리전 목록 보기

```http
GET /v1.0/project/regions
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름                 | 종류   | 형식      | 설명                           |
|--------------------|------|---------|------------------------------|
| regions            | Body | Array   | 리전 목록                        |
| regions.regionCode | Body | Enum    | 리전 코드<br/>- `KR1`: 한국(판교) 리전 |
| regions.isEnabled  | Body | Boolean | 리전의 활성화 여부                   |

<details><summary>예시</summary>

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

### 프로젝트 멤버 목록 보기

```http
GET /v1.0/project/members
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름                   | 종류   | 형식     | 설명              |
|----------------------|------|--------|-----------------|
| members              | Body | Array  | 프로젝트 멤버 목록      |
| members.memberId     | Body | UUID   | 프로젝트 멤버의 식별자    |
| members.memberName   | Body | String | 프로젝트 멤버의 이름     |
| members.emailAddress | Body | String | 프로젝트 멤버의 이메일 주소 |
| members.phoneNumber  | Body | String | 프로젝트 멤버의 전화번호   |

<details><summary>예시</summary>

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
            "memberName": "홍길동",
            "emailAddress": "gildong.hong@nhn.com",
            "phoneNumber": "+821012345678"
        }
    ]
}
```
</details>

## 네트워크

### 서브넷 목록 보기

```http
GET /v1.0/network/subnets
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름                       | 종류   | 형식      | 설명               |
|--------------------------|------|---------|------------------|
| subnets                  | Body | Array   | 서브넷 목록           |
| subnets.subnetId         | Body | UUID    | 서브넷의 식별자         |
| subnets.subnetName       | Body | String  | 서브넷을 식별할 수 있는 이름 |
| subnets.subnetCidr       | Body | String  | 서브넷의 CIDR        |
| subnets.usingGateway     | Body | Boolean | 게이트웨이 사용 여부      |
| subnets.availableIpCount | Body | Number  | 사용 가능한 IP 수      |

<details>
<summary>예시</summary>

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

## 스토리지

### 스토리지 타입 목록 보기

```http
GET /v1.0/storage-types
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름           | 종류   | 형식    | 설명         |
|--------------|------|-------|------------|
| storageTypes | Body | Array | 스토리지 타입 목록 |

<details><summary>예시</summary>

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

## 작업 정보

### 작업 정보 상세 보기

```http
GET /v1.0/jobs/{jobId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름    | 종류  | 형식   | 필수 | 설명      |
|-------|-----|------|----|---------|
| jobId | URL | UUID | O  | 작업의 식별자 |

#### 응답

| 이름                             | 종류   | 형식       | 설명                                                                                                                                                                                                                                                                                                                                                                                                              |
|--------------------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| jobId                          | Body | UUID     | 작업의 식별자                                                                                                                                                                                                                                                                                                                                                                                                         |
| jobStatus                      | Body | Enum     | 작업의 현재 상태<br/>- `PREPARING`: 작업이 준비 중인 경우<br/>- `READY`: 작업이 준비 완료된 경우<br/>- `RUNNING`: 작업이 진행 중인 경우<br/>- `COMPLETED`: 작업이 완료된 경우<br/>- `REGISTERED`: 작업이 등록된 경우<br/>- `WAIT_TO_REGISTER`: 작업 등록 대기 중인 경우<br/>- `INTERRUPTED`: 작업 진행 중 인터럽트가 발생한 경우<br/>- `CANCELED`: 작업이 취소된 경우<br/>- `FAILED`: 작업이 실패한 경우<br/>- `ERROR`: 작업 진행 중 오류가 발생한 경우<br/>- `DELETED`: 작업이 삭제된 경우<br/>- `FAIL_TO_READY`: 작업 준비에 실패한 경우 |
| resourceRelations              | Body | Array    | 연관 리소스 목록                                                                                                                                                                                                                                                                                                                                                                                                       |
| resourceRelations.resourceType | Body | Enum     | 연관 리소스 유형<br/>- `DB_INSTANCE`: DB 인스턴스<br/>- `DB_INSTANCE_GROUP`: DB 인스턴스 그룹<br/>- `DB_SECURITY_GROUP`: DB 보안 그룹<br/>- `PARAMETER_GROUP`: 파라미터 그룹<br/>- `BACKUP`: 백업<br/>- `TENANT`: 테넌트                                                                                                                                                                                                                        |
| resourceRelations.resourceId   | Body | UUID     | 연관 리소스의 식별자                                                                                                                                                                                                                                                                                                                                                                                                     |
| createdYmdt                    | Body | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                                                                                                                                                                                                                                               |
| updatedYmdt                    | Body | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                                                                                                                                                                                                                                               |

<details><summary>예시</summary>

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

## DB 인스턴스

### DB 인스턴스 상태

| 상태                  | 설명                           |
|---------------------|------------------------------|
| `AVAILABLE`         | DB 인스턴스가 사용 가능한 경우           |
| `BEFORE_CREATE`     | DB 인스턴스가 생성 전인 경우            |
| `STORAGE_FULL`      | DB 인스턴스의 용량이 부족한 경우          |
| `FAIL_TO_CREATE`    | DB 인스턴스 생성에 실패한 경우           |
| `FAIL_TO_CONNECT`   | DB 인스턴스 연결에 실패한 경우           |
| `REPLICATION_STOP`  | DB 인스턴스의 복제가 중단된 경우          |
| `REPLICATION_DELAY` | DB 인스턴스의 복제가 지연 중인 경우        |
| `FAILOVER`          | DB 인스턴스가 고가용성 장애 조치된 경우      |
| `SHUTDOWN`          | DB 인스턴스가 중지된 경우              |
| `DELETED`           | DB 인스턴스가 삭제된 경우              |

### DB 인스턴스 진행 상태

| 상태                              | 설명            |
|---------------------------------|---------------|
| `APPLYING_DB_INSTANCE_HBA_RULE` | 접근 제어 규칙 적용 중 |
| `APPLYING_PARAMETER_GROUP`      | 파라미터 그룹 적용 중  |
| `BACKING_UP`                    | 백업 중          |
| `CANCELING`                     | 취소 중          |
| `CREATING`                      | 생성 중          |
| `CREATING_DATABASE`             | 데이터베이스 생성 중	  |
| `CREATING_USER`                 | 사용자 생성 중	     |
| `DELETING`                      | 삭제 중          |
| `DELETING_DATABASE`             | 데이터베이스 삭제 중   |
| `DELETING_USER`                 | 사용자 삭제 중      |
| `FAILING_OVER`                  | 장애 조치 중       |
| `MIGRATING`                     | 마이그레이션 중      |
| `MODIFYING`                     | 수정 중          |
| `OCCUPIED`                      | 점유 중          |
| `PREPARING`                     | 준비 중          |
| `PROMOTING`                     | 승격 중          |
| `PROMOTING_FORCIBLY`            | 강제 승격 중       |
| `REBUILDING`                    | 재구축 중         |
| `REPAIRING`                     | 복구 중          |
| `REPLICATING`                   | 복제 중          |
| `RESTARTING`                    | 재시작 중         |
| `RESTARTING_FORCIBLY`           | 강제 재시작 중      |
| `RESTORING`                     | 복원 중          |
| `STARTING`                      | 시작 중          |
| `STOPPING`                      | 정지 중          |
| `SYNCING_DATABASE`              | 데이터베이스 동기화 중  |
| `SYNCING_USER`                  | 사용자 동기화 중	    |
| `UPDATING_USER`                 | 사용자 수정 중	     |
| `UPDATING_DATABASE`             | 데이터베이스 수정 중	  |

### DB 인스턴스 목록 보기

```http
GET /v1.0/db-instances
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름                            | 종류   | 형식       | 설명                                                                                                                                    |
|-------------------------------|------|----------|---------------------------------------------------------------------------------------------------------------------------------------|
| dbInstances                   | Body | Array    | DB 인스턴스 목록                                                                                                                            |
| dbInstances.dbInstanceId      | Body | UUID     | DB 인스턴스의 식별자                                                                                                                          |
| dbInstances.dbInstanceGroupId | Body | UUID     | DB 인스턴스 그룹의 식별자                                                                                                                       |
| dbInstances.dbInstanceName    | Body | String   | DB 인스턴스를 식별할 수 있는 이름                                                                                                                  |
| dbInstances.description       | Body | String   | DB 인스턴스에 대한 추가 정보                                                                                                                     |
| dbInstances.dbVersion         | Body | Enum     | DB 엔진 버전                                                                                                                              |
| dbInstances.dbPort            | Body | Number   | DB 포트                                                                                                                                 |
| dbInstances.dbInstanceType    | Body | Enum     | DB 인스턴스의 역할 타입<br/>- `MASTER`: 마스터<br/>- `FAILED_MASTER`: 장애 조치된 마스터<br/>- `CANDIDATE_MASTER`: 예비 마스터<br/>- `READ_ONLY_SLAVE`: 읽기 복제본 |
| dbInstances.dbInstanceStatus  | Body | Enum     | DB 인스턴스의 현재 상태                                                                                                                        |
| dbInstances.progressStatus    | Body | Enum     | DB 인스턴스의 현재 진행 상태                                                                                                                     |
| dbInstances.createdYmdt       | Body | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |
| dbInstances.updatedYmdt       | Body | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |

<details><summary>예시</summary>

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
            "dbVersion": "POSTGRESQL_V146",
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


### DB 인스턴스 상세 보기

```http
GET /v1.0/db-instances/{dbInstanceId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름           | 종류  | 형식   | 필수 | 설명           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB 인스턴스의 식별자 |

#### 응답

| 이름                        | 종류   | 형식       | 설명                                                                                                                                    |
|---------------------------|------|----------|---------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId              | Body | UUID     | DB 인스턴스의 식별자                                                                                                                          |
| dbInstanceGroupId         | Body | UUID     | DB 인스턴스 그룹의 식별자                                                                                                                       |
| dbInstanceName            | Body | String   | DB 인스턴스를 식별할 수 있는 이름                                                                                                                  |
| description               | Body | String   | DB 인스턴스에 대한 추가 정보                                                                                                                     |
| dbVersion                 | Body | Enum     | DB 엔진 버전                                                                                                                              |
| dbPort                    | Body | Number   | DB 포트                                                                                                                                 |
| dbInstanceType            | Body | Enum     | DB 인스턴스의 역할 타입<br/>- `MASTER`: 마스터<br/>- `FAILED_MASTER`: 장애 조치된 마스터<br/>- `CANDIDATE_MASTER`: 예비 마스터<br/>- `READ_ONLY_SLAVE`: 읽기 복제본 |
| dbInstanceStatus          | Body | Enum     | DB 인스턴스의 현재 상태                                                                                                                        |
| progressStatus            | Body | Enum     | DB 인스턴스의 현재 작업 진행 상태                                                                                                                  |
| dbFlavorId                | Body | UUID     | DB 인스턴스 사양의 식별자                                                                                                                       |
| parameterGroupId          | Body | UUID     | DB 인스턴스에 적용된 파라미터 그룹의 식별자                                                                                                             |
| dbSecurityGroupIds        | Body | Array    | DB 인스턴스에 적용된 DB 보안 그룹의 식별자 목록                                                                                                         |
| notificationGroupIds      | Body | Array    | DB 인스턴스에 적용된 알림 그룹의 식별자 목록                                                                                                            |
| useDeletionProtection     | Body | Boolean  | DB 인스턴스 삭제 보호 여부                                                                                                                      |
| needToApplyParameterGroup | Body | Boolean  | 최신 파라미터 그룹 적용 필요 여부                                                                                                                   |
| needMigration             | Body | Boolean  | 마이그레이션 필요 여부                                                                                                                          |
| osVersion                 | Body | String   | 운영체제 버전                                                                                                                               |
| createdYmdt               | Body | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |
| updatedYmdt               | Body | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |

<details><summary>예시</summary>

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
    "dbVersion": "POSTGRESQL_V146",
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


### DB 인스턴스 스토리지 정보 조회

```http
GET /v1.0/db-instances/{dbInstanceId}/storage-info
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름           | 종류  | 형식   | 필수 | 설명           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB 인스턴스의 식별자 |

#### 응답

| 이름               | 종류   | 형식      | 설명                                                                                   |
|------------------|------|---------|--------------------------------------------------------------------------------------|
| storageType      | Body | Enum    | 데이터 스토리지 타입                                                                          |
| storageSize      | Body | Number  | 데이터 스토리지 크기(GB)                                                                      |
| storageStatus    | Body | Enum    | 데이터 스토리지의 현재 상태<br/>- `DETACHED`: 부착되지 않음<br/>- `ATTACHED`: 부착됨<br/>- `DELETED`: 삭제됨 |
| publicAccessible | Body | Boolean | 외부 접속 가능 여부                                                                          |

<details><summary>예시</summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "storageType": "General SSD",
    "storageSize": 20,
    "storageStatus": "ATTACHED",
    "publicAccessible": true
}
```
</details>


### DB 인스턴스 스토리지 정보 수정하기

```http
PUT /v1.0/db-instances/{dbInstanceId}/storage-info
```

#### 요청

| 이름                | 종류   | 형식      | 필수 | 설명                                                                        |
|-------------------|------|---------|----|---------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID    | O  | DB 인스턴스의 식별자                                                              |
| storageSize       | Body | Number  | O  | 데이터 스토리지 크기(GB)<br/>- 최솟값: 현재값<br/>- 최댓값: `2048`                          |

#### 응답

| 이름    | 종류   | 형식   | 설명          |
|-------|------|------|-------------|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>

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

### DB 인스턴스 네트워크 정보 조회

```http
GET /v1.0/db-instances/{dbInstanceId}/network-info
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름           | 종류  | 형식   | 필수 | 설명           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB 인스턴스의 식별자 |

#### 응답

| 이름                     | 종류   | 형식     | 설명                                                                                                                                      |
|------------------------|------|--------|-----------------------------------------------------------------------------------------------------------------------------------------|
| availabilityZone       | Body | Enum   | DB 인스턴스를 생성할 가용성 영역                                                                                                                     |
| subnet                 | Body | Object | 서브넷 객체                                                                                                                                  |
| subnet.subnetId        | Body | UUID   | 서브넷의 식별자                                                                                                                                |
| subnet.subnetName      | Body | UUID   | 서브넷을 식별할 수 있는 이름                                                                                                                        |
| subnet.subnetCidr      | Body | UUID   | 서브넷의 CIDR                                                                                                                               |
| endPoints              | Body | Array  | 접속 정보 목록                                                                                                                                |
| endPoints.domain       | Body | String | 도메인                                                                                                                                     |
| endPoints.ipAddress    | Body | String | IP 주소                                                                                                                                   |
| endPoints.endPointType | Body | Enum   | 접속 정보 타입<br>-`EXTERNAL`: 외부 접속 도메인<br>-`INTERNAL`: 내부 접속 도메인<br>-`PUBLIC`: (Deprecated) 외부 접속 도메인<br>-`PRIVATE`: (Deprecated) 내부 접속 도메인 |

<details><summary>예시</summary>

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
        "subnetCidr": "192.168.0.0/16"
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

### DB 인스턴스 네트워크 정보 수정하기

```http
PUT /v1.0/db-instances/{dbInstanceId}/network-info
```

#### 요청

| 이름              | 종류   | 형식      | 필수 | 설명           |
|-----------------|------|---------|----|--------------|
| dbInstanceId    | URL  | UUID    | O  | DB 인스턴스의 식별자 |
| usePublicAccess | Body | Boolean | O  | 외부 접속 가능 여부  |

#### 응답

| 이름    | 종류   | 형식   | 설명          |
|-------|------|------|-------------|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>

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

### DB 인스턴스 백업 정보 조회

```http
GET /v1.0/db-instances/{dbInstanceId}/backup-info
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름           | 종류  | 형식   | 필수 | 설명           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB 인스턴스의 식별자 |

#### 응답

| 이름                                    | 종류   | 형식     | 설명                                                                                                                                                                                                                     |
|---------------------------------------|------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| backupPeriod                          | Body | Number | 백업 보관 기간(일)                                                                                                                                                                                                            |
| backupRetryCount                      | Body | Number | 백업 재시도 횟수                                                                                                                                                                                                              |
| backupSchedules                       | Body | Array  | 백업 스케줄 목록                                                                                                                                                                                                              |
| backupSchedules.backupWndBgnTime      | Body | String | 백업 시작 시간                                                                                                                                                                                                               |
| backupSchedules.backupWndDuration     | Body | Enum   | 백업 윈도우<br/>백업 시작 시간부터 Duration 안에 자동 백업이 실행됩니다.<br/>- `HALF_AN_HOUR`: 30분<br/>- `ONE_HOUR`: 1시간<br/>- `ONE_HOUR_AND_HALF`: 1시간 30분<br/>- `TWO_HOURS`: 2시간<br/>- `TWO_HOURS_AND_HALF`: 2시간 30분<br/>- `THREE_HOURS`: 3시간 |
| backupSchedules.backupRetryExpireTime | Body | String | 백업 재시도 만료 시간                                                                                                                                                                                                           |

<details><summary>예시</summary>

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

### DB 인스턴스 백업 정보 수정하기

```http
PUT /v1.0/db-instances/{dbInstanceId}/backup-info
```

#### 요청

| 이름                                    | 종류   | 형식     | 필수 | 설명                                                                                                                                                                                                                   |
|---------------------------------------|------|--------|----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId                          | URL  | UUID   | O  | DB 인스턴스의 식별자                                                                                                                                                                                                         |
| backupPeriod                          | Body | Number | X  | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730`                                                                                                                                                                          |
| backupRetryCount                      | Body | Number | X  | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10`                                                                                                                                                                             |
| backupSchedules                       | Body | Array  | X  | 백업 스케줄 목록                                                                                                                                                                                                            |
| backupSchedules.backupWndBgnTime      | Body | String | O  | 백업 시작 시간<br/>- 예시: `00:00:00`                                                                                                                                                                                        |
| backupSchedules.backupWndDuration     | Body | Enum   | O  | 백업 윈도우<br/>백업 시작 시간부터 설정된 기간 안에 자동 백업이 실행됩니다.<br/>- `HALF_AN_HOUR`: 30분<br/>- `ONE_HOUR`: 1시간<br/>- `ONE_HOUR_AND_HALF`: 1시간 30분<br/>- `TWO_HOURS`: 2시간<br/>- `TWO_HOURS_AND_HALF`: 2시간 30분<br/>- `THREE_HOURS`: 3시간 |
| backupSchedules.backupRetryExpireTime | Body | String | O  | 백업 재시도 만료 시간<br/>- 백업 재시도 만료 시간은 백업 시작 시간 이전이거나 이후여야 합니다.<br/>- 예시: `01:30:00`                                                                                                                                       |

<details><summary>예시</summary>

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

#### 응답

| 이름    | 종류   | 형식   | 설명          |
|-------|------|------|-------------|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>

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

### DB 인스턴스 복원 정보 조회

```http
GET /v1.0/db-instances/{dbInstanceId}/restoration-info
```

#### 요청

| 이름           | 종류  | 형식   | 필수 | 설명           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DB 인스턴스의 식별자 |

#### 응답

| 이름                                      | 종류   | 형식       | 설명                                                                                                                                                    |
|-----------------------------------------|------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| oldestRestorableYmdt                    | Body | DateTime | 가장 오래된 복원 가능한 시간                                                                                                                                      |
| latestRestorableYmdt                    | Body | DateTime | 가장 최신의 복원 가능한 시간                                                                                                                                      |
| restorableBackups                       | Body | Array    | 복원 가능한 백업 목록                                                                                                                                          |
| restorableBackups.backup                | Body | Object   | 백업 정보 객체                                                                                                                                              |
| restorableBackups.backup.backupId       | Body | UUID     | 백업의 식별자                                                                                                                                               |
| restorableBackups.backup.backupName     | Body | String   | 백업 이름                                                                                                                                                 |
| restorableBackups.backup.backupSize     | Body | Number   | 백업 크기                                                                                                                                                 |
| restorableBackups.backup.backupType     | Body | Enum     | 백업 유형<br/>- `AUTO`: 자동<br/>- `MANUAL`: 수동                                                                                                             |
| restorableBackups.backup.backupStatus   | Body | Enum     | 백업 상태<br/>- `BACKING_UP`: 백업 중인 경우<br/>- `COMPLETED`: 백업이 완료된 경우<br/>- `DELETING`: 백업이 삭제 중인 경우<br/>- `DELETED`: 백업이 삭제된 경우<br/>- `ERROR`: 오류가 발생한 경우 |
| restorableBackups.backup.dbInstanceId   | Body | UUID     | 원본 DB 인스턴스의 식별자                                                                                                                                       |
| restorableBackups.backup.dbInstanceName | Body | String   | 원본 DB 인스턴스의 이름                                                                                                                                        |
| restorableBackups.backup.dbVersion      | Body | String   | DB 엔진 유형                                                                                                                                              |
| restorableBackups.backup.failoverCount  | Body | Number   | 장애 조치 횟수                                                                                                                                              |
| restorableBackups.backup.walFileName    | Body | String   | WAL 로그 파일 이름                                                                                                                                          |
| restorableBackups.backup.createdYmdt    | Body | DateTime | 백업 생성 일시                                                                                                                                              |
| restorableBackups.backup.updatedYmdt    | Body | DateTime | 백업 갱신 일시                                                                                                                                              |
| restorableBackups.backup.completedYmdt  | Body | DateTime | 백업 완료 일시                                                                                                                                              |

<details><summary>예시</summary>

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
				"dbVersion": "POSTGRESQL_V146",
				"backupType": "MANUAL",
				"backupSize": 8299904,
				"failoverCount": 0,
				"walFileName": "000000010000000000000005",
				"createdYmdt": "2023-07-10T15:44:44+09:00",
				"updatedYmdt": "2023-07-10T15:46:07+09:00"
			}
		}
	]
}
```
</details>

### DB 인스턴스 삭제 보호 설정 변경하기

```http
PUT /v1.0/db-instances/{dbInstanceId}/deletion-protection
```

#### 요청

| 이름                    | 종류   | 형식      | 필수 | 설명           |
|-----------------------|------|---------|----|--------------|
| dbInstanceId          | URL  | UUID    | O  | DB 인스턴스의 식별자 |
| useDeletionProtection | Body | Boolean | O  | 삭제 보호 여부     |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

<details><summary>예시</summary>

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


## 백업

### 백업 목록 조회

```http
GET /v1.0/backups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름           | 종류    | 형식     | 필수 | 설명                                                         |
|--------------|-------|--------|----|------------------------------------------------------------|
| page         | Query | Number | O  | 조회할 목록의 페이지<br/>- 최솟값: `1`                                 |
| size         | Query | Number | O  | 조회할 목록의 페이지 크기<br/>- 최솟값: `1`<br/>- 최댓값: `100`             |
| backupType   | Query | Enum   | X  | 백업 유형<br/>- `AUTO`: 자동<br/>- `MANUAL`:  수동<br/>- 기본값: `전체` |
| dbInstanceId | Query | UUID   | X  | 원본 DB 인스턴스의 식별자                                            |
| dbVersion    | Query | Enum   | X  | DB 엔진 버전                                                   |

#### 응답

| 이름                   | 종류   | 형식       | 설명                                                                                                                                                             |
|----------------------|------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| totalCounts          | Body | Number   | 전체 백업 목록 수                                                                                                                                                     |
| backups              | Body | Array    | 백업 목록                                                                                                                                                          |
| backups.backupId     | Body | UUID     | 백업의 식별자                                                                                                                                                        |
| backups.backupName   | Body | String   | 백업을 식별할 수 있는 이름                                                                                                                                                |
| backups.backupStatus | Body | Enum     | 백업의 현재 상태<br/>- `BACKING_UP` : 백업 중인 경우<br/>- `COMPLETED` : 백업이 완료된 경우<br/>- `DELETING` : 백업이 삭제 중인 경우<br/>- `DELETED` : 백업이 삭제된 경우<br/>- `ERROR` : 오류가 발생한 경우 |
| backups.dbInstanceId | Body | UUID     | 원본 DB 인스턴스의 식별자                                                                                                                                                |
| backups.dbVersion    | Body | Enum     | DB 엔진 버전                                                                                                                                                       |
| backups.backupType   | Body | Enum     | 백업 유형<br/>- `AUTO`: 자동<br/>- `MANUAL`:  수동                                                                                                                     |
| backups.backupSize   | Body | Number   | 백업의 크기<br/>- 단위: `바이트`                                                                                                                                         |
| createdYmdt          | Body | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                              |
| updatedYmdt          | Body | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                              |
| completedYmdt        | Body | DateTime | 완료 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                              |

<details><summary>예시</summary>

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
            "dbVersion": "POSTGRESQL_V146",
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

#### 응답

| 이름    | 종류   | 형식   | 설명          |
|-------|------|------|-------------|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>

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


### 백업 복원하기

```http
POST /v1.0/backups/{backupId}/restore
```

#### 요청

| 이름                                           | 종류   | 형식      | 필수 | 설명                                                                                                                                                                                                                          |
|----------------------------------------------|------|---------|----|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| backupId                                     | URL  | UUID    | O  | 백업의 식별자                                                                                                                                                                                                                     |
| dbInstanceName                               | Body | String  | O  | DB 인스턴스를 식별할 수 있는 이름                                                                                                                                                                                                        |
| description                                  | Body | String  | X  | DB 인스턴스에 대한 추가 정보                                                                                                                                                                                                           |
| dbFlavorId                                   | Body | UUID    | O  | DB 인스턴스 사양의 식별자                                                                                                                                                                                                             |
| dbPort                                       | Body | Number  | O  | DB 포트<br/>- 최솟값: `5432`<br/>- 최댓값: `45432`                                                                                                                                                                                  |
| parameterGroupId                             | Body | UUID    | O  | 파라미터 그룹의 식별자                                                                                                                                                                                                                |
| dbSecurityGroupIds                           | Body | Array   | X  | DB 보안 그룹의 식별자 목록                                                                                                                                                                                                            ||network|Body|Object|O|네트워크 정보 객체|
| userGroupIds                                 | Body | Array   | X  | 사용자 그룹의 식별자 목록                                                                                                                                                                                                              |
| useHighAvailability                          | Body | Boolean | X  | 고가용성 사용 여부<br/>- 기본값: `false`                                                                                                                                                                                               |
| useDefaultNotification                       | Body | Boolean | X  | 기본 알림 사용 여부<br/>- 기본값: `false`                                                                                                                                                                                              |
| useDeletionProtection                        | Body | Boolean | X  | 삭제 보호 여부<br/>- 기본값: `false`                                                                                                                                                                                                 | 
| network                                      | Body | Object  | O  | 네트워크 정보 객체                                                                                                                                                                                                                  |
| network.subnetId                             | Body | UUID    | O  | 서브넷의 식별자                                                                                                                                                                                                                    |
| network.usePublicAccess                      | Body | Boolean | X  | 외부 접속 가능 여부<br/>- 기본값: `false`                                                                                                                                                                                              |
| network.availabilityZone                     | Body | Enum    | X  | DB 인스턴스를 생성할 가용성 영역<br/>- 예시: `kr-pub-a`<br/>- 기본값: `임의의 가용성 영역`                                                                                                                                                            |
| storage                                      | Body | Object  | O  | 스토리지 정보 객체                                                                                                                                                                                                                  |    
| storage.storageType                          | Body | Enum    | O  | 데이터 스토리지 타입<br/>- 예시: `General SSD`                                                                                                                                                                                         |
| storage.storageSize                          | Body | Number  | O  | 데이터 스토리지 크기<br/>- 단위: `기가바이트`<br/>- 최솟값: `20`<br/>- 최댓값: `2048`                                                                                                                                                             |
| backup                                       | Body | Object  | O  | 백업 정보 객체                                                                                                                                                                                                                    |
| backup.backupPeriod                          | Body | Number  | O  | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730`                                                                                                                                                                                 |
| backup.backupRetryCount                      | Body | Number  | X  | 백업 재시도 횟수<br/>- 기본값: `0`<br/>- 최솟값: `0`<br/>- 최댓값: `10`                                                                                                                                                                     |
| backup.backupSchedules                       | Body | Array   | O  | 백업 스케줄 목록                                                                                                                                                                                                                   |
| backup.backupSchedules.backupWndBgnTime      | Body | String  | O  | 백업 시작 시간<br/>- 예시: `00:00:00`                                                                                                                                                                                               |
| backup.backupSchedules.backupWndDuration     | Body | Enum    | O  | 백업 Duration<br/>백업 시작 시간부터 Duration 안에 자동 백업이 실행됩니다.<br/>- `HALF_AN_HOUR`: 30분<br/>- `ONE_HOUR`: 1시간<br/>- `ONE_HOUR_AND_HALF`: 1시간 30분<br/>- `TWO_HOURS`: 2시간<br/>- `TWO_HOURS_AND_HALF`: 2시간 30분<br/>- `THREE_HOURS`: 3시간 |
| backup.backupSchedules.backupRetryExpireTime | Body | String  | O  | 백업 재시도 만료 시간<br/>- 백업 재시도 만료 시간은 백업 시작 시간 이전이거나 이후여야 합니다.<br/>- 예시: `01:30:00`                                                                                                                                              |

<details><summary>예시</summary>

```json

{
  "dbInstanceName": "db-instance-restore",
  "dbFlavorId": "50be6d9c-02d6-4594-a2d4-12010eb65ec0",
  "dbPort": 15432,
  "parameterGroupId": "132d383c-38e3-468a-a826-5e9a8fff15d0",
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
        "backupWndDuration": "HALF_AN_HOUR",
        "backupRetryExpireTime": "01:30:00"
      }
    ]
  }
}
```
</details>

#### 응답

| 이름    | 종류   | 형식   | 설명          |
|-------|------|------|-------------|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>

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

### 백업 삭제하기

```http
DELETE /v1.0/backups/{backupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름       | 종류  | 형식   | 필수 | 설명      |
|----------|-----|------|----|---------|
| backupId | URL | UUID | O  | 백업의 식별자 |

#### 응답

| 이름    | 종류   | 형식   | 설명          |
|-------|------|------|-------------|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>

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

## DB 보안 그룹

### DB 보안 그룹 목록 보기

```http
GET /v1.0/db-security-groups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름                                     | 종류   | 형식       | 설명                                                                                                                                                                                             |
|----------------------------------------|------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroups                       | Body | Array    | DB 보안 그룹 목록                                                                                                                                                                                    |
| dbSecurityGroups.dbSecurityGroupId     | Body | UUID     | DB 보안 그룹의 식별자                                                                                                                                                                                  |
| dbSecurityGroups.dbSecurityGroupName   | Body | String   | DB 보안 그룹을 식별할 수 있는 이름                                                                                                                                                                          |
| dbSecurityGroups.dbSecurityGroupStatus | Body | Enum     | DB 보안 그룹의 현재 상태<br/>- `CREATED`: 생성됨<br/>- `DELETED`: 삭제됨                                                                                                                                      |
| dbSecurityGroups.description           | Body | String   | DB 보안 그룹에 대한 추가 정보                                                                                                                                                                             |
| dbSecurityGroups.progressStatus        | Body | Enum     | DB 보안 그룹의 현재 진행 상태<br/>- `NONE`: 진행 중인 작업이 없음<br/>- `CREATING_RULE`: 규칙 정책 생성 중<br/>- `UPDATING_RULE`: 규칙 정책 수정 중<br/>- `DELETING_RULE`: 규칙 정책 삭제 중<br/>- `APPLYING_DEFAULT_RULE`: 기본 규칙 적용 중  |
| dbSecurityGroups.createdYmdt           | Body | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                              |
| dbSecurityGroups.updatedYmdt           | Body | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                              |

<details><summary>예시</summary>

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

### DB 보안 그룹 상세 보기

```http
GET /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름                | 종류  | 형식   | 필수 | 설명            |
|-------------------|-----|------|----|---------------|
| dbSecurityGroupId | URL | UUID | O  | DB 보안 그룹의 식별자 |

#### 응답

| 이름                    | 종류   | 형식       | 설명                                                                                                                                                                                            |
|-----------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId     | Body | UUID     | DB 보안 그룹의 식별자                                                                                                                                                                                 |
| dbSecurityGroupName   | Body | String   | DB 보안 그룹을 식별할 수 있는 이름                                                                                                                                                                         |
| dbSecurityGroupStatus | Body | Enum     | DB 보안 그룹의 현재 상태<br/>- `CREATED`: 생성됨<br/>- `DELETED`: 삭제됨                                                                                                                                     |
| description           | Body | String   | DB 보안 그룹에 대한 추가 정보                                                                                                                                                                            |
| progressStatus        | Body | Enum     | DB 보안 그룹의 현재 진행 상태<br/>- `NONE`: 진행 중인 작업이 없음<br/>- `CREATING_RULE`: 규칙 정책 생성 중<br/>- `UPDATING_RULE`: 규칙 정책 수정 중<br/>- `DELETING_RULE`: 규칙 정책 삭제 중<br/>- `APPLYING_DEFAULT_RULE`: 기본 규칙 적용 중 |
| rules                 | Body | Array    | DB 보안 그룹 규칙 목록                                                                                                                                                                                |
| rules.ruleId          | Body | UUID     | DB 보안 그룹 규칙의 식별자                                                                                                                                                                              |
| rules.description     | Body | String   | DB 보안 그룹 규칙에 대한 추가 정보                                                                                                                                                                         |
| rules.direction       | Body | Enum     | 통신 방향<br/>- `INGRESS`: 수신<br/>- `EGRESS`: 송신                                                                                                                                                  |
| rules.etherType       | Body | Enum     | Ether 타입<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                                |
| rules.port            | Body | Object   | 포트 객체                                                                                                                                                                                         |
| rules.port.portType   | Body | Enum     | 포트 타입<br/>- `DB_PORT`: 각 DB 인스턴스 포트값으로 설정됩니다.<br/>- `PORT`: 지정된 포트값으로 설정됩니다.<br/>- `PORT_RANGE`: 지정된 포트 범위로 설정됩니다.                                                                            |
| rules.port.minPort    | Body | Number   | 최소 포트 범위                                                                                                                                                                                      |
| rules.port.maxPort    | Body | Number   | 최대 포트 범위                                                                                                                                                                                      |
| rules.cidr            | Body | String   | 허용할 트래픽의 원격 소스                                                                                                                                                                                |
| rules.createdYmdt     | Body | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                             |
| rules.updatedYmdt     | Body | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                             |
| createdYmdt           | Body | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                             |
| updatedYmdt           | Body | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                             |

<details><summary>예시</summary>

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

### DB 보안 그룹 생성하기

```http
POST /v1.0/db-security-groups
```

#### 요청

| 이름                  | 종류   | 형식     | 필수 | 설명                                                                                                                                                                                       |
|---------------------|------|--------|----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupName | Body | String | O  | DB 보안 그룹을 식별할 수 있는 이름                                                                                                                                                                    |
| description         | Body | String | X  | DB 보안 그룹에 대한 추가 정보                                                                                                                                                                       |
| rules               | Body | Array  | O  | DB 보안 그룹 규칙 목록                                                                                                                                                                           |
| rules.description   | Body | String | X  | DB 보안 그룹 규칙에 대한 추가 정보                                                                                                                                                                    |
| rules.direction     | Body | Enum   | O  | 통신 방향<br/>- `INGRESS`: 수신<br/>- `EGRESS`: 송신                                                                                                                                             |
| rules.etherType     | Body | Enum   | O  | Ether 타입<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                           |
| rules.cidr          | Body | String | O  | 허용할 트래픽의 원격 소스<br/>- 예시: `1.1.1.1/32`                                                                                                                                                    |
| rules.port          | Body | Object | O  | 포트 객체                                                                                                                                                                                    |
| rules.port.portType | Body | Enum   | O  | 포트 타입<br/>- `DB_PORT`: 각 DB 인스턴스 포트값으로 설정됩니다. `minPort`값과 `maxPort`값을 필요로 하지 않습니다.<br/>- `PORT`: 지정된 포트값으로 설정됩니다. `minPort`값과 `maxPort`값이 같아야 합니다.<br/>- `PORT_RANGE`: 지정된 포트 범위로 설정됩니다. |
| rules.port.minPort  | Body | Number | X  | 최소 포트 범위<br/>- 최솟값: 1                                                                                                                                                                    |
| rules.port.maxPort  | Body | Number | X  | 최대 포트 범위<br/>- 최댓값: 65535                                                                                                                                                                |

<details><summary>예시</summary>

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

#### 응답

| 이름                | 종류   | 형식   | 설명            |
|-------------------|------|------|---------------|
| dbSecurityGroupId | Body | UUID | DB 보안 그룹의 식별자 |

<details><summary>예시</summary>

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

### DB 보안 그룹 수정하기

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### 요청

| 이름                  | 종류   | 형식     | 필수 | 설명                    |
|---------------------|------|--------|----|-----------------------|
| dbSecurityGroupId   | URL  | UUID   | O  | DB 보안 그룹의 식별자         |
| dbSecurityGroupName | Body | String | X  | DB 보안 그룹을 식별할 수 있는 이름 |
| description         | Body | String | X  | DB 보안 그룹에 대한 추가 정보    |

<details><summary>예시</summary>

```json
{
    "dbSecurityGroupName": "dbSecurityGroup",
    "description": "description"
}
```
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

<details><summary>예시</summary>

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

### DB 보안 그룹 삭제하기

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름                | 종류  | 형식   | 필수 | 설명            |
|-------------------|-----|------|----|---------------|
| dbSecurityGroupId | URL | UUID | O  | DB 보안 그룹의 식별자 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

<details><summary>예시</summary>

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

### DB 보안 그룹 규칙 생성하기

```http
POST /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### 요청

| 이름                | 종류     | 형식      | 필수  | 설명                                                                                                                                                                                       |
|-------------------|--------|---------|-----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId | URL    | UUID    | O   | DB 보안 그룹의 식별자                                                                                                                                                                            |
| description       | Body   | String  | X   | DB 보안 그룹 규칙에 대한 추가 정보                                                                                                                                                                    |
| direction         | Body   | Enum    | O   | 통신 방향<br/>- `INGRESS`: 수신<br/>- `EGRESS`: 송신                                                                                                                                             |
| etherType         | Body   | Enum    | O   | Ether 타입<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                           |
| port              | Body   | Object  | O   | 포트 객체                                                                                                                                                                                    |
| port.portType     | Body   | Enum    | O   | 포트 타입<br/>- `DB_PORT`: 각 DB 인스턴스 포트값으로 설정됩니다. `minPort`값과 `maxPort`값을 필요로 하지 않습니다.<br/>- `PORT`: 지정된 포트값으로 설정됩니다. `minPort`값과 `maxPort`값이 같아야 합니다.<br/>- `PORT_RANGE`: 지정된 포트 범위로 설정됩니다. |
| port.minPort      | Body   | Number  | X   | 최소 포트 범위<br/>- 최솟값: 1                                                                                                                                                                    |
| port.maxPort      | Body   | Number  | X   | 최대 포트 범위<br/>- 최댓값: 65535                                                                                                                                                                |
| cidr              | Body   | String  | O   | 허용할 트래픽의 원격 소스<br/>- 예시: `1.1.1.1/32`                                                                                                                                                    |

<details><summary>예시</summary>

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

#### 응답

| 이름    | 종류   | 형식   | 설명          |
|-------|------|------|-------------|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>

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

### DB 보안 그룹 규칙 수정하기

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### 요청

| 이름                | 종류    | 형식     | 필수 | 설명                                                                                                                                                                                       |
|-------------------|-------|--------|----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId | URL   | UUID   | O  | DB 보안 그룹의 식별자                                                                                                                                                                            |
| ruleId            | URL   | UUID   | O  | DB 보안 그룹 규칙의 식별자                                                                                                                                                                         |
| description       | Body  | String | X  | DB 보안 그룹 규칙에 대한 추가 정보                                                                                                                                                                    |
| direction         | Body  | Enum   | O  | 통신 방향<br/>- `INGRESS`: 수신<br/>- `EGRESS`: 송신                                                                                                                                             |
| etherType         | Body  | Enum   | O  | Ether 타입<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                           |
| port              | Body  | Object | O  | 포트 객체                                                                                                                                                                                    |
| port.portType     | Body  | Enum   | O  | 포트 타입<br/>- `DB_PORT`: 각 DB 인스턴스 포트값으로 설정됩니다. `minPort`값과 `maxPort`값을 필요로 하지 않습니다.<br/>- `PORT`: 지정된 포트값으로 설정됩니다. `minPort`값과 `maxPort`값이 같아야 합니다.<br/>- `PORT_RANGE`: 지정된 포트 범위로 설정됩니다. |
| port.minPort      | Body  | Number | X  | 최소 포트 범위<br/>- 최솟값: 1                                                                                                                                                                    |
| port.maxPort      | Body  | Number | X  | 최대 포트 범위<br/>- 최댓값: 65535                                                                                                                                                                |
| cidr              | Body  | String | O  | 허용할 트래픽의 원격 소스<br/>- 예시: `1.1.1.1/32`                                                                                                                                                    |

<details><summary>예시</summary>

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

#### 응답

| 이름    | 종류   | 형식   | 설명          |
|-------|------|------|-------------|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>

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

### DB 보안 그룹 규칙 삭제하기

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름                | 종류    | 형식    | 필수 | 설명                  |
|-------------------|-------|-------|----|---------------------|
| dbSecurityGroupId | URL   | UUID  | O  | DB 보안 그룹의 식별자       |
| ruleIds           | Query | Array | O  | DB 보안 그룹 규칙의 식별자 목록 |

#### 응답

| 이름    | 종류   | 형식   | 설명          |
|-------|------|------|-------------|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>

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

## 파라미터 그룹

### 파라미터 그룹 목록 보기

```http
GET /v1.0/parameter-groups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름        | 종류    | 형식   | 필수 | 설명       |
|-----------|-------|------|----|----------|
| dbVersion | Query | Enum | X  | DB 엔진 버전 |

#### 응답

| 이름                                   | 종류   | 형식       | 설명                                                                |
|--------------------------------------|------|----------|-------------------------------------------------------------------|
| parameterGroups                      | Body | Array    | 파라미터 그룹 목록                                                        |
| parameterGroups.parameterGroupId     | Body | UUID     | 파라미터 그룹의 식별자                                                      |
| parameterGroups.parameterGroupName   | Body | String   | 파라미터 그룹을 식별할 수 있는 이름                                              |
| parameterGroups.parameterGroupStatus | Body | Enum     | 파라미터 그룹의 현재 상태<br/>- `STABLE`: 적용 완료<br/>- `NEED_TO_APPLY`: 적용 필요 |
| parameterGroups.description          | Body | String   | 파라미터 그룹에 대한 추가 정보                                                 |
| parameterGroups.dbVersion            | Body | Enum     | DB 엔진 버전                                                          |
| parameterGroups.createdYmdt          | Body | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                 |
| parameterGroups.updatedYmdt          | Body | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                 |

<details><summary>예시</summary>

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
            "dbVersion": "POSTGRESQL_V146",
            "createdYmdt": "2023-02-31T15:28:17+09:00",
            "updatedYmdt": "2023-02-31T15:28:17+09:00"
        }
    ]
}
```
</details>


### 파라미터 그룹 상세 보기

```http
GET /v1.0/parameter-groups/{parameterGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름               | 종류  | 형식   | 필수 | 설명           |
|------------------|-----|------|----|--------------|
| parameterGroupId | URL | UUID | O  | 파라미터 그룹의 식별자 |

#### 응답

| 이름                           | 종류   | 형식       | 설명                                                                                                                                                                                                                                                                                                                                                   |
|------------------------------|------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| parameterGroupId             | Body | UUID     | 파라미터 그룹의 식별자                                                                                                                                                                                                                                                                                                                                         |
| parameterGroupName           | Body | String   | 파라미터 그룹을 식별할 수 있는 이름                                                                                                                                                                                                                                                                                                                                 |
| description                  | Body | String   | 파라미터 그룹에 대한 추가 정보                                                                                                                                                                                                                                                                                                                                    |
| dbVersion                    | Body | Enum     | DB 엔진 버전                                                                                                                                                                                                                                                                                                                                             |
| parameterGroupStatus         | Body | Enum     | 파라미터 그룹의 현재 상태<br/>- `STABLE`: 적용 완료<br/>- `NEED_TO_APPLY`: 적용 필요<br/>- `DELETED`: 삭제됨                                                                                                                                                                                                                                                               |
| parameters                   | Body | Array    | 파라미터 목록                                                                                                                                                                                                                                                                                                                                              |
| parameters.parameterCategory | Body | String   | 파라미터 카테고리                                                                                                                                                                                                                                                                                                                                            |
| parameters.parameterName     | Body | String   | 파라미터 이름                                                                                                                                                                                                                                                                                                                                              |
| parameters.value             | Body | String   | 현재 설정된 값                                                                                                                                                                                                                                                                                                                                             |
| parameters.valueUnit         | Body | Enum     | 현재 설정된 값의 단위<br/>- `B`: 바이트<br/>- `kB`: 킬로바이트<br/>- `MB`: 메가바이트<br/>- `GB`: 기가바이트<br/>- `TB`: 테라바이트<br/>- `us`: 마이크로초<br/>- `ms`: 밀리초<br/>- `s`: 초<br/>- `min`: 분<br/>- `h`: 시<br/>- `d`: 일                                                                                                                                                          |
| parameters.defaultValue      | Body | String   | 기본값                                                                                                                                                                                                                                                                                                                                                  |
| parameters.allowedValue      | Body | String   | 허용된 값                                                                                                                                                                                                                                                                                                                                                |
| parameters.valueType         | Body | Enum     | 값 타입<br/>- `BOOLEAN`: 불린 타입<br/>- `STRING`: 문자열 타입<br/>- `NUMERIC`: 정수 및 부동 소수점 타입<br/>- `NUMERIC_WITH_BYTE_UNIT`: 바이트 단위의 숫자 타입 (예: 120kB, 100MB)<br/>- `NUMERIC_WITH_TIME_UNIT`: 시간 단위의 숫자 타입 (예: 120ms, 100s, 1d)<br/>- `ENUMERATED`: 허용된 값에 선언된 값 중 한 개 입력<br/>- `MULTI_ENUMERATED`: 허용된 값에 선언된 값 중 여러개 입력 (콤마(,)로 구분됨)<br/>- `TIMEZONE`: 타임존 타입 |
| parameters.updateType        | Body | Enum     | 수정 타입<br/>- `VARIABLE`: 언제든 수정 가능<br/>- `CONSTANT`: 수정 불가능                                                                                                                                                                                                                                                                                           |
| parameters.applyType         | Body | Enum     | 적용 타입<br/>- `SESSION`: 세션 적용<br/>- `FILE`: 설정 파일 적용(재시작 필요)<br/>- `BOTH`: 전체                                                                                                                                                                                                                                                                         | 
| createdYmdt                  | Body | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                                                                                                                                                                                    |
| updatedYmdt                  | Body | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                                                                                                                                                                                    |
| expressionAvailable          | Body | Boolean  | 수식 허용 여부                                                                                                                                                                                                                                                                                                                                             |

<details><summary>예시</summary>

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
    "dbVersion": "POSTGRESQL_V146",
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


### 파라미터 그룹 생성하기

```http
POST /v1.0/parameter-groups
```

#### 요청

| 이름                 | 종류   | 형식     | 필수 | 설명                   |
|--------------------|------|--------|----|----------------------|
| parameterGroupName | Body | String | O  | 파라미터 그룹을 식별할 수 있는 이름 |
| description        | Body | String | X  | 파라미터 그룹에 대한 추가 정보    |
| dbVersion          | Body | Enum   | O  | DB 엔진 버전             |

<details><summary>예시</summary>

```json
{
    "parameterGroupName": "parameter-group",
    "description": "description",
    "dbVersion": "POSTGRESQL_V146"
}
```
</details>

#### 응답

| 이름               | 종류   | 형식   | 설명           |
|------------------|------|------|--------------|
| parameterGroupId | Body | UUID | 파라미터 그룹의 식별자 |

<details><summary>예시</summary>

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

### 파라미터 그룹 복사하기

```http
POST /v1.0/parameter-groups/{parameterGroupId}/copy
```

#### 요청

| 이름                 | 종류   | 형식     | 필수 | 설명                   |
|--------------------|------|--------|----|----------------------|
| parameterGroupId   | URL  | UUID   | O  | 파라미터 그룹의 식별자         |
| parameterGroupName | Body | String | O  | 파라미터 그룹을 식별할 수 있는 이름 |
| description        | Body | String | X  | 파라미터 그룹에 대한 추가 정보    |

<details><summary>예시</summary>

```json
{
    "parameterGroupName": "parameter-group-copy",
    "description": "copy"
}
```
</details>

#### 응답

| 이름               | 종류   | 형식   | 설명           |
|------------------|------|------|--------------|
| parameterGroupId | Body | UUID | 파라미터 그룹의 식별자 |

<details><summary>예시</summary>

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

### 파라미터 그룹 수정하기

```http
PUT /v1.0/parameter-groups/{parameterGroupId}
```

#### 요청

| 이름                 | 종류   | 형식     | 필수 | 설명                   |
|--------------------|------|--------|----|----------------------|
| parameterGroupId   | URL  | UUID   | O  | 파라미터 그룹의 식별자         |
| parameterGroupName | Body | String | X  | 파라미터 그룹을 식별할 수 있는 이름 |
| description        | Body | String | X  | 파라미터 그룹에 대한 추가 정보    |

<details><summary>예시</summary>

```json
{
    "parameterGroupName": "parameter-group",
    "description": "description"
}
```
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

<details><summary>예시</summary>

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

### 파라미터 수정하기

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/parameters
```

#### 요청

| 이름                               | 종류   | 형식     | 필수 | 설명           |
|----------------------------------|------|--------|----|--------------|
| parameterGroupId                 | URL  | UUID   | O  | 파라미터 그룹의 식별자 |
| modifiedParameters               | Body | Array  | O  | 변경할 파라미터 목록  |
| modifiedParameters.parameterName | Body | UUID   | O  | 파라미터 이름      |
| modifiedParameters.value         | Body | String | O  | 변경할 파라미터 값   |

<details><summary>예시</summary>

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

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

<details><summary>예시</summary>

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

### 파라미터 그룹 재설정하기

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/reset
```

#### 요청

| 이름               | 종류  | 형식   | 필수 | 설명           |
|------------------|-----|------|----|--------------|
| parameterGroupId | URL | UUID | O  | 파라미터 그룹의 식별자 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

<details><summary>예시</summary>

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

### 파라미터 그룹 삭제하기

```http
DELETE /v1.0/parameter-groups/{parameterGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름               | 종류  | 형식   | 필수 | 설명           |
|------------------|-----|------|----|--------------|
| parameterGroupId | URL | UUID | O  | 파라미터 그룹의 식별자 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

<details><summary>예시</summary>

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

## 사용자 그룹

### 사용자 그룹 목록 보기

```http
GET /v1.0/user-groups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름                       | 종류   | 형식       | 설명                                                      |
|--------------------------|------|----------|---------------------------------------------------------|
| userGroups               | Body | Array    | 사용자 그룹 목록                                               |
| userGroups.userGroupId   | Body | UUID     | 사용자 그룹의 식별자                                             |
| userGroups.userGroupName | Body | String   | 사용자 그룹을 식별할 수 있는 이름                                     |
| userGroupStatus          | Body | Enum     | 사용자 그룹의 현재 상태<br/>- `CREATED`: 생성됨<br/>- `DELETED`: 삭제됨 |
| userGroups.createdYmdt   | Body | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                       |
| userGroups.updatedYmdt   | Body | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                       |

<details><summary>예시</summary>

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


### 사용자 그룹 상세 보기

```http
GET /v1.0/user-groups/{userGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름          | 종류  | 형식   | 필수 | 설명          |
|-------------|-----|------|----|-------------|
| userGroupId | URL | UUID | O  | 사용자 그룹의 식별자 |

#### 응답

| 이름                | 종류   | 형식       | 설명                                                                                                        |
|-------------------|------|----------|-----------------------------------------------------------------------------------------------------------|
| userGroupId       | Body | UUID     | 사용자 그룹의 식별자                                                                                               |
| userGroupName     | Body | String   | 사용자 그룹을 식별할 수 있는 이름                                                                                       |
| userGroupTypeCode | Body | Enum     | 사용자 그룹 종류    <br /> `ENTIRE`: 프로젝트 멤버 전체를 포함하는 사용자 그룹 <br /> `INDIVIDUAL_MEMBER`: 특정 프로젝트 멤버를 포함하는 사용자 그룹 |
| userGroupStatus   | Body | Enum     | 사용자 그룹의 현재 상태<br/>- `CREATED`: 생성됨<br/>- `DELETED`: 삭제됨                                                   |
| members           | Body | Array    | 프로젝트 멤버 목록                                                                                                |
| members.memberId  | Body | UUID     | 프로젝트 멤버의 식별자                                                                                              |
| createdYmdt       | Body | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                         |
| updatedYmdt       | Body | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                         |

<details><summary>예시</summary>

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


### 사용자 그룹 생성하기

```http
POST /v1.0/user-groups
```

#### 요청

| 이름            | 종류   | 형식      | 필수 | 설명                                                               |
|---------------|------|---------|----|------------------------------------------------------------------|
| userGroupName | Body | String  | O  | 사용자 그룹을 식별할 수 있는 이름                                              |
| memberIds     | Body | Array   | O  | 프로젝트 멤버의 식별자 목록     <br /> `selectAllYN`이 true인 경우 해당 필드 값은 무시됨. |
| selectAllYN   | Body | Boolean | X  | 프로젝트 멤버 전체 유무 <br /> true인 경우 해당 그룹은 전체 멤버에 대해 설정됨               |

<details><summary>예시</summary>

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

#### 응답

| 이름          | 종류   | 형식   | 설명          |
|-------------|------|------|-------------|
| userGroupId | Body | UUID | 사용자 그룹의 식별자 |


### 사용자 그룹 수정하기

```http
PUT /v1.0/user-groups/{userGroupId}
```

#### 요청

| 이름            | 종류   | 형식      | 필수 | 설명                                                 |
|---------------|------|---------|----|----------------------------------------------------|
| userGroupId   | URL  | UUID    | O  | 사용자 그룹의 식별자                                        |
| userGroupName | Body | String  | X  | 사용자 그룹을 식별할 수 있는 이름                                |
| memberIds     | Body | Array   | X  | 프로젝트 멤버의 식별자 목록                                    |
| selectAllYN   | Body | Boolean | X  | 프로젝트 멤버 전체 유무 <br /> true인 경우 해당 그룹은 전체 멤버에 대해 설정됨 |

<details><summary>예시</summary>

```json
{
    "userGroupName": "dev-team",
    "memberIds": ["1321e759-2ef3-4b85-9921-b13e918b24b5","f9064b09-2b15-442e-a4b0-3a5a2754555e"]
}
```
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

<details><summary>예시</summary>

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

### 사용자 그룹 삭제하기

```http
DELETE /v1.0/user-groups/{userGroupId}
```

#### 요청

| 이름          | 종류  | 형식   | 필수 | 설명          |
|-------------|-----|------|----|-------------|
| userGroupId | URL | UUID | O  | 사용자 그룹의 식별자 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

<details><summary>예시</summary>

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

## 알림 그룹

### 알림 그룹 목록 보기

```http
GET /v1.0/notification-groups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름                                         | 종류   | 형식       | 설명                                                     |
|--------------------------------------------|------|----------|--------------------------------------------------------|
| notificationGroups                         | Body | Array    | 알림 그룹 목록                                               |
| notificationGroups.notificationGroupId     | Body | UUID     | 알림 그룹의 식별자                                             |
| notificationGroups.notificationGroupName   | Body | String   | 알림 그룹을 식별할 수 있는 이름                                     |
| notificationGroups.notificationGroupStatus | Body | Enum     | 알림 그룹의 현재 상태<br/>- `CREATED`: 생성됨<br/>- `DELETED`: 삭제됨 |
| notificationGroups.notifyEmail             | Body | Boolean  | 이메일 알림 여부                                              |
| notificationGroups.notifySms               | Body | Boolean  | SMS 알림 여부                                              |
| notificationGroups.isEnabled               | Body | Boolean  | 활성화 여부                                                 |
| notificationGroups.createdYmdt             | Body | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                      |
| notificationGroups.updatedYmdt             | Body | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                      |

<details><summary>예시</summary>

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


### 알림 그룹 상세 보기

```http
GET /v1.0/notification-groups/{notificationGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름                  | 종류  | 형식   | 필수 | 설명         |
|---------------------|-----|------|----|------------|
| notificationGroupId | URL | UUID | O  | 알림 그룹의 식별자 |

#### 응답

| 이름                         | 종류   | 형식       | 설명                                                     |
|----------------------------|------|----------|--------------------------------------------------------|
| notificationGroupId        | Body | UUID     | 알림 그룹의 식별자                                             |
| notificationGroupName      | Body | String   | 알림 그룹을 식별할 수 있는 이름                                     |
| notificationGroupStatus    | Body | Enum     | 알림 그룹의 현재 상태<br/>- `CREATED`: 생성됨<br/>- `DELETED`: 삭제됨 |
| notifyEmail                | Body | Boolean  | 이메일 알림 여부                                              |
| notifySms                  | Body | Boolean  | SMS 알림 여부                                              |
| isEnabled                  | Body | Boolean  | 활성화 여부                                                 |
| dbInstances                | Body | Array    | 감시 대상 DB 인스턴스 목록                                       |
| dbInstances.dbInstanceId   | Body | UUID     | DB 인스턴스의 식별자                                           |
| dbInstances.dbInstanceName | Body | String   | DB 인스턴스를 식별할 수 있는 이름                                   |
| userGroups                 | Body | Array    | 사용자 그룹 목록                                              |
| userGroups.userGroupId     | Body | UUID     | 사용자 그룹의 식별자                                            |
| userGroups.userGroupName   | Body | String   | 사용자 그룹을 식별할 수 있는 이름                                    |
| createdYmdt                | Body | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                      |
| updatedYmdt                | Body | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                      |

<details><summary>예시</summary>

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


### 알림 그룹 생성하기

```http
POST /v1.0/notification-groups
```

#### 요청

| 이름                    | 종류   | 형식      | 필수 | 설명                          |
|-----------------------|------|---------|----|-----------------------------|
| notificationGroupName | Body | String  | O  | 알림 그룹을 식별할 수 있는 이름          |
| notifyEmail           | Body | Boolean | X  | 이메일 알림 여부<br/>- 기본값: `true` |
| notifySms             | Body | Boolean | X  | SMS 알림 여부<br/>- 기본값: `true` |
| isEnabled             | Body | Boolean | X  | 활성화 여부<br/>- 기본값: `true`    |
| dbInstanceIds         | Body | Array   | X  | 감시 대상 DB 인스턴스의 식별자 목록       |
| userGroupIds          | Body | Array   | X  | 사용자 그룹의 식별자 목록              |

<details><summary>예시</summary>

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

#### 응답

| 이름                  | 종류   | 형식   | 설명         |
|---------------------|------|------|------------|
| notificationGroupId | Body | UUID | 알림 그룹의 식별자 |


### 알림 그룹 수정하기

```http
PUT /v1.0/notification-groups/{notificationGroupId}
```

#### 요청

| 이름                    | 종류   | 형식      | 필수 | 설명                    |
|-----------------------|------|---------|----|-----------------------|
| notificationGroupId   | URL  | UUID    | O  | 알림 그룹의 식별자            |
| notificationGroupName | Body | String  | X  | 알림 그룹을 식별할 수 있는 이름    |
| notifyEmail           | Body | Boolean | X  | 이메일 알림 여부             |
| notifySms             | Body | Boolean | X  | SMS 알림 여부             |
| isEnabled             | Body | Boolean | X  | 활성화 여부                |
| dbInstanceIds         | Body | Array   | X  | 감시 대상 DB 인스턴스의 식별자 목록 |
| userGroupIds          | Body | Array   | X  | 사용자 그룹의 식별자 목록        |

<details><summary>예시</summary>

```json
{
    "notifyEmail": true,
    "dbInstanceIds": ["ed5cb985-526f-4c54-9ae0-40288593de65", "d51b7da0-682f-47ff-b588-b739f6adc740"]
}
```
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

<details><summary>예시</summary>

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

### 알림 그룹 삭제하기

```http
DELETE /v1.0/notification-groups/{notificationGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름                  | 종류  | 형식   | 필수 | 설명         |
|---------------------|-----|------|----|------------|
| notificationGroupId | URL | UUID | O  | 알림 그룹의 식별자 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

<details><summary>예시</summary>

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

### 감시 설정 목록 보기

```http
GET /v1.0/notification-groups/{notificationGroupId}/watchdogs
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름                           | 종류   | 형식       | 설명                                                                     |
|------------------------------|------|----------|------------------------------------------------------------------------|
| notificationGroupId          | URL  | UUID     | 알림 그룹의 식별자                                                             | 알림 그룹의 식별자                                                            |
| watchdogs                    | Body | Array    | 감시 설정 목록                                                               |
| watchdogs.watchdogId         | Body | UUID     | 감시 설정의 식별자                                                             |
| watchdogs.metricName         | Body | Enum     | 감시 대상 성능 지표<br/>- 설정 가능한 성능 지표는 [성능 지표 목록 보기](#성능-지표-목록-보기) 항목을 참고합니다. |
| watchdogs.comparisonOperator | Body | Enum     | 감시 대상 비교 방법<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: >  |
| watchdogs.threshold          | Body | Long     | 감시 대상 임곗값                                                              |
| watchdogs.duration           | Body | Long     | 감시 대상 지속 시간<br/>- 단위: `분`                                              |
| watchdogs.createdYmdt        | Body | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                      |

<details><summary>예시</summary>

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

### 감시 설정 생성하기

```http
POST /v1.0/notification-groups/{notificationGroupId}/watchdogs
```

#### 요청

| 이름                  | 종류   | 형식   | 필수 | 설명                                                                     |
|---------------------|------|------|----|------------------------------------------------------------------------|
| notificationGroupId | URL  | UUID | O  | 알림 그룹의 식별자                                                             |
| metricName          | Body | Enum | O  | 감시 대상 성능 지표<br/>- 설정 가능한 성능 지표는 [성능 지표 목록 보기](#성능-지표-목록-보기) 항목을 참고합니다. |
| comparisonOperator  | Body | Enum | O  | 감시 대상 비교 방법<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: >  |
| threshold           | Body | Long | O  | 감시 대상 임곗값                                                              |
| duration            | Body | Long | O  | 감시 대상 지속 시간<br/>- 단위: `분`                                              |

<details><summary>예시</summary>

```json
{
    "metricName": "DATABASE_STATUS",
    "comparisonOperator": "LE",
    "threshold": 0,
    "duration": 5
}
```
</details>

#### 응답

| 이름         | 종류   | 형식   | 설명         |
|------------|------|------|------------|
| watchdogId | Body | UUID | 감시 설정의 식별자 |


### 감시 설정 수정하기

```http
PUT /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
```

#### 요청

| 이름                  | 종류   | 형식   | 필수 | 설명                                                                     |
|---------------------|------|------|----|------------------------------------------------------------------------|
| notificationGroupId | URL  | UUID | O  | 알림 그룹의 식별자                                                             |
| watchdogId          | URL  | UUID | O  | 감시 설정의 식별자                                                             |
| metricName          | Body | Enum | O  | 감시 대상 성능 지표<br/>- 설정 가능한 성능 지표는 [성능 지표 목록 보기](#성능-지표-목록-보기) 항목을 참고합니다. |
| comparisonOperator  | Body | Enum | O  | 감시 대상 비교 방법<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: >  |
| threshold           | Body | Long | O  | 감시 대상 임곗값                                                              |
| duration            | Body | Long | O  | 감시 대상 지속 시간<br/>- 단위: `분`                                              |

<details><summary>예시</summary>

```json
{
    "metricName": "DATABASE_STATUS",
    "comparisonOperator": "LE",
    "threshold": 0,
    "duration": 10
}
```
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

<details><summary>예시</summary>

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

### 감시 설정 삭제하기

```http
DELETE /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름                  | 종류  | 형식   | 필수 | 설명         |
|---------------------|-----|------|----|------------|
| notificationGroupId | URL | UUID | O  | 알림 그룹의 식별자 |
| watchdogId          | URL | UUID | O  | 감시 설정의 식별자 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

<details><summary>예시</summary>

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

## 모니터링

### 성능 지표 목록 보기

```http
GET /v1.0/metrics
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름                 | 종류   | 형식     | 설명       |
|--------------------|------|--------|----------|
| metrics            | Body | Array  | 성능 지표 목록 |
| metrics.metricName | Body | Enum   | 성능 지표 유형 |
| metrics.unit       | Body | String | 측정값 단위   |

<details><summary>예시</summary>

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

### 통계 정보 조회

```http
GET /v1.0/metric-statistics
```

#### 요청

| 이름           | 종류    | 형식       | 필수 | 설명                                                        |
|--------------|-------|----------|----|-----------------------------------------------------------|
| dbInstanceId | Query | UUID     | O  | DB 인스턴스의 식별자                                              |
| metricNames  | Query | Array    | O  | 조회할 성능 지표 목록<br/>- 최소 크기: `1`                             |
| from         | Query | Datetime | O  | 시작 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                         |
| to           | Query | Datetime | O  | 종료 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                         |
| interval     | Query | Number   | X  | 조회 간격<br/>- 단위: `분`<br/>- 기본값: 시작/종료 일시에 따라 적절한 값을 자동 선택함 |

#### 응답

| 이름                                | 종류   | 형식        | 설명       |
|-----------------------------------|------|-----------|----------|
| metricStatistics                  | Body | Array     | 통계 정보 목록 |
| metricStatistics.metricName       | Body | Enum      | 성능 지표 유형 |
| metricStatistics.unit             | Body | String    | 측정값 단위   |
| metricStatistics.values           | Body | Array     | 측정값 목록   |
| metricStatistics.values.timestamp | Body | Timestamp | 측정 시간    |
| metricStatistics.values.value     | Body | Object    | 측정값      |

<details><summary>예시</summary>

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

## 이벤트

### 이벤트 목록 보기

```
GET /v1.0/events
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름                | 종류    | 형식       | 필수 | 설명                                                                                                                                                                               |
|-------------------|-------|----------|----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| page              | Query | Number   | O  | 조회할 목록의 페이지<br/>- 최솟값: `1`                                                                                                                                                       |
| size              | Query | Number   | O  | 조회할 목록의 페이지 크기<br/>- 최솟값: `1`<br/>- 최댓값: `100`                                                                                                                                   |
| from              | Query | Datetime | O  | 시작 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                |
| to                | Query | Datetime | O  | 종료 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                |
| eventCategoryType | Query | Enum     | O  | 조회할 이벤트 카테고리 유형<br/>- `ALL`: 전체<br/>- `BACKUP`: 백업<br/>- `DB_INSTANCE`: DB 인스턴스<br/>- `DB_SECURITY_GROUP`: DB 보안 그룹<br/>- `JOB`: 작업<br/>- `TENANT`: 테넌트<br/>- `MONITORING`: 모니터링 |
| sourceId          | Query | String   | X  | 이벤트가 발생한 대상 리소스의 식별자                                                                                                                                                             |
| keyword           | Query | String   | X  | 이벤트 메시지에 포함된 문자열 검색어                                                                                                                                                             |

#### 응답

| 이름                       | 종류   | 형식       | 설명                                                 |
|--------------------------|------|----------|----------------------------------------------------|
| totalCounts              | Body | Number   | 전체 이벤트 목록 수                                        |
| events                   | Body | Array    | 이벤트 목록                                             |
| events.eventCategoryType | Body | Enum     | 이벤트 카테고리 유형                                        |
| events.eventCode         | Body | Enum     | 발생한 이벤트의 유형<br/>- 자세한 설명은 [이벤트](event/) 항목을 참고합니다. |
| events.sourceId          | Body | String   | 이벤트 소스의 식별자                                        |
| events.sourceName        | Body | String   | 이벤트 소스를 식별할 수 있는 이름                                |
| events.messages          | Body | Array    | 이벤트 메시지 목록                                         |
| events.messages.langCode | Body | String   | 언어 코드                                              |
| events.messages.message  | Body | String   | 이벤트 메시지                                            |
| events.eventYmdt         | Body | DateTime | 이벤트 발생 일시(YYYY-MM-DDThh:mm:ss.SSSTZD)              |

<details><summary>예시</summary>

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


### 구독 가능한 이벤트 코드 목록 보기

```http
GET /v1.0/event-codes
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름                           | 종류   | 형식    | 설명          |
|------------------------------|------|-------|-------------|
| eventCodes                   | Body | Array | 이벤트 코드 목록   |
| eventCodes.eventCode         | Body | Enum  | 이벤트 코드      |
| eventCodes.eventCategoryType | Body | Enum  | 이벤트 카테고리 유형 |

<details><summary>예시</summary>

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
