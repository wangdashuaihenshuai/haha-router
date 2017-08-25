# README

一个简单的路由匹配库。使用修改过的前缀树来实现，速度还是很快的。

### 支持 URL 类型

1. /test/hello
2. /test/:id

### 匹配优先级

按照 addRoute 顺序来匹配。

```js
const router = require('haha-router');
const router = new Router();
router.addRoute('/test/path');
router.addRoute('/test/:path');

router.getRoute('/test/path');
// '/test/path'
router.getRoute('/test/test');
// '/test/:path'
```

# API

## Router

Router.addRoute(route)

添加路由

- `route` string 路由。

```js
const Router = require('haha-router');
const router = new Router();
router.addRoute(route)
```

Router.getRoute(url)

获取路由

- `url` string url。

```js
const Router = require('haha-router');
const router = new Router();
router.addRoute(route)
router.getRoute(url)
```
