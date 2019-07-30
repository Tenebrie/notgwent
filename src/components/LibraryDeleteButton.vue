<template>
	<base-button class='btn-red' v-on:click='onClick'><i class="fas fa-trash-alt"></i> Delete</base-button>
</template>

<script>
import { Event } from '../util/constant'
import BaseButton from './BaseButton'

export default {
	components: { BaseButton },
	methods: {
		onClick: function() {
			this.$root.$emit(Event.DELETE_FROM_LIBRARY)
		}
	}
}
</script>
