/** @format */

export const addToBag = async () => {
  const btn = document.querySelector("[data-add-to-bag]");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const inputs = [...document.querySelectorAll("[data-input]")].filter((input) => input.checked);
    const texts = document.querySelectorAll("[data-input-text]");

    const data = {
      total: Number(document.querySelector("[data-total]").textContent),
    };

    inputs.forEach((input) => {
      const el = input.closest("[data-el]");
      const name = el.dataset.el;

      if (name === "Браслет") {
        const title = input.closest(".item").querySelector(".item__title").textContent;

        data[title] = input.value;
      } else {
        data[name] = input.value;
      }
    });

    texts.forEach((text) => {
      if (text.value) {
        const title = text.closest(".text").querySelector(".text__title").textContent;

        data[title] = text.value;
      }
    });

    const encryptedData = await encryptData(JSON.stringify(data));
    const newUrl = `https://astrostori.ru/individual-editor?data=${encodeURIComponent(encryptedData)}`;
    window.location.href = newUrl;
  });
};

const encryptData = async (data) => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode("f9b7c8a3e2d4e6h1"), // Секретный ключ
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(data));
  return `${btoa(String.fromCharCode(...new Uint8Array(iv)))}.${btoa(String.fromCharCode(...new Uint8Array(encrypted)))}`;
};
