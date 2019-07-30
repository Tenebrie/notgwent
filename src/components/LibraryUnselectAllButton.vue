<template>
	<base-button v-on:click='onClick'><i class="fas fa-square"></i> Unselect all</base-button>
</template>

<script>
import { Event } from '../util/constant'
import BaseButton from './BaseButton'

export default {
	components: { BaseButton },
	methods: {
		onClick: function() {
			this.$root.$emit(Event.UNSELECT_ALL_LIBRARY)
		}
	}
}
</script>
