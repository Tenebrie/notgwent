module.exports = {
	lintOnSave: true,
	publicPath: '/notgwent',

	css: {
		loaderOptions: {
			sass: {
				data: `@import "@/styles/variables.scss";`
			}
		}
	}
}
