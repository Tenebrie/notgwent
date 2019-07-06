<template>
	<base-textbox :value='offsetX' @input='onInput' placeholder='0'>Horizontal offset</base-textbox>
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
			offsetX: state => state.cardState.customImageOffsetX
		})
	},
	methods: {
		...mapMutations({
			setCustomImageOffsetX: 'cardState/setCustomImageOffsetX'
		}),

		onInput: function(value) {
			if (value.length > 0 && isNaN(value)) {
				this.setCustomImageOffsetX(0)
				return
			}

			if (value.length === 0) {
				return
			}

			this.setCustomImageOffsetX(parseInt(value))
		}
	}
}
</script>
