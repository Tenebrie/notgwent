<template>
	<base-dropdown :items="items" zIndex="20" :selectedValue="attack" @select="setAttack">Attack value</base-dropdown>
</template>

<script>
import BaseDropdown from './BaseDropdown.vue'
import { mapState, mapMutations } from 'vuex'

export default {
	components: {
		BaseDropdown
	},
	computed: {
		...mapState({
			attack: state => state.cardState.attack
		}),
		items() {
			let data = []
			data.push({
				title: '- No Value -',
				value: -1
			})
			for (let i = 0; i <= 12; i++) {
				data.push({
					title: i + ' Attack',
					icon: 'fab fa-gripfire',
					value: i
				})
			}
			return data
		}
	},
	methods: {
		...mapMutations({
			setAttack: 'cardState/setAttack'
		})
	}
}
</script>
