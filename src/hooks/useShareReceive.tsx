import React,{useEffect, useState} from 'react'
import { getReceive } from '~/services/shareService'
export default function useShareReceive() {
    const [loading, setLoading] = useState(false)
    const [sModal, setShow] = useState(false)
    const [listR, setListReceive] = useState([])
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const data:any = await getReceive();
            const listReceiveFilter:any = data.filter((item:IShareReceiveInfo) => {
                return item.status == 'waiting';
              });
              setListReceive(listReceiveFilter)
              if (listReceiveFilter.length == 0) {
                setLoading(false)
                setShow(false)
              } else {
                setLoading(false)
                setShow(true)
              }
        } 
        getData()
    },[])
    return {loading, sModal, listR, setShow}
}
