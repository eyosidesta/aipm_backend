const express = require('express');

const db = require('./config/database');

db.authenticate().then(() => {
    console.log("db connected...");
}).catch(err => {
    console.log("Error: ", err);
})

const app = express();

const newsRoute = require('./routes/news');
const testimoniesRoute = require('./routes/testimonies');
const prayerMovementRoute = require('./routes/prayer.movement');
const staffMembersRoute = require('./routes/staff.members');

app.get("/", (req, res) => {
    res.send("hi there")
});

app.use("/news", newsRoute);
app.use("/testimonies", testimoniesRoute);
app.use("/prayer", prayerMovementRoute);
app.use("/staff", staffMembersRoute);
app.listen(3000);