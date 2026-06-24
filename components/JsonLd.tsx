// Renders a JSON-LD structured-data block. Safe to use inside Server Components.
// Pass any schema.org object (or array of objects) as `data`.

export default function JsonLd({ data }: { data: Record<string, any> | Record<string, any>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is sufficient for escaping here; the data is server-generated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
