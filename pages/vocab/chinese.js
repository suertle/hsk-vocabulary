import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import hsk1 from '@/data/hsk1.js'

let didInit = false

export default function Vocab() {
  const [pool, setPool] = useState(hsk1)
  const [history, setHistory] = useState([])
  const [cursor, setCursor] = useState(0)

  useEffect(() => {
    if (! didInit) {
      didInit = true
      nextWord()
    }
  }, [])

  const prevWord = () => {
    if (cursor < history.length - 1) {
      setCursor(++cursor)
    }
  }

  const nextWord = () => {
    if (cursor === 0) {
      if (pool.length > 0) {
        const poolIndex = Math.floor(Math.random() * pool.length)
        const word = pool[poolIndex]
        setHistory([ word, ...history ])
        pool.splice(poolIndex, 1)
        setPool(pool)
      }
    } else {
      setCursor(--cursor)
    }
  }

  return (
    <div>
      <Head>
        <title>Vocabulary</title>
        <meta name="description" content="Vocabulary List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center text-white bg-gray-800">
        <h1 className="text-4xl text-gray-600 py-5 bg-gray-300">HSK Vocabulary</h1>
        {/*<div>{ cursor }</div>
        <div>{ history.map((word, i) => (<span className="mr-2" key={i}>{ word.c }</span>)) }</div>*/}
        { history.length > 0 && (
          <div className="py-5 container mx-auto">
            <div className="py-4">
              <button type="button" className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-2 rounded mr-3" onClick={prevWord} disabled={cursor >= history.length - 1}>&#60; Prev</button>
              <button type="button" className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-2 rounded" onClick={nextWord} disabled={! pool.length && cursor === 0}>Next &#62;</button>
            </div>
            <div className="py-4 text-9xl">{ history[cursor].c }</div>
            <div className="py-4 text-5xl">{ history[cursor].p }</div>
            <div className="py-4 text-4xl">({ history[cursor].w }.) { history[cursor].t }</div>
          </div>
        ) }
      </main>

      <footer>
      </footer>
    </div>
  )
}
