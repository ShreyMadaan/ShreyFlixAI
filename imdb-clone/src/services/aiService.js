async function getRecommendation(watchlist) {
  const response = await fetch("/api/recommendations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titles: watchlist.slice(0, 50).map((movie) => movie.title),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get recommendations");
  }

  const data = await response.json();
  return data.recommendation;
}


export default {getRecommendation}
