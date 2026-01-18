import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizacion para reducir peso
  output: 'standalone',
  
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        './public/uploads/**/*',
        'public/uploads/**/*',
        './node_modules/@swc/**/*',
        './node_modules/esbuild/**/*'
      ],
    },
  },
  images: {
    unoptimized: true, 
  },
};

// Aqui envolvemos la configuracion con el plugin de idiomas
export default withNextIntl(nextConfig);