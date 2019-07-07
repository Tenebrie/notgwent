<template>
	<base-file-selector file-type="image/png, image/jpeg" @select="onFileSelected" />
</template>

<script>
import BaseFileSelector from './BaseFileSelector'

export default {
	components: {
		BaseFileSelector
	},
	methods: {
		onFileSelected: function(file) {
			let reader = new FileReader()

			reader.onloadend = () => {
				this.$store.commit('cardState/setCustomImageData', reader.result)
			}
			reader.readAsDataURL(file)
		}
	}
}
</script>
