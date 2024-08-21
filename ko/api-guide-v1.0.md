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
| resultCode    | int     | 결과코드 (성공: 0, 그 외: 실패) |
| resultMessage | String  | 결과 메시지                |
| successful    | boolean | 성공 여부                 |

## DB 엔진 유형

| DB 엔진 유형         | 생성 가능 여부 |
|------------------|----------|
| POSTGRESQL_V1446 | O        |

* ENUM 타입의 dbVersion 필드에 대해 해당 값을 사용할 수 있습니다.
* 버전에 따라 생성이 불가능하거나, 복원이 불가능한 경우가 있을 수 있습니다.

## 프로젝트 정보

### 리전 목록 보기

```
GET /v3.0/project/regions
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
            "isEnabled": true
        }
    ]
}
```

</details>

---

### 프로젝트 멤버 목록 보기

```
GET /v3.0/project/members
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
<p>

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

</p>
</details>