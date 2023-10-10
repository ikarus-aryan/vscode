const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('build'));
app.use(cors({credentials:true,origin:3000}));
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));

const db = mysql.createConnection({
    // host: 'host.docker.internal',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Aryan@123',
    database: 'solar'
});

db.connect((err)=>{
    if(err){
        console.log("Database connection failed.."+err);
    }
    else{
        console.log("Database connected successfully.......");
    }
});

app.post("/register", uploadMiddleware.single('profile_pic'), (req, res) => {
    const k = "SELECT COUNT(*) AS count FROM users WHERE phone = ?";
    db.query(k, [req.body.phone], async (err, result) => {
        if (err) {
            return res.send(err);
        }
        if (result[0].count > 0) {
            return res.status(409).send("User already registered");
        }
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        if(ext!=='webp' && ext!=='png'){
            return res.status(400).send("Invalid File type only excepts png and webp");
        }
        const newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
        console.log(newPath);
        const q = "INSERT INTO users(`name`,`date_of_birth`,`gender`,`phone`,`planet_name`,`reg_date`,`profile_pic`) VALUES(?)";
        const values = [
            req.body.name,
            req.body.date_of_birth,
            req.body.gender,
            req.body.phone,
            req.body.planet_name,
            req.body.reg_date,
            newPath,
        ];
        db.query(q, [values], (err, data) => {
            if (err) {
                return res.send(err);
            }
            console.log("Image uploaded to: " + req.file.path);
            return res.json(data);
        });
    });
    
});

app.get('/getData',(req,res)=>{
    const filePath = './planetData.json';
    fs.readFile(filePath, 'utf8', (err,data)=>{
        if(err) return console.log(err);
        return res.json(data);
    });
});

app.post('/update',(req,res)=>{
    // const filePath = './planetData.json';
    const filePath = '../solar-system/src/planetData.json';
    const updatedPlanetData = req.body;
    if (updatedPlanetData) {
        const dataToWrite = JSON.stringify(updatedPlanetData);
        fs.writeFile(filePath, dataToWrite, (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error writing to file.');
          } else {
            console.log('Data written to file successfully.');
            res.send('Data written to file successfully.');
          }
        });
    } else {
        res.status(400).send('Invalid or missing data.');
    }
})
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '/build/index.html'));
});
app.listen(4000, ()=>{
    console.log("server is runnong on port 4000");
});