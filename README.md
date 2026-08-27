# RDS for PostgreSQL

## 자동 번역 프로세스

1. 한글 문서만 변경사항 작성 후 PR 생성
    - PR은 alpha 브랜치로만 생성
2. PR에 달린 한글 검수 봇 의견 확인 후 커밋
3. PR을 머지하면 자동 번역 봇이 신규 PR 올려줄 때 까지 대기
    - translate/xxx 원격 브랜치 생성 여부로 동작중인지 확인 가능
4. 이미지 주소 등 변경 필요한 부분은 translate/xxx 브랜치 체크아웃해서 수정 후 머지

## mkdocs 참고

* mkdocs 문법
    * [mkdocs-syntax](https://docs.alpha-nhncloud.com/ko/Open%20Source/agent-test/ko/mkdocs-syntax/)
    * [mkdocs-macros](https://mkdocs-macros-plugin.readthedocs.io/en/latest/)
    * [mkdocs-include-markdown](https://github.com/mondeja/mkdocs-include-markdown-plugin)
    * [mkdocs-admonitions](https://squidfunk.github.io/mkdocs-material/reference/admonitions/)
        * note, tip, warning, danger 4개 정도만 사용 가능함
* Preview
    * http://content-agent.cloud.toastoven.net:7700/preview

## 콘솔 메시지 번들링

콘솔 번역 메시지를 YAML(`.md`) 파일로 관리하고, ko/en/ja를 병합해 Excel로 출력한다.

### 빌드

```bash
npm run build:RDS_POSTGRES_ALPHA   # 단일 카테고리
npm run build:all                  # 전체 카테고리
npm run build:all -- -o dist/      # 출력 디렉터리 지정
```

### 카테고리 추가

`package.json`의 `scripts`에 `build:{카테고리ID}` 항목을 추가한다.

### 메시지 파일

- 경로: `ko/i18n/*.md` (YAML 형식)
- frontmatter의 `categories`로 빌드 대상 카테고리를 제한할 수 있다. 미지정 시 전체 카테고리에 포함된다.

```yaml
---
categories: [RDS_POSTGRES_ALPHA, RDS_POSTGRES_BETA, RDS_POSTGRES]
---
- messageId: pg.error.10608
  messageType: ERROR
  text: "CIDR 형식 혹은 IP 주소와 함께 넷마스크를 입력하세요."
```

### 출력

`dist/{파일명}_{카테고리}_{yyyyMMdd}.xlsx`
