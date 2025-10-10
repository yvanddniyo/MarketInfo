'use client'

// TradingViewWidget.tsx
import useTradingViewWidget from '@/Hooks/useTradingViewWidget';
import { cn } from '@/lib/utils';
import React, { memo } from 'react';


interface TradingViewWidgetprops {
  title: string;
  scriptUrl: string;
  config: Record<string, unknown>
  height?: number,
  className?: string;
}

const TradingViewWidget = ({title, scriptUrl, config, height=600, className}:TradingViewWidgetprops)=> {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);

  return (
    <div className="w-full">
      {title && <h3 className='font-semibold text-2xl text-gray-200 mb-5'>{title}</h3>}
    <div className={cn ("tradingview-widget-container", className)} ref={containerRef}>
    <div className="tradingview-widget-container__widget" style={{ height, width: "100%" }}/>
    
  </div>
  </div>
  );
}

export default memo(TradingViewWidget);
