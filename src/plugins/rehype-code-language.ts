/**
 * Rehype 插件：在 Shiki 处理之前，从 <code class="language-xxx"> 中提取语言信息
 * 并作为 data-language 属性设置到 <pre> 元素上，便于客户端脚本读取。
 */
export function rehypeCodeLanguage() {
	return (tree: any) => {
		visit(tree);
	};
}

function visit(node: any): void {
	if (!node || typeof node !== "object") return;

	// 找到 <pre> 包裹单个 <code> 的代码块
	if (node.type === "element" && node.tagName === "pre") {
		const children = node.children;
		if (children && children.length === 1) {
			const codeEl = children[0];
			if (codeEl.type === "element" && codeEl.tagName === "code") {
				const className = codeEl.properties?.className;
				if (className) {
					const classes: string[] = Array.isArray(className) ? className : [className];
					const langClass = classes.find((c: string) => c.startsWith("language-"));
					if (langClass) {
						const lang = langClass.replace("language-", "");
						if (!node.properties) node.properties = {};
						node.properties["data-language"] = lang;
					}
				}
			}
		}
	}

	// 递归遍历子节点
	if (node.children) {
		for (const child of node.children) {
			visit(child);
		}
	}
}
