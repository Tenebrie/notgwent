<template>
	<dropdown :id="id" :items="items" zIndex="40" :selectedValue="selectedType" :onSelect="onSelect">Element</dropdown>
</template>

<script>
import dropdown from './BaseDropdown.vue'
import { Element } from '../util/constant'

export default {
	props: ['id'],
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
				return this.$store.state.cardState.cardElement
			},
			set(value) {
				this.$store.commit('cardState/setCardElement', value)
			}
		},
		items() {
			return [
				{
					title: 'Generic',
					icon: 'fa-link',
					value: Element.GENERIC
				},
				{
					title: 'Damage',
					icon: 'fa-fire element-damage',
					value: Element.DAMAGE
				},
				{
					title: 'Healing',
					icon: 'fa-ankh element-healing',
					value: Element.HEALING
				},
				{
					title: 'Alteration',
					icon: 'fa-seedling element-alteration',
					value: Element.ALTERATION
				},
				{
					title: 'Summoning',
					icon: 'fa-paw element-summoning',
					value: Element.SUMMONING
				},
				{
					title: 'Control',
					icon: 'fa-chess-knight element-control',
					value: Element.CONTROL
				},
				{
					title: 'Sacrifice',
					icon: 'fa-skull element-sacrifice',
					value: Element.SACRIFICE
				}
			]
		}
	}
}
</script>
