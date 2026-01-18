/** @type {import('next').NextConfig} */
const nextConfig = {
  // Forzamos el modo standalone para optimizar el peso
  output: 'standalone',
  
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        './public/uploads/**/*',
        'public/uploads/**/*',  // Agregamos versión sin punto por seguridad
        './node_modules/@swc/**/*',
        './node_modules/esbuild/**/*'
      ],
    },
  },
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;