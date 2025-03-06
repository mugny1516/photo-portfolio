# Photo Portfolio

**Photo Portfolio** は、React と Material-UI (MUI) を使用して構築された、カメラマンのためのポートフォリオサイトです。microCMS をバックエンドとして活用し、「Home」ページの写真や「About」ページのデータを管理しています。

このサイトの特徴として、写真の撮影時間に応じて背景色が変化する仕組みを採用しており、時間の流れとともに写真が持つ雰囲気をより引き立てるデザインになっています。

<div style="display: flex; justify-content: space-between;">
  <img src="/public/image1.jpg" alt="Image 1" width="45%" />
  <img src="/public/image2.jpg" alt="Image 2" width="45%" />
</div>

## 注意事項

このポートフォリオサイトにアクセスするためには、パスコード「000」が必要です。
最初にパスコードが入力されるので、上記を入力して送信をし、サイトを閲覧してください。

<img src="/public/image3.jpg" alt="Image 3" width="100%" />

## 使用技術

- **フロントエンド**:
  - React
  - React Router
  - Material-UI (MUI)
- **データ取得**:
  - SWR (データフェッチングライブラリ)
- **開発ツール**:
  - Vite
  - TypeScript
  - ESLint

## プロジェクトの立ち上げ方

### 1. リポジトリのクローン

```bash
git clone https://github.com/your-username/photo-portfolio.git
cd photo-portfolio
```

## microCMS の設定

このプロジェクトでは、microCMS を使用して「Home」ページの写真データと「About」ページのコンテンツを管理しています。以下の手順で microCMS を設定してください。

### 1. microCMS アカウントの作成

microCMS にアクセスし、アカウントを作成します。

### 2. API の作成

写真データ用 API: コンテンツモデルに「写真」API を作成し、以下のフィールドを追加します。

```
title（文字列）
description（文字列）
img（画像）
hour（数値）
```

Profile 用 API: コンテンツモデルに「Profile」API を作成し、以下のフィールドを追加します。

```
title（文字列）
```

About ページ用 API: コンテンツモデルに「About」API を作成し、以下のフィールドを追加します。

```
title（文字列）
description（文字列）
img（画像）
```

### 3. API キーの取得

microCMS の管理画面から API キーを取得し、.env ファイルに設定します。

#### 環境変数の設定

プロジェクトのルートに .env ファイルを作成し、以下の内容を追加します。

```
<!-- microCMS の API キー -->
VITE_MICROCMS_API_KEY=your-api-key

<!-- microCMS のエンドポイント URL -->
VITE_MICROCMS_ENDPOINT=https://your-endpoint.microcms.io/api/v1
```
