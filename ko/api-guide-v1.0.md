## Database > RDS for PostgreSQL > API 가이드

## RDS for PostgreSQL API 공통 정보

### 인증 및 권한

RDS for PostgreSQL은(는) API 호출 시 인증/인가를 위해 User Access Key 토큰을 사용합니다. User Access Key 토큰은 User Access Key를 기반으로 발급되는 Bearer 타입의 일시적 액세스 토큰입니다. User Access Key 토큰 발급 및 사용에 대한 자세한 내용은 [User Access Key 토큰](/nhncloud/ko/public-api/user-access-key-token)을 참고하세요.
발급 받은 토큰은 Appkey와 함께 요청 Header에 포함해야 합니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| X-TC-APP-KEY | Header | String | O | RDS for PostgreSQL 서비스의 Appkey 또는 프로젝트 통합 Appkey |
| X-NHN-AUTHORIZATION | Header | String | O | Public API로 발급 받은 Bearer 유형 토큰 |

또한 프로젝트 권한에 따라 호출할 수 있는 API가 제한됩니다. `RDS for PostgreSQL ADMIN`, `RDS for PostgreSQL VIEWER` 역할에는 아래처럼 기본 권한이 부여돼 있고 프로젝트 내 역할 그룹 관리 메뉴에서 필요한 권한만 부여할 수 있습니다.

* `RDS for PostgreSQL ADMIN` 역할은 API 실행에 필요한 모든 권한이 부여됩니다.
* `RDS for PostgreSQL VIEWER` 역할은 정보를 조회하는 권한만 부여됩니다.
    * DB 인스턴스를 생성, 수정, 삭제하거나, DB 인스턴스를 대상으로 하는 어떠한 기능도 사용할 수 없습니다.
    * 단, 알림 그룹과 사용자 그룹 관련된 기능은 사용할 수 있습니다.

API 요청 시 인증에 실패하거나 권한이 없을 경우 다음과 같은 오류가 발생합니다.

| resultCode | resultMessage | 설명 |
|------------|---------------|-----|
| 80401 | Unauthorized | 인증에 실패했습니다. |
| 80403 | Forbidden | 권한이 없습니다. |

### 응답 공통 정보

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
| 이름 | 형식 | 설명 |
|-----|-----|-----|
| resultCode | Number | 결과 코드<br/>- 성공: `0`<br/>- 실패: `0`이 아닌 값 |
| resultMessage | String | 결과 메시지 |
| isSuccessful | Boolean | 성공 여부 |
### API 엔드포인트

| 리전 | 엔드포인트 |
|------|----------|
| 한국(판교) 리전 | https://kr1-rds-postgres.api.nhncloudservice.com |
| 한국(평촌) 리전 | https://kr2-rds-postgres.api.nhncloudservice.com |

## DB 보안 그룹

### DB 보안 그룹 진행 상태

| 상태              | 설명           |
|-----------------|--------------|
| `NONE`          | 진행 중인 작업이 없음 |
| `CREATING_RULE` | 규칙 정책 생성 중   |
| `UPDATING_RULE` | 규칙 정책 수정 중   |
| `DELETING_RULE` | 규칙 정책 삭제 중   |

### DB 보안 그룹 목록 보기

```http
GET /v1.0/db-security-groups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbSecurityGroups | Body | Array | DB 보안 그룹 목록 |
| dbSecurityGroups.dbSecurityGroupId | Body | String | DB 보안 그룹의 식별자 |
| dbSecurityGroups.dbSecurityGroupName | Body | String | DB 보안 그룹을 식별할 수 있는 이름 |
| dbSecurityGroups.dbSecurityGroupStatus | Body | Enum | DB 보안 그룹의 현재 상태<br/>- CREATED: `생성됨`<br/>- DELETED: `삭제됨` |
| dbSecurityGroups.description | Body | String | DB 보안 그룹에 대한 추가 정보 |
| dbSecurityGroups.progressStatus | Body | Enum | DB 보안 그룹의 현재 진행 상태<br/>- NONE: `없음`<br/>- CREATING_RULE: `규칙 생성중`<br/>- UPDATING_RULE: `규칙 수정중`<br/>- DELETING_RULE: `규칙 삭제중`<br/>- APPLYING_DEFAULT_RULE: `기본 규칙 적용중` |
| dbSecurityGroups.createdYmdt | Body | DateTime | 생성 일시 |
| dbSecurityGroups.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
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
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### DB 보안 그룹 생성하기

```http
POST /v1.0/db-security-groups
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupName | Body | String | O | DB 보안 그룹을 식별할 수 있는 이름 |
| description | Body | String | X | DB 보안 그룹에 대한 추가 정보 |
| rules | Body | Array | O | DB 보안 그룹 규칙 정보 |
| rules.direction | Body | Enum | O | 통신 방향<br/>- INGRESS: `수신`<br/>- EGRESS: `송신` |
| rules.etherType | Body | Enum | O | Ether 타입<br/>- IPV4: `IPv4 형식`<br/>- IPV6: `IPv6 형식` |
| rules.port | Body | Object | O | 포트 객체 |
| rules.port.portType | Body | Enum | O | 포트 타입<br/>- ALL: `포트 범위 전체 (사용자 콘솔에서는 사용하지 않음)`<br/>- PORT: `특정 포트`<br/>- DB_PORT: `DB 수신 포트`<br/>- PORT_RANGE: `포트 범위` |
| rules.port.minPort | Body | Number | X | 최소 포트 범위<br/>- 최솟값: `1` |
| rules.port.maxPort | Body | Number | X | 최대 포트 범위<br/>- 최댓값: `65535` |
| rules.cidr | Body | String | O | CIDR |
| rules.description | Body | String | X | 보안 그룹 규칙에 대한 추가 정보 |

<details><summary>예시</summary>
<p>

```json
{
    "dbSecurityGroupName": "dbSecurityGroupName-example",
    "description": "description-example",
    "rules": [
        {
            "description": "description-example"
        }
    ]
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbSecurityGroupId | Body | String | DB 보안 그룹의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbSecurityGroupId": "dbSecurityGroupId-example"
}
```

</p>
</details>

---

### DB 보안 그룹 삭제하기

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### DB 보안 그룹 상세 보기

```http
GET /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbSecurityGroup | Body | Object | DB 보안 그룹 |
| dbSecurityGroup.dbSecurityGroupId | Body | String | DB 보안 그룹의 식별자 |
| dbSecurityGroup.dbSecurityGroupName | Body | String | DB 보안 그룹을 식별할 수 있는 이름 |
| dbSecurityGroup.dbSecurityGroupStatus | Body | Enum | DB 보안 그룹의 현재 상태<br/>- CREATED: `생성됨`<br/>- DELETED: `삭제됨` |
| dbSecurityGroup.description | Body | String | DB 보안 그룹에 대한 추가 정보 |
| dbSecurityGroup.progressStatus | Body | Enum | DB 보안 그룹의 현재 진행 상태<br/>- NONE: `없음`<br/>- CREATING_RULE: `규칙 생성중`<br/>- UPDATING_RULE: `규칙 수정중`<br/>- DELETING_RULE: `규칙 삭제중`<br/>- APPLYING_DEFAULT_RULE: `기본 규칙 적용중` |
| dbSecurityGroup.rules | Body | Array | DB 보안 그룹 규칙 목록 |
| dbSecurityGroup.rules.ruleId | Body | String | DB 보안 그룹 규칙의 식별자 |
| dbSecurityGroup.rules.description | Body | String | DB 보안 그룹 규칙에 대한 추가 정보 |
| dbSecurityGroup.rules.direction | Body | Enum | 통신 방향<br/>- INGRESS: `수신`<br/>- EGRESS: `송신` |
| dbSecurityGroup.rules.etherType | Body | Enum | Ether 타입<br/>- IPV4: `IPv4 형식`<br/>- IPV6: `IPv6 형식` |
| dbSecurityGroup.rules.port | Body | Object | 포트 객체 |
| dbSecurityGroup.rules.port.portType | Body | Enum | 포트 타입<br/>- ALL: `포트 범위 전체 (사용자 콘솔에서는 사용하지 않음)`<br/>- PORT: `특정 포트`<br/>- DB_PORT: `DB 수신 포트`<br/>- PORT_RANGE: `포트 범위` |
| dbSecurityGroup.rules.port.minPort | Body | Number | 최소 포트 범위 |
| dbSecurityGroup.rules.port.maxPort | Body | Number | 최대 포트 범위 |
| dbSecurityGroup.rules.cidr | Body | String | CIDR |
| dbSecurityGroup.rules.createdYmdt | Body | DateTime | 생성 일시 |
| dbSecurityGroup.rules.updatedYmdt | Body | DateTime | 수정 일시 |
| dbSecurityGroup.createdYmdt | Body | DateTime | 생성 일시 |
| dbSecurityGroup.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbSecurityGroup": {
        "dbSecurityGroupId": "dbSecurityGroupId-example",
        "dbSecurityGroupName": "dbSecurityGroupName-example",
        "dbSecurityGroupStatus": "CREATED",
        "description": "description-example",
        "progressStatus": "NONE",
        "rules": [
            {
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

### DB 보안 그룹 수정하기

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| dbSecurityGroupName | Body | String | O | DB 보안 그룹을 식별할 수 있는 이름 |
| description | Body | String | X | DB 보안 그룹에 대한 추가 정보 |

<details><summary>예시</summary>
<p>

```json
{
    "dbSecurityGroupName": "dbSecurityGroupName-example",
    "description": "description-example"
}
```

</p>
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### DB 보안 그룹 규칙 삭제하기

```http
DELETE /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| ruleIds | Query | String | O | DB 보안 그룹 규칙 ID 리스트 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 보안 그룹 규칙 생성하기

```http
POST /v1.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| direction | Body | Enum | O | 통신 방향<br/>- INGRESS: `수신`<br/>- EGRESS: `송신` |
| etherType | Body | Enum | O | Ether 타입<br/>- IPV4: `IPv4 형식`<br/>- IPV6: `IPv6 형식` |
| port | Body | Object | O | 포트 정보 |
| port.portType | Body | Enum | O | 포트 타입<br/>- ALL: `포트 범위 전체 (사용자 콘솔에서는 사용하지 않음)`<br/>- PORT: `특정 포트`<br/>- DB_PORT: `DB 수신 포트`<br/>- PORT_RANGE: `포트 범위` |
| port.minPort | Body | Number | X | 최소 포트 범위<br/>- 최솟값: `1` |
| port.maxPort | Body | Number | X | 최대 포트 범위<br/>- 최댓값: `65535` |
| cidr | Body | String | O | CIDR |
| description | Body | String | X | DB 보안 그룹 규칙에 대한 추가 정보 |

<details><summary>예시</summary>
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
    "cidr": "cidr-example",
    "description": "description-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 보안 그룹 규칙 수정하기

```http
PUT /v1.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| ruleId | URL | UUID | O |  |
| direction | Body | Enum | O | 통신 방향<br/>- INGRESS: `수신`<br/>- EGRESS: `송신` |
| etherType | Body | Enum | O | Ether 타입<br/>- IPV4: `IPv4 형식`<br/>- IPV6: `IPv6 형식` |
| port | Body | Object | O | 포트 정보 |
| port.portType | Body | Enum | O | 포트 타입<br/>- ALL: `포트 범위 전체 (사용자 콘솔에서는 사용하지 않음)`<br/>- PORT: `특정 포트`<br/>- DB_PORT: `DB 수신 포트`<br/>- PORT_RANGE: `포트 범위` |
| port.minPort | Body | Number | X | 최소 포트 범위<br/>- 최솟값: `1` |
| port.maxPort | Body | Number | X | 최대 포트 범위<br/>- 최댓값: `65535` |
| cidr | Body | String | O | CIDR |
| description | Body | String | X | DB 보안 그룹 규칙에 대한 추가 정보 |

<details><summary>예시</summary>
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
    "cidr": "cidr-example",
    "description": "description-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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
| `FAILOVER`          | DB 인스턴스가 고가용성 장애 조치된 경우      |
| `SHUTDOWN`          | DB 인스턴스가 중지된 경우              |
| `DELETED`           | DB 인스턴스가 삭제된 경우              |

### DB 인스턴스 진행 상태

| 상태                         | 설명           |
|----------------------------|--------------|
| `APPLYING_PARAMETER_GROUP` | 파라미터 그룹 적용 중 |
| `BACKING_UP`               | 백업 중         |
| `CANCELING`                | 취소 중         |
| `CREATING`                 | 생성 중         |
| `CREATING_SCHEMA`          | DB 스키마 생성 중  |
| `CREATING_USER`            | 사용자 생성 중     |
| `DELETING`                 | 삭제 중         |
| `DELETING_SCHEMA`          | DB 스키마 삭제 중  |
| `DELETING_USER`            | 사용자 삭제 중     |
| `EXPORTING_BACKUP`         | 백업을 내보내는 중   |
| `FAILING_OVER`             | 장애 조치 중      |
| `MIGRATING`                | 마이그레이션 중     |
| `MODIFYING`                | 수정 중         |
| `PREPARING`                | 준비 중         |
| `PROMOTING`                | 승격 중         |
| `REBUILDING`               | 재구축 중        |
| `REPAIRING`                | 복구 중         |
| `REPLICATING`              | 복제 중         |
| `RESTARTING`               | 재시작 중        |
| `RESTARTING_FORCIBLY`      | 강제 재시작 중     |
| `RESTORING`                | 복원 중         |
| `STARTING`                 | 시작 중         |
| `STOPPING`                 | 정지 중         |
| `SYNCING_SCHEMA`           | DB 스키마 동기화 중 |
| `SYNCING_USER`             | 사용자 동기화 중    |
| `UPDATING_USER`            | 사용자 수정 중     |

### DB 인스턴스 목록 보기

```http
GET /v1.0/db-instances
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbInstances | Body | Array | DB 인스턴스 정보 |
| dbInstances.dbInstanceId | Body | String | DB 인스턴스의 식별자 |
| dbInstances.dbInstanceGroupId | Body | String | DB 인스턴스 그룹의 식별자 |
| dbInstances.dbInstanceName | Body | String | DB 인스턴스를 식별할 수 있는 이름 |
| dbInstances.description | Body | String | DB 인스턴스에 대한 추가 정보 |
| dbInstances.dbVersion | Body | Enum | DB 엔진 유형 |
| dbInstances.dbPort | Body | Number | DB 포트 |
| dbInstances.dbInstanceType | Body | Enum | DB 인스턴스 역할 타입<br/>- MASTER: `마스터`<br/>- FAILED_MASTER: `장애 마스터`<br/>- CANDIDATE_MASTER: `예비 마스터`<br/>- READ_ONLY_SLAVE: `읽기 복제본` |
| dbInstances.dbInstanceStatus | Body | Enum | DB 인스턴스의 현재 상태<br/>- BEFORE_CREATE: `생성 이전 (회색)`<br/>- AVAILABLE: `사용 가능 (녹색)`<br/>- STORAGE_FULL: `용량 부족 (적색)`<br/>- FAIL_TO_CREATE: `생성 실패 (적색)`<br/>- FAIL_TO_CONNECT: `연결 실패 (적색)`<br/>- REPLICATION_STOP: `복제 중단 (적색)`<br/>- REPLICATION_DELAY: `복제 지연 (황색)`<br/>- FAILOVER: `장애 조치 완료 (적색)`<br/>- SHUTDOWN: `중지 됨 (회색)`<br/>- DELETED: `삭제됨 (회색)` |
| dbInstances.progressStatus | Body | String | DB 인스턴스의 현재 진행 상태 |
| dbInstances.createdYmdt | Body | DateTime | 생성 일시 |
| dbInstances.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
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
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### DB 인스턴스 생성하기

```http
POST /v1.0/db-instances
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceName | Body | String | O | DB 인스턴스를 식별할 수 있는 이름 |
| dbInstanceCandidateName | Body | String | X | DB 인스턴스를 식별할 수 있는 예비 마스터 이름 |
| description | Body | String | X | DB 인스턴스에 대한 추가 정보 |
| dbFlavorId | Body | UUID | O | DB 인스턴스 사양의 식별자 |
| dbVersion | Body | Enum | O | DB 엔진 유형 |
| dbPort | Body | Number | O | DB 포트<br/>- 최솟값: 5432, 최댓값: 45432 |
| databaseName | Body | String | O | 데이터베이스명 |
| dbUserName | Body | String | O | DB 사용자 계정명 |
| dbPassword | Body | String | O | DB 사용자 계정 암호 |
| parameterGroupId | Body | UUID | O | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Body | Array | X | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Body | Array | X | 사용자 그룹의 식별자 목록 |
| useHighAvailability | Body | Boolean | X | 고가용성 사용 여부<br/>- 기본값: `false` |
| useDefaultNotification | Body | Boolean | X | 기본 알림 사용 여부<br/>- 기본값: `false` |
| useDeletionProtection | Body | Boolean | X | 삭제 보호 여부<br/>- 기본값: `false` |
| pingInterval | Body | Number | X | Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| failoverReplWaitingTime | Body | Number | X | 장애조치 복제 지연 대기 시간(초)<br/>- 최솟값: `-1` |
| network | Body | Object | O | 네트워크 정보 |
| network.subnetId | Body | UUID | O | 서브넷의 식별자 |
| network.usePublicAccess | Body | Boolean | X | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Body | Enum | X | DB 인스턴스를 생성할 가용성 영역 |
| storage | Body | Object | O | 스토리지 정보 |
| storage.storageType | Body | Enum | O | 스토리지 타입 |
| storage.storageSize | Body | Number | O | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| backup | Body | Object | O | 백업 정보 |
| backup.backupPeriod | Body | Number | O | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.backupRetryCount | Body | Number | X | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.backupSchedules | Body | Array | O | 백업 스케쥴 정보 |
| backup.backupSchedules.backupWndBgnTime | Body | String | O | 백업 시작 시각 |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |

<details><summary>예시</summary>
<p>

```json
{
    "dbInstanceName": "dbInstanceName-example",
    "dbInstanceCandidateName": "dbInstanceCandidateName-example",
    "description": "description-example",
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "dbVersion": "ENUM_VALUE",
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
        "availabilityZone": "ENUM_VALUE"
    },
    "storage": {
        "storageType": "ENUM_VALUE",
        "storageSize": 20
    },
    "backup": {
        "backupPeriod": 0,
        "backupRetryCount": 0,
        "backupSchedules": [
            {
                "backupWndDuration": "HALF_AN_HOUR"
            }
        ]
    }
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 오브젝트 스토리지에 있는 백업으로 복원

```http
POST /v1.0/db-instances/restore-from-obs
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceName | Body | String | X | DB 인스턴스를 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| dbInstanceCandidateName | Body | String | X | DB 인스턴스를 식별할 수 있는 예비 마스터 이름 |
| description | Body | String | X | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbFlavorId | Body | UUID | O | DB 인스턴스 사양의 식별자 |
| dbPort | Body | Number | X | DB 포트<br/>- 최솟값: 5432, 최댓값: 45432 |
| dbVersion | Body | Enum | O | DB 엔진 유형 |
| useHighAvailability | Body | Boolean | X | 고가용성 사용 여부<br/>- 기본값: `false` |
| imageId | Body | UUID | X | 이미지의 식별자 |
| pingInterval | Body | Number | X | 고가용성 사용 시 Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| failoverReplWaitingTime | Body | Number | X | 장애조치 복제 지연 대기 시간(초)<br/>- 최솟값: `-1` |
| storage | Body | Object | O | 스토리지 정보 객체 |
| storage.storageType | Body | Enum | O | 스토리지 타입 |
| storage.storageSize | Body | Number | O | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| network | Body | Object | O | 네트워크 정보 객체 |
| network.subnetId | Body | UUID | O | 서브넷의 식별자 |
| network.usePublicAccess | Body | Boolean | X | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Body | Enum | X | DB 인스턴스를 생성할 가용성 영역 |
| backup | Body | Object | O | 백업 정보 객체 |
| backup.backupPeriod | Body | Number | O | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.backupRetryCount | Body | Number | X | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.replicationRegion | Body | Enum | X | 백업 복제 리전<br/>- KR1: `한국(판교)`<br/>- KR2: `한국(평촌)` |
| backup.backupSchedules | Body | Array | O | 백업 스케쥴 목록 |
| backup.backupSchedules.backupWndBgnTime | Body | String | O | 백업 시작 시각 |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |
| restore | Body | Object | O | 복원 정보 객체 |
| restore.tenantId | Body | String | O | 백업이 저장된 오브젝트 스토리지의 테넌트 ID |
| restore.username | Body | String | O | NHN Cloud 계정 혹은 IAM 멤버 ID |
| restore.password | Body | String | O | 백업이 저장된 오브젝트 스토리지의 API 비밀번호 |
| restore.targetContainer | Body | String | O | 백업이 저장된 오브젝트 스토리지의 컨테이너 |
| restore.objectPath | Body | String | O | 컨테이너에 저장된 백업의 경로 |
| useDefaultNotification | Body | Boolean | X | 기본 알림 사용 여부<br/>- 기본값: `false` |
| parameterGroupId | Body | UUID | O | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Body | Array | X | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Body | Array | X | 사용자 그룹의 식별자 목록 |
| useDeletionProtection | Body | Boolean | X | 삭제 보호 여부<br/>- 기본값: `false` |

<details><summary>예시</summary>
<p>

```json
{
    "dbInstanceName": "dbInstanceName",
    "dbInstanceCandidateName": "dbInstanceCandidateName-example",
    "description": "description-example",
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "dbPort": 1,
    "dbVersion": "ENUM_VALUE",
    "useHighAvailability": false,
    "imageId": "550e8400-e29b-41d4-a716-446655440000",
    "pingInterval": 3,
    "failoverReplWaitingTime": 60,
    "storage": {
        "storageType": "ENUM_VALUE",
        "storageSize": 20
    },
    "network": {
        "subnetId": "550e8400-e29b-41d4-a716-446655440000",
        "usePublicAccess": false,
        "availabilityZone": "ENUM_VALUE"
    },
    "backup": {
        "backupPeriod": 0,
        "backupRetryCount": 0,
        "replicationRegion": "KR1",
        "backupSchedules": [
            {
                "backupWndDuration": "HALF_AN_HOUR"
            }
        ]
    },
    "restore": {
        "tenantId": "tenantId-example",
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

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 삭제하기

```http
DELETE /v1.0/db-instances/{dbInstanceId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 상세 보기

```http
GET /v1.0/db-instances/{dbInstanceId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbInstanceId | Body | String | DB 인스턴스의 식별자 |
| dbInstanceGroupId | Body | String | DB 인스턴스 그룹의 식별자 |
| dbInstanceName | Body | String | DB 인스턴스를 식별할 수 있는 이름 |
| description | Body | String | DB 인스턴스에 대한 추가 정보 |
| dbVersion | Body | Enum | DB 엔진 유형 |
| dbPort | Body | Number | DB 포트 |
| dbInstanceType | Body | Enum | DB 인스턴스 역할 타입<br/>- MASTER: `마스터`<br/>- FAILED_MASTER: `장애 마스터`<br/>- CANDIDATE_MASTER: `예비 마스터`<br/>- READ_ONLY_SLAVE: `읽기 복제본` |
| dbInstanceStatus | Body | Enum | DB 인스턴스의 현재 상태<br/>- BEFORE_CREATE: `생성 이전 (회색)`<br/>- AVAILABLE: `사용 가능 (녹색)`<br/>- STORAGE_FULL: `용량 부족 (적색)`<br/>- FAIL_TO_CREATE: `생성 실패 (적색)`<br/>- FAIL_TO_CONNECT: `연결 실패 (적색)`<br/>- REPLICATION_STOP: `복제 중단 (적색)`<br/>- REPLICATION_DELAY: `복제 지연 (황색)`<br/>- FAILOVER: `장애 조치 완료 (적색)`<br/>- SHUTDOWN: `중지 됨 (회색)`<br/>- DELETED: `삭제됨 (회색)` |
| progressStatus | Body | String | DB 인스턴스의 현재 진행 상태 |
| dbFlavorId | Body | String | DB 인스턴스 사양의 식별자 |
| parameterGroupId | Body | String | DB 인스턴스에 적용된 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Body | Array | DB 인스턴스에 적용된 DB 보안 그룹의 식별자 목록 |
| notificationGroupIds | Body | Array | DB 인스턴스에 적용된 알림 그룹의 식별자 목록 |
| useDeletionProtection | Body | Boolean | DB 인스턴스 삭제 보호 여부 |
| needToApplyParameterGroup | Body | Boolean | 최신 파라미터 그룹 적용 필요 여부 |
| needMigration | Body | Boolean | 마이그레이션 필요 여부 |
| osVersion | Body | String | 운영체제 버전 |
| createdYmdt | Body | DateTime | 생성 일시 |
| updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstanceId": "dbInstanceId-example",
    "dbInstanceGroupId": "dbInstanceGroupId-example",
    "dbInstanceName": "dbInstanceName-example",
    "description": "description-example",
    "dbVersion": "ENUM_VALUE",
    "dbPort": 1,
    "dbInstanceType": "MASTER",
    "dbInstanceStatus": "BEFORE_CREATE",
    "progressStatus": "progressStatus-example",
    "dbFlavorId": "dbFlavorId-example",
    "parameterGroupId": "parameterGroupId-example",
    "dbSecurityGroupIds": [],
    "notificationGroupIds": [],
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

### DB 인스턴스 수정하기

```http
PUT /v1.0/db-instances/{dbInstanceId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| dbInstanceName | Body | String | X | DB 인스턴스를 식별할 수 있는 이름 |
| dbInstanceCandidateName | Body | String | X | DB 인스턴스를 식별할 수 있는 예비 마스터 이름 |
| description | Body | String | X | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbPort | Body | Number | X | DB 포트<br/>- 최솟값: 5432, 최댓값: 45432 |
| dbFlavorId | Body | UUID | X | DB 인스턴스 사양의 식별자 |
| parameterGroupId | Body | UUID | X | 파라미터 그룹의 식별자 |
| dbVersion | Body | Enum | X | DB 엔진 버전 코드 |
| dbSecurityGroupIds | Body | Array | X | DB 보안 그룹의 식별자 목록 |
| executeBackup | Body | Boolean | X | 현재 시점 백업 진행 여부<br/>- 기본값: `false` |
| useOnlineFailover | Body | Boolean | X | 장애 조치를 이용한 재시작 여부<br/>- 기본값: `false` |
| waitReplicationDelay | Body | Boolean | X | 복제 지연 해소 대기<br/>- 기본값: `false` |
| useReadOnly | Body | Boolean | X | 쓰기 부하 차단<br/>- 기본값: `false` |

<details><summary>예시</summary>
<p>

```json
{
    "dbInstanceName": "dbInstanceName-example",
    "dbInstanceCandidateName": "dbInstanceCandidateName-example",
    "description": "description-example",
    "dbPort": 1,
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "dbVersion": "ENUM_VALUE",
    "dbSecurityGroupIds": [],
    "executeBackup": false,
    "useOnlineFailover": false,
    "waitReplicationDelay": false,
    "useReadOnly": false
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 최신 파라미터 그룹 적용하기

```http
POST /v1.0/db-instances/{dbInstanceId}/apply-recent-parameter-group
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 현 DB 인스턴스에서 선택 가능한 DB 버전 조회

```http
GET /v1.0/db-instances/{dbInstanceId}/available-db-versions
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| availableDbVersions | Body | Array | DB 버전 정보 |
| availableDbVersions.dbVersionCode | Body | Enum | DB 버전 코드<br/>- MYSQL_V5633<br/>- MYSQL_V5715<br/>- MYSQL_V5719<br/>- MYSQL_V5726<br/>- MYSQL_V5731<br/>- MYSQL_V5733<br/>- MYSQL_V5737<br/>- MYSQL_V8018<br/>- MYSQL_V8023<br/>- MYSQL_V8028<br/>- MYSQL_V8032<br/>- MYSQL_V8033<br/>- MYSQL_V8034<br/>- MYSQL_V8035<br/>- MYSQL_V8036<br/>- MYSQL_V8040<br/>- MYSQL_V8041<br/>- MYSQL_V8042<br/>- MYSQL_V8043<br/>- MYSQL_V8044<br/>- MYSQL_V8045<br/>- MYSQL_V8405<br/>- MYSQL_V8406<br/>- MYSQL_V8407<br/>- MYSQL_V8408<br/>- MARIADB_V10330<br/>- MARIADB_V10611<br/>- MARIADB_V10612<br/>- MARIADB_V10616<br/>- MARIADB_V10622<br/>- MARIADB_V10625<br/>- MARIADB_V101107<br/>- MARIADB_V101108<br/>- MARIADB_V101113<br/>- MARIADB_V101116<br/>- MARIADB_V11407<br/>- MARIADB_V11410<br/>- MARIADB_V11806<br/>- POSTGRESQL_V14_6<br/>- POSTGRESQL_V14_15<br/>- POSTGRESQL_V14_17<br/>- POSTGRESQL_V14_19<br/>- POSTGRESQL_V17_2<br/>- POSTGRESQL_V17_4<br/>- POSTGRESQL_V17_6 |
| availableDbVersions.dbMajorVersionCode | Body | Enum | DB 메이저 버전 코드<br/>- MYSQL_V56<br/>- MYSQL_V57<br/>- MYSQL_V80<br/>- MYSQL_V84<br/>- MARIADB_V103<br/>- MARIADB_V106<br/>- MARIADB_V1011<br/>- MARIADB_V114<br/>- MARIADB_V118<br/>- POSTGRES_V14<br/>- POSTGRES_V17 |
| availableDbVersions.name | Body | String | DB 버전명 |
| availableDbVersions.canCreate | Body | Boolean | 신규 생성 가능 여부 |

<details><summary>예시</summary>
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
            "canCreate": false
        }
    ]
}
```

</p>
</details>

---

### DB 인스턴스 백업하기

```http
POST /v1.0/db-instances/{dbInstanceId}/backup
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| backupName | Body | String | O | 백업을 식별할 수 있는 이름 |

<details><summary>예시</summary>
<p>

```json
{
    "backupName": "backupName-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 백업 정보 조회

```http
GET /v1.0/db-instances/{dbInstanceId}/backup-info
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| allowAutoBackup | Body | Boolean | 자동 백업 허용 여부 |
| usePeriodicAutoBackup | Body | Boolean | 예정된 자동 백업 사용 여부 |
| backupPeriod | Body | Number | 백업 보관 기간(일) |
| backupRetryCount | Body | Number | 백업 재시도 횟수 |
| backupSchedules | Body | Array | 백업 스케쥴 목록 |
| backupSchedules.backupWndBgnTime | Body | String | 백업 시작 시각 |
| backupSchedules.backupWndDuration | Body | Enum | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |

<details><summary>예시</summary>
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
            "backupWndDuration": "HALF_AN_HOUR"
        }
    ]
}
```

</p>
</details>

---

### DB 인스턴스 백업 정보 수정하기

```http
PUT /v1.0/db-instances/{dbInstanceId}/backup-info
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| allowAutoBackup | Body | Boolean | X | 자동 백업 허용 여부 |
| usePeriodicAutoBackup | Body | Boolean | X | 예정된 자동 백업 사용 여부 |
| backupPeriod | Body | Number | X | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backupRetryCount | Body | Number | X | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backupSchedules | Body | Array | X | 백업 스케쥴 목록 |
| backupSchedules.backupWndBgnTime | Body | String | O | 백업 시작 시각 |
| backupSchedules.backupWndDuration | Body | Enum | O | 백업 윈도우<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |

<details><summary>예시</summary>
<p>

```json
{
    "allowAutoBackup": false,
    "usePeriodicAutoBackup": false,
    "backupPeriod": 0,
    "backupRetryCount": 0,
    "backupSchedules": [
        {
            "backupWndDuration": "HALF_AN_HOUR"
        }
    ]
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 오브젝트 스토리지로 백업

```http
POST /v1.0/db-instances/{dbInstanceId}/backup-to-object-storage
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| tenantId | Body | String | O | 백업이 저장될 오브젝트 스토리지의 테넌트 ID<br/>- 최소 길이: `32`<br/>- 최대 길이: `32` |
| username | Body | String | O | NHN Cloud 계정 혹은 IAM 회원 ID |
| password | Body | String | O | 백업이 저장될 오브젝트 스토리지의 API 비밀번호 |
| targetContainer | Body | String | O | 백업이 저장될 오브젝트 스토리지의 컨테이너 |
| objectPath | Body | String | O | 컨테이너에 저장될 백업의 경로 |

<details><summary>예시</summary>
<p>

```json
{
    "tenantId": "tenantId-example",
    "username": "username-example",
    "password": "password-example",
    "targetContainer": "targetContainer-example",
    "objectPath": "objectPath-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 데이터베이스 목록 보기

```http
GET /v1.0/db-instances/{dbInstanceId}/databases
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| databases | Body | Array | 데이터베이스 정보 |
| databases.databaseId | Body | String | 데이터베이스의 식별자 |
| databases.databaseName | Body | String | 데이터베이스 이름 |
| databases.databaseStatus | Body | Enum | 데이터베이스의 현재 상태<br/>- STABLE: `사용 가능`<br/>- CREATING: `생성 중`<br/>- MODIFYING: `수정 중`<br/>- DELETING: `삭제 중`<br/>- DELETED: `삭제됨`<br/>- SYNCING: `동기화 중` |
| databases.createdYmdt | Body | DateTime | 생성 일시 |
| databases.updatedYmdt | Body | DateTime | 수정 일시 |
| databases.schemas | Body | Array | 스키마 정보 |
| databases.schemas.schemaName | Body | String | 스키마 이름 |

<details><summary>예시</summary>
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
            "schemas": {
                "schemaName": "schemaName-example"
            }
        }
    ]
}
```

</p>
</details>

---

### 데이터베이스 생성하기

```http
POST /v1.0/db-instances/{dbInstanceId}/databases
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| databaseName | Body | String | O | 데이터베이스 이름 |

<details><summary>예시</summary>
<p>

```json
{
    "databaseName": "databaseName-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 데이터베이스 삭제하기

```http
DELETE /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| databaseId | URL | UUID | O | 데이터베이스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 데이터베이스 수정하기

```http
PUT /v1.0/db-instances/{dbInstanceId}/databases/{databaseId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| databaseId | URL | UUID | O | 데이터베이스의 식별자 |
| applyHbaRulesImmediately | Body | Boolean | X | 연관된 접근 제어 규칙 즉시 적용 여부<br/>- 기본값: `false` |
| databaseName | Body | String | O | 데이터베이스 이름 |

<details><summary>예시</summary>
<p>

```json
{
    "applyHbaRulesImmediately": false,
    "databaseName": "databaseName-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 사용자 목록 보기

```http
GET /v1.0/db-instances/{dbInstanceId}/db-users
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbUsers | Body | Array | DB 사용자 목록 |
| dbUsers.dbUserId | Body | String | DB 사용자의 식별자 |
| dbUsers.dbUserName | Body | String | DB 사용자 계정 이름 |
| dbUsers.authorityType | Body | Enum | DB 사용자 권한 타입<br/>- CUSTOM: `커스텀 권한 권한`<br/>- READ: `READ 권한 (읽기 전용 권한)`<br/>- CRUD: `CRUD 권한 (읽기 권한 포함)`<br/>- DDL: `DDL 권한 (CRUD 권한 포함)` |
| dbUsers.dbUserStatus | Body | Enum | DB 사용자의 현재 상태<br/>- STABLE: `사용 가능`<br/>- CREATING: `생성 중`<br/>- MODIFYING: `수정 중`<br/>- DELETING: `삭제 중`<br/>- DELETED: `삭제됨`<br/>- SYNCING: `동기화 중` |
| dbUsers.createdYmdt | Body | DateTime | 생성 일시 |
| dbUsers.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
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
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### 사용자 생성하기

```http
POST /v1.0/db-instances/{dbInstanceId}/db-users
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| dbUserName | Body | String | O | DB 사용자 계정 이름 |
| dbPassword | Body | String | O | DB 사용자 계정 암호 |
| authorityType | Body | Enum | O | DB 사용자 권한 타입<br/>- CUSTOM: `사용자 정의 권한`<br/>- READ: `읽기 권한`<br/>- CRUD: `CRUD 권한`<br/>- DDL: `DDL 권한` |
| createDefaultHbaRules | Body | Boolean | X | 기본 접근 제어 규칙 생성 여부<br/>- 기본값: `false` |
| address | Body | String | X | 접속 주소 |

<details><summary>예시</summary>
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

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 사용자 삭제하기

```http
DELETE /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| dbUserId | URL | UUID | O | 사용자의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 사용자 수정하기

```http
PUT /v1.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| dbUserId | URL | UUID | O | 사용자의 식별자 |
| dbUserName | Body | String | X | DB 사용자 계정 이름 |
| dbPassword | Body | String | X | DB 사용자 계정 암호 |
| authorityType | Body | Enum | X | DB 사용자 권한<br/>- CUSTOM: `사용자 정의 권한`<br/>- READ: `읽기 권한`<br/>- CRUD: `CRUD 권한`<br/>- DDL: `DDL 권한` |
| applyHbaRulesImmediately | Body | Boolean | X | 접근 제어 변경 사항 즉시 적용 여부<br/>- 기본값: `false` |

<details><summary>예시</summary>
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

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 삭제 보호 설정 변경하기

```http
PUT /v1.0/db-instances/{dbInstanceId}/deletion-protection
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| useDeletionProtection | Body | Boolean | O | 삭제 보호 여부 |

<details><summary>예시</summary>
<p>

```json
{
    "useDeletionProtection": false
}
```

</p>
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### DB 인스턴스 강제 재시작하기

```http
POST /v1.0/db-instances/{dbInstanceId}/force-restart
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 접근 제어 규칙 목록 보기

```http
GET /v1.0/db-instances/{dbInstanceId}/hba-rules
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| hbaRules | Body | Array | 접근 제어 규칙 정보 |
| hbaRules.hbaRuleId | Body | String | 접근 제어 규칙의 식별자 |
| hbaRules.hbaRuleStatus | Body | Enum | 접근 제어 규칙의 현재 상태<br/>- CREATED: `생성됨`<br/>- APPLIED: `적용됨`<br/>- CREATING: `생성 중`<br/>- MODIFYING: `수정 중`<br/>- DELETING: `삭제 중`<br/>- DELETED: `삭제됨` |
| hbaRules.databaseApplyType | Body | Enum | DB 데이터베이스 적용 타입<br/>- ENTIRE: `전체`<br/>- USER_CUSTOM: `사용자 지정` |
| hbaRules.dbUserApplyTypeCode | Body | Enum | DB 사용자 적용 타입<br/>- ENTIRE: `전체`<br/>- USER_CUSTOM: `사용자 지정` |
| hbaRules.databases | Body | Array | 사용자 지정 데이터베이스 리스트 |
| hbaRules.databases.databaseId | Body | String | 데이터베이스 ID |
| hbaRules.databases.databaseName | Body | String | 데이터베이스 이름 |
| hbaRules.dbUsers | Body | Array | 사용자 지정 DB 사용자 리스트 |
| hbaRules.dbUsers.dbUserId | Body | String | DB 사용자 ID |
| hbaRules.dbUsers.dbUserName | Body | String | DB 사용자 이름 |
| hbaRules.address | Body | String | 접속 주소 |
| hbaRules.authMethod | Body | Enum | 인증 방식<br/>- TRUST: `트러스트 (패스워드 불필요)`<br/>- REJECT: `접속 차단`<br/>- SCRAM_SHA_256: `패스워드 (SCRAM-SHA-256)` |
| hbaRules.reservedAction | Body | Enum | 예약된 작업 내용<br/>- NONE: `없음`<br/>- CREATE: `생성 예약 (적용 필요)`<br/>- MODIFY: `수정 예약 (적용 필요)`<br/>- DELETE: `삭제 예약 (적용 필요)` |
| hbaRules.order | Body | Number | 규칙 적용 순서 |
| hbaRules.applicable | Body | Boolean | 적용 가능 여부 |
| needToApply | Body | Boolean | 변경사항 적용 필요 여부 |

<details><summary>예시</summary>
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
            "applicable": false
        }
    ],
    "needToApply": false
}
```

</p>
</details>

---

### DB 인스턴스 접근제어 규칙 추가

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| connectionTypeCode | Body | Enum | X | 접근 제어 레코드 타입<br/>- HOST: `TCP/IP로 접속 시 유효`<br/>- HOST_NO_SSL: `SSL 암호화를 사용하지 않는 접속 시에만 유효` |
| databaseApplyType | Body | Enum | O | Database 적용 타입<br/>- ENTIRE: `전체`<br/>- USER_CUSTOM: `사용자 지정` |
| dbUserApplyType | Body | Enum | O | DB 사용자 적용 타입<br/>- ENTIRE: `전체`<br/>- USER_CUSTOM: `사용자 지정` |
| databaseIds | Body | Array | X | 데이터베이스의 식별자 목록 |
| dbUserIds | Body | Array | X | DB 사용자의 식별자 목록 |
| address | Body | String | O | 접속 주소 |
| authMethod | Body | Enum | O | 인증 방식<br/>- TRUST: `트러스트 (패스워드 불필요)`<br/>- REJECT: `접속 차단`<br/>- SCRAM_SHA_256: `패스워드 (SCRAM-SHA-256)` |

<details><summary>예시</summary>
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

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| hbaRuleId | Body | String | 접근 제어 규칙 ID |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "hbaRuleId": "hbaRuleId-example"
}
```

</p>
</details>

---

### DB 인스턴스 접근제어 규칙 적용

```http
POST /v1.0/db-instances/{dbInstanceId}/hba-rules/apply
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 접근제어 규칙 순서 조정

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/orders
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| hbaRuleIds | Body | Array | O | 정렬된 접속제어 규칙 ID 리스트 (요청받은 순서대로 저장) |

<details><summary>예시</summary>
<p>

```json
{
    "hbaRuleIds": []
}
```

</p>
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### DB 인스턴스 접근제어 설정 삭제

```http
DELETE /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| hbaRuleId | URL | UUID | O | 접근제어 규칙의 식별자 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### DB 인스턴스 접근제어 규칙 수정

```http
PUT /v1.0/db-instances/{dbInstanceId}/hba-rules/{hbaRuleId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| hbaRuleId | URL | UUID | O | 접근제어 규칙의 식별자 |
| connectionTypeCode | Body | Enum | X | 접근 제어 레코드 타입<br/>- HOST: `TCP/IP로 접속 시 유효`<br/>- HOST_NO_SSL: `SSL 암호화를 사용하지 않는 접속 시에만 유효` |
| databaseApplyType | Body | Enum | O | Database 적용 타입<br/>- ENTIRE: `전체`<br/>- USER_CUSTOM: `사용자 지정` |
| dbUserApplyType | Body | Enum | O | DB 사용자 적용 타입<br/>- ENTIRE: `전체`<br/>- USER_CUSTOM: `사용자 지정` |
| databaseIds | Body | Array | X | 데이터베이스의 식별자 목록 |
| dbUserIds | Body | Array | X | DB 사용자의 식별자 목록 |
| address | Body | String | O | 접속 주소 |
| authMethod | Body | Enum | O | 인증 방식<br/>- TRUST: `트러스트 (패스워드 불필요)`<br/>- REJECT: `접속 차단`<br/>- SCRAM_SHA_256: `패스워드 (SCRAM-SHA-256)` |

<details><summary>예시</summary>
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

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 고가용성 정보 조회

```http
GET /v1.0/db-instances/{dbInstanceId}/high-availability
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| haStatus | Body | Enum | 고가용성 상태<br/>- CREATED: `생성됨`<br/>- STABLE: `정상`<br/>- PAUSING: `일시 중지 중`<br/>- DISABLE: `정지`<br/>- DISABLE_MASTER_IN_REPLICATION: `마스터 비정상 복제 감지로 인한 고가용성 중단`<br/>- DISABLE_MHA_PROCESS: `고가용성 프로세스 중단`<br/>- DISABLE_REPLICATION_STOP: `복제 중단으로 인한 고가용성 중단`<br/>- DISABLE_REPLICATION_DELAY: `복제 지연으로 인한 고가용성 중단`<br/>- FAILOVER_STARTED: `장애 조치 시작`<br/>- FAILOVER_FAILED: `장애 조치 실패`<br/>- FAILOVER_COMPLETED: `장애 조치 완료`<br/>- DELETED: `삭제됨`<br/>- PAUSED: `일시 중지`<br/>- PAUSED_DUE_TO_TASK: `작업으로 인한 일시 중지`<br/>- MASTER_FAILURE_DETECTION: `마스터 장애 감지` |
| pingInterval | Body | Number | Ping 간격(초) |
| failoverReplWaitingTime | Body | Number | 장애조치 복제 지연 대기 시간(초) |

<details><summary>예시</summary>
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

### 고가용성 수정하기

```http
PUT /v1.0/db-instances/{dbInstanceId}/high-availability
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| useHighAvailability | Body | Boolean | O | 고가용성 사용 여부 |
| pingInterval | Body | Number | X | Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| failoverReplWaitingTime | Body | Number | X | 장애조치 복제 지연 대기 시간(초)<br/>- 최솟값: `-1` |

<details><summary>예시</summary>
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

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 고가용성 일시 중지하기

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 고가용성 복구하기

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 고가용성 다시 시작하기

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 고가용성 분리하기

```http
POST /v1.0/db-instances/{dbInstanceId}/high-availability/split
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 유지보수 정보 조회

```http
GET /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| allowAutoMaintenance | Body | Boolean | 자동 유지보수 허용 여부 |
| useAutoStorageCleanup | Body | Boolean | 자동 스토리지 정리 사용 여부 |
| maintWndBgnTime | Body | String | 자동 유지보수 시작 시간 |
| maintWndDuration | Body | Enum | 유지보수 윈도우<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |
| logRetentionPeriod | Body | Number | 로그 보관 기간 (일) |

<details><summary>예시</summary>
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
    "maintWndBgnTime": "maintWndBgnTime-example",
    "maintWndDuration": "HALF_AN_HOUR",
    "logRetentionPeriod": 1
}
```

</p>
</details>

---

### DB 인스턴스 유지보수 정보 수정

```http
PUT /v1.0/db-instances/{dbInstanceId}/maintenance-info
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| allowAutoMaintenance | Body | Boolean | X | 자동 유지보수 허용 여부 |
| useAutoStorageCleanup | Body | Boolean | X | 자동 스토리지 정리 사용 여부 |
| maintWndBgnTime | Body | String | X | 자동 유지보수 시작 시간 |
| maintWndDuration | Body | Enum | X | 유지보수 윈도우<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |
| logRetentionPeriod | Body | Number | X | 로그 보관 기간 (일)<br/>- 최솟값: `1`<br/>- 최댓값: `30` |

<details><summary>예시</summary>
<p>

```json
{
    "allowAutoMaintenance": false,
    "useAutoStorageCleanup": false,
    "maintWndBgnTime": "maintWndBgnTime-example",
    "maintWndDuration": "HALF_AN_HOUR",
    "logRetentionPeriod": 1
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 네트워크 정보 조회

```http
GET /v1.0/db-instances/{dbInstanceId}/network-info
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| availabilityZone | Body | Enum | DB 인스턴스를 생성할 가용성 영역 |
| subnet | Body | Object | 서브넷 정보 |
| subnet.subnetId | Body | String | 서브넷의 식별자 |
| subnet.subnetName | Body | String | 서브넷을 식별할 수 있는 이름 |
| subnet.subnetCidr | Body | String | 서브넷의 CIDR |
| subnet.publicAccessible | Body | Boolean | 퍼블릭 접근 가능 여부 |
| endPoints | Body | Array | 접속 정보 |
| endPoints.domain | Body | String | 도메인 |
| endPoints.ipAddress | Body | String | IP 주소 |
| endPoints.endPointType | Body | String | 접속 정보 타입 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "availabilityZone": "ENUM_VALUE",
    "subnet": {
        "subnetId": "subnetId-example",
        "subnetName": "subnetName-example",
        "subnetCidr": "subnetCidr-example",
        "publicAccessible": false
    },
    "endPoints": [
        {
            "endPointType": "endPointType-example"
        }
    ]
}
```

</p>
</details>

---

### DB 인스턴스 네트워크 정보 수정하기

```http
PUT /v1.0/db-instances/{dbInstanceId}/network-info
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| usePublicAccess | Body | Boolean | O | 외부 접속 가능 여부 |

<details><summary>예시</summary>
<p>

```json
{
    "usePublicAccess": false
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 승격하기

```http
POST /v1.0/db-instances/{dbInstanceId}/promote
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 읽기 복제본 생성

```http
POST /v1.0/db-instances/{dbInstanceId}/replicate
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| dbInstanceName | Body | String | O | DB 인스턴스를 식별할 수 있는 이름 |
| description | Body | String | X | DB 인스턴스에 대한 추가 정보 |
| dbFlavorId | Body | UUID | X | DB 인스턴스 사양의 식별자 |
| dbPort | Body | Number | X | DB 포트<br/>- 최솟값: 5432, 최댓값: 45432 |
| parameterGroupId | Body | UUID | X | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Body | Array | X | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Body | Array | X | 사용자 그룹의 식별자 목록 |
| useDefaultNotification | Body | Boolean | X | 기본 알림 사용 여부<br/>- 기본값: `false` |
| useDeletionProtection | Body | Boolean | X | 삭제 보호 여부<br/>- 기본값: `false` |
| network | Body | Object | X | 네트워크 정보 객체 |
| network.usePublicAccess | Body | Boolean | X | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Body | Enum | X | DB 인스턴스를 생성할 가용성 영역 |
| storage | Body | Object | X | 스토리지 정보 객체 |
| storage.storageType | Body | Enum | X | 데이터 스토리지 타입 |
| storage.storageSize | Body | Number | X | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20`<br/>- 최댓값: `2048` |

<details><summary>예시</summary>
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
        "availabilityZone": "ENUM_VALUE"
    },
    "storage": {
        "storageType": "ENUM_VALUE",
        "storageSize": 20
    }
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 재시작하기

```http
POST /v1.0/db-instances/{dbInstanceId}/restart
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 복원 정보 조회

```http
GET /v1.0/db-instances/{dbInstanceId}/restoration-info
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| oldestRestorableYmdt | Body | DateTime | 가장 오래된 복원 가능한 시각 |
| latestRestorableYmdt | Body | DateTime | 가장 최신의 복원 가능한 시각 |
| restorableBackups | Body | Array | 복원 가능한 백업 목록 |
| restorableBackups.backupId | Body | String | 백업의 식별자 |
| restorableBackups.backupName | Body | String | 백업 이름 |
| restorableBackups.backupStatus | Body | Enum | 백업 상태<br/>- BACKING_UP: `백업 중 (스피너)`<br/>- VERIFYING: `검증 중 (스피너)`<br/>- COMPLETED: `사용 가능 (녹색 아이콘)`<br/>- DELETING: `삭제 중 (스피너)`<br/>- DELETED: `삭제 됨 (회색 아이콘)`<br/>- ERROR: `에러 (적색 아이콘)` |
| restorableBackups.dbInstanceId | Body | String | 원본 DB 인스턴스의 식별자 |
| restorableBackups.dbInstanceName | Body | String | 원본 DB 인스턴스의 이름 |
| restorableBackups.dbVersion | Body | Enum | DB 엔진 유형 |
| restorableBackups.backupType | Body | Enum | 백업 유형<br/>- AUTO<br/>- MANUAL |
| restorableBackups.backupSize | Body | Number | 백업 크기 |
| restorableBackups.failoverCount | Body | Number | 장애 조치 횟수 |
| restorableBackups.walFileName | Body | String | WAL 로그 파일 이름 |
| restorableBackups.createdYmdt | Body | DateTime | 백업 생성 일시 |
| restorableBackups.updatedYmdt | Body | DateTime | 백업 갱신 일시 |
| restorableBackups.startYmdt | Body | DateTime | 백업 시작 일시 |
| restorableBackups.completedYmdt | Body | DateTime | 백업 완료 일시 |

<details><summary>예시</summary>
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
            "completedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### DB 인스턴스 복원

```http
POST /v1.0/db-instances/{dbInstanceId}/restore
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| dbInstanceName | Body | String | X | DB 인스턴스를 식별할 수 있는 이름 |
| dbInstanceCandidateName | Body | String | X | DB 인스턴스를 식별할 수 있는 예비 마스터 이름 |
| description | Body | String | X | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbFlavorId | Body | UUID | O | DB 인스턴스 사양의 식별자 |
| dbPort | Body | Number | X | DB 포트<br/>- 최솟값: 5432, 최댓값: 45432 |
| useHighAvailability | Body | Boolean | X | 고가용성 사용 여부<br/>- 기본값: `false` |
| imageId | Body | UUID | X | 이미지의 식별자 |
| pingInterval | Body | Number | X | 고가용성 사용 시 Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| failoverReplWaitingTime | Body | Number | X | 장애조치 복제 지연 대기 시간(초)<br/>- 최솟값: `-1` |
| storage | Body | Object | O | 스토리지 정보 객체 |
| storage.storageType | Body | Enum | O | 스토리지 타입 |
| storage.storageSize | Body | Number | O | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| network | Body | Object | O | 네트워크 정보 객체 |
| network.subnetId | Body | UUID | O | 서브넷의 식별자 |
| network.usePublicAccess | Body | Boolean | X | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Body | Enum | X | DB 인스턴스를 생성할 가용성 영역 |
| backup | Body | Object | O | 백업 정보 객체 |
| backup.backupPeriod | Body | Number | O | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.backupRetryCount | Body | Number | X | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.replicationRegion | Body | Enum | X | 백업 복제 리전<br/>- KR1: `한국(판교)`<br/>- KR2: `한국(평촌)` |
| backup.backupSchedules | Body | Array | O | 백업 스케쥴 목록 |
| backup.backupSchedules.backupWndBgnTime | Body | String | O | 백업 시작 시각 |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |
| restore | Body | Object | O | 복원 정보 객체 |
| restore.restoreType | Body | Enum | O | 복원 타입<br/>- BACKUP: `기존에 생성한 백업을 이용한 복원`<br/>- TIMESTAMP: `복원 가능한 시간 이내의 시간을 이용한 시점 복원` |
| restore.restoreYmdt | Body | DateTime | X | DB 인스턴스 복원 일시 |
| restore.backupId | Body | UUID | X | 복원에 사용할 백업의 식별자 |
| useDefaultNotification | Body | Boolean | X | 기본 알림 사용 여부<br/>- 기본값: `false` |
| parameterGroupId | Body | UUID | O | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Body | Array | X | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Body | Array | X | 사용자 그룹의 식별자 목록 |
| useDeletionProtection | Body | Boolean | X | 삭제 보호 여부<br/>- 기본값: `false` |

<details><summary>예시</summary>
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
        "storageType": "ENUM_VALUE",
        "storageSize": 20
    },
    "network": {
        "subnetId": "550e8400-e29b-41d4-a716-446655440000",
        "usePublicAccess": false,
        "availabilityZone": "ENUM_VALUE"
    },
    "backup": {
        "backupPeriod": 0,
        "backupRetryCount": 0,
        "replicationRegion": "KR1",
        "backupSchedules": [
            {
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

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 시작하기

```http
POST /v1.0/db-instances/{dbInstanceId}/start
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 정지하기

```http
POST /v1.0/db-instances/{dbInstanceId}/stop
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### DB 인스턴스 스토리지 정보 조회

```http
GET /v1.0/db-instances/{dbInstanceId}/storage-info
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| storageType | Body | Enum | 데이터 스토리지 타입 |
| storageSize | Body | Number | 데이터 스토리지 크기(GB) |
| storageStatus | Body | Enum | 데이터 스토리지의 현재 상태<br/>- DELETED: `삭제됨`<br/>- PENDING_DELETION: `삭제 유예됨`<br/>- DELETION_RESERVED: `삭제 예약됨 (스냅샷 정리 대기)`<br/>- DETACHED: `해제됨`<br/>- ATTACHED: `할당됨` |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "storageType": "ENUM_VALUE",
    "storageSize": 1,
    "storageStatus": "DELETED"
}
```

</p>
</details>

---

### DB 인스턴스 스토리지 정보 수정하기

```http
PUT /v1.0/db-instances/{dbInstanceId}/storage-info
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| storageSize | Body | Number | O | 데이터 스토리지 크기(GB)<br/>- 최댓값: `2048` |

<details><summary>예시</summary>
<p>

```json
{
    "storageSize": 1
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

## DB 인스턴스 그룹

### DB 인스턴스 그룹 목록 보기

```http
GET /v1.0/db-instance-groups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbInstanceGroups | Body | Array | DB 인스턴스 그룹 정보 |
| dbInstanceGroups.dbInstanceGroupId | Body | String | DB 인스턴스 그룹의 식별자 |
| dbInstanceGroups.dbInstanceGroupStatus | Body | Enum | DB 인스턴스 그룹의 현재 형태<br/>- CREATED: `생성됨`<br/>- DELETED: `삭제됨` |
| dbInstanceGroups.replicationType | Body | Enum | DB 인스턴스 그룹의 복제 형태<br/>- STANDALONE: `고가용성 사용 안함`<br/>- HIGH_AVAILABILITY: `고가용성 사용` |
| dbInstanceGroups.createdYmdt | Body | DateTime | 생성 일시 |
| dbInstanceGroups.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
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
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### DB 인스턴스 그룹 상세 보기

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbInstanceGroupId | Body | String | DB 인스턴스 그룹의 식별자 |
| dbInstanceGroupStatus | Body | Enum | DB 인스턴스 그룹의 현재 상태<br/>- CREATED: `생성됨`<br/>- DELETED: `삭제됨` |
| replicationType | Body | Enum | DB 인스턴스 그룹의 복제 형태<br/>- STANDALONE: `고가용성 사용 안함`<br/>- HIGH_AVAILABILITY: `고가용성 사용` |
| dbInstances | Body | Array | DB 인스턴스 그룹에 속한 DB 인스턴스 목록 |
| dbInstances.dbInstanceId | Body | String | DB 인스턴스의 식별자 |
| dbInstances.dbInstanceType | Body | Enum | DB 인스턴스의 역할 타입<br/>- MASTER: `마스터`<br/>- FAILED_MASTER: `장애 마스터`<br/>- CANDIDATE_MASTER: `예비 마스터`<br/>- READ_ONLY_SLAVE: `읽기 복제본` |
| dbInstances.dbInstanceStatus | Body | Enum | DB 인스턴스의 현재 상태<br/>- BEFORE_CREATE: `생성 이전 (회색)`<br/>- AVAILABLE: `사용 가능 (녹색)`<br/>- STORAGE_FULL: `용량 부족 (적색)`<br/>- FAIL_TO_CREATE: `생성 실패 (적색)`<br/>- FAIL_TO_CONNECT: `연결 실패 (적색)`<br/>- REPLICATION_STOP: `복제 중단 (적색)`<br/>- REPLICATION_DELAY: `복제 지연 (황색)`<br/>- FAILOVER: `장애 조치 완료 (적색)`<br/>- SHUTDOWN: `중지 됨 (회색)`<br/>- DELETED: `삭제됨 (회색)` |
| createdYmdt | Body | DateTime | 생성 일시 |
| updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstanceGroupId": "dbInstanceGroupId-example",
    "dbInstanceGroupStatus": "CREATED",
    "replicationType": "STANDALONE",
    "dbInstances": [
        {
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

### 확장 리스트 조회

```http
GET /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DB 인스턴스 그룹 ID |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| extensions | Body | Array | 확장 정보 |
| extensions.extensionId | Body | String | 확장 ID |
| extensions.extensionName | Body | String | 확장 이름 |
| extensions.extensionStatus | Body | Enum | 확장 상태<br/>- AVAILABLE: `사용 가능`<br/>- NEED_TO_APPLY: `적용 필요`<br/>- APPLYING: `적용 중` |
| extensions.databases | Body | Array | 데이터베이스 정보 |
| extensions.databases.dbInstanceGroupExtensionId | Body | String | DB 인스턴스 그룹 확장 ID |
| extensions.databases.databaseId | Body | String | 데이터베이스 ID |
| extensions.databases.databaseName | Body | String | 데이터베이스 이름 |
| extensions.databases.dbInstanceGroupExtensionStatus | Body | Enum | 데이터베이스 확장 설치 상태<br/>- CREATED: `생성 됨`<br/>- INSTALLED: `설치 됨`<br/>- INSTALLING: `설치 중`<br/>- INSTALL_ERROR: `설치 에러`<br/>- DELETED: `삭제 됨`<br/>- DELETING: `삭제 중`<br/>- DELETE_ERROR: `삭제 에러` |
| extensions.databases.reservedAction | Body | Enum | 예약 작업<br/>- NONE: `없음`<br/>- INSTALL: `설치 예약 (적용 필요)`<br/>- INSTALL_WITH_CASCADE: `강제 설치 예약 (적용 필요)`<br/>- DELETE: `삭제 예약 (적용 필요)`<br/>- DELETE_WITH_CASCADE: `강제 삭제 예약 (적용 필요)` |
| extensions.databases.errorReason | Body | String | 에러 원인 |
| isNeedToApply | Body | Boolean | 적용 필요 여부 |

<details><summary>예시</summary>
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
            "databases": {
                "errorReason": "errorReason-example"
            }
        }
    ],
    "isNeedToApply": false
}
```

</p>
</details>

---

### 확장 변경사항 적용

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/apply
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DB 인스턴스 그룹 ID |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 확장 동기화

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/sync
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DB 인스턴스 그룹 ID |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 확장 삭제(취소)

```http
DELETE /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{dbInstanceGroupExtensionId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DB 인스턴스 그룹 ID |
| dbInstanceGroupExtensionId | URL | UUID | O | DB 인스턴스 그룹 확장 ID |
| withCascade | Query | Boolean | O | 강제 삭제 여부 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 확장 설치

```http
POST /v1.0/db-instance-groups/{dbInstanceGroupId}/extensions/{extensionId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O | DB 인스턴스 그룹 ID |
| extensionId | URL | UUID | O | 확장 ID |
| databaseId | Body | UUID | O | 데이터베이스 ID |
| schemaName | Body | String | O | 스키마 이름 |
| withCascade | Body | Boolean | X | 연관 정보 자동 설치 여부<br/>- 기본값: `false` |

<details><summary>예시</summary>
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

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

## db-flavors

### DB 인스턴스 유형 목록 보기

```http
GET /v1.0/db-flavors
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbFlavors | Body | Array | DB 인스턴스 사양 정보 |
| dbFlavors.dbFlavorId | Body | String | DB 인스턴스 사양의 식별자 |
| dbFlavors.dbFlavorName | Body | String | DB 인스턴스 사양명 |
| dbFlavors.ram | Body | Number | 메모리 용량(MB) |
| dbFlavors.vcpus | Body | Number | CPU 코어 수 |

<details><summary>예시</summary>
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
            "vcpus": 2
        }
    ]
}
```

</p>
</details>

---

## db-versions

### DB 버전 목록 보기

```http
GET /v1.0/db-versions
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbVersions | Body | Array | DB 버전 정보 |
| dbVersions.dbVersionCode | Body | Enum | DB 버전 코드<br/>- MYSQL_V5633<br/>- MYSQL_V5715<br/>- MYSQL_V5719<br/>- MYSQL_V5726<br/>- MYSQL_V5731<br/>- MYSQL_V5733<br/>- MYSQL_V5737<br/>- MYSQL_V8018<br/>- MYSQL_V8023<br/>- MYSQL_V8028<br/>- MYSQL_V8032<br/>- MYSQL_V8033<br/>- MYSQL_V8034<br/>- MYSQL_V8035<br/>- MYSQL_V8036<br/>- MYSQL_V8040<br/>- MYSQL_V8041<br/>- MYSQL_V8042<br/>- MYSQL_V8043<br/>- MYSQL_V8044<br/>- MYSQL_V8045<br/>- MYSQL_V8405<br/>- MYSQL_V8406<br/>- MYSQL_V8407<br/>- MYSQL_V8408<br/>- MARIADB_V10330<br/>- MARIADB_V10611<br/>- MARIADB_V10612<br/>- MARIADB_V10616<br/>- MARIADB_V10622<br/>- MARIADB_V10625<br/>- MARIADB_V101107<br/>- MARIADB_V101108<br/>- MARIADB_V101113<br/>- MARIADB_V101116<br/>- MARIADB_V11407<br/>- MARIADB_V11410<br/>- MARIADB_V11806<br/>- POSTGRESQL_V14_6<br/>- POSTGRESQL_V14_15<br/>- POSTGRESQL_V14_17<br/>- POSTGRESQL_V14_19<br/>- POSTGRESQL_V17_2<br/>- POSTGRESQL_V17_4<br/>- POSTGRESQL_V17_6 |
| dbVersions.dbMajorVersionCode | Body | Enum | DB 메이저 버전 코드<br/>- MYSQL_V56<br/>- MYSQL_V57<br/>- MYSQL_V80<br/>- MYSQL_V84<br/>- MARIADB_V103<br/>- MARIADB_V106<br/>- MARIADB_V1011<br/>- MARIADB_V114<br/>- MARIADB_V118<br/>- POSTGRES_V14<br/>- POSTGRES_V17 |
| dbVersions.name | Body | String | DB 버전명 |
| dbVersions.canCreate | Body | Boolean | 신규 생성 가능 여부 |

<details><summary>예시</summary>
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
            "canCreate": false
        }
    ]
}
```

</p>
</details>

---

## event-codes

### 구독 가능한 이벤트 코드 목록 보기

```http
GET /v1.0/event-codes
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| eventCodes | Body | Array | 이벤트 코드 목록 |
| eventCodes.eventCode | Body | Enum | 이벤트 코드 |
| eventCodes.eventCategoryType | Body | Enum | 이벤트 카테고리 유형<br/>- ALL: `전체`<br/>- DB_INSTANCE: `DB 인스턴스로 발생한 이벤트`<br/>- DB_SECURITY_GROUP: `DB 보안 그룹으로 발생한 이벤트`<br/>- MONITORING: `모니터링으로 발생한 이벤트`<br/>- JOB: `JOB으로 발생한 이벤트`<br/>- BACKUP: `백업으로 발생한 이벤트`<br/>- TENANT: `테넌트로 발생한 이벤트` |

<details><summary>예시</summary>
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
            "eventCategoryType": "ALL"
        }
    ]
}
```

</p>
</details>

---

## events

### 이벤트 목록 보기

```http
GET /v1.0/events
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | 전체 이벤트 목록 수 |
| events | Body | Array | 이벤트 목록 |
| events.eventCategoryType | Body | Enum | 이벤트 카테고리 유형<br/>- ALL: `전체`<br/>- DB_INSTANCE: `DB 인스턴스로 발생한 이벤트`<br/>- DB_SECURITY_GROUP: `DB 보안 그룹으로 발생한 이벤트`<br/>- MONITORING: `모니터링으로 발생한 이벤트`<br/>- JOB: `JOB으로 발생한 이벤트`<br/>- BACKUP: `백업으로 발생한 이벤트`<br/>- TENANT: `테넌트로 발생한 이벤트` |
| events.eventCode | Body | Enum | 발생한 이벤트의 유형 |
| events.sourceId | Body | String | 이벤트 소스의 식별자 |
| events.sourceName | Body | String | 이벤트 소스를 식별할 수 있는 이름 |
| events.messages | Body | Array | 이벤트 메세지 목록 |
| events.messages.langCode | Body | Enum | 언어 코드<br/>- KO<br/>- EN<br/>- JA<br/>- ZH |
| events.messages.message | Body | String | 이벤트 메세지 |
| events.eventYmdt | Body | DateTime | 이벤트 발생 일시 |

<details><summary>예시</summary>
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
            "eventYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

## metric-statistics

### 통계 정보 조회

```http
GET /v1.0/metric-statistics
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

## metrics

### 성능 지표 목록 보기

```http
GET /v1.0/metrics
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| metrics | Body | Array | Metric 목록 |
| metrics.metricName | Body | String | 조회 지표 유형 |
| metrics.unit | Body | String | 측정값 단위 |

<details><summary>예시</summary>
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
            "unit": "unit-example"
        }
    ]
}
```

</p>
</details>

---

## network

### 서브넷 목록 보기

```http
GET /v1.0/network/subnets
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| subnets | Body | Array | 서브넷 정보 |
| subnets.subnetId | Body | String | 서브넷의 식별자 |
| subnets.subnetName | Body | String | 서브넷을 식별할 수 있는 이름 |
| subnets.subnetCidr | Body | String | 서브넷의 CIDR |
| subnets.usingGateway | Body | Boolean | 게이트웨이 사용 여부 |
| subnets.availableIpCount | Body | Number | 사용 가능한 IP 수 |

<details><summary>예시</summary>
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
            "availableIpCount": 1
        }
    ]
}
```

</p>
</details>

---

## storage-types

### 스토리지 유형 목록 보기

```http
GET /v1.0/storage-types
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| storageTypes | Body | Array | 스토리지 유형 정보 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "storageTypes": []
}
```

</p>
</details>

---

## 백업

### 백업 상태

| 상태           | 설명           |
|--------------|--------------|
| `BACKING_UP` | 백업 중인 경우     |
| `COMPLETED`  | 백업이 완료된 경우   |
| `DELETING`   | 백업이 삭제 중인 경우 |
| `DELETED`    | 백업이 삭제된 경우   |
| `ERROR`      | 오류가 발생한 경우   |

### 백업 목록 보기

```http
GET /v1.0/backups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | 전체 백업 목록 수 |
| backups | Body | Array | 백업 목록 |
| backups.backupId | Body | String | 백업의 식별자 |
| backups.backupName | Body | String | 백업을 식별할 수 있는 이름 |
| backups.backupStatus | Body | Enum | 백업의 현재 상태<br/>- BACKING_UP: `백업 중 (스피너)`<br/>- VERIFYING: `검증 중 (스피너)`<br/>- COMPLETED: `사용 가능 (녹색 아이콘)`<br/>- DELETING: `삭제 중 (스피너)`<br/>- DELETED: `삭제 됨 (회색 아이콘)`<br/>- ERROR: `에러 (적색 아이콘)` |
| backups.dbInstanceId | Body | String | 원본 DB 인스턴스의 식별자 |
| backups.dbVersion | Body | Enum | DB 엔진 버전 |
| backups.backupType | Body | Enum | 백업 유형<br/>- AUTO<br/>- MANUAL |
| backups.backupSize | Body | Number | 백업의 크기(Byte) |
| backups.startYmdt | Body | DateTime | 시작 일시 |
| backups.createdYmdt | Body | DateTime | 생성 일시 |
| backups.updatedYmdt | Body | DateTime | 수정 일시 |
| backups.completedYmdt | Body | DateTime | 완료 일시 |

<details><summary>예시</summary>
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
            "completedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### 백업 삭제하기

```http
DELETE /v1.0/backups/{backupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O | 백업의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 백업 내보내기

```http
POST /v1.0/backups/{backupId}/export
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O | 백업의 식별자 |
| tenantId | Body | String | O | 백업이 저장될 오브젝트 스토리지의 테넌트 ID<br/>- 최소 길이: `32`<br/>- 최대 길이: `32` |
| username | Body | String | O | NHN Cloud 계정 혹은 IAM 회원 ID |
| password | Body | String | O | 백업이 저장될 오브젝트 스토리지의 API 비밀번호 |
| targetContainer | Body | String | O | 백업이 저장될 오브젝트 스토리지의 컨테이너 |
| objectPath | Body | String | O | 컨테이너에 저장될 백업의 경로 |

<details><summary>예시</summary>
<p>

```json
{
    "tenantId": "tenantId-example",
    "username": "username-example",
    "password": "password-example",
    "targetContainer": "targetContainer-example",
    "objectPath": "objectPath-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

### 백업 복원하기

```http
POST /v1.0/backups/{backupId}/restore
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O | 백업의 식별자 |
| dbInstanceName | Body | String | O | DB 인스턴스를 식별할 수 있는 이름 |
| dbInstanceCandidateName | Body | String | X | DB 인스턴스를 식별할 수 있는 예비 마스터 이름 |
| description | Body | String | X | DB 인스턴스에 대한 추가 정보 |
| dbFlavorId | Body | UUID | O | DB 인스턴스 사양의 식별자 |
| dbPort | Body | Number | O | DB 포트<br/>- 최솟값: 5432, 최댓값: 45432 |
| parameterGroupId | Body | UUID | O | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Body | Array | X | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Body | Array | X | 사용자 그룹의 식별자 목록 |
| useHighAvailability | Body | Boolean | X | 고가용성 사용 여부<br/>- 기본값: `false` |
| useDefaultNotification | Body | Boolean | X | 기본 알림 사용 여부<br/>- 기본값: `false` |
| useDeletionProtection | Body | Boolean | X | 삭제 보호 여부<br/>- 기본값: `false` |
| pingInterval | Body | Number | X | Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| failoverReplWaitingTime | Body | Number | X | 장애조치 복제 지연 대기 시간(초)<br/>- 최솟값: `-1` |
| network | Body | Object | O | 네트워크 정보 객체 |
| network.subnetId | Body | UUID | O | 서브넷의 식별자 |
| network.usePublicAccess | Body | Boolean | X | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Body | Enum | X | DB 인스턴스를 생성할 가용성 영역 |
| storage | Body | Object | O | 스토리지 정보 객체 |
| storage.storageType | Body | Enum | O | 스토리지 타입 |
| storage.storageSize | Body | Number | O | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| backup | Body | Object | O | 백업 정보 객체 |
| backup.backupPeriod | Body | Number | O | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.backupRetryCount | Body | Number | X | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.backupSchedules | Body | Array | O | 백업 스케쥴 목록 |
| backup.backupSchedules.backupWndBgnTime | Body | String | O | 백업 시작 시간 |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |

<details><summary>예시</summary>
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
        "availabilityZone": "ENUM_VALUE"
    },
    "storage": {
        "storageType": "ENUM_VALUE",
        "storageSize": 20
    },
    "backup": {
        "backupPeriod": 0,
        "backupRetryCount": 0,
        "backupSchedules": [
            {
                "backupWndDuration": "HALF_AN_HOUR"
            }
        ]
    }
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
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

## 사용자 그룹

### 사용자 그룹 목록 보기

```http
GET /v1.0/user-groups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| userGroups | Body | Array | 사용자 그룹 정보 |
| userGroups.userGroupId | Body | String | 사용자 그룹의 식별자 |
| userGroups.userGroupName | Body | String | 사용자 그룹을 식별할 수 있는 이름 |
| userGroups.userGroupStatus | Body | Enum | 사용자 그룹의 현재 상태<br/>- CREATED<br/>- DELETED |
| userGroups.createdYmdt | Body | DateTime | 생성 일시 |
| userGroups.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
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
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### 사용자 그룹 생성하기

```http
POST /v1.0/user-groups
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| userGroupName | Body | String | O | 사용자 그룹을 식별할 수 있는 이름 |
| memberIds | Body | Array | O | 프로젝트 멤버의 식별자 목록 |
| selectAllYN | Body | Boolean | O | 프로젝트 멤버 전체 유무<br/>- 기본값: `false` |

<details><summary>예시</summary>
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

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| userGroupId | Body | String | 사용자 그룹의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "userGroupId": "userGroupId-example"
}
```

</p>
</details>

---

### 사용자 그룹 삭제하기

```http
DELETE /v1.0/user-groups/{userGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O | 사용자 그룹 ID |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 사용자 그룹 상세 보기

```http
GET /v1.0/user-groups/{userGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O | 사용자 그룹 ID |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| userGroupId | Body | String | 사용자 그룹의 식별자 |
| userGroupName | Body | String | 사용자 그룹을 식별할 수 있는 이름 |
| userGroupTypeCode | Body | Enum | 사용자 그룹 종류<br/>- ENTIRE: `전체 프로젝트 멤버`<br/>- INDIVIDUAL_MEMBER: `사용자 지정` |
| userGroupStatus | Body | Enum | 사용자 그룹의 현재 상태<br/>- CREATED<br/>- DELETED |
| members | Body | Array | 프로젝트 멤버 목록 |
| members.memberId | Body | String | 프로젝트 멤버의 식별자 |
| createdYmdt | Body | DateTime | 생성 일시 |
| updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "userGroupId": "userGroupId-example",
    "userGroupName": "userGroupName-example",
    "userGroupTypeCode": "ENTIRE",
    "userGroupStatus": "CREATED",
    "members": [
        {
            "memberId": "memberId-example"
        }
    ],
    "createdYmdt": "2023-12-31T15:00:00+09:00",
    "updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</p>
</details>

---

### 사용자 그룹 수정하기

```http
PUT /v1.0/user-groups/{userGroupId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O | 사용자 그룹 ID |
| userGroupName | Body | String | X | 사용자 그룹을 식별할 수 있는 이름 |
| memberIds | Body | Array | X | 프로젝트 멤버의 식별자 목록 |
| selectAllYN | Body | Boolean | O | 프로젝트 멤버 전체 유무<br/>- 기본값: `false` |

<details><summary>예시</summary>
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

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

## 알림 그룹

### 알림 그룹 목록 보기

```http
GET /v1.0/notification-groups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| notificationGroups | Body | Array |  |
| notificationGroups.notificationGroupId | Body | String | 알림 그룹의 식별자 |
| notificationGroups.notificationGroupName | Body | String | 알림 그룹을 식별할 수 있는 이름 |
| notificationGroups.notificationGroupStatus | Body | Enum | 알림 그룹의 현재 상태<br/>- CREATED: `생성됨`<br/>- DELETED: `삭제됨` |
| notificationGroups.notifyEmail | Body | Boolean | 이메일 알림 여부 |
| notificationGroups.notifySms | Body | Boolean | SMS 알림 여부 |
| notificationGroups.isEnabled | Body | Boolean | 활성화 여부 |
| notificationGroups.createdYmdt | Body | DateTime | 생성 일시 |
| notificationGroups.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
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
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### 알림 그룹 생성하기

```http
POST /v1.0/notification-groups
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupName | Body | String | O | 알림 그룹을 식별할 수 있는 이름 |
| notifyEmail | Body | Boolean | X | 이메일 알림 여부<br/>- 기본값: `true` |
| notifySms | Body | Boolean | X | SMS 알림 여부<br/>- 기본값: `true` |
| isEnabled | Body | Boolean | X | 활성화 여부<br/>- 기본값: `true` |
| dbInstanceIds | Body | Array | O | 감시 대상 DB 인스턴스의 식별자 목록 |
| userGroupIds | Body | Array | O | 사용자 그룹의 식별자 목록 |

<details><summary>예시</summary>
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

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| notificationGroupId | Body | String | 알림 그룹의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "notificationGroupId": "notificationGroupId-example"
}
```

</p>
</details>

---

### 알림 그룹 삭제하기

```http
DELETE /v1.0/notification-groups/{notificationGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | 알림 그룹의 식별자 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 알림 그룹 상세 보기

```http
GET /v1.0/notification-groups/{notificationGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | 알림 그룹의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| notificationGroupId | Body | String | 알림 그룹의 식별자 |
| notificationGroupName | Body | String | 알림 그룹을 식별할 수 있는 이름 |
| notificationGroupStatus | Body | Enum | 알림 그룹의 현재 상태<br/>- CREATED: `생성됨`<br/>- DELETED: `삭제됨` |
| notifyEmail | Body | Boolean | 이메일 알림 여부 |
| notifySms | Body | Boolean | SMS 알림 여부 |
| isEnabled | Body | Boolean | 활성화 여부 |
| dbInstances | Body | Array | 감시 대상 DB 인스턴스 목록 |
| dbInstances.dbInstanceId | Body | String | DB 인스턴스의 식별자 |
| dbInstances.dbInstanceName | Body | String | DB 인스턴스를 식별할 수 있는 이름 |
| userGroups | Body | Array | 사용자 그룹 목록 |
| userGroups.userGroupId | Body | String | 사용자 그룹의 식별자 |
| userGroups.userGroupName | Body | String | 사용자 그룹을 식별할 수 있는 이름 |
| createdYmdt | Body | DateTime | 생성 일시 |
| updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "notificationGroupId": "notificationGroupId-example",
    "notificationGroupName": "notificationGroupName-example",
    "notificationGroupStatus": "CREATED",
    "notifyEmail": false,
    "notifySms": false,
    "isEnabled": false,
    "dbInstances": [
        {
            "dbInstanceName": "dbInstanceName-example"
        }
    ],
    "userGroups": [
        {
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

### 알림 그룹 수정하기

```http
PUT /v1.0/notification-groups/{notificationGroupId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | 알림 그룹의 식별자 |
| notificationGroupName | Body | String | X | 알림 그룹을 식별할 수 있는 이름 |
| notifyEmail | Body | Boolean | X | 이메일 알림 여부<br/>- 기본값: `false` |
| notifySms | Body | Boolean | X | SMS 알림 여부<br/>- 기본값: `false` |
| isEnabled | Body | Boolean | X | 활성화 여부<br/>- 기본값: `false` |
| dbInstanceIds | Body | Array | O | 감시 대상 DB 인스턴스의 식별자 목록 |
| userGroupIds | Body | Array | O | 사용자 그룹의 식별자 목록 |

<details><summary>예시</summary>
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

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 감시 설정 목록 보기

```http
GET /v1.0/notification-groups/{notificationGroupId}/watchdogs
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | 알림 그룹의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| notificationWatchdogs | Body | Array | 감시 설정 정보 |
| notificationWatchdogs.watchdogId | Body | String | 감시 설정의 식별자 |
| notificationWatchdogs.metricName | Body | String | 감시 대상 성능 지표 |
| notificationWatchdogs.comparisonOperator | Body | Enum | 감시 대상 비교 방법<br/>- LE: `<=`<br/>- LT: `<`<br/>- GE: `>=`<br/>- GT: `>` |
| notificationWatchdogs.threshold | Body | Number | 감시 대상 임곗값 |
| notificationWatchdogs.duration | Body | Number | 감시 대상 지속 시간 |
| notificationWatchdogs.createdYmdt | Body | DateTime | 생성 일시 |

<details><summary>예시</summary>
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
            "createdYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### 감시 설정 생성하기

```http
POST /v1.0/notification-groups/{notificationGroupId}/watchdogs
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | 알림 그룹의 식별자 |
| metricName | Body | String | O | 감시 대상 성능 지표 |
| comparisonOperator | Body | Enum | O | 감시 대상 비교 방법<br/>- LE: `<=`<br/>- LT: `<`<br/>- GE: `>=`<br/>- GT: `>` |
| threshold | Body | Number | O | 감시 대상 임곗값<br/>- 최솟값: `0` |
| duration | Body | Number | O | 감시 대상 지속 시간 (분)<br/>- 최솟값: `0` |

<details><summary>예시</summary>
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

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| watchdogId | Body | String | 감시 설정의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "watchdogId": "watchdogId-example"
}
```

</p>
</details>

---

### 알림 그룹 삭제하기

```http
DELETE /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | 알림 그룹의 식별자 |
| watchdogId | URL | UUID | O | 감시 설정의 식별자 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 감시 설정 수정하기

```http
PUT /v1.0/notification-groups/{notificationGroupId}/watchdogs/{watchdogId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O | 알림 그룹의 식별자 |
| watchdogId | URL | UUID | O | 감시 설정의 식별자 |
| metricName | Body | String | O | 감시 대상 성능 지표 |
| comparisonOperator | Body | Enum | O | 감시 대상 비교 방법<br/>- LE: `<=`<br/>- LT: `<`<br/>- GE: `>=`<br/>- GT: `>` |
| threshold | Body | Number | O | 감시 대상 임곗값<br/>- 최솟값: `0` |
| duration | Body | Number | O | 감시 대상 지속 시간 (분)<br/>- 최솟값: `0` |

<details><summary>예시</summary>
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

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

## 작업 정보

### 작업 상태

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

### 작업 정보 상세 보기

```http
GET /v1.0/jobs/{jobId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| jobId | URL | UUID | O |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | String | 작업의 식별자 |
| jobStatus | Body | Enum | 작업의 현재 상태<br/>- DELETED<br/>- CANNOT_PROGRESS<br/>- FAILED<br/>- ERROR<br/>- CANCELED<br/>- INTERRUPTED<br/>- COMPLETED<br/>- COMPLETED_WITH_ERROR<br/>- RUNNING<br/>- PREPARING<br/>- READY<br/>- CREATED<br/>- FAIL_TO_READY<br/>- REGISTERED<br/>- FAIL_TO_REGISTER<br/>- WAIT_TO_REGISTER |
| resourceRelations | Body | Array | 연관 리소스 목록 |
| resourceRelations.resourceType | Body | String | 연관 리소스 유형 |
| resourceRelations.resourceId | Body | String | 연관 리소스의 식별자 |
| createdYmdt | Body | DateTime | 생성 일시 |
| updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "jobId-example",
    "jobStatus": "DELETED",
    "resourceRelations": [
        {
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

## 파라미터 그룹

### 파라미터 그룹 목록 보기

```http
GET /v1.0/parameter-groups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| parameterGroups | Body | Array | 파라미터 그룹 목록 |
| parameterGroups.parameterGroupId | Body | String | 파라미터 그룹의 식별자 |
| parameterGroups.parameterGroupName | Body | String | 파라미터 그룹을 식별할 수 있는 이름 |
| parameterGroups.description | Body | String | 파라미터 그룹에 대한 추가 정보 |
| parameterGroups.dbVersion | Body | Enum | DB 엔진 버전 |
| parameterGroups.parameterGroupStatus | Body | Enum | 파라미터 그룹의 현재 상태<br/>- STABLE: `적용 완료`<br/>- NEED_TO_APPLY: `적용 필요`<br/>- DELETED: `삭제됨` |
| parameterGroups.createdYmdt | Body | DateTime | 생성 일시 |
| parameterGroups.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
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
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### 파라미터 그룹 생성하기

```http
POST /v1.0/parameter-groups
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupName | Body | String | O | 파라미터 그룹을 식별할 수 있는 이름 |
| description | Body | String | X | 파라미터 그룹에 대한 추가 정보 |
| dbVersion | Body | Enum | O | DB 엔진 버전 |

<details><summary>예시</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName-example",
    "description": "description-example",
    "dbVersion": "ENUM_VALUE"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| parameterGroupId | Body | String | 파라미터 그룹의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroupId": "parameterGroupId-example"
}
```

</p>
</details>

---

### 파라미터 그룹 삭제하기

```http
DELETE /v1.0/parameter-groups/{parameterGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | 파라미터 그룹 ID |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 파라미터 그룹 상세 조회

```http
GET /v1.0/parameter-groups/{parameterGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | 파라미터 그룹 ID |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| parameterGroupId | Body | String | 파라미터 그룹의 식별자 |
| parameterGroupName | Body | String | 파라미터 그룹을 식별할 수 있는 이름 |
| description | Body | String | 파라미터 그룹에 대한 추가 정보 |
| dbVersion | Body | Enum | DB 엔진 버전 |
| parameterGroupStatus | Body | Enum | 파라미터 그룹의 현재 상태<br/>- STABLE: `적용 완료`<br/>- NEED_TO_APPLY: `적용 필요`<br/>- DELETED: `삭제됨` |
| parameters | Body | Array | 파라미터 정보 |
| parameters.parameterCategory | Body | String | 파라미터 카테고리 |
| parameters.parameterName | Body | String | 파라미터 이름 |
| parameters.value | Body | String | 현재 설정된 값 |
| parameters.valueUnit | Body | String | 값 단위 (바이트: B,kB,MB,GB,TB, 시간: us,ms,s,min,h,d) |
| parameters.defaultValue | Body | String | 기본값 |
| parameters.allowedValue | Body | String | 허용된 값 |
| parameters.valueType | Body | Enum | 값 타입<br/>- BOOLEAN: `불린 타입
 * ex) on, off, true, false, yes, no, 1, 0`<br/>- STRING: `문자열`<br/>- NUMERIC: `정수 및 부동 소수점`<br/>- NUMERIC_WITH_BYTE_UNIT: `단위가 있는 숫자
 * ex) 120kB, 100MB
 * 허용된 바이트 단위: B (bytes), kB (kilobytes), MB (megabytes), GB (gigabytes), and TB (terabytes)`<br/>- NUMERIC_WITH_TIME_UNIT: `단위가 있는 숫자
 * ex) 120ms, 100s, 1d
 * 허용된 시간 단위: us (microseconds), ms (milliseconds), s (seconds), min (minutes), h (hours), and d (days)`<br/>- ENUMERATED: `allowed_value에 선언된 값 중 한 개 선택 (콤마(,)로 구분됨)`<br/>- MULTI_ENUMERATED: `allowed_value에 선언된 값 중 여러개 선택 (콤마(,)로 구분됨)` |
| parameters.updateType | Body | Enum | 수정 타입<br/>- VARIABLE: `동적, 언제든 수정 가능`<br/>- CONSTANT: `수정 불가능` |
| parameters.applyType | Body | Enum | 적용 타입<br/>- BOTH: `세션, 파일 모두 적용`<br/>- SESSION: `세션에만 적용`<br/>- FILE: `파일에만 적용` |
| parameters.expressionAvailable | Body | Boolean | 수식 허용 여부 |
| createdYmdt | Body | DateTime | 생성 일시 |
| updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroupId": "parameterGroupId-example",
    "parameterGroupName": "parameterGroupName-example",
    "description": "description-example",
    "dbVersion": "ENUM_VALUE",
    "parameterGroupStatus": "STABLE",
    "parameters": [
        {
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

### 파라미터 그룹 수정하기

```http
PUT /v1.0/parameter-groups/{parameterGroupId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | 파라미터 그룹 ID |
| parameterGroupName | Body | String | X | 파라미터 그룹을 식별할 수 있는 이름 |
| description | Body | String | X | 파라미터 그룹에 대한 추가 정보 |

<details><summary>예시</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName-example",
    "description": "description-example"
}
```

</p>
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 파라미터 그룹 복사하기

```http
POST /v1.0/parameter-groups/{parameterGroupId}/copy
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | 파라미터 그룹 ID |
| parameterGroupName | Body | String | O | 파라미터 그룹을 식별할 수 있는 이름 |
| description | Body | String | X | 파라미터 그룹에 대한 추가 정보 |

<details><summary>예시</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName-example",
    "description": "description-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| parameterGroupId | Body | String | 파라미터 그룹의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroupId": "parameterGroupId-example"
}
```

</p>
</details>

---

### 파라미터 그룹 내 파라미터 수정하기

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/parameters
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | 파라미터 그룹 ID |
| modifiedParameters | Body | Array | O | 변경할 파라미터 목록 |
| modifiedParameters.parameterName | Body | String | O | 파라미터 이름 |
| modifiedParameters.value | Body | String | O | 변경할 파라미터 값 |

<details><summary>예시</summary>
<p>

```json
{
    "modifiedParameters": [
        {
            "value": "value-example"
        }
    ]
}
```

</p>
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 파라미터 그룹 재설정하기

```http
PUT /v1.0/parameter-groups/{parameterGroupId}/reset
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O | 파라미터 그룹 ID |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

## 프로젝트

### 프로젝트의 멤버 목록 조회

```http
GET /v1.0/project/members
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| projectMembers | Body | Array | 프로젝트 멤버 정보 |
| projectMembers.memberId | Body | String | 프로젝트 멤버의 식별자 |
| projectMembers.memberName | Body | String | 프로젝트 멤버의 이름 |
| projectMembers.emailAddress | Body | String | 프로젝트 멤버의 이메일 주소 |
| projectMembers.phoneNumber | Body | String | 프로젝트 멤버의 전화번호 |

<details><summary>예시</summary>
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
            "phoneNumber": "phoneNumber-example"
        }
    ]
}
```

</p>
</details>

---

### 프로젝트의 리전 목록 조회

```http
GET /v1.0/project/regions
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| regions | Body | Array | 리전 정보 |
| regions.regionCode | Body | Enum | 리전 코드<br/>- KR1: `한국(판교)`<br/>- KR2: `한국(평촌)` |
| regions.isEnabled | Body | Boolean | 리전의 활성화 여부 |

<details><summary>예시</summary>
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
            "isEnabled": false
        }
    ]
}
```

</p>
</details>

---

