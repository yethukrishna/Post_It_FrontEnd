import axios from 'axios';

export const  commonAPI = async(httpMethod,url,reqBody)=>{
    const reqConfig={
        method:httpMethod,
        url,
        data:reqBody
    }
    return await axios(reqConfig).then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}