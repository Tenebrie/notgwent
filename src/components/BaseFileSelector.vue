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
		display: flex;
		flex-direction: column;

		label {
			font: 16px/1.4 "Roboto", sans-serif;
			letter-spacing: 0.5px;
			margin-left: 3px;
		}

		input {
			padding: 4px;
			font-weight: 300;
			color: $inactive-color;
			border: 1px solid $inactive-color;
			font-family: 'Roboto', sans-serif;
			transition: all $transition-duration;
			cursor: pointer;
			outline: none;

			&:focus, &:hover {
				color: $primary-color;
				border: 1px solid $primary-color;
				background-color: $button-background-color;
				transition: all 0s;
			}

			&:active {
				color: $accent-color;
				border: 1px solid $accent-color;
				background-color: $button-background-color;
				transition: all 0s;
			}
		}
	}
</style>
