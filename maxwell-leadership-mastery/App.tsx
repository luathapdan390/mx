
import React, { useState, useMemo } from 'react';
import { LEADERSHIP_DATA } from './constants';
import { LeadershipMistake, LeadershipPart } from './types';
import { getMaxwellCoaching } from './geminiService';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMistake, setSelectedMistake] = useState<LeadershipMistake | null>(null);
  const [aiCoaching, setAiCoaching] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const categories = ['All', ...Object.values(LeadershipPart)];

  const filteredMistakes = useMemo(() => {
    return LEADERSHIP_DATA.filter(item => {
      const matchesSearch = 
        item.mistake.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.solution.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleOpenDetail = async (item: LeadershipMistake) => {
    setSelectedMistake(item);
    setAiCoaching('');
    setIsLoadingAi(true);
    const coaching = await getMaxwellCoaching(item.mistake, item.solution);
    setAiCoaching(coaching);
    setIsLoadingAi(false);
  };

  const handleCloseDetail = () => {
    setSelectedMistake(null);
    setAiCoaching('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="maxwell-gradient text-white py-12 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Maxwell Leadership Mastery
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-light">
            100 Lỗi Lãnh Đạo & Giải Pháp thực thi theo triết lý của John C. Maxwell. 
            Nâng tầm tư duy, kết nối đội ngũ và kiến tạo di sản.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 -mt-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Tìm kiếm sai lầm hoặc giải pháp..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Mistakes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMistakes.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleOpenDetail(item)}
              className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
                    {item.part}
                  </span>
                  <span className="text-xs font-medium text-slate-400">#{item.id}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.mistake}
                </h3>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 italic text-slate-500 text-sm line-clamp-2">
                {item.solution}
              </div>
            </div>
          ))}
        </div>

        {filteredMistakes.length === 0 && (
          <div className="text-center py-20">
            <i className="fa-solid fa-ghost text-5xl text-slate-200 mb-4"></i>
            <p className="text-slate-500 text-lg">Không tìm thấy kết quả phù hợp với từ khóa của bạn.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-800">Maxwell Leadership</h2>
            <p className="text-slate-500">Kiến tạo những nhà lãnh đạo vĩ đại cho tương lai.</p>
          </div>
          <div className="flex gap-6 text-2xl text-slate-400">
            <a href="#" className="hover:text-blue-600 transition-colors"><i className="fa-brands fa-linkedin"></i></a>
            <a href="#" className="hover:text-blue-600 transition-colors"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="hover:text-blue-600 transition-colors"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedMistake && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="maxwell-gradient p-6 text-white relative">
              <button 
                onClick={handleCloseDetail}
                className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
              <div className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-2">
                {selectedMistake.category} • #{selectedMistake.id}
              </div>
              <h2 className="text-2xl font-bold leading-tight pr-10">
                {selectedMistake.mistake}
              </h2>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1 space-y-8">
              {/* Solution Block */}
              <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-600">
                <h4 className="text-sm font-bold text-blue-600 uppercase mb-2 tracking-wide">Giải pháp Maxwell</h4>
                <p className="text-slate-800 text-lg leading-relaxed font-medium">
                  {selectedMistake.solution}
                </p>
              </div>

              {/* AI Coaching Block */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white">
                    <i className="fa-solid fa-robot"></i>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800">Cố vấn AI Maxwell</h4>
                </div>

                {isLoadingAi ? (
                  <div className="flex flex-col items-center py-10 space-y-4">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 text-sm italic">Đang phân tích sâu giải pháp lãnh đạo...</p>
                  </div>
                ) : (
                  <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {aiCoaching}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end">
              <button 
                onClick={handleCloseDetail}
                className="px-6 py-2 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
