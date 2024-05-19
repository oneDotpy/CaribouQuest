export const fetchChatGPTData = async () => {
  const jsonData = [
    {
      "Loc": "Victoria Park",
      "Latitude": "43.451262",
      "Longitude": "-80.503207",
      "Distance": "2.6 km"
    },
    {
      "Loc": "Grand River Rocks",
      "Latitude": "43.466327",
      "Longitude": "-80.526522",
      "Distance": "1.2 km"
    },
    {
      "Loc": "Bingemans",
      "Latitude": "43.452727",
      "Longitude": "-80.429849",
      "Distance": "9.5 km"
    },
    {
      "Loc": "Laurel Creek Conservation Area",
      "Latitude": "43.461805",
      "Longitude": "-80.526202",
      "Distance": "6.3 km"
    },
    {
      "Loc": "THEMUSEUM",
      "Latitude": "43.448620",
      "Longitude": "-80.487469",
      "Distance": "3.8 km"
    }
  ];

  return jsonData.map(location => ({
    ...location,
    Latitude: parseFloat(location.Latitude),
    Longitude: parseFloat(location.Longitude)
  }));
};
