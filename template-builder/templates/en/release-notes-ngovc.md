## Database > RDS for PostgreSQL > Release Notes

### February 10, 2026

#### Added Feautures

- Added DB extensions
    - Enabled the `pg_cron` extension.
- Added database and schema permission management
    - Implemented access control to restrict database and schema access to authorized users only.
    - Allowed designating DDL-privileged users as database or schema owners.
- Integrated Resource Watcher service
    - Enabled DB instance resource monitoring through the Resource Watcher service.

#### Feature Updates

- Improved Point-in-Time Recovery (PITR) information retrieval
    - Optimized query speeds for environments with a high volume of WAL log files.
- Expanded user permissions
    - Added a new READ-only privilege.
    - Relaxed DDL constraints to enable creating, modifying, or deleting DDL-privileged users.

#### Bug Fixes

- Fixed an issue where access control rules were inconsistent in high-availability instances
    - Fixed an issue where access control rules were inconsistent between the master and standby instances.
- Fixed an issue where non-deletable users were incorrectly displayed as deleted
    - Fixed an issue where users owning objects were incorrectly shown as deleted in the console.
    - Improved user deletion by adding options to handle owned objects, ensuring successful removal.


### 2025. 10. 28.

#### Release of a New Service

- Relational Database Service (RDS) is a service that provides relational databases in cloud environments.
- You can use relational databases without difficult settings.
