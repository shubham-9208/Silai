import React, { useEffect, useState } from 'react'

let timer;

function Search({ firebaseProduct, setfilterDataSearch,filterDataSearch }) {



  const handle = (e) => {
    const onChangeValue = e.target.value
    if(onChangeValue === ""){ 
      setfilterDataSearch(firebaseProduct)

    }

    const filterData= firebaseProduct.filter((product)=>
    product.name.toLowerCase().includes(onChangeValue.toLowerCase())
    )
    setfilterDataSearch(filterData)
  }

  const searchTime=(e)=>{
    if(timer){
      clearTimeout(timer)
    }
    timer=setTimeout(()=>{
      handle(e)
    },1000)
  }


  return (
    <div >
      <input type="Search" onChange={(e)=>searchTime(e)} placeholder=' Search'
        className=' border border-neutral-700 bg-transparent w-full py-3 px-3 rounded-xl outline-none text-[18px]' />

    </div>
  )
}

export default Search