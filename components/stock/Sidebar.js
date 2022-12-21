import Link from 'next/link'

export default function StockSidebar() {
  return (
    <>
      <h1 className="text-2xl text-center text-gray-100 py-3">Stock Tools</h1>
      <hr/>
      <ul className="py-3 text-lg">
        <li className="mb-3">
          <Link href="/stock/calculator">Amount</Link>
        </li>
        <li className="mb-3">
          <Link href="https://www.google.com">Tea</Link>
        </li>
        <li className="mb-3">
          <Link href="https://www.google.com">Milk</Link>
        </li>
      </ul>
    </>
  )
}
