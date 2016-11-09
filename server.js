var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/', function(req, res){

  //URL a scrapear:
  url = 'https://www.garbarino.com/producto/tv-led-lg-32-hd-32lf565.awg/d52efb2ad0';
  
  //La estructura de nuestra request call.
  //El primer parametro es la URL, y el callback toma 3 parametros, error, respuesta y el codigo html.
  
  request(url, function(error, response, html){
          
		//Primero vericamos que no hubo errores.

		if(!error){
		//Ahora utilizamos Cheerio para ver el HTML.

		var $ = cheerio.load(html);
		}

		//Definimos variables que vamos a scrapear.
		var title, release, rating;
		var json = { 
		title : $(".gb-main-detail-title.gb--promo-title h1[itemprop='name']").contents().filter(function(){ 
		return this.nodeType == 3; 
		})[0].nodeValue, 
		release : $("#final-price").html(), 
		rating : $(".gb-main-detail-prices-before").next().html()
		};
		console.log(json);
			
		//Para escribir el json usamos la librería 'fs'.$
		//Parametro 1 el archivo que creamos.
		//Parametro 2 JSON.stringify(json, null, 4) son los datos a escribir.
		//Parametro 3 es la funcion callback.

		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
		console.log('File successfully written! - Check your project directory for the output.json file');

		})

		// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
		res.send('Check your console!')
		});

})

app.set('port', process.env.PORT || 5000)

app.listen(app.get('port'));

console.log('Magic happens on port ' +  app.get('port'));

exports = module.exports = app;