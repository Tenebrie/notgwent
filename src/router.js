import Vue from 'vue'
import Router from 'vue-router'

import TheFeaturesTabView from './views/TheFeaturesTabView.vue'
import TheTextsTabView from './views/TheTextsTabView.vue'
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
			path: '/texts',
			name: 'TextsTab',
			component: TheTextsTabView
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
