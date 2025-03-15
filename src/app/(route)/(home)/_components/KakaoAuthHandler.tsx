"use client"
import { setAccessToken } from "@/app/_store/module/accessToken"
import { setUserData } from "@/app/_store/module/KakaoUserData"
import { useAppDispatch, useAppSelector } from "@/app/_store/Provider"
import { useEffect } from "react"

export default function KakaoAuthHandler({ code }: { code?: string }) {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector(state => state.accessToken)

    const fetchAccessToken = async (code?: string) => {
        try {
            let newAccessToken = null
            // get refreshToken from cookie
            const refreshToken = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/kakao/get_refresh_token`, {
                method: "GET"
            }).then(res => res.json())

            // if refreshToken is valid, request new accessToken
            if (refreshToken.value) {
                const data = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/kakao/refresh_access_token`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ refreshToken: refreshToken.value })
                }).then(res => res.json())
                if (data?.access_token) {
                    newAccessToken = data.access_token
                    dispatch(setAccessToken(data.access_token))
                }
            } else if (code) {
                const data = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/kakao/callback`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ code })
                }).then(res => res.json())
                if (data?.access_token) {
                    newAccessToken = data.access_token
                    dispatch(setAccessToken(data.access_token))
                }
            }
            return newAccessToken
        } catch (error) {
            console.error(error)
            return null
        }
    }
    const fetchUserData = async (token: string) => {
        try {
            const userRes = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/kakao/getuser`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accessToken: token })
            }).then(res => res.json())

            if (userRes) {
                dispatch(setUserData(userRes))
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchAccessToken(code).then(newToken => {
            if (newToken) fetchUserData(newToken)
        })
    }, [code, dispatch])
    useEffect(() => {
        if (accessToken) fetchUserData(accessToken)
    }, [accessToken, dispatch])
    return null
}
