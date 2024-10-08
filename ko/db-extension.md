## Database > RDS for PostgreSQL > DB 확장 기능

## DB 확장 기능
미리 빌드된 확장 기능을 PostgreSQL에 설치하여 기능을 확장할 수 있습니다. NHN Cloud의 RDS for PostgreSQL에서 지원하는 확장 기능은 아래와 같습니다.

### PostgreSQL 기본 제공 기능

`auto_explain` 모듈은 파라미터 그룹의 `shared_preload_libraries` 파라미터에 추가해서 전체 세션에 적용하거나 `LOAD` 구문으로 각 세션별로 따로 적용할 수 있습니다. 나머지 확장 기능들은 [CREATE EXTENSION](https://www.postgresql.org/docs/14/sql-createextension.html) 구문으로 필요한 확장 기능을 설치할 수 있습니다.

| 확장 기능 이름           | 버전  | 비고         | 홈페이지                                                     |
|--------------------|-----|------------|----------------------------------------------------------|
| auto_explain       | -   |            | https://www.postgresql.org/docs/14/auto-explain.html     |
| citext             | 1.6 |            | https://www.postgresql.org/docs/14/citext.html           |
| cube               | 1.5 |            | https://www.postgresql.org/docs/14/cube.html             |
| dblink             | 1.2 |            | https://www.postgresql.org/docs/14/dblink.html           |
| earthdistance      | 1.1 | cube 설치 필요 | https://www.postgresql.org/docs/14/earthdistance.html    |
| fuzzystrmatch      | 1.1 |            | https://www.postgresql.org/docs/14/fuzzystrmatch.html    |
| hstore             | 1.8 |            | https://www.postgresql.org/docs/14/hstore.html           |
| intarray           | 1.5 |            | https://www.postgresql.org/docs/14/intarray.html         |
| isn                | 1.2 |            | https://www.postgresql.org/docs/14/isn.html              |
| lo                 | 1.1 |            | https://www.postgresql.org/docs/14/lo.html               |
| ltree              | 1.2 |            | https://www.postgresql.org/docs/14/ltree.html            |
| pg_stat_statements | 1.9 |            | https://www.postgresql.org/docs/14/pgstatstatements.html |
| pg_visibility      | 1.2 |            | https://www.postgresql.org/docs/14/pgvisibility.html     |
| pgcrypto           | 1.3 |            | https://www.postgresql.org/docs/14/pgcrypto.html         |
| pgrowlocks         | 1.2 |            | https://www.postgresql.org/docs/14/pgrowlocks.html       |
| postgres_fdw       | 1.1 |            | https://www.postgresql.org/docs/14/postgres-fdw.html     |
| tablefunc          | 1.0 |            | https://www.postgresql.org/docs/14/tablefunc.html        |

### RDS 추가 제공 기능

추가 제공되는 확장 기능을 설치하려면 필요한 경우 파라미터 그룹의 `shared_preload_libraries` 파라미터에 설정 추가 후 DB 엔진 재시작이 필요합니다. 재시작이 완료되면 [CREATE EXTENSION](https://www.postgresql.org/docs/14/sql-createextension.html) 구문으로 필요한 확장 기능을 설치할 수 있습니다.

| 확장 기능 이름                     | 버전    | 파라미터 설정 | 비고                           | 홈페이지                               |
|------------------------------|-------|---------|------------------------------|------------------------------------|
| pg_repack                    | 1.4.8 |         |                              | https://reorg.github.io/pg_repack/ |
| pgAudit                      | 1.6.2 | 추가 필요   |                              | https://www.pgaudit.org/           |
| pgrouting                    | 3.6.2 |         | postgis 설치 필요                | https://pgrouting.org/             |
| postgis                      | 3.4.1 | 추가 필요   |                              | https://postgis.net/               |
| postgis_raster               | 3.4.1 |         | postgis 설치 필요                |                                    |
| postgis_sfcgal               | 3.4.1 |         | postgis 설치 필요                |                                    |
| postgis_tiger_geocoder       | 3.4.1 |         | fuzzystrmatch, postgis 설치 필요 |                                    |
| postgis_topology             | 3.4.1 |         | postgis 설치 필요                |                                    |
| address_standardizer         | 3.4.1 |         | postgis 설치 필요                |                                    |
| address_standardizer_data_us | 3.4.1 |         | postgis 설치 필요                |                                    |
