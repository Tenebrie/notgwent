import Vue from 'vue'
import Router from 'vue-router'

import TheFeaturesTabView from './views/TheFeaturesTabView.vue'
import TheArtworkTabView from './views/TheArtworkTabView.vue'
import TheImportTabView from './views/TheImportTabView.vue'
import TheLibraryTabView from './views/TheLibraryTabView.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: { name: 'FeaturesTab' }
		},
		{
			path: '/features',
			name: 'FeaturesTab',
			component: TheFeaturesTabView
		},
		{
			path: '/artwork',
			name: 'ArtworkTab',
			component: TheArtworkTabView
		},
		{
			path: '/import',
			name: 'ImportTab',
			component: TheImportTabView
		},
		{
			path: '/library',
			name: 'LibraryTab',
			component: TheLibraryTabView
		}
	]
})
