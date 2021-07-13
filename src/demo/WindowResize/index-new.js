/*
 * @Author: eyea
 * @Date: 2021-07-13 11:08:49
 * @Last Modified by: wangxudong13804
 * @Last Modified time: 2021-07-13 11:17:25
 */
import { useEffect, useState } from 'react'

const getSize = () => {
  return window.innerWidth > 1000 ? "large" : 'small'
}

const useWindowSize = () => {
  const [size, setSize] = useState(getSize())
  useEffect(() => {
    const handler = () => {
      setSize(getSize())
    }
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])
  return size
}

const Demo = () => {
  const size = useWindowSize()
  return size === 'small' ? "smallComponent" : "largeComponent"
}

export default Demo
