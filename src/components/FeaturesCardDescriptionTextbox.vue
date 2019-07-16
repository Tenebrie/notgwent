<template>
	<base-textbox :value='text' :rows='5' :onInput='onInput' placeholder="A description of the card's effect">Card description</base-textbox>
</template>

<script>
import BaseTextbox from './BaseTextbox'

export default {
	components: {
		BaseTextbox
	},
	methods: {
		onInput: function(value) {
			this.text = value
		}
	},
	computed: {
		text: {
			get() {
				return this.$store.state.cardState.cardDescription
			},
			set(value) {
				this.$store.commit('cardState/setCardDescription', value)
			}
		}
	}
}
</script>
