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

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();

        if (!Array.isArray(messages)) {
            return new Response("Invalid messages", { status: 400 });
        }

        const completion = await client.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        `You are an expert computer science tutor for beginner computer science students.
                         Explain algorithms clearly. 
                         keep the answers short.
                         Start with the phrase "Sup twin!".
                         Avoid unnecessary theory unless asked.
                         Prefer step-by-step explanations.`,
                }, {
                    role: "system",
                    content:
                        `explain using blocks of code.
                         start straight away with an example of whatever the user is asking for.
                         use young trendy language.
                         keep the answers short and concise.
                         when providing code examples, use JavaScript wherever possible.`,
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
