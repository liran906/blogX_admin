// M
import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface bannerListType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "activated": boolean
    "url": string
    "href": string
}

export function bannerListApi(params?: paramsType): Promise<baseResponse<listResponse<bannerListType>>> {
    return useAxios.get("/api/banner", {params})
}

export interface bannerType {
    id?: number
    "url": string
    "href": string
    "activated": boolean
}

export function bannerUpdateApi(data: bannerType): Promise<baseResponse<string>> {
    if (data.id) {
        return useAxios.put("/api/banner/" + data.id.toString(), data)
    }
    return useAxios.post("/api/banner", data)
}