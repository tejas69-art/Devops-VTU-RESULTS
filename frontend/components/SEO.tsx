import React from 'react';
import Head from 'next/head';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    ogImage,
    canonicalUrl
}) => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.vercel.app';
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'VTU Results Checker';
    const fullTitle = `${title} | ${siteName}`;
    const defaultImage = `${siteUrl}/og-image.png`;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage || defaultImage} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage || defaultImage} />

            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Additional SEO tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="robots" content="index, follow" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default SEO;
