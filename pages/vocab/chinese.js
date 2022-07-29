import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import hsk1 from '@/data/hsk1.js'

export default function Vocab() {
  const [stack, setStack] = useState([])
  const [cursor, setCursor] = useState(0)

  useEffect(() => {
    setStack([])
    nextWord()
  }, [])

  const prevWord = () => {
    if (cursor < stack.length - 1) {
      setCursor(++cursor)
    }
  }

  const nextWord = () => {
    if (cursor === 0) {
      const randomedWord = hsk1[ Math.floor(Math.random() * hsk1.length) ]
      setStack(stack => [randomedWord, ...stack])
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
        <div>{ stack.map((word, i) => (<span className="mr-2" key={i}>{ word.c }</span>)) }</div>*/}
        { stack.length > 0 && (
          <div className="py-5 container mx-auto">
            <div className="py-4">
              <button type="button" className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-2 rounded mr-3" onClick={prevWord} disabled={cursor >= stack.length - 1}>&#60; Prev</button>
              <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded" onClick={nextWord}>Next &#62;</button>
            </div>
            <div className="py-4 text-9xl">{ stack[cursor].c }</div>
            <div className="py-4 text-5xl">{ stack[cursor].p }</div>
            <div className="py-4 text-4xl">({ stack[cursor].w }.) { stack[cursor].t }</div>
          </div>
        ) }
      </main>

      <footer>
      </footer>
    </div>
  )
}
