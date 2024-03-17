import English from '../models/englishModel.js';

const addWord = async (req, res) => {
    const word = new English({
      ingilizcesi: req.body.ingilizcesi,
      turkcesi: req.body.turkcesi,
      cumle: req.body.cumle
    });
  
    try {
      await word.save();
      res.status(201).json(word);
    } catch (error) {
      res.status(500).json({
        succeeded: false,
        error,
      });
    }
  };

  const getWords = async (req, res) => {
  try {
    const words = await English.find();
    res.status(200).json(words);
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      error,
    });
  }
};

export { addWord, getWords };