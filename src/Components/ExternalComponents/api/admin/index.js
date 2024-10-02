import { instance } from "../axios";

export const adminSignup = (data) => {
    try {
        return instance.post('/admin/signup', data)
    } catch (error) {
        return error
    }
}

export const adminSignin = (data) => {
    try {
        return instance.post('/admin/signin', data)
    } catch (error) {
        return error
    }
}