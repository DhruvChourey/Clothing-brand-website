import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { ShopProvider } from '@/store/ShopProvider'
import Home from '@/pages/Home'

const Shop = lazy(() => import('@/pages/Shop'))
const Collections = lazy(() => import('@/pages/Collections'))
const ProductPage = lazy(() => import('@/pages/ProductPage'))
const Bag = lazy(() => import('@/pages/Bag'))
const SearchPage = lazy(() => import('@/pages/SearchPage'))
const Journal = lazy(() => import('@/pages/Journal'))
const JournalArticle = lazy(() => import('@/pages/JournalArticle'))
const Care = lazy(() => import('@/pages/Care'))
const Account = lazy(() => import('@/pages/Account'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="collections" element={<Collections />} />
            <Route path="product/:slug" element={<ProductPage />} />
            <Route path="bag" element={<Bag />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="journal" element={<Journal />} />
            <Route path="journal/:slug" element={<JournalArticle />} />
            <Route path="care" element={<Care />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ShopProvider>
    </BrowserRouter>
  )
}
