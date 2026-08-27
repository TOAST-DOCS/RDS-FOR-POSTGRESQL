<!-- machine_translated: true -->

<!-- pre-align:aligned sig=207aa7fc4e38 -->

<a id="database-rds-for-postgresql-db-instances"></a>
## Database > RDS for PostgreSQL > DB Instances { #database-rds-for-postgresql-db-instances }

<a id="db-instance"></a>
## DB Instance { #db-instance }

A DB instance is a concept that encompasses virtual equipment and installed PostgreSQL, a unit of PostgreSQL provided by RDS for PostgreSQL.
You cannot directly access the operating system of the DB instance, and can only access the database through the port entered when the DB instance was created. The available port range is 5432–45432.

DB instance is identified by the name given by the user and the 32-byte ID given automatically.
DB instance names have the following restrictions:

* DB instance name has to be unique for each region.
* DB instance names can only contain alphabets between 1 and 100 characters, numbers, and some symbols (-, \_, .), and the first letter can only be an alphabetic character.

<a id="create-db-instance"></a>
## Create DB Instance { #create-db-instance }

You can create a DB instance through the settings below:

<a id="availability-zone"></a>
### Availability Zone { #availability-zone }

NHN Cloud has divided the entire system into multiple availability areas to prepare for failures caused by physical hardware problems. For each of these availability areas, storage systems, network switches, top and power supplies are all configured separately. Failure within one area of availability does not affect another area of availability, which means increasing availability across the service. If you deploy DB instances across multiple availability areas, you can increase the availability of services. Network communication is possible between DB instances created across multiple availability zones, and there is no network usage charge for this.

> [Caution]
> You cannot change the availability area of an already created DB instance.

<a id="db-engine"></a>
### DB Engine { #db-engine }

The versions specified below are available:

| Version          | Note |
|---------------------|-------------------------------|
| <strong>17</strong> |                               |
| PostgreSQL 17.10    |                               |
| PostgreSQL 17.6     |                               |
| PostgreSQL 17.4     |                               |
| PostgreSQL 17.2     | Creation and read replicas unsupported. |
| <strong>14</strong> |                               |
| PostgreSQL 14.23    |                               |
| PostgreSQL 14.19    |                               |
| PostgreSQL 14.17    |                               |
| PostgreSQL 14.15    | Creation and read replicas unsupported |
| PostgreSQL 14.6     | Creation and read replicas unsupported |

DB 엔진은 생성 이후 콘솔의 수정 기능으로 버전을 업그레이드할 수 있습니다.
DB 엔진에 관한 자세한 내용은 [DB 엔진](db-engine/)에서 확인할 수 있습니다.

<a id="db-instance-type"></a>
### DB instance type { #db-instance-type }

DB instances have different CPU cores and memory capacities, depending on the type.
When you create a DB instance, you must select the appropriate DB instance type according to the database workload.

| Type | Description                                                                                                                              |
|------|------------------------------------------------------------------------------------------------------------------------------------------|
| m2   | This is a type that balances CPU and memory.                                                                                             |
| c2   | This is an Instance type with high CPU performance.                                      |
| r2   | It can be used when memory is used more than other resources.                                                                            |
| x1   | It is a type that supports high-specification CPU and memory. It can be used for services or applications that require high performance. |

The type of DB instance that you have already created can be easily changed through the console.

> [Caution]
> Changing the type of a DB instance that you have already created will shut down the DB instance, resulting in a few minutes of downtime.

<a id="data-storage"></a>
### Data Storage { #data-storage }

Stores the database's data files in data storage. DB instances support two types of data storage: HDD and SSD. Performance and price vary by data storage type, so you need to choose the right type according to your database workload. Data storage can be created in 20GB to 2TB.

> [Caution]
> You cannot change the data storage type of an already created DB instance.

> [Note]
> To use more than 2TB of data storage, contact NHN Cloud Customer Support.

The following tasks use the I/O capacity of the data storage, which may degrade the performance of DB instances during the process.

* Backup of a single DB instance
* High availability configuration of a single DB instance
* Create a Read Replica
* Rebuild a Read Replica
* Rebuild a Standby
* Restore to a certain point in time
* Export backup files to Object Storage after backing up a single DB instance

<a id="high-avilability"></a>
### High Avilability { #high-avilability }

High-availability DB instances increase availability and data durability, providing a fault-tolerant database. High-availability DB instances consist of a Primary and a Standby, and are created in different availability zones. The Standby is a DB instance prepared for failure and is not normally available. Because backups are performed on the Standby, high-availability DB instances can avoid performance degradation caused by backups. You can find the various features provided by high-availability DB instances in [High-Availability DB Instance](#high-availability-db-instance).

<a id="information"></a>
### Information { #information }

Set DB instance default information. You can enter the DB instance name, description, DB port, and user information that you want to create by default.
The user ID you enter is created with DDL permissions.

**READ**
* Includes read-only access to the data.

**CRUD**
* Includes READ permissions with the ability to modify data.

**DDL**
* Includes full CRUD permissions and the authority to execute DDL queries.
* Enables assignment as the database or schema owner.

<a id="floating-ip"></a>
### Floating IP { #floating-ip }

To access a DB instance from outside, you must connect the floating IP to DB instance. You can create a floating IP only if you connect a subnet to which the Internet Gateway is used. Floating IP is charged at the same time as it is used, and separately, it is charged separately if traffic is generated in the direction of the Internet through the floating IP.

<a id="parameter-group"></a>
### Parameter Group { #parameter-group }

A parameter group is a set of parameters that allow you to set up a database installed on a DB instance. You must select one parameter group when you create a DB instance. The parameter group can be changed freely even after it is created. For more information, refer to [Parameter Group](parameter-group/).

<a id="db-security-group"></a>
### DB Security Group { #db-security-group }

DB security groups are used to restrict access against outside break-in. You can allow access to specific port ranges or database ports for incoming and outgoing traffic. You can apply multiple DB security groups to a DB instance. For more information, refer to [DB security groups](db-security-group/).

<a id="backup"></a>
### Backup { #backup }

You can configure the database of a DB instance to be backed up periodically, or create a backup through the console whenever you want. Performance may degrade while a backup is in progress. We recommend that you perform backups during off-peak hours to avoid affecting your service. To avoid performance degradation due to backups, you can use a high-availability configuration or perform backups from a Read Replica. Backup files are stored in internal backup storage, and charges are incurred based on backup capacity. If needed, you can export them to user object storage in NHN Cloud. We recommend that you configure periodic backups to prepare for unexpected failures. For more information, see [Backup and Restore](backup-and-restore/).

<a id="maintenance"></a>
### Maintenance { #maintenance }

Periodically, set tasks to run that can help stabilize the DB instance. If you are using file I/O, you might experience performance degradation while maintenance tasks are performed. We recommend that you run automatic maintenance tasks during off-peak hours to avoid impacting your services.
If maintenance tasks are required, they are performed on all DB instances in the DB instance group at the configured time.

<a id="maintenance-enable-auto-storage-cleanup"></a>
#### Enable Auto Storage Cleanup

Clean up archived write ahead logs that do not affect service behavior. Archived transaction logs that do not affect service behavior are logs that are not used when using automatic backups to restore to the current point in time.

<a id="default-notification"></a>
### Default Notification { #default-notification }

You can set default notifications when creating a DB instance. Setting default notifications creates a new notification group with `{DB instance name}-default` name and automatically sets the notification items below. You can freely modify and delete notification groups generated by default notifications. For more information, see [Notification Groups](notification/).

| Items                       | comparison method | Threshold value | Duration    |
|-----------------------------|-------------------|-----------------|-------------|
| CPU Usage                   | >=                | 80%             | 5 minutes   |
| Storage Remaining Usage     | <=                | 5,120MB         | 5 minutes   |
| Database Connection Status  | <=                | 0               | 0 minutes   |
| Storage usage               | >=                | 95%             | 5 minutes   |
| Data storage fault          | <=                | 0               | 0 minutes   |
| Connection Ratio            | >=                | 85%             | 5 minutes   |
| Memory Usage                | >=                | 90%             | 5 minutes   |


<a id="db-instances"></a>
## DB Instances { #db-instances }

You can view the DB instances created from the console. You can view in groups of DB instances, or as individual DB instances.

![db-instance-list-basic](../static/images/20260609/db-instance-list-basic-en.png)

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

![db-instance-list-filter](../static/images/20260609/db-instance-list-filter-en.png)

❶ Retrieve the status of DB instance by filtering criteria.
❷ Retrieve availability zones by filtering criteria.

<a id="db-instance-details"></a>
## DB Instance Details { #db-instance-details }

Select DB instance to view details.

![db-instance-detail-basic](../static/images/20260609/db-instance-detail-basic-en.png)

❶ When you click on the domain of the connection information, the pop-up window to verify the IP address appears.
❷ When you click on the DB security group, a pop-up window appears to verify the DB security rules.
❸ Click a parameter group to go to the screen where you can check the parameters.
❹ Adjust the height of the detail panel by dragging and dropping with the mouse.
❺ Adjust the height of the detail panel to a pre-determined height.

<a id="connection-information"></a>
### Connection Information { #connection-information }

When a DB instance is created, an internal domain is issued. The internal domain points to an IP address within the user's VPC subnet. Even if a high availability DB instance undergoes failover and the Standby becomes the new Primary, the internal domain does not change. Therefore, unless there is a specific reason, the connection information for your application must use the internal domain.

If you created a floating IP, issue an additional external domain. External domain points to the address of the floating IP. Because the external domain or floating IP is externally accessible, you must set the rules of the DB security group appropriately to protect the DB instance.

<a id="log"></a>
### Log { #log }

On the **Logs** tab of the DB instance, you can view or download various log files. Log files will rotate to the set settings as follows. Some log files can be enabled or disabled in a parameter group.

| Items           | Rotate Settings      | Whether to change or not | 
|-----------------|----------------------|--------------------------|
| postgresql.log  | 40 items of 100 MB   | Static                   |
| backup.log      | Daily 10 items       | Static                   |

![db-instance-detail-log](../static/images/20260609/db-instance-detail-log-en.png)

❶ When you click **View Log**, a pop-up window appears where you can view the contents of the log file. You can check logs up to 65,535 Bytes.
❷ Click on **Import** to request that the log files of the DB instance be downloaded.
❸ When the download is ready, the **Download** button is exposed. Click to download the log.

> [Caution]
> When **Import** is clicked, the log file is uploaded to the backup storage for approximately 5 minutes and the backup storage capacity is charged to the size of the log file.
> Click on **Download** to charge Internet traffic as large as the log file.


<a id="database-user"></a>
### Database & User { #database-user }

**Database & User** tab of DB instance allows you to query and control databases and users created in the DB engine.


<a id="database-user-create-a-database"></a>
#### Create a database

![db-instance-detail-db-create](../static/images/20260811/db-instance-detail-db-create-en.png)

❶ When you click on **+ Create**, a pop-up window appears where you can enter the name of the database.
❷ You can create the database by entering the database name and clicking **Create**.
❸ Designate a DDL user to be the owner.
❹ Grant database access by selecting the desired users.

Database names have the following restrictions:

* Only characters between 1 and 63 characters, except quotes (','), can be used.
* `postgres` `information_schema` `performance_schema` `repmgr` `db_helper` `sys` `mysql` `rds_maintenance` `pgpool` `nsight` `watchdog` `barman` `rman` are not allowed to use as database names. 

<a id="database-user-modify-database"></a>
#### Modify Database

![db-instance-detail-db-modify](../static/images/20260811/db-instance-detail-db-modify-en.png)

❶ When you click on **Modify** in the database row you want to modify, a pop-up window appears where you can modify the database information.
❷ Designate a DDL user to be the owner.
❸ Grant database access by selecting the desired users.
❹ Enabling **Immediate Apply Scheduled Access Control** applies modifications to access control rules immediately.
❺ Click **Modify** to request modifications.

<a id="database-user-synchronize-database"></a>
#### Synchronize Database

![db-instance-detail-db-sync](../static/images/20260609/db-instance-detail-db-sync-en.png)

❶ After you click **Synchronization**, the **synchronization confirmation** pop-up window appears.
❷ You can click **Confirm** to request the synchronization.

<a id="database-user-delete-database"></a>
#### Delete Database

![db-instance-detail-db-delete](../static/images/20260609/db-instance-detail-db-delete-en.png)

❶ If select the database you want to delete and click on **Delete**, the Delete confirmation pop-up window appears.
❷ You can request deletion by clicking on **Delete**.

<a id="database-user-modify-schema"></a>
#### Modify Schema

![db-instance-detail-schema-modify](../static/images/20260811/db-instance-detail-schema-modify-en.png)

❶ Click **Modify** on the schema row you wish to modify. A pop-up window will appear where you can update the schema information.
❷ Select a DDL user to assign as the owner.
❸ Select users to grant query permissions. Schema query access will be granted based on the selected user's permission level.
❹ Click **Modify** to submit your changes.

<a id="database-user-create-a-user"></a>
#### Create a User

![db-instance-detail-user-create](../static/images/20260811/db-instance-detail-user-create-en.png)

❶ Click on **+ Create** to see the **Add User** pop-up window.
❷ Enter user ID.

User ID has the following restrictions:

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

<a id="database-user-modify-a-user"></a>
#### Modify a User

![db-instance-detail-user-modify](../static/images/20260811/db-instance-detail-user-modify-en.png)

❶ When you click on **Modify** in the row of users that you want to edit, a pop-up window appears where you can edit information.
❷ If you do not enter a password, it will not be edited.
❸ When checking **Immediate Apply Scheduled Access Control**, the modifications are also applied to the access control rule immediately.

<a id="database-user-synchronize-user"></a>
#### Synchronize User

![db-instance-detail-user-sync](../static/images/20260609/db-instance-detail-user-sync-en.png)

❶ Click **Synchronization** and a **Confirm Synchronization** pop-up window will appear.
❷ Click **Confirm** to request synchronization.

<a id="database-user-delete-a-user"></a>
#### Delete a User

![db-instance-detail-user-delete](../static/images/20260609/db-instance-detail-user-delete-en.png)

❶ Select the user that you want to delete and click on the drop-down menu.
❷ When **Delete** is clicked, **Delete Confirmation** pop-up window appears. You can request deletion by clicking on **Confirm**.

![db-instance-detail-user-delete-with-option](../static/images/20260609/db-instance-detail-user-delete-with-option-en.png)

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


<a id="access-control"></a>
### Access Control { #access-control }

**Access Control** tab of the DB instance allows you to query and control DB Engine access rules for specific databases and users. The rules set here apply to file `pg_hba.conf`.

![db-instance-detail-hba](../static/images/20260609/db-instance-detail-hba-en.png)

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


<a id="access-control-add-access-control-rules"></a>
#### Add Access Control Rules

![db-instance-detail-hba-create](../static/images/20260609/db-instance-detail-hba-create-en.png)

❶ When you click on **+ Create**, an **Add Access Control Rule** pop-up window appears.
❷ If you select **Default** as the input method, you can add rules by specifying a database or user stored in the DB instance.
❸ You can set the rule target to all targets, or select and specify a particular database or user.
    - When **Custom** is selected, a drop-down menu for selecting the database and user is displayed on the **Database & User** tab.
❹ Enter the connection address to which the rule applies in CIDR format.
❺ Select authentication method. The following authentication methods are supported by RDS for PostgreSQL.

| authentication method         | DB Engine Settings value   | Description                                                                                  |
|-------------------------------|----------------------------|----------------------------------------------------------------------------------------------|
| Trust (no password required)  | trust                      | Allow all connections without passwords or other authentication.                             |
| Block connection              | reject                     | Block all connections.                                                                       |
| password (SCRAM-SHA-256)      | scram-sha-256              | Ensure that SCRAM-SHA-256 is authenticated with the password set on **Database & User** tab. |

❻ Adjust the order in which the rules are applied with the up/down arrow buttons.
    - Access control rules are applied sequentially from above and the first applied rule takes priority.
    - If the access permission rule registered at the top is applied first, access is allowed even if there is an access blocking rule at the bottom.
    - Conversely, even if there is an access permission rule at the bottom, access is not allowed if the access blocking rule registered at the top is applied first.
❼ After finish setting, click **Apply Changes** to apply the access control settings to DB instance.
❽ When applied to DB instance, the status changes to **Applied**.

![db-instance-detail-hba-create-by-text](../static/images/20260609/db-instance-detail-hba-create-by-text-en.png)

❶ If you select **Bulk Add by Rule Source** as the input method, you can bulk add rules by entering the `pg_hba.conf` source as-is.
❷ You can use the `pg_hba.conf` source as-is, including comments. For more information, see the [PostgreSQL website](https://www.postgresql.org/docs/17/auth-pg-hba-conf.html).

<a id="access-control-modify-access-control-rules"></a>
#### Modify Access Control Rules

![db-instance-detail-hba-modify](../static/images/20260609/db-instance-detail-hba-modify-en.png)

❶ When click **Modify** in the row of access control rules to modify, a pop-up window appears where you can modify existing information.
❷ Modified rules must apply access control settings to DB instances by clicking on **Apply Changes**.

<a id="access-control-delete-access-control-rules"></a>
#### Delete Access Control Rules

![db-instance-detail-hba-delete](../static/images/20260609/db-instance-detail-hba-delete-en.png)

❶ After selecting the access control rules to delete, click on **Delete**, the **Delete confirmation** pop-up window appears.
❷ Deleted rules must apply access control settings to DB instances by clicking on **Apply Changes**.


<a id="extension"></a>
### Manage Extensions { #extension }

You can get and control the extensions that require SUPERUSER permission from **Manage Extensions** tab of the DB instance.

<a id="extension-install-extensions"></a>
#### Install Extensions

![db-instance-detail-extension-install](../static/images/20260609/db-instance-detail-extension-install-en.png)

❶ Click **Install** to display a pop-up window that allows you to select the database on which to install the selected extension.
❷ Check **Force Install** to force installation of dependent extensions.
❸ After selecting the installed database, click **Confirm** to schedule the installation task.
❹ Click **Cancel** to cancel the scheduled task.
❺ Click **Apply Changes** to install the extension in the DB instance.

<a id="extension-delete-extensions"></a>
#### Delete Extensions

![db-instance-detail-extension-delete](../static/images/20260609/db-instance-detail-extension-delete-en.png)

❶ Click **Delete** from the database row to be deleted to display a **Confirm Delete** pop-up window.
❷ Check **Force Install** to force deletion of dependent extensions.
❸ Click **Delete** to schedule the deletion task.
❹ Click **Cancel** to cancel the scheduled task.
❺ Click **Apply Changes** to delete the installed extension in the DB instance.

<a id="extension-synchronize-extensions"></a>
#### Synchronize Extensions

![db-instance-detail-extension-sync](../static/images/20260609/db-instance-detail-extension-sync-en.png)

❶ If you click **Synchronize**, a **Confirm Synchronization** pop-up window will appear.
❷ Click **Confirm** to request synchronization.


<a id="modify-db-instance"></a>
## Modify DB Instance { #modify-db-instance }

You can easily change various items in DB instance created with the console. The change items you request are applied to DB instances sequentially. If a restart is required during the application process, apply all changes and restart the DB instance. Items that cannot be changed and that require a restart are as follows.

| Items                     | Whether able to change or not | Whether need to restart or not                                 |
|---------------------------|-------------------------------|----------------------------------------------------------------|
| Availability Zone         | No                            |                                                                |
| DB version                | Yes                            |Yes                                                              |
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
| Auto Scale Storage      | Yes        | No                     |
| Database and User Control | Yes                           | No                                                             |
| Access Control            | Yes                           | No                                                             |

For high-availability DB instances, we provide a failover restart feature to increase reliability and reduce net time when there is a change to something that requires a restart.

![modify-ha-popup](../static/images/20260414/modify-ha-popup-en.png)

If you do not use restart with failover, changes are applied sequentially to the Primary and Standby, and then the DB instance is restarted. For more information, see [Manual Failover](#manual-failover) of High Availability DB Instances.

<a id="database-user-control"></a>
### Database User Control { #database-user-control }

RDS for PostgreSQL provides management features in the console for easy management of databases and users, but also provides a feature to allow users to control them directly. When direct control is enabled, `CREATEDB` and `CREATEROLE` privileges are granted to all DDL users currently created. The same privileges are granted when modifying the privileges of existing users via DDL or when creating new users.

> [Caution]
> If the privileges managed by RDS are not granted to a directly created user, the user is represented with **CUSTOM** privileges.

<a id="delete-db-instance"></a>
## Delete DB instance { #delete-db-instance }

You can delete DB instances that you no longer use. Deleting a Primary also deletes all Read Replicas that belong to the same replication group. A deleted DB instance cannot be recovered, so we recommend that you enable the deletion protection setting for important DB instances.

<a id="backup-2"></a>
## Backup { #backup-2 }

You can prepare a database of DB instances to recover in case of a failure. You can perform backups from the console whenever you need to or you can set to perform periodical back up. See [Backup](backup-and-restore/#backup) for more information.

<a id="restoration"></a>
## Restoration { #restoration }

You can use backup to restore data to any point in time. Restore always creates a new DB instance and cannot be restored to an existing DB instance. See [Backup](backup-and-restore/#restore) for more information.

<a id="secure-capacity"></a>
## Secure Capacity { #secure-capacity }

If WAL logs are excessively generated due to rapid load and the data storage is low in capacity, you can delete the WAL logs using the capacity acquisition feature on the console. When you select Free Capacity from the console, a pop-up window appears to select WAL log for the DB instance. Select the WAL log and click **Confirm** to delete all WAL logs created before the selected item. The capacity acquisition feature is to temporarily secure capacity. If you continue to run out of capacity, you must scale up your data storage to meet the service load.

> [Caution]
> Depending on the deleted WAL log, it may not be restored to a certain point in time.

<a id="auto-scale-storage"></a>
## Auto Scale Storage { #auto-scale-storage }

You can automatically scale the data storage size of a DB instance. With auto storage expansion, you can maintain database availability by automatically scaling up when storage capacity runs out.

To use auto scale storage, you must enable **Auto Scale Storage** when creating and modifying DB instances.

When you enable auto scale storage, you can set three options
* Storage Auto Scale Conditions: Automatically expand storage when storage utilization is above a set value for more than 5 minutes.
* Storage Auto Scale Max: The maximum size that storage auto-scale can grow to.
* Storage Auto Scale Cooldown: Set the amount of time after storage auto scale cooldown runs once before the feature is enabled again.

The amount of increase when the auto scale storage feature runs is set to the largest of the following values:
* 10 GB
* 10% of storage size
* Data storage usage growth in the last hour * cooldown (in hours)

<a id="apply-parameter-group-changes"></a>
## Apply Parameter Group Changes { #apply-parameter-group-changes }

Even though the settings of the parameter groups connected to the DB instance changed, it does not automatically apply to the DB instance. If the parameters applied to DB instance and the settings of the connected parameter group are different, **Parameter** button is displayed in the console.

You can apply changes to a parameter group to a DB instance using one of the following methods.

![db-instance-list-apply-parameter-group](../static/images/20260609/db-instance-list-apply-parameter-group-en.png)

❶ Click **Parameter** for destination DB instance, or
❷ Select a destination DB instance and click on **Apply Parameter Group Changes** menu from the drop-down menu.

If the parameters that require restart in the parameter group are changed, such DB instance is restarted in the process of applying the changes.

![db-instance-list-apply-parameter-group-popup](../static/images/20260609/db-instance-list-apply-parameter-group-popup-en.png)

❶ Click **Compare Chnages** to check the changed parameters.
❷ Click **Confirm** after checking the changes to apply the changed parameters to DB instances.

![db-instance-list-apply-parameter-group-compare-popup](../static/images/20260609/db-instance-list-apply-parameter-group-compare-popup-en.png)

<a id="export-backup-files-to-object-storage-after-backup"></a>
## Export Backup Files to Object Storage after Backup { #export-backup-files-to-object-storage-after-backup }

After backing up, you can export the backup file to user object storage in NHN Cloud. For details, see [Export Backup Files](backup-and-restore/#export-backup-files).

<a id="restore-using-backup-in-object-storage"></a>
## Restore Using Backup in Object Storage { #restore-using-backup-in-object-storage }

You can restore to a DB instance using a backup file exported from RDS for PostgreSQL to object storage. For more information, see [Restore using Backup in Object Storage](backup-and-restore/#restore-using-backup-in-object-storage).


<a id="read-replica"></a>
## Read Replica { #read-replica }

To improve read performance, you can create Read Replicas that can be used as read-only. You can create up to 5 Read Replicas per Primary. A Read Replica of a Read Replica cannot be created.

<a id="create-read-replica"></a>
### Create Read Replica { #create-read-replica }

To create a Read Replica, you need a backup file created from a DB instance in the replication group. If you do not have a backup file, select the DB instance to perform the backup in the following order:

❶ Read Replica with automatic backups enabled
❷ Primary with automatic backups enabled

If no DB instance meets the criteria, the request to create a Read Replica fails.

> [Caution]
> Read Replica creation time may increase proportionally to the size of the database on the Primary.
> For DB instances that are backed up, there might be a drop in storage I/O performance during the Read Replica creation process.

> [Note]
> You may be charged for Backup Storage by the size of the Data Storage required during the Read Replica creation process.

To create a Read Replica, in the console

![db-instance-list-replica-create](../static/images/20260609/db-instance-list-replica-create-en.png)

❶ Select the source DB instance and click **Create Read Replica** to go to the page for creating a Read Replica.

You can create a Read Replica with the following settings.

<a id="create-read-replica-items-unavailable-to-change"></a>
#### Items unavailable to change

When creating a Read Replica, the following items cannot be changed because they follow the settings of the original DB instance.

* DB engine
* Data storage type
* User VPC subnet

<a id="create-read-replica-read-replica-region"></a>
#### Read Replica Region
When selecting a region in which to create a Read Replica, if region peering is supported, you can create a Read Replica on a subnet that belongs to a VPC in a different region by connecting a region peering between VPCs that exist in different regions. However, if you select a region different from that of the source DB instance, replication lag may occur, and DB version upgrades are not supported.

> [Caution]
> Even if region peering is connected, if the route settings are incorrect, Read Replica creation might fail or replication might stop.

<a id="create-read-replica-availability-zone"></a>
#### Availability Zone

Select the Availability Zone for the Read Replica. For more details, see the [Availability Zone](#availability-zone) section.

<a id="create-read-replica-db-instance-type"></a>
#### DB Instance Type

We recommend that you create a Read Replica with the same specification as or a higher specification than the Primary. Creating one with a lower specification may result in replication latency.

<a id="create-read-replica-data-storage-size"></a>
#### Data storage size

It is recommended to make it the same size as the source DB instance. If you set a smaller size, the replication process may be interrupted due to insufficient data storage capacity.

<a id="create-read-replica-floating-ip"></a>
#### Floating IP

Select whether to use a floating IP for the Read Replica. For more information, see [Floating IP](#floating-ip).

<a id="create-read-replica-parameter-group"></a>
#### Parameter group

When selecting a parameter group for a Read Replica, if no replication-related configuration changes are needed, we recommend that you select the same parameter group as the original DB instance. For more information, see [Parameter Group](parameter-group/).

<a id="create-read-replica-db-security-group"></a>
#### DB Security Group

Select the DB security group to apply to the Read Replica. Rules required for replication are applied automatically, so you do not need to add them separately to the DB security group. For more details, see [DB Security Group](db-security-group/).

<a id="create-read-replica-backup"></a>
#### Backup

Select the backup settings for the Read Replica. For more details, see [Backup and Restoration](backup-and-restore/).

<a id="create-read-replica-default-notifications"></a>
#### Default notifications

Select whether to enable default notifications. For a detailed description, see [Default notifications](#default-notification).

<a id="create-read-replica-deletion-protection"></a>
#### Deletion Protection

Select whether to enable erasure protection. For a detailed description, see [Deletion Protection](#change-deletion-protection-settings).

<a id="promote-read-replica"></a>
### Promote Read Replica { #promote-read-replica }

The process of breaking the replication relationship with Primary and converting a Read Replica into a standalone Primary is called promotion. A promoted Primary operates as a standalone DB instance. If replication latency exists between the Read Replica to promote and Primary, promotion does not occur until the latency is resolved. A DB instance that has been promoted cannot be reverted to its previous replication relationship.

> [Caution]
> If the Primary DB instance is in an abnormal state, the promotion cannot be performed.

<a id="force-promote-read-replicas"></a>
### Force Promote Read Replicas { #force-promote-read-replicas }

Force promotes to the current point-in-time data of the Read Replica, regardless of the Primary status. If there is replication lag, you can set a wait time to wait until the lag is resolved, but because promotion proceeds regardless of whether the lag has been resolved, data loss can result. Therefore, we do not recommend using this feature unless you urgently need to bring the Read Replica into service.

<a id="end-wait-for-replication-delay-during-read-replica-promotionforce-promotion"></a>
### End Wait for Replication Delay During Read Replica Promotion/Force Promotion { #end-wait-for-replication-delay-during-read-replica-promotionforce-promotion }

To end the wait operation, when you are waiting for replication delays to resolve during a Read Replica promotion or force promotion,

![db-instance-list-stop-wait-replication-lag](../static/images/20260609/db-instance-list-stop-wait-replication-lag-en.png)

❶ Click **Replication Waiting** brings up a popup window that allows you to end the waiting task.
❷ Click **Confirm** to end the waiting task.

<a id="stop-replication-of-read-replicas"></a>
### Stop Replication of Read Replicas { #stop-replication-of-read-replicas }

Replication on a Read Replica may stop for various reasons. If the status of a Read Replica is `Replication Stopped`, you must quickly identify the cause and restore it to normal operation. If the `Replication Stopped` status persists for an extended period, replication lag increases. If the WAL logs required to restore normal operation are unavailable, you must rebuild the Read Replica.

<a id="rebuild-read-replica"></a>
### Rebuild Read Replica { #rebuild-read-replica }

If a replication issue with a Read Replica cannot be resolved, you can restore it to a normal state by rebuilding. During this process, all databases in the Read Replica are removed and rebuilt based on the Primary database. The Read Replica is unavailable during the rebuild. To rebuild a Read Replica, you need a backup file created from a DB instance in the replication group. If you do not have a backup file, refer to the [Create a read replica](#create-read-replica) section for behavior and notes.

> [Note]
Access information (domain, IP) does not change after rebuilding.

<a id="restart-db-instances"></a>
## Restart DB Instances { #restart-db-instances }

If you want to restart PostgreSQL, you can restart a DB instance. To minimize restart time, it is recommended to perform when service load is low.

To restart a DB instance, use console

![db-instance-list-restart](../static/images/20260609/db-instance-list-restart-en.png)

❶ Select DB instance that you want to restart and click **Restart DB Instance** from the drop-down menu.

<a id="force-restart-db-instances"></a>
## Force Restart DB Instances { #force-restart-db-instances }

If PostgreSQL of a DB instance is not working properly, you can force a restart. For a forced restart, issue a SIGTERM command to PostgreSQL and wait 10 minutes for normal shutdown. After PostgreSQL shuts down successfully in 10 minutes, reboot the virtual machine afterward. If it does not shut down normally in 10 minutes, force a reboot of the virtual machine. If a virtual machine is forced to reboot, some work-in-progress transactions may be lost and the data volume may become corrupted, making it impossible to recover. After a forced restart, the state of the DB instance might not return to the enabled state. Please contact the customer support if such situation occurs.

> [Caution]
> This feature should be avoided to use, except in urgent and unavoidable circumstances, as data may be lost or data volume may be compromised.

To force a DB instance restart from console

![db-instance-list-force-restart](../static/images/20260609/db-instance-list-force-restart-en.png)

❶ Select the DB instance that you want to force restart and click on **Force Restart DB Instance** menu from the drop-down menu.

<a id="change-deletion-protection-settings"></a>
## Change Deletion Protection Settings { #change-deletion-protection-settings }

Enabling deletion protection secures DB instances from accidental deletion. You will not be able to delete that DB instance until you disable the feature. To change the deletion protection settings

![db-instance-deletion-protection](../static/images/20260609/db-instance-list-deletion-protection-en.png)

❶ After selecting the DB instance for which you want to change the deletion protection settings, click **Change Deletion Protection Settings** from the drop-down menu, and a pop-up window will appear.

![deletion-protection-popup](../static/images/20260609/db-instance-list-deletion-protection-popup-en.png)

❷ Click **Confrim** after changing the deletion protection settings.


<a id="high-availability-db-instance"></a>
## High Availability DB Instance { #high-availability-db-instance }

High-availability DB instances increase availability and data durability, providing a fault-tolerant database. High availability DB instances consist of a Primary and a Standby, and are created in different availability zones. The Standby is the DB instance in case of failure and is not normally available. For high-availability DB instances, backups are performed on the Standby.

> [Note]
> For high availability DB instances, if you configure force replication from another DB instance or from an external PostgreSQL primary using a PostgreSQL query statement, high availability and some features will not work properly.

<a id="failure-detection"></a>
### Failure Detection { #failure-detection }

The Standby has a process for detecting failures, which periodically detects the health of the Primary. These detection cycles are called ping intervals, and failover occurs if four consecutive health checks fail. The shorter the ping interval, the more sensitive it is to failures, and the longer the ping interval, the more insensitive it is to failures. It is important to set the appropriate ping interval for your service load.

> [Note]
> Note that if the Primary's data storage usage fills up, the high-availability watchdog process detects the failure and initiates failover.

<a id="auto-failover"></a>
### Auto Failover { #auto-failover }

If the Standby fails four consecutive health checks on the Primary, it determines that the Primary is unable to provide service and automatically fails over. To prevent split-brain, all security groups assigned to the failed Primary are unlinked to prevent external access, and the Standby assumes the role of the Primary. The internal virtual IP for connectivity is changed from the failed Primary to the Standby, so no changes to the application are required. When failover is complete, the failed Primary's type is changed to Failed Over Primary and the Standby's type is changed to Primary. During the failover process, automatic recovery occurs for the failed Primary, and if the automatic recovery is successful, the Failed Over Primary functions as a Standby again. Failover does not occur until the Failed Over Primary is recovered or rebuilt. The promoted Primary inherits all automatic backups from the Failed Over Primary.
You can restore a point in time from the time a new backup was taken on the promoted Primary.

> [Note]
> Since the high availability feature is based on domains, if the network environment is such that the client attempting to connect cannot reach the DNS server, the DB instance cannot be accessed through the domain, and normal access is not possible in the event of a failover.
> Access may be temporarily interrupted while the internal virtual IP is changing from Standby to Primary.

<a id="failed-over-master"></a>
### Failed Over Master { #failed-over-master }

A Primary that fails and becomes a failover is called a Failed Over Primary. Automatic backups of a Failed Over Primary are not performed, and all other functions except recovering, rebuilding, detaching, and deleting a Failed Over Primary cannot be performed.

<a id="restore-failed-over-master"></a>
### Restore Failed Over Master { #restore-failed-over-master }

If data integrity was not compromised during the failover process, and the archived write-ahead transaction logs from the time of the failure to the time of the recovery attempt were not lost, you can restore the Failed Over Primary and the promoted Primary to a high availability configuration again. Because the replication relationship with the promoted Primary is re-established using the Failed Over Primary's database as-is, recovery will fail if data integrity is compromised or the archived write-ahead transaction logs required for recovery are lost. If recovery of the Failed Over Primary fails, you can use rebuild to enable high availability again.

To recover a Failed Over Primary in the console

![db-instance-ha-failover-repair](../static/images/20260609/db-instance-ha-failover-repair-en.png)

❶ Select the Failed Over Primary you want to recover, and then click the **Restore Failed Over Master** menu from the drop-down menu.

<a id="rebuild-failed-over-master"></a>
### Rebuild Failed Over Master { #rebuild-failed-over-master }

If recovery of a Failed Over Primary fails, you can use rebuild to enable high availability again. Unlike recovery, rebuilding removes all of the Failed Over Primary's database and rebuilds it based on the promoted Primary's database. To rebuild a Failed Over Primary, you need a backup file and an archived write-ahead transaction log from one of the DB instances in the replication group. If you do not have a backup file, select the DB instance to perform the backup in the following order

❶ Read Replicas with automatic backups enabled
❷ Primaries with automatic backups enabled

If no DB instance meets the criteria, the request to rebuild the Failed Over Primary fails.

> [Caution]
> The time to rebuild a Failed Over Primary may increase proportionally to the size of the database on the Primary.
> For DB instances that are backed up, there might be a drop in storage I/O performance during the rebuilding of the Failed Over Primary.

To rebuild the Failed Over Primary in the console

![db-instance-ha-failover-rebuild](../static/images/20260609/db-instance-ha-failover-rebuild-en.png)

❶ Select the Failed Over Primary that you want to rebuild, and then click the **Rebuild Failed Over Master** menu from the drop-down menu.

<a id="separate-failed-over-master"></a>
### Separate Failed Over Master { #separate-failed-over-master }

If recovery of the Failed Over Primary fails and data correction is needed, you can detach the Failed Over Primary to disable the high availability feature. The replication relationship between the detached Primary and the promoted Primary is severed, and each operates as a regular DB instance. After detachment, the original configuration cannot be recovered.

To detach a Failed Over Primary, use the

![db-instance-ha-failover-split](../static/images/20260609/db-instance-ha-failover-split-en.png)

❶ Select the Failed Over Primary you want to detach, and then click the **Detach Failed Master** menu from the drop-down menu.

<a id="manual-failover"></a>
### Manual Failover { #manual-failover }

For highly available DB instances, when you perform an operation that involves a restart, you can choose whether to restart with failover or not, as shown below:

* Restart DB Instance
* Changes to items that require a restart
* Apply changes to parameters that require a restart
* Migrating DB instances for hypervisor checks

When you restart with failover, the Standby is restarted first. Failover then promotes the Standby to Primary, and the existing Primary acts as the Standby. Upon promotion, the internal virtual IP for connectivity changes from the Primary to the Standby, so no changes to the application are required. The promoted Primary inherits all automatic backups from the old Primary.

> [Note]
> Since the high availability feature is based on domains, if the network environment is such that the client attempting to connect cannot reach the DNS server, the DB instance cannot be accessed through the domain, and normal access is not possible in the event of a failover.

> [Caution]
> If the replication delay value of the Standby and the Read Replicas included in the replication group is 1 or more, replication delay is considered to have occurred, and manual failover fails. We recommend that you perform manual failover during off-peak hours. Restart failures due to replication delay can be checked through the Events screen.

When restarting with failover, you can select the following additional items to increase reliability.

<a id="manual-failover-start-backup-at-the-current-time"></a>
#### Start backup at the current time

You can proceed with a manual backup immediately after the restart with failover is complete.

<a id="manual-failover-manual-control-of-failover"></a>
#### Manual Control of Failover

You can either apply the changes to the Standby first and observe how they evolve, or you can control the timing of the failover directly from the console if you want to execute the failover at a precise time. If you choose to manually control failover, a **Failover** button appears in the console ❶ after the Standby restarts. Clicking this button triggers a failover, which can wait up to five days to execute. If you do not run the failover within 5 days, the action is automatically canceled.

![db-instance-ha-wait-manual-failover](../static/images/20260609/db-instance-ha-wait-manual-failover-en.png)

> [Caution]
> There is no automatic failover while waiting for failover.

<a id="manual-failover-waiting-for-replication-delays-to-resolve"></a>
#### Waiting for replication delays to resolve

Enabling the Wait for replication latency to clear option allows you to wait for replication latency to clear for the Standby and the Read Replica included in the replication group.

<a id="manual-failover-write-load-blocking"></a>
#### Write load blocking

You can additionally block write loads while resolving replication delays. Blocking the write load puts the Primary into read-only mode just before failover, setting all change queries to fail.

<a id="high-availability-suspended"></a>
### High availability suspended { #high-availability-suspended }

You can temporarily pause a high availability feature in situations where you anticipate connection disruptions or large loads due to temporary operations. When a high-availability feature is paused, it does not detect a failure and therefore does not perform failover. Performing an operation that requires a restart while a high-availability feature is paused does not resume the paused high-availability feature. Because data replication occurs normally when a high-availability feature is paused, or because a failure is not detected, it is not recommended to leave it paused for extended periods of time.

<a id="rebuild-candidate-master"></a>
### Rebuild Standby { #rebuild-candidate-master }

Replication on a Standby can be interrupted for various reasons, such as a network disconnection or the initiation of replication from another Primary. A Standby with a replication interruption does not perform automatic failover. To resolve a replication interruption on a Standby, you must rebuild the Standby. Rebuilding a Standby removes all data from the Standby and rebuilds it from the Primary's database. During this process, if the backup files required for the rebuild do not exist in the Primary database, a backup of the Primary is performed, which can cause performance degradation.

<a id="data-migration"></a>
## Data Migration { #data-migration }

* RDS can be exported to and imported from outside of NHN Cloud RDS using pg_dump.
* pg_dump utility is provided by default when you install PostgreSQL.

<a id="export-using-pgdump"></a>
### Export using pg_dump { #export-using-pgdump }

* Get NHN Cloud RDS instances prepared.
* Verify that the external instance where you want to store the data to export, or the computer on which the local client is installed has sufficient capacity.
* If you need to export data to the outside of NHN Cloud, create a floating IP and connect it to the RDS instance where you want to export the data.
* Export data to the outside via the pg_dump command below:

<a id="export-using-pgdump-export-in-files"></a>
#### Export in Files

```
pg_dump -h {DB instance external domain address} -U {DB instance user ID} -p {DB instance connection port} -d {Database name to export} -f {file path to save locally}
```

<a id="export-to-external-postgresql"></a>
#### Export to PostgreSQL database outside NHN Cloud RDS

```
pg_dump -h {DB instance external domain address} -U {DB instance user ID} -p {DB instance connection port} -d {database name to export} | psql -h {external PostgreSQL connection address} -U {external PostgreSQL user ID} -p {external PostgreSQL connection port} -d {external PostgreSQL database name}
```
<a id="import-with-pgdump"></a>
### Import with pg_dump { #import-with-pgdump }

1. Create a DB instance to import data from, selecting **Use Floating IP**.

2. Ensure that the DB instance you are importing has enough capacity.

3. On the **Database & User** tab, pre-create the required databases.

4. Execute the command below to get data from an external source.

```
pg_dump -h {external PostgreSQL connection address} -U {external PostgreSQL user ID} -p {external PostgreSQL connection port} -d {external PostgreSQL database name} | psql -h {DB instance external domain address} -U {DB instance user ID} -p {DB instance connection port} -d {DB instance database name}
```

<a id="appendix"></a>
## Appendix { #appendix }

<!-- TODO: translate body -->

<a id="appendix-1"></a>
### Appendix 1. Guide for DB instance Migration for Hypervisor Maintenance { #appendix-1 }

NHN Cloud periodically updates the hypervisor software of the DB instance to improve security and stability.
DB instances running on a hypervisor that requires maintenance must be migrated to the hypervisor where maintenance has been completed.

You can start DB instance migration from the NHN Cloud console.
Depending on the database configuration, if you select a specific DB instance for migration and a related DB instance (e.g., a Read Replica instance) is also a maintenance target, both are migrated together.
Follow the guide below to use the migration feature in the console.
Go to the project where the DB instance requiring maintenance is located.

<a id="appendix-1-1"></a>
#### 1. Check the DB Instance for Maintenance

Those with **Migration** button next to name are the maintenance targets.

![db-instance-planned-migration](../static/images/20260609/db-instance-planned-migration-en.png)

You can check the detailed schedule of maintenance by putting the mouse pointer over **Migration** button.

![db-instance-planned-migration-popup](../static/images/20260609/db-instance-planned-migration-popup-en.png)

<a id="appendix-1-2"></a>
#### 2. Stop Applications Connected to the DB Instance that Requires Maintenance

Take appropriate measures to limit the impact on services connected to the DB.
If impact on service is inevitable, contact NHN Cloud Customer Support for guidance on appropriate measures.

<a id="appendix-1-3"></a>
#### 3. Apply Migration of the DB Instance That Requires Maintenance

Select the DB instance to be checked, click **Migration** button and when a window appears asking for confirmation of the DB instance migration, click **OK** button.

![db-instance-planned-migration-confirm](../static/images/20260609/db-instance-planned-migration-confirm-en.png)

<a id="appendix-1-4"></a>
#### 4. Wait for DB Instance Migration to Finish

If the DB instance status does not change, refresh the page.
While the DB instance is being migrated, no operations are permitted.
If the DB instance migration does not complete successfully, the issue is automatically reported to an administrator, and NHN Cloud will contact you separately.
