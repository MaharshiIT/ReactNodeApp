const 

express = require('express'),
keys = require('./config/keys'),
mongoose = require('mongoose');

require('./models/Users');

require('./services/passport');

try{
mongoose.connect(keys.mongoURI);
}catch(e){console.log(e.toString())}

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT);

require('./middlewares/index')(app);
require('./routes/auth')(app);
require('./routes/user')(app);