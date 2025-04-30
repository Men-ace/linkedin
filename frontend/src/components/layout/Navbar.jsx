import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../../lib/axios'

const Navbar = () => {
  const {data: authuser} = useQuery({queryKey: ["authUser"],})

  const {data:notifucation} = useQuery({
    queryKey: ["notification"],
    queryFn: async() => axiosInstance.get("/notifications"),
    enabled: !authuser
  })

  const {mutate: }
  return ( 
    <div>
      navbar
    </div>
  ) 
}

export default Navbar
