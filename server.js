const app = require('./app');
const { sequelize } = require('./models');
const setupSwagger = require('./swagger'); 

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ alter: true });

   
    setupSwagger(app);

    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
      console.log(` Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error(' Unable to start server or connect to DB', err);
  }
};

startServer();
