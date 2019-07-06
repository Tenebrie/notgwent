<template>
	<textbox :value='text' :onInput='onInput' placeholder='Tribe'>Card tribe</textbox>
</template>

<script>
import textbox from './BaseTextbox.vue'

export default {
	components: {
		textbox
	},
	methods: {
		onInput: function(value) {
			this.text = value
		}
	},
	computed: {
		text: {
			get() {
				return this.$store.state.cardState.cardTribe
			},
			set(value) {
				this.$store.commit('cardState/setCardTribe', value)
			}
		}
	}
}
</script>
