/*
 * @Author: eyeA
 * @Date: 2021-07-13 14:26:19
 * @Last Modified by: eyeA
 * @Last Modified time: 2021-07-13 15:16:53
 * useEffect: 执行副作用(一段和当前执行结果无关的代码，比如要修改函数外的某个变量，
 * 要发起一个请求，也就是说，在函数组件的当次执行过程中，useEffect中代码的执行是不影响渲染出来的UI的)
 *
 * useEffect(callback, dependencies)
 *
 * 第一个为要执行的函数 callback，第二个是可选的依赖项数组 dependencies。
 * 其中依赖项是可选的，如果不指定，那么 callback 就会在每次函数组件执行完后都执行；如果指定了，那么只有依赖项中的值发生变化的时候，它才会执行。
 * 对应到 Class 组件，那么 useEffect 就涵盖了 ComponentDidMount、componentDidUpdate 和 componentWillUnmount 三个生命周期方法。
 * 不过如果你习惯了使用 Class 组件，那千万不要按照把 useEffect 对应到某个或者某几个生命周期的方法。
 * 你只要记住，useEffect 是每次组件 render 完后判断依赖并执行就可以了。
 *
 * useEffect 的两个特殊用法： 1. 没有依赖项，每次 render 过后都会执行 2. 依赖项作为空数组，只会在首次执行时触发
 */


// 举个例子，某个组件用于显示一篇 Blog 文章，那么这个组件会接收一个参数来表示 Blog 的 ID。而当 ID 发生变化时，组件需要发起请求来获取文章内容并展示：

import React, { useState, useEffect } from "react";

function BlogView({ id }) {
  // 设置一个本地 state 用于保存 blog 内容
  const [blogContent, setBlogContent] = useState(null);

  useEffect(() => {
    // useEffect 的 callback 要避免直接的 async 函数，需要封装一下
    const doAsync = async () => {
      // 当 id 发生变化时，将当前内容清楚以保持一致性
      setBlogContent(null);
      // 发起请求获取数据
      const res = await fetch(`/blog-content/${id}`);
      // 将获取的数据放入 state
      setBlogContent(await res.text());
    };
    doAsync();
  }, [id]); // 使用 id 作为依赖项，变化时则执行副作用

  // 如果没有 blogContent 则认为是在 loading 状态
  const isLoading = !blogContent;
  return <div>{isLoading ? "Loading..." : blogContent}</div>;
}

// function bv({ id }) {
//   const [blogContent, setBlogContent] = useState(null)

//   useEffect(() => {
//     const doAsync = async () => {
//       setBlogContent(null)
//       const res = await fetch()
//       setBlogContent(await res.text())
//     }
//     doAsync()
//   }, [id])

//   const isLoading = !blogContent
//   return <div>
//     {isLoading ? 'Loading...' : blogContent}
//   </div>
// }

// useEffect 还有两个特殊的用法：没有依赖项，以及依赖项作为空数组。我们来具体分析下。
```javascript
// 没有依赖项，则每次 render 后都会重新执行。例如：
useEffect(() => {
  // 每次 render 完一定执行
  console.log('re-rendered');
});

```

  ```javascript
  // 空数组作为依赖项，则只在首次执行时触发，对应到 Class 组件就是 componentDidMount。例如：

useEffect(() => {
  // 组件首次渲染时执行，等价于 class 组件中的 componentDidMount
  console.log('did mount');
}, [])

```

  ```javascript
// 除了这些机制之外，useEffect 还允许你返回一个函数，用于在组件销毁的时候做一些清理的操作。
// 比如移除事件的监听。这个机制就几乎等价于类组件中的 componentWillUnmount。举个例子，在组件中，我们需要监听窗口的大小变化，以便做一些布局上的调整：

// 设置一个 size 的 state 用于保存当前窗口尺寸
const [size, setSize] = useState({});
useEffect(() => {
  // 窗口大小变化事件处理函数
  const handler = () => {
    setSize(getSize());
  };
  // 监听 resize 事件
  window.addEventListener('resize', handler);

  // 返回一个 callback 在组件销毁时调用
  return () => {
    // 移除 resize 事件
    window.removeEventListener('resize', handler);
  };
}, []);
```

export default BlogView
