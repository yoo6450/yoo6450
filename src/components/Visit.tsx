import React from 'react';

export const Visit: React.FC = () => {
  return (
    <section id="visit" className="px-[4vw] py-24 border-b border-[#262626]">
      <div className="mb-12">
        <div className="font-mono text-[#86c6fe] text-xs uppercase tracking-widest flex items-center gap-2 mb-3">
          <span className="w-3.5 h-[2px] bg-[#86c6fe]"></span>
          Visit & Contact
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
          카페 <span className="text-[#f91f0e]">오시는 길</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="flex flex-col gap-8">
          <div>
            <h4 className="font-mono text-xs text-[#86c6fe] uppercase tracking-wider mb-2">
              Address
            </h4>
            <p className="text-xl text-white font-medium">
              충주호
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs text-[#86c6fe] uppercase tracking-wider mb-2">
              Phone
            </h4>
            <p className="text-xl text-white font-medium">
              123 4567 8900
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs text-[#86c6fe] uppercase tracking-wider mb-2">
              Operating Hours
            </h4>
            <div className="mt-2 font-mono text-sm text-[#a0a0a0] max-w-xs space-y-2 border-t border-b border-[#262626] py-3">
              <div className="flex justify-between items-center text-white font-semibold">
                <span>Monday - Friday</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-[#777]">
                <span>Saturday</span>
                <span>Closed</span>
              </div>
              <div className="flex justify-between items-center text-[#777]">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs text-[#86c6fe] uppercase tracking-wider mb-2">
              Categories
            </h4>
            <div className="flex gap-2.5 mt-2">
              <span className="font-mono text-xs px-3 py-1 bg-white/5 border border-[#262626] text-[#a0a0a0]">
                cafe bistro
              </span>
              <span className="font-mono text-xs px-3 py-1 bg-white/5 border border-[#262626] text-[#a0a0a0]">
                caffe
              </span>
            </div>
          </div>
        </div>

        <div className="border border-[#262626] bg-[#161616] overflow-hidden">
          <img
            src="https://labs.google.com/pomelli_downloads/websites/awXb9RNFJ2v5Ggu195Q4jM/resources/9jeVtLPpWDze1fUgZqd_TW?authuser=0"
            alt="Charlie's GoodTime urban brick storefront display"
            className="w-full h-[400px] sm:h-[480px] object-cover filter brightness-95 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};
