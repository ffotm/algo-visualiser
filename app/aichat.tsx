'use client'
import React from 'react'
import { useState } from 'react';
import TextType from './ui/splitText';
import "./globals.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { usePathname } from "next/navigation";
import { useAlgoContext } from './algoContext';


class historyItem {
    id: number;
    question: string;
    answer: string;
    constructor(id: number, question: string, answer: string) {
        this.id = id;
        this.question = question;
        this.answer = answer;
    }
}



const Aichat = () => {
    const [showChat, setShowChat] = React.useState(false);
    const [history, setHistory] = useState<historyItem[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState("");




    const { section, algo, table } = useAlgoContext();


    const addHistoryItem = (question: string, answer: string) => {
        const newItem = new historyItem(history.length + 1, question, answer);
        setHistory((prev) => [...prev.slice(0, 9), newItem]);
    }
    const pathname = usePathname();


    const handleInput = async () => {
        if (!input.trim()) return;

        setIsLoading(true);
        const currentInput = input;
        setInput("");

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [{ role: "user", content: currentInput }],
                    context: { section, algo, table },
                })
            });



            const data = await response.json();
            console.log(data.content);
            setOutput(data.content);
            addHistoryItem(currentInput, data.content);
            setIsLoading(false)
        }
        catch (error) {
            console.error("Error fetching AI response:", error);
            setIsLoading(false);
        }
    }




    return (
        <div className="">

            {showChat && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
                    onClick={() => setShowChat(false)}
                />
            )}


            <div className={`fixed top-0 right-0 h-screen w-full bg-black sm:w-[500px] z-50 transform transition-transform duration-300 ease-in-out ${showChat ? 'translate-x-0' : 'translate-x-full'} flex flex-col border-l border-gray-800`}>

                {history.length === 0 &&
                    <div className="p-6 border-b flex items-center justify-between border-gray-800">

                        <TextType
                            text={["Hello twin,", "Need help with Algorithms?", "Ask me anything!"]}
                            typingSpeed={80}
                            pauseDuration={500}
                            showCursor={true}
                            cursorCharacter="|"
                            className="text-xl font-bold text-green-700"
                        />
                        <button
                            onClick={() => setShowChat(false)}
                            className="text-gray-400 hover:text-white transition-colors ml-4"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>}


                {history.length > 0 && (
                    <div className="p-4 border-b border-gray-800 max-h-16 overflow-y-auto">
                        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Recent Questions</p>
                        {history.map((item) => (
                            <div key={item.id} className="mb-2 p-2 hover:bg-gray-800 rounded-lg border-gray-800 transition-colors cursor-pointer">
                                <p className="text-sm text-green-700 truncate">Q: {item.question}</p>
                                <p className="text-sm text-pink-700 truncate">A: {item.answer}</p>
                            </div>
                        ))}
                    </div>
                )}


                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {output ? (
                        <div className=" border border-gray-800 rounded-lg p-4">
                            <div className="prose prose-invert prose-green overflow-x-auto">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code({ node, inline, className, children, ...props }) {
                                            return (
                                                <code
                                                    className={`text-pink-900 p-2 rounded block my-2  ${inline ? "inline" : ""}`}
                                                    {...props}
                                                >
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                >
                                    {output}
                                </ReactMarkdown>

                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 mt-20">
                            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <p>Ask a question to get started</p>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex items-center gap-2 text-green-800">
                            <div className="w-2 h-2 bg-green-800 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-green-800 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-green-800 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            <span className="text-sm ml-2">Thinking...</span>
                        </div>
                    )}
                </div>


                <div className="p-4 border-t border-gray-800  ">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            className="w-full p-4 pr-12 bg-gray-950 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                            placeholder="Type your question..."
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !isLoading) {
                                    handleInput();
                                }
                            }}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleInput}
                            disabled={isLoading || !input.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{input.length} characters</p>
                </div>
            </div>


            <button
                onClick={() => setShowChat(!showChat)}
                className="fixed bottom-8 right-8 bg-green-900 z-30 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105"
            >
                <span className="font-medium">AI Helper</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showChat ? "M6 18L18 6M6 6l12 12" : "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"} />
                </svg>
            </button>
        </div>
    )
}


export default Aichat