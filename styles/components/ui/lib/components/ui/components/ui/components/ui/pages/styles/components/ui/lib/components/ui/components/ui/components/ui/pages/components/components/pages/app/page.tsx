"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const MainApp = dynamic(() => import('@/pages/index'), { ssr: false });

  return (
    <div className="container mx-auto p-4">
      <MainApp />
    </div>
  );
}
