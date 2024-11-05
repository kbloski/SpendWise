import { lsTokenKey } from "../config/config.js"

export function getLocalToken(){
    return localStorage.getItem(lsTokenKey )
}