'use strict';
const test = require('ava');
const Router = require('..');

test('正常匹配', t => {
  const router = new Router();
  router.addRoute('test/path');
  router.addRoute('haha/:path');
  const match = router.getRoute('test');
  const match1 = router.getRoute('test/path');
  const match2 = router.getRoute('test/test/test/test');
  const match3 = router.getRoute('haha');
  const match4 = router.getRoute('haha/test/kk');
  const match5 = router.getRoute('haha/kaka');
  t.deepEqual(
    [match, match1, match2, match3, match4, match5],
    [ null, 'test/path', null, null, null, 'haha/:path' ]
  );
});

test('匹配优先级1', t => {
  const router = new Router();
  router.addRoute('test/path');
  router.addRoute('test/:path');
  const match = router.getRoute('test/path');
  const match2 = router.getRoute('test/test');
  t.true(match === 'test/path');
  t.true(match2 === 'test/:path');
});

test('匹配优先级2', t => {
  const router = new Router();
  router.addRoute('test/:path');
  router.addRoute('test/path');
  const match = router.getRoute('test/path');
  const match2 = router.getRoute('test/test');
  t.true(match === 'test/:path');
  t.true(match2 === 'test/:path');
});

test('dump接口测试', t => {
  const router = new Router();
  router.addRoute('test/path');
  router.addRoute('test/:path');
  const routes = router.dump();
  t.deepEqual(routes, ['test/path', 'test/:path']);
});
