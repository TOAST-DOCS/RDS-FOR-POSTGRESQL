## Database > RDS for PostgreSQL > 이벤트

## 이벤트

이벤트는 RDS for PostgreSQL이나 사용자에 의해 발생한 중요한 사건을 의미합니다. 이벤트는 이벤트 유형, 발생 일시, 원본 소스와 메시지로 구성됩니다. 이벤트는 웹 콘솔에서 조회 가능하며, 이벤트의 유형과 발생 가능한 이벤트는 아래와 같습니다.

| 이벤트 코드                  | 이벤트 유형              | 설명                  |
|-------------------------|---------------------|---------------------|
| BACKUP_01_00            | BACKUP              | DB 인스턴스 백업 시작       |
| BACKUP_01_01            | BACKUP              | DB 인스턴스 백업 완료       |
| BACKUP_01_04            | BACKUP              | DB 인스턴스 백업 실패       |
| BACKUP_02_01            | BACKUP              | 백업 삭제 완료            |
| DB_INSTANCE_01_00       | DB_INSTANCE         | DB 인스턴스 생성 시작       |
| DB_INSTANCE_01_01       | DB_INSTANCE         | DB 인스턴스 생성 완료       |
| DB_INSTANCE_01_04       | DB_INSTANCE         | DB 인스턴스 생성 실패       |
| DB_INSTANCE_02_01       | DB_INSTANCE         | DB 인스턴스 시작          |
| DB_INSTANCE_03_00       | DB_INSTANCE         | DB 인스턴스 강제 재시작 실행   |
| DB_INSTANCE_04_00       | DB_INSTANCE         | DB 인스턴스 중지 시작       |
| DB_INSTANCE_04_01       | DB_INSTANCE         | DB 인스턴스 중지 완료       |
| DB_INSTANCE_04_04       | DB_INSTANCE         | DB 인스턴스 중지 실패       |
| DB_INSTANCE_05_01       | DB_INSTANCE         | DB 인스턴스 종료          |
| DB_INSTANCE_06_00       | DB_INSTANCE         | DB 인스턴스 삭제 시작       |
| DB_INSTANCE_06_01       | DB_INSTANCE         | DB 인스턴스 삭제 완료       |
| DB_INSTANCE_06_04       | DB_INSTANCE         | DB 인스턴스 삭제 실패       |
| DB_INSTANCE_07_00       | DB_INSTANCE         | DB 인스턴스 백업 시작       |
| DB_INSTANCE_07_01       | DB_INSTANCE         | DB 인스턴스 백업 완료       |
| DB_INSTANCE_07_04       | DB_INSTANCE         | DB 인스턴스 백업 실패       |
| DB_INSTANCE_08_00       | DB_INSTANCE         | DB 인스턴스 복원 시작       |
| DB_INSTANCE_08_01       | DB_INSTANCE         | DB 인스턴스 복원 완료       |
| DB_INSTANCE_08_04       | DB_INSTANCE         | DB 인스턴스 복원 실패       |
| DB_INSTANCE_09_00       | DB_INSTANCE         | 상세 설정 변경 시작         |
| DB_INSTANCE_09_01       | DB_INSTANCE         | 상세 설정 변경 완료         |
| DB_INSTANCE_09_04       | DB_INSTANCE         | 상세 설정 변경 실패         |
| DB_INSTANCE_10_01       | DB_INSTANCE         | 자동 백업 설정 활성화        |
| DB_INSTANCE_11_01       | DB_INSTANCE         | 자동 백업 설정 비활성화       |
| DB_INSTANCE_12_00       | DB_INSTANCE         | DB 인스턴스 타입 변경 시작    |
| DB_INSTANCE_12_01       | DB_INSTANCE         | DB 인스턴스 타입 변경 완료    |
| DB_INSTANCE_12_04       | DB_INSTANCE         | DB 인스턴스 타입 변경 실패    |
| DB_INSTANCE_13_00       | DB_INSTANCE         | Storage 확장 시작       |
| DB_INSTANCE_13_01       | DB_INSTANCE         | Storage 확장 완료       |
| DB_INSTANCE_13_04       | DB_INSTANCE         | Storage 확장 실패       |
| DB_INSTANCE_14_01       | DB_INSTANCE         | 플로팅 IP 연결           |
| DB_INSTANCE_15_01       | DB_INSTANCE         | 플로팅 IP 연결 해제        |
| DB_INSTANCE_16_01       | DB_INSTANCE         | DB 인스턴스 용량 확보       |
| DB_INSTANCE_16_04       | DB_INSTANCE         | DB 인스턴스 용량 확보 실패    |
| DB_INSTANCE_17_01       | DB_INSTANCE         | 사용자 생성              |
| DB_INSTANCE_17_04       | DB_INSTANCE         | 사용자 생성 실패           |
| DB_INSTANCE_18_01       | DB_INSTANCE         | 사용자 변경              |
| DB_INSTANCE_18_04       | DB_INSTANCE         | 사용자 변경 실패           |
| DB_INSTANCE_19_01       | DB_INSTANCE         | 사용자 삭제              |
| DB_INSTANCE_20_01       | DB_INSTANCE         | 데이터베이스 생성           |
| DB_INSTANCE_20_04       | DB_INSTANCE         | 데이터베이스 생성 실패        |
| DB_INSTANCE_21_01       | DB_INSTANCE         | 데이터베이스 변경           |
| DB_INSTANCE_21_04       | DB_INSTANCE         | 데이터베이스 변경 실패        |
| DB_INSTANCE_22_01       | DB_INSTANCE         | 데이터베이스 삭제           |
| DB_INSTANCE_23_00       | DB_INSTANCE         | 파라미터 그룹 변경 시작       |
| DB_INSTANCE_23_01       | DB_INSTANCE         | 파라미터 그룹 변경 완료       |
| DB_INSTANCE_23_04       | DB_INSTANCE         | 파라미터 그룹 변경 실패       |
| DB_INSTANCE_24_00       | DB_INSTANCE         | 파라미터 그룹 변경 사항 적용 시작 |
| DB_INSTANCE_24_01       | DB_INSTANCE         | 파라미터 그룹 변경 사항 적용 완료 |
| DB_INSTANCE_24_04       | DB_INSTANCE         | 파라미터 그룹 변경 사항 적용 실패 |
| DB_INSTANCE_25_00       | DB_INSTANCE         | DB 인스턴스 보안 그룹 변경 시작 |
| DB_INSTANCE_25_01       | DB_INSTANCE         | DB 인스턴스 보안 그룹 변경 완료 |
| DB_INSTANCE_25_04       | DB_INSTANCE         | DB 인스턴스 보안 그룹 변경 실패 |
| DB_INSTANCE_26_00       | DB_INSTANCE         | DB 인스턴스 마이그레이션 시작   |
| DB_INSTANCE_26_01       | DB_INSTANCE         | DB 인스턴스 마이그레이션 완료   |
| DB_INSTANCE_26_04       | DB_INSTANCE         | DB 인스턴스 마이그레이션 실패   |
| DB_INSTANCE_27_00       | DB_INSTANCE         | 접근 제어 설정 변경 시작      |
| DB_INSTANCE_27_01       | DB_INSTANCE         | 접근 제어 설정 변경 완료      |
| DB_INSTANCE_27_04       | DB_INSTANCE         | 접근 제어 설정 변경 실패      |
| DB_INSTANCE_28_01       | DB_INSTANCE         | DB 인스턴스 정상화         |
| DB_INSTANCE_29_01       | DB_INSTANCE         | DB 인스턴스 용량 부족       |
| DB_INSTANCE_30_01       | DB_INSTANCE         | DB 인스턴스 연결 실패       |
| DB_SECURITY_GROUP_01_01 | DB_SECURITY_GROUP   | DB 보안 그룹 생성         |
| DB_SECURITY_GROUP_02_00 | DB_SECURITY_GROUP   | DB 보안 그룹 변경 시작      |
| DB_SECURITY_GROUP_02_01 | DB_SECURITY_GROUP   | DB 보안 그룹 변경 완료      |
| DB_SECURITY_GROUP_02_04 | DB_SECURITY_GROUP   | DB 보안 그룹 변경 실패      |
| DB_SECURITY_GROUP_03_01 | DB_SECURITY_GROUP   | DB 보안 그룹 삭제         |
| TENANT_01_04            | TENANT              | CPU 코어 수 제한         |
| TENANT_02_04            | TENANT              | RAM 용량 제한	          |
| TENANT_03_04            | TENANT              | 개별 볼륨 크기 제한         |
| TENANT_04_04            | TENANT              | 프로젝트 전체 볼륨 크기 제한    |
| JOB_01_04               | JOB                 | Job 실행 실패           |
