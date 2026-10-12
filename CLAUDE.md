# RDS for PostgreSQL 문서 프로젝트

## 편집 규칙

- 문서 변경 작업은 `ko/` 폴더에서만 수행한다.
- 문서 본문은 mkdocs 문법으로 작성한다.
- 문서 내용에 작성하는 변수 구분자는 `$[ ]$`를 사용한다.
- Admonition은 `note`, `tip`, `warning`, `danger` 4종만 사용한다.
- [mkdocs-macros](https://mkdocs-macros-plugin.readthedocs.io/en/latest/) 플러그인의 변수, 조건문 문법을 사용할 수 있다.
- [mkdocs-include-markdown](https://github.com/mondeja/mkdocs-include-markdown-plugin) 플러그인의 include 문법을 사용할 수 있다.
- `en/`, `ja/` 폴더의 파일은 직접 수정하지 않는다. 번역 파일은 별도 파이프라인에서 관리한다. 단, 번역 결과의 오류 수정은 허용한다.

## 용어 규칙

DB 인스턴스 타입은 고유명사로 취급하며 대소문자를 엄격하게 지킨다.

| 용어 | 비고 |
|---|---|
| Primary | 마스터 DB 인스턴스 |
| Standby | 예비 마스터 DB 인스턴스 |
| Read Replica | 읽기 복제본 DB 인스턴스 |
| Failed Over Primary | 장애 조치된 마스터 DB 인스턴스 |

## Heading ID 규칙

ko/en/ja 세 언어에 동일하게 부여하는 앵커 naming 규칙이다. 번역 파이프라인은 이미 부여된 ID를 보존만 하고 새로 생성하지 않는다.

### 적용 범위

- h2(`##`)부터 h4(`####`)까지 ID를 부여한다. h1과 h5 이하는 대상이 아니다.

### 앵커 배치 형식

- `<a id="the-id"></a>`를 heading 바로 윗줄에 배치한다. 사이에 빈 줄을 넣지 않는다.
- h2, h3은 heading 줄 끝에 `{ #id }` attr 블록도 함께 붙인다. h4는 `<a id>` 만 사용한다.

```markdown
<a id="create-instance"></a>
## 인스턴스 생성 { #create-instance }

<a id="create-instance-details"></a>
#### 상세 설정
```

### ID 생성 우선순위

1. **영문 제목의 kebab-case 슬러그**: 선행 번호 마커(`1.`, `2)`) 제거 → 소문자화 → `a-z0-9`, 공백, `-` 외 삭제 → 공백/`_`를 `-`로 치환
2. **h4는 조상 접두어 필수**: `{가까운 상위 h2/h3 id}-{자기 슬러그}`. 자기 슬러그가 이미 조상으로 시작하면 이중 접두어는 붙이지 않는다.
3. **충돌 시 semantic prefix 우선**: 같은 슬러그가 사용 중이면 `{조상id}-{base}`를 먼저 시도하고, 그래도 충돌하면 `-2`, `-3` 접미어를 붙인다.
4. **영문 제목이 없으면 위치 기반 폴백**: `{가장 가까운 상위 앵커}-{N}` 또는 `section-{N}`

### 편집 시 주의사항

- 기존 `<a id>`는 규칙과 달라도 그대로 둔다. 기존 링크 호환을 위해 변경하지 않는다.
- 새 섹션을 추가할 때는 위 규칙에 따라 ID를 부여한다.
- ID 문자열 생성은 100% 결정적 로직이다. LLM은 ko/en heading 매칭 단계에만 관여한다.
