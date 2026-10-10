#!/usr/bin/env python3
"""由 news_db.json 產生 data.js（網站資料）"""
import json
db = json.load(open('news_db.json')); st = json.load(open('source_status.json'))
items = sorted(db.values(), key=lambda v: v['date'], reverse=True)
open('data.js','w').write('window.NEWS=' + json.dumps(items, ensure_ascii=False) + ';\nwindow.UPDATED=' + json.dumps(st['updated']) + ';\n')
print('網站資料', len(items), '則')
