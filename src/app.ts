import * as express from "express";
import * as path from "path";
import bodyParser = require('body-parser');


import { getEnvContent } from "./config";
import { WebSchema, MusicQuerySchema } from "./common.schema";
import { createSpotifyQuery } from "./geminiAI";
import { createPlayListFromSpotifyAPI } from "./spotify";


const app = express();
const port = 3000; // ポート番号
const { GEMINI_API_KEY, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = getEnvContent();
// 静的ファイルを提供するミドルウェアを設定
app.use(express.static(path.join(__dirname, "template")));

// ルートにアクセスがあった場合にindex.htmlを送信
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "template", "index.html"));
});

app.use(bodyParser.json());
app.post("/playlist", (req, res) => {
  const data = WebSchema.parse(req.body);
  const result = createPlayList(data);
  result.then((playlist) => {
    res.json(playlist);
  }).catch((error) => {
    res.status(500).json({ error: error.message });
  });
});
app.get("/display_playlist", (req, res) => {
  res.sendFile(path.join(__dirname, "template", "playlist.html"));
});

// サーバーを起動してリクエストを待ち受け状態にする
app.listen(port, () => {
  console.log(`http://localhost:${port} へアクセスください`);
});

const createPlayList = async (data: WebSchema,) => {
  const spotifyQuery = createSpotifyQuery(data, GEMINI_API_KEY);
  const apiResult = (await spotifyQuery).replace("json", "").replace("\n", "").replace("```", "").replace("```", "");
  console.log(apiResult);

  const jsonParse = MusicQuerySchema.parse(JSON.parse(apiResult));
  const createPlayListFromSpotify = createPlayListFromSpotifyAPI(jsonParse, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
  return createPlayListFromSpotify;
}

