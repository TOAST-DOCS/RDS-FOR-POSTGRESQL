## Database > RDS for PostgreSQL > DB Instances

## DB Instance

A DB instance is a concept that encompasses virtual equipment and installed PostgreSQL, a unit of PostgreSQL provided by RDS for PostgreSQL.
You do not have direct access to the operating system of the DB instance; you can only access the database through the port you entered when you created the DB instance. The available port ranges have the following restrictions.

* The available port ranges are from 5432 to 45432.

DB instance is identified by the name given by the customer and the 32-byte ID given automatically.
DB instance names have the following restrictions.

* DB instance name has to be unique for each region.
* DB instance names can only contain alphabets between 1 and 100 characters, numbers, and some symbols (-, \_, .), and the first letter can only be an alphabetic character.

## Create DB Instance

You can create a DB instance through the settings below.

### Availability Zone

NHN Cloud has divided the entire system into multiple availability areas to prepare for failures caused by physical hardware problems. For each of these availability areas, storage systems, network switches, top and power supplies are all configured separately. Failure within one area of availability does not affect another area of availability, which means increasing availability across the service. If you deploy DB instances across multiple availability areas, you can increase the availability of services. Network communication is possible between DB instances created across multiple availability zones, and there is no network usage charge for this.

> [Caution]
> You cannot change the availability area of an already created DB instance.

### DB Engine

The versions specified below are available.

| Version          | Note |
|------------------|------|
| PostgreSQL 14.17 |      |
| PostgreSQL 14.19 |      |
| PostgreSQL 17.4  |      |
| PostgreSQL 17.6  |      |


### DB instance type

DB instances have different CPU cores and different memory capacities, depending on the type.
When you create a DB instance, you must select the appropriate DB instance type according to the database workload.

| Type | Description                                                                                                                              |
|------|------------------------------------------------------------------------------------------------------------------------------------------|
| m2   | This is a type that balances CPU and memory.                                                                                             |
| c2   | This is an Instance type with high CPU performance.                                                                                      |
| r2   | It can be used when memory is used more than other resources.                                                                            |
| x1   | It is a type that supports high-specification CPU and memory. It can be used for services or applications that require high performance. |

The type of DB instance that you have already created can be easily changed through the console.

> [Caution]
> Changing the type of a DB instance that you have already created will shut down the DB instance, resulting in a few minutes of downtime.

### Data Storage

Stores the database's data files in data storage. DB instances support two types of data storage: HDD and SSD. Performance and price vary by data storage type, so you need to choose the right type according to your database workload. Data storage can be created in 20GB to 2TB.

> [Caution]
> You cannot change the data storage type of an already created DB instance.

> [Note]
> To use more than 2TB of data storage, contact NHN Cloud Customer Center.

The following tasks use the I/O capacity of the data storage, which may degrade the performance of DB instances during the process.

* Backup a single DB instance
* High availability configuration of a single DB instance
* Create a read replica
* Rebuild a read replica
* Rebuild a candidate master
* Restore to a certain point in time
* Export backup files to object storage after backup on a single DB instance

### High Avilability

High availability DB instances increase availability and data durability, and provide a fault-tolerant database. High availability DB instances consist of a master, a candidate master, and are created in different availability zones. A candidate master is a DB instance that is prepared for failure and is not normally available. For highly available DB instances, backups are performed on the candidate master to avoid performance degradation due to backups. You can see the various features provided by the High Availability DB Instance in [High Availability DB Instance](db-instance/#_1).

### Information

Set DB instance default information. You can enter the instance name, description, DB port, and user information that you want to create by default.
The user ID you enter is created with DDL permissions.

**READ**
* Includes read-only access to the data.

**CRUD**
* Includes READ permissions with the ability to modify data.

**DDL**
* Includes full CRUD permissions and the authority to execute DDL queries.
* Enables assignment as the database or schema owner.

### Floating IP

To access a DB instance from outside, you must connect the floating IP to DB instance. You can create a floating IP only if you connect a subnet to which the Internet Gateway is connected. Floating IP is charged at the same time as it is used, and separately, it is charged separately if traffic is generated in the direction of the Internet through the floating IP.

### Parameter Group

A parameter group is a set of parameters that allow you to set up a database installed on a DB instance. You must select one parameter group when you create a DB instance. The parameter group can be changed freely even after it is created. For a detailed description of the parameter group, refer to [Parameter Group](parameter-group/).

### DB Security Group

DB security groups are used to restrict access against outside break-in. You can allow access to specific port ranges or database ports for incoming and outgoing traffic. You can apply multiple DB security groups to a DB instance. For a detailed description of DB security groups, refer to [DB security groups](db-security-group/).

### Backup

You can set up a database of DB instances to periodically back up, or you can create backups at any time with console. During the backup, the performance might degrade. We recommended that you back up at a time when the service load is not high so as not to affect the service. If you don't want performance degradation from backups, you can perform backups on a read replica. Backup files are stored in internal backup storage and are charged based on backup capacity. We recommend that you enable periodic backups to prepare for unexpected failures. For a detailed description of backups, see [Backup and Restore](backup-and-restore/).

### Maintenance

Periodically, set tasks to run that can help stabilize the DB instance. If you are using file I/O, you might experience performance degradation while maintenance tasks are performed. We recommend that you run automatic maintenance tasks during off-peak hours to avoid impacting your services.

#### Enable Auto Storage Cleanup

Clean up archived write ahead logs that do not affect service behavior. Archived transaction logs that do not affect service behavior are logs that are not used when using automatic backups to restore to the current point in time.

### Default Notification

You can set default notifications when creating a DB instance. Setting default notifications creates a new notification group with `{DB instance name}-default` name and automatically sets the notification items below. You can freely modify and delete notification groups generated by default notifications. See [Notification Groups](notification/) for a detailed description of notification groups.

| Items                       | comparison method | Threshold value | Duration    |
|-----------------------------|-------------------|-----------------|-------------|
| CPU Usage                   | >=                | 80%             | 5 minutes   |
| Storage Remaining Usage     | <=                | 5,120MB         | 5 minutes   |
| Database Connection Status  | <=                | 0               | 0 minutes   |
| Storage usage               | >=                | 95%             | 5 minutes   |
| Data storage fault          | <=                | 0               | 0 minutes   |
| Connection Ratio            | >=                | 85%             | 5 minutes   |
| Memory Usage                | >=                | 90%             | 5 minutes   |


## DB Instances

You can view the DB instances created from the console. You can view in groups of DB instances, or as individual DB instances.

![db-instance-list-basic](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-list-basic-en.png)

❶ Change the DB instance screen mode.
❷ Change the deletion protection settings by clicking the lock icon.
❸ Display the most recently collected monitoring metrics.
❹ Display the current status.
❺ Spinner icon appears if any work in progress exists.
❻ Change the search conditions.

DB instance's status consists of the following values, which change based on your behavior and your current status.

| Status            | Description         |
|-------------------|---------------------|
| BEFORE_CREATE     | Before creating     |
| AVAILABLE         | Available           |
| STORAGE_FULL      | Lack of storage     |
| FAIL_TO_CREATE    | Fail to create      |
| FAIL_TO_CONNECT   | Fail to connect     |
| REPLICATION_DELAY | Replication latency |
| REPLICATION_STOP  | Replication stopped |
| SHUTDOWN          | shutdown            |

The search conditions that can be changed are as follows.

![db-instance-list-filter](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-list-filter-en.png)

❶ Retrieve the status of DB instance by filtering criteria.
❷ Retrieve availability zones by filtering criteria.

## DB Instance Details

Select DB instance to view details.

![db-instance-detail-basic](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-detail-basic-en.png)

❶ When you click on the domain of the connection information, the pop-up window to verify the IP address appears.
❷ When you click on the DB security group, a pop-up window appears to verify the DB security rules.
❸ Click a parameter group to go to the screen where you can check the parameters.
❹ Adjust the height of the detail panel by dragging and dropping with the mouse.
❺ Adjust the height of the detail panel to a pre-determined height.

### Connection Information

Issues an internal domain when you create a DB instance. Internal domain refers to an IP address that belongs to the user's VPC subnet. In the case of a high availability DB instance, the internal domain does not change even if the candidate master is changed to a new master in a failover. Therefore, unless there is a special reason, the application's access information must use the internal domain.

If you created a floating IP, issue an additional external domain. External domain points to the address of the floating IP. Because the external domain or floating IP is externally accessible, you must set the rules of the DB security group appropriately to protect the DB instance.

### Log

On the Logs tab of the DB instance, you can view or download various log files. Log files will rotate to the set settings as follows. Some log files can be enabled or disabled in a parameter group.

| Items           | Rotate Settings      | Whether to change or not | 
|-----------------|----------------------|--------------------------|
| postgresql.log  | 40 items of 100 MB   | Static                   |
| backup.log      | Daily 10 items       | Static                   |

![db-instance-detail-log](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-detail-log-en.png)

❶ When you click **View Log**, a pop-up window appears where you can view the contents of the log file. You can check logs up to 65,535 Bytes.
❷ Click on **Import** to request that the log files of the DB instance be downloaded.
❸ When the download is ready, the **Download** button is exposed. Click to download the log.

> [Caution]
> When **Import** is clicked, the log file is uploaded to the backup storage for approximately 5 minutes and the backup storage capacity is charged to the size of the log file.
> Click on **Download** to charge Internet traffic as large as the log file.


### Database & User

**Database & User** tab of DB instance allows you to query and control databases and users created in the DB engine.


#### Create a database

![db-instance-detail-db-create](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-detail-db-create-en.png)

❶ When you click on **+ Create**, a pop-up window appears where you can enter the name of the database.
❷ You can create the database by entering the database name and clicking **Create**.

Database names have the following restrictions.

* Only characters between 1 and 63 characters, except quotes (','), can be used.
* `postgres` `information_schema` `performance_schema` `repmgr` `db_helper` `sys` `mysql` `rds_maintenance` `pgpool` `nsight` `watchdog` `barman` `rman` are not allowed to use as database names. 

#### Modify Database

![db-instance-detail-db-modify](https://static.toastoven.net/prod_rds_postgres/20260210/db-instance-detail-db-modify-en.png)

❶ When you click on **Modify** in the database row you want to modify, a pop-up window appears where you can modify the database information.
❷ Designate a DDL user to be the owner.
❸ Grant database access by selecting the desired users.
❹ Click **Modify** to request modifications.
❺ Enabling **Immediate Apply Scheduled Access Control** applies modifications to access control rules immediately.

#### Synchronize Database

![db-instance-detail-db-sync](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-detail-db-sync-en.png)

❶ After you click **Synchronization**, the **synchronization confirmation** pop-up window appears.
❷ You can click **Confirm** to request the synchronization.

#### Delete Database

![db-instance-detail-db-delete](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-detail-db-delete-en.png)

❶ If select the database you want to delete and click on **Delete**, the Delete confirmation pop-up window appears.
❷ You can request deletion by clicking on **Delete**.

#### 스키마 수정

![db-instance-detail-schema-modify](https://static.toastoven.net/prod_rds_postgres/20260210/db-instance-detail-schema-modify-en.png)

❶ 수정할 스키마 행의 **수정**을 클릭하면 스키마 정보를 수정할 수 있는 팝업 창이 나타납니다.
❷ DDL 사용자를 선택해 소유자로 설정할 수 있습니다.
❸ 쿼리 권한을 부여할 사용자를 선택하면 해당 사용자의 권한에 따라 스키마 쿼리 권한이 부여됩니다.
❹ **수정**을 클릭하여 수정을 요청할 수 있습니다.

#### Create a User

![db-instance-detail-user-create](https://static.toastoven.net/prod_rds_postgres/20260210/db-instance-detail-user-create-en.png)

❶ Click on **+ Create** to see the **Add User** pop-up window.
❷ Enter user ID.

User ID has the following restrictions.

* Only characters between 1 and 63 characters, except quotes (','), can be used.
* `postgres` `repmgr` `barman` `rman` `pgpool` `nsight` `watchdog` `dba` `manager` `mysql.session` `mysql.sys` `mysql.infoschema` `sqlgw` `admin` `etladm` `alertman` `prom` `rds_admin` `rds_mha` `rds_repl` `mariadb.sys` are not allowed to be used as user ID.

❸ Enter a password.

Password has the following restrictions.

* Only characters between 1 and 100 characters, except quotes (','), can be used.

❹ Select the permissions you want to grant to the user. The permissions and descriptions you can grant are as follows.

**READ**
* Includes read-only access to the data.

**CRUD**
* Includes READ permissions with the ability to modify data.

**DDL**
* Includes full CRUD permissions and the authority to execute DDL queries.
* Enables assignment as the database or schema owner.

❺ You can choose to add a default access control rule to give the user you're creating full database access. If you don't add a default access control rule, you must set a separate access control rule to access the database.

#### Edit a User

![db-instance-detail-user-modify](https://static.toastoven.net/prod_rds_postgres/20260210/db-instance-detail-user-modify-en.png)

❶ When you click on **Modify** in the row of users that you want to edit, a pop-up window appears where you can edit information.
❷ If you do not enter a password, it will not be edited.
❸ When checking **Immediate Apply Scheduled Access Control**, the modifications are also applied to the access control rule immediately.

#### Synchronize User

![db-instance-detail-user-sync](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-detail-user-sync-en.png)

❶ Click **Synchronization** and a **Confirm Synchronization** pop-up window will appear.
❷ Click **Confirm** to request synchronization.

#### Delete a User

![db-instance-detail-user-delete](https://static.toastoven.net/prod_rds_postgres/20260210/db-instance-detail-user-delete-en.png)

❶ Select the user that you want to delete and click on the drop-down menu.
❷ When **Delete** is clicked, **Delete Confirmation** pop-up window appears. You can request deletion by clicking on **Confirm**.

![db-instance-detail-user-delete-with-option](https://static.toastoven.net/prod_rds_postgres/20260210/db-instance-detail-user-delete-with-option-en.png)

❶ Displays additional options below when deleting a user who owns objects. See the table below for available options and their descriptions:

**Force Delete**
* Forcibly deletes all owned objects.

> [Caution]
> Proceed with caution, as recovery is impossible without an existing backup.

**Transfer Object Ownership**
* Transfer all owned objects to the selected user before deletion.
* Allow only DDL users to be designated as the new owner.
* Include databases in the scope of the object transfer.

❷ Click **View Owned Objects** to open **Confirm Owned Objects** popup.
❸ Exclude items from the deletion list by clicking the button.
❹ Click **Delete** to open **Confirm Deletion** dialog, then select **Confirm** to complete the request.


### Access Control

**Access Control** tab of the DB instance allows you to query and control DB Engine access rules for specific databases and users. The rules set here apply to file `pg_hba.conf`.

![db-instance-detail-hba](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-detail-hba-en.png)

❶ You can view the application status for access control rules.
❷ If there is any work in progress, a spinner will appear.
❸ You can search and view by entering search keywords.

The status of access control consists of the following values, which change depending on your behavior and your current status.

| Status       | Schedule status  | Description                            |
|--------------|------------------|----------------------------------------|
| CREATED      | CREATE           | Schedule Create (requires application) |
| CREATED      | MODIFY           | Schedule modify (requires application) |
| CREATED      | DELETE           | Schedule delete (requires application) |
| APPLIED      | NONE             | Applied                                |
| -            | -                | Not applicable                         |

> [Caution]
> If all the targets of the rule that you have added by selecting a specific database and user are deleted, they appear as not applicable state and do not apply to the configuration file.


#### Add Access Control Rules

![db-instance-detail-hba-create](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-detail-hba-create-en.png)

❶ When you click on **+ Create**, add **Access Control Rule** pop-up window appears.
❷ You can specify the full target of the rule or select a specific database or user.
    - When **Custom** is selected, a drop-down menu for selecting the database and user is displayed on the **Database & User** tab.
❸ Enter the connection address to which the rule applies in CIDR format.
❹ Select authentication method. The following authentication methods are supported by RDS for PostgreSQL.

| authentication method         | DB Engine Settings value   | Description                                                                                  |
|-------------------------------|----------------------------|----------------------------------------------------------------------------------------------|
| Trust (no password required)  | trust                      | Allow all connections without passwords or other authentication.                             |
| Block connection              | reject                     | Block all connections.                                                                       |
| password (SCRAM-SHA-256)      | scram-sha-256              | Ensure that SCRAM-SHA-256 is authenticated with the password set on **Database & User** tab. |

❺ Adjust the order in which the rules are applied with the up/down arrow buttons.
    - Access control rules are applied sequentially from above and the first applied rule takes priority.
    - If the access permission rule registered at the top is applied first, access is allowed even if there is an access blocking rule at the bottom.
    - Conversely, even if there is an access permission rule at the bottom, access is not allowed if the access blocking rule registered at the top is applied first.
❻ After finish setting, click **Apply Changes** to apply the access control settings to DB instance.
❼ When applied to DB instance, the status changes to **Applied**.

#### Modify Access Control Rules

![db-instance-detail-hba-modify](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-detail-hba-modify-en.png)

❶ When click **Modify** in the row of access control rules to modify, a pop-up window appears where you can modify existing information.
❷ Modified rules must apply access control settings to DB instances by clicking on **Apply Changes**.

#### Delete Access Control Rules

![db-instance-detail-hba-delete](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-detail-hba-delete-en.png)

❶ If you select the user you want to delete and click on **Delete**, the **Delete confirmation** pop-up window appears.
❷ Deleted rules must apply access control settings to DB instances by clicking on **Apply Changes**.


<a id="extension"></a>
### Manage Extensions

You can get and control the extensions that require SUPERUSER permission from **Manage Extensions** tab of the DB instance.

#### Install Extensions

![db-instance-detail-extension-install](https://static.toastoven.net/prod_rds_postgres/20250415/db-instance-detail-extension-install-en.png)

❶ Click **Install** to display a pop-up window that allows you to select the database on which to install the selected extension.
❷ Check **Force Install** to force installation of dependent extensions.
❸ After selecting the installed database, click **Confirm** to schedule the installation task.
❹ Click **Cancel** to cancel the scheduled task.
❺ Click **Apply Changes** to install the extension in the DB instance.

#### Delete Extensions

![db-instance-detail-extension-delete](https://static.toastoven.net/prod_rds_postgres/20250415/db-instance-detail-extension-delete-en.png)

❸ Click **Delete** from the database row to be deleted to display a **Confirm Delete** pop-up window.
❷ Check **Force Install** to force deletion of dependent extensions.
❸ Click **Delete** to schedule the deletion task.
❹ Click **Cancel** to cancel the scheduled task.
❺ Click **Apply Changes** to delete the installed extension in the DB instance.

#### Synchronize Extensions

![db-instance-detail-extension-sync](https://static.toastoven.net/prod_rds_postgres/20250415/db-instance-detail-extension-sync-en.png)

❶ If you click **Synchronize**, a **Confirm Synchronization** pop-up window will appear.
❷ Click **Confirm** to request synchronization.


## Modify DB Instance

You can easily change various items in DB instance created through the console. The change items you request are applied to DB instances sequentially. If a restart is required during the application process, apply all changes and restart the DB instance. Items that cannot be changed and that require a restart are as follows.

| Items                     | Whether able to change or not | Whether need to restart or not                                 |
|---------------------------|-------------------------------|----------------------------------------------------------------|
| Availability Zone         | No                            |                                                                |
| DB version                | Yes                           | Yes                                                              |
| DB instance type          | Yes                           | Yes                                                            |
| Data Storage Types        | No                            |                                                                |
| Data Storage Sizes        | Yes                           | Yes                                                            |
| High Availability available         | Yes        | No                     |
| Ping Interval         | Yes        | No                     |
| Failover latency     | Yes        | No                     |
| Name                      | Yes                           | No                                                             |
| Description               | Yes                           | No                                                             |
| DB port                   | Yes                           | Yes                                                            |
| VPC Sub-net               | No                            |                                                                |
| Floating IP               | Yes                           | No                                                             |
| Parameter Group           | Yes                           | Determines whether or not the changed parameters are restarted |
| DB Security Group         | Yes                           | No                                                             |
| Backup Settings           | Yes                           | No                                                             |
| Database and User Control | Yes                           | No                                                             |
| Access Control            | Yes                           | No                                                             |

For high-availability DB instances, we provide a failover restart feature to increase reliability and reduce net time when there is a change to something that requires a restart.

![modify-ha-popup](https://static.toastoven.net/prod_rds/24.11.12/modify-ha-popup-en.png)

If you do not use restart with failover, the changes are applied sequentially to the master and candidate master, and then the DB instance is restarted. For more information, see [Manual Failover Items](db-instance/#_7) in High Availability DB Instances.


## Delete DB instance

You can delete DB instances that are no longer in use. When you delete a master, the read replicas that belong to its replication group are also deleted. Because deleted DB instances cannot be recovered, it is recommended that you enable deletion protection for critical DB instances.

## Backup

You can prepare a database of DB instances to recover in case of a failure. You can perform backups from the console whenever you need to or you can set to perform periodical back up. See [Backup](backup-and-restore/#_1) for more information.

## Restoration

You can use backup to restore data to any point in time. Restore always creates a new DB instance and cannot be restored to an existing DB instance. See [Backup](backup-and-restore/#_6) for more information.

## Secure Capacity

If WAL logs are excessively generated due to rapid load and the data storage is low in capacity, you can delete the WAL logs using the capacity acquisition feature on the console. When you select Free Capacity from the console, a pop-up window appears to select WAL log for the DB instance. Select the WAL log and click **Confirm** to delete all WAL logs created before the selected item. The capacity acquisition feature is a function of temporarily securing capacity. If you continue to run out of capacity, you must scale up your data storage to meet the service load.

> [Caution]
> Depending on the deleted WAL log, it may not be restored to a certain point in time.

## Apply Parameter Group Changes

Even though the settings of the parameter groups connected to the DB instance changed, it does not automatically apply to the DB instance. If the parameters applied to DB instance and the settings of the connected parameter group are different, **Parameter** button is displayed in the console.

You can apply changes to a parameter group to a DB instance using one of the following methods.

![db-instance-list-apply-parameter-group](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-list-apply-parameter-group-en.png)

❶ Click **Parameter** for destination DB instance, or
❷ Select a destination DB instance and click on **Apply Parameter Group Changes** menu from the drop-down menu.

If the parameters that require restart in the parameter group are changed, such DB instance is restarted in the process of applying the changes.

![db-instance-list-apply-parameter-group-popup](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-list-apply-parameter-group-popup-en.png)

❶ Click **Compare Chnages** to check the changed parameters.
❷ Click **Confirm** after checking the changes to apply the changed parameters to DB instances.

![db-instance-list-apply-parameter-group-compare-popup](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-list-apply-parameter-group-compare-popup-en.png)

## Export Backup Files to Object Storage after Backup

After backing up, you can export the backup file to user object storage in NHN Cloud. For details, see [Export Backup Files](backup-and-restore/#_5).

## Restore Using Backup in Object Storage

You can restore to a DB instance using a backup file exported from RDS for PostgreSQL to object storage. For more information, see [Restore using Backup in Object Storage](backup-and-restore/#_7).


## Read Replica

To increase read performance, you can create read replicas that are available for read-only use. You can create up to five read replicas for a single master. You cannot create read replicas of read replicas.

### Create Read Replica

To create a read replica, you need a backup file created on a DB instance that belongs to the replication group. If you do not have a backup file, select the DB instances to perform the backup in the following order

❶ Read replicas with auto backup enabled
❷ Masters with auto backup enabled

If there is no DB instance that meets the criteria, the request to create a read replica will fail.

> [Caution]
The read replica creation time may increase in proportion to the database size of the master.
For DB instances that are backed up, there may be a drop in storage I/O performance during the read replica creation process.

> [Note]
Backup storage charges can be incurred for the amount of data storage required for the read replica creation process.

To create a read replica from the console,

![db-instance-list-replica-create](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-list-replica-create-en.png)

❶ After selecting the source DB instance, click **Create Read Replica** to go to the page for creating a read replica.

You can create a read replica using the settings below.

#### Items unavailable to change

When creating a read replica, the items listed below cannot be changed because they follow the settings of the original DB instance.

* DB engine
* Data storage type
* User VPC subnet

#### Availability Zone

Select the availability zone for the read replica. For a detailed description, see [Availability](#Availabilty) zones.

#### DB Instance Type

It is recommended that read replicas be created to the same specification or higher than the master; creating them to a lower specification can cause replication delays.

#### Data storage size

It is recommended to make it the same size as the source DB instance. If you set a smaller size, the replication process may be interrupted due to insufficient data storage capacity.

#### Floating IP

Select whether to use a floating IP for the read replica. For a detailed description, see [Floating IP](#floating-ip).

#### Parameter group

When selecting a parameter group for a read replica, we recommend that you select the same parameter group as the source DB instance unless you need to change any replication-related settings. For a detailed description of parameter groups, see [Parameter Group](parameter-group/).

#### DB Security Group

Select the DB security group to apply to the read replica. The rules required for replication are applied automatically, so you do not need to add them to the DB security group. For a detailed description of DB security groups, see [DB Security Group](db-security-group/).

#### Backup

Select the backup settings for the read replica. For a detailed description of backups, see [Backup and Restore](backup-and-restore/).

#### Default notifications

Select whether to enable default notifications. For a detailed description, see [Default notifications](#default-notification).

#### Deletion Protection

Select whether to enable erasure protection. For a detailed description, see [Deletion Protection](#change-deletion-protection-settings).

### Promote Read Replica

The process of breaking the replication relationship with a master and turning a read replica into a standalone master is called promotion. The promoted master will operate as a standalone DB instance. If there is a replication delay between the read replica and the master that you want to promote, the promotion will not occur until the delay is resolved. Once promoted, a DB instance cannot be reverted to its previous replication relationship.

> [Caution]
If the status of the master DB instance is abnormal, you cannot proceed with the promotion operation.

### Force Promote Read Replicas

Force promotion based on current point-in-time data on the read replica, regardless of the state of the master. If there is a replication delay, data loss can occur. Therefore, we do not recommend using this feature unless there is an urgent need to bring the read replica into service.

### End Wait for Replication Delay During Read Replica Promotion/Force Promotion

To end the wait operation, when you are waiting for replication delays to resolve during a read replica promotion or force promotion,

![db-instance-list-stop-wait-replication-lag](https://static.toastoven.net/prod_rds_postgres/20250415/db-instance-list-stop-wait-replication-lag-en.png)

❶ Click **Replication Waiting** brings up a popup window that allows you to end the waiting task.
❷ Click **Confirm** to end the waiting task.

### Stop Replication of Read Replicas

A read replica can stop replicating for a number of reasons. If the status of a read replica is `Replication stopped`, you should quickly determine the cause and get it back to normal. If the `replication stopped` state persists for an extended period of time, replication latency will increase. If the WAL logs needed for normalization are not available, you will need to rebuild the read replica.

### Rebuild Read Replica

If you are unable to resolve replication issues with the read replica, you can restore it to a healthy state by rebuilding it. During this process, all databases in the read replica are deleted and rebuilt anew based on the master database. The read replica is unavailable during the rebuild. Rebuilding a read replica requires a backup file created on a DB instance that belongs to the replication group. If you do not have a backup file, see [Create Read Replica](#create-read-replica) for behavior and cautions.

> [Note]
Access information (domain, IP) does not change after rebuilding.

## Restart DB Instances

If you want to restart PostgreSQL, you can restart a DB instance. To minimize restart time, it is recommended to perform when service load is low.

To restart a DB instance, use console

![db-instance-list-restart](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-list-restart-en.png)

❶ Select DB instance that you want to restart and click **Restart DB Instance** from the drop-down menu.

## Force Restart DB Instances

If PostgreSQL of a DB instance is not working properly, you can force a restart. For a forced restart, issue a SIGTERM command to PostgreSQL and wait 10 minutes for normal shutdown. After PostgreSQL shuts down successfully in 10 minutes, reboot the virtual machine afterward. If it does not shut down normally in 10 minutes, force a reboot of the virtual machine. If a virtual machine is forced to reboot, some work-in-progress transactions may be lost and the data volume may become corrupted, making it impossible to recover. After a forced restart, the state of the DB instance might not return to the enabled state. Please contact the customer center if such situation occurs.

> [Caution]
> This feature should be avoided to use, except in urgent and unavoidable circumstances, as data may be lost or data volume may be compromised.

To force a DB instance restart from console

![db-instance-list-force-restart](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-list-force-restart-en.png)

❶ Select the DB instance that you want to force restart and click on **Force Restart DB Instance** menu from the drop-down menu.

## Change Deletion Protection Settings

Enabling deletion protection secures DB instances from accidental deletion. You will not be able to delete that DB instance until you disable the feature. To change the deletion protection settings

![db-instance-deletion-protection](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-list-deletion-protection-en.png)

❶ After selecting the DB instance for which you want to change the deletion protection settings, click **Change Deletion Protection Settings** from the drop-down menu, and a pop-up window will appear.

![deletion-protection-popup](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-list-deletion-protection-popup-en.png)

❷ Click **Confrim** after changing the deletion protection settings.


## High Availability DB Instance

High availability DB instances increase availability and data durability and provide a fault-tolerant database. High availability DB instances consist of a master, a spare master, and are created in different availability zones. The spare master is the DB instance in case of failure and is not normally available. For highly available DB instances, backups are performed on the spare master.

> [Note]
> For highly available DB instances, if you force replication from another DB instance or from an external PostgreSQL master with a PostgreSQL query statement, high availability and some features will not work properly.

### Failure Detection

The redundant master has a process for detecting failures, which periodically detects the health of the master. These detection cycles are called ping intervals, and failover occurs if four consecutive health checks fail. The shorter the ping interval, the more sensitive it is to failures, and the longer the ping interval, the more insensitive it is to failures. It is important to set the appropriate ping interval for your service load.

> [Note]
> Note that if the master's data storage usage fills up, the high availability watchdog process detects it as a failure and takes failover.

### Auto Failover

If the redundant master fails four consecutive health checks on the master, it determines that the master is unable to provide service and automatically fails over. To prevent split-brain, all user security groups assigned to the failed master are unlinked to prevent external access, and the redundant master assumes the role of the master. The internal virtual IP for connectivity is changed from the failed master to the reserve master, so no changes to the application are required. When failover is complete, the failed master's type is changed to Failed Master and the reserve master's type is changed to Master. During the failover process, automatic recovery occurs for the failed master, and if the automatic recovery is successful, the failed master functions as a spare master again. Failover does not occur until the failed master is recovered or rebuilt. The promoted master inherits all automatic backups from the failed master.
You can restore a point in time from the time a new backup was taken on the promoted master.

> [Note]
> Since the high availability feature is based on domains, if the network environment is such that the client attempting to connect cannot reach the DNS server, the DB instance cannot be accessed through the domain, and normal access is not possible in the event of a failover.
> Access may be temporarily interrupted while the internal virtual IP is changing from the spare master to the master.

### Failed Over Master

A master that fails and becomes failover is called a failed master. Automatic backups of a failed master are not performed, and all other functions except recovering, rebuilding, detaching, and deleting a failed master cannot be performed.

### Restore Failed Over Master

If the consistency of the data was not broken during the failover process and the Archived Write Ahead Log was not lost between the time of the failure and the time you attempt to recover, you can recover the failed master and the promoted master back to a highly available configuration. The recovery will fail if the data is inconsistent or if the Archived Write Ahead Log, which is required for recovery, has been lost because it re-establishes the replication relationship with the promoted master with the failed master's database intact. If the recovery of a failed master fails, you can enable high availability again by rebuilding it.

To recover a failed master, run the

![db-instance-ha-failover-repair](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-ha-failover-repair-en.png)

❶ Select the failed master you want to recover, and then click the **Recover Failed Master** menu from the drop-down menu.

### Rebuild Failed Over Master

If recovery of a failed master fails, you can use rebuild to enable high availability again. Unlike recovery, rebuilding removes all of the failed master's database and rebuilds it based on the promoted master's database. To rebuild a failed master, you need a backup file and an archived write ahead transaction log from one of the DB instances in the replication group. If you do not have a backup file, select the DB instance to perform the backup in the following order

❶ Read replicas with automatic backups enabled
❷ Masters with automatic backups enabled

If no DB instance meets the criteria, the request to rebuild the failed master fails.

> [Caution]
> The time to rebuild a failed master may increase proportionally to the size of the database on the master.
> For DB instances that are backed up, there might be a drop in storage I/O performance during the rebuilding of the failed master.
> To rebuild a failed master, in the console, run the

![db-instance-ha-failover-rebuild](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-ha-failover-rebuild-en.png)

❶ Select the failed master you want to rebuild, and then click the **Rebuild Failed Master** menu from the drop-down menu.

### Separate Failed Over Master

If the failed master recovery fails and data correction is required, you can disable the high availability feature by detaching the failed master. The replication relationship between the detached master and the promoted master is broken and each behaves as a normal DB instance. Once detached, it is not possible to recover it back to its original configuration.

To detach a failed master, go to the Console

![db-instance-ha-failover-split](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-ha-failover-split-en.png)

❶ Select the failed master you want to detach, and then click the **Detach Failed Master** menu from the drop-down menu.

### Manual Failover

For highly available DB instances, when you perform an operation that involves a restart, you can choose whether to restart with failover or not, as shown below.

* Restart DB Instance
* Changes to items that require a restart
* Apply changes to parameters that require a restart
* Migrating DB instances for hypervisor checks

When you restart with failover, the reserve master is restarted first. Failover then promotes the reserve master to master, and the existing master acts as the reserve master. Upon promotion, the internal virtual IP for connectivity changes from the master to the reserve master, so no changes to the application are required. The promoted master inherits all automatic backups from the old master.

> [Note]
> Since the high availability feature is based on domains, if the network environment is such that the client attempting to connect cannot reach the DNS server, the DB instance cannot be accessed through the domain, and normal access is not possible in the event of a failover.

> [Caution]
> If the replication delay value of the spare master and the read replicas included in the replication group is 1 or more, replication delay is considered to have occurred, and manual failover fails. It is recommended that you perform manual failover during off-peak hours. Restart failures due to replication delay can be checked through the Events screen.
> When restarting with failover, you can select the following additional items to increase reliability

#### Start backup at the current time

You can proceed with a manual backup immediately after the restart with failover is complete.

#### Manual Control of Failover

You can either apply the changes to the spare master first and observe how they evolve, or you can control the timing of the failover directly from the console if you want to execute the failover at a precise time. If you choose to manually control failover, a **failover** button appears in the console ❶ after the spare master restarts. Clicking this button triggers a failover, which can wait up to five days to execute. If you do not run the failover within 5 days, the action is automatically canceled.

![db-instance-ha-wait-manual-failover](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-ha-wait-manual-failover-en.png)

> [Caution]
> There is no automatic failover while waiting for failover.

#### Waiting for replication delays to resolve

Enabling the Wait for replication latency to clear option allows you to wait for replication latency to clear for the spare master and the read replicas included in the replication group.

#### Write load blocking

You have the option to additionally block write loads while resolving replication delays. Blocking the write load puts the master into read-only mode just before failover, setting all change queries to fail.

### High availability suspended

You can temporarily pause a high availability feature in situations where you anticipate connection disruptions or large loads due to temporary operations. When a high-availability feature is paused, it does not detect a failure and therefore does not perform failover. Performing an operation that requires a restart while a high-availability feature is paused does not resume the paused high-availability feature. Because data replication occurs normally when a high-availability feature is paused, or because a failure is not detected, it is not recommended to leave it paused for extended periods of time.

### Rebuild Candidate Master

Replication on a spare master can be interrupted for a variety of reasons, such as a disconnection in the network or the establishment of replication from another master. To resolve a replication interruption on a spare master, you must rebuild the spare master. Rebuilding a spare master removes all of the database on the spare master and rebuilds it based on the database on the master. During this process, if the backup files required for the rebuild do not exist in the master database, a backup is performed on the master, and performance degradation due to the backup can occur.

## Data Migration

* RDS can be exported to and imported from outside of NHN Cloud RDS using pg_dump
* pg_dump utility is provided by default when you install PostgreSQL.

### Export using pg_dump

* Get NHN Cloud RDS instances prepared.
* Verify that the external instance where you want to store the data to export, or the computer on which the local client is installed has sufficient capacity.
* If you need to export data to the outside of NHN Cloud, create a floating IP and connect it to the RDS instance where you want to export the data.
* Export data to the outside via the pg_dump command below.

#### Export in Files

```
pg_dump -h {DB instance external domain address} -U {DB instance user ID} -p {DB instance connection port} -d {Database name to export} -f {file path to save locally}
```

#### Export to PostgreSQL database outside NHN Cloud RDS

```
pg_dump -h {DB instance external domain address} -U {DB instance user ID} -p {DB instance connection port} -d {database name to export} | psql -h {external PostgreSQL connection address} -U {external PostgreSQL user ID} -p {external PostgreSQL connection port} -d {external PostgreSQL database name}
```
### Import with pg_dump

1. Create a DB instance to import data from, selecting **Use Floating IP**.

2. Ensure that the DB instance you are importing has enough capacity.

3. On the **Database & User** tab, pre-create the required databases.

4. Execute the command below to get data from an external source.

```
pg_dump -h {external PostgreSQL connection address} -U {external PostgreSQL user ID} -p {external PostgreSQL connection port} -d {external PostgreSQL database name} | psql -h {DB instance external domain address} -U {DB instance user ID} -p {DB instance connection port} -d {DB instance database name}
```

## Delete Registry Account

### Delete Registry Account 1. DB Instance Migration Guide for Hypervisor maintenance

NHN Cloud periodically updates the hypervisor software of DB instances to improve security and reliability.
DB instances running on the hypervisor being checked for maintenance must be migrated to the hypervisor being checked for maintenance.

DB instance migration can be initiated from NHN Cloud console.
Follow the guide below to use the migration feature on the console.
Navigate to the project that contains the DB instance that you specify to maintenance check.

#### 1. Check the DB instance that you want to do maintenance check.

Those with the migration button next to name are the maintenance targets.

![db-instance-planned-migration](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-planned-migration-en.png)

You can check the detailed schedule of maintenance by putting the mouse pointer over the migration button.

![db-instance-planned-migration-popup](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-planned-migration-popup-en.png)

#### 2. You have to end the application that is connecting to the DB instance for maintenance targets.

Take appropriate measures to avoid affecting services connected to the DB.
If you have no choice but to affect the service, please contact NHN Cloud Customer Center and we will guide you with appropriate measures.

#### 3. Select the DB instance to be checked, click on Migration button and when a window appears asking for confirmation of the DB instance migration, click on the OK button.

![db-instance-planned-migration-confirm](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-planned-migration-confirm-en.png)

#### 4. Wait for DB instance migration to finish.

If the DB instance status does not change, 'refresh'.

![db-instance-planned-migration-status](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-planned-migration-status-en.png)

No action is allowed while the DB instance is being migrated.
If DB instance migration does not complete successfully, it will be reported to the administrator automatically, and NHN Cloud will contact you separately.
