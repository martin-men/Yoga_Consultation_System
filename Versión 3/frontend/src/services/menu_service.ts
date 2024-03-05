import { Asana, MorfemaWithId } from "../../types";

export const getAsanas = async (): Promise<Asana[]> => {
  const url = "https://asanar-learnig.vercel.app/Posturas";
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};

export const getMorphemes = async (): Promise<MorfemaWithId[]> => {
  const url = "https://asanar-learnig.vercel.app/morfemas";
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};
