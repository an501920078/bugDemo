import axios from '@/http'

export const post = () => {
    return axios({
        url: '/api/demo'
    })
}