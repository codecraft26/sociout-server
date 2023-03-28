const app=require('./app.js')


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "./.env" });
  }
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
