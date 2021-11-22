const express = require('express');
const randomBytes = require('randombytes');
const app = express();
const axios = require('axios').default;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const data_influx = {};

const postUrl =
	'https://ap-southeast-2-1.aws.cloud2.influxdata.com/api/v2/write?bucket=test&org=29518f4b5a6bd4ea';

// const data = 'cpu_load_short7,host=server02 value=0.80';

const token =
	'SWHSZL693zxwXLm5BsFenNg_C7E8hmAIeJ_K0vPNKqogH_YCpWLsmwaTR9TGYi4c7cNPTKtvODsv4uPyNUwoIQ==';

const auth = {
	Authorization: `Token ${token} `,
};

app.post('/influxwriter', async (req, res) => {
	const id = randomBytes(4).toString('hex');
	const { data } = req.body;
	data_influx[id] = {
		id,
		data,
	};
	try {
		await axios.post(postUrl, data, {
			headers: auth,
		});
	} catch (error) {
		console.log(error);
	}
	res.status(201).send(data_influx[id]);
});

app.listen(4000, () => {
	console.log('Listening on 4000');
});
