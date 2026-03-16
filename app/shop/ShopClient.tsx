'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'
import QuickAddButton from '@/components/QuickAddButton'
import ProductRating from '@/components/ProductRating'
import WishlistButton from '@/components/WishlistButton'

interface ShopClientProps {
  initialCollections: any[]
  initialSizes: string[]
  initialColors: string[]
}

interface FilterState {
  collections: string[]
  sizes: string[]
  colors: string[]
  priceRange: [number, number]
  inStock: boolean
  search: string
}

type SortOption = 'newest' | 'price-low' | 'price-high' | 'name-az'

export default function ShopClient({ initialCollections, initialSizes, initialColors }: ShopClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [filters, setFilters] = useState<FilterState>({
    collections: searchParams.get('collections')?.split(',').filter(Boolean) || [],
    sizes: searchParams.get('sizes')?.split(',').filter(Boolean) || [],
    colors: searchParams.get('colors')?.split(',').filter(Boolean) || [],
    priceRange: [
      parseInt(searchParams.get('minPrice') || '0'),
      parseInt(searchParams.get('maxPrice') || '1000')
    ],
    inStock: searchParams.get('inStock') === 'true',
    search: searchParams.get('search') || '',
  })

  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [products, setProducts] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [debouncedSearch, setDebouncedSearch] = useState(filters.search)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search)
    }, 500)
    return () => clearTimeout(timer)
  }, [filters.search])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.collections.length > 0) params.set('collections', filters.collections.join(','))
    if (filters.sizes.length > 0) params.set('sizes', filters.sizes.join(','))
    if (filters.colors.length > 0) params.set('colors', filters.colors.join(','))
    if (filters.priceRange[0] > 0) params.set('minPrice', filters.priceRange[0].toString())
    if (filters.priceRange[1] < 1000) params.set('maxPrice', filters.priceRange[1].toString())
    if (filters.inStock) params.set('inStock', 'true')
    if (filters.search) params.set('search', filters.search)
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
    router.push(newUrl)
  }, [filters, pathname, router])

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts()
  }, [debouncedSearch, filters.collections, filters.sizes, filters.colors, filters.priceRange, filters.inStock])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      let query = `*[_type == "product" && defined(slug.current)`

      if (debouncedSearch) {
        query += ` && (name match "*${debouncedSearch}*" || description match "*${debouncedSearch}*")`
      }

      if (filters.collections.length > 0) {
        query += ` && references(*[_type == "collection" && slug.current in $collections]._id)`
      }

      query += ` && price >= $minPrice && price <= $maxPrice`

      if (filters.inStock) {
        query += ` && count(*[_type == "variant" && references(^._id) && stock > 0 && isActive == true]) > 0`
      }

      query += `] | order(name asc) {
        _id,
        name,
        slug,
        price,
        compareAtPrice,
        images,
        badges,
        createdAt,
        collections[]->{ title },
        "variants": *[_type == "variant" && references(^._id) && isActive == true] {
          _id,
          size,
          "color": color->name,
          "colorSlug": color->slug.current,
          "hexCode": color->hexCode,
          stock,
          isActive,
          priceOverride
        }
      }`

      const productsData = await fetch('/api/products?' + new URLSearchParams({
        query,
        collections: filters.collections.join(','),
        minPrice: filters.priceRange[0].toString(),
        maxPrice: filters.priceRange[1].toString(),
      })).then(res => res.json())

      let filteredProducts = Array.isArray(productsData) ? productsData : []

      if (filters.sizes.length > 0) {
        filteredProducts = filteredProducts.filter((product: any) =>
          product.variants?.some((v: any) => filters.sizes.includes(v.size))
        )
      }

      if (filters.colors.length > 0) {
        filteredProducts = filteredProducts.filter((product: any) =>
          product.variants?.some((v: any) => filters.colors.includes(v.color))
        )
      }

      if (filters.inStock) {
        filteredProducts = filteredProducts.filter((product: any) =>
          product.variants?.some((v: any) => v.stock > 0 && v.isActive)
        )
      }

      setProducts(filteredProducts)
      setTotalCount(filteredProducts.length)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'name-az': return a.name.localeCompare(b.name)
      case 'newest':
      default: return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    }
  })

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: Array.isArray(prev[key]) && prev[key].includes(value)
        ? (prev[key] as string[]).filter((v: string) => v !== value)
        : [...(Array.isArray(prev[key]) ? prev[key] : []), value]
    }))
  }

  const clearFilters = () => {
    setFilters({
      collections: [],
      sizes: [],
      colors: [],
      priceRange: [0, 1000],
      inStock: false,
      search: '',
    })
    setSortBy('newest')
  }

  const hasActiveFilters = filters.collections.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000 ||
    filters.inStock

  const getFilterCount = (key: string): number => {
    switch (key) {
      case 'collections': return filters.collections.length
      case 'sizes': return filters.sizes.length
      case 'colors': return filters.colors.length
      case 'price': return (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) ? 1 : 0
      case 'stock': return filters.inStock ? 1 : 0
      default: return 0
    }
  }

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => prev === name ? null : name)
  }

  const sortLabels: Record<SortOption, string> = {
    'newest': 'Newest',
    'price-low': 'Price: Low to High',
    'price-high': 'Price: High to Low',
    'name-az': 'Name: A to Z',
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-sm focus:ring-1 focus:ring-brand-maroon focus:border-brand-maroon outline-none transition-colors"
        />
      </div>

      {/* Horizontal Filter Bar */}
      <div ref={dropdownRef} className="relative">
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-gray-200">
          {/* Collection Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('collections')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs tracking-wide uppercase border transition-colors ${
                openDropdown === 'collections' || filters.collections.length > 0
                  ? 'border-brand-maroon text-brand-maroon'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              Collection
              {getFilterCount('collections') > 0 && (
                <span className="bg-brand-maroon text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {getFilterCount('collections')}
                </span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'collections' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'collections' && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-30 min-w-[200px] p-3">
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {Array.isArray(initialCollections) && initialCollections.length > 0 ? (
                    initialCollections.map((collection) => (
                      <label key={collection._id || collection.title} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.collections.includes(collection.slug?.current || '')}
                          onChange={() => toggleFilter('collections', collection.slug?.current || '')}
                          className="rounded border-gray-300 text-brand-maroon focus:ring-brand-maroon w-3.5 h-3.5"
                        />
                        <span className="ml-2 text-sm text-gray-700">{collection.title || 'Untitled'}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400">No collections</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Size Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('sizes')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs tracking-wide uppercase border transition-colors ${
                openDropdown === 'sizes' || filters.sizes.length > 0
                  ? 'border-brand-maroon text-brand-maroon'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              Size
              {getFilterCount('sizes') > 0 && (
                <span className="bg-brand-maroon text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {getFilterCount('sizes')}
                </span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'sizes' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'sizes' && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-30 min-w-[160px] p-3">
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {Array.isArray(initialSizes) && initialSizes.length > 0 ? (
                    initialSizes.map((size) => (
                      <label key={size} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.sizes.includes(size)}
                          onChange={() => toggleFilter('sizes', size)}
                          className="rounded border-gray-300 text-brand-maroon focus:ring-brand-maroon w-3.5 h-3.5"
                        />
                        <span className="ml-2 text-sm text-gray-700">{size}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400">No sizes</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Colour Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('colors')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs tracking-wide uppercase border transition-colors ${
                openDropdown === 'colors' || filters.colors.length > 0
                  ? 'border-brand-maroon text-brand-maroon'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              Colour
              {getFilterCount('colors') > 0 && (
                <span className="bg-brand-maroon text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {getFilterCount('colors')}
                </span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'colors' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'colors' && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-30 min-w-[160px] p-3">
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {Array.isArray(initialColors) && initialColors.length > 0 ? (
                    initialColors.map((color) => (
                      <label key={color} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.colors.includes(color)}
                          onChange={() => toggleFilter('colors', color)}
                          className="rounded border-gray-300 text-brand-maroon focus:ring-brand-maroon w-3.5 h-3.5"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{color}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400">No colours</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('price')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs tracking-wide uppercase border transition-colors ${
                openDropdown === 'price' || getFilterCount('price') > 0
                  ? 'border-brand-maroon text-brand-maroon'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              Price
              {getFilterCount('price') > 0 && (
                <span className="bg-brand-maroon text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">1</span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'price' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'price' && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-30 min-w-[220px] p-4">
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-brand-maroon"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>&pound;{filters.priceRange[0]}</span>
                    <span>&pound;{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* In Stock Filter */}
          <button
            onClick={() => updateFilter('inStock', !filters.inStock)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs tracking-wide uppercase border transition-colors ${
              filters.inStock
                ? 'border-brand-maroon text-brand-maroon bg-brand-maroon/5'
                : 'border-gray-200 text-gray-600 hover:border-gray-400'
            }`}
          >
            In Stock
          </button>

          {/* Clear All */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 text-xs tracking-wide text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear all
            </button>
          )}

          {/* Sort - pushed to right */}
          <div className="relative ml-auto">
            <button
              onClick={() => toggleDropdown('sort')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs tracking-wide text-gray-600 border border-gray-200 hover:border-gray-400 transition-colors"
            >
              Sort: {sortLabels[sortBy]}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'sort' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'sort' && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 shadow-lg z-30 min-w-[180px]">
                {(Object.entries(sortLabels) as [SortOption, string][]).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => { setSortBy(value); setOpenDropdown(null) }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                      sortBy === value ? 'text-brand-maroon font-medium' : 'text-gray-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="pt-3 pb-1">
          <p className="text-xs text-gray-400">
            {loading ? 'Loading...' : `${sortedProducts.length} product${sortedProducts.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-100 mb-3"></div>
              <div className="h-3 bg-gray-100 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search terms to find what you&apos;re looking for.
          </p>
          <Button onClick={clearFilters} className="bg-brand-maroon hover:bg-brand-maroon/90 text-white">
            Clear All Filters
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {sortedProducts.map((product, index) => {
            const hasStock = product.variants?.some((v: any) => v.stock > 0 && v.isActive)
            const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price
            const savings = isOnSale ? (product.compareAtPrice - product.price) : 0

            return (
              <motion.div
                key={product._id}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
              >
                {/* Product Image Container */}
                <Link href={`/product/${product.slug.current}`} className="block">
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3">
                    {/* Badges */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
                      {!hasStock && (
                        <span className="bg-yellow-400 text-gray-900 text-[10px] sm:text-xs font-semibold px-2 py-1 tracking-wide">
                          Out of stock
                        </span>
                      )}
                      {isOnSale && (
                        <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 tracking-wide">
                          SAVE&pound;{savings.toFixed(2)}
                        </span>
                      )}
                      {product.badges && product.badges.includes('new-arrival') && (
                        <span className="bg-black text-white text-[10px] sm:text-xs font-semibold px-2 py-1 tracking-wide">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <WishlistButton product={product} imageUrl={product.images?.[0] ? urlForImage(product.images[0]) : ''} />

                    {/* Quick Add Overlay Button */}
                    {hasStock && (
                      <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <QuickAddButton product={product} variant="overlay" />
                      </div>
                    )}

                    {/* Product Image */}
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={urlForImage(product.images[0])}
                        alt={`${product.name} - ${product.collections?.[0]?.title || 'Abaya'}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        priority={index < 4}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <p className="text-gray-400 text-sm">No image</p>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="space-y-1.5">
                  <Link href={`/product/${product.slug.current}`}>
                    <h3 className="text-xs sm:text-sm font-medium tracking-wide uppercase text-gray-900 group-hover:text-brand-maroon transition-colors duration-200 line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2">
                    {isOnSale ? (
                      <>
                        <span className="text-sm sm:text-base font-semibold text-red-600">
                          &pound;{product.price.toFixed(2)}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          &pound;{product.compareAtPrice.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm sm:text-base font-semibold text-gray-900">
                        &pound;{product.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <ProductRating slug={product.slug.current} />
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
