<template>
	<div class="dropdown-wrapper">
		<label><slot></slot></label>
		<div class="card-drop">
			<button @click='onTopClick' class='button-top'>
				<i :class='getIconClass(activeItem)'></i>&nbsp;<span class='label-active'>{{ activeItem.title }} </span>
				<span class='caret-down'>&nbsp;<i class="fas fa-caret-down"></i>&nbsp;</span>
			</button>
			<ul>
				<li v-for='item in items' :key="item.value" :class="item === activeItem ? 'active' : '' ">
					<button @click='onItemClick(item)'><i :class='getIconClass(item)'></i> {{ item.title }}</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	props: ['id', 'items', 'selectedValue', 'onSelect', 'zIndex'],
	data: function() {
		return {
			state: 'closed',
			cards: null,
			dropdown: null,
			links: null,
			li: null,
			elementCount: 0
		}
	},
	computed: {
		zIndexInt() {
			return parseInt(this.zIndex)
		},
		activeItem: {
			get() {
				let items = this.items
				for (let i = 0; i < items.length; i++) {
					if (items[i].value === this.selectedValue) {
						return items[i]
					}
				}
				return {}
			},
			set(item) {
				if (this.onSelect !== undefined) {
					this.onSelect(item.value)
				}
				this.$emit('select', item.value)
			}
		}
	},
	methods: {
		open: function() {
			this.state = 'active'
			this.dropdown.addClass('active')
			this.li.removeClass('closed')
			this.li.each(function(index) {
				$(this).css('top', $(this).height() * (index + 1))
			})
		},
		close: function() {
			this.state = 'closed'
			this.dropdown.removeClass('active')
			this.li.addClass('closed')
			this.li.each(function() {
				$(this).css('top', 0)
			})
		},
		onTopClick: function() {
			if (this.state === 'active') {
				this.close()
			} else {
				this.open()
			}
		},
		onItemClick: function(item) {
			let items = this.items
			for (let i = 0; i < items.length; i++) {
				if (items[i] === item) {
					this.activeItem = item
				}
			}
			this.close()
		},
		getIconClass(item) {
			if (item.icon !== undefined && item.icon.includes('fab')) {
				return item.icon
			} else if (item.icon !== undefined) {
				return 'fas ' + item.icon
			} else {
				return 'no-icon'
			}
		}
	},
	mounted: function() {
		this.cards = $(this.$el).find('.card-drop')
		this.dropdown = this.cards.find('.button-top')
		this.links = this.cards.find('ul>li>button')
		this.li = this.links.parent('li')
		this.elementCount = this.links.length

		let zIndex = this.zIndexInt
		let elementCount = this.elementCount
		this.dropdown.css('z-index', zIndex + elementCount + 1)
		this.li.each(function(i) {
			$(this).css('z-index', zIndex + elementCount - i)
		})

		this.close()
	}
}
</script>

<style lang='scss' scoped>
	@import "@/styles/variables.scss";

	.element-damage { color: $element-damage-color; }
	.element-healing { color: $element-healing-color; }
	.element-alteration { color: $element-alteration-color; }
	.element-summoning { color: $element-summoning-color; }
	.element-control { color: $element-control-color; }
	.element-sacrifice { color: $element-sacrifice-color; }

	.dropdown-wrapper {
		margin: 10px;
		min-width: 150px;
		flex-grow: 1;

		label {
			font: 16px/1.4 "Roboto", sans-serif;
			letter-spacing: 0.5px;
			margin-left: 3px;
		}

		.card-drop {
			position: relative;
			margin-top: 5px;

			button {
				display: block;
				width: 100%;
				height: $dropdown-element-height;
				margin: 0;
				padding: 6px 0 6px 0;
				text-decoration: none;
				color: $inactive-color;
				background-color: $dropdown-background-color;
				i {
					display: inline-block;
					width: 20px;
					&.no-icon {
						width: 0px;
					}
				}
				&:hover {
					color: $primary-color;
					background-color: $dropdown-background-color-active;
					transition: all 0s;
				}
			}
			button.button-top {
				position: relative;
				z-index: 300;
				background-color: $dropdown-background-color;
				font: 16px/1.4 "Roboto", sans-serif;

				.caret-down {
					display: block;
					position: absolute;
					font-size: 1.3em;
					color: $inactive-color;
					right: 0;
					top: 0;
					bottom: 0;
					line-height: $dropdown-element-height;
					transition: all $transition-duration;
				}

				&.active {
					color: $primary-color;
					border-color: $primary-color;
					background-color: $dropdown-background-color;

					.caret-down {
						transform: rotate(180deg);
					}
				}

				&.active, &:hover {
					background-color: $dropdown-background-color-active;
					.caret-down {
						color: $primary-color;
					}
				}
			}

			ul {
				display: block;
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				list-style: none;
				li {
					position: absolute;
					width: 100%;
					transition: top $transition-duration ease-out;

					button {
						&:active {
							color: $accent-color;
							transition: all 0s;
						}
					}

					&.active {
						button {
							color: $accent-color;
						}
					}
					&.closed {
						button:hover {
							cursor: default;
							background-color: $dropdown-background-color;
						}
					}
				}
			}
		}
	}
</style>
