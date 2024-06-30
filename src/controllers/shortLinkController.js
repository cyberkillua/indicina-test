const urlDatabase = {};
let counter = 98322;
const PORT = process.env.PORT || 4545;
const BASE_URL = process.env.BASE_URL;

export const getOriginalURL = (shortCode) => {
  return urlDatabase[shortCode] || null;
};

export const encode = async (req, res) => {
  try {
    const { originalURL } = req.body;
    const shortCode = (counter++).toString(36);
    urlDatabase[shortCode] = originalURL;
    const shortURL = `${BASE_URL}${PORT}/${shortCode}`;
    res.status(200).json({ message: "Link shorten", shortURL });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request could not be completed",
      error: error.message,
    });
  }
};

export const decode = async (req, res) => {
  try {
    const { encodedURL } = req.body;
    const shortCode = encodedURL.split("/").pop();
    const originalURL = getOriginalURL(shortCode);
    if (originalURL === null) {
      res.status(422).json({ error: "Original URL does not exist" });
      return;
    }
    res.status(200).json({ message: "Link decoded", originalURL });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request could not be completed",
      error: error.message,
    });
  }
};

export const getStats = async (req, res) => {
  try {
    const { url_path } = req.query;
    const originalURL = getOriginalURL(url_path);
    if (originalURL === null) {
      res.status(422).json({ error: "Original URL does not exist" });
      return;
    }
    const stats = {
      originalURL,
      url_path,
      encodedURL: `${BASE_URL}${PORT}/${url_path}`,
    };
    res.status(200).json({ message: "fetch successful", stats });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request could not be completed",
      error: error.message,
    });
  }
};
