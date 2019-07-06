<template>
	<button v-on:click='onClick'><i class="fas fa-square"></i> Unselect all</button>
</template>

<script>
import { Event } from '../util/constant'

export default {
	methods: {
		onClick: function() {
			this.$root.$emit(Event.UNSELECT_ALL_LIBRARY)
		}
	}
}
</script>
