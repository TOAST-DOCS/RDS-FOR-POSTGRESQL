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

### 유지 보수

주기적으로 DB 인스턴스의 안정화에 도움을 줄 수 있는 작업을 진행하도록 설정합니다. 파일 I/O를 사용하게 되는 경우, 유지보수 작업이 수행되는 동안 성능 저하가 발생할 수 있습니다. 서비스에 영향을 주지 않기 위해 서비스의 부하가 적은 시간에 자동 유지보수 작업을 진행하는 것을 권장합니다.

#### 자동 스토리지 정리 사용

서비스 동작에 영향을 미치지 않는 보관된 트랜잭션 로그(Archived Write Ahead Log)의 정리를 진행합니다. 서비스 동작에 영향을 미치지 않는 보관된 트랜잭션 로그란, 자동 백업을 이용하여 현재 시점까지 복원을 진행 시 사용되지 않는 로그를 의미합니다.

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

![db-instance-list-basic](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-basic-en.png)

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

![db-instance-list-filter](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-filter-en.png)

❶ Retrieve the status of DB instance by filtering criteria.
❷ Retrieve availability zones by filtering criteria.

## DB Instance Details

Select DB instance to view details.

![db-instance-detail-basic](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-basic-en.png)

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

| Items           | Rotate Settings      | Whether to change or not | 
|-----------------|----------------------|--------------------------|
| postgresql.log  | 40 items of 100 MB   | Static                   |
| backup.log      | Daily 10 items       | Static                   |

![db-instance-detail-log](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-log-en.png)

❶ When you click **View Log**, a pop-up window appears where you can view the contents of the log file. You can check logs up to 65,535 Bytes.
❷ Click on **Import** to request that the log files of the DB instance be downloaded.
❸ When the download is ready, the **Download** button is exposed. Click to download the log.

> [Caution]
> When **Import** is clicked, the log file is uploaded to the backup storage for approximately 5 minutes and the backup storage capacity is charged to the size of the log file.
> Click on **Download** to charge Internet traffic as large as the log file.


### Database & User

**Database & User** tab of DB instance allows you to query and control databases and users created in the DB engine.


#### Create a database

![db-instance-detail-db-create](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-db-create-en.png)

❶ When you click on **+ Create**, a pop-up window appears where you can enter the name of the database.
❷ You can create the database by entering the database name and clicking **Create**.

Database names have the following restrictions.

* Only characters between 1 and 63 characters, except quotes (','), can be used.
* `postgres` `information_schema` `performance_schema` `repmgr` `db_helper` `sys` `mysql` `rds_maintenance` `pgpool` `nsight` `watchdog` `barman` `rman` are not allowed to use as database names.

#### Modify Database

![db-instance-detail-db-modify](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-db-modify-en.png)

❶ When you click on **Modify** in the database row you want to modify, a pop-up window appears where you can modify the database information.
❷ You can request a modification by clicking on **Modify**.
❸ When checking **Immediate Apply Scheduled Access Control**, the modifications are also applied to the access control rule immediately.

#### Deleting Database

![db-instance-detail-db-delete](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-db-delete-en.png)

❶ If select the database you want to delete and click on **Delete**, the Delete confirmation pop-up window appears.
❷ You can request deletion by clicking on **Delete**.

#### Create a User

![db-instance-detail-user-create](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-user-create-en.png)

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

![db-instance-detail-user-modify](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-user-modify-en.png)

❶ When you click on **Modify** in the row of users that you want to edit, a pop-up window appears where you can edit information.
❷ If you do not enter a password, it will not be edited.
❸ When checking **Immediate Apply Scheduled Access Control**, the modifications are also applied to the access control rule immediately.

#### Delete a User

![db-instance-detail-user-delete](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-user-delete-en.png)

❶ Select the user that you want to delete and click on the drop-down menu.
❷ When **Delete** is clicked, **Delete Confirmation** pop-up window appears. You can request deletion by clicking on **Confirm**.

### Access Control

**Access Control** tab of the DB instance allows you to query and control DB Engine access rules for specific databases and users. The rules set here apply to file `pg_hba.conf`.

![db-instance-detail-hba](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-hba-en.png)

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

![db-instance-detail-hba-create](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-hba-create-en.png)

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

![db-instance-detail-hba-modify](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-hba-modify-en.png)

❶ When click **Modify** in the row of access control rules to modify, a pop-up window appears where you can modify existing information.
❷ Modified rules must apply access control settings to DB instances by clicking on **Apply Changes**.

#### Delete Access Control Rules

![db-instance-detail-hba-delete](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-detail-hba-delete-en.png)

❶ If you select the user you want to delete and click on **Delete**, the **Delete confirmation** pop-up window appears.
❷ Deleted rules must apply access control settings to DB instances by clicking on **Apply Changes**.

## Modify DB Instance

You can easily change various items in DB instance created through the console. The change items you request are applied to DB instances sequentially. If a restart is required during the application process, apply all changes and restart the DB instance. Items that cannot be changed and that require a restart are as follows.

| Items                     | Whether able to change or not | Whether need to restart or not                                 |
|---------------------------|-------------------------------|----------------------------------------------------------------|
| Availability Zone         | No                            |                                                                |
| DB Version                 | Yes                            |         Yes                                                       |
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

![db-instance-list-apply-parameter-group](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-apply-parameter-group-en.png)

❶ Click **Parameter** for destination DB instance, or
❷ Select a destination DB instance and click on **Apply Parameter Group Changes** menu from the drop-down menu.

If the parameters that require restart in the parameter group are changed, such DB instance is restarted in the process of applying the changes.

![db-instance-list-apply-parameter-group-popup](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-apply-parameter-group-popup-en.png)

❶ Click **Compare Chnages** to check the changed parameters.
❷ Click **Confirm** after checking the changes to apply the changed parameters to DB instances.

![db-instance-list-apply-parameter-group-compare-popup](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-apply-parameter-group-compare-popup-en.png)

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

![db-instance-list-replica-create](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-replica-create-en.png)

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

![db-instance-list-stop-wait-replication-lag](https://static.toastoven.net/prod_rds_postgres/20241015/db-instance-list-stop-wait-replication-lag-en.png)

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

![db-instance-list-restart](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-restart-en.png)

❶ Select DB instance that you want to restart and click **Restart DB Instance** from the drop-down menu.

## Force Restart DB Instances

If PostgreSQL of a DB instance is not working properly, you can force a restart. For a forced restart, issue a SIGTERM command to PostgreSQL and wait 10 minutes for normal shutdown. After PostgreSQL shuts down successfully in 10 minutes, reboot the virtual machine afterward. If it does not shut down normally in 10 minutes, force a reboot of the virtual machine. If a virtual machine is forced to reboot, some work-in-progress transactions may be lost and the data volume may become corrupted, making it impossible to recover. After a forced restart, the state of the DB instance might not return to the enabled state. Please contact the customer center if such situation occurs.

> [Caution]
> This feature should be avoided to use, except in urgent and unavoidable circumstances, as data may be lost or data volume may be compromised.

To force a DB instance restart from console

![db-instance-list-force-restart](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-force-restart-en.png)

❶ Select the DB instance that you want to force restart and click on **Force Restart DB Instance** menu from the drop-down menu.

## Change Deletion Protection Settings

Enabling deletion protection secures DB instances from accidental deletion. You will not be able to delete that DB instance until you disable the feature. To change the deletion protection settings

![db-instance-deletion-protection](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-deletion-protection-en.png)

❶ After selecting the DB instance for which you want to change the deletion protection settings, click **Change Deletion Protection Settings** from the drop-down menu, and a pop-up window will appear.

![deletion-protection-popup](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-deletion-protection-popup-en.png)

❷ Click **Confrim** after changing the deletion protection settings.


## 고가용성 DB 인스턴스

고가용성 DB 인스턴스는 가용성과 데이터 내구성을 증가시키고, 장애 허용이 가능한 데이터베이스를 제공합니다. 고가용성 DB 인스턴스는 마스터, 예비 마스터로 구성되며 서로 다른 가용성 영역에 생성됩니다. 예비 마스터는 장애에 대비한 DB 인스턴스로 평소에는 사용할 수 없습니다. 고가용성 DB 인스턴스의 경우 예비 마스터에서 백업이 수행됩니다.

> [참고]
> 고가용성 DB 인스턴스의 경우, PostgreSQL 쿼리문으로 다른 DB 인스턴스 또는 외부 PostgreSQL의 마스터로부터 강제로 복제하도록 설정하면 고가용성 및 일부 기능들이 정상적으로 동작하지 않습니다.

### 장애 감지

예비 마스터에는 장애를 감지하기 위한 프로세스가 존재하여 주기적으로 마스터의 상태를 감지합니다. 이러한 감지 주기를 Ping 간격이라고 하며 4회 연속 상태 체크에 실패할 경우 장애 조치를 수행합니다. Ping 간격이 짧을수록 장애에 민감하게 반응하며, Ping 간격이 길수록 장애에 둔감하게 반응합니다. 서비스 부하에 맞게 적절한 Ping 간격을 설정하는 것이 중요합니다.

> [참고]
> 마스터의 데이터 스토리지 사용량이 가득 차면 고가용성 감시 프로세스가 장애로 감지해 장애 조치를 수행하므로 주의하세요.

### 자동 장애 조치

예비 마스터에서 마스터의 상태 체크에 4회 연속 실패할 경우 마스터가 서비스를 제공하지 못한다고 판단하여 자동으로 장애 조치를 수행합니다. 스플릿 브레인 방지를 위해 장애가 발생한 마스터에 할당된 모든 사용자 보안 그룹의 연결을 해제하여 외부의 접속을 차단하며, 예비 마스터가 마스터의 역할을 대신합니다. 접속을 위한 내부 가상 IP는 장애가 발생한 마스터에서 예비 마스터로 변경되므로, 응용 프로그램의 변경은 필요하지 않습니다. 장애 조치가 완료되면 장애가 발생한 마스터의 종류는 장애 조치된 마스터로, 예비 마스터의 종류는 마스터로 변경됩니다. 장애 조치 과정에서 장애가 발생한 마스터에 대한 자동 복구가 진행되며, 자동 복구에 성공하는 경우 장애 조치된 마스터는 다시 예비 마스터로 기능합니다. 장애 조치된 마스터를 복구하거나 재구축하기 전까지 장애 조치가 수행되지 않습니다. 승격된 마스터는 장애 조치된 마스터의 모든 자동 백업을 승계합니다.
승격된 마스터에서 신규로 백업이 수행된 시간부터 시점 복원을 할 수 있습니다.

> [참고]
> 고가용성 기능은 도메인을 기반으로 하고 있기 때문에 접속을 시도하는 클라이언트가 DNS 서버에 접속할 수 없는 네트워크 환경일 경우 도메인을 통해 DB 인스턴스에 접속할 수 없고, 장애 조치 발생 시 정상적인 접속이 불가능합니다.
> 내부 가상 IP가 예비 마스터에서 마스터로 변경되는 과정에서 일시적으로 접속이 중단될 수 있습니다.

### 장애 조치된 마스터

장애가 발생하여 장애 조치가 된 마스터를 장애 조치된 마스터라고 합니다. 장애 조치된 마스터의 자동 백업은 수행되지 않으며, 장애 조치된 마스터 복구, 재구축, 분리, 삭제를 제외한 다른 모든 기능은 수행할 수 없습니다.

### 장애 조치된 마스터 복구

장애 조치 과정에서 데이터의 정합성이 깨지지 않았고, 장애가 발생한 시점부터 복구를 시도하는 시점까지 보관된 트랜잭션 로그(Archived Write Ahead Log)가 유실되지 않았다면 장애 조치된 마스터와 승격된 마스터를 다시 고가용성 구성으로 복구할 수 있습니다. 장애 조치된 마스터의 데이터베이스 그대로 승격된 마스터와 복제 관계를 다시 설정하므로 데이터의 정합성이 깨졌거나 복구에 필요한 보관된 트랜잭션 로그(Archived Write Ahead Log)가 유실되었다면 복구는 실패합니다. 장애 조치된 마스터 복구에 실패할 경우 재구축을 통해 다시 고가용성 기능을 활성화할 수 있습니다.

장애 조치된 마스터를 복구하려면 콘솔에서

![db-instance-ha-failover-repair-ko](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-ha-failover-repair-ko.png)

❶ 복구를 원하는 장애 조치된 마스터를 선택 후 드롭다운 메뉴에서 **장애 조치된 마스터 복구** 메뉴를 클릭합니다.

### 장애 조치된 마스터 재구축

장애 조치된 마스터 복구에 실패할 경우 재구축을 이용해 다시 고가용성 기능을 활성화할 수 있습니다. 재구축은 복구와 달리 장애 조치된 마스터의 데이터베이스를 모두 제거하고, 승격된 마스터의 데이터베이스를 토대로 재구축합니다. 장애 조치된 마스터를 재구축하려면 복제 그룹에 속한 DB 인스턴스 중 백업 파일 및 보관된 트랜잭션 로그(Archived Write Ahead Log)가 필요합니다. 백업 파일이 없는 경우 다음 순서에 따라 백업을 수행할 DB 인스턴스를 선택합니다.

❶ 자동 백업 설정한 읽기 복제본
❷ 자동 백업 설정한 마스터

조건에 맞는 DB 인스턴스가 없을 경우 장애 조치된 마스터 재구축 요청은 실패합니다.

> [주의]
> 마스터의 데이터베이스 크기에 비례하여 장애 조치된 마스터 재구축 시간이 늘어날 수 있습니다.
> 백업이 수행 되는 DB 인스턴스의 경우 장애 조치된 마스터 재구축 과정에서 스토리지 I/O 성능 하락이 있을 수 있습니다.

장애 조치된 마스터를 재구축하려면 콘솔에서

![db-instance-ha-failover-rebuild-ko](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-ha-failover-rebuild-ko.png)

❶ 재구축을 원하는 장애 조치된 마스터를 선택 후 드롭다운 메뉴에서 **장애 조치된 마스터 재구축** 메뉴를 클릭합니다.

### 장애 조치된 마스터 분리

장애 조치된 마스터 복구에 실패하여 데이터 보정이 필요할 경우 장애 조치된 마스터를 분리하여 고가용성 기능을 비활성화할 수 있습니다. 분리된 마스터와 승격된 마스터 간의 복제 관계가 끊어지며 각각 일반 DB 인스턴스로 동작합니다. 분리된 이후에는 다시 원래 구성으로 복구가 불가능합니다.

장애 조치된 마스터를 분리하려면 콘솔에서

![db-instance-ha-failover-split-ko](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-ha-failover-split-ko.png)

❶ 분리를 원하는 장애 조치된 마스터를 선택 후 드롭다운 메뉴에서 **장애 조치된 마스터 분리** 메뉴를 클릭합니다.

### 수동 장애 조치

고가용성 DB 인스턴스의 경우 재시작이 동반되는 작업을 수행하면 장애 조치를 이용한 재시작 여부를 선택할 수 있으며, 해당 작업은 아래와 같습니다.

* DB 인스턴스 재시작
* 재시작이 필요한 항목의 변경
* 재시작이 필요한 파라미터의 변경을 적용
* 하이퍼바이저 점검을 위한 DB 인스턴스 마이그레이션

장애 조치를 이용한 재시작을 하게 되면 예비 마스터를 먼저 재시작합니다. 이후 장애 조치를 통해 예비 마스터를 마스터로 승격시키고 기존 마스터는 예비 마스터 역할을 하게 됩니다. 승격 시, 접속을 위한 내부 가상 IP는 마스터에서 예비 마스터로 변경되므로, 응용 프로그램의 변경은 필요하지 않습니다. 승격된 마스터는 이전 마스터의 모든 자동 백업을 승계합니다.

> [참고]
> 고가용성 기능은 도메인을 기반으로 하고 있기 때문에 접속을 시도하는 클라이언트가 DNS 서버에 접속할 수 없는 네트워크 환경일 경우 도메인을 통해 DB 인스턴스에 접속할 수 없고, 장애 조치 발생 시 정상적인 접속이 불가능합니다.

> [주의]
> 예비 마스터와 복제 그룹에 포함된 읽기 복제본의 복제 지연 값이 1 이상일 경우 복제 지연이 발생한 것으로 간주하며, 이때 수동 장애 조치는 실패합니다. 부하가 적은 시간에 수동 장애 조치를 진행하는 것이 좋습니다. 복제 지연으로 인한 재시작 실패는 이벤트 화면을 통해 확인할 수 있습니다.

장애 조치를 이용한 재시작 시 다음의 항목을 추가로 선택하여 안정성을 높일 수 있습니다.

#### 현재 시점 백업 진행

장애 조치를 이용한 재시작이 완료된 후 곧바로 수동 백업을 진행할 수 있습니다.

#### 장애 조치 수동 제어

예비 마스터에 변경 사항을 먼저 적용한 뒤 그 추이를 관찰하거나, 정확한 시간에 장애 조치를 실행하고자 할 때 콘솔에서 장애 조치 시점을 직접 제어할 수 있습니다. 장애 조치 수동 제어를 선택하면 예비 마스터가 재시작된 후 ❶ 콘솔에 **장애 조치** 버튼이 표시됩니다. 이 버튼을 클릭하면 장애 조치가 실행되며, 최대 5일간 실행을 대기할 수 있습니다. 5일 이내에 장애 조치를 실행하지 않을 경우 해당 작업은 자동으로 취소됩니다.

![db-instance-ha-wait-manual-failover-ko](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-ha-wait-manual-failover-ko.png)

> [주의]
> 장애 조치를 대기하는 동안에는 자동 장애 조치가 되지 않습니다.

#### 복제 지연 해소 대기

복제 지연 해소 대기 옵션을 활성화하면 예비 마스터와 복제 그룹에 포함된 읽기 복제본의 복제 지연이 사라질 때까지 대기할 수 있습니다.

#### 쓰기 부하 차단

복제 지연을 해소하는 동안 쓰기 부하를 추가로 차단하는 선택이 가능합니다. 쓰기 부하를 차단하면 장애 조치를 수행하기 바로 전에 마스터가 읽기 전용 모드로 전환되어 모든 변경 쿼리가 실패하도록 설정됩니다.

### 고가용성 일시 중지

일시적인 작업으로 인한 연결 중단 또는 대량의 부하가 예상되는 상황에서 일시적으로 고가용성 기능을 중지할 수 있습니다. 고가용성 기능이 일시 중지되면 장애를 감지하지 않으므로 장애 조치를 수행하지 않습니다. 고가용성 기능이 일시 중지된 상태에서 재시작이 필요한 작업을 수행해도 일시 중지된 고가용성 기능이 재개되지 않습니다. 고가용성 기능이 일시 중지되어도 데이터 복제는 정상적으로 이루어지거나, 장애가 감지되지 않기 때문에 장시간 일시 중지 상태로 유지하는 것을 권장하지 않습니다.

### 예비 마스터 재구축

네트워크의 단절, 다른 마스터로부터의 복제 설정과 같은 다양한 원인으로 예비 마스터 복제가 중단될 수 있습니다. 복제 중단 상태의 예비 마스터는 자동 장애 조치가 실행되지 않습니다. 예비 마스터의 복제 중단을 해결하려면 예비 마스터를 재구축해야 합니다. 예비 마스터 재구축 시에는 예비 마스터의 데이터베이스를 모두 제거하며, 마스터의 데이터베이스를 토대로 재구축합니다. 이 과정에서 재구축에 필요한 백업 파일이 마스터 데이터베이스에 존재하지 않을 경우 마스터에서 백업이 수행되며, 백업으로 인한 성능 저하가 발생할 수 있습니다.



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

![db-instance-planned-migration](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-planned-migration-en.png)

You can check the detailed schedule of maintenance by putting the mouse pointer over the migration button.

![db-instance-planned-migration-popup](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-planned-migration-popup-en.png)

#### 2. You have to end the application that is connecting to the DB instance for maintenance targets.

Take appropriate measures to avoid affecting services connected to the DB.
If you have no choice but to affect the service, please contact NHN Cloud Customer Center and we will guide you with appropriate measures.

#### 3. Select the DB instance to be checked, click on Migration button and when a window appears asking for confirmation of the DB instance migration, click on the OK button.

![db-instance-planned-migration-confirm](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-planned-migration-confirm-en.png)

#### 4. Wait for DB instance migration to finish.

If the DB instance status does not change, 'refresh'.

![db-instance-planned-migration-status](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-planned-migration-status-en.png)

No action is allowed while the DB instance is being migrated.
If DB instance migration does not complete successfully, it will be reported to the administrator automatically, and NHN Cloud will contact you separately.
