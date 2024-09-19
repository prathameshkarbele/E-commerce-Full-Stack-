import React from 'react'
import SummaryApi from '../common'

const GetCategoryWiseProduct = async(category) => {
 const responce = await  fetch(SummaryApi.CategoryWiseProducr.url,{
    method: SummaryApi.CategoryWiseProducr.method,
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify({
        category:category
    })
 })
 const dataResponce = await responce.json()
return dataResponce;
}

export default GetCategoryWiseProduct