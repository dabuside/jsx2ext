import jsx from "@babel/plugin-syntax-jsx";
import * as t from "@babel/types";

export const plugin = (api) => {
  api.assertVersion(7);

  const visitor = {};

  visitor.JSXElement = {
    exit(path) {
      const openingPath = path.get("openingElement");
      const attribs = openingPath.node.attributes;
      const objProp = attrToObjectProperty(attribs);

      const totalProp = [];
      totalProp.push(
        t.objectProperty(
          t.identifier("xtype"),
          t.stringLiteral(openingPath.node.name.name)
        )
      );
      totalProp.push(...objProp);

      const child = filterJSXText(openingPath.parent.children);

      if (child.length) {
        totalProp.push(
          t.objectProperty(
            t.identifier("items"),
            t.arrayExpression(child.map((node) => convertAttributeValue(node)))
          )
        );
      }

      path.replaceWith(t.objectExpression(totalProp));
    },
  };

  visitor.JSXFragment = {
    exit(path) {
      path.replaceWith(
        t.arrayExpression(
          filterJSXText(path.node.children).map((node) =>
            convertAttributeValue(node)
          )
        )
      );
    },
  };

  return {
    name: "ext-jsx",
    inherits: jsx,
    visitor,
  };
};

function filterJSXText(array) {
  return array.filter((node) => !t.isJSXText(node));
}

function convertAttributeValue(node) {
  if (t.isJSXExpressionContainer(node)) {
    return node.expression;
  } else {
    return node;
  }
}

function convertAttributeName(node) {
  return t.identifier(node.name.name);
}

function attrToObjectProperty(attribs) {
  return attribs.map((attr) =>
    t.objectProperty(
      convertAttributeName(attr),
      convertAttributeValue(attr.value || t.booleanLiteral(true))
    )
  );
}
