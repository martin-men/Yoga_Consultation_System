import { Morfema } from "../../types";

export const getMorphemes = async (asanaId: string): Promise<Morfema[]> => {
  const url = `https://asanar-learnig.vercel.app/morfemas/${asanaId}`;
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
