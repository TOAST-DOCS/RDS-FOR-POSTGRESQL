## Database > RDS for PostgreSQL > Server Dashboard

## Server Dashboard

You can visualize performance metrics in chart form on the server dashboard. Charts are arranged according to a pre-set layout. Metrics are collected once a minute and kept for up to five years. Metric data is aggregated into average values over 5 minutes, 30 minutes, 2 hours, and 1 day. The retention period for each collecting unit is as follows.

| Collecting Unit | Retention Period |
|-------|-------|
| 1 minute    | 7 days    |
| 5 minutes    | 1 month   |
| 30 minutes   | 6 months   |
| 2 hours   | 2 years    |
| 1 day    | 5 years    |

## Layout

You can use the layout to indicate the size and location of the chart. When activated, `Basic System Metrics` and `Basic PostgreSQL Metrics ` are provided as default layouts. You cannot change or delete the default layout. Additionally, you cannot add charts, change or delete added charts. To view information in a chart that is not included in the main layout, you can add a chart by creating a new layout.

![server-dashboard-layout](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-layout-en.png)

❶ click **Manage Layout** to display a pop-up screen to manage the layout.
❷ You can create a layout by clicking on **+ Create Layout**.
- Enter a layout name and click **Create** to create a layout.
❸ Click the button to change the layout added.
❹ Click the button to delete the layout added.

### Add Charts to Layout

![server-dashboard-chart-add](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-chart-add-en.png)

❶ Select the desired layout.
❷ Click **+ Add Chart** to display a pop-up screen where you can add charts.
❸ Select the check box to select multiple metrics to add.
❹ When you click metrics name, the chart appears in the left preview area.
❺ Click **Add** to add all selected charts.

### Change and delete charts in the layout

![server-dashboard-chart-manage](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-chart-manage-en.png)

❶ Click and drag and drop the top area of the chart to move the location.
❷ You can change the size of the chart by dragging and dropping the lower right area of the chart.
❸ Click **x** in the top right corner of the chart to delete the chart from the layout.

## Chart

You can view various performance metrics of DB instance in chart format. Each performance metric consists of different types of charts. In addition to basic system metrics, PostgreSQL provides a variety of performance metrics. Metrics that can be checked by chart are as follows.

| Chart                         | Metric (Unit)                                                                                                                     | Note                                     |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| CPU Usage                    | cpu used (%)                                                                                                               |                                        |
| CPU Details                     | cpu user (%)<br/>cpu system (%)<br/>cpu nice (%)<br/>cpu IO wait (%)                                                       |                                        |
| CPU load average                  | 1m<br/>5m<br/>15m                                                                                                          |                                        |
| Memory Usage                    | memory used (%)                                                                                                            |                                        |
| Memory Details                     | memory used (bytes)<br/>memory free (bytes)                                                                                |                                        |
| Swap usage                     | swap used (bytes)<br> swap total (bytes)                                                                                   |                                        |
| Storage usage                | storage used (%)                                                                                                           |                                        |
| Storage Remaining Usage             | storage free (%)                                                                                                           |                                        |
| Storage IO                 | disk read (bytes)<br> disk write (bytes)                                                                                   |                                        |
| Network data transfer               | nic incoming (bytes)<br> nic outgoing (bytes)                                                                              | Default network transfer used by PostgreSQL occurs. |
| Data storage fault                | disk fault status                                                                                                          | Abnormal: 0: normal 1                          |
| Database Connection Status | PostgreSQL status                                                                                                          | Unable to access: 0, able to access: 1                     |
| Queries Per Second         | qps (counts/sec)                                                                                                           |                                        |
| Connection                 | idle (counts)<br/>active (counts)<br/>total (counts)<br/>max (counts)                                                      |                                        |
| Tuple Count                | fetched (counts/sec)<br/>returned (counts/sec)<br/>inserted (counts/sec)<br/>updated (counts/sec)<br/>deleted (counts/sec) |                                        |
| Lock Tables                | count (counts/sec)                                                                                                         |                                        |
| Transaction                | commit (counts/sec)<br/>rollback (counts/sec)                                                                              |                                        |
| Deadlock/Conflict          | deadlock (counts/sec)<br/>conflict (counts/sec)                                                                            |                                        |
| Cache Hit Ratio            | %                                                                                                                          |                                        |

## Server Group

Server groups allow you to view performance metrics for multiple DB instances in a single chart. Performance metrics appear in a chart for each DB instance that belongs to a server group. Charts of multiple performance metrics are all changed to individual performance metrics in the server group.

### Create a Server Group

![server-dashboard-group-add](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-group-add-en.png)

❶ When you click **+ Add Group** a pop-up screen appears where you can create a group.
❷ Select DB instance to add to the server group.

### Set a Server Group

DB instances and server groups appear together in the list of servers to the left of the server dashboard.

![server-dashboard-group-manage](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-group-manage-en.png)

❶ Click **+** or **-** to expand or close the server group.
❷ When you click a DB instance that belongs to a server group, Select Color pop-up appears where you can change the color that appears in the chart.

![server-dashboard-group-menu](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-group-menu-en.png)

❶ You can change or delete a server group by clicking on the menu icon that appears to the right of each item in the \*\*:** list of servers.