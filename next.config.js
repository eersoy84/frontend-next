module.exports = {
  i18n: {
    locales: ['tr'],
    defaultLocale: 'tr'
  },
  async rewrites() {
    return [
      {
        source: '/tr/odeme',
        destination: '/tr/payment',
        locale: false
      },
      {
        source: '/tr/favoriler',
        destination: '/tr/favorites',
        locale: false
      },
      {
        source: '/tr/ilanlar/:adId*',
        destination: '/tr/ad/:adId*',
        locale: false
      },
      {
        source: '/tr/ilanlar',
        destination: '/tr/ad',
        locale: false
      },
      {
        source: '/tr/hesap/siparis/:orderId',
        destination: '/tr/account/orders/:orderId',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/tr/hesap/siparis',
        destination: '/tr/account/orders',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/tr/hesap/profil',
        destination: '/tr/account/profile',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },

      {
        source: '/tr/hesap/adres',
        destination: '/tr/account/address',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/tr/hesap',
        destination: '/tr/account',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/tr/hesap/sifre-yenile',
        destination: '/tr/account/reset-password',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/tr/hesap/cikis/:tab*',
        destination: '/tr/account/logout/:tab*',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/tr/hesap/onay',
        destination: '/tr/account/confirm',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/tr/odeme',
        destination: '/tr/checkout',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/tr/sepet',
        destination: '/tr/cart',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/tr/site/sozlesmeler/:contractAddressId*',
        destination: '/tr/site/contract/:contractAddressId*',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/tr/site/gizlilik',
        destination: '/tr/site/privacy',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/tr/site/hakkimizda',
        destination: '/tr/site/about',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/tr/site/iletisim',
        destination: '/tr/site/contact',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/tr/site/sss',
        destination: '/tr/site/faq',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/tr/site/kosullar',
        destination: '/tr/site/terms',
        locale: false // Use `locale: false` so that the prefix matches the desired locale correctly
      },
    ]
  },
  reactStrictMode: true,
  images: {
    domains: ["cdn.mekatro.tech", "mtassetstore.ams3.cdn.digitaloceanspaces.com"],
    formats: ['image/avif', 'image/webp']
  },
}
