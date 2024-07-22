import { createStore } from "vuex";
import user_module from "../store/user_module";
import kanban_module from "./kanban_module";

export default createStore({
    modules: {
        user: user_module,
        kanban: kanban_module,
    },
});
