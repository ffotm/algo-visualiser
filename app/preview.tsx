'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import MergeSort from './sorts/mergeSort'
import bubbleSort from './sorts/bubbleSort'






const Preview = () => {
    const [array, setArray] = useState([])

    const createArray = () => {
        const arr = []
        for (let i = 0; i < 10; i++) {
            arr.push(Math.floor(Math.random() * 100) + 10)
        }
        setArray(arr);
        return arr;
    }


    useEffect(() => {
        createArray();
        console.log(array)
    }, [])


    return (

        <div className=" h-screen flex w-full font-family-base bg-[var(--bg)] text-[var(--text)] border-b border-[var(--border)]">
            <div className=" border-2 border-[var(--border)] flex flex-row m-20 p-3 rounded-2xl ">
                {array.map((value, idx) => (
                    <div className="p-3 font-bold border-1 border-[var(--border)] rounded-2xl m-2 bg-[var(--border)] flex justify-center array-bar" key={idx}
                        style={{ height: value * 3 }}>
                        {value}

                    </div>
                ))}


            </div><button className="btn btn-green" onClick={createArray}>regenerate Array</button>
            <button className="btn btn-blue" onClick={() => bubbleSort(array)}>

                Merge Sort
            </button>

        </div >
    )
}

export default Preview