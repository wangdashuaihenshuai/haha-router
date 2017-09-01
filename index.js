var flatMap = require('lodash.flatmap');

class Node {
  constructor(word, url) {
    this.isPath = false;
    this.hasPath = false;
    this.isEnd = false;
    this.url = url;
    this.word = word;
    if (word.startsWith(':')) {
      this.isPath = true;
    }
    this.nextMap = new Map();
    this.nextArray = [];
    this.urlPaths = [];
    this.urlNum = 0;
  }

  addPath(path, u) {
    if (path.startsWith(':')) this.hasPath = true;
    const p = this.nextMap.get(path);
    if (p) {
      return p;
    } else {
      const _p = new Node(path, u);
      this.nextMap.set(path, _p);
      this.nextArray.push(_p);
      return _p;
    }
  }

  addUrl(urlPath) {
    this.urlNum ++;
    if (this.isPath) return this.urlPaths.push(urlPath);
  }

  getNexts(path) {
    if (this.hasPath) return this.nextArray.filter(n => n.isPath === true || n.word === path);
    const n = this.nextMap.get(path);
    return n ? [n] : [];
  }
}

class Router {
  constructor() {
    this.root = new Node('root');
  }

  addRoute(r) {
    if (this.getRoute(r) !== null) return;
    const paths = r.split('/').map(p => p.trim()).filter(p => p !== '');
    let current = this.root;
    let u = '';
    for (let p of paths) {
      u = u + '/' + p;
      current = current.addPath(p, u);
    }
    current.isEnd = true;
  }

  getRoute(url) {
    const paths = url.split('/').map(p => p.trim()).filter(p => p !== '');
    let current = [this.root];
    for (let p of paths) {
      current = flatMap(current, n => {
        return n.getNexts(p);
      });
      if (current.length <= 0) return null;
    }
    const r = current.filter(n => n.isEnd === true);
    if (r.length <= 0) return null;
    return r[0].url;
  }
}

module.exports = Router;
