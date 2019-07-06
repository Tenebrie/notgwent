<template>
	<base-textbox :value='offsetY' @input='onInput' placeholder='0'>Vertical offset</base-textbox>
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
			offsetY: state => state.cardState.customImageOffsetY
		})
	},
	methods: {
		...mapMutations({
			setCustomImageOffsetY: 'cardState/setCustomImageOffsetY'
		}),

		onInput: function(value) {
			if (value.length > 0 && isNaN(value)) {
				this.setCustomImageOffsetY(0)
				return
			}

			if (value.length === 0) {
				return
			}

			this.setCustomImageOffsetY(parseInt(value))
		}
	}
}
</script>
