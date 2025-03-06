import Link from "next/link"

export default async function KakaoLoginButton() {
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`

    return (
        <Link href={link}>
            <button className="text- mt-6 rounded-lg bg-kakao px-32 py-4 text-lg font-bold">{"카카오로 로그인"}</button>
        </Link>
    )
}
