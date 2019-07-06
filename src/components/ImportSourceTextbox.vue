<template>
	<div>
		<label v-html='parsedData'></label>
		<base-textbox :value='buffer' rows='20' :onInput='onInput' placeholder="Insert text here">Text to parse</base-textbox>
		<import-type></import-type>
		<button v-on:click='doImport'>Import</button>
	</div>
</template>

<script>
import BaseTextbox from './BaseTextbox.vue'
import importType from './ImportTypeDropdown.vue'
import { Event, Element, ImportMethod, PathType, Tribe, Type } from '../util/constant'
import { capitalize } from '../util/util'

export default {
	components: {
		BaseTextbox,
		importType
	},
	data() {
		return {
			buffer: '',
			parsedData: ''
		}
	},
	methods: {
		onInput(value) {
			this.buffer = value
		},
		doImport() {
			let lineRegex = /\[([a-zA-Z0-9\s]+)]\s*(?:([a-zA-Z.…,\s]+):)?\s*(.+)$/
			let lines = this.buffer.split('\n')

			for (let l = 0; l < lines.length; l++) {
				let line = lines[l]
				let results = lineRegex.exec(line)
				if (!results) {
					continue
				}

				this.$store.commit('cardState/setCardName', 'Unnamed')
				this.$store.commit('cardState/setCardDescription', '')
				this.$store.commit('cardState/setCardTribe', '')
				this.$store.commit('cardState/setCardManaCost', 0)
				this.$store.commit('cardState/setCardGoldCost', 0)
				this.$store.commit('cardState/setCardPathType', PathType.NORMAL)
				this.$store.commit('cardState/setCardElement', Element.GENERIC)
				this.$store.commit('cardState/setFreeBuild', false)
				this.$store.commit('cardState/setFreeDraw', false)
				this.$store.commit('cardState/setFreeMove', false)
				this.$store.commit('cardState/setPermanent', false)
				let attributes = results[1].split(' ')
				let name = results[2] || ''
				let description = results[3] || ''
				description = description.replace(/;\s/g, ';\n')

				let argumentStack = []
				for (let i = 0; i < attributes.length; i++) {
					let attribute = attributes[i].toLowerCase()

					let numberRegex = /^[0-9]+$/
					results = numberRegex.exec(attribute)
					if (results) {
						argumentStack.push(results[0])
						continue
					}

					if (attribute === 'mana') {
						let arg = argumentStack.pop()
						this.$store.commit('cardState/setCardManaCost', parseInt(arg))
					}

					if (attribute === 'gold') {
						let arg = argumentStack.pop()
						this.$store.commit('cardState/setCardGoldCost', parseInt(arg))
					}

					if (attribute === 'permanent') {
						this.$store.commit('cardState/setPermanent', true)
					}

					Object.keys(Type).forEach((key) => {
						if (attribute.toLowerCase() === Type[key]) {
							this.$store.commit('cardState/setCardType', Type[key])
						}
					})

					Object.keys(PathType).forEach((key) => {
						if (attribute.toLowerCase() === PathType[key]) {
							this.$store.commit('cardState/setCardPathType', PathType[key])
						}
					})

					Object.keys(Element).forEach((key) => {
						if (attribute.toLowerCase() === Element[key]) {
							this.$store.commit('cardState/setCardElement', Element[key])
						}
					})

					Object.keys(Tribe).forEach((key) => {
						if (attribute.toLowerCase() === Tribe[key]) {
							this.$store.commit('cardState/setCardTribe', capitalize(Tribe[key]))
						}
					})
				}

				if (name) {
					this.$store.commit('cardState/setCardName', name)
				}

				if (description) {
					let freeBuildRegex = /;\s[Ff]ree\s[Bb]uild/g
					if (freeBuildRegex.exec(description)) {
						description = description.replace(freeBuildRegex, '')
						this.$store.commit('cardState/setFreeBuild', true)
					}

					let freeDrawRegex = /;\s[Ff]ree\s[Dd]raw/g
					if (freeDrawRegex.exec(description)) {
						description = description.replace(freeDrawRegex, '')
						this.$store.commit('cardState/setFreeDraw', true)
					}

					let freeMoveRegex = /;\s[Ff]ree\s[Mm]ove/g
					if (freeMoveRegex.exec(description)) {
						description = description.replace(freeMoveRegex, '')
						this.$store.commit('cardState/setFreeMove', true)
					}

					let keywords = [
						'Draw',
						'Build',
						'Discard',
						'Destroy',
						'Passive',
						'Primary',
						'Secondary'
					]

					for (let k = 0; k < keywords.length; k++) {
						let keyword = keywords[k]
						let regexString = '(' + keyword + 's?:?)'
						let regex = new RegExp(regexString, 'g')
						description = description.replace(regex, '<color=white>$1</color>')
					}

					this.$store.commit('cardState/setCardDescription', description)
				}

				let importMethod = this.$store.state.cardImporter.importMethod
				if (importMethod === ImportMethod.SAVE) {
					this.$store.commit('cardLibrary/push', this.$store.state.cardState)
				} else if (importMethod === ImportMethod.DOWNLOAD) {
					this.$root.$emit(Event.SAVE_CARD_AS_IMAGE)
				} else if (importMethod === ImportMethod.SAVE_AND_DOWNLOAD) {
					this.$store.commit('cardLibrary/push', this.$store.state.cardState)
					this.$root.$emit(Event.SAVE_CARD_AS_IMAGE)
				}
			}
		}
	}
}
</script>
