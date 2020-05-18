import express from "express";

const app = express();

import dogRoute from './dog/dogRoute'

app.use('/dogs', dogRoute)

// app.use ('/user', userRoute)

export default app;