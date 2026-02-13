## Database > RDS for PostgreSQL > 이벤트

## 이벤트

이벤트는 RDS for PostgreSQL이나 사용자에 의해 발생한 중요한 사건을 의미합니다. 이벤트는 이벤트 유형, 발생 일시, 원본 소스와 메시지로 구성됩니다. 이벤트는 콘솔에서 조회 가능하며, 이벤트의 유형과 발생 가능한 이벤트는 아래와 같습니다.

| 이벤트 코드                  | 이벤트 유형            | 설명                                   |
|-------------------------|-------------------|--------------------------------------|
| BACKUP_01_00            | BACKUP            | DB 인스턴스 백업 시작                        |
| BACKUP_01_01            | BACKUP            | DB 인스턴스 백업 완료                        |
| BACKUP_01_04            | BACKUP            | DB 인스턴스 백업 실패                        |
| BACKUP_02_01            | BACKUP            | 백업 삭제 완료                             |
| BACKUP_04_00            | BACKUP            | 오브젝트 스토리지 업로드 시작                     |
| BACKUP_04_01            | BACKUP            | 오브젝트 스토리지 업로드 완료                     |
| BACKUP_04_04            | BACKUP            | 오브젝트 스토리지 업로드 실패                     |
| BACKUP_05_00            | BACKUP            | 백업 내보내기 시작                           |
| BACKUP_05_01            | BACKUP            | 백업 내보내기 완료                           |
| BACKUP_05_04            | BACKUP            | 백업 내보내기 실패                           |
| BACKUP_06_01            | BACKUP            | DB 인스턴스 백업 실패(알려진 원인)                |
| DB_INSTANCE_01_00       | DB_INSTANCE       | DB 인스턴스 생성 시작                        |
| DB_INSTANCE_01_01       | DB_INSTANCE       | DB 인스턴스 생성 완료                        |
| DB_INSTANCE_01_04       | DB_INSTANCE       | DB 인스턴스 생성 실패                        |
| DB_INSTANCE_02_01       | DB_INSTANCE       | DB 인스턴스 시작                           |
| DB_INSTANCE_03_00       | DB_INSTANCE       | DB 인스턴스 강제 재시작 실행                    |
| DB_INSTANCE_04_00       | DB_INSTANCE       | DB 인스턴스 중지 시작                        |
| DB_INSTANCE_04_01       | DB_INSTANCE       | DB 인스턴스 중지 완료                        |
| DB_INSTANCE_04_04       | DB_INSTANCE       | DB 인스턴스 중지 실패                        |
| DB_INSTANCE_05_01       | DB_INSTANCE       | DB 인스턴스 종료                           |
| DB_INSTANCE_06_00       | DB_INSTANCE       | DB 인스턴스 삭제 시작                        |
| DB_INSTANCE_06_01       | DB_INSTANCE       | DB 인스턴스 삭제 완료                        |
| DB_INSTANCE_06_04       | DB_INSTANCE       | DB 인스턴스 삭제 실패                        |
| DB_INSTANCE_07_00       | DB_INSTANCE       | DB 인스턴스 백업 시작                        |
| DB_INSTANCE_07_01       | DB_INSTANCE       | DB 인스턴스 백업 완료                        |
| DB_INSTANCE_07_04       | DB_INSTANCE       | DB 인스턴스 백업 실패                        |
| DB_INSTANCE_08_00       | DB_INSTANCE       | DB 인스턴스 복원 시작                        |
| DB_INSTANCE_08_01       | DB_INSTANCE       | DB 인스턴스 복원 완료                        |
| DB_INSTANCE_08_04       | DB_INSTANCE       | DB 인스턴스 복원 실패                        |
| DB_INSTANCE_09_00       | DB_INSTANCE       | 상세 설정 변경 시작                          |
| DB_INSTANCE_09_01       | DB_INSTANCE       | 상세 설정 변경 완료                          |
| DB_INSTANCE_09_04       | DB_INSTANCE       | 상세 설정 변경 실패                          |
| DB_INSTANCE_10_01       | DB_INSTANCE       | 자동 백업 설정 활성화                         |
| DB_INSTANCE_11_01       | DB_INSTANCE       | 자동 백업 설정 비활성화                        |
| DB_INSTANCE_12_00       | DB_INSTANCE       | DB 인스턴스 타입 변경 시작                     |
| DB_INSTANCE_12_01       | DB_INSTANCE       | DB 인스턴스 타입 변경 완료                     |
| DB_INSTANCE_12_04       | DB_INSTANCE       | DB 인스턴스 타입 변경 실패                     |
| DB_INSTANCE_13_00       | DB_INSTANCE       | Storage 확장 시작                        |
| DB_INSTANCE_13_01       | DB_INSTANCE       | Storage 확장 완료                        |
| DB_INSTANCE_13_04       | DB_INSTANCE       | Storage 확장 실패                        |
| DB_INSTANCE_14_01       | DB_INSTANCE       | 플로팅 IP 연결                            |
| DB_INSTANCE_15_01       | DB_INSTANCE       | 플로팅 IP 연결 해제                         |
| DB_INSTANCE_16_01       | DB_INSTANCE       | DB 인스턴스 용량 확보                        |
| DB_INSTANCE_16_04       | DB_INSTANCE       | DB 인스턴스 용량 확보 실패                     |
| DB_INSTANCE_17_01       | DB_INSTANCE       | 사용자 생성                               |
| DB_INSTANCE_17_04       | DB_INSTANCE       | 사용자 생성 실패                            |
| DB_INSTANCE_18_01       | DB_INSTANCE       | 사용자 변경                               |
| DB_INSTANCE_18_04       | DB_INSTANCE       | 사용자 변경 실패                            |
| DB_INSTANCE_19_01       | DB_INSTANCE       | 사용자 삭제                               |
| DB_INSTANCE_19_04       | DB_INSTANCE       | 사용자 삭제 실패                            |
| DB_INSTANCE_20_01       | DB_INSTANCE       | 데이터베이스 생성                            |
| DB_INSTANCE_20_04       | DB_INSTANCE       | 데이터베이스 생성 실패                         |
| DB_INSTANCE_21_01       | DB_INSTANCE       | 데이터베이스 변경                            |
| DB_INSTANCE_21_04       | DB_INSTANCE       | 데이터베이스 변경 실패                         |
| DB_INSTANCE_22_01       | DB_INSTANCE       | 데이터베이스 삭제                            |
| DB_INSTANCE_23_00       | DB_INSTANCE       | 파라미터 그룹 변경 시작                        |
| DB_INSTANCE_23_01       | DB_INSTANCE       | 파라미터 그룹 변경 완료                        |
| DB_INSTANCE_23_04       | DB_INSTANCE       | 파라미터 그룹 변경 실패                        |
| DB_INSTANCE_24_00       | DB_INSTANCE       | 파라미터 그룹 변경 사항 적용 시작                  |
| DB_INSTANCE_24_01       | DB_INSTANCE       | 파라미터 그룹 변경 사항 적용 완료                  |
| DB_INSTANCE_24_04       | DB_INSTANCE       | 파라미터 그룹 변경 사항 적용 실패                  |
| DB_INSTANCE_25_00       | DB_INSTANCE       | DB 인스턴스 보안 그룹 변경 시작                  |
| DB_INSTANCE_25_01       | DB_INSTANCE       | DB 인스턴스 보안 그룹 변경 완료                  |
| DB_INSTANCE_25_04       | DB_INSTANCE       | DB 인스턴스 보안 그룹 변경 실패                  |
| DB_INSTANCE_26_00       | DB_INSTANCE       | DB 인스턴스 마이그레이션 시작                    |
| DB_INSTANCE_26_01       | DB_INSTANCE       | DB 인스턴스 마이그레이션 완료                    |
| DB_INSTANCE_26_04       | DB_INSTANCE       | DB 인스턴스 마이그레이션 실패                    |
| DB_INSTANCE_27_00       | DB_INSTANCE       | 접근 제어 설정 변경 시작                       |
| DB_INSTANCE_27_01       | DB_INSTANCE       | 접근 제어 설정 변경 완료                       |
| DB_INSTANCE_27_04       | DB_INSTANCE       | 접근 제어 설정 변경 실패                       |
| DB_INSTANCE_28_01       | DB_INSTANCE       | DB 인스턴스 정상화                          |
| DB_INSTANCE_29_01       | DB_INSTANCE       | DB 인스턴스 용량 부족                        |
| DB_INSTANCE_30_01       | DB_INSTANCE       | DB 인스턴스 연결 실패                        |
| DB_INSTANCE_31_00       | DB_INSTANCE       | DB 인스턴스 복제 시작                        |
| DB_INSTANCE_31_01       | DB_INSTANCE       | DB 인스턴스 복제 완료                        |
| DB_INSTANCE_31_04       | DB_INSTANCE       | DB 인스턴스 복제 실패                        |
| DB_INSTANCE_32_00       | DB_INSTANCE       | DB 인스턴스 승격 시작                        |
| DB_INSTANCE_32_01       | DB_INSTANCE       | DB 인스턴스 승격 완료                        |
| DB_INSTANCE_32_04       | DB_INSTANCE       | DB 인스턴스 승격 실패                        |
| DB_INSTANCE_33_00       | DB_INSTANCE       | DB 인스턴스 강제 승격 시작                     |
| DB_INSTANCE_33_01       | DB_INSTANCE       | DB 인스턴스 강제 승격 완료                     |
| DB_INSTANCE_33_04       | DB_INSTANCE       | DB 인스턴스 강제 승격 실패                     |
| DB_INSTANCE_34_00       | DB_INSTANCE       | DB 인스턴스 복제 재구축 시작                    |
| DB_INSTANCE_34_01       | DB_INSTANCE       | DB 인스턴스 복제 재구축 시작                    |
| DB_INSTANCE_34_04       | DB_INSTANCE       | DB 인스턴스 복제 재구축 시작                    |
| DB_INSTANCE_35_00       | DB_INSTANCE       | DB 인스턴스 복제 지연                        |
| DB_INSTANCE_35_01       | DB_INSTANCE       | DB 인스턴스 복제 지연 종료                     |
| DB_INSTANCE_36_00       | DB_INSTANCE       | DB 인스턴스 복제 중단                        |
| DB_INSTANCE_37_00       | DB_INSTANCE       | 상세 설정 변경 시작                          |
| DB_INSTANCE_37_01       | DB_INSTANCE       | 상세 설정 변경 완료                          |
| DB_INSTANCE_37_04       | DB_INSTANCE       | 상세 설정 변경 실패                          |
| DB_INSTANCE_38_01       | DB_INSTANCE       | 고가용성 DB 인스턴스 시작                      |
| DB_INSTANCE_39_01       | DB_INSTANCE       | 고가용성 DB 인스턴스 종료                      |
| DB_INSTANCE_40_00       | DB_INSTANCE       | DB 인스턴스 장애 조치 실행                     |
| DB_INSTANCE_40_01       | DB_INSTANCE       | DB 인스턴스 장애 조치 완료                     |
| DB_INSTANCE_40_04       | DB_INSTANCE       | DB 인스턴스 장애 조치 실패                     |
| DB_INSTANCE_41_01       | DB_INSTANCE       | 장애 조치를 이용한 인스턴스 재시작 완료               |
| DB_INSTANCE_41_04       | DB_INSTANCE       | 장애 조치를 이용한 인스턴스 재시작 실패               |
| DB_INSTANCE_42_00       | DB_INSTANCE       | 장애 조치 수동 제어 대기                       |
| DB_INSTANCE_42_01       | DB_INSTANCE       | 장애 조치 수동 제어 성공                       |
| DB_INSTANCE_42_04       | DB_INSTANCE       | 장애 조치 수동 제어 시간 초과                    |
| DB_INSTANCE_43_01       | DB_INSTANCE       | 고가용성 일시 중지                           |
| DB_INSTANCE_43_04       | DB_INSTANCE       | 고가용성 일시 중지 실패                        |
| DB_INSTANCE_44_01       | DB_INSTANCE       | 고가용성 다시 시작                           |
| DB_INSTANCE_44_04       | DB_INSTANCE       | 고가용성 다시 시작 실패                        |
| DB_INSTANCE_45_00       | DB_INSTANCE       | 장애 조치 완료된 DB 인스턴스 고가용성 복구 시작         |
| DB_INSTANCE_45_01       | DB_INSTANCE       | 장애 조치 완료된 DB 인스턴스 고가용성 복구 완료         |
| DB_INSTANCE_45_04       | DB_INSTANCE       | 장애 조치 완료된 DB 인스턴스 고가용성 복구 실패         |
| DB_INSTANCE_46_00       | DB_INSTANCE       | 장애 조치 완료된 DB 인스턴스 고가용성 재구축 시작        |
| DB_INSTANCE_46_01       | DB_INSTANCE       | 장애 조치 완료된 DB 인스턴스 고가용성 재구축 완료        |
| DB_INSTANCE_46_04       | DB_INSTANCE       | 장애 조치 완료된 DB 인스턴스 고가용성 재구축 실패        |
| DB_INSTANCE_47_00       | DB_INSTANCE       | 장애 조치 완료된 DB 인스턴스를 일반 DB 인스턴스로 변경 시작 |
| DB_INSTANCE_47_01       | DB_INSTANCE       | 장애 조치 완료된 DB 인스턴스를 일반 DB 인스턴스로 변경 완료 |
| DB_INSTANCE_47_04       | DB_INSTANCE       | 장애 조치 완료된 DB 인스턴스를 일반 DB 인스턴스로 변경 실패 |
| DB_INSTANCE_48_01       | DB_INSTANCE       | 고가용성 정상화                             |
| DB_INSTANCE_49_01       | DB_INSTANCE       | 고가용성 중단                              |
| DB_INSTANCE_50_00       | DB_INSTANCE       | 예비 마스터 재구축 시작                        |
| DB_INSTANCE_50_01       | DB_INSTANCE       | 예비 마스터 재구축 완료                        |
| DB_INSTANCE_50_04       | DB_INSTANCE       | 예비 마스터 재구축 실패                        |
| DB_INSTANCE_51_01       | DB_INSTANCE       | DB 인스턴스 백업 실패(알려진 원인)                |
| DB_INSTANCE_52_00       | DB_INSTANCE       | DB 인스턴스 백업 후 백업 파일 내보내기 시작           |
| DB_INSTANCE_52_01       | DB_INSTANCE       | DB 인스턴스 백업 후 백업 파일 내보내기 완료           |
| DB_INSTANCE_52_04       | DB_INSTANCE       | DB 인스턴스 백업 후 백업 파일 내보내기 실패           |
| DB_INSTANCE_53_01       | DB_INSTANCE       | DB 인스턴스 백업 후 백업 파일 내보내기 실패(알려진 원인)   |
| DB_INSTANCE_54_00       | DB_INSTANCE       | DB 인스턴스 백업 내보내기 시작                   |
| DB_INSTANCE_54_01       | DB_INSTANCE       | DB 인스턴스 백업 내보내기 완료                   |
| DB_INSTANCE_54_04       | DB_INSTANCE       | DB 인스턴스 백업 내보내기 실패                   |
| DB_INSTANCE_55_00       | DB_INSTANCE       | 오브젝트 스토리지에 있는 백업으로 DB 인스턴스 복원 시작     |
| DB_INSTANCE_55_01       | DB_INSTANCE       | 오브젝트 스토리지에 있는 백업으로 DB 인스턴스 복원 완료     |
| DB_INSTANCE_55_04       | DB_INSTANCE       | 오브젝트 스토리지에 있는 백업으로 DB 인스턴스 복원 실패     |
| DB_INSTANCE_56_00       | DB_INSTANCE       | DB 인스턴스 버전 업그레이드 시작                  |
| DB_INSTANCE_56_01       | DB_INSTANCE       | DB 인스턴스 버전 업그레이드 완료                  |
| DB_INSTANCE_56_04       | DB_INSTANCE       | DB 인스턴스 버전 업그레이드 실패                  |
| DB_INSTANCE_57_00       | DB_INSTANCE       | 확장 변경 사항 적용 시작                       |
| DB_INSTANCE_57_01       | DB_INSTANCE       | 확장 변경 사항 적용 완료                       |
| DB_INSTANCE_57_04       | DB_INSTANCE       | 확장 변경 사항 적용 실패                       |
| DB_SECURITY_GROUP_01_01 | DB_SECURITY_GROUP | DB 보안 그룹 생성                          |
| DB_SECURITY_GROUP_02_00 | DB_SECURITY_GROUP | DB 보안 그룹 변경 시작                       |
| DB_SECURITY_GROUP_02_01 | DB_SECURITY_GROUP | DB 보안 그룹 변경 완료                       |
| DB_SECURITY_GROUP_02_04 | DB_SECURITY_GROUP | DB 보안 그룹 변경 실패                       |
| DB_SECURITY_GROUP_03_01 | DB_SECURITY_GROUP | DB 보안 그룹 삭제                          |
| TENANT_01_04            | TENANT            | CPU 코어 수 제한                          |
| TENANT_02_04            | TENANT            | RAM 용량 제한	                           |
| TENANT_03_04            | TENANT            | 개별 볼륨 크기 제한                          |
| TENANT_04_04            | TENANT            | 프로젝트 전체 볼륨 크기 제한                     |
| TENANT_05_04            | TENANT            | 읽기 복제본 생성 제한                         |
| JOB_01_04               | JOB               | Job 실행 실패                            |

### 이벤트 구독

이벤트를 구독하면 이벤트 발생 시 이메일 및 SMS로 알림을 받을 수 있습니다. 이벤트 구독에 연결된 사용자 그룹의 사용자들에게 알림을 발송합니다. 이벤트 유형, 이벤트 코드, 이벤트 소스로 세분화하여 구독할 수 있습니다. 잠시 알림을 중단하려면 이벤트 구독의 활성화 여부를 수정합니다. 활성화하지 않으면 알림을 발송하지 않습니다.

![event-subscription](https://static.toastoven.net/prod_rds_postgres/20240813/event-subscription-ko.png)

* ❶ **이벤트 구독 등록**을 누르면 이벤트 구독을 등록할 수 있는 팝업 창이 나타납니다.
* ❷ 구독할 이벤트 유형을 선택합니다. 이벤트 유형에 따라 선택할 수 있는 이벤트 코드가 변경됩니다.
* ❸ 구독할 이벤트 코드를 선택합니다.
* ❹ 구독할 이벤트 소스를 선택합니다.
* ❺ 이벤트 알림을 받을 사용자 그룹을 선택합니다.
* ❻ 활성화 여부를 선택합니다. 활성화 여부를 **아니요**로 선택할 경우 이벤트 발생 알림을 발송하지 않습니다.
