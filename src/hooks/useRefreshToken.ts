import useAuth from "./useAuth"
import { publicApi } from "../api/axios"


const useRefreshToken = () => {
    const {setAuth} = useAuth()

    const refresh = async () => {
        const response = await publicApi.get('/refresh', {
            // withCredentials: true
        })
        
        setAuth((prev: any) => {
            return { ...prev, accessToken: response?.data?.data }
        })

        return response?.data?.data
    }

    return refresh
}

export default useRefreshToken