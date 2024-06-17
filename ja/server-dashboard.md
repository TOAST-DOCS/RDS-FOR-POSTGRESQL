## Database > RDS for PostgreSQL > サーバーダッシュボード

## サーバーダッシュボード

サーバーダッシュボードで性能指標をチャート形式で視覚化できます。チャートはあらかじめ設定されたレイアウトに従って配置されます。指標は1分に1回収集され、最大5年間保存されます。指標データは5分、30分、2時間、1日単位の平均値で集計されます。集計単位別の保管期間は以下の通りです。

| 集計単位 | 保管期間 |
|-------|-------|
| 1分  | 7日  |
| 5分  | 1か月 |
| 30分 | 6か月 |
| 2時間 | 2年  |
| 1日  | 5年  |

## レイアウト

レイアウトを利用してチャートのサイズと位置を表示できます。サービス起動時に`基本システム指標`と`基本PostgreSQL指標`がデフォルトのレイアウトとして提供されます。デフォルトのレイアウトは変更または削除することはできません。また、チャートの追加や変更、削除を行うこともできません。チャートでデフォルトのレイアウトに含まれていない情報を見たい場合は、新しいレイアウトを作成してチャートを追加できます。

![server-dashboard-layout](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-layout-ja.png)

❶ **レイアウト管理**を押すと、レイアウトを管理するポップアップ画面が表示されます。
❷ **+ レイアウトの作成**を押すと、レイアウトを作成できます。
- レイアウト名を入力した後、**作成**を押してレイアウトを作成します。
❸ボタンをクリックすると、追加したレイアウトを変更できます。
❹ボタンをクリックすると、追加したレイアウトを削除できます。

### レイアウトにチャートを追加

![server-dashboard-chart-add](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-chart-add-ja.png)

❶レイアウトを選択します。
❷ **+チャート追加**を押すと、チャートを追加できるポップアップ画面が表示されます。
❸チェックボックスを選択して追加する指標を複数選択できます。
❹指標名をクリックすると、左側のプレビューエリアにチャートが表示されます。
❺ **追加**をクリックすると、選択したチャートがすべて追加されます。

### レイアウトのチャート変更及び削除

![server-dashboard-chart-manage](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-chart-manage-ja.png)

❶チャートの上部領域をクリックした後、ドラッグ＆ドロップして位置を移動できます。
❷チャートの右下の領域をドラッグ＆ドロップして、チャートのサイズを変更できます。
❸チャートの右上の**x**をクリックすると、レイアウトからチャートが削除されます。

## チャート

DBインスタンスの各種性能指標をチャート形式で閲覧できます。性能指標ごとにそれぞれ違う形のチャートで構成されています。基本的なシステム指標以外にPostgreSQLが提供する各種性能指標をチャートで提供しています。チャート別に確認できる指標は下記の通りです。

| チャート                       | 指標(単位)                                                                                                                     | 備考                                   |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| CPU使用率                  | cpu used (%)                                                                                                               |                                        |
| CPU詳細                   | cpu user (%)<br/>cpu system (%)<br/>cpu nice (%)<br/>cpu IO wait (%)                                                       |                                        |
| CPU平均負荷                | 1m<br/>5m<br/>15m                                                                                                          |                                        |
| メモリ使用量                  | memory used (%)                                                                                                            |                                        |
| メモリ詳細                   | memory used (bytes)<br/>memory free (bytes)                                                                                |                                        |
| スワップ使用量                   | swap used (bytes)<br> swap total (bytes)                                                                                   |                                        |
| Storage使用量              | storage used (%)                                                                                                           |                                        |
| Storage残り使用量           | storage free (%)                                                                                                           |                                        |
| Storage IO                 | disk read (bytes)<br> disk write (bytes)                                                                                   |                                        |
| ネットワークデータ送受信             | nic incoming (bytes)<br> nic outgoing (bytes)                                                                              | PostgreSQLで使用する基本的なネットワーク転送が発生します。 |
| データストレージ障害               | disk fault status                                                                                                          | 異常: 0、正常: 1                          |
| Database Connection Status | PostgreSQL status                                                                                                          | 接続不可: 0、接続可能: 1                     |
| Queries Per Second         | qps (counts/sec)                                                                                                           |                                        |
| Connection                 | idle (counts)<br/>active (counts)<br/>total (counts)<br/>max (counts)                                                      |                                        |
| Tuple Count                | fetched (counts/sec)<br/>returned (counts/sec)<br/>inserted (counts/sec)<br/>updated (counts/sec)<br/>deleted (counts/sec) |                                        |
| Lock Tables                | count (counts/sec)                                                                                                         |                                        |
| Transaction                | commit (counts/sec)<br/>rollback (counts/sec)                                                                              |                                        |
| Deadlock/Conflict          | deadlock (counts/sec)<br/>conflict (counts/sec)                                                                            |                                        |
| Cache Hit Ratio            | %                                                                                                                          |                                        |

## サーバーグループ

サーバーグループを利用すれば、一つのチャートで複数のDBインスタンスの性能指標を確認できます。サーバーグループに属するDBインスタンスごとに性能指標が一つのチャートに表示されます。複数の性能指標で構成されたチャートは、サーバーグループでは全て個別性能指標に変更されます。

### サーバーグループの作成

![server-dashboard-group-add](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-group-add-ja.png)

❶ **+グループ追加**をクリックすると、グループを作成できるポップアップ画面が表示されます。
❷サーバーグループに追加するDBインスタンスを選択します。

### サーバーグループの設定

サーバーダッシュボード左側のサーバーリストにDBインスタンスとサーバーグループが一緒に表示されます。

![server-dashboard-group-manage](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-group-manage-ja.png)

❶ **+**, **-**を押してサーバーグループを展開したり、閉じたりすることができます。
❷サーバーグループに属するDBインスタンスをクリックすると、チャートに表示される色を変更できる色選択ポップアップが表示されます。

![server-dashboard-group-menu](https://static.toastoven.net/prod_rds_postgres/20240611/server-dashboard-group-menu-ja.png)

❶ **：**サーバーリストの各項目の右側に表示されるメニューアイコンをクリックすると、サーバーグループを変更または削除できます。
