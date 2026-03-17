import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'gnppn7qx',
  dataset: 'production',
  apiVersion: '2024-07-01',
  token: 'skzWsjcPZ6bouozWpiRdUEnOhlCD4xyXy0nqUPaj3ga83uK8TInGYDpu3bHLHoR2DoAxxzdpELy8CU1P2qMzICr2N2MuyNsyoGNiGMYBliutJcfP6M61s2qHhY4ML01Nzl2A9amEiF0MWZah2pLpyDRkzo5nWQMz5292pHff0HKYYkHiI8F5',
  useCdn: false,
})

// Find the products
const products = await client.fetch(
  `*[_type == "product" && (name match "Salma*" || name match "Amani*" || name match "Mariam*")] { _id, name, slug, isActive }`
)

console.log('Found products:', JSON.stringify(products, null, 2))

// Deactivate each product and its variants
for (const product of products) {
  console.log(`\nDeactivating: ${product.name} (${product._id})`)

  // Set isActive to false on the product
  await client.patch(product._id).set({ isActive: false, featured: false }).commit()
  console.log(`  -> Product deactivated`)

  // Also deactivate variants
  const variants = await client.fetch(
    `*[_type == "variant" && references($productId)] { _id }`,
    { productId: product._id }
  )

  for (const variant of variants) {
    await client.patch(variant._id).set({ isActive: false }).commit()
  }
  console.log(`  -> ${variants.length} variants deactivated`)
}

console.log('\nDone! All discontinued products have been deactivated.')
