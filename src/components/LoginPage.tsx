import { loginWithGoogle } from '../auth'

export default function LoginPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black">
      {/* 벚꽃 파티클 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 opacity-20 animate-bounce text-xl select-none"
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 13 + 3) % 80}%`,
              animationDuration: `${2 + (i % 4)}s`,
              animationDelay: `${(i * 0.3) % 2}s`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* 카드 */}
      <div className="relative z-10 flex flex-col items-center gap-6 p-10 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl max-w-sm w-full mx-4">
        <div className="text-center">
          <p className="text-pink-300 text-sm tracking-widest font-light mb-2">VISUAL NOVEL</p>
          <h1 className="text-white text-3xl font-bold leading-tight drop-shadow-lg">
            김영한과 함께
          </h1>
          <p className="text-white/40 text-sm mt-2">봄날의 이야기</p>
        </div>

        <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-5xl shadow-xl animate-pulse-heart">
          🌸
        </div>

        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:bg-gray-50 active:scale-95 transition-all duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Google로 시작하기
        </button>

        <p className="text-white/20 text-xs text-center">
          로그인하면 플레이 기록이 저장됩니다.
        </p>
      </div>
    </div>
  )
}
