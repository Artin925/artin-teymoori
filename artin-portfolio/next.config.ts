import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    dangerouslyAllowSVG: true,
  },
  // Ist wichtig für die korrekte Datei-Referenzierung mit Leerzeichen im Namen
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static/images/',
          },
        },
      ],
    });

    return config;
  },
  // Reduziere Debug-Ausgaben und konfiguriere Turbopack
  onDemandEntries: {
    // Halte Seiten länger im Speicher
    maxInactiveAge: 60 * 60 * 1000,
    // Erhöhe die Anzahl der Seiten im Cache
    pagesBufferLength: 5,
  },
  // Turbopack-Konfiguration
  experimental: {
    turbo: {
      // Verwendung der gleichen Regeln wie webpack
      rules: {
        // Hier könnten weitere Turbopack-spezifische Regeln hinzugefügt werden
      }
    },
  },
}

module.exports = nextConfig
