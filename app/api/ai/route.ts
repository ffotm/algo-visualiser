import OpenAI from "openai";

const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("Missing API Key");
}

const client = new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Algorithm Visualizer AI",
    },
});
let systemPrompt = `
You are an expert computer science tutor for beginner computer science students.
Explain algorithms clearly.
keep the answers short.
Start with "Sup twin!"
Avoid unnecessary theory unless asked.
Prefer step-by-step explanations.
`;


export async function POST(request: Request) {
    try {
        const { messages, context } = await request.json();

        if (context?.section === "sorts") {
            systemPrompt += `
You are on the Sorting Visualizer page.
Use the ${context.algo} algorithm Explain it very briefly and Jump straight into the steps.
Use THIS array ${JSON.stringify(context.table)} as an example to explain.
Explain each step of the ${JSON.stringify(context.algo)} sort algorithm on this array.
Explain with JavaScript code blocks only if asked.
Keep the answers short.
`;
        }
        if (context?.section === "algorithms") {
            systemPrompt += `
You are on the pathfinding algorithm Visualizer page.
Use the ${context.algo} algorithm Explain it very briefly and Jump straight into the steps.
Explain each step of the ${JSON.stringify(context.algo)} pathfinding algorithm on this array.
Use THIS grid ${JSON.stringify(context.table)} as an example to explain, each element has properties like row, col, isWall, isPath, isVisited, isStart, isEnd, distance.
Explain with JavaScript code blocks.
Keep the answers short.
`;
        }

        if (!Array.isArray(messages)) {
            return new Response("Invalid messages", { status: 400 });
        }


        const completion = await client.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        `${systemPrompt}`,
                },
                ...messages,
            ],
        });

        return Response.json({
            content: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error("AI error:", error);
        return Response.json(
            { error: "Error generating AI response" },
            { status: 500 }
        );
    }

}
