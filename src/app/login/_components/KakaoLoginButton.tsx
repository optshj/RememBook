import Link from "next/link"

export default async function KakaoLoginButton() {
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`

    return (
        <Link href={link}>
            <button className="bg-kakao px-32 py-4 font-bold rounded-lg text-lg mt-6 text-">{"카카오로 로그인"}</button>
        </Link>
    )
}
