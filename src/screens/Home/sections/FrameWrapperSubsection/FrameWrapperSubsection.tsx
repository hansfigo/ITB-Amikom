import React from "react";
import { Button } from "../../../../components/ui/button";

export const FrameWrapperSubsection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-2.5 py-[60px] w-full">
      <div className="relative w-full container mx-auto px-4">
        <div className="relative w-full h-[238px]">
          <div className="absolute top-0 left-0 w-full h-full flex">
            <div className="relative w-full h-full">
              <div className="absolute top-[25px] left-3.5 w-[calc(100%-28px)] h-[126px] bg-[#0660a64f] rounded-[25px] blur-[50px]" />

              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[95px] left-3.5 w-[calc(100%-28px)] h-[126px] bg-[#0660a64f] rounded-[25px] blur-[50px]" />

                <div className="absolute top-0 left-0 w-full h-full rounded-[25px] overflow-hidden bg-[linear-gradient(323deg,rgba(6,96,166,1)_0%,rgba(106,160,202,1)_100%)]">
                  <div className="absolute -top-6 left-[998px] w-[351px] h-[351px] rounded-[175.5px] bg-[linear-gradient(75deg,rgba(21,106,172,0.36)_0%,rgba(0,103,171,1)_100%)]" />

                  <div className="absolute top-[115px] left-[845px] w-[135px] h-[135px] rounded-[67.5px] bg-[linear-gradient(2deg,rgba(36,123,190,0)_0%,rgba(48,123,181,1)_100%)]" />

                  <div className="absolute top-[-223px] left-[373px] w-[382px] h-[382px] rounded-[191px] rotate-180 bg-[linear-gradient(102deg,rgba(21,106,172,0.15)_0%,rgba(55,128,184,0)_100%)]" />

                  <div className="absolute top-[121px] -left-20 w-[181px] h-[181px] rounded-[90.5px] bg-[linear-gradient(20deg,rgba(36,123,190,0)_0%,rgba(126,199,255,1)_100%)]" />

                  <div className="absolute top-[-187px] left-[-213px] w-[808px] h-[808px] rounded-[403.78px] bg-[linear-gradient(0deg,rgba(131,175,211,1)_0%,rgba(131,175,211,1)_100%),linear-gradient(0deg,rgba(131,175,211,1)_0%,rgba(131,175,211,1)_100%)]">
                    <div className="absolute top-[122px] left-[122px] w-[564px] h-[564px] rounded-[281.81px] bg-[linear-gradient(0deg,rgba(131,175,211,1)_0%,rgba(131,175,211,1)_100%),linear-gradient(0deg,rgba(131,175,211,1)_0%,rgba(131,175,211,1)_100%)] opacity-[0.29]" />

                    <div className="absolute top-[209px] left-[209px] w-[389px] h-[389px] rounded-[194.69px] bg-[linear-gradient(0deg,rgba(131,175,211,1)_0%,rgba(131,175,211,1)_100%),linear-gradient(0deg,rgba(131,175,211,1)_0%,rgba(131,175,211,1)_100%)] opacity-[0.29]" />
                  </div>

                  <div className="absolute top-[-52px] left-[582px] bg-[linear-gradient(323deg,rgba(131,191,238,1)_0%,rgba(255,255,255,1)_83%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] opacity-[0.04] [font-family:'Inter',Helvetica] font-extrabold text-transparent text-8xl text-right tracking-[0] leading-[normal]">
                    CARVE YOUR <br />
                    OWN DREAM
                    <br />
                    PATH
                  </div>

                  <div className="absolute top-[33px] left-[747px] bg-[linear-gradient(323deg,rgba(131,191,238,1)_0%,rgba(255,255,255,1)_83%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-extrabold italic text-transparent text-5xl text-right tracking-[0] leading-[normal]">
                    CARVE
                  </div>

                  <div className="absolute top-[79px] left-[798px] bg-[linear-gradient(323deg,rgba(131,191,238,1)_0%,rgba(255,255,255,1)_83%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-extrabold italic text-transparent text-5xl text-right tracking-[0] leading-[normal]">
                    YOUR OWN
                  </div>

                  <div className="absolute top-[125px] left-[723px] bg-[linear-gradient(323deg,rgba(131,191,238,1)_0%,rgba(255,255,255,1)_83%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-extrabold italic text-transparent text-5xl text-right tracking-[0] leading-[normal]">
                    DREAM PATH
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full items-start gap-5 pl-[69px] pr-10 py-10 absolute top-[calc(50%_-_114px)] left-0 rounded-[25px]">
            <h2 className="w-[526px] font-h6-bold font-[number:var(--h6-bold-font-weight)] text-white text-[length:var(--h6-bold-font-size)] tracking-[var(--h6-bold-letter-spacing)] leading-[var(--h6-bold-line-height)] [font-style:var(--h6-bold-font-style)]">
              Raih Impian demi Kesuksesan Masa Depanmu
            </h2>

            <Button asChild className="h-12 justify-center gap-2.5 px-4 bg-white text-[#069dd8] rounded-[100px] overflow-hidden hover:bg-white/90 font-semibold">
              <a href="/programs" className="[font-family:'Inter',Helvetica] text-base text-center tracking-[0] leading-[22px] whitespace-nowrap text-current">
                Daftar Sekarang
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
