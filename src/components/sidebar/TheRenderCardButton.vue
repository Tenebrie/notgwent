<template>
	<base-button text='Save as image' icon='fa-download' :onClick='onClick' :isIconOnly='isIconOnly' ></base-button>
</template>

<script>
import { Event } from '../../util/constant'
import BaseButton from '../BaseButton.vue'

export default {
	props: ['isIconOnly'],
	components: {
		BaseButton
	},
	methods: {
		onClick: function() {
			this.$root.$emit(Event.SAVE_CARD_AS_IMAGE)
		}
	}
}
</script>
