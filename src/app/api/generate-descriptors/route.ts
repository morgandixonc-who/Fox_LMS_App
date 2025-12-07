import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        console.log("API: Request received");
        let body;
        try {
            body = await req.json();
            console.log("API: Body parsed", body);
        } catch (e) {
            console.error("API: Body parsing failed", e);
            return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
        }

        const { emotion } = body;

        if (!emotion) {
            console.log("API: Emotion missing");
            return NextResponse.json({ error: 'Emotion is required' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("API: API Key missing");
            return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
        }

        // Read system prompt
        const promptPath = path.join(process.cwd(), 'src', 'lib', 'prompts', 'descriptorgenerator.txt');
        console.log("API: Reading prompt from", promptPath);

        let systemPrompt = "";
        try {
            systemPrompt = await fs.readFile(promptPath, 'utf-8');
            console.log("API: Prompt read successfully (length: " + systemPrompt.length + ")");
        } catch (err) {
            console.error("API: Failed to read system prompt:", err);
            return NextResponse.json({ error: 'System prompt file missing' }, { status: 500 });
        }

        console.log("API: Initializing GoogleGenAI");
        const ai = new GoogleGenAI({ apiKey });
        // Use the model name that was proven to work in the user's test script
        console.log("API: Using model gemini-2.0-flash-lite");
        const model = "gemini-2.0-flash-lite";

        const contents = [
            {
                role: 'user',
                parts: [
                    { text: systemPrompt + "\n\n" + `List descriptors for: ${emotion}` }
                ]
            }
        ];

        console.log("API: Calling generateContent");

        try {
            const result = await ai.models.generateContent({
                model,
                contents,
            });
            console.log("API: Call complete");

            // Safer text extraction
            let text = "";

            // Standard Gemini Result Structure check
            if ((result as any).response && (result as any).response.candidates && (result as any).response.candidates.length > 0) {
                const candidate = (result as any).response.candidates[0];
                if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                    text = candidate.content.parts[0].text;
                }
            }
            // Result might be the response itself (not wrapped in .response)
            else if ((result as any).candidates && (result as any).candidates.length > 0) {
                const candidate = (result as any).candidates[0];
                if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                    text = candidate.content.parts[0].text;
                }
            }
            // SDK convenience method
            else if (typeof (result as any).text === 'function') {
                text = (result as any).text();
            } else if ((result as any).response && typeof (result as any).response.text === 'function') {
                text = (result as any).response.text();
            } else {
                console.warn("API: Unexpected result shape", JSON.stringify(result));
                text = JSON.stringify(result, null, 2);
            }

            console.log("API: Text extracted", text.substring(0, 50) + "...");
            return NextResponse.json({ result: text });

        } catch (genError: any) {
            console.error("API: Generation error", genError);
            return NextResponse.json({ error: "Generation failed: " + genError.message }, { status: 500 });
        }

    } catch (error: any) {
        console.error('API: Unhandled Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
