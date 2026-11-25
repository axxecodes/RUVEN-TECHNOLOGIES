/**
 * Editable company configuration and integration endpoints.
 * Replace placeholder values before deploying to production.
 */
export const SITE_CONFIG = {
  brandName: 'RUVEN',
  tagline: 'Attract. Convert. Grow.',
  markets: 'Nigeria & International Markets',

  contact: {
    email: 'ruventechnologiez@gmail.com',
    isEmailPlaceholder: false,

    // WhatsApp Business number (digits with country code for wa.me links)
    whatsappDisplay: '+234 904 257 8361',
    whatsappDigits: '2349042578361',
    isWhatsappPlaceholder: false,

    locationLabel: 'Nigeria · Serving International Markets',
  },

  socials: [
    {
      label: 'Instagram',
      handle: '@ruventech',
      href: 'https://instagram.com/ruventech',
      isPlaceholder: false,
    },
    {
      label: 'WhatsApp',
      handle: '+234 904 257 8361',
      href: 'https://wa.me/2349042578361',
      isPlaceholder: false,
    },
  ],

  /**
   * Web3Forms endpoint and public access key for contact submissions.
   */
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT ?? 'https://api.web3forms.com/submit',
  web3formsAccessKey:
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '96798a65-e83a-419e-a511-ebbf392ba01a',
} as const;

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE_CONFIG.contact.whatsappDigits}?text=${encoded}`;
}
