import { createApp } from "vue";
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// highlightjs
import hljs from 'highlight.js';
import router from "./router"
import App from "./App.vue";

VMdEditor.use(githubTheme,{
    Hljs: hljs,
});
VMdPreview.use(githubTheme, {
    Hljs: hljs,
});

const app = createApp(App);

// 使用vue-router插件
app.use(router)
app.use(VMdEditor, {});
app.use(VMdPreview, {});
app.mount("#app");