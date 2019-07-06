<template>
	<textbox :value='text' :onInput='onInput' placeholder='Name'>Card name</textbox>
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
				return this.$store.state.cardState.cardName
			},
			set(value) {
				this.$store.commit('cardState/setCardName', value)
			}
		}
	}
}
</script>
