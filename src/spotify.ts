import SpotifyWebApi = require('spotify-web-api-node');
import { MusicQuerySchema } from './common.schema';

export const createPlayListFromSpotifyAPI = async (aiResult: MusicQuerySchema, SPOTIFY_CLIENT_ID: string, SPOTIFY_CLIENT_SECRET: string) => {
    console.log('createPlayListFromSpotifyAPI', SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
    const spotifyApi = new SpotifyWebApi({
        clientId: SPOTIFY_CLIENT_ID,
        clientSecret: SPOTIFY_CLIENT_SECRET,
        redirectUri: 'http://localhost:8000'
    });
    let result: { name: string, artists: string }[] = [];
    try {
        // クライアントクレデンシャルフローでアクセストークンを取得
        const data = await spotifyApi.clientCredentialsGrant();
        console.log('アクセストークンを取得しました:', data.body['access_token']);

        // アクセストークンをSpotify APIクライアントに設定
        spotifyApi.setAccessToken(data.body['access_token']);

        // AIの結果に基づいてトラックを検索
        for (const query of aiResult) {
            try {
                const trackResults = await spotifyApi.searchTracks(query.recipeName);
                console.log('Search by:', query.recipeName);

                if (!trackResults.body.tracks || trackResults.body.tracks.items.length === 0) {
                    console.log('トラックが見つかりませんでした:', query.recipeName);
                    continue;
                }

                const tracks = trackResults.body.tracks.items;
                tracks.slice(0, 5).forEach((track, index) => {
                    console.log(`${index + 1}: ${track.name} by ${track.artists.map(artist => artist.name).join(', ')}`);
                    result.push({
                        name: track.name,
                        artists: track.artists.map(artist => artist.name).join(', ')
                    });
                });
            } catch (err) {
                console.error('トラック検索中にエラーが発生しました:', err);
            }
        }
    } catch (err) {
        console.error('アクセストークンの取得中にエラーが発生しました:', err);
    }
    return result;
}