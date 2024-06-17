## Database > RDS for PostgreSQL > 서버 대시보드

## 서버 대시보드

서버 대시보드에서 성능 지표를 차트 형태로 시각화해 볼 수 있습니다. 차트는 미리 설정된 레이아웃에 따라 배치됩니다. 지표는 1분에 한 번씩 수집되며 최대 5년간 보관됩니다. 지표 데이터는 5분, 30분, 2시간, 1일 단위의 평균값으로 집계됩니다. 집계 단위별 보관 기간은 아래와 같습니다.

| 집계 단위 | 보관 기간 |
|-------|-------|
| 1분    | 7일    |
| 5분    | 1개월   |
| 30분   | 6개월   |
| 2시간   | 2년    |
| 1일    | 5년    |

## 레이아웃

레이아웃을 이용해 차트의 크기와 위치를 나타낼 수 있습니다. 서비스 활성화 시 `기본 시스템 지표`와 `기본 PostgreSQL 지표`를 기본 레이아웃으로 제공합니다. 기본 레이아웃은 변경하거나 삭제할 수 없습니다. 또한 차트를 추가하거나, 추가된 차트를 변경 또는 삭제할 수 없습니다. 차트에서 기본 레이아웃에 포함되지 않은 정보를 보려면 새 레이아웃을 만들어 차트를 추가할 수 있습니다.

![server-dashboard-layout](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-layout-ko.png)

❶ **레이아웃 관리**를 누르면 레이아웃을 관리하는 팝업 화면이 나타납니다.
❷ **+ 레이아웃 만들기**를 눌러 레이아웃을 생성할 수 있습니다.
    - 레이아웃 이름을 입력한 뒤 **생성**을 눌러 레이아웃을 생성합니다.
❸ 버튼을 클릭하면 추가된 레이아웃을 변경할 수 있습니다.
❹ 버튼을 클릭하면 추가된 레이아웃을 삭제할 수 있습니다.

### 레이아웃에 차트 추가

![server-dashboard-chart-add](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-chart-add-ko.png)

❶ 원하는 레이아웃을 선택합니다.
❷ **+ 차트 추가**를 누르면 차트를 추가할 수 있는 팝업 화면이 나타납니다.
❸ 체크박스를 선택하여 추가할 지표를 여러 개 선택할 수 있습니다.
❹ 지표 이름을 클릭하면 왼쪽 미리 보기 영역에 차트가 나타납니다.
❺ **추가**를 클릭하면 선택된 차트가 모두 추가됩니다.

### 레이아웃의 차트 변경 및 삭제

![server-dashboard-chart-manage](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-chart-manage-ko.png)

❶ 차트의 상단 영역을 클릭한 뒤 드래그 앤 드롭하여 위치를 이동할 수 있습니다.
❷ 차트의 오른쪽 하단 영역을 드래그 앤 드롭하여 차트의 크기를 변경할 수 있습니다.
❸ 차트의 오른쪽 상단 **x**를 클릭하면 레이아웃에서 차트가 삭제됩니다.

## 차트

DB 인스턴스의 각종 성능 지표를 차트 형태로 볼 수 있습니다. 성능 지표마다 각기 다른 형태의 차트로 구성되어 있습니다. 기본적인 시스템 지표 이외에 PostgreSQL에서 제공하는 각종 성능 지표를 차트로 제공하고 있습니다. 차트별로 확인할 수 있는 지표는 아래와 같습니다.

| 차트                         | 지표(단위)                                                                                                                     | 비고                                     |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| CPU 사용률                    | cpu used (%)                                                                                                               |                                        |
| CPU 상세                     | cpu user (%)<br/>cpu system (%)<br/>cpu nice (%)<br/>cpu IO wait (%)                                                       |                                        |
| CPU 평균 부하                  | 1m<br/>5m<br/>15m                                                                                                          |                                        |
| 메모리 사용량                    | memory used (%)                                                                                                            |                                        |
| 메모리 상세                     | memory used (bytes)<br/>memory free (bytes)                                                                                |                                        |
| 스왑 사용량                     | swap used (bytes)<br> swap total (bytes)                                                                                   |                                        |
| Storage 사용량                | storage used (%)                                                                                                           |                                        |
| Storage 남은 사용량             | storage free (%)                                                                                                           |                                        |
| Storage IO                 | disk read (bytes)<br> disk write (bytes)                                                                                   |                                        |
| 네트워크 데이터 송수신               | nic incoming (bytes)<br> nic outgoing (bytes)                                                                              | PostgreSQL에서 사용하는 기본적인 네트워크 전송이 발생합니다. |
| 데이터 스토리지 결함                | disk fault status                                                                                                          | 비정상: 0, 정상: 1                          |
| Database Connection Status | PostgreSQL status                                                                                                          | 접속 불가: 0, 접속 가능: 1                     |
| Queries Per Second         | qps (counts/sec)                                                                                                           |                                        |
| Connection                 | idle (counts)<br/>active (counts)<br/>total (counts)<br/>max (counts)                                                      |                                        |
| Tuple Count                | fetched (counts/sec)<br/>returned (counts/sec)<br/>inserted (counts/sec)<br/>updated (counts/sec)<br/>deleted (counts/sec) |                                        |
| Lock Tables                | count (counts/sec)                                                                                                         |                                        |
| Transaction                | commit (counts/sec)<br/>rollback (counts/sec)                                                                              |                                        |
| Deadlock/Conflict          | deadlock (counts/sec)<br/>conflict (counts/sec)                                                                            |                                        |
| Cache Hit Ratio            | %                                                                                                                          |                                        |

## 서버 그룹

서버 그룹을 이용하면 하나의 차트에서 여러 DB 인스턴스의 성능 지표를 확인할 수 있습니다. 서버 그룹에 속한 DB 인스턴스별로 성능 지표가 하나의 차트에 나타납니다. 여러 개의 성능 지표로 이루어진 차트는 서버 그룹에서는 모두 개별 성능 지표로 변경됩니다.

### 서버 그룹 생성

![server-dashboard-group-add](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-group-add-ko.png)

❶ **+ 그룹 추가**를 클릭하면 그룹을 생성할 수 있는 팝업 화면이 나타납니다.
❷ 서버 그룹에 추가할 DB 인스턴스를 선택합니다.

### 서버 그룹 설정

서버 대시보드 왼쪽의 서버 목록에 DB 인스턴스와 서버 그룹이 함께 나타납니다.

![server-dashboard-group-manage](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-group-manage-ko.png)

❶ **+**, **-**를 눌러 서버 그룹을 펼치거나 닫을 수 있습니다.
❷ 서버 그룹에 속한 DB 인스턴스를 클릭하면 차트에 표시될 색상을 변경할 수 있는 색상 선택 팝업이 나타납니다.

![server-dashboard-group-menu](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-group-menu-ko.png)

❶ **:**서버 목록의 각 항목 오른쪽에 표시되는 메뉴 아이콘을 클릭해 서버 그룹을 변경하거나 삭제할 수 있습니다.