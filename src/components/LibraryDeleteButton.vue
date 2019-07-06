<template>
	<button class='btn-red' v-on:click='onClick'><i class="fas fa-trash-alt"></i> Delete</button>
</template>

<script>
import { Event } from '../util/constant'

export default {
	methods: {
		onClick: function() {
			this.$root.$emit(Event.DELETE_FROM_LIBRARY)
		}
	}
}
</script>
