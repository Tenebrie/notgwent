<template>
	<div class="canvas-container">
		<canvas ref="primaryCanvas" class='primary'></canvas>
		<canvas ref="secondaryCanvas" class='secondary'></canvas>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { getCardFileName, stripMarkup } from '../util/util'
import { Event, Color, Type, AttackType } from '../util/constant'
import { throttle } from 'throttle-debounce'

export default {
	data: function() {
		return {
			imageCache: {},
			imagesCached: 0,
			customArtwork: null,
			previewContexts: [],
			activePreviewContext: 0,
			cacheWaitingTimer: null,
			canvasRenderDebounceTimer: null,

			unsubscribeFromCardStore: () => {},

			highlightEnabled: false,
			currentColor: '',
			colorStack: [],

			mouseDownPosition: null
		}
	},

	watch: {
		imagesCached: function(newValue) {
			if (newValue === this.imageUrls.length && this.customArtworkBase64 && !this.customArtwork) {
				this.preloadCustomArtwork()
			}
		},

		customArtworkBase64: function() { this.preloadCustomArtwork() },
		customArtOffsetX: function() { this.preloadCustomArtwork() },
		customArtOffsetY: function() { this.preloadCustomArtwork() },
		customArtZoom: function() { this.preloadCustomArtwork() },

		customArtwork: function() {
			this.renderCanvasAfterDelay()
		}
	},

	created: function() {
		for (let i = 0; i < this.imageUrls.length; i++) {
			let url = this.imageUrls[i]
			let finalUrl = 'resources/' + url + '.png'
			let image = new Image()
			image.onload = () => {
				this.imagesCached += 1
				this.imageCache[url] = image
			}
			image.onerror = () => {
				this.imagesCached += 1
				console.error('Unable to load image: ' + url + '.png')
			}
			image.src = finalUrl
		}
	},

	mounted: function() {
		let canvas = this.$refs.primaryCanvas
		let backCanvas = this.$refs.secondaryCanvas

		let width = this.canvasWidth
		let height = this.canvasHeight

		let dpr = window.devicePixelRatio || 1
		canvas.width = width * dpr
		canvas.height = height * dpr
		backCanvas.width = width * dpr
		backCanvas.height = height * dpr
		canvas.style.width = width
		canvas.style.height = height
		backCanvas.style.width = width
		backCanvas.style.height = height

		let ctx = canvas.getContext('2d')
		let backCtx = backCanvas.getContext('2d')
		ctx.scale(dpr, dpr)
		backCtx.scale(dpr, dpr)
		this.previewContexts.push(ctx)
		this.previewContexts.push(backCtx)

		canvas.style.display = 'none'
		backCanvas.style.display = 'none'

		this.$root.$on(Event.SAVE_CARD_AS_IMAGE, () => {
			this.renderCanvas()
			this.saveCanvasToFile()
		})

		this.unsubscribeFromCardStore = this.$store.subscribe((mutation, state) => {
			if (mutation.type.startsWith('cardState')) {
				this.renderCanvasAfterDelay()
			}
		})

		this.$root.$on(Event.CARD_STATE_UPDATED, () => {
			this.renderCanvasAfterDelay()
		})

		this.renderCanvasAfterDelay()
		window.addEventListener('resize', () => {
			this.renderCanvasAfterDelay()
		})

		document.fonts.addEventListener('loadingdone', () => {
			this.renderCanvasAfterDelay()
		})

		let updateCustomImageZoom = (delta) => {
			delta = -Math.sign(delta) * 32
			console.log(delta)
			if (this.customArtZoom + delta >= 0) {
				this.setCustomImageZoom(this.customArtZoom + delta)
			}
		}
		canvas.addEventListener('wheel', event => updateCustomImageZoom(event.deltaY))
		backCanvas.addEventListener('wheel', event => updateCustomImageZoom(event.deltaY))

		let saveMouseDownPosition = (mouseX, mouseY) => {
			this.mouseDownPosition = {
				x: mouseX,
				y: mouseY
			}
		}
		let applyMouseUpOffsetChange = (mouseX, mouseY) => {
			if (!this.mouseDownPosition) {
				return
			}

			let diff = {
				x: mouseX - this.mouseDownPosition.x,
				y: mouseY - this.mouseDownPosition.y
			}
			this.setCustomImageOffsetX(this.customArtOffsetX - diff.x)
			this.setCustomImageOffsetY(this.customArtOffsetY - diff.y)
			saveMouseDownPosition(mouseX, mouseY)
		}
		let resetMouseDownPosition = () => {
			this.mouseDownPosition = null
		}
		canvas.addEventListener('mousedown', event => saveMouseDownPosition(event.offsetX, event.offsetY))
		backCanvas.addEventListener('mousedown', event => saveMouseDownPosition(event.offsetX, event.offsetY))
		canvas.addEventListener('mousemove', event => applyMouseUpOffsetChange(event.offsetX, event.offsetY))
		backCanvas.addEventListener('mousemove', event => applyMouseUpOffsetChange(event.offsetX, event.offsetY))
		canvas.addEventListener('mouseup', () => resetMouseDownPosition())
		backCanvas.addEventListener('mouseup', () => resetMouseDownPosition())
	},

	beforeDestroy: function() {
		this.unsubscribeFromCardStore()
		this.$root.$off(Event.SAVE_CARD_AS_IMAGE)
		this.$root.$off(Event.CARD_STATE_UPDATED)
	},

	computed: {
		...mapState({
			customArtOffsetX: state => state.cardState.customImageOffsetX,
			customArtOffsetY: state => state.cardState.customImageOffsetY,
			customArtZoom: state => state.cardState.customImageZoom
		}),

		previewContext() {
			return this.previewContexts[this.activePreviewContext]
		},
		displayedContext() {
			let context = 0
			if (this.activePreviewContext === 0) {
				context = 1
			}
			return this.previewContexts[context]
		},
		customArtworkBase64() {
			return this.$store.state.cardState.customImageData
		},
		canvasSize() {
			return '408x584'
		},
		canvasWidth() {
			return parseInt(this.canvasSize.split('x')[0])
		},
		canvasHeight() {
			return parseInt(this.canvasSize.split('x')[1])
		},
		imageUrls() {
			let urls = [
				'empty',
				'bg-clean',
				'bg-textured',
				'bg-attribute',
				'bg-name',
				'bg-name-low',
				'bg-name-modern',
				'bg-initiative',
				'bg-stats',
				'bg-description',
				'bg-tribe',
				'bg-tribe-inverted',
				'bg-tribe-modern',
				'bg-path-begin',
				'bg-path-normal',
				'bg-path-fork',
				'bg-path-stop',
				'bg-path-end',
				'bg-element-generic',
				'bg-element-damage',
				'bg-element-healing',
				'bg-element-alteration',
				'bg-element-summoning',
				'bg-element-control',
				'bg-element-sacrifice',
				'attr-freeBuild',
				'attr-freeDraw',
				'attr-freeMove',
				'attr-freeBuildAndDraw',
				'attr-freeDrawAndMove',
				'attr-freeBuildAndMove',
				'attr-freeBuildDrawAndMove',
				'attr-permanent',
				'stat-attack-claw',
				'stat-attack-ranged',
				'stat-attack-heal',
				'stat-defense-health',
				'stat-defense-shield',
				'stat-defense-shield2'
			]

			for (let i = 1; i <= 12; i++) {
				urls.push('manacost-' + i)
			}
			for (let i = 5; i <= 50; i += 5) {
				urls.push('goldcost-' + i)
			}

			return urls
		}
	},
	methods: {
		...mapMutations({
			setCustomImageOffsetX: 'cardState/setCustomImageOffsetX',
			setCustomImageOffsetY: 'cardState/setCustomImageOffsetY',
			setCustomImageZoom: 'cardState/setCustomImageZoom'
		}),

		swapContext: function() {
			this.previewContexts[this.activePreviewContext].canvas.style.display = 'block'
			if (this.activePreviewContext === 0) {
				this.activePreviewContext = 1
			} else {
				this.activePreviewContext = 0
			}
			this.previewContexts[this.activePreviewContext].canvas.style.display = 'none'
		},

		renderCanvasAfterDelay: function() {
			if (this.canvasRenderDebounceTimer === null) {
				this.canvasRenderDebounceTimer = setTimeout(this.renderCanvas, 8)
			}
		},

		clearCanvasRenderThrottleTimer: function() {
			this.canvasRenderDebounceTimer = null
		},

		renderCanvas: function() {
			if (this.imagesCached < this.imageUrls.length) {
				this.cacheWaitingTimer = setTimeout(this.renderCanvas, 50)
				console.info('[Card render] Waiting for image cache: ' + this.imagesCached + '/' + this.imageUrls.length)
				return
			}
			let ctx = this.previewContext
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

			let imageCache = this.imageCache

			let backgroundImg = 'bg-clean'
			let sourceWidth = imageCache[backgroundImg].width
			let sourceHeight = imageCache[backgroundImg].height
			let realWidth = this.$el.offsetWidth
			let targetHeight = sourceWidth / (sourceWidth / sourceHeight)
			let parent = $(this.$el).parent()
			$(this.$el).attr('width', sourceWidth).attr('height', targetHeight)
			$(this.$el).css('height', targetHeight)
			$(this.$el).css('max-width', sourceWidth)
			$(this.$el).css('margin-top', parent.height() / 2 - targetHeight / 2)
			$(this.$el).parent().css('min-width', sourceWidth)

			if (this.customArtwork) {
				this.renderCustomArtwork(ctx)
			} else {
				this.renderImage(ctx, backgroundImg)
			}

			let state = this.$store.state.cardState

			if (state.cardType === Type.PAWN) {
				this.renderImage(ctx, 'bg-element-generic')
			} else if (state.cardType === Type.HERO) {
				this.renderImage(ctx, 'bg-element-healing')
			} else if (state.cardType === Type.LEADER) {
				this.renderImage(ctx, 'bg-element-summoning')
			}

			if (state.cardDescription !== '') {
				this.renderImage(ctx, 'bg-description')
				this.renderCardText(ctx, {
					text: state.cardDescription,
					font: this.getFont('18px', state.cardDescription),
					color: Color.DEFAULT_CARD_TEXT,
					targetX: realWidth / 2,
					targetY: 420,
					lineHeight: 24,
					maxWidth: realWidth - 24,
					maxHeight: 24 * 5
				})
			}

			if (state.cardName !== '' || state.cardTitle !== '') {
				this.renderImage(ctx, 'bg-name-modern')
			}

			if (state.cardName !== '' && state.cardTitle === '') {
				this.renderCardText(ctx, {
					text: state.cardName,
					font: this.getFont('22px', state.cardName),
					color: 'black',
					targetX: 390,
					targetY: 54,
					lineHeight: 24,
					maxWidth: 220,
					maxHeight: 64,
					verticalAlign: 'center',
					horizontalAlign: 'right'
				})
			} else if (state.cardName !== '' && state.cardTitle !== '') {
				this.renderCardText(ctx, {
					text: state.cardName,
					font: this.getFont('22px', state.cardName),
					color: 'black',
					targetX: 390,
					targetY: 64,
					lineHeight: 24,
					horizontalAlign: 'right'
				})
			}

			if (state.cardTitle !== '') {
				this.renderCardText(ctx, {
					text: state.cardTitle,
					font: this.getFont('16px', state.cardTitle),
					color: 'black',
					targetX: 390,
					targetY: 88,
					lineHeight: 24,
					horizontalAlign: 'right'
				})
			}

			if (state.cardTribe !== '') {
				let tribes = state.cardTribe.split(';')

				for (let tribeIndex in tribes) {
					let tribe = tribes[tribeIndex].trim()
					let verticalOffset = 40 * tribeIndex
					this.renderImage(ctx, 'bg-tribe-modern', { verticalOffset })
					this.renderCardText(ctx, {
						text: tribe,
						font: this.getFont('18px', tribe),
						color: 'black',
						targetX: 390,
						targetY: 129 + verticalOffset,
						lineHeight: 24,
						horizontalAlign: 'right'
					})
				}
			}

			if (state.attack >= 0 || state.health >= 0) {
				this.renderImage(ctx, 'bg-stats')
			}

			if (state.attack >= 0) {
				if (state.attackType === AttackType.NORMAL && state.attackRange === 1) {
					this.renderImage(ctx, 'stat-attack-claw')
				} else if (state.attackType === AttackType.NORMAL && state.attackRange > 1) {
					this.renderImage(ctx, 'stat-attack-ranged')
				} else if (state.attackType === AttackType.HEALING) {
					this.renderImage(ctx, 'stat-attack-heal')
				}

				if (state.attackRange !== 1) {
					this.renderCardText(ctx, {
						text: state.attackRange.toString(),
						font: '18px BrushScript',
						color: 'black',
						targetX: 280,
						targetY: 572,
						lineHeight: 24
					})
				}

				if (state.attack < 10) {
					this.renderCardText(ctx, {
						text: state.attack.toString(),
						font: '46px BrushScript',
						color: 'black',
						targetX: 302,
						targetY: 568,
						lineHeight: 24
					})
				} else {
					this.renderCardText(ctx, {
						text: state.attack.toString(),
						font: '42px BrushScript',
						color: 'black',
						targetX: 304,
						targetY: 568,
						lineHeight: 24
					})
				}
			}
			if (state.health >= 0) {
				if (state.healthArmor === 0) {
					this.renderImage(ctx, 'stat-defense-health')
				} else {
					this.renderImage(ctx, 'stat-defense-shield')
					this.renderCardText(ctx, {
						text: state.healthArmor.toString(),
						font: '18px BrushScript',
						color: 'white',
						targetX: 348,
						targetY: 560,
						lineHeight: 24
					})
				}
				if (state.health < 10) {
					this.renderCardText(ctx, {
						text: state.health.toString(),
						font: '46px BrushScript',
						color: 'black',
						targetX: 380,
						targetY: 568,
						lineHeight: 24
					})
				} else {
					this.renderCardText(ctx, {
						text: state.health.toString(),
						font: '42px BrushScript',
						color: 'black',
						targetX: 382,
						targetY: 568,
						lineHeight: 24
					})
				}
			}
			if (state.initiative >= 1) {
				this.renderImage(ctx, 'bg-initiative')
				this.renderCardText(ctx, {
					text: state.initiative.toString(),
					font: '70px BrushScript',
					color: 'black',
					targetX: 58,
					targetY: 65,
					lineHeight: 24
				})
			}

			this.clearCanvasRenderThrottleTimer()
			this.swapContext()
		},

		getFont: function(size, text) {
			let font = 'K2D'
			let cyrillic = (/[а-яА-Я]/g).exec(text)
			if (cyrillic) {
				font = 'Roboto'
			}
			return size + ' ' + font
		},

		renderCardText: function(ctx, options) {
			let text = options.text
			if (!text || text.length === 0) { return }

			let targetX = options.targetX
			let targetY = options.targetY
			let font = options.font || this.getFont('16px', text)
			let color = options.color || 'black'
			let lineHeight = options.lineHeight || 16
			let maxWidth = options.maxWidth || targetX * 2
			let maxHeight = options.maxHeight || lineHeight
			let horizontalAlign = options.horizontalAlign || 'center'
			let verticalAlign = options.verticalAlign || 'center'

			ctx.font = font
			ctx.fillStyle = color

			const maximumLineY = targetY + maxHeight

			let paragraphs = text.split('\n')
			let currentLineY = targetY
			let textLines = []

			while (paragraphs.length > 0) {
				let words = paragraphs[0].split(' ')
				let currentLineText = null
				let currentTextCandidate = null

				while (words.length > 0) {
					currentTextCandidate = words[0]
					if (currentLineText !== null) {
						currentTextCandidate = currentLineText + ' ' + currentTextCandidate
					}
					let width = ctx.measureText(stripMarkup(currentTextCandidate)).width
					if (width < maxWidth && currentLineY < maximumLineY) {
						currentLineText = currentTextCandidate
						words.splice(0, 1)
					} else if (currentLineText != null) {
						if (currentLineY + lineHeight > maximumLineY) {
							break
						}
						textLines.push({
							text: currentLineText,
							targetX: targetX,
							targetY: currentLineY
						})
						currentLineY += lineHeight
						currentLineText = null
					} else {
						currentLineText = currentTextCandidate
						break
					}
				}
				if (currentLineY + lineHeight > maximumLineY) {
					break
				}

				paragraphs.splice(0, 1)
				textLines.push({
					text: currentLineText,
					targetX: targetX,
					targetY: currentLineY
				})
				if (paragraphs.length > 0) {
					currentLineY += lineHeight * 1.0
				}
			}

			let offset = 0
			if (verticalAlign === 'center') {
				offset = (maximumLineY - currentLineY) / 2 - lineHeight / 2
			} else if (verticalAlign === 'bottom') {
				offset = (maximumLineY - currentLineY) - lineHeight
			}

			this.resetDescriptionColors(ctx, color)

			for (let lineIndex in textLines) {
				let line = textLines[lineIndex]
				this.renderCardTextLine(ctx, {
					text: line.text,
					targetX: line.targetX,
					targetY: line.targetY + offset,
					align: horizontalAlign
				})
			}
		},

		renderCardTextLine: function(ctx, { text, targetX, targetY, align }) {
			if (text === null) {
				throw Error('Unable to render null text')
			}

			let cleanText = stripMarkup(text)
			let width = ctx.measureText(cleanText).width
			let renderTargetX = targetX
			if (align === 'center') {
				renderTargetX = targetX - width / 2
			} else if (align === 'right') {
				renderTargetX = targetX - width
			}

			const openingColorTagPattern = /<(?:color|c)=['"]?([a-zA-Z0-9#]+)['"]?>/
			const closingColorTagPattern = /<\/(?:color|c)>/

			let currentLineX = renderTargetX

			// ctx.shadowBlur = 6
			// ctx.shadowColor = 'black'

			let buffer = ''

			for (let i = 0; i < text.length; i++) {
				let char = text.charAt(i)
				if (char === '<' || (char === '*')) {
					this.renderDescriptionText(ctx, buffer, currentLineX, targetY)
					currentLineX += ctx.measureText(buffer).width
					buffer = ''
					if (char === '*') {
						this.highlightEnabled = !this.highlightEnabled
					} else {
						buffer += char
					}
				} else if (char === '>') {
					buffer += char
					if (openingColorTagPattern.test(buffer)) {
						this.setCurrentColor(ctx, buffer.match(openingColorTagPattern)[1])
					} else if (closingColorTagPattern.test(buffer)) {
						this.popColorStack(ctx)
					}
					buffer = ''
				} else {
					buffer += char
				}
			}
			this.renderDescriptionText(ctx, buffer, currentLineX, targetY)
		},

		renderDescriptionText: function(ctx, text, targetX, targetY) {
			if (this.highlightEnabled) { this.setCurrentColor(ctx, 'white') }
			ctx.fillText(text, targetX, targetY)
			if (this.highlightEnabled) { this.popColorStack(ctx) }
		},

		setCurrentColor: function(ctx, color) {
			this.colorStack.push(this.currentColor)
			this.currentColor = color
			ctx.fillStyle = this.currentColor
		},

		popColorStack: function(ctx) {
			this.currentColor = this.colorStack.pop()
			ctx.fillStyle = this.currentColor
		},

		resetDescriptionColors: function(ctx, defaultColor) {
			this.currentColor = defaultColor
			this.highlightEnabled = false
			ctx.fillStyle = defaultColor
		},

		preloadCustomArtwork: throttle(16, function() {
			if (!this.customArtworkBase64) {
				this.customArtwork = null
				return
			}

			let image = new Image()
			image.onload = () => {
				this.applyCardMask(image, (croppedImage) => { this.customArtwork = croppedImage })
			}
			image.src = this.customArtworkBase64
		}),

		applyCardMask: function(image, callback) {
			let canvas = document.createElement('canvas')
			canvas.width = this.canvasWidth
			canvas.height = this.canvasHeight
			let ctx = canvas.getContext('2d')
			ctx.drawImage(this.imageCache['bg-clean'], 0, 0, this.canvasWidth, this.canvasHeight)
			ctx.globalCompositeOperation = 'source-atop'

			let desiredAspectRatio = this.canvasWidth / this.canvasHeight
			let croppedImageWidth = this.canvasWidth + this.customArtZoom
			let croppedImageHeight = image.height * (croppedImageWidth / image.width)
			let verticalOffset = (croppedImageHeight - this.canvasHeight) / 2
			let horizontalOffset = this.customArtZoom / 2
			if (image.width > image.height * desiredAspectRatio) {
				croppedImageHeight = this.canvasHeight + this.customArtZoom
				croppedImageWidth = image.width * (croppedImageHeight / image.height)
				horizontalOffset = (croppedImageWidth - this.canvasWidth) / 2
				verticalOffset = this.customArtZoom / 2
			}

			horizontalOffset += this.customArtOffsetX
			verticalOffset += this.customArtOffsetY
			let imageZoom = this.customArtZoom

			ctx.drawImage(image, -horizontalOffset, -verticalOffset, croppedImageWidth, croppedImageHeight)

			let updatedImage = new Image()
			updatedImage.onload = () => {
				callback(updatedImage)
			}
			updatedImage.src = canvas.toDataURL('image/png')
		},

		renderImage: function(ctx, imageId, options) {
			let image = this.imageCache[imageId]
			if (image === undefined) {
				console.error('Unable to load image: ' + imageId + '.png')
				return
			}

			options = options || {}
			let horizontalOffset = options.horizontalOffset || 0
			let verticalOffset = options.verticalOffset || 0

			ctx.drawImage(image, horizontalOffset, verticalOffset, this.canvasWidth, this.canvasHeight)
		},

		renderCustomArtwork: function(ctx) {
			ctx.drawImage(this.customArtwork, 0, 0, this.canvasWidth, this.canvasHeight)
		},

		saveCanvasToFile: function() {
			let image = this.displayedContext.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')

			let cardName = this.$store.state.cardState.cardName
			let anchorTag = document.createElement('a')
			document.body.appendChild(anchorTag)
			anchorTag.setAttribute('href', image)
			anchorTag.setAttribute('download', getCardFileName(cardName, 'png'))
			anchorTag.click()
			setTimeout(function() {
				document.body.removeChild(anchorTag)
			}, 0)
		}
	}
}
</script>

<style lang='scss' scoped>
	@import "@/styles/variables.scss";

	.canvas-container {
		height: 100%;
		margin-left: auto;
		margin-right: auto;
		width: 408px;
		canvas {
			display: block;
			margin-left: auto;
			margin-right: auto;
			cursor: grab;
		}
	}
</style>
