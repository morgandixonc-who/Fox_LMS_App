import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        const { messages, emotion, descriptors } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
        }

        // Read system prompt
        const promptPath = path.join(process.cwd(), 'src', 'lib', 'prompts', 'patient_chat.txt');
        let systemPromptTemplate = "";
        try {
            systemPromptTemplate = await fs.readFile(promptPath, 'utf-8');
        } catch (err) {
            console.error("Chat API: Failed to read system prompt:", err);
            systemPromptTemplate = "You are a patient simulation.";
        }

        // Inject Context
        const systemPrompt = systemPromptTemplate
            .replace('{{EMOTION}}', emotion || 'Unknown')
            .replace('{{DESCRIPTORS}}', descriptors || 'None');

        const ai = new GoogleGenAI({ apiKey });
        const model = 'gemini-2.0-flash-lite';

        // Format history for Gemini
        // Gemini expects specific role mapping or content structure.
        // Simple 'user' vs 'model' roles work well.
        // We precede history with the system instruction as a user message or system instruction config if available.
        // For 'gemini-2.0-flash-lite' and this SDK, we can put system prompt in the first message or config.
        // Let's preserve the user's pattern: standard messages list.

        // Format history for Gemini
        // We use systemInstruction for the persona context.
        // contents should only contain the actual chat history.

        const contents = messages.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        const config = {
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            }
        };

        // Create a ReadableStream
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const response = await ai.models.generateContentStream({
                        model,
                        config,
                        contents,
                    });

                    for await (const chunk of response) {
                        const text = chunk.text;
                        if (text) {
                            controller.enqueue(new TextEncoder().encode(text));
                        }
                    }
                    controller.close();
                } catch (err) {
                    console.error("Stream Error:", err);
                    controller.error(err);
                }
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
            },
        });

    } catch (error: any) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
