export default function HomePage() {
  return (
    <div>
      <main className='w-full mx-auto h-dvh flex flex-col md:flex-row justify-center p-8 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white'>
        <div className='h-full w-full max-w-7xl mx-auto flex justify-center gap-8'>
          <div className='min-w-[70%] flex flex-col gap-4 items-center'>
            <div className='glaze w-full min-h-[150px]'>
              <h2 className='text-2xl font-bold mb-4'>
                최근 함께 플레이한 유저
              </h2>
              <div className='flex items-center flex-1 gap-2'>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <div className='bg-black w-10 h-10 rounded-full'></div>
                  <p className='text-xs'>유저 닉네임</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <div className='bg-black w-10 h-10 rounded-full'></div>
                  <p className='text-xs'>유저 닉네임</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <div className='bg-black w-10 h-10 rounded-full'></div>
                  <p className='text-xs'>유저 닉네임</p>
                </div>
              </div>
            </div>
            <div className='glaze w-full flex-1'>
              <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold mb-4'>티어별 유저 목록</h2>
                <div>티어 셀렉트박스</div>
              </div>
            </div>

            <div className='glaze w-full min-h-[150px]'>
              <h2 className='text-2xl font-bold mb-4'>최근 대화 목록</h2>
              <div className='flex items-center flex-1 gap-2'>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <div className='bg-black w-10 h-10 rounded-full'></div>
                  <p className='text-xs'>유저 닉네임</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <div className='bg-black w-10 h-10 rounded-full'></div>
                  <p className='text-xs'>유저 닉네임</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <div className='bg-black w-10 h-10 rounded-full'></div>
                  <p className='text-xs'>유저 닉네임</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-4 items-center'>
            <div className='glaze w-full min-h-[300px]'>
              <div>
                <h1>player#kr1</h1>
                <div>티어 이미지</div>
              </div>
              <div>전체 채팅 목록</div>
              <div>마이페이지</div>
              <div>자기 소개 한마디</div>
              <button>로그아웃</button>
            </div>
            <div className='glaze w-full flex-1'>
              <div>
                <h1>player#kr1</h1>
                <div>티어 이미지</div>
              </div>
              <div>자기 소개 한마디</div>
              <div>채팅 걸기</div>
              <div>듀오 신청</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
