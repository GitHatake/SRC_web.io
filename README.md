# Shizuoka Rovers Conference

静岡ローバース会議の公式Webサイト。活動記録、議事録、スケジュール管理などを提供するNext.jsベースのアプリケーションです。

## 🌟 主な機能

- **活動記録管理**: 過去の活動履歴と詳細情報の表示
- **議事録閲覧**: 会議の議事録を時系列で管理
- **カレンダー連携**: Google Calendar APIを使用した今後の活動スケジュール表示
- **参加者募集**: 募集中の活動をハイライト表示
- **SNS連携**: 最新情報の表示とSNSリンク
- **管理者機能**: Google Apps Script (GAS) と連携したデータ管理

## 🛠️ 技術スタック

- **フレームワーク**: [Next.js 15](https://nextjs.org/) (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS, shadcn/ui
- **パッケージ管理**: pnpm
- **デプロイ**: Docker + Nginx, GitHub Pages
- **CI/CD**: GitHub Actions
- **外部連携**: Google Apps Script, Google Calendar API

## 🔗 関連プロジェクト

このウェブサイトの機能をサポートするGoogle Apps Script (GAS) のソースコードは、以下のリポジトリで管理されています。データ取得や管理機能の詳細は、こちらをご参照ください。

- **[GAS for SRC_web](https://github.com/GitHatake/GASforSRC_web.git)**

## 📋 前提条件

- Node.js 18.x以上
- pnpm 8.x以上
- Docker & Docker Compose (オプション)

## 🚢 デプロイ
GitHub Actionsによる自動デプロイが設定されています。

- mainブランチへのpush/マージで自動的にGitHub Pagesにデプロイされます
- デプロイワークフロー: workflows

## 📁 プロジェクト構造

    ├── app/                    # Next.js App Router
    │   ├── layout.tsx         # ルートレイアウト
    │   ├── page.tsx           # トップページ
    │   └── globals.css        # グローバルスタイル
    ├── components/            # Reactコンポーネント
    │   ├── activity-card.tsx          # アクティビティカード
    │   ├── activity-records.tsx       # 活動記録一覧
    │   ├── calendar-section.tsx       # カレンダー表示
    │   ├── featured-activities.tsx    # 注目アクティビティ
    │   ├── header.tsx                 # ヘッダー
    │   └── hero-section.tsx           # ヒーローセクション
    ├── hooks/                 # カスタムフック
    ├── lib/                   # ユーティリティ関数
    ├── types/                 # TypeScript型定義
    ├── public/                # 静的ファイル
    ├── Dockerfile             # Docker設定
    ├── docker-compose.yml     # Docker Compose設定
    ├── nginx.conf             # Nginx設定
    └── next.config.mjs        # Next.js設定

## 🔧 主要なコンポーネント

### `components/activity-records.tsx`
活動記録と議事録を表示。`excludeMinutes`プロパティで表示内容を切り替え。

### `components/calendar-section.tsx`
Google Calendar APIからスケジュールデータを取得し表示。

### `components/featured-activities.tsx`
参加者募集中の活動をハイライト表示。

### `components/admin-button.tsx`
管理者向けのデータ管理機能へのアクセス。

## 🎨 スタイルガイド

プロジェクトのカラーパレット:
- プライマリ: `#009bde` (青)
- セカンダリ: `#00acc4` (シアン)
- アクセント: `#77c49f` (緑)

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはApache Licenseの下で公開されています。

## 📞 お問い合わせ

Shizuoka Rovers Conference
- Website: https://a-lab-th-23.github.io/SRC_web.io/
- Email: src@shizuoka.scout.jp

---

© 2025 Shizuoka Rovers Conference. All rights reserved.
