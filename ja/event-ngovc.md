## Database > RDS for PostgreSQL > イベント

## イベント

イベントはRDS for PostgreSQLやユーザーによって発生した重要なイベントを意味します。イベントはイベントタイプ、発生日時、発生元ソースとメッセージで構成されます。イベントはコンソールで照会可能で、イベントの種類と発生するイベントは下記の通りです。

| イベントコード                 | イベントタイプ           | 説明                                        |
|-------------------------|-------------------|-------------------------------------------|
| BACKUP_01_00            | BACKUP            | DBインスタンスバックアップ開始                          |
| BACKUP_01_01            | BACKUP            | DBインスタンスバックアップ完了                          |
| BACKUP_01_04            | BACKUP            | DBインスタンスバックアップ失敗                          |
| BACKUP_02_01            | BACKUP            | バックアップ削除完了                                |
| BACKUP_04_00            | BACKUP            | オブジェクトストレージアップロード開始                       |
| BACKUP_04_01            | BACKUP            | オブジェクトストレージアップロード完了                       |
| BACKUP_04_04            | BACKUP            | オブジェクトストレージアップロード失敗                       |
| BACKUP_05_00            | BACKUP            | バックアップエクスポート開始                            |
| BACKUP_05_01            | BACKUP            | バックアップエクスポート完了                            |
| BACKUP_05_04            | BACKUP            | バックアップエクスポート失敗                            |
| BACKUP_06_01            | BACKUP            | DBインスタンスバックアップ失敗(既知の原因)                   |
| DB_INSTANCE_01_00       | DB_INSTANCE       | DBインスタンス作成開始                              |
| DB_INSTANCE_01_01       | DB_INSTANCE       | DBインスタンス作成完了                              |
| DB_INSTANCE_01_04       | DB_INSTANCE       | DBインスタンス作成失敗                              |
| DB_INSTANCE_02_01       | DB_INSTANCE       | DBインスタンス開始                                |
| DB_INSTANCE_03_00       | DB_INSTANCE       | DBインスタンス強制再起動実行                           |
| DB_INSTANCE_04_00       | DB_INSTANCE       | DBインスタンス停止開始                              |
| DB_INSTANCE_04_01       | DB_INSTANCE       | DBインスタンス停止完了                              |
| DB_INSTANCE_04_04       | DB_INSTANCE       | DBインスタンス停止失敗                              |
| DB_INSTANCE_05_01       | DB_INSTANCE       | DBインスタンス停止                                |
| DB_INSTANCE_06_00       | DB_INSTANCE       | DBインスタンス削除開始                              |
| DB_INSTANCE_06_01       | DB_INSTANCE       | DBインスタンス削除完了                              |
| DB_INSTANCE_06_04       | DB_INSTANCE       | DBインスタンス削除失敗                              |
| DB_INSTANCE_07_00       | DB_INSTANCE       | DBインスタンスバックアップ開始                          |
| DB_INSTANCE_07_01       | DB_INSTANCE       | DBインスタンスバックアップ完了                          |
| DB_INSTANCE_07_04       | DB_INSTANCE       | DBインスタンスバックアップ失敗                          |
| DB_INSTANCE_08_00       | DB_INSTANCE       | DBインスタンス復元開始                              |
| DB_INSTANCE_08_01       | DB_INSTANCE       | DBインスタンス復元完了                              |
| DB_INSTANCE_08_04       | DB_INSTANCE       | DBインスタンス復元失敗                              |
| DB_INSTANCE_09_00       | DB_INSTANCE       | 詳細設定変更開始                                  |
| DB_INSTANCE_09_01       | DB_INSTANCE       | 詳細設定変更完了                                  |
| DB_INSTANCE_09_04       | DB_INSTANCE       | 詳細設定変更失敗                                  |
| DB_INSTANCE_10_01       | DB_INSTANCE       | 自動バックアップの設定有効化                            |
| DB_INSTANCE_11_01       | DB_INSTANCE       | 自動バックアップ設定の無効化                            |
| DB_INSTANCE_12_00       | DB_INSTANCE       | DBインスタンスタイプ変更開始                           |
| DB_INSTANCE_12_01       | DB_INSTANCE       | DBインスタンスタイプ変更完了                           |
| DB_INSTANCE_12_04       | DB_INSTANCE       | DBインスタンスタイプ変更失敗                           |
| DB_INSTANCE_13_00       | DB_INSTANCE       | Storage拡張開始                               |
| DB_INSTANCE_13_01       | DB_INSTANCE       | Storage拡張完了                               |
| DB_INSTANCE_13_04       | DB_INSTANCE       | Storage拡張失敗                               |
| DB_INSTANCE_14_01       | DB_INSTANCE       | Floating IP接続                             |
| DB_INSTANCE_15_01       | DB_INSTANCE       | Floating IP接続解除                           |
| DB_INSTANCE_16_01       | DB_INSTANCE       | DBインスタンス容量確保                              |
| DB_INSTANCE_16_04       | DB_INSTANCE       | DBインスタンス容量確保失敗                            |
| DB_INSTANCE_17_01       | DB_INSTANCE       | ユーザー作成                                    |
| DB_INSTANCE_17_04       | DB_INSTANCE       | ユーザー作成失敗                                  |
| DB_INSTANCE_18_01       | DB_INSTANCE       | ユーザー変更                                    |
| DB_INSTANCE_18_04       | DB_INSTANCE       | ユーザー変更失敗                                  |
| DB_INSTANCE_19_01       | DB_INSTANCE       | ユーザー削除                                    |
| DB_INSTANCE_19_04       | DB_INSTANCE       | ユーザー削除失敗                           |
| DB_INSTANCE_20_01       | DB_INSTANCE       | データベース作成                                  |
| DB_INSTANCE_20_04       | DB_INSTANCE       | データベース作成失敗                                |
| DB_INSTANCE_21_01       | DB_INSTANCE       | データベース変更                                  |
| DB_INSTANCE_21_04       | DB_INSTANCE       | データベース変更失敗                                |
| DB_INSTANCE_22_01       | DB_INSTANCE       | データベース削除                                  |
| DB_INSTANCE_23_00       | DB_INSTANCE       | パラメータグループ変更開始                             |
| DB_INSTANCE_23_01       | DB_INSTANCE       | パラメータグループ変更完了                             |
| DB_INSTANCE_23_04       | DB_INSTANCE       | パラメータグループ変更失敗                             |
| DB_INSTANCE_24_00       | DB_INSTANCE       | パラメータグループ変更事項適用開始                         |
| DB_INSTANCE_24_01       | DB_INSTANCE       | パラメータグループ変更事項適用完了                         |
| DB_INSTANCE_24_04       | DB_INSTANCE       | パラメータグループ変更事項適用失敗                         |
| DB_INSTANCE_25_00       | DB_INSTANCE       | DBインスタンスセキュリティグループ変更開始                    |
| DB_INSTANCE_25_01       | DB_INSTANCE       | DBインスタンスセキュリティグループ変更完了                    |
| DB_INSTANCE_25_04       | DB_INSTANCE       | DBインスタンスセキュリティグループ変更失敗                    |
| DB_INSTANCE_26_00       | DB_INSTANCE       | DBインスタンスマイグレーション開始                        |
| DB_INSTANCE_26_01       | DB_INSTANCE       | DBインスタンスマイグレーション完了                        |
| DB_INSTANCE_26_04       | DB_INSTANCE       | DBインスタンスマイグレーション失敗                        |
| DB_INSTANCE_27_00       | DB_INSTANCE       | アクセス制御設定変更開始                              |
| DB_INSTANCE_27_01       | DB_INSTANCE       | アクセス制御設定変更完了                              |
| DB_INSTANCE_27_04       | DB_INSTANCE       | アクセス制御設定変更失敗                              |
| DB_INSTANCE_28_01       | DB_INSTANCE       | DBインスタンス正常化                               |
| DB_INSTANCE_29_01       | DB_INSTANCE       | DBインスタンス容量不足                              |
| DB_INSTANCE_30_01       | DB_INSTANCE       | DBインスタンス接続失敗                              |
| DB_INSTANCE_31_00       | DB_INSTANCE       | DBインスタンス複製開始                              |
| DB_INSTANCE_31_01       | DB_INSTANCE       | DBインスタンス複製完了                              |
| DB_INSTANCE_31_04       | DB_INSTANCE       | DBインスタンス複製失敗                              |
| DB_INSTANCE_32_00       | DB_INSTANCE       | DBインスタンス昇格開始                              |
| DB_INSTANCE_32_01       | DB_INSTANCE       | DBインスタンス昇格完了                              |
| DB_INSTANCE_32_04       | DB_INSTANCE       | DBインスタンス昇格失敗                              |
| DB_INSTANCE_33_00       | DB_INSTANCE       | DBインスタンス強制昇格開始                            |
| DB_INSTANCE_33_01       | DB_INSTANCE       | DBインスタンス強制昇格完了                            |
| DB_INSTANCE_33_04       | DB_INSTANCE       | DBインスタンス強制昇格失敗                            |
| DB_INSTANCE_34_00       | DB_INSTANCE       | DBインスタンス複製再構築開始                           |
| DB_INSTANCE_34_01       | DB_INSTANCE       | DBインスタンス複製再構築開始                           |
| DB_INSTANCE_34_04       | DB_INSTANCE       | DBインスタンス複製再構築開始                           |
| DB_INSTANCE_35_00       | DB_INSTANCE       | DBインスタンス複製遅延                              |
| DB_INSTANCE_35_01       | DB_INSTANCE       | DBインスタンス複製遅延終了                            |
| DB_INSTANCE_36_00       | DB_INSTANCE       | DBインスタンス複製中断                              |
| DB_INSTANCE_37_00       | DB_INSTANCE       | 詳細設定変更開始                                  |
| DB_INSTANCE_37_01       | DB_INSTANCE       | 詳細設定変更完了                                  |
| DB_INSTANCE_37_04       | DB_INSTANCE       | 詳細設定変更失敗                                  |
| DB_INSTANCE_38_01       | DB_INSTANCE       | 高可用性DBインスタンス開始                            |
| DB_INSTANCE_39_01       | DB_INSTANCE       | 高可用性DBインスタンス停止                            |
| DB_INSTANCE_40_00       | DB_INSTANCE       | DBインスタンスフェイルオーバー実行                        |
| DB_INSTANCE_40_01       | DB_INSTANCE       | DBインスタンスフェイルオーバー完了                        |
| DB_INSTANCE_40_04       | DB_INSTANCE       | DBインスタンスフェイルオーバー失敗                        |
| DB_INSTANCE_41_01       | DB_INSTANCE       | フェイルオーバーを利用したインスタンス再起動完了                  |
| DB_INSTANCE_41_04       | DB_INSTANCE       | フェイルオーバーを利用したインスタンス再起動失敗                  |
| DB_INSTANCE_42_00       | DB_INSTANCE       | フェイルオーバー手動制御待機                            |
| DB_INSTANCE_42_01       | DB_INSTANCE       | フェイルオーバー手動制御成功                            |
| DB_INSTANCE_42_04       | DB_INSTANCE       | フェイルオーバー手動制御タイムアウト                        |
| DB_INSTANCE_43_01       | DB_INSTANCE       | 高可用性一時停止                                  |
| DB_INSTANCE_43_04       | DB_INSTANCE       | 高可用性一時停止失敗                                |
| DB_INSTANCE_44_01       | DB_INSTANCE       | 高可用性再起動                                   |
| DB_INSTANCE_44_04       | DB_INSTANCE       | 高可用性再起動失敗                                 |
| DB_INSTANCE_45_00       | DB_INSTANCE       | フェイルオーバー完了したDBインスタンスの高可用性復旧開始             |
| DB_INSTANCE_45_01       | DB_INSTANCE       | フェイルオーバー完了したDBインスタンスの高可用性復旧完了             |
| DB_INSTANCE_45_04       | DB_INSTANCE       | フェイルオーバー完了したDBインスタンスの高可用性復旧失敗             |
| DB_INSTANCE_46_00       | DB_INSTANCE       | フェイルオーバー完了したDBインスタンスの高可用性再構築開始            |
| DB_INSTANCE_46_01       | DB_INSTANCE       | フェイルオーバー完了したDBインスタンスの高可用性再構築完了            |
| DB_INSTANCE_46_04       | DB_INSTANCE       | フェイルオーバー完了したDBインスタンスの高可用性再構築失敗            |
| DB_INSTANCE_47_00       | DB_INSTANCE       | フェイルオーバー完了したDBインスタンスを一般DBインスタンスに変更開始      |
| DB_INSTANCE_47_01       | DB_INSTANCE       | フェイルオーバー完了したDBインスタンスを一般DBインスタンスに変更完了      |
| DB_INSTANCE_47_04       | DB_INSTANCE       | フェイルオーバー完了したDBインスタンスを一般DBインスタンスに変更失敗      |
| DB_INSTANCE_48_01       | DB_INSTANCE       | 高可用性正常化                                   |
| DB_INSTANCE_49_01       | DB_INSTANCE       | 高可用性中断                                    |
| DB_INSTANCE_50_00       | DB_INSTANCE       | 予備マスター再構築開始                               |
| DB_INSTANCE_50_01       | DB_INSTANCE       | 予備マスター再構築完了                               |
| DB_INSTANCE_50_04       | DB_INSTANCE       | 予備マスター再構築失敗                               |
| DB_INSTANCE_51_01       | DB_INSTANCE       | DBインスタンスバックアップ失敗(既知の原因)                   |
| DB_INSTANCE_52_00       | DB_INSTANCE       | DBインスタンスバックアップ後、バックアップファイルエクスポート開始        |
| DB_INSTANCE_52_01       | DB_INSTANCE       | DBインスタンスバックアップ後、バックアップファイルエクスポート完了        |
| DB_INSTANCE_52_04       | DB_INSTANCE       | DBインスタンスバックアップ後、バックアップファイルエクスポート失敗        |
| DB_INSTANCE_53_01       | DB_INSTANCE       | DBインスタンスバックアップ後、バックアップファイルエクスポート失敗(既知の原因) |
| DB_INSTANCE_54_00       | DB_INSTANCE       | DBインスタンスバックアップエクスポート開始                    |
| DB_INSTANCE_54_01       | DB_INSTANCE       | DBインスタンスバックアップエクスポート完了                    |
| DB_INSTANCE_54_04       | DB_INSTANCE       | DBインスタンスバックアップエクスポート失敗                    |
| DB_INSTANCE_55_00       | DB_INSTANCE       | オブジェクトストレージにあるバックアップでDBインスタンス復元開始         |
| DB_INSTANCE_55_01       | DB_INSTANCE       | オブジェクトストレージにあるバックアップでDBインスタンス復元完了         |
| DB_INSTANCE_55_04       | DB_INSTANCE       | オブジェクトストレージにあるバックアップでDBインスタンス復元失敗         |
| DB_INSTANCE_56_00       | DB_INSTANCE       | DBインスタンスバージョンアップグレード開始                    |
| DB_INSTANCE_56_01       | DB_INSTANCE       | DBインスタンスバージョンアップグレード完了                    |
| DB_INSTANCE_56_04       | DB_INSTANCE       | DBインスタンスバージョンアップグレード失敗                    |
| DB_INSTANCE_57_00       | DB_INSTANCE       | 拡張機能変更事項適用開始                              |
| DB_INSTANCE_57_01       | DB_INSTANCE       | 拡張機能変更事項適用完了                              |
| DB_INSTANCE_57_04       | DB_INSTANCE       | 拡張機能変更事項適用失敗                              |
| DB_SECURITY_GROUP_01_01 | DB_SECURITY_GROUP | DBセキュリティグループ作成                            |
| DB_SECURITY_GROUP_02_00 | DB_SECURITY_GROUP | DBセキュリティグループ変更開始                          |
| DB_SECURITY_GROUP_02_01 | DB_SECURITY_GROUP | DBセキュリティグループ変更完了                          |
| DB_SECURITY_GROUP_02_04 | DB_SECURITY_GROUP | DBセキュリティグループ変更失敗                          |
| DB_SECURITY_GROUP_03_01 | DB_SECURITY_GROUP | DBセキュリティグループ削除                            |
| TENANT_01_04            | TENANT            | CPUコア数制限                                  |
| TENANT_02_04            | TENANT            | RAM容量制限                                   |
| TENANT_03_04            | TENANT            | 個別ボリュームサイズ制限                              |
| TENANT_04_04            | TENANT            | プロジェクト全体のボリュームサイズ制限                       |
| TENANT_05_04            | TENANT            | リードレプリカ作成制限                               |
| JOB_01_04               | JOB               | Job実行失敗                                   |

### イベント購読

イベントを購読すると、イベント発生時に電子メールやSMSで通知を受けることができます。イベント購読に接続されたユーザーグループのユーザーに通知を送信します。イベントタイプ、イベントコード、イベントソースで細分化して購読できます。しばらく通知を中断する場合は、イベント購読を無効に修正します。有効にしない場合、通知を送信しません。

![event-subscription](https://static.toastoven.net/prod_rds_postgres/20240813/event-subscription-ja.png)

* ❶ **イベント購読登録**を押すと、イベント購読を登録できるポップアップウィンドウが表示されます。
* ❷購読するイベントの種類を選択します。イベントタイプによって選択できるイベントコードが変更されます。
* ❸購読するイベントコードを選択します。
* ❹購読するイベントソースを選択します。
* ❺イベント通知を受け取るユーザーグループを選択します。
* ❻有効にするかどうかを選択します。**いいえ**を選択した場合、イベント発生通知を送信しません。
