import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Login from "../../src/components/Login.vue";

describe("Login", () => {
    it("renders correctly", () => {
        const wrapper = mount(Login);
        expect(wrapper.text()).toContain(
            "Entre com seu nome de usuário e senha",
        );
    });
});
