import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        console.log("API: generate-tasks request received");
        let body;
        try {
            body = await req.json();
        } catch (e) {
            return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
        }

        const { emotion, descriptors } = body;

        if (!emotion) {
            return NextResponse.json({ error: 'Emotion is required' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
        }

        // Read system prompt
        const promptPath = path.join(process.cwd(), 'src', 'lib', 'prompts', 'taskgenerator.txt');

        let systemPrompt = "";
        try {
            systemPrompt = await fs.readFile(promptPath, 'utf-8');
        } catch (err) {
            console.error("API: Failed to read system prompt:", err);
            return NextResponse.json({ error: 'System prompt file missing' }, { status: 500 });
        }

        // Initialize Gemini
        const ai = new GoogleGenAI({ apiKey });
        const model = "gemini-flash-latest";

        const userInput = `Emotion: ${emotion}\nDescriptors: ${descriptors || 'N/A'}\n\nGenerate training tasks based on this.`;

        const contents = [
            {
                role: 'user',
                parts: [
                    { text: systemPrompt + "\n\n" + userInput }
                ]
            }
        ];

        console.log("API: Calling generateContent for tasks");

        try {
            const result = await ai.models.generateContent({
                model,
                contents,
            });

            // Extract text logic (same robust checks as other route)
            let text = "";
            if ((result as any).response && (result as any).response.candidates && (result as any).response.candidates.length > 0) {
                const candidate = (result as any).response.candidates[0];
                if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                    text = candidate.content.parts[0].text;
                }
            } else if ((result as any).candidates && (result as any).candidates.length > 0) {
                const candidate = (result as any).candidates[0];
                if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                    text = candidate.content.parts[0].text;
                }
            } else if (typeof (result as any).text === 'function') {
                text = (result as any).text();
            } else if ((result as any).response && typeof (result as any).response.text === 'function') {
                text = (result as any).response.text();
            } else {
                text = JSON.stringify(result, null, 2);
            }

            // Clean Markdown Code Blocks if present (e.g., ```json ... ```)
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();

            console.log("API: Task generation complete. Length:", text.length);

            // Validate JSON
            try {
                JSON.parse(text); // Check if valid JSON
            } catch (jsonErr) {
                console.warn("API: Response was not valid JSON:", text.substring(0, 100));
                // We'll return it anyway, but the frontend might fail to parse.
                // Or we can error out. Let's return the text but logged warning.
            }

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
