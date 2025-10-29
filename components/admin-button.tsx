"use client"
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export function AdminButton() {
  const adminUrl =
    'https://script.google.com/macros/s/AKfycbz25plZUG38PNoAeS8fmXG1bABU8kB6-vkfRgeEZ8wOhk2KRtnYWP2fkDCqfSH2t2Ry/exec';

  const handleClick = () => {
    window.open(adminUrl, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleClick}
        variant="outline"
        size="icon"
        className="rounded-full shadow-lg"
        aria-label="管理者用編集画面"
      >
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
}