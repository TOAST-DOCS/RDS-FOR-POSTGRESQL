## Database > RDS for PostgreSQL > Release Notes

### 2024. 08. 13.

#### 기능 추가

- DB 인스턴스 삭제 보호 기능 추가
- DB 인스턴스 상세 보기 화면에 연결된 알림 그룹, 운영체제 정보 추가
- 읽기 복제본 생성 기능 추가
    - 모니터링 차트 및 감시 설정에 복제 지연 항목을 추가했습니다.
- 이벤트 구독 기능 추가
    - 특정 이벤트가 발생하면 알림을 전송합니다.

#### 기능 개선/변경

- 접근 제어 기능 개선
    - 사용자 추가 시 기본 접근 제어 규칙을 추가할 수 있는 옵션 추가했습니다.
    - 규칙 순서를 드래그 앤 드롭으로 조정할 수 있도록 사용성을 개선했습니다.
- 파라미터 그룹 변경 사항 적용 시 실제로 변경되는 파라미터 항목을 확인할 수 있도록 개선
- 서비스 활성화 화면 개선
    - 서비스 활성화 시 자동 새로고침 되도록 수정했습니다.
- 파라미터 그룹 상세 화면 개선
    - TIMEZONE 타입을 추가하고 드롭다운으로 검색해 입력할 수 있도록 개선했습니다.
    - 단위가 있는 파라미터 편집 시 드롭다운으로 단위를 선택할 수 있도록 개선했습니다.


### June 11, 2024

#### Release of a New Service

- Relational Database Service (RDS) is a service that provides relational databases in cloud environments.
- You can use relational databases without difficult settings.
- PostgreSQL 14.6 version is provided.
