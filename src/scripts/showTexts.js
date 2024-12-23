import { hasClass } from "./hassClass";

export const showTexts = ({
  input,
  inputsText,
  data,
  dataPrice,
  emojiSybolsInside,
  emojiSybolsOutside,
  remove,
}) => {
  if (!inputsText.length || input.name !== "type-location" || !input.checked)
    return;

  inputsText.forEach((el) => {
    const parent = el.closest("[data-text]");
    const emoji = parent.querySelector("[data-emoji]");
    if (emoji) emoji.classList.remove("show");

    emojiSybolsInside = "";
    emojiSybolsOutside = "";
    el.value = "";
    delete data[el.name];
    delete dataPrice[el.name];

    remove && parent.classList.remove("show");

    if (input.id === el.dataset.inputText || input.id === "text-all") {
      parent.classList.add("show");
      hasClass(parent, "error") && parent.classList.remove("error");
    }
  });
};
