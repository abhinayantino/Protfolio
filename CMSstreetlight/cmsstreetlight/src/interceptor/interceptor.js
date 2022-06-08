const Interceptor = {
	interceptorMap: {},
	register: (table, callback) => {
		Interceptor.interceptorMap[table] = callback;
	},
	process: (table, operation, data) => {
		if (Interceptor.interceptorMap[table])
			return Interceptor.interceptorMap[table](operation, data);
		return data;
	},
};
export default Interceptor;
