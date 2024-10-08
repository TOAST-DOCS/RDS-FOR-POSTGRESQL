## Database > RDS for PostgreSQL > DB 인스턴스

## DB 인스턴스

DB 인스턴스는 가상 장비와 설치된 PostgreSQL을 아우르는 개념으로, RDS for PostgreSQL에서 제공하는 PostgreSQL의 단위입니다.
DB 인스턴스의 운영체제에 직접 접근할 수 없으며, 오직 DB 인스턴스 생성 시 입력하신 포트를 통해서 데이터베이스로만 접근할 수 있습니다. 사용할 수 있는 포트 범위는 아래와 같은 제약 사항이 있습니다.

* 사용할 수 있는 포트 범위는 5432~45432 사이입니다.

DB 인스턴스는 고객이 부여하는 이름과 자동으로 부여되는 32바이트 아이디로 식별됩니다.
DB 인스턴스 이름은 아래와 같은 제약 사항이 있습니다.

* DB 인스턴스 이름은 리전별로 고유해야 합니다.
* DB 인스턴스 이름은 1~100 사이의 영문자, 숫자, 일부 기호(-, _, .)만 사용할 수 있으며, 첫 번째 글자는 영문자만 사용할 수 있습니다.

## DB 인스턴스 생성

아래 설정들을 통하여 DB 인스턴스를 생성할 수 있습니다.

### 가용성 영역

NHN Cloud는 물리 하드웨어 문제로 생기는 장애에 대비하기 위해 전체 시스템을 여러 개의 가용성 영역으로 나누어 두었습니다. 이 가용성 영역별로 저장 시스템, 네트워크 스위치, 상면, 전원 장치가 모두 별도로 구성돼 있습니다. 한 가용성 영역 내에서 생기는 장애는 다른 가용성 영역에 영향을 주지 않으므로 서비스 전체의 가용성이 높아집니다. DB 인스턴스를 여러 가용성 영역에 나눠 구축한다면 서비스의 가용성을 더욱 높일 수 있습니다. 여러 가용성 영역에 흩어져서 생성된 DB 인스턴스끼리 네트워크 통신이 가능하며 이때 발생하는 네트워크 사용 비용은 부과되지 않습니다.

> [주의]
> 이미 생성한 DB 인스턴스의 가용성 영역은 변경할 수 없습니다.

### DB 엔진

아래에 명시된 버전을 사용할 수 있습니다.

| 버전                   | 비고 |
|----------------------|----|
| PostgreSQL 14.6      |    |


### DB 인스턴스 타입

DB 인스턴스는 타입에 따라 서로 다른 CPU 코어 수와 메모리 용량을 가지고 있습니다.
DB 인스턴스 생성 시 데이터베이스 워크로드에 따라 알맞은 DB 인스턴스 타입을 선택해야 합니다.

| 타입 | 설명                                                        |
|----|-----------------------------------------------------------|
| m2 | CPU와 메모리를 균형 있게 설정한 타입입니다.                                |
| c2 | CPU의 성능을 높게 설정한 인스턴스 타입입니다.                               |
| r2 | 다른 자원에 비해 메모리의 사용량이 많은 경우 사용할 수 있습니다.                     |
| x1 | 고사양의 CPU와 메모리를 지원하는 타입입니다. 높은 성능이 필요한 서비스나 애플리케이션에 사용합니다. |

이미 생성한 DB 인스턴스의 타입은 콘솔을 통해 손쉽게 변경 가능합니다.

> [주의]
> 이미 생성한 DB 인스턴스의 타입 변경 시 DB 인스턴스가 종료되므로 수분의 중단 시간이 발생합니다.

### 데이터 스토리지

데이터 스토리지에 데이터베이스의 데이터 파일을 저장합니다. DB 인스턴스는 HDD, SSD의 2가지 데이터 스토리지 유형을 지원합니다. 데이터 스토리지 유형에 따라 성능과 가격이 다르므로 데이터베이스 워크로드에 따라 알맞은 유형을 선택해야 합니다. 데이터 스토리지는 20GB~2TB로 생성할 수 있습니다.

> [주의]
> 이미 생성한 DB 인스턴스의 데이터 스토리지 유형은 변경할 수 없습니다.

> [참고]
> 데이터 스토리지를 2TB 이상 사용하려면 NHN Cloud 고객 센터로 연락하세요.

아래 작업은 데이터 스토리지의 I/O 용량을 사용하기 때문에 진행되는 동안 DB 인스턴스의 성능이 저하될 수 있습니다.

* 단일 DB 인스턴스의 백업
* 읽기 복제본 생성
* 읽기 복제본 재구축
* 특정 시점으로 복원

### 정보

DB 인스턴스 기본 정보를 설정합니다. 인스턴스 이름, 설명, DB포트와 기본으로 생성할 사용자 정보를 입력할 수 있습니다.
입력한 사용자 ID는 DDL 권한으로 생성됩니다.

**DDL**
* CRUD 권한을 포함하며, DDL 쿼리를 실행할 수 있는 권한을 가지고 있습니다.

**CRUD**
* 조회 권한을 포함하며, 데이터를 변경할 수 있는 권한을 가지고 있습니다.
    * CRUD 사용자는 DB 인스턴스 생성 완료 후에 **DB & 사용자**탭에서 생성할 수 있습니다.

> [주의]
> DDL 사용자는 DB 인스턴스당 하나만 생성할 수 있으며 이미 생성한 사용자의 권한은 변경할 수 없습니다.

### 플로팅 IP

외부에서 DB 인스턴스에 접근하려면 플로팅 IP를 DB 인스턴스에 연결해야 합니다. Internet Gateway가 연결된 서브넷을 연결할 경우에만 플로팅 IP를 생성할 수 있습니다. 플로팅 IP는 사용과 동시에 과금이 되며, 이와 별개로 플로팅 IP를 통한 인터넷 방향의 트래픽이 발생할 경우 별도 과금합니다.

### 파라미터 그룹

파라미터 그룹은 DB 인스턴스에 설치된 데이터베이스를 설정할 수 있는 파라미터의 집합입니다. DB 인스턴스 생성 시 반드시 하나의 파라미터 그룹을 선택해야 합니다. 파라미터 그룹은 생성 이후에도 자유롭게 변경이 가능합니다. 파라미터 그룹에 대한 자세한 설명은 [파라미터 그룹](parameter-group/) 항목을 참고합니다.

### DB 보안 그룹

DB 보안 그룹은 외부 침입에 대비해 접속을 제한하기 위해서 사용합니다. 송수신 트래픽에 대해서 특정 포트 범위 또는 데이터베이스 포트에 대해서 접근을 허용할 수 있습니다. DB 인스턴스에 여러 개의 DB 보안 그룹을 적용할 수 있습니다. DB 보안 그룹에 대한 자세한 설명은 [DB 보안 그룹](db-security-group/) 항목을 참고합니다.

### 백업

DB 인스턴스의 데이터베이스를 주기적으로 백업하도록 설정하거나, 콘솔을 통해 원하는 시기에 백업을 생성할 수 있습니다. 백업이 수행되는 동안 성능 저하가 발생할 수 있습니다. 서비스에 영향을 주지 않기 위해 서비스의 부하가 적은 시간에 백업하는 것을 권장합니다. 백업으로 인한 성능 저하를 원치 않으면 읽기 복제본에서 백업을 수행할 수 있습니다. 백업 파일은 내부 백업 스토리지에 저장되며, 백업 용량에 따라 과금됩니다. 예상치 못한 장애에 대비하기 위해서 주기적으로 백업을 수행하도록 설정하는 것을 권장합니다. 백업에 대한 자세한 설명은 [백업 및 복원](backup-and-restore/) 항목을 참고합니다.

### 기본 알림

DB 인스턴스 생성 시 기본 알림을 설정할 수 있습니다. 기본 알림을 설정하면 `{DB 인스턴스 이름}-default` 이름으로 새로운 알림 그룹이 생성되며 아래 알림 항목들이 자동으로 설정됩니다. 기본 알림으로 생성된 알림 그룹은 자유롭게 수정, 삭제할 수 있습니다. 알림 그룹에 대한 자세한 설명은 [알림 그룹](notification/) 항목을 참고합니다.

| 항목                         | 비교 방법 | 임곗값           | 지속 시간 |
|----------------------------|-------|---------------|-------|
| CPU 사용률                    | &gt;= | 80%           | 5분    |
| Storage 남은 사용량             | &lt;= | 5,120MB       | 5분    |
| Database Connection Status | &lt;= | 0             | 0분    |
| Storage 사용량                | &gt;= | 95%           | 5분    |
| 데이터 스토리지 결함                | &lt;= | 0             | 0분    |
| Connection Ratio           | &gt;= | 85%           | 5분    |
| 메모리 사용량                    | &gt;= | 90%           | 5분    |


## DB 인스턴스 목록

콘솔에서 생성된 DB 인스턴스를 확인할 수 있습니다. DB 인스턴스 그룹 단위로 묶어서 보거나, 개별 DB 인스턴스로 볼 수 있습니다.

![db-instance-list](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-basic-ko.png)

❶ DB 인스턴스 화면 모드를 변경할 수 있습니다.
❷ 자물쇠 아이콘을 클릭해 삭제 보호 설정을 변경할 수 있습니다.
❸ 가장 최근 수집된 모니터링 지표를 보여줍니다.
❹ 현재 상태를 볼 수 있습니다.
❺ 진행 중인 작업이 있으면 스피너가 나타납니다.
❻ 검색 조건을 변경할 수 있습니다.

DB 인스턴스의 상태는 아래와 같은 값들로 구성되며, 사용자의 행위와 현재 상태에 따라 변경됩니다.

| 상태                | 설명    |
|-------------------|-------|
| BEFORE_CREATE     | 생성 이전 |
| AVAILABLE         | 사용 가능 |
| STORAGE_FULL      | 용량 부족 |
| FAIL_TO_CREATE    | 생성 실패 |
| FAIL_TO_CONNECT   | 연결 실패 |
| REPLICATION_DELAY | 복제 지연 |
| REPLICATION_STOP  | 복제 중단 |
| SHUTDOWN          | 중지됨   |

변경할 수 있는 검색 조건은 아래와 같습니다.

![db-instance-list-filter](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-filter-ko.png)

❶ DB 인스턴스 상태를 필터링 조건으로 검색할 수 있습니다.
❷ 가용성 영역을 필터링 조건으로 검색할 수 있습니다.

## DB 인스턴스 상세

DB 인스턴스를 선택하면 상세 정보를 볼 수 있습니다.

![db-instance-detail-basic](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-basic-ko.png)

❶ 접속 정보의 도메인을 클릭하면 IP 주소를 확인할 수 있는 팝업 창이 나타납니다.
❷ DB 보안 그룹을 클릭하면 DB 보안 규칙을 확인할 수 있는 팝업 창이 나타납니다.
❸ 파라미터 그룹을 클릭하면 파라미터를 확인할 수 있는 화면으로 이동합니다.
❹ 마우스로 드래그 앤드 드롭 하여 상세 정보 패널의 높이를 조절할 수 있습니다.
❺ 상세 정보 패널의 높이를 미리 지정된 높이로 조절할 수 있습니다.

### 접속 정보

DB 인스턴스 생성 시 내부 도메인을 발급합니다. 내부 도메인은 사용자 VPC 서브넷에 속한 IP 주소를 가리킵니다.

플로팅 IP를 생성한 경우 외부 도메인을 추가로 발급합니다. 외부 도메인은 플로팅 IP의 주소를 가리킵니다. 외부 도메인 또는 플로팅 IP는 외부에서 접근이 가능하므로 DB 보안 그룹의 규칙을 적절히 설정하여 DB 인스턴스를 보호해야 합니다.

### 로그

DB 인스턴스의 로그 탭에서는 각종 로그 파일을 보거나 다운로드할 수 있습니다. 로그 파일은 아래와 같이 정해진 설정으로 로테이트 됩니다. 일부 로그 파일은 파라미터 그룹에서 활성화하거나 비활성화할 수 있습니다.

| 항목             | 로테이트 설정   | 변경 여부 | 
|----------------|-----------|-------|
| postgresql.log | 100MB 40개 | 고정    |
| backup.log     | 데일리 10개   | 고정    |

![db-instance-detail-log](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-log-ko.png)

❶ **로그 보기**를 클릭하면 로그 파일의 내용을 확인할 수 있는 팝업 창이 나타납니다. 최대 65,535Bytes의 로그를 확인할 수 있습니다.
❷ **가져오기**를 클릭하면 DB 인스턴스의 로그 파일을 다운로드할 수 있도록 요청합니다.
❸ 다운로드가 준비되면 **다운로드** 버튼이 노출됩니다. 클릭하면 로그를 내려받습니다.

> [주의]
> **가져오기**를 클릭하면 약 5분간 로그 파일이 백업 스토리지에 업로드되며 로그 파일의 크기만큼 백업 스토리지 용량이 과금됩니다.
> **다운로드**를 클릭하면 로그 파일의 크기만큼 인터넷 트래픽이 과금됩니다.


### 데이터베이스 & 사용자

DB 인스턴스의 **데이터베이스 & 사용자** 탭에서는 DB 엔진에 생성된 데이터베이스와 사용자를 조회 및 제어할 수 있습니다.


#### 데이터베이스 생성

![db-instance-detail-db-create](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-db-create-ko.png)

❶ **+ 생성**을 클릭하면 데이터베이스의 이름을 입력할 수 있는 팝업 창이 나타납니다.
❷ 데이터베이스 이름을 입력한 뒤 **생성**을 클릭하여 데이터베이스를 생성할 수 있습니다.

데이터베이스 이름은 아래와 같은 제약 사항이 있습니다.

* 1~63자 사이의 따옴표(',")를 제외한 문자만 사용할 수 있습니다.
* `postgres` `information_schema` `performance_schema` `repmgr` `db_helper` `sys` `mysql` `rds_maintenance` `pgpool` `nsight` `watchdog` `barman` `rman`은 데이터베이스 이름으로 사용할 수 없습니다.

#### 데이터베이스 수정

![db-instance-detail-db-modify](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-db-modify-ko.png)

❶ 수정할 데이터베이스 행의 **수정**을 클릭하면 데이터베이스 정보를 수정할 수 있는 팝업 창이 나타납니다.
❷ **수정**을 클릭하여 수정을 요청할 수 있습니다.
❸ **변경 예정 접근 제어 즉시 적용**을 체크하면 접근 제어 규칙에도 수정 사항이 즉시 적용됩니다.

#### 데이터베이스 삭제

![db-instance-detail-db-delete](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-db-delete-ko.png)

❶ 삭제할 데이터베이스를 선택 후 **삭제**를 클릭하면 삭제 확인 팝업 창이 나타납니다.
❷ **삭제**를 클릭하여 삭제를 요청할 수 있습니다.

#### 사용자 생성

![db-instance-detail-user-create](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-user-create-ko.png)

❶ **+ 생성**을 클릭하면 사용자 추가 팝업 창이 나타납니다.
❷ 사용자 ID를 입력합니다.

사용자 ID는 아래와 같은 제약 사항이 있습니다.

* 1~63자 사이의 따옴표(',")를 제외한 문자만 사용할 수 있습니다.
* `postgres` `repmgr` `barman` `rman` `pgpool` `nsight` `watchdog` `dba` `manager` `mysql.session` `mysql.sys` `mysql.infoschema` `sqlgw` `admin` `etladm` `alertman` `prom` `rds_admin` `rds_mha` `rds_repl` `mariadb.sys`은 사용자 ID로 사용할 수 없습니다.

❸ 비밀번호를 입력합니다.

비밀번호는 아래와 같은 제약 사항이 있습니다.

* 1~100자 사이의 따옴표(',")를 제외한 문자만 사용할 수 있습니다.

❹ 사용자에게 부여할 권한을 선택합니다. 부여할 수 있는 권한과 설명은 다음과 같습니다.

**CRUD**
* 조회 권한을 포함하며, 데이터를 변경할 수 있는 권한을 가지고 있습니다.

❺ 생성할 사용자에게 전체 데이터베이스 접근 권한을 주기 위한 기본 접근 제어 규칙을 추가하도록 설정할 수 있습니다. 기본 접근 제어 규칙을 추가하지 않는 경우 별도의 접근 제어 규칙을 설정해야 데이터베이스에 접속이 가능합니다.

#### 사용자 수정

![db-instance-detail-user-modify](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-user-modify-ko.png)

❶ 수정할 사용자 행의 **수정**을 클릭하면 사용자 정보를 수정할 수 있는 팝업 창이 나타납니다.
❷ 비밀번호를 입력하지 않으면 변경되지 않습니다.
❸ **변경 예정 접근 제어 즉시 적용**을 체크하면 접근 제어 규칙에도 수정 사항이 즉시 적용됩니다.

#### 사용자 삭제

![db-instance-detail-user-delete](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-user-delete-ko.png)

❶ 삭제할 사용자를 선택 후 드롭다운 메뉴를 클릭합니다.
❷ **삭제**를 클릭하면 **삭제 확인** 팝업 창이 나타납니다. **확인**을 클릭하여 삭제를 요청할 수 있습니다.

### 접근 제어

DB 인스턴스의 **접근 제어** 탭에서는 특정 데이터베이스와 사용자에 대한 DB 엔진 접근 규칙을 조회 및 제어할 수 있습니다. 여기에 설정한 규칙은 `pg_hba.conf` 파일에 적용됩니다.

![db-instance-detail-hba](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-hba-ko.png)

❶ 접근 제어 규칙에 대한 적용 상태를 볼 수 있습니다.
❷ 진행 중인 작업이 있으면 스피너가 나타납니다.
❸ 검색 키워드를 입력해 검색해서 볼 수 있습니다.

접근 제어의 상태는 아래와 같은 값들로 구성되며, 사용자의 행위와 현재 상태에 따라 변경됩니다.

| 상태      | 예약 상태  | 설명           |
|---------|--------|--------------|
| CREATED | CREATE | 생성 예약(적용 필요) |
| CREATED | MODIFY | 수정 예약(적용 필요) |
| CREATED | DELETE | 삭제 예약(적용 필요) |
| APPLIED | NONE   | 적용됨          |
| -       | -      | 적용 불가        |

> [주의]
> 특정 데이터베이스와 사용자를 선택해서 추가한 규칙의 대상들이 모두 삭제된 경우 적용 불가 상태로 나타나며 설정 파일엔 적용되지 않습니다.


#### 접근 제어 규칙 추가

![db-instance-detail-hba-create](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-hba-create-ko.png)

❶ **+ 생성**을 클릭하면 **접근 제어 규칙 추가** 팝업 창이 나타납니다.
❷ 규칙 적용 대상을 전체 대상으로 지정하거나 특정 데이터베이스나 사용자를 선택해서 지정할 수 있습니다.
    - **사용자 지정**을 선택하면 **데이터베이스 & 사용자** 탭에서 추가한 데이터베이스, 사용자를 선택하는 드롭다운 메뉴가 나타납니다.
❸ 규칙을 적용할 접속 주소를 CIDR 형식으로 입력합니다.
❹ 인증 방식을 선택합니다. RDS for PostgreSQL에서 지원하는 인증 방식은 다음과 같습니다.

| 인증 방식               | DB 엔진 설정값     | 설명                                                      |
|---------------------|---------------|---------------------------------------------------------|
| 트러스트(비밀번호 불필요)      | trust         | 비밀번호나 다른 인증 없이 모든 연결을 허용합니다.                            |
| 접속 차단               | reject        | 모든 연결을 차단합니다.                                           |
| 비밀번호(SCRAM-SHA-256) | scram-sha-256 | **데이터베이스 & 사용자** 탭에서 설정한 비밀번호로 SCRAM-SHA-256 인증하도록 합니다. |

❺ 위/아래 화살표 버튼으로 규칙을 적용할 순서를 조정합니다.
    - 접근 제어 규칙은 위에서부터 순차적으로 적용하며 먼저 적용된 규칙이 우선됩니다.
    - 상단에 등록된 접근 허용 규칙이 먼저 적용되면 하단에 접근 차단 규칙이 있더라도 접근이 허용됩니다.
    - 반대로 하단에 접근 허용 규칙이 있더라도 상단에 등록된 접근 차단 규칙이 먼저 적용돼 있으면 접근이 불가능합니다.
❻ 설정을 마친 뒤 **변경사항 적용**을 클릭해 DB 인스턴스에 접근 제어 설정을 적용합니다.
❼ DB 인스턴스에 적용되면 상태가 **적용됨**으로 변경됩니다.

#### 접근 제어 규칙 수정

![db-instance-detail-hba-modify](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-hba-modify-ko.png)

❶ 수정할 접근 제어 규칙 행의 **수정**을 클릭하면 기존 정보를 수정할 수 있는 팝업 창이 나타납니다.
❷ 수정한 규칙은 **변경사항 적용**을 클릭해 DB 인스턴스에 접근 제어 설정을 적용해야 합니다.

#### 접근 제어 규칙 삭제

![db-instance-detail-hba-delete](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-hba-delete-ko.png)

❶ 삭제할 사용자를 선택 후 **삭제**를 클릭하면 **삭제 확인** 팝업 창이 나타납니다.
❷ 삭제한 규칙은 **변경사항 적용**을 클릭해 DB 인스턴스에 접근 제어 설정을 적용해야 합니다.

## DB 인스턴스 수정

콘솔을 통해 생성된 DB 인스턴스의 다양한 항목을 손쉽게 변경할 수 있습니다. 변경 요청한 항목은 순차적으로 DB 인스턴스에 적용합니다. 적용 과정에서 재시작이 필요할 경우 모든 변경을 적용한 후 DB 인스턴스를 재시작합니다. 변경 불가능한 항목과 재시작이 필요한 항목은 다음과 같습니다.

| 항목              | 변경 가능 여부 | 재시작 필요 여부               |
|-----------------|----------|-------------------------|
| 가용성 영역          | 아니오      |                         |
| DB 엔진           | 아니오      |                         |
| DB 인스턴스 타입      | 예        | 예                       |
| 데이터 스토리지 종류     | 아니오      |                         |
| 데이터 스토리지 크기     | 예        | 예                       |
| 이름              | 예        | 아니오                     |
| 설명              | 예        | 아니오                     |
| DB 포트           | 예        | 예                       |
| VPC 서브넷         | 아니오      |                         |
| 플로팅 IP          | 예        | 아니오                     |
| 파라미터 그룹         | 예        | 변경된 파라미터의 재시작 여부에 따라 결정 |
| DB 보안 그룹        | 예        | 아니오                     |
| 백업 설정           | 예        | 아니오                     |
| 데이터베이스 & 사용자 제어 | 예        | 아니오                     |
| 접근 제어           | 예        | 아니오                     |


## DB 인스턴스 삭제

더 이상 사용하지 않는 DB 인스턴스는 삭제할 수 있습니다. 마스터를 삭제하면 해당 복제 그룹에 속한 읽기 복제본도 함께 삭제됩니다. 삭제된 DB 인스턴스는 복구할 수 없으므로 중요한 DB 인스턴스는 삭제 보호 설정을 활성화하는 것을 권장합니다.

## 백업

장애 상황에 대비하여 DB 인스턴스의 데이터베이스를 복구할 수 있도록 미리 준비할 수 있습니다. 필요할 때마다 콘솔에서 백업을 수행하거나, 주기적으로 백업이 수행되도록 설정할 수 있습니다. 자세한 사항은 [백업](backup-and-restore/#_1) 항목을 참고합니다.

## 복원

백업을 이용하여 원하는 시점으로 데이터를 복원할 수 있습니다. 복원 시 항상 새로운 DB 인스턴스가 생성되며, 기존 DB 인스턴스에 복원할 수 없습니다. 자세한 사항은 [복원](backup-and-restore/#_6) 항목을 참고합니다.

## 용량 확보

급격한 부하로 WAL 로그가 과도하게 생성되어 데이터 스토리지의 용량이 부족할 경우 콘솔의 용량 확보 기능을 이용해 WAL 로그를 삭제할 수 있습니다. 콘솔에서 용량 확보를 선택하면 DB 인스턴스의 WAL 로그를 선택할 수 있는 팝업 창이 표시됩니다. WAL 로그를 선택한 뒤 **확인**을 눌러 선택한 항목 이전에 생성된 모든 WAL 로그를 삭제합니다. 용량 확보 기능은 일시적으로 용량을 확보하는 기능입니다. 계속해서 용량이 부족하다면 서비스 부하에 맞게 데이터 스토리지의 크기를 확장해야 합니다.

> [주의]
> 삭제된 WAL 로그에 따라 특정 시점으로 복원되지 않을 수 있습니다.

## 파라미터 그룹 변경 사항 적용

DB 인스턴스에 연결된 파라미터 그룹의 설정이 변경되어도 이 변경 사항은 DB 인스턴스에 자동으로 적용되지 않습니다. 만약 DB 인스턴스에 적용된 파라미터와 연결된 파라미터 그룹의 설정이 서로 다를 경우 콘솔에 **파라미터** 버튼이 표시됩니다.

다음 방법 중 하나를 사용하여 DB 인스턴스에 파라미터 그룹의 변경 사항을 적용할 수 있습니다.

![db-instance-list-apply-parameter-group](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-apply-parameter-group-ko.png)

❶ 대상 DB 인스턴스의 **파라미터**를 클릭하거나
❷ 대상 DB 인스턴스를 선택한 후 드롭다운 메뉴에서 **파라미터 그룹 변경 사항 적용** 메뉴를 클릭합니다.

파라미터 그룹에서 재시작을 필요로 하는 파라미터가 변경된 경우 변경 사항을 적용하는 과정에서 DB 인스턴스가 재시작됩니다.

![db-instance-list-apply-parameter-group-popup](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-apply-parameter-group-popup-ko.png)

❶ **변경 사항 비교**를 클릭해 변경된 파라미터를 확인할 수 있습니다.
❷ 변경 사항 확인 후 **확인**을 클릭해 DB 인스턴스에 변경된 파라미터를 적용합니다.

![db-instance-list-apply-parameter-group-compare-popup](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-apply-parameter-group-compare-popup-ko.png)

## 읽기 복제본

읽기 성능을 높이기 위해서 읽기 전용으로 사용할 수 있는 읽기 복제본을 생성할 수 있습니다. 읽기 복제본은 하나의 마스터에 대해서 최대 5대까지 생성할 수 있습니다. 읽기 복제본의 읽기 복제본은 생성할 수 없습니다.

### 읽기 복제본 생성

읽기 복제본을 생성하려면 복제 그룹에 속한 DB 인스턴스에서 생성된 백업 파일이 필요합니다. 백업 파일이 없는 경우 다음 순서에 따라 백업을 수행할 DB 인스턴스를 선택합니다.

❶ 자동 백업 설정한 읽기 복제본
❷ 자동 백업 설정한 마스터

조건에 맞는 DB 인스턴스가 없을 경우 읽기 복제본 생성 요청은 실패합니다.

> [주의]
> 마스터의 데이터베이스 크기에 비례하여 읽기 복제본 생성 시간이 늘어날 수 있습니다.
> 백업이 수행되는 DB 인스턴스의 경우 읽기 복제본 생성 과정에서 스토리지 I/O 성능 하락이 있을 수 있습니다.

> [참고]
> 읽기 복제본 생성 과정에 필요한 데이터 스토리지 크기만큼 백업 스토리지 과금이 발생할 수 있습니다.

읽기 복제본을 생성하려면 콘솔에서

![db-instance-list-replica-create](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-replica-create-ko.png)

❶ 원본 DB 인스턴스를 선택한 뒤 **읽기 복제본 생성**을 클릭하면 읽기 복제본을 생성하기 위한 페이지로 이동합니다.

아래 설정들을 통하여 읽기 복제본을 생성할 수 있습니다.

#### 변경 불가 항목

읽기 복제본을 생성할 때 아래 나열된 항목들은 원본 DB 인스턴스의 설정을 따르기 때문에 변경할 수 없습니다.

* DB 엔진
* 데이터 스토리지 종류
* 사용자 VPC 서브넷

#### 가용성 영역

읽기 복제본의 가용성 영역을 선택합니다. 자세한 설명은 [가용성 영역](#가용성-영역) 항목을 참고합니다.

#### DB 인스턴스 타입

읽기 복제본은 마스터와 동일한 사양 혹은 더 높은 사양으로 만드는 것을 권장합니다. 낮은 사양으로 생성 시 복제 지연이 발생할 수 있습니다.

#### 데이터 스토리지 크기

원본 DB 인스턴스와 동일한 크기로 만드는 것을 권장합니다. 크기를 작게 설정할 경우 데이터 스토리지 용량 부족으로 복제 과정이 중단될 수 있습니다.

#### 플로팅 IP

읽기 복제본의 플로팅 IP 사용 여부를 선택합니다. 자세한 설명은 [플로팅 IP](#플로팅-ip) 항목을 참고합니다.

#### 파라미터 그룹

읽기 복제본의 파라미터 그룹을 선택할 때 복제 관련 설정 변경이 필요 없다면 원본 DB 인스턴스와 동일한 파라미터 그룹을 선택하는 것을 권장합니다. 파라미터 그룹에 대한 자세한 설명은 [파라미터 그룹](parameter-group/) 항목을 참고합니다.

#### DB 보안 그룹

읽기 복제본에 적용할 DB 보안 그룹을 선택합니다. 복제에 필요한 규칙은 자동으로 적용되기 때문에 DB 보안 그룹에 별도로 추가할 필요가 없습니다. DB 보안 그룹에 대한 자세한 설명은 [DB 보안 그룹](db-security-group/) 항목을 참고합니다.

#### 백업

읽기 복제본의 백업 설정을 선택합니다. 백업에 대한 자세한 설명은 [백업 및 복원](backup-and-restore/) 항목을 참고합니다.

#### 기본 알림

기본 알림 사용 여부를 선택합니다. 자세한 설명은 [기본 알림](#기본-알림) 항목을 참고합니다.

#### 삭제 보호

삭제 보호 사용 여부를 선택합니다. 자세한 설명은 [삭제 보호](#삭제-보호-설정-변경) 항목을 참고합니다.

### 읽기 복제본 승격

마스터와의 복제 관계를 해제하고 읽기 복제본을 독립된 마스터로 전환하는 과정을 승격이라고 합니다. 승격된 마스터는 독립된 DB 인스턴스로서 작동하게 됩니다. 승격을 원하는 읽기 복제본과 마스터 사이에 복제 지연이 존재하는 경우 해당 지연이 해결될 때까지 승격이 이루어지지 않습니다. 한번 승격된 DB 인스턴스는 이전의 복제 관계로 되돌릴 수 없습니다.

> [주의]
> 마스터 DB 인스턴스의 상태가 비정상일 경우에는 승격 작업을 진행할 수 없습니다.

### 읽기 복제본 강제 승격

마스터의 상태와 관계없이 읽기 복제본의 현재 시점 데이터를 기반으로 강제 승격을 진행합니다. 복제 지연이 있는 경우 데이터 유실이 발생할 수 있습니다. 따라서 읽기 복제본을 긴급하게 서비스에 투입해야 하는 상황이 아니라면 이 기능의 사용은 권장하지 않습니다.

### 읽기 복제본의 복제 중단

읽기 복제본은 여러 이유로 복제가 중단될 수 있습니다. 읽기 복제본의 상태가 `복제 중단`인 경우 빠르게 원인을 확인하여 정상화해야 합니다. `복제 중단` 상태가 장시간 지속될 경우 복제 지연이 늘어나게 됩니다. 정상화에 필요한 WAL 로그가 없는 경우 읽기 복제본을 재구축해야 합니다.

### 읽기 복제본의 재구축

읽기 복제본의 복제 문제를 해결할 수 없는 경우 재구축을 통해 정상 상태로 복원할 수 있습니다. 이 과정에서 읽기 복제본의 모든 데이터베이스를 삭제하고, 마스터 데이터베이스를 기반으로 새롭게 재구축합니다. 재구축하는 동안 읽기 복제본은 사용할 수 없습니다. 읽기 복제본을 재구축하려면 복제 그룹에 속한 DB 인스턴스에서 생성된 백업 파일이 필요합니다. 백업 파일이 없는 경우 동작 및 주의 사항은 [읽기 복제본 생성](#읽기-복제본-생성) 항목을 참고합니다.

> [참고]
> 재구축 후에도 접속 정보(도메인, IP)는 변경되지 않습니다.

## DB 인스턴스 재시작

PostgreSQL을 재시작하고자 할 때 DB 인스턴스를 재시작할 수 있습니다. 재시작 시간을 최소화하기 위해 서비스 부하가 낮은 시간대에 수행하는 것이 좋습니다.

DB 인스턴스를 재시작하려면 콘솔에서

![db-instance-list-restart](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-restart-ko.png)

❶ 재시작할 DB 인스턴스를 선택한 뒤 드롭다운 메뉴에서 **DB 인스턴스 재시작** 메뉴를 클릭합니다.

## DB 인스턴스 강제 재시작

DB 인스턴스의 PostgreSQL이 정상 동작하지 않는 경우 강제로 재시작할 수 있습니다. 강제 재시작의 경우 PostgreSQL에 SIGTERM 명령을 내려 정상 종료되기를 10분간 기다립니다. 10분 안에 PostgreSQL이 정상 종료되면 이후 가상 머신을 재부팅합니다. 10분 안에 정상 종료되지 않으면 가상 머신을 강제로 재부팅합니다. 가상 머신이 강제로 재부팅되면 작업 중인 일부 트랜잭션이 유실될 수 있으며, 데이터 볼륨이 손상되어 복구가 불가능해질 수 있습니다. 강제 재시작 이후 DB 인스턴스의 상태가 사용 가능 상태로 돌아오지 않을 수 있습니다. 해당 상황 발생 시 고객 센터로 문의하세요.

> [주의]
> 데이터가 유실되거나 데이터 볼륨이 손상될 가능성이 있으므로 해당 기능은 긴급하고 불가피한 상황 이외에는 사용을 지양해야 합니다.

DB 인스턴스를 강제 재시작하려면 콘솔에서

![db-instance-list-force-restart](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-force-restart-ko.png)

❶ 강제 재시작을 원하는 DB 인스턴스를 선택 후 드롭다운 메뉴에서 **DB 인스턴스 강제 재시작** 메뉴를 클릭합니다.

## 삭제 보호 설정 변경

삭제 보호를 활성화하면 실수로 DB 인스턴스가 삭제되지 않도록 보호할 수 있습니다. 삭제 보호를 비활성화할 때까지 해당 DB 인스턴스를 삭제할 수 없습니다. 삭제 보호 설정을 변경하려면

![db-instance-deletion-protection-ko](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-deletion-protection-ko.png)

❶ 삭제 보호 설정을 변경하려는 DB 인스턴스를 선택 후 드롭다운 메뉴에서 **삭제 보호 설정 변경** 메뉴를 클릭하면 팝업 창이 나타납니다.

![deletion-protection-popup-ko](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-deletion-protection-popup-ko.png)

❷ 삭제 보호 설정을 변경한 뒤 **확인**을 클릭합니다.

## 데이터 마이그레이션

* RDS는 pg_dump를 이용하여 NHN Cloud RDS의 외부로 가져올 수 있습니다.
* pg_dump 유틸리티는 PostgreSQL을 설치했을 때 기본으로 제공됩니다.

### pg_dump를 이용하여 내보내기

* NHN Cloud RDS의 인스턴스를 준비하여 사용합니다.
* 내보낼 데이터를 저장하게 될 외부 인스턴스, 또는 로컬 클라이언트가 설치된 컴퓨터의 용량이 충분히 확보되어 있는지 확인합니다.
* NHN Cloud의 외부로 데이터를 내보내야 할 경우 Floating IP를 생성하여 데이터를 내보낼 RDS 인스턴스에 연결합니다.
* 아래의 pg_dump 명령어를 통하여 외부로 데이터를 내보냅니다.

#### 파일로 내보낼 경우

```
pg_dump -h {rds_instance_floating_ip} -U {db_id} -p {db_port} -d {database_name} -f {local_path_and_file_name}
```

#### NHN Cloud RDS 외부의 PostgreSQL 데이터베이스로 내보낼 경우

```
pg_dump  -h {rds_instance_floating_ip} -U {db_id} -p {db_port} -d {database_name} | psql -h {external_db_host} -U {external_db_id} -p {external_db_port} -d {external_database_name}
```

## 부록

### 부록1. 하이퍼바이저 점검을 위한 DB 인스턴스 마이그레이션 가이드

NHN Cloud는 주기적으로 DB 인스턴스의 하이퍼바이저 소프트웨어를 업데이트하여 보안과 안정성을 향상시키고 있습니다.
점검 대상 하이퍼바이저에서 구동 중인 DB 인스턴스는 마이그레이션을 통해 점검이 완료된 하이퍼바이저로 이동해야 합니다.

DB 인스턴스 마이그레이션은 NHN Cloud 콘솔에서 시작할 수 있습니다.
아래 가이드에 따라 콘솔에 있는 마이그레이션 기능을 이용하세요.
점검 대상으로 지정된 DB 인스턴스가 있는 프로젝트로 이동합니다.

#### 1. 점검 대상 DB 인스턴스를 확인합니다.

이름 옆에 마이그레이션 버튼이 있는 DB 인스턴스가 점검 대상 인스턴스입니다.

![db-instance-planned-migration](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-planned-migration-ko.png)

마이그레이션 버튼 위에 마우스 포인터를 올리면 자세한 점검 일정을 확인할 수 있습니다.

![db-instance-planned-migration-popup](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-planned-migration-popup-ko.png)

#### 2. 점검 대상 DB 인스턴스에 접속 중인 응용 프로그램을 종료해야 합니다.

DB에 연결된 서비스에 영향을 주지 않도록 적절한 조치하세요.
서비스에 영향을 줄 수밖에 없을 때는 NHN Cloud 고객 센터로 연락해 주시면 적합한 조치를 안내해 드리겠습니다.

#### 3. 점검 대상 DB 인스턴스를 선택하고 마이그레이션 버튼을 클릭한 후 DB 인스턴스 마이그레이션 확인을 묻는 창이 나타나면 확인 버튼을 클릭합니다.

![db-instance-planned-migration-confirm](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-planned-migration-confirm-ko.png)

#### 4. DB 인스턴스 마이그레이션이 끝날 때까지 대기합니다.

DB 인스턴스 상태가 변경되지 않는다면 '새로 고침'하세요.

![db-instance-planned-migration-status](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-planned-migration-status-ko.png)

DB 인스턴스가 마이그레이션되는 동안에는 아무런 조작을 할 수 없습니다.
DB 인스턴스 마이그레이션이 정상적으로 완료되지 않으면 자동으로 관리자에게 보고되며, NHN Cloud에서 별도로 연락을 드립니다.
