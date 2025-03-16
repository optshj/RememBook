import KakaoLoginButton from "./_components/KakaoLoginButton"

export default function Login() {
    return (
        <div className="mt-56 flex flex-col items-center">
            <div className="text-5xl font-bold">{"로그인"}</div>
            <KakaoLoginButton />
        </div>
    )
}
