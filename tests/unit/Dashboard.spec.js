import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Dashboard from "../../src/components/Dashboard.vue";

describe("Dashboard", () => {
    it("renders correctly", () => {
        const wrapper = mount(Dashboard);
        expect(wrapper.text()).toContain("Seja bem-vindo ao seu dashboard");
    });
});
