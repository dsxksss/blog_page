import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// highlightjs
import hljs from 'highlight.js';
import App from "./App.vue";


VMdEditor.use(githubTheme,{
    Hljs: hljs,
});
const app = createApp(App);
app.use(Toast, {});
app.use(VMdEditor, {});
app.mount("#app");