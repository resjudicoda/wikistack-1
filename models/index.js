const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'closed',
  },
});

Page.beforeValidate( async (UserInstance) => {
  if (UserInstance.title) {
    UserInstance.slug = UserInstance.title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    const pages = await Page.findAll({ //set pages to array of sorted database entries
      order: [
        ['id', 'DESC'],
    ],
    })
      if (pages[0]) { //check if pages array has value (i.e., whether there has been a post)
        UserInstance.title = `postNumber${pages[0].id + 1}`
        UserInstance.slug = UserInstance.title
      } else { // since last test failed, then no post, so need to set title of first post
        UserInstance.title = `postNumber1`
        UserInstance.slug = UserInstance.title
      }
    
  };
    
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

Page.belongsTo(User, {
  as: 'author'
});

module.exports = { db, Page, User };
