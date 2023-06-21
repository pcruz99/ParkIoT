import { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

const BaseQrcode = () => {
  const [qrcode, setQrcode] = useState(null);
  useEffect(()=>{

  },[])

  return (
    <div>BaseQrcode</div>
  )
}

export default BaseQrcode