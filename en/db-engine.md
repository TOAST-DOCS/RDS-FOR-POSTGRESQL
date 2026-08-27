<!-- machine_translated: true -->

<!-- pre-align:aligned sig=56dd0b1a76a6 -->

<a id="database-rds-for-postgresql-db-engine"></a>
## Database > RDS for PostgreSQL > DB Engine { #database-rds-for-postgresql-db-engine }

<a id="db-engine"></a>
## DB Engine { #db-engine }
In PostgreSQL, the version number consists of version = `X.Y`. In NHN Cloud's RDS for PostgreSQL, `X` represents the major version, and `Y` represents the minor version.

<a id="db-engine-version-provided-by-rds"></a>
### DB Engine Version Provided by RDS { #db-engine-version-provided-by-rds }

You can use the following versions.

| Version              | Note                            |
|---------------------|-------------------------------|
| <strong>17</strong> |                               |
| PostgreSQL 17.10    |                               |
| PostgreSQL 17.6     |                               |
| PostgreSQL 17.4     |                               |
| PostgreSQL 17.2     | Creation and Read Replicas unsupported |
| <strong>14</strong> |                               |
| PostgreSQL 14.23    |                               |
| PostgreSQL 14.19    |                               |
| PostgreSQL 14.17    |                               |
| PostgreSQL 14.15    | Creation and Read Replicas unsupported. |
| PostgreSQL 14.6     | Creation and read replicas unsupported |

!!! danger "Caution"
    We [recommend](https://www.postgresql.org/support/security/CVE-2025-1094/) that you upgrade PostgreSQL versions 14.6, 14.15, and 17.2 to the latest version.

<a id="perform-version-upgrades"></a>
### Perform Version Upgrades { #perform-version-upgrades }

Version upgrades proceed in sequence, and may proceed in a different order depending on the characteristics of each major version upgrade and minor version upgrade. 

Version upgrades proceed in sequence, and may proceed in a different order depending on the characteristics of each major version upgrade and minor version upgrade. 

It is recommended to perform a backup to prevent data loss before the version upgrade proceeds.

<a id="perform-version-upgrades-major-version-upgrade"></a>
#### Major Version Upgrade

A major version upgrade means changing the first place of the version number. For example, upgrading from 14.6 to 17.2 is a major version upgrade. 

In RDS for PostgreSQL, the major version upgrade can only be executed on the Primary, and if executed, the version upgrade is carried out for all the DB instances within the DB instance group.

<a id="perform-version-upgrades-major-version-upgrade-order"></a>
#### Major Version Upgrade Order

You can perform a major version upgrade by modifying the Primary DB instance. The order of execution is as follows.

- Conduct the version upgrade pre-check on the Primary DB instance.
    - If the pre-check results are not problematic, proceed to upgrade the version.
    - The pre-check results are provided in the form of log files and can be checked via the `pg_upgrade.log` file in the **Log** tab of the DB instance details.
- If the Primary exists alone within the DB instance group, the version upgrade for the Primary DB instance proceeds.
    - Downtime occurs during the version upgrade.
    - If the version upgrade fails, a repair operation may be attempted, and if successful, the DB instance is restored to its pre-upgrade state.
    - If the repair operation also fails, you can attempt to recover through a rebuild.
- Proceed by selecting one of the DB instances (including Standby) in non-Primary replication relationships.
    - Upgrade the version of the selected DB instance.
        - If a Standby exists, the version upgrade is performed on it before Read Replicas.
        - If the version upgrade fails, the version upgrade will not proceed for other DB instances, and you can attempt to recover the failed DB instance with a rebuild operation.
    - Change the type to Primary for the upgraded DB instance, and upgrade the remaining DB instances in the group and reset the replication relationships.
        - The connection address does not change, so you can connect using the existing connection address.
        - Downtime occurs on Read Replicas during the version upgrade.
        - If the version upgrade fails, the replication will remain discontinued, and you can attempt repairs through a rebuild operation.

!!! danger "Caution"
    During the step of upgrading DB instances in a non-Primary replication relationship, write traffic to the Primary is blocked, and only read traffic can be processed.
    DB instances that have successfully upgraded their version within a DB instance group can coexist with DB instances that have failed. In the case of a failed DB instance, the replication relationship is broken, and you can attempt to recover by running a rebuild operation.

<a id="perform-version-upgrades-miner-version-upgrade"></a>
#### Miner Version Upgrade

A minor version upgrade means changing the second place of the version number. For example, upgrading from 14.6 to 14.15 is a minor version upgrade.

In RDS for PostgreSQL, minor version upgrades can be performed on Read Replicas as well as Primaries, and if performed, the version of the target DB instance will be upgraded. For Primaries with high availability configured, the Standby is also upgraded together.

<a id="perform-version-upgrades-minor-version-upgrade-order"></a>
#### Minor Version Upgrade Order

- When attempting a version upgrade for Primary, if Standby exists, the version is upgraded together.
    - If the version upgrade proceeds for Primary alone, downtime occurs.
    - If the version upgrade proceeds with Standby, the process will be accompanied by a restart using failover, which may result in a brief interruption.
- When upgrading the version of a Read Replica, the version is upgraded for that DB instance alone.
    - Downtime occurs during the version upgrade.
    - If it fails, a repair operation may be attempted, and if the repair is successful, the DB instance reverts to its state before the version upgrade.
    - If the repair operation also fails, you can attempt to recover by rebuilding.
