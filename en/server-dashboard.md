<!-- pre-align:aligned sig=b981bf1b80d7 -->

<a id="database-rds-for-postgresql-server-dashboard"></a>
## Database > RDS for PostgreSQL > Server Dashboard { #database-rds-for-postgresql-server-dashboard }

<a id="server-dashboard"></a>
## Server Dashboard { #server-dashboard }

You can visualize performance metrics in chart form on the server dashboard. Charts are arranged according to a pre-set layout. Metrics are collected once a minute and kept for up to 1 year. The retention period for each collecting unit is as follows.

| Collecting Unit | Retention Period |
|-----------------|------------------|
| 1 minute           | 1 year         |

<a id="layout"></a>
## Layout { #layout }

You can use the layout to indicate the size and location of the chart. When activated, `Basic System Metrics` and `Basic PostgreSQL Metrics ` are provided as default layouts. You cannot change or delete the default layout. Additionally, you cannot add charts, change or delete added charts. To view information in a chart that is not included in the main layout, you can add a chart by creating a new layout.

![server-dashboard-layout](../static/images/20240813/server-dashboard-layout-en.png)

❶ click **Manage Layout** to display a pop-up window to manage the layout.
❷ You can create a layout by clicking on **+ Create Layout**.
    - Enter a layout name and click **Create** to create a layout.
❸ Click the button to change the layout added.
❹ Click the button to delete the layout added.

<a id="add-charts-to-layout"></a>
### Add Charts to Layout { #add-charts-to-layout }

![server-dashboard-chart-add](../static/images/20240813/server-dashboard-chart-add-en.png)

❶ Select the desired layout.
❷ Click **+ Add Chart** to display a pop-up window where you can add charts.
❸ Select the check box to select multiple metrics to add.
❹ When you click metrics name, the chart appears in the left preview area.
❺ Click **Add** to add all selected charts.

<a id="change-and-delete-charts-in-the-layout"></a>
### Change and delete charts in the layout { #change-and-delete-charts-in-the-layout }

![server-dashboard-chart-manage](../static/images/20240813/server-dashboard-chart-manage-en.png)

❶ Click and drag and drop the top area of the chart to move the location.
❷ You can change the size of the chart by dragging and dropping the lower right area of the chart.
❸ Click **x** in the top right corner of the chart to delete the chart from the layout.

<a id="chart"></a>
## Chart { #chart }

You can view various performance metrics of DB instance in chart format. Each performance metric consists of different types of charts. In addition to basic system metrics, PostgreSQL provides a variety of performance metrics. Metrics that can be checked by chart are as follows.

| Chart                         | Metric (Unit)                                                                                                              | Note                                                |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| CPU Usage                     | cpu used (%)                                                                                                               |                                                     |
| CPU Details                   | cpu user (%)<br/>cpu system (%)<br/>cpu nice (%)<br/>cpu IO wait (%)                                                       |                                                     |
| CPU load average              | 1m<br/>5m<br/>15m                                                                                                          |                                                     |
| Memory Usage                  | memory used (%)                                                                                                            |                                                     |
| Memory Details                | memory used (bytes)<br/>memory free (bytes)                                                                                |                                                     |
| Swap usage                    | swap used (bytes)<br> swap total (bytes)                                                                                   |                                                     |
| Storage usage                 | storage used (%)                                                                                                           |                                                     |
| Storage Remaining Usage       | storage free (%)                                                                                                           |                                                     |
| Storage IO                    | disk read (bytes)<br> disk write (bytes)                                                                                   |                                                     |
| Network data transfer         | nic incoming (bytes)<br> nic outgoing (bytes)                                                                              | Default network transfer used by PostgreSQL occurs. |
| Data storage fault            | disk fault status                                                                                                          | Abnormal: 0: normal 1                               |
| Database Connection Status    | PostgreSQL status                                                                                                          | Unable to access: 0, able to access: 1              |
| Queries Per Second            | qps (counts/sec)                                                                                                           |                                                     |
| Connection                    | idle (counts)<br/>active (counts)<br/>total (counts)<br/>max (counts)                                                      |                                                     |
| Tuple Count                   | fetched (counts/sec)<br/>returned (counts/sec)<br/>inserted (counts/sec)<br/>updated (counts/sec)<br/>deleted (counts/sec) |                                                     |
| Lock Tables                   | count (counts/sec)                                                                                                         |                                                     |
| Transaction                   | commit (counts/sec)<br/>rollback (counts/sec)                                                                              |                                                     |
| Deadlock/Conflict             | deadlock (counts/sec)<br/>conflict (counts/sec)                                                                            |                                                     |
| Cache Hit Ratio               | %                                                                                                                          |                                                     |
| Replication latency (seconds) | seconds                                                                                                                    |                                                     |
| Replication latency (bytes)   | bytes                                                                                                                      |                                                     |

<a id="server-group"></a>
## Server Group { #server-group }

Server groups allow you to view performance metrics for multiple DB instances in a single chart. Performance metrics appear in a chart for each DB instance that belongs to a server group. Charts of multiple performance metrics are all changed to individual performance metrics in the server group.

<a id="create-a-server-group"></a>
### Create a Server Group { #create-a-server-group }

![server-dashboard-group-add](../static/images/20240813/server-dashboard-group-add-en.png)

❶ When you click **+ Add Group** a pop-up window appears where you can create a group.
❷ Select DB instance to add to the server group.

<a id="set-a-server-group"></a>
### Set a Server Group { #set-a-server-group }

DB instances and server groups appear together in the list of servers to the left of the server dashboard.

![server-dashboard-group-manage](../static/images/20240611/server-dashboard-group-manage-en.png)

❶ Click **+** or **-** to expand or close the server group.
❷ When you click a DB instance that belongs to a server group, Select Color pop-up appears where you can change the color that appears in the chart.

![server-dashboard-group-menu](../static/images/20240611/server-dashboard-group-menu-en.png)

❶ You can change or delete a server group by clicking on the menu icon that appears to the right of each item in the **:** list of servers.