<template>
	<button v-on:click='onClick'><i class="fas fa-check-square"></i> Select all</button>
</template>

<script>
import { Event } from '../util/constant'

export default {
	methods: {
		onClick: function() {
			this.$root.$emit(Event.ENABLE_LIBRARY_SELECTION)
			this.$root.$emit(Event.SELECT_ALL_LIBRARY)
		}
	}
}
</script>
