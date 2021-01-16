const fs = require("fs");

const element = (node, attrs, children) => {
    if (children) {
        const c = children();
        return `<${node} ${attrs.map(attr => `${attr.key}="${attr.value}"`).join(" ")}>${Array.isArray(c) ? c.join("\n") : c}</${node}>`;
    } else {
        return `<${node} ${attrs.map(attr => `${attr.key}="${attr.value}"`).join(" ")}/>`;
    }
}

const generate = (path, html, cb) => {
    fs.writeFile(path, html, cb);
}

const file = (path, options, cb) => {
    cb(element, generate.bind(undefined, path));
}

file("./test.html", undefined, (element, generate) => {
    const page = element("html", [], () => {
        return element("h1", [{key: "innerHTML", value: "Hello World!"}])
    });

    generate(page, () => console.log("Generated"));
});


module.exports = {
    file,
    element
};