import { addSelect } from "./addSelect";
import { blocksChecking } from "./blocksChecking";
import { addToBag } from "./addToBag";
import { checkForActivity } from "./checkForActivity";
import { checkForEmptyText } from "./checkForEmptyText";
import { showTexts } from "./showTexts";
import { totalSum } from "./totalSum";
import { emojiSelection } from "./emojiSelection";
import { slider, handleChange } from "./slider";

const { productsWrapper, priceValue } = blocksChecking(".t762");

const totalPrice = document.querySelector("[data-total]");
const inputs = document.querySelectorAll("[data-input]");
const inputsText = document.querySelectorAll("[data-input-text]");
const data = {};
const dataPrice = {};
const dataPhoto = [];

let emojiSybolsInside = "";
let emojiSybolsOutside = "";

// const handleChange = (input) => {
//   data[input.name] = input.value;

//   totalSum({
//     input: input,
//     dataPrice: dataPrice,
//     totalPrice: totalPrice,
//     priceValue: priceValue,
//   });
//   showTexts({
//     input: input,
//     inputsText: inputsText,
//     data: data,
//     dataPrice: dataPrice,
//     remove: true,
//   });
//   addSelect({ productsWrapper: productsWrapper, data: data });
// };

export const main = () => {
  if (!totalPrice || !inputs.length) return;

  inputs.forEach((input) => {
    checkForActivity({
      input: input,
      productsWrapper: productsWrapper,
      data: data,
    });
    totalSum({
      input: input,
      dataPrice: dataPrice,
      totalPrice: totalPrice,
      priceValue: priceValue,
    });
    showTexts({
      input: input,
      inputsText: inputsText,
      data: data,
      dataPrice: dataPrice,
    });

    dataPhoto.push(input.dataset.photo);

    input.addEventListener("change", () =>
      handleChange(input, {
        data: data,
        dataPrice: dataPrice,
        totalPrice: totalPrice,
        priceValue: priceValue,
        inputsText: inputsText,
        productsWrapper: productsWrapper,
        dataPhoto: dataPhoto,
      }),
    );
  });

  inputsText.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.name === "text-inside") emojiSybolsInside = input.value;
      if (input.name === "text-outside") emojiSybolsOutside = input.value;

      checkForEmptyText({ input: input, data: data });
      data[input.name] = input.value;
      addSelect({ productsWrapper: productsWrapper, data: data });
    });
  });

  emojiSelection({ productsWrapper: productsWrapper, data: data });
  slider(inputs);
  addToBag({ texts: inputsText });
};
