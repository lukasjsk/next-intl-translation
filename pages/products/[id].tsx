import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { getTranslationsForPages } from '@/lib/translations'

interface Product {
  id: string
  name: string
  description: string
  price: string
  features: string[]
}

interface ProductPageProps {
  product: Product
}

const products: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Premium Softwarelösung',
    description: 'Eine umfassende Softwarelösung für moderne Unternehmen.',
    price: '299€/Monat',
    features: [
      'Intuitive Benutzeroberfläche',
      'Skalierbare Architektur',
      '24/7 Support',
      'Automatische Updates',
      'Erweiterte Sicherheit'
    ]
  },
  '2': {
    id: '2',
    name: 'Basis-Paket',
    description: 'Ideal für kleine Unternehmen und Startups.',
    price: '99€/Monat',
    features: [
      'Grundfunktionen',
      'E-Mail Support',
      'Monatliche Updates',
      'Standardsicherheit'
    ]
  },
  '3': {
    id: '3',
    name: 'Enterprise Edition',
    description: 'Für große Unternehmen mit besonderen Anforderungen.',
    price: 'Preis auf Anfrage',
    features: [
      'Alle Premium-Features',
      'Dedizierter Account Manager',
      'Custom Integration',
      'Vor-Ort-Training',
      'Service Level Agreement'
    ]
  }
}

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter()
  const t = useTranslations('products')
  const tCommon = useTranslations('common')
  
  if (router.isFallback) {
    return <div>{tCommon('loading')}</div>
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-purple-50 p-4 rounded-lg mb-8">
          <p className="text-purple-800">
            📍 Diese Seite nutzt den Pages Router (Dynamic Route: /products/[id])
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{product.description}</p>
            
            <div className="bg-blue-100 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">{t('price')}</h3>
              <p className="text-2xl font-bold text-blue-600">{product.price}</p>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold">
                {t('buyNow')}
              </button>
              <button className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 font-semibold">
                {t('tryFree')}
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{t('features')}</h2>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">{t('questions.title')}</h3>
              <p className="text-gray-600 mb-4">
                {t('questions.description')}
              </p>
              <Link href="/contact" className="text-blue-600 hover:underline">
                {t('questions.contactUs')} →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">{t('moreProducts')}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.values(products)
              .filter(p => p.id !== product.id)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold mb-2">{p.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{p.description}</p>
                  <p className="text-blue-600 font-semibold">{p.price}</p>
                </Link>
              ))}
          </div>
        </div>

        <div className="mt-8 space-x-4">
          <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            {tCommon('backToHome')}
          </Link>
          <Link href="/about" className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">
            Über uns
          </Link>
          <Link href="/contact" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Kontakt aufnehmen
          </Link>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string
  const product = products[id]

  if (!product) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      product,
      ...(await getTranslationsForPages(['common', 'products']))
    }
  }
}