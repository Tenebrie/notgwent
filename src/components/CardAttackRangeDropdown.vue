<template>
	<base-dropdown :items="items" zIndex="24" :selectedValue="attackRange" @select="setAttackRange">Range</base-dropdown>
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
			attackRange: state => state.cardState.attackRange
		}),
		items() {
			let data = []
			data.push({
				title: '- Own row -',
				value: 0
			})
			data.push({
				title: '- Melee -',
				value: 1
			})
			for (let i = 2; i <= 5; i++) {
				data.push({
					title: i + ' Range',
					value: i
				})
			}
			return data
		}
	},
	methods: {
		...mapMutations({
			setAttackRange: 'cardState/setAttackRange'
		})
	}
}
</script>
