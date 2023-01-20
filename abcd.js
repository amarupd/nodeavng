const express = require("express");
const axios = require("axios");
const redis = require("redis");
const app = express();

const redisPort = "redis://127.0.0.1:6379"
const client = redis.createClient(redisPort);

client.on("error", (err) => {
    console.log(err);
})

app.get("/jobs", (req, res) => {
    const cityVal = req.query.search;
    try {
        client.get(cityVal, async (err, jobs) => {
            if (err) throw err;
    
            if (jobs) {
                res.status(200).send({
                    jobs: JSON.parse(jobs),
                    message: "data retrieved from the cache"
                });
            }
            else {
                const jobs = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityVal},IN&appid=1378804aeafe0b631a88802bfd8d17d6`);
                client.setex(cityVal, 600, JSON.stringify(jobs.data));
                res.status(200).send({
                    jobs: jobs.data,
                    message: "cache miss"
                });
            }
        });
    } catch(err) {
        res.status(500).send({message: err.message});
    }
});
app.listen(process.env.PORT || 3000, () => {
    console.log("Node server started");
});