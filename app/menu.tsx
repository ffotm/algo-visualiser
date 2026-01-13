'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FaArrowTrendUp } from 'react-icons/fa6';

const Menu = () => {
    return (
        <div className="min-h-screen pt-30 flex w-full bg-black text-white relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-green-950/10 via-black to-emerald-950/10"></div>


            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `linear-gradient(rgba(21, 128, 61, 0.3) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(21, 128, 61, 0.3) 1px, transparent 1px)`,
                backgroundSize: '60px 60px'
            }}></div>


            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-800/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative container max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center ">
                <div className="w-full grid lg:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block"
                            >
                                <span className="px-4 py-2 bg-green-950/30 border border-green-800/30 rounded-full text-green-400 text-sm font-medium">
                                    Learning Made Visual
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl md:text-5xl font-bold py-6 leading-tight"
                            >
                                <span className="bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
                                    Algorithm
                                </span>

                                <span className="bg-gradient-to-r pl-2 from-green-600 to-emerald-700 bg-clip-text text-transparent">
                                    Visualizer
                                </span>
                                <FaArrowTrendUp className="inline-block ml-2 relative bottom-1 text-green-600" />
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg text-gray-400 max-w-xl leading-relaxed"
                            >
                                Visualize, understand, and master <span className="text-green-500 font-semibold">graph algorithms</span> through interactive animations and intuitive design.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <button className="group px-6 py-2 bg-gradient-to-r from-green-700 to-emerald-800 rounded-xl font-semibold transition-all duration-300 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg hover:shadow-green-900/50 hover:scale-105">
                                <a href="/datastruct" >
                                    <span className="flex items-center gap-2">
                                        Get Started
                                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span></a>
                            </button>

                            <button className="px-6 py-2 border border-green-800/50 rounded-xl font-semibold transition-all duration-300 hover:bg-green-950/30 hover:border-green-700/50">
                                <a href="/datastruct"> View Algorithms</a>
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-4 gap-4 pt-8 border-t border-green-900/30"
                        >
                            <div>
                                <div className="text-2xl font-bold text-green-500">15+</div>
                                <div className="text-sm text-gray-500">Algorithms</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-green-500">6</div>
                                <div className="text-sm text-gray-500">Sort Types</div>
                            </div><div>
                                <div className="text-2xl font-bold text-green-500">+5</div>
                                <div className="text-sm text-gray-500">Datastructures</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-green-500">∞</div>
                                <div className="text-sm text-gray-500">Possibilities</div>
                            </div>



                        </motion.div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="relative hidden lg:flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-lg">

                            <div className="relative mt-10 ml-5 w-130 bg-gradient-to-br from-green-950/30 to-black border border-green-900/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-green-900/20">

                                <div className="space-y-4 mb-6">
                                    {[80, 45, 95, 60, 30, 75, 50, 85].map((height, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${height}%` }}
                                            transition={{
                                                delay: 0.8 + index * 0.1,
                                                duration: 0.6,
                                                ease: "easeOut"
                                            }}
                                            className="h-2 rounded-full bg-gradient-to-r from-green-700 to-green-600 shadow-lg shadow-green-900/30 relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                                        </motion.div>
                                    ))}
                                </div>


                                <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-green-400 border border-green-900/20">
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-700">1</span>
                                        <span>function <span className="text-green-300">quickSort</span>(arr) {'{'}</span>
                                    </div>
                                    <div className="flex items-start gap-2 ml-4">
                                        <span className="text-green-700">2</span>
                                        <span className="text-gray-500">// Divide and conquer</span>
                                    </div>
                                    <div className="flex items-start gap-2 ml-4">
                                        <span className="text-green-700">3</span>
                                        <span>if (arr.length &lt;= 1) return arr;</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-700">4</span>
                                        <span>{'}'}</span>
                                    </div>
                                </div>


                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 1.5 }}
                                    className="absolute w-30 -top-4 -right-4 bg-gradient-to-br from-green-700 to-emerald-800 text-white px-4 py-3 rounded-xl shadow-2xl shadow-green-900/50 border border-green-600/30"
                                >
                                    <div className="text-xs opacity-80">Time Complexity</div>
                                    <div className="text-l font-semibold">O(n log n)</div>
                                </motion.div>




                            </div>


                            <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-emerald-600/5 blur-3xl"></div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    )
}

export default Menu;