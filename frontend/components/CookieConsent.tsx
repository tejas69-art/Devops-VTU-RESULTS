'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieConsent: React.FC = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setShowBanner(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setShowBanner(false);
    };

    if (!showBanner) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            We use cookies
                        </h3>
                        <p className="text-sm text-gray-600">
                            We use cookies and similar technologies to provide our services, analyze traffic,
                            and show personalized ads. By clicking "Accept", you consent to our use of cookies.
                            You can learn more in our{' '}
                            <a href="/privacy-policy" className="text-blue-600 hover:underline">
                                Privacy Policy
                            </a>.
                        </p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                        <Button
                            onClick={handleDecline}
                            variant="outline"
                            className="whitespace-nowrap"
                        >
                            Decline
                        </Button>
                        <Button
                            onClick={handleAccept}
                            className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
                        >
                            Accept All
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
