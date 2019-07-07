<template>
	<input class="base-file-selector" type="file" :accept="fileType" @change="onFileSelected" />
</template>

<script>
export default {
	props: {
		fileType: String
	},
	methods: {
		onFileSelected: function(value) {
			this.$emit('select', value.target.files[0])
		}
	}
}
</script>

<style lang='scss' scoped>
	.base-file-selector {
		margin: 10px;
	}
</style>
