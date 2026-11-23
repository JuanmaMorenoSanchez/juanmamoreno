export const environment = {
  production: false,
  // The painting on the landing page. Empty falls back to the newest frontal
  // view, which is what this was before anything read it.
  homeTokenId: '202',
  // The one wallet the studio opens for: the certificates contract's own
  // owner(), which is public on the chain. The backend checks the signature
  // against its own copy; this only decides what the interface shows.
  adminAddress: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
  backendUrl: 'https://backend.juanmamoreno.com/',
  // Whether the artwork pages offer "ask on WhatsApp". The number itself is
  // nowhere in this repository: the button links to the service, which holds it
  // in a secret and redirects. This only says whether the service has one yet —
  // a button that leads to a 404 is worse than no button.
  whatsappEnquiries: false,
  backendUrlFallback: 'https://juanmamoreno-backend-164035848667.europe-west1.run.app/',
};
