<template>
	<dropdown :items="items" zIndex="50" :selectedValue="selectedValue" :onSelect="onSelect">Type</dropdown>
</template>

<script>
import dropdown from './BaseDropdown.vue'
import { ImportMethod } from '../util/constant'

export default {
	components: {
		dropdown
	},
	methods: {
		onSelect: function(value) {
			this.selectedValue = value
		}
	},
	computed: {
		selectedValue: {
			get() {
				return this.$store.state.cardImporter.importMethod
			},
			set(value) {
				this.$store.commit('cardImporter/setImportMethod', value)
			}
		},
		items() {
			return [
				{
					title: 'Save',
					icon: 'fa-save',
					value: ImportMethod.SAVE
				},
				{
					title: 'Download',
					icon: 'fa-download',
					value: ImportMethod.DOWNLOAD
				},
				{
					title: 'Save and Download',
					icon: 'fa-file-download',
					value: ImportMethod.SAVE_AND_DOWNLOAD
				}
			]
		}
	}
}
</script>
