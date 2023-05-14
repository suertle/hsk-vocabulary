import { useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import Sidebar from '@/components/stock/Sidebar.js'

import { useAuth } from '../../contexts/AuthContext.js'

export default function Stock() {
  const router = useRouter()

  const { user } = useAuth()

  useEffect(() => {
    if (user === undefined || user === null) {
      router.push('/login?redirect=/stock')
    }
  }, [])

  return user === undefined || user === null
    ? null
    : (
      <div>
        <Head>
          <title>Stock Market</title>
          <meta name="description" content="Stock Market Tools" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className="flex flex-row z-0">
            <div className="basis-1/5 bg-gray-800 text-white p-3 min-h-screen">
              {/*<Sidebar />*/}
            </div>

            <div className="basis-3/5 p-3">
              <h2 className="text-xl">tools</h2>
            </div>

          </div>
        </main>
      </div>
    )
}
