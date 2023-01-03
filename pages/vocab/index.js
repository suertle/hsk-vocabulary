import { useEffect } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

export default function Chinese() {
  const router = useRouter()

  useEffect(() => {
    router.push('/vocab/chinese');
  }, []);

  return (
    <div>Loading...</div>
  )
}
