<template>
	<base-button text='Save to Library' icon='fa-save' :onClick='onClick' :isIconOnly='isIconOnly' ></base-button>
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
			let item = this.$store.state.cardState
			this.$store.commit('cardLibrary/push', item)
		}
	}
}
</script>
