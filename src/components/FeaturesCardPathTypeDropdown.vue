<template>
	<dropdown :items="items" zIndex="60" :selectedValue="selectedType" :onSelect="onSelect">Path type</dropdown>
</template>

<script>
import dropdown from './BaseDropdown.vue'
import { PathType } from '../util/constant'

export default {
	components: {
		dropdown
	},
	methods: {
		onSelect: function(value) {
			this.selectedType = value
		}
	},
	computed: {
		selectedType: {
			get() {
				return this.$store.state.cardState.cardPathType
			},
			set(value) {
				this.$store.commit('cardState/setCardPathType', value)
			}
		},
		items() {
			return [
				{
					title: 'Normal',
					icon: 'fa-long-arrow-alt-right',
					value: PathType.NORMAL
				},
				{
					title: 'Fork',
					icon: 'fa-expand-arrows-alt',
					value: PathType.FORK
				}
			]
		}
	}
}
</script>
