'use client';

import { SHOW_ADS } from '@/lib/adConfig';

interface AdsterraBannerProps {
  id: string;
  width: number;
  height: number;
}

export default function AdsterraBanner({ id, width, height }: AdsterraBannerProps) {
  if (!SHOW_ADS) return null;

  // Sandbox the ad scripts inside an isolated iframe to prevent global scope pollution
  // and ensure multiple ad units can coexist without conflicting `atOptions` objects.
  const iframeHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          var atOptions = {
            'key': '${id}',
            'format': 'iframe',
            'height': ${height},
            'width': ${width},
            'params': {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/${id}/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div 
      className="flex justify-center items-center my-6 mx-auto overflow-hidden no-print"
      style={{ minWidth: `${width}px`, minHeight: `${height}px` }}
    >
      <iframe
        title={`adsterra-ad-${id}`}
        srcDoc={iframeHtml}
        width={width}
        height={height}
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
}
