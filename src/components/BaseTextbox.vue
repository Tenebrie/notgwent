<template>
	<div class='text-input'>
		<label><slot></slot></label>
		<input v-if='!multiline' class='card-title' type='text' v-model='text' :placeholder='placeholder' :readonly="readonly" />
		<textarea v-if='multiline' class='card-title' :rows='rows' v-model='text' :placeholder='placeholder' :readonly="readonly"></textarea>
	</div>
</template>

<script>
export default {
	props: {
		rows: Number,
		value: [String, Number],
		onInput: Function,
		readonly: Boolean,
		placeholder: String
	},
	computed: {
		text: {
			get() {
				return this.value
			},
			set(value) {
				if (this.onInput) {
					this.onInput(value)
				}
				this.$emit('input', value)
			}
		},
		multiline() {
			return this.rows !== undefined && this.rows > 1
		}
	}
}
</script>

<style lang="scss" scoped>
	.text-input {
		margin: 10px;

		label {
			font: 16px/1.4 "Roboto", sans-serif;
			letter-spacing: 0.5px;
			margin-left: 3px;
		}

		input[type='text'], textarea {
			font: 16px/1.4 "Roboto", sans-serif;
			letter-spacing: 0.5px;
			padding: 5px;
			margin-top: 5px;
			resize: none;
			display: block;
			color: $primary-color;
			border: 1px solid $inactive-color;
			border-radius: 3px;
			outline: none;
			transition: all $transition-duration;
			background-color: $textarea-background-color;

			&:focus {
				border-color: $primary-color;
				background-color: transparent;
			}
		}

		.card-title {
			width: 100%;
		}

		.card-description {
			width: 100%;
		}
	}
</style>
