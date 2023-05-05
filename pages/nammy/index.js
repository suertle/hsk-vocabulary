import { useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { useAuth } from '../../contexts/AuthContext.js'
import { database } from '@/config/firebase.js'
import { collection, getDocs } from "firebase/firestore"; 

console.log(database)

export default function Stock() {

  const router = useRouter()

  const { user } = useAuth()

  useEffect(() => {
    getDocs(collection(database, "nammy_teachings"))
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().started_at}`);
      });
    })
  }, [])


  useEffect(() => {
    if (user === null) {
      router.push('/login?redirect=/nammy')
    }
  }, [])

  return user === null
    ? null
    : (
      <div>
        <Head>
          <title>{ 'Nammy <3' }</title>
          <meta name="description" content="Utility for Nammy" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="bg-pink-50 text-pink-500 h-screen">
          <div className="container mx-auto p-3">
            <div className="rounded-lg bg-white p-3">
              Nammy
            </div>
          </div>
        </main>
      </div>
    )
}
