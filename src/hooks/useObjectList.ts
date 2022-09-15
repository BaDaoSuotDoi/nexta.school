import { useAsync } from "react-use";
import Fetch from "../services/Fetch";
import { Toast } from "../services/Toast";
import { Result } from "../store/type";

export default function useObjectList<ResponseType>(url: string,selected: any[],params ?:any){
     const objects = useAsync(async()=>{
        if(selected){
            if(!params){
                const res = await Fetch.get<{result: Result, data: ResponseType[]}>(url);
                const {result, data} = res.data
                console.log("DATA",data);
                if(result.code == 200 && result.result){
                    return data
                }
                Toast.error(result.message)
            }else{
                const res = await Fetch.postJson<{result: Result, data: ResponseType[]}>(url,params);
                const {result, data} = res.data
                if(result.code == 200 && result.result){
                    return data
                }
                Toast.error(result.message)
            }
        }
        return []
    },[...selected]) 

    return {
        loading: objects.loading,
        error: objects.error,
        value: objects.value,
    }
}