interface KakaoProfile {
    nickname: string
}

interface KakaoProperties extends KakaoProfile {}

interface KakaoAccount {
    profile_nickname_needs_agreement: boolean
    profile: KakaoProfile
}

export interface KakaoUser {
    id: number
    connected_at: string
    properties: KakaoProperties
    kakao_account: KakaoAccount
}
