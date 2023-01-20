const db = require('../model')
const Employee = db.employees
const axios = require("axios");
const redis = require("redis");

const redisPort = "redis://127.0.0.1:6379"
// const redisPort = "redis://default:ovDFb4qIVC7PoaIdIDlsaE4ymM97Aaf3@redis-12561.c264.ap-south-1-1.ec2.cloud.redislabs.com:12561"
const client = redis.createClient(redisPort);

client.on("error", (err) => {
    console.log(err);
})

const addEmp = async (req, res) => {
    let info = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        organization: req.body.organization,
        designation: req.body.designation,
        salary: req.body.salary,
        status: req.body.status,
        is_deleted: req.body.is_deleted
    }
    const employee = await Employee.create(info)
    res.status(200).send(employee)
}
//***************************************************************************************************************************** */

const getAll = async (req, res) => {
    // const id = req.query.id
    try {
        client.get('api',async (err, employees) => {
            if (err) throw err;
            if (employees) {
                console.log("catched from redis");
                res.status(200).send(JSON.parse(employees));
            }
            else {
                let employees = await Employee.findAll({})
                client.setex('api',600, JSON.stringify(employees));
                res.status(200).send(employees);
                console.log("fetched from mysql")
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}





const getAall = async (req, res) => {
    let employees = await Employee.findAll({})
    res.status(200).send(employees)
}


//********************************************************************************************************************************** */


const getOne = async (req, res) => {
    const id = req.query.id
    try {
        client.get(id, async (err, employee) => {
            if (err) throw err;
            if (employee) {
                console.log("catched from redis");
                res.status(200).send(JSON.parse(employee));
            }
            else {
                let employee = await Employee.findOne({ where: { id: id } })
                client.setex(id, 600, JSON.stringify(employee));
                res.status(200).send(employee);
                console.log("fetched from mysql")
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}



//**************************************************************************************************************************
const getOnne = async (req, res) => {
    let id = req.params.id
    let employee = await Employee.findOne({ where: { id: id } })
    res.status(200).send(employee)
}

const updateEmp = async (req, res) => {
    let id = req.params.id
    let employee = await Employee.update(req.body, { where: { id: id } })
    res.status(200).send(employee)
}
module.exports = {
    addEmp,
    getAll,
    getOne,
    updateEmp
}