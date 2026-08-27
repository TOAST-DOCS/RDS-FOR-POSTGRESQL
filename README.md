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