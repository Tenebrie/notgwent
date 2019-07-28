<template>
	<base-file-selector :file-type="fileType" @select="onFileSelected"><slot></slot></base-file-selector>
</template>

<script>
import BaseFileSelector from './BaseFileSelector'

export default {
	components: {
		BaseFileSelector
	},
	props: {
		fileType: String
	},
	methods: {
		onFileSelected: function(file) {
			let reader = new FileReader()

			reader.onloadend = () => {
				this.emit('read', reader.result)
			}
			reader.readAsDataURL(file)
		}
	}
}
</script>
