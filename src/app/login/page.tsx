import KakaoLoginButton from "@/app/login/_components/KakaoLoginButton"

export default function Login() {
    return (
        <div className="flex flex-col mt-56 items-center">
            <div className="text-5xl font-bold">{"로그인"}</div>
            <KakaoLoginButton />
        </div>
    )
}
