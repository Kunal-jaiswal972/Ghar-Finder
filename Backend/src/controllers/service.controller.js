import { axiosInstance } from "../lib/axios.js";

export const getRoute = async (req, res) => {
  const { src, dest } = req.body;

  const [srcLat, srcLng] = src;
  const [destLat, destLng] = dest;

  try {
    // const endpoint = `${locationIqUrl}/directions/driving/${srcLng},${srcLat};${destLng},${destLat}?key=${key}&steps=true&alternatives=true&geometries=polyline&overview=full`;
    // const { data } = await axiosInstance.get(endpoint);

    const url = `https://trueway-directions2.p.rapidapi.com/FindDrivingPath?origin=${srcLat},${srcLng}&destination=${destLat},${destLng}&start_time="now"`;
    const { data } = await axiosInstance.get(url, {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
      },
    });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get route!" });
  }
};

export const getAutocomplete = async (req, res) => {
  const { query } = req.body;
  try {
    const endpoint = `https://us1.locationiq.com/v1/autocomplete?key=${process.env.LOCATION_IQ_TOKEN}&q=${query}&limit=5&dedupe=1`;
    console.log(endpoint);

    const { data } = await axiosInstance.get(endpoint);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get search results!" });
  }
};

export const getIp = async (req, res) => {
  try {
    const endpoint = `https://api.maptiler.com/geolocation/ip.json?key=${process.env.MAPTILER_KEY}`;
    const { data } = await axiosInstance.get(endpoint);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get nearby places!" });
  }
};

export const getNearby = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get nearby places!" });
  }
};
