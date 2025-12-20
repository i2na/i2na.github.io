# 임시 저장 폴더

이 폴더의 파일은 빌드에서 제외됩니다.

## 사용법

```bash
# 임시 저장
touch blog/temp/wip-my-post.md

# 작성 중...
vim blog/temp/wip-my-post.md

# 완성 후 이동
mv blog/temp/wip-my-post.md blog/04_my_post.md
```

## Frontmatter 예시

```markdown
---
title: "글 제목"
createdAt: "2025-01-20 14:30"
---

# 본문...
```
