import code from "./example";
import * as Babel from "@babel/standalone";
import { plugin } from "./plugin";

let transpiled;
try {
  const res = Babel.transform(code, {
    configFile: false,
    plugins: [plugin],
  });
  transpiled = res.code;
} catch (e) {
  transpiled = e.message;
}

const preNode = document.getElementById("pre");
preNode.innerText = code;

const afterNode = document.getElementById("after");
afterNode.innerText = transpiled;
