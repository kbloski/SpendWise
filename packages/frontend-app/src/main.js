import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
const BaseCard = defineAsyncComponent(() =>
  import("./components/UI/BaseCard.vue")
);
const BaseLink = defineAsyncComponent(() =>
  import("./components/UI/BaseLink.vue")
);
const BaseButton = defineAsyncComponent(() =>
  import("./components/UI/BaseButton.vue")
);
const BaseTitle = defineAsyncComponent(() =>
  import("./components/UI/BaseTitle.vue")
);
const SideTitle = defineAsyncComponent(() =>
  import("./components/layout/SideTitle.vue")
);
const BaseInfo = defineAsyncComponent(() =>
  import("./components/UI/BaseInfo.vue")
);
const BaseError = defineAsyncComponent(() =>
  import("./components/UI/BaseError.vue")
);
const BaseFormControl = defineAsyncComponent(() =>
  import("./components/UI/BaseFormControl.vue")
);

const app = createApp(App);

app.component("base-card", BaseCard);
app.component("base-link", BaseLink);
app.component("base-button", BaseButton);
app.component("base-title", BaseTitle);
app.component("side-title", SideTitle);
app.component("base-info", BaseInfo);
app.component("base-error", BaseError);
app.component("base-form-control", BaseFormControl);

app.use(store);
app.use(router);
app.mount("#app");
