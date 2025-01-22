## Database > RDS for PostgreSQL > Backup and Restore

## Backup

You can prepare a database of DB instances to restore in case of a failure. You can perform backups from the console whenever needed or you can set to perform periodical backup. During the backup, the storage performance of that DB instance might degrade. It is recommended to back up during off-peak hours to avoid impacting your services.

RDS for PostgreSQL uses the pg_basebackup tool to back up databases. To restore to a backup of an external PostgreSQL or to a backup of RDS for PostgreSQL, you must use the same version of pg_basebackup used by RDS for PostgreSQL. pg_basebackup version according to the DB engine version is as follows.

| PostgreSQL version | pg_basebackup version |
|--------------------|-----------------------|
| 14.6               | 14.6                  |

* For more information about installing pg_basebackup, refer to the PostgreSQL website.
  * https://www.postgresql.org/docs/14/app-pgbasebackup.html

The following settings are applied to backup and it applies to both auto and manual backups.

![backup-config](https://static.toastoven.net/prod_rds_postgres/20241210/backup-config-en.png)

### Manual Backup

If you want to permanently store a database at a specific point in time, you can perform a backup manually from the console. Unlike auto backups, manual backups are not deleted when a DB instance is deleted unless you explicitly delete the backup. To perform a manual backup from the console

![db-instance-detail-backup](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-detail-backup-en.png)

❶ After selecting the DB instance to back up, click **Backup**, and **Create Backup** and the pop-up window appears.
    - If you click **Backup** without selecting DB instance, you can select DB instance from the drop-down menu within the **Create Backup** pop-up window.
❷ Enter a name of the backup. There are the following restrictions.

* Backup name has to be unique for each region.
* Backup names are alphabetic, numeric and - _ between 1 and 100 Only and the first character has to be an alphabet letter.

Or, on the **Backup** tab,

![backup-create](https://static.toastoven.net/prod_rds_postgres/20241210/backup-create-en.png)

❶ Click **+ Create Backup** and the **Create Backup** pop-up window will appear.
❷ Select the DB instance on which to perform the backup.
❸ You can enter a name for the backup and click **Create** to request backup creation.

### Auto Backup

Even when performing manual backups, auto backups can be performed if necessary for restore jobs or depending on the auto backup schedule. If you set the backup retention period for DB instance to 1 day or longer, auto backups are activated, and backups are performed at the specified time. auto backups have the same life cycle as DB instances. When a DB instance is deleted, all archived auto backups are deleted. The settings that Auto Backup supports are as follows.

![backup-config](https://static.toastoven.net/prod_rds_postgres/20240611/backup-config-en.png)

**Backup Retention Period**

* Set how long the backup is stored in storage. It can be archived for up to 730 days, and if the backup retention period changes, auto backup files that are out of retention period are immediately deleted.

**Backup Retry Count**

* You can set it to retry if an auto backup fails for DML query load or for a variety of reasons. You can retry up to 10 times. If the number of retries remains, you may not want to retry depending on the setting of the auto backup run time.

**Backup Execution Time**

* You can set the point of time the backup runs automatically. It consists of backup start time and backup window. Backup execution times can be set multiple times without overlapping. Perform backup at some point in the backup window based on the backup start time. The backup window is not related to the total running time of the backup. The time it takes to back up is proportional to the size of the database and depends on the service load. If the backup fails, if it does not exceed the backup window, try the backup again based on the number of backup retries.

Auto backup name is given in the format of `{DB instance name} yyyy-MM-dd-HH-mm`.

> [Caution]
> Backups may not be performed in situations such as previous backups not ending.

### Backup Storage and Pricing

All backup files are uploaded to the internal backup storage and saved. For manual backups, they are permanently stored until they are deleted separately and backup storage charges are incurred depending on the backup capacity. Auto backups are stored for the retention period you set, and you are charged for the portion of the total size of the auto backup file that exceeds the storage size of your DB instance. You cannot directly access the internal backup storage where the backup files are stored.

### Export Backup

#### Export Files While Executing Backup

After backing up, you can export the backup file to user object storage.

![db-instance-list-export-obs-ko](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-list-export-obs-ko.png)

![db-instance-list-export-obs-modal-ko](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-list-export-obs-ko.png)

❶ After selecting the DB instance to backup, click **Export Backup File to Object Storage After Backup** from the drop-down menu, and a settings pop-up screen will appear.
❷ Enter the tenant ID of the object storage where the backup will be stored. The tenant ID can be found in the API endpoint settings.
❸ Enter the NHN Cloud account or IAM account of the object storage where the backup will be saved.
❹ Enter the API password for the object storage where the backup will be stored.
❺ Enter the container in object storage where the backup will be stored.
❻ Enter the path to the backup that will be stored in the container. The folder name can be up to 255 bytes, and the full path can be up to 1024 bytes. You cannot use certain forms (. or ..), and you cannot enter special characters (' " < > ;) and spaces.

#### Export Backup Files

You can export backup files stored in internal backup storage to user object storage.

![db-instance-detail-backup-export-ko](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-detail-backup-export-ko.png)

❶ On the Details tab of the source DB instance from which the backup was taken, select the backup file to export and click **Export Backup to Object Storage**, and a pop-up screen will appear to export the backup.

![backup-export-ko](https://static.toastoven.net/prod_rds_postgres/20241210/backup-export-ko.png)

❷ Alternatively, on the **Backup** tab, select the backup file you want to export and click **Export Backup to Object Storage**.

> [Note]
> For manual backup, you cannot export a backup if the original DB instance from which the backup was taken has been deleted.


## Restore

You can use backup to restore data to any point in time. Restoration always creates a new DB instance and restoration cannot be performed on an existing DB instance. You can only restore to the same DB engine version as the original DB instance from which you performed the backup. It supports backup restore, which restores to the point in time when the backup was created, and Point-in-Time Restore, which restores to a specific point in time that you want.

> [Caution]
> The restoration might fail if the data storage size of the DB instance you want to restore is smaller than that of the original DB instance from which you performed the backup or if you use a parameter group different from the parameter group of the original DB instance.

### Backup Restore

You do not need the original DB instance that performed the backup by restoring only the backup file. To restore a backup from the console

![db-instance-detail-backup-restore](https://static.toastoven.net/prod_rds_postgres/20241210/db-instance-detail-backup-restore-en.png)

❶ Select the backup file you want to restore on the details tab of the dB instance, and then click **Backup Restore** to go to the Restore DB instance screen.

Or

![backup-restore](https://static.toastoven.net/prod_rds_postgres/20241210/backup-restore-en.png)

❶ On the Backup tab, select the backup file you want to restore and then click **Backup Restore**.

### Point-in-time Restore

You can use point-in-time restoration to restore to a specific point-in-time or specific LSN in the WAL log. To restore a point in time, you need a backup file and a WAL log from the time you performed the backup to the time you want to restore it. WAL logs are stored in the storage of the original DB instance where the backup takes place. Short WAL log retention periods allow more storage capacity, but recovery to the desired point in time can be challenging. For the case listed below, you might not be able to restore to the desired point in time because you do not have the WAL log required for point in time restoration.

* If you delete the WAL log of the original DB instance for capacity
* WAL logs are automatically deleted by PostgreSQL depending on the WAL log retention period (up to 7 days)
* WAL logs are corrupted or deleted for a variety of other reasons

To restore a point in time from the console

![db-instance-pitr](https://static.toastoven.net/prod_rds_postgres/20240813/db-instance-pitr-en.png)

❶ Select the DB instance you want to restore to a point in time and click **Point In Time Restore** to go to the page where you can set up a point in time restore.

#### Restore with Timestamp

When restoring with Timestamp, perform the restore based on the backup file closest to the selected time point and apply the WAL log to the desired time point.

![db-instance-pitr-01](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-pitr-01-en.png)

❶ Select a restore method.

![db-instance-pitr-02](https://static.toastoven.net/prod_rds_postgres/20240611/db-instance-pitr-02-en.png)

❷ Select a time to restore. You can restore it to the most recent point in time, or enter the specific point in time that you want.


### Restore using Backup in Object Storage

You can create a DB instance using a backup file exported from RDS for PostgreSQL to object storage.

(1) See [Export Backup File](backup-and-restore/#_5) to export a backup of RDS for PostgreSQL to object storage.

(2) Access the console of the project you want to restore, and on the DB Instances tab, click the Restore from backup in Object Storage button.

![backup-obs-restore](https://static.toastoven.net/prod_rds_postgres/20241210/backup-obs-restore-ko.png)

❶ Enter the tenant ID of the object storage where the backup is stored. You can find the tenant ID in the API endpoint settings.
❷ Enter the NHN Cloud account or IAM account of the object storage where the backup is stored.
❸ Enter the API password for the object storage where the backup is stored.
❹ Enter the container in object storage where the backup is stored.
❺ Enter the path to the backup that will be stored in the container. The folder name can be up to 255 bytes, and the full path can be up to 1024 bytes. You cannot use certain forms (. or ..), and you cannot enter special characters (' " < > ;) and spaces.
❻ Refer to the [Create DB instance](db-instance/#db_1) section to enter the remaining settings and click the **Restore to Backup in Object Storage** button.