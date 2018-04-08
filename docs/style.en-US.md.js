webpackJsonp([44],{1535:function(s,n){s.exports={content:["article",{},["h2","less"],["p","Ant Design Pro defaults to using less as the style language, we recommend that you learn about the features of ",["a",{title:null,href:"http://lesscss.org/"},"less"]," before using it or sometimes when you have some questions."],["h2","CSS Modules"],["p","In the style development process, there are two prominent problems:"],["ul",["li",["p","Global Pollution - CSS selectors are globally valid. Selectors with the same name in different files will be built together, and the former will be overrided by the latter."]],["li",["p","Complex Selector - in order to avoid the above problem, we have to be careful when writing styles. The increase in flags for range restriction will lead to a growing class name, besides that, naming style confusion in multi person development and an increasing number of selectors on an element is hard to avoid."]]],["p","In order to solve the above problems, our scaffold use CSS Modules as a modular solution. Let us have a look at how to write style in this mode."],["pre",{lang:"html",highlighted:'// example.js\nimport styles from \'./example.less\';\n\nexport default ({title}) => <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation">=</span>{styles.title}</span><span class="token punctuation">></span></span>{title}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>;'},["code","// example.js\nimport styles from './example.less';\n\nexport default ({title}) => <div className={styles.title}>{title}</div>;"]],["pre",{lang:"css",highlighted:'<span class="token selector">// example<span class="token class">.less</span>\n<span class="token class">.title</span> </span><span class="token punctuation">{</span>\n  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token atrule"><span class="token rule">@heading-color</span><span class="token punctuation">;</span></span>\n  <span class="token property">font-weight</span><span class="token punctuation">:</span> <span class="token number">600</span><span class="token punctuation">;</span>\n  <span class="token property">margin-bottom</span><span class="token punctuation">:</span> <span class="token number">16</span>px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>'},["code","// example.less\n.title {\n\xa0\xa0color: @heading-color;\n\xa0\xa0font-weight: 600;\n\xa0\xa0margin-bottom: 16px;\n}"]],["p","Write style use less file does not seem to change much, but the class name is relatively simple (the actual project is also the case). The classname in js files would be replaced by an object attribute, which has the same name as the selector in the less file from where the object was imported."],["p","In the above style file, ",["code",".title"]," will only work in this file, you can use the same selector name in any other file, it will not affect here. But sometimes, we just want a global style which can take effect everywhere? You can use ",["code",":global"],"."],["pre",{lang:"css",highlighted:'<span class="token selector">// example<span class="token class">.less</span>\n<span class="token class">.title</span> </span><span class="token punctuation">{</span>\n  <span class="token property">color</span><span class="token punctuation">:</span> @ heading-color<span class="token punctuation">;</span>\n  <span class="token property">font-weight</span><span class="token punctuation">:</span> <span class="token number">600</span><span class="token punctuation">;</span>\n  <span class="token property">margin-bottom</span><span class="token punctuation">:</span> <span class="token number">16</span>px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment" spellcheck="true">/* Define the global style */</span>\n<span class="token selector"><span class="token pseudo-class">:global</span> (<span class="token class">.text</span>) </span><span class="token punctuation">{</span>\n  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token number">16</span>px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment" spellcheck="true">/* Define multiple global styles */</span>\n<span class="token selector"><span class="token pseudo-class">:global</span> </span><span class="token punctuation">{</span>\n  <span class="token selector"><span class="token class">.footer</span> </span><span class="token punctuation">{</span>\n    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token hexcode">#ccc</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token selector"><span class="token class">.sider</span> </span><span class="token punctuation">{</span>\n    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token hexcode">#ebebeb</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>'},["code","// example.less\n.title {\n\xa0\xa0color: @ heading-color;\n\xa0\xa0font-weight: 600;\n\xa0\xa0margin-bottom: 16px;\n}\n\n/* Define the global style */\n:global (.text) {\n\xa0\xa0font-size: 16px;\n}\n\n/* Define multiple global styles */\n:global {\n\xa0\xa0.footer {\n\xa0\xa0\xa0\xa0color: #ccc;\n\xa0\xa0}\n\xa0\xa0.sider {\n\xa0\xa0\xa0\xa0background: #ebebeb;\n\xa0\xa0}\n}"]],["p","The basic principle of CSS Modules is very simple. that is: for each class name (without ",["code",":global"],") in accordance with some rules for conversion, to ensure its uniqueness. If you look at the dom structure of this example in your browser, you will find that the actual rendering like this:"],["pre",{lang:"html",highlighted:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>title___3TqAx<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>'},["code",'<div class="title___3TqAx">title</div>']],["p","Hash value is added to the class name automatically, which guarantees its uniqueness."],["p","In addition to the basics above, there are some key points to be noted:"],["ul",["li",["p","CSS Modules only convert ",["code","className"]," and ",["code","id"],". Others such as property selectors and tag selectors are not processed. It is recommended to take className as the first choice."]],["li",["p","Since you do not have to worry about className repeat, your className can be as simple as possible with basic semantics."]]],["p","It's a brief introduction for CSS Modules, for details, please refer to:"],["ul",["li",["p",["a",{title:null,href:"https://github.com/css-modules/css-modules"},"github/css-modules"]]],["li",["p",["a",{title:null,href:"http://www.ruanyifeng.com/blog/2016/06/css_modules.html"},"CSS Modules Usage Tutorial"]]],["li",["p",["a",{title:null,href:"https://github.com/camsong/blog/issues/5"},"CSS Modules Detailed and Practice in React"]]]],["h2","Style file category"],["p","In a project, style files can be divided into different categories depending on their function."],["h3","src/index.less"],["p","Global style file, where you can make some common settings, such as scaffold comes with:"],["pre",{lang:"css",highlighted:'<span class="token selector">html, body, <span class="token pseudo-class">:global</span> (<span class="token id">#root</span>) </span><span class="token punctuation">{</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">100%</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">body </span><span class="token punctuation">{</span>\n  <span class="token property">text-rendering</span><span class="token punctuation">:</span> optimizeLegibility<span class="token punctuation">;</span>\n  <span class="token property">-webkit-font-smoothing</span><span class="token punctuation">:</span> antialiased<span class="token punctuation">;</span>\n  <span class="token property">-moz-osx-font-smoothing</span><span class="token punctuation">:</span> grayscale<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">// temporary font size patch\n: global (<span class="token class">.ant-tag</span>) </span><span class="token punctuation">{</span>\n  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token number">12</span>px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>'},["code","html, body, :global (#root) {\n\xa0\xa0height: 100%;\n}\n\nbody {\n\xa0\xa0text-rendering: optimizeLegibility;\n\xa0\xa0-webkit-font-smoothing: antialiased;\n\xa0\xa0-moz-osx-font-smoothing: grayscale;\n}\n\n// temporary font size patch\n: global (.ant-tag) {\n\xa0\xa0font-size: 12px;\n}"]],["blockquote",["p","Because antd will bring some global settings, such as font size, color, line height. So there is no need to do a lot of reset, you can focus on your individualized demands."]],["h3","src/utils/utils.less"],["p","Here you can place some tool functions, such as clearing the floating ",["code",".clearfix"],"."],["h3","Module style"],["p","Files that use for a module or page."],["h4","Universal module level"],["p","For example, ",["code","src/layouts/BasicLayout.less"],", which contains some basic layout styles, is referenced by ",["code","src/layouts/BasicLayout.js"],", and the pages that use this layout do not need to care about the overall layout settings anymore. If you need to use other layouts in your project, it is also recommended to put layout-related js and less in ",["code","src/layouts"],"."],["h4","Page level"],["p","Specific page-related style, such as ",["code","src/routes/Dashborad/Monitor.less"],", the content is only related to the content of this page. Under normal circumstances, if it is not particularly complex page, with the previous global style and common module style, there should be little to write."],["h4","Component level"],["p","This is also very simple, they are component-related styles. In your project, there are some reuseable fragments in the page or relatively independent function which can be define as components, the relevant style should be extracted on the component, rather than confusing in the page."],["blockquote",["p","The above style categories are for independent style files. Sometimes the style configuration is especially simple and is not repeated. You can also use the inline style ",["code","style = {{...}}"],"."]],["h2","Override the component style"],["p","Because of the special needs of the project, we often meet the need to cover the component style, here is a simple example."],["p","Antd Select In multi-select state, the default will show all the select items, here we add a limit height for display scroll bar when the content beyond this height."],["pre",{lang:"js",highlighted:'<span class="token comment" spellcheck="true">// TestPage.js</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>Select<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'antd\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">\'./TestPage.less\'</span>\n<span class="token keyword">const</span> Option <span class="token operator">=</span> Select<span class="token punctuation">.</span>Option<span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> children <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">36</span><span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>Option key <span class="token operator">=</span> <span class="token punctuation">{</span>i<span class="token punctuation">.</span>toString <span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span> <span class="token operator">+</span> i<span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">{</span>i<span class="token punctuation">.</span>toString <span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span> <span class="token operator">+</span> i<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>Option<span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\nReactDOM<span class="token punctuation">.</span>render <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>Select\n    mode<span class="token operator">=</span><span class="token string">"multiple"</span>\n    style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>width<span class="token punctuation">:</span> <span class="token number">300</span><span class="token punctuation">}</span><span class="token punctuation">}</span>\n    placeholder<span class="token operator">=</span><span class="token string">"Please select"</span>\n    className<span class="token operator">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>customSelect<span class="token punctuation">}</span>\n  <span class="token operator">></span>\n    <span class="token punctuation">{</span>children<span class="token punctuation">}</span>\n  <span class="token operator">&lt;</span><span class="token operator">/</span>Select<span class="token operator">></span>\n<span class="token punctuation">,</span> mountNode<span class="token punctuation">)</span><span class="token punctuation">;</span>'},["code","// TestPage.js\nimport {Select} from 'antd';\nimport styles from './TestPage.less'\nconst Option = Select.Option;\n\nconst children = [];\nfor (let i = 10; i < 36; i ++) {\n\xa0\xa0children.push(<Option key = {i.toString (36) + i}>{i.toString (36) + i}</Option>);\n}\n\nReactDOM.render (\n\xa0\xa0<Select\n\xa0\xa0\xa0\xa0mode=\"multiple\"\n\xa0\xa0\xa0\xa0style={{width: 300}}\n\xa0\xa0\xa0\xa0placeholder=\"Please select\"\n\xa0\xa0\xa0\xa0className={styles.customSelect}\n\xa0\xa0>\n\xa0\xa0\xa0\xa0{children}\n\xa0\xa0</Select>\n, mountNode);"]],["pre",{lang:"css",highlighted:'<span class="token selector">// TestPage<span class="token class">.less</span>\n<span class="token class">.customSelect</span> </span><span class="token punctuation">{</span>\n  <span class="token selector"><span class="token pseudo-class">:global</span> </span><span class="token punctuation">{</span>\n    <span class="token selector"><span class="token class">.ant-select-selection</span> </span><span class="token punctuation">{</span>\n      <span class="token property">max-height</span><span class="token punctuation">:</span> <span class="token number">51</span>px<span class="token punctuation">;</span>\n      <span class="token property">overflow</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>'},["code","// TestPage.less\n.customSelect {\n\xa0\xa0:global {\n\xa0\xa0\xa0\xa0.ant-select-selection {\n\xa0\xa0\xa0\xa0\xa0\xa0max-height: 51px;\n\xa0\xa0\xa0\xa0\xa0\xa0overflow: auto;\n\xa0\xa0\xa0\xa0}\n\xa0\xa0}\n}"]],["p","Two points need to be noted:"],["ul",["li",["p","The imported antd component class name is not translated by CSS Modules, so the overridden class name ",["code",".ant-select-selection"]," must be put in ",["code",":global"],"."]],["li",["p","Because of the previous note, the coverage is global. To avoid affecting other Select components, the setting needs to be wrapped by an extra classname to add range restriction."]]]],meta:{order:6,title:"Style",type:"Introduction",filename:"docs/style.en-US.md"},description:["section",["p","This document is mainly about how to use and organize style files in projects. If you want to get a basic knowledge of CSS or look for properties usage, you can refer to the ",["a",{title:null,href:"https://developer.mozilla.org/en-US/docs/Web/CSS/Reference"},"MDN doc"],"."]],toc:["ul",["li",["a",{className:"bisheng-toc-h2",href:"#less",title:"less"},"less"]],["li",["a",{className:"bisheng-toc-h2",href:"#CSS-Modules",title:"CSS Modules"},"CSS Modules"]],["li",["a",{className:"bisheng-toc-h2",href:"#Style-file-category",title:"Style file category"},"Style file category"]],["li",["a",{className:"bisheng-toc-h2",href:"#Override-the-component-style",title:"Override the component style"},"Override the component style"]]]}}});