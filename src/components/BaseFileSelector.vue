<template>
	<div class="base-file-selector">
		<label><slot></slot></label>
		<input type="file" :accept="fileType" @change="onFileSelected" />
	</div>
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

		label {
			font: 16px/1.4 "Roboto", sans-serif;
			letter-spacing: 0.5px;
			margin-left: 3px;
		}
	}
</style>

