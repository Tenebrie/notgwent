<template>
	<transition name="slide-fade" appear>
		<div class="toolbar-tab tab-texts">
			<div class="add-remove">
				<reading-file-selector @read="setCustomImageData"></reading-file-selector>
				<base-button @click="clearCustomImageData" icon="fa-trash">Remove artwork</base-button>
			</div>
			<base-textbox :value='customImageOffsetX' @input='setCustomImageOffsetX' placeholder='0'>Horizontal offset</base-textbox>
			<base-textbox :value='customImageOffsetY' @input='setCustomImageOffsetY' placeholder='0'>Vertical offset</base-textbox>
			<base-textbox :value='customImageZoom' @input='setCustomImageZoom' placeholder='0'>Cropping</base-textbox>
		</div>
	</transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BaseButton from '../components/BaseButton'
import BaseTextbox from '../components/BaseTextbox'
import ReadingFileSelector from '../components/ReadingFileSelector'

export default {
	components: {
		BaseButton,
		BaseTextbox,
		ReadingFileSelector
	},
	computed: {
		...mapState({
			customImageOffsetX: state => state.cardState.customImageOffsetX,
			customImageOffsetY: state => state.cardState.customImageOffsetY,
			customImageZoom: state => state.cardState.customImageZoom
		})
	},
	methods: {
		...mapMutations({
			setCustomImageData: 'cardState/setCustomImageData',
			setCustomImageZoom: 'cardState/setCustomImageZoom',
			setCustomImageOffsetX: 'cardState/setCustomImageOffsetX',
			setCustomImageOffsetY: 'cardState/setCustomImageOffsetY',
			clearCustomImageData: 'cardState/clearCustomImageData'
		})
	}
}
</script>

<style lang='scss' scoped>
	.tab-texts {
		.add-remove {
			display: flex;
		}
	}
</style>
