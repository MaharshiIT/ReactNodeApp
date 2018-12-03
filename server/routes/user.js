
const 

fs=require("fs"),
multer  = require('multer'),
mongoose = require('mongoose'),
{enCrypt} = require('../helpers'),
User = mongoose.model("users");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../photos`)
    },
    filename: (req, file, cb) => {
      const

      {originalname} = file,
      file_name = Date.now() + '.' + originalname.split('.').pop();
      req.file_name = file_name;
      cb(null, file_name)
    }
  })
  
const upload = multer({ storage: storage });

module.exports = app => {
    app.post('/', function(req, res, next) {
        res.send('respond with a resource');
        });

    app.post('/register',upload.single("file"),async (req, res) => {
        const form_data = {...JSON.parse(req.body.form_data)};
        form_data["photo"] = req.file_name || "";
        form_data["password"] = enCrypt(form_data["password"]);
        try
            {
            const with_email = await User.find({email:form_data["email"]});
            if (with_email.length)
                {
                res.json({data:"The user already exists",success:false});
                return;
                }
            await new User(form_data).save();
            res.send({data:"Success",success:true});
            }
        catch(e)
            {
            res.json({data:e.toString(),success:false})
            }
        });
    }
