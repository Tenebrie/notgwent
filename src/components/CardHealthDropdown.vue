<template>
	<base-dropdown :items="items" zIndex="15" :selectedValue="health" @select="setHealth">Health</base-dropdown>
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
			health: state => state.cardState.health
		}),
		items() {
			let data = []
			data.push({
				title: '- No Value -',
				value: -1
			})
			for (let i = 0; i <= 12; i++) {
				data.push({
					title: i + ' Health',
					icon: 'fa-heart',
					value: i
				})
			}
			return data
		}
	},
	methods: {
		...mapMutations({
			setHealth: 'cardState/setHealth'
		})
	}
}
</script>
