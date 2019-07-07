<template>
	<base-button text='Update in Library' icon='fa-paste' @click='onClick' :isIconOnly='isIconOnly' ></base-button>
</template>

<script>
import BaseButton from '../BaseButton.vue'
import { mapState, mapActions } from 'vuex'

export default {
	props: ['isIconOnly'],
	components: {
		BaseButton
	},
	computed: {
		...mapState({
			cardData: state => state.cardState
		})
	},
	methods: {
		...mapActions({
			updateCard: 'cardLibrary/updateCard'
		}),
		onClick: function() {
			this.updateCard(this.cardData)
		}
	}
}
</script>
