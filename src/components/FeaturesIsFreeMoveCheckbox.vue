<template>
	<div class='checkbox-wrapper'>
		<checkbox :isChecked='checked' :onChecked='onChecked'>Free Move</checkbox>
	</div>
</template>

<script>
import checkbox from './BaseCheckbox.vue'

export default {
	components: {
		checkbox
	},
	methods: {
		onChecked: function(value) {
			this.checked = value
		}
	},
	computed: {
		checked: {
			get() {
				return this.$store.state.cardState.isFreeMove
			},
			set(value) {
				this.$store.commit('cardState/setFreeMove', value)
			}
		}
	}
}
</script>

<style lang='scss' scoped>
	.checkbox-wrapper {
		margin: 10px;
	}
</style>
