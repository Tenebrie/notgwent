<template>
	<base-button v-on:click='onClick'><i class="fas fa-check-square"></i> Select all</base-button>
</template>

<script>
import { Event } from '../util/constant'
import BaseButton from './BaseButton'

export default {
	components: { BaseButton },
	methods: {
		onClick: function() {
			this.$root.$emit(Event.ENABLE_LIBRARY_SELECTION)
			this.$root.$emit(Event.SELECT_ALL_LIBRARY)
		}
	}
}
</script>
