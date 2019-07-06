<template>
	<base-button text='New file' icon='fa-file' :onClick='onClick' :isIconOnly='isIconOnly' ></base-button>
</template>

<script>
import BaseButton from './BaseButton.vue'

export default {
	props: ['isIconOnly'],
	components: {
		BaseButton
	},
	methods: {
		onClick: function() {
			this.$store.commit('cardState/clear')
		}
	}
}
</script>
