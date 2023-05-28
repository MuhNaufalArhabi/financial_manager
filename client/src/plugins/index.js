/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import "../assets/styles.css";
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";
import vue3GoogleLogin from 'vue3-google-login'

export function registerPlugins(app) {
  loadFonts();
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(vue3GoogleLogin, {
      clientId:
        import.meta.env.VITE_CLIENT_ID,
    });
}
