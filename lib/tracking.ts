declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackPhoneClick(location = 'unknown') {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'phone_click', {
      event_category: 'conversion',
      event_label: location,
    })
  }
  // Google Tag Manager対応
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: 'phone_click',
      eventCategory: 'conversion',
      eventLabel: location,
    })
  }
}

export function trackLineClick(location = 'unknown') {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'line_click', {
      event_category: 'conversion',
      event_label: location,
    })
  }
}

export function trackFormSubmit() {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'form_submit', {
      event_category: 'conversion',
      event_label: 'contact_form',
    })
  }
}
