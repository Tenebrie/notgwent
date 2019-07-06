<template>
	<base-textbox :value='cardTitle' @input='setCardTitle' placeholder='Title'>Card title</base-textbox>
</template>

<script>
import BaseTextbox from './BaseTextbox.vue'
import { mapState, mapMutations } from 'vuex'

export default {
	components: {
		BaseTextbox
	},
	computed: {
		...mapState({
			cardTitle: state => state.cardState.cardTitle
		})
	},
	methods: {
		...mapMutations({
			setCardTitle: 'cardState/setCardTitle'
		})
	}
}
</script>
