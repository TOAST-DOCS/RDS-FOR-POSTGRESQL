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
| resultCode    | Int     | 결과코드 (성공: 0, 그 외: 실패) |
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