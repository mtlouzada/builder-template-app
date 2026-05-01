import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@buildeross/constants',
    '@buildeross/hooks',
    '@buildeross/ipfs-service',
    '@buildeross/sdk',
    '@buildeross/types',
    '@buildeross/utils',
    '@buildeross/stores',
    '@buildeross/ui',
    '@rainbow-me/rainbowkit',
  ],
  experimental: {
    optimizePackageImports: [
      '@rainbow-me/rainbowkit',
      '@buildeross/hooks',
      '@buildeross/ui',
      '@buildeross/sdk',
      'lucide-react',
    ],
  },
  async redirects() {
    return [
      { source: '/token/:tokenId', destination: '/auction/:tokenId', permanent: true },
      {
        source: '/proposal/:proposalId',
        destination: '/proposals/:proposalId',
        permanent: true,
      },
      { source: '/contracts', destination: '/about', permanent: true },
    ]
  },
  webpack(config) {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    // Optional React Native peer pulled in transitively by @metamask/sdk —
    // not needed in a web build, alias it away.
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@react-native-async-storage/async-storage': false,
    }
    config.externals = config.externals || []
    config.externals.push('pino-pretty')
    return config
  },
}

export default nextConfig
