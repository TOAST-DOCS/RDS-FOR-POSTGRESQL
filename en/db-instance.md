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

| Version                   | Note |
|----------------------|----|
| PostgreSQL 14.6      |    |


### DB instance type

DB instances have different CPU cores and different memory capacities, depending on the type.
When you create a DB instance, you must select the appropriate DB instance type according to the database workload.

| Type | Description                                                        |
|----|-----------------------------------------------------------|
| m2 | This is a type that balances CPU and memory.                                |
| c2 | This is an Instance type with high CPU performance.                               |
| r2 | It can be used when memory is used more than other resources.                     |
| x1 | It is a type that supports high-specification CPU and memory. It can be used for services or applications that require high performance. |

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
* Create a read replica
* Rebuild a read replica
* Restore to a certain point in time

### Information

Set DB instance default information. You can enter the instance name, description, DB port, and user information that you want to create by default.
The user ID you enter is created with DDL permissions.

**DDL**
* Includes CRUD permissions, and has permissions to execute DDL queries.

**CRUD**
* Includes query permissions, and has permission to change data.
    * CRUD users can create a DB instance on **DB & User** tab after it has been created.

> [Caution]
> You can create only one DDL user per DB instance, and you cannot change the privileges of users that you have already created.

### Floating IP

To access a DB instance from outside, you must connect the floating IP to DB instance. You can create a floating IP only if you connect a subnet to which the Internet Gateway is connected. Floating IP is charged at the same time as it is used, and separately, it is charged separately if traffic is generated in the direction of the Internet through the floating IP.

### Parameter Group

A parameter group is a set of parameters that allow you to set up a database installed on a DB instance. You must select one parameter group when you create a DB instance. The parameter group can be changed freely even after it is created. For a detailed description of the parameter group, refer to [Parameter Group](parameter-group/).

### DB Security Group

DB security groups are used to restrict access against outside break-in. You can allow access to specific port ranges or database ports for incoming and outgoing traffic. You can apply multiple DB security groups to a DB instance. For a detailed description of DB security groups, refer to [DB security groups](db-security-group/).

### Backup

You can set up a database of DB instances to periodically back up, or you can create backups at any time with console. During the backup, the performance might degrade. We recommended that you back up at a time when the service load is not high so as not to affect the service. If you don't want performance degradation from backups, you can perform backups on a read replica. Backup files are stored in internal backup storage and are charged based on backup capacity. We recommend that you enable periodic backups to prepare for unexpected failures. For a detailed description of backups, see [Backup and Restore](backup-and-restore/).

### Default Notification

You can set default notifications when creating a DB instance. Setting default notifications creates a new notification group with `{DB instance name}-default` name and automatically sets the notification items below. You can freely modify and delete notification groups generated by default notifications. See [Notification Groups](notification/) for a detailed description of notification groups.

| Items                         | comparison method | Threshold value           | Duration |
|----------------------------|-------|---------------|-------|
| CPU Usage                    | >= | 80%           | 5 minutes    |
| Storage Remaining Usage             | <= | 5,120MB       | 5 minutes    |
| Database Connection Status | <= | 0             | 0 minutes    |
| Storage usage                | >= | 95%           | 5 minutes    |
| Data storage fault                | <= | 0             | 0 minutes    |
| Connection Ratio           | >= | 85%           | 5 minutes    |
| Memory Usage                    | >= | 90%           | 5 minutes    |


## DB Instances

You can view the DB instances created from the console. You can view in groups of DB instances, or as individual DB instances.

![db-instance-list](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-list-basic-en.png)

❶ Change the DB instance screen mode.
❷ Change the deletion protection settings by clicking the lock icon.
❸ Display the most recently collected monitoring metrics.
❹ Display the current status.
❺ Spinner icon appears if any work in progress exists.
❻ Change the search conditions.

DB instance's status consists of the following values, which change based on your behavior and your current status.

| Status            | Description     |
|-------------------|-----------------|
| BEFORE_CREATE     | Before creating |
| AVAILABLE         | Available       |
| STORAGE_FULL      | Lack of storage |
| FAIL_TO_CREATE    | Fail to create  |
| FAIL_TO_CONNECT   | Fail to connect |
| REPLICATION_DELAY | Replication latency           |
| REPLICATION_STOP  | Replication stopped           |
| SHUTDOWN          | shutdown        |

The search conditions that can be changed are as follows.

![db-instance-list-filter](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-list-filter-en.png)

❶ Retrieve the status of DB instance by filtering criteria.
❷ Retrieve availability zones by filtering criteria.

## DB Instance Details

Select DB instance to view details.

![db-instance-detail-basic](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-detail-basic-en.png)

❶ When you click on the domain of the connection information, the pop-up window to verify the IP address appears.
❷ When you click on the DB security group, a pop-up window appears to verify the DB security rules.
❸ Click a parameter group to go to the screen where you can check the parameters.
❹ Adjust the height of the detail panel by dragging and dropping with the mouse.
❺ Adjust the height of the detail panel to a pre-determined height.

### Connection Information

Issues an internal domain when you create a DB instance. Internal domain refers to an IP address that belongs to the user's VPC subnet.

If you created a floating IP, issue an additional external domain. External domain points to the address of the floating IP. Because the external domain or floating IP is externally accessible, you must set the rules of the DB security group appropriately to protect the DB instance.

### Log

On the Logs tab of the DB instance, you can view or download various log files. Log files will rotate to the set settings as follows. Some log files can be enabled or disabled in a parameter group.

| Items             | Rotate Settings   | Whether to change or not | 
|----------------|-----------|-------|
| postgresql.log | 40 items of 100 MB  | Static    |
| backup.log     | Daily 10 items   | Static    |

![db-instance-detail-log](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-detail-log-en.png)

❶ When you click **View Log**, a pop-up window appears where you can view the contents of the log file. You can check logs up to 65,535 Bytes.
❷ Click on **Import** to request that the log files of the DB instance be downloaded.
❸ When the download is ready, the **Download** button is exposed. Click to download the log.

> [Caution]
> When **Import** is clicked, the log file is uploaded to the backup storage for approximately 5 minutes and the backup storage capacity is charged to the size of the log file.
> Click on **Download** to charge Internet traffic as large as the log file.


### Database & User

**Database & User** tab of DB instance allows you to query and control databases and users created in the DB engine.


#### Create a database

![db-instance-detail-db-create](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-detail-db-create-en.png)

❶ When you click on **+ Create**, a pop-up window appears where you can enter the name of the database.
❷ You can create the database by entering the database name and clicking **Create**.

Database names have the following restrictions.

* Only characters between 1 and 63 characters, except quotes (','), can be used.
* `postgres` `information_schema` `performance_schema` `repmgr` `db_helper` `sys` `mysql` `rds_maintenance` `pgpool` `nsight` `watchdog` `barman` `rman` are not allowed to use as database names. 

#### Modify Database

![db-instance-detail-db-modify](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-detail-db-modify-en.png)

❶ When you click on **Modify** in the database row you want to modify, a pop-up window appears where you can modify the database information.
❷ You can request a modification by clicking on **Modify**.
❸ When checking **Immediate Apply Scheduled Access Control**, the modifications are also applied to the access control rule immediately.

#### Deleting Database

![db-instance-detail-db-delete](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-detail-db-delete-en.png)

❶ If select the database you want to delete and click on **Delete**, the Delete confirmation pop-up window appears.
❷ You can request deletion by clicking on **Delete**.

#### Create a User

![db-instance-detail-user-create](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-detail-user-create-en.png)

❶ Click on **+ Create** to see Add User pop-up window.
❷ Enter user ID.

User ID has the following restrictions.

* Only characters between 1 and 63 characters, except quotes (','), can be used.
* `postgres` `repmgr` `barman` `rman` `pgpool` `nsight` `watchdog` `dba` `manager` `mysql.session` `mysql.sys` `mysql.infoschema` `sqlgw` `admin` `etladm` `alertman` `prom` `rds_admin` `rds_mha` `rds_repl` `mariadb.sys` are not allowed to be used as user ID.

❸ Enter a password.

Password has the following restrictions.

* Only characters between 1 and 100 characters, except quotes (','), can be used.

❹ Select the permissions you want to grant to the user. The permissions and descriptions you can grant are as follows.

**CRUD**
* Includes query permissions, and has permission to change data.

❺ You can choose to add a default access control rule to give the user you're creating full database access. If you don't add a default access control rule, you must set a separate access control rule to access the database.

#### Edit a User

![db-instance-detail-user-modify](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-detail-user-modify-en.png)

❶ When you click on **Modify** in the row of users that you want to edit, a pop-up window appears where you can edit information.
❷ If you do not enter a password, it will not be edited.
❸ When checking **Immediate Apply Scheduled Access Control**, the modifications are also applied to the access control rule immediately.

#### Delete a User

![db-instance-detail-user-delete](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-detail-user-delete-en.png)

❶ Select the user that you want to delete and click on the drop-down menu.
❷ When **Delete** is clicked, **Delete Confirmation** pop-up window appears. You can request deletion by clicking on **Confirm**.

### Access Control

**Access Control** tab of the DB instance allows you to query and control DB Engine access rules for specific databases and users. The rules set here apply to file `pg_hba.conf`.

![db-instance-detail-hba](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-detail-hba-en.png)

❶ You can view the application status for access control rules.
❷ If there is any work in progress, a spinner will appear.
❸ You can search and view by entering search keywords.

The status of access control consists of the following values, which change depending on your behavior and your current status.

| Status      | Schedule status   | Description           |
|---------|--------|--------------|
| CREATED | CREATE | Schedule Create (requires application) |
| CREATED | MODIFY | Schedule modify (requires application) |
| CREATED | DELETE | Schedule delete (requires application) |
| APPLIED | NONE   | Applied          |
| -       | -      | Not applicable         |

> [Caution]
> If all the targets of the rule that you have added by selecting a specific database and user are deleted, they appear as not applicable state and do not apply to the configuration file.


#### Add Access Control Rules

![db-instance-detail-hba-create](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-detail-hba-create-en.png)

❶ When you click on **+ Create**, add **Access Control Rule** pop-up window appears.
❷ You can specify the full target of the rule or select a specific database or user.
    - When **Custom** is selected, a drop-down menu for selecting the database and user is displayed on the **Database & User** tab.
❸ Enter the connection address to which the rule applies in CIDR format.
❹ Select authentication method. The following authentication methods are supported by RDS for PostgreSQL.

| authentication method               | DB Engine Settings value     | Description                                                      |
|---------------------|---------------|---------------------------------------------------------|
| Trust (no password required)      | trust         | Allow all connections without passwords or other authentication.                            |
| Block connection               | reject        | Block all connections.                                           |
| password (SCRAM-SHA-256) | scram-sha-256 | Ensure that SCRAM-SHA-256 is authenticated with the password set on **Database & User** tab. |

❺ Adjust the order in which the rules are applied with the up/down arrow buttons.
    - Access control rules are applied sequentially from above and the first applied rule takes priority.
    - If the access permission rule registered at the top is applied first, access is allowed even if there is an access blocking rule at the bottom.
    - Conversely, even if there is an access permission rule at the bottom, access is not allowed if the access blocking rule registered at the top is applied first.
❻ After finish setting, click **Apply Changes** to apply the access control settings to DB instance.
❼ When applied to DB instance, the status changes to **Applied**.

#### Modify Access Control Rules

![db-instance-detail-hba-modify](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-detail-hba-modify-en.png)

❶ When click **Modify** in the row of access control rules to modify, a pop-up window appears where you can modify existing information.
❷ Modified rules must apply access control settings to DB instances by clicking on **Apply Changes**.

#### Delete Access Control Rules

![db-instance-detail-hba-delete](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-detail-hba-delete-en.png)

❶ If you select the user you want to delete and click on **Delete**, the **Delete confirmation** pop-up window appears.
❷ Deleted rules must apply access control settings to DB instances by clicking on **Apply Changes**.

## Modify DB Instance

You can easily change various items in DB instance created through the console. The change items you request are applied to DB instances sequentially. If a restart is required during the application process, apply all changes and restart the DB instance. Items that cannot be changed and that require a restart are as follows.

| Items                     | Whether able to change or not | Whether need to restart or not                                 |
|---------------------------|-------------------------------|----------------------------------------------------------------|
| Availability Zone         | No                            |                                                                |
| DB Engine                 | No                            |                                                                |
| DB instance type          | Yes                           | Yes                                                            |
| Data Storage Types        | No                            |                                                                |
| Data Storage Sizes        | Yes                           | Yes                                                            |
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

![db-instance-list-apply-parameter-group](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-list-apply-parameter-group-en.png)

❶ Click **Parameter** for destination DB instance, or
❷ Select a destination DB instance and click on **Apply Parameter Group Changes** menu from the drop-down menu.

If the parameters that require restart in the parameter group are changed, such DB instance is restarted in the process of applying the changes.

![db-instance-list-apply-parameter-group-popup](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-list-apply-parameter-group-popup-ko.png)

❶ Click **Compare Chnages** to check the changed parameters.
❷ Click **Confirm** after checking the changes to apply the changed parameters to DB instances.

![db-instance-list-apply-parameter-group-compare-popup](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-list-apply-parameter-group-compare-popup-ko.png)

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

![db-instance-replica-create-ko](https://static.toastoven.net/prod_rds_postgres/240813/db-instance-list-replica-create-ko.png)

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

### Stop Replication of Read Replicas

A read replica can stop replicating for a number of reasons. If the status of a read replica is `Replication stopped`, you should quickly determine the cause and get it back to normal. If the `replication stopped` state persists for an extended period of time, replication latency will increase. If the WAL logs needed for normalization are not available, you will need to rebuild the read replica.

### Rebuild Read Replica

If you are unable to resolve replication issues with the read replica, you can restore it to a healthy state by rebuilding it. During this process, all databases in the read replica are deleted and rebuilt anew based on the master database. The read replica is unavailable during the rebuild. Rebuilding a read replica requires a backup file created on a DB instance that belongs to the replication group. If you do not have a backup file, see [Create Read Replica](#create-read-replica) for behavior and cautions.

> [Note]
Access information (domain, IP) does not change after rebuilding.

## Restart DB Instances

If you want to restart PostgreSQL, you can restart a DB instance. To minimize restart time, it is recommended to perform when service load is low.

To restart a DB instance, use console

![db-instance-list-restart](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-list-restart-en.png)

❶ Select DB instance that you want to restart and click **Restart DB Instance** from the drop-down menu.

## Force Restart DB Instances

If PostgreSQL of a DB instance is not working properly, you can force a restart. For a forced restart, issue a SIGTERM command to PostgreSQL and wait 10 minutes for normal shutdown. After PostgreSQL shuts down successfully in 10 minutes, reboot the virtual machine afterward. If it does not shut down normally in 10 minutes, force a reboot of the virtual machine. If a virtual machine is forced to reboot, some work-in-progress transactions may be lost and the data volume may become corrupted, making it impossible to recover. After a forced restart, the state of the DB instance might not return to the enabled state. Please contact the customer center if such situation occurs.

> [Caution]
> This feature should be avoided to use, except in urgent and unavoidable circumstances, as data may be lost or data volume may be compromised.

To force a DB instance restart from console

![db-instance-list-force-restart](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-list-force-restart-en.png)

❶ Select the DB instance that you want to force restart and click on **Force Restart DB Instance** menu from the drop-down menu.

## Change Deletion Protection Settings

Enabling deletion protection secures DB instances from accidental deletion. You will not be able to delete that DB instance until you disable the feature. To change the deletion protection settings

![db-instance-deletion-protection-ko](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-list-deletion-protection-en.png)

❶ After selecting the DB instance for which you want to change the deletion protection settings, click **Change Deletion Protection Settings** from the drop-down menu, and a pop-up window will appear.

![deletion-protection-popup-ko](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-list-deletion-protection-popup-en.png)

❷ Click **Confrim** after changing the deletion protection settings.

## Data Migration

* RDS can be imported to the outside of the NHN Cloud RDS using pg_dump.
* pg_dump utility is provided by default when you install PostgreSQL.

### Export using pg_dump

* Get NHN Cloud RDS instances prepared.
* Verify that the external instance where you want to store the data to export, or the computer on which the local client is installed has sufficient capacity.
* If you need to export data to the outside of NHN Cloud, create a floating IP and connect it to the RDS instance where you want to export the data.
* Export data to the outside via the pg_dump command below.

#### Export in Files

```
pg_dump -h {rds_instance_floating_ip} -U {db_id} -p {db_port} -d {database_name} -f {local_path_and_file_name}
```

#### Export to PostgreSQL database outside NHN Cloud RDS

```
pg_dump  -h {rds_instance_floating_ip} -U {db_id} -p {db_port} -d {database_name} | psql -h {external_db_host} -U {external_db_id} -p {external_db_port} -d {external_database_name}
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

![db-instance-planned-migration](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-planned-migration-en.png)

You can check the detailed schedule of maintenance by putting the mouse pointer over the migration button.

![db-instance-planned-migration-popup](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-planned-migration-popup-en.png)

#### 2. You have to end the application that is connecting to the DB instance for maintenance targets.

Take appropriate measures to avoid affecting services connected to the DB.
If you have no choice but to affect the service, please contact NHN Cloud Customer Center and we will guide you with appropriate measures.

#### 3. Select the DB instance to be checked, click on Migration button and when a window appears asking for confirmation of the DB instance migration, click on the OK button.

![db-instance-planned-migration-confirm](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-planned-migration-confirm-en.png)

#### 4. Wait for DB instance migration to finish.

If the DB instance status does not change, 'refresh'.

![db-instance-planned-migration-status](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-planned-migration-status-en.png)

No action is allowed while the DB instance is being migrated.
If DB instance migration does not complete successfully, it will be reported to the administrator automatically, and NHN Cloud will contact you separately.
