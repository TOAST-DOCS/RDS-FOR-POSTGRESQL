## Database > RDS for PostgreSQL > イベント

## イベント

イベントはRDS for PostgreSQLやユーザーによって発生した重要なイベントを意味します。イベントはイベントタイプ、発生日時、発生元ソースとメッセージで構成されます。イベントはWebコンソールで照会可能で、イベントの種類と発生するイベントは下記の通りです。

| イベントコード                | イベントタイプ            | 説明                |
|-------------------------|---------------------|---------------------|
| BACKUP_01_00            | BACKUP              | DBインスタンスバックアップ開始      |
| BACKUP_01_01            | BACKUP              | DBインスタンスバックアップ完了     |
| BACKUP_01_04            | BACKUP              | DBインスタンスバックアップ失敗     |
| BACKUP_02_01            | BACKUP              | バックアップ削除完了          |
| DB_INSTANCE_01_00       | DB_INSTANCE         | DBインスタンス作成開始      |
| DB_INSTANCE_01_01       | DB_INSTANCE         | DBインスタンス作成完了     |
| DB_INSTANCE_01_04       | DB_INSTANCE         | DBインスタンス作成失敗     |
| DB_INSTANCE_02_01       | DB_INSTANCE         | DBインスタンス開始         |
| DB_INSTANCE_03_00       | DB_INSTANCE         | DBインスタンス強制再起動実行 |
| DB_INSTANCE_04_00       | DB_INSTANCE         | DBインスタンス停止開始      |
| DB_INSTANCE_04_01       | DB_INSTANCE         | DBインスタンス停止完了     |
| DB_INSTANCE_04_04       | DB_INSTANCE         | DBインスタンス停止失敗     |
| DB_INSTANCE_05_01       | DB_INSTANCE         | DBインスタンス停止        |
| DB_INSTANCE_06_00       | DB_INSTANCE         | DBインスタンス削除開始      |
| DB_INSTANCE_06_01       | DB_INSTANCE         | DBインスタンス削除完了     |
| DB_INSTANCE_06_04       | DB_INSTANCE         | DBインスタンス削除失敗     |
| DB_INSTANCE_07_00       | DB_INSTANCE         | DBインスタンスバックアップ開始      |
| DB_INSTANCE_07_01       | DB_INSTANCE         | DBインスタンスバックアップ完了     |
| DB_INSTANCE_07_04       | DB_INSTANCE         | DBインスタンスバックアップ失敗     |
| DB_INSTANCE_08_00       | DB_INSTANCE         | DBインスタンス復元開始      |
| DB_INSTANCE_08_01       | DB_INSTANCE         | DBインスタンス復元完了     |
| DB_INSTANCE_08_04       | DB_INSTANCE         | DBインスタンス復元失敗     |
| DB_INSTANCE_09_00       | DB_INSTANCE         | 詳細設定変更開始        |
| DB_INSTANCE_09_01       | DB_INSTANCE         | 詳細設定変更完了       |
| DB_INSTANCE_09_04       | DB_INSTANCE         | 詳細設定変更失敗       |
| DB_INSTANCE_10_01       | DB_INSTANCE         | 自動バックアップ設定の有効化      |
| DB_INSTANCE_11_01       | DB_INSTANCE         | 自動バックアップ設定の無効化     |
| DB_INSTANCE_12_00       | DB_INSTANCE         | DBインスタンスタイプ変更開始   |
| DB_INSTANCE_12_01       | DB_INSTANCE         | DBインスタンスタイプ変更完了  |
| DB_INSTANCE_12_04       | DB_INSTANCE         | DBインスタンスタイプ変更失敗  |
| DB_INSTANCE_13_00       | DB_INSTANCE         | Storage拡張開始      |
| DB_INSTANCE_13_01       | DB_INSTANCE         | Storage拡張完了     |
| DB_INSTANCE_13_04       | DB_INSTANCE         | Storage拡張失敗     |
| DB_INSTANCE_14_01       | DB_INSTANCE         | Floating IP接続         |
| DB_INSTANCE_15_01       | DB_INSTANCE         | Floating IP接続解除      |
| DB_INSTANCE_16_01       | DB_INSTANCE         | DBインスタンス容量確保     |
| DB_INSTANCE_16_04       | DB_INSTANCE         | DBインスタンス容量確保失敗  |
| DB_INSTANCE_17_01       | DB_INSTANCE         | ユーザー作成            |
| DB_INSTANCE_17_04       | DB_INSTANCE         | ユーザー作成失敗         |
| DB_INSTANCE_18_01       | DB_INSTANCE         | ユーザー変更            |
| DB_INSTANCE_18_04       | DB_INSTANCE         | ユーザー変更失敗         |
| DB_INSTANCE_19_01       | DB_INSTANCE         | ユーザー削除            |
| DB_INSTANCE_20_01       | DB_INSTANCE         | データベース作成         |
| DB_INSTANCE_20_04       | DB_INSTANCE         | データベース作成失敗      |
| DB_INSTANCE_21_01       | DB_INSTANCE         | データベース変更         |
| DB_INSTANCE_21_04       | DB_INSTANCE         | データベース変更失敗      |
| DB_INSTANCE_22_01       | DB_INSTANCE         | データベース削除         |
| DB_INSTANCE_23_00       | DB_INSTANCE         | パラメータグループ変更開始      |
| DB_INSTANCE_23_01       | DB_INSTANCE         | パラメータグループ変更完了     |
| DB_INSTANCE_23_04       | DB_INSTANCE         | パラメータグループ変更失敗     |
| DB_INSTANCE_24_00       | DB_INSTANCE         | パラメータグループ変更事項適用開始 |
| DB_INSTANCE_24_01       | DB_INSTANCE         | パラメータグループ変更事項適用完了 |
| DB_INSTANCE_24_04       | DB_INSTANCE         | パラメータグループ変更事項適用失敗 |
| DB_INSTANCE_25_00       | DB_INSTANCE         | DBインスタンスセキュリティグループ変更開始 |
| DB_INSTANCE_25_01       | DB_INSTANCE         | DBインスタンスセキュリティグループ変更完了 |
| DB_INSTANCE_25_04       | DB_INSTANCE         | DBインスタンスセキュリティグループ変更失敗 |
| DB_INSTANCE_26_00       | DB_INSTANCE         | DBインスタンスマイグレーション開始  |
| DB_INSTANCE_26_01       | DB_INSTANCE         | DBインスタンスマイグレーション完了 |
| DB_INSTANCE_26_04       | DB_INSTANCE         | DBインスタンスマイグレーション失敗 |
| DB_INSTANCE_27_00       | DB_INSTANCE         | アクセス制御設定変更開始     |
| DB_INSTANCE_27_01       | DB_INSTANCE         | アクセス制御設定変更完了    |
| DB_INSTANCE_27_04       | DB_INSTANCE         | アクセス制御設定変更失敗    |
| DB_INSTANCE_28_01       | DB_INSTANCE         | DBインスタンス正常化       |
| DB_INSTANCE_29_01       | DB_INSTANCE         | DBインスタンス容量不足      |
| DB_INSTANCE_30_01       | DB_INSTANCE         | DBインスタンス接続失敗     |
| DB_SECURITY_GROUP_01_01 | DB_SECURITY_GROUP   | DBセキュリティグループ作成       |
| DB_SECURITY_GROUP_02_00 | DB_SECURITY_GROUP   | DBセキュリティグループ変更開始     |
| DB_SECURITY_GROUP_02_01 | DB_SECURITY_GROUP   | DBセキュリティグループ変更完了    |
| DB_SECURITY_GROUP_02_04 | DB_SECURITY_GROUP   | DBセキュリティグループ変更失敗    |
| DB_SECURITY_GROUP_03_01 | DB_SECURITY_GROUP   | DBセキュリティグループ削除       |
| TENANT_01_04            | TENANT              | CPUコア数制限       |
| TENANT_02_04            | TENANT              | RAM容量制限	          |
| TENANT_03_04            | TENANT              | 個別ボリュームサイズ制限       |
| TENANT_04_04            | TENANT              | プロジェクト全体のボリュームサイズ制限  |
| JOB_01_04               | JOB                 | Job実行失敗         |
