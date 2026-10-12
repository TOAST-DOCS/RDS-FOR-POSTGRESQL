---
name: translation-review
description: nc-rds 용어집을 기준으로 이 저장소의 en/ja/zh 번역을 검토한다. 자동 번역 PR(`[Auto-Translate]`)이나 번역 브랜치의 diff 를 받아 반드시 고칠 오류, 용어집 위반, 문서 내 일관성 훼손, ko 원문 쪽 누락으로 나눠 보고한다. "번역 검토", "이 PR 번역 봐줘", "용어집 대조", "translation review", "check translation against glossary" 같은 요청에 사용한다. 새 문서를 번역하거나 ko 원문을 고치는 작업에는 사용하지 않는다.
---

# 번역 검토

* `ko/` 가 원문, `en/` `ja/` `zh/` 는 번역
* 용어의 기준은 이 저장소가 아니라 nc-rds 용어집

# 용어집

* 저장소: https://github.nhnent.com/TOASTCloud/nc-rds (기본 브랜치 `develop`)

| 엔진 | 경로 |
| --- | --- |
| MySQL, MariaDB | `mysql/docs/uniq-lang/glossary.md` |
| PostgreSQL | `postgres/docs/uniq-lang/glossary.md` |

* 로컬 클론이 있으면 `~/git/nc-rds` 아래 같은 경로를 사용
* 없으면 아래 명령으로 확보

```bash
gh api -H 'Accept: application/vnd.github.raw' \
  --hostname github.nhnent.com \
  repos/TOASTCloud/nc-rds/contents/mysql/docs/uniq-lang/glossary.md?ref=develop \
  > /tmp/rv-glossary.md
```

* `(공통 모듈)` 표식 항목은 양 엔진 공통
* 용어집 상단 표기 규칙(영문과 한글 사이 공백, 영어 첫 글자 대문자, 축약어 전부 대문자)도 판정 근거
* 한글, 영어, 일본어 열만 뽑아 대조표로 사용

```bash
grep -E '^\| [^-]' ~/git/nc-rds/mysql/docs/uniq-lang/glossary.md | cut -d'|' -f2-4 | grep -v ' 한글 '
```

* 이 문서의 코드 블록에 달러 기호와 숫자로 이루어진 위치 변수를 쓰지 않음
* 슬래시 명령으로 호출하면 인자 치환에 걸려 명령이 깨짐. awk 의 필드 변수 대신 `cut -f` 를 사용

* 용어집에 없는 낱말은 위반으로 잡지 않음. 기존 문서 표기를 기준으로 일관성만 확인

# 검토 순서

## 1. 대상 확보

* 자동 번역 PR 본문에 원본 ko PR 번호와 재번역 규모가 기재됨
* `ko diff 대비 재번역 비율` 이 큰 파일부터 확인. 손대지 않은 문단까지 다시 쓰였다는 신호

```bash
gh pr view <번역 PR> --json title,body,baseRefName,headRefName,files
git fetch -q origin <base> <head>
git diff origin/<base> origin/<head> -- en/ > /tmp/rv-en.diff
git diff origin/<base> origin/<head> -- ja/ > /tmp/rv-ja.diff
gh pr diff <ko PR> -- ko/          # 원문에서 실제로 바뀐 것
```

* ko 의 실제 변경과 en, ja 의 변경 범위를 먼저 비교
* ko 가 안 바뀐 문단이 번역에서 바뀌었으면 그 자체가 검토 대상

## 2. 반드시 고칠 오류

배포되면 독자가 바로 보는 결함

* 번역되지 않고 남은 한글. admonition 제목과 본문 문장 모두 확인
* 언어 혼재. 한 문장 안에 한글과 대상 언어가 섞인 경우
* 문장 붕괴. 주어나 서술어가 중복되거나 끊긴 경우
* 표 셀 오역. `예` `아니요` 같은 값 열을 낱말로 오역한 경우
* ko 에 있는 문장이나 목록 항목의 누락
* 들여쓰기 구조 변경. ko 가 불릿 아래 중첩한 admonition 을 최상위로 올린 경우

```bash
grep -nP '[\x{AC00}-\x{D7A3}]' en/*_template.md ja/*_template.md
git grep -n '^  !!! ' <ref> -- ko/ en/ ja/     # 중첩 admonition 위치 대조
```

## 3. 용어집 위반

용어집 표기와 다른 낱말

* 대소문자. `Read Replica` 가 `read replica` 로, `Primary` 가 `primary` 로 바뀐 경우
* 일본어 표기 이탈. 용어집이 가타카나로 정한 것을 영문으로 바꾼 경우와 그 반대
* 한 문서 안에서 제목과 본문이 다른 표기를 쓰는 경우
* 기준선은 base 브랜치. 변경 전 0 건이던 표기가 새로 생겼는지 개수로 확인

```bash
git grep -c 'read replica' origin/<base> -- en/
git grep -c 'read replica' <head> -- en/
```

## 4. 문서 내 일관성

용어집이 다루지 않지만 문서 세트가 지켜 온 관례

| 축 | 확인 방법 |
| --- | --- |
| admonition 제목 | ko `알아두기` 가 en `Note`, ja `参考` 로 통일돼 있는지 |
| 일본어 띄어쓰기 | `DBインスタンス` 와 `DB インスタンス` 가 섞이지 않았는지 |
| UI 라벨 서식 | ko `**가져오기**` 에 대괄호를 새로 붙이지 않았는지 |
| 표 셀 문구 | 같은 뜻의 셀이 마침표 유무까지 한 가지인지 |
| 링크 텍스트와 대상 제목 | 두 곳의 낱말이 같은지 |
| 메뉴 이름 | 절 제목과 클릭 안내의 낱말이 같은지 |

```bash
git grep -h '^ *!!! ' <ref> -- en/ | sort | uniq -c
git grep -h '^ *!!! ' <ref> -- ja/ | sort | uniq -c
```

* 이 PR 에 없는 다른 문서의 표기도 함께 확인
* 바뀐 파일만 통일하면 문서 세트 전체가 갈림

## 5. ko 원문 쪽 누락

* 번역기는 ko 를 그대로 따르므로 ko 의 흠이 번역으로 번짐
* 같은 사실을 다루는 표가 파일마다 다르면 ko 쪽 누락 의심

```bash
for f in ko en ja; do printf "$f: "; grep -c '^| MySQL 8\.' $f/db-instance_template.md; done
for f in ko en ja; do printf "$f db-engine: "; grep -c '^| MySQL 8\.' $f/db-engine_template.md; done
```

# 보고 형식

* 반드시 고칠 오류를 표로 먼저 제시. 열은 파일, 위치, 문제
* 그다음 용어집 위반, 문서 내 일관성, ko 원문 쪽 확인 요청을 절로 분리
* 각 항목에 세어 본 수치를 병기. `24곳`, `기존 0곳` 처럼 근거가 있어야 판단 가능

# 수정 방식

재번역 범위가 ko 변경분보다 훨씬 넓으면 개별 수정보다 되돌리기가 저렴

1. 번역된 파일을 base 상태로 되돌림
2. ko 변경분 중 기존 번역이 빠뜨린 문장만 반영
3. 한글 잔존, 용어집 위반, 표 행 수를 다시 세어 0 확인

```bash
git checkout origin/<base> -- en/ ja/
```

* 되돌리면 번역기가 넣은 `<!-- machine_translated: true -->` 마커도 사라짐
* 파이프라인이 그 마커를 요구하면 다시 삽입
* 작업 범위 밖의 기존 오타와 문체는 함께 고치지 않음. 발견한 사실만 보고에 기재
