async function fetchApiData(apiUrl) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3f344259d1msh879fdadb7014320p173bc5jsn5d10265cac2f',
      'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}
