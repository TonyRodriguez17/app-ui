const fs = require('fs');

const envProd = `
export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}',
  publicationsUrl: '${process.env.PUBLICATIONS_URL}',
  imagesUrl: '${process.env.IMAGES_URL}',
  contactSettingsUrl: '${process.env.CONTACT_SETTINGS_URL}'
};
`;

fs.writeFileSync('./src/environments/environment.prod.ts', envProd);
console.log('✅ environment.prod.ts creado correctamente.');