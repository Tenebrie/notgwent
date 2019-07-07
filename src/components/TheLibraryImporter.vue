<template>
	<div class="the-library-importer">
		<base-file-selector file-type="text/plain" @select="onFileSelected" />
		<div class="info-message" v-if="shouldDisplayFileNotSelectedMessage">Please select a library file to import</div>
		<div class="info-message"  v-if="shouldDisplayFileLoadingMessage">File is being processed...</div>
		<div class="info-message"  v-if="shouldDisplayFileParsedMessage">Successfully parsed {{ libraryFileCards.length }} cards</div>
		<div class="info-message"  v-if="shouldDisplayFileInvalidMessage">Unable to parse selected file</div>
		<the-import-method-dropdown />
		<base-button @click='doImport'>Import</base-button>
	</div>
</template>

<script>
import BaseButton from './BaseButton'
import { mapState, mapMutations } from 'vuex'
import BaseFileSelector from './BaseFileSelector'
import TheImportMethodDropdown from './TheImportMethodDropdown'
import { ImportMethod, LibraryFileState } from '../util/constant'

export default {
	components: {
		BaseButton,
		BaseFileSelector,
		TheImportMethodDropdown
	},

	data() {
		return {
			libraryFileCards: [],
			libraryFileState: LibraryFileState.NOT_SELECTED
		}
	},

	computed: {
		...mapState({
			importMethod: state => state.cardImporter.importMethod
		}),

		shouldDisplayFileNotSelectedMessage() { return this.libraryFileState === LibraryFileState.NOT_SELECTED },
		shouldDisplayFileLoadingMessage() { return this.libraryFileState === LibraryFileState.LOADING },
		shouldDisplayFileParsedMessage() { return this.libraryFileState === LibraryFileState.PARSED },
		shouldDisplayFileInvalidMessage() { return this.libraryFileState === LibraryFileState.INVALID }
	},

	methods: {
		...mapMutations({
			pushToLibrary: 'cardLibrary/push',
			clearLibrary: 'cardLibrary/clear',
			registerArtwork: 'cardArtwork/register'
		}),

		onInput(value) {
			this.buffer = value
		},

		doImport() {
			if (this.importMethod === ImportMethod.REPLACE) {
				this.clearLibrary()
			}

			for (let cardIndex in this.libraryFileCards) {
				this.pushToLibrary(this.libraryFileCards[cardIndex])
			}
		},

		onFileSelected: function(file) {
			let reader = new FileReader()

			this.libraryFileCards = []
			this.libraryFileState = LibraryFileState.LOADING
			reader.onloadend = () => {
				try {
					this.libraryFileCards = JSON.parse(decodeURI(atob(reader.result.toString())))
					this.libraryFileState = LibraryFileState.PARSED
				} catch (err) {
					console.error(err)
					this.libraryFileState = LibraryFileState.INVALID
				}
			}
			reader.readAsText(file)
		}
	}
}
</script>

<style lang="scss" scoped>
	.the-library-importer {
		.info-message {
			margin: 10px;
		}
	}
</style>
