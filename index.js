const API_METHODS = require('./methods.json');
const got = require('got');
const crypto = require('crypto');

class MulticraftAPI {
	constructor({ url, user, key }) {
		if (typeof url === "undefined") throw new Error('Missing URL')
		if (typeof user === "undefined") throw new Error('Missing user')
		if (typeof key === "undefined") throw new Error('Missing key')

		this.url = url;
		this.user = user;
		this.key = key;

		Object.keys(API_METHODS).forEach((key) => {
			this[key] = this._createMethod(key, API_METHODS[key]).bind(this)
		});
	}

	_createMethod(methodName, method) {
		return async (data = {}) => {
			// check if data is an object
			if (typeof data !== 'object') {
				throw new Error('Argument should be an object with the required parameters.');
			}

			// generate calling arguments
			const params = method.map((param, i) => {
				let out = {};

				// if parameter is string, return immediately
				if (typeof param == "string") {
					out.name = param;

					if (typeof data[out.name] == "undefined")
						throw new Error(`Missing argument: ${out.name}`);

					out.value = data[out.name]
					return out;
				}

				// set returned name
				out.name = param.name;

				// error if argument is undefined
				if (typeof param.default == "undefined" && typeof data[out.name] == "undefined") {
					throw new Error(`Missing argument: ${out.name}`);
				}

				// set default value
				if (typeof param.default !== "undefined")
					out.value = param.default;

				// set passed in value if exists
				if (typeof data[out.name] !== "undefined") {
					out.value = data[out.name];

                    // if array type, turn into json string
					if (param.type === 'array') {
						out.value = JSON.stringify(out.value)
					}
                }

				return out;
			});

			return await this._call(methodName, params);
		}
	}

	_generateSignature(params) {
		const signature = Object.keys(params).reduce((p, key) => (
			p + key + params[key]
		), "");

		return crypto.createHmac('sha256', this.key).update(signature).digest('hex');
	}

	// TODO cleanup errors
	_call(method, params) {
		// convert to object
        params = params.reduce((p,v) => {
            p[v.name] = v.value;
            return p;
		}, {});
		
		return new Promise(async (resolve, reject) => {
			params._MulticraftAPIMethod = method;
			params._MulticraftAPIUser = this.user;
			params._MulticraftAPIKey = this._generateSignature(params);

			const res = await got.post(this.url, {
				form: params
			});
			const data = JSON.parse(res.body);
			if (!data.success) return reject(res);
			resolve(data);
		})
	}
}

module.exports = MulticraftAPI;
