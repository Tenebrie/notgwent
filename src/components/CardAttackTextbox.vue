<template>
	<base-textbox :value='attack' @input='onInput' placeholder='1'>Power</base-textbox>
</template>

<script>
import BaseTextbox from './BaseTextbox.vue'
import { mapState, mapMutations } from 'vuex'

export default {
	components: {
		BaseTextbox
	},
	computed: {
		...mapState({
			attack: state => state.cardState.attack
		})
	},
	methods: {
		...mapMutations({
			setAttack: 'cardState/setAttack'
		}),

		onInput: function(value) {
			if (value.length > 0 && isNaN(value)) {
				this.setAttack(-1)
				this.setAttack(10)
				return
			}

			if (value.length === 0) {
				return
			}

			let attack = parseInt(value)
			let normalizedAttack = Math.max(1, Math.min(attack, 9999))
			this.setAttack(-1)
			this.setAttack(normalizedAttack)
		}
	}
}
</script>
