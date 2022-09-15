import axios, { AxiosPromise } from "axios";

class Fetch{
    private __base_url: string = process.env.NODE_ENV !== "production" ? 'http://127.0.0.1:3009/apis/v2' : "http://beta.api.nexta.vn/apis/v2";
    private __access_token: string = "";

    async postWithAccessToken<ResponseType>(url: string, params: Object, array_fields: string[] = [], show_loading = true): Promise<AxiosPromise<ResponseType>> {
        return await this.post<ResponseType>(url, {
            ...params,
            access_token: this.__access_token,
        }, array_fields, show_loading);
    };


    async postJsonWithAccessToken<ResponseType>(url: string, params: Object): Promise<AxiosPromise<ResponseType>> {
        return await this.postJson<ResponseType>(url, {
            ...params,
            access_token: this.__access_token,
        });
    }

    async postJson<ResponseType>(url: string, params: Object): Promise<AxiosPromise<ResponseType>> {
        const res = axios.post(`${this.__base_url}${url}`, params,{headers:{
            "api-key": "nexta",
            "version": 3.2,
            "Content-Type": "application/json"
        }});
        return res;
    };


    async get<ResponseType>(url: string): Promise<AxiosPromise<ResponseType>> {
        const res = await axios.get(`${this.__base_url}${url}`,{headers:{
            "api-key": "nexta",
            "version": 3.2,
            "Content-Type": "application/json"
        }});
        return res;
    };

    async post<ResponseType>(url: string, params: any, array_fields: string[] = [], show_loading = true): Promise<AxiosPromise<ResponseType>> {
        // LoadingFunctions.setLoading(true, 0.1, show_loading);
        var form_data = new FormData();
        for (let k in params) {

            if (array_fields.indexOf(k) > -1) {
                for (let i = 0; i < params[k].length; i++) {
                    form_data.append(k + '[]', params[k][i]);
                }
            } else {
                if (params[k] != null && params[k] != undefined) {
                    form_data.append(k, params[k]);
                }
            }

        }

        const res = await axios.post(`${this.__base_url}${url}`, form_data, {
            onDownloadProgress: function (progress_event) {
                // LoadingFunctions.setLoading(true, progress_event.loaded / progress_event.total * 100);
                // if (progress_event.loaded === progress_event.total) {
                //     LoadingFunctions.setLoading(false, 0);
                // }
            }
        });

        return res;
    }

}

export default new Fetch()