<a id="rds-for-postgresql-api"></a>
## RDS for PostgreSQL API 가이드 { #rds-for-postgresql-api }

**Database > RDS for PostgreSQL > API v1.0 가이드**

<a id="rds-for-postgresql-api-2"></a>
## RDS for PostgreSQL API 공통 정보 { #rds-for-postgresql-api-2 }

<a id="api"></a>
### API 엔드포인트 { #api }

| 리전 | 엔드포인트 |
|------|----------|
| 한국(판교) 리전 | https://kr1-rds-postgres.api.nhncloudservice.com |
| 한국(평촌) 리전 | https://kr2-rds-postgres.api.nhncloudservice.com |


<a id="rds-for-postgresql-api-2-1"></a>
### 인증 및 권한 { #rds-for-postgresql-api-2-1 }

RDS for PostgreSQL은(는) API 호출 시 인증/인가를 위해 User Access Key 토큰을 사용합니다. User Access Key 토큰은 User Access Key를 기반으로 발급되는 Bearer 유형의 일시적 액세스 토큰입니다. User Access Key 토큰 발급 및 사용에 대한 자세한 내용은 [User Access Key 토큰](/nhncloud/ko/public-api/user-access-key-token)을 참고하세요.
발급받은 토큰은 Appkey와 함께 요청 Header에 포함해야 합니다.

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|------|-----|
| X-TC-APP-KEY | Header | String | Y    | RDS for PostgreSQL 서비스의 Appkey 또는 프로젝트 통합 Appkey |
| X-NHN-AUTHORIZATION | Header | String | Y    | Public API로 발급받은 Bearer 유형 토큰 |

또한 프로젝트 권한에 따라 호출할 수 있는 API가 제한됩니다. `RDS for PostgreSQL ADMIN`, `RDS for PostgreSQL VIEWER` 역할에는 다음과 같이 기본 권한이 부여되어 있으며, 프로젝트 내 역할 그룹 관리 메뉴에서 필요한 권한만 부여할 수 있습니다.

* `RDS for PostgreSQL ADMIN` 역할에는 API 실행에 필요한 모든 권한이 부여됩니다.
* `RDS for PostgreSQL VIEWER` 역할에는 정보를 조회하는 권한만 부여됩니다.
    * DB 인스턴스를 생성, 수정, 삭제하거나, DB 인스턴스를 대상으로 하는 어떠한 기능도 사용할 수 없습니다.
    * 단, 알림 그룹과 사용자 그룹 관련 기능은 사용할 수 있습니다.

API 요청 시 인증에 실패하거나 권한이 없을 경우 다음과 같은 오류가 발생합니다.

| resultCode | resultMessage | 설명 |
|------------|---------------|-----|
| 80401 | Unauthorized | 인증에 실패했습니다. |
| 80403 | Forbidden | 권한이 없습니다. |

<a id="rds-for-postgresql-api-2-2"></a>
### 응답 공통 정보 { #rds-for-postgresql-api-2-2 }

모든 API 요청에 '200 OK'로 응답합니다. 자세한 응답 결과는 응답 본문의 헤더를 참고하세요.

<details>
  <summary><strong>성공 응답</strong></summary>

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
  <summary><strong>실패 응답</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| resultCode | Number | 결과 코드<br/>- 성공: `0`<br/>- 실패: `0`이 아닌 값 |
| resultMessage | String | 결과 메시지 |
| isSuccessful | Boolean | 성공 여부 |

<a id="db"></a>
## DB 엔진 버전 { #db }

<a id="db-2"></a>
### 지원 DB 엔진 버전 { #db-2 }

| DB 엔진 버전 | 생성 가능 여부 | 오브젝트 스토리지에서 복원 가능 여부 |
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

* Enum 유형인 dbVersion 필드에 위 값을 사용할 수 있습니다.
* 버전에 따라 생성 또는 복원이 불가능할 수 있습니다.

<a id="db-3"></a>
### DB 엔진 버전 목록 보기 { #db-3 }

<a id="db-3-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbVersion.List | DB 엔진 버전 목록 보기 |

<a id="db-3-2"></a>
#### 요청

```http
GET /v1.0/db-versions
```

<a id="db-3-3"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-3-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbVersions | Array | DB 버전 정보 |
| dbVersions.dbVersion | Enum | DB 엔진 버전 |
| dbVersions.dbVersionName | String | DB 엔진 버전명 |
| dbVersions.restorableFromObs | Boolean | 오브젝트 스토리지에서 복원 가능 여부 |

---

<a id="db-4"></a>
## DB 인스턴스 사양 { #db-4 }

<a id="db-4-db"></a>
### DB 인스턴스 유형 목록 보기 { #db-4-db }

<a id="db-4-db-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbFlavor.List | DB 인스턴스 유형 목록 보기 |

<a id="db-4-db-2"></a>
#### 요청

```http
GET /v1.0/db-flavors
```

<a id="db-4-db-3"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-4-db-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbFlavors | Array | DB 인스턴스 사양 정보 |
| dbFlavors.dbFlavorId | UUID | DB 인스턴스 사양의 식별자 |
| dbFlavors.dbFlavorName | String | DB 인스턴스 사양명 |
| dbFlavors.ram | Number | 메모리 용량(MB) |
| dbFlavors.vcpus | Number | CPU 코어 수 |

---

<a id="section-1"></a>
## 프로젝트 정보 { #section-1 }

<a id="section-1-1"></a>
### 프로젝트의 멤버 목록 조회 { #section-1-1 }

<a id="section-1-1-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:Project.Get | 프로젝트의 멤버 목록 조회 |

<a id="section-1-1-2"></a>
#### 요청

```http
GET /v1.0/project/members
```

<a id="section-1-1-3"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-1-1-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| projectMembers | Array | 프로젝트 멤버 정보 |
| projectMembers.memberId | UUID | 프로젝트 멤버의 식별자 |
| projectMembers.memberName | String | 프로젝트 멤버의 이름 |
| projectMembers.emailAddress | String | 프로젝트 멤버의 이메일 주소 |
| projectMembers.phoneNumber | String | 프로젝트 멤버의 전화번호 |

---

<a id="section-1-2"></a>
### 프로젝트의 리전 목록 조회 { #section-1-2 }

<a id="section-1-2-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:Project.Get | 프로젝트의 리전 목록 조회 |

<a id="section-1-2-2"></a>
#### 요청

```http
GET /v1.0/project/regions
```

<a id="section-1-2-3"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-1-2-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| regions | Array | 리전 정보 |
| regions.regionCode | Enum | 리전 코드<br/>- `KR1`: 한국(판교)<br/>- `KR2`: 한국(평촌) |
| regions.isEnabled | Boolean | 리전의 활성화 여부 |

---

<a id="section-2"></a>
## 네트워크 { #section-2 }

<a id="section-2-1"></a>
### 서브넷 목록 보기 { #section-2-1 }

<a id="section-2-1-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:Network.List | 서브넷 목록 보기 |

<a id="section-2-1-2"></a>
#### 요청

```http
GET /v1.0/network/subnets
```

<a id="section-2-1-3"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-2-1-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| subnets | Array | 서브넷 정보 |
| subnets.subnetId | UUID | 서브넷의 식별자 |
| subnets.subnetName | String | 서브넷을 식별할 수 있는 이름 |
| subnets.subnetCidr | String | 서브넷의 CIDR |
| subnets.usingGateway | Boolean | 게이트웨이 사용 여부 |
| subnets.availableIpCount | Number | 사용 가능한 IP 수 |

---

<a id="section-3"></a>
## 스토리지 { #section-3 }

<a id="section-3-1"></a>
### 스토리지 유형 목록 보기 { #section-3-1 }

<a id="section-3-1-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:Storage.List | 스토리지 유형 목록 보기 |

<a id="section-3-1-2"></a>
#### 요청

```http
GET /v1.0/storage-types
```

<a id="section-3-1-3"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-3-1-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| storageTypes | Array | 스토리지 유형 정보 |

---

<a id="section-4"></a>
## 작업 정보 { #section-4 }

<a id="section-4-1"></a>
### 작업 상태 { #section-4-1 }

| 상태명                | 설명                   |
|--------------------|----------------------|
| `PREPARING`        | 작업이 준비 중인 경우         |
| `READY`            | 작업이 준비 완료된 경우        |
| `RUNNING`          | 작업이 진행 중인 경우         |
| `COMPLETED`        | 작업이 완료된 경우           |
| `REGISTERED`       | 작업이 등록된 경우           |
| `WAIT_TO_REGISTER` | 작업 등록 대기 중인 경우       |
| `INTERRUPTED`      | 작업 진행 중 인터럽트가 발생한 경우 |
| `CANCELED`         | 작업이 취소된 경우           |
| `FAILED`           | 작업이 실패한 경우           |
| `ERROR`            | 작업 진행 중 오류가 발생한 경우   |
| `DELETED`          | 작업이 삭제된 경우           |
| `FAIL_TO_READY`    | 작업 준비에 실패한 경우        |

<a id="section-4-2"></a>
### 작업 정보 상세 보기 { #section-4-2 }

<a id="section-4-2-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:Job.Get | 작업 정보 상세 보기 |

<a id="section-4-2-2"></a>
#### 요청

```http
GET /v1.0/jobs/{jobId}
```

<a id="section-4-2-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| jobId | URL | UUID | Y |  |

<a id="section-4-2-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-4-2-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |
| jobStatus | Enum | 작업의 현재 상태<br/>- `PREPARING`: 작업이 준비 중인 경우<br/>- `READY`: 작업이 준비 완료된 경우<br/>- `RUNNING`: 작업이 진행 중인 경우<br/>- `COMPLETED`: 작업이 완료된 경우<br/>- `REGISTERED`: 작업이 등록된 경우<br/>- `WAIT_TO_REGISTER`: 작업 등록 대기 중인 경우<br/>- `INTERRUPTED`: 작업 진행 중 인터럽트가 발생한 경우<br/>- `CANCELED`: 작업이 취소된 경우<br/>- `FAILED`: 작업이 실패한 경우<br/>- `ERROR`: 작업 진행 중 오류가 발생한 경우<br/>- `DELETED`: 작업이 삭제된 경우<br/>- `FAIL_TO_READY`: 작업 준비에 실패한 경우 |
| resourceRelations | Array | 연관 리소스 목록 |
| resourceRelations.resourceType | Enum | 연관 리소스 유형<br/>- `DB_INSTANCE`: DB 인스턴스<br/>- `DB_INSTANCE_GROUP`: DB 인스턴스 그룹<br/>- `DB_SECURITY_GROUP`: DB 보안 그룹<br/>- `PARAMETER_GROUP`: 파라미터 그룹<br/>- `BACKUP`: 백업<br/>- `TENANT`: 테넌트 |
| resourceRelations.resourceId | UUID | 연관 리소스의 식별자 |
| createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="db-5"></a>
## DB 인스턴스 그룹 { #db-5 }

<a id="db-5-db"></a>
### DB 인스턴스 그룹 목록 보기 { #db-5-db }

<a id="db-5-db-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroup.List | DB 인스턴스 그룹 목록 보기 |

<a id="db-5-db-2"></a>
#### 요청

```http
GET /v1.0/db-instance-groups
```

<a id="db-5-db-3"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-5-db-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbInstanceGroups | Array | DB 인스턴스 그룹 정보 |
| dbInstanceGroups.dbInstanceGroupId | UUID | DB 인스턴스 그룹의 식별자 |
| dbInstanceGroups.dbInstanceGroupStatus | Enum | DB 인스턴스 그룹의 현재 형태<br/>- `CREATED`: 생성됨<br/>- `DELETED`: 삭제됨 |
| dbInstanceGroups.replicationType | Enum | DB 인스턴스 그룹의 복제 형태<br/>- `STANDALONE`: 고가용성 사용 안함<br/>- `HIGH_AVAILABILITY`: 고가용성 사용 |
| dbInstanceGroups.createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbInstanceGroups.updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="db-5-db-5"></a>
### DB 인스턴스 그룹 상세 보기 { #db-5-db-5 }

<a id="db-5-db-5-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroup.Get | DB 인스턴스 그룹 상세 보기 |

<a id="db-5-db-5-2"></a>
#### 요청

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}
```

<a id="db-5-db-5-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y |  |

<a id="db-5-db-5-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-5-db-5-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbInstanceGroupId | UUID | DB 인스턴스 그룹의 식별자 |
| dbInstanceGroupStatus | Enum | DB 인스턴스 그룹의 현재 상태<br/>- `CREATED`: 생성됨<br/>- `DELETED`: 삭제됨 |
| replicationType | Enum | DB 인스턴스 그룹의 복제 형태<br/>- `STANDALONE`: 고가용성 사용 안함<br/>- `HIGH_AVAILABILITY`: 고가용성 사용 |
| dbInstances | Array | DB 인스턴스 그룹에 속한 DB 인스턴스 목록 |
| dbInstances.dbInstanceId | UUID | DB 인스턴스의 식별자 |
| dbInstances.dbInstanceType | Enum | DB 인스턴스의 역할 유형<br/>- `MASTER`: 마스터<br/>- `FAILED_MASTER`: 장애 조치된 마스터<br/>- `CANDIDATE_MASTER`: 예비 마스터<br/>- `READ_ONLY_SLAVE`: 읽기 복제본 |
| dbInstances.dbInstanceStatus | Enum | DB 인스턴스의 현재 상태 |
| createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="db-5-1"></a>
### 확장 리스트 조회 { #db-5-1 }

<a id="db-5-1-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.List | 확장 리스트 조회 |

<a id="db-5-1-2"></a>
#### 요청

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions
```

<a id="db-5-1-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB 인스턴스 그룹의 식별자 |

<a id="db-5-1-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-5-1-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| extensions | Array | 확장 목록 |
| extensions.extensionId | UUID | 확장의 식별자 |
| extensions.extensionName | String | 확장 이름 |
| extensions.extensionStatus | Enum | 확장 상태<br/>- `AVAILABLE`: 사용 가능<br/>- `NEED_TO_APPLY`: 적용 필요<br/>- `APPLYING`: 적용 중 |
| extensions.databases | Array | 확장이 설치된 데이터베이스 정보 |
| extensions.databases.dbInstanceGroupExtensionId | UUID | DB 인스턴스 그룹 내 확장의 식별자 |
| extensions.databases.databaseId | UUID | 데이터베이스의 식별자 |
| extensions.databases.databaseName | String | 데이터베이스 이름 |
| extensions.databases.dbInstanceGroupExtensionStatus | Enum | DB 인스턴스 그룹 내 확장 상태<br/>- `CREATED`: 생성됨<br/>- `INSTALLED`: 설치됨<br/>- `INSTALLING`: 설치 중<br/>- `INSTALL_ERROR`: 설치 오류<br/>- `DELETED`: 삭제됨<br/>- `DELETING`: 삭제 중<br/>- `DELETE_ERROR`: 삭제 오류 |
| extensions.databases.reservedAction | Enum | 예약 작업<br/>- `NONE`: 없음<br/>- `INSTALL`: 설치 예약(적용 필요)<br/>- `INSTALL_WITH_CASCADE`: 강제 설치 예약(적용 필요)<br/>- `DELETE`: 삭제 예약(적용 필요)<br/>- `DELETE_WITH_CASCADE`: 강제 삭제 예약(적용 필요) |
| extensions.databases.errorReason | String | 오류 원인 |
| isNeedToApply | Boolean | 변경 사항 적용 필요 여부 |

---

<a id="db-5-2"></a>
### 확장 변경 사항 적용 { #db-5-2 }

<a id="db-5-2-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Apply | 확장 변경 사항 적용 |

<a id="db-5-2-2"></a>
#### 요청

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/apply
```

<a id="db-5-2-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB 인스턴스 그룹의 식별자 |

<a id="db-5-2-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-5-2-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-5-3"></a>
### 확장 동기화 { #db-5-3 }

<a id="db-5-3-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Sync | 확장 동기화 |

<a id="db-5-3-2"></a>
#### 요청

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/sync
```

<a id="db-5-3-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB 인스턴스 그룹의 식별자 |

<a id="db-5-3-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-5-3-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-5-4"></a>
### 확장 삭제(취소) { #db-5-4 }

<a id="db-5-4-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Delete | 확장 삭제(취소) |

<a id="db-5-4-2"></a>
#### 요청

```http
DELETE /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{dbInstanceGroupExtensionId}
```

<a id="db-5-4-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB 인스턴스 그룹의 식별자 |
| dbInstanceGroupExtensionId | URL | UUID | Y | DB 인스턴스 그룹 내 확장의 식별자 |
| withCascade | Query | Boolean | Y | 의존 정보 강제 삭제 여부 |

<a id="db-5-4-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-5-4-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="db-5-5"></a>
### 확장 설치 { #db-5-5 }

<a id="db-5-5-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceGroupExtension.Install | 확장 설치 |

<a id="db-5-5-2"></a>
#### 요청

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{extensionId}
```

<a id="db-5-5-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y | DB 인스턴스 그룹의 식별자 |
| extensionId | URL | UUID | Y | 확장의 식별자 |

<a id="db-5-5-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "databaseId": "550e8400-e29b-41d4-a716-446655440000",
    "schemaName": "rds",
    "withCascade": false
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| databaseId | UUID | Y | 설치 대상 데이터베이스의 식별자 |
| schemaName | String | Y | 설치 대상 스키마 이름 |
| withCascade | Boolean | N | 의존 정보 강제 설치 여부<br/>- 기본값: `false` |

<a id="db-5-5-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="db-6"></a>
## DB 인스턴스 { #db-6 }

<a id="db-6-db"></a>
### DB 인스턴스 상태 { #db-6-db }

| 상태                  | 설명                           |
|---------------------|------------------------------|
| `AVAILABLE`         | DB 인스턴스가 사용 가능한 경우           |
| `BEFORE_CREATE`     | DB 인스턴스가 생성 전인 경우            |
| `STORAGE_FULL`      | DB 인스턴스의 용량이 부족한 경우          |
| `FAIL_TO_CREATE`    | DB 인스턴스 생성에 실패한 경우           |
| `FAIL_TO_CONNECT`   | DB 인스턴스 연결에 실패한 경우           |
| `REPLICATION_STOP`  | DB 인스턴스의 복제가 중단된 경우          |
| `REPLICATION_DELAY` | DB 인스턴스의 복제가 지연된 경우           |
| `FAILOVER`          | DB 인스턴스가 고가용성 장애 조치된 경우      |
| `SHUTDOWN`          | DB 인스턴스가 중지된 경우              |
| `DELETED`           | DB 인스턴스가 삭제된 경우              |

<a id="db-6-db-2"></a>
### DB 인스턴스 진행 상태 { #db-6-db-2 }

| 상태                                | 설명                   |
|-----------------------------------|------------------------|
| `APPLYING_DB_INSTANCE_HBA_RULE`   | 접근 제어 규칙 적용 중 |
| `APPLYING_EXTENSION`              | 확장 적용 중           |
| `APPLYING_PARAMETER_GROUP`        | 파라미터 그룹 적용 중  |
| `BACKING_UP`                      | 백업 중                |
| `CANCELING`                       | 취소 중                |
| `CREATING`                        | 생성 중                |
| `CREATING_DATABASE`               | 데이터베이스 생성 중   |
| `CREATING_USER`                   | 사용자 생성 중         |
| `DELETING`                        | 삭제 중                |
| `DELETING_DATABASE`               | 데이터베이스 삭제 중   |
| `DELETING_USER`                   | 사용자 삭제 중         |
| `EXPORTING_BACKUP`                | 백업을 내보내는 중     |
| `FAILING_OVER`                    | 장애 조치 중           |
| `MIGRATING`                       | 마이그레이션 중        |
| `MODIFYING`                       | 수정 중                |
| `OCCUPIED`                        | 점유 중                |
| `PREPARING`                       | 준비 중                |
| `PROMOTING`                       | 승격 중                |
| `PROMOTING_FORCIBLY`              | 강제 승격 중           |
| `REBUILDING`                      | 재구축 중              |
| `REPAIRING`                       | 복구 중                |
| `REPLICATING`                     | 복제 중                |
| `RESTARTING`                      | 재시작 중              |
| `RESTARTING_FORCIBLY`             | 강제 재시작 중         |
| `RESTORING`                       | 복원 중                |
| `STARTING`                        | 시작 중                |
| `STOPPING`                        | 정지 중                |
| `SYNCING_DATABASE`                | 데이터베이스 동기화 중 |
| `SYNCING_EXTENSION`               | 확장 동기화 중         |
| `SYNCING_USER`                    | 사용자 동기화 중       |
| `UPDATING_DATABASE`               | 데이터베이스 수정 중   |
| `UPDATING_SCHEMA`                 | 스키마 수정 중         |
| `UPDATING_USER`                   | 사용자 수정 중         |
| `WAIT_MANUAL_CONTROL`             | 수동 장애조치 대기 중  |

<a id="db-6-db-3"></a>
### DB 인스턴스 목록 보기 { #db-6-db-3 }

<a id="db-6-db-3-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.List | DB 인스턴스 목록 보기 |

<a id="db-6-db-3-2"></a>
#### 요청

```http
GET /v1.0/db-instances
```

<a id="db-6-db-3-3"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-db-3-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbInstances | Array | DB 인스턴스 정보 |
| dbInstances.dbInstanceId | UUID | DB 인스턴스의 식별자 |
| dbInstances.dbInstanceGroupId | UUID | DB 인스턴스 그룹의 식별자 |
| dbInstances.dbInstanceName | String | DB 인스턴스를 식별할 수 있는 이름 |
| dbInstances.description | String | DB 인스턴스에 대한 추가 정보 |
| dbInstances.dbVersion | Enum | DB 엔진 버전 |
| dbInstances.dbPort | Number | DB 포트 |
| dbInstances.dbInstanceType | Enum | DB 인스턴스 역할 유형<br/>- `MASTER`: 마스터<br/>- `FAILED_MASTER`: 장애 조치된 마스터<br/>- `CANDIDATE_MASTER`: 예비 마스터<br/>- `READ_ONLY_SLAVE`: 읽기 복제본 |
| dbInstances.dbInstanceStatus | Enum | DB 인스턴스의 현재 상태 |
| dbInstances.progressStatus | Enum | DB 인스턴스의 현재 진행 상태 |
| dbInstances.createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbInstances.updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="db-6-db-4"></a>
### DB 인스턴스 생성하기 { #db-6-db-4 }

<a id="db-6-db-4-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Create | DB 인스턴스 생성하기 |

<a id="db-6-db-4-2"></a>
#### 요청

```http
POST /v1.0/db-instances
```

<a id="db-6-db-4-3"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DB 인스턴스를 식별할 수 있는 이름 |
| dbInstanceCandidateName | String | N | DB 인스턴스를 식별할 수 있는 예비 마스터 이름 |
| description | String | N | DB 인스턴스에 대한 추가 정보 |
| dbFlavorId | UUID | Y | DB 인스턴스 사양의 식별자 |
| dbVersion | Enum | Y | DB 엔진 버전 |
| dbPort | Number | Y | DB 포트<br/>- 최솟값: 5432, 최댓값: 45432 |
| databaseName | String | Y | 데이터베이스 이름 |
| dbUserName | String | Y | DB 사용자 계정명 |
| dbPassword | String | Y | DB 사용자 계정 암호 |
| parameterGroupId | UUID | Y | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Array | N | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Array | N | 사용자 그룹의 식별자 목록 |
| useHighAvailability | Boolean | N | 고가용성 사용 여부<br/>- 기본값: `false` |
| useDefaultNotification | Boolean | N | 기본 알림 사용 여부<br/>- 기본값: `false` |
| useDeletionProtection | Boolean | N | 삭제 보호 여부<br/>- 기본값: `false` |
| pingInterval | Number | N | Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| failoverReplWaitingTime | Number | N | 고가용성 사용 시 장애 조치 대기 시간<br/>- `-1`로 설정 시, 복제 지연 해소까지 계속해서 대기합니다.<br/>- 최솟값: `-1` |
| network | Object | Y | 네트워크 정보 |
| network.subnetId | UUID | Y | 서브넷의 식별자 |
| network.usePublicAccess | Boolean | N | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Enum | N | DB 인스턴스를 생성할 가용성 영역 |
| storage | Object | Y | 스토리지 정보 |
| storage.storageType | Enum | Y | 스토리지 유형 |
| storage.storageSize | Number | Y | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| backup | Object | Y | 백업 정보 |
| backup.backupPeriod | Number | Y | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.backupRetryCount | Number | N | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.periodicAutoBackupStrategyTypeCode | Enum | N | 주기적 자동 백업 전략 코드 (DAILY_FULL/SNAPSHOT)<br/>- 기본값: `DAILY_FULL`<br/>- `SNAPSHOT`: 매일 스냅숏 백업<br/>- `DAILY_FULL`: 매일 전체 백업 |
| backup.backupSchedules | Array | Y | 백업 스케쥴 정보 |
| backup.backupSchedules.backupWndBgnTime | Time | Y | 백업 시작 시간 |
| backup.backupSchedules.backupWndDuration | Enum | Y | 백업 윈도우<br/>- `HALF_AN_HOUR`: 30분<br/>- `ONE_HOUR`: 1시간<br/>- `ONE_HOUR_AND_HALF`: 1시간 30분<br/>- `TWO_HOURS`: 2시간<br/>- `TWO_HOURS_AND_HALF`: 2시간 30분<br/>- `THREE_HOURS`: 3시간 |

<a id="db-6-db-4-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-5"></a>
### DB 인스턴스 오브젝트 스토리지에 있는 백업으로 복원 { #db-6-db-5 }

<a id="db-6-db-5-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.RestoreFromObs | DB 인스턴스 오브젝트 스토리지에 있는 백업으로 복원 |

<a id="db-6-db-5-2"></a>
#### 요청

```http
POST /v1.0/db-instances/restore-from-obs
```

<a id="db-6-db-5-3"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbInstanceName | String | N | DB 인스턴스를 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| dbInstanceCandidateName | String | N | DB 인스턴스를 식별할 수 있는 예비 마스터 이름 |
| description | String | N | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbFlavorId | UUID | Y | DB 인스턴스 사양의 식별자 |
| dbPort | Number | N | DB 포트<br/>- 최솟값: 5432, 최댓값: 45432 |
| dbVersion | Enum | Y | DB 엔진 버전 |
| useHighAvailability | Boolean | N | 고가용성 사용 여부<br/>- 기본값: `false` |
| imageId | UUID | N | 이미지의 식별자 |
| pingInterval | Number | N | 고가용성 사용 시 Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| failoverReplWaitingTime | Number | N | 고가용성 사용 시 장애 조치 대기 시간<br/>- `-1`로 설정 시, 복제 지연 해소까지 계속해서 대기합니다.<br/>- 최솟값: `-1` |
| storage | Object | Y | 스토리지 정보 객체 |
| storage.storageType | Enum | Y | 스토리지 유형 |
| storage.storageSize | Number | Y | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| network | Object | Y | 네트워크 정보 객체 |
| network.subnetId | UUID | Y | 서브넷의 식별자 |
| network.usePublicAccess | Boolean | N | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Enum | N | DB 인스턴스를 생성할 가용성 영역 |
| backup | Object | Y | 백업 정보 객체 |
| backup.backupPeriod | Number | Y | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.periodicAutoBackupStrategyTypeCode | Enum | N | 주기적 자동 백업 전략 코드 (DAILY_FULL/SNAPSHOT)<br/>- 기본값: `DAILY_FULL`<br/>- `SNAPSHOT`: 매일 스냅숏 백업<br/>- `DAILY_FULL`: 매일 전체 백업 |
| backup.backupRetryCount | Number | N | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.replicationRegion | Enum | N | 백업 복제 리전<br/>- `KR1`: 한국(판교)<br/>- `KR2`: 한국(평촌) |
| backup.backupSchedules | Array | Y | 백업 스케쥴 목록 |
| backup.backupSchedules.backupWndBgnTime | Time | Y | 백업 시작 시간 |
| backup.backupSchedules.backupWndDuration | Enum | Y | 백업 윈도우<br/>- `HALF_AN_HOUR`: 30분<br/>- `ONE_HOUR`: 1시간<br/>- `ONE_HOUR_AND_HALF`: 1시간 30분<br/>- `TWO_HOURS`: 2시간<br/>- `TWO_HOURS_AND_HALF`: 2시간 30분<br/>- `THREE_HOURS`: 3시간 |
| restore | Object | Y | 복원 정보 객체 |
| restore.tenantId | String | Y | 백업이 저장된 오브젝트 스토리지의 테넌트 ID |
| restore.username | String | Y | NHN Cloud 계정 또는 IAM 계정 ID |
| restore.password | String | Y | 백업이 저장된 오브젝트 스토리지의 API 비밀번호 |
| restore.targetContainer | String | Y | 백업이 저장된 오브젝트 스토리지의 컨테이너 |
| restore.objectPath | String | Y | 컨테이너에 저장된 백업의 경로 |
| useDefaultNotification | Boolean | N | 기본 알림 사용 여부<br/>- 기본값: `false` |
| parameterGroupId | UUID | Y | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Array | N | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Array | N | 사용자 그룹의 식별자 목록 |
| useDeletionProtection | Boolean | N | 삭제 보호 여부<br/>- 기본값: `false` |

<a id="db-6-db-5-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-6"></a>
### DB 인스턴스 삭제하기 { #db-6-db-6 }

<a id="db-6-db-6-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Delete | DB 인스턴스 삭제하기 |

<a id="db-6-db-6-2"></a>
#### 요청

```http
DELETE /v1.0/db-instances/{dbInstanceId}
```

<a id="db-6-db-6-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-6-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-db-6-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-7"></a>
### DB 인스턴스 상세 보기 { #db-6-db-7 }

<a id="db-6-db-7-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DB 인스턴스 상세 보기 |

<a id="db-6-db-7-2"></a>
#### 요청

```http
GET /v1.0/db-instances/{dbInstanceId}
```

<a id="db-6-db-7-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-7-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-db-7-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbInstanceId | UUID | DB 인스턴스의 식별자 |
| dbInstanceGroupId | UUID | DB 인스턴스 그룹의 식별자 |
| dbInstanceName | String | DB 인스턴스를 식별할 수 있는 이름 |
| description | String | DB 인스턴스에 대한 추가 정보 |
| dbVersion | Enum | DB 엔진 버전 |
| dbPort | Number | DB 포트 |
| dbInstanceType | Enum | DB 인스턴스 역할 유형<br/>- `MASTER`: 마스터<br/>- `FAILED_MASTER`: 장애 조치된 마스터<br/>- `CANDIDATE_MASTER`: 예비 마스터<br/>- `READ_ONLY_SLAVE`: 읽기 복제본 |
| dbInstanceStatus | Enum | DB 인스턴스의 현재 상태 |
| progressStatus | Enum | DB 인스턴스의 현재 진행 상태 |
| dbFlavorId | UUID | DB 인스턴스 사양의 식별자 |
| parameterGroupId | UUID | DB 인스턴스에 적용된 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Array | DB 인스턴스에 적용된 DB 보안 그룹의 식별자 목록 |
| notificationGroupIds | Array | DB 인스턴스에 적용된 알림 그룹의 식별자 목록 |
| useDeletionProtection | Boolean | DB 인스턴스 삭제 보호 여부 |
| needToApplyParameterGroup | Boolean | 최신 파라미터 그룹 적용 필요 여부 |
| needMigration | Boolean | 마이그레이션 필요 여부 |
| osVersion | String | 운영체제 버전 |
| createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="db-6-db-8"></a>
### DB 인스턴스 수정하기 { #db-6-db-8 }

<a id="db-6-db-8-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DB 인스턴스 수정하기 |

<a id="db-6-db-8-2"></a>
#### 요청

```http
PUT /v1.0/db-instances/{dbInstanceId}
```

<a id="db-6-db-8-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-8-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbInstanceName | String | N | DB 인스턴스를 식별할 수 있는 이름 |
| dbInstanceCandidateName | String | N | DB 인스턴스를 식별할 수 있는 예비 마스터 이름 |
| description | String | N | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbPort | Number | N | DB 포트<br/>- 최솟값: 5432, 최댓값: 45432 |
| dbFlavorId | UUID | N | DB 인스턴스 사양의 식별자 |
| parameterGroupId | UUID | N | 파라미터 그룹의 식별자 |
| dbVersion | Enum | N | DB 엔진 버전 |
| dbSecurityGroupIds | Array | N | DB 보안 그룹의 식별자 목록 |
| executeBackup | Boolean | N | 현재 시점 백업 수행 여부<br/>- 기본값: `false` |
| useOnlineFailover | Boolean | N | 장애 조치를 이용한 재시작 여부<br/>- 기본값: `false` |
| waitReplicationDelay | Boolean | N | 복제 지연 해소 대기<br/>- 기본값: `false` |
| useReadOnly | Boolean | N | 쓰기 부하 차단<br/>- 기본값: `false` |

<a id="db-6-db-8-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-9"></a>
### DB 인스턴스 최신 파라미터 그룹 적용하기 { #db-6-db-9 }

<a id="db-6-db-9-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DB 인스턴스 최신 파라미터 그룹 적용하기 |

<a id="db-6-db-9-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/apply-recent-parameter-group
```

<a id="db-6-db-9-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-9-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-db-9-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="dbdb"></a>
### 현 DB 인스턴스에서 선택 가능한 DB 엔진 버전 조회 { #dbdb }

<a id="dbdb-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | 현 DB 인스턴스에서 선택 가능한 DB 엔진 버전 조회 |

<a id="dbdb-2"></a>
#### 요청

```http
GET /v1.0/db-instances/{dbInstanceId}/available-db-versions
```

<a id="dbdb-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="dbdb-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="dbdb-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| availableDbVersions | Array | DB 버전 정보 |
| availableDbVersions.dbVersion | Enum | DB 엔진 버전 |
| availableDbVersions.dbVersionName | String | DB 엔진 버전명 |
| availableDbVersions.restorableFromObs | Boolean | 오브젝트 스토리지에서 복원 가능 여부 |

---

<a id="db-6-db-10"></a>
### DB 인스턴스 백업하기 { #db-6-db-10 }

<a id="db-6-db-10-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Backup | DB 인스턴스 백업하기 |

<a id="db-6-db-10-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/backup
```

<a id="db-6-db-10-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-10-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "backupName": "backupName-example",
    "backupMethodType": "FULL"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| backupName | String | Y | 백업을 식별할 수 있는 이름 |
| backupMethodType | Enum | N | 백업 방식<br/>- `FULL`<br/>- `SNAPSHOT` |

<a id="db-6-db-10-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-11"></a>
### DB 인스턴스 백업 정보 조회 { #db-6-db-11 }

<a id="db-6-db-11-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DB 인스턴스 백업 정보 조회 |

<a id="db-6-db-11-2"></a>
#### 요청

```http
GET /v1.0/db-instances/{dbInstanceId}/backup-info
```

<a id="db-6-db-11-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-11-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-db-11-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| allowAutoBackup | Boolean | 자동 백업 허용 여부 |
| usePeriodicAutoBackup | Boolean | 예정된 자동 백업 사용 여부 |
| periodicAutoBackupStrategyTypeCode | Enum | 주기적 자동 백업 전략 코드 (DAILY_FULL/SNAPSHOT)<br/>- `SNAPSHOT`: 매일 스냅숏 백업<br/>- `DAILY_FULL`: 매일 전체 백업 |
| backupPeriod | Number | 백업 보관 기간(일) |
| backupRetryCount | Number | 백업 재시도 횟수 |
| backupSchedules | Array | 백업 스케쥴 목록 |
| backupSchedules.backupWndBgnTime | Time | 백업 시작 시간 |
| backupSchedules.backupWndDuration | Enum | 백업 윈도우<br/>- `HALF_AN_HOUR`: 30분<br/>- `ONE_HOUR`: 1시간<br/>- `ONE_HOUR_AND_HALF`: 1시간 30분<br/>- `TWO_HOURS`: 2시간<br/>- `TWO_HOURS_AND_HALF`: 2시간 30분<br/>- `THREE_HOURS`: 3시간 |

---

<a id="db-6-db-12"></a>
### DB 인스턴스 백업 정보 수정하기 { #db-6-db-12 }

<a id="db-6-db-12-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DB 인스턴스 백업 정보 수정하기 |

<a id="db-6-db-12-2"></a>
#### 요청

```http
PUT /v1.0/db-instances/{dbInstanceId}/backup-info
```

<a id="db-6-db-12-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-12-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| allowAutoBackup | Boolean | N | 자동 백업 허용 여부 |
| usePeriodicAutoBackup | Boolean | N | 예정된 자동 백업 사용 여부 |
| periodicAutoBackupStrategyTypeCode | Enum | N | 주기적 자동 백업 전략 코드 (DAILY_FULL/SNAPSHOT)<br/>- `SNAPSHOT`: 매일 스냅숏 백업<br/>- `DAILY_FULL`: 매일 전체 백업 |
| backupPeriod | Number | N | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backupRetryCount | Number | N | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backupSchedules | Array | N | 백업 스케쥴 목록 |
| backupSchedules.backupWndBgnTime | Time | Y | 백업 시작 시간 |
| backupSchedules.backupWndDuration | Enum | Y | 백업 윈도우<br/>- `HALF_AN_HOUR`: 30분<br/>- `ONE_HOUR`: 1시간<br/>- `ONE_HOUR_AND_HALF`: 1시간 30분<br/>- `TWO_HOURS`: 2시간<br/>- `TWO_HOURS_AND_HALF`: 2시간 30분<br/>- `THREE_HOURS`: 3시간 |

<a id="db-6-db-12-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-13"></a>
### DB 인스턴스 오브젝트 스토리지로 백업 { #db-6-db-13 }

<a id="db-6-db-13-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.BackupToObjectStorage | DB 인스턴스 오브젝트 스토리지로 백업 |

<a id="db-6-db-13-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/backup-to-object-storage
```

<a id="db-6-db-13-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-13-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| tenantId | String | Y | 백업이 저장될 오브젝트 스토리지의 테넌트 ID<br/>- 최소 길이: `32`<br/>- 최대 길이: `32` |
| username | String | Y | NHN Cloud 계정 또는 IAM 계정 ID |
| password | String | Y | 백업이 저장될 오브젝트 스토리지의 API 비밀번호 |
| targetContainer | String | Y | 백업이 저장될 오브젝트 스토리지의 컨테이너 |
| objectPath | String | Y | 컨테이너에 저장될 백업의 경로 |

<a id="db-6-db-13-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-1"></a>
### 데이터베이스 목록 보기 { #db-6-1 }

<a id="db-6-1-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.List | 데이터베이스 목록 보기 |

<a id="db-6-1-2"></a>
#### 요청

```http
GET /v1.0/db-instances/{dbInstanceId}/databases
```

<a id="db-6-1-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-1-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-1-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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
            ]
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| databases | Array | 데이터베이스 정보 |
| databases.databaseId | UUID | 데이터베이스의 식별자 |
| databases.databaseName | String | 데이터베이스 이름 |
| databases.databaseStatus | Enum | 데이터베이스의 현재 상태<br/>- `STABLE`: 사용 가능<br/>- `CREATING`: 생성 중<br/>- `MODIFYING`: 수정 중<br/>- `DELETING`: 삭제 중<br/>- `DELETED`: 삭제됨<br/>- `SYNCING`: 동기화 중<br/>- `DELETE_ERROR`: 삭제 실패 |
| databases.errorReason | String | 삭제 실패 원인 |
| databases.createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| databases.updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| databases.schemas | Array | 스키마 정보 |
| databases.schemas.schemaName | String | 스키마 이름 |

---

<a id="db-6-2"></a>
### 데이터베이스 생성하기 { #db-6-2 }

<a id="db-6-2-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Create | 데이터베이스 생성하기 |

<a id="db-6-2-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/databases
```

<a id="db-6-2-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-2-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "databaseName": "database-1"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| databaseName | String | Y | 데이터베이스 이름 |

<a id="db-6-2-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-3"></a>
### 데이터베이스 삭제하기 { #db-6-3 }

<a id="db-6-3-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Delete | 데이터베이스 삭제하기 |

<a id="db-6-3-2"></a>
#### 요청

```http
DELETE /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

<a id="db-6-3-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |
| databaseId | URL | UUID | Y | 데이터베이스의 식별자 |

<a id="db-6-3-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-3-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-4"></a>
### 데이터베이스 수정하기 { #db-6-4 }

<a id="db-6-4-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceDatabase.Modify | 데이터베이스 수정하기 |

<a id="db-6-4-2"></a>
#### 요청

```http
PUT /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

<a id="db-6-4-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |
| databaseId | URL | UUID | Y | 데이터베이스의 식별자 |

<a id="db-6-4-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "applyHbaRulesImmediately": false,
    "databaseName": "database-1"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| applyHbaRulesImmediately | Boolean | N | 연관된 접근 제어 규칙 즉시 적용 여부<br/>- 기본값: `false` |
| databaseName | String | Y | 데이터베이스 이름 |

<a id="db-6-4-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-5"></a>
### 사용자 목록 보기 { #db-6-5 }

<a id="db-6-5-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.List | 사용자 목록 보기 |

<a id="db-6-5-2"></a>
#### 요청

```http
GET /v1.0/db-instances/{dbInstanceId}/db-users
```

<a id="db-6-5-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-5-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-5-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbUsers | Array | DB 사용자 목록 |
| dbUsers.dbUserId | UUID | DB 사용자의 식별자 |
| dbUsers.dbUserName | String | DB 사용자 계정 이름 |
| dbUsers.authorityType | Enum | DB 사용자 권한 유형<br/>- `CUSTOM`: 사용자 정의 권한<br/>- `READ`: READ 권한 (읽기 전용 권한)<br/>- `CRUD`: CRUD 권한 (읽기 권한 포함)<br/>- `DDL`: DDL 권한 (CRUD 권한 포함) |
| dbUsers.dbUserStatus | Enum | DB 사용자의 현재 상태<br/>- `STABLE`: 사용 가능<br/>- `CREATING`: 생성 중<br/>- `MODIFYING`: 수정 중<br/>- `DELETING`: 삭제 중<br/>- `DELETED`: 삭제됨<br/>- `SYNCING`: 동기화 중<br/>- `DELETE_ERROR`: 삭제 실패 |
| dbUsers.createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbUsers.updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="db-6-6"></a>
### 사용자 생성하기 { #db-6-6 }

<a id="db-6-6-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Create | 사용자 생성하기 |

<a id="db-6-6-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/db-users
```

<a id="db-6-6-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-6-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbUserName | String | Y | DB 사용자 계정 이름 |
| dbPassword | String | Y | DB 사용자 계정 암호 |
| authorityType | Enum | Y | DB 사용자 권한 유형<br/>- `CUSTOM`: 사용자 정의 권한<br/>- `READ`: 읽기 권한<br/>- `CRUD`: CRUD 권한<br/>- `DDL`: DDL 권한 |
| createDefaultHbaRules | Boolean | N | 기본 접근 제어 규칙 생성 여부<br/>- 기본값: `false` |
| address | String | N | 접속 주소 |

<a id="db-6-6-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-7"></a>
### 사용자 삭제하기 { #db-6-7 }

<a id="db-6-7-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Delete | 사용자 삭제하기 |

<a id="db-6-7-2"></a>
#### 요청

```http
DELETE /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

<a id="db-6-7-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |
| dbUserId | URL | UUID | Y | 사용자의 식별자 |

<a id="db-6-7-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-7-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-8"></a>
### 사용자 수정하기 { #db-6-8 }

<a id="db-6-8-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceUser.Modify | 사용자 수정하기 |

<a id="db-6-8-2"></a>
#### 요청

```http
PUT /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

<a id="db-6-8-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |
| dbUserId | URL | UUID | Y | 사용자의 식별자 |

<a id="db-6-8-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "dbUserName": "dbUserName-example",
    "dbPassword": "dbPassword-example",
    "authorityType": "CUSTOM",
    "applyHbaRulesImmediately": false
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbUserName | String | N | DB 사용자 계정 이름 |
| dbPassword | String | N | DB 사용자 계정 암호 |
| authorityType | Enum | N | DB 사용자 권한<br/>- `CUSTOM`: 사용자 정의 권한<br/>- `READ`: 읽기 권한<br/>- `CRUD`: CRUD 권한<br/>- `DDL`: DDL 권한 |
| applyHbaRulesImmediately | Boolean | N | 접근 제어 변경 사항 즉시 적용 여부<br/>- 기본값: `false` |

<a id="db-6-8-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-14"></a>
### DB 인스턴스 삭제 보호 설정 변경하기 { #db-6-db-14 }

<a id="db-6-db-14-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DB 인스턴스 삭제 보호 설정 변경하기 |

<a id="db-6-db-14-2"></a>
#### 요청

```http
PUT /v1.0/db-instances/{dbInstanceId}/deletion-protection
```

<a id="db-6-db-14-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-14-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "useDeletionProtection": false
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| useDeletionProtection | Boolean | Y | 삭제 보호 여부 |

<a id="db-6-db-14-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="db-6-db-15"></a>
### DB 인스턴스 강제 재시작하기 { #db-6-db-15 }

<a id="db-6-db-15-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.ForceRestart | DB 인스턴스 강제 재시작하기 |

<a id="db-6-db-15-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/force-restart
```

<a id="db-6-db-15-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-15-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-db-15-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="db-6-9"></a>
### 접근 제어 규칙 목록 보기 { #db-6-9 }

<a id="db-6-9-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.List | 접근 제어 규칙 목록 보기 |

<a id="db-6-9-2"></a>
#### 요청

```http
GET /v1.0/db-instances/{dbInstanceId}/hba-rules
```

<a id="db-6-9-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-9-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-9-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| hbaRules | Array | 접근 제어 규칙 정보 |
| hbaRules.hbaRuleId | UUID | 접근 제어 규칙의 식별자 |
| hbaRules.hbaRuleStatus | Enum | 접근 제어 규칙의 현재 상태<br/>- `CREATED`: 생성됨<br/>- `APPLIED`: 적용됨<br/>- `CREATING`: 생성 중<br/>- `MODIFYING`: 수정 중<br/>- `DELETING`: 삭제 중<br/>- `DELETED`: 삭제됨 |
| hbaRules.databaseApplyType | Enum | 데이터베이스 규칙 적용 방식<br/>- `ENTIRE`: 전체<br/>- `USER_CUSTOM`: 사용자 지정 |
| hbaRules.dbUserApplyTypeCode | Enum | DB 사용자 규칙 적용 방식<br/>- `ENTIRE`: 전체<br/>- `USER_CUSTOM`: 사용자 지정 |
| hbaRules.databases | Array | 사용자 지정 데이터베이스 목록 |
| hbaRules.databases.databaseId | UUID | 사용자 지정 데이터베이스의 식별자 |
| hbaRules.databases.databaseName | String | 사용자 지정 데이터베이스 이름 |
| hbaRules.dbUsers | Array | 사용자 지정 DB 사용자 목록 |
| hbaRules.dbUsers.dbUserId | UUID | 사용자 지정 DB 사용자의 식별자 |
| hbaRules.dbUsers.dbUserName | String | 사용자 지정 DB 사용자 계정 이름 |
| hbaRules.address | String | 접속 주소<br/>- CIDR 형식, 호스트명 또는 도메인 형식으로 입력 |
| hbaRules.authMethod | Enum | 인증 방식<br/>- `TRUST`: 트러스트(패스워드 불필요)<br/>- `REJECT`: 접속 차단<br/>- `SCRAM_SHA_256`: 패스워드(SCRAM-SHA-256) |
| hbaRules.reservedAction | Enum | 예약 작업<br/>- `NONE`: 없음<br/>- `CREATE`: 생성 예약(적용 필요)<br/>- `MODIFY`: 수정 예약(적용 필요)<br/>- `DELETE`: 삭제 예약(적용 필요) |
| hbaRules.order | Number | 적용 순서 |
| hbaRules.applicable | Boolean | 적용 가능 여부<br/>- 적용 불가 상태의 규칙은 무시됨 |
| needToApply | Boolean | 변경 사항 적용 필요 여부 |

---

<a id="db-6-10"></a>
### 접근 제어 규칙 추가하기 { #db-6-10 }

<a id="db-6-10-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Create | 접근 제어 규칙 추가하기 |

<a id="db-6-10-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules
```

<a id="db-6-10-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-10-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| connectionTypeCode | Enum | N | 접근 제어 레코드 유형<br/>- `HOST`: TCP/IP로 접속 시 유효<br/>- `HOST_NO_SSL`: SSL 암호화를 사용하지 않는 접속 시에만 유효 |
| databaseApplyType | Enum | Y | 데이터베이스 규칙 적용 방식<br/>- `ENTIRE`: 전체<br/>- `USER_CUSTOM`: 사용자 지정 |
| dbUserApplyType | Enum | Y | DB 사용자 규칙 적용 방식<br/>- `ENTIRE`: 전체<br/>- `USER_CUSTOM`: 사용자 지정 |
| databaseIds | Array | N | 사용자 지정 데이터베이스의 식별자 목록 |
| dbUserIds | Array | N | 사용자 지정 DB 사용자의 식별자 목록 |
| address | String | Y | 접속 주소<br/>- CIDR 형식, 호스트명 또는 도메인 형식으로 입력 |
| authMethod | Enum | Y | 인증 방식<br/>- `TRUST`: 트러스트(패스워드 불필요)<br/>- `REJECT`: 접속 차단<br/>- `SCRAM_SHA_256`: 패스워드(SCRAM-SHA-256) |

<a id="db-6-10-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| hbaRuleId | UUID | 접근 제어 규칙의 식별자 |

---

<a id="db-6-11"></a>
### 접근 제어 규칙 적용하기 { #db-6-11 }

<a id="db-6-11-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | 접근 제어 규칙 적용하기 |

<a id="db-6-11-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules/apply
```

<a id="db-6-11-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-11-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-11-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-12"></a>
### 접근 제어 규칙 순서 조정 { #db-6-12 }

<a id="db-6-12-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Modify | 접근 제어 규칙 순서 조정 |

<a id="db-6-12-2"></a>
#### 요청

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/orders
```

<a id="db-6-12-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-12-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "hbaRuleIds": []
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| hbaRuleIds | Array | Y | 정렬된 접속제어 규칙 ID 리스트 (요청받은 순서대로 저장) |

<a id="db-6-12-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="db-6-13"></a>
### 접근 제어 설정 삭제하기 { #db-6-13 }

<a id="db-6-13-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Delete | 접근 제어 설정 삭제하기 |

<a id="db-6-13-2"></a>
#### 요청

```http
DELETE /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

<a id="db-6-13-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |
| hbaRuleId | URL | UUID | Y | 접근 제어 규칙의 식별자 |

<a id="db-6-13-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-13-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="db-6-14"></a>
### 접근 제어 규칙 수정하기 { #db-6-14 }

<a id="db-6-14-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstanceHba.Modify | 접근 제어 규칙 수정하기 |

<a id="db-6-14-2"></a>
#### 요청

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

<a id="db-6-14-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |
| hbaRuleId | URL | UUID | Y | 접근 제어 규칙의 식별자 |

<a id="db-6-14-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| connectionTypeCode | Enum | N | 접근 제어 레코드 유형<br/>- `HOST`: TCP/IP로 접속 시 유효<br/>- `HOST_NO_SSL`: SSL 암호화를 사용하지 않는 접속 시에만 유효 |
| databaseApplyType | Enum | Y | 데이터베이스 규칙 적용 방식<br/>- `ENTIRE`: 전체<br/>- `USER_CUSTOM`: 사용자 지정 |
| dbUserApplyType | Enum | Y | DB 사용자 규칙 적용 방식<br/>- `ENTIRE`: 전체<br/>- `USER_CUSTOM`: 사용자 지정 |
| databaseIds | Array | N | 사용자 지정 데이터베이스의 식별자 목록 |
| dbUserIds | Array | N | 사용자 지정 DB 사용자의 식별자 목록 |
| address | String | Y | 접속 주소<br/>- CIDR 형식, 호스트명 또는 도메인 형식으로 입력 |
| authMethod | Enum | Y | 인증 방식<br/>- `TRUST`: 트러스트(패스워드 불필요)<br/>- `REJECT`: 접속 차단<br/>- `SCRAM_SHA_256`: 패스워드(SCRAM-SHA-256) |

<a id="db-6-14-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="db-6-15"></a>
### 고가용성 정보 조회 { #db-6-15 }

<a id="db-6-15-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Get | 고가용성 정보 조회 |

<a id="db-6-15-2"></a>
#### 요청

```http
GET /v1.0/db-instances/{dbInstanceId}/high-availability
```

<a id="db-6-15-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-15-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-15-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| haStatus | Enum | 고가용성 상태<br/>- `CREATED`: 생성됨<br/>- `STABLE`: 정상<br/>- `PAUSING`: 일시 중지 중<br/>- `PAUSED`: 일시 중지<br/>- `PAUSED_DUE_TO_TASK`: 작업으로 인한 일시 중지<br/>- `DISABLE_REPLICATION_DELAY`: 복제 지연으로 인한 장애 조치 정지<br/>- `FAILOVER_STARTED`: 장애 조치 시작<br/>- `FAILOVER_FAILED`: 장애 조치 실패<br/>- `FAILOVER_COMPLETED`: 장애 조치 완료<br/>- `DELETED`: 삭제됨 |
| pingInterval | Number | Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| failoverReplWaitingTime | Number | 고가용성 사용 시 장애 조치 대기 시간<br/>- `-1`로 설정 시, 복제 지연 해소까지 계속해서 대기합니다.<br/>- 최솟값: `-1` |

---

<a id="db-6-16"></a>
### 고가용성 수정하기 { #db-6-16 }

<a id="db-6-16-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Modify | 고가용성 수정하기 |

<a id="db-6-16-2"></a>
#### 요청

```http
PUT /v1.0/db-instances/{dbInstanceId}/high-availability
```

<a id="db-6-16-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-16-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "useHighAvailability": false,
    "pingInterval": 1,
    "failoverReplWaitingTime": 1
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| useHighAvailability | Boolean | Y | 고가용성 사용 여부 |
| pingInterval | Number | N | Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| failoverReplWaitingTime | Number | N | 고가용성 사용 시 장애 조치 대기 시간<br/>- `-1`로 설정 시, 복제 지연 해소까지 계속해서 대기합니다.<br/>- 최솟값: `-1` |

<a id="db-6-16-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-17"></a>
### 고가용성 일시 중지하기 { #db-6-17 }

<a id="db-6-17-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Pause | 고가용성 일시 중지하기 |

<a id="db-6-17-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/pause
```

<a id="db-6-17-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-17-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-17-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-18"></a>
### 고가용성 복구하기 { #db-6-18 }

<a id="db-6-18-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Repair | 고가용성 복구하기 |

<a id="db-6-18-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/repair
```

<a id="db-6-18-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-18-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-18-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-19"></a>
### 고가용성 다시 시작하기 { #db-6-19 }

<a id="db-6-19-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Resume | 고가용성 다시 시작하기 |

<a id="db-6-19-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/resume
```

<a id="db-6-19-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-19-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-19-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-20"></a>
### 고가용성 분리하기 { #db-6-20 }

<a id="db-6-20-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:HighAvailability.Split | 고가용성 분리하기 |

<a id="db-6-20-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/split
```

<a id="db-6-20-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-20-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-20-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-16"></a>
### DB 인스턴스 유지 보수 정보 조회 { #db-6-db-16 }

<a id="db-6-db-16-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DB 인스턴스 유지 보수 정보 조회 |

<a id="db-6-db-16-2"></a>
#### 요청

```http
GET /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

<a id="db-6-db-16-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-16-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-db-16-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| allowAutoMaintenance | Boolean | 자동 유지 보수 허용 여부 |
| useAutoStorageCleanup | Boolean | 자동 스토리지 정리 사용 여부 |
| maintWndBgnTime | Time | 자동 유지 보수 시작 시간 |
| maintWndDuration | Enum | 유지 보수 윈도우<br/>- `HALF_AN_HOUR`: 30분<br/>- `ONE_HOUR`: 1시간<br/>- `ONE_HOUR_AND_HALF`: 1시간 30분<br/>- `TWO_HOURS`: 2시간<br/>- `TWO_HOURS_AND_HALF`: 2시간 30분<br/>- `THREE_HOURS`: 3시간 |
| logRetentionPeriod | Number | 로그 보관 기간 (일) |

---

<a id="db-6-db-17"></a>
### DB 인스턴스 유지 보수 정보 수정하기 { #db-6-db-17 }

<a id="db-6-db-17-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DB 인스턴스 유지 보수 정보 수정하기 |

<a id="db-6-db-17-2"></a>
#### 요청

```http
PUT /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

<a id="db-6-db-17-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-17-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| allowAutoMaintenance | Boolean | N | 자동 유지 보수 허용 여부 |
| useAutoStorageCleanup | Boolean | N | 자동 스토리지 정리 사용 여부 |
| maintWndBgnTime | Time | N | 자동 유지 보수 시작 시간 |
| maintWndDuration | Enum | N | 유지 보수 윈도우<br/>- `HALF_AN_HOUR`: 30분<br/>- `ONE_HOUR`: 1시간<br/>- `ONE_HOUR_AND_HALF`: 1시간 30분<br/>- `TWO_HOURS`: 2시간<br/>- `TWO_HOURS_AND_HALF`: 2시간 30분<br/>- `THREE_HOURS`: 3시간 |
| logRetentionPeriod | Number | N | 로그 보관 기간 (일)<br/>- 최솟값: `1`<br/>- 최댓값: `30` |

<a id="db-6-db-17-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-18"></a>
### DB 인스턴스 네트워크 정보 조회 { #db-6-db-18 }

<a id="db-6-db-18-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DB 인스턴스 네트워크 정보 조회 |

<a id="db-6-db-18-2"></a>
#### 요청

```http
GET /v1.0/db-instances/{dbInstanceId}/network-info
```

<a id="db-6-db-18-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-18-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-db-18-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| availabilityZone | Enum | DB 인스턴스를 생성할 가용성 영역 |
| subnet | Object | 서브넷 정보 |
| subnet.subnetId | UUID | 서브넷의 식별자 |
| subnet.subnetName | String | 서브넷을 식별할 수 있는 이름 |
| subnet.subnetCidr | String | 서브넷의 CIDR |
| subnet.publicAccessible | Boolean | 퍼블릭 접근 가능 여부 |
| endPoints | Array | 접속 정보 |
| endPoints.domain | String | 도메인 |
| endPoints.ipAddress | String | IP 주소 |
| endPoints.endPointType | Enum | 접속 정보 유형<br/>- `EXTERNAL`: 외부 접속 도메인<br/>- `INTERNAL`: 내부 접속 도메인<br/>- `PUBLIC`: (Deprecated) 외부 접속 도메인<br/>- `PRIVATE`: (Deprecated) 내부 접속 도메인 |

---

<a id="db-6-db-19"></a>
### DB 인스턴스 네트워크 정보 수정하기 { #db-6-db-19 }

<a id="db-6-db-19-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DB 인스턴스 네트워크 정보 수정하기 |

<a id="db-6-db-19-2"></a>
#### 요청

```http
PUT /v1.0/db-instances/{dbInstanceId}/network-info
```

<a id="db-6-db-19-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-19-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "usePublicAccess": false
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| usePublicAccess | Boolean | Y | 외부 접속 가능 여부 |

<a id="db-6-db-19-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-20"></a>
### DB 인스턴스 승격하기 { #db-6-db-20 }

<a id="db-6-db-20-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Promote | DB 인스턴스 승격하기 |

<a id="db-6-db-20-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/promote
```

<a id="db-6-db-20-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-20-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-db-20-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-21"></a>
### 읽기 복제본 생성 { #db-6-21 }

<a id="db-6-21-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Replicate | 읽기 복제본 생성 |

<a id="db-6-21-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/replicate
```

<a id="db-6-21-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-21-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DB 인스턴스를 식별할 수 있는 이름 |
| description | String | N | DB 인스턴스에 대한 추가 정보 |
| dbFlavorId | UUID | N | DB 인스턴스 사양의 식별자 |
| dbPort | Number | N | DB 포트<br/>- 최솟값: 5432, 최댓값: 45432 |
| parameterGroupId | UUID | N | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Array | N | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Array | N | 사용자 그룹의 식별자 목록 |
| useDefaultNotification | Boolean | N | 기본 알림 사용 여부<br/>- 기본값: `false` |
| useDeletionProtection | Boolean | N | 삭제 보호 여부<br/>- 기본값: `false` |
| network | Object | N | 네트워크 정보 객체 |
| network.usePublicAccess | Boolean | N | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Enum | N | DB 인스턴스를 생성할 가용성 영역 |
| storage | Object | N | 스토리지 정보 객체 |
| storage.storageType | Enum | N | 데이터 스토리지 유형 |
| storage.storageSize | Number | N | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20`<br/>- 최댓값: `2048` |

<a id="db-6-21-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-21"></a>
### DB 인스턴스 재시작하기 { #db-6-db-21 }

<a id="db-6-db-21-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Restart | DB 인스턴스 재시작하기 |

<a id="db-6-db-21-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/restart
```

<a id="db-6-db-21-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-21-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-db-21-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-22"></a>
### DB 인스턴스 복원 정보 조회 { #db-6-db-22 }

<a id="db-6-db-22-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DB 인스턴스 복원 정보 조회 |

<a id="db-6-db-22-2"></a>
#### 요청

```http
GET /v1.0/db-instances/{dbInstanceId}/restoration-info
```

<a id="db-6-db-22-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-22-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-db-22-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| oldestRestorableYmdt | DateTime | 복원 가능한 가장 이른 시간 |
| latestRestorableYmdt | DateTime | 복원 가능한 가장 최근 시간 |
| restorableBackups | Array | 복원 가능한 백업 목록 |
| restorableBackups.backupId | UUID | 백업의 식별자 |
| restorableBackups.backupName | String | 백업 이름 |
| restorableBackups.backupStatus | Enum | 백업 상태<br/>- `BACKING_UP`: 백업 중인 경우<br/>- `COMPLETED`: 백업이 완료된 경우<br/>- `DELETING`: 백업이 삭제 중인 경우<br/>- `DELETED`: 백업이 삭제된 경우<br/>- `ERROR`: 오류가 발생한 경우 |
| restorableBackups.dbInstanceId | UUID | 원본 DB 인스턴스의 식별자 |
| restorableBackups.dbInstanceName | String | 원본 DB 인스턴스의 이름 |
| restorableBackups.dbVersion | Enum | DB 엔진 버전 |
| restorableBackups.backupType | Enum | 백업 유형<br/>- `AUTO`: 자동 백업<br/>- `MANUAL`: 수동 백업 |
| restorableBackups.backupSize | Number | 백업 크기<br/>- 단위: `바이트` |
| restorableBackups.failoverCount | Number | 장애 조치 횟수 |
| restorableBackups.walFileName | String | WAL 로그 파일 이름 |
| restorableBackups.createdYmdt | DateTime | 백업 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| restorableBackups.updatedYmdt | DateTime | 백업 갱신 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| restorableBackups.startYmdt | DateTime | 백업 시작 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| restorableBackups.completedYmdt | DateTime | 백업 완료 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="db-6-db-23"></a>
### DB 인스턴스 복원하기 { #db-6-db-23 }

<a id="db-6-db-23-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Restore | DB 인스턴스 복원하기 |

<a id="db-6-db-23-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/restore
```

<a id="db-6-db-23-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-23-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbInstanceName | String | N | DB 인스턴스를 식별할 수 있는 이름 |
| dbInstanceCandidateName | String | N | DB 인스턴스를 식별할 수 있는 예비 마스터 이름 |
| description | String | N | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbFlavorId | UUID | Y | DB 인스턴스 사양의 식별자 |
| dbPort | Number | N | DB 포트<br/>- 최솟값: 5432, 최댓값: 45432 |
| useHighAvailability | Boolean | N | 고가용성 사용 여부<br/>- 기본값: `false` |
| imageId | UUID | N | 이미지의 식별자 |
| pingInterval | Number | N | 고가용성 사용 시 Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| failoverReplWaitingTime | Number | N | 고가용성 사용 시 장애 조치 대기 시간<br/>- `-1`로 설정 시, 복제 지연 해소까지 계속해서 대기합니다.<br/>- 최솟값: `-1` |
| storage | Object | Y | 스토리지 정보 객체 |
| storage.storageType | Enum | Y | 스토리지 유형 |
| storage.storageSize | Number | Y | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| network | Object | Y | 네트워크 정보 객체 |
| network.subnetId | UUID | Y | 서브넷의 식별자 |
| network.usePublicAccess | Boolean | N | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Enum | N | DB 인스턴스를 생성할 가용성 영역 |
| backup | Object | Y | 백업 정보 객체 |
| backup.backupPeriod | Number | Y | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.periodicAutoBackupStrategyTypeCode | Enum | N | 주기적 자동 백업 전략 코드 (DAILY_FULL/SNAPSHOT)<br/>- 기본값: `DAILY_FULL`<br/>- `SNAPSHOT`: 매일 스냅숏 백업<br/>- `DAILY_FULL`: 매일 전체 백업 |
| backup.backupRetryCount | Number | N | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.replicationRegion | Enum | N | 백업 복제 리전<br/>- `KR1`: 한국(판교)<br/>- `KR2`: 한국(평촌) |
| backup.backupSchedules | Array | Y | 백업 스케쥴 목록 |
| backup.backupSchedules.backupWndBgnTime | Time | Y | 백업 시작 시간 |
| backup.backupSchedules.backupWndDuration | Enum | Y | 백업 윈도우<br/>- `HALF_AN_HOUR`: 30분<br/>- `ONE_HOUR`: 1시간<br/>- `ONE_HOUR_AND_HALF`: 1시간 30분<br/>- `TWO_HOURS`: 2시간<br/>- `TWO_HOURS_AND_HALF`: 2시간 30분<br/>- `THREE_HOURS`: 3시간 |
| restore | Object | Y | 복원 정보 객체 |
| restore.restoreType | Enum | Y | 복원 유형<br/>- `BACKUP`: 기존에 생성한 백업을 이용한 복원<br/>- `TIMESTAMP`: 복원 가능한 시간 이내의 시간을 이용한 시점 복원 |
| useDefaultNotification | Boolean | N | 기본 알림 사용 여부<br/>- 기본값: `false` |
| parameterGroupId | UUID | Y | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Array | N | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Array | N | 사용자 그룹의 식별자 목록 |
| useDeletionProtection | Boolean | N | 삭제 보호 여부<br/>- 기본값: `false` |

<a id="db-6-db-23-timestamprestoretype-timestamp"></a>
#### Timestamp를 이용한 시점 복원 시 요청(restoreType이 `TIMESTAMP`인 경우)

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| restore.restoreYmdt | DateTime | Y | DB 인스턴스 복원 시간(YYYY-MM-DDThh:mm:ss.SSSTZD)<br/>- 복원 정보 조회로 조회한 가장 최신의 복원 가능한 시간 이전에 대해서만 복원이 가능하다. |

<a id="db-6-db-23-restoretype-backup"></a>
#### 백업을 이용한 복원 시 요청(restoreType이 `BACKUP`인 경우)

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| restore.backupId | UUID | Y | 복원에 사용할 백업의 식별자 |

<a id="db-6-db-23-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-24"></a>
### DB 인스턴스 시작하기 { #db-6-db-24 }

<a id="db-6-db-24-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Start | DB 인스턴스 시작하기 |

<a id="db-6-db-24-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/start
```

<a id="db-6-db-24-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-24-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-db-24-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-25"></a>
### DB 인스턴스 정지하기 { #db-6-db-25 }

<a id="db-6-db-25-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Stop | DB 인스턴스 정지하기 |

<a id="db-6-db-25-2"></a>
#### 요청

```http
POST /v1.0/db-instances/{dbInstanceId}/stop
```

<a id="db-6-db-25-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-25-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-db-25-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-6-db-26"></a>
### DB 인스턴스 스토리지 정보 조회 { #db-6-db-26 }

<a id="db-6-db-26-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Get | DB 인스턴스 스토리지 정보 조회 |

<a id="db-6-db-26-2"></a>
#### 요청

```http
GET /v1.0/db-instances/{dbInstanceId}/storage-info
```

<a id="db-6-db-26-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-26-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-6-db-26-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| storageType | Enum | 데이터 스토리지 유형 |
| storageSize | Number | 데이터 스토리지 크기(GB) |
| storageStatus | Enum | 데이터 스토리지의 현재 상태<br/>- `DELETED`: 삭제됨<br/>- `PENDING_DELETION`: 삭제 유예됨<br/>- `DELETION_RESERVED`: 삭제 예약됨 (스냅샷 정리 대기)<br/>- `DETACHED`: 해제됨<br/>- `ATTACHED`: 할당됨 |

---

<a id="db-6-db-27"></a>
### DB 인스턴스 스토리지 정보 수정하기 { #db-6-db-27 }

<a id="db-6-db-27-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbInstance.Modify | DB 인스턴스 스토리지 정보 수정하기 |

<a id="db-6-db-27-2"></a>
#### 요청

```http
PUT /v1.0/db-instances/{dbInstanceId}/storage-info
```

<a id="db-6-db-27-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB 인스턴스의 식별자 |

<a id="db-6-db-27-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "storageSize": 1
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| storageSize | Number | Y | 데이터 스토리지 크기(GB)<br/>- 최댓값: `2048` |

<a id="db-6-db-27-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="section-5"></a>
## 백업 { #section-5 }

<a id="section-5-1"></a>
### 백업 상태 { #section-5-1 }

| 상태           | 설명           |
|--------------|--------------|
| `BACKING_UP` | 백업 중인 경우     |
| `COMPLETED`  | 백업이 완료된 경우   |
| `DELETING`   | 백업이 삭제 중인 경우 |
| `DELETED`    | 백업이 삭제된 경우   |
| `ERROR`      | 오류가 발생한 경우   |

<a id="section-5-2"></a>
### 백업 목록 보기 { #section-5-2 }

<a id="section-5-2-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:Backup.List | 백업 목록 보기 |

<a id="section-5-2-2"></a>
#### 요청

```http
GET /v1.0/backups
```

<a id="section-5-2-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| page | Query | Number | Y | 조회할 목록의 페이지<br/>- 최솟값: `1` |
| size | Query | Number | Y | 조회할 목록의 페이지 크기<br/>- 최솟값: `1`<br/>- 최댓값: `100` |
| backupType | Query | Enum | N | 백업 유형<br/>- `AUTO`: 자동 백업<br/>- `MANUAL`: 수동 백업 |
| dbInstanceId | Query | String | N | 원본 DB 인스턴스의 식별자 |
| dbVersion | Query | Enum | N | DB 엔진 버전 |

<a id="section-5-2-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-5-2-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| totalCounts | Number | 전체 백업 목록 수 |
| backups | Array | 백업 목록 |
| backups.backupId | UUID | 백업의 식별자 |
| backups.backupName | String | 백업을 식별할 수 있는 이름 |
| backups.backupStatus | Enum | 백업의 현재 상태<br/>- `BACKING_UP`: 백업 중인 경우<br/>- `COMPLETED`: 백업이 완료된 경우<br/>- `DELETING`: 백업이 삭제 중인 경우<br/>- `DELETED`: 백업이 삭제된 경우<br/>- `ERROR`: 오류가 발생한 경우 |
| backups.dbInstanceId | UUID | 원본 DB 인스턴스의 식별자 |
| backups.dbVersion | Enum | DB 엔진 버전 |
| backups.backupType | Enum | 백업 유형<br/>- `AUTO`: 자동 백업<br/>- `MANUAL`: 수동 백업 |
| backups.backupSize | Number | 백업 크기<br/>- 단위: `바이트` |
| backups.startYmdt | DateTime | 시작 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| backups.createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| backups.updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| backups.completedYmdt | DateTime | 완료 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="section-5-3"></a>
### 백업 삭제하기 { #section-5-3 }

<a id="section-5-3-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:Backup.Delete | 백업 삭제하기 |

<a id="section-5-3-2"></a>
#### 요청

```http
DELETE /v1.0/backups/{backupId}
```

<a id="section-5-3-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y | 백업의 식별자 |

<a id="section-5-3-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-5-3-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="section-5-4"></a>
### 백업 내보내기 { #section-5-4 }

<a id="section-5-4-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:Backup.Export | 백업 내보내기 |

<a id="section-5-4-2"></a>
#### 요청

```http
POST /v1.0/backups/{backupId}/export
```

<a id="section-5-4-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y | 백업의 식별자 |

<a id="section-5-4-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| tenantId | String | Y | 백업이 저장될 오브젝트 스토리지의 테넌트 ID<br/>- 최소 길이: `32`<br/>- 최대 길이: `32` |
| username | String | Y | NHN Cloud 계정 또는 IAM 계정 ID |
| password | String | Y | 백업이 저장될 오브젝트 스토리지의 API 비밀번호 |
| targetContainer | String | Y | 백업이 저장될 오브젝트 스토리지의 컨테이너 |
| objectPath | String | Y | 컨테이너에 저장될 백업의 경로 |

<a id="section-5-4-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="section-5-5"></a>
### 백업 복원하기 { #section-5-5 }

<a id="section-5-5-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:Backup.Restore | 백업 복원하기 |

<a id="section-5-5-2"></a>
#### 요청

```http
POST /v1.0/backups/{backupId}/restore
```

<a id="section-5-5-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y | 백업의 식별자 |

<a id="section-5-5-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DB 인스턴스를 식별할 수 있는 이름 |
| dbInstanceCandidateName | String | N | DB 인스턴스를 식별할 수 있는 예비 마스터 이름 |
| description | String | N | DB 인스턴스에 대한 추가 정보 |
| dbFlavorId | UUID | Y | DB 인스턴스 사양의 식별자 |
| dbPort | Number | Y | DB 포트<br/>- 최솟값: 5432, 최댓값: 45432 |
| parameterGroupId | UUID | Y | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Array | N | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Array | N | 사용자 그룹의 식별자 목록 |
| useHighAvailability | Boolean | N | 고가용성 사용 여부<br/>- 기본값: `false` |
| useDefaultNotification | Boolean | N | 기본 알림 사용 여부<br/>- 기본값: `false` |
| useDeletionProtection | Boolean | N | 삭제 보호 여부<br/>- 기본값: `false` |
| pingInterval | Number | N | Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| failoverReplWaitingTime | Number | N | 고가용성 사용 시 장애 조치 대기 시간<br/>- `-1`로 설정 시, 복제 지연 해소까지 계속해서 대기합니다.<br/>- 최솟값: `-1` |
| network | Object | Y | 네트워크 정보 객체 |
| network.subnetId | UUID | Y | 서브넷의 식별자 |
| network.usePublicAccess | Boolean | N | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Enum | N | DB 인스턴스를 생성할 가용성 영역 |
| storage | Object | Y | 스토리지 정보 객체 |
| storage.storageType | Enum | Y | 스토리지 유형 |
| storage.storageSize | Number | Y | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| backup | Object | Y | 백업 정보 객체 |
| backup.backupPeriod | Number | Y | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.periodicAutoBackupStrategyTypeCode | Enum | N | 주기적 자동 백업 전략 코드 (DAILY_FULL/SNAPSHOT)<br/>- 기본값: `DAILY_FULL`<br/>- `SNAPSHOT`: 매일 스냅숏 백업<br/>- `DAILY_FULL`: 매일 전체 백업 |
| backup.backupRetryCount | Number | N | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.backupSchedules | Array | Y | 백업 스케쥴 목록 |
| backup.backupSchedules.backupWndBgnTime | Time | Y | 백업 시작 시간 |
| backup.backupSchedules.backupWndDuration | Enum | Y | 백업 윈도우<br/>- `HALF_AN_HOUR`: 30분<br/>- `ONE_HOUR`: 1시간<br/>- `ONE_HOUR_AND_HALF`: 1시간 30분<br/>- `TWO_HOURS`: 2시간<br/>- `TWO_HOURS_AND_HALF`: 2시간 30분<br/>- `THREE_HOURS`: 3시간 |

<a id="section-5-5-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-7"></a>
## DB 보안 그룹 { #db-7 }

<a id="db-7-db"></a>
### DB 보안 그룹 진행 상태 { #db-7-db }

| 상태              | 설명           |
|-----------------|--------------|
| `NONE`          | 진행 중인 작업이 없음 |
| `CREATING_RULE` | 규칙 정책 생성 중   |
| `UPDATING_RULE` | 규칙 정책 수정 중   |
| `DELETING_RULE` | 규칙 정책 삭제 중   |

<a id="db-7-db-2"></a>
### DB 보안 그룹 목록 보기 { #db-7-db-2 }

<a id="db-7-db-2-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.List | DB 보안 그룹 목록 보기 |

<a id="db-7-db-2-2"></a>
#### 요청

```http
GET /v1.0/db-security-groups
```

<a id="db-7-db-2-3"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-7-db-2-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbSecurityGroups | Array | DB 보안 그룹 목록 |
| dbSecurityGroups.dbSecurityGroupId | UUID | DB 보안 그룹의 식별자 |
| dbSecurityGroups.dbSecurityGroupName | String | DB 보안 그룹을 식별할 수 있는 이름 |
| dbSecurityGroups.dbSecurityGroupStatus | Enum | DB 보안 그룹의 현재 상태<br/>- `CREATED`: 생성됨<br/>- `DELETED`: 삭제됨 |
| dbSecurityGroups.description | String | DB 보안 그룹에 대한 추가 정보 |
| dbSecurityGroups.progressStatus | Enum | DB 보안 그룹의 현재 진행 상태<br/>- `NONE`: 없음<br/>- `CREATING_RULE`: 규칙 생성중<br/>- `UPDATING_RULE`: 규칙 수정중<br/>- `DELETING_RULE`: 규칙 삭제중<br/>- `APPLYING_DEFAULT_RULE`: 기본 규칙 적용중 |
| dbSecurityGroups.createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbSecurityGroups.updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="db-7-db-3"></a>
### DB 보안 그룹 생성하기 { #db-7-db-3 }

<a id="db-7-db-3-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Create | DB 보안 그룹 생성하기 |

<a id="db-7-db-3-2"></a>
#### 요청

```http
POST /v1.0/db-security-groups
```

<a id="db-7-db-3-3"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbSecurityGroupName | String | Y | DB 보안 그룹을 식별할 수 있는 이름 |
| description | String | N | DB 보안 그룹에 대한 추가 정보 |
| rules | Array | Y | DB 보안 그룹 규칙 정보 |
| rules.direction | Enum | Y | 통신 방향<br/>- `INGRESS`: 수신<br/>- `EGRESS`: 송신 |
| rules.etherType | Enum | Y | Ether 유형<br/>- `IPV4`: IPv4 형식<br/>- `IPV6`: IPv6 형식 |
| rules.port | Object | Y | 포트 객체 |
| rules.port.portType | Enum | Y | 포트 유형<br/>- `ALL`: 포트 범위 전체 (사용자 콘솔에서는 사용하지 않음)<br/>- `PORT`: 특정 포트<br/>- `DB_PORT`: DB 수신 포트<br/>- `PORT_RANGE`: 포트 범위 |
| rules.port.minPort | Number | N | 포트 범위 최솟값<br/>- 최솟값: `1` |
| rules.port.maxPort | Number | N | 포트 범위 최댓값<br/>- 최댓값: `65535` |
| rules.cidr | String | Y | CIDR |
| rules.description | String | N | 보안 그룹 규칙에 대한 추가 정보 |

<a id="db-7-db-3-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbSecurityGroupId | UUID | DB 보안 그룹의 식별자 |

---

<a id="db-7-db-4"></a>
### DB 보안 그룹 삭제하기 { #db-7-db-4 }

<a id="db-7-db-4-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Delete | DB 보안 그룹 삭제하기 |

<a id="db-7-db-4-2"></a>
#### 요청

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}
```

<a id="db-7-db-4-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

<a id="db-7-db-4-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-7-db-4-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="db-7-db-5"></a>
### DB 보안 그룹 상세 보기 { #db-7-db-5 }

<a id="db-7-db-5-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Get | DB 보안 그룹 상세 보기 |

<a id="db-7-db-5-2"></a>
#### 요청

```http
GET /v1.0/db-security-groups/{dbSecurityGroupId}
```

<a id="db-7-db-5-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

<a id="db-7-db-5-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-7-db-5-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbSecurityGroup | Object | DB 보안 그룹 |
| dbSecurityGroup.dbSecurityGroupId | UUID | DB 보안 그룹의 식별자 |
| dbSecurityGroup.dbSecurityGroupName | String | DB 보안 그룹을 식별할 수 있는 이름 |
| dbSecurityGroup.dbSecurityGroupStatus | Enum | DB 보안 그룹의 현재 상태<br/>- `CREATED`: 생성됨<br/>- `DELETED`: 삭제됨 |
| dbSecurityGroup.description | String | DB 보안 그룹에 대한 추가 정보 |
| dbSecurityGroup.progressStatus | Enum | DB 보안 그룹의 현재 진행 상태<br/>- `NONE`: 없음<br/>- `CREATING_RULE`: 규칙 생성중<br/>- `UPDATING_RULE`: 규칙 수정중<br/>- `DELETING_RULE`: 규칙 삭제중<br/>- `APPLYING_DEFAULT_RULE`: 기본 규칙 적용중 |
| dbSecurityGroup.rules | Array | DB 보안 그룹 규칙 목록 |
| dbSecurityGroup.rules.ruleId | UUID | DB 보안 그룹 규칙의 식별자 |
| dbSecurityGroup.rules.description | String | DB 보안 그룹 규칙에 대한 추가 정보 |
| dbSecurityGroup.rules.direction | Enum | 통신 방향<br/>- `INGRESS`: 수신<br/>- `EGRESS`: 송신 |
| dbSecurityGroup.rules.etherType | Enum | Ether 유형<br/>- `IPV4`: IPv4 형식<br/>- `IPV6`: IPv6 형식 |
| dbSecurityGroup.rules.port | Object | 포트 객체 |
| dbSecurityGroup.rules.port.portType | Enum | 포트 유형<br/>- `ALL`: 포트 범위 전체 (사용자 콘솔에서는 사용하지 않음)<br/>- `PORT`: 특정 포트<br/>- `DB_PORT`: DB 수신 포트<br/>- `PORT_RANGE`: 포트 범위 |
| dbSecurityGroup.rules.port.minPort | Number | 포트 범위 최솟값 |
| dbSecurityGroup.rules.port.maxPort | Number | 포트 범위 최댓값 |
| dbSecurityGroup.rules.cidr | String | CIDR |
| dbSecurityGroup.rules.createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbSecurityGroup.rules.updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbSecurityGroup.createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbSecurityGroup.updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="db-7-db-6"></a>
### DB 보안 그룹 수정하기 { #db-7-db-6 }

<a id="db-7-db-6-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroup.Modify | DB 보안 그룹 수정하기 |

<a id="db-7-db-6-2"></a>
#### 요청

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}
```

<a id="db-7-db-6-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

<a id="db-7-db-6-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "dbSecurityGroupName": "dbSecurityGroupName-example",
    "description": "description-example"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbSecurityGroupName | String | Y | DB 보안 그룹을 식별할 수 있는 이름 |
| description | String | N | DB 보안 그룹에 대한 추가 정보 |

<a id="db-7-db-6-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="db-7-db-7"></a>
### DB 보안 그룹 규칙 삭제하기 { #db-7-db-7 }

<a id="db-7-db-7-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroupRule.Delete | DB 보안 그룹 규칙 삭제하기 |

<a id="db-7-db-7-2"></a>
#### 요청

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

<a id="db-7-db-7-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |
| ruleIds | Query | String | Y | DB 보안 그룹 규칙 ID 리스트 |

<a id="db-7-db-7-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="db-7-db-7-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-7-db-8"></a>
### DB 보안 그룹 규칙 생성하기 { #db-7-db-8 }

<a id="db-7-db-8-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroupRule.Create | DB 보안 그룹 규칙 생성하기 |

<a id="db-7-db-8-2"></a>
#### 요청

```http
POST /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

<a id="db-7-db-8-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

<a id="db-7-db-8-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| direction | Enum | Y | 통신 방향<br/>- `INGRESS`: 수신<br/>- `EGRESS`: 송신 |
| etherType | Enum | Y | Ether 유형<br/>- `IPV4`: IPv4 형식<br/>- `IPV6`: IPv6 형식 |
| port | Object | Y | 포트 정보 |
| port.portType | Enum | Y | 포트 유형<br/>- `ALL`: 포트 범위 전체 (사용자 콘솔에서는 사용하지 않음)<br/>- `PORT`: 특정 포트<br/>- `DB_PORT`: DB 수신 포트<br/>- `PORT_RANGE`: 포트 범위 |
| port.minPort | Number | N | 포트 범위 최솟값<br/>- 최솟값: `1` |
| port.maxPort | Number | N | 포트 범위 최댓값<br/>- 최댓값: `65535` |
| cidr | String | Y | CIDR |
| description | String | N | DB 보안 그룹 규칙에 대한 추가 정보 |

<a id="db-7-db-8-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="db-7-db-9"></a>
### DB 보안 그룹 규칙 수정하기 { #db-7-db-9 }

<a id="db-7-db-9-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:DbSecurityGroupRule.Modify | DB 보안 그룹 규칙 수정하기 |

<a id="db-7-db-9-2"></a>
#### 요청

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

<a id="db-7-db-9-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |
| ruleId | URL | UUID | Y |  |

<a id="db-7-db-9-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| direction | Enum | Y | 통신 방향<br/>- `INGRESS`: 수신<br/>- `EGRESS`: 송신 |
| etherType | Enum | Y | Ether 유형<br/>- `IPV4`: IPv4 형식<br/>- `IPV6`: IPv6 형식 |
| port | Object | Y | 포트 정보 |
| port.portType | Enum | Y | 포트 유형<br/>- `ALL`: 포트 범위 전체 (사용자 콘솔에서는 사용하지 않음)<br/>- `PORT`: 특정 포트<br/>- `DB_PORT`: DB 수신 포트<br/>- `PORT_RANGE`: 포트 범위 |
| port.minPort | Number | N | 포트 범위 최솟값<br/>- 최솟값: `1` |
| port.maxPort | Number | N | 포트 범위 최댓값<br/>- 최댓값: `65535` |
| cidr | String | Y | CIDR |
| description | String | N | DB 보안 그룹 규칙에 대한 추가 정보 |

<a id="db-7-db-9-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 요청한 작업의 식별자 |

---

<a id="section-6"></a>
## 파라미터 그룹 { #section-6 }

<a id="section-6-1"></a>
### 파라미터 그룹 목록 보기 { #section-6-1 }

<a id="section-6-1-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.List | 파라미터 그룹 목록 보기 |

<a id="section-6-1-2"></a>
#### 요청

```http
GET /v1.0/parameter-groups
```

<a id="section-6-1-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbVersion | Query | Enum | N | DB 엔진 버전 |

<a id="section-6-1-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-6-1-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| parameterGroups | Array | 파라미터 그룹 목록 |
| parameterGroups.parameterGroupId | UUID | 파라미터 그룹의 식별자 |
| parameterGroups.parameterGroupName | String | 파라미터 그룹을 식별할 수 있는 이름 |
| parameterGroups.description | String | 파라미터 그룹에 대한 추가 정보 |
| parameterGroups.dbVersion | Enum | DB 엔진 버전 |
| parameterGroups.parameterGroupStatus | Enum | 파라미터 그룹의 현재 상태<br/>- `STABLE`: 적용 완료<br/>- `NEED_TO_APPLY`: 적용 필요<br/>- `DELETED`: 삭제됨 |
| parameterGroups.createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| parameterGroups.updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="section-6-2"></a>
### 파라미터 그룹 생성하기 { #section-6-2 }

<a id="section-6-2-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Create | 파라미터 그룹 생성하기 |

<a id="section-6-2-2"></a>
#### 요청

```http
POST /v1.0/parameter-groups
```

<a id="section-6-2-3"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "parameterGroupName": "parameterGroupName-example",
    "description": "description-example",
    "dbVersion": "POSTGRESQL_V17_10"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | 파라미터 그룹을 식별할 수 있는 이름 |
| description | String | N | 파라미터 그룹에 대한 추가 정보 |
| dbVersion | Enum | Y | DB 엔진 버전 |

<a id="section-6-2-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| parameterGroupId | UUID | 파라미터 그룹의 식별자 |

---

<a id="section-6-3"></a>
### 파라미터 그룹 삭제하기 { #section-6-3 }

<a id="section-6-3-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Delete | 파라미터 그룹 삭제하기 |

<a id="section-6-3-2"></a>
#### 요청

```http
DELETE /v1.0/parameter-groups/{parameterGroupId}
```

<a id="section-6-3-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | 파라미터 그룹의 식별자 |

<a id="section-6-3-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-6-3-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="section-6-4"></a>
### 파라미터 그룹 상세 조회 { #section-6-4 }

<a id="section-6-4-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Get | 파라미터 그룹 상세 조회 |

<a id="section-6-4-2"></a>
#### 요청

```http
GET /v1.0/parameter-groups/{parameterGroupId}
```

<a id="section-6-4-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | 파라미터 그룹의 식별자 |

<a id="section-6-4-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-6-4-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| parameterGroupId | UUID | 파라미터 그룹의 식별자 |
| parameterGroupName | String | 파라미터 그룹을 식별할 수 있는 이름 |
| description | String | 파라미터 그룹에 대한 추가 정보 |
| dbVersion | Enum | DB 엔진 버전 |
| parameterGroupStatus | Enum | 파라미터 그룹의 현재 상태<br/>- `STABLE`: 적용 완료<br/>- `NEED_TO_APPLY`: 적용 필요<br/>- `DELETED`: 삭제됨 |
| parameters | Array | 파라미터 정보 |
| parameters.parameterCategory | String | 파라미터 카테고리 |
| parameters.parameterName | String | 파라미터 이름 |
| parameters.value | String | 현재 설정된 값 |
| parameters.valueUnit | Enum | 현재 설정된 값의 단위<br/>- `B`: 바이트<br/>- `kB`: 킬로바이트<br/>- `MB`: 메가바이트<br/>- `GB`: 기가바이트<br/>- `TB`: 테라바이트<br/>- `us`: 마이크로초<br/>- `ms`: 밀리초<br/>- `s`: 초<br/>- `min`: 분<br/>- `h`: 시<br/>- `d`: 일 |
| parameters.defaultValue | String | 기본값 |
| parameters.allowedValue | String | 허용된 값 |
| parameters.valueType | Enum | 값 유형<br/>- `BOOLEAN`: 불린 유형(예: on, off, true, false, yes, no, 1, 0)<br/>- `STRING`: 문자열 유형<br/>- `NUMERIC`: 정수 및 부동 소수점 유형<br/>- `NUMERIC_WITH_BYTE_UNIT`: 바이트 단위의 숫자 유형(예: 120kB, 100MB)<br/>- `NUMERIC_WITH_TIME_UNIT`: 시간 단위의 숫자 유형(예: 120ms, 100s, 1d)<br/>- `ENUMERATED`: 허용된 값에 선언된 값 중 한 개 입력<br/>- `MULTI_ENUMERATED`: 허용된 값에 선언된 값 중 여러 개 입력(쉼표(,)로 구분됨) |
| parameters.updateType | Enum | 수정 유형<br/>- `VARIABLE`: 동적, 언제든 수정 가능<br/>- `CONSTANT`: 수정 불가능 |
| parameters.applyType | Enum | 적용 유형<br/>- `BOTH`: 세션, 파일 모두 적용<br/>- `SESSION`: 세션에만 적용<br/>- `FILE`: 파일에만 적용 |
| parameters.expressionAvailable | Boolean | 수식 허용 여부 |
| createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="section-6-5"></a>
### 파라미터 그룹 수정하기 { #section-6-5 }

<a id="section-6-5-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Modify | 파라미터 그룹 수정하기 |

<a id="section-6-5-2"></a>
#### 요청

```http
PUT /v1.0/parameter-groups/{parameterGroupId}
```

<a id="section-6-5-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | 파라미터 그룹의 식별자 |

<a id="section-6-5-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "parameterGroupName": "parameterGroupName-example",
    "description": "description-example"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| parameterGroupName | String | N | 파라미터 그룹을 식별할 수 있는 이름 |
| description | String | N | 파라미터 그룹에 대한 추가 정보 |

<a id="section-6-5-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="section-6-6"></a>
### 파라미터 그룹 복사하기 { #section-6-6 }

<a id="section-6-6-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Copy | 파라미터 그룹 복사하기 |

<a id="section-6-6-2"></a>
#### 요청

```http
POST /v1.0/parameter-groups/{parameterGroupId}/copy
```

<a id="section-6-6-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | 파라미터 그룹의 식별자 |

<a id="section-6-6-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "parameterGroupName": "parameterGroupName-example",
    "description": "description-example"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | 파라미터 그룹을 식별할 수 있는 이름 |
| description | String | N | 파라미터 그룹에 대한 추가 정보 |

<a id="section-6-6-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| parameterGroupId | UUID | 파라미터 그룹의 식별자 |

---

<a id="section-6-7"></a>
### 파라미터 그룹 내 파라미터 수정하기 { #section-6-7 }

<a id="section-6-7-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Modify | 파라미터 그룹 내 파라미터 수정하기 |

<a id="section-6-7-2"></a>
#### 요청

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/parameters
```

<a id="section-6-7-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | 파라미터 그룹의 식별자 |

<a id="section-6-7-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| modifiedParameters | Array | Y | 변경할 파라미터 목록 |
| modifiedParameters.parameterName | String | Y | 파라미터 이름 |
| modifiedParameters.value | String | Y | 변경할 파라미터 값 |

<a id="section-6-7-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="section-6-8"></a>
### 파라미터 그룹 재설정하기 { #section-6-8 }

<a id="section-6-8-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:ParameterGroup.Reset | 파라미터 그룹 재설정하기 |

<a id="section-6-8-2"></a>
#### 요청

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/reset
```

<a id="section-6-8-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y | 파라미터 그룹의 식별자 |

<a id="section-6-8-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-6-8-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="section-7"></a>
## 사용자 그룹 { #section-7 }

<a id="section-7-1"></a>
### 사용자 그룹 목록 보기 { #section-7-1 }

<a id="section-7-1-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.List | 사용자 그룹 목록 보기 |

<a id="section-7-1-2"></a>
#### 요청

```http
GET /v1.0/user-groups
```

<a id="section-7-1-3"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-7-1-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| userGroups | Array | 사용자 그룹 정보 |
| userGroups.userGroupId | UUID | 사용자 그룹의 식별자 |
| userGroups.userGroupName | String | 사용자 그룹을 식별할 수 있는 이름 |
| userGroups.userGroupStatus | Enum | 사용자 그룹의 현재 상태<br/>- `CREATED`<br/>- `DELETED` |
| userGroups.createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| userGroups.updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="section-7-2"></a>
### 사용자 그룹 생성하기 { #section-7-2 }

<a id="section-7-2-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Create | 사용자 그룹 생성하기 |

<a id="section-7-2-2"></a>
#### 요청

```http
POST /v1.0/user-groups
```

<a id="section-7-2-3"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "userGroupName": "userGroupName-example",
    "memberIds": [],
    "selectAllYN": false
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| userGroupName | String | Y | 사용자 그룹을 식별할 수 있는 이름 |
| memberIds | Array | Y | 프로젝트 멤버의 식별자 목록 |
| selectAllYN | Boolean | Y | 프로젝트 멤버 전체 선택 여부<br/>- 기본값: `false` |

<a id="section-7-2-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| userGroupId | UUID | 사용자 그룹의 식별자 |

---

<a id="section-7-3"></a>
### 사용자 그룹 삭제하기 { #section-7-3 }

<a id="section-7-3-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Delete | 사용자 그룹 삭제하기 |

<a id="section-7-3-2"></a>
#### 요청

```http
DELETE /v1.0/user-groups/{userGroupId}
```

<a id="section-7-3-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y | 사용자 그룹의 식별자 |

<a id="section-7-3-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-7-3-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="section-7-4"></a>
### 사용자 그룹 상세 보기 { #section-7-4 }

<a id="section-7-4-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Get | 사용자 그룹 상세 보기 |

<a id="section-7-4-2"></a>
#### 요청

```http
GET /v1.0/user-groups/{userGroupId}
```

<a id="section-7-4-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y | 사용자 그룹의 식별자 |

<a id="section-7-4-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-7-4-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| userGroupId | UUID | 사용자 그룹의 식별자 |
| userGroupName | String | 사용자 그룹을 식별할 수 있는 이름 |
| userGroupTypeCode | Enum | 사용자 그룹 유형<br/>- `ENTIRE`: 전체 프로젝트 멤버<br/>- `INDIVIDUAL_MEMBER`: 사용자 지정 |
| userGroupStatus | Enum | 사용자 그룹의 현재 상태<br/>- `CREATED`<br/>- `DELETED` |
| members | Array | 프로젝트 멤버 목록 |
| members.memberId | UUID | 프로젝트 멤버의 식별자 |
| createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="section-7-5"></a>
### 사용자 그룹 수정하기 { #section-7-5 }

<a id="section-7-5-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:UserGroup.Modify | 사용자 그룹 수정하기 |

<a id="section-7-5-2"></a>
#### 요청

```http
PUT /v1.0/user-groups/{userGroupId}
```

<a id="section-7-5-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y | 사용자 그룹의 식별자 |

<a id="section-7-5-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "userGroupName": "userGroupName-example",
    "memberIds": [],
    "selectAllYN": false
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| userGroupName | String | N | 사용자 그룹을 식별할 수 있는 이름 |
| memberIds | Array | N | 프로젝트 멤버의 식별자 목록 |
| selectAllYN | Boolean | Y | 프로젝트 멤버 전체 선택 여부<br/>- 기본값: `false` |

<a id="section-7-5-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="section-8"></a>
## 알림 그룹 { #section-8 }

<a id="section-8-1"></a>
### 알림 그룹 목록 보기 { #section-8-1 }

<a id="section-8-1-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.List | 알림 그룹 목록 보기 |

<a id="section-8-1-2"></a>
#### 요청

```http
GET /v1.0/notification-groups
```

<a id="section-8-1-3"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-8-1-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| notificationGroups | Array |  |
| notificationGroups.notificationGroupId | UUID | 알림 그룹의 식별자 |
| notificationGroups.notificationGroupName | String | 알림 그룹을 식별할 수 있는 이름 |
| notificationGroups.notificationGroupStatus | Enum | 알림 그룹의 현재 상태<br/>- `CREATED`: 생성됨<br/>- `DELETED`: 삭제됨 |
| notificationGroups.notifyEmail | Boolean | 이메일 알림 여부 |
| notificationGroups.notifySms | Boolean | SMS 알림 여부 |
| notificationGroups.isEnabled | Boolean | 활성화 여부 |
| notificationGroups.createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| notificationGroups.updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="section-8-2"></a>
### 알림 그룹 생성하기 { #section-8-2 }

<a id="section-8-2-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Create | 알림 그룹 생성하기 |

<a id="section-8-2-2"></a>
#### 요청

```http
POST /v1.0/notification-groups
```

<a id="section-8-2-3"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| notificationGroupName | String | Y | 알림 그룹을 식별할 수 있는 이름 |
| notifyEmail | Boolean | N | 이메일 알림 여부<br/>- 기본값: `true` |
| notifySms | Boolean | N | SMS 알림 여부<br/>- 기본값: `true` |
| isEnabled | Boolean | N | 활성화 여부<br/>- 기본값: `true` |
| dbInstanceIds | Array | Y | 감시 대상 DB 인스턴스의 식별자 목록 |
| userGroupIds | Array | Y | 사용자 그룹의 식별자 목록 |

<a id="section-8-2-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| notificationGroupId | UUID | 알림 그룹의 식별자 |

---

<a id="section-8-3"></a>
### 알림 그룹 삭제하기 { #section-8-3 }

<a id="section-8-3-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Delete | 알림 그룹 삭제하기 |

<a id="section-8-3-2"></a>
#### 요청

```http
DELETE /v1.0/notification-groups/{notificationGroupId}
```

<a id="section-8-3-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | 알림 그룹의 식별자 |

<a id="section-8-3-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-8-3-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="section-8-4"></a>
### 알림 그룹 상세 보기 { #section-8-4 }

<a id="section-8-4-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Get | 알림 그룹 상세 보기 |

<a id="section-8-4-2"></a>
#### 요청

```http
GET /v1.0/notification-groups/{notificationGroupId}
```

<a id="section-8-4-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | 알림 그룹의 식별자 |

<a id="section-8-4-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-8-4-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| notificationGroupId | UUID | 알림 그룹의 식별자 |
| notificationGroupName | String | 알림 그룹을 식별할 수 있는 이름 |
| notificationGroupStatus | Enum | 알림 그룹의 현재 상태<br/>- `CREATED`: 생성됨<br/>- `DELETED`: 삭제됨 |
| notifyEmail | Boolean | 이메일 알림 여부 |
| notifySms | Boolean | SMS 알림 여부 |
| isEnabled | Boolean | 활성화 여부 |
| dbInstances | Array | 감시 대상 DB 인스턴스 목록 |
| dbInstances.dbInstanceId | UUID | DB 인스턴스의 식별자 |
| dbInstances.dbInstanceName | String | DB 인스턴스를 식별할 수 있는 이름 |
| userGroups | Array | 사용자 그룹 목록 |
| userGroups.userGroupId | UUID | 사용자 그룹의 식별자 |
| userGroups.userGroupName | String | 사용자 그룹을 식별할 수 있는 이름 |
| createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt | DateTime | 수정 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="section-8-5"></a>
### 알림 그룹 수정하기 { #section-8-5 }

<a id="section-8-5-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:NotificationGroup.Modify | 알림 그룹 수정하기 |

<a id="section-8-5-2"></a>
#### 요청

```http
PUT /v1.0/notification-groups/{notificationGroupId}
```

<a id="section-8-5-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | 알림 그룹의 식별자 |

<a id="section-8-5-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| notificationGroupName | String | N | 알림 그룹을 식별할 수 있는 이름 |
| notifyEmail | Boolean | N | 이메일 알림 여부<br/>- 기본값: `false` |
| notifySms | Boolean | N | SMS 알림 여부<br/>- 기본값: `false` |
| isEnabled | Boolean | N | 활성화 여부<br/>- 기본값: `false` |
| dbInstanceIds | Array | Y | 감시 대상 DB 인스턴스의 식별자 목록 |
| userGroupIds | Array | Y | 사용자 그룹의 식별자 목록 |

<a id="section-8-5-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="section-8-6"></a>
### 감시 설정 목록 보기 { #section-8-6 }

<a id="section-8-6-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.List | 감시 설정 목록 보기 |

<a id="section-8-6-2"></a>
#### 요청

```http
GET /v1.0/notification-groups/{notificationGroupId}/watchdogs
```

<a id="section-8-6-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | 알림 그룹의 식별자 |

<a id="section-8-6-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-8-6-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| notificationWatchdogs | Array | 감시 설정 정보 |
| notificationWatchdogs.watchdogId | UUID | 감시 설정의 식별자 |
| notificationWatchdogs.metricName | Enum | 감시 대상 성능 지표 |
| notificationWatchdogs.comparisonOperator | Enum | 감시 대상 비교 방법<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: > |
| notificationWatchdogs.threshold | Number | 감시 대상 임곗값 |
| notificationWatchdogs.duration | Number | 감시 대상 지속 시간(분) |
| notificationWatchdogs.createdYmdt | DateTime | 생성 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

<a id="section-8-7"></a>
### 감시 설정 생성하기 { #section-8-7 }

<a id="section-8-7-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Create | 감시 설정 생성하기 |

<a id="section-8-7-2"></a>
#### 요청

```http
POST /v1.0/notification-groups/{notificationGroupId}/watchdogs
```

<a id="section-8-7-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | 알림 그룹의 식별자 |

<a id="section-8-7-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "metricName": "CPU_USAGE",
    "comparisonOperator": "LE",
    "threshold": 0,
    "duration": 0
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| metricName | Enum | Y | 감시 대상 성능 지표 |
| comparisonOperator | Enum | Y | 감시 대상 비교 방법<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: > |
| threshold | Number | Y | 감시 대상 임곗값<br/>- 최솟값: `0` |
| duration | Number | Y | 감시 대상 지속 시간 (분)<br/>- 최솟값: `0` |

<a id="section-8-7-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| watchdogId | UUID | 감시 설정의 식별자 |

---

<a id="section-8-8"></a>
### 감시 설정 삭제하기 { #section-8-8 }

<a id="section-8-8-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Delete | 감시 설정 삭제하기 |

<a id="section-8-8-2"></a>
#### 요청

```http
DELETE /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
```

<a id="section-8-8-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | 알림 그룹의 식별자 |
| watchdogId | URL | UUID | Y | 감시 설정의 식별자 |

<a id="section-8-8-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-8-8-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="section-8-9"></a>
### 감시 설정 수정하기 { #section-8-9 }

<a id="section-8-9-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:NotificationWatchdog.Modify | 감시 설정 수정하기 |

<a id="section-8-9-2"></a>
#### 요청

```http
PUT /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
```

<a id="section-8-9-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y | 알림 그룹의 식별자 |
| watchdogId | URL | UUID | Y | 감시 설정의 식별자 |

<a id="section-8-9-4"></a>
#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "metricName": "CPU_USAGE",
    "comparisonOperator": "LE",
    "threshold": 0,
    "duration": 0
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| metricName | Enum | Y | 감시 대상 성능 지표 |
| comparisonOperator | Enum | Y | 감시 대상 비교 방법<br/>- `LE`: <=<br/>- `LT`: <<br/>- `GE`: >=<br/>- `GT`: > |
| threshold | Number | Y | 감시 대상 임곗값<br/>- 최솟값: `0` |
| duration | Number | Y | 감시 대상 지속 시간 (분)<br/>- 최솟값: `0` |

<a id="section-8-9-5"></a>
#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

<a id="section-9"></a>
## 모니터링 { #section-9 }

<a id="section-9-1"></a>
### 통계 정보 조회 { #section-9-1 }

<a id="section-9-1-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:Metric.List | 통계 정보 조회 |

<a id="section-9-1-2"></a>
#### 요청

```http
GET /v1.0/metric-statistics
```

<a id="section-9-1-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | Query | UUID | Y | DB 인스턴스의 식별자 |
| metricNames | Query | Array | Y | 조회할 성능 지표 목록 |
| from | Query | DateTime | Y | 시작 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| to | Query | DateTime | Y | 종료 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| interval | Query | Number | N | 조회 간격<br/>- 단위: `분`<br/>- 기본값: 시작/종료 일시에 따라 적절한 값을 자동 선택함 |

<a id="section-9-1-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-9-1-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| metricStatistics | Array | 통계 정보 목록 |
| metricStatistics.metricName | Enum | 성능 지표 유형 |
| metricStatistics.unit | String | 측정값 단위 |
| metricStatistics.values | Array | 측정값 목록 |
| metricStatistics.values.timestamp | Timestamp | 측정 시간 |
| metricStatistics.values.value | String | 측정값 |

---

<a id="section-9-2"></a>
### 성능 지표 목록 보기 { #section-9-2 }

<a id="section-9-2-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:Metric.List | 성능 지표 목록 보기 |

<a id="section-9-2-2"></a>
#### 요청

```http
GET /v1.0/metrics
```

<a id="section-9-2-3"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-9-2-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| metrics | Array | Metric 목록 |
| metrics.metricName | Enum | 조회 지표 유형 |
| metrics.unit | String | 측정값 단위 |

---

<a id="section-10"></a>
## 이벤트 { #section-10 }

<a id="section-10-1"></a>
### 이벤트 카테고리 { #section-10-1 }

이벤트는 카테고리로 분류할 수 있으며 아래와 같습니다.

| 이벤트 카테고리    | 설명      |
|-------------|---------|
| ALL         | 전체      |
| BACKUP      | 백업      |
| DB_INSTANCE | DB 인스턴스 |
| JOB         | 작업      |
| TENANT      | 테넌트     |
| MONITORING  | 모니터링    |

<a id="section-10-2"></a>
### 구독 가능한 이벤트 코드 목록 보기 { #section-10-2 }

<a id="section-10-2-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:Event.List | 구독 가능한 이벤트 코드 목록 보기 |

<a id="section-10-2-2"></a>
#### 요청

```http
GET /v1.0/event-codes
```

<a id="section-10-2-3"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-10-2-4"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| eventCodes | Array | 이벤트 코드 목록 |
| eventCodes.eventCode | Enum | 이벤트 코드 |
| eventCodes.eventCategoryType | Enum | 이벤트 카테고리 유형<br/>- `ALL`: 전체<br/>- `DB_INSTANCE`: DB 인스턴스로 발생한 이벤트<br/>- `DB_SECURITY_GROUP`: DB 보안 그룹으로 발생한 이벤트<br/>- `MONITORING`: 모니터링으로 발생한 이벤트<br/>- `JOB`: JOB으로 발생한 이벤트<br/>- `BACKUP`: 백업으로 발생한 이벤트<br/>- `TENANT`: 테넌트로 발생한 이벤트 |

---

<a id="section-10-3"></a>
### 이벤트 목록 보기 { #section-10-3 }

<a id="section-10-3-1"></a>
#### 필요 권한

| 권한명 | 설명 |
|-----|-----|
| RDSforPostgreSQL:Event.List | 이벤트 목록 보기 |

<a id="section-10-3-2"></a>
#### 요청

```http
GET /v1.0/events
```

<a id="section-10-3-3"></a>
#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| page | Query | Number | Y | 조회할 목록의 페이지<br/>- 최솟값: `1` |
| size | Query | Number | Y | 조회할 목록의 페이지 크기<br/>- 최솟값: `1`<br/>- 최댓값: `100` |
| from | Query | DateTime | Y | 시작 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| to | Query | DateTime | Y | 종료 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| eventCategoryType | Query | Enum | Y | 조회할 이벤트 카테고리 유형<br/>- `ALL`: 전체<br/>- `DB_INSTANCE`: DB 인스턴스로 발생한 이벤트<br/>- `DB_SECURITY_GROUP`: DB 보안 그룹으로 발생한 이벤트<br/>- `MONITORING`: 모니터링으로 발생한 이벤트<br/>- `JOB`: JOB으로 발생한 이벤트<br/>- `BACKUP`: 백업으로 발생한 이벤트<br/>- `TENANT`: 테넌트로 발생한 이벤트 |
| sourceId | Query | UUID | N | 이벤트가 발생한 대상 리소스의 식별자 |
| keyword | Query | String | N | 이벤트 메세지에 포함된 문자열 검색어 |

<a id="section-10-3-4"></a>
#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

<a id="section-10-3-5"></a>
#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

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

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| totalCounts | Number | 전체 이벤트 목록 수 |
| events | Array | 이벤트 목록 |
| events.eventCategoryType | Enum | 이벤트 카테고리 유형<br/>- `ALL`: 전체<br/>- `DB_INSTANCE`: DB 인스턴스로 발생한 이벤트<br/>- `DB_SECURITY_GROUP`: DB 보안 그룹으로 발생한 이벤트<br/>- `MONITORING`: 모니터링으로 발생한 이벤트<br/>- `JOB`: JOB으로 발생한 이벤트<br/>- `BACKUP`: 백업으로 발생한 이벤트<br/>- `TENANT`: 테넌트로 발생한 이벤트 |
| events.eventCode | Enum | 발생한 이벤트의 유형 |
| events.sourceId | UUID | 이벤트 소스의 식별자 |
| events.sourceName | String | 이벤트 소스를 식별할 수 있는 이름 |
| events.messages | Array | 이벤트 메세지 목록 |
| events.messages.langCode | Enum | 언어 코드<br/>- `KO`<br/>- `EN`<br/>- `JA`<br/>- `ZH` |
| events.messages.message | String | 이벤트 메세지 |
| events.eventYmdt | DateTime | 이벤트 발생 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

---

