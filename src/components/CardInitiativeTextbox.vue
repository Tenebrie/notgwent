<template>
	<base-textbox :value='initiative' @input='onInput' placeholder='10'>Initiative</base-textbox>
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
			initiative: state => state.cardState.initiative
		})
	},
	methods: {
		...mapMutations({
			setInitiative: 'cardState/setInitiative'
		}),

		onInput: function(value) {
			if (value.length > 0 && isNaN(value)) {
				this.setInitiative(10)
				return
			}

			if (value.length === 0) {
				return
			}

			let initiative = parseInt(value)
			let normalizedInitiative = Math.max(1, Math.min(initiative, 99))
			this.setInitiative(-1)
			this.setInitiative(normalizedInitiative)
		}
	}
}
</script>
