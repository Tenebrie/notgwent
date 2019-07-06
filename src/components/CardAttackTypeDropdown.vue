<template>
	<base-dropdown :items="items" zIndex="20" :selectedValue="attackType" @select="setAttackType">Attack type</base-dropdown>
</template>

<script>
import { AttackType } from '../util/constant'
import BaseDropdown from './BaseDropdown.vue'
import { mapState, mapMutations } from 'vuex'

export default {
	components: {
		BaseDropdown
	},
	computed: {
		...mapState({
			attackType: state => state.cardState.attackType
		}),
		items: function() {
			return [
				{
					title: 'Normal',
					value: AttackType.NORMAL
				},
				{
					title: 'Healing',
					value: AttackType.HEALING
				}
			]
		}
	},
	methods: {
		...mapMutations({
			setAttackType: 'cardState/setAttackType'
		})
	}
}
</script>
