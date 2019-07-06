<template>
	<checkbox :isChecked='checked'>&nbsp;</checkbox>
</template>

<script>
import checkbox from './BaseCheckbox.vue'

export default {
	props: ['isSelected'],
	components: {
		checkbox
	},
	computed: {
		checked: {
			get() {
				return this.isSelected
			}
		}
	}
}
</script>
