<template>
	<base-dropdown :items="items" zIndex="50" :selectedValue="importMethod" @select="setImportMethod">Import method</base-dropdown>
</template>

<script>
import BaseDropdown from './BaseDropdown.vue'
import { mapState, mapMutations } from 'vuex'
import { ImportMethod } from '../util/constant'

export default {
	components: {
		BaseDropdown
	},

	computed: {
		...mapState({
			importMethod: state => state.cardImporter.importMethod
		}),
		items() {
			return [
				{
					title: 'Append',
					icon: 'fa-folder-plus',
					value: ImportMethod.APPEND
				},
				{
					title: 'Replace',
					icon: 'fa-folder-open',
					value: ImportMethod.REPLACE
				}
			]
		}
	},

	methods: {
		...mapMutations({
			setImportMethod: 'cardImporter/setImportMethod'
		})
	}
}
</script>
