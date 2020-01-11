<template>
	<dropdown :items="items" zIndex="30" :selectedValue="selectedType" :onSelect="onSelect">Type</dropdown>
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
					title: 'Leader',
					icon: 'fa-chess-queen',
					value: Type.LEADER
				},
				{
					title: 'Hero',
					icon: 'fa-chess-knight',
					value: Type.HERO
				},
				{
					title: 'Pawn',
					icon: 'fa-chess-pawn',
					value: Type.PAWN
				},
				{
					title: 'Spell',
					icon: 'fa-chess-rook',
					value: Type.SPELL
				}
			]
		}
	}
}
</script>
