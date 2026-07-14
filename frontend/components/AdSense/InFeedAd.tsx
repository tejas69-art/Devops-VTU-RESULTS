'use client';

import React, { useEffect } from 'react';

interface InFeedAdProps {
    adSlot: string;
    adLayout?: string;
    className?: string;
}

const InFeedAd: React.FC<InFeedAdProps> = ({
    adSlot,
    adLayout = 'in-article',
    className = ''
}) => {
    const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

    useEffect(() => {
        try {
            if (typeof window !== 'undefined' && publisherId && publisherId !== 'ca-pub-0000000000000000') {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, [publisherId]);

    // Don't show ads in development or if no valid publisher ID
    if (!publisherId || publisherId === 'ca-pub-0000000000000000') {
        return null;
    }

    return (
        <div className={`my-4 ${className}`} style={{ minHeight: '90px' }}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', minHeight: '90px' }}
                data-ad-format="fluid"
                data-ad-layout-key={adLayout}
                data-ad-client={publisherId}
                data-ad-slot={adSlot}
            />
        </div>
    );
};

export default InFeedAd;
