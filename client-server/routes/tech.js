var express = require('express');
var router = express.Router();



router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

expirationCounter = ""

function startTimer(secsToStart ){
  let start  = secsToStart;
  let hours;
  let temp;
  let minutes;
  let seconds;
  let timer  = setInterval(() =>{
    hours = Math.floor(start / 60 / 60)
      // remove the hours
      temp = start - hours * 60 * 60;
      minutes = Math.floor(temp / 60);
      // remove the minuets
      temp = temp - minutes * 60;
      // what left is the seconds
      seconds = temp;

      // add leading zeros for aesthetics
      var hour = hours < 10 ? "0" + hours : hours;
      var minute = minutes < 10 ? "0" + minutes : minutes;
      var second = seconds < 10 ? "0" + seconds : seconds;

      expirationCounter = hour + ":" + minute + ":" + second;

      if (start <= 0) {
          // Time elapsed
          clearInterval(timer);
          expirationCounter = "Expired";
          // Make here changes in gui when time elapsed
          //....
      }
      start--;
  }, 1000)
}

startTimer(18000)

/* GET users listing. */

  router.get('/', function(req, res, next) {
    let jsonResponse = {
  
    
       "countdown" : expirationCounter
    }
      
    
    res.json(jsonResponse)
  });





router.put("/", (req, res) => {
  const newCols = req.body.cols ;
  newCols = newCols - 1;
  res.send(newCols)
})

module.exports = router;
