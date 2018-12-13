import React, { Suspense, Children } from "react";
// import { Link } from "gatsby";
// import Provider from "components/ComponentsProvider";

// const syncPosts = [
//   require("../posts/first.1").default,
//   require("../posts/first.2").default,
//   require("../posts/first.3").default,
//   require("../posts/first.4").default,
//   require("../posts/first.5").default,
//   require("../posts/first.6").default,
//   require("../posts/first.7").default
// ].map(Component => ({
//   component: () => (
//     <Provider>
//       <Component />
//     </Provider>
//   )
// }));

// const factories = [
//   () => import("../posts/first.1"),
//   () => import("../posts/first.2"),
//   () => import("../posts/first.3"),
//   () => import("../posts/first.4"),
//   () => import("../posts/first.5"),
//   () => import("../posts/first.6"),
//   () => import("../posts/first.7")
// ];

// const sleep = ms => value =>
//   new Promise(resolve => setTimeout(resolve, ms, value));

// const random = (min = 0, max = 1) =>
//   Math.round(Math.random() * (max - min) + min);

// const lazyWithPreload = (factory, index) => {
//   const Component = React.lazy(() =>
//     factory().then(sleep(random(1000, 10000)))
//   );

//   return {
//     component: () => (
//       <Provider>
//         <Component />
//       </Provider>
//     ),
//     preload: factory
//   };
// };

// const createPostsComponents = factories => factories.map(lazyWithPreload);

// const posts = createPostsComponents(factories);

// const List = ({ children }) => {
//   const childs = Children.toArray(children);

//   return childs.map((child, index) => (
//     <div id={`aw${index}`} key={index}>
//       <h1>
//         <a href={`#aw${index}`}>{index + 1}</a>
//       </h1>

//       {child}
//     </div>
//   ));
// };

// const shouldUpdateScroll = (...args) => {
//   console.log(args);

//   return true;
// };

export default () => (
  <div>
    {/* <List>
      {syncPosts.map(({ component: Post }, index) => (
        <Post key={index} />
      ))}
    </List> */}
    empty
  </div>
);
