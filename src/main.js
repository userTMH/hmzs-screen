import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";
import "./style/index.css";

renderWithQiankun({
  mount(props) {
    console.log("mount");
    render(props);
  },
  bootstrap() {
    console.log("bootstrap");
  },
  unmount(props) {
    console.log("unmount", props);
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}

function render(props = {}) {
  const { container } = props;
  const app = createApp(App);

  app.use(router);

  app.mount(container ? container.querySelector("#app") : "#app");
}
