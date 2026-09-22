# 🌳 就活の木｜キャリアカウンセラー支援システム

学生の面談予約から、日程調整、面談記録（カルテ）管理までを一気通貫で行う、大学キャリアセンター向けの業務支援システムです。全ツールが Firebase（Google Cloud）と連携し、どのPCからでも学生データにアクセスできます。

> 「君は、一人じゃない。いつでも、目の前のキャリア支援課の扉は開いているよ。——キャリ爺」

---

## 📊 システム全体の流れ

```
学生マスター登録 → カレンダー設定 → 学生予約 → 予約メール確認・確定 → 面談カルテ記録
(student_master_    (admin.html)     (index.html)   (NO2NO3_merged_    (karte_v5.html)
 import.html)                                         2026.html)
```

学籍番号をキーに「学生マスター・カルテ・予約データ」が紐付いて管理されます。

- **公開URL**: `https://tanukin0423.github.io/career-form/`
- **対応環境**: GitHub Pages（`https://`）上でのみ Cloud保存／Cloud読込／音声入力などの全機能が動作します。ローカル（`file://`）で開いた場合はプレビュー・JSON保存のみ利用可能です。

---

## 📁 主なファイル一覧

### コアツール（5ツール連携）

| ファイル名 | 役割 | 主な利用者 |
|---|---|---|
| `student_master_import.html` | 学生マスターデータのExcel取込・Firebase登録 | 管理者 |
| `admin.html` | カレンダー設定・相談員管理・QRコード生成 | 管理者・各相談員 |
| `index.html` | 学生が面談を予約するフォーム | 学生（QR・URLから） |
| `NO2NO3_merged_2026.html` | 予約メール確認・日程確定・CSV出力 | 各相談員 |
| `karte_v5.html` | 面談カルテ記録・ES素材管理・Cloud保存 | 各相談員 |

### ランチャー・PWA関連

| ファイル名 | 役割 |
|---|---|
| `launcher.html` / `launcher-X.html` | カウンセラー用ランチャー（PWA、`manifest.json` の起点） |
| `karte_list.html` | カルテ一覧表示 |
| `kariji.html` | （簡易版ツール） |
| `manifest.json` / `launcher-manifest.json` | PWA設定（アプリ名「就活の木 カウンセラー」／短縮名「キャリ爺」） |
| `service-worker.js` / `sw.js` / `launcher-sw.js` | PWAオフライン対応 |

### ES・面接対策ツール

| ファイル名 | 役割 |
|---|---|
| `es-sheet1〜4-*.html` | ES素材シート（学業／学業以外／自己PR／志望動機） |
| `common_ES1〜4_*.docx` | 上記に対応するWord版ワークシート |
| `es-tensaku-prompt.html` | ES添削プロンプト生成ツール |
| `mensetsukan-ai-gakusei.html` / `mensetsukan-ai-kyoin.html` | 面接官AIツール（学生用／教員用） |
| `mondo-prompt-tool.html` | 想定問答プロンプト生成ツール |
| `naitei-qa.html` / `naitei-qa.docx` | 内定後Q&A資料 |
| `kintaroame-checker.html` | 金太郎飴（画一化）チェックツール |

### 予約・案内

| ファイル名 | 役割 |
|---|---|
| `yoyaku_annai.html` / `yoyaku_simple.html` | 学生向け予約案内ページ |
| `slots_*.json` | 相談員別の予約可能枠データ |
| `counselors.json` | 相談員マスターデータ |

### マニュアル・ドキュメント

| ファイル名 | 内容 |
|---|---|
| `system_manual.html` | システム総合操作マニュアル（本README のベース） |
| `flow_manual.html` / `flow_onesheet.pdf` | 運用フロー図解 |
| `manual_teacher.html` / `manual_student.html` | 教員向け／学生向け簡易マニュアル |
| `karte_v5_manual.pdf` / `karte_v6_manual.html` / `karte_v6_manual.docx` | カルテ操作マニュアル |
| `detail_manual.pdf` | 詳細マニュアル |

### その他ツール

| ファイル名 | 役割 |
|---|---|
| `karte_word_transfer.html` | カルテ内容のWord転記ツール |
| `it-shokushu.html` | IT職種解説ツール |
| `intl_qr_generator.html` / `NO1_intl_multilang.html` | 留学生向けQR・多言語対応 |
| `icon-generator.html` | PWAアイコン生成ツール |

---

## 🛠 技術構成

- 静的HTML／JavaScript（フレームワーク非依存）
- **Firebase**（Google Cloud）：学生マスター・カルテ・予約データの保存
- **GitHub Pages**：本番環境としての公開・運用
- **PWA**（Progressive Web App）：スマホ・PCへのアプリ的インストールに対応

---

## 🗓 週次運用フロー

| タイミング | 作業内容 | 使うツール | 所要時間目安 |
|---|---|---|---|
| 週1回（月曜朝推奨） | 学生マスターデータの更新 | `student_master_import.html` | 約3分 |
| 予約メール受信後 | 日程確認・確定メール送信 | `NO2NO3_merged_2026.html` | 約10〜15分 |
| 面談前 | カルテ呼び出し・前回記録確認 | `karte_v5.html` | 約2〜3分 |
| 面談中・終了後 | 記録入力・ES補足メモ・保存 | `karte_v5.html` | 随時 |
| 学期開始時 | カレンダー設定・QRコード更新 | `admin.html` | 約15〜30分 |

詳しい操作手順は [`system_manual.html`](./system_manual.html) を参照してください。

---

## ⚠️ 運用上の注意

- ログインパスワードは各ツールのマニュアル・管理者にご確認ください（本READMEには記載していません）。
- 本リポジトリには過去バージョンのファイル（`*-old-*.html` 等）が複数残っています。整理の際は `archive/` フォルダへの移動、または削除を検討してください。
- `counselors.json` にはメールアドレスなど個人情報が含まれます。公開リポジトリでの取り扱いには注意してください。

---

## 🌳 就活の木ブランドについて

大学キャリアセンターでの実務をもとに、「就活の木」ブランドの一環として開発・運用されています。
