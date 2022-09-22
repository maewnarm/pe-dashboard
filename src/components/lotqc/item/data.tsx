import { LotQCContext } from '@/pages/lotqc'
import React,{useState,useEffect,useContext} from 'react'

const LotqcItemData = () => {
  const {} = useContext(LotQCContext)

  return (
    <div className='lotqc-item-data'>
      <div className="lotqc-item-data__wrapper">
        <p>Abnormal data details</p>
        <div className="lotqc-item-data__chart_wrapper">
          {}
        </div>
      </div>
    </div>
  )
}

export default LotqcItemData