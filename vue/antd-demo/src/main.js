import Vue from "vue";
import App from "./App.vue";
import Button from "ant-design-vue/lib/button";
import "ant-design-vue/dist/antd.css";
import router from "./router/index.js";
import "./login";
Vue.config.productionTip = false;
Vue.component(Button.name, Button);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
