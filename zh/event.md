## Database > RDS for PostgreSQL > Event

## Event

Event refers to RDS for PostgreSQL or a significant event that is caused by a user. Event consists of event category , the date and time of occurrence, the source and the message. Event can be viewed on the web console, and the category of events and possible events are as follows.

| Event Code                  | Event Category              | Description                  |
|-------------------------|---------------------|---------------------|
| BACKUP_01_00            | BACKUP              | Backup of DB instance started       |
| BACKUP_01_01            | BACKUP              | Backup of DB instance completed       |
| BACKUP_01_04            | BACKUP              | Backup of DB instance failed       |
| BACKUP_02_01            | BACKUP              | Backup deleted            |
| DB_INSTANCE_01_00       | DB_INSTANCE         | Creating DB instance started       |
| DB_INSTANCE_01_01       | DB_INSTANCE         | Creating DB instance completed       |
| DB_INSTANCE_01_04       | DB_INSTANCE         | Creating DB instance failed       |
| DB_INSTANCE_02_01       | DB_INSTANCE         | DB instance started          |
| DB_INSTANCE_03_00       | DB_INSTANCE         | DB instance force restart   |
| DB_INSTANCE_04_00       | DB_INSTANCE         | Stopping DB instance started       |
| DB_INSTANCE_04_01       | DB_INSTANCE         | Stopping DB instance completed       |
| DB_INSTANCE_04_04       | DB_INSTANCE         | Stopping DB instance failed       |
| DB_INSTANCE_05_01       | DB_INSTANCE         | DB instanced ended          |
| DB_INSTANCE_06_00       | DB_INSTANCE         | Deleting DB instance started       |
| DB_INSTANCE_06_01       | DB_INSTANCE         | Deleting DB instance completed       |
| DB_INSTANCE_06_04       | DB_INSTANCE         | Deleting DB instance failed       |
| DB_INSTANCE_07_00       | DB_INSTANCE         | Backup of DB instance started       |
| DB_INSTANCE_07_01       | DB_INSTANCE         | Backup of DB instance completed       |
| DB_INSTANCE_07_04       | DB_INSTANCE         | Backup of DB instance failed       |
| DB_INSTANCE_08_00       | DB_INSTANCE         | Restoring DB instance started       |
| DB_INSTANCE_08_01       | DB_INSTANCE         | Restoring DB instance completed       |
| DB_INSTANCE_08_04       | DB_INSTANCE         | Restoring DB instance failed       |
| DB_INSTANCE_09_00       | DB_INSTANCE         | Modifying detailed settings started         |
| DB_INSTANCE_09_01       | DB_INSTANCE         | Detailed settings modified         |
| DB_INSTANCE_09_04       | DB_INSTANCE         | Detailed settings modification failed         |
| DB_INSTANCE_10_01       | DB_INSTANCE         | Automated backup setting enabled        |
| DB_INSTANCE_11_01       | DB_INSTANCE         | Automated backup setting disabled       |
| DB_INSTANCE_12_00       | DB_INSTANCE         | Changing DB instance type started    |
| DB_INSTANCE_12_01       | DB_INSTANCE         | Changing DB instance type completed    |
| DB_INSTANCE_12_04       | DB_INSTANCE         | Changing DB instance type failed    |
| DB_INSTANCE_13_00       | DB_INSTANCE         | Storage expansion started       |
| DB_INSTANCE_13_01       | DB_INSTANCE         | Storage expanded       |
| DB_INSTANCE_13_04       | DB_INSTANCE         | Storage expansion failed       |
| DB_INSTANCE_14_01       | DB_INSTANCE         | Associate Floating IP           |
| DB_INSTANCE_15_01       | DB_INSTANCE         | Disconnected to floating IP        |
| DB_INSTANCE_16_01       | DB_INSTANCE         | DB instance storage secured       |
| DB_INSTANCE_16_04       | DB_INSTANCE         | Securing DB instance storage failed    |
| DB_INSTANCE_17_01       | DB_INSTANCE         | Create a user              |
| DB_INSTANCE_17_04       | DB_INSTANCE         | Creating user failed           |
| DB_INSTANCE_18_01       | DB_INSTANCE         | Changing user              |
| DB_INSTANCE_18_04       | DB_INSTANCE         | Changing user failed           |
| DB_INSTANCE_19_01       | DB_INSTANCE         | Deleting a user              |
| DB_INSTANCE_20_01       | DB_INSTANCE         | Create a database           |
| DB_INSTANCE_20_04       | DB_INSTANCE         | Creating database failed        |
| DB_INSTANCE_21_01       | DB_INSTANCE         | Changing database           |
| DB_INSTANCE_21_04       | DB_INSTANCE         | Changing database failed        |
| DB_INSTANCE_22_01       | DB_INSTANCE         | Deleting Database           |
| DB_INSTANCE_23_00       | DB_INSTANCE         | Changing parameter group started       |
| DB_INSTANCE_23_01       | DB_INSTANCE         | Changing parameter group completed       |
| DB_INSTANCE_23_04       | DB_INSTANCE         | Changing parameter group failed       |
| DB_INSTANCE_24_00       | DB_INSTANCE         | Applying parameter group changes started |
| DB_INSTANCE_24_01       | DB_INSTANCE         | Applying parameter group changes completed |
| DB_INSTANCE_24_04       | DB_INSTANCE         | Applying parameter group changes failed |
| DB_INSTANCE_25_00       | DB_INSTANCE         | Changing DB instance security group started |
| DB_INSTANCE_25_01       | DB_INSTANCE         | Changing DB instance security group completed |
| DB_INSTANCE_25_04       | DB_INSTANCE         | Changing DB instance security group failed |
| DB_INSTANCE_26_00       | DB_INSTANCE         | DB instance migration started   |
| DB_INSTANCE_26_01       | DB_INSTANCE         | DB instance migration completed   |
| DB_INSTANCE_26_04       | DB_INSTANCE         | DB instance migration failed   |
| DB_INSTANCE_27_00       | DB_INSTANCE         | Changing access control setting started       |
| DB_INSTANCE_27_01       | DB_INSTANCE         | Changing access control setting completed      |
| DB_INSTANCE_27_04       | DB_INSTANCE         | Changing access control setting failed      |
| DB_INSTANCE_28_01       | DB_INSTANCE         | DB instance normalized         |
| DB_INSTANCE_29_01       | DB_INSTANCE         | Not enough DB instance storage       |
| DB_INSTANCE_30_01       | DB_INSTANCE         | Connecting DB instance failed       |
| DB_SECURITY_GROUP_01_01 | DB_SECURITY_GROUP   | DB security group created         |
| DB_SECURITY_GROUP_02_00 | DB_SECURITY_GROUP   | Changing DB security group started      |
| DB_SECURITY_GROUP_02_01 | DB_SECURITY_GROUP   | Changing DB security group completed      |
| DB_SECURITY_GROUP_02_04 | DB_SECURITY_GROUP   | Changing DB security group failed      |
| DB_SECURITY_GROUP_03_01 | DB_SECURITY_GROUP   | DB security group deleted         |
| TENANT_01_04            | TENANT              | CPU cores limit         |
| TENANT_02_04            | TENANT              | RAM capacity limit	          |
| TENANT_03_04            | TENANT              | Individual volume limit         |
| TENANT_04_04            | TENANT              | Total project volume limit    |
| JOB_01_04               | JOB                 | Job execution failed           |
