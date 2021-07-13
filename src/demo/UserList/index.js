/*
 * @Author: eyea
 * @Date: 2021-07-12 17:06:39
 * @Last Modified by: eyeA
 * @Last Modified time: 2021-07-12 17:32:19
 *
 * 用户列表
 *
 * 课程地址 https://time.geekbang.org/column/article/376532?utm_source=Geektime&utm_medium=pcchaping&utm_term=pc_interstitial_1183&gk_cus_user_wechat=university
 *
 */
import React from 'react'

export default function UserList() {
  const [userInfo, setUserInfo] = React.useState([])
  const [loadStatus, setLoadStatus] = React.useState(false)
  const [error, setErr] = React.useState(null)

  const fetchUserInfo = async () => {
    setLoadStatus(true)
    try {
      const res = await fetch('https://reqres.in/api/users/')
      const json = await res.json()
      // 请求成功后把数据放入state
      setUserInfo(json.data)
    } catch (err) {
      setErr(err)
    }
    setLoadStatus(false)
  }

  return (
    <div>
      <button onClick={() => fetchUserInfo()} disabled={loadStatus}>
        {!loadStatus ? '点击获取信息' : '显示用户信息'}
      </button>
      {
        error && <div color={{ color: 'red' }}>Faild: {String(error)}</div>
      }
      <br />
      <ul>
        {
          userInfo.length > 0 && userInfo.map(user => {
            return <li key={user.id}> {user.first_name}</li>
          })
        }
      </ul>
    </div >
  )
}



// ! 思考下面的形式怎么写，数据通信这块
// // 定义请求
// function fetchUsers() {

// }


// // render view
// function UserList() {
//   return (
//     <div>
//       {/* 触发 */}
//       <button onClick={() => fetchUsers}>点击获取用户信息</button>

//       {/* 列表 */}
//     </div>
//   )
// }

// export default UserList
