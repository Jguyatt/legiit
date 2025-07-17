const { favicons } = require('favicons');
const fs = require('fs');
const path = require('path');

const source = 'public/images/logo.png';
const outputPath = 'public';

const configuration = {
  path: '/',
  appName: 'Rankly360',
  appShortName: 'Rankly360',
  appDescription: 'Local SEO That Drives Results',
  developerName: 'Jacob Guyatt',
  developerURL: 'https://www.rankly360.com/',
  dir: 'ltr',
  lang: 'en-US',
  background: '#0f0f1a',
  theme_color: '#3ABEF9',
  appleStatusBarStyle: 'default',
  display: 'standalone',
  orientation: 'any',
  scope: '/',
  start_url: '/',
  version: '1.0',
  logging: true,
  pixel_art: false,
  loadManifestWithCredentials: false,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: false
  }
};

(async () => {
  try {
    const response = await favicons(source, configuration);
    
    // Create favicon files
    await Promise.all(
      response.images.map(async (image) => {
        const filePath = path.join(outputPath, image.name);
        await fs.promises.writeFile(filePath, image.contents);
        console.log(`Created: ${filePath}`);
      })
    );

    // Create manifest.json
    await fs.promises.writeFile(
      path.join(outputPath, 'manifest.json'),
      JSON.stringify(response.manifest, null, 2)
    );
    console.log('Created: public/manifest.json');

    // Create browserconfig.xml
    if (response.files['browserconfig.xml']) {
      await fs.promises.writeFile(
        path.join(outputPath, 'browserconfig.xml'),
        response.files['browserconfig.xml']
      );
      console.log('Created: public/browserconfig.xml');
    }

    console.log('\nFavicon generation complete!');
    console.log('Update your index.html with the new favicon links.');
    
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
})(); 