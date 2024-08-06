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

The type of DB instance that you have already created can be easily changed through console.

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
* 읽기 복제본 생성
* 읽기 복제본 재구축
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

You can set up a database of DB instances to periodically back up, or you can create backups at any time with console. During the backup, the performance might degrade. We recommended that you back up at a time when the service load is not high so as not to affect the service. 백업으로 인한 성능 저하를 원치 않으면 읽기 복제본에서 백업을 수행할 수 있습니다. Backup files are stored in internal backup storage and are charged based on backup capacity. We recommend that you enable periodic backups to prepare for unexpected failures. For a detailed description of backups, see [Backup and Restore](backup-and-restore/).

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

![db-instance-list](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-list-en.png)

❶ Change the DB instance screen mode.
❷ 자물쇠 아이콘을 클릭해 삭제 보호 설정을 변경할 수 있습니다.
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
| REPLICATION_DELAY | 복제 지연           |
| REPLICATION_STOP  | 복제 중단           |
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

❶ If you select the user you want to delete and click on **Delete**, Delete confirmation pop-up window appears.
❷ Deleted rules must apply access control settings to DB instances by clicking on **Apply Changes**.

## Modify DB Instance

You can easily change various items in DB instance created through console. The change items you request are applied to DB instances sequentially. If a restart is required during the application process, apply all changes and restart the DB instance. Items that cannot be changed and that require a restart are as follows.

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

You can delete DB instances that are no longer in use. 마스터를 삭제하면 해당 복제 그룹에 속한 읽기 복제본도 함께 삭제됩니다. 삭제된 DB 인스턴스는 복구할 수 없으므로 중요한 DB 인스턴스는 삭제 보호 설정을 활성화하는 것을 권장합니다.

## Backup

You can prepare a database of DB instances to recover in case of a failure. You can perform backups from the console whenever you need to or you can set to perform periodical back up. See [Backup](backup-and-restore/#_1) for more information.

## Restoration

You can use backup to restore data to any point in time. Restore always creates a new DB instance and cannot be restored to an existing DB instance. See [Backup](backup-and-restore/#_6) for more information.

## Secure Capacity

If WAL logs are excessively generated due to rapid load and the data storage is low in capacity, you can delete the WAL logs using the capacity acquisition feature of console. When you select Free Capacity from console, a pop-up window displays to select WAL log for the DB instance. Select the WAL log and click **Confirm** to delete all WAL logs created before the selected item. The capacity acquisition feature is a function of temporarily securing capacity. If you continue to run out of capacity, you must scale up your data storage to meet the service load.

> [Caution]
> Depending on the deleted WAL log, it may not be restored to a certain point in time.

## Apply Parameter Group Changes

Even though the settings of the parameter groups connected to the DB instance changed, it does not automatically apply to the DB instance. If the parameters applied to DB instance and the settings of the connected parameter group are different, **Parameter** button is displayed in the console.

You can apply changes to a parameter group to a DB instance using one of the following methods.

![db-instance-list-apply-parameter-group](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-list-apply-parameter-group-en.png)

❶ Click **Parameter** for destination DB instance, or
❷ Select a destination DB instance and click on **Apply Parameter Group Changes** menu from the drop-down menu.

If the parameters that require restart in the parameter group are changed, such DB instance is restarted in the process of applying the changes.

![db-instance-list-apply-parameter-group-popup](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-apply-parameter-group-popup-ko.png)

❶ **변경 사항 비교**를 클릭해 변경된 파라미터를 확인할 수 있습니다.
❷ 변경 사항 확인 후 **확인**을 클릭해 DB 인스턴스에 변경된 파라미터를 적용합니다.

![db-instance-list-apply-parameter-group-compare-popup](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-apply-parameter-group-compare-popup-ko.png)

## 읽기 복제본

읽기 성능을 높이기 위해서 읽기 전용으로 사용할 수 있는 읽기 복제본을 생성할 수 있습니다. 읽기 복제본은 하나의 마스터에 대해서 최대 5대까지 생성할 수 있습니다. 읽기 복제본의 읽기 복제본은 생성할 수 없습니다.

### 읽기 복제본 생성

읽기 복제본을 생성하려면 복제 그룹에 속한 DB 인스턴스에서 생성된 백업 파일이 필요합니다. 백업 파일이 없는 경우 다음 순서에 따라 백업을 수행할 DB 인스턴스를 선택합니다.

❶ 자동 백업 설정한 읽기 복제본
❷ 자동 백업 설정한 마스터

조건에 맞는 DB 인스턴스가 없을 경우 읽기 복제본 생성 요청은 실패합니다.

> [주의]
> 마스터의 데이터베이스 크기에 비례하여 읽기 복제본 생성 시간이 늘어날 수 있습니다.
> 백업이 수행되는 DB 인스턴스의 경우 읽기 복제본 생성 과정에서 스토리지 I/O 성능 하락이 있을 수 있습니다.

> [참고]
> 읽기 복제본 생성 과정에 필요한 데이터 스토리지 크기만큼 백업 스토리지 과금이 발생할 수 있습니다.

읽기 복제본을 생성하려면 콘솔에서

![db-instance-replica-create-ko](https://static.toastoven.net/prod_rds_postgres/240813/db-instance-list-replica-create-ko.png)

❶ 원본 DB 인스턴스를 선택한 뒤 **읽기 복제본 생성**을 클릭하면 읽기 복제본을 생성하기 위한 페이지로 이동합니다.

아래 설정들을 통하여 읽기 복제본을 생성할 수 있습니다.

#### 변경 불가 항목

읽기 복제본을 생성할 때 아래 나열된 항목들은 원본 DB 인스턴스의 설정을 따르기 때문에 변경할 수 없습니다.

* DB 엔진
* 데이터 스토리지 종류
* 사용자 VPC 서브넷

#### 가용성 영역

읽기 복제본의 가용성 영역을 선택합니다. 자세한 설명은 [가용성 영역](#가용성-영역) 항목을 참고합니다.

#### DB 인스턴스 타입

읽기 복제본은 마스터와 동일한 사양 혹은 더 높은 사양으로 만드는 것을 권장합니다. 낮은 사양으로 생성 시 복제 지연이 발생할 수 있습니다.

#### 데이터 스토리지 크기

원본 DB 인스턴스와 동일한 크기로 만드는 것을 권장합니다. 크기를 작게 설정할 경우 데이터 스토리지 용량 부족으로 복제 과정이 중단될 수 있습니다.

#### 플로팅 IP

읽기 복제본의 플로팅 IP 사용 여부를 선택합니다. 자세한 설명은 [플로팅 IP](#플로팅-ip) 항목을 참고합니다.

#### 파라미터 그룹

읽기 복제본의 파라미터 그룹을 선택할 때 복제 관련 설정 변경이 필요 없다면 원본 DB 인스턴스와 동일한 파라미터 그룹을 선택하는 것을 권장합니다. 파라미터 그룹에 대한 자세한 설명은 [파라미터 그룹](parameter-group/) 항목을 참고합니다.

#### DB 보안 그룹

읽기 복제본에 적용할 DB 보안 그룹을 선택합니다. 복제에 필요한 규칙은 자동으로 적용되기 때문에 DB 보안 그룹에 별도로 추가할 필요가 없습니다. DB 보안 그룹에 대한 자세한 설명은 [DB 보안 그룹](db-security-group/) 항목을 참고합니다.

#### 백업

읽기 복제본의 백업 설정을 선택합니다. 백업에 대한 자세한 설명은 [백업 및 복원](backup-and-restore/) 항목을 참고합니다.

#### 기본 알림

기본 알림 사용 여부를 선택합니다. 자세한 설명은 [기본 알림](#기본-알림) 항목을 참고합니다.

#### 삭제 보호

삭제 보호 사용 여부를 선택합니다. 자세한 설명은 [삭제 보호](#삭제-보호-설정-변경) 항목을 참고합니다.

### 읽기 복제본 승격

마스터와의 복제 관계를 해제하고 읽기 복제본을 독립된 마스터로 전환하는 과정을 승격이라고 합니다. 승격된 마스터는 독립된 DB 인스턴스로서 작동하게 됩니다. 승격을 원하는 읽기 복제본과 마스터 사이에 복제 지연이 존재하는 경우 해당 지연이 해결될 때까지 승격이 이루어지지 않습니다. 한번 승격된 DB 인스턴스는 이전의 복제 관계로 되돌릴 수 없습니다.

> [주의]
> 마스터 DB 인스턴스의 상태가 비정상일 경우에는 승격 작업을 진행할 수 없습니다.

### 읽기 복제본 강제 승격

마스터의 상태와 관계없이 읽기 복제본의 현재 시점 데이터를 기반으로 강제 승격을 진행합니다. 복제 지연이 있는 경우 데이터 유실이 발생할 수 있습니다. 따라서 읽기 복제본을 긴급하게 서비스에 투입해야 하는 상황이 아니라면 이 기능의 사용은 권장하지 않습니다.

### 읽기 복제본의 복제 중단

읽기 복제본은 여러 이유로 복제가 중단될 수 있습니다. 읽기 복제본의 상태가 `복제 중단`인 경우 빠르게 원인을 확인하여 정상화해야 합니다. `복제 중단` 상태가 장시간 지속될 경우 복제 지연이 늘어나게 됩니다. 정상화에 필요한 WAL 로그가 없는 경우 읽기 복제본을 재구축해야 합니다.

### 읽기 복제본의 재구축

읽기 복제본의 복제 문제를 해결할 수 없는 경우 재구축을 통해 정상 상태로 복원할 수 있습니다. 이 과정에서 읽기 복제본의 모든 데이터베이스를 삭제하고, 마스터 데이터베이스를 기반으로 새롭게 재구축합니다. 재구축하는 동안 읽기 복제본은 사용할 수 없습니다. 읽기 복제본을 재구축하려면 복제 그룹에 속한 DB 인스턴스에서 생성된 백업 파일이 필요합니다. 백업 파일이 없는 경우 동작 및 주의 사항은 [읽기 복제본 생성](#읽기-복제본-생성) 항목을 참고합니다.

> [참고]
> 재구축 후에도 접속 정보(도메인, IP)는 변경되지 않습니다.

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

## 삭제 보호 설정 변경

삭제 보호를 활성화하면 실수로 DB 인스턴스가 삭제되지 않도록 보호할 수 있습니다. 삭제 보호를 비활성화할 때까지 해당 DB 인스턴스를 삭제할 수 없습니다. 삭제 보호 설정을 변경하려면

![db-instance-deletion-protection-ko](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-deletion-protection-ko.png)

❶ 삭제 보호 설정을 변경하려는 DB 인스턴스를 선택 후 드롭다운 메뉴에서 **삭제 보호 설정 변경** 메뉴를 클릭하면 팝업 창이 나타납니다.

![deletion-protection-popup-ko](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-list-deletion-protection-popup-ko.png)

❷ 삭제 보호 설정을 변경한 뒤 **확인**을 클릭합니다.

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
