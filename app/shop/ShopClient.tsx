'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'
import QuickAddButton from '@/components/QuickAddButton'

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

export default function ShopClient({ initialCollections, initialSizes, initialColors }: ShopClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Filter state
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

  const [products, setProducts] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search)
    }, 500)

    return () => clearTimeout(timer)
  }, [filters.search])

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
      // Build GROQ query with filters
      let query = `*[_type == "product" && defined(slug.current)`
      
      // Search filter
      if (debouncedSearch) {
        query += ` && (name match "*${debouncedSearch}*" || description match "*${debouncedSearch}*")`
      }
      
      // Collection filter
      if (filters.collections.length > 0) {
        query += ` && references(*[_type == "collection" && slug.current in $collections]._id)`
      }
      
      // Price filter
      query += ` && price >= $minPrice && price <= $maxPrice`
      
      // Stock filter
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
      
      // Count query
      const countQuery = query.replace('| order(name asc) {', '| count')
      
      const [productsData, count] = await Promise.all([
        fetch('/api/products?' + new URLSearchParams({
          query,
          collections: filters.collections.join(','),
          minPrice: filters.priceRange[0].toString(),
          maxPrice: filters.priceRange[1].toString(),
        })).then(res => res.json()),
        fetch('/api/products?' + new URLSearchParams({
          query: countQuery,
          collections: filters.collections.join(','),
          minPrice: filters.priceRange[0].toString(),
          maxPrice: filters.priceRange[1].toString(),
        })).then(res => res.json())
      ])

      // Apply size and color filters client-side for better performance
      let filteredProducts = productsData
      
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

      // Apply stock filter client-side as backup
      if (filters.inStock) {
        filteredProducts = filteredProducts.filter((product: any) =>
          product.variants?.some((v: any) => v.stock > 0 && v.isActive)
        )
      }

      setProducts(filteredProducts)
      setTotalCount(count)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

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
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : Boolean(value)
  )

  return (
    <div className="space-y-8">
      {/* Search and Filter Header */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white"
          >
            <Filter size={16} className="mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 bg-brand-maroon text-white text-xs px-1.5 py-0.5 rounded-full">
                {Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : Boolean(v)).length}
              </span>
            )}
          </Button>
          
          {hasActiveFilters && (
            <Button onClick={clearFilters} variant="outline" className="border-gray-300">
              <X size={16} className="mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 rounded-lg p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Collections */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Collections</h3>
                <div className="space-y-2">
                  {Array.isArray(initialCollections) && initialCollections.length > 0 ? (
                    initialCollections.map((collection) => (
                      <label key={collection._id || collection.title} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.collections.includes(collection.slug?.current || '')}
                          onChange={() => toggleFilter('collections', collection.slug?.current || '')}
                          className="rounded border-gray-300 text-brand-maroon focus:ring-brand-maroon"
                        />
                        <span className="ml-2 text-sm text-gray-700">{collection.title || 'Untitled'}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No collections available</p>
                  )}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Sizes</h3>
                <div className="space-y-2">
                  {Array.isArray(initialSizes) && initialSizes.length > 0 ? (
                    initialSizes.map((size) => (
                      <label key={size} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.sizes.includes(size)}
                          onChange={() => toggleFilter('sizes', size)}
                          className="rounded border-gray-300 text-brand-maroon focus:ring-brand-maroon"
                        />
                        <span className="ml-2 text-sm text-gray-700">{size}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No sizes available</p>
                  )}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Colors</h3>
                <div className="space-y-2">
                  {Array.isArray(initialColors) && initialColors.length > 0 ? (
                    initialColors.map((color) => (
                      <label key={color} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.colors.includes(color)}
                          onChange={() => toggleFilter('colors', color)}
                          className="rounded border-gray-300 text-brand-maroon focus:ring-brand-maroon"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{color}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No colors available</p>
                  )}
                </div>
              </div>

              {/* Price Range & Stock */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={filters.priceRange[1]}
                      onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>£{filters.priceRange[0]}</span>
                      <span>£{filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => updateFilter('inStock', e.target.checked)}
                      className="rounded border-gray-300 text-brand-maroon focus:ring-brand-maroon"
                    />
                    <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

             {/* Results Count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              {loading ? 'Loading...' : `${products.length} product${products.length !== 1 ? 's' : ''} found`}
            </p>
            {filters.collections.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Filtered by:</span>
                {filters.collections.map((collectionSlug) => {
                  const collection = initialCollections.find(c => c.slug?.current === collectionSlug)
                  return (
                    <span key={collectionSlug} className="px-2 py-1 bg-brand-maroon/10 text-brand-maroon text-xs rounded-full">
                      {collection?.title || collectionSlug}
                    </span>
                  )
                })}
              </div>
            )}
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
      ) : products.length === 0 ? (
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
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
          <Button onClick={clearFilters} className="bg-brand-maroon hover:bg-brand-maroon/90 text-white">
            Clear All Filters
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => {
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
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

