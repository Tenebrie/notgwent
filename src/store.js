import Vue from 'vue'
import Vuex from 'vuex'

import cardStateModule from './modules/CardStateModule'
import cardLibraryModule from './modules/CardLibraryModule'
import cardImporterModule from './modules/CardImporterModule'
import { autosaverPlugin, undoRedoPlugin } from './util/plugins'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: true,
	modules: {
		cardState: cardStateModule,
		cardLibrary: cardLibraryModule,
		cardImporter: cardImporterModule
	},
	plugins: [autosaverPlugin, undoRedoPlugin]
})
