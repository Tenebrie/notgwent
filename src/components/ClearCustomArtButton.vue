<template>
	<base-button text="Remove artwork" @click="onClick" icon="fa-trash" />
</template>

<script>
import { mapMutations } from 'vuex'
import BaseButton from './BaseButton'

export default {
	components: { BaseButton },
	methods: {
		...mapMutations({
			clearCustomImageData: 'cardState/clearCustomImageData'
		}),

		onClick: function() {
			this.clearCustomImageData()
		}
	}
}
</script>
