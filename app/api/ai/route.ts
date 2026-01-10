export async function POST(req: Request) {
    const { algorithm, step, treeState, highlightedNodes } = await req.json();

    const prompt = generatePrompt(algorithm, step, treeState, highlightedNodes);

    const response = await fetchOpenAI(prompt); // your AI call
    return Response.json({ explanation: response });
}
