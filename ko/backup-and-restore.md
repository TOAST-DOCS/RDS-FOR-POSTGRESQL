## Database > RDS for PostgreSQL > 백업 및 복원

## 백업

장애 상황에 대비하여 DB 인스턴스의 데이터베이스를 복구할 수 있도록 미리 준비할 수 있습니다. 필요할 때마다 콘솔에서 백업을 수행하거나, 주기적으로 백업이 수행되도록 설정할 수 있습니다. 백업이 수행되는 동안에는 해당 DB 인스턴스의 스토리지의 성능 저하가 발생할 수 있습니다. 서비스에 영향을 주지 않기 위해 서비스의 부하가 적은 시간에 백업할 것을 권장합니다.

RDS for PostgreSQL에서는 pg_basebackup 도구를 이용하여 데이터베이스를 백업합니다. 외부 PostgreSQL의 백업으로 복원하거나 RDS for PostgreSQL의 백업으로 복원하기 위해서는 RDS for PostgreSQL에서 사용하는 pg_basebackup과 동일한 버전을 사용해야 합니다. DB 엔진 버전에 따른 pg_basebackup 버전은 아래와 같습니다.

| PostgreSQL 버전 | pg_basebackup 버전 |
|---------------|------------------|
| 14.6          | 14.6             |
| 14.15         | 14.15            |
| 14.17         | 14.17            |
| 17.2          | 17.2             |
| 17.4          | 17.4             |

* pg_basebackup의 설치에 대한 자세한 설명은 PostgreSQL 홈페이지를 참고합니다.
  * https://www.postgresql.org/docs/14/app-pgbasebackup.html

백업 시에 적용되는 설정 항목은 다음과 같으며, 자동 백업 및 수동 백업 시에 모두 적용됩니다.

![backup-config](https://static.toastoven.net/prod_rds_postgres/20241210/backup-config-ko.png)

### 수동 백업

특정 시점의 데이터베이스를 영구히 저장하려면 콘솔에서 수동으로 백업을 수행할 수 있습니다. 수동 백업은 자동 백업과 달리 명시적으로 백업을 삭제하지 않는 한 DB 인스턴스가 삭제될 때 같이 삭제되지 않습니다. 콘솔에서 수동 백업을 수행하려면

![db-instance-detail-backup](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-backup-ko.png)

❶ 백업할 DB 인스턴스를 선택한 뒤 **백업**을 클릭하면 **백업 생성** 팝업 창이 나타납니다.
    - DB 인스턴스를 선택하지 않고 **백업**을 클릭하면 **백업 생성** 팝업 창 내 드롭다운 메뉴에서 DB 인스턴스를 선택할 수 있습니다.
❷ 백업의 이름을 입력합니다. 아래와 같은 제약 사항이 있습니다.

* 백업 이름은 리전별로 고유해야 합니다.
* 백업 이름은 1~100자 사이의 영문자, 숫자, 일부 기호(-, _, .)만 입력할 수 있으며, 첫 번째 글자는 영문자만 사용할 수 있습니다.

또는 **백업** 탭에서

![backup-create](https://static.toastoven.net/prod_rds_postgres/20241210/backup-create-ko.png)

❶ **+ 백업 생성**을 클릭하면 **백업 생성** 팝업 창이 나타납니다.
❷ 백업을 수행할 DB 인스턴스를 선택합니다.
❸ 백업의 이름을 입력한 뒤 **생성**을 클릭하면 백업 생성을 요청할 수 있습니다.

### 자동 백업

수동으로 백업을 수행하는 경우 외에도 복원 작업을 위해 필요한 경우 또는 자동 백업 스케줄 설정에 따라 자동 백업이 수행될 수 있습니다. DB 인스턴스의 백업 보관 기간을 1일 이상으로 설정하면 자동 백업이 활성화되며, 지정된 시간에 백업이 수행됩니다. 자동 백업은 DB 인스턴스와 생명 주기가 동일합니다. DB 인스턴스가 삭제되면 보관된 자동 백업은 모두 삭제됩니다. 자동 백업에서 지원하는 설정 항목은 아래와 같습니다.

![backup-config](https://static.toastoven.net/prod_rds_postgres/20240611/backup-config-ko.png)

**백업 보관 기간**

* 백업을 스토리지에 저장하는 기간을 설정합니다. 최대 730일까지 보관할 수 있으며, 백업 보관 기간이 변경되면 보관 기간이 지난 자동 백업 파일은 바로 삭제됩니다.

**백업 재시도 횟수**

* DML 쿼리 부하 또는 여러 다양한 이유로 자동 백업이 실패한 경우 재시도하도록 설정할 수 있습니다. 최대 10회까지 재시도할 수 있습니다. 재시도 횟수가 남아 있더라도 자동 백업 수행 시간 설정에 따라 재시도하지 않을 수 있습니다.

**백업 수행 시간**

* 백업이 자동으로 수행되는 시간을 설정할 수 있습니다. 백업 시작 시간과 백업 윈도우로 구성됩니다. 백업 수행 시간은 겹치지 않게 여러 번 설정할 수 있습니다. 백업 시작 시간을 기준으로 백업 윈도우 안의 어느 시점에서 백업을 수행합니다. 백업 윈도우는 백업의 총 수행 시간과는 관련이 없습니다. 백업에 걸리는 시간은 데이터베이스 크기에 비례하며, 서비스 부하에 따라 달라집니다. 백업이 실패할 경우 백업 윈도우를 넘지 않았다면 백업 재시도 횟수에 따라 백업을 다시 시도합니다.

자동 백업의 이름은 `{DB 인스턴스의 이름}_yyyy-MM-dd-HH-mm` 형태로 부여됩니다.

> [주의]
> 앞선 백업이 종료되지 않는 등의 상황에서는 백업이 수행되지 않을 수 있습니다.

### 백업 스토리지 및 과금

모든 백업 파일은 내부 백업 스토리지에 업로드하여 저장합니다. 수동 백업의 경우 별도로 삭제하기 전까지 영구히 저장되며 백업 용량에 따라 백업 스토리지 과금이 발생합니다. 자동 백업의 경우 설정한 보관 기간만큼 저장되며 자동 백업 파일의 전체 크기 중 DB 인스턴스의 스토리지 크기를 초과한 용량에 대해서 과금합니다. 백업 파일이 저장된 내부 백업 스토리지에 직접 접근할 수 없습니다.

### 백업 내보내기

#### 백업을 수행하면서 파일 내보내기

백업 후 백업 파일을 사용자 오브젝트 스토리지로 내보낼 수 있습니다.

![db-instance-list-export-obs-ko](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-list-export-obs-ko.png)

![db-instance-list-export-obs-modal-ko](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-list-export-obs-modal-ko.png)

❶ 백업할 DB 인스턴스를 선택한 뒤 드롭다운 메뉴에서 **백업 후 오브젝트 스토리지로 백업 파일 내보내기**를 클릭하면 설정 팝업 화면이 나타납니다.
❷ 백업이 저장될 오브젝트 스토리지의 테넌트 ID를 입력합니다. 테넌트 ID는 API 엔드포인트 설정에서 확인할 수 있습니다.
❸ 백업이 저장될 오브젝트 스토리지의 NHN Cloud 계정 또는 IAM 계정을 입력합니다.
❹ 백업이 저장될 오브젝트 스토리지의 API 비밀번호를 입력합니다.
❺ 백업이 저장될 오브젝트 스토리지의 컨테이너를 입력합니다.
❻ 컨테이너에 저장될 백업의 경로를 입력합니다. 폴더 이름은 최대 255바이트이고, 전체 경로는 최대 1024바이트입니다. 특정 형태(. 또는 ..)는 사용할 수 없으며 특수문자(' " < > ;)와 공백은 입력할 수 없습니다.

#### 백업 파일 내보내기

내부 백업 스토리지에 저장된 백업 파일을 사용자 오브젝트 스토리지로 내보낼 수 있습니다.

![db-instance-detail-backup-export-ko](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-backup-export-ko.png)

❶ 백업을 수행한 원본 DB 인스턴스의 상세 탭에서 내보낼 백업 파일을 선택한 뒤 **오브젝트 스토리지로 백업 내보내기**를 클릭하면 백업을 내보내기 위한 팝업 화면이 나타납니다.

![backup-export-ko](https://static.toastoven.net/prod_rds_postgres/20241210/backup-export-ko.png)

❷ 또는 **백업** 탭에서 내보낼 백업 파일을 선택한 뒤 **오브젝트 스토리지로 백업 내보내기**를 클릭합니다.

> [참고]
> 수동 백업의 경우 백업을 수행한 원본 DB 인스턴스가 삭제되었다면 백업을 내보낼 수 없습니다.


## 복원

백업을 이용하여 원하는 시점으로 데이터를 복원할 수 있습니다. 복원 시 항상 새로운 DB 인스턴스가 생성되며, 기존 DB 인스턴스에 복원할 수 없습니다. 백업을 수행한 원본 DB 인스턴스와 동일한 DB 엔진 버전으로만 복원할 수 있습니다. 백업이 생성된 시점으로 복원하는 백업 복원, 원하는 특정 시점으로 복원하는 시점 복원을 지원합니다.

> [주의]
> 복원할 DB 인스턴스의 데이터 스토리지 크기가 백업을 수행한 원본 DB 인스턴스의 데이터 스토리지 크기보다 작거나, 원본 DB 인스턴스의 파라미터 그룹과 다른 파라미터 그룹을 사용할 경우 복원에 실패할 수 있습니다.

### 백업 복원

백업 파일만으로 복원을 진행해 백업을 수행한 원본 DB 인스턴스가 필요하지 않습니다. 콘솔에서 백업을 복원하려면

![db-instance-detail-backup-restore](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-backup-restore-ko.png)

❶ DB 인스턴스의 상세 탭에서 복원할 백업 파일을 선택한 뒤 **백업 복원**을 클릭하면 DB 인스턴스 복원 화면으로 이동합니다.

또는

![backup-restore](https://static.toastoven.net/prod_rds_postgres/20241210/backup-restore-ko.png)

❶ 백업 탭에서 복원할 백업 파일을 선택한 뒤 **백업 복원**을 클릭합니다.

### 시점 복원

시점 복원을 이용하여 원하는 특정 시점 또는 WAL 로그의 특정 LSN으로 복원할 수 있습니다. 시점 복원을 하기 위해서는 백업 파일과 백업을 수행한 시점으로부터 복원을 원하는 시점까지의 WAL 로그가 필요합니다. WAL 로그는 백업이 수행되는 원본 DB 인스턴스의 스토리지에 저장됩니다. WAL 로그 보관 기간이 짧으면 스토리지 용량을 더 많이 사용할 수 있지만, 원하는 시점으로 복원이 어려울 수 있습니다. 아래 나열된 경우 시점 복원에 필요한 WAL 로그가 없기 때문에 원하는 시점으로 복원하지 못할 수 있습니다.

* 용량 확보를 위해 원본 DB 인스턴스의 WAL 로그를 삭제한 경우
* WAL 로그 보관 기간(최대 7일)에 따라 PostgreSQL에 의해 자동으로 WAL 로그가 삭제된 경우
* 기타 다양한 이유로 WAL 로그가 손상되거나 삭제된 경우

콘솔에서 시점 복원을 하려면

![db-instance-pitr](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-pitr-ko.png)

❶ 시점 복원할 DB 인스턴스를 선택한 뒤 **시점 복원**을 클릭하면 시점 복원을 설정할 수 있는 페이지로 이동합니다.

#### Timestamp를 이용한 복원

Timestamp를 사용한 복원 시에는 선택한 시점과 가장 가까운 백업 파일을 기준으로 복원을 진행한 뒤, 원하는 시점까지의 WAL 로그를 적용합니다.

![db-instance-pitr-01](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-pitr-01-ko.png)

❶ 복원 방법을 선택합니다.

![db-instance-pitr-02](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-pitr-02-ko.png)

❷ 복원 시각을 선택합니다. 가장 최근 시점으로 복원하거나, 원하는 특정 시점을 직접 입력할 수 있습니다.


### 오브젝트 스토리지에 있는 백업을 이용한 복원

RDS for PostgreSQL에서 오브젝트 스토리지로 내보낸 백업 파일을 이용하여 DB 인스턴스를 생성할 수 있습니다.

(1) [백업 파일 내보내기](backup-and-restore/#_5) 항목을 참고하여 RDS for PostgreSQL의 백업을 오브젝트 스토리지로 내보냅니다.

(2) 복원할 프로젝트의 콘솔에 접속한 뒤 DB 인스턴스 탭에서 **오브젝트 스토리지에 있는 백업으로 복원** 버튼을 클릭합니다.

![backup-obs-restore](https://static.toastoven.net/prod_rds_postgres/20241210/backup-obs-restore-ko.png)

❶ 백업이 저장된 오브젝트 스토리지의 테넌트 ID를 입력합니다. 테넌트 ID는 API 엔드포인트 설정에서 확인할 수 있습니다.
❷ 백업이 저장된 오브젝트 스토리지의 NHN Cloud 계정 또는 IAM 계정을 입력합니다.
❸ 백업이 저장된 오브젝트 스토리지의 API 비밀번호를 입력합니다.
❹ 백업이 저장된 오브젝트 스토리지의 컨테이너를 입력합니다.
❺ 컨테이너에 저장될 백업의 경로를 입력합니다. 폴더 이름은 최대 255바이트이고, 전체 경로는 최대 1024바이트입니다. 특정 형태(. 또는 ..)는 사용할 수 없으며 특수문자(' " < > ;)와 공백은 입력할 수 없습니다.
❻ [DB 인스턴스 생성](db-instance/#db_1) 항목을 참고해 나머지 설정을 입력 후 **오브젝트 스토리지에 있는 백업으로 복원** 버튼을 클릭합니다.