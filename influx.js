const axios = require('axios').default;

const app = require('express')();
const PORT = 8080;

app.listen(PORT, () => {
	console.log(`Listening on ${PORT} `);
});

const postUrl =
	'https://ap-southeast-2-1.aws.cloud2.influxdata.com/api/v2/write?bucket=test&org=29518f4b5a6bd4ea';

const data = 'cpu_load_short7,host=server02 value=0.80';

const token =
	'SWHSZL693zxwXLm5BsFenNg_C7E8hmAIeJ_K0vPNKqogH_YCpWLsmwaTR9TGYi4c7cNPTKtvODsv4uPyNUwoIQ==';

const auth = {
	Authorization: `Token ${token} `,
};

app.get('/influxdb-cloud/write', async (req, res) => {
	try {
		await axios.post(postUrl, data, {
			headers: auth,
		});
	} catch (error) {
		console.log(error);
	}
});
