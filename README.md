# AIを用いたSpotifyプレイリスト自動作成アプリ

## 概要
このアプリは、今の気持ちやジャンル、簡単なコメントを入力するだけで、AIが最適なSpotifyプレイリストを作成してくれる便利なツールです。SpotifyAPIを活用して曲を検索し、GeminiAIを使用して入力テキストから検索クエリを生成します。

**デプロイ済みのアプリはこちらから確認できます：**  
👉 [Spotifyプレイリスト自動作成アプリ](https://spotify-ai-530k.onrender.com/)  
※無料プランでデプロイしているため、初回アクセスには少し時間がかかる場合があります。

---

## 使用技術
- **Next.js**: フロントエンドフレームワーク  
- **TypeScript**: 型安全な開発のため  
- **SpotifyAPI**: 曲を検索するために使用  
- **GeminiAI**: 入力されたテキストから検索クエリを生成  

---

## APIキーの取得方法

### 1. SpotifyAPIのAPIキーを取得
SpotifyAPIの利用にはクライアントIDとクライアントシークレットが必要です。以下の手順で取得してください：
1. [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)にアクセス。
2. アプリケーションを作成し、クライアントIDとクライアントシークレットを取得。  
   **参考記事**: [SpotifyAPIガイド](https://apidog.com/jp/blog/spotify-web-api-guide/#spotify%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92%E4%BD%9C%E6%88%90)

### 2. GeminiAIのAPIキーを取得
GoogleのGeminiAPIを利用するためにAPIキーが必要です。詳細な手順は公式ドキュメントをご覧ください：  
👉 [GeminiAPIドキュメント](https://ai.google.dev/gemini-api/docs?hl=ja)

---

## アプリの使い方

1. **このレポジトリをクローン**
   ```bash
   git clone https://github.com/your-repo/spotify-ai.git
   cd spotify-ai
   ```

2.	VSCode Dev Container拡張機能とDockerをインストール
   - Dev Containerの拡張機能は[こちら](https://code.visualstudio.com/docs/devcontainers/containers)を参照。
   - Dockerは[公式サイト](https://www.docker.com/)からインストール。

3.	APIキーを環境変数に設定
   - 取得したAPIキーを`.env`ファイルに記入します。
   - `.env.example`を参考に、以下のように設定してください：
        ```plaintext
     GEMINI_API_KEY=your_api_key
     SPOTIFY_CLIENT_ID=your_client_id
     SPOTIFY_CLIENT_SECRET=your_client_secret
        ```
4.	依存関係をインストール
    ```bash
    pnpm install
    ```

5.	開発サーバーを起動
    ```bash
    pnpm start
    ```

6. ブラウザでアクセス
   開発サーバーが起動したら、以下にアクセスしてください：  
👉 [http://localhost:3000](http://localhost:3000)