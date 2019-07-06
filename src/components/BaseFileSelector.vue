<template>
	<input class="base-file-selector" type="file" accept="image/png, image/jpeg" @change="onFileSelected" />
</template>

<script>
export default {
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
