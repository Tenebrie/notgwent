<template>
	<button class="base-button" v-on:click='onClickInternal'><i :class='iconClass'></i>   {{ buttonText }}<slot></slot></button>
</template>

<script>
export default {
	props: ['text', 'onClick', 'icon', 'isIconOnly'],
	computed: {
		buttonText() {
			if (this.isIconOnly) {
				return ''
			}
			return this.text
		},
		iconClass() {
			if (this.icon) {
				return 'fas ' + this.icon
			}
			return 'hidden'
		}
	},
	methods: {
		onClickInternal: function(args) {
			if (this.onClick) {
				this.onClick(args)
			}
			this.$emit('click', args)
		}
	}
}
</script>

<style lang='scss' scoped>
	.base-button {
		margin: 10px;
		display: inline-block;
		padding: 0.35em 1.2em;
		border: 1px solid $inactive-color;
		border-radius: 0.12em;
		box-sizing: border-box;
		text-decoration: none;
		font-family: 'Roboto', sans-serif;
		font-weight: 300;
		color: $inactive-color;
		background-color: transparent;
		text-align: center;
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

		&.btn-red {
			color: lighten(red, 15%);
			border-color: lighten(red, 15%);

			&:focus, &:hover {
				color: red;
				border-color: red;
			}

			&:active {
				color: darken(red, 20%);
				border-color: darken(red, 20%);
			}
		}

		@media all and (max-width: 30em) {
			display: block;
			margin: 0.4em auto;
		}

		.hidden {
			display: none;
		}

		i {
			margin-right: 3px;
		}
	}
</style>
