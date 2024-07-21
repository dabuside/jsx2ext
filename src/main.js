import code from "./example";
import * as Babel from "@babel/standalone";
import { plugin } from "./plugin";
import loader from "@monaco-editor/loader";

loader.init().then((monaco) => {
  const jsModel = monaco.editor.createModel(code, "javascript");
  const textModel = monaco.editor.createModel(code, "text");

  const jsxEditor = monaco.editor.create(document.getElementById("pre"), {
    value: code,
    language: "javascript",
  });

  const jsonEditor = monaco.editor.create(document.getElementById("after"), {
    value: compile(code).transpiled,
    language: "javascript",
    readOnly: true,
  });

  jsxEditor.onDidChangeModelContent(() => {
    const { transpiled, error } = compile(jsxEditor.getValue());
    if (!error) {
      jsonEditor.setModel(jsModel);
      jsonEditor.setValue(transpiled);
    } else {
      jsonEditor.setModel(textModel);
      jsonEditor.setValue(transpiled);
    }
  });
});

function compile(code) {
  let result = {
    transpiled: "",
    error: false,
  };
  try {
    const res = Babel.transform(code, {
      configFile: false,
      plugins: [plugin],
    });
    result.transpiled = res.code;
  } catch (e) {
    result.transpiled = e.message;
    result.error = true;
  }
  return result;
}
