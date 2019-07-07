<template>
	<div>
		<base-button @click='exportCurrentCard'>Export current card</base-button>
		<base-button @click='exportLibrary'>Export library</base-button>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import BaseButton from './BaseButton'
import { getCardFileName, saveAsFile } from '../util/util'

export default {
	components: {
		BaseButton
	},

	data() {
		return {
			buffer: ''
		}
	},

	computed: {
		...mapState({
			currentCard: state => state.cardState,
			cardLibrary: state => state.cardLibrary.data
		})
	},

	methods: {
		onInput(value) {
			this.buffer = value
		},

		exportCurrentCard() {
			let library = [this.currentCard]
			let data = btoa(encodeURI(JSON.stringify(library)))
			saveAsFile(data, getCardFileName(this.currentCard.cardName, 'txt'), 'text/plain')
		},

		exportLibrary() {
			let data = btoa(encodeURI(JSON.stringify(this.cardLibrary)))
			saveAsFile(data, 'card_library.txt', 'text/plain')
		}
	}
}
</script>
