## Database > RDS for PostgreSQL > DB Extensions

## DB Extensions
You can extend functionality by installing pre-built extensions into PostgreSQL. The following extensions are supported by RDS for PostgreSQL on NHN Cloud.

### PostgreSQL Built-in Features

The `auto_explain` extension can be applied to the entire session by adding it to the `shared_preload_libraries` parameter in the parameter group. For the remaining extensions, if you need SUPERUSER permission, you can control it by referring to the [Extension Management](db-instance/#extension) item or install the required extensions with the [CREATE EXTENSION](https://www.postgresql.org/docs/17/sql-createextension.html) syntax.

| Extension name     | PostgreSQL 14 Version | PostgreSQL 17 Version | SUPERUSER | Remarks                    | Homepage                                                 |
|--------------------|-----------------------|-----------------------|-----------|----------------------------|----------------------------------------------------------|
| auto_explain       | -                     | -                     | O         |                            | https://www.postgresql.org/docs/17/auto-explain.html     |
| citext             | 1.6                   | 1.6                   |           |                            | https://www.postgresql.org/docs/17/citext.html           |
| cube               | 1.5                   | 1.5                   |           |                            | https://www.postgresql.org/docs/17/cube.html             |
| dblink             | 1.2                   | 1.2                   | O         |                            | https://www.postgresql.org/docs/17/dblink.html           |
| earthdistance      | 1.1                   | 1.2                   | O         | Requires cube installation | https://www.postgresql.org/docs/17/earthdistance.html    |
| fuzzystrmatch      | 1.1                   | 1.2                   |           |                            | https://www.postgresql.org/docs/17/fuzzystrmatch.html    |
| hstore             | 1.8                   | 1.8                   |           |                            | https://www.postgresql.org/docs/17/hstore.html           |
| intarray           | 1.5                   | 1.5                   |           |                            | https://www.postgresql.org/docs/17/intarray.html         |
| isn                | 1.2                   | 1.2                   |           |                            | https://www.postgresql.org/docs/17/isn.html              |
| lo                 | 1.1                   | 1.1                   |           |                            | https://www.postgresql.org/docs/17/lo.html               |
| ltree              | 1.2                   | 1.3                   |           |                            | https://www.postgresql.org/docs/17/ltree.html            |
| pg_stat_statements | 1.9                   | 1.11                  | O         |                            | https://www.postgresql.org/docs/17/pgstatstatements.html |
| pg_trgm            | 1.6                   | 1.6                   |           |                            | https://www.postgresql.org/docs/17/pgtrgm.html           |
| pgcrypto           | 1.3                   | 1.3                   |           |                            | https://www.postgresql.org/docs/17/pgcrypto.html         |
| pgrowlocks         | 1.1                   | 1.1                   | O         |                            | https://www.postgresql.org/docs/17/pgrowlocks.html       |
| postgres_fdw       | 1.0                   | 1.0                   | O         |                            | https://www.postgresql.org/docs/17/postgres-fdw.html     |
| tablefunc          | 1.0                   | 1.0                   |           |                            | https://www.postgresql.org/docs/17/tablefunc.html        |

### RDS Additional Features

Installing the additional offered extensions requires a DB engine restart, if necessary, after adding the setting to the shared_preload_libraries parameter in the parameter group.

| Extension name               | PostgreSQL 14 Version | PostgreSQL 17 Version | SUPERUSER | Setting parameters | Remarks                                      | Homepage                             |
|------------------------------|-----------------------|-----------------------|-----------|--------------------|----------------------------------------------|--------------------------------------|
| address_standardizer         | 3.4.1                 | 3.5.1                 | O         |                    | Requires postgis installation                |                                      |
| address_standardizer_data_us | 3.4.1                 | 3.5.1                 | O         |                    | Requires postgis installation                |                                      |
| pg_cron                      | 1.6.7                 | 1.6.7                 | O         | Required           |                                              | https://github.com/citusdata/pg_cron |
| pg_repack                    | 1.4.8                 | 1.5.2                 | O         |                    |                                              | https://reorg.github.io/pg_repack/   |
| pgAudit                      | 1.6.2                 | 17.0                  | O         | Required           |                                              | https://www.pgaudit.org/             |
| pgrouting                    | 3.6.2                 | 3.7.1                 | O         |                    | Requires postgis installation                | https://pgrouting.org/               |
| postgis                      | 3.4.1                 | 3.5.1                 | O         |                    |                                              | https://postgis.net/                 |
| postgis_raster               | 3.4.1                 | 3.5.1                 | O         |                    | Requires postgis installation                |                                      |
| postgis_sfcgal               | 3.4.1                 | 3.5.1                 | O         |                    | Requires postgis installation                |                                      |
| postgis_tiger_geocoder       | 3.4.1                 | 3.5.1                 |           |                    | fuzzystrmatch, requires postgis installation |                                      |
| postgis_topology             | 3.4.1                 | 3.5.1                 | O         |                    | Requires postgis installation                |                                      |
| vector                       | 0.8.0                 | 0.8.0                 | O         |                    |                                              | https://github.com/pgvector/pgvector |