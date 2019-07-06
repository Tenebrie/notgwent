<template>
	<dropdown :items="items" zIndex="30" :selectedValue="selectedManaCost" :onSelect="onSelect">Purchase cost</dropdown>
</template>

<script>
import dropdown from './BaseDropdown.vue'

export default {
	components: {
		dropdown
	},
	methods: {
		onSelect: function(value) {
			this.selectedManaCost = value
		}
	},
	computed: {
		selectedManaCost: {
			get() {
				return this.$store.state.cardState.cardGoldCost
			},
			set(value) {
				this.$store.commit('cardState/setCardGoldCost', value)
			}
		},
		items() {
			let data = []
			data.push({
				title: '- No Gold -',
				value: 0
			})
			for (let i = 5; i <= 50; i += 5) {
				data.push({
					title: i + ' Gold',
					icon: 'fa-coins',
					value: i
				})
			}
			return data
		}
	}
}
</script>
