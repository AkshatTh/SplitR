const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./backend/config/db.js');
const { errorHandler } =    require('./backend/middleware/errorMiddleware');
const PORT = process.env.PORT
connectDB();
const app = express();


app.use(cors({
    origin: ["http://localhost:5173", "https://splitr-tracker.vercel.app"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/users', require('./backend/routes/userRoutes'));
app.use('/api/groups', require('./backend/routes/groupRoutes.js'));
app.use('/api/expenses', require('./backend/routes/expenseRoutes.js'));
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});