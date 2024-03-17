import User from '../models/userModel.js';

const getIndexPage = async (req, res) => {
  const numOfUser = await User.countDocuments({});

  res.render('index', {
    link: 'index',
    numOfUser,
  });
};

const getAboutPage = (req, res) => {
  res.render('about', {
    link: 'about',
  });
};

const getRegisterPage = (req, res) => {
  res.render('register', {
    link: 'register',
  });
};

const getLoginPage = (req, res) => {
  res.render('login', {
    link: 'login',
  });
};

const getContactPage = (req, res) => {
  res.render('contact', {
    link: 'contact',
  });
};

export {
  getIndexPage,
  getAboutPage,
  getRegisterPage,
  getLoginPage,
  getContactPage,
};