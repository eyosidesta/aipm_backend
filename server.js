const express = require('express');
const app = express();

const newsRouter = require('./routes/news');
const testimoniesRouter = require('./routes/testimonies');
const staffsRouter = require('./routes/staff.members');
const prayerMovementRouter = require('./routes/prayer.movement');
const universitySutdentsMovementRouter = require('./routes/university.students.movement');

app.get("/", (req, res) => {
    res.send("good to go");
});

app.use('/news', newsRouter);
app.use('/testimonies', testimoniesRouter);
app.use('/staffs', staffsRouter);
app.use('/prayers', prayerMovementRouter);
app.use('/students', universitySutdentsMovementRouter);


app.listen(3000)