'use client';

import React, { useEffect } from 'react';

const AutoAds: React.FC = () => {
    const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

    useEffect(() => {
        if (!publisherId || publisherId === 'ca-pub-0000000000000000') {
            return;
        }

        // Check if script already exists
        const existingScript = document.querySelector(
            `script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]`
        );

        if (existingScript) {
            return;
        }

        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);

        return () => {
            // Cleanup if needed
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [publisherId]);

    return null;
};

export default AutoAds;
