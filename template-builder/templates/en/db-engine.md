## Database > RDS for PostgreSQL > DB Engine

## DB Engine
In PostgreSQL, the version number consists of version = `X.Y`. In NHN Cloud's RDS for PostgreSQL, `X` represents the major version, and `Y` represents the minor version.


### DB Engine Version Provided by RDS

The versions specified below are available.

| Version          | Creation Limit | Remarks |
|------------------|----------------|---------|
| PostgreSQL 14.6  | O              |         |
| PostgreSQL 14.15 | O              |         |
| PostgreSQL 14.17 |                |         |
| PostgreSQL 14.19 |                |         |
| PostgreSQL 17.2  | O              |         |
| PostgreSQL 17.4  |                |         |
| PostgreSQL 17.6  |                |         |

- [Note] For PostgreSQL version 14.6, 14.15, 17.2, upgrades to the latest version are [recommended](https://www.postgresql.org/support/security/CVE-2025-1094/).
    
    
### Perform Version Upgrades

Version upgrades proceed in sequence, and may proceed in a different order depending on the characteristics of each major version upgrade and minor version upgrade. 

Version upgrades proceed in sequence, and may proceed in a different order depending on the characteristics of each major version upgrade and minor version upgrade. 

It is recommended to perform a backup to prevent data loss before the version upgrade proceeds.

#### Major Version Upgrade

A major version upgrade means changing the first place of the version number. For example, upgrading from 14.6 to 17.2 is a major version upgrade. 

In RDS for PostgreSQL, the major version upgrade can only be executed on the master, and if executed, the version upgrade is carried out for all the DB instances within the DB instance group.

#### Major Version Upgrade Order

You can proceed to upgrade the major version through master DB instance modifications. The order of execution is as follows.

- Conduct the version upgrade pre-check on the Master DB instance. 
    - If the pre-check results are not problematic, proceed to upgrade the version.
    - The pre-check results are provided in the form of log files and can be checked via the `pg_upgrade.log` file in the log tab of the DB instance details.    
- If the master exists alone within the DB instance group, the version upgrade for the master DB instance proceeds.
    - Downtime exists during the version upgrade.
    - Repair operation may proceed if the version upgrade fails, and if successful, DB instances will be recovered to a pre-version status.
    - If the repair operation fails after a failed version upgrade, you can attempt to recover by rebuilding.
- Proceed by selecting one of the DB instances (including candidate master) in non-master replication relationship.
    - Proceed the version upgrade for selected DB instances.
        - If you have a candidate master, proceed with the version upgrade by prioritizing the read replica.
        - If the version upgrade fails, the version upgrade will not proceed for other DB instances, and you can attempt to recover them with a rebuild operation.
        - [Note] At this stage, **write loads** to the master are blocked and only read loads can be processed.
    - Change the type to master for the upgraded DB instances, and reset the upgrade progress and replication relationship for the remaining DB instances in the group.
        - The access address is unchanged and can be accessed via the existing access address.
        - Downtime exists for the read copy during the version upgrade.
        - If the version upgrade fails, the replication will remain discontinued, and you can attempt repairs through a rebuild operation.
- [Caution ] DB instances that have successfully upgraded their version within a DB instance group can coexist with DB instances that have failed. In the case of a failed DB instance, the replication relationship is broken, and you can attempt to recover by running a rebuild operation.



### Miner Version Upgrade

A minor version upgrade means changing the second place of the version number. For example, upgrading from 14.6 to 14.15 is a minor version upgrade.

In RDS for PostgreSQL, minor version upgrades can be performed on slaves as well as masters, and if performed, the version upgrade will be performed on the target DB instance. (For high availability masters, version upgrade will also proceed for the candidate master.)

#### Minor Version Upgrade Order

- If you're trying to upgrade a version for a master, if there's a candidate master, you go through the version upgrade together. 
    - Downtime exists when version upgrades are performed solely as a master.
    - If version upgrades are being performed with a candidate master, the process will be accompanied by a restart using troubleshooting, which may result in failure.
- If you are conducting a version upgrade for a read replica, then the version upgrade is performed with that DB instance alone.
    - Downtime exists during the version upgrade.
    - Repair operation may proceed if the version upgrade fails, and if successful, DB instances will be recovered to a pre-version status.
    - If the repair operation fails after a failed version upgrade, you can attempt to recover by rebuilding.
