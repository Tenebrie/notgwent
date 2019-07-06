<template>
	<div class='checkbox-wrapper'>
		<input :id='id' v-model='checked' type='checkbox' />
		<label :for='id'>
			<span></span>
			<slot></slot>
		</label>
	</div>
</template>

<script>
import { uuidv4 } from '../util/util'

export default {
	props: ['isChecked', 'onChecked'],
	computed: {
		id() {
			return 'checkbox-' + uuidv4()
		},
		checked: {
			get() {
				return this.isChecked
			},
			set(value) {
				this.onChecked(value)
			}
		}
	}
}
</script>

<style lang='scss' scoped>
	@import "@/styles/variables.scss";

	.checkbox-wrapper {
		input[type='checkbox'] {
			height: 0;
			width: 0;
			display: none;
		}

		input[type='checkbox'] + label {
			position: relative;
			display: flex;
			margin: .2em .2em;
			align-items: center;
			color: $inactive-color;
			user-select: none;
			transition: color 350ms cubic-bezier(.4, .0, .23, 1);
		}

		input[type='checkbox'] + label > span {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 1em;
			width: 1em;
			height: 1em;
			background: transparent;
			border: 2px solid $inactive-color;
			border-radius: 2px;
			cursor: pointer;
			transition: all 250ms cubic-bezier(.4, .0, .23, 1);
		}

		input[type='checkbox'] + label:hover, input[type='checkbox']:focus + label {
			color: $primary-color;
		}

		input[type='checkbox'] + label:hover > span, input[type='checkbox']:focus + label > span {
			background: rgba(255, 255, 255, .1);
		}

		input[type='checkbox']:checked + label {
			color: $accent-color;
		}

		input[type='checkbox']:checked + label > span {
			border: .5em solid $accent-color;
			animation: shrink-bounce 200ms cubic-bezier(.4, .0, .23, 1);
		}

		input[type='checkbox']:checked + label > span:before {
			content: "";
			position: absolute;
			top: 9px;
			left: 3px;
			border-right: 3px solid transparent;
			border-bottom: 3px solid transparent;
			transform: rotate(45deg);
			transform-origin: 0% 100%;
			animation: checkbox-check 125ms 250ms cubic-bezier(.4, .0, .23, 1) forwards;
		}

		@keyframes shrink-bounce {
			0% {
				transform: scale(1);
			}
			33% {
				transform: scale(.85);
			}
			100% {
				transform: scale(1);
			}
		}

		@keyframes checkbox-check {
			0% {
				width: 0;
				height: 0;
				border-color: #212121;
				transform: translate3d(0, 0, 0) rotate(45deg);
			}
			33% {
				width: .2em;
				height: 0;
				transform: translate3d(0, 0, 0) rotate(45deg);
			}
			100% {
				width: .2em;
				height: .5em;
				border-color: #212121;
				transform: translate3d(0, -.5em, 0) rotate(45deg);
			}
		}
	}
</style>
