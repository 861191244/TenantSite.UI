import Vue from "vue";
import VueI18n from "vue-i18n";
import Cookies from "js-cookie";
import elementEnLocale from "element-ui/lib/locale/lang/en"; // element-ui lang
import elementZhLocale from "element-ui/lib/locale/lang/zh-CN"; // element-ui lang
import enLocale from "./en";
import zhLocale from "./zh";

// 导入布局语言包
import layoutLocale from "@/layouts/basic-layout/i18n";

Vue.use(VueI18n);

const messages = {
  zh: {
    ...zhLocale,
    ...elementZhLocale,
    ...layoutLocale["zh-CN"]
  },
  en: {
    ...enLocale,
    ...elementEnLocale,
    ...layoutLocale["en-US"]
  }
};

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: Cookies.get("language") || "zh",
  // set locale messages
  messages
});

// 覆盖Element-UI中文
i18n.mergeLocaleMessage("zh", {
  el: {
    pagination: {
      goto: "",
      pageClassifier: ""
    }
  }
});

export default i18n;
