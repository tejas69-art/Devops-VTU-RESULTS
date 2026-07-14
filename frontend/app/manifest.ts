import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'VTU Results Checker',
        short_name: 'VTU Results',
        description: 'Check your VTU exam results instantly and calculate SGPA.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2563eb',
        icons: [
            {
                src: '/favicon.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    }
}
