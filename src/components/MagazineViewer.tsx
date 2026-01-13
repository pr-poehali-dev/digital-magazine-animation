import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Page {
  id: number;
  imageUrl: string;
}

const MagazineViewer = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);

  // ВСТАВЬТЕ СВОИ ФОТОГРАФИИ ЗДЕСЬ
  // Замените URL на ссылки к вашим изображениям
  const pages: Page[] = [
    { id: 1, imageUrl: 'https://cdn.poehali.dev/projects/65778a68-31aa-4826-aaac-fac7d4ba89a4/files/17e3a542-1063-4146-9d0b-8f863c175719.jpg' },
    { id: 2, imageUrl: 'https://cdn.poehali.dev/projects/65778a68-31aa-4826-aaac-fac7d4ba89a4/files/3cd0dc47-6f5c-468d-b090-03abf147227f.jpg' },
    { id: 3, imageUrl: 'https://cdn.poehali.dev/projects/65778a68-31aa-4826-aaac-fac7d4ba89a4/files/30895ff5-cbe0-419a-94a3-ae44ed1572b1.jpg' },
    { id: 4, imageUrl: 'https://cdn.poehali.dev/projects/65778a68-31aa-4826-aaac-fac7d4ba89a4/files/17e3a542-1063-4146-9d0b-8f863c175719.jpg' },
    { id: 5, imageUrl: 'https://cdn.poehali.dev/projects/65778a68-31aa-4826-aaac-fac7d4ba89a4/files/3cd0dc47-6f5c-468d-b090-03abf147227f.jpg' },
    { id: 6, imageUrl: 'https://cdn.poehali.dev/projects/65778a68-31aa-4826-aaac-fac7d4ba89a4/files/30895ff5-cbe0-419a-94a3-ae44ed1572b1.jpg' },
  ];

  const handleNextPage = () => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 800);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 800);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextPage();
      if (e.key === 'ArrowLeft') handlePrevPage();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, isFlipping]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 overflow-hidden flex items-center justify-center">
      
      {/* Журнал */}
      <div className="relative w-[90vw] h-[85vh] max-w-[1400px] perspective-[2000px]">
        
        {/* Основа журнала */}
        <div className="absolute inset-0 bg-white rounded-sm shadow-2xl transform-gpu preserve-3d">
          
          {/* Левая страница (предыдущая) */}
          <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
            {currentPage > 0 && (
              <img
                src={pages[currentPage - 1].imageUrl}
                alt={`Page ${currentPage}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Правая страница (текущая) */}
          <div 
            className={`absolute right-0 top-0 w-1/2 h-full overflow-hidden origin-left transform-gpu transition-all duration-800 ease-in-out preserve-3d ${
              flipDirection === 'next' 
                ? 'animate-flip-next' 
                : flipDirection === 'prev'
                ? 'animate-flip-prev'
                : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src={pages[currentPage].imageUrl}
              alt={`Page ${currentPage + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Переплёт (тень посередине) */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 shadow-lg transform -translate-x-1/2 z-10" />
        </div>

        {/* Тень от журнала */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] h-8 bg-black/10 blur-2xl rounded-full" />
      </div>

      {/* Кнопка "Назад" */}
      {currentPage > 0 && (
        <button
          onClick={handlePrevPage}
          disabled={isFlipping}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-20"
          aria-label="Previous page"
        >
          <Icon name="ChevronLeft" size={32} className="text-gray-800" />
        </button>
      )}

      {/* Кнопка "Вперёд" */}
      {currentPage < pages.length - 1 && (
        <button
          onClick={handleNextPage}
          disabled={isFlipping}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-20"
          aria-label="Next page"
        >
          <Icon name="ChevronRight" size={32} className="text-gray-800" />
        </button>
      )}

      {/* Индикатор страниц */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {pages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentPage 
                ? 'bg-gray-800 w-8' 
                : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MagazineViewer;