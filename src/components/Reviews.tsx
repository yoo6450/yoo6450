import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MessageSquarePlus, Star, Send } from 'lucide-react';

interface Review {
  id: string;
  text: string;
  author: string;
  bean?: string;
  rating: number;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    text: "태양열로 로스팅해서 그런지 잡미가 전혀 없고 에티오피아 구지 특유의 꽃 향과 산미 밸런스가 정말 환상적입니다.",
    author: "Charlie's GoodTime Customer",
    bean: "Roaster’s Ethiopia Guji",
    rating: 5
  },
  {
    id: '2',
    text: "구독 서비스로 2주마다 받고 있는데 원두 갓 볶은 향이 집안 가득 퍼집니다. 환경을 생각하는 B-Corp 철학도 응원합니다.",
    author: "Charlie's GoodTime Customer",
    bean: "Roaster’s Choice Trio",
    rating: 5
  },
  {
    id: '3',
    text: "충주호 매장 방문해서 드립으로 마셔보고 반해서 정기배송 시작했습니다. 가격 투명성도 마음에 듭니다.",
    author: "Charlie's GoodTime Customer",
    bean: "Colombia Huila",
    rating: 5
  }
];

export const Reviews: React.FC = () => {
  const { user, openAuthModal, showToast } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [newText, setNewText] = useState('');
  const [rating, setRating] = useState(5);

  const handleWriteClick = () => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    setShowReviewInput(!showReviewInput);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim() || !user) return;

    const newRev: Review = {
      id: Date.now().toString(),
      text: newText.trim(),
      author: `${user.name} (인증 회원)`,
      bean: user.subscription?.beans || "스페셜티 셀렉션",
      rating
    };

    setReviews([newRev, ...reviews]);
    setNewText('');
    setShowReviewInput(false);
    showToast('소중한 후기가 성공적으로 등록되었습니다. 감사합니다!', 'success');
  };

  return (
    <section id="reviews" className="px-[4vw] py-24 border-b border-[#262626]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="font-mono text-[#86c6fe] text-xs uppercase tracking-widest flex items-center gap-2 mb-3">
            <span className="w-3.5 h-[2px] bg-[#86c6fe]"></span>
            Verified Feedback
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            고객 <span className="text-[#f91f0e]">후기</span>
          </h2>
        </div>

        <button
          onClick={handleWriteClick}
          className="self-start sm:self-auto px-4 py-2 bg-[#161616] border border-[#2a2a2a] hover:border-[#86c6fe] text-[#86c6fe] font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
          <span>{showReviewInput ? '닫기' : '후기 작성하기 (회원 전용)'}</span>
        </button>
      </div>

      {/* Review Submission Form for logged-in user */}
      {showReviewInput && (
        <form onSubmit={handleAddReview} className="mb-10 p-6 bg-[#161616] border border-[#f91f0e]/50 space-y-4 animate-in fade-in duration-200 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold">{user?.name}님의 테이스팅 후기</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setRating(s)}
                  className="cursor-pointer text-amber-400"
                >
                  <Star className={`w-4 h-4 ${s <= rating ? 'fill-amber-400' : 'text-gray-600'}`} />
                </button>
              ))}
            </div>
          </div>

          <textarea
            required
            rows={3}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="태양열 로스팅 커피의 향, 산미, 바디감에 대한 경험을 자유롭게 나눠주세요."
            className="w-full p-3 bg-[#0e0e0e] border border-[#333] text-white focus:outline-none focus:border-[#f91f0e] text-xs font-sans placeholder-[#666]"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#f91f0e] text-white font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#d8190b] transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>후기 등록</span>
            </button>
          </div>
        </form>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-[#161616] border border-[#262626] p-8 sm:p-9 flex flex-col justify-between hover:border-[#333] transition-colors"
          >
            <div>
              <div className="text-[#f91f0e] font-mono text-2xl mb-4 leading-none">„</div>
              <p className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug font-sans">
                "{rev.text}"
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="font-mono text-xs text-[#86c6fe] uppercase tracking-wider">
                {rev.author}
              </div>
              {rev.bean && (
                <div className="font-mono text-[11px] text-[#777] mt-0.5">
                  [{rev.bean}]
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
