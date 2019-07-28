<template>
<div v-if='library.length > 0' class='table-card-library'>
	<div class='library-table-controls'>
		<div class='selection-controls'>
			<btn-select-all></btn-select-all>
			<span v-if='isInSelectState'>
					<btn-unselect-all></btn-unselect-all>
					<btn-cancel-selection></btn-cancel-selection>
					<btn-delete></btn-delete>
				</span>
		</div>
	</div>

	<div class='library-items-container-wrapper'>
		<div class='library-items-container'>
			<div class='library-item-wrapper' v-for='item in library.slice().reverse()' :key='item.id'>
				<table-item :item='item'></table-item>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import btnSelectAll from './LibrarySelectAllButton.vue'
import btnUnselectAll from './LibraryUnselectAllButton.vue'
import btnCancelSelection from './LibraryCancelSelectionButton.vue'
import btnDelete from './LibraryDeleteButton.vue'
import tableItem from './TheLibraryContentListItem.vue'
import { Event } from '../util/constant'

export default {
	components: {
		btnSelectAll,
		btnUnselectAll,
		btnCancelSelection,
		btnDelete,
		tableItem
	},
	data: function() {
		return {
			isInSelectState: false
		}
	},
	mounted: function() {
		this.$root.$on(Event.ENABLE_LIBRARY_SELECTION, () => {
			this.isInSelectState = true
		})
		this.$root.$on(Event.CANCEL_LIBRARY_SELECTION, () => {
			this.isInSelectState = false
		})
		this.$root.$on(Event.DELETE_FROM_LIBRARY, () => {
			this.isInSelectState = false
		})
	},
	computed: {
		library: {
			get() {
				return this.$store.state.cardLibrary.data
			}
		}
	}
}
</script>

<style lang='scss' scoped>

.table-card-library {
	display: flex;
	flex-direction: column;

	.library-items-container-wrapper {
		overflow-y: auto;
		padding-right: 10px;
		max-height: calc(100vh - 102px);

		&::-webkit-scrollbar {
			width: 5px;
		}

		&::-webkit-scrollbar-track {
			background-color: #00000022;
		}

		&::-webkit-scrollbar-thumb {
			background-color: $inactive-color;
			&:hover {
				background-color: $primary-color;
			}
		}

	}
	.library-items-container {
		overflow-y: auto;
	}
}
</style>
