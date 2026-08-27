<!-- machine_translated: true -->

<!-- pre-align:aligned sig=207aa7fc4e38 -->

<a id="database-rds-for-postgresql-db-instances"></a>
## Database > RDS for PostgreSQL > DBインスタンス { #database-rds-for-postgresql-db-instances }

<a id="db-instance"></a>
## DBインスタンス { #db-instance }

DBインスタンスは仮想マシンとインストールされたPostgreSQLを包含する概念で、RDS for PostgreSQLが提供するPostgreSQLの単位です。
DBインスタンスのOSに直接アクセスすることはできず、DBインスタンス作成時に入力したポートを介してのみデータベースにアクセスできます。使用できるポートの範囲は5432～45432です。

DBインスタンスは、ユーザーが付与する名前と自動で付与される32バイトのIDで識別されます。
DBインスタンスの名前には以下の制約事項があります。

* DBインスタンス名は、リージョンごとに一意でなければなりません。
* DBインスタンス名は、1～100文字の英数字、数字、一部の記号(-, _, .)しか使用できず、最初の文字は英数字のみ使用できます。

<a id="create-db-instance"></a>
## DBインスタンス作成 { #create-db-instance }

次の設定でDBインスタンスを作成できます。

<a id="availability-zone"></a>
### アベイラビリティゾーン { #availability-zone }

NHN Cloudは、物理的なハードウェアの問題で発生する障害に備えるため、システム全体を複数のアベイラビリティゾーンに分けています。このアベイラビリティゾーンごとに、ストレージシステム、ネットワークスイッチ、ラック、電源装置がすべて別々に構成されています。一つのアベイラビリティゾーン内で発生する障害は他のアベイラビリティゾーンに影響を与えないため、サービス全体の可用性が高くなります。DBインスタンスを複数のアベイラビリティゾーンに分けて構築すれば、サービスの可用性をさらに高めることができます。複数のアベイラビリティゾーンに分散して作成されたDBインスタンス同士でネットワーク通信が可能で、この時発生するネットワーク使用費用は請求されません。

!!! danger "注意"
    作成済みのDBインスタンスの可用性ゾーンは変更することはできません。

<a id="db-engine"></a>
### DBエンジン { #db-engine }

下記のバージョンを使用できます。

| バージョン            | 備考 |
|---------------------|-------------------------------|
| <strong>17</strong> |                               |
| PostgreSQL 17.10    |                               |
| PostgreSQL 17.6     |                               |
| PostgreSQL 17.4     |                               |
| PostgreSQL 17.2     | 新規に作成したり、Read Replica を追加したりすることはできません。 |
| <strong>14</strong> |                               |
| PostgreSQL 14.23    |                               |
| PostgreSQL 14.19    |                               |
| PostgreSQL 14.17    |                               |
| PostgreSQL 14.15    | 新規に作成したり、Read Replica を追加したりすることはできません。 |
| PostgreSQL 14.6     | 新規に作成したり、Read Replica を追加することはできません。 |

DBエンジンは、作成後にコンソールの修正機能でバージョンをアップグレードできます。
DBエンジンに関する詳細は、[DBエンジン](db-engine/)で確認できます。

<a id="db-instance-type"></a>
### DBインスタンスタイプ { #db-instance-type }

DBインスタンスは、タイプによってCPUコア数とメモリ容量が異なります。
DBインスタンスを作成する際、データベースのワークロードに応じて適切なDBインスタンスタイプを選択する必要があります。

| タイプ | 説明                                                    |
|-----|-------------------------------------------------------|
| m2  | CPUとメモリをバランスよく設定したタイプです。                              |
| c2  | CPUの性能を高く設定したインスタンスタイプです。                             |
| r2  | のリソースに比べ、メモリ使用量が多い場合に使用できます。                          |
| x1  | 高スペックのCPUとメモリをサポートするタイプです。高性能が必要なサービスやアプリケーションに使用します。 |

既に作成したDBインスタンスのタイプはコンソールから簡単に変更可能です。

!!! danger "注意"
    作成済みのDBインスタンスのタイプを変更すると、DBインスタンスが停止するため、数分間のダウンタイムが発生します。

<a id="data-storage"></a>
### データストレージ { #data-storage }

データストレージにデータベースのデータファイルを保存します。DBインスタンスはHDD、SSDの2種類のデータストレージタイプをサポートします。データストレージのタイプによって性能と価格が異なるため、データベースのワークロードに応じて適切なタイプを選択する必要があります。データストレージは20GB～2TBで作成できます。

!!! danger "注意"
    すでに作成したDBインスタンスのデータストレージの種類は変更することはできません。

!!! tip "ヒント"
    データストレージを 2TB 以上使用するには、NHN Cloud カスタマーサポートにお問い合わせください。

以下の作業は、データストレージのI/O容量を使用するため、進行中にDBインスタンスの性能が低下する可能性があります。

* 単一DBインスタンスのバックアップ
* 単一DBインスタンスの高可用性構成
* Read Replica 作成
* Read Replica 再構築
* Standby 再構築
* 特定の時点への復元
* 単一DBインスタンスでバックアップ後、オブジェクトストレージへのバックアップファイルのエクスポート

<a id="high-avilability"></a>
### 高可用性 { #high-avilability }

高可用性DBインスタンスは、可用性とデータ耐久性を向上させ、フォールトトレラントなデータベースを提供します。高可用性DBインスタンスは Primary と Standby で構成され、それぞれ異なるアベイラビリティゾーンに作成されます。Standby は障害に備えた DB インスタンスであり、通常は使用できません。高可用性DBインスタンスは Standby でバックアップが実行されるため、バックアップによるパフォーマンスの低下を回避できます。高可用性DBインスタンスが提供するさまざまな機能は、[高可用性DBインスタンス](#high-availability-db-instance)で確認できます。

<a id="information"></a>
### 情報 { #information }

DBインスタンスの基本情報を設定します。DBインスタンス名、説明、DBポートと基本的に作成するユーザー情報を入力できます。
入力したユーザーIDはDDL権限で作成されます。

**READ**
* データを参照する権限のみ持っています。

**CRUD**
* 照会権限を含み、データを変更する権限を持っています。

**DDL**
* CRUD権限を含み、DDLクエリを実行できる権限を持っています。
* データベースやスキーマの所有者に設定できます。

<a id="floating-ip"></a>
### Floating IP { #floating-ip }

外部からDBインスタンスにアクセスするには、インターネットゲートウェイが接続されたサブネットを使用する場合に限り、フローティングIPを作成できます。フローティングIPは使用と同時に課金され、これとは別にフローティングIPを介したインターネット方向のトラフィックが発生した場合は別途課金されます。

<a id="parameter-group"></a>
### パラメータグループ { #parameter-group }

パラメータグループは、DBインスタンスにインストールされたデータベースを設定できるパラメータの集合です。DBインスタンス作成時に必ず一つのパラメータグループを選択する必要があります。パラメータグループは、作成後も自由に変更できます。詳細は[パラメータグループ](parameter-group/)の項目を参照してください。

<a id="db-security-group"></a>
### DBセキュリティグループ { #db-security-group }

DBセキュリティグループは、外部からの侵入に備えて接続を制限するために使用します。送受信トラフィックのうち、特定のポート範囲またはデータベースポートへのアクセスを許可できます。DBインスタンスに複数のDBセキュリティグループを適用できます。詳細は[DBセキュリティグループ](db-security-group/)の項目を参照してください。

<a id="backup"></a>
### バックアップ { #backup }
DBインスタンスのデータベースを定期的にバックアップするよう設定したり、コンソールで任意のタイミングにバックアップを作成したりできます。バックアップの実行中は、パフォーマンスが低下する場合があります。サービスへの影響を避けるため、サービスの負荷が少ない時間帯にバックアップを実行することをお勧めします。バックアップによるパフォーマンス低下を回避するには、高可用性構成を使用するか、Read Replica でバックアップを実行できます。バックアップファイルは内部バックアップストレージに保存され、バックアップ容量に応じて課金されます。必要に応じて、NHN Cloud のユーザーオブジェクトストレージにエクスポートできます。予期しない障害に備えて、定期的にバックアップを実行するよう設定することをお勧めします。詳細については、「[バックアップおよび復元](backup-and-restore/)」を参照してください。

<a id="maintenance"></a>
### メンテナンス { #maintenance }

定期的に DB インスタンスの安定化に役立つ作業を実行するように設定します。ファイル I/O を使用する場合、メンテナンス作業の実行中にパフォーマンスが低下する可能性があります。サービスに影響を与えないよう、サービスの負荷が少ない時間帯に自動メンテナンス作業を実行することをお勧めします。
メンテナンス作業が必要な場合、設定した時間に DB インスタンスグループ内のすべての DB インスタンスで実行されます。

<a id="maintenance-enable-auto-storage-cleanup"></a>
#### 自動ストレージ整理を使用する

サービスの動作に影響を与えない、保管されたトランザクションログ(Archived Write Ahead Log)をクリーンアップします。サービスの動作に影響を与えない保管されたトランザクションログとは、自動バックアップを使用して現在時点まで復元する際に使用されないログのことです。

<a id="default-notification"></a>
### 基本通知 { #default-notification }

DBインスタンスの作成時にデフォルトのアラートを設定できます。デフォルトのアラートを設定すると `{DBインスタンス名}-default` という名前で新しい通知グループが作成され、次のアラート項目が自動的に設定されます。デフォルトのアラートとして作成された通知グループは、自由に修正、削除できます。詳細な説明は、[通知グループ](notification/)の項目を参照してください。

| 項目                         | 比較方法  | しきい値    | 持続時間 |
|----------------------------|-------|---------|------|
| CPU使用率                     | &gt;= | 80%     | 5分   |
| Storage残り使用量               | &lt;= | 5,120MB | 5分   |
| Database Connection Status | &lt;= | 0       | 0分   |
| Storage使用量                 | &gt;= | 95%     | 5分   |
| データストレージの障害                | &lt;= | 0       | 0分   |
| Connection Ratio           | &gt;= | 85%     | 5分   |
| メモリ使用量                     | &gt;= | 90%     | 5分   |

<a id="db-instances"></a>
## DBインスタンス一覧 { #db-instances }

コンソールで作成されたDBインスタンスを確認できます。DBインスタンスグループ単位でまとめて見たり、個々のDBインスタンスで見ることができます。

![db-instance-list-basic](../static/images/20260609/db-instance-list-basic-ja.png)

❶ DBインスタンス画面モードを変更できます。
❷南京錠アイコンをクリックすると、削除保護設定を変更できます。
❸最近収集されたモニタリング指標を表示します。
❹現在の状態を確認できます。
❺進行中の作業がある場合、スピナーが表示されます。
❻検索条件を変更できます。

DBインスタンスの状態は以下のような値で構成され、ユーザーの行為と現在の状態によって変更されます。

| 状態                | 説明   |
|-------------------|------|
| BEFORE_CREATE     | 作成前  |
| AVAILABLE         | 使用可能 |
| STORAGE_FULL      | 容量不足 |
| FAIL_TO_CREATE    | 作成失敗 |
| FAIL_TO_CONNECT   | 接続失敗 |
| REPLICATION_DELAY | 複製遅延 |
| REPLICATION_STOP  | 複製中断 |
| SHUTDOWN          | 停止   |

変更できる検索条件は次のとおりです。

![db-instance-list-filter](../static/images/20260609/db-instance-list-filter-ja.png)

❶ DBインスタンスの状態をフィルタリング条件として検索できます。
❷アベイラビリティゾーンをフィルタリング条件として検索できます。

<a id="db-instance-details"></a>
## DBインスタンス詳細 { #db-instance-details }

DBインスタンスを選択すると、詳細情報を確認できます。

![db-instance-detail-basic](../static/images/20260609/db-instance-detail-basic-ja.png)

❶接続情報のドメインをクリックすると、IPアドレスを確認できるポップアップウィンドウが表示されます。
❷ DBセキュリティグループをクリックすると、DBセキュリティルールを確認できるポップアップウィンドウが表示されます。
❸パラメータグループをクリックすると、パラメータを確認できる画面に移動します。
❹マウスでドラッグ＆ドロップして、詳細情報パネルの高さを調節できます。
❺詳細情報パネルの高さをあらかじめ指定した高さに調整できます。

<a id="connection-information"></a>
### 接続情報 { #connection-information }

DBインスタンスの作成時に内部ドメインが発行されます。内部ドメインは、ユーザーの VPC サブネットに属する IP アドレスを指します。高可用性DBインスタンスでは、フェイルオーバーが発生して Standby が新しい Primary に変更されても、内部ドメインは変更されません。そのため、特別な理由がない限り、アプリケーションの接続情報には必ず内部ドメインを使用する必要があります。

フローティングIPを作成した場合、外部ドメインを追加で発行します。外部ドメインはフローティングIPのアドレスを指します。外部ドメインまたはフローティングIPは外部からアクセス可能であるため、DBセキュリティグループのルールを適切に設定してDBインスタンスを保護する必要があります。

<a id="log"></a>
### ログ { #log }

DBインスタンスの**ログ**タブでは、各種ログファイルの閲覧や、ダウンロードを行うことができます。ログファイルは下記のように決められた設定でローテーションされます。一部のログファイルは、パラメータグループで有効または無効にできます。

| 項目             | ローテーション設定 | 変更するかどうか | 
|----------------|-----------|----------|
| postgresql.log | 100MB 40個 | 固定       |
| backup.log     | 毎日10個     | 固定       |

![db-instance-detail-log](../static/images/20260609/db-instance-detail-log-ja.png)

❶ **ログ表示**をクリックすると、ログファイルの内容を確認できるポップアップウィンドウが表示されます。最大65,535Bytesのログを確認できます。
❷ **インポート**をクリックすると、DBインスタンスのログファイルをダウンロードできるようにリクエストします。
❸ダウンロードの準備が整うと、**ダウンロード**ボタンが表示されます。クリックすると、ログをダウンロードします。

!!! tip "ヒント"
    **[インポート]** をクリックすると、約 5 分間ログファイルがバックアップストレージにアップロードされ、ログファイルのサイズ分のバックアップストレージ容量が課金されます。
    **[ダウンロード]** をクリックすると、ログファイルのサイズ分のインターネットトラフィックが課金されます。

<a id="database-user"></a>
### データベース&ユーザー { #database-user }

DBインスタンスの**データベース＆ユーザー**タブでは、DBエンジンに作成されたデータベースとユーザーを照会および制御できます。

<a id="database-user-create-a-database"></a>
#### データベースの作成

![db-instance-detail-db-create](../static/images/20260811/db-instance-detail-db-create-ja.png)

❶ **+ 作成**をクリックすると、データベースの名前を入力できるポップアップウィンドウが表示されます。
❷データベース名を入力した後、**作成**をクリックしてデータベースを作成できます。
❸ DDLユーザーを選択し、所有者に設定できます。
❹ 接続権限を付与するユーザーを選択すると、データベースに接続できる権限が付与されます。

データベース名には以下のような制約があります。

* 1～63文字まで、引用符(',")を除いた文字のみ使用できます。
* `postgres` `information_schema` `performance_schema` `repmgr` `db_helper` `sys` `mysql` `rds_maintenance` `pgpool` `nsight` `watchdog` `barman` `rman`はデータベース名に使用できません。

<a id="database-user-modify-database"></a>
#### データベースの修正

![db-instance-detail-db-modify](../static/images/20260811/db-instance-detail-db-modify-ja.png)

❶修正するデータベース行の**修正**をクリックすると、データベース情報を修正できるポップアップウィンドウが表示されます。
❷ DDLユーザーを選択し、所有者に設定できます。
❸ 接続権限を付与するユーザーを選択すると、データベースに接続できる権限が付与されます。
❹ **変更予定のアクセス制御を即時適用**をチェックすると、アクセス制御ルールにも修正事項が即時適用されます。
❺ **修正**をクリックし、修正をリクエストできます。

<a id="database-user-synchronize-database"></a>
#### データベースの同期

![db-instance-detail-db-sync](../static/images/20260609/db-instance-detail-db-sync-ja.png)

❶ **同期**をクリックすると、**同期確認**ポップアップウィンドウが表示されます。
❷ **確認**をクリックして同期をリクエストできます。

<a id="database-user-delete-database"></a>
#### データベースの削除

![db-instance-detail-db-delete](../static/images/20260609/db-instance-detail-db-delete-ja.png)

❶削除するデータベースを選択し、**削除**をクリックすると、削除確認ポップアップウィンドウが表示されます。
❷ **削除**をクリックして削除をリクエストできます。

<a id="database-user-modify-schema"></a>
#### スキーマ修正

![db-instance-detail-schema-modify](../static/images/20260811/db-instance-detail-schema-modify-ja.png)

❶ 修正するスキーマ行の**修正**をクリックすると、スキーマ情報を修正できるポップアップウィンドウが表示されます。
❷ DDLユーザーを選択し、所有者に設定できます。
❸ クエリ権限を付与するユーザーを選択すると、そのユーザーの権限に応じてスキーマクエリ権限が付与されます。
❹ **修正**をクリックし、修正をリクエストできます。

<a id="database-user-create-a-user"></a>
#### ユーザーの作成

![db-instance-detail-user-create](../static/images/20260811/db-instance-detail-user-create-ja.png)

❶ **+ 作成**をクリックすると、ユーザー追加ポップアップウィンドウが表示されます。
❷ユーザーIDを入力します。

ユーザーIDには以下のような制約があります。

* 1～63文字まで、引用符(',")を除いた文字のみ使用できます。
* `postgres` `repmgr` `barman` `rman` `pgpool` `nsight` `watchdog` `dba` `manager` `mysql.session` `mysql.sys` `mysql.infoschema` `sqlgw` `admin` `etladm` `alertman` `prom` `rds_admin` `rds_mha` `rds_repl` `mariadb.sys`はユーザーIDとして使用できません。

❸パスワードを入力します。

パスワードには以下の制約があります。

* 1～100文字まで、引用符(',")を除く文字のみ使用できます。

❹ユーザーに付与する権限を選択します。付与できる権限と説明は次のとおりです。

**READ**
* データを参照する権限のみ持っています。

**CRUD**
* 照会権限を含み、データを変更する権限を持っています。

**DDL**
* CRUD権限を含み、DDLクエリを実行できる権限を持っています。
* データベースやスキーマの所有者に設定できます。

❺作成するユーザーに全データベースへのアクセス権を与えるための基本アクセス制御ルールを追加するように設定できます。基本アクセス制御ルールを追加しない場合、別途のアクセス制御ルールを設定すると、データベースへのアクセスが可能です。

<a id="database-user-modify-a-user"></a>
#### ユーザーの修正

![db-instance-detail-user-modify](../static/images/20260811/db-instance-detail-user-modify-ja.png)

❶修正するユーザー行の**修正**をクリックすると、ユーザー情報を修正できるポップアップウィンドウが表示されます。
❷パスワードを入力しないと変更されません。
❸ **変更予定アクセス制御即時適用**をチェックすると、アクセス制御ルールにも修正内容が即時適用されます。

<a id="database-user-synchronize-user"></a>
#### ユーザーの同期

![db-instance-detail-user-sync](../static/images/20260609/db-instance-detail-user-sync-ja.png)

❶ **同期**をクリックすると、**同期確認**ポップアップウィンドウが表示されます。
❷ **確認**をクリックして同期をリクエストできます。

<a id="database-user-delete-a-user"></a>
#### ユーザーの削除

![db-instance-detail-user-delete](../static/images/20260609/db-instance-detail-user-delete-ja.png)

❶削除するユーザーを選択し、ドロップダウンメニューをクリックします。
❷ **削除**をクリックすると、**削除確認**ポップアップウィンドウが表示されます。**確認**をクリックして削除をリクエストできます。

![db-instance-detail-user-delete-with-option](../static/images/20260609/db-instance-detail-user-delete-with-option-ja.png)

❶ 削除するユーザーが所有するオブジェクトがある場合、下部に追加オプションが表示されます。選択できるオプションと説明は次の通りです。

> [注意]
> 保有しているバックアップがない場合、復旧できませんので慎重に選択してください。

!!! danger "注意"
    バックアップがない場合は復旧できないため、慎重に選択してください。

**オブジェクト所有権の移譲**
* 所有するすべてのオブジェクトを選択したユーザーに移譲してから削除します。
* 移譲先はDDLユーザーのみ選択できます。
* オブジェクトの移譲操作にはデータベースも含まれます。

❷ **所有オブジェクト確認**をクリックすると、**所有オブジェクト確認**ポップアップウィンドウが表示されます。
❸ ボタンをクリックすると、削除対象から除外できます。
❹ **削除**をクリックすると、**削除確認**ポップアップウィンドウが表示されます。**確認**をクリックし、削除をリクエストできます。

<a id="access-control"></a>
### アクセス制御 { #access-control }

DBインスタンスの**アクセス制御**タブでは、特定のデータベースとユーザーに対するDBエンジンのアクセスルールを照会及び制御できます。ここで設定したルールは`pg_hba.conf`ファイルに適用されます。

![db-instance-detail-hba](../static/images/20260609/db-instance-detail-hba-ja.png)

❶アクセス制御ルールの適用状態を確認できます。
❷進行中の作業があれば、スピナーが表示されます。
❸検索キーワードを入力して検索できます。

アクセス制御の状態は以下のような値で構成され、ユーザーの行為と現在の状態に基づいて変更されます。

| 状態      | 予約状態   | 説明         |
|---------|--------|------------|
| CREATED | CREATE | 作成予約(適用必要) |
| CREATED | MODIFY | 修正予約(適用必要) |
| CREATED | DELETE | 削除予約(適用必要) |
| APPLIED | NONE   | 適用済み       |
| -       | -      | 適用不可       |

!!! tip "ヒント"
    特定のデータベースとユーザーを選択して追加したルールの対象がすべて削除された場合、適用不可の状態として表示され、設定ファイルには適用されません。

<a id="access-control-add-access-control-rules"></a>
#### アクセス制御ルールの追加

![db-instance-detail-hba-create](../static/images/20260609/db-instance-detail-hba-create-ja.png)

❶ **+ 作成**をクリックすると、**アクセス制御ルールの追加**ポップアップウィンドウが表示されます。
❷ 入力方式で**基本**を選択すると、DBインスタンスに保存されたデータベースやユーザーを指定してルールを追加できます。
❸ ルールの適用対象を全ての対象にするか、特定のデータベースやユーザーを選択して指定できます。
❹ルールを適用する接続アドレスをCIDR形式で入力します。
❺認証方法を選択します。RDS for PostgreSQLでサポートする認証方式は次のとおりです。

| 認証方式                 | DBエンジン設定値     | 説明                                                    |
|----------------------|---------------|-------------------------------------------------------|
| 信頼(パスワード不要)          | trust         | パスワードや他の認証なしですべての接続を許可します。                            |
| 接続ブロック               | reject        | 全ての接続を遮断します。                                          |
| パスワード(SCRAM-SHA-256) | scram-sha-256 | **データベース&ユーザー**タブで設定したパスワードでSCRAM-SHA-256認証を行うようにします。 |

❻上/下矢印ボタンでルールを適用する順序を調整します。
- アクセス制御ルールは上から順番に適用され、先に適用されたルールが優先されます。
- 上部に登録されたアクセス許可ルールが先に適用されると、下部にアクセス遮断ルールがあってもアクセスが許可されます。
- 逆に、下部にアクセス許可ルールがあっても、上段に登録されたアクセス遮断ルールが先に適用されている場合はアクセスができません。
❼ 設定が完了した後、**変更事項の適用**をクリックしてDBインスタンスにアクセス制御設定を適用します。
❽ DBインスタンスに適用されると、ステータスが**適用済み**に変更されます。

![db-instance-detail-hba-create-by-text](../static/images/20260609/db-instance-detail-hba-create-by-text-ja.png)

❶ 入力方式で**ルール原文で一括追加**を選択すると、`pg_hba.conf`の記述をそのまま入力してルールを一括追加できます。
❷ コメントを含む`pg_hba.conf`の記述をそのまま使用できます。詳細は[PostgreSQLのホームページ](https://www.postgresql.org/docs/17/auth-pg-hba-conf.html)をご参照ください。

<a id="access-control-modify-access-control-rules"></a>
#### アクセス制御ルールの修正

![db-instance-detail-hba-modify](../static/images/20260609/db-instance-detail-hba-modify-ja.png)

❶修正するアクセス制御ルール行の**修正**をクリックすると、既存の情報を修正できるポップアップウィンドウが表示されます。
❷修正したルールは**変更事項の適用**をクリックしてDBインスタンスにアクセス制御設定を適用する必要があります。

<a id="access-control-delete-access-control-rules"></a>
#### アクセス制御ルールの削除

![db-instance-detail-hba-delete](../static/images/20260609/db-instance-detail-hba-delete-ja.png)

❶ 削除するアクセス制御ルールを選択し、**削除**をクリックすると、**削除確認**ポップアップが表示されます。
❷ 削除したルールは、**変更の適用**をクリックしてDBインスタンスにアクセス制御設定を適用する必要があります。

<a id="extension"></a>
### 拡張機能管理 { #extension }

DBインスタンスの**拡張管理**タブでは、SUPERUSER権限が必要な拡張機能を照会及び制御できます。

<a id="extension-install-extensions"></a>
#### 拡張機能のインストール

![db-instance-detail-extension-install](../static/images/20260609/db-instance-detail-extension-install-ja.png)

❶ **インストール**をクリックすると、選択した拡張機能をインストールするデータベースを選択できるポップアップウィンドウが表示されます。
❷ **強制インストール**をチェックすると、依存関係にある拡張機能を強制的にインストールします。
❸ インストールするデータベースを選択した後、**確認**をクリックするとインストール作業が予約されます。
❹ **キャンセル**をクリックすると、予約された作業をキャンセルできます。
❺ **変更事項適用**をクリックしてDBインスタンスに拡張機能をインストールします。

<a id="extension-delete-extensions"></a>
#### 拡張機能の削除

![db-instance-detail-extension-delete](../static/images/20260609/db-instance-detail-extension-delete-ja.png)

❶ 削除するデータベースの行で**削除**をクリックすると、**削除確認**ポップアップウィンドウが表示されます。
❷ **強制削除**をチェックすると、依存関係にある拡張機能を強制的に削除します。
❸ **削除**をクリックすると削除作業が予約されます。
❹ **キャンセル**をクリックすると、予約された作業をキャンセルできます。
❺ **変更事項適用**をクリックしてDBインスタンスにインストールされた拡張機能を削除します。

<a id="extension-synchronize-extensions"></a>
#### 拡張機能の同期

![db-instance-detail-extension-sync](../static/images/20260609/db-instance-detail-extension-sync-ja.png)

❶ **同期**をクリックすると、**同期確認** ポップアップウィンドウが表示されます。
❷ **確認**をクリックして同期をリクエストできます。

<a id="modify-db-instance"></a>
## DBインスタンスの修正 { #modify-db-instance }

コンソールで作成されたDBインスタンスの様々な項目を簡単に変更できます。変更をリクエストした項目は、順次DBインスタンスに適用されます。適用過程で再起動が必要な場合、全ての変更を適用した後にDBインスタンスを再起動します。変更不可能な項目と再起動が必要な項目は次のとおりです。

| 項目            | 変更可否 | 再起動が必要かどうか             |
|---------------|------|------------------------|
| アベイラビリティゾーン   | いいえ  |                        |
| DBバージョン       | はい   | はい                     |
| DBインスタンスタイプ   | はい   | はい                     |
| データストレージの種類   | いいえ  |                        |
| データストレージサイズ   | はい   | はい                     |
| 高可用性          | はい   | いいえ                    |
| Ping 間隔       | はい   | いいえ                    |
| フェイルオーバー待機時間  | はい   | いいえ                    |
| 名前            | はい   | いいえ                    |
| 説明            | はい   | いいえ                    |
| DBポート         | はい   | はい                     |
| VPCサブネット      | いいえ  |                        |
| Floating IP   | はい   | いいえ                    |
| パラメータグループ     | はい   | 変更されたパラメータの再起動可否によって決定 |
| DBセキュリティグループ  | はい   | いいえ                    |
| バックアップ設定      | はい   | いいえ                    |
| ストレージ自動拡張      | はい      | いいえ                     |
| データベース&ユーザー制御 | はい   | いいえ                    |
| アクセス制御        | はい   | いいえ                    |

高可用性DBインスタンスは    、再起動が必要な項目の変更があると、安定性を高めてダウンタイムを短縮するために障害調査を利用した再起動機能を提供します。

![modify-ha-popup](../static/images/20260414/modify-ha-popup-ja.png)

フェイルオーバーを利用した再起動を使用しない場合、PrimaryとStandbyに変更内容を順次適用した後、DBインスタンスを再起動します。詳細については、高可用性DBインスタンスの[手動フェイルオーバー](#manual-failover)を参照してください。

<a id="database-user-control"></a>
### データベースユーザー制御 { #database-user-control }

RDS for PostgreSQL では、データベースとユーザーを簡単に管理できるようにコンソールで管理機能を提供していますが、ユーザーが直接制御できるように設定する機能も提供しています。直接制御を使用すると、現在作成されているすべての DDL ユーザーに `CREATEDB`、`CREATEROLE` 権限を付与します。既存ユーザーの権限を DDL で変更する場合や、新規作成時にも同様に付与します。

!!! tip "ヒント"
    直接作成したユーザーにRDSで管理する権限が付与されていない場合、**CUSTOM** 権限として表示されます。

<a id="delete-db-instance"></a>
## DBインスタンスの削除 { #delete-db-instance }

使用しなくなった DB インスタンスは削除できます。Primary を削除すると、該当する複製グループに属する Read Replica も一緒に削除されます。削除された DB インスタンスは復元できないため、重要な DB インスタンスは削除保護設定を有効にすることをお勧めします。

<a id="backup-2"></a>
## バックアップ { #backup-2 }

障害状況に備えて、DBインスタンスのデータベースを復旧できるように事前に準備できます。必要なときにコンソールでバックアップを実行したり、定期的にバックアップが実行されるように設定できます。詳細は、[バックアップ](backup-and-restore/#backup)を参照してください。

<a id="restoration"></a>
## 復元 { #restoration }

バックアップを利用して希望の時点にデータを復元できます。復元時は常に新しいDBインスタンスが作成され、既存のDBインスタンスに復元することはできません。詳細は[復元](backup-and-restore/#restore)の項目を参照してください。

<a id="secure-capacity"></a>
## 容量の確保 { #secure-capacity }

急激な負荷によりWALログが過剰に作成され、データストレージの容量が不足した場合、コンソールの容量確保機能を利用してWALログを削除できます。コンソールで容量確保を選択すると、DBインスタンスのWALログを選択できるポップアップが表示されます。WALログを選択して**OK**をクリックすると、選択した項目以前に作成された全てのWALログが削除されます。容量確保機能は一時的に容量を確保するものです。継続して容量が不足する場合は、サービスの負荷に合わせてデータストレージのサイズを拡張する必要があります。

!!! danger "注意"
    削除されたWALログによっては、特定の時点への復元ができない場合があります。

<a id="auto-scale-storage"></a>
## 自動ストレージ拡張 { #auto-scale-storage }

DBインスタンスのデータストレージサイズを自動的に拡張できます。自動ストレージ拡張を使用すると、データストレージの容量が不足した際に自動的に拡張され、データベースの可用性を維持できます。

自動ストレージ拡張を使用するには、DBインスタンスの作成及び修正時に**自動ストレージ拡張**を有効にする必要があります。

自動ストレージ拡張を有効にすると、3つのオプションを設定できます。
* 自動ストレージ拡張の条件：ストレージ使用率が設定値以上で5分以上継続した場合、自動的にストレージを拡張します。
* 自動ストレージ拡張の最大値：自動ストレージ拡張によって拡張できる最大サイズです。
* 自動ストレージ拡張のクールダウン: 自動ストレージ拡張機能が1回実行された後、再び機能が有効になるまでの時間を設定します。

自動ストレージ拡張機能が実行される際の増加量は、以下のうち最も大きい値に設定されます。
* 10GB
* ストレージサイズの10%
* 直前1時間のデータストレージ使用量の増加分 * クールダウン(時間換算)

<a id="apply-parameter-group-changes"></a>
## パラメータグループ変更事項の適用 { #apply-parameter-group-changes }

DBインスタンスに接続されたパラメータグループの設定が変更されても、この変更はDBインスタンスに自動的に適用されません。もし、DBインスタンスに適用されたパラメータと接続されたパラメータグループの設定が異なる場合、コンソールに**パラメータ**ボタンが表示されます。

次のいずれかの方法を使用してDBインスタンスにパラメータグループの変更を適用できます。

![db-instance-list-apply-parameter-group](../static/images/20260609/db-instance-list-apply-parameter-group-ja.png)

❶対象DBインスタンスの **パラメータ**をクリックするか
❷対象DBインスタンスを選択した後、ドロップダウンメニューから**パラメータグループの変更内容を適用**メニューをクリックします。

パラメータグループで再起動が必要なパラメータが変更された場合、変更内容を適用する過程でDBインスタンスが再起動されます。

![db-instance-list-apply-parameter-group-popup](../static/images/20260609/db-instance-list-apply-parameter-group-popup-ja.png)

❶ **変更事項の比較**をクリックして変更されたパラメータを確認できます。
❷変更事項を確認した後、**確認**をクリックしてDBインスタンスに変更されたパラメータを適用します。

![db-instance-list-apply-parameter-group-compare-popup](../static/images/20260609/db-instance-list-apply-parameter-group-compare-popup-ja.png)

<a id="export-backup-files-to-object-storage-after-backup"></a>
## バックアップ後、オブジェクトストレージへのバックアップファイルのエクスポート { #export-backup-files-to-object-storage-after-backup }

<!-- TODO: translate body -->

<a id="restore-using-backup-in-object-storage"></a>
## オブジェクトストレージにあるバックアップからの復元 { #restore-using-backup-in-object-storage }

<!-- TODO: translate body -->

<a id="read-replica"></a>
## リードレプリカ { #read-replica }

読み取りパフォーマンスを向上させるために、読み取り専用として使用できるRead Replicaを作成できます。Read Replicaは、1つのPrimaryに対して最大5台まで作成できます。Read ReplicaのRead Replicaは作成することはできません。

<a id="create-read-replica"></a>
### リードレプリカの作成 { #create-read-replica }

リードレプリカを作成するには、レプリケーショングループに属するDBインスタンスで作成されたバックアップファイルが必要です。バックアップファイルがない場合は、次の手順に従って、バックアップを実行するDBインスタンスを選択します。

❶ 自動バックアップを設定した Read Replica
❷ 自動バックアップを設定した Primary

条件に合うDBインスタンスが存在しない場合、Read Replica の作成リクエストは失敗します。

!!! danger "注意"
    Primaryのデータベースサイズに比例して、Read Replicaの作成時間が長くなる場合があります。
    バックアップが実行されているDBインスタンスの場合、Read Replica作成の過程でストレージI/Oのパフォーマンスが低下する場合があります。

!!! tip "ヒント"
    Read Replica の作成プロセスに必要なデータストレージのサイズ分、バックアップストレージの料金が発生する場合があります。

リードレプリカを作成するには、コンソールで

![db-instance-list-replica-create](../static/images/20260609/db-instance-list-replica-create-ja.png)

❶ 元のDBインスタンスを選択した後、**[リードレプリカ作成]** をクリックすると、Read Replica を作成するためのページに移動します。

次の設定でRead Replicaを作成できます。

<a id="create-read-replica-items-unavailable-to-change"></a>
#### 変更不可項目

リードレプリカを作成する際、次に挙げる項目は元のDBインスタンスの設定に従うため、変更することはできません。

* DBエンジン
* データストレージの種類
* ユーザーVPCサブネット

<a id="create-read-replica-read-replica-region"></a>
#### リードレプリカのリージョン

Read Replicaを作成するリージョンを選択する際、リージョンピアリングをサポートしている場合、異なるリージョンに存在するVPC間のリージョンピアリングを接続することで、別のリージョンのVPCに属するサブネットにRead Replicaを作成できます。ただし、元のDBインスタンスのリージョンとは異なるリージョンを選択した場合、レプリケーション遅延が発生する可能性があり、DBバージョンのアップグレードはサポートされていません。

!!! danger "注意"
    リージョンピアリングが接続されていても、ルート設定が正しくない場合、Read Replica の作成に失敗したり、レプリケーションが中断されたりする可能性があります。

<a id="create-read-replica-availability-zone"></a>
#### アベイラビリティゾーン

Read Replica の Availability Zone を選択します。詳細については、「[Availability Zone](#availability-zone)」を参照してください。

<a id="create-read-replica-db-instance-type"></a>
#### DBインスタンスタイプ

Read Replica は Primary と同じスペックまたはそれ以上のスペックで作成することをお勧めします。低いスペックで作成した場合、レプリケーション遅延が発生する可能性があります。

<a id="create-read-replica-data-storage-size"></a>
#### データストレージサイズ

元のDBインスタンスと同じサイズで作成することを推奨します。サイズを小さく設定する場合、データストレージ容量不足で複製が中断される可能性があります。

<a id="create-read-replica-floating-ip"></a>
#### Floating IP

Read Replica のフローティング IP を使用するかどうかを選択します。詳細については、[フローティング IP](#floating-ip) を参照してください。

<a id="create-read-replica-parameter-group"></a>
#### パラメータグループ

Read Replica のパラメータグループを選択する際に、レプリケーション関連の設定変更が不要な場合は、元の DB インスタンスと同じパラメータグループを選択することをお勧めします。詳細については、「[パラメータグループ](parameter-group/)」を参照してください。

<a id="create-read-replica-db-security-group"></a>
#### DBセキュリティグループ

Read Replica に適用する DBセキュリティグループを選択します。レプリケーションに必要なルールは自動的に適用されるため、DBセキュリティグループに別途追加する必要はありません。詳細については、[DBセキュリティグループ](db-security-group/) を参照してください。

<a id="create-read-replica-backup"></a>
#### バックアップ

Read Replica のバックアップ設定を選択します。詳細については、「[バックアップおよび復元](backup-and-restore/)」を参照してください。

<a id="create-read-replica-default-notifications"></a>
#### 基本通知

基本通知を使用するかどうかを選択します。詳しい説明は、[基本通知](#default-notification)を参照してください。

<a id="create-read-replica-deletion-protection"></a>
#### 削除保護

削除保護を使用するかどうかを選択します。詳しい説明は[削除保護](#change-deletion-protection-settings)を参照してください。

<a id="promote-read-replica"></a>
### リードレプリカ昇格 { #promote-read-replica }

Primaryとのレプリケーション関係を解除し、Read Replicaを独立したPrimaryに切り替えるプロセスを昇格と呼びます。昇格されたPrimaryは、独立したDBインスタンスとして動作します。昇格を希望するRead ReplicaとPrimaryの間にレプリケーション遅延が存在する場合、その遅延が解消されるまで昇格は行われません。一度昇格したDBインスタンスは、以前のレプリケーション関係に戻すことはできません。

!!! danger "注意"
    Primary DBインスタンスの状態が正常でない場合は、昇格作業を実行することはできません。

<a id="force-promote-read-replicas"></a>
### リードレプリカの強制昇格 { #force-promote-read-replicas }

Primaryの状態に関係なく、Read Replicaの現時点のデータを基に強制昇格します。レプリケーションの遅延がある場合、待機時間を設定して遅延が解消されるまで待機させることができますが、遅延の解消有無に関係なく昇格が進行するため、データが失われる可能性があります。したがって、Read Replicaを緊急にサービスに投入する必要がある状況でない限り、この機能の使用はお勧めしません。

<a id="end-wait-for-replication-delay-during-read-replica-promotionforce-promotion"></a>
### リードレプリカ昇格/強制昇格中、複製遅延待機の終了 { #end-wait-for-replication-delay-during-read-replica-promotionforce-promotion }

リードレプリカの昇格または強制昇格中に複製遅延が解消されるまで待機している場合、待機作業を終了するには、コンソールで

![db-instance-list-stop-wait-replication-lag](../static/images/20260609/db-instance-list-stop-wait-replication-lag-ja.png)

❶ **複製遅延待機終了**をクリックすると、待機作業を終了することができるポップアップウィンドウが表示されます。
❷ **確認**をクリックして待機作業を終了します。

<a id="stop-replication-of-read-replicas"></a>
### リードレプリカの複製中断 { #stop-replication-of-read-replicas }

Read Replica は、さまざまな理由でレプリケーションが中断される可能性があります。Read Replica のステータスが `복제 중단` の場合、速やかに原因を確認し、正常化する必要があります。`복제 중단` 状態が長時間続く場合、レプリケーションの遅延が増加します。正常化に必要な WAL ログが存在しない場合は、Read Replica を再構築する必要があります。

<a id="rebuild-read-replica"></a>
### リードレプリカの再構築 { #rebuild-read-replica }

Read Replica の複製の問題を解決できない場合、再構築により正常な状態に復元できます。このプロセスでは、Read Replica のすべてのデータベースを削除し、Primary データベースをベースに新たに再構築します。再構築中は、Read Replica を使用することはできません。Read Replica を再構築するには、複製グループに属する DB インスタンスから作成されたバックアップファイルが必要です。バックアップファイルがない場合の動作および注意事項については、「[リードレプリカ作成](#create-read-replica)」を参照してください。

!!! tip "ヒント"
    再構築後も接続情報(ドメイン、IP)は変更されません。

<a id="restart-db-instances"></a>
## DBインスタンスの再起動 { #restart-db-instances }

PostgreSQLを再起動したい時、DBインスタンスを再起動できます。再起動時間を最小化するため、サービス負荷が低い時間帯に実行することを推奨します。

DBインスタンスの再起動を行うにはコンソールで

![db-instance-list-restart](../static/images/20260609/db-instance-list-restart-ja.png)

❶再起動したいDBインスタンスを選択した後、ドロップダウンメニューから**DBインスタンスの再起動**メニューをクリックします。

<a id="force-restart-db-instances"></a>
## DBインスタンスの強制再起動 { #force-restart-db-instances }

DBインスタンスのPostgreSQLが正常に動作しない場合、強制的に再起動できます。強制再起動は、PostgreSQLにSIGTERMコマンドを実行して正常終了するのを10分間待ちます。10分以内にPostgreSQLが正常終了したら、仮想マシンを再起動します。10分以内に正常終了しない場合は、仮想マシンを強制的に再起動します。仮想マシンが強制的に再起動されると、作業中の一部のトランザクションが失われる可能性があり、データボリュームが破損して復旧が不可能になる可能性があります。強制再起動後、DBインスタンスの状態が使用可能な状態に戻らない場合があります。このような状況が発生した場合はカスタマーサポートにお問い合わせください。

!!! danger "注意"
    データが失われたり、データボリュームが損傷する可能性があるため、この機能は緊急かつやむを得ない状況以外での使用を控える必要があります。

DBインスタンスを強制的に再起動するには、コンソールで

![db-instance-list-force-restart](../static/images/20260609/db-instance-list-force-restart-ja.png)

❶再起動するDBインスタンスを選択し、ドロップダウンメニューから**DBインスタンス強制再起動**メニューをクリックします。

<a id="change-deletion-protection-settings"></a>
## 削除保護設定の変更 { #change-deletion-protection-settings }

削除保護を有効にすると、誤ってDBインスタンスが削除されないように保護できます。削除保護を無効にするまで、該当DBインスタンスを削除できません。削除保護設定を変更するには

![db-instance-deletion-protection](../static/images/20260609/db-instance-list-deletion-protection-ja.png)

❶削除保護設定を変更したいDBインスタンスを選択した後、ドロップダウンメニューから**削除保護設定の変更**メニューをクリックすると、ポップアップウィンドウが表示されます。

![deletion-protection-popup](../static/images/20260609/db-instance-list-deletion-protection-popup-ja.png)

❷削除保護設定を変更した後、**確認**をクリックします。

<a id="high-availability-db-instance"></a>
## 高可用性DBインスタンス { #high-availability-db-instance }

高可用性DBインスタンスは、可用性とデータ耐久性を向上させ、フォールトトレラントなデータベースを提供します。高可用性DBインスタンスはPrimaryとStandbyで構成され、それぞれ異なるアベイラビリティゾーンに作成されます。Standbyは障害に備えたDBインスタンスであり、通常は使用できません。高可用性DBインスタンスでは、Standbyでバックアップが実行されます。

!!! danger "注意"
    高可用性DBインスタンスは、PostgreSQL クエリで別のDBインスタンスまたは外部PostgreSQLのPrimaryから強制的にレプリケーションするように設定した場合、高可用性および一部の機能が正常に動作しません。

<a id="failure-detection"></a>
### 障害検知 { #failure-detection }

Standby には障害を検知するためのプロセスが存在し、定期的に Primary の状態を検知します。この検知周期を Ping 間隔と呼びます。4 回連続で状態チェックに失敗した場合、フェイルオーバーを実行します。Ping 間隔が短いほど障害に敏感に反応し、Ping 間隔が長いほど障害に鈍感に反応します。サービスの負荷に合わせて、適切な Ping 間隔を設定することが重要です。

!!! danger "注意"
    Primaryのデータストレージ使用量が上限に達すると、高可用性監視プロセスが障害として検出してフェイルオーバーを実行するため、ご注意ください。

<a id="auto-failover"></a>
### 自動フェイルオーバー { #auto-failover }

StandbyがPrimaryの状態チェックに4回連続して失敗した場合、Primaryがサービスを提供できないと判断し、自動的にフェイルオーバーを実行します。スプリットブレインを防止するために、障害が発生したPrimaryに割り当てられたすべてのセキュリティグループの接続を解除して外部からの接続を遮断し、StandbyがPrimaryの役割を引き継ぎます。接続用の内部仮想IPは障害が発生したPrimaryからStandbyに変更されるため、アプリケーションの変更は必要ありません。フェイルオーバーが完了すると、障害が発生したPrimaryの種別はFailed Over Primaryに、Standbyの種別はPrimaryに変更されます。フェイルオーバーの過程で障害が発生したPrimaryの自動復旧が実行され、自動復旧に成功した場合、Failed Over PrimaryはStandbyとして機能します。Failed Over Primaryを復旧または再構築するまで、フェイルオーバーは実行されません。昇格したPrimaryはFailed Over Primaryのすべての自動バックアップを引き継ぎます。
昇格したPrimaryで新規にバックアップが実行された時点から、特定の時点への復元を行うことができます。

!!! danger "注意"
    高可用性機能はドメインを基盤としているため、接続を試みるクライアントがDNSサーバーに接続できないネットワーク環境の場合、ドメインでDBインスタンスに接続できず、フェイルオーバーが発生した際に正常な接続ができません。
    内部仮想IPがStandbyからPrimaryに変更される過程で、一時的に接続が中断される場合があります。

<a id="failed-over-master"></a>
### フェイルオーバーが行われたマスター { #failed-over-master }

障害が発生してフェイルオーバーされた Primary を Failed Over Primary と呼びます。Failed Over Primary の自動バックアップは実行されず、Failed Over Primary の復旧、再構築、分離、削除を除くその他のすべての機能は実行することはできません。

<a id="restore-failed-over-master"></a>
### フェイルオーバーが行われたマスターの復旧 { #restore-failed-over-master }

フェイルオーバーの過程でデータの整合性が損なわれておらず、障害が発生した時点から復旧を試みる時点まで保管されたトランザクションログ (Archived Write Ahead Log) が失われていない場合、Failed Over Primary と昇格した Primary を再び高可用性構成に復旧できます。Failed Over Primary のデータベースをそのまま使用して昇格した Primary とのレプリケーション関係を再設定するため、データの整合性が損なわれているか、復旧に必要な保管済みトランザクションログが失われている場合、復旧は失敗します。Failed Over Primary の復旧に失敗した場合、再構築によって高可用性機能を再度有効化できます。

Failed Over Primary を復旧するには、コンソールで

![db-instance-ha-failover-repair](../static/images/20260609/db-instance-ha-failover-repair-ja.png)

❶ 復旧したい Failed Over Primary を選択した後、ドロップダウンメニューで **[フェイルオーバーされたマスターの復旧]** を選択します。

<a id="rebuild-failed-over-master"></a>
### フェイルオーバーが行われたマスター再構築 { #rebuild-failed-over-master }

Failed Over Primaryの復旧に失敗した場合、再構築を使用して再度高可用性機能を有効化できます。再構築は復旧とは異なり、Failed Over Primaryのデータベースをすべて削除し、昇格したPrimaryのデータベースをもとに再構築します。Failed Over Primaryを再構築するには、レプリケーショングループに属するDBインスタンスのうち、バックアップファイルおよびアーカイブされたトランザクションログ（Archived Write Ahead Log）が必要です。バックアップファイルがない場合は、次の順序に従ってバックアップを実行するDBインスタンスを選択します。

❶ 自動バックアップを設定したRead Replica
❷ 自動バックアップを設定したPrimary

条件に一致するDBインスタンスが存在しない場合、Failed Over Primaryの再構築リクエストは失敗します。

!!! danger "注意"
    Primaryのデータベースサイズに比例して、Failed Over Primaryの再構築時間が長くなる場合があります。
    バックアップが実行されているDBインスタンスの場合、Failed Over Primaryの再構築過程でストレージI/Oのパフォーマンスが低下する場合があります。

Failed Over Primary を再構築するには、コンソールで

![db-instance-ha-failover-rebuild](../static/images/20260609/db-instance-ha-failover-rebuild-ja.png)

❶ 再構築する Failed Over Primary を選択した後、ドロップダウンメニューで **[フェイルオーバーされたマスター再構築]** を選択します。

<a id="separate-failed-over-master"></a>
### フェイルオーバーが行われたマスターの分離 { #separate-failed-over-master }

Failed Over Primary の復旧に失敗し、データ修正が必要な場合は、Failed Over Primary を切り離して高可用性機能を無効にできます。切り離された Primary と昇格した Primary 間のレプリケーション関係が切断され、それぞれ通常の DB インスタンスとして動作します。切り離した後は、元の構成に戻すことはできません。

Failed Over Primary を分離するには、コンソールで

![db-instance-ha-failover-split](../static/images/20260609/db-instance-ha-failover-split-ja.png)

❶ 分離したい Failed Over Primary を選択し、ドロップダウンメニューで **[フェイルオーバーされたマスターの分離]** をクリックします。

<a id="manual-failover"></a>
### 手動フェイルオーバー { #manual-failover }

高可用性DBインスタンスは、再起動を伴う作業を実行すると、フェイルオーバーを利用した再起動を行うかどうかを選択することができ、該当作業は次のとおりです。

* DBインスタンスの再起動
* 再起動が必要な項目の変更
* 再起動が必要なパラメータの変更を適用
* ハイパーバイザー点検のためのDBインスタンスマイグレーション

フェイルオーバーを使用した再起動を行うと、まず Standby を再起動します。その後、フェイルオーバーにより Standby を Primary に昇格させ、既存の Primary は Standby の役割を担います。昇格時、接続用の内部仮想 IP は Primary から Standby に変更されるため、アプリケーションの変更は必要ありません。昇格した Primary は、以前の Primary のすべての自動バックアップを引き継ぎます。

!!! danger "注意"
    高可用性機能はドメインを基盤としているため、接続を試みるクライアントがDNSサーバーに接続できないネットワーク環境の場合、ドメインでDBインスタンスに接続できず、フェイルオーバー発生時に正常な接続ができません。

!!! tip "ヒント"
    StandbyおよびレプリケーショングループのRead Replicaのレプリケーション遅延値が1以上の場合、レプリケーション遅延が発生したと見なされます。この場合、手動フェイルオーバーは失敗します。負荷が少ない時間帯に手動フェイルオーバーを実行することをお勧めします。レプリケーション遅延による再起動の失敗はイベント画面で確認できます。

フェイルオーバーを利用した再起動の際、次の項目を追加で選択して安定性を高めることができます。

<a id="manual-failover-start-backup-at-the-current-time"></a>
#### 現時点バックアップ進行

フェイルオーバーを利用した再起動が完了した後、すぐに手動バックアップを進行できます。

<a id="manual-failover-manual-control-of-failover"></a>
#### フェイルオーバーの手動制御

Standby に変更を先に適用した後、その推移を観察したり、正確な時間にフェイルオーバーを実行したい場合に、コンソールでフェイルオーバーのタイミングを直接制御できます。フェイルオーバーの手動制御を選択すると、Standby が再起動された後、❶ コンソールに **[フェイルオーバー]** ボタンが表示されます。このボタンをクリックすると、フェイルオーバーが実行され、最大 5 日間、実行を待機できます。5 日以内にフェイルオーバーを実行しない場合、該当の操作は自動的にキャンセルされます。

![db-instance-ha-wait-manual-failover](../static/images/20260609/db-instance-ha-wait-manual-failover-ja.png)

!!! danger "注意"
    フェイルオーバーの待機中は、自動フェイルオーバーは行われません。

<a id="manual-failover-waiting-for-replication-delays-to-resolve"></a>
#### 複製遅延解消待機

複製遅延解消待機オプションを有効にすると、Standbyおよびレプリケーショングループに含まれるRead Replicaのレプリケーション遅延がなくなるまで待機できます。

<a id="manual-failover-write-load-blocking"></a>
#### 書き込み負荷遮断

レプリケーション遅延を解消している間、書き込み負荷をさらにブロックできます。書き込み負荷をブロックすると、フェイルオーバーを実行する直前に Primary が読み取り専用モードに切り替わり、すべての変更クエリが失敗するように設定されます。

<a id="high-availability-suspended"></a>
### 高可用性の一時停止 { #high-availability-suspended }

一時的なジョブによる接続の中断や大量の負荷が予想される状況で、一時的に高可用性機能を停止できます。高可用性機能が一時停止されると、障害が検知されないため、フェイルオーバーを実行しません。高可用性機能が一時停止された状態で再起動が必要なジョブを実行しても、一時停止された高可用性機能は再開されません。高可用性機能が一時停止されてもデータレプリケーションは正常に行われますが、障害が検知されないため、長時間一時停止状態に維持することは推奨しません。

<a id="rebuild-candidate-master"></a>
### Standby 再構築 { #rebuild-candidate-master }

ネットワークの切断、別のPrimaryからのレプリケーション設定など、さまざまな原因でStandbyのレプリケーションが中断される場合があります。レプリケーションが中断された状態のStandbyでは、自動フェイルオーバーは実行されません。Standbyのレプリケーション中断を解決するには、Standbyを再構築する必要があります。Standbyの再構築時には、Standbyのデータベースをすべて削除し、Primaryのデータベースをもとに再構築します。この過程で、再構築に必要なバックアップファイルがPrimaryデータベースに存在しない場合、Primaryでバックアップが実行され、バックアップによるパフォーマンスの低下が発生する可能性があります。

<a id="data-migration"></a>
## データマイグレーション { #data-migration }

* RDSはpg_dumpを利用してNHN Cloud RDSの外部にインポートすることができます。
* pg_dumpユーティリティはPostgreSQLをインストールしたときに基本的に提供されます。

<a id="export-using-pgdump"></a>
### pg_dumpを利用してエクスポート { #export-using-pgdump }

* NHN Cloud RDSのインスタンスを準備して使用します。
* エクスポートするデータを保存する外部インスタンス、またはローカルクライアントがインストールされたコンピュータの容量が十分に確保されていることを確認します。
* NHN Cloudの外部にデータをエクスポートする場合、フローティングIPを作成してデータをエクスポートするRDSインスタンスに接続します。
* 下記のpg_dumpコマンドを使って外部にデータをエクスポートします。

<a id="export-using-pgdump-export-in-files"></a>
#### ファイルでエクスポートする場合

```
pg_dump -h {rds_instance_floating_ip} -U {db_id} -p {db_port} -d {database_name} -f {local_path_and_file_name}
```

<a id="export-to-external-postgresql"></a>
#### NHN Cloud RDS外部のPostgreSQLデータベースにエクスポートする場合

```
pg_dump -h {rds_instance_floating_ip} -U {db_id} -p {db_port} -d {database_name} | psql -h {external_db_host} -U {external_db_id} -p {external_db_port} -d {external_database_name}
```

<a id="import-with-pgdump"></a>
### pg_dumpを利用したインポート { #import-with-pgdump }

1. データをインポートするDBインスタンスを**フローティングIPの使用**を選択して作成します。

2. インポートするDBインスタンスの容量が十分であることを確認します。

3. **データベース & ユーザー**タブで必要なデータベースをあらかじめ作成します。
 
4. 以下のコマンドを使用して、外部からデータをインポートします。

```
pg_dump -h {外部PostgreSQL接続アドレス} -U {外部PostgreSQLユーザーID} -p {外部PostgreSQL接続ポート} -d {外部PostgreSQLデータベース名} | psql -h {DBインスタンス外部ドメインアドレス} -U {DBインスタンスユーザーID} -p {DBインスタンス接続ポート} -d {DBインスタンスデータベース名}
```

<a id="appendix"></a>
## 付録 { #appendix }

<a id="appendix-1"></a>
### 付録1. ハイパーバイザー点検のためのDBインスタンスマイグレーションガイド { #appendix-1 }

NHN Cloud は定期的に DB インスタンスのハイパーバイザーソフトウェアを更新し、セキュリティと安定性を向上させます。
メンテナンス対象のハイパーバイザーで稼働中の DB インスタンスは、マイグレーションによってメンテナンスが完了したハイパーバイザーに移動する必要があります。

DBインスタンスのマイグレーションは、NHN Cloudコンソールから開始できます。
DB構成に応じて特定のDBインスタンスを選択してマイグレーションを実行する際、関連するDBインスタンス（例：Read Replicaインスタンス）もメンテナンス対象であれば、合わせてマイグレーションを実行します。
以下のガイドに従って、コンソールのマイグレーション機能を使用します。
メンテナンス対象として指定されたDBインスタンスがあるプロジェクトに移動します。

<a id="appendix-1-1"></a>
#### 1. 点検対象DBインスタンスの確認

名前の横に**マイグレーション**があるDBインスタンスが点検対象インスタンスです。

![db-instance-planned-migration](../static/images/20260609/db-instance-planned-migration-ja.png)

**マイグレーション**の上にマウスポインタを置くと、詳細な点検スケジュールを確認できます。

![db-instance-planned-migration-popup](../static/images/20260609/db-instance-planned-migration-popup-ja.png)

<a id="appendix-1-2"></a>
#### 2. 点検対象DBインスタンスに接続しているアプリケーションの終了

DBに接続されているサービスに影響を与えないよう、適切な措置を講じます。
サービスへの影響が避けられない場合は、NHN Cloud カスタマーサポートに問い合わせると、適切な措置についてご案内します。

<a id="appendix-1-3"></a>
#### 3. 点検対象DBインスタンスのマイグレーション適用

点検対象のDBインスタンスを選択し、**マイグレーション**をクリックした後、DBインスタンスのマイグレーション確認を求めるウィンドウが表示されたら、**確認**をクリックします。

![db-instance-planned-migration-confirm](../static/images/20260609/db-instance-planned-migration-confirm-ja.png)

<a id="appendix-1-4"></a>
#### 4. DBインスタンスマイグレーション完了待機

DBインスタンスの状態が変わらない場合は、更新します。
DBインスタンスのマイグレーション中は、いかなる操作も行うことはできません。
DBインスタンスのマイグレーションが正常に完了しない場合は、自動的に管理者に報告され、NHN Cloud から別途ご連絡します。
