<template>
	<base-dropdown :items="items" zIndex="45" :selectedValue="editorMode" @select="setEditorMode">Editor mode</base-dropdown>
</template>

<script>
import BaseDropdown from './BaseDropdown.vue'
import { mapState, mapMutations } from 'vuex'
import { EditorMode } from '../util/constant'

export default {
	components: {
		BaseDropdown
	},

	computed: {
		...mapState({
			editorMode: state => state.cardImporter.editorMode
		}),
		items() {
			return [
				{
					title: 'Prototype',
					icon: 'fa-vial',
					value: EditorMode.PROTOTYPE
				},
				{
					title: 'Production',
					icon: 'fa-database',
					value: EditorMode.PRODUCTION
				}
			]
		}
	},

	methods: {
		...mapMutations({
			setEditorMode: 'cardImporter/setEditorMode'
		})
	}
}
</script>
