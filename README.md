# i2na Blog

Next.js 기반 정적 블로그

## 사용법

### 1. 새 글 작성

```bash
# blog 폴더에 .md 파일 생성
touch blog/04_my_post.md
```

**Frontmatter 추가:**

```markdown
---
title: "글 제목"
createdAt: "2025-01-20 14:30"
summary: "요약 (선택사항)"
---

# 본문 시작
```

### 2. 임시 저장

작성 중인 글은 `blog/temp/` 폴더에 저장 (빌드에서 제외됨)

```bash
# 임시 저장
touch blog/temp/wip-my-post.md

# 완성 후 이동
mv blog/temp/wip-my-post.md blog/04_my_post.md
```

### 3. URL 생성

파일명을 기반으로 고정된 짧은 URL이 자동 생성됩니다:

```
01_tandem_id_system.md  → /blog/b7a3d2
02_app_facility_model.md → /blog/bc2303
```

- 파일명이 바뀌지 않는 한 URL은 고정됨
- 빌드마다 동일한 URL 보장

### 4. 날짜 형식

쉬운 형식으로 작성하면 자동 변환됩니다:

```
"2025-01-20"         → 날짜만
"2025-01-20 14:30"   → 날짜 + 시간
"2025/01/20"         → 슬래시도 가능
```

## 명령어

```bash
# 개발 서버
yarn dev

# 프로덕션 빌드
yarn build
```

## 폴더 구조

```
blog/
├── 01_tandem_id_system.md    # 게시됨
├── 02_app_facility_model.md  # 게시됨
└── temp/                      # 임시 저장 (빌드 제외)
    └── wip-post.md
```

## 배포

`dev` 브랜치에 푸시하면 GitHub Pages에 자동 배포
