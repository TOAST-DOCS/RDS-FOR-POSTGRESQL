## Database > RDS for PostgreSQL > DB 확장 기능

## DB 확장 기능
미리 빌드된 확장 기능을 PostgreSQL에 설치하여 기능을 확장 할 수 있습니다. 확장 기능을 설치하려면 파라미터 그룹의 `shared_preload_libraries`에 필요한 모듈을 추가 후 DB 엔진 재시작이 필요합니다. 재시작이 완료되면 [CREATE EXTENSION](https://www.postgresql.org/docs/14/sql-createextension.html) 구문으로 필요한 확장 기능을 설치할 수 있습니다. NHN Cloud의 RDS for PostgreSQL에서 지원하는 확장 기능은 아래와 같습니다.


### RDS에서 제공하는 확장 기능

아래에 명시된 버전을 사용할 수 있습니다.

| 확장 기능 이름           | 버전    | 홈페이지                                                     |
|--------------------|-------|----------------------------------------------------------|
| auto_explain       | -     | https://www.postgresql.org/docs/14/auto-explain.html     |
| citext             | 1.6   | https://www.postgresql.org/docs/14/citext.html           |
| cube               | 1.5   | https://www.postgresql.org/docs/14/cube.html             |
| dblink             | 1.2   | https://www.postgresql.org/docs/14/dblink.html           |
| earthdistance      | 1.1   | https://www.postgresql.org/docs/14/earthdistance.html    |
| fuzzystrmatch      | 1.1   | https://www.postgresql.org/docs/14/fuzzystrmatch.html    |
| pg_repack          | 1.4.8 | https://reorg.github.io/pg_repack/                       |
| pg_stat_statements | 1.9   | https://www.postgresql.org/docs/14/pgstatstatements.html |
| pg_visibility      | 1.2   | https://www.postgresql.org/docs/14/pgvisibility.html     |
| pgAudit            | 1.6.2 | https://www.pgaudit.org/                                 |
| pgcrypto           | 1.3   | https://www.postgresql.org/docs/14/pgcrypto.html         |
| pgrowlocks         | 1.2   | https://www.postgresql.org/docs/14/pgrowlocks.html       |
| postgis-3          | 3.4.1 | https://postgis.net/                                     |
| postgres_fdw       | 1.1   | https://www.postgresql.org/docs/14/postgres-fdw.html     |
| tablefunc          | 1.0   | https://www.postgresql.org/docs/14/tablefunc.html        |
