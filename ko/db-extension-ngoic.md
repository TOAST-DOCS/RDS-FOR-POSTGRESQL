## Database > RDS for PostgreSQL > DB 확장 기능

## DB 확장 기능
미리 빌드된 확장 기능을 PostgreSQL에 설치하여 기능을 확장할 수 있습니다. NHN Cloud의 RDS for PostgreSQL에서 지원하는 확장 기능은 아래와 같습니다.

### PostgreSQL 기본 제공 기능

`auto_explain` 확장은 파라미터 그룹의 `shared_preload_libraries` 파라미터에 추가해서 전체 세션에 적용시킬 수 있습니다. 나머지 확장 기능들은 SUPERUSER 권한이 필요한 경우 [확장 관리](db-instance-ngoic/#extension) 항목을 참고해 제어하거나  [CREATE EXTENSION](https://www.postgresql.org/docs/17/sql-createextension.html) 구문으로 필요한 확장 기능을 설치할 수 있습니다.

| 확장 기능 이름           | PostgreSQL 14 제공 버전 | PostgreSQL 17 제공 버전 | SUPERUSER 권한 | 비고         | 홈페이지                                                     |
|--------------------|---------------------|---------------------|--------------|------------|----------------------------------------------------------|
| auto_explain       | -                   | -                   | O            |            | https://www.postgresql.org/docs/17/auto-explain.html     |
| citext             | 1.6                 | 1.6                 |              |            | https://www.postgresql.org/docs/17/citext.html           |
| cube               | 1.5                 | 1.5                 |              |            | https://www.postgresql.org/docs/17/cube.html             |
| dblink             | 1.2                 | 1.2                 | O            |            | https://www.postgresql.org/docs/17/dblink.html           |
| earthdistance      | 1.1                 | 1.2                 | O            | cube 설치 필요 | https://www.postgresql.org/docs/17/earthdistance.html    |
| fuzzystrmatch      | 1.1                 | 1.2                 |              |            | https://www.postgresql.org/docs/17/fuzzystrmatch.html    |
| hstore             | 1.8                 | 1.8                 |              |            | https://www.postgresql.org/docs/17/hstore.html           |
| intarray           | 1.5                 | 1.5                 |              |            | https://www.postgresql.org/docs/17/intarray.html         |
| isn                | 1.2                 | 1.2                 |              |            | https://www.postgresql.org/docs/17/isn.html              |
| lo                 | 1.1                 | 1.1                 |              |            | https://www.postgresql.org/docs/17/lo.html               |
| ltree              | 1.2                 | 1.3                 |              |            | https://www.postgresql.org/docs/17/ltree.html            |
| pg_stat_statements | 1.9                 | 1.11                | O            |            | https://www.postgresql.org/docs/17/pgstatstatements.html |
| pg_trgm            | 1.6                 | 1.6                 |              |            | https://www.postgresql.org/docs/17/pgtrgm.html           |
| pgcrypto           | 1.3                 | 1.3                 |              |            | https://www.postgresql.org/docs/17/pgcrypto.html         |
| pgrowlocks         | 1.2                 | 1.2                 | O            |            | https://www.postgresql.org/docs/17/pgrowlocks.html       |
| postgres_fdw       | 1.1                 | 1.1                 | O            |            | https://www.postgresql.org/docs/17/postgres-fdw.html     |
| tablefunc          | 1.0                 | 1.0                 |              |            | https://www.postgresql.org/docs/17/tablefunc.html        |

### RDS 추가 제공 기능

추가 제공되는 확장 기능을 설치하려면 필요한 경우 파라미터 그룹의 `shared_preload_libraries` 파라미터에 설정 추가 후 DB 엔진 재시작이 필요합니다.

| 확장 기능 이름                     | PostgreSQL 14 제공 버전 | PostgreSQL 17 제공 버전 | SUPERUSER 권한 | 파라미터 설정 | 비고                           | 홈페이지                                 |
|------------------------------|---------------------|---------------------|--------------|---------|------------------------------|--------------------------------------|
| address_standardizer         | 3.4.1               | 3.5.1               | O            |         | postgis 설치 필요                |                                      |
| address_standardizer_data_us | 3.4.1               | 3.5.1               | O            |         | postgis 설치 필요                |                                      |
| pg_cron                      | 1.6.7               | 1.6.7               | O            | 추가 필요   |                              | https://github.com/citusdata/pg_cron |
| pg_repack                    | 1.4.8               | 1.5.2               | O            |         |                              | https://reorg.github.io/pg_repack/   |
| pgAudit                      | 1.6.2               | 17.0                | O            | 추가 필요   |                              | https://www.pgaudit.org/             |
| pgrouting                    | 3.6.2               | 3.7.1               | O            |         | postgis 설치 필요                | https://pgrouting.org/               |
| postgis                      | 3.4.1               | 3.5.1               | O            |         |                              | https://postgis.net/                 |
| postgis_raster               | 3.4.1               | 3.5.1               | O            |         | postgis 설치 필요                |                                      |
| postgis_sfcgal               | 3.4.1               | 3.5.1               | O            |         | postgis 설치 필요                |                                      |
| postgis_tiger_geocoder       | 3.4.1               | 3.5.1               |              |         | fuzzystrmatch, postgis 설치 필요 |                                      |
| postgis_topology             | 3.4.1               | 3.5.1               | O            |         | postgis 설치 필요                |                                      |
| vector                       | 0.8.0               | 0.8.0               | O            |         |                              | https://github.com/pgvector/pgvector |
