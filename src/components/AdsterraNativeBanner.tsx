'use client';

import { useEffect, useRef } from 'react';
import { SHOW_ADS } from '@/lib/adConfig';

interface AdsterraNativeBannerProps {
  id: string;
  domain: string;
}

export default function AdsterraNativeBanner({ id, domain }: AdsterraNativeBannerProps) {
  const containerId = `container-${id}`;
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!SHOW_ADS) return;
    if (typeof window === 'undefined') return;

    const container = document.getElementById(containerId);
    if (!container || isLoaded.current) return;

    // Prevent duplicate injections
    if (container.children.length > 0) return;

    isLoaded.current = true;

    // Create the script tag for invoking the native banner ad
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = `https://${domain}/${id}/invoke.js`;

    // Append script to container so that the script can execute and find its container ID
    container.appendChild(script);

    return () => {
      // Clean up the container contents on unmount
      if (container) {
        container.innerHTML = '';
      }
      isLoaded.current = false;
    };
  }, [id, domain, containerId]);

  if (!SHOW_ADS) return null;

  return (
    <div className="w-full flex justify-center items-center my-8 mx-auto no-print px-4">
      <div 
        id={containerId} 
        className="w-full max-w-5xl min-h-[150px] bg-transparent"
      />
    </div>
  );
}
