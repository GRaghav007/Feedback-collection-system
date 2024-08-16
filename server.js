const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const Feedback= require('./models/Feedback');

const app=express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/coderone_feedback', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>console.log('MonngoDb Connected'))
.catch(err=>console.error('MongoDb connection error', err));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('views'));
app.get('/',(req, res)=>{
  res.sendFile(__dirname+'/views/index.html');
});
app.post('/submit-feedback', async (req, res)=> {
  const {name, contactNumber, email, feedback: feedbackText} = req.body;
  const feedback = new Feedback({
    name,
    contactNumber,
    email,
    feedback: feedbackText
  });
  // console.log(feedback);
  try {
    await feedback.save();
    console.log('Feedback saved successfully');
    res.sendFile(__dirname+'/views/thank.html');
    } catch(err){
    console.error('Error Saving feedback:',err);
    res.status(500).send('There was an error in submitting your feedback.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})