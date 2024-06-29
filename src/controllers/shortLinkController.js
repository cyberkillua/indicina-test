export const encode = async (req, res) => {
  try {
    const { url } = req.body;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request could not be completed",
      error: error.message,
    });
  }
};
