<template>
	<dropdown :items="items" zIndex="80" :selectedValue="selectedType" :onSelect="onSelect">Type</dropdown>
</template>

<script>
import dropdown from './BaseDropdown.vue'
import { Type } from '../util/constant'

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
				return this.$store.state.cardState.cardType
			},
			set(value) {
				this.$store.commit('cardState/setCardType', value)
			}
		},
		items() {
			return [
				{
					title: 'Prime',
					icon: 'fa-signature',
					value: Type.PRIME
				},
				{
					title: 'Action',
					icon: 'fa-hand-spock',
					value: Type.ACTION
				},
				{
					title: 'Path',
					icon: 'fa-arrow-right',
					value: Type.PATH
				},
				{
					title: 'State',
					icon: 'fa-pause-circle',
					value: Type.STATE
				},
				{
					title: 'Release',
					icon: 'fa-certificate',
					value: Type.RELEASE
				}
			]
		}
	}
}
</script>
