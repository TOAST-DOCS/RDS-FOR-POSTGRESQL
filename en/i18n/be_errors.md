<!-- machine_translated: true -->

<!-- pre-align:aligned sig=da39a3ee5e6b -->

---
categories: [RDS_POSTGRES_ALPHA, RDS_POSTGRES_BETA, RDS_POSTGRES]
---
- messageId: pg.error.3402
  messageType: ERROR
  text: "The selected availability zone is unavailable. Check the available availability zones and try again."

- messageId: pg.error.3403
  messageType: ERROR
  text: "The selected subnet cannot be found. Check the subnets in your VPC and try again."

- messageId: pg.error.11006
  messageType: ERROR
  text: "Incremental backup can't be performed based on the selected backup."

- messageId: pg.error.11007
  messageType: ERROR
  text: "Incremental backup can't be performed based on the selected backup. The maximum number of incremental backups (13) that can be performed based on one full backup has been exceeded."

- messageId: pg.error.11009
  messageType: ERROR
  text: "Incremental backup can't be performed based on the selected backup. The DB engine version has been upgraded since the selected backup was created."

- messageId: pg.error.11011
  messageType: ERROR
  text: "Incremental backup can't be performed based on the selected backup. An incremental backup created following the selected backup already exists."

- messageId: pg.error.11012
  messageType: ERROR
  text: "Incremental backup can't be performed based on the selected backup. A failover was performed after the selected backup was created."

- messageId: pg.error.11013
  messageType: ERROR
  text: "Incremental backup can't be performed based on the selected backup. Incremental backup is supported only on PostgreSQL Version 17 or later."

- messageId: pg.error.11014
  messageType: ERROR
  text: "Incremental backup can't be performed based on the selected backup. The summarize_wal parameter of the DB instance is disabled, or it was enabled after the selected backup was created."

- messageId: pg.error.11017
  messageType: ERROR
  text: "A backup with another task in progress cannot be deleted. Try again after the task is completed."

- messageId: pg.error.11018
  messageType: ERROR
  text: "Incremental backup can't be performed based on the selected backup. Changes made after the selected backup have not been reflected yet. Try again later."