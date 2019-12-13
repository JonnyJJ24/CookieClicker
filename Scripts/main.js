	var CPC = 1;
    var CPS = 0;
	var ACMOD = .1;
	var GMMOD = 1;
	var CFMOD = 10;
	var Cookies = 0;
	var totalCookies = 0;
    var CookieString = "0";
    var localStored;
	var costs = [15,100,1100];
    var amount = [0,0,0];
	var costdisp = ["","",""];
	var debug = false;
	var SMode = 'buy';
    var VisibleTimer;
    var NonVisibleTimer;

	//Tab Visability Compatibility
	// Set the name of the hidden property and the change event for visibility
	var hidden, visibilityChange; 
	if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
	  hidden = "hidden";
	  visibilityChange = "visibilitychange";
	} else if (typeof document.msHidden !== "undefined") {
	  hidden = "msHidden";
	  visibilityChange = "msvisibilitychange";
	} else if (typeof document.webkitHidden !== "undefined") {
	  hidden = "webkitHidden";
	  visibilityChange = "webkitvisibilitychange";
	}


    function onload(){
      localStored = window.localStorage.getItem('AOCookies');
      localStored = parseInt(localStored,10);
      if (Number.isInteger(localStored) === true){
        Cookies = parseInt(localStored,10);
      }else{
        alert('No Saved Cookies Found');
      }
      localStored = window.localStorage.getItem('CPC');
      localStored = parseInt(localStored,10);
      if (Number.isInteger(localStored) === true){
        CPC = parseInt(localStored,10);
      }
      localStored = window.localStorage.getItem('Costs');
      if (localStored !== null && localStored.length <=15){
 		costs = localStored.split(",");
      }
      localStored = window.localStorage.getItem('Amount');
      if (localStored !== null && localStored.length <=15){
      	amount = localStored.split(",");
      }
      
      //saveCookies
      window.setInterval(function(){
        window.localStorage.setItem("AOCookies",Cookies.toString());
        window.localStorage.setItem("CPC",CPC.toString());
        window.localStorage.setItem("Costs",costs);
        window.localStorage.setItem("Amount",amount);
	  }, 200);
      // Doc Title
      window.setInterval(function(){
        document.title = CookieString + " Cookies, Cookie Clicker";
      },500)
      // Calculates and Gives Cookies Per Second
      //Check if Page Active
      window.setInterval(function(){
       if (document.hidden) {
   	     return
	   }
       CPS = amount[0] * ACMOD + amount[1] * GMMOD + amount[2] * CFMOD;
       var CPmS = CPS*0.05
       Cookies = Cookies + CPmS;
       totalCookies = totalCookies + CPmS;
       document.getElementById('CPS').innerHTML = CPS;
      }, 50);
      window.setInterval(function(){
       if (!document.hidden) {
   	    return
	   }
       CPS = amount[0] * ACMOD + amount[1] * GMMOD + amount[2] * CFMOD;
       var CPmS = CPS
       Cookies = Cookies + CPmS;
       totalCookies = totalCookies + CPmS;
       document.getElementById('CPS').innerHTML = CPS;
      }, 1000);
      // Check for the various File API support.
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        console.log("Success! All the File APIs are supported.");
        document.getElementById('GenSFile').disabled = false;
        document.getElementById('GenSFileDesc').style.color = "white";
        document.getElementById('GenSFileDesc').innerHTML = " Generate and Upload Save Files";
      } else {
        console.log("The File APIs are not fully supported in this browser.\nThis Means You Can't Upload Saves");
     	document.getElementById('GenSFile').disabled = true;
        document.getElementById('GenSFileDesc').style.color = "red";
        document.getElementById('GenSFileDesc').innerHTML = "Your Browser Dosn't Support The Nessisary APIs";
      }
      //Main Run
      window.setInterval(function(){
        AA(Cookies);
        for (var i=0;i<3;i++){
        AA(costs[i]);
        }
        
        UpdateCost();
        SPMDisp();
        
        if (debug === true){
		  debug();
        }
      },100)
      
    }
	// Amount Abbriviation
	function AA(vaar){
      var PV;
      var AmountString;
        if (vaar < 1000){
          AmountString = parseInt(vaar.toString());
        }else if (vaar > 999  && vaar < 10000){
          AmountString = vaar.toString();
          AmountString = AmountString.slice(0,1) + "," + AmountString.slice(1,4);
        }else if (vaar > 9999  && vaar < 100000){
          AmountString = vaar.toString();
          AmountString = AmountString.slice(0,2) + "," + AmountString.slice(2,5);
        }else if (vaar > 99999  && vaar < 1000000){
          AmountString = vaar.toString();
          AmountString = AmountString.slice(0,3) + "," + AmountString.slice(3,6);
        }else if (vaar > 999999  && vaar < 10000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(1,4)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(0,1) + "." + PV + " Million";
        }else if (vaar > 9999999  && vaar < 100000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(2,5)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(0,2) + "." + PV + " Million";
        }else if (vaar > 99999999  && vaar < 1000000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(3,6)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(0,3) + "." + PV + " Million";
        }else if (vaar > 999999999  && vaar < 10000000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(4,7)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(0,1) + "." + PV + " Trillion";
        }else if (vaar > 9999999999  && vaar < 100000000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(5,8)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(0,2) + "." + PV + " Trillion";
        }else if (vaar > 99999999999  && vaar < 1000000000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(6,9)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(7,10) + "." + PV + " Trillion";
        }else if (vaar > 999999999999  && vaar < 10000000000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(8,11)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(0,1) + "." + PV + " Quadrillion";
        }else if (vaar > 9999999999999  && vaar < 100000000000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(9,12)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(0,2) + "." + PV + " Quadrillion";
        }else if (vaar > 99999999999999  && vaar < 1000000000000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(10,13)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(0,3) + "." + PV + " Quadrillion";
        }else if (vaar > 999999999999999  && vaar < 10000000000000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(11,14)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(0,1) + "." + PV + " Quintillion";
        }else if (vaar > 9999999999999999  && vaar < 100000000000000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(12,15)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(0,2) + "." + PV + " Quintillion";
        }else if (vaar > 99999999999999999  && vaar < 1000000000000000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(13,16)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(0,3) + "." + PV + " Quintillion";
        }else if (vaar > 99999999999999999  && vaar < 1000000000000000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(14,17)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(0,1) + "." + PV + " Sextillion";
        }else if (vaar > 99999999999999999  && vaar < 1000000000000000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(15,18)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(0,2) + "." + PV + " Sextillion";
        }else if (vaar > 99999999999999999  && vaar < 1000000000000000000){
          AmountString = vaar.toString();
          PV = parseInt(AmountString.slice(16,19)) / 1000;
          PV = PV.toString();
          PV = PV.slice(2)
          AmountString = AmountString.slice(0,3) + "." + PV + " Sextillion";
        }else{
          if (parseInt(vaar).isNaN()){
            AmountString = vaar;
          }else{
          	AmountString = "Too Many Cookies!! Slow Down!!";
          }
        }
      	//alert(AmountString);
      	if (vaar == Cookies){
          CookieString = AmountString;
        }else if (vaar == costs[0]){
          costdisp[0] = AmountString;
        }else if (vaar == costs[1]){
          costdisp[1] = AmountString;
        }else if (vaar == costs[2]){
          costdisp[2] = AmountString;
        }
    }
	//Buy and Sell Stuff
	function BAC(){
      //alert(SMode);
      if (SMode == "buy"){
        if (Cookies >= costs[0]) {
      	  Cookies = Cookies - costs[0];
          amount[0] = parseInt(amount[0],10) + 1;
          costs[0] = costs[0] * 1.2;
          costs[0] = parseInt(costs[0]);
        }else{
          alert('Not Enough Cookies To Buy AutoClicker')
        }
      }else if (SMode == "sell"){
        if (amount[0] > 0){
          amount[0] = amount[0]-1;
          Cookies = Cookies + costs[0]-costs[0]*.2;
          totalCookies = totalCookies + costs[0]/(1/5);
          costs[0] = costs[0]-costs[0]*.15;
        }else{
          alert("None To Sell");
        }
      }
    }
	function BGM(){
      if (SMode == "buy"){
        if (Cookies >= costs[1]) {
      	  Cookies = Cookies - costs[1];
          amount[1] = parseInt(amount[1],10) + 1;
          costs[1] = costs[1] * 1.15;
          costs[1] = parseInt(costs[1]);
        }else{
          alert('Not Enough Cookies To Buy Grandma')
        }
      }else if (SMode == "sell"){
        if (amount[1] > 0){
          amount[1] = amount[1]-1;
          Cookies = Cookies + costs[1]-costs[1]*.2;
          totalCookies = totalCookies + 100;
          costs[1] = costs[1]-costs[1]*.1;
        }else{
          alert("None To Sell");
        }
      }
    }
	function BCF(){
      //alert(SMode);
      if (SMode == "buy"){
        if (Cookies >= costs[2]) {
      	  Cookies = Cookies - costs[2];
          amount[2] = parseInt(amount[2],10) + 1;
          costs[2] = costs[2] * 1.15;
          costs[2] = parseInt(costs[2]);
        }else{
          alert('Not Enough Cookies To Buy Cookie Farm')
        }
      }else if (SMode == "sell"){
        if (amount[2] > 0){
          amount[2] = amount[2]-1;
          Cookies = Cookies + costs[2]-costs[2]*.2;
          totalCookies = totalCookies + 1100;
          costs[2] = costs[2]-costs[2]*.1;
        }else{
          alert("None To Sell");
        }
      }
    }
      
	function UpdateCost(){
      document.getElementById('ACookies').innerHTML = CookieString;
      document.getElementById('ACcost').innerHTML = costdisp[0];
      document.getElementById('ACamount').innerHTML = amount[0];
      document.getElementById('GMcost').innerHTML = costdisp[1];
      document.getElementById('GMamount').innerHTML = amount[1];
      document.getElementById('CFcost').innerHTML = costdisp[2];
      document.getElementById('CFamount').innerHTML = amount[2];
    }
    function ACC(){
      Cookies = Cookies + CPC;
    }
	function SPMDisp(){
      if (SMode == "buy"){
        document.getElementById('ModeBuy').style.opacity = 1;
        document.getElementById('ModeBuy').style.borderColor = "white";
        document.getElementById('ModeSell').style.opacity = 0.7;
        document.getElementById('ModeSell').style.borderColor = "black";
      }else if (SMode == "sell"){
        document.getElementById('ModeBuy').style.opacity = 0.7;
        document.getElementById('ModeBuy').style.borderColor = "black";
        document.getElementById('ModeSell').style.opacity = 1;
        document.getElementById('ModeSell').style.borderColor = "white";
      }
    }
    function reset(){
      Cookies = 0;
      CPS = 0;
      costs = [15,100,1100];
      amount = [0,0,0];
    }
	function OpenOptions(){
      if (document.getElementById('options').style.opacity == 0){
        //Show Options
        document.getElementById('options').style.opacity = 1;
        document.getElementById('options').style.zIndex = 5;
        //Hide Other Stuff
        document.getElementById('Blank').style.zIndex = 4;
        document.getElementById('info').style.opacity = 0;
        document.getElementById('info').style.zIndex = 4;
      }else{
        //Hide Options If Already Open
        document.getElementById('options').style.opacity = 0;
        document.getElementById('Blank').style.zIndex = 5;
      }
    }
	function OpenInfo(){
      if (document.getElementById('info').style.opacity == 0){
        //Show Info
        document.getElementById('info').style.opacity = 1;
        document.getElementById('info').style.zIndex = 5;
        //Hide anything Else
        document.getElementById('Blank').style.zIndex = 4;
        document.getElementById('options').style.opacity = 0;
        document.getElementById('options').style.zIndex = 4;
      }else{
        //Hide Info If Already Open
        document.getElementById('info').style.opacity = 0;
        document.getElementById('Blank').style.zIndex = 5;
      }
    }
	//Generate Save File
	function GenSavFile(){
      var data = {
        cookies: parseInt(Cookies),
        totalCookies: totalCookies,
        cost0: costs[0],
        cost1: costs[1],
        cost2: costs[2],
        amount0: amount[0],
        amount1: amount[1],
        amount2: amount[2]
      }
      var jsonData = JSON.stringify(data);
      download(jsonData, 'CCSaveFile.json', 'text/plain');
    }
	//Used In Generation, so that user downloads file
	function download(content, fileName, contentType) {
      var a = document.createElement("a");
      var file = new Blob([content], {type: contentType});
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
	}
	//Loads Save File After Being Entered
	function parseSave(){
	  var FileText;
	  //Get File
	  var file = document.getElementById('SFUL').files[0];
      //alert(file);
	  if (file) {
      //Creates Reader, to read file
      var reader = new FileReader();
      //Tells Reader To Read File
      reader.readAsText(file, "UTF-8");
      //On Error
      reader.onerror = function (evt) {
        alert("Error reading file");
        return;
      }
	  //On Readable File Loaded
      reader.onload = function (evt) {
        //Takes Text And Makes String
        FileText = evt.target.result;
        //Takes String and Gets a JSON Array
        var jsonData = JSON.parse(FileText);
        //alert(jsonData.cookies+"\n"+jsonData.costAC+"\n"+jsonData.amountAC);
        //Takes Data and Assigns it to Vars
        Cookies = jsonData.cookies;
        totalCookies = jsonData.totalCookies
        costs[0]= jsonData.cost0;
        costs[1]= jsonData.cost1;
        costs[2]= jsonData.cost2;
        amount[0]= jsonData.amount0;
        amount[1]= jsonData.amount1;
        amount[2]= jsonData.amount2;
      }
	}
    }
	function SavCrypt(){
      
    }
	
