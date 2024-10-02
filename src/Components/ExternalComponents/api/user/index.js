import { instance } from "../axios"

export const userSignup = (data) => {
    try {
        return instance.post('/user/signup', data)
    } catch (error) {
        return error
    }
}

export const userSignin = (data) => {
    try {
        return instance.post('/user/signin', data)
    } catch (error) {
        return error
    }
}