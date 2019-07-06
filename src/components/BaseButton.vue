<template>
	<button v-on:click='onClickInternal'><i :class='iconClass'></i>   {{ buttonText }}</button>
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
	.hidden {
		display: none;
	}
	i {
		margin-right: 3px;
	}
</style>
