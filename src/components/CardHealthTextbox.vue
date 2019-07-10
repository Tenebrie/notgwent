<template>
	<base-textbox :value='health' @input='onInput' placeholder='1'>Health</base-textbox>
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
			health: state => state.cardState.health
		})
	},
	methods: {
		...mapMutations({
			setHealth: 'cardState/setHealth'
		}),

		onInput: function(value) {
			if (value.length > 0 && isNaN(value)) {
				this.setHealth(50)
				return
			}

			if (value.length === 0) {
				return
			}

			let health = parseInt(value)
			let normalizedHealth = Math.max(1, Math.min(health, 99))
			this.setHealth(-1)
			this.setHealth(normalizedHealth)
		}
	}
}
</script>
