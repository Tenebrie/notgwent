<template>
	<div class='library-item' @click='onClick(item.id)' v-longpress='onLongpress'>
		<div v-if='$parent.isInSelectState' class='library-item-checkbox'>
			<selection-checkbox :isSelected='isSelected'></selection-checkbox>
		</div>
		<div class='library-item-value library-item-name'>
			{{ item.displayName }}
		</div>
		<div class='library-item-value'>
			{{ item.timestamp }}
		</div>
	</div>
</template>

<script>
import { Event } from '../util/constant'
import { longpressDirective } from '../util/directive'
import selectionCheckbox from './LibraryIsSelectedCheckbox.vue'

export default {
	directives: {
		longpress: longpressDirective
	},
	props: ['item'],
	components: {
		selectionCheckbox
	},
	data: function() {
		return {
			isSelected: false,
			clickFadeOutTimer: null
		}
	},
	mounted: function() {
		this.$root.$on(Event.SELECT_ALL_LIBRARY, () => {
			this.isSelected = true
		})
		this.$root.$on(Event.UNSELECT_ALL_LIBRARY, () => {
			this.isSelected = false
		})
		this.$root.$on(Event.DELETE_FROM_LIBRARY, () => {
			if (this.isSelected) {
				this.isSelected = false
				this.$store.commit('cardLibrary/delete', this.$store.getters['cardLibrary/getCardById'](this.item.id))
			}
		})
	},
	methods: {
		onClick: function(cardId) {
			if (!this.$parent.isInSelectState) {
				this.$store.commit('cardState/clear')
				this.$store.commit('cardState/load', this.$store.getters['cardLibrary/getCardById'](cardId))
			} else {
				this.isSelected = !this.isSelected
			}
			this.transitionAfterClick()
		},

		onLongpress: function() {
			if (!this.$parent.isInSelectState) {
				this.$parent.isInSelectState = true
			}
		},

		transitionAfterClick: function() {
			this.$el.style.transition = 'all 0.3s'
			if (this.clickFadeOutTimer !== null) {
				clearTimeout(this.clickFadeOutTimer)
			}
			this.clickFadeOutTimer = setTimeout(() => {
				this.$el.style.transition = ''
			}, 300)
		}
	}
}
</script>

<style lang='scss' scoped>
	.library-item {
		width: 100%;
		color: $inactive-color;
		border-bottom: 1px solid $inactive-color;
		height: 40px;
		transition: all $transition-duration;
		cursor: pointer;
		user-select: none;
		display: flex;
		vertical-align: middle;
		padding-left: 20px;

		.library-item-checkbox {
			flex-basis: 30px;
			padding-top: 7px;
		}

		.library-item-value {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			flex-basis: 20%;
			margin-right: 20px;
			line-height: 40px;

		}
		.library-item-name {
			flex-basis: 80%;
		}

		div {
			display: inline-block;
		}

		&:hover {
			color: $primary-color;
			border-bottom-color: $primary-color;
			transition: all .0s;
		}

		&:active {
			color: $accent-color;
			border-bottom-color: $accent-color;
		}
	}
</style>
