function createpass() { 
	var password = ""; 
	var count = 64; 
	var chars = "abcdef1234567890"; 

	for (var i = 0; i < count; i++) 
	{ 
		password += chars.charAt(Math.floor(Math.random() * chars.length)); 
	} 
	// console.log(password);
	return password; 
} 

const ether = require('ethereumjs-util');
const rp = require('request-promise');
const frequency = 3*1000;
console.log('Проверка по \x1b[36m20\x1b[0m адресов каждые \x1b[36m'+frequency+'\x1b[0m миллисекунд. Поехали:');
function searchLoop(){ 
	var str = "";
	var pass = [];
	for(var i = 0; i<21; i++){
		pass.push(createpass());
		str+=ether.bufferToHex(ether.privateToAddress(ether.toBuffer(ether.addHexPrefix(pass[i]))))+",";
	}
	str = str.slice(0,-1);
	rp("https://api.etherscan.io/api?module=account&action=balancemulti&apikey=F92Z14GE2DTF6PBBYY1YPHPJ438PT3P2VI&address="+str)
  .then(function(html) {
		var fs = require('fs');
		var answer = JSON.parse(html);
		for(a in answer["result"]){
			if(answer["result"][a]["balance"] !== '0'){
				fs.appendFile('success.txt', '[FIND]['+answer["result"][a]["balance"]+' ETH] '+answer["result"][a]["account"]+' (key:'+pass[a]+')\n', (err) => {
					if(err) console.log('\x1b[41m>>Error while writing to file!\x1b[0m');
				});
				console.log("\x1b[42m \n[FIND]["+answer["result"][a]["balance"]+" ETH] "+answer["result"][a]["account"]+" (key:"+pass[a]+")\n \x1b[0m");
			}
			else{
				fs.appendFile('log.txt', '[NOPE]['+answer["result"][a]["balance"]+' ETH] '+answer["result"][a]["account"]+' (key:'+pass[a]+')\n', (err) => {
					if(err) console.log('\x1b[41m>>Error while writing to file!\x1b[0m');
				});
				console.log("\x1b[41m["+answer["result"][a]["balance"]+" ETH] (key:"+pass[a]+")\x1b[0m");
			}
		}
  })
  .catch(function(err) {
		var fs = require('fs');
    fs.appendFile('error.txt', "[Server sent] "+err+'\n'+JSON.stringify(err)+"\n/=============/\n", (err) => {
			if(err) console.log('\x1b[41m>>Error while writing to file!\x1b[0m');
		});
  });
}
setInterval(searchLoop, frequency);

// const $ = require('cheerio');
// var privatekey = createpass();
// var address = ether.bufferToHex(ether.privateToAddress(ether.toBuffer(ether.addHexPrefix(privatekey))));
// const url = 'https://addresskeys.com/eth-address?id='+privatekey;
// const url = 'https://api.etherscan.io/api?module=account&action=balance&address='+address+'&tag=latest&apikey=F92Z14GE2DTF6PBBYY1YPHPJ438PT3P2VI';
// console.log("privatekey",privatekey);
// console.log("address",address);
// console.log(url);
// rp(url)
  // .then(function(html) {
		// var answer = JSON.parse(html);
		// console.log(answer["result"]+" BTC - "+address);
  // })
  // .catch(function(err) {
    // console.log(err);
  // });


// https://api.etherscan.io/api?module=account&action=balance&address=0x7899cc6133b68706e41e9aa8a2a424d970c87739&tag=latest&apikey=F92Z14GE2DTF6PBBYY1YPHPJ438PT3P2VI
// https://api.etherscan.io/api?module=account&action=balancemulti&apikey=F92Z14GE2DTF6PBBYY1YPHPJ438PT3P2VI&address=0x1b7222b3bad00287bfb47f1a71764bdcaafaf2a7,0xc6d59f384bea8b8c24c5237f7b5de6847dc04e63,0x3bdae9222b7b3006e9527662f2393cf2964d8ef1,0x42bde467017b0da66ad06493a5e194e960ed02e4,0xd32e1ed444aa47ff1e2888577109827ab6b19c18,0x11e1f8f440ffd1812abc9c226404180372ef91f6,0xe3ecba3821ab27df84cbfe176dcdc0646ba971ee,0xd78f5e65da3d07787f7b7847cfd5baf0a75d3654,0x850f59a7216b5a666c2c8df9bef5172fc4d22488,0x2bbde978315aadd917b8cfd3bb8c00a3a2076ef2,0xaa8c85b180c0c491f0e43090e32ba9995abb9603,0x0752e37b9ac4018b3f1d66d03503a196b7fb97aa,0x028d215c73f2c9fbf90d274ebf9f84e39b221635,0x02f92bd92113eee8bca72e2351c727845130585c,0xb0746ec156ed7165a36dc427261946c9aa48f1d9,0xdbae22e853e743a68ef781e0c164973e3e4bbdca,0x1849130790a927813742598cc8e74fce20dcd5c0,0x5258fa9efea6ff1c2021b5adb8f4ead14f69cb9e,0xe11689723a7ea1f88f53b7dcffeedd4e3e1fad8c,0xffae16d740433655e54f6d0652e8ee7638cc5750
// rp(url)
  // .then(function(html) {
		// console.log($('div.flex-1 > div.mx-auto > div.wallet', html)[1].text());
		
		// console.log($('div.flex-1 > div.mx-auto > ul > li > span#finalbalance', html).text());
		
		// var count = 0;
		// var moneyArr = $('.justify-center > div > div > span > strong', html).text();
		// var passArr = $('.justify-center > div > div > span.break-words', html);
		// console.log(passArr.substr(64*1,64));
		// console.log(passArr.substr(64*2,64));
		// for(i in moneyArr)
		// {
			// var val = Number(moneyArr[i].slice(0, -4));
			// if(val !== 0){
				// console.log(val + ' BTC - ' + passArr[i]);
				// count+=1;
			// }
			// console.log(val + ' BTC - ' + passArr[i]);
		// }
		// if(count == 0){
				// console.log("Соси бибу");
		// }
    // console.log($('.justify-center > div > div > span > strong', html).text());
    // console.log($('.justify-center > div > div > span.break-words', html).text());
  // })
  // .catch(function(err) {
    // console.log(err);
  // });
	
	
function search(){ 
var needle = require("needle"); 
var cheerio = require("cheerio"); 
var balance = require('crypto-balances');
var password = ""; 
var count = 64; 
var chars = "abcdef1234567890"; 

for (var i = 0; i < count; i++) 
{ 
password += chars.charAt(Math.floor(Math.random() * chars.length)); 
} 

var url = "https://addresskeys.com/eth-address?id="+password; 

needle.get(url,function(err,res){ 
var $ = cheerio.load(res.body); 
address = $('strong').html(); 
balance(address, function(error, result) { 
var quantity = result[0].quantity; 
if(quantity==='0'){ 
console.log('\x1b[41m[NOPE]\x1b[0m['+quantity+'](key:'+password+')');
var fs = require('fs');
fs.appendFile('log.txt', '[NOPE]['+quantity+'](key:'+password+')\n', (err) => {
  if(err) console.log('\x1b[41m>>Error while writing to file!\x1b[0m');
});
} else { 
console.log('\x1b[42m[FIND]\x1b[0m['+quantity+' ETH] '+address+' (key: '+password+')'); 
var fs = require('fs');
fs.appendFile('success.txt', '[FIND] ['+quantity+' ETH] '+address+' (key: '+password+')\n', (err) => {
  if(err) console.log('\x1b[41m>>Error while writing to file!\x1b[0m');
});
} 
}); 
}); 
} 
// setInterval(search, 7000);

// console.log("SITE www.myetherwallet.com/#send-transaction"); 

/*
const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://addresskeys.com/btcpage?auto=yes&pagenum=rand';

rp(url)
  .then(function(html) {
		console.log($('h1.text-base > span', html).text());
		var count = 0;
		var moneyArr = $('.justify-center > div > div > span > strong', html).text();
		var passArr = $('.justify-center > div > div > span.break-words', html);
		// console.log(passArr.substr(64*1,64));
		// console.log(passArr.substr(64*2,64));
		for(i in moneyArr)
		{
			var val = Number(moneyArr[i].slice(0, -4));
			if(val !== 0){
				console.log(val + ' BTC - ' + passArr[i]);
				count+=1;
			}
			console.log(val + ' BTC - ' + passArr[i]);
		}
		if(count == 0){
				console.log("Соси бибу");
		}
    // console.log($('.justify-center > div > div > span > strong', html).text());
    // console.log($('.justify-center > div > div > span.break-words', html).text());
  })
  .catch(function(err) {
    console.log(err);
  });*/
	
        // if (document.getElementsByClassName('filled').length !== 0) {
            // window.open("https://keys.lol/ethereum/random", '_blank');
            // var array = document.getElementsByClassName('justify-center')[0].children[0].children;
            // for(i in array)
            // {
							// if(!isNaN(parseFloat(i)) && isFinite(i)){
									// var y = array[i];
									// var val = Number(y.children[0].children[0].innerText.slice(0, -4));
									// if(val !== 0){
										// console.log(val + 'ETH - ' + y.children[0].children[1].innerText);
								// }
							// }
            // }
            // alert('Есть!');
        // } else{
            // console.log("Соси бибу");
            // document.location.href = 'random';
        // };