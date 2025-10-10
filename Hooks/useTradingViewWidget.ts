'use client'

import { useEffect, useRef } from "react";

const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height = 600) => {
 const containerRef = useRef<HTMLDivElement | null >(null);
 useEffect(
  () => {
   const container = containerRef.current;
   if (!container) return;
   if (container.dataset.loaded) return;

   // Merge height into config to ensure correct sizing
   const mergedConfig = { ...config, height } as Record<string, unknown>;

   container.innerHTML = `<div class="tradingview-widget-container__widget" style="width:100%; height:${height}px;"></div>`;
   const script = document.createElement("script");
   script.src = scriptUrl;
   script.async = true;
   // TradingView expects the config JSON as the script content
   script.type = "text/javascript";
   script.textContent = JSON.stringify(mergedConfig);
   container.appendChild(script);
   container.dataset.loaded = 'true';

   return () => {
     if (containerRef.current) {
       containerRef.current.innerHTML = "";
       delete containerRef.current.dataset.loaded;
     }
   };
  },
  [scriptUrl, height, config]
 );
 return containerRef;
}
export default useTradingViewWidget;