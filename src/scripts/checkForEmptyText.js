import { hasClass } from "./hassClass";

export const checkForEmptyText = ({ input, data }) => {
  const parent = input.closest("[data-text]");

  if (!input.value) {
    parent.classList.add("error");
    return;
  }

  hasClass(parent, "error") && parent.classList.remove("error");

  delete data[input.name];
};
