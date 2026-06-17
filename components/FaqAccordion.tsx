'use client'

import { useState } from 'react'

type FaqItem = { q: string; a: string }

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
          <button
            type="button"
            className="w-full text-left p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="flex-shrink-0 w-6 h-6 bg-brand-700 text-white text-xs font-black flex items-center justify-center rounded-full mt-0.5">
              Q
            </span>
            <span className="flex-1 font-bold text-gray-900 text-sm leading-relaxed pr-2">{faq.q}</span>
            <svg
              className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-1 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === i && (
            <div className="border-t border-yellow-100 p-4 flex items-start gap-3 bg-yellow-50">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-gray-900 text-xs font-black flex items-center justify-center rounded-full mt-0.5">
                A
              </span>
              <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
