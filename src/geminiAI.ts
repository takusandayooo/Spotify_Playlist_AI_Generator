import { GoogleGenerativeAI } from "@google/generative-ai";
import { WebSchema } from "./common.schema";



export const createSpotifyQuery = async ({ nowMood, genre, comment }: WebSchema, GEMINI_API_KEY: string): Promise<string> => {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
                入力される情報今の気分や好きなジャンル、任意でコメントがあります。そこの情報の中から「気分」や「ジャンル」や「コメント」に基づいて考えた日本語のSpotify検索クエリをJSON形式で5こ出力してください。

                **JSONスキーマ**:
                Recipe = {'recipeName': string}
                Return: Array<Recipe>

                入力
                今の気分: ${nowMood}
                好きなジャンル: ${genre}
                コメント: ${comment}
                `
    const result = await model.generateContentStream(prompt);

    let text = '';
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;
    }
    return text;
}