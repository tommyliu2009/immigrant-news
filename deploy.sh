#!/usr/bin/env bash
# 新住民&新移民全球新聞網：抓新聞 → 產生網站資料 → 推送 GitHub Pages
# 用法：./deploy.sh [天數，預設3；第一次建站用30]
set -euo pipefail
cd "$(dirname "$0")"
python3 fetch_news.py "${1:-3}"
python3 build_site.py
git add -A
if git diff --cached --quiet; then echo "資料無變動，不需部署"; exit 0; fi
git -c user.name="tommyliu2009" -c user.email="tommyliu2009@users.noreply.github.com" commit -qm "新聞更新 $(TZ=Asia/Taipei date '+%Y-%m-%d %H:%M')"
git push -q origin main
echo "已部署：$(git log -1 --format=%s)"
