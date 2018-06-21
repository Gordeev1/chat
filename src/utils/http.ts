import omitBy from 'lodash/omitBy';
import qs from 'qs';
import { BASE_API_URL } from '../constants';

class ApiError extends Error {
	message: string;
	status: number;

	constructor(message, status) {
		super(message);
		this.message = message;
		this.status = status;
	}
}

export const checkStatus = (response: any) => {
	if (response.error) {
		throw new ApiError(response.message, response.statusCode);
	}
	return response;
};

export const getHeaders = () => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	};
	const token = localStorage.getItem('token');
	if (token) {
		headers = Object.assign({}, headers, { Authorization: `Bearer ${token}` });
	}
	return headers;
};

export const getUrl = payload => {
	const { endpoint, api_version, param, queries } = payload;

	let url = `${BASE_API_URL}/api/v${api_version || 1}/${endpoint}`;
	if (param) {
		url = url.concat(`/${param}`);
	}
	if (queries && Object.keys(queries).length) {
		url = url.concat('?' + qs.stringify(omitBy(queries, e => !e)));
	}

	return url;
};
