module.exports = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      headers: '*',
      origin: ['http://localhost:1337','http://localhost:3000','https://1105-2405-201-2025-e0bb-c86e-f446-905b-ac4e.ngrok-free.app']
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
