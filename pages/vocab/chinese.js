import { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import Head from 'next/head'
import Image from 'next/image'

import hsk1 from '@/data/hsk1.js'
import hsk2 from '@/data/hsk2.js'
import hsk3 from '@/data/hsk3.js'
import hsk4 from '@/data/hsk4.js'
import hsk5 from '@/data/hsk5.js'
import hsk6 from '@/data/hsk6.js'

let didInit = false

const initDataset = {
    hsk1: getCookie('vocab_chinese_dataset_hsk1') !== false,
    hsk2: getCookie('vocab_chinese_dataset_hsk2') !== false,
    hsk3: getCookie('vocab_chinese_dataset_hsk3') !== false,
    hsk4: getCookie('vocab_chinese_dataset_hsk4') !== false,
    hsk5: getCookie('vocab_chinese_dataset_hsk5') !== false,
    hsk6: getCookie('vocab_chinese_dataset_hsk6') !== false,
  }

const initResetPool = (dataset) => {
  return [].concat(
    dataset.hsk1 ? hsk1 : [],
    dataset.hsk2 ? hsk2 : [],
    dataset.hsk3 ? hsk3 : [],
    dataset.hsk4 ? hsk4 : [],
    dataset.hsk5 ? hsk5 : [],
    dataset.hsk6 ? hsk6 : [],
  )
}

const initPool = initResetPool(initDataset)

export default function Vocab() {
  console.log('Render')
  const [pool, setPool] = useState(initPool) // list of word prepare for pickup
  const [history, setHistory] = useState([]) // temporary list for keeping previous picked word
  const [cursor, setCursor] = useState(0) // index of word to show on screen
  const [dataset, setDataset] = useState(initDataset) // select data to remain in word pool

  // initial
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
        const pickedWord = pool[poolIndex]
        setHistory([ pickedWord, ...history ])
        pool.splice(poolIndex, 1)
        setPool(pool)
      }
    } else {
      setCursor(--cursor)
    }
  }

  const handleChangeDataset = (e, index) => {
    dataset[`hsk${index}`] = e.target.checked
    setDataset({ ...dataset })
    setPool(initResetPool(dataset))
    setCookie(`vocab_chinese_dataset_hsk${index}`, e.target.checked)
  }

  return (
    <div>
      <Head>
        <title>Vocabulary</title>
        <meta name="description" content="Vocabulary List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl text-center text-gray-100 py-5 bg-gray-600">HSK Vocabulary</h1>
        { history.length > 0 && (
          <div className="text-center text-white bg-gray-800">
            <div className="py-5 container mx-auto">
              <div className="text-xs">{ `${pool.length} words remaining` }</div>
              <div className="py-4">
                <button type="button" className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-2 rounded mr-3" onClick={prevWord} disabled={cursor >= history.length - 1}>&#60; Prev</button>
                <button type="button" className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-2 rounded" onClick={nextWord} disabled={! pool.length && cursor === 0}>Next &#62;</button>
              </div>
              <div className="py-4 text-9xl">{ history[cursor].c }</div>
              <div className="py-4 text-5xl">{ history[cursor].p }</div>
              <div className="py-4 text-4xl">({ history[cursor].w }.) { history[cursor].t }</div>
            </div>
          </div>
        ) }
        <div className="container mx-auto grid grid-cols-2 gap-4">
          <div className="py-5 px-4">
            <div className="text-xl mb-3">Dataset</div>
            <div className="ml-4">
              <div className="mb-2">
                <input id="checkboxDatasetHsk1" type="checkbox" className="appearance-none h-4 w-4 border border-2 border-gray-400 rounded-sm bg-white checked:bg-green-500 checked:border-green-500 cursor-pointer transition duration-500 align-top mt-1" checked={dataset.hsk1} onChange={ (e) => { handleChangeDataset(e, 1) }} />
                <label htmlFor="checkboxDatasetHsk1" className="pl-2 cursor-pointer">HSK1</label>
              </div>
              <div className="mb-2">
                <input id="checkboxDatasetHsk2" type="checkbox" className="appearance-none h-4 w-4 border border-2 border-gray-400 rounded-sm bg-white checked:bg-green-500 checked:border-green-500 cursor-pointer transition duration-500 align-top mt-1" checked={dataset.hsk2} onChange={ (e) => { handleChangeDataset(e, 2) }} />
                <label htmlFor="checkboxDatasetHsk2" className="pl-2 cursor-pointer">HSK2</label>
              </div>
              <div className="mb-2">
                <input id="checkboxDatasetHsk3" type="checkbox" className="appearance-none h-4 w-4 border border-2 border-gray-400 rounded-sm bg-white checked:bg-green-500 checked:border-green-500 cursor-pointer transition duration-500 align-top mt-1" checked={dataset.hsk3} onChange={ (e) => { handleChangeDataset(e, 3) }} />
                <label htmlFor="checkboxDatasetHsk3" className="pl-2 cursor-pointer">HSK3</label>
              </div>
              <div className="mb-2">
                <input id="checkboxDatasetHsk4" type="checkbox" className="appearance-none h-4 w-4 border border-2 border-gray-400 rounded-sm bg-white checked:bg-green-500 checked:border-green-500 cursor-pointer transition duration-500 align-top mt-1" checked={dataset.hsk4} onChange={ (e) => { handleChangeDataset(e, 4) }} />
                <label htmlFor="checkboxDatasetHsk4" className="pl-2 cursor-pointer">HSK4</label>
              </div>
              <div className="mb-2">
                <input id="checkboxDatasetHsk5" type="checkbox" className="appearance-none h-4 w-4 border border-2 border-gray-400 rounded-sm bg-white checked:bg-green-500 checked:border-green-500 cursor-pointer transition duration-500 align-top mt-1" checked={dataset.hsk5} onChange={ (e) => { handleChangeDataset(e, 5) }} />
                <label htmlFor="checkboxDatasetHsk5" className="pl-2 cursor-pointer">HSK5</label>
              </div>
              <div className="mb-2">
                <input id="checkboxDatasetHsk6" type="checkbox" className="appearance-none h-4 w-4 border border-2 border-gray-400 rounded-sm bg-white checked:bg-green-500 checked:border-green-500 cursor-pointer transition duration-500 align-top mt-1" checked={dataset.hsk6} onChange={ (e) => { handleChangeDataset(e, 6) }} />
                <label htmlFor="checkboxDatasetHsk6" className="pl-2 cursor-pointer">HSK6</label>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
      </footer>
    </div>
  )
}
