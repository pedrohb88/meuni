require("./config");

const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const mongoose = require("mongoose");
const College = require("./models/College");
const Location = require("./models/Location");


const app = express();

const fs = require('fs');

// Connect Database
connectDB();

app.use(express.json());

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/college', require('./routes/api/college'));

// Server static assets in produdction
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.get('/api/teste', (req, res) => {
	res.send('ola');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
	console.log(`Server started on port ${PORT}`);
	
    //Código para fazer a população de instituições e cidades
	/*let model = mongoose.model("Ball", new mongoose.Schema({}));

	let results = await model.find({});

	for (i = 0; i < results.length; i++) {
		try {

            let result = results[i].toObject();

			let city = result["Município da IES"];
            let loc = await Location.find({ city });
			let nl;
			if (!loc.length) {
				nl = new Location({ city, state: result["Sigla da UF"] });
				await nl.save();
			}
			let n = {
				name: result['Nome da Instituição'],
				acronym: result["SIGLA"],
				category: result["Categoria Administrativa da IES"],
				location: new Location(nl),
				organization: result["Organização Acadêmica"],
				cep: result["CEP"],
				address: result["Endereço "],
				district: result["Bairro "],
				phone: result["Telefone"],
				email: result["EMAIL"],
				website: result["Página Eletrônica"],
				collegeType: result["Rede"],
            };
        
			let newCollege = new College(n);

			await newCollege.save();
		} catch (error) {
			console.log(error);
		}
	}

    console.log("finished");*/

});

module.exports = app;
