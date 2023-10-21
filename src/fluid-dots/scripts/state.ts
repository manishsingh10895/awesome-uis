import { Machine } from "xstate";

type ToggleEvents = {
  type: "TOGGLE";
};

//state machine
export const toggleMachine = Machine<ToggleEvents>({
  id: "toggleButton",
  initial: "idle",
  states: {
    idle: {
      on: { TOGGLE: "active" },
    },
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      on: { TOGGLE: "inactive" },
    },
  },
});
