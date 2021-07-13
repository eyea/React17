/*
 * @Author: eyeA
 * @Date: 2021-07-13 14:20:09
 * @Last Modified by: eyeA
 * @Last Modified time: 2021-07-13 14:21:06
 * useState：让函数组件具有维持状态的能力
*/

import React, { useState } from "react"

export default function Example() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>
      <div onClick={() => setCount(count + 1)}>+</div>
    </div>
  )
}