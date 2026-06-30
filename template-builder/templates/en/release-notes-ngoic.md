## Database > RDS for PostgreSQL > Release Notes

### July 25, 2026

#### Added Features

- Added storage auto-scaling feature
    - Added a feature to automatically scale storage capacity to prevent service outages caused by insufficient storage capacity.
- Added OS version upgrade feature
    - Added a feature to upgrade the OS version of DB instances to the latest version for security patches and improved stability.
- Added direct control feature for databases and users
    - Enabling the direct control option for databases and users in the master modification screen allows you to directly create or delete databases and users with a DDL account.

#### Feature Updates

- Improved high availability DB instance name input
    - Improved the feature to allow explicit input of the standby master name so that the master and standby master can be distinguished by name.
- Added log capacity collection item to storage detail chart
    - Improved the storage detail chart to allow log capacity to be viewed separately from data capacity.
- Improved access control rule addition feature
    - Improved the feature to allow bulk addition by passing the `pg_hba.conf` source as-is.
- Improved DB instance group list screen
    - Improved the UI and UX of the DB instance group list screen.
- Improved DB engine status reflection
    - Improved the system to immediately reflect the status when the DB engine is stopped.
- Improved cron schema management after pg_cron extension installation
    - Improved the system to allow viewing and directly controlling the cron schema created after installing the pg_cron extension from the database list.

#### Bug Fixes

- Fixed an issue where users could not be created with passwords containing special characters
    - Fixed an issue where users could not be created when the password contained a single quotation mark (').
- Fixed an issue where Resource Watcher resources were not deleted when the service was deactivated
    - Fixed an issue where the relevant resources were not deleted from Resource Watcher when the service was deactivated while DB instances remained.
- Fixed a parameter group comparison error
    - Fixed an issue where an error occurred when comparing a parameter group with no connected DB instances.


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
