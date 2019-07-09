<template>
	<base-dropdown :items="items" zIndex="14" :selectedValue="healthArmor" @select="setHealthArmor">Armor</base-dropdown>
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
			healthArmor: state => state.cardState.healthArmor
		}),
		items() {
			let data = []
			data.push({
				title: '- No armor -',
				value: 0
			})
			for (let i = 1; i <= 5; i++) {
				data.push({
					title: i + ' Armor',
					value: i
				})
			}
			return data
		}
	},
	methods: {
		...mapMutations({
			setHealthArmor: 'cardState/setHealthArmor'
		})
	}
}
</script>
