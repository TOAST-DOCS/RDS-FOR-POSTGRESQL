<!-- pre-align:aligned sig=6fb22cdc634d -->

<a id="database-rds-for-postgresql-notification"></a>
## Database > RDS for PostgreSQL > Notification { #database-rds-for-postgresql-notification }

<a id="user-group"></a>
## User Group { #user-group }

You can manage users who receive notifications as groups. Notification target must be registered as a project member. If a user in a user group is removed as a project member, they won't receive notifications, even if they belong to the user group.

> [Caution]
> If you don't have mobile phone information because you haven't completed identity verification, you can't receive SMS notifications.

<a id="create-a-user-group"></a>
### Create a User Group { #create-a-user-group }

![user-group-create](../static/images/20240813/user-group-create-en.png)

❶ When you click **+ Create User Group**, a pop-up window to create a user group appears.
❷ Enter a user group name.

User group names have the following restrictions.

* You can only use letters, numbers, and some symbols (-, _, .) between 1 and 100 characters, and the first character can only be an alphabet.

❸ Select a notification method.

* If you select as an entire project member, send a notification to the entire project member at that time when you send a notification.

![user-group-custom](../static/images/20240813/user-group-custom-en.png)

❹ Click **+ Add** to display a pop-up window where you can add project members to notify.
❺ You can select a notification target to delete and click **Delete** to exclude it from the notification target.
❻ Click **Confirm** to add a user group.

<a id="notification-group"></a>
## Notification Group { #notification-group }

You can receive notifications about performance metrics through the notification group. In the notification group, specify the monitored instance and the user group to receive the notification. Set the thresholds and conditions for the performance metrics that will be notified through monitoring settings. When the set metrics meet the criteria of the monitoring settings, it sends a notification to the connected user group. Send notifications by SMS or mail, depending on the notification type set in the notification group.

<a id="create-notification-group"></a>
### Create Notification Group { #create-notification-group }

![notification-group.png](../static/images/20240813/notification-group-en.png)

❶ Click **+ Create Notification Group** to display a pop-up window where you can create notification groups.
❷ Enter the notification group name.

Notification group names have the following restrictions.

* You can only use letters, numbers, and some symbols (-, _, .) between 1 and 100 characters, and the first character can only be an alphabet.

❸ Select how to receive notifications.
❹ Notification groups that are disabled do not send notifications.
❺ Select the DB instance to be monitored.
❻ Select the user group to receive notifications.

<a id="monitoring-settings"></a>
## Monitoring Settings { #monitoring-settings }

Monitoring settings consist of monitoring items, comparison methods, thresholds, and duration. Compare the monitoring item's performance metrics value with the threshold to determine if the condition is met. Send a notification if the condition is met continuously for more than a duration. For example, if CPU utilization threshold is at least 90% and the duration is at least 5 minutes, it sends notifications to users defined in the user group when the CPU utilization of the DB instance associated with that notification group is at least 90% and lasts at least 5 minutes. Even if the CPU utilization is over 90%, no notification will send if it falls below 90 percent within 5 minutes.

<a id="monitoring-settings-items"></a>
### Monitoring Settings items { #monitoring-settings-items }

Performance metrics that can be monitored are as follows.

| Items                        | Unit                                   |
|------------------------------|----------------------------------------|
| CPU Usage                    | %                                      |
| CPU usage (IO Wait)          | %                                      |
| CPU usage (Nice)             | %                                      |
| CPU usage (System)           | %                                      |
| CPU usage (User)             | %                                      |
| Load Average 1M              |                                        |
| Load Average 5M              |                                        |
| Load Average 15M             |                                        |
| Memory Usage                 | %                                      |
| Memory Usage (bytes)         | MB                                     |
| Memory free capacity (bytes) | MB                                     |
| Memory buffer (bytes)        | MB                                     |
| cached memory (bytes)        | MB                                     |
| Swap usage                   | MB                                     |
| Full swap size               | MB                                     |
| Storage usage                | %                                      |
| Storage Remaining Usage      | MB                                     |
| Storage IO Read              | KB/sec                                 |
| Storage IO Write             | KB/sec                                 |
| Data storage fault           | Abnormal: 0: normal 1                  |
| Network in BPS               | KB/sec                                 |
| Network out BPS              | KB/sec                                 |
| Database Connection Status   | Unable to access: 0, able to access: 1 |
| Queries Per Second           | counts/sec                             |
| Lock Tables                  | counts/sec                             |
| Cache Hit Ratio              | %                                      |
| Idle Connection              | counts/sec                             |
| Active Connection            | counts/sec                             |
| Total Connection             | counts/sec                             |
| Fetched Tuple Count          | counts/sec                             |
| Returned Tuple Count         | counts/sec                             |
| Inserted Tuple Count         | counts/sec                             |
| Updated Tuple Count          | counts/sec                             |
| Deleted Tuple Count          | counts/sec                             |
| Transaction Commit           | counts/sec                             |
| Transaction Rollback         | counts/sec                             |
| Deadlock                     | counts/sec                             |
| Conflict                     | counts/sec                             |
| Replication Latency(Second)  | seconds                                |
| Replication Latency(Byte)    | MB                                     |

<a id="add-monitoring-setting"></a>
### Add Monitoring Setting { #add-monitoring-setting }

![notification-group-watchdog](../static/images/20240813/notification-group-watchdog-en.png)

❶ Click **Monitoring Settings** to display a pop-up window that allows you to change your monitoring settings.
❷ Click **+ Add Monitoring Setting** to add new monitoring settings.
❸ Enter items to be monitored, comparison method, threshold, and duration and Click **Add**.

<a id="modify-and-delete-monitoring-setting"></a>
### Modify and delete Monitoring Setting { #modify-and-delete-monitoring-setting }

❹ Click the button to modify Monitoring settings added.
❹ Click the button to delete Monitoring settings added.
