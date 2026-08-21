<!-- pre-align:aligned sig=fe0e7c038b52 -->

<a id="database-rds-for-postgresql-release-notes"></a>
## Database > RDS for PostgreSQL > Release Notes { #database-rds-for-postgresql-release-notes }

<a id="august-11-2026"></a>
### August 11, 2026 { #august-11-2026 }

<a id="august-11-2026-added-features"></a>
#### Added Features

- New Region Launched
    - Newly launched in the Korea (Pyeongchon) region.
- Added the ability to create a read replica in a different region
    - You can create a read replica by selecting a region different from the source DB instance's region.
- Added snapshot backup
    - You can select the snapshot backup method when running a backup.
    - Backups are performed using Cinder storage snapshots without affecting DB instance performance.
- Added new DB engine versions
    - Added PostgreSQL versions 14.23 and 17.10.
- Added the ability to check version upgrade history
    - You can check the version upgrade history in a pop-up on the DB instance details screen.

<a id="august-11-2026-feature-updates"></a>
#### Feature Updates

- Improved handling of database and user deletion failures
    - Improved the console to display an error message when database or user deletion fails.
- Increased the character limit for database and user names
    - Improved the feature so that database and user names can be created and modified with up to 63 characters.

<a id="august-11-2026-bug-fixes"></a>
#### Bug Fixes

- Fixed an issue where DDL users were not granted creation permission
    - Fixed an issue where, when adding a DDL user while using direct database control, creation permission was not granted.

<a id="june-9-2026"></a>
### June 9, 2026 { #june-9-2026 }

<a id="june-9-2026-added-features"></a>
#### Added Features

- Added direct control feature for databases and users
    - Enabling the direct control option for databases and users in the master modification screen allows you to directly create or delete databases and users with a DDL account.

<a id="june-9-2026-feature-updates"></a>
#### Feature Updates

- Improved DB instance group list screen
    - Improved the UI and UX of the DB instance group list screen.
- Improved DB engine status reflection
    - Improved the system to immediately reflect the status when the DB engine is stopped.
- Improved cron schema management after pg_cron extension installation
    - Improved the system to allow viewing and directly controlling the cron schema created after installing the pg_cron extension from the database list.

<a id="june-9-2026-bug-fixes"></a>
#### Bug Fixes

- Fixed an issue where users could not be created with passwords containing special characters
    - Fixed an issue where users could not be created when the password contained a single quotation mark (').
- Fixed an issue where Resource Watcher resources were not deleted when the service was deactivated
    - Fixed an issue where the relevant resources were not deleted from Resource Watcher when the service was deactivated while DB instances remained.
- Fixed a parameter group comparison error
    - Fixed an issue where an error occurred when comparing a parameter group with no connected DB instances.


<a id="april-14-2026"></a>
### April 14, 2026 { #april-14-2026 }

<a id="april-14-2026-added-features"></a>
#### Added Features

- Added storage auto-scaling feature
    - Added a feature to automatically scale storage capacity to prevent service outages caused by insufficient storage capacity.
- Added OS version upgrade feature
    - Added a feature to upgrade the OS version of DB instances to the latest version for security patches and improved stability.

<a id="april-14-2026-feature-updates"></a>
#### Feature Updates

- Improved high availability DB instance name input
    - Improved the feature to allow explicit input of the standby master name so that the master and standby master can be distinguished by name.
- Added log capacity collection item to storage detail chart
    - Improved the storage detail chart to allow log capacity to be viewed separately from data capacity.
- Improved access control rule addition feature
    - Improved the feature to allow bulk addition by passing the `pg_hba.conf` source as-is.


<a id="february-10-2026"></a>
### February 10, 2026 { #february-10-2026 }

<a id="february-10-2026-added-feautures"></a>
#### Added Feautures

- Added DB extensions
    - Enabled the `pg_cron` extension.
- Added database and schema permission management
    - Implemented access control to restrict database and schema access to authorized users only.
    - Allowed designating DDL-privileged users as database or schema owners.
- Integrated Resource Watcher service
    - Enabled DB instance resource monitoring through the Resource Watcher service.

<a id="february-10-2026-feature-updates"></a>
#### Feature Updates

- Improved Point-in-Time Recovery (PITR) information retrieval
    - Optimized query speeds for environments with a high volume of WAL log files.
- Expanded user permissions
    - Added a new READ-only privilege.
    - Relaxed DDL constraints to enable creating, modifying, or deleting DDL-privileged users.

<a id="february-10-2026-bug-fixes"></a>
#### Bug Fixes

- Fixed an issue where access control rules were inconsistent in high-availability DB instances
    - Fixed an issue where access control rules were inconsistent between the master and standby instances.
- Fixed an issue where non-deletable users were incorrectly displayed as deleted
    - Fixed an issue where users owning objects were incorrectly shown as deleted in the console.
    - Improved user deletion by adding options to handle owned objects, ensuring successful removal.

<a id="october-28-2025"></a>
### October 28, 2025 { #october-28-2025 }

<a id="october-28-2025-added-features"></a>
#### Added Features

- Added new DB engine version
    - Added PostgreSQL 14.19, 17.6 versions.

<a id="october-28-2025-bug-fixes"></a>
#### Bug Fixes

- Fixed an issue for exposure capacity within free-up capacity modal
    - Fixed an issue that the capacity exposed within the free-up capacity modal is less than the actual capacity secured.

<a id="april-15-2025"></a>
### April 15, 2025 { #april-15-2025 }

<a id="april-15-2025-added-features"></a>
#### Added Features

- Added new DB engine version
    - Added PostgreSQL 14.17, 17.4 versions.
- Added the feature to manage extension
    - Added the feature to install or remove extensions requiring SUPERUSER permissions from the console.
    - You can now synchronize the extension list with the database and user list.
- Added the log retention period to the maintenance setting
    - Added the feature to delete the PostgreSQL logs that have exceeded their retention period when using the automatic storage cleanup feature.

<a id="april-15-2025-feature-updates"></a>
#### Feature Updates

- Restrict new DB engine creation
    - A security vulnerability has been detected in version PostgreSQL 14.15, 17.2, so upgrading to the latest version is [recommended](https://www.postgresql.org/support/security/CVE-2025-1094/).
    - It is only allowed in limited cases, such as when changing an existing DB instance to high availability or restoring from a backup.

<a id="feb-11-2025"></a>
### Feb 11, 2025 { #feb-11-2025 }

<a id="feb-11-2025-added-features"></a>
#### Added Features

- Added a new DB engine version
    - Added PostgreSQL versions 14.15, 17.2.
- Added a feature to upgrade DB engine version
    - You can upgrade the DB Engine version from an existing version to the recently added version.

<a id="feb-11-2025-features-updates"></a>
#### Features Updates

- Added DB engine creation limit
    - A security vulnerability has been discovered in PostgreSQL version 14.6 and an upgrade to a newer version is [recommended](https://www.postgresql.org/about/news/postgresql-171-165-159-1414-1317-and-1221-released-2955/).
    - DB engine creation is allowed for changing an existing DB instance to high availability or restoring with a backup.

<a id="december-10-2024"></a>
### December 10, 2024 { #december-10-2024 }

<a id="december-10-2024-added-features"></a>
#### Added Features

- Added High Availability
    - Added the feature to create and modify high-availability DB instances.
- Added Database & User Synchronization
    - Added the feature to view databases and user lists in sync with information within the DB engine.
- Added Maintenance Settings
    - Provides the feature to periodically clean up storage to help stabilize DB instances.
- Added Backup Export
    - Added the feature to select an existing backup or start a new backup and export it to user object storage.
- Added the feature to restore to a backup in object storage
    - Added the feature to restore from a backup exported to object storage.
- Added API Feature
    - Allow you to control RDS for PostgreSQL features via APIs.

<a id="december-10-2024-feature-updates"></a>
#### Feature Updates

- Changed the DB Instance > **Backup** tab name
    - Renamed the **Backup** tab to **Backup and Maintenance** among the detail tabs of the DB instance.
    - You can additionally check the maintenance settings within your DB instance.
- Changed User Permissions in Databases
    - Expanded DDL user permissions from the `CREATE` schema permission to the `CREATE` database permission.
    - As part of the expanded permissions, changed to allow schema creation with DDL user IDs.
- Improved Database List View Feature
    - Improved the feature to view a list of schemas added as DDL users in the database list.
- Improved Backup Settings
    - Removed the backup retry expiration time entry and improved to retry backups within the backup window time range.
- Changed Feature to Free up Capacity
    - Improved the selection of WAL log files from directly selecting them to a backup time base that allows point-in-time restores.
- Changed the `shared_buffers` parameter
    - Changed to Limit the parameter to a maximum of 50% of the DB instance RAM size, as using an excessively large value can cause problems running the DB engine.

<a id="october-15-2024"></a>
### October 15, 2024 { #october-15-2024 }

<a id="october-15-2024-added-features"></a>
#### Added Features

- Added auto backup settings
    - Added the feature to set whether to allow auto backups.
    - You can disallow auto backups under any circumstances.
        - If you don't have the backups required for replication, you are limited to creating read replicas.
- Added the feature to wait for replication delay on force promotion
    - Added the feature to wait for replication delays to resolve when force promoting.
- Added the feature to end replication delay queuing
    - Added the feature to end the wait for replication delays when promoting/forcing a promotion.
- Added DB extensions
    - Allow you to install pgrouting, bool, hstore, intarray, isn, lo, ltree, and more.

<a id="october-15-2024-feature-updates"></a>
#### Feature Updates

- Improved event subscription search
    - Improved so that you can search by event source name.
- Improved the feature to enter the shared_preload_libraries parameter
    - Improved the way shared_preload_libraries values are entered to a multi-select drop-down list format.

<a id="october-15-2024-bug-fixes"></a>
#### Bug fixes

- Fix default notification creation errors
    - Fixed default notification creation to ignore the existence of a notification group with the same name.
- Fixed an error with the log_timezone parameter
    - Fixed an issue where replication fails when the log_timezone value is applied to something other than Asia/Seoul.
- Fixed an error with the max_connections parameter
    - Fixed an issue with the order of application when changing the max_connections value with read replicas added.
    - Changed the parameter to be inapplicable if the value on the master is set to be greater than the read replica.
    - Changed the parameter to be inapplicable if the value of the read replica is set to less than the master.

<a id="august-13-2024"></a>
### August 13, 2024 { #august-13-2024 }

<a id="august-13-2024-added-features"></a>
#### Added Features

- Added DB instance deletion protection feature
- Added connected notification groups, operating system information to DB instance detail view screen
- Added the feature to create read replicas
    - Added replication latency to monitoring charts and monitoring settings.
- Added the Subscribe to Events feature
    - Notifications sent when certain events occur.

<a id="august-13-2024-feature-updates"></a>
#### Feature Updates

- Improved the access control feature
    - Added the option to add default access control rules when adding users.
    - Improved usability to allow drag-and-drop rule ordering.
- Improved to see which parameter items actually change when applying parameter group changes
- Improved the service activation screen
    - Improved to auto-refresh on service activation.
- Improved the parameter group detail Screen
    - Added the TIMEZONE type and improved the dropdown to search for and enter it.
    - Improved the feature to select units with a dropdown when editing parameters with units.

<a id="june-11-2024"></a>
### June 11, 2024 { #june-11-2024 }

<a id="june-11-2024-release-of-a-new-service"></a>
#### Release of a New Service

- Relational Database Service (RDS) is a service that provides relational databases in cloud environments.
- You can use relational databases without difficult settings.
- PostgreSQL 14.6 version is provided.
