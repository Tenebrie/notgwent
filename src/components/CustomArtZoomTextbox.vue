<template>
	<base-textbox :value='currentZoom' @input='onInput' placeholder='0'>Zoom</base-textbox>
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
			currentZoom: state => state.cardState.customImageZoom
		})
	},
	methods: {
		...mapMutations({
			setCustomImageZoom: 'cardState/setCustomImageZoom'
		}),

		onInput: function(value) {
			if (value.length > 0 && isNaN(value)) {
				this.setCustomImageZoom(0)
				return
			}

			if (value.length === 0) {
				return
			}

			this.setCustomImageZoom(parseInt(value))
		}
	}
}
</script>
