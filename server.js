const app=require('./app.js')
const connectDB = require('./config/database.js');


// Config


// Connect to database
connectDB();
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "./.env" });
  }
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

app.set('view engine', 'pug');

// Set the views directory
app.set('views', './views');

app.get('/',(req,res)=>{


    res.send("server is running")
}
)