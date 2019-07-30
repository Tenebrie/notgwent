<template>
	<base-button v-on:click='onClick'><i class="fas fa-ban"></i> Cancel</base-button>
</template>

<script>
import { Event } from '../util/constant'
import BaseButton from './BaseButton'

export default {
	components: { BaseButton },
	methods: {
		onClick: function() {
			this.$root.$emit(Event.UNSELECT_ALL_LIBRARY)
			this.$root.$emit(Event.CANCEL_LIBRARY_SELECTION)
		}
	}
}
</script>
