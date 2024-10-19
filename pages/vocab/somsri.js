import { useState, useEffect } from 'react';
import Head from 'next/head'

import vocab from '@/data/somsri/vocab'

let didInit = false

const amount = 10

export default function Somsri() {
  const [pool, setPool] = useState(vocab) // list of word prepare for pickup
  const [cursor, setCursor] = useState(0)
  const [history, setHistory] = useState([])

  // initial
  useEffect(() => {
    if (! didInit) {
      didInit = true
      nextWord()
    }
  })

  const prevWord = () => {
    console.log("prev word")
    if (cursor < history.length - 1) {
      setCursor(++cursor)
    }
  }
    
  const nextWord = () => {
    if (cursor === 0) {
      console.log(pool.length)
      console.log(history)
      console.log(cursor)
      if (pool.length > 0) {
        const poolIndex = Math.floor(Math.random() * pool.length)
        const pickedWord = pool[poolIndex]
        setHistory([ pickedWord, ...history ])
        pool.splice(poolIndex, 1)
        setPool(pool)
      }
    } else {
      setCursor(--cursor)
    }
  }

  return (
    <>
      <Head>
        <title>Somsri Vocabulary</title>
        <meta name="description" content="Somsri Vocabulary List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen bg-pink-800">
        <div className="container mx-auto px-5">

          <div className="text-amber-200">
            <div className="flex items-center justify-between">
              <button type="button" className="w-10 h-10 border-solid border-red-600 rounded-lg border bg-pink-700 shadow mt-3" onClick={prevWord} disabled={cursor >= history.length - 1}>&#60;</button>
              <div className="text-l mt-3">Practice</div>
              <button type="button" className="w-10 h-10 border-solid border-red-600 rounded-lg border bg-pink-700 shadow mt-3" onClick={nextWord} disabled={! pool.length && cursor === 0}>&#62;</button>
            </div>

            <div className="flex justify-between mt-8">
              <div>Beginner</div>
              <div>Day 1</div>
              <div>Beginner</div>
            </div>

            <div className="flex flex-col items-center justify-center text-5xl mt-12">
              { history.length > 0 && (<>
                <button className="w-full aspect-square text-pink-800 bg-pink-50 border border-solid border-2 border-pink-700 rounded-3xl shadow p-5">{ history[cursor].e }</button>
                <button>{ history[cursor].t }</button>
              </>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}