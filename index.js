import express from 'express'
import connectionDB from './db/connectionDB.js';
import {AppError} from "./utils/classError.js"
import { globalErrorHandling } from './utils/globalErrorHandler.js';
import usersRouter from "./src/modules/users/user.routes.js";
import messagesRouter from "./src/modules/messages/message.routes.js"
const app = express()
const port = 3000

connectionDB()
app.use(express.json());
app.use("/users",usersRouter)
app.use("/messages", messagesRouter);

app.get('/', (req, res) => res.send('Hello World!'))
app.use("*", (req, res, next) => {
  return next(new AppError(`invalid url ${req.originalUrl}`, 404));
});

//global error handling middleware
app.use(globalErrorHandling);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))