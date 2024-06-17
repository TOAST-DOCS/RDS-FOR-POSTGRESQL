## Database > RDS for PostgreSQL > 通知

## ユーザーグループ

通知を受けるユーザーをグループで管理できます。通知対象は必ずプロジェクトメンバーとして登録されている必要があります。ユーザーグループに属するユーザーがプロジェクトメンバーから除外されると、ユーザーグループに属していても通知を受けることができません。

> [注意]
> 実名認証を行っておらず、携帯電話情報がない場合、SMS通知を受け取ることができません。

### ユーザーグループの作成

![user-group-create](https://static.toastoven.net/prod_rds_postgres/20240611/user-group-create-ko.png)

❶ **+ ユーザーグループ作成** を押すと、ユーザーグループを作成できるポップアップ画面が表示されます。
❷ユーザーグループ名を入力します。

ユーザーグループ名には以下のような制約があります。

* 1～100文字まで、英字、数字、一部の記号(-, _, .)のみ使用でき、最初の文字は英字のみ使用できます。

❸通知方法を選択します。

* 全プロジェクトメンバーを選択した場合、アラームを送信する際、当時の全プロジェクトメンバーを対象にアラームを送信します。

![user-group-custom](https://static.toastoven.net/prod_rds_postgres/20240611/user-group-custom-ko.png)

❹ **+追加**を押すと、プロジェクトメンバーを通知対象に追加できるポップアップ画面が表示されます。
❺削除する通知対象を選択した後、**削除**を押して通知対象から除外できます。
❻ **確認**を押してユーザーグループを追加します。

## 通知グループ

通知グループを通じて、パフォーマンス指標に関する通知を受けることができます。通知グループに監視対象インスタンスと通知を受けるユーザーグループを指定します。監視設定で通知を受ける性能指標のしきい値と条件を設定します。設定された指標が監視設定の条件を満たすと、接続されたユーザーグループに通知が送信されます。通知グループに設定された通知タイプに応じて、SMSまたはメールで通知を送信します。

### 通知グループの作成

![notification-group.png](https://static.toastoven.net/prod_rds_postgres/20240611/notification-group-ko.png)

❶ **+通知グループ作成**を押すと、通知グループを作成できるポップアップ画面が表示されます。
❷通知グループ名を入力します。

通知グループ名には以下のような制約があります。

* 1～100文字までの英字、数字、一部の記号(-, _, .)のみ使用でき、最初の文字は英字のみ使用できます。

❸通知を受け取る方法を選択します。
❹有効になっていない通知グループは、通知を送信しません。
❺監視対象DBインスタンスを選択します。
❻通知を受け取るユーザーグループを選択します。

## 監視設定

監視設定は、監視項目、比較方法、しきい値、持続時間で構成されます。監視項目の性能指標としきい値を比較し、条件を満たすかどうかを判断します。持続時間以上連続して条件を満たした場合、通知を送信します。例えば、CPU使用率のしきい値が90%以上で持続時間が5分であれば、その通知グループと連動したDBインスタンスのCPU使用率が90%以上の状態が5分以上続いた時、ユーザーグループに定義されたユーザーに通知を送ります。CPU使用率が90%以上になっても、5分以内に90%未満になった場合は、通知が発生しません。

### 監視設定項目

監視可能な性能指標項目は次のとおりです。

| 項目                        | 単位               |
|----------------------------|--------------------|
| CPU使用率                  | %                  |
| CPU使用量(IO Wait)           | %                  |
| CPU使用量(Nice)              | %                  |
| CPU使用量(System)            | %                  |
| CPU使用量(User)              | %                  |
| Load Average 1M            |                    |
| Load Average 5M            |                    |
| Load Average 15M           |                    |
| メモリ使用量                  | %                  |
| メモリ使用量(バイト)               | MB                 |
| メモリ空き容量(バイト)               | MB                 |
| メモリバッファ(バイト)                | MB                 |
| キャッシュされたメモリ(バイト)               | MB                 |
| スワップ使用量                   | MB                 |
| スワップ全体サイズ                 | MB                 |
| Storage使用量              | %                  |
| Storage残り使用量           | MB                 |
| Storage IO Read            | KB/sec             |
| Storage IO Write           | KB/sec             |
| データストレージ障害               | 異常: 0、正常: 1      |
| Network in BPS             | KB/sec             |
| Network out BPS            | KB/sec             |
| Database Connection Status | 接続不可: 0、接続可能: 1 |
| Queries Per Second         | counts/sec         |
| Lock Tables                | counts/sec         |
| Cache Hit Ratio            | %                  |
| Idle Connection            | counts/sec         |
| Active Connection          | counts/sec         |
| Total Connection           | counts/sec         |
| Fetched Tuple Count        | counts/sec         |
| Returned Tuple Count       | counts/sec         |
| Inserted Tuple Count       | counts/sec         |
| Updated Tuple Count        | counts/sec         |
| Deleted Tuple Count        | counts/sec         |
| Transaction Commit         | counts/sec         |
| Transaction Rollback       | counts/sec         |
| Deadlock                   | counts/sec         |
| Conflict                   | counts/sec         |

### 監視設定の追加

![notification-group-watchdog](https://static.toastoven.net/prod_rds_postgres/20240611/notification-group-watchdog-ko.png)

❶ **監視設定**を押すと、監視設定を変更できるポップアップ画面が表示されます。
❷ **+ 監視設定の追加**を押して、新規監視設定を追加します。
❸監視する項目と比較方法、しきい値、持続時間を入力した後、**追加**をクリックします。

### 監視設定の変更及び削除

❹ボタンをクリックすると、追加された監視設定を変更できます。
❺ボタンをクリックすると、追加された監視設定を削除できます。
