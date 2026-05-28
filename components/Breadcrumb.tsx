type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
  className?: string
}

const jsonLd = (items: BreadcrumbItem[], baseUrl = 'https://houmiya-boiler.com') => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.label,
    item: item.href ? `${baseUrl}${item.href}` : undefined,
  })),
})

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(items)) }}
      />
      <nav aria-label="パンくずリスト" className={`py-3 border-b border-slate-200 bg-white ${className}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {idx > 0 && (
                  <svg className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {item.href ? (
                  <a href={item.href} className="text-sky-dark hover:underline font-medium">
                    {item.label}
                  </a>
                ) : (
                  <span className="text-gray-500">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  )
}

