import configData from './assets/config.json';
import i18next from "./i18n";
import i18nextMiddleware from "i18next-http-middleware";
import express from 'express';
import userRoutes from './user';

const PORT = configData.PORT;

const app = express();
app.use(express.json());

// Add middleware
app.use(i18nextMiddleware.handle(i18next));

app.use('/api/users', userRoutes);

app.listen(PORT, () => 
  {
  console.log(`Server running on port ${PORT}`);
});
