<template>
	<div>
		<the-editor-mode-dropdown />
		<base-button @click='exportCurrentCard'>Export current card</base-button>
		<base-button @click='exportLibrary'>Export library</base-button>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import BaseButton from './BaseButton'
import { getCardFileName, saveAsFile } from '../util/util'
import TheEditorModeDropdown from './TheEditorModeDropdown'

export default {
	components: {
		TheEditorModeDropdown,
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
			let currentDate = new Date()
			let day = (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate()
			let month = currentDate.getMonth() + 1
			month = (month < 10 ? '0' : '') + month
			let filename = day + '-' + month + '-' + currentDate.getFullYear() + '.txt'
			saveAsFile(data, filename, 'text/plain')
		}
	}
}
</script>
