const db = require('../model')
const Avenger = db.avenger1s;
const redis = require("redis");
const redisPort = "redis://127.0.0.1:6379"
// const redisPort = "redis://default:ovDFb4qIVC7PoaIdIDlsaE4ymM97Aaf3@redis-12561.c264.ap-south-1-1.ec2.cloud.redislabs.com:12561"
const client = redis.createClient(redisPort);

client.on("error", (err) => {
    console.log(err);
})
//***************************************************************************************************************************** */

// const getAll = async (req, res) => {
//     // const id = req.query.id
//     try {
//         client.get('api',async (err, avengers) => {
//             if (err) throw err;
//             if (avengers) {
//                 console.log("catched from redis");
//                 res.status(200).send(JSON.parse(avengers));
//             }
//             else {
//                 let avengers = await Avenger.findAll({})
//                 client.setex('api',600, JSON.stringify(avengers));
//                 res.status(200).send(avengers);
//                 console.log("fetched from mysql")
//             }
//         })
//     } catch (err) {
//         res.status(500).send({ message: err.message });
//     }

// }

//********************************************************************************************************************************** */


const getOne = async (req, res) => {
    const name = req.query.name
    try {
        client.get(name, async (err, avenger) => {
            if (err) throw err;
            if (avenger) {
                console.log("catched from redis");
                res.status(200).send(JSON.parse(avenger));
            }
            else {
                let avenger = await Avenger.findOne({ where: { name: name } })
                client.setex(name, 600, JSON.stringify(avenger));
                res.status(200).send(avenger);
                console.log("fetched from mysql")
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}
const getAll = async (req, res) => {
let avenger = await Avenger.findAll({})
// client.setex(name, 600, JSON.stringify(avenger));
res.status(200).send(avenger);
console.log("fetched from mysql")
}

//**************************************************************************************************************************


module.exports = {
    getAll,
    getOne
}